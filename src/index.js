#!/usr/bin/env node
import fs from "node:fs";
import path from "path";
import process from "process";

const CONFIG_PATH = path.join(process.cwd(), ".webcomp-ui.json");
const setUpFile = fs.existsSync(CONFIG_PATH, "utf8");

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

const frameworkList = [
  {framework: "React JavaScript", color: 33},
  {framework: "React TypeScript", color: 36},
  {framework: "Angular", color: 31},
  {framework: "Vue", color: 32},
];
let selectedFramework = 0;

let arrowup = "\u001b[A";
let arrowdown = "\u001b[B";
let controlc = "\u0003";
let enter = "\r";

const keyList = {
  [arrowup]: () => {
    selectedFramework = (selectedFramework - 1 + frameworkList.length) % frameworkList.length;
    renderMenu();
  },
  [arrowdown]: () => {
    selectedFramework = (selectedFramework + 1) % frameworkList.length;
    renderMenu();
  },
  [controlc]: () => {
    process.exit();
  },
  [enter]: () => {
    console.log(
      `\n \x1b[${frameworkList[selectedFramework].color}m ${frameworkList[selectedFramework].framework}\x1b[0m`
    );
    fs.writeFileSync(CONFIG_PATH, JSON.stringify({framework: frameworkList[selectedFramework].framework}));
    process.exit();
  },
};

function renderMenu() {
  console.clear();
  console.log("Select a framework:");
  frameworkList.forEach((item, index) => {
    if (selectedFramework === index) {
      console.log(`\x1b[${item.color}m> ${item.framework}\x1b[0m`);
    } else {
      console.log(`\x1b[${item.color}m  ${item.framework}\x1b[0m`);
    }
  });
}

async function addComponent() {
  const userInput = process.argv[2];
  const component = process.argv[3];
  if (userInput != "add") {
    console.log("Command not supported");
    process.exit();
  }

  const repositoryFolderURL =
    "https://raw.githubusercontent.com/marceloxhenrique/webcomp-ui/refs/heads/main/src/components/";

  const framework = fs.readFileSync(CONFIG_PATH, {encoding: "utf8"}, "r");

  let folder = path.join(process.cwd(), `src/comp/${component}.ts`);
  fs.mkdirSync(path.dirname(folder), {recursive: true});
  try {
    let response = await fetch(repositoryFolderURL + `${component}.ts`);
    let code = await response.text();
    fs.writeFileSync(folder, code);
    console.log("File created:", component);
  } catch (error) {
    console.error("Error while installing the component: ", error);
  } finally {
    process.exit();
  }
}

if (!setUpFile) {
  renderMenu();
  process.stdin.on("data", (key) => {
    if (keyList[key]) keyList[key]();
  });
} else {
  addComponent();
}
