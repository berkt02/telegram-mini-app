function App() {
  return (
    <div
      style={{
        backgroundColor: '#0e0e0e',
        height: '100vh',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img
        src="/reaper.jpg"
        alt="Жнец"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: '12px',
          boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)'
        }}
      />
    </div>
  );
}

export default App;

