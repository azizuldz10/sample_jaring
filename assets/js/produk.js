// Tambahkan console.log untuk debugging
console.log('JS file loaded');

// Data produk
const products = [
    {
        id: 1,
        title: "Jaring Futsal Premium",
        category: "Futsal",
        price: "Rp 2.500.000",
        images: [
            "assets/img/1.jpeg",
            "assets/img/banner.jpg",
            "assets/img/grass.jpg"
        ],
        description: "Jaring futsal kualitas premium dengan bahan PE HD Grade A",
        badge: "Terlaris",
        specs: {
            bahan: "PE HD Grade A",
            ukuran: "3m x 2m",
            mesh: "10cm x 10cm",
            ketebalan: "3mm"
        }
    },
    {
        id: 2,
        title: "Jaring Badminton Pro",
        category: "Badminton",
        price: "Rp 1.200.000",
        images: [
            "assets/img/1.jpeg",
            "assets/img/1.jpeg",
            "assets/img/1.jpeg"
        ],
        description: "Jaring badminton standar BWF",
        badge: "Unggulan",
        specs: {
            bahan: "Nylon Premium",
            ukuran: "6.1m x 0.76m",
            mesh: "Standard BWF",
            ketebalan: "2mm"
        }
    },
    {
        id: 3,
        title: "Jaring Voli Tournament",
        category: "Voli",
        price: "Rp 1.800.000",
        images: [
            "assets/img/1.jpeg",
            "assets/img/1.jpeg",
            "assets/img/1.jpeg"
        ],
        description: "Jaring voli untuk pertandingan profesional",
        badge: "Baru",
        specs: {
            bahan: "Nylon HD",
            ukuran: "9.5m x 1m",
            mesh: "Standard FIVB",
            ketebalan: "3mm"
        }
    },
    {
        id: 4,
        title: "Jaring Tenis Premium",
        category: "Tenis",
        price: "Rp 2.800.000",
        images: [
            "assets/img/1.jpeg",
            "assets/img/1.jpeg",
            "assets/img/1.jpeg"
        ],
        description: "Jaring tenis dengan ketahanan tinggi",
        specs: {
            bahan: "PE Premium",
            ukuran: "12.8m x 1.07m",
            mesh: "Standard ITF",
            ketebalan: "3mm"
        }
    }
];

// Fungsi untuk menampilkan produk
function displayProducts(filter = 'all') {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        if (filter === 'all' || product.category.toLowerCase() === filter.toLowerCase()) {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image">
                    ${product.badge ? `<span class="product-badge ${product.badge.toLowerCase()}">${product.badge}</span>` : ''}
                    <img src="${product.images[0]}" alt="${product.title}">
                    <div class="product-overlay">
                        <button class="view-details" onclick="event.stopPropagation(); showModal(${product.id})">Lihat Detail</button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <span class="product-category">${product.category}</span>
                </div>
            `;

            productGrid.appendChild(card);
        }
    });
}

// Fungsi untuk menampilkan modal
function showModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modalOverlay = document.querySelector('.modal-overlay');
    const modalContent = modalOverlay.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <span class="modal-close" onclick="closeModal()">&times;</span>
        <div class="modal-body">
            <div class="modal-image-slider">
                <div class="slider-container">
                    <img src="${product.images[0]}" alt="${product.title}" class="slider-image active" id="mainImage">
                    <button class="slider-button prev" onclick="changeSlide(-1)">❮</button>
                    <button class="slider-button next" onclick="changeSlide(1)">❯</button>
                </div>
                <div class="thumbnail-container">
                    ${product.images.map((img, idx) => `
                        <img src="${img}" 
                            alt="thumbnail" 
                            class="thumbnail ${idx === 0 ? 'active' : ''}"
                            onclick="setActiveImage(${idx})"
                            data-index="${idx}"
                        >
                    `).join('')}
                </div>
            </div>
            <div class="modal-info">
                <h2>${product.title}</h2>
                <span class="modal-category">${product.category}</span>
                <p class="modal-price">${product.price}</p>
                <p class="modal-description">${product.description}</p>
                <div class="modal-specs">
                    <h3>Spesifikasi:</h3>
                    <ul>
                        ${Object.entries(product.specs).map(([key, value]) => `
                            <li><strong>${key}:</strong> ${value}</li>
                        `).join('')}
                    </ul>
                </div>
                <button class="btn-wa" onclick="orderViaWA('${product.title}', '${product.price}')">
                    <i class="fab fa-whatsapp"></i> Pesan via WhatsApp
                </button>
            </div>
        </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Simpan referensi ke produk aktif untuk slider
    window.activeProduct = product;
    window.currentSlideIndex = 0;
}

// Fungsi untuk menutup modal
function closeModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fungsi untuk mengubah slide
function changeSlide(direction) {
    const product = window.activeProduct;
    if (!product) return;

    window.currentSlideIndex = (window.currentSlideIndex + direction + product.images.length) % product.images.length;
    updateModalImage();
}

// Fungsi untuk set gambar aktif
function setActiveImage(index) {
    window.currentSlideIndex = index;
    updateModalImage();
}

// Fungsi untuk update gambar modal
function updateModalImage() {
    const product = window.activeProduct;
    if (!product) return;

    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    mainImage.src = product.images[window.currentSlideIndex];
    thumbnails.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === window.currentSlideIndex);
    });
}

// Fungsi untuk mengirim pesan WhatsApp
function orderViaWA(productName, price) {
    const phoneNumber = '6281234567890';
    const message = `Halo, saya tertarik dengan produk ${productName} dengan harga ${price}. Mohon informasi lebih lanjut.`;
    const waURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(waURL, '_blank');
}

// Event listener saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi tampilan produk
    displayProducts();

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(btn => 
                btn.classList.remove('active')
            );
            e.target.classList.add('active');
            displayProducts(e.target.dataset.filter);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top functionality
    const scrollTop = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 200) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Event listener untuk menutup modal saat mengklik di luar
document.querySelector('.modal-overlay').addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
}); 