import { Link, useNavigate } from 'react-router-dom';

const documents = [
  { name: 'main.typ', title: 'Project Brief', updated: 'Edited just now', size: '1.2 KB' },
  { name: 'resume.typ', title: 'Resume', updated: 'Yesterday', size: '3.8 KB' },
  { name: 'notes.typ', title: 'Meeting Notes', updated: 'Oct 6, 2026', size: '2.1 KB' },
];

export default function FilesPage() {
  const navigate = useNavigate();

  const createDocument = () => {
    localStorage.removeItem('typst-document');
    navigate('/editor');
  };

  return (
    <main className="files-page">
      <header className="topbar">
        <Link className="brand" to="/editor">
          <div className="brand-mark">T</div>
          <span>Typst<span className="brand-muted">er</span></span>
          <span className="beta-pill">BETA</span>
        </Link>
        <div className="topbar-actions"><Link className="files-link active-link" to="/files">All files</Link><div className="avatar">Y</div></div>
      </header>
      <section className="files-content">
        <div className="files-header">
          <div><p className="eyebrow">WORKSPACE</p><h1>All files</h1><p className="files-subtitle">Your Typst documents in one place.</p></div>
          <button className="new-file-button" onClick={createDocument}>+ New document</button>
        </div>
        <div className="files-table">
          <div className="files-table-heading"><span>Name</span><span>Last edited</span><span>Size</span><span /></div>
          {documents.map((document) => (
            <button className="file-card" key={document.name} onClick={() => navigate('/editor')}>
              <span className="file-card-name"><span className="large-file-icon">▤</span><span><strong>{document.title}</strong><small>{document.name}</small></span></span>
              <span>{document.updated}</span><span>{document.size}</span><span className="file-open">Open →</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
