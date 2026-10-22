import { useId } from "react";
import type { ReactNode } from "react";
import { ArrowDown, ArrowUpRight, BookOpen, ChevronRight, CircleHelp, Compass, Lightbulb, Sparkles, Target } from "lucide-react";
import { BlockMath, InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const InlineMath = ({ math }: { math: string }) => <KaTeXInlineMath math={math} />;
const cx = 160;
const cy = 160;
const scale = 33;
const X = (x: number) => cx + x * scale;
const Y = (y: number) => cy - y * scale;
const clamp = (n: number) => Math.max(-4, Math.min(4, n));
const samples = (fn: (x: number) => number, lo = -4, hi = 4, count = 100) =>
  Array.from({ length: count + 1 }, (_, i) => {
    const x = lo + ((hi - lo) * i) / count;
    return [X(x), Y(clamp(fn(x)))] as const;
  });
const pathFrom = (pts: readonly (readonly [number, number])[]) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
const regionPath = (fn: (x: number) => number, side: "above" | "below", lo = -4, hi = 4) => {
  const pts = samples(fn, lo, hi);
  const edgeY = side === "above" ? 28 : 292;
  return `${pathFrom(pts)} L${X(hi)},${edgeY} L${X(lo)},${edgeY} Z`;
};
const betweenPath = (lower: (x: number) => number, upper: (x: number) => number, lo: number, hi: number) => {
  const low = samples(lower, lo, hi);
  const high = samples(upper, lo, hi).reverse();
  return `${pathFrom(low)} ${high.map(([x, y]) => `L${x.toFixed(1)},${y.toFixed(1)}`).join(" ")} Z`;
};
const pathSide = (fn: (y: number) => number, left = true) => {
  const points = Array.from({ length: 101 }, (_, i) => {
    const y = -4 + (8 * i) / 100;
    return [X(clamp(fn(y))), Y(y)] as const;
  });
  const edgeX = left ? 28 : 292;
  return `${pathFrom(points)} L${edgeX},${Y(4)} L${edgeX},${Y(-4)} Z`;
};

function GraphFrame({ title, caption, children, testId }: { title: string; caption: string; children: (id: string) => ReactNode; testId: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <figure className="rounded-2xl border border-cyan-100/15 bg-[#07172a]/80 p-3 sm:p-4" data-testid={testId}>
      <svg viewBox="0 0 320 320" role="img" aria-labelledby={`${id}-title ${id}-desc`} className="mx-auto block w-full max-w-[340px]">
        <title id={`${id}-title`}>{title}</title><desc id={`${id}-desc`}>{caption}</desc>
        <defs><clipPath id={`${id}-clip`}><rect x="28" y="28" width="264" height="264" rx="2" /></clipPath></defs>
        <rect x="28" y="28" width="264" height="264" rx="7" fill="#0a1c30" stroke="#31516a" />
        {Array.from({ length: 9 }, (_, i) => {
          const v = i - 4;
          return <g key={v}><path d={`M${X(v)},28 V292 M28,${Y(v)} H292`} stroke={v === 0 ? "#7993a8" : "#203c54"} strokeWidth={v === 0 ? 1.25 : .65} /><text x={X(v)} y="306" textAnchor="middle" fill="#a8bfd0" fontSize="8">{v || ""}</text>{v !== 0 && <text x="20" y={Y(v) + 3} textAnchor="middle" fill="#a8bfd0" fontSize="8">{v}</text>}</g>;
        })}
        <text x="300" y="164" fill="#d7edf5" fontSize="11" fontWeight="700">x</text><text x="163" y="18" fill="#d7edf5" fontSize="11" fontWeight="700">y</text>
        <g clipPath={`url(#${id}-clip)`}>{children(id)}</g>
      </svg>
      <figcaption className="mt-2 text-center text-xs leading-relaxed text-slate-300">{caption}</figcaption>
    </figure>
  );
}

function FunctionGraph({ title, caption, fn, side = "above", dashed = false, testPoint, testId }: {
  title: string; caption: string; fn: (x: number) => number; side?: "above" | "below"; dashed?: boolean; testPoint?: [number, number]; testId: string;
}) {
  const pts = samples(fn);
  return <GraphFrame title={title} caption={caption} testId={testId}>{(id) => <>
    <path d={regionPath(fn, side)} fill="#27c8c5" opacity=".23" />
    <path d={pathFrom(pts)} fill="none" stroke="#ffb45d" strokeWidth="2.6" strokeDasharray={dashed ? "7 5" : undefined} />
    {testPoint && <g><circle cx={X(testPoint[0])} cy={Y(testPoint[1])} r="4.5" fill="#ff6486" stroke="#fff" strokeWidth="1.3" /><text x={X(testPoint[0]) + 7} y={Y(testPoint[1]) - 7} fontSize="9" fill="#fff">({testPoint[0]}, {testPoint[1]})</text></g>}
    <text x="205" y="48" fill="#ffe0ad" fontSize="9" fontWeight="700">{dashed ? "batas putus-putus" : "batas penuh"}</text>
  </>}</GraphFrame>;
}

function SidewaysGraph({ title, caption, testId }: { title: string; caption: string; testId: string }) {
  const fn = (y: number) => -((y - 1) ** 2) + 3;
  return <GraphFrame title={title} caption={caption} testId={testId}>{() => <>
    <path d={pathSide(fn)} fill="#27c8c5" opacity=".23" />
    <path d={Array.from({ length: 101 }, (_, i) => { const y = -4 + i * .08; return `${i ? "L" : "M"}${X(clamp(fn(y))).toFixed(1)},${Y(y).toFixed(1)}`; }).join(" ")} fill="none" stroke="#ffb45d" strokeWidth="2.7" />
    <circle cx={X(3)} cy={Y(1)} r="4" fill="#ff6486" /><text x={X(3) - 38} y={Y(1) - 8} fill="#fff" fontSize="9">(3, 1)</text>
    <circle cx={X(0)} cy={Y(0)} r="4" fill="#ff6486" stroke="#fff" strokeWidth="1" /><text x={X(0) + 6} y={Y(0) - 7} fill="#fff" fontSize="8">uji (0, 0)</text>
  </>}</GraphFrame>;
}

function CircleGraph({ title, caption, radius, center = [0, 0], mode, secondRadius, dashed = false, testPoint, testLabel, testId }: {
  title: string; caption: string; radius: number; center?: [number, number]; mode: "inside" | "outside" | "ring"; secondRadius?: number; dashed?: boolean; testPoint?: [number, number]; testLabel?: string; testId: string;
}) {
  const [x, y] = center;
  return <GraphFrame title={title} caption={caption} testId={testId}>{(id) => <>
    {mode === "inside" && <circle cx={X(x)} cy={Y(y)} r={radius * scale} fill="#27c8c5" opacity=".28" />}
    {mode === "outside" && <><defs><mask id={`${id}-outside-mask`} maskUnits="userSpaceOnUse" x="28" y="28" width="264" height="264"><rect x="28" y="28" width="264" height="264" fill="white" /><circle cx={X(x)} cy={Y(y)} r={radius * scale} fill="black" /></mask></defs><rect x="28" y="28" width="264" height="264" fill="#27c8c5" opacity=".2" mask={`url(#${id}-outside-mask)`} /></>}
    {mode === "ring" && <><defs><mask id={`${id}-ring-mask`} maskUnits="userSpaceOnUse" x="28" y="28" width="264" height="264"><rect x="28" y="28" width="264" height="264" fill="white" /><circle cx={X(x)} cy={Y(y)} r={radius * scale} fill="black" /></mask></defs><circle cx={X(x)} cy={Y(y)} r={(secondRadius || 3) * scale} fill="#27c8c5" opacity=".28" mask={`url(#${id}-ring-mask)`} /></>}
    <circle cx={X(x)} cy={Y(y)} r={radius * scale} fill="none" stroke="#ffb45d" strokeWidth="2.5" strokeDasharray={dashed ? "7 5" : undefined} />
    {secondRadius && <circle cx={X(x)} cy={Y(y)} r={secondRadius * scale} fill="none" stroke="#f58a91" strokeWidth="2.5" />}
    <circle cx={X(x)} cy={Y(y)} r="3.3" fill="#fff" /><text x={X(x) + 6} y={Y(y) - 7} fill="#fff" fontSize="9">pusat ({x}, {y})</text>
    {testPoint && <><circle cx={X(testPoint[0])} cy={Y(testPoint[1])} r="4" fill="#ff6486" stroke="#fff" strokeWidth="1" /><text x={X(testPoint[0]) + (testPoint[0] >= 3 ? -6 : 6)} y={Y(testPoint[1]) + 13} textAnchor={testPoint[0] >= 3 ? "end" : "start"} fill="#fff" fontSize="8">{testLabel || `uji (${testPoint[0]}, ${testPoint[1]})`}</text></>}
  </>}</GraphFrame>;
}

function Example23dGraph() {
  const left = 28; const right = 292; const top = 28; const bottom = 292;
  const xMin = -5; const xMax = 4; const yMin = -6; const yMax = 3;
  const px = (x: number) => left + ((x - xMin) / (xMax - xMin)) * (right - left);
  const py = (y: number) => bottom - ((y - yMin) / (yMax - yMin)) * (bottom - top);
  const centerX = px(-1); const centerY = py(-2); const radius = (3 / (xMax - xMin)) * (right - left);
  const id = useId().replace(/:/g, "");
  const xTicks = [-4, -2, 0, 2, 4]; const yTicks = [-6, -4, -2, 0, 2];
  return <figure className="rounded-2xl border border-cyan-100/15 bg-[#07172a]/80 p-3 sm:p-4" data-testid="graph-23-d">
    <svg viewBox="0 0 320 320" role="img" aria-labelledby={`${id}-title ${id}-desc`} className="mx-auto block w-full max-w-[340px]">
      <title id={`${id}-title`}>Contoh 23d: daerah luar lingkaran putus-putus</title>
      <desc id={`${id}-desc`}>Lingkaran berpusat di (-1, -2) dengan radius 3. Daerah diarsir berada di luar lingkaran. Titik uji (3, -2) berada di luar batas.</desc>
      <defs><clipPath id={`${id}-clip`}><rect x={left} y={top} width={right-left} height={bottom-top} /></clipPath><mask id={`${id}-outside-mask`} maskUnits="userSpaceOnUse" x={left} y={top} width={right-left} height={bottom-top}><rect x={left} y={top} width={right-left} height={bottom-top} fill="white" /><circle cx={centerX} cy={centerY} r={radius} fill="black" /></mask></defs>
      <rect x={left} y={top} width={right-left} height={bottom-top} rx="6" fill="#0a1c30" stroke="#31516a" />
      <g clipPath={`url(#${id}-clip)`}>
        <rect x={left} y={top} width={right-left} height={bottom-top} fill="#27c8c5" opacity=".2" mask={`url(#${id}-outside-mask)`} />
        {xTicks.map((x) => <path key={`x-${x}`} d={`M${px(x)},${top} V${bottom}`} stroke={x === 0 ? "#7993a8" : "#203c54"} strokeWidth={x === 0 ? 1.2 : .65} />)}
        {yTicks.map((y) => <path key={`y-${y}`} d={`M${left},${py(y)} H${right}`} stroke={y === 0 ? "#7993a8" : "#203c54"} strokeWidth={y === 0 ? 1.2 : .65} />)}
        <path d={`M${left},${py(0)} H${right} M${px(0)},${top} V${bottom}`} fill="none" stroke="#91aabd" strokeWidth="1.2" />
        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#ffb45d" strokeWidth="2.5" strokeDasharray="7 5" />
        <circle cx={centerX} cy={centerY} r="3.5" fill="#fff" /><text x={centerX-34} y={centerY-8} fill="#fff" fontSize="8">(-1, -2)</text>
        <circle cx={px(3)} cy={py(-2)} r="4" fill="#ff6486" stroke="#fff" strokeWidth="1" /><text x={px(3)-6} y={py(-2)+14} textAnchor="end" fill="#fff" fontSize="8">uji (3, -2)</text>
      </g>
      {xTicks.map((x) => <text key={`xl-${x}`} x={px(x)} y="306" textAnchor="middle" fill="#a8bfd0" fontSize="8">{x}</text>)}
      {yTicks.map((y) => <text key={`yl-${y}`} x="20" y={py(y)+3} textAnchor="middle" fill="#a8bfd0" fontSize="8">{y}</text>)}
      <text x="300" y={py(0)-5} fill="#d7edf5" fontSize="10" fontWeight="700">x</text><text x={px(0)+5} y="20" fill="#d7edf5" fontSize="10" fontWeight="700">y</text>
    </svg>
    <figcaption className="mt-2 text-center text-xs leading-relaxed text-slate-300">Lingkaran berjari-jari 3 tampak utuh; arsiran luar tidak mengikutsertakan garis batas putus-putus.</figcaption>
  </figure>;
}

function EllipseGraph({ title, caption, testId }: { title: string; caption: string; testId: string }) {
  return <GraphFrame title={title} caption={caption} testId={testId}>{() => <>
    <ellipse cx={160} cy={160} rx={4 * scale} ry={3 * scale} fill="#27c8c5" opacity=".25" />
    <ellipse cx={160} cy={160} rx={4 * scale} ry={3 * scale} fill="none" stroke="#ffb45d" strokeWidth="2.5" strokeDasharray="7 5" />
    <circle cx="160" cy="160" r="3.5" fill="#fff" /><text x="166" y="151" fill="#fff" fontSize="9">(0, 0)</text>
    <circle cx="160" cy="160" r="6" fill="none" stroke="#ff6486" strokeWidth="1.6" /><text x="169" y="173" fill="#fff" fontSize="8">uji</text>
  </>}</GraphFrame>;
}

function WedgeGraph({ lessThan, testId }: { lessThan: boolean; testId: string }) {
  return <GraphFrame title={lessThan ? "DHP x² − y² ≤ 0" : "DHP x² − y² ≥ 0"} caption={lessThan ? "Daerah atas dan bawah di antara garis y = x dan y = −x." : "Daerah kiri dan kanan di antara garis y = x dan y = −x."} testId={testId}>{() => <>
    {lessThan ? <><path d={`M${X(-4)},${Y(4)} L${X(4)},${Y(4)} L${X(0)},${Y(0)} Z`} fill="#27c8c5" opacity=".3" /><path d={`M${X(-4)},${Y(-4)} L${X(4)},${Y(-4)} L${X(0)},${Y(0)} Z`} fill="#27c8c5" opacity=".3" /></> : <><path d={`M${X(-4)},${Y(4)} L${X(-4)},${Y(-4)} L${X(0)},${Y(0)} Z`} fill="#27c8c5" opacity=".3" /><path d={`M${X(4)},${Y(4)} L${X(4)},${Y(-4)} L${X(0)},${Y(0)} Z`} fill="#27c8c5" opacity=".3" /></>}
    <path d={`M${X(-4)},${Y(-4)} L${X(4)},${Y(4)} M${X(-4)},${Y(4)} L${X(4)},${Y(-4)}`} fill="none" stroke="#ffb45d" strokeWidth="2.5" />
    <text x="215" y="62" fill="#fff" fontSize="9">y = x</text><text x="205" y="251" fill="#fff" fontSize="9">y = −x</text>
    <circle cx={X(lessThan ? 0 : 2)} cy={Y(lessThan ? 2 : 0)} r="4" fill="#ff6486" stroke="#fff" strokeWidth="1" /><text x={X(lessThan ? 0 : 2) + 6} y={Y(lessThan ? 2 : 0) - 6} fill="#fff" fontSize="8">uji</text>
  </>}</GraphFrame>;
}

function SystemGraph({ title, caption, lower, upper, lo, hi, aboveBoth, openEnds, testId }: {
  title: string; caption: string; lower: (x: number) => number; upper: (x: number) => number; lo: number; hi: number; aboveBoth?: boolean; openEnds?: boolean; testId: string;
}) {
  const low = aboveBoth ? (x: number) => Math.max(lower(x), upper(x)) : lower;
  const high = aboveBoth ? () => 4 : upper;
  return <GraphFrame title={title} caption={caption} testId={testId}>{() => <>
    <path d={betweenPath(low, high, lo, hi)} fill="#27c8c5" opacity=".25" />
    <path d={pathFrom(samples(lower))} fill="none" stroke="#ffb45d" strokeWidth="2.5" />
    <path d={pathFrom(samples(upper))} fill="none" stroke="#f58a91" strokeWidth="2.5" strokeDasharray={title.includes("Contoh 25") ? "7 5" : undefined} />
    {openEnds ? <><circle cx={X(lo)} cy={Y(lower(lo))} r="4.5" fill="#0a1c30" stroke="#f58a91" strokeWidth="2" /><circle cx={X(hi)} cy={Y(lower(hi))} r="4.5" fill="#0a1c30" stroke="#f58a91" strokeWidth="2" /></> : <><circle cx={X(lo)} cy={Y(lower(lo))} r="3.5" fill="#fff" /><circle cx={X(hi)} cy={Y(lower(hi))} r="3.5" fill="#fff" /></>}
  </>}</GraphFrame>;
}

function Example26Graph() {
  const left = 34; const right = 292; const top = 28; const bottom = 292;
  const xMin = -2; const xMax = 7; const yMin = -40; const yMax = 5;
  const px = (x: number) => left + ((x - xMin) / (xMax - xMin)) * (right - left);
  const py = (y: number) => bottom - ((Math.max(yMin, Math.min(yMax, y)) - yMin) / (yMax - yMin)) * (bottom - top);
  const line = (x: number) => -5 * x - 6;
  const parabola = (x: number) => -x * x;
  const xs = Array.from({ length: 181 }, (_, i) => xMin + ((xMax - xMin) * i) / 180);
  const curvePath = (fn: (x: number) => number) => xs.map((x, i) => `${i ? "L" : "M"}${px(x).toFixed(1)},${py(fn(x)).toFixed(1)}`).join(" ");
  const lowerPath = xs.map((x, i) => `${i ? "L" : "M"}${px(x).toFixed(1)},${py(Math.max(line(x), parabola(x))).toFixed(1)}`).join(" ");
  const region = `${lowerPath} L${px(xMax)},${top} L${px(xMin)},${top} Z`;
  const id = useId().replace(/:/g, "");
  const xTicks = Array.from({ length: 10 }, (_, i) => i - 2);
  const yTicks = [-40, -30, -20, -10, 0];
  return <figure className="rounded-2xl border border-cyan-100/15 bg-[#07172a]/80 p-3 sm:p-4" data-testid="graph-example-26">
    <svg viewBox="0 0 320 320" role="img" aria-labelledby={`${id}-title ${id}-desc`} className="mx-auto block w-full max-w-[340px]">
      <title id={`${id}-title`}>Contoh 26: irisan di atas garis dan parabola</title>
      <desc id={`${id}-desc`}>Grafik dengan skala x dari minus 2 sampai 7 dan y dari minus 40 sampai 5. Daerah diarsir di atas kedua batas penuh dan memuat titik potong (-1, -1) dan (6, -36).</desc>
      <defs><clipPath id={`${id}-clip`}><rect x={left} y={top} width={right-left} height={bottom-top} /></clipPath></defs>
      <rect x={left} y={top} width={right-left} height={bottom-top} rx="6" fill="#0a1c30" stroke="#31516a" />
      {xTicks.map((x) => <g key={`x-${x}`}><path d={`M${px(x)},${top} V${bottom}`} stroke={x === 0 ? "#7993a8" : "#203c54"} strokeWidth={x === 0 ? 1.2 : .65} /><text x={px(x)} y="306" textAnchor="middle" fill="#a8bfd0" fontSize="7">{x}</text></g>)}
      {yTicks.map((y) => <g key={`y-${y}`}><path d={`M${left},${py(y)} H${right}`} stroke={y === 0 ? "#7993a8" : "#203c54"} strokeWidth={y === 0 ? 1.2 : .65} /><text x="25" y={py(y)+3} textAnchor="middle" fill="#a8bfd0" fontSize="7">{y}</text></g>)}
      <g clipPath={`url(#${id}-clip)`}>
        <path d={region} fill="#27c8c5" opacity=".25" />
        <path d={`M${left},${py(0)} H${right} M${px(0)},${top} V${bottom}`} fill="none" stroke="#91aabd" strokeWidth="1.2" />
        <path d={curvePath(line)} fill="none" stroke="#ffb45d" strokeWidth="2.5" />
        <path d={curvePath(parabola)} fill="none" stroke="#f58a91" strokeWidth="2.5" />
        <circle cx={px(-1)} cy={py(-1)} r="4" fill="#fff" /><text x={px(-1)+6} y={py(-1)-7} fill="#fff" fontSize="8">(-1, -1)</text>
        <circle cx={px(6)} cy={py(-36)} r="4" fill="#fff" /><text x={px(6)-37} y={py(-36)+14} fill="#fff" fontSize="8">(6, -36)</text>
      </g>
      <text x="300" y={py(0)-5} fill="#d7edf5" fontSize="10" fontWeight="700">x</text>
      <text x={px(0)+5} y="20" fill="#d7edf5" fontSize="10" fontWeight="700">y</text>
      <text x="42" y="42" fill="#d4f7f5" fontSize="8">DHP di atas kedua batas</text>
    </svg>
    <figcaption className="mt-2 text-center text-xs leading-relaxed text-slate-300">Arsiran memenuhi y ≥ −5x − 6 dan y ≥ −x². Kedua titik potong terlihat pada skala yang disesuaikan.</figcaption>
  </figure>;
}

function EllipseSystemGraph() {
  const lower = (x: number) => Math.max(x, x * x + 2 * x - 3);
  const upper = (x: number) => 3 * Math.sqrt(Math.max(0, 1 - (x * x) / 16));
  const points = Array.from({ length: 101 }, (_, i) => -4 + i * .08).filter((x) => x * x <= 16 && lower(x) <= upper(x));
  const lo = points[0] ?? -2; const hi = points[points.length - 1] ?? 2;
  return <GraphFrame title="Contoh 29 · DHP irisan tiga batas" caption="Daerah bersama berada di dalam elips, di atas parabola, dan di atas garis y = x." testId="graph-example-29">{() => <>
    <path d={betweenPath(lower, upper, lo, hi)} fill="#27c8c5" opacity=".34" />
    <ellipse cx={160} cy={160} rx={4 * scale} ry={3 * scale} fill="none" stroke="#f58a91" strokeWidth="2.5" strokeDasharray="7 5" />
    <path d={pathFrom(samples((x) => x * x + 2 * x - 3))} fill="none" stroke="#ffb45d" strokeWidth="2.4" />
    <path d={pathFrom(samples((x) => x))} fill="none" stroke="#c1a4ff" strokeWidth="2.4" />
    <circle cx={X(0)} cy={Y(1)} r="4.5" fill="#ff6486" stroke="#fff" strokeWidth="1.3" /><text x={X(0) + 7} y={Y(1) - 7} fill="#fff" fontSize="9">(0, 1)</text>
  </>}</GraphFrame>;
}

function IntersectionGraph() {
  const regionBelow = (fn: (x: number) => number) => `${pathFrom(samples(fn))} L${X(4)},${Y(-4)} L${X(-4)},${Y(-4)} Z`;
  const commonBoundary = samples((x) => Math.min(x, 1));
  const commonRegion = `${pathFrom(commonBoundary)} L${X(4)},${Y(-4)} L${X(-4)},${Y(-4)} Z`;
  return <GraphFrame title="Irisan dua daerah penyelesaian" caption="DHP adalah bagian berwarna yang memenuhi kedua syarat sekaligus; area lain hanya memenuhi satu syarat." testId="graph-system-intersection">{() => <>
    <path d={regionBelow((x) => x)} fill="#ffb45d" opacity=".16" />
    <path d={`M${X(-4)},${Y(1)} L${X(4)},${Y(1)} L${X(4)},${Y(-4)} L${X(-4)},${Y(-4)} Z`} fill="#c1a4ff" opacity=".13" />
    <path d={commonRegion} fill="#27c8c5" opacity=".34" />
    <path d={`M${X(-4)},${Y(-4)} L${X(4)},${Y(4)}`} stroke="#ffb45d" strokeWidth="2.4" />
    <path d={`M${X(-4)},${Y(1)} L${X(4)},${Y(1)}`} stroke="#c1a4ff" strokeWidth="2.4" />
    <text x="215" y="96" fill="#ffe2b3" fontSize="9">y = x</text>
    <text x="233" y="122" fill="#e1d3ff" fontSize="9">y = 1</text>
    <circle cx={X(2)} cy={Y(0)} r="4" fill="#ff6486" stroke="#fff" strokeWidth="1" />
    <text x="64" y="275" fill="#fff" fontSize="9">irisan / DHP</text>
  </>}</GraphFrame>;
}

function SectionHeading({ n, label, title, intro }: { n: string; label: string; title: string; intro: string }) {
  return <div className="mb-5 flex gap-3" data-testid={`section-heading-${n}`}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-200/25 bg-cyan-200/10 font-mono text-xs font-black text-cyan-100">{n}</span><div><p className="text-[10px] font-black uppercase tracking-[.22em] text-cyan-200/70">{label}</p><h2 className="mt-1 font-display text-2xl font-black text-white sm:text-3xl">{title}</h2><p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">{intro}</p></div></div>;
}
function Formula({ children, label }: { children: string; label?: string }) {
  return <div className="overflow-x-auto rounded-xl border border-cyan-100/15 bg-[#071326]/90 px-4 py-3 text-center text-cyan-50" data-testid="lesson-formula">{label && <p className="mb-2 text-left text-[9px] font-black uppercase tracking-[.18em] text-cyan-100/55">{label}</p>}<BlockMath math={children} /></div>;
}
function Note({ title, children }: { title: string; children: ReactNode }) {
  return <aside className="flex gap-3 rounded-2xl border border-amber-200/20 bg-amber-300/[.07] p-4 text-sm leading-relaxed text-amber-50/90" data-testid="lesson-note"><Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" /><p><strong className="text-amber-100">{title}</strong> {children}</p></aside>;
}
function ValueTable({ xs, fn, variable = "x", heading = "Tabel nilai" }: { xs: number[]; fn: (x: number) => number; variable?: "x" | "y"; heading?: string }) {
  return <div className="overflow-x-auto rounded-xl border border-orange-200/20 bg-[#101b2c]/80" data-testid="value-table"><p className="px-3 pt-3 text-[9px] font-black uppercase tracking-[.16em] text-orange-200">{heading}</p><table className="w-full text-center text-xs"><thead><tr className="text-slate-300"><th className="px-2 py-2">{variable}</th><th className="px-2 py-2">{variable === "x" ? "y" : "x"}</th><th className="px-2 py-2">Titik</th></tr></thead><tbody>{xs.map((v) => { const out = fn(v); const a = Number.isInteger(out) ? `${out}` : `${Number(out.toFixed(4))}`; return <tr key={v} className="border-t border-white/[.06] text-white/90"><td className="px-2 py-2">{v}</td><td className="px-2 py-2">{a}</td><td className="px-2 py-2">({variable === "x" ? v : a}, {variable === "x" ? a : v})</td></tr>; })}</tbody></table></div>;
}
function LessonCard({ title, children, testId }: { title: string; children: ReactNode; testId: string }) {
  return <article className="rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(18,43,65,.93),rgba(10,23,40,.96))] p-4 shadow-xl shadow-black/10 sm:p-6" data-testid={testId}><h3 className="mb-3 font-display text-lg font-extrabold text-cyan-50 sm:text-xl">{title}</h3>{children}</article>;
}
const lineItems = [
  { letter: "a", inequality: "y < x + 1", boundary: (x: number) => x + 1, relation: "y = x + 1", test: "(0, 0): 0 < 1 benar; DHP di bawah garis.", dashed: true },
  { letter: "b", inequality: "y ≥ 2x − 3", boundary: (x: number) => 2 * x - 3, relation: "y = 2x − 3", test: "(0, 0): 0 ≥ −3 benar; DHP di atas garis.", dashed: false },
  { letter: "c", inequality: "y > x − 2", boundary: (x: number) => x - 2, relation: "y = x − 2", test: "(0, 0): 0 > −2 benar; DHP di atas garis.", dashed: true },
  { letter: "d", inequality: "y ≥ 2x + 1", boundary: (x: number) => 2 * x + 1, relation: "y = 2x + 1", test: "(0, 0): 0 ≥ 1 salah; pilih sisi berlawanan dari titik uji, yaitu di atas garis.", dashed: false },
];
const quadItems = [
  { letter: "a", inequality: "y ≤ x²", relation: "y = x²", fn: (x: number) => x * x, vertex: "(0, 0), minimum", side: "below" as const, dashed: false, test: "(0, 1): 1 ≤ 0 salah, jadi sisi di bawah kurva.", values: [4, 1, 0, 1, 4] },
  { letter: "b", inequality: "y ≤ −x²", relation: "y = −x²", fn: (x: number) => -x * x, vertex: "(0, 0), maksimum", side: "below" as const, dashed: false, test: "(0, −1): −1 ≤ 0 benar, sisi di bawah kurva.", values: [-4, -1, 0, -1, -4] },
  { letter: "c", inequality: "y ≤ −x² + 2x + 1", relation: "y = −x² + 2x + 1", fn: (x: number) => -x * x + 2 * x + 1, vertex: "(1, 2), maksimum", side: "below" as const, dashed: false, test: "(0, 0): 0 ≤ 1 benar, sisi di bawah kurva.", values: [-7, -2, 1, 2, 1] },
  { letter: "d", inequality: "y > x² + 2x − 3", relation: "y = x² + 2x − 3", fn: (x: number) => x * x + 2 * x - 3, vertex: "(−1, −4), minimum", side: "above" as const, dashed: true, test: "(0, 0): 0 > −3 benar, sisi di atas kurva.", values: [-3, -4, -3, 0, 5] },
];

export default function SmaSptdvPage() {
  const sections = [
    ["linear", "4.2 · Kenali batasnya"], ["line-examples", "Contoh 21 · Garis"], ["quadratic", "4.2.2 · Kurva kuadrat"],
    ["quad-examples", "Contoh 22 · Parabola"], ["mixed-curves", "Contoh 23–24 · Kurva lain"], ["systems", "4.3 · Irisan DHP"],
    ["linear-quadratic", "Contoh 25–26 · Linear-kuadrat"], ["quadratic-quadratic", "Contoh 27 · Kuadrat-kuadrat"],
    ["circles", "Contoh 28 · Lingkaran"], ["ellipse-parabola-line", "Contoh 29 · Tiga batas"],
  ];
  const jumpTo = (id: string) => { playPopSound(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  return <div className="sma-linear-systems-route relative min-h-[100dvh] overflow-hidden bg-[#081321] text-slate-100">
    <Starfield /><PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/sistem-persamaan-dan-pertidaksamaan-linear" />
    <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
      <header className="relative mb-8 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,47,67,.96),rgba(14,27,48,.97)_58%,rgba(67,45,48,.75))] p-5 shadow-2xl shadow-black/25 sm:p-9" data-testid="lesson-hero">
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border border-cyan-100/10" /><div className="pointer-events-none absolute right-2 top-8 h-48 w-48 rounded-full border border-amber-100/10" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_300px]"><div>
          <div className="mb-5 flex flex-wrap gap-2"><span className="rounded-full border border-cyan-100/25 bg-cyan-100/[.08] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.17em] text-cyan-100">Matematika · SMA</span><span className="rounded-full border border-white/10 bg-white/[.05] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.17em] text-slate-300">Buku Animasi · Bab 4</span></div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[.23em] text-amber-200">Garis, kurva, dan daerah yang memenuhi</p>
          <h1 className="max-w-3xl font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="lesson-title">Sistem pertidaksamaan <span className="text-cyan-200">dua variabel</span></h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">Dari satu garis sampai irisan beberapa kurva: kita gambar batasnya, menguji titik, lalu menemukan DHP dengan alasan yang jelas.</p>
          <div className="mt-6 flex items-center gap-2 text-sm text-amber-100"><Sparkles className="h-4 w-4" /><span>Pelan-pelan, teliti, dan tetap berani mencoba.</span></div>
        </div><div className="rounded-3xl border border-cyan-100/15 bg-[#071326]/75 p-5 backdrop-blur-sm" aria-label="Peta ide pertidaksamaan"><div className="mb-4 flex items-center gap-2 text-cyan-100"><Compass className="h-5 w-5" /><span className="text-xs font-black uppercase tracking-[.16em]">Peta ide</span></div><div className="space-y-3"><div className="rounded-xl border border-orange-200/20 bg-orange-200/[.06] p-3"><span className="block text-[9px] font-bold uppercase tracking-widest text-orange-200">BATAS</span><InlineMath math="ax+by=c" /></div><div className="pl-6 text-cyan-100/50"><ArrowDown className="h-4 w-4" /></div><div className="rounded-xl border border-teal-200/20 bg-teal-200/[.06] p-3"><span className="block text-[9px] font-bold uppercase tracking-widest text-teal-200">DAERAH</span><InlineMath math="\text{titik yang memenuhi}" /></div><div className="pl-6 text-cyan-100/50"><ArrowDown className="h-4 w-4" /></div><div className="rounded-xl border border-violet-200/20 bg-violet-200/[.06] p-3"><span className="block text-[9px] font-bold uppercase tracking-widest text-violet-200">SISTEM</span><InlineMath math="\text{irisan semua daerah}" /></div></div></div></div>
      </header>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="min-w-0 space-y-12">
          <section id="linear" data-testid="section-linear">
            <SectionHeading n="01" label="4.2 · Gagasan inti" title="Apa arti pertidaksamaan dua variabel?" intro="Pertidaksamaan dua variabel adalah kalimat matematika yang melibatkan dua peubah, misalnya x dan y. Jawabannya bukan hanya satu pasangan, melainkan sekumpulan pasangan (x, y) yang membuat pernyataannya benar." />
            <div className="grid gap-4 md:grid-cols-2"><LessonCard title="Bentuk linear" testId="linear-forms"><p className="mb-4 text-sm leading-7 text-slate-300">Koefisien dan konstanta berupa bilangan real; x dan y berpangkat satu. Bentuk umumnya:</p><div className="space-y-2"><Formula>ax+by\ge c</Formula><Formula>ax+by\le c</Formula><Formula>ax+by&lt;c</Formula><Formula>ax+by&gt;c</Formula></div></LessonCard>
              <LessonCard title="Garis pembatas dan setengah bidang" testId="boundary-rules"><p className="text-sm leading-7 text-slate-300">Ganti tanda pertidaksamaan dengan tanda sama dengan untuk mendapat garis batas. Garis itu membagi bidang menjadi dua sisi; hanya satu sisinya (atau keduanya pada kasus khusus) yang memenuhi pertidaksamaan.</p><div className="mt-4 space-y-3 text-sm leading-6 text-slate-300"><p><span className="mr-2 inline-block h-0.5 w-8 align-middle bg-orange-300" />Garis penuh: <InlineMath math="\le" /> atau <InlineMath math="\ge" />, karena titik pada garis ikut dihitung.</p><p><span className="mr-2 inline-block h-0.5 w-8 align-middle border-t-2 border-dashed border-orange-300" />Garis putus-putus: <InlineMath math="<" /> atau <InlineMath math=">" />, karena garis batas tidak termasuk.</p></div></LessonCard></div>
            <div className="mt-4 grid gap-4 md:grid-cols-2"><LessonCard title="Ubah agar mudah dibaca" testId="rearrange-inequality"><p className="text-sm leading-7 text-slate-300">Jika koefisien y tidak nol, susun menjadi <InlineMath math="y\ \square\ f(x)" />. Jika koefisien x tidak nol, bisa juga susun menjadi <InlineMath math="x\ \square\ g(y)" />. Saat mengisolasi variabel, tanda pertidaksamaan tetap jika dibagi bilangan positif.</p><Formula>2x+y\ge 4\quad\Longrightarrow\quad y\ge -2x+4</Formula></LessonCard>
              <LessonCard title="Tanda berbalik saat dibagi negatif" testId="negative-flip-rule"><p className="text-sm leading-7 text-slate-300">Mengalikan atau membagi kedua ruas dengan bilangan negatif membalik arah tanda. Contohnya, <InlineMath math="{-2y\le 6}" /> dibagi <InlineMath math="-2" /> menjadi <InlineMath math="y\ge -3" />. Untuk menentukan sisi bidang, uji titik sederhana seperti (0, 0): jika pernyataan benar, pilih sisi yang memuat titik itu; jika salah, pilih sisi seberangnya.</p><Formula>-2y\le 6\quad\Longleftrightarrow\quad y\ge -3</Formula></LessonCard></div>
            <Note title="Kunci grafik:" >tulis garis/kurva batas terlebih dahulu, tentukan penuh atau putus-putus, lalu uji titik. Jangan menebak arah arsiran hanya dari bentuk gambar.</Note>
          </section>

          <section id="line-examples" data-testid="section-example-21">
            <SectionHeading n="02" label="Contoh 21 · Pertidaksamaan linear" title="Empat garis, empat daerah" intro="Untuk setiap pertidaksamaan, tabel memuat x = −2, −1, 0, 1, 2 beserta y pada garis batas. Grafik menunjukkan setengah bidang penyelesaiannya." />
            <div className="space-y-4">{lineItems.map((item) => <LessonCard key={item.letter} title={`Contoh 21${item.letter} · ${item.inequality}`} testId={`example-21-${item.letter}`}>
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]"><div className="space-y-3"><p className="text-sm leading-6 text-slate-300">Persamaan batas: <strong className="text-orange-100"><InlineMath math={item.relation} /></strong>. Garisnya {item.dashed ? "putus-putus (tanda ketat)" : "penuh (garis ikut menjadi solusi)"}.</p>
                <ValueTable xs={[-2,-1,0,1,2]} fn={item.boundary} heading={`Tabel garis ${item.relation}`} />
                <p className="rounded-xl border border-violet-200/15 bg-violet-200/[.05] p-3 text-sm leading-relaxed text-violet-50"><Target className="mr-2 inline h-4 w-4 text-violet-200" />{item.test}</p>
              </div><FunctionGraph title={`Contoh 21${item.letter}: ${item.inequality}`} caption={`Garis batas ${item.relation}; arsiran menunjukkan DHP. ${item.dashed ? "Batas putus-putus tidak termasuk." : "Batas penuh termasuk."}`} fn={item.boundary} side={item.letter === "a" ? "below" : "above"} dashed={item.dashed} testPoint={[0,0]} testId={`graph-21-${item.letter}`} /></div>
            </LessonCard>)}</div>
          </section>

          <section id="quadratic" data-testid="section-quadratic">
            <SectionHeading n="03" label="4.2.2 · Batas kurva" title="Pertidaksamaan kuadrat dua variabel" intro="Pada pertidaksamaan kuadrat dua variabel, batasnya tidak selalu garis lurus. Mengubah tanda pertidaksamaan menjadi sama dengan dapat menghasilkan parabola, lingkaran, elips, atau kurva kuadrat lain." />
            <div className="grid gap-4 md:grid-cols-2"><LessonCard title="Bentuk umum" testId="quadratic-general-form"><p className="mb-3 text-sm leading-6 text-slate-300">Tanda pertidaksamaan bisa berupa empat bentuk berikut:</p><div className="grid gap-2 sm:grid-cols-2"><Formula>a x^2+b y^2+cxy+dx+ey+f\ge0</Formula><Formula>a x^2+b y^2+cxy+dx+ey+f\le0</Formula><Formula>a x^2+b y^2+cxy+dx+ey+f&gt;0</Formula><Formula>a x^2+b y^2+cxy+dx+ey+f&lt;0</Formula></div><p className="mt-3 text-sm leading-7 text-slate-300">Koefisien a, b, c, d, e, f adalah bilangan real. Bentuk dan koefisien menentukan kurva batas setelah ruas pertidaksamaan diganti dengan sama dengan. Contohnya <InlineMath math="y=x^2" /> adalah parabola, <InlineMath math="x^2+y^2=9" /> lingkaran, dan <InlineMath math="9x^2+16y^2=144" /> elips.</p></LessonCard>
              <LessonCard title="Tentukan sisi DHP" testId="quadratic-boundary-rules"><p className="text-sm leading-7 text-slate-300">Gambar kurva batas, lalu substitusikan titik uji yang tidak terletak pada kurva ke pertidaksamaan asal. Jika benar, arsirlah sisi yang memuat titik itu; jika salah, ambil sisi lawannya. Sifat garis batas tetap sama: tanda <InlineMath math="\le,\ge" /> berarti penuh, sedangkan <InlineMath math="<,>" /> berarti putus-putus.</p><p className="mt-3 rounded-xl bg-teal-200/[.07] p-3 text-sm leading-6 text-teal-50">Untuk <InlineMath math="y\le f(x)" />, daerah berada di bawah kurva; untuk <InlineMath math="y\ge f(x)" />, daerah berada di atas kurva. Uji titik membantu memastikan pilihan.</p></LessonCard></div>
          </section>

          <section id="quad-examples" data-testid="section-example-22">
            <SectionHeading n="04" label="Contoh 22 · Kurva parabola" title="Baca puncak, tabel, lalu arsiran" intro="Setiap grafik di bawah memakai x = −2, −1, 0, 1, 2. Nilai tabel adalah nilai y pada parabola pembatas." />
            <div className="space-y-4">{quadItems.map((item) => <LessonCard key={item.letter} title={`Contoh 22${item.letter} · ${item.inequality}`} testId={`example-22-${item.letter}`}>
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]"><div className="space-y-3"><p className="text-sm leading-6 text-slate-300">Kurva batas <InlineMath math={item.relation} />; puncak <strong className="text-orange-100">{item.vertex}</strong>. Batas digambar {item.dashed ? "putus-putus karena tanda > bersifat ketat dan titik pada batas tidak ikut." : "penuh karena tanda ≤ mengikutsertakan titik pada batas."}</p><ValueTable xs={[-2,-1,0,1,2]} fn={(x) => item.fn(x)} heading={`Tabel ${item.relation}`} /><p className="rounded-xl border border-violet-200/15 bg-violet-200/[.05] p-3 text-sm leading-relaxed text-violet-50"><Target className="mr-2 inline h-4 w-4 text-violet-200" />Uji titik: {item.test}</p></div>
                <FunctionGraph title={`Contoh 22${item.letter}: ${item.inequality}`} caption={`Puncak ${item.vertex}. Daerah penyelesaian berada ${item.side === "below" ? "di bawah" : "di atas"} kurva; batas ${item.dashed ? "putus-putus" : "penuh"}.`} fn={item.fn} side={item.side} dashed={item.dashed} testPoint={item.letter === "a" ? [0,1] : item.letter === "b" ? [0,-1] : [0,0]} testId={`graph-22-${item.letter}`} /></div>
            </LessonCard>)}</div>
          </section>

          <section id="mixed-curves" data-testid="section-examples-23-24">
            <SectionHeading n="05" label="Contoh 23–24 · Parabola, lingkaran, elips" title="Batas tidak harus menghadap ke atas" intro="Kita bisa menguji pertidaksamaan yang diisolasi terhadap x, mengenali lingkaran/elips, dan membaca daerah dari faktorisasi." />
            <div className="space-y-4">
              <LessonCard title="Contoh 23a · Parabola menyamping" testId="example-23-a"><div className="grid gap-4 md:grid-cols-[1fr_300px]"><div className="space-y-3"><Formula>x\le -y^2+2y+2=-(y-1)^2+3</Formula><p className="text-sm leading-7 text-slate-300">Ini parabola horizontal dengan puncak <strong className="text-orange-100">(3, 1)</strong> dan membuka ke kiri. Karena x ≤ fungsi y, DHP berada di sebelah kiri kurva. Batasnya penuh.</p><ValueTable variable="y" xs={[-2,-1,0,1,2,3,4]} fn={(y) => -y*y+2*y+2} heading="Tabel x = −y² + 2y + 2" /><p className="text-sm text-violet-100">Uji (0, 0): 0 ≤ 2 benar, jadi sisi kiri kurva.</p></div><SidewaysGraph title="Contoh 23a · batas parabola menyamping" caption="Puncak (3, 1); arsiran di sebelah kiri batas penuh." testId="graph-23-a" /></div></LessonCard>
              <div className="grid gap-4 md:grid-cols-2"><LessonCard title="Contoh 23b · x² + y² ≥ 9" testId="example-23-b"><p className="mb-3 text-sm leading-7 text-slate-300">Batas <InlineMath math="x^2+y^2=9" /> adalah lingkaran berpusat di (0, 0) berjari-jari 3. Titik pusat (0, 0) memberi 0 ≥ 9 yang salah; titik (3, 2) memberi 13 ≥ 9 yang benar. Jadi DHP berada di luar lingkaran dan kelilingnya ikut karena tanda ≥.</p><CircleGraph title="Lingkaran berjari-jari 3" caption="Daerah di luar lingkaran, termasuk keliling; titik uji (3, 2) berada di DHP." radius={3} mode="outside" testPoint={[3,2]} testLabel="uji (3, 2)" testId="graph-23-b" /></LessonCard>
                <LessonCard title="Contoh 23c · 9x² + 16y² < 144" testId="example-23-c"><p className="mb-3 text-sm leading-7 text-slate-300">Batas elips <InlineMath math="9x^2+16y^2=144" />, atau <InlineMath math="\frac{x^2}{16}+\frac{y^2}{9}=1" />, berpusat di (0, 0) dengan semi-sumbu 4 dan 3. Uji (0, 0): 0 &lt; 144 benar. DHP di dalam elips; batas putus-putus.</p><EllipseGraph title="Elips berpusat di titik asal" caption="Bagian dalam elips diarsir; batas putus-putus tidak termasuk." testId="graph-23-c" /></LessonCard></div>
              <LessonCard title="Contoh 23d · Lengkapi kuadrat" testId="example-23-d"><div className="grid gap-4 md:grid-cols-[1fr_300px]"><div className="space-y-3"><Formula>x^2+y^2+2x+4y-4&gt;0</Formula><Formula>(x+1)^2+(y+2)^2&gt;9</Formula><p className="text-sm leading-7 text-slate-300">Batasnya lingkaran berpusat di <InlineMath math="(-1,-2)" /> dengan jari-jari 3. Uji (3, −2): 7 &gt; 0 benar, jadi arsir bagian luar. Garis lingkaran putus-putus karena pertidaksamaannya ketat.</p></div><Example23dGraph /></div></LessonCard>
              <LessonCard title="Contoh 24 · Dua kemungkinan tanda" testId="example-24"><p className="text-sm leading-7 text-slate-300">Pertidaksamaan ini dapat difaktorkan menjadi <InlineMath math="x^2-y^2=(x+y)(x-y)" />. Garis batasnya <InlineMath math="y=x" /> dan <InlineMath math="y=-x" />, keduanya penuh. Hasil kali ≥ 0 ketika kedua faktor bertanda sama: <InlineMath math="x+y\ge0,\ x-y\ge0" /> atau <InlineMath math="x+y\le0,\ x-y\le0" />. Ini menghasilkan dua irisan setengah bidang yang berlawanan (baji kiri dan kanan).</p><div className="my-4 grid gap-4 md:grid-cols-2"><div><p className="mb-2 text-sm font-bold text-cyan-100">a. <InlineMath math="x^2-y^2\ge0" /></p><WedgeGraph lessThan={false} testId="graph-24-a" /></div><div><p className="mb-2 text-sm font-bold text-cyan-100">b. <InlineMath math="x^2-y^2\le0" /></p><WedgeGraph lessThan testId="graph-24-b" /></div></div><p className="text-sm leading-7 text-slate-300">Untuk ≤ 0, faktor berlawanan tanda: <InlineMath math="x+y\ge0,\ x-y\le0" /> atau <InlineMath math="x+y\le0,\ x-y\ge0" />. Daerahnya berupa baji atas dan bawah. Contoh ini juga menunjukkan bahwa bentuk yang sama dapat ditulis sebagai gabungan dari irisan setengah bidang linear.</p></LessonCard>
            </div>
          </section>

          <section id="systems" data-testid="section-systems">
            <SectionHeading n="06" label="4.3 · Beberapa syarat sekaligus" title="Sistem berarti irisan daerah" intro="Sistem pertidaksamaan adalah kumpulan beberapa batasan. Sebuah pasangan (x, y) menjadi solusi jika memenuhi semuanya pada waktu yang sama." />
            <div className="grid gap-4 md:grid-cols-[1fr_320px]"><LessonCard title="Cara membaca DHP sistem" testId="system-definition"><p className="text-sm leading-7 text-slate-300">Gambarkan setiap pertidaksamaan dan tandai daerah penyelesaiannya. DHP sistem adalah <strong className="text-teal-100">irisan atau bagian yang bertumpuk</strong> dari seluruh daerah itu. Bidang yang hanya memenuhi satu pertidaksamaan, tetapi gagal pada syarat lain, bukan solusi sistem.</p><ol className="mt-4 space-y-2 text-sm leading-6 text-slate-300"><li><span className="mr-2 font-mono text-cyan-200">01</span> Gambar setiap batas dan tandai penuh/putus-putus.</li><li><span className="mr-2 font-mono text-cyan-200">02</span> Tentukan sisi yang memenuhi masing-masing syarat.</li><li><span className="mr-2 font-mono text-cyan-200">03</span> Ambil hanya daerah yang lolos semuanya.</li></ol></LessonCard><IntersectionGraph /></div>
          </section>

          <section id="linear-quadratic" data-testid="section-linear-quadratic">
            <SectionHeading n="07" label="4.3.1 · Sistem linear-kuadrat" title="Garis lurus bertemu parabola" intro="Batas sistem ini terdiri dari sebuah garis dan sebuah parabola. Gambar kedua kurva, tentukan titik potong, lalu ambil daerah yang memenuhi keduanya." />
            <div className="mb-4 grid gap-4 md:grid-cols-2"><LessonCard title="Bentuk batas linear-kuadrat" testId="linear-quadratic-boundaries"><p className="text-sm leading-6 text-slate-300">Batas pertama berupa garis lurus, sedangkan batas kedua berupa kurva kuadrat (dalam contoh berikut, parabola).</p><div className="mt-3 space-y-2"><Formula>a_1x+b_1y+c_1=0</Formula><Formula>a_2x^2+b_2y^2+c_2xy+d_2x+e_2y+f_2=0</Formula></div><p className="mt-3 text-xs leading-5 text-slate-300">Ganti tanda sama dengan sesuai pertidaksamaan masing-masing untuk menentukan sisi yang diarsir.</p></LessonCard><LessonCard title="Urutan mencari DHP" testId="linear-quadratic-method"><p className="text-sm leading-7 text-slate-300">Gambar batas garis dan parabola dengan ketebalan sesuai tanda, cari titik perpotongan jika ada, lalu tentukan sisi solusi untuk tiap syarat. Terakhir, ambil daerah yang menjadi irisan keduanya.</p></LessonCard></div>
            <div className="space-y-4">
              <LessonCard title="Contoh 25 · Daerah di antara parabola dan garis" testId="example-25"><div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]"><div className="space-y-3"><Formula>\begin&#123;cases&#125;y\ge x^2\\y&lt;x+2\end&#123;cases&#125;</Formula><p className="text-sm leading-7 text-slate-300">Batas parabola <InlineMath math="y=x^2" /> penuh; batas garis <InlineMath math="y=x+2" /> putus-putus. Cari perpotongannya dengan menyamakan kedua y:</p><Formula>x^2=x+2\quad\Longrightarrow\quad (x-2)(x+1)=0</Formula><p className="text-sm leading-6 text-slate-300">Maka <InlineMath math="x=-1" /> atau <InlineMath math="x=2" />. Titik potongnya <InlineMath math="(-1,1)" /> dan <InlineMath math="(2,4)" />. Di antara akar, parabola ada di bawah garis sehingga DHP terletak di atas parabola dan di bawah garis untuk <InlineMath math="-1&lt;x&lt;2" />.</p><div className="grid gap-3 sm:grid-cols-2"><ValueTable xs={[-2,-1,0,1,2]} fn={(x)=>x*x} heading="Parabola y = x²" /><ValueTable xs={[-2,-1,0,1,2]} fn={(x)=>x+2} heading="Garis y = x + 2" /></div><Note title="Memo membaca arsiran:" >jika y diisolasi, ≥ berarti di atas dan ≤ berarti di bawah. Untuk <InlineMath math="x\le f(y)" />, arsir kiri kurva. Jika sisi masih terasa meragukan, pakai titik uji.</Note></div><SystemGraph title="Contoh 25 · daerah di antara batas" caption="Irisan: di atas parabola y = x² dan di bawah garis putus-putus y = x + 2, untuk −1 < x < 2; kedua titik ujung tidak termasuk." lower={(x)=>x*x} upper={(x)=>x+2} lo={-1} hi={2} openEnds testId="graph-example-25" /></div></LessonCard>
              <LessonCard title="Contoh 26 · Di atas garis dan parabola" testId="example-26"><div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]"><div className="space-y-3"><Formula>\begin&#123;cases&#125;5x+y\ge-6\\y\ge-x^2\end&#123;cases&#125;</Formula><p className="text-sm leading-7 text-slate-300">Susun ulang persamaan garis: <InlineMath math="y\ge-5x-6" />. Batas garis <InlineMath math="y=-5x-6" /> dan parabola <InlineMath math="y=-x^2" /> sama-sama penuh.</p><p className="text-sm leading-6 text-slate-300">Titik potong diperoleh dari <InlineMath math="-5x-6=-x^2" />, sehingga <InlineMath math="x^2-5x-6=0" /> dan <InlineMath math="(x-6)(x+1)=0" />. Jadi x = −1 atau 6, titiknya <InlineMath math="(-1,-1)" /> dan <InlineMath math="(6,-36)" />.</p><div className="grid gap-3 sm:grid-cols-2"><ValueTable xs={[-2,-1,0,1,2,6]} fn={(x)=>-5*x-6} heading="Garis y = −5x − 6" /><ValueTable xs={[-2,-1,0,1,2,6]} fn={(x)=>-x*x} heading="Parabola y = −x²" /></div><p className="text-sm leading-6 text-slate-300">Kedua syarat meminta daerah di atas masing-masing batas, maka pilih bagian di atas keduanya. Sketsa seperti ini kelak membantu menyusun masalah luas daerah dan volume benda putar.</p></div><Example26Graph /></div></LessonCard>
            </div>
          </section>

          <section id="quadratic-quadratic" data-testid="section-quadratic-quadratic">
            <SectionHeading n="08" label="4.3.2 · Sistem kuadrat-kuadrat" title="Dua parabola, satu irisan" intro="Saat kedua batas berupa parabola, cari dahulu titik potongnya. Setelah itu, periksa posisi kurva dan arsirlah hanya rentang yang memenuhi kedua syarat." />
            <div className="mb-4 grid gap-4 md:grid-cols-2"><LessonCard title="Bentuk umum dua batas kuadrat" testId="quadratic-quadratic-boundaries"><p className="text-sm leading-6 text-slate-300">Setiap pertidaksamaan memiliki kurva pembatas sendiri. Bentuk umum kedua batasnya dapat ditulis:</p><div className="mt-3 space-y-2"><Formula>a_1x^2+b_1y^2+c_1xy+d_1x+e_1y+f_1=0</Formula><Formula>a_2x^2+b_2y^2+c_2xy+d_2x+e_2y+f_2=0</Formula></div><p className="mt-3 text-xs leading-5 text-slate-300">Untuk dua parabola, samakan persamaannya guna menemukan titik potong, lalu tentukan irisan daerahnya.</p></LessonCard><LessonCard title="Jangan tertukar dengan irisan kurva" testId="quadratic-quadratic-method"><p className="text-sm leading-7 text-slate-300">Kurva berpotongan membantu membatasi rentang DHP, tetapi daerah solusi tetap ditentukan oleh arah masing-masing tanda pertidaksamaan. Periksa kembali titik uji agar arsiran tidak terbalik.</p></LessonCard></div>
            <LessonCard title="Contoh 27 · Daerah di antara dua parabola" testId="example-27"><div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]"><div className="space-y-3"><Formula>\begin&#123;cases&#125;y\ge x^2+x-2\\y\le-x^2+2x+1\end&#123;cases&#125;</Formula><p className="text-sm leading-7 text-slate-300">Kedua batas berupa parabola penuh. Samakan persamaan:</p><Formula>x^2+x-2=-x^2+2x+1</Formula><Formula>2x^2-x-3=0\quad\Longrightarrow\quad(2x-3)(x+1)=0</Formula><p className="text-sm leading-6 text-slate-300">Maka <InlineMath math="x=-1" /> atau <InlineMath math="x=\frac32" />. Substitusi memberi titik <InlineMath math="(-1,-2)" /> dan <InlineMath math="(\frac32,\frac74)" />. DHP berada di antara kurva pada <InlineMath math="-1\le x\le\frac32" />.</p></div><SystemGraph title="Contoh 27 · ruang di antara parabola" caption="Irisan dari atas parabola bawah y = x² + x − 2 dan bawah parabola atas y = −x² + 2x + 1." lower={(x)=>x*x+x-2} upper={(x)=>-x*x+2*x+1} lo={-1} hi={1.5} testId="graph-example-27" /></div></LessonCard>
          </section>

          <section id="circles" data-testid="section-example-28">
            <SectionHeading n="09" label="Contoh 28 · Sistem lingkaran" title="Cincin di antara dua lingkaran" intro="Dua batas bisa sama-sama berbentuk lingkaran konsentris. Baca radiusnya, lalu satukan syarat interior dan eksterior." />
            <LessonCard title="Contoh 28 · Annulus 1 ≤ x² + y² ≤ 9" testId="example-28"><div className="grid gap-4 md:grid-cols-[1fr_340px]"><div className="space-y-3"><Formula>\begin&#123;cases&#125;x^2+y^2\ge1\\x^2+y^2\le9\end&#123;cases&#125;</Formula><p className="text-sm leading-7 text-slate-300">Lingkaran pertama berpusat di (0, 0), berjari-jari 1. Syarat ≥ 1 memilih luar lingkaran kecil. Lingkaran kedua juga berpusat di (0, 0), berjari-jari 3; syarat ≤ 9 memilih bagian dalam lingkaran besar.</p><p className="rounded-xl border border-teal-200/15 bg-teal-200/[.06] p-3 text-sm leading-6 text-teal-50">Irisannya adalah cincin (annulus): <InlineMath math="1\le x^2+y^2\le9" />. Kedua garis batas penuh, jadi kedua keliling termasuk DHP.</p><p className="text-sm text-slate-300">Uji (0, 0): gagal pada syarat pertama. Uji (2, 0): memenuhi keduanya dan berada tepat pada keliling luar.</p></div><CircleGraph title="Annulus antara radius 1 dan 3" caption="Arsiran mencakup keliling radius 1 dan 3." radius={1} secondRadius={3} mode="ring" testPoint={[2,0]} testLabel="uji (2, 0)" testId="graph-example-28" /></div></LessonCard>
          </section>

          <section id="ellipse-parabola-line" data-testid="section-example-29">
            <SectionHeading n="10" label="Contoh 29 · Elips, parabola, garis" title="Tiga syarat, satu DHP bersama" intro="Contoh terakhir menggabungkan elips putus-putus, parabola penuh, dan garis penuh. Kita mulai dengan menguji titik, lalu ambil irisannya." />
            <LessonCard title="Contoh 29 · Tentukan daerah penyelesaian bersama" testId="example-29"><div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]"><div className="space-y-3"><Formula>\begin&#123;cases&#125;9x^2+16y^2&lt;144\\x^2-y+2x\le3\\y-x\ge0\end&#123;cases&#125;</Formula><p className="text-sm leading-7 text-slate-300"><strong className="text-cyan-100">Batas elips:</strong> <InlineMath math="9x^2+16y^2=144" />, putus-putus. Titik uji (0, 1): <InlineMath math="16&lt;144" /> benar, jadi pilih bagian dalam elips.</p><p className="text-sm leading-7 text-slate-300"><strong className="text-orange-100">Batas parabola:</strong> <InlineMath math="x^2-y+2x=3" />, atau <InlineMath math="y=x^2+2x-3" />, penuh. Pada (0, 1): <InlineMath math="-1\le3" /> benar, jadi pilih sisi yang memuat titik uji; karena y terisolasi, daerahnya di atas parabola.</p><p className="text-sm leading-7 text-slate-300"><strong className="text-violet-100">Batas garis:</strong> <InlineMath math="y-x=0" />, atau <InlineMath math="y=x" />, penuh. Pada (0, 1): <InlineMath math="1\ge0" /> benar, jadi ambil sisi di atas garis.</p><p className="rounded-xl border border-teal-200/20 bg-teal-200/[.07] p-3 text-sm leading-6 text-teal-50">DHP adalah irisan yang berada di dalam elips, sekaligus di atas parabola dan di atas garis <InlineMath math="y=x" />.</p></div><EllipseSystemGraph /></div><div className="mt-4 rounded-2xl border border-amber-200/20 bg-amber-200/[.06] p-4" data-testid="student-challenge"><div className="mb-2 flex items-center gap-2 text-amber-100"><CircleHelp className="h-5 w-5" /><h4 className="font-display font-extrabold">Tantangan siswa</h4></div><p className="text-sm leading-7 text-slate-200">Tentukan titik-titik potong berpasangan dari ketiga kurva pembatas berikut. Catat pasangan mana yang benar-benar berada pada grafik dan bandingkan dengan batas DHP.</p><div className="mt-3 grid gap-2 sm:grid-cols-3"><Formula>9x^2+16y^2=144</Formula><Formula>x^2-y+2x=3</Formula><Formula>y-x=0</Formula></div><p className="mt-3 text-xs leading-5 text-amber-50/70">Petunjuk: untuk parabola dan garis, substitusikan <InlineMath math="y=x" />; untuk elips dan garis, masukkan <InlineMath math="y=x" /> ke elips. Lalu selesaikan parabola dengan elips.</p></div></LessonCard>
          </section>

          <section data-testid="lesson-closing" className="rounded-3xl border border-cyan-100/20 bg-[linear-gradient(125deg,rgba(15,73,85,.32),rgba(36,36,65,.55))] p-5 sm:p-7"><div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-200/10 text-cyan-100"><BookOpen className="h-5 w-5" /></span><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-200">Bekal setelah belajar</p><h2 className="mt-1 font-display text-2xl font-black text-white">Batasnya jelas, DHP-nya ketemu.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">Kenali jenis kurva, bedakan garis penuh dan putus-putus, gunakan titik uji untuk memilih sisi, kemudian ambil irisan semua syarat. Cek kembali hitungan titik potong dan nilai tabelmu—setiap langkah kecil membuat sketsa makin akurat.</p><div className="mt-4 inline-flex items-center gap-2 rounded-full border border-teal-100/20 bg-teal-100/[.07] px-4 py-2 text-sm font-bold text-teal-100"><Sparkles className="h-4 w-4" />Kamu sudah menuntaskan satu peta konsep besar.</div></div></div></section>
        </div>
        <aside className="hidden lg:block"><div className="sticky top-6 rounded-3xl border border-white/10 bg-[#101b2d]/90 p-4 backdrop-blur" data-testid="lesson-toc"><p className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[.17em] text-cyan-100"><Compass className="h-4 w-4" />Peta belajar</p><nav aria-label="Daftar bagian materi" className="space-y-1">{sections.map(([id, label], index) => <button key={id} type="button" onClick={() => jumpTo(id)} data-testid={`jump-${id}`} className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-slate-300 transition hover:bg-cyan-100/[.08] hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200"><span><span className="mr-2 font-mono text-cyan-200/55">{String(index + 1).padStart(2,"0")}</span>{label}</span><ChevronRight className="h-3.5 w-3.5 shrink-0" /></button>)}</nav><div className="mt-4 rounded-2xl border border-orange-200/15 bg-orange-200/[.05] p-3 text-xs leading-5 text-orange-50/80"><ArrowUpRight className="mr-1 inline h-4 w-4 text-orange-200" />Semua sketsa adalah diagram vektor responsif dan dapat dibaca teknologi bantu.</div></div></aside>
      </div>
    </main>
  </div>;
}
