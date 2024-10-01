// Initialize an empty cart
let cart = [];
let itemQuantity;

window.onload = function() {
    loadCart();
    updateCartPreview();
    updateCartUI();
    updateCounts();
}

// Example product count for Favorites and Cart
let favoritesCount = 0;

// Function to update the counts (call this function when adding products to favorites/cart)
function updateCounts() {
    document.getElementById('fav-count').innerText = favoritesCount;
}

// Example of how to increment the count (this would be tied to your add-to-cart and add-to-favorites logic)
function addToFavorites() {
    favoritesCount++;
    updateCounts();
}

function updateCartPreview() {
    let cartPreviewItems = document.getElementById('cart-preview-items');
    let cartPreviewTotal = document.getElementById('cart-preview-total');
    
    if (!cartPreviewItems || !cartPreviewTotal) {
        console.error('Required elements are missing from the HTML.');
        return;
    }

    cartPreviewItems.innerHTML = ''; // Clear the preview display
    let total = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartPreviewItems.innerHTML += `<li>Product ${item.productId} - Qty: ${item.quantity} - €${itemTotal.toFixed(2)}</li>`;
    });

    cartPreviewTotal.textContent = `€${total.toFixed(2)}`;

    // Show the cart preview
    document.getElementById('cart-preview').style.display = 'block';
}

// Update the preview when a product is added
function addToCart(productId, price) {
    // Existing logic for adding products to the cart
    let existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ productId: productId, price: price, quantity: 1 });
    }
    itemQuantity++;
    saveCart();
    updateCartUI();
    updateCartPreview(); // Update the preview
}

// Function to update cart UI
function updateCartUI() {
    let cartItems = document.getElementById('cart-items');
    let cartTotal = document.getElementById('cart-total');

    if (!cartItems || !cartTotal) {
        console.error('Required elements are missing from the HTML.');
        return;
    }

    cartItems.innerHTML = ''; // Clear the existing cart items
    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        // Create a list item for each cart product with a "Remove" button
        cartItems.innerHTML += `
            <li>
                Product ${item.productId} - Quantity: ${item.quantity} - Total: €${itemTotal.toFixed(2)}
                <button onclick="removeFromCart(${index})">Remove</button>
            </li>`;
    });

    // Update the total price
    cartTotal.textContent = `€${total.toFixed(2)}`;
}

// Function to save cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('iQuantity', JSON.stringify(itemQuantity));
    loadCart();
}

// Function to load cart from local storage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    const savedQuantity = localStorage.getItem('iQuantity');
    if (savedCart && savedQuantity) {
        cart = JSON.parse(savedCart);
        itemQuantity = JSON.parse(savedQuantity);
    } else {
        cart = [];
        itemQuantity = 0;
    }

    // Show items quantity
    document.getElementById('cart-count').innerText = itemQuantity;
}

function removeFromCart(index) {
    let numberOfDlt = cart[index].quantity;
    itemQuantity -= numberOfDlt;
    cart.splice(index, 1); // Remove the item at the given index
    saveCart();            // Save the updated cart to localStorage
    updateCartUI();         // Update the cart UI
}

function emptyCart() {
    cart = []; // Clear the cart array
    itemQuantity = 0;
    saveCart(); // Save the empty cart to localStorage
    updateCartUI(); // Update the cart UI to reflect the empty cart
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

const cartPreviewTrigger = document.getElementById('shopping-cart-preview-trigger');
const cartPreview = document.getElementById('cart-preview');
const closeCartPreview = document.querySelector('.close-cart-preview');

// Open cart preview when icon is clicked
cartPreviewTrigger.addEventListener('click', function() {
    cartPreview.classList.add('show');
    document.body.classList.add('cart-open'); // Prevent scrolling and add dark background
    // Add this line if not already present
    document.querySelector('.navbar').classList.add('dark'); // Darken navbar if needed
});

// Close cart preview when 'X' is clicked
closeCartPreview.addEventListener('click', function() {
    cartPreview.classList.remove('show');
    document.body.classList.remove('cart-open'); // Restore scrolling and remove dark background
    // Add this line if not already present
    document.querySelector('.navbar').classList.remove('dark'); // Restore navbar color if needed
});

// Get the elements
const searchButton = document.getElementById('search-button');
const searchPopup = document.getElementById('search-popup');
const closeButton = document.querySelector('.close-button');

// Show the pop-up when search button is clicked
searchButton.addEventListener('click', function() {
    searchPopup.style.display = 'flex';
});

// Close the pop-up when 'X' is clicked
closeButton.addEventListener('click', function() {
    searchPopup.style.display = 'none';
});

// Close the pop-up when clicking outside of the content
window.addEventListener('click', function(event) {
    if (event.target === searchPopup) {
        searchPopup.style.display = 'none';
    }
});

// Trigger showCartPreview on Add to Cart click without toggling visibility
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        // Your existing logic for adding items to cart
        showCartPreview(); // Ensure it only opens without toggling it off
    });
});

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const section_2 = document.getElementById("horizontal");
let box_items = gsap.utils.toArray(".horizontal__item");

gsap.to(box_items, {
  xPercent: -100 * (box_items.length - 1),
  ease: "sine.out",
  scrollTrigger: {
    trigger: section_2,
    pin: true,
    scrub: 3,
    snap: 1 / (box_items.length - 1),
    end: "+=" + section_2.offsetWidth
  }
});

function reloadPage() {
    location.reload();
}

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".navbar a"); // Assuming links are inside the navbar
    const currentPage = window.location.pathname.split("/").pop(); // Get current page name

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});

document.getElementById('italian-icon').addEventListener('click', function() {
    var dropdown = document.getElementById('language-dropdown');
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
});

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.language-icon')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
};

/*document.querySelector('.scroll-up').addEventListener('click', function() {
    document.querySelector('.scroll-content').scrollBy(0, -50); // Adjust scroll amount
});

document.querySelector('.scroll-down').addEventListener('click', function() {
    document.querySelector('.scroll-content').scrollBy(0, 50); // Adjust scroll amount
});*/