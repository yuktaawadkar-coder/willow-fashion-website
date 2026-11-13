
const checkoutItems = document.querySelector("#checkout-items");
const checkoutTotal = document.querySelector("#checkout-total");
const checkoutForm = document.querySelector("#checkout-form");

let cart = JSON.parse(localStorage.getItem("willowCart")) || [];

let total = 0;

// Display order summary
function displayOrder() {
    checkoutItems.innerHTML = "";
    total = 0;

    if (cart.length === 0) {
        checkoutItems.textContent = "Your shopping bag is empty.";
    } else {
        cart.forEach(function(product) {
            const item = document.createElement("div");
            item.classList.add("checkout-item");

            const subtotal = product.price * product.quantity;
            total += subtotal;

            const name = document.createElement("p");
            name.textContent = product.name;
            name.classList.add("checkout-product-name");

            const quantity = document.createElement("p");
            quantity.textContent = "Quantity: " + product.quantity;

            const price = document.createElement("p");
            price.textContent = "₹" + subtotal.toLocaleString("en-IN");
            price.classList.add("checkout-product-price");

            item.append(name, quantity, price);
            checkoutItems.appendChild(item);
        });
    }

    checkoutTotal.textContent =
        "Total: ₹" + total.toLocaleString("en-IN");
}

displayOrder();

// Place order
checkoutForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your shopping bag is empty!");
        return;
    }

    const paymentMethod =
        document.querySelector('input[name="payment"]:checked').value;

    const order = {
        orderNumber: "WILLOW" + Date.now(),

        customer: {
            name: checkoutForm.elements.fullName.value,
            email: checkoutForm.elements.email.value,
            phone: checkoutForm.elements.phone.value,
            address: checkoutForm.elements.address.value,
            city: checkoutForm.elements.city.value,
            pinCode: checkoutForm.elements.pinCode.value
        },

        items: cart,
        total: total,
        payment: paymentMethod,
        date: new Date().toLocaleDateString("en-IN")
    };

    localStorage.setItem("willowOrder", JSON.stringify(order));

    localStorage.removeItem("willowCart");

    window.location.assign("./order-confirmation.html");
});
