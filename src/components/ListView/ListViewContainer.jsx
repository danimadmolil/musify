import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import ListView from "./ListView";
import { GET_SONGS_REQUEST } from "../../store/actions/songs/songs.actions";
import { GET_ALLALBUMS_REQUEST } from "../../store/actions/albums/albums.actions";
const ListViewContainer = ({ user, listData, resource, ...restProps }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (resource === "songs") {
      dispatch({ type: GET_SONGS_REQUEST });
    } else if (resource === "albums") {
      dispatch({ type: GET_ALLALBUMS_REQUEST });
    }
  }, [user]);
  const newProps = { ...restProps, listData };
  return <ListView {...newProps} />;
};

const mapStateToProps = (state, ownProps) => ({
  listData: !!state[ownProps.resource]
    ? state[ownProps.resource]
    : ownProps.data,
  resource: ownProps.resource,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ListViewContainer);
