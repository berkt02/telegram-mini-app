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
function App() {
  return (
    <div className="App" style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: 'white' }}>Это Telegram Mini App</h1>

      <img
        src="/reaper.jpg"
        alt="Жнец"
        style={{
          maxWidth: '100%',
          borderRadius: '16px',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          marginBottom: '20px'
        }}
      />

      <button onClick={() => window.Telegram.WebApp.sendData('👻 Привет из мини-приложения!')}>
        Отправить данные в Telegram
      </button>
    </div>
  );
}

export default App;
