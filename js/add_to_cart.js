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
    
    // Thêm sự kiện click cho biểu tượng giỏ hàng để chuyển đến trang giỏ hàng
    const cartIcon = document.querySelector(".cart-icon");
    if (cartIcon) {
        cartIcon.addEventListener("click", function() {
            window.location.href = "./html/cart.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        const cartCount = document.getElementById("cart-count");
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.innerText = totalItems;
    }

    // Sử dụng event delegation để bắt sự kiện click trên toàn bộ document
    document.addEventListener("click", function(event) {
        // Kiểm tra xem phần tử được click có phải là biểu tượng giỏ hàng không
        if (event.target.classList.contains("bxs-cart-add")) {
            console.log("Button clicked"); // Kiểm tra sự kiện click
            
            const cartButton = event.target;
            const shopBox = cartButton.closest(".shop-box");
            
            if (shopBox) {
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
            }
        }
    });

    updateCartCount();
});
