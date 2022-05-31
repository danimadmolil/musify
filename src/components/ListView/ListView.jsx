import React, { useRef, useEffect, useState } from "react";
import { Pagination, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery, Skeleton, Typography } from "@mui/material";
export default function ListView({
  style,
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
      style={{ position: "relative", ...style.root }}>
      <div className="listview_header" style={{ ...style.header }}>
        {title ? (
          <Typography
            variant="h2"
            style={{ ...style.title }}
            sx={{ color: (theme) => theme.palette.typography.heading }}>
            {title}
          </Typography>
        ) : undefined}
        {subTitle ? (
          <h4 style={{ ...style.subTitle }}>{subTitle}</h4>
        ) : undefined}
        {action
          ? React.cloneElement(action, { style: style.action })
          : undefined}
      </div>
      {swiper ? (
        <Swiper
          style={{ ...style.scrollContent }}
          spaceBetween={spaceBetween}
          slidesPerView={devices[currentDevice]}
          modules={[FreeMode, Pagination]}
          direction={direction === "horizontal" ? "horizontal" : "vertical"}>
          {listData.length > 0
            ? elements(listData).map((element) => (
                <SwiperSlide>{element}</SwiperSlide>
              ))
            : new Array(10).fill(
                <SwiperSlide>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      background: "gray",
                      borderRadius: "29px",
                    }}
                    width={210}
                    height={240}
                  />
                </SwiperSlide>
              )}
        </Swiper>
      ) : (
        new Array(10).fill(
          <SwiperSlide>
            <Skeleton
              variant="rectangular"
              sx={{ borderRadius: "29px", background: "gray", height: "100%" }}
              width={210}
              height={240}
            />
          </SwiperSlide>
        )
      )}
      }
    </div>
  );
}
