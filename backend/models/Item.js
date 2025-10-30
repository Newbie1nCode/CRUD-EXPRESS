// backend/models/Item.js
const db = require('../config/db');

const Item = {
  getAll: (callback) => {
    db.query('SELECT * FROM ITEMS', callback);
  },
  create: (itemData, callback) => {
    const { name, quantity, price } = itemData; 
    db.query(
      'INSERT INTO ITEMS (name, quantity, price) VALUES (?, ?, ?)', 
      [name, quantity, price],
      callback
    );
  },
  update: (id, itemData, callback) => {
    const { name, quantity, price } = itemData; 
    db.query(
      'UPDATE ITEMS SET name = ?, quantity = ?, price = ? WHERE id = ?',
      [name, quantity, price, id], 
      callback
    );
  },
  delete: (id, callback) => {
    db.query(
      'DELETE FROM ITEMS WHERE id = ?', 
      [id],
      callback
    );
  }
};

module.exports = Item;