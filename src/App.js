import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready(); // Telegram скажет, что Mini App загружен
    setUser(tg.initDataUnsafe.user || {});
  }, []);

  return (
    <div className="container">
      <header className="header">REAPER'S HOME</header>

      {/* Аватарка из Telegram */}
      <img
        src={`https://t.me/i/userpic/320/${user.username}.jpg`}
        alt="avatar"
        className="avatar"
      />

      {/* Username */}
      <p className="nickname">@{user.username || "неизвестно"}</p>

      <div className="balance-card">
        <span className="balance-label">balance</span>
        <div className="balance-row">
          <div className="balance-amount">💰 0.00 REAP</div>
          <div className="balance-buttons">
            <button className="btn btn-sell">SELL</button>
            <button className="btn btn-buy">BUY</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

