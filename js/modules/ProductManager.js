import { Product, validateProduct } from './Product.js';

export class ProductManager {
    constructor() {
        this.products = this.loadProducts();
    }

    // Load products from localStorage
    loadProducts() {
        const storedProducts = localStorage.getItem('products');
        return storedProducts ? JSON.parse(storedProducts) : [];
    }

    // Save products to localStorage
    saveProducts() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    // Create new product
    createProduct(name, price, quantity) {
        validateProduct(name, price, quantity);
        const id = Date.now().toString();
        const product = new Product(id, name, price, quantity);
        this.products.push(product);
        this.saveProducts();
        return product;
    }

    // Read all products
    getAllProducts() {
        return this.products;
    }

    // Read single product
    getProduct(id) {
        return this.products.find(product => product.id === id);
    }

    // Update product
    updateProduct(id, name, price, quantity) {
        validateProduct(name, price, quantity);
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        this.products[index] = new Product(id, name, price, quantity);
        this.saveProducts();
        return this.products[index];
    }

    // Delete product
    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        this.products.splice(index, 1);
        this.saveProducts();
    }
}
