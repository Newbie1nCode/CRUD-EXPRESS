// backend/routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items
router.get('/', (req, res) => {
  Item.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST new item
router.post('/', (req, res) => {
  Item.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

// PUT update item
router.put('/:id', (req, res) => {
  Item.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item updated' });
  });
});

// DELETE item
router.delete('/:id', (req, res) => {
  Item.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
  });
});

module.exports = router;