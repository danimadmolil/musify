import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Scrollbar from "smooth-scrollbar";
import SongCard from "../../../components/SongCard/SongCard";
import { createGetRequest } from "../../../services/api/api";
import objectMapper from "../../../utils/mappers/object.maper";
function RecentSong() {
  const [songs, setSongs] = useState(null);
  const scrollContainer = useRef(null);
  useEffect(() => {
    Scrollbar.init(scrollContainer.current, {
      alwaysShowTracks: true,
      clip: true,
    });
    // dispatch("GET_SONGS_REQUEST");
    createGetRequest("/recentSongs", {}, { method: "get" }).then((res) =>
      setSongs(
        res.map((song) =>
          objectMapper(song, { file: "url", poster: "cover_art_url" })
        )
      )
    );
  }, []);
  return (
    <div
      ref={scrollContainer}
      style={{
        height: "100%",
        width: "100%",
      }}>
      <div
        style={{
          background: "black",
          width: "100%",
          display: "grid",
          gap: "12px",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridAutoRows: "max-content",
        }}>
        {!!songs && songs.map((song) => <SongCard song={song} />)}
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};
const mapStateToProps = (state, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentSong);
