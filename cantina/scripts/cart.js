"use strict";

class Cart {
  constructor(products) {
    const array = [];
    
    this.teste = products;

    this.allProducts = array;
    this.cart = [];
    this.total = 0;

    this.connectEventListeners();
  }

  update(id) {
    
    console.log(this.teste);
    
  }

  connectEventListeners() {
    const btnsAddProduct = [...document.querySelectorAll(".btn-add-product")];
  
    
    let id;
    btnsAddProduct.forEach(function (btn) {
      btn.addEventListener("click", function (pointerEvent) {
        id = pointerEvent.target.parentNode.parentNode.id;
      });
      
    });

    this.update(id);

  }

  addItem(id) {
    this.allProducts[id].quantity++;
    this.update();
  }

  removeItem(id) {
    this.allProducts[id].quantity--;
    this.update();
  }

  deleteItem(id) {
    this.allProducts[id].quantity = 0;
    this.update();
  }
}

export { Cart };

/*

  name: product.name,
  img: product.img,
  id: id,
  currentPrice: Number(product.currentPrice),
  pastPrice: Number(product.pastPrice),
  discount: Number(product.discount),
  quantity: 0,
  subtotal: 0

*/