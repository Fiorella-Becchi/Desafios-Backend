import fs from "fs";

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.id = 0;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            this.id = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
        } catch (error) {
            this.products = [];
            this.id = 0;
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data, 'utf-8');
    }

    addProduct(title, description, price, image, code, stock) {
        const existingProduct = this.products.find(product => product.code === code);

        if (existingProduct) {
            console.log(`Código repetido: ${code}`);
        } else {
            const newProduct = {
                title,
                description,
                price,
                image,
                code,
                stock,
                id: ++this.id,
            };

            if (!Object.values(newProduct).includes(undefined)) {
                this.products.push(newProduct);
                this.saveProducts();
            } else {
                console.log("Se requieren todos los campos");
            }
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const foundProduct = this.products.find(product => product.id === id);
        if (foundProduct) {
            console.log(foundProduct);
        } else {
            console.log("Not Found");
        }
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            if ('id' in updatedFields) {
                console.log("No se puede modificar el ID");
                return;
            }
            this.products[index] = { ...this.products[index], ...updatedFields };
            this.saveProducts();
        }
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.saveProducts();
    }
}

// Ejemplo de uso
const productos = new ProductManager('productos.json');

// Agregar productos
productos.addProduct('Paris', 'Viaje turístico', 500, '../francia.jpg', 'F', 20);
productos.addProduct('Lisboa', 'Viaje estudiantil', 700, '../portugal.jpg', 'L', 40);
productos.addProduct('Bruselas', 'Viaje cultural', 900, '../belgica.jpg', 'B', 60);

// Obtener todos los productos
console.log('Todos los productos:', productos.getProducts());

// Si el 'code' se repite
productos.addProduct('Bruselas', 'Viaje cultural', 900, 'img3', 'L', 60);

// Obtener producto por ID
productos.getProductById(1);

// Obtener NOT FOUND por ID inexistente
productos.getProductById(5);

// Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto
// Se evaluará que no se elimine el id y que sí se haya hecho la actualización.
const productIdToUpdate = 1;
console.log('Antes de la actualización:', productos.getProducts());
productos.updateProduct(productIdToUpdate, { price: 250 });
console.log('Después de la actualización:', productos.getProducts());

// Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto
// o que arroje un error en caso de no existir.
const productIdToDelete = 1;
console.log('Antes de la eliminación:', productos.getProducts());
productos.deleteProduct(productIdToDelete);
console.log('Después de la eliminación:', productos.getProducts());