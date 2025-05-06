import { getUserByEmail } from "../dangnhap/user.entity.js";
import { countCartQuantity } from "../giohang/cart.entity.js";

let header = document.querySelector("header");
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let accountIcon = document.querySelector("#nav-acc i");
const currentUser = localStorage.getItem("currentUser");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("active");
    accountIcon.style = "color: white";
  } else {
    header.classList.remove("active");
    accountIcon.style = "color: ##081b54";
  }
});

menu.onclick = () => {
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
};

const isInsideHtml = location.href.includes("/html/");
const root = isInsideHtml ? "./" : "./html/";
const navHomeHref = isInsideHtml ? "../index.html" : "./index.html";

const navLinks = {
  "nav-home": navHomeHref,
  "nav-cate": navHomeHref + "#categories",
  "nav-customer": navHomeHref + "#customer",
  contact: navHomeHref + "#contact",
  "nav-cart": root + "cart.html",
  "nav-acc": root + "login.html",
};

async function autoFillUserInfo() {
  const userInfo = await getUserByEmail(currentUser);
  const nameInput = document.querySelector("#autofill-name");
  if (nameInput) nameInput.value = userInfo.username || "";
  const emailInput = document.querySelector("#autofill-email");
  if (emailInput) emailInput.value = userInfo.email || "";
}

// Hàm cập nhật số lượng trên biểu tượng giỏ hàng
export async function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.innerText = await countCartQuantity(currentUser);
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log(currentUser);
  
  

  // Update nav hrefs dynamically
  Object.entries(navLinks).forEach(([id, href]) => {
    const linkEl = document.getElementById(id);
    if (linkEl) linkEl.href = href;
  });

  const cartIcon = document.getElementById("nav-cart");
  const userIcon = document.getElementById("nav-acc");
  const tooltipText = document.querySelector(".tooltiptext");

  if (currentUser) {
    await updateCartCount();
    // ✅ Logged in
    await autoFillUserInfo();
    if (tooltipText) tooltipText.textContent = "Logout";

  
    userIcon.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      alert("Bạn đã đăng xuất.");
      location.href = loginHref;
    });
  } else {
    // ❌ Not logged in
    if (cartIcon) {
      cartIcon.style.display = "none";
    }

    if (tooltipText) tooltipText.textContent = "Login";
    if (userIcon) {
      userIcon.addEventListener("click", () => {
        location.href = loginHref;
      });
    }
  }
});
