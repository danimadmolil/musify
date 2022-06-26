import { useAuth0 } from "@auth0/auth0-react";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Scrollbar from "smooth-scrollbar";
import SmoothScroll from "../../../components/SmoothScroll/SmoothScroll";
import SongCard from "../../../components/SongCard/SongCard";
import { useApi } from "../../../hooks/useApi";
import { createGetRequest, createRequest } from "../../../services/api/api";
import objectMapper from "../../../utils/mappers/object.maper";
function RecentSong() {
  const [songs, setSongs] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        const jwt = await getAccessTokenSilently();
        createRequest("auth/recentSongs", null, {
          method: "get",
          headers: { authorization: `Bearer ${jwt}` },
        }).then((res) => {
          setSongs(res.data);
          setLoading(false);
        });
      })();
    } else {
      createRequest("/recentSongs", null, { method: "get" }).then((res) => {
        setLoading(false);
        setSongs(res.data);
      });
    }
  }, [isAuthenticated, user]);
  return (
    <SmoothScroll style={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          width: "100%",
          minHeight: "100%",
          display: "grid",
          gridTemplateColumns: [
            "1fr",
            "1fr 1fr",
            "1fr 1fr 1fr",
            "1fr 1fr 1fr 1fr",
          ],
        }}>
        {loading ? <CircularProgress /> : <React.Fragment></React.Fragment>}
        {songs &&
          songs.map((song) => (
            <SongCard
              song={objectMapper(song, {
                file: "url",
                poster: "cover_art_url",
                favorite: "like",
              })}
            />
          ))}
      </Box>
    </SmoothScroll>
  );
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};
const mapStateToProps = (state, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentSong);
