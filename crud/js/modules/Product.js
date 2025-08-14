// Product class definition
export class Product {
    constructor(id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

// Product validation
export function validateProduct(name, price, quantity) {
    if (!name || name.trim() === '') {
        throw new Error('Product name is required');
    }
    if (price <= 0) {
        throw new Error('Price must be greater than 0');
    }
    if (quantity < 0) {
        throw new Error('Quantity cannot be negative');
    }
    return true;
}
