const db = require("../config/database");

class OrderModel {
  static create({ menuItem, price, status }, callback) {
    db.run(
      `INSERT INTO orders (menuItem, price, status) VALUES (?, ?, ?)`,
      [menuItem, price, status],
      function (err) {
        callback(err, { id: this.lastID, menuItem, price, status });
      }
    );
  }

  static getAll(callback) {
    db.all(`SELECT * FROM orders`, [], callback);
  }

  static updateStatus(id, status, callback) {
    db.run(`UPDATE orders SET status = ? WHERE id = ?`, [status, id], function (err) {
      callback(err, { updated: this.changes });
    });
  }

  static delete(id, callback) {
    db.run(`DELETE FROM orders WHERE id = ?`, id, function (err) {
      callback(err, { deleted: this.changes });
    });
  }
}

module.exports = OrderModel;
// The OrderModel class interacts with the database to perform CRUD operations on orders. The class methods are used to create, read, update, and delete orders.