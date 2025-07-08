#!/usr/bin/env node
import fs from "node:fs";
import path from "path";
import process from "process";

import {renderMenu, getUserInput} from "./lib/menu.js";
import {addComponent} from "./lib/component.js";

const CONFIG_PATH = path.join(process.cwd(), ".webcomp-ui.json");
const hasFrameworkConfig = fs.existsSync(CONFIG_PATH);

if (!hasFrameworkConfig) {
  renderMenu();
  getUserInput();
} else {
  addComponent();
}
