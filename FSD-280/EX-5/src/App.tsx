import StudentCard from './StudentCard'

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
        name="T Yashwanth"
        usn="24BBTCS280"
        program="Btech CSE"
        dob="26/10/2006"
      />
      {/* Example with custom props - uncomment to test */}
      {/* <div style={{ marginTop: 24 }}>
        <StudentCard name="Yashwanth" usn="24BBTCS001" program="Btech CSE" dob="01/01/2005" />
      </div> */}
    </div>
  )
}

export default App
