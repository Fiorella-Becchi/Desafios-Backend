import express from "express";
import { productManager } from './src/productManager.js';
import productsRouter from "./src/routes/products.router.js";
import cartRouter from "./src/routes/carts.router.js";


const app = express();

const PJ = './data/productos.json';
const PM = new productManager(PJ);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use('/static', express.static('public'));

//Use Routers
app.use('/api/carts/', cartRouter);
app.use('./api/products/', productsRouter);

// Servidor
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});