import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    const userData = tg.initDataUnsafe?.user;
    setUser(userData);
  }, []);

  return (
    <div className="container">
      <header className="header">REAPER'S HOME</header>

      {/* Аватарка + ник */}
      {user ? (
        <>
          <img
            src={`https://t.me/i/userpic/320/${user.username}.jpg`}
            alt="avatar"
            className="avatar"
          />
          <p className="nickname">@{user.username}</p>
        </>
      ) : (
        <p className="nickname">Загрузка профиля...</p>
      )}

      {/* Блок баланса */}
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

      {/* NFT Block */}
      <div className="info-card">
        <div className="row-between">
          <div className="row-center">
            <span className="icon yellow">🟡</span>
            <span className="label">NFT</span>
          </div>
          <button className="btn-flat">OPEN</button>
        </div>
      </div>

      {/* Wallet Block */}
      <div className="info-card">
        <div className="row-between">
          <div className="row-center">
            <span className="icon blue">🔵</span>
            <span className="label">WALLET</span>
          </div>
          <span className="wallet-text">QOI.....EIW</span>
        </div>
      </div>

      {/* Staking Block */}
      <div className="info-card">
        <div className="row-between">
          <div className="row-center">
            <span className="icon purple">🟣</span>
            <span className="label">STAKING</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

