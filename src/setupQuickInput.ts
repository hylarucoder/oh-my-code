import { ExtensionContext, commands, window } from "vscode";

export function setupQuickInput(context: ExtensionContext) {
  const { subscriptions } = context;
  commands.registerCommand('omv.quickInput', async () => {
    const options: { [key: string]: (context: ExtensionContext) => Promise<void>; } = {
      showQuickPick,
      showInputBox,
    };
    const quickPick = window.createQuickPick();
    quickPick.items = Object.keys(options).map(label => ({ label }));
    quickPick.onDidChangeSelection(selection => {
      if (selection[0]) {
        options[selection[0].label](context)
          .catch(console.error);
      }
    });
    quickPick.onDidHide(() => quickPick.dispose());
    quickPick.show();
  });
}
