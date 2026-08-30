import type { ReactNode } from "react";

export type RedrawnDiagramKind =
  | "q1b"
  | "q1c"
  | "q1d"
  | "q1e"
  | "q1f"
  | "q2"
  | "q3"
  | "q4"
  | "q5"
  | "q6"
  | "q8"
  | "q10"
  | "q11"
  | "q12"
  | "q13";

type DiagramProps = {
  kind: RedrawnDiagramKind;
  isDark: boolean;
};

type SvgFrameProps = {
  viewBox: string;
  label: string;
  colors: DiagramColors;
  children: ReactNode;
};

type DiagramColors = {
  background: string;
  border: string;
  line: string;
  accent: string;
  label: string;
  arc: string;
  point: string;
};

function SvgFrame({ viewBox, label, colors, children }: SvgFrameProps) {
  return (
    <svg
      viewBox={viewBox}
      className="mt-3 w-full max-w-sm block rounded-xl border"
      style={{ background: colors.background, borderColor: colors.border }}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{label}</title>
      {children}
    </svg>
  );
}

function Text({
  x,
  y,
  children,
  colors,
  size = 18,
  anchor = "middle",
  italic = false,
}: {
  x: number;
  y: number;
  children: ReactNode;
  colors: DiagramColors;
  size?: number;
  anchor?: "start" | "middle" | "end";
  italic?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      fill={colors.label}
      fontSize={size}
      fontFamily={italic ? "Georgia, serif" : "ui-sans-serif, system-ui, sans-serif"}
      fontStyle={italic ? "italic" : undefined}
      fontWeight="800"
      textAnchor={anchor}
    >
      {children}
    </text>
  );
}

function Line({
  x1,
  y1,
  x2,
  y2,
  colors,
  width = 4,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  colors: DiagramColors;
  width?: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={colors.line}
      strokeWidth={width}
      strokeLinecap="round"
    />
  );
}

function RightAngle({
  d,
  colors,
}: {
  d: string;
  colors: DiagramColors;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={colors.accent}
      strokeWidth="3"
      strokeLinejoin="round"
    />
  );
}

function Point({ cx, cy, colors }: { cx: number; cy: number; colors: DiagramColors }) {
  return <circle cx={cx} cy={cy} r="4.5" fill={colors.point} />;
}

function Q1b({ colors }: { colors: DiagramColors }) {
  return (
    <SvgFrame viewBox="0 0 500 600" label="Gambar ulang soal 1 bagian b: sudut y dan 127 derajat" colors={colors}>
      <Line x1={48} y1={72} x2={450} y2={555} colors={colors} />
      <Line x1={252} y1={430} x2={320} y2={100} colors={colors} />
      <Point cx={252} cy={430} colors={colors} />
      <path
        d="M190 305 A130 130 0 0 1 280 292"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M275 322 C355 350 385 445 294 532"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Text x={260} y={320} colors={colors} size={26} italic>
        y
      </Text>
      <Text x={320} y={365} colors={colors} size={23}>
        127°
      </Text>
    </SvgFrame>
  );
}

function Q1c({ colors }: { colors: DiagramColors }) {
  return (
    <SvgFrame viewBox="0 0 520 500" label="Gambar ulang soal 1 bagian c: sudut 140 derajat dan z" colors={colors}>
      <Line x1={40} y1={48} x2={475} y2={455} colors={colors} />
      <Line x1={58} y1={455} x2={475} y2={45} colors={colors} />
      <Point cx={258} cy={250} colors={colors} />
      <path
        d="M219 215 A52 52 0 0 0 222 287"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
      />
      <path
        d="M295 214 A52 52 0 0 1 296 286"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
      />
      <Text x={175} y={260} colors={colors} size={24}>
        140°
      </Text>
      <Text x={338} y={260} colors={colors} size={27} italic>
        z
      </Text>
    </SvgFrame>
  );
}

function Q1d({ colors }: { colors: DiagramColors }) {
  return (
    <SvgFrame viewBox="0 0 600 320" label="Gambar ulang soal 1 bagian d: sudut a, 50 derajat, dan 20 derajat" colors={colors}>
      <Line x1={24} y1={268} x2={575} y2={268} colors={colors} />
      <Line x1={220} y1={268} x2={350} y2={28} colors={colors} />
      <Line x1={220} y1={268} x2={552} y2={108} colors={colors} />
      <Point cx={220} cy={268} colors={colors} />
      <path
        d="M138 268 A82 82 0 0 1 259 196"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
      />
      <path
        d="M248 220 A52 52 0 0 1 267 243"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
      />
      <path
        d="M275 268 A55 55 0 0 0 270 242"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
      />
      <Text x={168} y={205} colors={colors} size={24} italic>
        a
      </Text>
      <Text x={292} y={198} colors={colors} size={20}>
        50°
      </Text>
      <Text x={320} y={256} colors={colors} size={20}>
        20°
      </Text>
    </SvgFrame>
  );
}

function Q1e({ colors }: { colors: DiagramColors }) {
  return (
    <SvgFrame viewBox="0 0 600 260" label="Gambar ulang soal 1 bagian e: sudut 50 derajat dan b" colors={colors}>
      <Line x1={18} y1={28} x2={580} y2={28} colors={colors} />
      <Line x1={285} y1={28} x2={135} y2={230} colors={colors} />
      <Line x1={285} y1={28} x2={492} y2={230} colors={colors} />
      <RightAngle d="M258 64 L285 84 L307 56" colors={colors} />
      <Point cx={285} cy={28} colors={colors} />
      <path
        d="M225 28 A60 60 0 0 0 249 78"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
      />
      <path
        d="M345 28 A70 70 0 0 1 332 80"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
      />
      <Text x={184} y={76} colors={colors} size={22}>
        50°
      </Text>
      <Text x={365} y={76} colors={colors} size={26} italic>
        b
      </Text>
    </SvgFrame>
  );
}

function Q1f({ colors }: { colors: DiagramColors }) {
  return (
    <SvgFrame viewBox="0 0 600 430" label="Gambar ulang soal 1 bagian f: sudut c dan 80 derajat" colors={colors}>
      <Line x1={22} y1={35} x2={575} y2={405} colors={colors} />
      <Line x1={300} y1={220} x2={570} y2={0} colors={colors} />
      <Point cx={300} cy={220} colors={colors} />
      <RightAngle d="M274 200 L300 174 L323 197" colors={colors} />
      <path
        d="M221 159 A100 100 0 0 0 384 297"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
      />
      <path
        d="M364 156 A90 90 0 0 1 371 276"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
      />
      <Text x={160} y={300} colors={colors} size={27} italic>
        c
      </Text>
      <Text x={395} y={235} colors={colors} size={23}>
        80°
      </Text>
    </SvgFrame>
  );
}

function Q2({ colors }: { colors: DiagramColors }) {
  return (
    <SvgFrame viewBox="0 0 600 350" label="Gambar ulang soal 2: garis melalui titik B, D, E dan sinar A, C, F" colors={colors}>
      <Line x1={48} y1={205} x2={555} y2={205} colors={colors} />
      <Line x1={75} y1={350} x2={525} y2={60} colors={colors} />
      <Line x1={105} y1={55} x2={300} y2={205} colors={colors} />
      <Point cx={300} cy={205} colors={colors} />
      <Text x={42} y={230} colors={colors} size={20} anchor="start">
        B
      </Text>
      <Text x={292} y={240} colors={colors} size={20}>
        D
      </Text>
      <Text x={563} y={230} colors={colors} size={20} anchor="end">
        E
      </Text>
      <Text x={92} y={46} colors={colors} size={20}>
        C
      </Text>
      <Text x={506} y={48} colors={colors} size={20}>
        F
      </Text>
    </SvgFrame>
  );
}

function Q3({ colors }: { colors: DiagramColors }) {
  return (
    <SvgFrame viewBox="0 0 600 370" label="Gambar ulang soal 3: konfigurasi sudut di titik A" colors={colors}>
      <Line x1={230} y1={302} x2={558} y2={302} colors={colors} />
      <Line x1={230} y1={302} x2={230} y2={34} colors={colors} />
      <Line x1={230} y1={302} x2={105} y2={80} colors={colors} />
      <Line x1={230} y1={302} x2={500} y2={75} colors={colors} />
      <RightAngle d="M230 270 L260 270 L260 302" colors={colors} />
      <Point cx={230} cy={302} colors={colors} />
      <Text x={220} y={28} colors={colors} size={20}>
        D
      </Text>
      <Text x={77} y={74} colors={colors} size={20}>
        E
      </Text>
      <Text x={520} y={70} colors={colors} size={20}>
        C
      </Text>
      <Text x={571} y={310} colors={colors} size={20}>
        B
      </Text>
      <Text x={211} y={332} colors={colors} size={20}>
        A
      </Text>
    </SvgFrame>
  );
}

function Q4({ colors }: { colors: DiagramColors }) {
  return (
    <SvgFrame viewBox="0 0 600 380" label="Gambar ulang soal 4: sudut 20 derajat dan setengah x ditambah 15 derajat" colors={colors}>
      <Line x1={52} y1={335} x2={565} y2={335} colors={colors} />
      <Line x1={52} y1={335} x2={52} y2={35} colors={colors} />
      <Line x1={52} y1={335} x2={220} y2={60} colors={colors} />
      <RightAngle d="M52 300 L86 300 L86 335" colors={colors} />
      <path
        d="M52 270 A65 65 0 0 1 87 278"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
      />
      <Text x={91} y={254} colors={colors} size={22}>
        20°
      </Text>
      <Text x={240} y={300} colors={colors} size={21}>
        ½x + 15°
      </Text>
    </SvgFrame>
  );
}

function Q5({ colors }: { colors: DiagramColors }) {
  return (
    <SvgFrame viewBox="0 0 600 360" label="Gambar ulang soal 5: sudut PQR dengan dua bentuk aljabar" colors={colors}>
      <Line x1={54} y1={300} x2={560} y2={300} colors={colors} />
      <Line x1={170} y1={300} x2={170} y2={35} colors={colors} />
      <Line x1={170} y1={300} x2={490} y2={72} colors={colors} />
      <RightAngle d="M140 270 L170 270 L170 300" colors={colors} />
      <path
        d="M170 166 A135 135 0 0 1 278 218"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
      />
      <path
        d="M255 300 A85 85 0 0 0 236 247"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
      />
      <Text x={255} y={155} colors={colors} size={19}>
        (6x + 4)°
      </Text>
      <Text x={365} y={270} colors={colors} size={19}>
        (3x + 5)°
      </Text>
      <Text x={152} y={330} colors={colors} size={19}>
        Q
      </Text>
      <Text x={160} y={28} colors={colors} size={19}>
        P
      </Text>
      <Text x={505} y={70} colors={colors} size={19}>
        S
      </Text>
      <Text x={568} y={310} colors={colors} size={19}>
        R
      </Text>
    </SvgFrame>
  );
}

function Q6({ colors }: { colors: DiagramColors }) {
  return (
    <SvgFrame viewBox="0 0 600 300" label="Gambar ulang soal 6: sudut CBD dan ABD" colors={colors}>
      <Line x1={40} y1={210} x2={565} y2={210} colors={colors} />
      <Line x1={280} y1={210} x2={440} y2={40} colors={colors} />
      <Point cx={280} cy={210} colors={colors} />
      <Text x={27} y={245} colors={colors} size={20}>
        C
      </Text>
      <Text x={280} y={250} colors={colors} size={20}>
        B
      </Text>
      <Text x={450} y={38} colors={colors} size={20}>
        D
      </Text>
      <Text x={198} y={187} colors={colors} size={20}>
        (2x + 5)°
      </Text>
      <Text x={385} y={187} colors={colors} size={20}>
        (3x − 25)°
      </Text>
    </SvgFrame>
  );
}

function Q8({ colors }: { colors: DiagramColors }) {
  return (
    <SvgFrame viewBox="0 0 600 230" label="Gambar ulang soal 8: sudut x dan y pada garis lurus" colors={colors}>
      <Line x1={18} y1={176} x2={580} y2={176} colors={colors} />
      <Line x1={290} y1={176} x2={165} y2={28} colors={colors} />
      <Point cx={290} cy={176} colors={colors} />
      <path
        d="M222 176 A68 68 0 0 1 231 96"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
      />
      <path
        d="M231 96 A82 82 0 0 1 355 176"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
      />
      <Text x={234} y={145} colors={colors} size={27} italic>
        x
      </Text>
      <Text x={315} y={135} colors={colors} size={27} italic>
        y
      </Text>
    </SvgFrame>
  );
}

function Q10({ colors }: { colors: DiagramColors }) {
  return (
    <SvgFrame viewBox="0 0 600 350" label="Gambar ulang soal 10: tiga garis dan sudut 2x serta 7x di titik O" colors={colors}>
      <Line x1={35} y1={200} x2={570} y2={200} colors={colors} />
      <Line x1={300} y1={330} x2={300} y2={20} colors={colors} />
      <Line x1={45} y1={295} x2={570} y2={95} colors={colors} />
      <RightAngle d="M275 200 L275 175 L300 175" colors={colors} />
      <Point cx={300} cy={200} colors={colors} />
      <Text x={120} y={245} colors={colors} size={20}>
        2x°
      </Text>
      <Text x={348} y={150} colors={colors} size={20}>
        7x°
      </Text>
      <Text x={300} y={228} colors={colors} size={20}>
        O
      </Text>
      <Text x={34} y={316} colors={colors} size={20}>
        A
      </Text>
      <Text x={576} y={222} colors={colors} size={20} anchor="end">
        B
      </Text>
    </SvgFrame>
  );
}

function Q11({ colors }: { colors: DiagramColors }) {
  return (
    <SvgFrame viewBox="0 0 600 280" label="Gambar ulang soal 11: empat sudut p, q, r, dan s" colors={colors}>
      <Line x1={30} y1={45} x2={570} y2={235} colors={colors} />
      <Line x1={55} y1={235} x2={575} y2={55} colors={colors} />
      <Point cx={300} cy={140} colors={colors} />
      <Text x={300} y={110} colors={colors} size={24} italic>
        p
      </Text>
      <Text x={392} y={143} colors={colors} size={24} italic>
        q
      </Text>
      <Text x={300} y={185} colors={colors} size={24} italic>
        r
      </Text>
      <Text x={214} y={143} colors={colors} size={24} italic>
        s
      </Text>
    </SvgFrame>
  );
}

function Q12({ colors }: { colors: DiagramColors }) {
  return (
    <SvgFrame viewBox="0 0 600 360" label="Gambar ulang soal 12: dua garis berpotongan dengan 28 ditambah a derajat dan 77 derajat" colors={colors}>
      <Line x1={105} y1={65} x2={510} y2={305} colors={colors} />
      <Line x1={100} y1={310} x2={510} y2={45} colors={colors} />
      <Point cx={302} cy={180} colors={colors} />
      <Text x={80} y={55} colors={colors} size={21}>
        D
      </Text>
      <Text x={530} y={47} colors={colors} size={21}>
        C
      </Text>
      <Text x={75} y={332} colors={colors} size={21}>
        A
      </Text>
      <Text x={535} y={320} colors={colors} size={21}>
        B
      </Text>
      <Text x={302} y={230} colors={colors} size={21}>
        E
      </Text>
      <Text x={198} y={202} colors={colors} size={18}>
        (28 + a)°
      </Text>
      <Text x={375} y={185} colors={colors} size={18}>
        77°
      </Text>
    </SvgFrame>
  );
}

function Q13({ colors }: { colors: DiagramColors }) {
  return (
    <SvgFrame viewBox="0 0 600 360" label="Gambar ulang soal 13: dua garis berpotongan di titik E" colors={colors}>
      <Line x1={105} y1={45} x2={505} y2={315} colors={colors} />
      <Line x1={105} y1={315} x2={505} y2={45} colors={colors} />
      <Point cx={305} cy={180} colors={colors} />
      <Text x={82} y={40} colors={colors} size={21}>
        D
      </Text>
      <Text x={530} y={42} colors={colors} size={21}>
        C
      </Text>
      <Text x={82} y={338} colors={colors} size={21}>
        A
      </Text>
      <Text x={530} y={338} colors={colors} size={21}>
        B
      </Text>
      <Text x={305} y={225} colors={colors} size={21}>
        E
      </Text>
      <Text x={305} y={125} colors={colors} size={18}>
        (5y + 17)°
      </Text>
      <Text x={230} y={185} colors={colors} size={18}>
        73°
      </Text>
      <Text x={420} y={188} colors={colors} size={18}>
        (5x − 27)°
      </Text>
    </SvgFrame>
  );
}

export function RedrawnAngleDiagram({ kind, isDark }: DiagramProps) {
  const colors: DiagramColors = isDark
    ? {
        background: "rgba(15, 23, 42, 0.94)",
        border: "rgba(34, 211, 238, 0.42)",
        line: "#fde047",
        accent: "#22d3ee",
        label: "#fef08a",
        arc: "#fb7185",
        point: "#67e8f9",
      }
    : {
        background: "rgba(248, 250, 252, 0.98)",
        border: "rgba(30, 64, 175, 0.28)",
        line: "#1e3a8a",
        accent: "#0e7490",
        label: "#172554",
        arc: "#be123c",
        point: "#0e7490",
      };

  switch (kind) {
    case "q1b":
      return <Q1b colors={colors} />;
    case "q1c":
      return <Q1c colors={colors} />;
    case "q1d":
      return <Q1d colors={colors} />;
    case "q1e":
      return <Q1e colors={colors} />;
    case "q1f":
      return <Q1f colors={colors} />;
    case "q2":
      return <Q2 colors={colors} />;
    case "q3":
      return <Q3 colors={colors} />;
    case "q4":
      return <Q4 colors={colors} />;
    case "q5":
      return <Q5 colors={colors} />;
    case "q6":
      return <Q6 colors={colors} />;
    case "q8":
      return <Q8 colors={colors} />;
    case "q10":
      return <Q10 colors={colors} />;
    case "q11":
      return <Q11 colors={colors} />;
    case "q12":
      return <Q12 colors={colors} />;
    case "q13":
      return <Q13 colors={colors} />;
  }
}