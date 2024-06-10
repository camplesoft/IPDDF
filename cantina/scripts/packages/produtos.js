"use strict";

class Produto {
  constructor(name, img, collection, currentPrice, pastPrice) {
    this.name = name;
    this.collections = [...collection];
    this.img = {
      src: img.src,
      alt: img.alt,
    };
    this.currentPrice = currentPrice;
    this.pastPrice = pastPrice;
    this.discount =
      ((this.pastPrice - this.currentPrice) / this.pastPrice) * 100;
  }
}

class CouponManager {
  constructor() {
    this.coupons = [];
    this.couponsAdded = [];
  }

  addCoupon(coupon) {
    this.coupons.push(coupon);
  }

  isValidCoupon(couponName) {
    const testResult =
      this.coupons.some((coupon) => coupon.name === couponName) &&
      !(this.couponsAdded.includes(couponName));
    
    return testResult;
  }

  applyDiscount(totalCart, couponName, couponNameError) {
    const coupon = this.coupons.find((coupon) => coupon.name === couponName);

    if (coupon) {
      const returnValue = {
        result: false,
        coupon: coupon
      };

      switch (coupon.usageRule.description) {
        case "greatest":
          if (totalCart < coupon.usageRule.minValue) {
            couponNameError.innerHTML = `Valor mínimo para aplicar o cupom é ${coupon.usageRule.minValue.toFixed(
              2
            )}Kz`;
          } else {
            returnValue.result = true;
            this.addCouponTopHistoric(coupon.name);
          }
          break;
        case "nothing":
          returnValue.result = true;
          this.addCouponTopHistoric(coupon.name);
          break;
        default:
          returnValue.result = false;
      }

      return returnValue;
    }
  }

  addCouponTopHistoric(couponName) {
    this.couponsAdded.push(couponName);
  }
}

class Coupon {
  constructor(options = {}) {
    this.name = options.name;
    this.totalUses = options.totalUses || 5;
    this.usageRule = options.usageRule || {
      description: "nothing",
      minValue: 0,
    };
    this.discountPercentage = options.discountPercentage || 5;
  }
}

const coupons = [
  new Coupon({
    name: "MM5",
    totalUses: 3,
    usageRule: {
      description: "greatest",
      minValue: 500,
    },
    discountPercentage: 5,
  }),
  new Coupon({
    name: "IPDDF",
    totalUses: 1,
    usageRule: {
      description: "nothing",
      minValue: 0,
    },
    discountPercentage: 15,
  }),
];

const collections = [
  "bebidas", // 0
  "mais vendidos", // 1
  "pastelaria", // 2
  "novidades", // 3
  "fritos", // 4
  "bolachas", // 5
];

const products = [
  new Produto(
    "banana frita",
    { src: "images/produtos/banana-frita.png", alt: "imagem de banana" },
    [collections[4], collections[1]],
    100,
    150
  ),
  new Produto(
    "blue laranja",
    { src: "images/produtos/blue-laranja.png", alt: "imagem da Blue" },
    [collections[1], collections[0]],
    150,
    150
  ),
  new Produto(
    "blue limão e gengibre",
    { src: "images/produtos/blue-limao-e-gengibre.png", alt: "imagem da Blue" },
    [collections[1], collections[0]],
    150,
    150
  ),
  new Produto(
    "bola de berlim",
    {
      src: "images/produtos/bola-de-berlim.png",
      alt: "imagem de bola de berlim",
    },
    [collections[2]],
    100,
    150
  ),
  new Produto(
    "bolacha hipopo de chocolate",
    { src: "images/produtos/chocolate.png", alt: "imagem de bolacha Hipopo" },
    [collections[5]],
    250,
    250
  ),
  new Produto(
    "bolacha hipopo de morango",
    {
      src: "images/produtos/hipopo-vermelha.png",
      alt: "imagem de bolacha Hipopo",
    },
    [collections[5]],
    250,
    300
  ),
  new Produto(
    "bolacha hipopo de chocolate preto",
    {
      src: "images/produtos/chocolate-preto.png",
      alt: "imagem de bolacha Hipopo",
    },
    [collections[5]],
    250,
    250
  ),
  new Produto(
    "sumo lulu de laranja",
    { src: "images/produtos/lulu-laranja.png", alt: "imagem de sumo Lulu" },
    [collections[0]],
    200,
    250
  ),
  new Produto(
    "red cola",
    { src: "images/produtos/red-cola.png", alt: "imagem de Red cola" },
    [collections[0], collections[1]],
    150,
    150
  ),
  new Produto(
    "bolacha renata",
    { src: "images/produtos/agua-e-sal.png", alt: "imagem de Bolacha Renata" },
    [collections[5], collections[1]],
    600,
    750
  ),
  new Produto(
    "serranitas",
    {
      src: "images/produtos/serranitas.jpg",
      alt: "imagem de bolacha serranita",
    },
    [collections[5]],
    350,
    450
  ),
  new Produto(
    "glucose",
    {
      src: "images/produtos/bolacha-glucose.jpg",
      alt: "imagem da bolacha glucose",
    },
    [collections[5]],
    100,
    100
  ),
];

export { products, collections, coupons, CouponManager };
