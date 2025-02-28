export default class Ucard extends HTMLElement {
  template: HTMLTemplateElement;
  title: string;
  content: string;
  imageSource: string;
  width: string;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.template = document.createElement("template");
    this.title = this.getAttribute("title") ?? "My Title";
    this.content = this.getAttribute("content") ?? "My Content";
    this.imageSource =
      this.getAttribute("img") ??
      "https://images.pexels.com/photos/1148565/pexels-photo-1148565.jpeg?auto=compress&cs=tinysrgb&w=600";
    this.width = this.getAttribute("width") ?? "25rem";
    this.template.innerHTML = `
      <style>
        .card-custom{
          display: flex;
          flex-direction: column;
          width: ${this.width};
          padding: .8rem;
          border-radius: .8rem;
          border: .1rem solid lightgray;
          font-family: Arial, Helvetica, sans-serif;
          text-align: left;
          gap: .8rem;
        }
        .image-container{
          width: 100%;
          border-radius: .6rem;  
          margin-bottom: .2rem;
        }
        .title{
          margin: 0;
          font-size: 1.6rem;
        }
        .content{
          margin: 0;
          font-size: 1rem;
        }
      </style>
      <section class="card-custom" part="u-card">
        <img class="image-container" src="${this.imageSource}" alt="Card Image" />
        <h1 class="title">${this.title}</h1>
        <p class="content">${this.content}</p>
        <slot></slot>
      </section>
    `;
    this.template.setAttribute("part", "u-card");
    this.shadowRoot?.appendChild(this.template.content.cloneNode(true));
  }
}
