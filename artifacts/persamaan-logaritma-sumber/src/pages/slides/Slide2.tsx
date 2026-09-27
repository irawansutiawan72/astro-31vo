import React, { useState, useEffect, useRef } from "react";
import img_1 from "./assets/images/image_3.jpg";
const Slide2: React.FC = () => {
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
  return <div id="slide-2" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-2" style={{
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
        left: "275.95px",
        top: "120px",
        width: "410.5px",
        height: "105px",
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
          fontSize: "calc(22pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(22pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"FUNGSI, PERSAMAAN, DAN PERTIDAKSAMAAN LOGARITMA"}</span></p></div><svg key={4} style={{
        position: "absolute",
        left: "447.89px",
        top: "257.11px",
        width: "65.42px",
        height: "1.2px",
        overflow: "visible",
        transform: "rotate(90deg)",
        transformOrigin: "center"
      }}><line x1="0" y1="0" x2="65.42" y2="1.2" stroke="#000000" strokeWidth="3" /></svg><svg key={5} style={{
        position: "absolute",
        left: "217.5px",
        top: "248px",
        width: "532.5px",
        height: "1px",
        overflow: "visible"
      }}><line x1="0" y1="0" x2="532.5" y2="0.17" stroke="#000000" strokeWidth="3" /></svg><svg key={6} style={{
        position: "absolute",
        left: "195.08px",
        top: "270.42px",
        width: "45px",
        height: "1px",
        overflow: "visible",
        transform: "rotate(90deg)",
        transformOrigin: "center"
      }}><line x1="0" y1="0" x2="45" y2="0.17" stroke="#000000" strokeWidth="3" /></svg><svg key={7} style={{
        position: "absolute",
        left: "727.42px",
        top: "270.42px",
        width: "45px",
        height: "1px",
        overflow: "visible",
        transform: "rotate(90deg)",
        transformOrigin: "center"
      }}><line x1="0" y1="0" x2="45" y2="0.17" stroke="#000000" strokeWidth="3" /></svg><div key={8} style={{
        position: "absolute",
        left: "120px",
        top: "296px",
        width: "195px",
        height: "82.5px",
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
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"FUNGSI LOGARITMA"}</span></p></div><div key={9} style={{
        position: "absolute",
        left: "380.95px",
        top: "291.1px",
        width: "202.5px",
        height: "82.5px",
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
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"PERSAMAAN LOGARITMA"}</span></p></div><div key={10} style={{
        position: "absolute",
        left: "645px",
        top: "296px",
        width: "202.5px",
        height: "82.5px",
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
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"FUNGSI LOGARITMA"}</span></p></div><svg key={11} style={{
        position: "absolute",
        left: "202.58px",
        top: "398.42px",
        width: "45px",
        height: "1px",
        overflow: "visible",
        transform: "rotate(90deg)",
        transformOrigin: "center"
      }}><line x1="0" y1="0" x2="45" y2="0.17" stroke="#000000" strokeWidth="3" /></svg><svg key={12} style={{
        position: "absolute",
        left: "457.42px",
        top: "398.42px",
        width: "45px",
        height: "1px",
        overflow: "visible",
        transform: "rotate(90deg)",
        transformOrigin: "center"
      }}><line x1="0" y1="0" x2="45" y2="0.17" stroke="#000000" strokeWidth="3" /></svg><svg key={13} style={{
        position: "absolute",
        left: "727.42px",
        top: "401.42px",
        width: "45px",
        height: "1px",
        overflow: "visible",
        transform: "rotate(90deg)",
        transformOrigin: "center"
      }}><line x1="0" y1="0" x2="45" y2="0.17" stroke="#000000" strokeWidth="3" /></svg><div key={14} style={{
        position: "absolute",
        left: "125px",
        top: "424px",
        width: "195px",
        height: "82.5px",
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
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"DEFINISI"}</span></p></div><div key={15} style={{
        position: "absolute",
        left: "376px",
        top: "424px",
        width: "210px",
        height: "82.5px",
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
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"BENTUK-BENTUK PERSAMAAN LOGARIMA"}</span></p></div><div key={16} style={{
        position: "absolute",
        left: "645px",
        top: "425.81px",
        width: "210px",
        height: "82.5px",
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
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"BENTUK-BENTUK PERTIDAKSAMAAN LOGARIMA"}</span></p></div><div key={17} style={{
        position: "absolute",
        left: "125px",
        top: "552px",
        width: "195px",
        height: "82.5px",
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
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"GRAFIK"}</span></p></div><svg key={18} style={{
        position: "absolute",
        left: "202.58px",
        top: "526.42px",
        width: "45px",
        height: "1px",
        overflow: "visible",
        transform: "rotate(90deg)",
        transformOrigin: "center"
      }}><line x1="0" y1="0" x2="45" y2="0.17" stroke="#000000" strokeWidth="3" /></svg><svg key={19} style={{
        position: "absolute",
        left: "457.42px",
        top: "526.42px",
        width: "45px",
        height: "1px",
        overflow: "visible",
        transform: "rotate(90deg)",
        transformOrigin: "center"
      }}><line x1="0" y1="0" x2="45" y2="0.17" stroke="#000000" strokeWidth="3" /></svg><svg key={20} style={{
        position: "absolute",
        left: "727.59px",
        top: "527.97px",
        width: "45px",
        height: "1px",
        overflow: "visible",
        transform: "rotate(90deg)",
        transformOrigin: "center"
      }}><line x1="0" y1="0" x2="45" y2="0.17" stroke="#000000" strokeWidth="3" /></svg><div key={21} style={{
        position: "absolute",
        left: "382.5px",
        top: "552px",
        width: "195px",
        height: "82.5px",
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
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"PENYELESAIAN"}</span></p></div><div key={22} style={{
        position: "absolute",
        left: "652.5px",
        top: "552px",
        width: "195px",
        height: "82.5px",
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
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
            color: "#ffffff"
          }}>{"PENYELESAIAN"}</span></p></div><div key={23} style={{
        position: "absolute",
        left: "1.55px",
        top: "0px",
        width: "958.45px",
        height: "96px",
        boxSizing: "border-box",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word",
        backgroundImage: `url(${img_1})`
      }}><p style={{
          textAlign: "center",
          lineHeight: "1.8",
          fontSize: "calc(40pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            textTransform: "uppercase",
            fontSize: "calc(40pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FFFF00"
          }}>{"PETA KONSEP"}</span></p></div><div key={24} style={{
        position: "absolute",
        left: "0px",
        top: "656px",
        width: "960px",
        height: "64px",
        boxSizing: "border-box",
        backgroundColor: "#f6c781",
        border: "1px solid #98B954",
        boxShadow: "0px 2.41px 0px rgba(0, 0, 0, 0.35)"
      }} /><div key={25} style={{
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
          }}>{"BACK"}</span></p></div><div key={26} style={{
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
          }}>{"NEXT"}</span></p></div><div key={27} style={{
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
          }}>{"HOME"}</a></p></div></div></div>;
};
export default Slide2;
