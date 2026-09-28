let cart = [];

function addToCart(name, price) {

    const existingProduct = cart.find(product => product.name === name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart!");
}


function updateCart() {

    let cartCount = 0;

    cart.forEach(product => {
        cartCount += product.quantity;
    });

    document.getElementById("cart-count").textContent = cartCount;
}
