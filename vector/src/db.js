const Database = require('better-sqlite3');
const db = new Database('components.db');

// 创建组件表
db.exec(`
CREATE TABLE IF NOT EXISTS components (
  id TEXT PRIMARY KEY,
  name TEXT,
  description TEXT,
  preview_url TEXT,
  structure_json TEXT,
  vector TEXT
);
`);

// 创建 props 参数表
db.exec(`
CREATE TABLE IF NOT EXISTS props (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  component_id TEXT,
  name TEXT,
  type TEXT,
  description TEXT,
  required INTEGER,
  FOREIGN KEY (component_id) REFERENCES components(id)
);
`);

module.exports = db;
