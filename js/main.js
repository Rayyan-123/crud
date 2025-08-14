import { ProductManager } from './modules/ProductManager.js';
import { UI } from './modules/UI.js';

// Initialize the application
const productManager = new ProductManager();
const ui = new UI(productManager);
