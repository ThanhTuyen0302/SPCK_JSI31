import { addToCart } from "../giohang/cart.entity.js";
import { updateCartCount } from "../trangchu/nav.js";

// get category name
const params = new URLSearchParams(window.location.search);
const category = params.get("cate");
const currentUser = localStorage.getItem("currentUser");

// laod products --------------------------------------------------------

function loadProductsByCategory(cate) {
  const shop_section = document.getElementById("products");
  // lay du lieu tu api (loc mon theo category)
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cate}`)
    .then((res) => res.json())
    .then((data) => {
      // chay vong lap load du lieu product
      data.meals.forEach((meal) => {
        // load mon len container HTML
        const productCard = createProductCard(meal);
        shop_section.appendChild(productCard);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function loadCateInfo(name) {
  fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    .then((res) => res.json())
    .then((cateList) => {
      const cateInfo = cateList.categories.filter(
        (cate) => cate.strCategory == name
      )[0];
      const cateName = document.getElementById("category-name");
      cateName.innerText = name;
      const cateImg = document.getElementById("category-img");
      cateImg.src = cateInfo.strCategoryThumb;
      const cateDesc = document.getElementById("category-desc");
      cateDesc.innerText = cateInfo.strCategoryDescription;
    })
    .catch((err) => console.error(err));
}

function createProductCard(product_data) {
  // console.log(product_data)
  // create product
  const product_card = document.createElement("div");
  product_card.classList.add("shop-box");

  const product_img = document.createElement("div");
  product_img.classList.add("shop-img");
  product_img.innerHTML = `<img src="${product_data.strMealThumb}" alt="${product_data.strMeal}" />`;

  const product_name = document.createElement("h3");
  product_name.innerText = product_data.strMeal;

  const product_price = document.createElement("h2");
  // Định dạng giá tiền với dấu chấm phân cách hàng nghìn
  const price = parseInt(product_data.idMeal);
  const formattedPrice = price.toLocaleString("vi-VN");
  product_price.innerText = `${formattedPrice} VNĐ`;

  const product_add = document.createElement("i");
  product_add.classList.add("bx", "bxs-cart-add");
  // bat su kien cho button them vao gio hang
  product_add.addEventListener("click", async () => {
    await addToCart(currentUser, product_data.idMeal);
    // cap nhat lai so luong san pham trong gio hang
    await updateCartCount();
  });

  product_card.appendChild(product_img);
  product_card.appendChild(product_name);
  product_card.appendChild(product_price);
  product_card.appendChild(product_add);

  return product_card;
}

document.addEventListener("DOMContentLoaded", () => {
  loadCateInfo(category);
  loadProductsByCategory(category);
});
