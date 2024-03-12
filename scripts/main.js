import { Header, Footer } from "./elementos_reaproveitaveis.js";
document.head.innerHTML +=
  '<link rel="stylesheet" href="styles/style_header_and_footer.css">';

const header = new Header();
const footer = new Footer();
header.showElements();
footer.showElements();

