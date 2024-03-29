import { Header, Footer } from "../../scripts/elementos_reaproveitaveis.js";
document.head.innerHTML +=
  '<link rel="stylesheet" href="../styles/style_header_and_footer.css">';

const header = new Header();
const footer = new Footer();

const array = [header, footer];

array.forEach(function(element) {
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

  element.logo.src = '../images/logo.png';
  element.showElements();
});
