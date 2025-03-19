document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');

    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(productForm);
        const name = formData.get('name');
        const price = formData.get('price');
        const imageUrl = formData.get('imageUrl');

        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, price, imageUrl })
        });

        if (response.ok) {
            alert('Product added successfully');
            productForm.reset();
            fetchProducts();
        } else {
            alert('Failed to add product');
        }
    });

    async function fetchProducts() {
        const response = await fetch('/api/products');
        const products = await response.json();
        productList.innerHTML = products.map(product => `
            <div class="item">
                <img src="${product.imageUrl}" alt="${product.name}" style="width:100px;height:100px;">
                <h2>${product.name}</h2>
                <p>Price: $${product.price}</p>
                <button onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        `).join('');
    }

    window.deleteProduct = async (id) => {
        const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Product deleted successfully');
            fetchProducts();
        } else {
            alert('Failed to delete product');
        }
    };

    fetchProducts();
});