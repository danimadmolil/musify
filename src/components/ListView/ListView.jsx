import React, { useRef, useEffect, useState } from "react";
import { Pagination, FreeMode } from "swiper";
import { useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
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
        {title ? <h2 style={{ ...style.title }}>{title}</h2> : undefined}
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
            : []}
        </Swiper>
      ) : undefined}
    </div>
  );
}
