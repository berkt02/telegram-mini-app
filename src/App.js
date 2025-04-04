import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const targetDate = new Date("2024-05-01T00:00:00");
    const now = new Date();
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <div className="overlay">
        <div className="card welcome-card">
          <h1>WELCOME</h1>
        </div>

        <div className="card timer-card">
          <div className="timer-row">
            <div className="timer-box">
              <div className="value">{timeLeft.days}</div>
              <div className="label">дней</div>
            </div>
            <div className="timer-box">
              <div className="value">{timeLeft.hours}</div>
              <div className="label">часов</div>
            </div>
            <div className="timer-box">
              <div className="value">{timeLeft.minutes}</div>
              <div className="label">минут</div>
            </div>
            <div className="timer-box">
              <div className="value">{timeLeft.seconds}</div>
              <div className="label">секунд</div>
            </div>
          </div>
        </div>

        <div className="bottom-block">
          <div className="card tasks-card">TASKS</div>
          <div className="card balance-card">bal: 0.00</div>
        </div>
      </div>
    </div>
  );
}

export default App;
