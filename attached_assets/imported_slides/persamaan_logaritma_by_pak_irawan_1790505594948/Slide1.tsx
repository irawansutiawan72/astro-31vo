import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_1.png";
import img_2 from "./assets/images/image_2.png";
const Slide1: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({
    s: 1,
    x: 0,
    y: 0
  });
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const s = Math.min(w / 960, h / 720);
      setLayout({
        s,
        x: (w - 960 * s) / 2,
        y: (h - 720 * s) / 2
      });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return <div id="slide-1" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-1" style={{
      position: "absolute",
      width: "960px",
      height: "720px",
      overflow: "hidden",
      transformOrigin: "top left",
      color: "#000000",
      backgroundColor: "#fbeec9",
      transform: `scale(${layout.s})`,
      left: layout.x + "px",
      top: layout.y + "px"
    }}><svg key={0} style={{
        position: "absolute",
        left: "54px",
        top: "110.33px",
        width: "906px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="906" y2="0.25" stroke="#000000" strokeWidth="1" /></svg><svg key={1} style={{
        position: "absolute",
        left: "54px",
        top: "110.33px",
        width: "906px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="906" y2="0.25" stroke="#000000" strokeWidth="1" /></svg><svg key={2} style={{
        position: "absolute",
        left: "54px",
        top: "111.07px",
        width: "906px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="906" y2="0.25" stroke="#000000" strokeWidth="1" /></svg><div key={3} style={{
        position: "absolute",
        left: "0px",
        top: "-1.27px",
        width: "960px",
        height: "729.27px"
      }}><div key={0} style={{
          position: "absolute",
          left: "610.92px",
          top: "235.33px",
          width: "592.27px",
          height: "98.61px",
          boxSizing: "border-box",
          backgroundColor: "#FFC000",
          clipPath: "path('M 0 0 L 592.27 0 L 2.33 98.61 L 0 0 Z')",
          transform: "rotate(270deg) scaleX(-1) scaleY(-1)"
        }} /><div key={1} style={{
          position: "absolute",
          left: "0px",
          top: "1.27px",
          width: "960px",
          height: "728px"
        }}><div key={0} style={{
            position: "absolute",
            left: "0px",
            top: "0px",
            width: "592.27px",
            height: "98.61px",
            boxSizing: "border-box",
            backgroundColor: "#C00000",
            clipPath: "path('M 0 0 L 592.27 0 L 2.33 98.61 L 0 0 Z')"
          }} /><div key={1} style={{
            position: "absolute",
            left: "367.73px",
            top: "620.7px",
            width: "592.27px",
            height: "98.61px",
            boxSizing: "border-box",
            backgroundColor: "#613a14",
            clipPath: "path('M 0 0 L 592.27 0 L 2.33 98.61 L 0 0 Z')",
            transform: "scaleX(-1) scaleY(-1)"
          }} /><div key={2} style={{
            position: "absolute",
            left: "-243.07px",
            top: "394.06px",
            width: "592.27px",
            height: "98.61px",
            boxSizing: "border-box",
            backgroundColor: "#404040",
            clipPath: "path('M 0 0 L 592.27 0 L 2.33 98.61 L 0 0 Z')",
            transform: "rotate(270deg)"
          }} /></div><img key={2} src={img_1} alt="Picture 2" style={{
          position: "absolute",
          left: "111.85px",
          top: "365.9px",
          width: "403.32px",
          height: "314.67px",
          boxSizing: "border-box",
          objectFit: "fill"
        }} /><img key={3} src={img_2} alt="Picture 3" style={{
          position: "absolute",
          left: "583.75px",
          top: "142.24px",
          width: "343.57px",
          height: "280.8px",
          boxSizing: "border-box",
          objectFit: "fill"
        }} /></div><div key={4} style={{
        position: "absolute",
        left: "53.3px",
        top: "128.25px",
        width: "117.1px",
        height: "117.1px",
        boxSizing: "border-box",
        backgroundColor: "#000000",
        clipPath: "polygon(0% 0%, 0% 100%, 100% 100%)",
        transform: "rotate(45deg)"
      }} /><div key={5} style={{
        position: "absolute",
        left: "70.84px",
        top: "128.25px",
        width: "117.1px",
        height: "117.1px",
        boxSizing: "border-box",
        backgroundColor: "#cba193",
        clipPath: "polygon(0% 0%, 0% 100%, 100% 100%)",
        transform: "rotate(45deg)"
      }} /><div key={6} style={{
        position: "absolute",
        left: "70.84px",
        top: "128.25px",
        width: "117.1px",
        height: "117.1px",
        boxSizing: "border-box",
        backgroundColor: "#4e3b30",
        clipPath: "polygon(0% 0%, 0% 100%, 100% 100%)",
        transform: "rotate(225deg)"
      }} /><div key={7} style={{
        position: "absolute",
        left: "78.69px",
        top: "134.83px",
        width: "100.84px",
        height: "105.06px"
      }}><div key={0} style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "100.84px",
          height: "100.84px",
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          borderRadius: "50%"
        }} /><div key={1} style={{
          position: "absolute",
          left: "3.23px",
          top: "3.23px",
          width: "94.31px",
          height: "94.31px",
          boxSizing: "border-box",
          backgroundColor: "#926255",
          borderRadius: "50%"
        }} /><div key={2} style={{
          position: "absolute",
          left: "10.03px",
          top: "6.59px",
          width: "82.03px",
          height: "55.74px",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          padding: "3.6px 7.2px 3.6px 7.2px",
          whiteSpace: "nowrap",
          wordWrap: "break-word"
        }}><p style={{
            textAlign: "center",
            lineHeight: "1.2",
            fontSize: "calc(30pt * var(--pptx-font-scale, 1))",
            marginTop: "0",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(30pt * var(--pptx-font-scale, 1))",
              fontWeight: "700",
              color: "#ffffff"
            }}>{"Bab"}</span></p></div><div key={3} style={{
          position: "absolute",
          left: "26.98px",
          top: "33.17px",
          width: "46.18px",
          height: "71.9px",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          padding: "3.6px 7.2px 3.6px 7.2px",
          whiteSpace: "nowrap",
          wordWrap: "break-word"
        }}><p style={{
            textAlign: "center",
            lineHeight: "1.2",
            fontSize: "calc(40pt * var(--pptx-font-scale, 1))",
            marginTop: "0",
            marginBottom: "0"
          }}><span style={{
              fontSize: "calc(40pt * var(--pptx-font-scale, 1))",
              fontWeight: "700",
              color: "#ffffff"
            }}>{"2"}</span></p></div></div><div key={8} style={{
        position: "absolute",
        left: "207.94px",
        top: "138.47px",
        width: "480px",
        height: "74.32px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(40pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(40pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700"
          }}>{"LOGARITMA"}</span></p></div><div key={9} style={{
        position: "absolute",
        left: "56px",
        top: "298.83px",
        width: "484.96px",
        height: "38.78px",
        boxSizing: "border-box",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700"
          }}>{"SUBBAB 3 : PERSAMAAN LOGARITMA"}</span></p></div></div></div>;
};
export default Slide1;
