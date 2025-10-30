const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Simpan data sementara di memori (untuk demo)
let items = [];
let nextId = 1;

// GET semua item
app.get('/api/items', (req, res) => {
  res.json(items);
});

// POST tambah item
app.post('/api/items', (req, res) => {
  const { name, quantity, price } = req.body;
  if (!name || quantity == null || price == null) {
    return res.status(400).json({ error: 'Semua field wajib diisi' });
  }
  const newItem = { id: nextId++, name, quantity: Number(quantity), price: Number(price) };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT /api/items/:id → update item
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, quantity, price } = req.body;

  if (!name || quantity == null || price == null) {
    return res.status(400).json({ error: 'Semua field wajib diisi' });
  }

  const itemIndex = items.findIndex(item => item.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item tidak ditemukan' });
  }

  items[itemIndex] = {
    id,
    name,
    quantity: Number(quantity),
    price: Number(price)
  };

  res.json(items[itemIndex]);
});



// DELETE item
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(item => item.id !== id);
  res.status(204).send();
});

// Fallback ke index.html untuk SPA
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server jalan di http://localhost:${PORT}`);
});