const db = require('./db');
const { cosineSimilarity } = require('./utils');
const { generateVector } =require('./generateVector')

const queryByInput = async(input) => {
  const rows = db.prepare('SELECT * FROM components').all();
  const queryVector = await generateVector(input)

  const ranked = rows.map(row => {
    const vec = JSON.parse(row.vector);
    return {
      ...row,
      score: cosineSimilarity(queryVector, vec),
    };
  }).sort((a, b) => b.score - a.score);

  ranked.slice(0, 3).forEach(r => {
    console.log(`${r.name} (score: ${r.score})`);
  });

  return ranked
}

queryByInput('组件功能: 加载按钮')



