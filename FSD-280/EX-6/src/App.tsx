import Counter from './Counter.jsx'
import TodoList from './TodoList.jsx'
import './App.css'

function App() {
  return (
    <section style={sectionStyle}>
      <div style={innerStyle}>
        <Counter />
        <TodoList />
      </div>
    </section>
  )
}

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100svh',
  padding: '32px',
  boxSizing: 'border-box',
  width: '100%',
}

const innerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '100%',
  maxWidth: '520px',
}

export default App
