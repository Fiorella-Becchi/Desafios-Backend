import fs from "fs";

export class productManager {
    constructor(filePath) {
        this.path = filePath;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data, 'utf-8');
    }

    getAllProducts() {
        return this.products;
    }

    getProductById(productId) {
        return this.products.find(product => product.id === productId);
    }

    addProduct(productData) {
        const newProduct = {
            id: this.generateUniqueId(),
            status: true,
            ...productData
        };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    updateProduct(productId, newData) {
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...newData };
            this.saveProducts();
            return this.products[index];
        } else {
            throw new Error('Producto no encontrado');
        }
    }

    deleteProduct(productId) {
        this.products = this.products.filter(product => product.id !== productId);
        this.saveProducts();
    }

    generateUniqueId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}