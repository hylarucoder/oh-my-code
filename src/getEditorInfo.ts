import { window, workspace } from "vscode";
import { basename } from 'path';


export function getEditorInfo(): { text?: string; tooltip?: string; color?: string; } | null {
  const editor = window.activeTextEditor;
  // If no workspace is opened or just a single folder, we return without any status label
  // because our extension only works when more than one folder is opened in a workspace.
  if (!editor || !workspace.workspaceFolders || workspace.workspaceFolders.length < 2) {
    return null;
  }

  let text: string | undefined;
  let tooltip: string | undefined;
  let color: string | undefined;

  // If we have a file:// resource we resolve the WorkspaceFolder this file is from and update
  // the status accordingly.
  const resource = editor.document.uri;
  if (resource.scheme === 'file') {
    const folder = workspace.getWorkspaceFolder(resource);
    if (!folder) {
      text = `$(alert) <outside workspace> → ${basename(resource.fsPath)}`;
    } else {
      text = `$(file-submodule) ${basename(folder.uri.fsPath)} (${folder.index + 1} of ${workspace.workspaceFolders.length}) → $(file-code) ${basename(resource.fsPath)}`;
      tooltip = resource.fsPath;

      const multiRootConfigForResource = workspace.getConfiguration('multiRootSample', resource);
      color = multiRootConfigForResource.get('statusColor');
    }
  }

  return { text, tooltip, color };
}
