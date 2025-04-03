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
import React, { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready(); // сигнал Telegram, что всё ок
    tg.expand(); // развернуть на весь экран

    const userData = tg.initDataUnsafe?.user;
    setUser(userData);
  }, []);

  return (
    <div style={{
      backgroundColor: '#1e1e2f',
      color: 'white',
      height: '100vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      {user ? (
        <>
          <img
            src={`https://t.me/i/userpic/320/${user.username}.jpg`}
            alt="avatar"
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              marginBottom: 20
            }}
          />
          <h2>@{user.username}</h2>
        </>
      ) : (
        <p>Загрузка профиля...</p>
      )}
    </div>
  );
}
export default App;
{/* NFT Block */}
<div style={cardStyle}>
  <div style={rowBetween}>
    <div style={rowCenter}>
      <span style={nftIcon}>🟡</span>
      <span style={labelStyle}>NFT</span>
    </div>
    <button style={buttonStyle}>OPEN</button>
  </div>
</div>

{/* Wallet Block */}
<div style={cardStyle}>
  <div style={rowBetween}>
    <div style={rowCenter}>
      <span style={walletIcon}>🔵</span>
      <span style={labelStyle}>WALLET</span>
    </div>
    <span style={walletText}>QOI.....EIW</span>
  </div>
</div>

{/* Staking Block */}
<div style={cardStyle}>
  <div style={rowBetween}>
    <div style={rowCenter}>
      <span style={stakingIcon}>🟣</span>
      <span style={labelStyle}>STAKING</span>
    </div>
  </div>
</div>

