import StudentCard from './StudentCard';

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#eef2f6',
        padding: '40px 16px',
        boxSizing: 'border-box',
      }}
    >
      <StudentCard
        name="VAIBHAV.S"
        usn="24BBTCS281"
        program="Btech CSE"
        dob="01/05/2006"
      />
    </div>
  );
}

export default App;
