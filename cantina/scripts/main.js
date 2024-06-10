import { Header, Footer } from "../../scripts/header-footer-store.js";
import { animation1 } from "./packages/animations/search-bar.js";
import { products, collections, coupons } from "./packages/produtos.js";
import { Cart } from "./packages/cart.js";
import { fnCapitalize } from "./packages/text-formation.js";

connectEventListeners();
insertHeaderAndFooter();
insertFilters();
performSearchButtonAnimation();

// INSERTS
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

  const btnShowFilterOptions = document.getElementById(
    "btn-show-filter-options"
  );
  const btnShowSortOptions = document.getElementById("btn-show-sort-options");

  const shadowFilters = document.querySelector(".shadow.filters");
  const btnCloseFilterOptions = [
    ...document.querySelectorAll(".btn-close-filter-options"),
  ];
  const sortOptions = [...document.querySelectorAll(".sort-option")];
  const containerFilterOptions = document.querySelector(
    ".container-filters-options"
  );
  const containerSortOptions = document.querySelector(
    ".container-sort-options"
  );
  const btnApplyFilters = document.getElementById("btn-apply-filters");

  if (btnApplyFilters) {
    btnApplyFilters.addEventListener("click", () => {
      shadowFilters.click();
    });
  }

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

  if (shadowFilters) {
    shadowFilters.addEventListener("click", () => {
      requestAnimationFrame(() => {
        containerFilterOptions.style.left = "-100vw";
      });

      requestAnimationFrame(() => {
        containerSortOptions.style.bottom = "-100vh";
      });

      setTimeout(() => {
        shadowFilters.style.display = "none";
      }, 400);
    });

    const childShadow = [...shadowFilters.children];
    childShadow.forEach((child) => {
      child.addEventListener("click", (event) => event.stopPropagation());
    });
  }

  if (btnCloseFilterOptions.length > 0) {
    btnCloseFilterOptions.forEach((btn) => {
      btn.addEventListener("click", () => {
        shadowFilters.click();
      });
    });
  }

  if (btnShowFilterOptions) {
    btnShowFilterOptions.addEventListener("click", () => {
      shadowFilters.style.display = "flex";
      showFilterAndSortOptions("btn-show-filter-options");
    });
  }

  if (btnShowSortOptions) {
    btnShowSortOptions.addEventListener("click", () => {
      shadowFilters.style.display = "flex";
      showFilterAndSortOptions("btn-show-sort-options");
    });
  }

  if (sortOptions) {
    sortOptions.forEach((option) => {
      option.addEventListener("click", () => {
        shadowFilters.click();
      });
    });
  }
}

function insertFilters() {
  const collectionFilterContainer = document.getElementById(
    "collection-filter-container"
  );

  if (collectionFilterContainer) {
    collectionFilterContainer.innerHTML = "";

    collections.forEach((collection) => {
      collectionFilterContainer.innerHTML += `
      
            <li class="input-field">
              <input type="checkbox" name="${collection}" id="${collection}" class="collection-filters" />
              <label for="${collection}">${fnCapitalize(collection)}</label>
            </li>
      
      `;
    });
  }
}

// ANIMATIONS
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

function showFilterAndSortOptions(btn) {
  switch (btn) {
    case "btn-show-filter-options":
      const containerFilterOptions = document.querySelector(
        ".container-filters-options"
      );
      requestAnimationFrame(() => {
        containerFilterOptions.style.left = "0";
      });
      break;
    case "btn-show-sort-options":
      const containerSortOptions = document.querySelector(
        ".container-sort-options"
      );
      requestAnimationFrame(() => {
        containerSortOptions.style.bottom = "0";
      });
      break;
    default:
      console.log("btn desconhecido");
  }
}

const carrinho = new Cart(products, coupons);

/*

  dar funcionalidade aos cards da página inicial da cantina

  dar funcionalidade a barra de pesquisa

  criar um grupo de produtos dinâmicos em forma de carrossel, para poder apresentar produtos como sugestão e também para colocar na página inicial

*/
