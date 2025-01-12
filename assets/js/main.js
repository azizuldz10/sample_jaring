document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Product filtering
    const productGrid = document.querySelector('.product-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function displayProducts(category = 'all') {
        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(product => product.category === category);

        productGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-category="${product.category}">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <p class="price">Rp ${product.price.toLocaleString('id-ID')}</p>
                <a href="https://wa.me/628xxxxxxxxxx?text=Saya tertarik dengan ${product.name}" 
                   class="btn-pesan">Pesan Sekarang</a>
            </div>
        `).join('');
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayProducts(btn.dataset.filter);
        });
    });

    // Initial display
    if (productGrid) {
        displayProducts();
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Product grid animation
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.product-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    // Trigger initial animation
    animateOnScroll();
}); 