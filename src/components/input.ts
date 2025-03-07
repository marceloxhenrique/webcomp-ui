export default class Input extends HTMLElement {
  template: HTMLTemplateElement;
  inputLabel: string;
  inputPlaceholder: string;
  inputWidth: string;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.template = document.createElement("template");
    this.inputLabel = this.getAttribute("input-label") || "Input";
    this.inputPlaceholder = this.getAttribute("input-placeholder") || "Type here";
    this.inputWidth = this.getAttribute("input-width") || "25rem";
    this.render();
  }

  static get observedAttributes() {
    return ["input-label", "input-placeholder", "input-width"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      const attributeMap: Record<string, keyof this> = {
        "input-label": "inputLabel",
        "input-placeholder": "inputPlaceholder",
        "input-width": "inputWidth",
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
        box-sizing: border-box;
      }
      #input{
        width: ${this.inputWidth};
        padding: 0.5rem;
        border: .12rem  solid #cfcfd2;
        border-radius: 0.3rem;
        font-family: Arial, Helvertica, sans-serif;
        focus: border: 1px solid #242526;
        height: 2.4rem;
        font-size: 1rem;
        outline: none;
      }
      #input:focus{
        border: .14rem solid rgb(10, 10, 10);
      }
      .label{
        width: 100%;
        font-family: Arial, Helvertica, sans-serif; 
        font-size: 1rem;
        margin-bottom: 0.2rem;
        display: block;
        color: #303131;
      }
    </style>
    <label for="input" class="label" >${this.inputLabel}</label>
    <input id="input" type="text" placeholder="${this.inputPlaceholder}" class="input" />
    `;
    this.shadowRoot?.appendChild(this.template.content.cloneNode(true));

    const inputElement = this.shadowRoot?.querySelector("#input");
    inputElement?.addEventListener("keyup", (event) => {
      this.dispatchEvent(
        new CustomEvent("inputChange", {
          detail: { value: (event.target as HTMLInputElement).value },
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}
