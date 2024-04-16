import { Header, Footer } from "../../scripts/header-footer-store.js";
import { animation1 } from "./animações/search-bar.js";
import { products, collections } from "./produtos.js";
import { Cart } from "./cart.js";

let quantityOfProducts = 0;

insertHeaderAndFooter();
showProducts();
performSearchButtonAnimation();
connectEventListeners();
updateCart();

// HEADER E FOOTER
function insertHeaderAndFooter() {
  document.head.innerHTML +=
    '<link rel="stylesheet" href="../styles/style_header_and_footer.css">';

  const header = new Header();
  const footer = new Footer();

  const array = [header, footer];

  array.forEach(function (element) {
    element.navBarLinks = [
      {
        text: "Início",
        href: "inicio.html",
      },
      {
        text: "Todos produtos",
        href: "todos_produtos.html",
      },
      {
        text: "Escola",
        href: "../inicio.html",
      },
    ];

    element.logo.src = "../images/logo.png";
    element.showElements();
  });
}

// PRODUTOS
function showProducts() {
  const productsContainer = document.querySelector(".container-products");

  products.forEach(function (product, id) {
    productsContainer.innerHTML += `
  
    <div class="product" id="${id}">
      <span class="discount">
        ${Number(product.discount).toFixed(0)}%
      </span>

      <div class="product-img">
        <img src="${product.img.src}" alt="${product.img.alt}" />
      </div>

      <div class="product-description">
        <h2 class="product-name">${product.name}</h2>

        <div class="price">
          <span class="current-price">KZ ${Number(product.currentPrice).toFixed(
            2
          )}</span>
          <span class="comparison-price">KZ ${Number(product.pastPrice).toFixed(
            2
          )}</span>
        </div>

        <i class="fa-solid fa-plus btn-add-product"></i>
      </div>
      
    </div>
  
  `;
  });
}

// ANIMAÇÕES
function performSearchButtonAnimation() {
  const sugestionsToPlaceholder = [];

  products.forEach(function (product) {
    sugestionsToPlaceholder.push(product.name);
  });

  collections.forEach(function (value) {
    sugestionsToPlaceholder.push(value);
  });

  animation1(sugestionsToPlaceholder, "input-search");
}

function connectEventListeners() {
  const btnsAddProduct = [...document.querySelectorAll(".btn-add-product")];

  btnsAddProduct.forEach(function (btn) {
    btn.addEventListener("click", function (pointerEvent) {
      const id = pointerEvent.target.parentNode.parentNode.id;
      quantityOfProducts++;
      updateCart();
    });
  });

}

function updateCart() {
  const cart = document.querySelector(".quantity-of-products");
  cart.innerHTML = quantityOfProducts;
}

const carrinho = new Cart(products);
// localStorage.setItem('cadrt-cantina-ipddf-powered-by-camplesoft-2024', [1, 2, 4]);