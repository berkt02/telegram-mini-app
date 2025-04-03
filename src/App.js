import React, { useEffect, useState } from "react";
import "./App.css";
import { FaImage, FaWallet, FaChartLine } from "react-icons/fa";

function App() {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    const userData = tg.initDataUnsafe?.user;
    setUser(userData);
  }, []);

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

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
            <button className="btn btn-sell" onClick={togglePopup}>SELL</button>
            <button className="btn btn-buy" onClick={togglePopup}>BUY</button>
          </div>
        </div>
      </div>

      {/* NFT Block */}
      <div className="info-card">
        <div className="row-between">
          <div className="row-center">
            <FaImage className="icon" />
            <span className="label">NFT</span>
          </div>
          <button className="btn-flat" onClick={togglePopup}>OPEN</button>
        </div>
      </div>

      {/* Wallet Block */}
      <div className="info-card">
        <div className="row-between">
          <div className="row-center">
            <FaWallet className="icon" />
            <span className="label">WALLET</span>
          </div>
          <button className="btn-flat" onClick={togglePopup}>CONNECT</button>
        </div>
      </div>

      {/* Staking Block */}
      <div className="info-card">
        <div className="row-between">
          <div className="row-center">
            <FaChartLine className="icon" />
            <span className="label">STAKING</span>
          </div>
          <button className="btn-flat" onClick={togglePopup}>OPEN</button>
        </div>
      </div>

      {/* Всплывающая плашка */}
      {showPopup && (
        <div className="popup" onClick={togglePopup}>
          🚧WILL BE SOON
        </div>
      )}
    </div>
  );
}

export default App;
