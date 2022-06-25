import { Box, Typography } from "@mui/material";
import React from "react";
import SmoothScroll from "../../components/SmoothScroll/SmoothScroll";

export default function PodcastPage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}>
      <Typography
        sx={{
          color: "typography.light",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}>
        Coming when it's ready
      </Typography>
      <SmoothScroll></SmoothScroll>
    </Box>
  );
}
