import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [showTasks, setShowTasks] = useState(false);
  const [answer, setAnswer] = useState("");
  const [refCount, setRefCount] = useState(0);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    setUser(tg.initDataUnsafe?.user);

    const targetDate = new Date("2024-04-30T00:00:00");
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      const time = {
        days: Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0),
        hours: Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0),
        minutes: Math.max(Math.floor((difference / 1000 / 60) % 60), 0),
        seconds: Math.max(Math.floor((difference / 1000) % 60), 0),
      };

      setTimeLeft(time);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerCheck = () => {
    if (answer === "4") {
      setBalance((prev) => prev + 10);
      setAnswer("");
    }
  };

  const userRefLink = `https://t.me/reaphome_bot?start=${user?.id || "guest"}`;

  return (
    <div className="container">
      <div className="welcome-card">WELCOME</div>

      <div className="timer-card">
        <div>{timeLeft.days}<div className="label">дней</div></div>
        <div>{timeLeft.hours}<div className="label">часов</div></div>
        <div>{timeLeft.minutes}<div className="label">минут</div></div>
        <div>{timeLeft.seconds}<div className="label">секунд</div></div>
      </div>

      <button className="tasks-btn" onClick={() => setShowTasks(true)}>TASKS</button>
      <div className="balance-card">bal: {balance.toFixed(2)}</div>

      {showTasks && (
        <div className="modal-overlay" onClick={() => setShowTasks(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>REF {refCount} / 10 take</h3>
            <p style={{ fontSize: "12px", wordBreak: "break-all" }}>
              Your ref link:<br /> <span>{userRefLink}</span>
            </p>
            <div className="input-block">
              <label>2 + 2 =</label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Введите ответ"
              />
              <button onClick={handleAnswerCheck}>Check</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
