export default class Textarea extends HTMLElement {
  template: HTMLTemplateElement;
  inputLabel: string;
  inputPlaceholder: string;
  inputWidth: string;
  rows: string;
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.template = document.createElement("template");
    this.inputLabel = this.getAttribute("input-label") || "Textarea";
    this.inputPlaceholder = this.getAttribute("input-placeholder") || "Type here";
    this.inputWidth = this.getAttribute("input-width") || "25rem";
    this.rows = this.getAttribute("rows") || "4"; // Default rows to 4
    this.render();
  }

  static get observedAttributes() {
    return ["input-label", "input-placeholder", "input-width", "rows"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      const attributeMap: Record<string, keyof this> = {
        "input-label": "inputLabel",
        "input-placeholder": "inputPlaceholder",
        "input-width": "inputWidth",
        rows: "rows",
      };
      if (attributeMap[name]) {
        (this[attributeMap[name]] as string) = newValue;
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
      #textarea{
        width: ${this.inputWidth};
        padding: 0.5rem;
        border: .12rem solid #cfcfd2;
        border-radius: 0.3rem;
        font-family: Arial, Helvetica, sans-serif;
        height: auto;
        font-size: 1rem;
        outline: none;
        resize: vertical;
      }
      #textarea:focus{
        border: .14rem solid rgb(10, 10, 10);
      }
      .label{
        width: 100%;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
        margin-bottom: 0.2rem;
        display: block;
        color: #303131;
      }
    </style>
    <label for="textarea" class="label">${this.inputLabel}</label>
    <textarea id="textarea" placeholder="${this.inputPlaceholder}" rows="${this.rows}" class="textarea"></textarea>
    `;
    this.template.setAttribute("part", "w-textarea");
    this.shadowRoot?.appendChild(this.template.content.cloneNode(true));

    const textareaElement = this.shadowRoot?.querySelector("#textarea");
    textareaElement?.addEventListener("input", (event) => {
      this.dispatchEvent(
        new CustomEvent("inputChange", {
          detail: {value: (event.target as HTMLTextAreaElement).value},
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}
customElements.define("w-textarea", Textarea);
