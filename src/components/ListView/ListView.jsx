import React, { useRef, useEffect, useState } from "react";
import { Pagination, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery, Skeleton, Typography } from "@mui/material";
const listViewStyle = {
  root: { paddingTop: "0px" },
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
export default function ListView({
  page,
  style = {},
  swiper = true,
  direction = "vertical",
  elements,
  listData,
  slidesPerView = 4,
  spaceBetween = 2,
  title,
  subTitle,
  action,
  devices,
}) {
  const [currentDevice, setCurrentDevice] = useState("");
  const mobile = useMediaQuery("(max-width:500px)");
  const tablet = useMediaQuery("(min-width:501px) and (max-width:700px)");
  const laptop = useMediaQuery("(min-width:701px) and (max-width:900px)");
  const desktop = useMediaQuery("(min-width:901px) and (max-width:1600px)");
  const tv = useMediaQuery("(min-width:1600px)");
  const defaultDevices = { mobile, tablet, laptop, desktop, tv };
  useEffect(() => {
    Object.keys(defaultDevices)
      .reverse()
      .forEach((device) => {
        if (defaultDevices[device] === true) {
          setCurrentDevice(device);
        }
      });
  }, [mobile, tablet, laptop, desktop, tv]);
  return (
    <div
      className="listview_wraper"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        ...listViewStyle.root,
        ...style.root,
      }}>
      <div
        className="listview_header"
        style={{ height: "20%", ...listViewStyle.header, ...style.header }}>
        {title ? (
          <Typography
            variant="h2"
            sx={{
              color: (theme) => theme.palette.typography.heading,
              margin: "0px",
              ...listViewStyle.title,
              ...style.title,
            }}>
            {title}
          </Typography>
        ) : undefined}
        {subTitle ? (
          <h4 style={{ ...listViewStyle.subTitle, ...style.subTitle }}>
            {subTitle}
          </h4>
        ) : undefined}
        {action
          ? React.cloneElement(action, {
              style: { ...listViewStyle.actin, ...style.action },
              to: "/recentSongs",
            })
          : undefined}
      </div>
      <div style={{ height: "70%" }}>
        {swiper ? (
          <Swiper
            style={{ ...listViewStyle.scrollContent, ...style.scrollContent }}
            spaceBetween={spaceBetween}
            slidesPerView={
              !!devices
                ? typeof devices[currentDevice] === "number"
                  ? devices[currentDevice]
                  : slidesPerView
                : slidesPerView
            }
            modules={[FreeMode, Pagination]}
            direction={direction === "horizontal" ? "horizontal" : "vertical"}>
            {!!listData && listData.length > 0
              ? elements(listData).map((element) => (
                  <SwiperSlide>{element}</SwiperSlide>
                ))
              : new Array(1).fill(
                  <SwiperSlide>
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        background: "gray",
                        borderRadius: "29px",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </SwiperSlide>
                )}
          </Swiper>
        ) : (
          new Array(10).fill(
            <SwiperSlide>
              <Skeleton
                variant="rectangular"
                sx={{
                  borderRadius: "29px",
                  background: "gray",
                  height: "100%",
                  width: "100%",
                }}
              />
            </SwiperSlide>
          )
        )}
      </div>
    </div>
  );
}
