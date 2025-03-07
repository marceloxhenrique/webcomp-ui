export default class Card extends HTMLElement {
  template: HTMLTemplateElement;
  cardTitle: string;
  cardTitleColor: string;
  cardContent: string;
  cardContentColor: string;
  cardImageSource: string;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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
      * {
        margin: 0;
        padding: 0;
      }
      .card {
        display: flex;
        flex-direction: column;
        max-width: 25rem;
        padding: .8rem;
        border: .1rem solid #cfcfd2;
        border-radius: .5rem;
        font-family: Arial, Helvertica, sans-serif;

      }
      .card-img-src{
        width: 100%;
        max-height: 18rem;
        border-radius: .6rem;  
        margin-bottom: .2rem;
        object-fit: contain;
      }
      .card-title {
        text-align: left;
        font-family: Arial, Helvetica, sans-serif;
        padding: .6rem 0 .4rem 0;
        color: ${this.cardTitleColor};
      }
      .card-content{
        padding-bottom: 1.4rem;
        color: ${this.cardContentColor};
        
      }
      
    </style>
    <div class="card">
      <img class="card-img-src" src="${this.cardImageSource}" alt="Card Image">
      <h1 class="card-title">${this.cardTitle}</h1>
      <p class="card-content">${this.cardContent}</p>
      <slot></slot>
    </div>
    `;
    this.template.setAttribute("part", "u-card");
    this.shadowRoot?.appendChild(this.template.content.cloneNode(true));
  }
}
