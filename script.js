
let cart = JSON.parse(localStorage.getItem("willowCart")) || [];

const cartCounter = document.querySelector(".cart-count");
const addButtons = document.querySelectorAll(".add-to-bag");
const cartIcon = document.querySelector(".cart");
const cartPanel = document.querySelector("#cart-panel");
const closeCart = document.querySelector("#close-cart");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const checkoutButton = document.querySelector(".cart-panel .checkout-button");
const emptyBagButton = document.querySelector("#empty-bag");

// Save cart data
function saveCart() {
    localStorage.setItem("willowCart", JSON.stringify(cart));
}

// Update shopping bag
function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let totalQuantity = 0;

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your bag is currently empty.</p>';
    }

    cart.forEach(function(product) {
        const itemTotal = product.price * product.quantity;

        total += itemTotal;
        totalQuantity += product.quantity;

        const item = document.createElement("div");
        item.classList.add("cart-item");

        // Product details
        const details = document.createElement("div");
        details.classList.add("cart-item-details");

        const name = document.createElement("p");
        name.classList.add("cart-product-name");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.classList.add("cart-product-price");
        price.textContent =
            "₹" + itemTotal.toLocaleString("en-IN");

        details.append(name, price);

        // Quantity controls
        const quantityControls = document.createElement("div");
        quantityControls.classList.add("quantity-controls");

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "−";

        const quantityNumber = document.createElement("span");
        quantityNumber.textContent = "Qty: " + product.quantity;

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";

        decreaseButton.addEventListener("click", function() {
            product.quantity--;

            if (product.quantity <= 0) {
                cart = cart.filter(function(item) {
                    return item.id !== product.id;
                });
            }

            updateCart();
        });

        increaseButton.addEventListener("click", function() {
            product.quantity++;
            updateCart();
        });

        quantityControls.append(
            decreaseButton,
            quantityNumber,
            increaseButton
        );

        item.append(details, quantityControls);
        cartItems.appendChild(item);
    });

    cartCounter.textContent = totalQuantity;
    cartTotal.textContent =
        "Total: ₹" + total.toLocaleString("en-IN");

    saveCart();
}

// Add products to shopping bag
addButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const productCard = button.closest(".product-card");

        const productName =
            productCard.querySelector("h3").textContent;

        const productPrice = Number(
            productCard.querySelector(".product-price")
                .textContent.replace(/[₹,]/g, "")
        );

        const existingProduct = cart.find(function(product) {
            return product.name === productName;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                id: Date.now() + Math.random(),
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        updateCart();
    });
});

// Open shopping bag
cartIcon.addEventListener("click", function(event) {
    event.preventDefault();
    cartPanel.classList.add("active");
});

// Close shopping bag
closeCart.addEventListener("click", function() {
    cartPanel.classList.remove("active");
});

// Empty shopping bag
emptyBagButton.addEventListener("click", function() {
    if (cart.length === 0) {
        return;
    }

    cart = [];
    updateCart();
});

// Proceed to checkout
checkoutButton.addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Your shopping bag is empty!");
        return;
    }

    saveCart();
    window.location.href = "checkout.html";
});

// Display previously saved cart
updateCart();
// Close mobile menu when shopping bag is opened

const mainNav = document.getElementById("main-nav");

cartIcon.addEventListener("click", () => {
    mainNav.classList.remove("active");
}); 
// Close mobile menu after clicking a navigation link

const navLinks = mainNav.querySelectorAll("a");

navLinks.forEach(function(link) {
    link.addEventListener("click", function() {
        mainNav.classList.remove("active");
    });
}); 

// Show or hide additional product details

const detailButtons = document.querySelectorAll(".details-toggle");

detailButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const productCard = button.closest(".product-card");
        const extraDetails = productCard.querySelector(".extra-details");

        if (extraDetails.style.display === "none") {
            extraDetails.style.display = "block";
            button.textContent = "SHOW LESS";
        } else {
            extraDetails.style.display = "none";
            button.textContent = "VIEW DETAILS";
        }
    });
});
// Contact Form

const contactForm = document.querySelector("#contact-form");
const contactSuccess = document.querySelector("#contact-success");

// Contact Form Submission
contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Display success message
    contactSuccess.textContent =
        "Thank you! Your message has been submitted successfully.";

    // Clear all form fields
    contactForm.reset();

    // Hide success message after 4 seconds
    setTimeout(function() {
        contactSuccess.textContent = "";
    }, 4000);
});
