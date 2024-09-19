// Initialize an empty cart
let cart = [];

// Function to add item to cart
function addToCart(productId, price) {
    let item = cart.find(item => item.productId === productId);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ productId, quantity: 1, price });
    }
    updateCartUI();
    saveCart(); // Save cart to local storage
}

// Function to update cart UI
function updateCartUI() {
    let cartItems = document.getElementById('cart-items');
    let cartTotal = document.getElementById('cart-total');

    if (!cartItems || !cartTotal) {
        console.error('Required elements are missing from the HTML.');
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartItems.innerHTML += `<li>Product ${item.productId} - Quantity: ${item.quantity} - Total: €${itemTotal.toFixed(2)}</li>`;
    });
    cartTotal.textContent = total.toFixed(2);
}

// Function to save cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load cart from local storage
function loadCart() {
    let savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Add event listeners for 'Add to Cart' buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            let productId = this.getAttribute('data-product-id');
            let price = parseFloat(this.getAttribute('data-price'));
            addToCart(productId, price);
        });
    });

    // Only load cart on the cart page
    if (document.body.classList.contains('cart-page')) {
        loadCart();
    }
});