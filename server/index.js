const express = require('express');
const cors = require('cors');
const app = express();
const products = require("./product-list.json");

//Middlewares
app.use(cors());
app.use(express.json());

let productos = products;

const DEFAULT_LIMIT = 24;
const MAX_LIMIT = 48;

function parsePositiveInt(value, fallback, max) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return Math.min(parsed, max);
}

function hasDiscount(product) {
  return Boolean(product.discount || (product.oldPrice && product.oldPrice > product.price));
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

//Productos Route

// GET
app.get('/api/productos', async (req, res) => {
  const q = normalize(req.query.q);
  const limit = parsePositiveInt(req.query.limit, DEFAULT_LIMIT, MAX_LIMIT);
  const page = parsePositiveInt(req.query.page, 1, Number.MAX_SAFE_INTEGER);

  const featured = req.query.featured === "1";
  const discount = req.query.discount === "1";
  const category = normalize(req.query.category);
  const brand = normalize(req.query.brand);

  //Lista base
  let list = [...productos];

  //filtros
  if (discount) {
    list = list.filter(hasDiscount);
  }

  if (category) {
    list = list.filter(p => normalize(p.category) === category);
  }

  if (brand) {
    list = list.filter(p => normalize(p.brand) === brand);
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
      const score = (p.isNew ? 3 : 0) + (hasDiscount(p) ? 2 : 0);
      return { ...p, _score: score };
    })
    .sort((a, b) => b._score - a._score || a.id - b.id)
    .map(({ _score, ...p }) => p);
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

app.get('/api/productos/:id', (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const product = productos.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  return res.json(product);
});

// POST
app.post('/api/productos', (req, res) => {
  if (process.env.ENABLE_PRODUCT_POST !== "1") {
    return res.status(403).json({ message: "Creacion de productos no habilitada" });
  }

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
