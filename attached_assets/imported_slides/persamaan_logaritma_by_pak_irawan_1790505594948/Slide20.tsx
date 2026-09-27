import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_12.png";
const Slide20: React.FC = () => {
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
  return <div id="slide-20" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-20" style={{
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
        top: "656px",
        width: "960px",
        height: "64px",
        boxSizing: "border-box",
        backgroundColor: "#f6c781",
        border: "1px solid #98B954",
        boxShadow: "0px 2.41px 0px rgba(0, 0, 0, 0.35)"
      }} /><div key={4} style={{
        position: "absolute",
        left: "32px",
        top: "664px",
        width: "96px",
        height: "48px",
        boxSizing: "border-box",
        backgroundColor: "#f0a22e",
        clipPath: "polygon(0% 50%, 30% 0%, 30% 25%, 100% 25%, 100% 75%, 30% 75%, 30% 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"BACK"}</span></p></div><div key={5} style={{
        position: "absolute",
        left: "840px",
        top: "672px",
        width: "88px",
        height: "40px",
        boxSizing: "border-box",
        backgroundColor: "#f0a22e",
        clipPath: "polygon(0% 25%, 70% 25%, 70% 0%, 100% 50%, 70% 100%, 70% 75%, 0% 75%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"NEXT"}</span></p></div><div key={6} style={{
        position: "absolute",
        left: "392px",
        top: "670.19px",
        width: "176px",
        height: "40px",
        boxSizing: "border-box",
        backgroundColor: "#f0a22e",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><a href="#slide-2" style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"HOME"}</a></p></div><img key={7} src={img_1} alt="Object 2" style={{
        position: "absolute",
        left: "62.5px",
        top: "49.01px",
        width: "777.5px",
        height: "597.18px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={8} style={{
        position: "absolute",
        left: "488px",
        top: "136.76px",
        width: "384px",
        height: "87.24px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontStyle: "italic",
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontWeight: "700"
          }}>{"Syarat"}</span><span style={{
            fontStyle: "italic",
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontWeight: "700"
          }}>{", x \u2013 2 > 0"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontStyle: "italic",
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontWeight: "700"
          }}>{"Maka"}</span><span style={{
            fontStyle: "italic",
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontWeight: "700"
          }}>{" 18 \u2013 2 = 16 > 0 (18 "}</span><span style={{
            fontStyle: "italic",
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontWeight: "700"
          }}>{"merupakan"}</span><span style={{
            fontStyle: "italic",
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontWeight: "700"
          }}>{" "}</span><span style={{
            fontStyle: "italic",
            fontSize: "calc(16pt * var(--pptx-font-scale, 1))",
            fontWeight: "700"
          }}>{"penyelesaian"}</span></p></div></div></div>;
};
export default Slide20;
