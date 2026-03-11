document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    // Listen for custom event from script.js
    document.addEventListener('cartUpdated', () => {
        renderCart();
    });
});

function renderCart() {
    const container = document.getElementById('cart-items');
    
    if (!cart || cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-msg">
                <i class="fa-solid fa-box-open"></i>
                <h2>Your hardware cart is empty</h2>
                <p>Looks like you haven't added any anti-gravity tech yet.</p>
                <a href="products.html" class="btn" style="margin-top: 20px;">Browse Catalog</a>
            </div>
        `;
        document.getElementById('checkout-btn').style.display = 'none';
        updateSummary(0);
        return;
    }

    document.getElementById('checkout-btn').style.display = 'inline-block';
    
    let html = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.category}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
                <button class="btn-remove" onclick="removeFromCart(${item.id})" title="Remove Item">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });

    container.innerHTML = html;
    updateSummary(total);
}

function updateSummary(total) {
    document.getElementById('summary-subtotal').textContent = `$${total.toFixed(2)}`;
    document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;
}
