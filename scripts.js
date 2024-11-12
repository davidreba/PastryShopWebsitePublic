// Initialize
let products = []; // This could be a global array where all products are added
let cart = [];
let favorites = [];
let itemQuantity;
let favoritesQuantity;

const cartPreviewTrigger = document.getElementById('shopping-cart-preview-trigger');
const cartPreview = document.getElementById('cart-preview');
const closeCartPreview = document.querySelector('.close-cart-preview');

const favoritesCartPreviewTrigger = document.getElementById('fav-cart-preview-trigger');
const favoritesCartPreview = document.getElementById('fav-cart-preview');
const closeFavoritesCartPreview = document.querySelector('.close-fav-cart-preview');

const searchButton = document.getElementById('search-button');
const searchPopup = document.getElementById('search-popup');
const closeButton = document.querySelector('.close-button');

window.onload = function() {
    loadCart();
    loadFavorites();
    //updateCartUI();
    updateCartPreview();
    updateFavoritesCartPreview();
    loadProductsToIndex();

    // Open cart preview when icon is clicked
    if(cartPreviewTrigger) {
        cartPreviewTrigger.addEventListener('click', function() {
            cartPreview.classList.add('show');
            document.body.classList.add('cart-open'); // Prevent scrolling and add dark background
            // Add this line if not already present
            document.querySelector('.navbar').classList.add('dark'); // Darken navbar if needed
        });
    } else {
        console.error('Element with ID "element-id" not found.');
    }
        
    // Close cart preview when 'X' is clicked
    if(closeCartPreview) {
        closeCartPreview.addEventListener('click', function() {
            cartPreview.classList.remove('show');
            document.body.classList.remove('cart-open'); // Restore scrolling and remove dark background
            // Add this line if not already present
            document.querySelector('.navbar').classList.remove('dark'); // Restore navbar color if needed
        });
    } else {
        console.error('Element with ID "element-id" not found.');
    }

    // Open fav cart preview when icon is clicked
    if(favoritesCartPreviewTrigger) {
        favoritesCartPreviewTrigger.addEventListener('click', function() {
            favoritesCartPreview.classList.add('show');
            document.body.classList.add('fav-cart-open'); // Prevent scrolling and add dark background
            // Add this line if not already present
            document.querySelector('.navbar').classList.add('dark'); // Darken navbar if needed
        });
    } else {
        console.error('Element with ID "element-id" not found.');
    }
    
    // Close fav cart preview when 'X' is clicked
    if(closeFavoritesCartPreview) {
        closeFavoritesCartPreview.addEventListener('click', function() {
            favoritesCartPreview.classList.remove('show');
            document.body.classList.remove('fav-cart-open'); // Restore scrolling and remove dark background
            // Add this line if not already present
            document.querySelector('.navbar').classList.remove('dark'); // Restore navbar color if needed
        });
    } else {
        console.error('Element with ID "element-id" not found.');
    }

    // Show the pop-up when search button is clicked
    searchButton.addEventListener('click', function() {
        searchPopup.style.display = 'flex';
    });
    
    // Close the pop-up when 'X' is clicked
    closeButton.addEventListener('click', function() {
        searchPopup.style.display = 'none';
    });
}

function updateCartPreview() {
    let cartPreviewItems = document.getElementById('cart-preview-items');
    let cartPreviewTotal = document.getElementById('cart-preview-total');
    const cartFooter = document.querySelector('.cart-footer');
    
    if (!cartPreviewItems || !cartPreviewTotal) {
        console.error('Required elements are missing from the HTML.');
        return;
    }

    cartPreviewItems.innerHTML = ''; // Clear the preview display
    let total = 0;

    if (cart.length === 0) {
        // Cart is empty, show the empty message
        cartPreviewItems.innerHTML = '<p style="text-align: left; margin-left: 30px; font-size: 20px;">Nessun prodotto nel carrello!</p>';
        cartFooter.style.display = 'none'; // Hide the footer with subtotal and buttons
    } else {
        // Cart has items, display them
        cartFooter.style.display = 'block'; // Show footer if there are items
        cart.forEach((item, index) => {
            let itemPrice = parseFloat(item.price);  // Convert price to a number
            if (!isNaN(itemPrice)) {
                let itemTotal = item.price * item.quantity;
                total += itemTotal;
                // Uncomment for debugging console.log("pI ", item.productImage, " pN ", item.productName, " pId ", item.productId, " p ", item.price);
                cartPreviewItems.innerHTML += `
                <li style="display: flex; align-items: flex-start;">
                    <img src="${item.productImage}" style="width: 90px; height: 90px;">
                    <div style="margin-left: 10px; display: flex; flex-direction: column; width: 100%;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <span style="margin-bottom: 5px; margin-left: 10px;">${item.productName}</span>
                            <button onclick="removeFromCart(${index})" id="remove-item" style="background: none; border: none; font-size: 20px; font-weight: bold; cursor: pointer; margin-right: 35px;">&times;</button>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <span style="margin-left: 10px;">${item.quantity} x ${itemPrice.toFixed(2)} €</span>
                        </div>
                    </div>
                </li>`;
            } else {
                console.error('Price is not a valid number for product:', item.productName);
            }
        });
    }        

    cartPreviewTotal.textContent = `${total.toFixed(2)} €`;

    // Show the cart preview
    document.getElementById('cart-preview').style.display = 'block';
}

/*// Function to update cart UI
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
                <img src="${item.productImage}" style="width: 100px; height: 100px">
                ${item.productName} - Quantity: ${item.quantity} - Total: €${itemTotal.toFixed(2)}
                <button onclick="removeFromCart(${index})">Remove</button><br>
            </li>`;
    });

    // Update the total price
    cartTotal.textContent = `€${total.toFixed(2)}`;
} */

// Update the preview when a product is added
function addToCart(productImage, productName, productId, price) {
    // Existing logic for adding products to the cart
    // Uncomment for debugingconsole.log("pI ", productImage, " pN ", productName, " pId ", productId, " p ", price);
    let existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ productImage: productImage, productName: productName, productId: productId, price: price, quantity: 1 });
    }
    itemQuantity++;
    saveCart();
    //updateCartUI();
    updateCartPreview(); // Update the preview
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
    // updateCartUI();         // Update the cart UI
    updateCartPreview();    // Update the cart preview
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
            let productImage = this.getAttribute('product-image');
            let productName = this.getAttribute('product-name');
            let productId = this.getAttribute('data-product-id');
            let price = parseFloat(this.getAttribute('data-price'));
            addToCart(productImage ,productName, productId, price);
        });
    });

    // Only load cart on the cart page
    if (document.body.classList.contains('cart-page')) {
        loadCart();
    }
});

// Trigger showCartPreview on Add to Cart click without toggling visibility
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        // Your existing logic for adding items to cart
        //showCartPreview(); // Ensure it only opens without toggling it off
    });
});

/* window.addEventListener('click', function(event) {
    if (cartPreview.classList.contains('show') && event.target !== cartPreview) {
        alert('This is your alert message!');

    }
}); */

/* Favorites cart */
function updateFavoritesCartPreview() {
    let favoritesCartPreviewItems = document.getElementById('fav-cart-preview-items');

    if (!favoritesCartPreviewItems) {
        console.error('Required elements are missing from the HTML.');
        return;
    }

    favoritesCartPreviewItems.innerHTML = ''; // Clear the preview display

    if (favorites.length === 0) {
        // favCart is empty, show the empty message
        favoritesCartPreviewItems.innerHTML = '<p style="text-align: left; margin-left: 30px; font-size: 20px;">Nessun prodotto è stato aggiunto alla lista dei desideri!</p>';
    } else {
        // favCart has items, display them
        favorites.forEach((item, index) => {
            favoritesCartPreviewItems.innerHTML += `
            <li>
                <img src="${item.productImage}" style="width: 90px; height: 90px">
                <div style="width: 100%; height: 90px;">
                    <div style="text-align: left; text-align: top; margin-left: 20px; justify-content: space-between;">${item.productName}<br>
                    ${item.price.toFixed(2)} €
                    </div> 
                    <button onclick="addToCart('${item.productImage}', '${item.productName}', '${item.productId}', '${item.price.toFixed(2)}')" id="add-to-cart-from-fav" style="margin-top: 0px; margin-left: 10px;">Buy
                    <img src="images/shopping-cart-icon.png" style="height: 30px; width: 30px;"></button>
                    <button onclick="removeFromFavorites(${index})" id="remove-item" style="margin-top: 0px; margin-left: 140px; ">&times;</button> 
                </div>
            </li>`;
        });
    }

    // Show the cart preview
    document.getElementById('fav-cart-preview').style.display = 'block';
}

/* //Function to update fav-cart UI
function updateFavCartUI() {
    let favCartItems = document.getElementById('fav-cart-items');

    if (!favCartItems) {
        console.error('Required elements are missing from the HTML.');
        return;
    }

    favCartItems.innerHTML = ''; // Clear the existing fav cart items

    cart.forEach((item, index) => {

        // Create a list item for each cart product with a "Remove" button
        favCartItems.innerHTML += `
            <li>
                <img src="${item.productImage}" style="width: 100px; height: 100px">
                ${item.productName} - Quantity: ${item.quantity} - Total: €${itemTotal.toFixed(2)}
                <button onclick="removeFromCart(${index})">Remove</button><br>
            </li>`;
    });

    // Update the total price
    favCartTotal.textContent = `€${total.toFixed(2)}`;
} */

function addToFavorites(productImage, productName, productId, price) {
    // Existing logic for adding products to the cart
    let existingItem = favorites.find(item => item.productId === productId);
    if (existingItem) {
        alert('This product is already in your favorites')
    } else {
        favorites.push({ productImage: productImage, productName: productName, productId: productId, price: price, quantity: 1 });
        favoritesQuantity++;
        // Mark button as "added to favorites"
        // document.getElementById(`fav-button-${item.productId}`).classList.add('added-to-fav');
    }
    saveFavorites();
    updateFavoritesCartPreview(); // Update the preview
}

// Function to save favorites to local storage
function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('fQuantity', JSON.stringify(favoritesQuantity));
    loadFavorites();
}

// Function to load favorites from local storage
function loadFavorites() {
    const savedFavCart = localStorage.getItem('favorites');
    const savedFavQuantity = localStorage.getItem('fQuantity');
    if (savedFavCart && savedFavQuantity) {
        favorites = JSON.parse(savedFavCart);
        favoritesQuantity = JSON.parse(savedFavQuantity);
    } else {
        favorites = [];
        favoritesQuantity = 0;
    }

    // Show favorites quantity
    document.getElementById('fav-count').innerText = favoritesQuantity;
}

function removeFromFavorites(index) {
    let numberOfDlt = favorites[index].quantity;
    favoritesQuantity -= numberOfDlt;
    favorites.splice(index, 1); // Remove the item at the given index
    saveFavorites();            // Save the updated fav cart to localStorage
    updateFavoritesCartPreview();    // Update the fav cart preview
}

// Add event listeners for 'Add to Fav' buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-favorites').forEach(button => {
        button.addEventListener('click', function() {
            let productImage = this.getAttribute('product-image');
            let productName = this.getAttribute('product-name');
            let productId = this.getAttribute('data-product-id');
            let price = parseFloat(this.getAttribute('data-price'));
            addToFavorites(productImage ,productName, productId, price);
        });
    });

    /* Only load cart on the cart page
    if (document.body.classList.contains('fav-cart-page')) {
        loadFavorites();
    }*/
});

// Trigger showFavCartPreview on AddFav to Cart click without toggling visibility
document.querySelectorAll('.add-to-favorites').forEach(button => {
    button.addEventListener('click', () => {
        // Your existing logic for adding items to cart
        //showFavoritesCartPreview(); // Ensure it only opens without toggling it off
    });
});

/* Close the pop-up when clicking outside of the content
window.addEventListener('click', function(event) {
    if (event.target === searchPopup) {
        searchPopup.style.display = 'none';
    }
}); */

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

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ProductsDatabase', 1);

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('products')) {
                db.createObjectStore('products', { keyPath: 'id' });
            }
        };

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
}

// Function to display products on index.html
function displayProductsOnIndexPage(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';  // Clear existing products

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `            
            <div class="product-item">
                <a href="product.html">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Price: ${product.price.toFixed(2)} €</p>
                </a>
                <div class="product-actions">
                    <button class="add-to-favorites" product-name="${product.name}" product-image="${product.image}" data-product-id="${product.id}" data-price="${product.price}"><img id="add-to-fav-img" src="images/favorites-icon.png" alt="Add to Favorites"></button>
                    <button class="add-to-cart" product-name="${product.name}" product-image="${product.image}" data-product-id="${product.id}" data-price="${product.price}"><img id="add-to-cart-img" src="images/shopping-cart-icon.png" alt="Add to Cart"></button>
                </div>
            </div>
        `;
        productContainer.appendChild(productDiv);  // Add product to the container
    });
}

// Function to load and display products from IndexedDB
function loadProductsToIndex() {
    openDatabase().then((db) => {
        const transaction = db.transaction('products', 'readonly');
        const store = transaction.objectStore('products');

        const request = store.getAll();  // Get all products from the object store

        request.onsuccess = (event) => {
            const products = event.target.result;
            displayProductsOnIndexPage(products);
        };

        request.onerror = (event) => {
            console.error('Error loading products:', event.target.error);
        };
    }).catch((error) => {
        console.error('Error opening the database:', error);
    });
}

// Call the function when index.html is loaded
document.addEventListener('DOMContentLoaded', loadProductsToIndex);