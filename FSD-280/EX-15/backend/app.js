require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5001;
const frontendOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({ origin: frontendOrigin }));
app.use(express.json({ limit: '1mb' }));

const documentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    source: { type: String, required: true, maxlength: 500000 },
  },
  { timestamps: true }
);

documentSchema.index({ name: 1 }, { unique: true });
const Document = mongoose.model('Document', documentSchema);

const completions = [
  { label: '#set page', insertText: '#set page(\n  paper: "a4",\n  margin: 2cm,\n)', detail: 'Page configuration' },
  { label: '#set text', insertText: '#set text(font: "Libertinus Serif", size: 11pt)', detail: 'Text styling' },
  { label: '#set par', insertText: '#set par(justify: true)', detail: 'Paragraph styling' },
  { label: '#show', insertText: '#show ', detail: 'Show rule' },
  { label: '#let', insertText: '#let name = ', detail: 'Define a function or value' },
  { label: '#align', insertText: '#align(center)[\n  \n]', detail: 'Alignment block' },
  { label: '#block', insertText: '#block[\n  \n]', detail: 'Block container' },
  { label: '#table', insertText: '#table(\n  columns: 2,\n  [Header], [Value],\n)', detail: 'Table' },
  { label: '#figure', insertText: '#figure(\n  image("image.png"),\n  caption: [Caption],\n)', detail: 'Figure' },
  { label: '#pagebreak', insertText: '#pagebreak()', detail: 'Start a new page' },
  { label: '#theorem', insertText: '#theorem[\n  \n]', detail: 'Theorem block' },
  { label: '#proof', insertText: '#proof[\n  \n]', detail: 'Proof block' },
  { label: '#quote', insertText: '#quote[\n  \n]', detail: 'Quote block' },
  { label: '#bibliography', insertText: '#bibliography("references.bib")', detail: 'Bibliography' },
  { label: 'heading', insertText: '= ', detail: 'Heading' },
  { label: 'display math', insertText: '$\n  \n$', detail: 'Display equation' },
];

const validateDocument = (source) => {
  const diagnostics = [];
  const stack = [];
  source.split('\n').forEach((line, index) => {
    [...line].forEach((character) => {
      if (character === '[') stack.push(index + 1);
      if (character === ']' && !stack.pop()) {
        diagnostics.push({ line: index + 1, severity: 'error', message: 'Unexpected closing bracket.' });
      }
    });
  });
  stack.forEach((line) => diagnostics.push({ line, severity: 'error', message: 'Unclosed content block.' }));
  return diagnostics.slice(0, 20);
};

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'typster-api', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.get('/api/autocomplete', (req, res) => {
  const query = String(req.query.q || '').toLowerCase();
  res.json(completions.filter((item) => !query || item.label.toLowerCase().includes(query)).slice(0, 20));
});

app.post('/api/compile', (req, res) => {
  const source = typeof req.body?.source === 'string' ? req.body.source : '';
  if (!source) return res.status(400).json({ message: 'source is required' });
  res.json({ ok: validateDocument(source).length === 0, diagnostics: validateDocument(source), source });
});

app.get('/api/documents', async (_req, res) => {
  try {
    res.json(await Document.find({}, 'name source createdAt updatedAt').sort({ updatedAt: -1 }).lean());
  } catch (error) {
    res.status(503).json({ message: 'Document storage is unavailable.', detail: error.message });
  }
});

app.get('/api/documents/:name', async (req, res) => {
  try {
    const document = await Document.findOne({ name: req.params.name }).lean();
    if (!document) return res.status(404).json({ message: 'Document not found.' });
    res.json(document);
  } catch (error) {
    res.status(503).json({ message: 'Document storage is unavailable.', detail: error.message });
  }
});

app.put('/api/documents/:name', async (req, res) => {
  const source = typeof req.body?.source === 'string' ? req.body.source : null;
  if (source === null) return res.status(400).json({ message: 'source is required' });
  try {
    const document = await Document.findOneAndUpdate(
      { name: req.params.name },
      { name: req.params.name, source },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).lean();
    res.json(document);
  } catch (error) {
    res.status(400).json({ message: 'Unable to save document.', detail: error.message });
  }
});

app.delete('/api/documents/:name', async (req, res) => {
  try {
    const result = await Document.deleteOne({ name: req.params.name });
    if (!result.deletedCount) return res.status(404).json({ message: 'Document not found.' });
    res.status(204).end();
  } catch (error) {
    res.status(503).json({ message: 'Document storage is unavailable.', detail: error.message });
  }
});

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/typster')
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error.message));

if (require.main === module) app.listen(PORT, () => console.log(`Typster API listening on port ${PORT}`));
module.exports = app;
