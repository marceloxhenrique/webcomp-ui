import Spinner from "./components/spinner.js";
customElements.define("w-spinner", Spinner);
import Card from "./components/card.js";
customElements.define("w-card", Card);
import Button from "./components/button.js";
customElements.define("w-button", Button);
import Input from "./components/input.js";
customElements.define("w-input", Input);
import Accordion from "./components/accordion.js";
customElements.define("w-accordion", Accordion);
import Textarea from "./components/text-area.js";
customElements.define("w-textarea", Textarea);
import Tooltip from "./components/tooltip.js";
customElements.define("w-tooltip", Tooltip);

export {Card, Button, Input, Accordion, Spinner};

export default {
  Card,
  Button,
  Input,
  Accordion,
  Spinner,
  Textarea,
  Tooltip,
};
