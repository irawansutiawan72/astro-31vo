import React, { useState, useEffect, useRef } from "react";
const Slide17: React.FC = () => {
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
  return <div id="slide-17" ref={outerRef} className="w-screen h-screen overflow-hidden relative" style={{
    backgroundColor: "#000"
  }}><div id="slide-inner-17" style={{
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
        left: "92px",
        top: "160px",
        width: "776px",
        height: "38.78px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"b. "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"5"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"log"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"2"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" x \u2013 "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"5"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"log x"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"6"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" + 5 = 0 \u2194 ("}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"5"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"log x)"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"2"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" \u2013 6 ("}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"5"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"log x) + 5 = 0 "}</span></p></div><div key={4} style={{
        position: "absolute",
        left: "128px",
        top: "220.14px",
        width: "688px",
        height: "67.86px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"Misalkan"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"5"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"log x = p. "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"Persamaan"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"tersebut"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"akan"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"menjadi"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"bentuk"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"berikut"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"."}</span></p></div><div key={5} style={{
        position: "absolute",
        left: "131.35px",
        top: "412.14px",
        width: "560px",
        height: "67.86px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"Untuk"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" p = 1 \u2192 "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"5"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"log x = 1 \u2194 "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"5"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"log x = "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"5"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"log 5"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"\t \u2194 x = 5"}</span></p></div><div key={6} style={{
        position: "absolute",
        left: "128px",
        top: "492.14px",
        width: "560px",
        height: "67.86px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"Untuk"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" p = 5 \u2192 "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"5"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"log x = 5 \u2194 "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"5"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"log x = "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"5"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"log 5"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"5"}</span></p><p style={{
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"\t \u2194 x = 5"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"5 "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"= 3.125"}</span></p></div><div key={7} style={{
        position: "absolute",
        left: "128px",
        top: "568px",
        width: "704px",
        height: "67.86px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        padding: "4.8px 9.6px 4.8px 9.6px",
        wordWrap: "break-word"
      }}><p style={{
          lineHeight: "1.2",
          fontSize: "calc(18pt * var(--pptx-font-scale, 1))",
          marginTop: "0",
          marginBottom: "0"
        }}><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"Dari "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"proses"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"tersebut"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{", "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"diperoleh"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"nilai"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" \u2013 "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"nilai"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" x > 0. "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"Jadi"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"himpunan"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" "}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{"penyelesaiannya"}</span><span style={{
            fontSize: "calc(18pt * var(--pptx-font-scale, 1))"
          }}>{" { 5; 3.125 }"}</span></p></div><div key={8} style={{
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
          }}>{"MATERI LOGARITMA"}</span></p></div><div key={9} style={{
        position: "absolute",
        left: "0px",
        top: "656px",
        width: "960px",
        height: "64px",
        boxSizing: "border-box",
        backgroundColor: "#f6c781",
        border: "1px solid #98B954",
        boxShadow: "0px 2.41px 0px rgba(0, 0, 0, 0.35)"
      }} /><div key={10} style={{
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
          }}>{"BACK"}</span></p></div><div key={11} style={{
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
          }}>{"NEXT"}</span></p></div><div key={12} style={{
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
export default Slide17;
