import {setupFrameork} from "./setupFramework.js";

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

const arrowup: string = "\u001b[A";
const arrowdown: string = "\u001b[B";
const controlc: string = "\u0003";
const enter: string = "\r";

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
    setupFrameork(selectedFramework, frameworkList);
  },
};

export function renderMenu() {
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

export function getUserInput() {
  process.stdin.on("data", (key: string) => {
    if (keyList[key]) keyList[key]();
  });
}
