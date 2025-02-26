export default class Ubutton extends HTMLElement {
  styles: ButtonStyles = {
    default: {
      background: "#242526",
      background_hover: "#303131",
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
      background_hover: "#DFDFDF",
      border: "solid 1px #e4e4e7 ",
      color: "#242526",
    },
    danger: {
      background: "#DC2626",
      background_hover: "#E44949",
      border: "solid 1px transparent",
      color: "#FFFFFF",
    },
  };
  constructor() {
    super();
    const shadow: ShadowRoot = this.attachShadow({ mode: "open" });
    const button: HTMLElement = document.createElement("button");
    button.setAttribute("class", "button-custom");
    button.innerHTML = `<slot></slot>`;
    const variant = (this.getAttribute("variant") as ButtonVariant) ?? ButtonVariant.DEFAULT;
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
  DEFAULT = "default",
  SECONDARY = "secondary",
  OUTLINE = "outline",
  DANGER = "danger",
}

type ButtonTheme = {
  background: string;
  background_hover: string;
  border: string;
  color: string;
};

type ButtonStyles = {
  default: ButtonTheme;
  secondary: ButtonTheme;
  outline: ButtonTheme;
  danger: ButtonTheme;
};
