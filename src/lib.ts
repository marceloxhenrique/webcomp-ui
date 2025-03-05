import Ucard from "./components/card/u-card.js";
import Ubutton from "./components/button/u-button.js";
import Uinput from "./components/input/u-input.js";

customElements.define("u-card", Ucard);
customElements.define("u-button", Ubutton);
customElements.define("u-input", Uinput);

export { Ucard, Ubutton, Uinput };

export default {
  Ucard,
  Ubutton,
  Uinput,
};
