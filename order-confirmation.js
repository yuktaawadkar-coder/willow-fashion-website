
const confirmationItems = document.querySelector("#confirmation-items");
const confirmationTotal = document.querySelector("#confirmation-total");

const order = JSON.parse(localStorage.getItem("willowOrder"));

if (!order) {
    confirmationItems.textContent = "No recent order found.";
    confirmationTotal.textContent = "";
} else {

    // Order details
    document.querySelector("#order-number").textContent = order.orderNumber;
    document.querySelector("#order-date").textContent = order.date;
    document.querySelector("#order-payment").textContent = order.payment;

    // Customer details
    document.querySelector("#customer-name").textContent = order.customer.name;
    document.querySelector("#customer-email").textContent = order.customer.email;
    document.querySelector("#customer-phone").textContent = order.customer.phone;

    document.querySelector("#customer-address").textContent =
        order.customer.address + ", " +
        order.customer.city + " - " +
        order.customer.pinCode;

    // Purchased products
confirmationItems.innerHTML = "";

order.items.forEach(function(product) {
    const item = document.createElement("div");

    const subtotal = product.price * product.quantity;

    item.innerHTML =
        "<p>" + product.name + "</p>" +
        "<p>Quantity: " + product.quantity + "</p>" +
        "<p>₹" + subtotal.toLocaleString("en-IN") + "</p>";

    confirmationItems.appendChild(item);
});
    // Final total
    confirmationTotal.textContent =
        "Order Total: ₹" + order.total.toLocaleString("en-IN");
}
