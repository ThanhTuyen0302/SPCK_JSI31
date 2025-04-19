document.addEventListener("DOMContentLoaded", function () {
    // Lấy giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Cập nhật số lượng sản phẩm trên biểu tượng giỏ hàng
    updateCartCount();
    
    // Hiển thị giỏ hàng
    displayCart();
    
    // Cập nhật tổng tiền
    updateCartTotal();
    
    // Xử lý sự kiện click cho nút thanh toán
    document.getElementById("checkout-btn").addEventListener("click", function() {
        if (cart.length === 0) {
            alert("Giỏ hàng của bạn đang trống!");
            return;
        }
        
        // Ở đây bạn có thể thêm logic để chuyển đến trang thanh toán
        alert("Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đã được xác nhận.");
        
        // Xóa giỏ hàng sau khi thanh toán
        localStorage.removeItem("cart");
        cart = [];
        displayCart();
        updateCartCount();
        updateCartTotal();
    });
    
    // Hàm cập nhật số lượng sản phẩm trên biểu tượng giỏ hàng
    function updateCartCount() {
        const cartCount = document.getElementById("cart-count");
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.innerText = totalItems;
    }
    
    // Hàm hiển thị giỏ hàng
    function displayCart() {
        const cartItemsContainer = document.getElementById("cart-items");
        const emptyCartMessage = document.getElementById("empty-cart");
        const cartSection = document.querySelector(".cart-section");
        
        // Xóa nội dung cũ
        cartItemsContainer.innerHTML = "";
        
        if (cart.length === 0) {
            // Hiển thị thông báo giỏ hàng trống
            cartSection.style.display = "none";
            emptyCartMessage.style.display = "flex";
        } else {
            // Hiển thị danh sách sản phẩm trong giỏ hàng
            cartSection.style.display = "block";
            emptyCartMessage.style.display = "none";
            
            cart.forEach((item, index) => {
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                
                // Tạo HTML cho mỗi sản phẩm trong giỏ hàng
                cartItem.innerHTML = `
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="item-details">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-price">${item.price}</p>
                        <div class="item-quantity">
                            <button class="quantity-btn minus" data-index="${index}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                            <button class="quantity-btn plus" data-index="${index}">+</button>
                        </div>
                    </div>
                    <button class="remove-btn" data-index="${index}">
                        <i class="bx bx-trash"></i>
                    </button>
                `;
                
                cartItemsContainer.appendChild(cartItem);
            });
            
            // Thêm sự kiện cho các nút tăng/giảm số lượng
            document.querySelectorAll(".quantity-btn.minus").forEach(button => {
                button.addEventListener("click", function() {
                    const index = parseInt(this.getAttribute("data-index"));
                    if (cart[index].quantity > 1) {
                        cart[index].quantity--;
                        updateCart();
                    }
                });
            });
            
            document.querySelectorAll(".quantity-btn.plus").forEach(button => {
                button.addEventListener("click", function() {
                    const index = parseInt(this.getAttribute("data-index"));
                    cart[index].quantity++;
                    updateCart();
                });
            });
            
            // Thêm sự kiện cho input số lượng
            document.querySelectorAll(".quantity-input").forEach(input => {
                input.addEventListener("change", function() {
                    const index = parseInt(this.getAttribute("data-index"));
                    const newQuantity = parseInt(this.value);
                    if (newQuantity > 0) {
                        cart[index].quantity = newQuantity;
                        updateCart();
                    } else {
                        this.value = cart[index].quantity;
                    }
                });
            });
            
            // Thêm sự kiện cho nút xóa sản phẩm
            document.querySelectorAll(".remove-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const index = parseInt(this.getAttribute("data-index"));
                    cart.splice(index, 1);
                    updateCart();
                });
            });
        }
    }
    
    // Hàm cập nhật giỏ hàng
    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
        updateCartCount();
        updateCartTotal();
    }
    
    // Hàm cập nhật tổng tiền
    function updateCartTotal() {
        const subtotalElement = document.getElementById("subtotal");
        const totalElement = document.getElementById("total");
        
        // Tính tổng tiền sản phẩm
        let subtotal = 0;
        cart.forEach(item => {
            // Lấy giá từ chuỗi "52.875 VNĐ" và chuyển thành số
            const priceString = item.price;
            const price = parseInt(priceString.replace(/[^\d]/g, ''));
            subtotal += price * item.quantity;
        });
        
        // Định dạng số tiền
        const formattedSubtotal = subtotal.toLocaleString('vi-VN');
        subtotalElement.innerText = `${formattedSubtotal} VNĐ`;
        
        // Tính tổng cộng (bao gồm phí vận chuyển)
        const shipping = 30000; // 30.000 VNĐ
        const total = subtotal + shipping;
        const formattedTotal = total.toLocaleString('vi-VN');
        totalElement.innerText = `${formattedTotal} VNĐ`;
    }
    
    // Xử lý menu mobile
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.querySelector(".navbar");
    
    menuIcon.addEventListener("click", function() {
        navbar.classList.toggle("active");
    });
    
    // Thêm class sticky cho header khi cuộn trang
    window.addEventListener("scroll", function() {
        const header = document.querySelector("header");
        header.classList.toggle("sticky", window.scrollY > 0);
    });
}); 