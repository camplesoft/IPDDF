class Notification {
  constructor(options = {}) {
    this.notifications = [];
    this.options = {
      duration: options.duration || 5000, // duração padrão de 5 segundos
      position: options.position || "bottom", // posição padrão
    };
    this.interval = setInterval(this.checkTimestamps.bind(this), 100);
    this.injectStyles(); // Injeta estilos CSS
  }

  showMessageBox(message) {
    const messageBox = document.createElement("div");
    messageBox.setAttribute("class", `message-box ${this.options.position}`); // Adiciona a classe de posição e a classe message-box para estilização

    const messageDescription = document.createElement("span");
    messageDescription.innerHTML = `${message}`;

    const btnCloseNotification = document.createElement("i");
    btnCloseNotification.setAttribute(
      "class",
      "fa-solid fa-xmark close-notification"
    );

    messageBox.appendChild(messageDescription);
    messageBox.appendChild(btnCloseNotification);
    document.body.appendChild(messageBox);

    const notification = {
      element: messageBox,
      timestamp: Date.now(),
    };

    this.notifications.push(notification);

    // Adiciona evento de fechamento apenas para esta notificação
    btnCloseNotification.addEventListener("click", () => {
      this.closeNotification(notification);
    });

    // Fecha automaticamente após a duração especificada
    setTimeout(() => {
      this.closeNotification(notification);
    }, this.options.duration);
  }

  checkTimestamps() {
    const now = Date.now();
    this.notifications.forEach((notification, index) => {
      if (now - notification.timestamp >= this.options.duration) {
        this.closeNotification(notification);
      }
    });
  }

  closeNotification(notification) {
    document.body.removeChild(notification.element);
    this.notifications = this.notifications.filter((n) => n !== notification);
  }

  injectStyles() {
    const style = `
      <style>
        .message-box {
          overflow: hidden;
          padding: 10px;
          height: 40px;
          min-width: 250px;
          border-radius: 8px;
          font-family: "Montserrat", Helvetica, sans-serif;
          font-size: 13px;
          color: white;
          background-color: var(--default-color);
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
          display: grid;
          gap: 5px;
          grid-template-columns: 1fr 30px;
          align-items: center;
          justify-items: center;
          align-content: center;
          justify-content: center;
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .message-box p {
          justify-self: start;
          font-size: 12px;
        }
        
        .message-box i {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        .message-box i:hover {
          background-color: rgba(0, 0, 0, 0.2);
        }
        
        .message-box.top {
          top: 80px;
        }
        
        .message-box.bottom {
          bottom: 20px;
        }
      </style>
    `;
    document.head.insertAdjacentHTML("beforeend", style);
  }
}

export { Notification };
