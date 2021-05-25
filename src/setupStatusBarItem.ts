import { ExtensionContext, window, StatusBarAlignment, workspace } from "vscode";
import { updateStatus } from "./updateStatus";

export function setupStatusBarItem(context: ExtensionContext) {
  const { subscriptions } = context;
  const status = window.createStatusBarItem(StatusBarAlignment.Left, 1000000);
  subscriptions.push(status);
  // Update status bar item based on events for multi root folder changes
  subscriptions.push(workspace.onDidChangeWorkspaceFolders(e => updateStatus(status)));
  // Update status bar item based on events for configuration
  subscriptions.push(workspace.onDidChangeConfiguration(e => updateStatus(status)));
  // Update status bar item based on events around the active editor
  subscriptions.push(window.onDidChangeActiveTextEditor(e => updateStatus(status)));
  subscriptions.push(window.onDidChangeTextEditorViewColumn(e => updateStatus(status)));
  subscriptions.push(workspace.onDidOpenTextDocument(e => updateStatus(status)));
  subscriptions.push(workspace.onDidCloseTextDocument(e => updateStatus(status)));
  updateStatus(status);
}
