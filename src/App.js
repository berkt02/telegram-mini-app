import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [showTasks, setShowTasks] = useState(false);
  const [refCount, setRefCount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [answer, setAnswer] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(false);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    const userData = tg.initDataUnsafe?.user;
    setUser(userData);
  }, []);

  const toggleTasks = () => setShowTasks(prev => !prev);

  const handleCheckAnswer = () => {
    if (answer.trim() === "4" && !taskCompleted) {
      setBalance(prev => prev + 10);
      setTaskCompleted(true);
    }
  };

  const username = user?.username || "user";
  const refLink = `https://t.me/reaphome_bot?start=${username}`;

  return (
    <div className="container">
      <div className="overlay">
        <div className="welcome-card">WELCOME</div>

        <div className="timer-card">
          <div className="timer-item">
            <div className="time">26</div>
            <div className="label">дней</div>
          </div>
          <div className="timer-item">
            <div className="time">4</div>
            <div className="label">часов</div>
          </div>
          <div className="timer-item">
            <div className="time">59</div>
            <div className="label">минут</div>
          </div>
          <div className="timer-item">
            <div className="time">52</div>
            <div className="label">секунд</div>
          </div>
        </div>

        <button className="tasks-btn" onClick={toggleTasks}>TASKS</button>
        <div className="balance-box">bal: {balance.toFixed(2)}</div>

        {showTasks && (
          <div className="task-popup">
            <h3>REF {refCount}/10 take</h3>
            <p className="ref-link">Your ref link:</p>
            <input value={refLink} readOnly className="ref-input" onClick={(e) => e.target.select()} />

            <div className="quiz">
              <label>2 + 2 = </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={taskCompleted}
              />
              <button className="check-btn" onClick={handleCheckAnswer} disabled={taskCompleted}>
                Проверить
              </button>
              {taskCompleted && <p className="success">+10 REAP добавлено!</p>}
            </div>

            <button className="close-btn" onClick={toggleTasks}>Закрыть</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;