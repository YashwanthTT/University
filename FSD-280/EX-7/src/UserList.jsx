import { useState, useEffect } from 'react'
import axios from 'axios'

const GRADIENTS = [
  'linear-gradient(135deg,#7c3aed,#06b6d4)',
  'linear-gradient(135deg,#f43f5e,#f59e0b)',
  'linear-gradient(135deg,#06b6d4,#10b981)',
  'linear-gradient(135deg,#8b5cf6,#ec4899)',
  'linear-gradient(135deg,#0ea5e9,#6366f1)',
  'linear-gradient(135deg,#f59e0b,#ef4444)',
  'linear-gradient(135deg,#10b981,#06b6d4)',
  'linear-gradient(135deg,#6366f1,#8b5cf6)',
]

function initials(name) {
  return name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()
}

const Icons = {
  mail: (p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>,
  map: (p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="3"/></svg>,
  phone: (p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8l-1.4 1.4a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 1.8-.6l3 .5A2 2 0 0 1 22 16.9Z"/></svg>,
  globe: (p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2Z"/></svg>,
  building: (p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01M9 21V9M15 21V9M3 15h18"/></svg>,
}

export default function UserList({ search, filterCity }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // required by lab: useEffect + axios.get to JSONPlaceholder
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to fetch data. Please check your connection and try again.')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="skeleton-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ animationDelay: `${i*80}ms` }} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="state">
        <div className="state-icon" style={{ background: 'rgba(244,63,94,.10)', border:'1px solid rgba(244,63,94,.16)', color:'#e11d48' }}>⚠</div>
        <h3>Couldn&apos;t load users</h3>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => location.reload()}>↻ Retry</button>
        <div className="code-preview" style={{ textAlign:'left', marginTop:18 }}>
          <pre>{`// Required lab code (axios + useEffect)\nuseEffect(() => {\n  axios.get('https://jsonplaceholder.typicode.com/users')\n    .then(res => { setUsers(res.data); setLoading(false) })\n    .catch(() => { setError('Failed to fetch data.'); setLoading(false) })\n}, [])`}</pre>
        </div>
      </div>
    )
  }

  let filtered = users
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.address.city.toLowerCase().includes(q) ||
      u.company.name.toLowerCase().includes(q)
    )
  }
  if (filterCity && filterCity !== 'all') {
    filtered = filtered.filter(u => u.address.city === filterCity)
  }

  if (filtered.length === 0) {
    return (
      <div className="state">
        <div className="state-icon" style={{ background:'rgba(124,58,237,.08)', border:'1px solid rgba(124,58,237,.14)', color:'#7c3aed' }}>◍</div>
        <h3>No results</h3>
        <p>No users match “{search || filterCity}”. Try a different search or clear filters.</p>
        <button className="btn" onClick={()=>location.reload()}>Clear filters</button>
      </div>
    )
  }

  return (
    <div className="grid">
      {filtered.map((user, idx) => (
        <div key={user.id} className="user-card" style={{ animationDelay: `${idx * 45}ms` }}>
          <div className="card-head">
            <div className="avatar" style={{ background: GRADIENTS[idx % GRADIENTS.length] }}>
              {initials(user.name)}
            </div>
            <div className="card-name">
              <strong title={user.name}>{user.name}</strong>
              <span>@{user.username}</span>
            </div>
            <span className="card-badge">ID {String(user.id).padStart(2,'0')}</span>
          </div>

          <div className="card-body">
            <div className="row">
              <span className="icon-wrap"><Icons.mail /></span>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>
            <div className="row">
              <span className="icon-wrap"><Icons.map /></span>
              <span>{user.address.city} • {user.address.zipcode}</span>
            </div>
            <div className="row">
              <span className="icon-wrap"><Icons.phone /></span>
              <span>{user.phone}</span>
            </div>
            <div className="row">
              <span className="icon-wrap"><Icons.globe /></span>
              <a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a>
            </div>
            <div className="divider" />
            <div className="row" style={{ fontSize:'12.5px', color:'var(--text-muted)' }}>
              <span className="icon-wrap" style={{ width:28, height:28 }}><Icons.building /></span>
              <span style={{ lineHeight:1.45 }}><strong style={{ color:'var(--text-strong)' }}>{user.company.name}</strong> — {user.company.catchPhrase}</span>
            </div>
          </div>

          <div className="card-foot">
            <span className="tag tag-accent"><span className="tag-dot" />{user.address.city}</span>
            <span className="tag" title={user.company.bs}>{user.company.bs}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
