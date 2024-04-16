"use strict";

class Produto {
  constructor(name, img, collection, currentPrice, pastPrice) {
    this.name = name;
    this.collections = collection;
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

const collections = [
  "Bebidas", // 0
  "Mais vendidos", // 1
  "Pastelaria", // 2
  "Novidades", // 3
  "Fritos", // 4
  "Bolachas", // 5
];

const products = [
  new Produto(
    "banana frita",
    { src: "images/produtos/banana-frita.png", alt: "imagem de banana" },
    [collections[5]],
    100,
    150
  ),
  new Produto(
    "blue laranja",
    { src: "images/produtos/blue-laranja.png", alt: "imagem da Blue" },
    [collections[0], collections[1]],
    150,
    150
  ),
  new Produto(
    "blue limão e gengibre",
    { src: "images/produtos/blue-limao-e-gengibre.png", alt: "imagem da Blue" },
    [collections[0], collections[1]],
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
    [collections[6]],
    250,
    250
  ),
  new Produto(
    "bolacha hipopo de morango",
    {
      src: "images/produtos/hipopo-vermelha.png",
      alt: "imagem de bolacha Hipopo",
    },
    [collections[6]],
    250,
    300
  ),
  new Produto(
    "bolacha hipopo de chocolate preto",
    {
      src: "images/produtos/chocolate-preto.png",
      alt: "imagem de bolacha Hipopo",
    },
    [collections[6]],
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
    [collections[0], collections[1]],
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
    200,
    200
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
  new Produto(
    "Serranitas",
    {
      src: "images/produtos/serranitas.webp",
      alt: "imagem da bolacha serranitas"
    },
    [collections[5], collections[1]],
    350,
    450
  ),
];

export { products, collections };

// SCRIPT DO ADÃO
