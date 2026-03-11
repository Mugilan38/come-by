// Render products directly to the grid
async function renderRecommendations() {
    const grid = document.getElementById('featured-grid');
    if (!grid) return;
    
    try {
        const products = await fetchRecommendations();
        grid.innerHTML = '';
        
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">
                        $${product.price}
                        <span class="rating"><i class="fa-solid fa-star"></i> ${product.rating}</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn-card" onclick='addToCart(${JSON.stringify(product)})'>
                            Add to Cart
                        </button>
                        <a href="product.html?id=${product.id}" class="btn-icon" title="View Details">
                            <i class="fa-solid fa-eye"></i>
                        </a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading products:", error);
        grid.innerHTML = `<p style="color:red; text-align:center;">Failed to load recommendations.</p>`;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderRecommendations();
});
