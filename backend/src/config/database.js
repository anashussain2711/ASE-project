const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./orders.db", (err) => {
  if (err) console.error("Database connection error:", err.message);
  else console.log("Connected to SQLite database.");
});

db.run(
  `CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    menuItem TEXT,
    price REAL,
    status TEXT
  )`
);

module.exports = db;
// The database connection is established and the orders table is created. The database connection is exported to be used in other files.