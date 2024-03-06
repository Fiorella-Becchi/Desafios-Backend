import express from "express";
import { productManager } from "./src/productManager.js";



const app = express();
const PORT = 8080;
const PJ = './src/productos.json';
const PM = new productManager(PJ);

app.use(express.urlencoded({ extended: true }));

//app.get('/bienvenida', async (req, res) => {
//   res.send('<h1 style="color: black;">Bienvenidos!</h1>');
//});

//Carga de products.json con limite de resultados.
app.get('/products', async (req, res) => {
    try {
        let limit = req.query.limit;

        const products = await PM.getProducts(limit);
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//Devuelve producto solicitado.
app.get('/products/:pid', async (req, res) => {
    try {
        let productId = parseInt(req.params.pid);

        const products = await PM.getProductById(productId);
        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


//Servidor
app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});


