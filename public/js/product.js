let currentProduct = null;

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        window.location.href = 'products.html';
        return;
    }

    const products = await fetchProducts();
    currentProduct = products.find(p => p.id === productId);

    if (currentProduct) {
        renderProductDetails(currentProduct);
    } else {
        document.getElementById('product-details-container').innerHTML = '<h2>Product not found.</h2>';
    }
});

function renderProductDetails(product) {
    const container = document.getElementById('product-details-container');
    
    // Generate Specifications HTML
    let specsHtml = '';
    if (product.specifications) {
        specsHtml = Object.entries(product.specifications).map(([key, value]) => `
            <div class="spec-item">
                <span class="spec-label">${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</span>
                <span class="spec-value">${value}</span>
            </div>
        `).join('');
    }

    container.innerHTML = `
        <div class="product-gallery">
            <div class="floating-orb" style="width: 400px; height: 400px; top: 10%;"></div>
            <img src="${product.image}" alt="${product.name}" class="main-image">
        </div>
        <div class="product-info-detailed">
            <div class="product-breadcrumbs">
                <a href="products.html">Products</a> > <a href="products.html?category=${product.category}">${product.category}</a> > ${product.name}
            </div>
            
            <h1>${product.name}</h1>
            
            <div class="details-rating">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
                <span style="color: var(--text-secondary); font-size: 0.9rem;">(${product.rating})</span>
            </div>
            
            <div class="details-price">$${product.price}</div>
            
            <p class="details-description">${product.description}</p>
            
            <div class="details-actions">
                <div class="quantity-selector">
                    <button onclick="changeQty(-1)"><i class="fa-solid fa-minus"></i></button>
                    <input type="number" id="qty-input" value="1" min="1" readonly>
                    <button onclick="changeQty(1)"><i class="fa-solid fa-plus"></i></button>
                </div>
                <button class="btn btn-add-large" onclick="addCurrentToCart()">Add to Cart</button>
            </div>
            
            <div class="specifications">
                <h3>Technical Specs</h3>
                <div class="spec-grid">
                    ${specsHtml}
                </div>
            </div>
        </div>
    `;
}

function changeQty(change) {
    const input = document.getElementById('qty-input');
    let val = parseInt(input.value) + change;
    if (val < 1) val = 1;
    input.value = val;
}

function addCurrentToCart() {
    if (!currentProduct) return;
    
    const qty = parseInt(document.getElementById('qty-input').value);
    
    // Check if exists
    const existing = cart.find(item => item.id === currentProduct.id);
    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({ ...currentProduct, quantity: qty });
    }
    
    saveCart();
    updateCartIcon();
    showNotification(`Added ${qty} ${currentProduct.name} to cart!`, 'success');
}
