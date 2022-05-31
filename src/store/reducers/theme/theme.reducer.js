import { TOGGLE_THEME_MODE } from "../../actions/theme/theme.actions";
const themeInitialState = { themeMode: "dark" };
const themeReducer = (state = themeInitialState, action) => {
  if (action.type === TOGGLE_THEME_MODE) {
    return {
      themeMode: state.themeMode === "dark" ? "light" : "dark",
    };
  }
  return state;
};
export default themeReducer;
