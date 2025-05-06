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

function createCategoryCard(category_data) {
  // create category
  const category_card = document.createElement("div");
  category_card.classList.add("about-box");
  //   click => chuyen toi section product tuong ung
  category_card.onclick = () => {
    window.location.href = `./html/shop.html?cate=${category_data.strCategory}`;
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

document.addEventListener("DOMContentLoaded", () => loadCategories());
