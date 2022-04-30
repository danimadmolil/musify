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
export default function AlbumCard({ title, subTitle, imgUrl, style }) {
  return (
    <figure class="effect-terry" style={{ ...style }}>
      <img src={!!imgUrl ? imgUrl : defaultImage} alt="img16" />
      <figcaption>
        <h2>
          {!!title ? title : "Title"}{" "}
          <span>{!!subTitle ? subTitle : "subtitle"}</span>
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
