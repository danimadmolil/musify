import {
  CLOSE_SIDEBAR,
  OPEN_SIDEBAR,
} from "../../actions/uiOptions/uiOptions.actions";

const uiOptionsInitialState = { sidebar: "close" };
const uiOptionsReducer = (state = uiOptionsInitialState, action) => {
  if (action.type === OPEN_SIDEBAR) {
    return { ...state, sidebar: "open" };
  } else if (action.type === CLOSE_SIDEBAR) {
    return { ...state, sidebar: "close" };
  }
  return state;
};
export default uiOptionsReducer;
