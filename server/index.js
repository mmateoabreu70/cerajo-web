const express = require('express');
const cors = require('cors');
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

let productos = [
  {
    id: 1,
    nombre: "Jarrón Oriental Aislado"
    imagen: "https://tse1.mm.bing.net/th/id/OIP.17r0rFVZ0cknykbsEx3GAAHaHa?pid=Api",
    ambient: "https://tse3.mm.bing.net/th/id/OIP.Ispe_D5DN3_Gr4KGBAJItgHaLH?pid=Api"
  },
  {
    id: 2,
    nombre: "Conjunto Cerámico Blanco",
    imagen: "https://tse2.mm.bing.net/th/id/OIP.t3yT89sNdtJKp6Co1em_ygHaHa?pid=Api",
    ambient: "https://tse1.mm.bing.net/th/id/OIP.17r0rFVZ0cknykbsEx3GAAHaHa?pid=Api"
  }
];


//Productos Route

// GET
app.get('/api/productos', (req, res) => {
  res.json(productos);
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