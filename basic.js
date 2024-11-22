document.addEventListener("DOMContentLoaded", () => {
    // Initialize Cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartIcon = document.querySelector(".fa-shopping-cart");
    const cartCount = document.createElement("span");
    cartIcon.appendChild(cartCount);
    updateCartCount();

    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll(".product button, .products-OS input[type='submit']");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            const productCard = button.closest(".product, .products-OS, .cart104");
            const productName = productCard.querySelector(".card-title, h3").textContent.trim();
            const productPrice = parseFloat(productCard.querySelector(".card-text, p:nth-of-type(2)").textContent.replace("$", "").trim());
            const existingProduct = cart.find((item) => item.name === productName);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            alert(`${productName} has been added to your cart!`);
        });
    });

    // Update Cart Count
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.cssText = "background: red; color: white; border-radius: 50%; padding: 2px 6px; font-size: 12px; margin-left: 5px;";
    }

    // Display Cart Items (Cart Page Only)
    if (window.location.pathname.includes("cart.html")) {
        const cartContainer = document.querySelector(".cart-item") || document.body;
        cartContainer.innerHTML = ""; // Clear existing items

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            let totalPrice = 0;
            cart.forEach((item) => {
                totalPrice += item.price * item.quantity;

                const cartItem = document.createElement("div");
                cartItem.className = "cart-item";
                cartItem.innerHTML = `
                    <img src="img/${item.name.toLowerCase().replace(/ /g, "-")}.jpg" alt="${item.name}" width="100">
                    <p>${item.name}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-btn" data-name="${item.name}">Remove</button>
                `;
                cartContainer.appendChild(cartItem);
            });

            const totalElement = document.createElement("h2");
            totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
            cartContainer.appendChild(totalElement);

            const checkoutButton = document.createElement("button");
            checkoutButton.textContent = "Proceed to Checkout";
            checkoutButton.addEventListener("click", () => {
                alert("Thank you for your purchase! Proceeding to checkout...");
                cart = [];
                localStorage.removeItem("cart");
                updateCartCount();
                location.reload();
            });
            cartContainer.appendChild(checkoutButton);
        }

        // Remove Item from Cart
        cartContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("remove-btn")) {
                const productName = e.target.dataset.name;
                cart = cart.filter((item) => item.name !== productName);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartCount();
                location.reload();
            }
        });
    }

    // Search Functionality (Product Pages Only)
    if (document.querySelector(".container-OS")) {
        const searchInput = document.createElement("input");
        searchInput.setAttribute("placeholder", "Search products...");
        searchInput.style.cssText = "margin-bottom: 20px; padding: 5px; width: 80%;";
        document.querySelector(".container-OS").prepend(searchInput);

        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            const products = document.querySelectorAll(".product, .products-OS");
            products.forEach((product) => {
                const productName = product.querySelector(".card-title, h3").textContent.toLowerCase();
                product.style.display = productName.includes(query) ? "block" : "none";
            });
        });
    }

    // Social Media Links Hover Effects
    const socialLinks = document.querySelectorAll(".container-links img");
    if (socialLinks) {
        socialLinks.forEach((link) => {
            link.addEventListener("mouseover", () => {
                link.style.transform = "scale(1.2)";
            });
            link.addEventListener("mouseout", () => {
                link.style.transform = "scale(1)";
            });
        });
    }
});
