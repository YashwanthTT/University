import Counter from './Counter.jsx'
import TodoList from './TodoList.jsx'
import './App.css'

function App() {
  return (
    <>
      <section id="center" style={{ padding: '32px 20px' }}>
        <h1>React State Management</h1>
        <p>
          Demonstrating <code>useState</code> & event handling
        </p>
      </section>

      <div className="ticks"></div>

      <section style={sectionStyle}>
        <Counter />
        <TodoList />
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '32px',
  textAlign: 'center',
}

export default App
