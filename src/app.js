import express from "express";
import { productManager } from './productManager.js';
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";

const app = express();

const PJ = './data/productos.json';
const PM = new productManager(PJ);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));

//Use Routers
app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);



//motor de plantillas
app.engine("handlebars", handlebars.engine());
//ruta de vistas
app.set("views", `${__dirname}/views`);
//motor de renderizado
app.set("view engine", "handlebars");

/*app.get("/", (req, res) => {
    const dynamicName = req.query.name ?? "Usuario";
    res.render(
        "index",
        {
            title: "Desafio 4",
            name: dynamicName
        }
    )
});*/

//servidor estatico
app.use(express.static(`${__dirname}/public`));

app.use("/", viewsRouter);
// Servidor
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});


//Websocket 
const socketServer = new Server(httpServer);

socketServer.on("connection", socket => {
    console.log("Nuevo cliente conectado"); 

    socket.on("message", data => {
        console.log("Recibi el dato: ", data);
    })
});