const express = require('express');
const cors = require('cors');
const itemRoutes = require('./routes/ItemRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


app.use('/api/items', itemRoutes);

app.listen(PORT, () => {
    console.log(`Server Sedang Berjalan http://localhost:${PORT}`)
})
