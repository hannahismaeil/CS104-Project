// Array to store cart items
const cartItems = [
    { name: "Product Name 1", quantity: 1, price: 63.99 },
    { name: "Product Name 2", quantity: 2, price: 59.99 }
];

// Function to calculate total
function calculateTotal() {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
        total += cartItems[i].quantity * cartItems[i].price;
    }
    return total.toFixed(2); // Return total as a string with 2 decimal places
}

// Display total when the page loads
const totalElement = document.querySelector('h2');
totalElement.textContent = `Total: $${calculateTotal()}`;

// Add event listener to the checkout button
const checkoutButton = document.querySelector('button');
checkoutButton.addEventListener('click', () => {
    alert("Thank you for shopping! Your total is $" + calculateTotal());
});
