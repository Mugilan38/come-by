/**
 * Anti-Gravity Store Main JavaScript
 * Handles common functionality: Navigation, Cart state, Notifications
 */

// State Management
let cart = JSON.parse(localStorage.getItem('antigravity_cart')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon();
    setupMobileNav();
});

// Mobile Navigation
function setupMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
        });
    }
}

// Cart Functionality
function addToCart(product) {
    // Check if item exists
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartIcon();
    showNotification(`Added ${product.name} to cart!`, 'success');
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartIcon();
    
    // Trigger event for cart page update
    document.dispatchEvent(new Event('cartUpdated'));
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            updateCartIcon();
            document.dispatchEvent(new Event('cartUpdated'));
        }
    }
}

function saveCart() {
    localStorage.setItem('antigravity_cart', JSON.stringify(cart));
}

function updateCartIcon() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Add animation class
        cartCount.classList.add('pop');
        setTimeout(() => cartCount.classList.remove('pop'), 300);
    }
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartIcon();
}

// Notification System
function showNotification(message, type = 'success') {
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? '<i class="fa-solid fa-check-circle" style="color: var(--primary-color)"></i>' : '<i class="fa-solid fa-info-circle"></i>';
    
    toast.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after 3s
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// Add CSS for cart pop animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pop {
        0% { transform: scale(1); }
        50% { transform: scale(1.5); }
        100% { transform: scale(1); }
    }
    .cart-count.pop {
        animation: pop 0.3s ease;
    }
`;
document.head.appendChild(style);
