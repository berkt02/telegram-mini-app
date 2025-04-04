import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  // ⬇️ deadline через 20 дней от текущего времени
  const [targetDate] = useState(new Date(Date.now() + 20 * 24 * 60 * 60 * 1000));
  const [timeLeft, setTimeLeft] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);
  const [balance, setBalance] = useState(0);

  const [refCount, setRefCount] = useState(0); // просто пример
  const [answer, setAnswer] = useState("");
  const [correctAnswered, setCorrectAnswered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;
      const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
      const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
      const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
      const seconds = Math.max(0, Math.floor((diff / 1000) % 60));
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const togglePopup = () => setPopupOpen(!popupOpen);

  const handleAnswer = () => {
    if (answer.trim() === "4" && !correctAnswered) {
      setBalance((prev) => prev + 10);
      setCorrectAnswered(true);
    }
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

        {/* TASKS Button */}
        <button className="tasks-button" onClick={togglePopup}>TASKS</button>
        <div className="balance-display">bal: {balance.toFixed(2)}</div>

        {/* POPUP TASK WINDOW */}
        {popupOpen && (
          <div className="popup">
            <h3>REF {refCount}/10</h3>
            <p>Your ref link:</p>
            <code>https://t.me/reaphome_bot?start=ref123</code>

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

            <button className="close-btn" onClick={togglePopup}>✖</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
