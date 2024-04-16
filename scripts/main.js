import { Header, Footer } from "./header-footer.js";
document.head.innerHTML +=
  '<link rel="stylesheet" href="styles/style_header_and_footer.css">';

const header = new Header();
const footer = new Footer();
header.showElements();
footer.showElements();

