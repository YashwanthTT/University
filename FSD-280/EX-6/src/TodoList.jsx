import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input.trim(), completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (index) => {
    setTodos(todos.map((todo, i) => (i === index ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTodo();
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div style={styles.card}>
      <h2>To-Do List</h2>
      {todos.length > 0 && (
        <p style={styles.counter}>
          {completedCount} / {todos.length} completed
        </p>
      )}
      <div style={styles.inputRow}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add task"
          style={styles.input}
        />
        <button style={styles.addBtn} onClick={addTodo}>Add</button>
      </div>
      <ul style={styles.list}>
        {todos.map((todo, i) => (
          <li
            key={i}
            style={{
              ...styles.item,
              ...(todo.completed ? styles.itemCompleted : {}),
            }}
          >
            <label style={styles.label}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(i)}
                style={styles.checkbox}
              />
              <span
                style={{
                  ...styles.text,
                  ...(todo.completed ? styles.textCompleted : {}),
                }}
              >
                {todo.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
      {todos.length === 0 && <p style={styles.empty}>No tasks yet. Add one!</p>}
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '24px',
    background: 'var(--bg)',
    textAlign: 'left',
  },
  inputRow: {
    display: 'flex',
    gap: '8px',
    marginTop: '12px',
  },
  input: {
    flex: 1,
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid var(--border)',
    background: 'var(--bg)',
    color: 'var(--text-h)',
    fontSize: '14px',
    outline: 'none',
  },
  addBtn: {
    padding: '8px 16px',
    borderRadius: '6px',
    border: '1px solid var(--accent-border)',
    background: 'var(--accent-bg)',
    color: 'var(--accent)',
    cursor: 'pointer',
    fontWeight: 600,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: '16px 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  counter: {
    fontSize: '13px',
    color: 'var(--text)',
    margin: '4px 0 0',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    borderRadius: '6px',
    background: 'var(--code-bg)',
    color: 'var(--text-h)',
    fontSize: '14px',
    transition: 'opacity 0.2s, background 0.2s',
  },
  itemCompleted: {
    opacity: 0.7,
    background: 'var(--social-bg)',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    width: '100%',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    accentColor: 'var(--accent)',
    cursor: 'pointer',
    flexShrink: 0,
  },
  text: {
    flex: 1,
    textAlign: 'left',
    wordBreak: 'break-word',
  },
  textCompleted: {
    textDecoration: 'line-through',
    color: 'var(--text)',
  },
  empty: {
    marginTop: '12px',
    fontSize: '13px',
    color: 'var(--text)',
    textAlign: 'center',
  },
};

export default TodoList;
