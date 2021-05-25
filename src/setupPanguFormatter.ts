import { ExtensionContext, commands, window } from "vscode";
import { PanguFormatter } from "./formatter/PanguFormatter";

export function setupPanguFormatter(context: ExtensionContext) {
  const { subscriptions } = context;
  let commandMarkdownFormatter = commands.registerCommand(
    "omv.reformatSelection4cn",
    () => {
      new PanguFormatter().updateDocument();
      window.showInformationMessage("格式化完毕");
    }
  );
  subscriptions.push(commandMarkdownFormatter);
}
