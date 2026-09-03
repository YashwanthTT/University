import UserList from './UserList.jsx'
import './App.css'

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React - API Integration Using Fetch and Axios</h1>
      <p>Data fetched from JSONPlaceholder API using useEffect and Axios</p>
      <UserList />
    </div>
  )
}

export default App
