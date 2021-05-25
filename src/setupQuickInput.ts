import { ExtensionContext, commands, window } from "vscode";

export async function showInputBox() {
  const result = await window.showInputBox({
    value: "abcdef",
    valueSelection: [2, 4],
    placeHolder: "For example: fedcba. But not: 123",
    validateInput: (text) => {
      window.showInformationMessage(`Validating: ${text}`);
      return text === "123" ? "Not 123!" : null;
    },
  });
  window.showInformationMessage(`Got: ${result}`);
}

export async function showQuickPick() {
  let i = 0;
  const result = await window.showQuickPick(["eins", "zwei", "drei"], {
    placeHolder: "eins, zwei or drei",
    onDidSelectItem: (item) =>
      window.showInformationMessage(`Focus ${++i}: ${item}`),
  });
  window.showInformationMessage(`Got: ${result}`);
}

export function setupQuickInput(context: ExtensionContext) {
  const { subscriptions } = context;
  commands.registerCommand("omc.quickInput", async () => {
    const options: {
      [key: string]: (context: ExtensionContext) => Promise<void>;
    } = {
      showQuickPick,
      showInputBox,
    };
    const quickPick = window.createQuickPick();
    quickPick.items = Object.keys(options).map((label) => ({ label }));
    quickPick.onDidChangeSelection((selection) => {
      if (selection[0]) {
        options[selection[0].label](context).catch(console.error);
      }
    });
    quickPick.onDidHide(() => quickPick.dispose());
    quickPick.show();
  });
}
