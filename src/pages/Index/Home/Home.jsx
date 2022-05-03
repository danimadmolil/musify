import React, { useRef, useEffect } from "react";
import { Button } from "@mui/material";
import SongCard from "../../../components/SongCard/SongCard";
import Scrollbar from "smooth-scrollbar";
import ListViewContainer from "../../../components/ListView/ListViewContainer";
import AlbumCard from "../../../components/AlbumCard/AlbumCard";
import Header from "../../../components/Header/Header";

export default function Home() {
  const scrollContainer = useRef(null);
  useEffect(() => {
    Scrollbar.init(scrollContainer.current, {
      alwaysShowTracks: true,
      clip: true,
    });
  }, []);
  return (
    <div ref={scrollContainer} style={{ height: "100%" }}>
      <div className="home" style={{ width: "100%", paddingBottom: "22px" }}>
        <Header />
        <ListViewContainer
          title="Recent Albums"
          subTitle={"2021: 19/12"}
          resource={"albums"}
          action={<Button>SeeAll</Button>}
          spaceBetween={8}
          devices={{
            tv: 5,
            desktop: 4,
            laptop: 3,
            tablet: 2,
            mobile: 1,
          }}
          elements={(data) => {
            return data.map((item, i) => {
              return (
                <AlbumCard
                  style={{
                    height: "100%",
                    color: "white",
                  }}
                  imgUrl={item ? item["cover"] : ""}
                />
              );
            });
          }}
          direction="horizontal"
          slidesPerView={4}
          spaceBetween={1}
          style={{
            ...listViewStyle,
            scrollContent: { height: "250px" },
            root: {
              ...listViewStyle.root,
              margin: 0,
              padding: 0,
              width: "100%",
            },
            action: {
              ...listViewStyle.action,
              position: "absolute",
              left: "100%",
              top: "100%",
              transform: "translate(-150%,-150%)",
            },
          }}
        />
        <ListViewContainer
          title="Recent Albums"
          subTitle={"2021: 19/12"}
          resource={"songs"}
          action={<Button>SeeAll</Button>}
          spaceBetween={8}
          devices={{
            tv: 5,
            desktop: 4,
            laptop: 3,
            tablet: 2,
            mobile: 1,
          }}
          elements={(data) => {
            return data.map((song, i) => {
              return (
                <SongCard
                  style={{
                    height: "100%",
                    color: "white",
                  }}
                  song={song}
                />
              );
            });
          }}
          direction="horizontal"
          slidesPerView={4}
          spaceBetween={1}
          style={{
            ...listViewStyle,
            scrollContent: { height: "260px" },
            root: {
              ...listViewStyle.root,
              margin: 0,
              padding: 0,
              width: "100%",
            },
            action: {
              ...listViewStyle.action,
              position: "absolute",
              left: "100%",
              top: "100%",
              transform: "translate(-150%,-150%)",
            },
          }}
        />
      </div>
    </div>
  );
}
const listViewStyle = {
  root: { paddingTop: "80px" },
  scrollContent: {
    width: "100%",
    height: "269px",
    marginBottom: "88px",
  },
  header: { position: "relative" },
  title: {
    fontSize: "22px",
    marginLeft: "16px",
    position: "relative",
    top: "10px",
  },
  subTitle: { color: "gray", marginLeft: "16px" },
  action: {
    minWidth: "80px",
    width: "max-content",
    position: "absolute",
    top: "100%",
    left: "100%",
    transform: "translate(-120%,-50%)",
    paddingRight: "22px",
    whiteSpace: "no-wrap",
  },
};
