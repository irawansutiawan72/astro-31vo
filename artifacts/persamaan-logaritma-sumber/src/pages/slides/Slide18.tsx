import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_4.png";
import img_2 from "./assets/images/image_5.png";
import img_3 from "./assets/images/image_6.png";
import img_4 from "./assets/images/image_7.png";
import img_5 from "./assets/images/image_8.png";
import img_6 from "./assets/images/image_9.png";
import img_7 from "./assets/images/image_10.png";
import img_8 from "./assets/images/image_11.gif";
const Slide18: React.FC = () => {
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
  return <div id="slide-18" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-18" style={{
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
        left: "54.5px",
        top: "28.83px",
        width: "769.5px",
        height: "83.67px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            textTransform: "uppercase",
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{"Rangkuman"}</span><span style={{
            textTransform: "uppercase",
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{" "}</span><span style={{
            textTransform: "uppercase",
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{"persamaan"}</span><span style={{
            textTransform: "uppercase",
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{" "}</span><span style={{
            textTransform: "uppercase",
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            color: "#000000"
          }}>{"logaritma"}</span></p></div><img key={4} src={img_1} alt="Object 4" style={{
        position: "absolute",
        left: "474px",
        top: "348.67px",
        width: "12px",
        height: "22.67px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={5} src={img_2} alt="Object 6" style={{
        position: "absolute",
        left: "21.02px",
        top: "136.86px",
        width: "489.5px",
        height: "71px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={6} src={img_3} alt="Object 7" style={{
        position: "absolute",
        left: "14.56px",
        top: "424px",
        width: "479.17px",
        height: "71px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={7} src={img_4} alt="Object 8" style={{
        position: "absolute",
        left: "21.02px",
        top: "233.23px",
        width: "690.83px",
        height: "71.17px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={8} src={img_5} alt="Object 9" style={{
        position: "absolute",
        left: "14.56px",
        top: "327.11px",
        width: "824.17px",
        height: "74.5px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={9} src={img_6} alt="Object 10" style={{
        position: "absolute",
        left: "13.17px",
        top: "522.33px",
        width: "931px",
        height: "110.5px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={10} src={img_7} alt="Z:\\newtek\\_backgrounds_1.02\\Tim\\powerpoint templates\\101-120\\woodland_stroll\\elements\\maple_leaf_shake_hg_clr.gif" style={{
        position: "absolute",
        left: "23.74px",
        top: "37.5px",
        width: "80.26px",
        height: "74.5px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={11} src={img_8} alt="Z:\\newtek\\_backgrounds_1.02\\Tim\\powerpoint templates\\101-120\\woodland_stroll\\elements\\leaves_falling_hg_clr.gif" style={{
        position: "absolute",
        left: "791.91px",
        top: "126.33px",
        width: "147.07px",
        height: "171.35px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><img key={12} src={img_7} alt="Z:\\newtek\\_backgrounds_1.02\\Tim\\powerpoint templates\\101-120\\woodland_stroll\\elements\\maple_leaf_shake_hg_clr.gif" style={{
        position: "absolute",
        left: "720.88px",
        top: "148.88px",
        width: "71px",
        height: "92.24px",
        boxSizing: "border-box",
        objectFit: "fill"
      }} /><div key={13} style={{
        position: "absolute",
        left: "0px",
        top: "656px",
        width: "960px",
        height: "64px",
        boxSizing: "border-box",
        backgroundColor: "#f6c781",
        border: "1px solid #98B954",
        boxShadow: "0px 2.41px 0px rgba(0, 0, 0, 0.35)"
      }} /><div key={14} style={{
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
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            color: "#ffffff"
          }}>{"BACK"}</span></p></div><div key={15} style={{
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
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            color: "#ffffff"
          }}>{"HOME"}</a></p></div><div key={16} style={{
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
          }}>{"NEXT"}</span></p></div></div></div>;
};
export default Slide18;
