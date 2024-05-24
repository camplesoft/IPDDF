"use strict";
import { Notification } from "./message-box.js";
import { CouponManager } from "./produtos.js";

/* 
  DESAPLICAR CUPOM QUE EXIGEM VALOR MÍNIMO DE APLICAÇÃO
  */

class Cart {
  constructor(products, coupons) {
    const self = this;
    this.total = 0;
    this.products = [];
    this.discounts = [];
    this.totalDiscount = 0;
    this.couponAdded = [];
    this.coupons = coupons;
    this.originalProducts = products;
    this.availableDiscounts = coupons;
    this.messageBox = new Notification({
      duration: 2000,
      position: "bottom",
    });
    this.couponManager = new CouponManager();

    products.forEach((value, id) => {
      self.products.push({
        name: value.name,
        img: value.img,
        id: id,
        collections: value.collections,
        currentPrice: Number(value.currentPrice),
        pastPrice: Number(value.pastPrice),
        discount: Number(value.discount),
        quantity: 0,
        subtotal: 0,
      });
    });

    this.connectBtnAddCoupon = () => {
      const btnsAddCoupon = [...document.querySelectorAll(".btn-add-coupon")];

      if (btnsAddCoupon.length > 0) {
        btnsAddCoupon.forEach((btn) => {
          btn.addEventListener("click", this.applyCoupon.bind(this));
        });
      }
    };

    this.interval = setInterval(this.update.bind(this), 1000);
    this.checkStorage();
    this.showProducts();
    this.connectEventListeners();
    this.connectBtnAddCoupon();
    this.addCouponsToCouponManager();
  }

  showData() {
    const totalDiscount = [...document.querySelectorAll(".total-discount")];
    const inputTotalBox = document.getElementById("cart-total");
    const inputCartJson = document.getElementById("cart-json");
    const tagsTotalOfCart = [...document.querySelectorAll(".total-of-cart")];

    if (inputTotalBox) {
      inputTotalBox.value = Number(this.total).toFixed(2);
    }

    if (inputCartJson) {
      inputCartJson.value = localStorage.getItem(
        "cart-cantina-ipddf-powered-by-camplesoft-2024"
      );
    }

    if (totalDiscount.length > 0) {
      totalDiscount.forEach((element) => {
        if (element.tagName === "INPUT") {
          element.value = Number(this.totalDiscount);
        } else {
          element.innerHTML = `Kz ${Number(this.totalDiscount).toFixed(2)}`;
        }
      });
    }

    if (tagsTotalOfCart.length > 0) {
      tagsTotalOfCart.forEach((div) => {
        div.innerHTML = `Kz ${Number(this.total).toFixed(2)}`;
      });
    }
  }

  update() {
    // RESET
    const productCounters = document.querySelectorAll(".quantity-of-products");
    let quantityOfProducts = 0;
    this.total = 0;

    // PRODUCTS ADDED
    const cart = this.products;

    cart.forEach((product) => {
      product.subtotal = product.currentPrice * product.quantity;

      this.total += product.subtotal;
    });

    const applyDiscountsToTheTotal = () => {
      this.totalDiscount = 0;
      if (this.discounts.length === 0) {
        this.total = this.total;
      } else {
        this.discounts.forEach((percentage) => {
          const currentDiscount = this.total * (percentage / 100);
          this.totalDiscount += currentDiscount;
          this.total -= currentDiscount;
        });
      }
    };
    applyDiscountsToTheTotal();

    // SHOW QUANTITY OF PRODUCT TO USER
    for (const product of cart) {
      quantityOfProducts += Number(product.quantity);
    }

    // SAVING DATA
    localStorage.setItem(
      "cart-cantina-ipddf-powered-by-camplesoft-2024",
      JSON.stringify(cart)
    );

    productCounters.forEach((element) => {
      element.innerHTML = quantityOfProducts;
    });

    if (
      Number(quantityOfProducts) === 0 &&
      window.location.pathname === "/cantina/checkout.html"
    ) {
      window.location.assign(
        "http://127.0.0.1:5501/cantina/todos_produtos.html"
      );
    }

    this.showData();
  }

  connectEventListeners() {
    const btnCheckout = document.getElementById("checkout-button");
    const btnsSkipToCheckout = [
      ...document.querySelectorAll(".btns-skip-to-checkout"),
    ];
    const btnsAddProduct = [...document.querySelectorAll(".btn-add-product")];
    const btnRemoveProduct = [
      ...document.querySelectorAll(".btn-remove-product"),
    ];
    const quantityButtons = [...document.querySelectorAll(".quantity-buttons")];
    const quantityInputs = [...document.querySelectorAll(".input-quantity")];

    btnsSkipToCheckout.forEach((btn) => {
      btn.addEventListener("click", () => {
        window.location.assign("http://127.0.0.1:5501/cantina/checkout.html");
      });
    });

    btnsAddProduct.forEach((btn) => {
      btn.addEventListener("click", (pointerEvent) => {
        const id = pointerEvent.target.parentNode.parentNode.id;
        this.addItem.bind(this)(id);
      });
    });

    btnRemoveProduct.forEach((btn) => {
      btn.addEventListener("click", (pointerEvent) => {
        const id = pointerEvent.target.parentNode.parentNode.id;
        this.deleteItem.bind(this)(id);
      });
    });

    quantityButtons.forEach((btn) => {
      btn.addEventListener("click", (pointerEvent) => {
        const id = pointerEvent.target.parentNode.parentNode.parentNode.id;
        const inputQuantity = document.querySelector(`#quantity-${id}`);

        switch (btn.value) {
          case "+":
            this.addItem.bind(this)(id);
            break;

          case "-":
            if (!(Number(inputQuantity.value) === 1)) {
              this.removeItem.bind(this)(id);
            }
            break;
        }

        this.showProducts();
        this.connectEventListeners();
      });
    });

    quantityInputs.forEach((input) => {
      input.addEventListener("change", (pointerEvent) => {
        const id = pointerEvent.target.parentNode.parentNode.parentNode.id;

        this.products[id].quantity =
          Number(pointerEvent.target.value) > 0
            ? pointerEvent.target.value
            : this.products[id].quantity;
        this.update();
        this.showProducts();
        this.connectEventListeners();
      });
    });

    if (btnCheckout) {
      btnCheckout.addEventListener("click", () => {});
    }
  }

  showProducts() {
    const productsContainer1 = document.querySelector(".container-products");
    const productsContainer2 = document.querySelector(".grid-products");

    if (productsContainer1) {
      productsContainer1.innerHTML = "";
      this.originalProducts.forEach(function (product, id) {
        productsContainer1.innerHTML += `
    
      <div class="product" id="${id}">
        <span class="discount" style=\"${
          Number(product.discount) <= 0 ? "display: none;" : ""
        }\">
          - ${Number(product.discount).toFixed(0)}%
        </span>
  
        <div class="product-img">
          <img src="${product.img.src}" alt="${product.img.alt}" />
        </div>
  
        <div class="product-description">
          <h2 class="product-name">${product.name}</h2>
  
          <div class="price">
            <span class="current-price">KZ ${Number(
              product.currentPrice
            ).toFixed(2)}</span>
            <span class="comparison-price" style=\"${
              Number(product.pastPrice) == Number(product.currentPrice)
                ? "display: none;"
                : ""
            }\">KZ ${Number(product.pastPrice).toFixed(2)}</span>
          </div>
  
          <i class="fa-solid fa-plus btn-add-product"></i>
        </div>
        
      </div>
    
      `;
      });
    }

    if (productsContainer2) {
      productsContainer2.innerHTML = "";

      //DECLARAÇÃO - VARIÁVEIS
      const sectionCartOfProduct = document.querySelector(".cart-of-products");
      const sectionNoProductsOnCart = document.querySelector(
        ".no-products-on-cart"
      );

      const products = JSON.parse(
        localStorage.getItem("cart-cantina-ipddf-powered-by-camplesoft-2024")
      );

      const cart = products
        ? products.filter((product) => {
            return product.quantity > 0;
          })
        : [];

      if (sectionNoProductsOnCart) {
        sectionNoProductsOnCart.style.display = "flex";
      }

      if (!(cart.length === 0)) {
        if (sectionNoProductsOnCart) {
          sectionNoProductsOnCart.style.display = "none";
        }

        cart.forEach(function (product, id) {
          productsContainer2.innerHTML += `
      
          <div class="product" id="${product.id}">
                <div class="img-side">
                  <img src="${product.img.src}" alt="${product.img.alt}">
                </div>
                <div class="description-side">
                  <h3 class="product-name">${product.name}</h3>
                  <p class="product-variants">${product.collections}</p>
                  <div class="price">
                    <span class="current-price">Kz ${Number(
                      product.subtotal
                    ).toFixed(2)}</span>
                    <span class="comparison-price" style=\"${
                      Number(product.pastPrice) == Number(product.currentPrice)
                        ? "display: none;"
                        : ""
                    }\">Kz ${Number(
            product.pastPrice * product.quantity
          ).toFixed(2)}</span>
                  </div>
                </div>
                <div class="controls">
                  <div class="container-quantity-product">
  
                    <input type="button" value="-" id="minus" class="quantity-buttons">
  
                    <input type="number" name="quantity" class="input-quantity" id="quantity-${
                      product.id
                    }" value="${Number(product.quantity)}" min="1">
  
                    <input type="button" value="+" id="plus" class="quantity-buttons">
                  </div>
  
                  <span class="btn-remove-product">Remover</span>
                </div>
              </div>
        
        `;
        });
      } else if (sectionCartOfProduct) {
        sectionCartOfProduct.style.display = "none";
      }
    }
  }

  checkStorage() {
    const currentYear = new Date().getFullYear();

    if (
      localStorage.getItem(
        "cart-cantina-ipddf-powered-by-camplesoft-" + currentYear
      )
    ) {
      this.products = JSON.parse(
        localStorage.getItem("cart-cantina-ipddf-powered-by-camplesoft-2024")
      );
      this.update();
    }
  }

  addCouponsToCouponManager() {
    this.coupons.forEach((coupon) => {
      this.couponManager.addCoupon(coupon);
    });
  }

  applyCoupon() {
    const couponInput = document.getElementById("input-coupon");
    const couponNameError = document.getElementById("coupon-name-error");

    if (this.couponManager.isValidCoupon(couponInput.value)) {
      couponNameError.innerHTML = "";
      this.discounts.push( Number(
        this.couponManager.applyDiscount(
          this.total,
          couponInput.value,
          couponNameError
        )
      ));
    } else {
      couponNameError.innerHTML = "Cupom inválido!";
    }

    this.update();
    couponInput.value = "";
  }

  addItem(id) {
    this.products[id].quantity++;
    this.update();
    this.messageBox.showMessageBox("adicionado com sucesso");
  }

  removeItem(id) {
    this.products[id].quantity--;
    this.update();
  }

  deleteItem(id) {
    this.products[id].quantity = 0;
    this.messageBox.showMessageBox("removido com sucesso");
    this.update();
    this.showProducts();
    this.connectEventListeners();
  }
}

export { Cart };
