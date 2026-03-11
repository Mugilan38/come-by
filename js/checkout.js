document.addEventListener('DOMContentLoaded', () => {
    // Check if cart is empty
    if (!cart || cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    renderCheckoutSummary();
    setupPaymentMethods();
    setupForm();
});

function renderCheckoutSummary() {
    const container = document.getElementById('checkout-items');
    let html = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="checkout-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="checkout-item-info">
                    <h4>${item.name}</h4>
                    <p>Qty: ${item.quantity}</p>
                </div>
                <div style="font-weight: bold; color: var(--primary-color);">
                    $${itemTotal.toFixed(2)}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    document.getElementById('checkout-subtotal').textContent = `$${total.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
}

function setupPaymentMethods() {
    const methods = document.querySelectorAll('.payment-method');
    methods.forEach(method => {
        method.addEventListener('click', () => {
            methods.forEach(m => m.classList.remove('selected'));
            method.classList.add('selected');
        });
    });
}

function setupForm() {
    const form = document.getElementById('checkout-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate order processing API
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Generate order ID
            const orderId = 'AG-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            document.getElementById('order-id').textContent = orderId;
            
            // Show modal
            const modal = document.getElementById('success-modal');
            modal.classList.add('show');
            
            // Clear cart
            clearCart();
            
        }, 1500);
    });
}
