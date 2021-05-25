import { ExtensionContext } from "vscode";
import { setupPanguFormatter } from "./setupPanguFormatter";
import { setupQuickInput } from "./setupQuickInput";
import { setupStatusBarItem } from "./setupStatusBarItem";

function setupContext(context: ExtensionContext) {
  setupPanguFormatter(context);
  setupStatusBarItem(context);
  setupQuickInput(context);
}

// this method is called when your extension is activated
export function activate(context: ExtensionContext) {
  console.log('"oh my code" is activating!');
  setupContext(context);
  console.log('"oh my code" is now active!');
}

// this method is called when your extension is deactivated
export function deactivate() {}
