export default class Spinner extends HTMLElement {
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
      *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      }
      .spinner-wrapper {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: .8rem;
        margin: 3rem;
        
      }
      .spinner-custom {
        height: 1.4rem;
        width: 1.4rem;
        border: .2rem solid black;
        border-radius: 50%;
        border-left-color: transparent;
        animation: spinner infinite linear 1s;
      }
      .text {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
      }
      @keyframes spinner{
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      
    </style>
    <div class="spinner-wrapper">
      <span class="spinner-custom"></span>
      <p class="text"><slot></slot></p>
    </div>
    `;
    this.template.setAttribute("part", "w-spinner");
    this.shadowRoot?.appendChild(this.template.content.cloneNode(true));
  }
}
customElements.define("w-spinner", Spinner);
