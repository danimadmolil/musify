import React, { useEffect, useRef } from "react";
import "./style.css";
import {
  Share,
  Send,
  Instagram,
  Favorite,
  Download,
  HeartBroken,
  YouTube,
} from "@mui/icons-material";
import defaultImage from "../../assets/images/3.jpg";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
export default function AlbumCard({
  album: { id, name, likes, cover, visits },
  style,
}) {
  console.log("album", id);
  return (
    <figure class="effect-terry" style={{ ...style }}>
      <Link
        to={{
          pathname: `albums/${id}`,
          state: { album: { id, name, likes, cover } },
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 25,
        }}></Link>
      <img src={!!cover ? cover : defaultImage} alt="img16" />
      <figcaption>
        <h2>
          {!!name ? name : "name"} <span>{!!likes ? likes : "likes"}</span>
        </h2>
        <p className="effect-terry__links">
          <a href="#">
            <Download color="white" />
          </a>
          <a href="#">
            <HeartBroken />
          </a>
          <a href="#">
            <Share color="white" />
          </a>
          <a href="#">
            <Instagram color="white" />
          </a>
          <a href="#">
            <YouTube sx={{ color: "red" }} />
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
