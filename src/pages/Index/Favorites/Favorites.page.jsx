import {
  Container,
  Button,
  CircularProgress,
  Backdrop,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SmoothScroll from "../../../components/SmoothScroll/SmoothScroll";
import SongCard from "../../../components/SongCard/SongCard";
import { createGetRequest, createRequest } from "../../../services/api/api";
import objectMapper from "../../../utils/mappers/object.maper";
import ListViewContainer from "../../../components/ListView/ListViewContainer";
import { useAuth0 } from "@auth0/auth0-react";
export default function Favorites() {
  const [favoriteSongs, setFavoriteSongs] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently, isAuthenticated, user, loginWithPopup } =
    useAuth0();
  useEffect(() => {
    if (isAuthenticated && user) {
      (async function () {
        const jwt = await getAccessTokenSilently();
        createRequest(
          "/userFavoriteSongs",
          {},
          { headers: { authorization: `Bearer ${jwt}` } }
        ).then((res) => {
          setLoading(false);
          setFavoriteSongs(
            res.data.favoriteSongs.map((song) =>
              objectMapper(song, { poster: "cover_art_url", file: "url" })
            )
          );
        });
      })();
    }
  }, [isAuthenticated, user]);
  console.log("favoritesongs", favoriteSongs);
  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      {!isAuthenticated ? (
        <Button
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
          onClick={() => loginWithPopup({ redirectTo: "/" })}>
          Login
        </Button>
      ) : loading ? (
        <Backdrop open={true}>
          <CircularProgress />
        </Backdrop>
      ) : (
        <SmoothScroll>
          <Container
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateRows: 300,
              gap: 5,
              gridTemplateColumns: [
                "1fr ",
                "1fr 1fr ",
                "1fr 1fr 1fr ",
                "1fr 1fr 1fr 1fr ",
              ],
              paddingBottom: 18,
            }}>
            {!!favoriteSongs &&
              favoriteSongs.map((song) => <SongCard song={song} />)}
          </Container>
        </SmoothScroll>
      )}
    </Box>
  );
}
