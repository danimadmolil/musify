import React from "react";
import { connect } from "react-redux";
import ListView from "./ListView";

const ListViewContainer = (props) => {
  const newProps = { ...props, listData: props.resources };
  return <ListView {...newProps} />;
};

const mapStateToProps = (state, ownProps) => ({
  resources: state[ownProps.resource],
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ListViewContainer);
