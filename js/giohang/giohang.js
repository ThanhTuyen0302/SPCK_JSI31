import { getUserByEmail } from "../dangnhap/user.entity.js";

import {
  clearCart,
  decreaseQty,
  getCartByEmail,
  increaseQty,
  removeFromCart,
  setQty,
  sumCartTotal,
} from "./cart.entity.js";

const email = localStorage.getItem("currentUser");
if (!email) location.href("../html/login.html");

// get product = id --------------------------------------
async function getProductById(productId) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${productId}`
  );
  const data = await res.json();
  const mealInfo = data.meals[0];
  return mealInfo;
}

// Render cart -------------------------------------------
async function renderCart() {
  const cart = await getCartByEmail(email);
  const cartItems = cart.products || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartSection = document.querySelector(".cart-section");

  if (cartItems.length === 0) {
    // Hiển thị thông báo giỏ hàng trống
    cartSection.style.display = "none";
    emptyCartMessage.style.display = "block";
    return;
  } else {
    emptyCartMessage.style.display = "none";
    cartSection.style.display = "flex";
  }

  // Xóa nội dung cũ
  cartItemsContainer.innerHTML = "";

  // Hiển thị danh sách sản phẩm trong giỏ hàng
  cartSection.style.display = "block";
  emptyCartMessage.style.display = "none";

  cartItems.forEach(async (item, index) => {
    const cartItem = document.createElement("div");
    const itemInfo = await getProductById(item.productId);
    const price = `${parseInt(item.productId).toLocaleString("vi-VN")} VNĐ`;
    cartItem.classList.add("cart-item");

    // Tạo HTML cho mỗi sản phẩm trong giỏ hàng
    cartItem.innerHTML = `
              <div class="item-image">
                  <img src="${itemInfo.strMealThumb}" alt="${itemInfo.strMeal}">
              </div>
              <div class="item-details">
                  <h3 class="item-name">${itemInfo.strMeal}</h3>
                  <p class="item-price">${price}</p>
                  <div class="item-quantity">
                      <button class="quantity-btn minus" data-id="${index}">-</button>
                      <input type="number" class="quantity-input" value="${item.qty}" min="1" data-id="${index}">
                      <button class="quantity-btn plus" data-id="${index}">+</button>
                  </div>
              </div>
              <button class="remove-btn" data-id="${index}">
                  <i class="bx bx-trash"></i>
              </button>
          `;

    cartItem.addEventListener("click", async function (e) {
      // add event remove
      if (e.target.classList.contains("bx-trash")) {
        await removeItem(item.productId);
        return;
      }
      // add event increaseQuantity
      if (e.target.classList.contains("plus")) {
        await increaseQuantityUI(item.productId);
        return;
      }
      // add event decreaseQuantity
      if (e.target.classList.contains("minus")) {
        await decreaseQuantityUI(item.productId);
        return;
      }
    });

    // bat su kien dien gia tri cho input so luong
    cartItem.addEventListener("input", async function (e) {
      if (e.target.classList.contains("quantity-input")) {
        const newQuantity = parseInt(e.target.value);
        await setItemQtyUI(item.productId, newQuantity);
        return;
      }
    });
    cartItemsContainer.appendChild(cartItem);
  });
  await renderSummariesUI();
}

// Set item quantity from cart ------------------------------------------
async function setItemQtyUI(itemId, qtyInput) {
  qtyInput = parseInt(qtyInput);
  // kiem tra neu <= 0 => xoa mon hang
  if (qtyInput < 1) {
    if (confirm("Bạn có muốn xóa món khỏi giỏ hàng?")) await removeItem(itemId);
    else return;
  }
  await setQty(email, itemId, qtyInput);
  await renderCart();
  // Show remove success message
  alert(`SP đã được cập nhật số lượng!`);
}

// Remove item from cart ------------------------------------------
async function removeItem(itemId) {
  // Find the item to get its name for the toast mess
  await removeFromCart(email, itemId);
  // Show remove success message
  alert(`SP đã được xóa khỏi giỏ hàng!`);
  // reload web
  location.reload();
}

// update cart -----------------------------------------------------
// Increase quantity
async function increaseQuantityUI(itemId) {
  // Find the item to get its name for the toast mess
  await increaseQty(email, itemId);
  alert(`Số lượng món hàng đã được cập nhật`);
  // reload web
  location.reload();
}

// Decrease quantity
async function decreaseQuantityUI(itemId) {
  // Find the item to get its name for the toast mess
  await decreaseQty(email, itemId);
  // Show remove success message
  alert(`Số lượng món hàng đã được cập nhật`);
  // reload web
  location.reload();
}

// total
async function renderSummariesUI() {
  const subTotal = document.getElementById("subtotal");
  const subTotalValue = await sumCartTotal(email);
  subTotal.innerText = `${parseInt(subTotalValue).toLocaleString("vi-VN")} VNĐ`;

  const shipping = document.getElementById("shipping");
  // mac dinh phi ship la 30k
  shipping.innerText = "30.000 VNĐ";
  const totalCost = document.getElementById("total");
  totalCost.innerText = `${parseInt(subTotalValue + 30000).toLocaleString(
    "vi-VN"
  )} VNĐ`;
}

// Initialize cart when page loads
document.addEventListener("DOMContentLoaded", async function () {
  // render cart UI ------------------------------
  await renderCart();
});
