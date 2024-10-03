/* document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const productName = document.getElementById('product-name').value;
    const productImage = document.getElementById('product-image').files[0];
    const productId = document.getElementById('product-id').value;
    const productPrice = parseFloat(document.getElementById('product-price').value);

    const reader = new FileReader();
    reader.onload = function(event) {
        const productImageData = event.target.result;
        console.log(productImageData); // Check if image data is correct

        const product = {
            name: productName,
            image: productImageData,
            id: productId,
            price: productPrice
        };

        saveProduct(product);
    };

    reader.readAsDataURL(productImage);
});

function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    alert('Product added successfully!');
    console.log('Saving product:', product);
    console.log('Current products in local storage:', products);

    // Call function to display current products
    displayCurrentProducts();
}

function displayCurrentProducts() {
    const currentProductsContainer = document.getElementById('current-products');
    currentProductsContainer.innerHTML = ''; // Clear previous content

    const products = JSON.parse(localStorage.getItem('products')) || [];

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;">
            <span>${product.name} - ${product.price.toFixed(2)} €</span>
        `;
        currentProductsContainer.appendChild(productItem);
    });
}

window.onload = function() {
    displayCurrentProducts();
}; */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded successfully"); // Debugging: check if page load event triggers
    loadProducts(); // Load products on page load

    const productForm = document.getElementById('product-form');
    productForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent page reload
        console.log("Form submitted"); // Debugging: check if form submission is triggered

        const productName = document.getElementById('product-name').value;
        const productImage = document.getElementById('product-image').files[0];
        const productId = document.getElementById('product-id').value;
        const productPrice = parseFloat(document.getElementById('product-price').value);

        if (!productImage || !productName || !productId || isNaN(productPrice)) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            const productImageData = event.target.result;
            const product = {
                name: productName,
                image: productImageData,
                id: productId,
                price: productPrice
            };

            saveProduct(product); // Save product to localStorage
            loadProducts(); // Refresh product list display
            productForm.reset(); // Reset form after submission
        };

        reader.readAsDataURL(productImage); // Read image as data URL
    });
});

// Save product in IndexedDB
function saveProduct(product) {
    openDatabase().then((db) => {
        const transaction = db.transaction('products', 'readwrite');
        const store = transaction.objectStore('products');
        store.put(product);  // Store product by its id

        transaction.oncomplete = () => {
            console.log('Product saved successfully');
            loadProducts(); // Reload products to show the latest ones
        };
    }).catch((error) => {
        console.error('Error saving product:', error);
    });
}


// Load all products from IndexedDB
function loadProducts() {
    openDatabase().then((db) => {
        const transaction = db.transaction('products', 'readonly');
        const store = transaction.objectStore('products');
        const request = store.getAll();

        request.onsuccess = (event) => {
            displayProducts(event.target.result);
            console.log('Products loaded successfully');
        };

        request.onerror = (event) => {
            console.error('Error loading products:', event.target.error);
        };
    });
}

// Display products in the admin panel
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';  // Clear the list

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <div style="height: 250px; width: 200px; border: 1px solid #ddd;">
                <p>ID: ${product.id}</p>
                <img src="${product.image}" alt="${product.name}" width="100" height="100">
                <h3>${product.name}</h3>
                <p>Price: €${product.price}</p>
            </div>
        `;
        productList.appendChild(productDiv);
    });
}

// Initialize IndexedDB
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ProductsDatabase', 1);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('products')) {
                db.createObjectStore('products', { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

// Delete product by ID
function deleteProduct(productId) {
    console.log(`Attempting to delete product with ID: ${productId}`);  // Log the product ID

    openDatabase().then((db) => {
        const transaction = db.transaction('products', 'readwrite');
        const store = transaction.objectStore('products');

        const request = store.delete(productId);  // Attempt to delete the product

        request.onsuccess = () => {
            console.log(`Product with ID ${productId} deleted successfully`);
            loadProducts();  // Reload the product list to reflect the deletion
        };

        request.onerror = (event) => {
            console.error(`Error deleting product with ID ${productId}:`, event.target.error);
        };
    }).catch((error) => {
        console.error('Error opening the database:', error);
    });
}

// Form handler for deleting products
function deleteProductForm(event) {
    event.preventDefault();  // Prevent page reload
    const productId = document.getElementById('delete-product-id').value;
    
    if (!productId) {
        alert("Please enter a valid product ID.");
        return;
    }

    deleteProduct(productId);  // Call the deleteProduct function
}
/*
// Add product to IndexedDB
function saveProductToDB(product) {
    openDatabase().then((db) => {
        const transaction = db.transaction('products', 'readwrite');
        const store = transaction.objectStore('products');
        store.put(product); // 'put' allows update if product exists
        console.log('Product saved successfully');
    }).catch((error) => {
        console.error('Error saving product:', error);
    });
}

// Load all products from IndexedDB
function loadProductsFromDB() {
    openDatabase().then((db) => {
        const transaction = db.transaction('products', 'readonly');
        const store = transaction.objectStore('products');
        const request = store.getAll();

        request.onsuccess = (event) => {
            displayProducts(event.target.result); // Display all products
        };

        request.onerror = (event) => {
            console.error('Error loading products:', event.target.error);
        };
    });
}

function deleteProductFromDB(productId) {
    openDatabase().then((db) => {
        const transaction = db.transaction('products', 'readwrite');
        const store = transaction.objectStore('products');
        store.delete(productId); // Delete by product ID

        transaction.oncomplete = () => {
            console.log(`Product with ID ${productId} deleted`);
            loadProductsFromDB(); // Reload and display products
        };
    }).catch((error) => {
        console.error('Error deleting product:', error);
    });
}*/