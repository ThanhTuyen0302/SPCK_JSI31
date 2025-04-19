const category_detail_list = {}; // danh sach chua mo ta tung category
// load categories --------------------------------------------------------
function loadCategories() {
  const categories_container = document.querySelector("#categories");
  // get categories from API
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((response) => response.json()) // chuyen kieu du lieu json ve js
    .then((data) => {
      data.categories.forEach((category) => {
        // load category len giao dien
        const category_card = createCategoryCard(category);
        categories_container.appendChild(category_card);
        category_detail_list[category.strCategory] =
          category.strCategoryDescription;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

loadCategories();

function createCategoryCard(category_data) {
  // create category
  const category_card = document.createElement("div");
  category_card.classList.add("about-box");
  //   click => chuyen toi section product tuong ung
  category_card.onclick = () => {
    window.location.href = `#${category_data.strCategory}`;
  };

  const category_img = document.createElement("div");
  category_img.classList.add("box-img");
  category_img.innerHTML = `<img src="${category_data.strCategoryThumb}" alt="${category_data.strCategory}" />`;

  const category_name = document.createElement("h3");
  category_name.setAttribute("data-id", category_data.strCategory);
  category_name.innerText = category_data.strCategory;

  category_card.appendChild(category_img);
  category_card.appendChild(category_name);

  return category_card;
}

// laod products --------------------------------------------------------
function loadProducts() {
  const shop_section = document.getElementById("shop");
  //   chay vong lap de load du tat ca mon tu cac category
  // lay du lieu tu api (loc mon theo category)
  fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then((response) => response.json()) // chuyen kieu du lieu json ve js
    .then((category_list) => {
      category_list.meals.forEach((category_name) => {
        // loc mon an theo ten cua category
        fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category_name.strCategory}`
        )
          .then((res) => res.json())
          .then((data) => {
            // danh sach chua card product
            const productCardList = [];
            // chay vong lap load du lieu product
            data.meals.forEach((meal) => {
              // load mon len container HTML
              const productCard = createProductCard(meal);
              productCardList.push(productCard);
            });
            // them danh sach card vao container
            const product_section = createProductSection(
              category_name.strCategory,
              category_detail_list[category_name.strCategory],
              productCardList
            );
            // them toan bo container vao section
            shop_section.appendChild(product_section);
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

loadProducts();

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
  const formattedPrice = price.toLocaleString('vi-VN');
  product_price.innerText = `${formattedPrice} VNĐ`;

  const product_add = document.createElement("i");
  product_add.classList.add("bx", "bxs-cart-add");

  product_card.appendChild(product_img);
  product_card.appendChild(product_name);
  product_card.appendChild(product_price);
  product_card.appendChild(product_add);

  return product_card;
}

function createProductSection(
  category_name,
  category_detail,
  product_card_list
) {
  // create shop section
  const main_div = document.createElement("div");
  main_div.classList.add("shop");
  main_div.id = category_name;

  // create heading element
  const heading_div = document.createElement("div");
  heading_div.classList.add("heading");

  const h2 = document.createElement("h2");
  // load ten dua tren thu tu trong danh sach category

  h2.innerText = category_name;

  const p = document.createElement("p");
  p.innerHTML = category_detail;

  heading_div.appendChild(h2);
  heading_div.appendChild(p);

  // create shop container element
  const shop_container = document.createElement("div");
  shop_container.id = category_name;
  shop_container.classList.add("shop-container");
  // add danh sach mon vao container
  product_card_list.forEach((card) => {
    shop_container.appendChild(card);
  });

  // add het du lieu vao section
  main_div.appendChild(heading_div);
  main_div.appendChild(shop_container);

  return main_div;
}

document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        const cartCount = document.getElementById("cart-count");
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.innerText = totalItems;
    }

    document.querySelectorAll(".bxs-cart-add").forEach((cartButton) => {
        console.log(cartButton); // Kiểm tra xem các nút có tồn tại không
        cartButton.addEventListener("click", () => {
            console.log("Button clicked"); // Kiểm tra sự kiện click
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

    updateCartCount();
});
