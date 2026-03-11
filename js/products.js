// Globals for filtering
let allProducts = [];
let currentCategory = 'All';
let currentSearch = '';
let currentMaxPrice = 2000;

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Fetch data
    allProducts = await fetchProducts();
    
    // 2. Check URL params for category
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        currentCategory = categoryParam;
        updateCategoryUI(currentCategory);
    }

    // 3. Render initial
    applyFilters();

    // 4. Setup listeners
    setupFilters();
});

function setupFilters() {
    // Category clicks
    const categories = document.querySelectorAll('#category-filter li');
    categories.forEach(li => {
        li.addEventListener('click', (e) => {
            currentCategory = e.target.getAttribute('data-cat');
            updateCategoryUI(currentCategory);
            applyFilters();
        });
    });

    // Search input
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        applyFilters();
    });

    // Price range
    const priceRange = document.getElementById('price-range');
    const priceDisplay = document.getElementById('price-display');
    priceRange.addEventListener('input', (e) => {
        currentMaxPrice = parseInt(e.target.value);
        priceDisplay.textContent = currentMaxPrice;
        applyFilters();
    });
}

function updateCategoryUI(cat) {
    const categories = document.querySelectorAll('#category-filter li');
    categories.forEach(li => {
        if (li.getAttribute('data-cat') === cat) {
            li.classList.add('active');
        } else {
            li.classList.remove('active');
        }
    });
}

function applyFilters() {
    let filtered = allProducts;

    // Filter by Category
    if (currentCategory !== 'All') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    // Filter by Search
    if (currentSearch) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(currentSearch) || p.description.toLowerCase().includes(currentSearch));
    }

    // Filter by Price
    filtered = filtered.filter(p => p.price <= currentMaxPrice);

    renderProductGrid(filtered);
}

function renderProductGrid(products) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    if (products.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 50px;">No tech devices found matching your criteria.</p>';
        return;
    }

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
                    <button class="btn-card" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
                    <a href="product.html?id=${product.id}" class="btn-icon" title="View Details">
                        <i class="fa-solid fa-eye"></i>
                    </a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}
