import Card from "./components/card.js";
import Button from "./components/button.js";
import Input from "./components/input.js";
import Accordion from "./components/accordion.js";

customElements.define("w-card", Card);
customElements.define("w-button", Button);
customElements.define("w-input", Input);
customElements.define("w-accordion", Accordion);
export {Card, Button, Input, Accordion};

export default {
  Card,
  Button,
  Input,
  Accordion,
};
