document.getElementById('product-form').addEventListener('submit', function(event) {
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
};