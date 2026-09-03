import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div style={styles.card}>
      <h2>Counter: {count}</h2>
      <div style={styles.row}>
        <button style={styles.btn} onClick={() => setCount(count + 1)}>Increment</button>
        <button style={styles.btn} onClick={() => setCount(count - 1)}>Decrement</button>
        <button style={{ ...styles.btn, ...styles.reset }} onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '24px',
    background: 'var(--bg)',
  },
  row: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '16px',
    flexWrap: 'wrap',
  },
  btn: {
    padding: '8px 16px',
    borderRadius: '6px',
    border: '1px solid var(--border)',
    background: 'var(--social-bg)',
    color: 'var(--text-h)',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
  },
  reset: {
    background: 'var(--accent-bg)',
    color: 'var(--accent)',
    borderColor: 'var(--accent-border)',
  },
};

export default Counter;
