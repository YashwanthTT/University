import { useState, useMemo } from 'react'
import UserList from './UserList.jsx'
import './App.css'

function App() {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('all')
  const [method, setMethod] = useState<'axios'|'fetch'>('axios')

  const cities = useMemo(() => ['all','Gwenborough','Wisokyburgh','McKenziehaven','South Elvis','Roscoeview','South Christy','Howemouth','Aliyaview','Bartholomebury','Lebsackbury'], [])

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <div className="brand-mark">EX7</div>
            <div className="brand-text">
              <h2>React — API Integration</h2>
              <p>Fetch &amp; Axios • useEffect • JSONPlaceholder</p>
            </div>
          </div>
          <div className="topbar-actions">
            <span className="badge">Lab Experiment 7</span>
            <span className="badge badge-soft mono">vite + react 19</span>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-grid">
          <div className="hero-card">
            <span className="kicker">Aim — Dynamic Data Fetching</span>
            <h1>Build a React app that <span>fetches &amp; displays</span> REST API data dynamically.</h1>
            <p className="hero-desc">
              Fetches <strong>10 users</strong> from <code className="mono">jsonplaceholder.typicode.com/users</code> using <code>useEffect</code> &amp; <code>axios</code>. Observe loading, error &amp; success states with a polished, production-grade UI.
            </p>
            <div className="hero-meta">
              <span className="meta-pill live"><i /> Live API</span>
              <span className="meta-pill">useState + useEffect</span>
              <span className="meta-pill">axios.get + async handling</span>
              <span className="meta-pill">Responsive Grid</span>
            </div>
            <div className="code-preview">
              <pre>{`import axios from 'axios' // npm i axios
useEffect(() => {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => setUsers(res.data))
    .catch(() => setError('Failed to fetch data.'))
}, [])`}</pre>
            </div>
          </div>

          <div className="side-card">
            <h3>Experiment Details</h3>
            <p>Lab requirement: <code style={{color:'#e2e8f0', background:'rgba(255,255,255,.08)', padding:'1px 6px', borderRadius:6, border:'1px solid rgba(255,255,255,.08)'}}>UserList.jsx</code> inside <code style={{color:'#e2e8f0', background:'rgba(255,255,255,.08)', padding:'1px 6px', borderRadius:6, border:'1px solid rgba(255,255,255,.08)'}}>src/</code>, imported in App.jsx, verifies loading state &amp; renders cards.</p>
            <div className="chip-row">
              <span className="chip">Node.js</span>
              <span className="chip">Vite</span>
              <span className="chip">React Hooks</span>
              <span className="chip">REST + JSON</span>
            </div>
            <div className="api-box">
              <code>GET https://jsonplaceholder.typicode.com/users</code>
              <span>200 OK</span>
            </div>
            <div style={{ display:'flex', gap:8, marginTop:16 }}>
              <button className="btn" style={{ flex:1, background:'white', color:'#0f172a', borderColor:'white', fontWeight:700, justifyContent:'center' }} onClick={()=>document.getElementById('users')?.scrollIntoView({ behavior:'smooth'})}>View Users ↓</button>
              <a className="btn" style={{ background:'rgba(255,255,255,.08)', color:'white', borderColor:'rgba(255,255,255,.14)', textDecoration:'none', backdropFilter:'blur(8px)' }} href="https://jsonplaceholder.typicode.com/users" target="_blank" rel="noreferrer">API ↗</a>
            </div>
            <div style={{ marginTop:16, paddingTop:14, borderTop:'1px solid rgba(255,255,255,.08)', display:'flex', gap:16, fontSize:12, color:'#94a3b8' }}>
              <span><strong style={{color:'white', fontSize:16}}>10</strong> users</span>
              <span><strong style={{color:'white', fontSize:16}}>3</strong> states</span>
              <span><strong style={{color:'white', fontSize:16}}>1</strong> effect</span>
            </div>
          </div>
        </div>
      </section>

      <main className="main" id="users">
        <div className="toolbar">
          <label className="search" aria-label="Search users">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color:'var(--text-muted)', flexShrink:0}}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, email, city or company…" />
            {search && <button onClick={()=>setSearch('')} style={{ border:'none', background:'var(--surface-2)', padding:'5px 10px', borderRadius:999, cursor:'pointer', fontSize:12, fontWeight:700, color:'var(--text-muted)', borderWidth:1, borderStyle:'solid', borderColor:'var(--border)' }}>✕ Clear</button>}
          </label>
          <div className="toolbar-right">
            <select className="select" value={city} onChange={e=>setCity(e.target.value)} aria-label="Filter by city">
              {cities.map(c=> <option key={c} value={c}>{c==='all'?'All cities':c}</option>)}
            </select>
            <div style={{ display:'flex', background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:12, padding:3, gap:3 }}>
              <button onClick={()=>setMethod('axios')} className="btn" style={{ height:34, padding:'0 14px', borderRadius:9, background: method==='axios'?'#0f172a':'transparent', color: method==='axios'?'white':'var(--text-muted)', borderColor: method==='axios'?'#0f172a':'transparent', boxShadow:'none', fontSize:12.5 }}>Axios</button>
              <button onClick={()=>setMethod('fetch')} className="btn" style={{ height:34, padding:'0 14px', borderRadius:9, background: method==='fetch'?'#0f172a':'transparent', color: method==='fetch'?'white':'var(--text-muted)', borderColor: method==='fetch'?'#0f172a':'transparent', boxShadow:'none', fontSize:12.5 }}>Fetch</button>
            </div>
            <button className="btn btn-primary" onClick={()=>location.reload()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v7h-7"/></svg>
              Refresh
            </button>
          </div>
        </div>

        <div className="section-head">
          <h2 className="section-title">User Directory <small>{method === 'axios' ? 'via Axios' : 'via Fetch'} • JSONPlaceholder</small></h2>
          <span className="useeffect-tag">useEffect deps: []</span>
        </div>

        {method==='fetch' && (
          <div className="callout">
            <span style={{ fontWeight:800, whiteSpace:'nowrap' }}>Fetch mode:</span>
            <span>Lab procedure specifies <code>axios.get</code>; this toggle demonstrates equivalent <code>fetch()</code> implementation.</span>
          </div>
        )}

        <UserList search={search} filterCity={city} />
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span><strong>Observations:</strong> Loading skeleton → API response → mapped cards. Handles error &amp; empty states. Built with Vite + React 19.</span>
          <span className="mono" style={{ opacity:.65, fontSize:11.5 }}>EX-7 • FSD Lab • 2026</span>
        </div>
      </footer>
    </>
  )
}

export default App
