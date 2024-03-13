import { Router } from "express";
import { productManager } from "../productManager.js";

const router = Router();

const PJ = './data/productos.json';
const PM = new productManager(PJ);



// Ruta para listar todos los productos
router.get("/", async (req, res) => {
    try {
        const productList = await PM.getAllProducts();
        res.json(productList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });


 // Ruta para obtener un producto por ID
router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await PM.getProductById(pid);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para agregar un nuevo producto
router.post("/", async (req, res) => {
    const productData = req.body;
    try {
        const newProduct = await PM.addProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta para actualizar un producto por ID
router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const productData = req.body;
    try {
        const updatedProduct = await PM.updateProduct(pid, productData);
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta para eliminar un producto por ID
router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        await PM.deleteProduct(pid);
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
 





  export default router; 