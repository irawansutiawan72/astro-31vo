import type { ReactNode } from "react";
import { ArrowRight, BookOpen, Check, Lightbulb, Sparkles } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

type Series = { name: string; values: number[]; color: string };

const salesMonths = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"];
const sugarSales = [12, 18, 27, 23, 38, 46];
const riverMonths = ["Apr", "Mei", "Jun", "Jul", "Agu", "Sep"];
const riverLevels = [6.8, 6.1, 4.7, 5.9, 3.7, 2.6];
const pendulumLengths = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const pendulumTimes = [0, 0.62, 0.88, 1.08, 1.24, 1.4, 1.54, 1.67, 1.79, 1.9, 2];
const years = ["2021", "2022", "2023", "2024", "2025"];
const brandA = [12, 18, 24, 20, 31];
const brandB = [20, 27, 31, 14, 36];
const brandTotals = brandA.map((value, index) => value + brandB[index]);
const brandAPercent = brandA.map((value, index) => (value / brandTotals[index]) * 100);
const brandBPercent = brandB.map((value, index) => 100 - brandAPercent[index]);

const smallUngroupedData = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 9,
  10, 10, 11, 12, 13, 14, 14, 15, 15, 16,
  17, 18, 19, 20, 21, 22, 24, 25, 27, 28,
];
const smallGroupedBroad = [
  ["0–9", 10],
  ["10–19", 13],
  ["20–29", 7],
] as const;
const smallGroupedNarrow = [
  ["0–4", 4],
  ["5–9", 6],
  ["10–14", 7],
  ["15–19", 6],
  ["20–24", 4],
  ["25–29", 3],
] as const;

const footballHeights = [
  161, 162, 163, 165, 166, 167, 168, 168, 169, 170,
  170, 171, 171, 172, 172, 173, 173, 174, 174, 175,
  176, 176, 177, 177, 178, 178, 179, 180, 181, 182,
];
const heightIntervals = ["160–164", "165–169", "170–174", "175–179", "180–184"];
const heightFrequencies = [3, 6, 10, 8, 3];
const heightCumulativeLess = [0, 3, 9, 19, 27, 30];
const heightCumulativeMore = [30, 27, 21, 11, 3, 0];

const examScores100 = [
  41, 42, 43, 43, 44, 45, 46, 47, 47, 48,
  48, 49, 49, 50, 50, 51, 51, 52, 52, 53,
  53, 53, 54, 54, 54, 55, 55, 55, 55, 56,
  56, 57, 57, 57, 58, 58, 58, 58, 59, 59,
  59, 59, 59, 60, 60, 60, 60, 60, 60, 61,
  61, 61, 62, 62, 62, 63, 63, 63, 63, 64,
  64, 64, 64, 64, 65, 65, 65, 65, 65, 65,
  65, 66, 66, 67, 67, 68, 68, 68, 69, 69,
  69, 69, 70, 70, 70, 70, 70, 71, 72, 72,
  73, 73, 74, 75, 75, 76, 77, 78, 79, 80,
];
const exam100Intervals = ["41–45", "46–50", "51–55", "56–60", "61–65", "66–70", "71–75", "76–80"];
const exam100Frequencies = [6, 9, 14, 20, 22, 16, 8, 5];

const examScores240Intervals = ["0–9", "10–19", "20–29", "30–39", "40–49", "50–59", "60–69", "70–79", "80–89", "90–99"];
const examScores240Frequencies = [6, 14, 20, 30, 42, 48, 38, 24, 12, 6];
const examScores240Cumulative = examScores240Frequencies.reduce<number[]>((totals, value) => {
  totals.push((totals.at(-1) ?? 0) + value);
  return totals;
}, []);

const examScores50 = [
  12, 18, 20, 23, 25, 27, 30, 33,
  42, 44, 45, 47, 48, 50, 51, 53, 54, 55,
  56, 58, 59, 60, 61, 62, 63, 64, 65, 66,
  67, 68, 69, 69, 71, 73, 74, 76, 77, 78,
  79, 80, 81, 82, 83, 84, 86, 88, 91, 94, 97, 100,
];
const unequalClasses = ["0–39", "40–69", "70–89", "90–100"];
const unequalFrequencies = [8, 24, 14, 4];
const unequalWidths = [40, 30, 20, 11];

const formatNumber = (value: number, digits = 0) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits, minimumFractionDigits: digits });

function LineChart({
  labels,
  series,
  maxY,
  yStep,
  yLabel,
  xLabel,
  ariaLabel,
}: {
  labels: string[];
  series: Series[];
  maxY: number;
  yStep: number;
  yLabel: string;
  xLabel: string;
  ariaLabel: string;
}) {
  const left = 62;
  const right = 616;
  const top = 22;
  const bottom = 246;
  const x = (index: number) => left + (labels.length <= 1 ? 0 : (index / (labels.length - 1)) * (right - left));
  const y = (value: number) => bottom - (value / maxY) * (bottom - top);

  return (
    <div className="overflow-x-auto">
    <svg viewBox="0 0 660 320" role="img" aria-label={ariaLabel} className="h-auto min-w-[600px] w-full overflow-visible">
      {Array.from({ length: Math.floor(maxY / yStep) + 1 }, (_, index) => {
        const value = index * yStep;
        return (
          <g key={value}>
            <line x1={left} x2={right} y1={y(value)} y2={y(value)} stroke="#94a3b8" strokeOpacity=".2" />
            <text x={left - 10} y={y(value) + 4} fill="#cbd5e1" fontSize="11" textAnchor="end">{formatNumber(value, yStep < 1 ? 1 : 0)}</text>
          </g>
        );
      })}
      <line x1={left} x2={right} y1={bottom} y2={bottom} stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1={left} x2={left} y1={top} y2={bottom} stroke="#cbd5e1" strokeWidth="1.5" />
      {labels.map((label, index) => (
        <text key={`${label}-${index}`} x={x(index)} y={bottom + 20} fill="#cbd5e1" fontSize="10" textAnchor="middle">{label}</text>
      ))}
      {series.map((item) => {
        const points = item.values.map((value, index) => `${x(index)},${y(value)}`).join(" ");
        return (
          <g key={item.name}>
            <polyline points={points} fill="none" stroke={item.color} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
            {item.values.map((value, index) => (
              <g key={`${item.name}-${index}`}>
                <circle cx={x(index)} cy={y(value)} r="4" fill={item.color} stroke="#0b1424" strokeWidth="1.5" />
                <title>{`${item.name}: ${labelAt(labels[index])}, ${formatNumber(value, 2)}`}</title>
              </g>
            ))}
          </g>
        );
      })}
      <text x={(left + right) / 2} y="300" fill="#e2e8f0" fontSize="12" textAnchor="middle">{xLabel}</text>
      <text x="16" y={(top + bottom) / 2} fill="#e2e8f0" fontSize="12" textAnchor="middle" transform={`rotate(-90 16 ${(top + bottom) / 2})`}>{yLabel}</text>
      {series.length > 1 && series.map((item, index) => (
        <g key={`legend-${item.name}`} transform={`translate(${left + index * 175},276)`}>
          <line x1="0" x2="24" y1="0" y2="0" stroke={item.color} strokeWidth="3" />
          <text x="30" y="4" fill="#e2e8f0" fontSize="11">{item.name}</text>
        </g>
      ))}
    </svg>
    </div>
  );
}

function BarChart({
  labels,
  values,
  maxY,
  yLabel,
  xLabel,
  ariaLabel,
}: {
  labels: string[];
  values: number[];
  maxY: number;
  yLabel: string;
  xLabel: string;
  ariaLabel: string;
}) {
  const left = 62;
  const right = 616;
  const top = 25;
  const bottom = 246;
  const slot = (right - left) / labels.length;
  const barWidth = slot * 0.56;
  const y = (value: number) => bottom - (value / maxY) * (bottom - top);
  const step = maxY <= 30 ? 5 : 10;
  return (
    <div className="overflow-x-auto">
    <svg viewBox="0 0 660 320" role="img" aria-label={ariaLabel} className="h-auto min-w-[600px] w-full">
      {Array.from({ length: Math.floor(maxY / step) + 1 }, (_, index) => {
        const value = index * step;
        return (
          <g key={value}>
            <line x1={left} x2={right} y1={y(value)} y2={y(value)} stroke="#94a3b8" strokeOpacity=".2" />
            <text x={left - 9} y={y(value) + 4} fill="#cbd5e1" fontSize="11" textAnchor="end">{value}</text>
          </g>
        );
      })}
      <line x1={left} x2={right} y1={bottom} y2={bottom} stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1={left} x2={left} y1={top} y2={bottom} stroke="#cbd5e1" strokeWidth="1.5" />
      {values.map((value, index) => {
        const bx = left + index * slot + (slot - barWidth) / 2;
        return (
          <g key={`${labels[index]}-${value}`}>
            <rect x={bx} y={y(value)} width={barWidth} height={bottom - y(value)} rx="3" fill="#fb8b79" fillOpacity=".78" stroke="#ffd0c7" strokeWidth="1" />
            <text x={bx + barWidth / 2} y={y(value) - 7} fill="#fff" fontSize="11" textAnchor="middle">{formatNumber(value)}</text>
            <text x={bx + barWidth / 2} y={bottom + 18} fill="#e2e8f0" fontSize="10" textAnchor="middle">{labels[index]}</text>
          </g>
        );
      })}
      <text x={(left + right) / 2} y="300" fill="#e2e8f0" fontSize="12" textAnchor="middle">{xLabel}</text>
      <text x="16" y={(top + bottom) / 2} fill="#e2e8f0" fontSize="12" textAnchor="middle" transform={`rotate(-90 16 ${(top + bottom) / 2})`}>{yLabel}</text>
    </svg>
    </div>
  );
}

function HorizontalBarChart({ labels, values, maxX }: { labels: string[]; values: number[]; maxX: number }) {
  const left = 130;
  const right = 610;
  const top = 32;
  const rowHeight = 44;
  return (
    <div className="overflow-x-auto">
    <svg viewBox={`0 0 660 ${top + labels.length * rowHeight + 45}`} role="img" aria-label="Diagram batang mendatar jumlah siswa absen pada setiap hari sekolah" className="h-auto min-w-[600px] w-full">
      {labels.map((label, index) => {
        const y = top + index * rowHeight;
        const width = (values[index] / maxX) * (right - left);
        return (
          <g key={label}>
            <text x={left - 12} y={y + 19} fill="#e2e8f0" fontSize="12" textAnchor="end">{label}</text>
            <rect x={left} y={y} width={width} height="26" rx="4" fill="#fb8b79" fillOpacity=".8" />
            <text x={left + width + 8} y={y + 18} fill="#fff" fontSize="11">{values[index]} siswa</text>
          </g>
        );
      })}
      <line x1={left} x2={right} y1={top + labels.length * rowHeight} y2={top + labels.length * rowHeight} stroke="#cbd5e1" />
      <text x={(left + right) / 2} y={top + labels.length * rowHeight + 28} fill="#e2e8f0" fontSize="12" textAnchor="middle">Jumlah siswa</text>
    </svg>
    </div>
  );
}

function ComponentAreaChart({
  labels,
  lower,
  upper,
  maxY,
  percent = false,
}: {
  labels: string[];
  lower: number[];
  upper: number[];
  maxY: number;
  percent?: boolean;
}) {
  const left = 60;
  const right = 615;
  const top = 24;
  const bottom = 246;
  const x = (index: number) => left + (index / (labels.length - 1)) * (right - left);
  const y = (value: number) => bottom - (value / maxY) * (bottom - top);
  const lowPoints = lower.map((value, index) => `${x(index)},${y(value)}`).join(" ");
  const highPoints = upper.map((value, index) => `${x(index)},${y(value)}`).join(" ");
  const lowerArea = `${left},${bottom} ${lowPoints} ${right},${bottom}`;
  const upperArea = `${lowPoints} ${highPoints.split(" ").reverse().join(" ")}`;
  const ticks = percent ? [0, 20, 40, 60, 80, 100] : [0, 20, 40, 60, 80];
  return (
    <div className="overflow-x-auto">
    <svg viewBox="0 0 660 320" role="img" aria-label={percent ? "Diagram garis komponen berganda dalam persentase" : "Diagram garis komponen berganda dengan luas berisi nilai setiap barang"} className="h-auto min-w-[600px] w-full">
      {ticks.filter((tick) => tick <= maxY).map((tick) => (
        <g key={tick}>
          <line x1={left} x2={right} y1={y(tick)} y2={y(tick)} stroke="#94a3b8" strokeOpacity=".2" />
          <text x={left - 9} y={y(tick) + 4} fill="#cbd5e1" fontSize="11" textAnchor="end">{percent ? `${tick}%` : tick}</text>
        </g>
      ))}
      <line x1={left} x2={right} y1={bottom} y2={bottom} stroke="#cbd5e1" strokeWidth="1.5" />
      <polygon points={lowerArea} fill="#fb8b79" fillOpacity=".76" stroke="#ffd0c7" strokeWidth="2" />
      <polygon points={upperArea} fill="#f4c35e" fillOpacity=".76" stroke="#ffe4a7" strokeWidth="2" />
      {labels.map((label, index) => <text key={label} x={x(index)} y={bottom + 18} fill="#e2e8f0" fontSize="10" textAnchor="middle">{label}</text>)}
      <text x={(left + right) / 2} y="300" fill="#e2e8f0" fontSize="12" textAnchor="middle">Tahun</text>
      <text x="15" y="140" fill="#e2e8f0" fontSize="11" textAnchor="middle" transform="rotate(-90 15 140)">{percent ? "Persentase" : "Nilai penjualan (juta rupiah)"}</text>
      <g transform="translate(93,272)"><rect width="16" height="10" fill="#fb8b79" /><text x="22" y="9" fill="#e2e8f0" fontSize="10">Barang A</text></g>
      <g transform="translate(210,272)"><rect width="16" height="10" fill="#f4c35e" /><text x="22" y="9" fill="#e2e8f0" fontSize="10">Barang B</text></g>
    </svg>
    </div>
  );
}

function PieChart({ values, labels, colors }: { values: number[]; labels: string[]; colors: string[] }) {
  const total = values.reduce((sum, value) => sum + value, 0);
  let start = -Math.PI / 2;
  const slices = values.map((value, index) => {
    const angle = (value / total) * Math.PI * 2;
    const end = start + angle;
    const point = (theta: number) => [160 + 112 * Math.cos(theta), 160 + 112 * Math.sin(theta)];
    const [sx, sy] = point(start);
    const [ex, ey] = point(end);
    const largeArc = angle > Math.PI ? 1 : 0;
    const path = `M160,160 L${sx},${sy} A112,112 0 ${largeArc} 1 ${ex},${ey} Z`;
    const mid = start + angle / 2;
    const [tx, ty] = [160 + 73 * Math.cos(mid), 160 + 73 * Math.sin(mid)];
    const percent = (value / total) * 100;
    start = end;
    return { path, color: colors[index], label: labels[index], value, percent, tx, ty };
  });
  return (
    <div className="grid items-center gap-4 md:grid-cols-[minmax(220px,.8fr)_1.2fr]">
      <svg viewBox="0 0 320 320" role="img" aria-label={`Diagram lingkaran komposisi ${labels.map((label, index) => `${label} ${values[index]} orang`).join(", ")}`} className="mx-auto h-auto w-full max-w-xs">
        {slices.map((slice) => (
          <g key={slice.label}>
            <path d={slice.path} fill={slice.color} stroke="#101a2c" strokeWidth="2" />
            <text x={slice.tx} y={slice.ty + 4} textAnchor="middle" fill="#111827" fontSize="12" fontWeight="800">{formatNumber(slice.percent, 1)}%</text>
          </g>
        ))}
      </svg>
      <div className="space-y-2">
        {slices.map((slice) => (
          <div key={slice.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.035] px-3 py-2 text-xs">
            <span className="h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: slice.color }} />
            <span className="flex-1 text-slate-200">{slice.label}</span>
            <span className="text-slate-300">{slice.value} orang</span>
            <span className="w-14 text-right font-bold text-white">{formatNumber(slice.percent, 1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HistogramChart({ labels, values, maxY, yLabel = "Frekuensi" }: { labels: string[]; values: number[]; maxY: number; yLabel?: string }) {
  const left = 60;
  const right = 616;
  const top = 24;
  const bottom = 246;
  const slot = (right - left) / labels.length;
  const y = (value: number) => bottom - (value / maxY) * (bottom - top);
  const step = maxY <= 10 ? 2 : 10;
  return (
    <div className="overflow-x-auto">
    <svg viewBox="0 0 660 320" role="img" aria-label={`Histogram frekuensi menurut interval kelas: ${labels.map((label, index) => `${label}, ${values[index]}`).join("; ")}`} className="h-auto min-w-[600px] w-full">
      {Array.from({ length: Math.floor(maxY / step) + 1 }, (_, index) => {
        const value = index * step;
        return (
          <g key={value}>
            <line x1={left} x2={right} y1={y(value)} y2={y(value)} stroke="#94a3b8" strokeOpacity=".2" />
            <text x={left - 8} y={y(value) + 4} fill="#cbd5e1" fontSize="10" textAnchor="end">{value}</text>
          </g>
        );
      })}
      <line x1={left} x2={right} y1={bottom} y2={bottom} stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1={left} x2={left} y1={top} y2={bottom} stroke="#cbd5e1" strokeWidth="1.5" />
      {values.map((value, index) => (
        <g key={labels[index]}>
          <rect x={left + index * slot} y={y(value)} width={slot} height={bottom - y(value)} fill="#fb8b79" fillOpacity=".78" stroke="#ffe1db" strokeWidth="1.2" />
          <text x={left + (index + 0.5) * slot} y={y(value) - 7} fill="#fff" fontSize="10" textAnchor="middle">{value}</text>
          <text x={left + (index + 0.5) * slot} y={bottom + 17} fill="#e2e8f0" fontSize={labels.length > 8 ? "8" : "9"} textAnchor="middle">{labels[index]}</text>
        </g>
      ))}
      <text x={(left + right) / 2} y="300" fill="#e2e8f0" fontSize="12" textAnchor="middle">Interval kelas</text>
      <text x="15" y="140" fill="#e2e8f0" fontSize="11" textAnchor="middle" transform="rotate(-90 15 140)">{yLabel}</text>
    </svg>
    </div>
  );
}

function PolygonChart({ labels, values, maxY, ariaLabel }: { labels: string[]; values: number[]; maxY: number; ariaLabel: string }) {
  const left = 60;
  const right = 616;
  const top = 24;
  const bottom = 246;
  const x = (index: number) => left + (index / (labels.length - 1)) * (right - left);
  const y = (value: number) => bottom - (value / maxY) * (bottom - top);
  const step = maxY <= 10 ? 2 : 10;
  return (
    <div className="overflow-x-auto">
    <svg viewBox="0 0 660 320" role="img" aria-label={ariaLabel} className="h-auto min-w-[600px] w-full">
      {Array.from({ length: Math.floor(maxY / step) + 1 }, (_, index) => {
        const value = index * step;
        return (
          <g key={value}>
            <line x1={left} x2={right} y1={y(value)} y2={y(value)} stroke="#94a3b8" strokeOpacity=".2" />
            <text x={left - 8} y={y(value) + 4} fill="#cbd5e1" fontSize="10" textAnchor="end">{value}</text>
          </g>
        );
      })}
      <line x1={left} x2={right} y1={bottom} y2={bottom} stroke="#cbd5e1" strokeWidth="1.5" />
      <polyline points={values.map((value, index) => `${x(index)},${y(value)}`).join(" ")} fill="none" stroke="#f5bd59" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      {values.map((value, index) => (
        <g key={`${labels[index]}-${value}`}>
          <circle cx={x(index)} cy={y(value)} r="4" fill="#f5bd59" />
          <text x={x(index)} y={bottom + 18} fill="#e2e8f0" fontSize="9" textAnchor="middle">{labels[index]}</text>
        </g>
      ))}
      <text x={(left + right) / 2} y="300" fill="#e2e8f0" fontSize="12" textAnchor="middle">Batas kelas</text>
      <text x="15" y="140" fill="#e2e8f0" fontSize="11" textAnchor="middle" transform="rotate(-90 15 140)">Frekuensi kumulatif</text>
    </svg>
    </div>
  );
}

function UnequalHistogram() {
  const left = 72;
  const right = 610;
  const top = 28;
  const bottom = 250;
  const maxX = 101;
  const maxY = 1;
  const x = (value: number) => left + (value / maxX) * (right - left);
  const y = (value: number) => bottom - (value / maxY) * (bottom - top);
  const boundaries = [0, 40, 70, 90, 101];
  const densities = unequalFrequencies.map((frequency, index) => frequency / unequalWidths[index]);
  const labels = ["Tidak lulus", "Lulus", "Pujian", "Cemerlang"];
  return (
    <div className="overflow-x-auto">
    <svg viewBox="0 0 660 325" role="img" aria-label="Histogram kelas tidak sama lebar dengan tinggi frekuensi dibagi lebar kelas" className="h-auto min-w-[600px] w-full">
      {[0, 0.2, 0.4, 0.6, 0.8, 1].map((tick) => (
        <g key={tick}>
          <line x1={left} x2={right} y1={y(tick)} y2={y(tick)} stroke="#94a3b8" strokeOpacity=".2" />
          <text x={left - 9} y={y(tick) + 4} fill="#cbd5e1" fontSize="10" textAnchor="end">{formatNumber(tick, 1)}</text>
        </g>
      ))}
      {densities.map((density, index) => {
        const x1 = x(boundaries[index]);
        const x2 = x(boundaries[index + 1]);
        return (
          <g key={labels[index]}>
            <rect x={x1} y={y(density)} width={x2 - x1} height={bottom - y(density)} fill="#fb8b79" fillOpacity=".8" stroke="#ffe1db" strokeWidth="1.4" />
            <text x={(x1 + x2) / 2} y={y(density) - 7} fill="#fff" fontSize="10" textAnchor="middle">{formatNumber(density, 2)}</text>
            <text x={(x1 + x2) / 2} y={y(density) + 17} fill="#101827" fontSize="9" fontWeight="700" textAnchor="middle">{labels[index]}</text>
          </g>
        );
      })}
      <line x1={left} x2={right} y1={bottom} y2={bottom} stroke="#cbd5e1" strokeWidth="1.5" />
      {[0, 20, 40, 60, 80, 100].map((tick) => <text key={tick} x={x(tick)} y={bottom + 18} fill="#e2e8f0" fontSize="10" textAnchor="middle">{tick}</text>)}
      <text x={(left + right) / 2} y="307" fill="#e2e8f0" fontSize="12" textAnchor="middle">Nilai ujian</text>
      <text x="14" y="140" fill="#e2e8f0" fontSize="10" textAnchor="middle" transform="rotate(-90 14 140)">Tinggi diagram = frekuensi ÷ lebar kelas</text>
    </svg>
    </div>
  );
}

function DataTable({ headers, rows, caption }: { headers: ReactNode[]; rows: ReactNode[][]; caption?: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-max border-collapse text-left text-xs sm:text-sm">
        {caption && <caption className="px-3 py-2 text-left font-bold text-cyan-100">{caption}</caption>}
        <thead>
          <tr className="bg-cyan-300/[.1] text-cyan-50">
            {headers.map((header, index) => <th key={index} scope="col" className="border-b border-white/10 px-3 py-2 font-bold">{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white/[.035]" : "bg-white/[.015]"}>
              {row.map((cell, cellIndex) => <td key={cellIndex} className="border-b border-white/[.06] px-3 py-2 text-slate-200">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionHeading({ number, title, intro }: { number: string; title: string; intro: string }) {
  return (
    <div className="mb-5 flex gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-display text-xs font-black text-cyan-100">{number}</span>
      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-slate-300">{intro}</p>
      </div>
    </div>
  );
}

function Example({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-orange-200/20 bg-[linear-gradient(140deg,rgba(106,45,35,.16),rgba(14,25,42,.92)_48%)]" data-testid={`example-${number}`}>
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-300/15 text-orange-200"><BookOpen className="h-4 w-4" aria-hidden="true" /></span>
        <div><p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">Contoh {number}</p><h3 className="font-display text-base font-bold text-white sm:text-lg">{title}</h3></div>
      </div>
      <div className="space-y-4 p-4 sm:p-5">{children}</div>
    </article>
  );
}

function StemLeafTable({ stems, leftLeaves, rightLeaves }: { stems: number[]; leftLeaves?: number[][]; rightLeaves: number[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full border-collapse text-center font-mono text-xs sm:text-sm">
        <thead><tr className="bg-cyan-300/[.1] text-cyan-50"><th className="px-3 py-2 text-right">Daun kiri</th><th className="border-x border-white/15 px-3 py-2">Batang</th><th className="px-3 py-2 text-left">Daun kanan</th></tr></thead>
        <tbody>
          {stems.map((stem, index) => (
            <tr key={stem} className="border-t border-white/[.06]">
              <td className="px-3 py-2 text-right text-slate-200">{leftLeaves ? [...leftLeaves[index]].reverse().join(" ") : ""}</td>
              <th scope="row" className="border-x border-white/15 px-3 py-2 text-amber-200">{stem}</th>
              <td className="px-3 py-2 text-left text-slate-200">{rightLeaves[index].join(" ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-white/10 px-3 py-2 text-xs text-slate-400">Kunci: <span className="font-mono text-slate-200">2 | 4 = 24</span>. Untuk diagram dua kelompok, daun di kiri dibaca dari batang ke arah kiri.</p>
    </div>
  );
}

function labelAt(label: string) {
  return label;
}

const indexItems = [
  ["Diagram garis", "diagram-garis"],
  ["Grafik garis berganda", "grafik-berganda"],
  ["Diagram batang", "diagram-batang"],
  ["Diagram lingkaran", "diagram-lingkaran"],
  ["Diagram batang-daun", "diagram-batang-daun"],
  ["Distribusi frekuensi", "distribusi-frekuensi"],
  ["Frekuensi relatif dan kumulatif", "frekuensi-relatif-kumulatif"],
  ["Histogram, poligon, dan ogive", "histogram-poligon-ogive"],
  ["Kelas dengan lebar berbeda", "lebar-kelas-berbeda"],
];

const SmaStatistikaPenyajianDataPage = () => (
  <div className="animation-submaterial-route sma-statistika-route relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
    <Starfield />
    <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/statistika" />
    <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
      <header className="relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.96),rgba(16,22,43,.95)_60%,rgba(75,36,43,.76))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10" data-testid="lesson-hero">
        <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-cyan-100/10" />
        <div className="relative max-w-4xl">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Ruang untuk Guru · SMA</span>
            <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">Buku Animasi Matematika SMA · Statistika</span>
          </div>
          <div className="mb-3 flex items-center gap-2 text-amber-200"><Sparkles className="h-4 w-4" aria-hidden="true" /><p className="font-body text-xs font-bold uppercase tracking-[.24em]">Data jadi cerita yang mudah dibaca!</p></div>
          <h1 className="font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="lesson-title">Penyajian <span className="text-cyan-200">Data</span></h1>
          <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">Yuk, belajar memilih cara yang pas untuk menampilkan data: lewat garis, batang, lingkaran, batang-daun, sampai histogram dan ogive. Kita akan membaca data, menyusun tabel, menggambar grafik, dan menafsirkan hasilnya bersama-sama.</p>
          <div className="mt-6 flex items-start gap-2 text-sm text-amber-100"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><span>Tujuan belajar: kenali bentuk penyajian data, buat diagram yang tepat, lalu gunakan diagram itu untuk menjawab pertanyaan.</span></div>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="min-w-0 space-y-12">
          <section id="diagram-garis" data-testid="section-line-graph">
            <SectionHeading number="2.1.1" title="Diagram garis" intro="Diagram garis cocok untuk melihat perubahan yang berlangsung berurutan atau terus-menerus. Kita sering memakainya untuk perkembangan jumlah penduduk, suhu, curah hujan, penjualan, dan tinggi permukaan air." />
            <div className="mb-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4 text-sm leading-relaxed text-slate-300"><strong className="text-cyan-100">Sumbu X</strong> biasanya menunjukkan waktu atau urutan pengamatan, misalnya bulan dan tahun.</div>
              <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4 text-sm leading-relaxed text-slate-300"><strong className="text-violet-100">Sumbu Y</strong> menunjukkan nilai atau frekuensi yang sedang diamati. Titik-titiknya kemudian dihubungkan sesuai urutan.</div>
            </div>
            <div className="space-y-5">
              <Example number={1} title="Penjualan gula pasir per bulan">
                <p className="text-sm leading-relaxed text-slate-300">Distributor Seroja mencatat penjualan gula pasir selama Januari–Juni 2025. Data berikut disajikan dalam ton. Bagaimana perubahan penjualannya dari bulan ke bulan?</p>
                <DataTable headers={["Bulan", ...salesMonths]} rows={[["Penjualan (ton)", ...sugarSales]]} />
                <LineChart labels={salesMonths} series={[{ name: "Penjualan gula", values: sugarSales, color: "#fb8b79" }]} maxY={50} yStep={10} yLabel="Penjualan (ton)" xLabel="Bulan" ariaLabel="Grafik garis penjualan gula dari Januari sampai Juni" />
                <p className="rounded-xl border border-emerald-200/15 bg-emerald-200/[.05] p-3 text-sm leading-relaxed text-emerald-50"><Check className="mr-2 inline h-4 w-4" />Garis membantu kita melihat bahwa penjualan secara umum naik, meskipun sempat turun dari Maret ke April.</p>
              </Example>
              <Example number={2} title="Perubahan tinggi air sungai">
                <p className="text-sm leading-relaxed text-slate-300">Petugas mengukur tinggi permukaan air Sungai Cimanuk setelah hujan deras. Angka berikut adalah tinggi air dalam meter dari April sampai September. Buat grafik garisnya, lalu ceritakan pola yang terlihat.</p>
                <DataTable headers={["Bulan", ...riverMonths]} rows={[["Tinggi air (m)", ...riverLevels.map((value) => formatNumber(value, 1))]]} />
                <LineChart labels={riverMonths} series={[{ name: "Tinggi air", values: riverLevels, color: "#66d9e8" }]} maxY={8} yStep={2} yLabel="Tinggi air (m)" xLabel="Bulan" ariaLabel="Grafik garis tinggi permukaan Sungai Cimanuk dari April sampai September" />
                <p className="text-sm leading-relaxed text-slate-300">Perhatikan arah garis antartitik, ya. Tinggi air sempat naik lagi pada Juli, tetapi secara keseluruhan turun sampai September.</p>
              </Example>
              <Example number={3} title="Panjang bandul dan waktu ayun">
                <p className="text-sm leading-relaxed text-slate-300">Waktu satu getaran lengkap sebuah bandul berubah sesuai panjangnya. Catatan percobaan menunjukkan data berikut.</p>
                <DataTable headers={["Panjang bandul (cm)", ...pendulumLengths.map(String)]} rows={[["Waktu (detik)", ...pendulumTimes.map((value) => formatNumber(value, 2))]]} />
                <ol className="list-inside list-[lower-alpha] space-y-1 text-sm leading-relaxed text-slate-300">
                  <li>Tampilkan data itu dalam grafik sebagai fungsi panjang bandul.</li>
                  <li>Perkirakan waktu ayun saat panjang bandul 45 cm.</li>
                </ol>
                <LineChart labels={pendulumLengths.map(String)} series={[{ name: "Waktu ayun", values: pendulumTimes, color: "#c4b5fd" }]} maxY={2} yStep={0.5} yLabel="Waktu (detik)" xLabel="Panjang bandul (cm)" ariaLabel="Grafik hubungan panjang bandul dengan waktu satu getaran" />
                <p className="rounded-xl border border-amber-200/15 bg-amber-200/[.05] p-3 text-sm leading-relaxed text-amber-50"><strong>Taksiran:</strong> 45 cm berada tepat di antara 40 cm (1,24 detik) dan 50 cm (1,40 detik), jadi waktu ayunnya kira-kira <strong>1,32 detik</strong>.</p>
              </Example>
            </div>
          </section>

          <section id="grafik-berganda" data-testid="section-multiple-line-graphs">
            <SectionHeading number="2.1.1" title="Grafik garis berganda dan komponen berganda" intro="Jika kita ingin membandingkan beberapa kelompok atau beberapa kejadian sekaligus, satu grafik bisa memuat lebih dari satu garis. Untuk data komponen, tinggi keseluruhan juga dapat memperlihatkan jumlah semua bagian." />
            <div className="space-y-5">
              <Example number={4} title="Membandingkan penjualan dua merek">
                <p className="text-sm leading-relaxed text-slate-300">Toko Harapan Siswa mencatat penjualan barang A dan barang B dalam juta rupiah selama 2021–2025. Grafik garis berganda membuat gerak kedua barang mudah dibandingkan.</p>
                <DataTable headers={["Barang", ...years, "Jumlah"]} rows={[
                  ["A (juta rupiah)", ...brandA, ...[brandTotals.reduce((sum, value) => sum + value, 0) - brandB.reduce((sum, value) => sum + value, 0)]],
                  ["B (juta rupiah)", ...brandB, ...[brandB.reduce((sum, value) => sum + value, 0)]],
                  ["Total per tahun", ...brandTotals, brandTotals.reduce((sum, value) => sum + value, 0)],
                ]} />
                <LineChart labels={years} series={[
                  { name: "Barang A", values: brandA, color: "#fb8b79" },
                  { name: "Barang B", values: brandB, color: "#66d9e8" },
                ]} maxY={40} yStep={10} yLabel="Penjualan (juta rupiah)" xLabel="Tahun" ariaLabel="Grafik garis berganda membandingkan penjualan barang A dan B" />
                <p className="text-sm leading-relaxed text-slate-300">Setiap garis mewakili satu barang. Dengan begitu, kita bisa melihat kapan penjualan masing-masing naik, turun, atau saling berdekatan.</p>
              </Example>
              <Example number={5} title="Menyajikan bagian dan persentase tiap komponen">
                <p className="text-sm leading-relaxed text-slate-300">Data penjualan yang sama juga bisa disajikan sebagai grafik garis komponen berganda. Jarak antargaris menunjukkan nilai tiap komponen, sedangkan garis teratas menunjukkan totalnya.</p>
                <ComponentAreaChart labels={years} lower={brandA} upper={brandTotals} maxY={80} />
                <p className="text-sm leading-relaxed text-slate-300">Grafik ini menumpuk nilai barang B di atas barang A; karena itu tinggi totalnya sama dengan jumlah penjualan kedua barang.</p>
                <p className="text-sm leading-relaxed text-slate-300">Kalau yang ingin dibandingkan adalah bagian masing-masing terhadap total, gunakan grafik komponen persentase berganda. Setiap tahun jumlah persentasenya selalu 100%.</p>
                <DataTable headers={["Bagian penjualan", ...years]} rows={[
                  ["Barang A", ...brandAPercent.map((value) => `${formatNumber(value, 2)}%`)],
                  ["Barang B", ...brandBPercent.map((value) => `${formatNumber(value, 2)}%`)],
                  ["Jumlah", ...years.map(() => "100%")],
                ]} />
                <ComponentAreaChart labels={years} lower={brandAPercent} upper={years.map(() => 100)} maxY={100} percent />
                <p className="text-sm leading-relaxed text-slate-300">Contoh: pada 2024, barang A menyumbang 20 dari total 34 juta rupiah, atau sekitar 58,82%; barang B menyumbang sekitar 41,18%. Dua bagian itu tepat membentuk 100%.</p>
              </Example>
            </div>
          </section>

          <section id="diagram-batang" data-testid="section-bar-graphs">
            <SectionHeading number="2.1.2" title="Diagram batang" intro="Diagram batang menyajikan nilai memakai batang-batang yang arahnya bisa vertikal ataupun horizontal. Panjang atau tinggi batang sebanding dengan nilai datanya; batang dengan nilai lebih besar tampak lebih panjang atau tinggi." />
            <Example number={6} title="Membaca dan membuat diagram batang">
              <p className="text-sm leading-relaxed text-slate-300">Tabel pertama menunjukkan jumlah korban kecelakaan di Kabupaten Wiyurejo dari 2020 sampai 2024. Yuk, sajikan data tahunan ini dalam diagram batang vertikal.</p>
              <DataTable headers={["Tahun", "2020", "2021", "2022", "2023", "2024"]} rows={[["Korban (orang)", 8, 17, 12, 23, 19]]} />
              <BarChart labels={["2020", "2021", "2022", "2023", "2024"]} values={[8, 17, 12, 23, 19]} maxY={30} yLabel="Korban (orang)" xLabel="Tahun" ariaLabel="Diagram batang vertikal jumlah korban kecelakaan per tahun" />
              <p className="text-sm leading-relaxed text-slate-300">Data kedua mencatat siswa yang tidak hadir di sekolah pada tiap hari belajar dalam satu pekan. Kali ini, tampilkan datanya dengan diagram batang mendatar.</p>
              <DataTable headers={["Hari", "Senin", "Selasa", "Rabu", "Kamis", "Jumat"]} rows={[["Siswa tidak hadir (orang)", 11, 7, 13, 8, 5]]} />
              <HorizontalBarChart labels={["Senin", "Selasa", "Rabu", "Kamis", "Jumat"]} values={[11, 7, 13, 8, 5]} maxX={15} />
              <p className="rounded-xl border border-violet-200/15 bg-violet-200/[.05] p-3 text-sm leading-relaxed text-violet-50">Keduanya diagram batang. Perbedaannya hanya arah batang: contoh pertama tegak, contoh kedua mendatar.</p>
            </Example>
          </section>

          <section id="diagram-lingkaran" data-testid="section-pie-chart">
            <SectionHeading number="2.1.3" title="Diagram lingkaran" intro="Diagram lingkaran membagi sebuah lingkaran menjadi juring-juring. Besar juring menggambarkan bagian setiap kategori dari keseluruhan data, jadi diagram ini pas untuk membandingkan komposisi." />
            <div className="mb-5 rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4 text-sm leading-relaxed text-slate-300">
              <p>Keliling penuh lingkaran mewakili seluruh data: <strong className="text-cyan-100">100% atau 360°</strong>. Gunakan rumus berikut untuk menentukan besar setiap juring:</p>
              <p className="mt-3 rounded-xl bg-[#071326]/80 p-3 text-center font-mono text-cyan-100">persentase = (frekuensi ÷ jumlah seluruh data) × 100%<br />sudut pusat = (frekuensi ÷ jumlah seluruh data) × 360°</p>
            </div>
            <Example number={7} title="Pilihan olahraga di klub sekolah">
              <p className="text-sm leading-relaxed text-slate-300">Anggota klub olahraga SMA Pelita memilih lima kegiatan. Dari data ini, kita hitung persentase dan sudut pusat sebelum menggambar diagram lingkaran.</p>
              <DataTable headers={["Jenis olahraga", "Jumlah anggota", "Persentase", "Sudut pusat"]} rows={[
                ["Sepak bola", 40, "26,67%", "96°"],
                ["Bola basket", 35, "23,33%", "84°"],
                ["Bola voli", 25, "16,67%", "60°"],
                ["Bulu tangkis", 20, "13,33%", "48°"],
                ["Tenis meja", 30, "20%", "72°"],
                ["Jumlah", 150, "100%", "360°"],
              ]} />
              <p className="text-sm leading-relaxed text-slate-300">Sebagai contoh, bagian sepak bola adalah 40 ÷ 150 × 100% = 26,67%. Sudutnya 40 ÷ 150 × 360° = 96°. Ulangi cara yang sama untuk kategori lainnya.</p>
              <PieChart values={[40, 35, 25, 20, 30]} labels={["Sepak bola", "Bola basket", "Bola voli", "Bulu tangkis", "Tenis meja"]} colors={["#fb8b79", "#f5bd59", "#66d9e8", "#a78bfa", "#86d39a"]} />
            </Example>
          </section>

          <section id="diagram-batang-daun" data-testid="section-stem-and-leaf">
            <SectionHeading number="2.1.4" title="Diagram batang-daun" intro="Diagram batang-daun (stem-and-leaf plot) menata data angka ke dalam kelompok batang dan daun. Bentuknya ringkas, tetapi nilai-nilai awal tetap bisa dibaca kembali dari diagram." />
            <div className="mb-5 rounded-2xl border border-amber-200/15 bg-amber-200/[.05] p-4 text-sm leading-relaxed text-slate-300"><strong className="text-amber-100">Cara membacanya:</strong> untuk bilangan dua digit, angka puluhan menjadi batang dan angka satuan menjadi daun. Daun di setiap baris diurutkan dari kecil ke besar.</div>
            <div className="space-y-5">
              <Example number={8} title="Menyusun diagram batang-daun untuk dua kelompok">
                <p className="text-sm leading-relaxed text-slate-300">Berikut dua kelompok skor kuis. Buat diagram batang-daun secara terpisah, lalu bandingkan sebaran skornya.</p>
                <DataTable headers={["Kelompok A", "Kelompok B"]} rows={[
                  ["12, 14, 16, 18, 19, 20, 21, 23, 25", "11, 15, 17, 19, 22, 24, 26, 29, 32"],
                  ["28, 31, 34, 37, 42, 44, 45, 50, 53", "35, 38, 41, 43, 47, 51, 55, 58, 62"],
                ]} />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2"><h4 className="font-display font-bold text-cyan-100">Kelompok A</h4><StemLeafTable stems={[1, 2, 3, 4, 5]} rightLeaves={[[2, 4, 6, 8, 9], [0, 1, 3, 5, 8], [1, 4, 7], [2, 4, 5], [0, 3]]} /></div>
                  <div className="space-y-2"><h4 className="font-display font-bold text-violet-100">Kelompok B</h4><StemLeafTable stems={[1, 2, 3, 4, 5, 6]} rightLeaves={[[1, 5, 7, 9], [2, 4, 6, 9], [2, 5, 8], [1, 3, 7], [1, 5, 8], [2]]} /></div>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">Pada kelompok A, baris <span className="font-mono text-cyan-100">2 | 0 1 3 5 8</span> berarti 20, 21, 23, 25, dan 28. Diagram tidak menghilangkan skor aslinya.</p>
              </Example>
              <Example number={9} title="Menggabungkan dua kelompok dengan batang bersama">
                <p className="text-sm leading-relaxed text-slate-300">Sekarang bandingkan dua daftar skor kecil berikut menggunakan diagram batang-daun berpasangan (back-to-back stem-and-leaf plot).</p>
                <DataTable headers={["Kelompok A", "Kelompok B"]} rows={[["13, 18, 22, 29, 34, 37, 41", "16, 24, 28, 32, 39, 45, 53"]]} />
                <StemLeafTable stems={[1, 2, 3, 4, 5]} leftLeaves={[[3, 8], [2, 9], [4, 7], [1], []]} rightLeaves={[[6], [4, 8], [2, 9], [5], [3]]} />
                <p className="text-sm leading-relaxed text-slate-300">Batangnya dipakai bersama, tetapi daun kelompok A berada di kiri dan daun kelompok B di kanan. Dari satu tampilan, kita bisa membandingkan skor di kedua kelompok.</p>
              </Example>
            </div>
          </section>

          <section id="distribusi-frekuensi" data-testid="section-frequency-distribution">
            <SectionHeading number="2.2" title="Distribusi frekuensi" intro="Ketika data angka cukup banyak, daftar mentah bisa terasa sulit dibaca. Distribusi frekuensi merapikan data ke dalam kelompok-kelompok sehingga jumlah data pada tiap kelompok terlihat jelas." />
            <div className="mb-5 rounded-2xl border border-white/10 bg-white/[.035] p-4">
              <h3 className="font-display text-lg font-bold text-white">Satu data, dua pilihan interval</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">Berikut 30 hasil pengamatan. Kita bisa mengelompokkannya ke interval lebar 10 atau interval lebar 5. Kedua tabel tetap memuat data yang sama; tingkat kerinciannya saja yang berbeda.</p>
              <p className="mt-3 rounded-xl bg-[#071326]/80 p-3 text-sm leading-7 text-cyan-50">{smallUngroupedData.join(", ")}</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <DataTable caption="Interval lebar 10" headers={["Interval", "Frekuensi"]} rows={smallGroupedBroad.map(([range, count]) => [range, count])} />
                <DataTable caption="Interval lebar 5" headers={["Interval", "Frekuensi"]} rows={smallGroupedNarrow.map(([range, count]) => [range, count])} />
              </div>
            </div>

            <div className="mb-5 rounded-2xl border border-violet-200/15 bg-violet-200/[.045] p-4">
              <h3 className="font-display text-lg font-bold text-violet-100">Langkah memilih interval kelas</h3>
              <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-relaxed text-slate-300">
                <li>Temukan data terkecil <span className="font-mono text-white">x<sub>min</sub></span> dan data terbesar <span className="font-mono text-white">x<sub>max</sub></span>. Jangkauan atau <em>range</em> adalah <span className="font-mono text-cyan-100">R = x<sub>max</sub> − x<sub>min</sub></span>.</li>
                <li>Tentukan banyak kelas <span className="font-mono text-white">k</span>. Salah satu aturan yang bisa dipakai ialah aturan Sturges: <span className="font-mono text-cyan-100">k = 1 + 3,3 log<sub>10</sub>(n)</span>, dengan <span className="font-mono">n</span> banyak data.</li>
                <li>Perkirakan lebar kelas dengan <span className="font-mono text-cyan-100">c = R ÷ k</span>, lalu bulatkan ke bilangan yang praktis supaya semua data tercakup.</li>
                <li>Susun kelas berurutan. Untuk data bilangan bulat, kelas 10–14 memiliki batas nyata 9,5 sampai 14,5; kelas berikutnya 15–19 memiliki batas nyata 14,5 sampai 19,5.</li>
                <li>Lebar kelas adalah selisih batas nyata atas dan batas nyata bawah. Contoh: <span className="font-mono text-cyan-100">14,5 − 9,5 = 5</span>.</li>
                <li>Titik tengah kelas diperoleh dari rata-rata kedua batas nyatanya. Untuk kelas 15–19: <span className="font-mono text-cyan-100">(14,5 + 19,5) ÷ 2 = 17</span>.</li>
              </ol>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">Batas bawah dan batas atas menyatakan nilai terkecil dan terbesar yang ditulis pada kelas. Batas nyata dipakai supaya kelas bersebelahan tersambung tanpa celah.</p>
            </div>

            <div className="space-y-5">
              <Example number={10} title="Menyusun distribusi frekuensi tinggi pemain sepak bola">
                <p className="text-sm leading-relaxed text-slate-300">Tinggi 30 pemain Erlangga Football Club, dalam sentimeter, dicatat seperti berikut. Susun tabel distribusi frekuensi dengan interval 160–164, 165–169, dan seterusnya.</p>
                <div className="grid gap-2 rounded-xl border border-white/10 bg-[#071326]/65 p-3 sm:grid-cols-3">
                  {[0, 10, 20].map((start) => <p key={start} className="text-xs leading-6 text-slate-200">{footballHeights.slice(start, start + 10).join(", ")}</p>)}
                </div>
                <DataTable headers={["Tinggi (cm)", "Batas nyata", "Titik tengah", "Frekuensi"]} rows={[
                  ["160–164", "159,5–164,5", 162, 3],
                  ["165–169", "164,5–169,5", 167, 6],
                  ["170–174", "169,5–174,5", 172, 10],
                  ["175–179", "174,5–179,5", 177, 8],
                  ["180–184", "179,5–184,5", 182, 3],
                  ["Jumlah", "—", "—", 30],
                ]} />
                <p className="text-sm leading-relaxed text-slate-300">Sebagai contoh, ada 10 pemain dengan tinggi 170–174 cm. Lebar setiap kelas sama, yaitu 5 cm.</p>
              </Example>
              <Example number={11} title="Mengelompokkan nilai ulangan 100 siswa">
                <p className="text-sm leading-relaxed text-slate-300">Tabel berikut memuat nilai ulangan statistika 100 siswa kelas XII. Data terendah adalah 41 dan tertinggi 80. Buat distribusi frekuensi dengan lebar kelas 5, lalu lengkapi turusnya.</p>
                <DataTable caption="Nilai mentah (100 siswa)" headers={Array.from({ length: 10 }, (_, index) => `Data ${index + 1}`)} rows={Array.from({ length: 10 }, (_, row) => examScores100.slice(row * 10, row * 10 + 10))} />
                <p className="text-sm leading-relaxed text-slate-300">Cek banyak kelas dan lebar kelas: <span className="font-mono text-cyan-100">k = 1 + 3,3 log<sub>10</sub>(100) = 7,6</span>, jadi kita gunakan 8 kelas. Jangkauannya <span className="font-mono text-cyan-100">80 − 41 = 39</span>, sehingga <span className="font-mono text-cyan-100">c = 39 ÷ 8 ≈ 4,875</span>. Lebar 5 memudahkan penyusunan kelas 41–45 sampai 76–80.</p>
                <DataTable headers={["Nilai", "Turus", "Frekuensi"]} rows={exam100Intervals.map((interval, index) => [
                  interval,
                  "●".repeat(exam100Frequencies[index]),
                  exam100Frequencies[index],
                ]).concat([["Jumlah", "—", 100]])} />
                <p className="text-xs leading-relaxed text-slate-400">Setiap titik pada kolom turus mewakili satu siswa; titik-titik dihimpun agar frekuensinya mudah dihitung.</p>
              </Example>
            </div>
          </section>

          <section id="frekuensi-relatif-kumulatif" data-testid="section-relative-cumulative-frequency">
            <SectionHeading number="2.2.1" title="Frekuensi relatif dan frekuensi kumulatif" intro="Untuk membandingkan kelas sebagai bagian dari keseluruhan, kita bisa memakai frekuensi relatif. Untuk mengetahui banyaknya data sampai atau mulai dari nilai tertentu, kita gunakan frekuensi kumulatif." />
            <div className="mb-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4">
                <h3 className="font-display text-lg font-bold text-cyan-100">Frekuensi relatif</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">Frekuensi relatif menyatakan bagian suatu kelas dibandingkan dengan jumlah seluruh data.</p>
                <p className="mt-3 rounded-xl bg-[#071326]/80 p-3 text-center font-mono text-cyan-100">frekuensi relatif = (frekuensi kelas ÷ jumlah data) × 100%</p>
              </div>
              <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4">
                <h3 className="font-display text-lg font-bold text-violet-100">Frekuensi kumulatif</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">Frekuensi kumulatif menjumlahkan frekuensi kelas secara berurutan. Bentuknya bisa kumulatif “kurang dari” atau “lebih dari”.</p>
                <p className="mt-3 rounded-xl bg-[#071326]/80 p-3 text-center font-mono text-violet-100">frekuensi kumulatif = jumlah frekuensi kelas yang digabungkan</p>
              </div>
            </div>
            <div className="space-y-5">
              <Example number={12} title="Mengubah frekuensi menjadi persentase">
                <p className="text-sm leading-relaxed text-slate-300">Gunakan data tinggi pemain pada Contoh 10. Jumlah pemainnya 30 orang. Hitung persentase pemain di setiap interval.</p>
                <DataTable headers={["Tinggi (cm)", "Frekuensi", "Perhitungan frekuensi relatif", "Frekuensi relatif"]} rows={heightIntervals.map((interval, index) => [
                  interval,
                  heightFrequencies[index],
                  `${heightFrequencies[index]} ÷ 30 × 100%`,
                  `${formatNumber((heightFrequencies[index] / 30) * 100, 2)}%`,
                ]).concat([["Jumlah", 30, "—", "100%"]])} />
                <p className="text-sm leading-relaxed text-slate-300">Contohnya, frekuensi relatif pemain setinggi 165–169 cm adalah 6 ÷ 30 × 100% = 20%. Jika semua kelas dijumlahkan, persentasenya menjadi 100%.</p>
              </Example>
              <Example number={13} title="Membaca frekuensi kumulatif kurang dari dan lebih dari">
                <p className="text-sm leading-relaxed text-slate-300">Dengan data tinggi pemain yang sama, kita dapat menjawab pertanyaan seperti “berapa pemain yang tingginya kurang dari 175 cm?” atau “berapa pemain yang tingginya lebih dari 169,5 cm?”.</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <DataTable caption="Kumulatif kurang dari" headers={["Tinggi (cm)", "Frekuensi kumulatif"]} rows={[
                    ["Kurang dari 159,5", 0], ["Kurang dari 164,5", 3], ["Kurang dari 169,5", 9], ["Kurang dari 174,5", 19], ["Kurang dari 179,5", 27], ["Kurang dari 184,5", 30],
                  ]} />
                  <DataTable caption="Kumulatif lebih dari" headers={["Tinggi (cm)", "Frekuensi kumulatif"]} rows={[
                    ["Lebih dari 159,5", 30], ["Lebih dari 164,5", 27], ["Lebih dari 169,5", 21], ["Lebih dari 174,5", 11], ["Lebih dari 179,5", 3], ["Lebih dari 184,5", 0],
                  ]} />
                </div>
                <div className="space-y-2 text-sm leading-relaxed text-slate-300">
                  <p><strong className="text-cyan-100">Kelas interval:</strong> misalnya 165–169.</p>
                  <p><strong className="text-cyan-100">Batas bawah dan batas atas kelas:</strong> nilai terkecil dan terbesar pada kelas, misalnya 165 dan 169.</p>
                  <p><strong className="text-cyan-100">Batas nyata:</strong> batas sambung untuk data bilangan bulat, misalnya 164,5 dan 169,5. Nilai 169,5 menjadi batas atas kelas 165–169 sekaligus batas bawah kelas 170–174.</p>
                  <p><strong className="text-cyan-100">Titik tengah:</strong> rata-rata batas nyata, misalnya (164,5 + 169,5) ÷ 2 = 167.</p>
                  <p><strong className="text-cyan-100">Lebar kelas:</strong> selisih batas nyata, yaitu 169,5 − 164,5 = 5.</p>
                </div>
                <p className="rounded-xl border border-amber-200/15 bg-amber-200/[.05] p-3 text-sm leading-relaxed text-amber-50">Frekuensi kumulatif kurang dari 174,5 adalah 19 orang. Artinya, ada 19 pemain yang tingginya kurang dari 174,5 cm.</p>
              </Example>
            </div>
          </section>

          <section id="histogram-poligon-ogive" data-testid="section-histogram-polygon-ogive">
            <SectionHeading number="2.2.2" title="Histogram, poligon frekuensi, dan ogive" intro="Histogram menampilkan distribusi frekuensi sebagai batang-batang yang saling berdempetan. Dari histogram, kita dapat membentuk poligon frekuensi atau poligon frekuensi kumulatif untuk membaca pola data dengan cara berbeda." />
            <div className="mb-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-orange-200/15 bg-orange-200/[.045] p-4"><h3 className="font-display font-bold text-orange-100">Histogram</h3><p className="mt-2 text-xs leading-relaxed text-slate-300">Batang menempel karena kelas-kelas data bersambung. Sumbu mendatar menunjukkan interval kelas dan sumbu tegak menunjukkan frekuensi.</p></div>
              <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.045] p-4"><h3 className="font-display font-bold text-cyan-100">Poligon frekuensi</h3><p className="mt-2 text-xs leading-relaxed text-slate-300">Hubungkan titik tengah sisi atas batang histogram. Bentuk garisnya memperlihatkan perubahan frekuensi antarkelas.</p></div>
              <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.045] p-4"><h3 className="font-display font-bold text-violet-100">Ogive</h3><p className="mt-2 text-xs leading-relaxed text-slate-300">Hubungkan titik-titik frekuensi kumulatif. “Kurang dari” membentuk ogive positif yang naik; “lebih dari” membentuk ogive negatif yang turun.</p></div>
            </div>
            <div className="space-y-5">
              <Example number={14} title="Membuat histogram dan poligon dari tinggi pemain">
                <p className="text-sm leading-relaxed text-slate-300">Perhatikan kembali tabel tinggi pemain pada Contoh 10. Semua intervalnya memiliki lebar yang sama, yaitu 5 cm. Karena itu, tinggi setiap batang dapat langsung menunjukkan frekuensinya.</p>
                <DataTable headers={["Interval kelas (cm)", ...heightIntervals]} rows={[["Frekuensi", ...heightFrequencies]]} />
                <HistogramChart labels={heightIntervals} values={heightFrequencies} maxY={10} />
                <p className="text-sm leading-relaxed text-slate-300">Untuk memperoleh poligon frekuensi, tandai titik tengah setiap kelas pada tinggi batangnya, kemudian hubungkan titik-titik itu dengan ruas garis.</p>
                <DataTable headers={["Interval kelas", ...heightIntervals]} rows={[
                  ["Titik tengah", 162, 167, 172, 177, 182],
                  ["Frekuensi", ...heightFrequencies],
                ]} />
                <LineChart labels={["162", "167", "172", "177", "182"]} series={[{ name: "Frekuensi", values: heightFrequencies, color: "#f5bd59" }]} maxY={10} yStep={2} yLabel="Frekuensi" xLabel="Titik tengah kelas (cm)" ariaLabel="Poligon frekuensi tinggi pemain sepak bola" />
              </Example>
              <Example number={15} title="Menggunakan ogive untuk membaca nilai ujian">
                <p className="text-sm leading-relaxed text-slate-300">Nilai ujian matematika 240 siswa dikelompokkan dalam tabel berikut. Hitung frekuensi kumulatif dan persentase kumulatif kurang dari, lalu gunakan ogive untuk memperkirakan persentase siswa yang belum mencapai nilai kelulusan.</p>
                <DataTable headers={["Nilai", "Frekuensi", "Kumulatif kurang dari", "Persen kumulatif"]} rows={examScores240Intervals.map((interval, index) => [
                  interval,
                  examScores240Frequencies[index],
                  examScores240Cumulative[index],
                  `${formatNumber((examScores240Cumulative[index] / 240) * 100, 1)}%`,
                ]).concat([["Jumlah", 240, 240, "100%"]])} />
                <p className="text-sm leading-relaxed text-slate-300">Untuk menggambar ogive kurang dari, pasangkan setiap frekuensi kumulatif dengan batas nyata atas kelasnya, mulai dari titik awal (−0,5; 0). Untuk ogive lebih dari, gunakan batas nyata bawah dan jumlah yang masih berada di atas batas tersebut.</p>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-[#101b2d]/75 p-3"><h4 className="mb-2 font-display font-bold text-cyan-100">Ogive positif · kurang dari</h4><PolygonChart labels={["−0,5", "9,5", "19,5", "29,5", "39,5", "49,5", "59,5", "69,5", "79,5", "89,5", "99,5"]} values={[0, ...examScores240Cumulative]} maxY={240} ariaLabel="Ogive positif frekuensi kumulatif kurang dari untuk nilai ujian" /></div>
                  <div className="rounded-2xl border border-white/10 bg-[#101b2d]/75 p-3"><h4 className="mb-2 font-display font-bold text-violet-100">Ogive negatif · lebih dari</h4><PolygonChart labels={["−0,5", "9,5", "19,5", "29,5", "39,5", "49,5", "59,5", "69,5", "79,5", "89,5", "99,5"]} values={[240, 234, 220, 200, 170, 128, 80, 42, 18, 6, 0]} maxY={240} ariaLabel="Ogive negatif frekuensi kumulatif lebih dari untuk nilai ujian" /></div>
                </div>
                <ol className="list-inside list-[lower-alpha] space-y-2 text-sm leading-relaxed text-slate-300">
                  <li>Jika nilai lulus minimal 45, batas itu berada di tengah interval 40–49. Ogive kurang dari memperkirakan sekitar 93 siswa (kira-kira 39% dari 240 siswa) memperoleh nilai di bawah 45, sehingga sekitar 39% belum lulus.</li>
                  <li>Jika nilai lulus minimal 60, frekuensi kumulatif sampai batas 59,5 adalah 160 siswa. Jadi sekitar 160 ÷ 240 × 100% = 66,7% belum lulus; sekitar 33,3% memperoleh nilai 60 atau lebih.</li>
                </ol>
                <p className="text-sm leading-relaxed text-slate-300">Ogive juga membantu menjawab pertanyaan lain, misalnya perkiraan berapa persen siswa memperoleh nilai di bawah 51 atau berapa persen yang mencapai sekurang-kurangnya nilai 70. Tarik garis dari nilai pada sumbu mendatar ke kurva, kemudian baca persentase atau banyaknya siswa pada sumbu tegak.</p>
              </Example>
            </div>
          </section>

          <section id="lebar-kelas-berbeda" data-testid="section-unequal-interval-histogram">
            <SectionHeading number="2.2.3" title="Histogram dengan lebar interval kelas tidak sama" intro="Kalau lebar kelas berbeda-beda, tinggi batang tidak boleh langsung disamakan dengan frekuensinya. Kita menyesuaikan tinggi agar luas setiap batang tetap sebanding dengan frekuensi kelas." />
            <Example number={16} title="Menyajikan 50 nilai dengan interval berbeda lebar">
              <p className="text-sm leading-relaxed text-slate-300">Berikut nilai ujian statistika 50 siswa. Sajikan dalam interval 0–39, 40–69, 70–89, dan 90–100. Tandai pula kelompok tidak lulus, lulus, pujian, dan cemerlang.</p>
              <DataTable caption="Nilai ujian 50 siswa" headers={Array.from({ length: 10 }, (_, index) => `Data ${index + 1}`)} rows={Array.from({ length: 5 }, (_, row) => examScores50.slice(row * 10, row * 10 + 10))} />
              <p className="text-sm leading-relaxed text-slate-300">Setelah menghitung frekuensi tiap kelompok, kita memperoleh tabel ini.</p>
              <DataTable headers={["Keterangan", "Interval nilai", "Lebar kelas", "Frekuensi"]} rows={[
                ["Tidak lulus", "0–39", 40, 8],
                ["Lulus", "40–69", 30, 24],
                ["Pujian", "70–89", 20, 14],
                ["Cemerlang", "90–100", 11, 4],
                ["Jumlah", "—", "—", 50],
              ]} />
              <p className="text-sm leading-relaxed text-slate-300">Untuk memastikan lebar kelasnya, kita dapat memakai batas nyata: −0,5–39,5 lebarnya 40; 39,5–69,5 lebarnya 30; 69,5–89,5 lebarnya 20; dan 89,5–100,5 lebarnya 11.</p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4">
                  <h4 className="font-display font-bold text-cyan-100">Jika semua interval sama lebar</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Luas batang sebanding dengan frekuensi, dan karena lebarnya sama, tinggi batang juga sebanding dengan frekuensi.</p>
                </div>
                <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4">
                  <h4 className="font-display font-bold text-violet-100">Jika interval berbeda lebar</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Gunakan tinggi diagram batang = frekuensi ÷ lebar kelas. Dengan begitu, luas setiap batang tetap mewakili frekuensi kelasnya.</p>
                </div>
              </div>
              <DataTable headers={["Keterangan", "Frekuensi", "Lebar kelas", "Tinggi batang (f ÷ c)"]} rows={[
                ["Tidak lulus", 8, 40, "8 ÷ 40 = 0,2"],
                ["Lulus", 24, 30, "24 ÷ 30 = 0,8"],
                ["Pujian", 14, 20, "14 ÷ 20 = 0,7"],
                ["Cemerlang", 4, 11, "4 ÷ 11 ≈ 0,364"],
              ]} />
              <UnequalHistogram />
              <p className="rounded-xl border border-amber-200/15 bg-amber-200/[.05] p-3 text-sm leading-relaxed text-amber-50">Ingat: lebar batang mengikuti lebar interval sebenarnya. Batang “Tidak lulus” lebih lebar karena intervalnya 40 nilai; batang “Cemerlang” lebih sempit karena intervalnya hanya 11 nilai.</p>
            </Example>
          </section>
        </div>

        <aside className="hidden lg:block" aria-label="Daftar bagian materi">
          <div className="sticky top-6 rounded-2xl border border-white/10 bg-[#0d1728]/90 p-4 backdrop-blur" data-testid="lesson-outline">
            <p className="mb-4 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-400">Peta materi</p>
            <ol className="space-y-3 font-body text-xs text-slate-300">
              {indexItems.map(([label, target], index) => (
                <li key={target}><a href={`#${target}`} className="flex items-center gap-2 rounded-md transition-colors hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"><span className="grid h-5 w-5 place-items-center rounded-md bg-white/[.06] text-[10px] font-bold text-cyan-100/80">{String(index + 1).padStart(2, "0")}</span>{label}</a></li>
              ))}
            </ol>
            <div className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-400"><span className="mb-2 flex items-center gap-2 font-bold text-amber-100"><ArrowRight className="h-3.5 w-3.5" />Tips memilih diagram</span>Garis untuk perubahan berurutan; batang untuk membandingkan kategori; lingkaran untuk melihat bagian dari keseluruhan; histogram untuk data numerik berinterval.</div>
          </div>
        </aside>
      </div>
    </main>
  </div>
);

export default SmaStatistikaPenyajianDataPage;
