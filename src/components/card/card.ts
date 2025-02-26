export default class Ucard extends HTMLElement {
  constructor() {
    super();
    const shadow: ShadowRoot = this.attachShadow({ mode: "open" });
    const card: HTMLElement = document.createElement("section");
    card.setAttribute("class", "card-custom");

    const imageContainer: HTMLImageElement = document.createElement("img");
    imageContainer.setAttribute("class", "image-container-custom");

    const imageSource = this.getAttribute("image-src");
    imageContainer.setAttribute(
      "src",
      imageSource ??
        "https://images.pexels.com/photos/1148565/pexels-photo-1148565.jpeg?auto=compress&cs=tinysrgb&w=600"
    );

    const imageAlt = this.getAttribute("alt");
    imageContainer.setAttribute("alt", imageAlt ?? "Image description");

    const title = document.createElement("h1");
    title.textContent = this.getAttribute("title") ?? "My Title";
    title.setAttribute("class", "title-custom");

    const content = document.createElement("p");
    content.textContent =
      this.getAttribute("content") ??
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ipsum quidem tenetur, laborum, molestiae assumenda modi ratione fugiat dolores nesciunt vel est aliquam magnam quaerat ducimus voluptatum iusto sint vitae.";
    content.setAttribute("class", "content-custom");

    card.appendChild(imageContainer);
    card.appendChild(title);
    card.appendChild(content);
    const style = document.createElement("style");
    style.textContent = `
      ::slotted(*){
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .card-custom{
        display: flex;
        flex-direction: column;
        padding: .8rem;
        border-radius: .8rem;
        max-width: 25rem;
        border: 1px solid lightgray;
        font-family: Arial, Helvetica, sans-serif;
        text-align: left;
        gap: .8rem;
      }
      .title-custom{
        font-size: 1.6rem;
        margin: 0;
      }
      .content-custom{
        margin: 0;
        line-height: 1.4;
      }
      .image-container-custom{
        width: 100%;
        border-radius: .6rem;  
        margin-bottom: .2rem;
      }
    `;
    title.setAttribute("part", "u-title");
    content.setAttribute("part", "u-content");
    card.setAttribute("part", "u-card");
    shadow.appendChild(style);
    shadow.appendChild(card);
  }
}
