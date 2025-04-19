document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('payment-form');
    const citySelect = document.getElementById('city');
    const districtSelect = document.getElementById('district');

    // Dữ liệu quận/huyện theo thành phố
    const districts = {
        hcm: [
            'Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5',
            'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10',
            'Quận 11', 'Quận 12', 'Quận Bình Thạnh', 'Quận Gò Vấp',
            'Quận Phú Nhuận', 'Quận Tân Bình', 'Quận Tân Phú'
        ],
        hn: [
            'Quận Ba Đình', 'Quận Hoàn Kiếm', 'Quận Hai Bà Trưng',
            'Quận Đống Đa', 'Quận Cầu Giấy', 'Quận Thanh Xuân',
            'Quận Long Biên', 'Quận Nam Từ Liêm', 'Quận Bắc Từ Liêm'
        ],
        dn: [
            'Quận Hải Châu', 'Quận Thanh Khê', 'Quận Liên Chiểu',
            'Quận Cẩm Lệ', 'Quận Ngũ Hành Sơn', 'Quận Sơn Trà'
        ]
    };

    // Cập nhật danh sách quận/huyện khi chọn thành phố
    citySelect.addEventListener('change', function() {
        const selectedCity = this.value;
        districtSelect.innerHTML = '<option value="">Chọn quận/huyện</option>';
        
        if (selectedCity && districts[selectedCity]) {
            districts[selectedCity].forEach(district => {
                const option = document.createElement('option');
                option.value = district.toLowerCase().replace(/\s+/g, '-');
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        }
    });

    // Xử lý submit form
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Lấy thông tin từ form
        const formData = {
            fullname: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: citySelect.options[citySelect.selectedIndex].text,
            district: districtSelect.options[districtSelect.selectedIndex].text,
            paymentMethod: document.querySelector('input[name="payment"]:checked').value,
            note: document.getElementById('note').value
        };

        // Lấy thông tin giỏ hàng
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const subtotal = calculateSubtotal(cart);
        const shipping = 30000; // Phí vận chuyển cố định
        const total = subtotal + shipping;

        // Tạo đơn hàng
        const order = {
            ...formData,
            items: cart,
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            orderDate: new Date().toISOString(),
            status: 'pending'
        };

        // Lưu đơn hàng vào localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Xóa giỏ hàng
        localStorage.removeItem('cart');

        // Hiển thị thông báo thành công
        showNotification('Đặt hàng thành công! Cảm ơn bạn đã mua hàng.', 'success');

        // Chuyển hướng về trang chủ sau 2 giây
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);
    });

    // Hàm tính tổng tiền
    function calculateSubtotal(cart) {
        return cart.reduce((total, item) => {
            const price = parseInt(item.price.replace(/[^\d]/g, ''));
            return total + (price * item.quantity);
        }, 0);
    }

    // Hàm hiển thị thông báo
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Hiển thị thông báo
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}); 