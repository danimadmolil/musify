import React, { useRef, useEffect } from "react";
import { Button } from "@mui/material";
import SongCard from "../../../components/SongCard/SongCard";
import Scrollbar from "smooth-scrollbar";
import ListViewContainer from "../../../components/ListView/ListViewContainer";
import AlbumCard from "../../../components/AlbumCard/AlbumCard";
import Header from "../../../components/Header/Header";
import { Link } from "react-router-dom";

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
        
        <ListViewContainer
          title="Recent Albums"
          subTitle={"2021: 19/12"}
          resource={"albums"}
          action={
            <Button>
              <Link to="/albums">SeeAll</Link>
            </Button>
          }
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
                  album={item}
                />
              );
            });
          }}
          direction="horizontal"
          slidesPerView={4}
          spaceBetween={1}
          style={{
          
            scrollContent: { height: "250px" },
            root: {
             
              margin: 0,
              padding: 0,
              width: "100%",
            },
            action: {
              
              position: "absolute",
              left: "100%",
              top: "100%",
              transform: "translate(-150%,-150%)",
            },
          }}
        />
        <ListViewContainer
          page="recentSongs"
          title="Recent Songs"
          subTitle={"2021: 19/12"}
          resource={"songs"}
          action={
            <Link>
              <Button>See All</Button>
            </Link>
          }
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
            
            scrollContent: { height: "260px" },
            root: {
             
              margin: 0,
              padding: 0,
              width: "100%",
            },
            action: {
              
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
