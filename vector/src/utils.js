function cosineSimilarity(vec1, vec2) {
  const dot = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const norm1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
  const norm2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
  console.log(dot, norm1, norm2, vec1.length, vec2.length);
  return dot / (norm1 * norm2);
}

module.exports = { cosineSimilarity };
