export default function App() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#101010',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '24px'
      }}
    >
      <h1 style={{ color: '#CCFF00', fontSize: '42px', marginBottom: '16px' }}>
        TARAN
      </h1>
      <p style={{ fontSize: '18px', maxWidth: '420px', lineHeight: '1.5' }}>
        Сайт боксерского клуба успешно запущен.
      </p>
    </main>
  );
}