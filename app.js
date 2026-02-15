import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const productList = document.getElementById("productList");

let products = [];
let filteredProducts = [];
let currentCategory = "All";

/* ================= ACTIVE BUTTON ================= */
function setActive(btn) {
  document.querySelectorAll(".filters button").forEach(b => {
    b.classList.remove("active");
  });
  if (btn) btn.classList.add("active");
}

/* ================= LOAD PRODUCTS ================= */
async function loadProducts() {
  const snap = await getDocs(collection(db, "products"));
  products = [];

  snap.forEach(doc => {
    products.push({ id: doc.id, ...doc.data() });
  });

  filteredProducts = [...products];
  displayProducts(filteredProducts);
}

loadProducts();

/* ================= DISPLAY ================= */
function displayProducts(list) {
  productList.innerHTML = "";

  if (!list.length) {
    productList.innerHTML = "<p>No products found</p>";
    return;
  }

  list.forEach(p => {
    let discount = 0;
    if (p.mrp && p.mrp > p.price) {
      discount = Math.round(((p.mrp - p.price) / p.mrp) * 100);
    }

    const div = document.createElement("div");
    div.className = "product-card";

    div.innerHTML = `
      <img src="${p.image}" onclick="openProduct('${p.id}')">
      <h4>${p.name}</h4>

      <p class="price">
        <span class="selling-price">₹${p.price}</span>
        ${
          p.mrp
            ? `<span class="mrp">₹${p.mrp}</span>
               <span class="discount">${discount}% OFF</span>`
            : ""
        }
      </p>

      <button onclick="openProduct('${p.id}')">View Details</button>
    `;

    productList.appendChild(div);
  });
}

/* ================= CATEGORY ================= */
window.filterCategory = function (cat, btn) {
  setActive(btn);
  currentCategory = cat;

  filteredProducts =
    cat === "All"
      ? [...products]
      : products.filter(p => p.category === cat);

  displayProducts(filteredProducts);
};

/* ================= SORT PRICE (FIXED) ================= */
window.sortPrice = function (type, btn) {
  setActive(btn);
  const sorted = [...filteredProducts].sort((a, b) =>
    type === "low" ? a.price - b.price : b.price - a.price
  );
  displayProducts(sorted);
};

/* ================= PRICE RANGE ================= */
window.filterByPrice = function (range, btn) {
  setActive(btn);

  let min = 0, max = Infinity;

  if (range.includes("-")) {
    [min, max] = range.split("-").map(Number);
  } else {
    min = Number(range.replace("+", ""));
  }

  const result = filteredProducts.filter(p =>
    p.price >= min && p.price <= max
  );

  displayProducts(result);
};

/* ================= RESET ================= */
window.resetFilters = function (btn) {
  setActive(btn);
  filteredProducts = [...products];
  displayProducts(filteredProducts);
};

/* ================= OPEN PRODUCT ================= */
window.openProduct = function (id) {
  location.href = `product.html?id=${id}`;
};