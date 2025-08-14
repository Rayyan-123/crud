export class UI {
    constructor(productManager) {
        this.productManager = productManager;
        this.editMode = false;
        this.currentEditId = null;
        
        // Get DOM elements
        this.form = document.getElementById('productForm');
        this.nameInput = document.getElementById('productName');
        this.priceInput = document.getElementById('productPrice');
        this.quantityInput = document.getElementById('productQuantity');
        this.submitBtn = document.getElementById('submitBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.tableBody = document.getElementById('productsTableBody');

        // Bind event listeners
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.resetBtn.addEventListener('click', this.resetForm.bind(this));

        // Initial render
        this.renderProducts();
    }

    // Handle form submission
    handleSubmit(event) {
        event.preventDefault();
        try {
            const name = this.nameInput.value;
            const price = Number(this.priceInput.value);
            const quantity = Number(this.quantityInput.value);

            if (this.editMode) {
                this.productManager.updateProduct(this.currentEditId, name, price, quantity);
                this.editMode = false;
                this.currentEditId = null;
                this.submitBtn.textContent = 'Add Product';
            } else {
                this.productManager.createProduct(name, price, quantity);
            }

            this.resetForm();
            this.renderProducts();
        } catch (error) {
            alert(error.message);
        }
    }

    // Reset form
    resetForm() {
        this.form.reset();
        this.editMode = false;
        this.currentEditId = null;
        this.submitBtn.textContent = 'Add Product';
    }

    // Render products table
    renderProducts() {
        this.tableBody.innerHTML = '';
        const products = this.productManager.getAllProducts();
        
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>${product.quantity}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${product.id}">Edit</button>
                    <button class="action-btn delete-btn" data-id="${product.id}">Delete</button>
                </td>
            `;

            // Add event listeners for edit and delete buttons
            row.querySelector('.edit-btn').addEventListener('click', () => this.handleEdit(product.id));
            row.querySelector('.delete-btn').addEventListener('click', () => this.handleDelete(product.id));

            this.tableBody.appendChild(row);
        });
    }

    // Handle edit button click
    handleEdit(id) {
        const product = this.productManager.getProduct(id);
        if (product) {
            this.nameInput.value = product.name;
            this.priceInput.value = product.price;
            this.quantityInput.value = product.quantity;
            this.editMode = true;
            this.currentEditId = id;
            this.submitBtn.textContent = 'Update Product';
        }
    }

    // Handle delete button click
    handleDelete(id) {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                this.productManager.deleteProduct(id);
                this.renderProducts();
            } catch (error) {
                alert(error.message);
            }
        }
    }
}
