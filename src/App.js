import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const targetDate = new Date("2025-05-01T00:00:00");
  const [timeLeft, setTimeLeft] = useState({});
  const [balance] = useState(0.0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="app">
      <div className="welcome-card">WELCOME</div>

      <div className="timer-card">
        <div className="time-block">
          <div className="number">{timeLeft.days}</div>
          <div className="label">дней</div>
        </div>
        <div className="time-block">
          <div className="number">{timeLeft.hours}</div>
          <div className="label">часов</div>
        </div>
        <div className="time-block">
          <div className="number">{timeLeft.minutes}</div>
          <div className="label">минут</div>
        </div>
        <div className="time-block">
          <div className="number">{timeLeft.seconds}</div>
          <div className="label">секунд</div>
        </div>
      </div>

      {/* Нижние кнопки слева */}
      <div className="bottom-left">
        <div className="task-card">TASKS</div>
        <div className="balance-card">bal: {balance.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default App;
