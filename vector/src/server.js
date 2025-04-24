const express = require('express');
const db = require('./db');
const { cosineSimilarity } = require('./utils');

const app = express();
const port = 3000;

app.get('/search', (req, res) => {
  const vecStr = req.query.vec;
  if (!vecStr) return res.status(400).json({ error: 'Missing query ?vec=[1,2,3,...]' });

  let queryVector;
  try {
    queryVector = JSON.parse(vecStr);
    if (!Array.isArray(queryVector)) throw new Error();
  } catch {
    return res.status(400).json({ error: 'Invalid vector format. Must be JSON array.' });
  }

  const rows = db.prepare('SELECT * FROM components').all();
  const ranked = rows.map(row => {
    const vec = JSON.parse(row.vector);
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      props: JSON.parse(row.props_json),
      score: cosineSimilarity(queryVector, vec),
    };
  }).sort((a, b) => b.score - a.score);

  res.json(ranked.slice(0, 5));
});

app.listen(port, () => {
  console.log(`🚀 Vector search server running at http://localhost:${port}`);
});
