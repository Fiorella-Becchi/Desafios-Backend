import { Router } from "express";

const router = Router();
const carts = [];

// Ruta para crear un nuevo carrito
router.post("/", (req, res) => {
    try {
        const newCart = {
            id: generateUniqueId(), // Generar un ID único para el carrito
            products: []
        };
        carts.push(newCart);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta para listar productos del carrito por ID de carrito
router.get("/:cid", (req, res) => {
    const { cid } = req.params;
    const cart = carts.find(cart => cart.id === cid);
    if (!cart) {
        return res.status(404).json({ message: "Carrito no encontrado" });
    }
    res.json(cart.products);
});

// Ruta para agregar un producto al carrito por ID de carrito y ID de producto
router.post("/:cid/product/:pid", (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    // Buscar el carrito correspondiente
    const cart = carts.find(cart => cart.id === cid);
    if (!cart) {
        return res.status(404).json({ message: "Carrito no encontrado" });
    }

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.products.find(product => product.id === pid);
    if (existingProduct) {
        existingProduct.quantity += parseInt(quantity);
    } else {
        cart.products.push({ id: pid, quantity: parseInt(quantity) });
    }

    res.status(201).json(cart);
});

// Función para generar un ID único para el carrito
function generateUniqueId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}










export default router;