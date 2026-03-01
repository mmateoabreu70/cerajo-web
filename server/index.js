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
app.get('/api/productos', async (req, res) => {
  const q = (req.query.q || "").trim().toLowerCase();
  const limit = Number(req.query.limit ?? 24);
  const page = Number(req.query.page ?? 1);

  const featured = req.query.featured === "1";
  const discount = req.query.discount === "1";
  const category = (req.query.category || "").trim().toLowerCase();
  const brand = (req.query.brand || "").trim().toLowerCase();

  //Lista base
  let list = [...productos];

  //filtros
  if (discount) {
    list = list.filter(p => p.discount || (p.oldPrice && p.oldPrice > p.price));
  }

  if (category) {
    list = list.filter(p => (p.category || "").toLowerCase() === category);
  }

  if (brand) {
    list = list.filter(p => (p.brand || "").toLowerCase() === brand);
  }

  if (q) {
    list = list.filter(p => {
      const haystack = [
        p.name, p.category, p.brand, p.description
      ]
      .filter(Boolean)
      .join("")
      .toLowerCase();

      return haystack.includes(q);
    });
  }

  if (featured) {
    list = list.map(p => {
      const hasDiscount = p.discount || (p.oldPrice && p.oldPrice > p.price);
      const score = (p.isNew ? 3 : 0) + (hasDiscount ? 2 : 0);
      return { ...p, _score: score };
    })
    .sort((a, b) => b._score - a._score || a.id - b.id);
  }

  const start = (page - 1) * limit;
  const items = list.slice(start, start + limit);

  res.json({
    items,
    total: list.length,
    page,
    limit,
    totalPages: Math.ceil(list.length / limit),
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