const ButtonVariant = {
  default: "default",
  secondary: "secondary",
  outline: "outline",
  danger: "danger",
} as const;

type ButtonVariant = keyof typeof ButtonVariant;

type ButtonTheme = {
  background: string;
  background_hover: string;
  border: string;
  color: string;
};

type ButtonStyles = Record<ButtonVariant, ButtonTheme>;

export default class Button extends HTMLElement {
  template: HTMLTemplateElement;
  variant: ButtonVariant;
  width: string;
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
    this.attachShadow({ mode: "open" });
    this.template = document.createElement("template");
    this.variant = (this.getAttribute("variant") as ButtonVariant) || ButtonVariant.default;
    this.width = this.getAttribute("width") || "auto";
    this.render();
  }

  static get observedAttributes() {
    return ["variant", "width"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      if (name === "variant") this.variant = (newValue as ButtonVariant) || ButtonVariant.default;
      if (name === "width") this.width = newValue || "auto";
      this.render();
    }
  }

  render() {
    this.shadowRoot!.innerHTML = ``;
    this.template.innerHTML = `
    <style>
    .button-custom {
      width: ${this.width};
      justify-content: center;
      align-items: center;
      padding: .6rem 1.4rem;
      border-radius: .5rem;
      font-size: .875rem;
      font-weight: 500;
      line-height: 1.25rem;
      cursor: pointer;
      border: ${this.styles[this.variant]?.border || this.styles.default.border};
      color: ${this.styles[this.variant]?.color || this.styles.default.color};
      background-color: ${this.styles[this.variant]?.background || this.styles.default.background}; 
      }
      .button-custom:hover {
        background-color: ${
          this.styles[this.variant]?.background_hover || this.styles.default.background_hover
        };
    }
    </style>
      <button class="button-custom" part="w-button">
        <slot></slot>
      </button>
    `;
    this.template.setAttribute("part", "w-button");
    this.shadowRoot?.appendChild(this.template.content.cloneNode(true));
  }
}
customElements.define("w-button", Button);
