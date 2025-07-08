import fs from "node:fs";
import path from "node:path";
import {jsxTypes} from "./react-jsx-types.js";

const CONFIG_PATH = path.join(process.cwd(), ".webcomp-ui.json");

export async function addComponent() {
  const userInput = process.argv[2];
  const component = process.argv[3];
  if (userInput != "add" || component === undefined) {
    console.log(" Unknown command. Try: webcomp-ui add <component-name>");
    process.exit();
  }

  const repositoryFolderURL =
    "https://raw.githubusercontent.com/marceloxhenrique/webcomp-ui/refs/heads/main/src/components/";

  try {
    let response = await fetch(repositoryFolderURL + `${component}.ts`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Component "${component}" doesn't exist.`);
      } else {
        throw new Error(`Server returned ${response.status} ${response.statusText}`);
      }
    }
    let code = await response.text();
    let folder = path.join(process.cwd(), "src", "webcomp", `${component}.ts`);
    fs.writeFileSync(folder, code);
    console.log("Component installed");
    setupComponentImport(component);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.log("Unknown error occurred.");
    }
  } finally {
    process.exit();
  }
}

function setupComponentImport(component: string) {
  const fileUiConfig = path.join(process.cwd(), "src", "webcomp", "ui.ts");
  const uiFileContent = fs.readFileSync(fileUiConfig, {encoding: "utf8"});

  if (!uiFileContent.includes(`import("./${component}");`)) {
    const fileContentUpdate = uiFileContent.replace(
      `if (typeof window !== "undefined") {`,
      `if (typeof window !== "undefined") {
  import("./${component}");`
    );
    fs.writeFileSync(fileUiConfig, fileContentUpdate);
  }

  const framework = getFramework();
  if (framework === "React TypeScript") setupReactJsxTypes(component);
}

function setupReactJsxTypes(component: string) {
  const fileUiConfig = path.join(process.cwd(), "src", "webcomp", "ui.ts");
  const uiFileContent = fs.readFileSync(fileUiConfig, {encoding: "utf8"});

  const componentName = `w-${component}` as keyof typeof jsxTypes;
  if (!uiFileContent.includes(componentName) && jsxTypes[componentName]) {
    const typeInject = jsxTypes[componentName];
    const fileUiConfig = path.join(process.cwd(), "src", "webcomp", "ui.ts");
    fs.writeFileSync(
      fileUiConfig,
      uiFileContent.replace("interface IntrinsicElements {", "interface IntrinsicElements {" + typeInject)
    );
  }
}

function getFramework() {
  const webcompConfigFile = fs.readFileSync(CONFIG_PATH, {encoding: "utf8", flag: "r"});
  const framework = JSON.parse(webcompConfigFile).framework;
  return framework;
}
