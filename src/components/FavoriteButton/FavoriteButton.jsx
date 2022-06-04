import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toggleFavoriteRequest } from "../../services/api/api";
import { Favorite } from "@mui/icons-material";
const SongFavoriteButton = styled(Favorite).attrs({
  classes: { root: "song_favorite_button" },
})`
  width: 20px;
  height: 20px;
  opacity: 0;
  font-size: 50px;
  transition: all 0.3s;
  will-change: all;
  position: absolute;
  left: 90%;
  top: 90%;
  transform: scale(0.5) translate(-100%, -100%);
  transform-origin: center center;
  cursor: pointer;
`;
export default function FavoriteButton({
  like,
  songId,
  user,
  userNotAuthenticated,
  networkError,
}) {
  const [isLiked, setIsLiked] = useState(!!like);
  useEffect(() => {
    setIsLiked(!!like);
  }, [like]);
  return (
    <SongFavoriteButton
      onClick={() => {
        toggleFavoriteRequest(songId)
          .then((res) => {
            console.log("clicked on favorite", res);
            setIsLiked(!isLiked);
          })
          .catch((error) => {
            if (error.status === 401) {
              userNotAuthenticated(); //dispatch({ type: "USER_NOT_AUTHENTICATED", payload: { error } });
            } else {
              networkError();
            }
          });
      }}
      style={{
        color: !!user.name ? (isLiked === true ? "red" : "white") : undefined,
      }}
    />
  );
}
