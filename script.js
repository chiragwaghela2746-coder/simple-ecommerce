document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Headphone", price: 19.99 },
        { id: 2, name: "Smartphone", price: 59.99 },
        { id: 3, name: "Laptop", price: 89.99 },
    ];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");

    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(productDiv);
    });

    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find((p) => p.id === productId);
            addToCart(product);
        }
    });

    function addToCart(product) {
        cart.push(product);
        saveCart();
        renderCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = "";
        cartItems.appendChild(emptyCartMessage);
        let totalPrice = 0;

        if (cart.length > 0) {
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");

            cart.forEach((item, index) => {
                totalPrice += item.price;
                const cartItem = document.createElement("div");
                cartItem.innerHTML = `
                    ${item.name} - $${item.price.toFixed(2)}
                    <button class="remove-btn">Remove</button>
                `;
                cartItem.querySelector(".remove-btn").addEventListener("click", () => {
                    removeFromCart(index);
                });
                cartItems.appendChild(cartItem);
            });

            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        } else {
            emptyCartMessage.classList.remove("hidden");
            cartTotalMessage.classList.add("hidden");
        }
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    checkOutBtn.addEventListener("click", () => {
        cart = [];
        saveCart();
        alert("Checkout successfully");
        renderCart();
    });

    renderCart();
});
