import { Header, Footer } from "../../scripts/header-footer-store.js";
import { animation1 } from "./animações/search-bar.js";
import { products, collections, coupons } from "./produtos.js";
import { Cart } from "./cart.js";

connectEventListeners();
insertHeaderAndFooter();
performSearchButtonAnimation();

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

function connectEventListeners() {
  const elementsMinimizeResume = [
    document.getElementById("icon-minimize-resume-cart"),
    document.querySelector(".head-resume-cart"),
  ];

  if (elementsMinimizeResume) {
    elementsMinimizeResume.forEach((element) => {
      if (element) element.addEventListener("click", minimizeResume);
    });

    if (elementsMinimizeResume[0]) {
      if (elementsMinimizeResume[0].id === "icon-minimize-resume-cart") {
        elementsMinimizeResume[0].addEventListener("click", (pointer) => {
          pointer.stopPropagation();
        });
      }
    }
  }
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

function minimizeResume() {
  const divResumeCart = document.querySelector(".resume-cart");

  divResumeCart.classList.toggle("minimized");
}

const carrinho = new Cart(products, coupons);
