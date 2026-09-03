import StudentCard from './StudentCard';
import './App.css';

function App() {
  return (
    <div>
      <h1>Welcome to Full Stack Lab</h1>
      <StudentCard name="Rohit Kumar" dept="CSE" />
      <StudentCard name="Ananya Sharma" dept="ISE" />
    </div>
  );
}

export default App;
