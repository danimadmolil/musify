import React, { useEffect, useState } from "react";
import AlbumCard from "../../../components/AlbumCard/AlbumCard";
import SmoothScroll from "../../../components/SmoothScroll/SmoothScroll";
import { createGetRequest } from "../../../services/api/api";
import ListView from "../../../components/ListView/ListView";
import { Grid } from "@mui/material";
import ObjectMapper from "../../../utils/mappers/object.maper";
export default function AlbumsPage() {
  const [albumPage, setAlbumPage] = useState(null);
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
          sx={{ background: "red" }}></Grid>
      </Grid>
    </SmoothScroll>
  );
}
