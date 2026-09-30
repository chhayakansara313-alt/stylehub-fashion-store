let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =========================
// ADD TO CART
// =========================

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


// =========================
// UPDATE CART COUNT
// =========================

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


// =========================
// DISPLAY CART
// =========================

function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML = "<h3>Your cart is empty 🛒</h3>";

        if (cartTotal) {
            cartTotal.textContent = "0";
        }

        return;
    }


    // Display products
    cart.forEach((product, index) => {

        const itemTotal = product.price * product.quantity;

        total += itemTotal;

        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <h3>${product.name}</h3>

                    <p>Price: ₹${product.price}</p>

                    <div class="quantity-control">

                        <button onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <span>${product.quantity}</span>

                        <button onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

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


    // Display total
    if (cartTotal) {
        cartTotal.textContent = total;
    }
}


// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

    updateCartCount();

    displayCheckoutTotal();
}


// =========================
// CHANGE QUANTITY
// =========================

function changeQuantity(index, change) {

    cart[index].quantity += change;

    // Remove product if quantity becomes 0
    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

    updateCartCount();

    displayCheckoutTotal();
}


// =========================
// GO TO CHECKOUT
// =========================

function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    window.location.href = "checkout.html";
}


// =========================
// DISPLAY CHECKOUT TOTAL
// =========================

function displayCheckoutTotal() {

    const checkoutTotal = document.getElementById("checkout-total");

    if (!checkoutTotal) {
        return;
    }

    let total = 0;

    cart.forEach(product => {

        total += product.price * product.quantity;

    });

    checkoutTotal.textContent = total;
}


// =========================
// START FUNCTIONS
// =========================

updateCartCount();

displayCart();

displayCheckoutTotal();
// =========================
// PLACE ORDER
// =========================

const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;
        }

        alert("🎉 Order placed successfully! Thank you for shopping with StyleHub.");

        // Clear cart
        localStorage.removeItem("cart");

        cart = [];

        // Go to home page
        window.location.href = "index.html";

    });

}
