import { OPEN_DIALOG, CLOSE_DIALOG } from "../../actions/dialog/dialog.actions";

const dialogReducerInitialState = { open: false, dialogType: null };
const dialogReducer = (state = dialogReducerInitialState, action) => {
  if (action.type === OPEN_DIALOG) {
    return { open: true, dialogType: action.payload.dialogType };
  } else if (action.type === CLOSE_DIALOG) {
    return dialogReducerInitialState;
  }
  return state;
};
export default dialogReducer;
