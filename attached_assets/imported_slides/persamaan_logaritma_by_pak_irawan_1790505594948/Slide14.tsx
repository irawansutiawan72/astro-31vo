import React, { useState, useEffect, useRef } from "react";
const Slide14: React.FC = () => {
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
  return <div id="slide-14" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-14" style={{
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
        left: "24px",
        top: "170.76px",
        width: "904px",
        height: "46.85px",
        boxSizing: "border-box",
        backgroundColor: "#F9B201",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(23pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(23pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FF0000"
          }}>{"d. "}</span><span style={{
            fontSize: "calc(23pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FF0000"
          }}>{"Persamaan"}</span><span style={{
            fontSize: "calc(23pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FF0000"
          }}>{" "}</span><span style={{
            fontSize: "calc(23pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FF0000"
          }}>{"logaritma"}</span><span style={{
            fontSize: "calc(23pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FF0000"
          }}>{" "}</span><span style={{
            fontSize: "calc(23pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FF0000"
          }}>{"berbentuk"}</span><span style={{
            fontSize: "calc(23pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FF0000"
          }}>{" A {"}</span><span style={{
            fontSize: "calc(23pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FF0000"
          }}>{"a"}</span><span style={{
            fontSize: "calc(23pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FF0000"
          }}>{"log"}</span><span style={{
            fontSize: "calc(23pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FF0000"
          }}>{" x}"}</span><span style={{
            fontSize: "calc(23pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FF0000"
          }}>{"2"}</span><span style={{
            fontSize: "calc(23pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FF0000"
          }}>{" + B {"}</span><span style={{
            fontSize: "calc(23pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FF0000"
          }}>{"a"}</span><span style={{
            fontSize: "calc(23pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FF0000"
          }}>{"log"}</span><span style={{
            fontSize: "calc(23pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FF0000"
          }}>{" x} + C = 0 "}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "72px",
        top: "264px",
        width: "656px",
        height: "54.93px",
        boxSizing: "border-box",
        backgroundColor: "#FFFFCC",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"Jika"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{" "}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"A {"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"a"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"log"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{" x}"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"2"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{" + B {"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"a"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"log"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{" x} + C = 0"}</span></p></div><div key={5} style={{
        position: "absolute",
        left: "72px",
        top: "360px",
        width: "808px",
        height: "145.41px",
        boxSizing: "border-box",
        backgroundColor: "#FFFFCC",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          textAlign: "justify",
          lineHeight: "1.2",
          fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"Jika"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{" "}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"dimisalkan"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{" y = "}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"a"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"log"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{" x, "}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"maka"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{" "}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"persamaan"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{" "}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"tersebut"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{" "}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"dapat"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{" "}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"diubah"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{" "}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"menjadi"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{" "}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"persamaan"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{" "}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"kuadrat"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{" "}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"dalam"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{" "}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{"variabel"}</span><span style={{
            fontSize: "calc(28pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            fontWeight: "700",
            color: "#7030A0"
          }}>{" y."}</span></p></div><div key={6} style={{
        position: "absolute",
        left: "0px",
        top: "16px",
        width: "960px",
        height: "120px",
        boxSizing: "border-box",
        backgroundColor: "#c3986d",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
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
          }}>{"Persamaan"}</span><span style={{
            textTransform: "uppercase",
            fontSize: "calc(40pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FFFF00"
          }}>{" "}</span><span style={{
            textTransform: "uppercase",
            fontSize: "calc(40pt * var(--pptx-font-scale, 1))",
            fontFamily: "Arial, 'Helvetica Neue', sans-serif",
            color: "#FFFF00"
          }}>{"logaritma"}</span></p></div><div key={7} style={{
        position: "absolute",
        left: "0px",
        top: "656px",
        width: "960px",
        height: "64px",
        boxSizing: "border-box",
        backgroundColor: "#f6c781",
        border: "1px solid #98B954",
        boxShadow: "0px 2.41px 0px rgba(0, 0, 0, 0.35)"
      }} /><div key={8} style={{
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
          }}>{"BACK"}</span></p></div><div key={9} style={{
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
          }}>{"NEXT"}</span></p></div><div key={10} style={{
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
export default Slide14;
