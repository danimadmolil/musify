import React from "react";
import { connect } from "react-redux";
import {
  closeSidebar,
  openSidebar,
} from "../../store/actions/uiOptions/uiOptions.actions";
import Header from "./Header";
export const HeaderContainer = ({ ...restProps }) => {
  return <Header {...restProps} />;
};

const mapStateToProps = (state) => ({
  sidebarState: state.uiOptions.sidebar,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  openSidebar: () => dispatch(openSidebar()),
  closeSidebar: () => dispatch(closeSidebar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
