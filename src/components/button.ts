export default class Ubutton extends HTMLElement {
  styles: ButtonStyles = {
    default: {
      background: "#242526",
      background_hover: "#303131",
      border: "solid 1px transparent",
      color: "#FFFFFF",
    },
    danger: {
      background: "#DC2626",
      background_hover: "#E44949",
      border: "solid 1px transparent",
      color: "#FFFFFF",
    },
    secondary: {
      background: "#DFDFDF",
      background_hover: "none",
      border: "solid 1px transparent",
      color: "#242526",
    },
    outline: {
      background: "#ffffff",
      background_hover: "#D3D3D3",
      border: "solid 1px #D3D3D3 ",
      color: "#242526",
    },
  };
  constructor() {
    super();
    const shadow: ShadowRoot = this.attachShadow({ mode: "closed" });
    const button: HTMLElement = document.createElement("button");
    button.setAttribute("class", "button-custom");
    button.innerHTML = `<slot></slot>`;
    const variant: ButtonVariant =
      (this.getAttribute("variant") as ButtonVariant) ?? ButtonVariant.default;
    const style: HTMLStyleElement = document.createElement("style");
    style.textContent = `
      .button-custom {
        margin: 0;padding: 0;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .6rem 1.4rem;
        border-radius: .5rem;
        font-size: .875rem;
        font-weight: 500;
        line-height: 1.25rem;
        cursor: pointer;
        border: ${this.styles[variant]?.border || this.styles.default.border};
        color: ${this.styles[variant]?.color || this.styles.default.color};
        background-color: ${this.styles[variant]?.background || this.styles.default.background}; 
      }
      .button-custom:hover {
        background-color: ${
          this.styles[variant]?.background_hover || this.styles.default.background_hover
        };
      }
    `;
    button.setAttribute("part", "u-button");
    shadow.appendChild(button);
    shadow.appendChild(style);
  }
}

enum ButtonVariant {
  default = "default",
  danger = "danger",
  secondary = "secondary",
  outline = "outline",
}

type ButtonTheme = {
  background: string;
  background_hover: string;
  border: string;
  color: string;
};

type ButtonStyles = {
  default: ButtonTheme;
  danger: ButtonTheme;
  secondary: ButtonTheme;
  outline: ButtonTheme;
};
