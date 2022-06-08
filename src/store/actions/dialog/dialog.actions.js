export const OPEN_DIALOG = "OPEN_DIALOG";
export const CLOSE_DIALOG = "CLOSE_DIALOG";

export function openDialog(dialogType, extra = {}) {
  return {
    type: OPEN_DIALOG,
    payload: { dialogType, ...extra },
  };
}
export function closeDialog() {
  return {
    type: CLOSE_DIALOG,
  };
}
