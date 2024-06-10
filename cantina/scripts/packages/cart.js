"use strict";
import { Notification } from "./message-box.js";
import { CouponManager } from "./produtos.js";
import { FilterManager } from "./filter-manager.js";

class Cart {
  constructor(products, coupons) {
    const self = this;
    this.date = new Date();
    this.total = 0;
    this.currentYear = this.date.getFullYear();
    this.products = [];
    this.discounts = [];
    this.saleCompleted = false;
    this.totalDiscount = 0;
    this.coupons = coupons;
    this.availableDiscounts = coupons;
    this.messageBox = new Notification({
      duration: 2000,
      position: "bottom",
    });
    this.couponManager = new CouponManager();
    this.filterManager = new FilterManager(products);
    this.originalProducts = this.filterManager.getProducts();

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

    this.checkStorage();
    this.showProducts();
    this.connectEventListeners();
    this.connectBtnAddCoupon();
    this.addCouponsToCouponManager();
  }

  showData() {
    const appliedCoupons = document.getElementById("applied-coupons");
    const totalDiscount = [...document.querySelectorAll(".total-discount")];
    const inputTotalBox = document.getElementById("cart-total");
    const inputCartJson = document.getElementById("cart-json");
    const tagsTotalOfCart = [...document.querySelectorAll(".total-of-cart")];

    if (inputTotalBox) {
      inputTotalBox.value = Number(this.total).toFixed(2);
    }

    if (inputCartJson) {
      inputCartJson.value = localStorage.getItem(
        "cart-cantina-ipddf-powered-by-camplesoft-" + this.currentYear
      );
    }

    if (appliedCoupons) {
      appliedCoupons.value = JSON.stringify(this.discounts);
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
        this.discounts.forEach((coupon, index) => {
          const removeCoupon = (index) => {
            this.discounts.splice(index, 1);
            return 0;
          };

          const currentDiscount =
            this.total >= coupon.usageRule.minValue
              ? this.total * (coupon.discountPercentage / 100)
              : removeCoupon(index);

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
      window.location.pathname === "/ipddf/cantina/checkout.html"
    ) {
      window.location.assign(
        "http://camplesoft.github.io/ipddf/cantina/todos_produtos.html"
      );
    }

    this.showData();
  }

  connectEventListeners() {
    const saleDataForm = document.getElementById("formulario");
    const btnApplyFilters = document.getElementById("btn-apply-filters");
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
    const sortOptions = [...document.querySelectorAll('.sort-option')];

    btnsSkipToCheckout.forEach((btn) => {
      btn.addEventListener("click", () => {
        window.location.assign(
          "http://camplesoft.github.io/ipddf/cantina/checkout.html"
        );
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
      const self = this;

      btnCheckout.addEventListener("click", function () {
        const defaultPaymentGateways = [
          ...document.querySelectorAll(".payment-gateways"),
        ].filter((paymentGateway) => {
          return paymentGateway.id === "cash";
        });

        defaultPaymentGateways[0].checked = true;
      });

      saleDataForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let formData = new FormData(saleDataForm);

        fetch("https://formspree.io/f/xoqgbdov", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              alert(
                "Houve um problema ao realizar a compra. Por favor atualize a sua página para continuar!"
              );
            } else {
              self.saveDetailsPurchase();
              self.resetCart();
              window.location.assign(
                "http://camplesoft.github.io/ipddf/cantina/order-confirmation-page.html"
              );
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert(
              "Houve um problema ao realizar a compra. Por favor atualize a sua página para continuar!"
            );
          });
      });
    }

    if (btnApplyFilters) {
      const resultTitle = document.getElementById('result-title');

      btnApplyFilters.addEventListener("click", () => {
        this.filterManager.filters = [];

        const collectionsSelected = [
          ...document.querySelectorAll(".collection-filters"),
        ].filter((filter) => {
          return filter.checked;
        });

        const maxPriceFilter = document.getElementById("max-price-filter");
        const minPriceFilter = document.getElementById("min-price-filter");

        const collectionFilter = (product) => {
          return collectionsSelected.some((collection) => {
            return product.collections.includes(collection.name);
          });
        };

        const priceFilter = (product) => {
          console.log("price: " + product.currentPrice);
          console.log("min: " + minPriceFilter.value);
          console.log("max: " + maxPriceFilter.value);

          return (
            product.currentPrice >= minPriceFilter.value &&
            product.currentPrice <= maxPriceFilter.value
          );
        };

        if (collectionsSelected.length === 0) {
          resultTitle.innerHTML = 'Todos Produtos';
          this.filterManager.removeFilter(collectionFilter);
          this.update();
          this.showProducts();
        } else {
          
          resultTitle.innerHTML = 'Resultado da pesquisa filtrada';
          this.filterManager.addFilter(collectionFilter);
          this.update();
          this.showProducts();
        }

        if (minPriceFilter.value !== "" || maxPriceFilter.value !== "") {
          const biggestPrice = this.originalProducts.reduce(
            (maxProduct, currentProduct) => {
              return currentProduct.currentPrice > maxProduct.currentPrice
                ? currentProduct
                : maxProduct;
            },
            this.originalProducts[0]
          ).currentPrice;

          minPriceFilter.value =
            minPriceFilter.value === "" || minPriceFilter.value < 0 ? 0 : minPriceFilter.value;

          maxPriceFilter.value =
            maxPriceFilter.value === "" || maxPriceFilter.value < 0 ? biggestPrice : maxPriceFilter.value;

          if (Number(minPriceFilter.value) >= Number(maxPriceFilter.value)) {
            if (Number(minPriceFilter.value) === biggestPrice) {
              minPriceFilter.value -= 1;
            }
            maxPriceFilter.value = Number(minPriceFilter.value) + 1;
          }
          
          if (Number(maxPriceFilter.value) > biggestPrice) {
            maxPriceFilter.value = biggestPrice;
          }

          this.filterManager.addFilter(priceFilter);
          this.update();
          this.showProducts();
        } else {
          this.filterManager.removeFilter(priceFilter);
          this.update();
          this.showProducts();
        }
      });
    }

    if (sortOptions) {
      sortOptions.forEach((option) => {
        option.addEventListener('click', (element) => {
          this.filterManager.sort(element.target.id);
          this.update();
          this.showProducts();
        });
      });
    }
  }

  saveDetailsPurchase() {
    const timestampPurchase = Date.now();
    const couponsAdded = this.couponManager.couponsAdded;
    const cartJson = JSON.parse(
      localStorage.getItem(
        "cart-cantina-ipddf-powered-by-camplesoft-" + this.currentYear
      )
    );
    const totalDiscount = this.totalDiscount;
    const totalCart = this.total;
    const paymentGateways = [];
    [...document.querySelectorAll(".payment-gateways")].forEach(
      (paymentGateway) => {
        if (paymentGateway.checked) paymentGateways.push(paymentGateway.id);
      }
    );
    const clientName = document.getElementById("name").value;
    const clientEmail = document.getElementById("email").value;
    const studentNumber = document.getElementById("numero-de-estudante").value;

    localStorage.setItem(
      "purchase-details-" + this.currentYear,
      JSON.stringify({
        timestampPurchase: timestampPurchase,
        couponsAdded: couponsAdded,
        cartJson: cartJson,
        totalDiscount: totalDiscount,
        totalCart: totalCart,
        paymentGateways: paymentGateways,
        clientName: clientName,
        clientEmail: clientEmail,
        studentNumber: studentNumber,
      })
    );
  }

  showProducts() {
    const productsContainer1 = document.querySelector(".container-products");
    const productsContainer2 = document.querySelector(".grid-products");
    const productsContainer3 = document.querySelector(
      ".grid-products-after-sale"
    );

    if (productsContainer1) {
      productsContainer1.innerHTML = "";
      this.originalProducts = this.filterManager.getProducts();
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
                    }" value="${Number(product.quantity)}" min="1" max="10">
  
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

    if (productsContainer3) {
      productsContainer3.innerHTML = "";

      const detailsPurchase = JSON.parse(
        localStorage.getItem("purchase-details-" + this.currentYear)
      );

      const fillTable = () => {
        const date = new Date(detailsPurchase.timestampPurchase);
        const studentNumber = document.getElementById("student-number");
        const clientName = document.getElementById("fullname");
        const clientEmail = document.getElementById("email");
        const totalDiscount = document.getElementById(
          "total-discount-of-coupons"
        );
        const paymentGateways = document.getElementById("payment-gateways");
        const purchaseDate = document.getElementById("purchase-date");
        const formattedDate = date.toLocaleString("pt-BR");
        const totalCart = document.getElementById("total-of-cart");

        studentNumber.innerHTML = detailsPurchase.studentNumber;
        clientName.innerHTML = detailsPurchase.clientName;
        clientEmail.innerHTML = detailsPurchase.clientEmail;
        totalDiscount.innerHTML =
          Number(detailsPurchase.totalDiscount).toFixed(2) + " Kz";
        paymentGateways.innerHTML = detailsPurchase.paymentGateways;
        purchaseDate.innerHTML = formattedDate;
        totalCart.innerHTML =
          Number(detailsPurchase.totalCart).toFixed(2) + " Kz";
      };
      fillTable();

      const productCounters = [
        ...document.querySelectorAll(".quantity-of-purchased-products"),
      ];
      const products = detailsPurchase.cartJson;

      const cart = products
        ? products.filter((product) => {
            return product.quantity > 0;
          })
        : [];

      productCounters.forEach((element) => {
        element.innerHTML = cart.length;
      });

      if (!(cart.length === 0)) {
        cart.forEach(function (product) {
          productsContainer3.innerHTML += `
          <div class="product" id="${product.id}">
            <div class="img-side">
              <img
                src="${product.img.src}"
                alt="${product.img.alt}"
              />
            </div>
            <div class="description-side">
              <h3 class="product-name">${product.name}</h3>
              <p class="product-variants">${product.collections}</p>
              <p class="section-of-calculation">
                <span class="product-quantity" title="quantidade">${
                  product.quantity
                } unidade(s)</span> x <span class="product-current-price" title="preço unitário">${Number(
            product.currentPrice
          ).toFixed(2)}kz</span>
              </p>
              <div class="price">
                <span class="current-price">Kz ${Number(
                  product.currentPrice * product.quantity
                ).toFixed(2)}</span>
                <span class="comparison-price" style=\"${
                  Number(product.pastPrice) == Number(product.currentPrice)
                    ? "display: none;"
                    : ""
                }\">Kz ${Number(product.pastPrice * product.quantity).toFixed(
            2
          )}</span>
              </div>
            </div>
          </div>

        `;
        });
      }
    }
  }

  checkStorage() {
    if (
      localStorage.getItem(
        "cart-cantina-ipddf-powered-by-camplesoft-" + this.currentYear
      )
    ) {
      const storageProducts = JSON.parse(
        localStorage.getItem(
          "cart-cantina-ipddf-powered-by-camplesoft-" + this.currentYear
        )
      );

      this.products.map((product) => {
        storageProducts.map((productStorage) => {
          if (product.name === productStorage.name) {
            product.quantity = productStorage.quantity;
          }
        });
      });
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
      const operation = this.couponManager.applyDiscount(
        this.total,
        couponInput.value,
        couponNameError
      );

      if (operation.result) this.discounts.push(operation.coupon);
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

  resetCart() {
    this.products.map((product) => (product.quantity = 0));
    this.products = this.originalProducts();
    localStorage.removeItem(
      "cart-cantina-ipddf-powered-by-camplesoft-" + this.currentYear
    );
    this.update();
  }
}

export { Cart };
