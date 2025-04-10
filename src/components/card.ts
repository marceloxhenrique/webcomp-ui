export default class Card extends HTMLElement {
  template: HTMLTemplateElement;
  cardTitle: string;
  cardTitleColor: string;
  cardContent: string;
  cardContentColor: string;
  cardImageSource: string;
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.template = document.createElement("template");
    this.cardTitle = this.getAttribute("card-title") || "My card title";
    this.cardContentColor = this.getAttribute("card-content-color") || "#303131";
    this.cardTitleColor = this.getAttribute("card-title-color") || "#303131";
    this.cardImageSource =
      this.getAttribute("card-img-src") ??
      "https://images.pexels.com/photos/1148565/pexels-photo-1148565.jpeg?auto=compress&cs=tinysrgb&w=600";
    this.cardContent =
      this.getAttribute("card-content") ??
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ipsa dolorem, ipsum illum incidunt labore cupiditate mollitia veritatis natus aspernatur harum eius officiis, ex omnis. Ea blanditiis excepturi ipsam laboriosam.";
    this.render();
  }

  static get observedAttributes() {
    return ["card-title", "card-img-src", "card-content"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      const attributeMap: Record<string, keyof this> = {
        "card-title": "cardTitle",
        "card-content": "cardContent",
        "card-img-src": "cardImageSource",
      };
      if (attributeMap[name]) {
        (this[attributeMap[name]] as String) = newValue;
        this.render();
      }
    }
  }

  render() {
    this.shadowRoot!.innerHTML = ``;
    this.template.innerHTML = `
    <style>
      *{
        margin: 0;
        padding: 0;
      }
      :host {
        display: block;
        font-family: "Segoe UI", Roboto, sans-serif;
      }

      .card {
        background-color: #ffffff;
        border-radius: 1rem;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
        overflow: hidden;
        max-width: 25rem;
      }

      .card-img-src {
        width: 100%;
        height: 14rem;
        object-fit: cover;
      }

      .card-content-wrapper {
        padding: 1.5rem;
      }

      .card-title {
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: ${this.cardTitleColor};
      }

      .card-content {
        font-size: 0.95rem;
        line-height: 1.6;
        color: ${this.cardContentColor};
      }

      slot {
        display: block;
        margin-top: 1rem;
      }
    </style>
    <div class="card">
      <img class="card-img-src" src="${this.cardImageSource}" alt="Card Image" />
      <div class="card-content-wrapper">
        <h1 class="card-title">${this.cardTitle}</h1>
        <p class="card-content">${this.cardContent}</p>
        <slot></slot>
      </div>
    </div>
  `;
    this.template.setAttribute("part", "w-card");
    this.shadowRoot?.appendChild(this.template.content.cloneNode(true));
  }
}
