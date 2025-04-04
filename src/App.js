import React, { useEffect, useState } from "react";
import { ref, onValue, set, get, child } from "firebase/database";
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

  useEffect(() => {
    const balanceRef = ref(db, `users/${userId}/balance`);
    const refCountRef = ref(db, `users/${userId}/refCount`);
    onValue(balanceRef, (snap) => setBalance(snap.val() || 0));
    onValue(refCountRef, (snap) => setRefCount(snap.val() || 0));
  }, [userId]);

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

  useEffect(() => {
    const tasksRef = ref(db);
    get(child(tasksRef, "tasks")).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const loaded = Object.entries(data).map(([id, obj]) => ({
          id,
          ...obj,
        }));
        setTasks(loaded);
      }
    });

    const completedRef = ref(db, `users/${userId}/completedTasks`);
    onValue(completedRef, (snap) => {
      setCompletedTasks(snap.val() || []);
    });
  }, [userId]);

  const fetchTopUsers = () => {
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersArray = Object.entries(data).map(([id, user]) => ({
          id,
          username: user.username || id,
          balance: user.balance || 0,
        }));
        const sorted = usersArray.sort((a, b) => b.balance - a.balance).slice(0, 10);
        setTopUsers(sorted);
      }
    });
  };

  const togglePopup = () => setPopupOpen(!popupOpen);

  const handleAnswer = () => {
    if (answer.trim() === "4" && !correctAnswered) {
      const newBalance = balance + 10;
      set(ref(db, `users/${userId}/balance`), newBalance);
      setCorrectAnswered(true);
    }
  };

  const completeTask = (task) => {
    if (completedTasks.includes(task.id)) return;
    const newBalance = balance + task.reward;
    set(ref(db, `users/${userId}/balance`), newBalance);
    const updated = [...completedTasks, task.id];
    set(ref(db, `users/${userId}/completedTasks`), updated);
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

        {/* Bottom Left UI */}
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

        {/* POPUP: LEADERBOARD */}
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
