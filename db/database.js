const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./toko.db");

db.serialize(() => {
  // Produk
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price INTEGER
    )
  `);

  // Stock
  db.run(`
    CREATE TABLE IF NOT EXISTS stocks (
      product_id INTEGER,
      qty INTEGER
    )
  `);

  // Pembelian
  db.run(`
    CREATE TABLE IF NOT EXISTS purchases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER,
      qty INTEGER,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
