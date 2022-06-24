import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import ListView from "./ListView";
import { GET_SONGS_REQUEST } from "../../store/actions/songs/songs.actions";
import { GET_ALLALBUMS_REQUEST } from "../../store/actions/albums/albums.actions";
import { useAuth0 } from "@auth0/auth0-react";
const ListViewContainer = ({ listData, resource, ...restProps }) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
  useEffect(() => {
    if (resource === "songs") {
      if (isAuthenticated) {
        const asyncgetAllsongs = async () => {
          if (isAuthenticated) {
            const jwt = await getAccessTokenSilently();
            dispatch({ type: GET_SONGS_REQUEST, payload: { jwt } });
          }
        };
        asyncgetAllsongs();
      } else {
        dispatch({ type: GET_SONGS_REQUEST, payload: { jwt: undefined } });
      }
    } else if (resource === "albums") {
      dispatch({ type: GET_ALLALBUMS_REQUEST });
    }
  }, [user, resource, isAuthenticated]);
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
