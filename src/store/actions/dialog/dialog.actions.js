export const OPEN_DIALOG = "OPEN_DIALOG";
export const CLOSE_DIALOG = "CLOSE_DIALOG";

export function openDialog(dialogType) {
  return {
    type: OPEN_DIALOG,
    payload: { dialogType },
  };
}
export function closeDialog() {
  return {
    type: CLOSE_DIALOG,
  };
}
