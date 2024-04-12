const productsPerPage = 15;
let currentPage = 1;

const products = [
    ...Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        category: 'ბეჭედი',
        name: `ბეჭედი ${i + 1}`,
        price: 2500 + i * 100
    })),
    ...Array.from({ length: 15 }, (_, i) => ({
        id: i + 16,
        category: 'ბრასლეტი',
        name: `ბრასლეტი ${i + 1}`,
        price: 1500 + i * 100
    })),
    ...Array.from({ length: 15 }, (_, i) => ({
        id: i + 31,
        category: 'საყურე',
        name: `საყურე ${i + 1}`,
        price: 3200 + i * 100
    })),
    ...Array.from({ length: 15 }, (_, i) => ({
        id: i + 46,
        category: 'სამკაული',
        name: `სამკაული ${i + 1}`,
        price: 4500 + i * 100
    })),
];

let cart = [];

function displayProducts(category, page = 1) {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    let filteredProducts = category === 'მთავარი' ? products : products.filter(product => product.category === category);
    filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchQuery));
    
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    const productsContainer = document.getElementById('content');
    productsContainer.innerHTML = '';

    productsToShow.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>ფასი: ${product.price} Gel.</p>
            <button onclick="addProductToCart(${product.id})">კალათაში დამატება</button>
        `;
        productsContainer.appendChild(productElement);
    });


    renderPagination(filteredProducts.length, page);
}

function renderPagination(totalItems, currentPage) {
    const totalPages = Math.ceil(totalItems / productsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('button');
        pageLink.textContent = i;
        pageLink.onclick = () => displayProducts('მთავარი', i);
        if (i === currentPage) {
            pageLink.style.backgroundColor = '#ddd';
        }
        paginationContainer.appendChild(pageLink);
    }
}

function filterProducts() {
    displayProducts('all');
}

function addProductToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
    updateCartTotal();
    alert(`${product.name} დამატებულია კალათში.`);
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

function updateCartTotal() {
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    document.getElementById('cart-total').textContent = `ჯამური თანხა: ${total} Gel.`;
}

function showCart() {
    const cartContainer = document.getElementById('content');
    cartContainer.innerHTML = '<h2>კალათა</h2>';
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'product';
        itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>ფასი: ${item.price} Gel.</p>
        `;
        cartContainer.appendChild(itemElement);
    });
    
    const totalElement = document.createElement('div');
    totalElement.id = 'cart-total';
    cartContainer.appendChild(totalElement);
    updateCartTotal();
}

function showInfo() {
    const infoContainer = document.getElementById('content');
    infoContainer.innerHTML = '<h2>მაღაზიის შესახებ</h2><p>ჩვენ გთავაზობთ საუკეთესო სამკაულებს.</p>';
}

function showContact() {
    const contactContainer = document.getElementById('content');
    contactContainer.innerHTML = '<h2>კონტაქტი</h2><form class="contact-form"><input type="text" placeholder="თქვენი სახელი" /><input type="email" placeholder="თქვენი email" /><textarea placeholder="თქვენი კომენტარი"></textarea><button type="submit">გაგზავნა</button></form>';
}

window.onload = function() {
    displayProducts('all');
};
