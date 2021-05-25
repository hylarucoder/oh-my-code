import { StatusBarItem } from "vscode";
import { getEditorInfo } from "./getEditorInfo";

export function updateStatus(status: StatusBarItem): void {
  const info = getEditorInfo();
  status.text = info ? info.text || '' : '';
  status.tooltip = info ? info.tooltip : undefined;
  status.color = info ? info.color : undefined;

  if (info) {
    status.show();
  } else {
    status.hide();
  }
}
