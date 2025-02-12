const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("./orders.db", (err) => {
  if (err) console.error("Database connection error:", err.message);
  else console.log("Connected to SQLite database.");
});

// Create table
db.run(
  `CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    menuItem TEXT,
    price REAL,
    status TEXT
  )`
);

// Add an order
app.post("/orders", (req, res) => {
  const { menuItem, price, status } = req.body;
  db.run(`INSERT INTO orders (menuItem, price, status) VALUES (?, ?, ?)`,
    [menuItem, price, status], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, menuItem, price, status });
    });
});

// Get orders
app.get("/orders", (req, res) => {
  db.all(`SELECT * FROM orders`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Update order status
app.put("/orders/:id", (req, res) => {
  const { status } = req.body;
  db.run(`UPDATE orders SET status = ? WHERE id = ?`, [status, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// Delete an order
app.delete("/orders/:id", (req, res) => {
  db.run(`DELETE FROM orders WHERE id = ?`, req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
