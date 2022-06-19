import React from "react";
import { connect } from "react-redux";
import SideBarMenu from "./SideBarMenu";
import {
  openSidebar,
  closeSidebar,
} from "../../store/actions/uiOptions/uiOptions.actions";
export const SideBarMenuContainer = (props) => {
  return <SideBarMenu {...props} />;
};

const mapStateToProps = (state, ownProps) => ({
  sidebarState: state.uiOptions.sidebar,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  openSidebar: () => dispatch(openSidebar()),
  closeSidebar: () => dispatch(closeSidebar()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarMenuContainer);
