import React, { useEffect, useState } from "react";
import AlbumCard from "../../../components/AlbumCard/AlbumCard";
import SmoothScroll from "../../../components/SmoothScroll/SmoothScroll";
import { createGetRequest } from "../../../services/api/api";
import ListView from "../../../components/ListView/ListView";
import {
  Grid,
  IconButton,
  CardMedia,
  Stack,
  Card,
  Typography,
  Box,
} from "@mui/material";
import ObjectMapper from "../../../utils/mappers/object.maper";
import {
  PauseRounded,
  FastForwardRounded,
  FastRewindRounded,
  PlayArrowRounded,
} from "@mui/icons-material";
import { SwiperSlide } from "swiper/react";
export default function AlbumsPage() {
  const [albumPage, setAlbumPage] = useState(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    createGetRequest("/albumPage").then((res) => setAlbumPage(res));
  }, []);
  return (
    <SmoothScroll>
      <Grid container direction={"row"} sx={{ height: "100%", width: "100%" }}>
        <Grid container item xl={9} lg={9} md={9} sx={{ paddingBottom: 4 }}>
          <ListView
            style={{
              root: {
                width: "100%",
                padding: 0,
                paddingBottom: "8px",
                height: 350,
              },
              scrollContent: { height: "100%" },
            }}
            direction="horizontal"
            devices={{ tv: 1, desktop: 1, laptop: 1, tablet: 1, mobile: 1 }}
            listData={
              (!!albumPage &&
                !!albumPage.mostVisited &&
                albumPage.mostVisited) ||
              []
            }
            elements={(albums) =>
              albums.map((album) => (
                <AlbumCard style={{ height: "100%" }} album={album} />
              ))
            }
          />

          <ListView
            style={{
              root: { width: "100%", paddingBottom: "8px", height: 250 },
              scrollContent: { height: "100%" },
            }}
            title={"Hots"}
            listData={(!!albumPage && !!albumPage.hots && albumPage.hots) || []}
            direction="horizontal"
            devices={{ tv: 5, desktop: 4, laptop: 2, tablet: 1, mobile: 1 }}
            elements={(albums) =>
              albums.map((album) => (
                <AlbumCard
                  style={{ height: "100%", borderRadius: 5 }}
                  album={album}
                />
              ))
            }></ListView>
          <ListView
            style={{
              root: { width: "100%", paddingBottom: "8px", height: 250 },
              scrollContent: { height: "100%" },
            }}
            title={"most visited"}
            listData={(!!albumPage && !!albumPage.hots && albumPage.hots) || []}
            direction="horizontal"
            devices={{ tv: 5, desktop: 4, laptop: 2, tablet: 1, mobile: 1 }}
            elements={(albums) =>
              albums.map((album) => (
                <AlbumCard
                  style={{ height: "80%", borderRadius: 5 }}
                  album={album}
                />
              ))
            }></ListView>
        </Grid>
        <Grid
          container
          item
          xl={3}
          lg={3}
          md={3}
          sx={{ background: (theme) => theme.palette.backgrounds["500"] }}>
          <ListView
            title={"Most Visited Songs In the world"}
            style={{
              root: { width: "100%", paddingBottom: "8px", height: 350 },
              scrollContent: { height: "100%" },
              header: {
                minHeight: 45,
                margin: 0,
                padding: "0px 20px",
                width: "90%",
                justifyText: "word-wrap",
                textAlign: "center",
              },
            }}
            devices={{ tv: 1, desktop: 1, laptop: 1, tablet: 1, mobile: 1 }}
            listData={[{}, {}, {}]}
            slidesPerView={1}
            direction="horizontal"
            elements={(el) =>
              el.map((el) => (
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                      lg: "column",
                      md: "column",
                    },
                    width: "100%",
                    height: "100%",
                  }}>
                  <CardMedia
                    component="img"
                    width="124"
                    height="124"
                    alt="Beside Myself album cover"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS89PTVK-YsYeBu6FQDYzjEXnGl0BcnHh4foC3cUIhWGDQN1Nlqjgj7VbljZdwaiyeyzQ0&usqp=CAU"
                    sx={{
                      borderRadius: 0.5,
                      width: "clamp(124px, (304px - 100%) * 999 , 100%)",
                    }}
                  />
                  <Box sx={{ alignSelf: "center", px: { xs: 0, sm: 2 } }}>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={600}
                      sx={{
                        textAlign: { xs: "center", sm: "start" },
                        mt: { xs: 1.5, sm: 0 },
                      }}>
                      Ultraviolet
                    </Typography>
                    <Typography
                      component="div"
                      variant="caption"
                      color="text.secondary"
                      fontWeight={500}
                      sx={{ textAlign: { xm: "center", sm: "start" } }}>
                      Basement • Beside Myself
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        mt: 2,
                        justifyContent: {
                          xs: "space-between",
                          sm: "flex-start",
                        },
                      }}>
                      <IconButton aria-label="fast rewind" disabled>
                        <FastRewindRounded />
                      </IconButton>
                      <IconButton
                        aria-label={paused ? "play" : "pause"}
                        sx={{ mx: 1 }}
                        onClick={() => setPaused((val) => !val)}>
                        {paused ? <PlayArrowRounded /> : <PauseRounded />}
                      </IconButton>
                      <IconButton aria-label="fast forward" disabled>
                        <FastForwardRounded />
                      </IconButton>
                    </Stack>
                  </Box>
                </Card>
              ))
            }></ListView>
        </Grid>
      </Grid>
    </SmoothScroll>
  );
}
