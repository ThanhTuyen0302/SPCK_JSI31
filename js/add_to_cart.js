// Hàm cập nhật số lượng trên biểu tượng giỏ hàng
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.innerText = totalItems;
}

// Gọi hàm khi trang tải
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});

document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Hàm cập nhật số lượng giỏ hàng trên biểu tượng
    function updateCartCount() {
        const cartCount = document.getElementById("cart-count");
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.innerText = totalItems;
    }

// Hàm thêm món ăn vào giỏ hàng
    document.querySelectorAll(".bxs-cart-add").forEach((cartButton) => {
        cartButton.addEventListener("click", () => {
            const shopBox = cartButton.closest(".shop-box");
            const itemName = shopBox.querySelector("h3").innerText;
            const itemPrice = shopBox.querySelector("h2").innerText;
            const itemImage = shopBox.querySelector("img").src;

            const existingItem = cart.find((item) => item.name === itemName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: itemName,
                    price: itemPrice,
                    image: itemImage,
                    quantity: 1,
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${itemName} đã được thêm vào giỏ hàng.`);
            updateCartCount();
        });
    });

    // Gọi hàm để cập nhật số lượng khi tải trang
    updateCartCount();
});
