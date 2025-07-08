import fs from "node:fs";
import path from "node:path";

const CONFIG_PATH = path.join(process.cwd(), ".webcomp-ui.json");

export function setupFrameork(selectedFramework: number, frameworkList: {framework: string; color: number}[]) {
  console.log(
    `\n \x1b[${frameworkList[selectedFramework].color}m ${frameworkList[selectedFramework].framework}\x1b[0m`
  );
  console.log("Framework selected successfully!");
  console.log("You can now run: webcomp-ui add <component>");
  fs.writeFileSync(CONFIG_PATH, JSON.stringify({framework: frameworkList[selectedFramework].framework}, null, 2));
  const folder = path.join(process.cwd(), "src", "webcomp");
  fs.mkdirSync(folder, {recursive: true});
  const code = `if (typeof window !== "undefined") {}`;
  const file = path.join(folder, "ui.ts");
  fs.writeFileSync(file, code);
  const reactTypescript = 1;
  if (selectedFramework === reactTypescript) {
    fs.appendFileSync(
      file,
      `
import React from "react";
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {}
  }
}`
    );
  }
  process.exit();
}
