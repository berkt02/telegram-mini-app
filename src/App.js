import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready(); // сигнал Телеграму, что всё ок
    tg.expand(); // разворачиваем экран
  }, []);

  const onClick = () => {
    const tg = window.Telegram.WebApp;
    tg.sendData("Привет из мини-приложения!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Это Telegram Mini App</h1>
      <button onClick={onClick}>Отправить данные в Telegram</button>
    </div>
  );
}

export default App;
