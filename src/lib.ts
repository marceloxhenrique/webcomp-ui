import Card from "./components/card.js";
import Button from "./components/button.js";
import Input from "./components/input.js";
import Accordion from "./components/accordion.js";

customElements.define("u-card", Card);
customElements.define("u-button", Button);
customElements.define("u-input", Input);
customElements.define("u-accordion", Accordion);
export { Card, Button, Input, Accordion };

export default {
  Card,
  Button,
  Input,
  Accordion,
};
