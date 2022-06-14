import React, { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";
export default function SmoothScroll({ children }) {
  const scrollContainer = useRef(null);
  useEffect(() => {
    Scrollbar.init(scrollContainer.current, {
      alwaysShowTracks: true,
      clip: true,
    });
  }, []);
  return (
    <div ref={scrollContainer} style={{ height: "100%", width: "100%" }}>
      {children}
    </div>
  );
}
