import React from "react";
import styled from "styled-components";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import {
  PlayArrowOutlined,
  PlayArrowRounded,
  PlayCircleRounded,
  PlayArrowSharp,
} from "@mui/icons-material";
import defaultImg from "../../assets/images/5.jpg";
const PlayButton = styled(PlayCircleRounded).attrs({
  classes: { root: "play_button_rounded" },
})`
  opacity: 0;
  font-size: 50px;
  color: #00ff3ed4;
  transition: all 0.3s;
  will-change: all;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: scale(0.5) translate(50%, 30%);
  transform-origin: center center;
  cursor: pointer;
`;
const Backdrop = styled.div`
  &:hover {
    background-color: #000000ba;
    transition: 0.3s background;
  }
  &:hover .play_button_rounded {
    opacity: 1;
    transform: scale(1) translate(50%, 30%);
  }
  top: 0px;
  left: 0px;
  font-size: 120px;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
`;
export default function SongCard({
  img,
  playButton = false,
  title,
  subtitle,
  style = {},
}) {
  return (
    <Card
      style={{
        background:
          "linear-gradient(to top, rgb(15 15 15),rgb(19 19 19) 50%, #0e0e0e 67%,black 100%)",
        marginRight: 8,
        marginLeft: 8,
        position: "relative",
        ...style,
      }}>
      <CardActionArea sx={{ padding: 1 }}>
        <CardMedia
          height="169"
          component="img"
          image={img ? img : defaultImg}
          style={{ borderRadius: "4px" }}
          sx={{}}
        />
        <CardContent>
          <Typography
            gutterBottom
            sx={{ fontSize: 16 }}
            component="div"
            color="white">
            Selena gomez
          </Typography>
          <Typography variant="body2" color="#a0a0a0" sx={{ fontSize: 11 }}>
            Subtitle for song
          </Typography>
        </CardContent>
      </CardActionArea>
      <Backdrop>
        <PlayButton />
      </Backdrop>
    </Card>
  );
}
