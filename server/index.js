const express = require('express');
const cors = require('cors');
const app = express();
const products = require("./product-list.json");

//Middlewares
app.use(cors());
app.use(express.json());

let productos = products;

//Productos Route

// GET
app.get('/api/productos', (req, res) => {
  const limit = Number(req.query.limit ?? 24);
  const page = Number(req.query.page ?? 1); // 1-based
  const start = (page - 1) * limit;

  const items = productos.slice(start, start + limit);

  res.json({
    items,
    total: productos.length,
    page,
    limit,
    totalPages: Math.ceil(productos.length / limit),
  });
});

// POST
app.post('/api/productos', (req, res) => {
  const nuevo = req.body;
  nuevo.id = productos.length + 1;
  productos.push(nuevo);
  res.status(201).json(nuevo);
})

// Test Route
app.get('/api/ping', (req, res) => {
  res.send('pong');
});

//Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { 
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});