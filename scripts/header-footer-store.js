class HTMLElement {
  constructor() {
    if (this.constructor === HTMLElement) {
      throw new TypeError("Esta classe não pode ser instânciada");
    } else {
      this.body = document.body;
      this.head = document.head;
      this.siteTitle = "Instituto Politécnico Dom Damião Franklin";

      this.logo = {
        src: "images/logo.png",
        alt: "logo-ipddf",
      };
      this.navBarLinks = [
        {
          text: "início",
          href: "inicio.html",
        },
        {
          text: "instituição",
          href: "instituicao.html",
        },
        {
          text: "contatos",
          href: "contatos.html",
        },
        {
          text: "notícias",
          href: "noticias/inicio.html",
        },
        {
          text: "cantina",
          href: "cantina/inicio.html",
        },
      ];
    }
  }
}

class Header extends HTMLElement {
  constructor() {
    super();
  }

  showElements() {
    this.header = document.createElement("header");

    const containerImg = document.createElement("div");
    containerImg.setAttribute("class", "container-img");
    containerImg.innerHTML = `<a href="${this.navBarLinks[0].href}"><img src="${this.logo.src}" alt="${this.logo.alt}" /></a>`;
    this.header.appendChild(containerImg);

    const searchBar = document.createElement("div");
    searchBar.setAttribute("class", "search-bar");
    searchBar.innerHTML = `
        <input type="search" placeholder="Pesquise no papa-tudo" id="input-search"/>
        <i class="fa-solid fa-magnifying-glass"></i>
      `;
    this.header.appendChild(searchBar);

    const cartLink = document.createElement("a");
    cartLink.setAttribute('href', 'carrinho.html');


    const cartIcon = document.createElement("i");
    cartIcon.setAttribute("class", "fa-solid fa-bag-shopping bag-shipping");
    const quantityOfProducts = document.createElement("span");
    quantityOfProducts.setAttribute('class', 'quantity-of-products');
    quantityOfProducts.innerHTML = 0;

    cartIcon.appendChild(quantityOfProducts);
    cartLink.appendChild(cartIcon);
    this.header.appendChild(cartLink);

    const btnOpenNavBar = document.createElement("i");
    btnOpenNavBar.setAttribute("class", "fa-solid fa-bars");
    btnOpenNavBar.addEventListener("click", this.toggleNavBarVisibility);
    this.header.appendChild(btnOpenNavBar);

    const navBarDesktop = document.createElement("div");
    navBarDesktop.setAttribute("class", "nav-bar");

    this.navBarLinks.forEach((link) => {
      const newLink = document.createElement("a");
      newLink.setAttribute("href", link.href);
      newLink.innerHTML = link.text;
      navBarDesktop.appendChild(newLink);
    });
    this.header.appendChild(navBarDesktop);

    const shadow = document.createElement("div");
    shadow.setAttribute("class", "shadow");

    const navBarPhone = document.createElement("div");
    navBarPhone.setAttribute("class", "nav-bar");

    const headNavBarPhone = document.createElement("div");
    headNavBarPhone.setAttribute("class", "head-nav-bar");

    const tituloNavBarPhone = document.createElement("h2");
    tituloNavBarPhone.innerHTML = "Menu";
    headNavBarPhone.appendChild(tituloNavBarPhone);

    const btnCloseNavBar = document.createElement("i");
    btnCloseNavBar.setAttribute("class", "fa-solid fa-xmark");
    btnCloseNavBar.addEventListener("click", this.toggleNavBarVisibility);
    headNavBarPhone.appendChild(btnCloseNavBar);
    navBarPhone.appendChild(headNavBarPhone);

    const bodyNavBarPhone = document.createElement("div");
    this.navBarLinks.forEach((link) => {
      const newLink = document.createElement("a");
      newLink.setAttribute("href", link.href);
      newLink.innerHTML = link.text;
      bodyNavBarPhone.appendChild(newLink);
    });
    bodyNavBarPhone.setAttribute("class", "body-nav-bar");
    navBarPhone.appendChild(bodyNavBarPhone);

    const footNavBarPhone = document.createElement("div");
    footNavBarPhone.setAttribute("class", "foot-nav-bar");

    const btnSingIn = document.createElement("button");
    btnSingIn.setAttribute("class", "btn-sign-in");
    btnSingIn.innerHTML = "Iniciar Sessão";
    footNavBarPhone.appendChild(btnSingIn);
    navBarPhone.appendChild(footNavBarPhone);

    shadow.appendChild(navBarPhone);
    this.header.appendChild(shadow);

    this.body.prepend(this.header);
  }

  toggleNavBarVisibility() {
    const divShadow = document.querySelector(".shadow");
    divShadow.classList.toggle("show");
  }
}

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  showElements() {
    this.footer = document.createElement("footer");
    this.footer.innerHTML += `
        <div class="head-footer">
          <img src="${this.logo.src}" alt="${this.logo.alt}" />
          <p>${this.siteTitle}</p>
        </div>
      `;

    const mainFooter = document.createElement("div");
    mainFooter.setAttribute("class", "main-footer");

    mainFooter.innerHTML += `
      `;
    let firstCard = `
        <div class="card">
          <h3>Obter ajuda</h3>
          <ul>
      `;
    this.navBarLinks.forEach(function (link) {
      firstCard += `<a href="${link.href}"><li>${link.text}</li></a>`;
    });
    firstCard += `
          </ul>
        </div>
      `;
    mainFooter.innerHTML += `
        ${firstCard}
  
        <div class="card">
          <h3>Endereço</h3>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.250822081558!2d13.282293!3d-8.856225199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f17ccf6bd1db%3A0xecc4d26652142421!2sInstituto%20Polit%C3%A9cnico%20Dom%20Dami%C3%A3o%20Franklin%20N%C2%BA8028!5e0!3m2!1spt-PT!2spt!4v1708854962919!5m2!1spt-PT!2spt" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
  
        <div class="card">
          <h3>Junte-se à nós:</h3>
          <div class="form" method="get" autocomplete="on">
          <input type="email" name="email" id="email" placeholder="Informe seu email">
          <input type="submit" value="enviar">
        </div>
  
        <div class="redes-sociais">
          <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#"><i class="fa-brands fa-instagram"></i></a>
          <a href="#"><i class="fa-solid fa-phone"></i></a>
          <a href="#"><i class="fa-brands fa-whatsapp"></i></a>
        </div>
      `;

    this.footer.appendChild(mainFooter);

    this.footer.innerHTML += `
        <div class="foot-footer">
          <p>2024 <a href="mailto:camplesoft@gmail.com">CampleSoft</a> | Todos direitos reservados</p>
        </div>
      `;

    this.body.appendChild(this.footer);
  }
}

export { Header, Footer };
