export default class Tooltip extends HTMLElement {
  template: HTMLTemplateElement;
  position: TooltipPosition;

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.template = document.createElement("template");
    this.position = (this.getAttribute("position") as TooltipPosition) || "top";
    this.render();
  }

  static get observedAttributes() {
    return ["position"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue && name === "position") {
      this.position = (newValue as TooltipPosition) || "top";
      this.render();
    }
  }

  render() {
    this.shadowRoot!.innerHTML = "";
    this.template.innerHTML = `
      <style>
        :host {
          position: relative;
          display: inline-block;
          font-family: Arial, Helvertica, sans-serif;
        }

        .tooltip-content {
          visibility: hidden;
          background-color: #333;
          color: #fff;
          text-align: center;
          padding: 0.4rem 0.6rem;
          border-radius: 0.3rem;
          position: absolute;
          z-index: 10;
          font-size: 0.75rem;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        :host(:hover) .tooltip-content,
        :host(:focus-within) .tooltip-content {
          visibility: visible;
          opacity: 1;
        }

        .top    { bottom: 100%; left: 50%; transform: translateX(-50%) translateY(-0.4rem); }
        .bottom { top: 100%; left: 50%; transform: translateX(-50%) translateY(0.4rem); }
        .left   { top: 50%; right: 100%; transform: translateY(-50%) translateX(-0.4rem); }
        .right  { top: 50%; left: 100%; transform: translateY(-50%) translateX(0.4rem); }
      </style>

      <slot></slot>
      <div class="tooltip-content ${this.position}">
        <slot name="tooltip">Tooltip</slot>
      </div>
    `;

    this.shadowRoot?.appendChild(this.template.content.cloneNode(true));
  }
}

type TooltipPosition = "top" | "bottom" | "left" | "right";
