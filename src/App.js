import React, { useEffect, useState } from "react";
import { ref, onValue, set, get, child, update } from "firebase/database";
import { db } from "./firebase";
import "./App.css";

function App() {
  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user;
  const userId = user?.id?.toString() || "guest";
  const username = user?.username || "anonymous";

  const [targetDate] = useState(new Date(Date.now() + 20 * 24 * 60 * 60 * 1000));
  const [timeLeft, setTimeLeft] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [refCount, setRefCount] = useState(0);
  const [answer, setAnswer] = useState("");
  const [correctAnswered, setCorrectAnswered] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showLeaders, setShowLeaders] = useState(false);
  const [topUsers, setTopUsers] = useState([]);

  // ✅ Сохраняем юзера при старте
  useEffect(() => {
    if (userId !== "guest") {
      update(ref(db, `users/${userId}`), {
        username: username,
      });
    }
  }, [userId, username]);

  // Таймер
  useEffect(() => {
    const timer = setInterval(() => {
      const diff = targetDate - new Date();
      const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
      const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
      const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
      const seconds = Math.max(0, Math.floor((diff / 1000) % 60));
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Баланс и реферальные
  useEffect(() => {
    if (userId === "guest") return;
    onValue(ref(db, `users/${userId}/balance`), (snap) =>
      setBalance(snap.val() || 0)
    );
    onValue(ref(db, `users/${userId}/refCount`), (snap) =>
      setRefCount(snap.val() || 0)
    );
  }, [userId]);

  // Реферал
  useEffect(() => {
    const inviterId = tg.initDataUnsafe?.start_param;
    if (inviterId && inviterId !== userId) {
      const refRef = ref(db, `users/${inviterId}/refCount`);
      get(refRef).then((snap) => {
        const current = snap.val() || 0;
        set(refRef, current + 1);
      });
    }
  }, [userId]);

  // Задания
  useEffect(() => {
    get(child(ref(db), "tasks")).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const loaded = Object.entries(data).map(([id, obj]) => ({ id, ...obj }));
        setTasks(loaded);
      }
    });

    onValue(ref(db, `users/${userId}/completedTasks`), (snap) =>
      setCompletedTasks(snap.val() || [])
    );
  }, [userId]);

  // Топ
  const fetchTopUsers = () => {
    onValue(ref(db, "users"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sorted = Object.entries(data)
          .map(([id, user]) => ({
            id,
            username: user.username || id,
            balance: user.balance || 0,
          }))
          .sort((a, b) => b.balance - a.balance)
          .slice(0, 10);
        setTopUsers(sorted);
      }
    });
  };

  const togglePopup = () => setPopupOpen(!popupOpen);

  // ✅ Обновлённый ответ на 2+2
  const handleAnswer = () => {
    if (answer.trim() === "4" && !correctAnswered && userId !== "guest") {
      const newBalance = balance + 10;
      const updates = {
        username,
        balance: newBalance,
        refCount,
      };
      set(ref(db, `users/${userId}`), updates);
      setCorrectAnswered(true);
      setBalance(newBalance);
    }
  };

  // ✅ Выполнение задания
  const completeTask = (task) => {
    if (completedTasks.includes(task.id) || userId === "guest") return;
    const newBalance = balance + task.reward;
    const updated = [...completedTasks, task.id];

    const updates = {
      username,
      balance: newBalance,
      refCount,
      completedTasks: updated,
    };

    set(ref(db, `users/${userId}`), updates);
    setBalance(newBalance);
    setCompletedTasks(updated);
  };

  return (
    <div className="app">
      <div className="overlay">
        <div className="welcome-box">WELCOME</div>
        <div className="timer-box">
          <div>{timeLeft.days} <span>дней</span></div>
          <div>{timeLeft.hours} <span>часов</span></div>
          <div>{timeLeft.minutes} <span>минут</span></div>
          <div>{timeLeft.seconds} <span>секунд</span></div>
        </div>

        {/* Bottom UI */}
        <div className="bottom-left">
          <button className="tasks-button" onClick={togglePopup}>TASKS</button>
          <div className="balance-display">bal: {balance.toFixed(2)}</div>
          <button className="page-btn" onClick={() => {
            setShowLeaders(true);
            fetchTopUsers();
          }}>🏆 Топ игроков</button>
        </div>

        {/* POPUP: TASKS */}
        {popupOpen && (
          <div className="popup">
            <h3>REF {refCount}/10</h3>
            <p>Your ref link:</p>
            <code>https://t.me/reaphome_bot?start={userId}</code>

            <div className="task-question">
              <label>2 + 2 = </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button onClick={handleAnswer}>Submit</button>
              {correctAnswered && <p className="reward">+10 получено!</p>}
            </div>

            <div className="dynamic-tasks">
              <h4>Доступные задания:</h4>
              {tasks.map((task) => (
                <div key={task.id} className="task-item">
                  <p>{task.title}</p>
                  <button
                    disabled={completedTasks.includes(task.id)}
                    onClick={() => completeTask(task)}
                  >
                    {completedTasks.includes(task.id) ? "✔ Выполнено" : "Выполнить"}
                  </button>
                </div>
              ))}
            </div>

            <button className="close-btn" onClick={togglePopup}>✖</button>
          </div>
        )}

        {/* POPUP: Топ игроков */}
        {showLeaders && (
          <div className="popup">
            <h3>🏆 Топ 10</h3>
            <ul>
              {topUsers.map((user, index) => (
                <li key={user.id}>
                  {index + 1}. {user.username} — {user.balance.toFixed(2)} баллов
                </li>
              ))}
            </ul>
            <button className="close-btn" onClick={() => setShowLeaders(false)}>✖</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
