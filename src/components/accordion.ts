export default class Accordion extends HTMLElement {
  template: HTMLTemplateElement;

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.template = document.createElement("template");
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = ``;
    this.template.innerHTML = `
      <style>
        .accordion {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          background-color: #fff;
          font-family: Arial, Elvetica, sans-serif;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }
        .accordion-item {
          border-bottom: 1px solid #e5e7eb;
        }

        .accordion-item:last-child {
          border-bottom: none;
        }

        .accordion-header {
          padding: 1rem 1.25rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          color: #374151;
          transition: background-color 0.15s ease-in-out;
        }

        .accordion-header:hover {
          background-color: #f9fafb;
        }

        .accordion-header::after {
          content: '⌵';
          width: 1rem;
          height: 1rem;
          background-repeat: no-repeat;
          background-size: contain;
          transition: transform 0.2s ease-in-out;
        }

        .accordion-header.active::after {
          transform: rotate(90deg);
        }

        .accordion-content {
          padding: 0.75rem 1.25rem;
          display: none;
          color: #4b5563;
          line-height: 1.6;
        }

        .accordion-content.active {
          display: block;
        }
      </style>
      <div class="accordion">
        <slot></slot>
      </div>
    `;
    this.shadowRoot?.appendChild(this.template.content.cloneNode(true));
    this.setupAccordion();
  }

  setupAccordion() {
    const slot = this.shadowRoot?.querySelector("slot");
    if (!slot) return;

    const nodes = slot.assignedNodes().filter((node) => node.nodeType === Node.ELEMENT_NODE) as HTMLElement[];

    nodes.forEach((node) => {
      const header = document.createElement("div");
      header.classList.add("accordion-header");
      header.textContent = node.getAttribute("header") || "Accordion Item";
      node.removeAttribute("header");

      const content = document.createElement("div");
      content.classList.add("accordion-content");
      content.appendChild(node);

      const item = document.createElement("div");
      item.classList.add("accordion-item");
      item.appendChild(header);
      item.appendChild(content);

      this.shadowRoot?.querySelector(".accordion")?.appendChild(item);

      header.addEventListener("click", () => {
        header.classList.toggle("active");
        content.classList.toggle("active");
      });
    });
  }
}
customElements.define("w-accordion", Accordion);
