document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi variabel
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const overlay = document.getElementById('overlay');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    // Nomor WhatsApp untuk checkout
    const whatsappNumber = '6281511449778'; // Ganti dengan nomor WhatsApp Anda
    
    // Keranjang belanja
    let cart = [];
    
    // Fungsi untuk membuka keranjang
    function openCart() {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Fungsi untuk menutup keranjang
    function closeCartFunc() {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Event listener untuk membuka/tutup keranjang
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartFunc);
    overlay.addEventListener('click', closeCartFunc);
    
    // Fungsi untuk menampilkan notifikasi
    function showNotification(message) {
        notificationText.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Fungsi untuk memperbarui tampilan keranjang
    function updateCart() {
        // Kosongkan konten keranjang
        cartItems.innerHTML = '';
        
        // Jika keranjang kosong
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Keranjang belanja Anda kosong</p>
                </div>
            `;
        } else {
            // Tampilkan setiap item di keranjang
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">${formatCurrency(item.price)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease-qty" data-index="${index}">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn increase-qty" data-index="${index}">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <button class="remove-item" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                
                cartItems.appendChild(cartItem);
            });
            
            // Tambahkan event listener untuk tombol quantity
            document.querySelectorAll('.decrease-qty').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    updateQuantity(index, -1);
                });
            });
            
            document.querySelectorAll('.increase-qty').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    updateQuantity(index, 1);
                });
            });
            
            // Tambahkan event listener untuk tombol hapus item
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    removeFromCart(index);
                });
            });
        }
        
        // Perbarui total dan jumlah item
        updateCartSummary();
    }
    
    // Fungsi untuk memperbarui quantity
    function updateQuantity(index, change) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            removeFromCart(index);
        } else {
            updateCart();
        }
    }
    
    // Fungsi untuk menghapus item dari keranjang
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
        showNotification('Produk berhasil dihapus dari keranjang');
    }
    
    // Fungsi untuk memperbarui total keranjang
    function updateCartSummary() {
        let total = 0;
        let count = 0;
        
        cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;
        });
        
        cartTotal.textContent = formatCurrency(total);
        cartCount.textContent = count;
    }
    
    // Fungsi untuk format mata uang
    function formatCurrency(amount) {
        return 'Rp ' + amount.toLocaleString('id-ID');
    }
    
    // Event listener untuk tombol tambah ke keranjang
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            const image = this.closest('.product-card').querySelector('.product-img').src;
            
            // Cek apakah produk sudah ada di keranjang
            const existingItemIndex = cart.findIndex(item => item.name === name);
            
            if (existingItemIndex !== -1) {
                // Jika sudah ada, tambahkan quantity
                cart[existingItemIndex].quantity += 1;
            } else {
                // Jika belum ada, tambahkan produk baru
                cart.push({
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                });
            }
            
            updateCart();
            showNotification(`${name} berhasil ditambahkan ke keranjang`);
        });
    });
    
    // Event listener untuk tombol checkout
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('Keranjang belanja Anda kosong');
            return;
        }
        
        // Buat pesan untuk WhatsApp
        let message = 'Halo, saya ingin memesan produk berikut:\n\n';
        
        cart.forEach(item => {
            message += `${item.name} (${item.quantity}x) - ${formatCurrency(item.price * item.quantity)}\n`;
        });
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\nTotal: ${formatCurrency(total)}`;
        message += '\n\nMohon informasikan ketersediaan produk dan total pembayaran. Terima kasih!';
        
        // Buka WhatsApp dengan pesan yang telah dibuat
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
    
    // Inisialisasi keranjang saat halaman dimuat
    updateCart();
});