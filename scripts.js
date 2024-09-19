// Initialize an empty cart
  let cart = [];

  // Function to add item to cart
  function addToCart(productId, price) {
      console.log(`Adding product ${productId} with price ${price} to cart.`);
      let item = cart.find(item => item.productId === productId);
      if (item) {
          item.quantity += 1;
      } else {
          cart.push({ productId, quantity: 1, price });
      }
      updateCartUI();
  }

  // Function to update cart UI
  function updateCartUI() {
      let cartItems = document.getElementById('cart-items');
      let cartTotal = document.getElementById('cart-total');
      cartItems.innerHTML = '';
      let total = 0;
      cart.forEach(item => {
          let itemTotal = item.price * item.quantity;
          total += itemTotal;
          cartItems.innerHTML += `<li>Product ${item.productId} - Quantity: ${item.quantity} - Total: $${itemTotal.toFixed(2)}</li>`;
      });
      cartTotal.textContent = total.toFixed(2);
  }

  // Event listener for 'Add to Cart' button
  document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function() {
          let productId = this.getAttribute('data-product-id');
          let price = parseFloat(this.getAttribute('data-price'));
          addToCart(productId, price);
      });
  });

  // Event listener for 'Checkout' button
  document.getElementById('checkout')?.addEventListener('click', function() {
      alert('Checkout functionality is not implemented yet.');
  });
  
  // Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    let savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Call loadCart() when the page loads
document.addEventListener('DOMContentLoaded', loadCart);

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
        cartItems.innerHTML += `<li>Product ${item.productId} - Quantity: ${item.quantity} - Total: $${itemTotal.toFixed(2)}</li>`;
    });
    cartTotal.textContent = total.toFixed(2);
}