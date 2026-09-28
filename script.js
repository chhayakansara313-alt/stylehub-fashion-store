let cart = JSON.parse(localStorage.getItem("cart")) || [];


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

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added to cart!");
}


function updateCartCount() {

    const cartCountElement = document.getElementById("cart-count");

    if (!cartCountElement) {
        return;
    }

    let totalQuantity = 0;

    cart.forEach(product => {
        totalQuantity += product.quantity;
    });

    cartCountElement.textContent = totalQuantity;
}


function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<h3>Your cart is empty 🛒</h3>";

        cartTotal.textContent = "0";

        return;
    }


    cart.forEach((product, index) => {

        const itemTotal = product.price * product.quantity;

        total += itemTotal;

        cartItems.innerHTML += `

            <div class="cart-item">

                <div>
                    <h3>${product.name}</h3>

                    <p>Price: ₹${product.price}</p>

                    <p>Quantity: ${product.quantity}</p>
                </div>

                <div>

                    <strong>₹${itemTotal}</strong>

                    <button onclick="removeFromCart(${index})">
                        Remove
                    </button>

                </div>

            </div>

        `;
    });


    cartTotal.textContent = total;
}


function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

    updateCartCount();
}


function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    alert("Thank you for shopping with StyleHub! 🎉");
}


updateCartCount();

displayCart();
