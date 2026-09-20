import { useMemo, useState, type ReactNode } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleDot,
  Lightbulb,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { BlockMath, InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

type Tone = "cyan" | "emerald" | "amber" | "violet" | "rose" | "blue";

const toneClasses: Record<Tone, string> = {
  cyan: "border-cyan-300/35 bg-cyan-400/10",
  emerald: "border-emerald-300/35 bg-emerald-400/10",
  amber: "border-amber-300/35 bg-amber-400/10",
  violet: "border-violet-300/35 bg-violet-400/10",
  rose: "border-rose-300/35 bg-rose-400/10",
  blue: "border-blue-300/35 bg-blue-400/10",
};

const InlineMath = ({ math }: { math: string }) => <KaTeXInlineMath math={math} />;

const Formula = ({ children, tone = "cyan" }: { children: string; tone?: Tone }) => (
  <div className={`my-3 overflow-x-auto rounded-xl border px-4 py-3 text-center text-cyan-100 ${toneClasses[tone]}`}>
    <BlockMath math={children} />
  </div>
);

const ColorCard = ({
  tone = "cyan",
  children,
  className = "",
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) => (
  <div className={`rounded-2xl border p-4 shadow-lg shadow-black/10 ${toneClasses[tone]} ${className}`}>
    {children}
  </div>
);

const Accordion = ({
  id,
  title,
  eyebrow,
  icon,
  tone,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  eyebrow: string;
  icon: ReactNode;
  tone: Tone;
  open: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
}) => (
  <section className={`overflow-hidden rounded-3xl border shadow-xl shadow-black/15 ${toneClasses[tone]}`}>
    <button
      type="button"
      onClick={() => onToggle(id)}
      aria-expanded={open}
      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-white/[0.04]"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="shrink-0 rounded-xl bg-white/10 p-2 text-white">{icon}</span>
        <span>
          <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.2em] text-white/45">{eyebrow}</span>
          <span className="font-display text-base font-bold text-white md:text-lg">{title}</span>
        </span>
      </span>
      {open ? <ChevronUp className="h-5 w-5 shrink-0 text-white/70" /> : <ChevronDown className="h-5 w-5 shrink-0 text-white/70" />}
    </button>
    {open && <div className="space-y-4 px-5 pb-6">{children}</div>}
  </section>
);

const ChainIllustration = () => (
  <div className="overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/40 p-3">
    <svg viewBox="0 0 720 220" role="img" aria-label="Ilustrasi pertumbuhan rantai perbuatan baik" className="h-auto w-full">
      <defs>
        <linearGradient id="chainLine" x1="0" x2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>
        <filter id="chainGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d="M92 112 C155 30 220 194 286 112 S418 30 482 112 S610 194 660 112" fill="none" stroke="#22d3ee" strokeOpacity=".18" strokeWidth="18" />
      <path d="M92 112 C155 30 220 194 286 112 S418 30 482 112 S610 194 660 112" fill="none" stroke="url(#chainLine)" strokeWidth="3" strokeDasharray="8 8" />
      {[
        { x: 92, y: 112, label: "1", week: "Minggu 0", color: "#67e8f9" },
        { x: 220, y: 58, label: "2", week: "Minggu 1", color: "#a7f3d0" },
        { x: 350, y: 112, label: "4", week: "Minggu 2", color: "#fde68a" },
        { x: 482, y: 58, label: "8", week: "Minggu 3", color: "#fdba74" },
        { x: 660, y: 112, label: "2ⁿ", week: "Minggu n", color: "#f9a8d4" },
      ].map((node) => (
        <g key={node.week} filter="url(#chainGlow)">
          <circle cx={node.x} cy={node.y} r="28" fill="#07152d" stroke={node.color} strokeWidth="3" />
          <text x={node.x} y={node.y + 8} textAnchor="middle" fill={node.color} fontSize="24" fontWeight="800">{node.label}</text>
          <text x={node.x} y={node.y + 51} textAnchor="middle" fill="#e2e8f0" fontSize="12">{node.week}</text>
        </g>
      ))}
    </svg>
  </div>
);

const BounceIllustration = () => (
  <div className="overflow-hidden rounded-2xl border border-amber-300/20 bg-gradient-to-b from-indigo-950/70 to-slate-950/60 p-3">
    <svg viewBox="0 0 540 235" role="img" aria-label="Ilustrasi tinggi pantulan bola yang menyusut" className="h-auto w-full">
      <defs>
        <linearGradient id="bounceSky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#312e81" stopOpacity=".8" />
          <stop offset="100%" stopColor="#020617" stopOpacity=".2" />
        </linearGradient>
        <radialGradient id="ballGlow">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="70%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#ea580c" />
        </radialGradient>
      </defs>
      <rect width="540" height="235" rx="16" fill="url(#bounceSky)" />
      <path d="M44 196 H500" stroke="#fbbf24" strokeOpacity=".55" strokeWidth="3" />
      <path d="M82 44 V196 M202 92 V196 M322 126 V196 M442 151 V196" stroke="#f8fafc" strokeOpacity=".13" strokeDasharray="4 5" />
      <path d="M82 61 Q140 180 202 110 Q260 174 322 143 Q382 183 442 162" fill="none" stroke="#fb923c" strokeWidth="3" strokeDasharray="7 5" />
      {[{ x: 82, y: 52, r: 14, label: "8 m", step: "t = 0" }, { x: 202, y: 102, r: 11, label: "4 m", step: "pantulan 1" }, { x: 322, y: 136, r: 9, label: "2 m", step: "pantulan 2" }, { x: 442, y: 153, r: 7, label: "2(½)ˣ", step: "pantulan x" }].map((ball) => (
        <g key={ball.step}>
          <circle cx={ball.x} cy={ball.y} r={ball.r + 8} fill="#fb923c" fillOpacity=".12" />
          <circle cx={ball.x} cy={ball.y} r={ball.r} fill="url(#ballGlow)" stroke="#fef3c7" strokeWidth="2" />
          <text x={ball.x} y="218" textAnchor="middle" fill="#fef3c7" fontSize="11">{ball.label}</text>
          <text x={ball.x} y="31" textAnchor="middle" fill="#cbd5e1" fontSize="10">{ball.step}</text>
        </g>
      ))}
    </svg>
  </div>
);

const ExponentialGraph = ({ base }: { base: number }) => {
  const points = useMemo(() => {
    const xMin = -3;
    const xMax = 3;
    const width = 520;
    const height = 270;
    const plotLeft = 48;
    const plotTop = 20;
    const plotWidth = 444;
    const plotHeight = 208;
    return Array.from({ length: 61 }, (_, index) => {
      const x = xMin + ((xMax - xMin) * index) / 60;
      const value = Math.pow(base, x);
      const svgX = plotLeft + ((x - xMin) / (xMax - xMin)) * plotWidth;
      const svgY = plotTop + plotHeight - Math.min(value, 8) / 8 * plotHeight;
      return `${svgX.toFixed(1)},${svgY.toFixed(1)}`;
    }).join(" ");
  }, [base]);

  return (
    <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/50 p-3">
      <svg viewBox="0 0 520 270" role="img" aria-label={`Grafik fungsi y = ${base.toFixed(1)} pangkat x`} className="h-auto w-full">
        <defs>
          <linearGradient id="curveGradient" x1="0" x2="1">
            <stop offset="0%" stopColor={base > 1 ? "#67e8f9" : "#f9a8d4"} />
            <stop offset="100%" stopColor={base > 1 ? "#facc15" : "#a78bfa"} />
          </linearGradient>
          <filter id="curveGlow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <rect width="520" height="270" rx="14" fill="#020617" fillOpacity=".45" />
        {[0, 2, 4, 6, 8].map((tick) => {
          const y = 20 + 208 - (tick / 8) * 208;
          return <g key={tick}><line x1="48" x2="492" y1={y} y2={y} stroke="#94a3b8" strokeOpacity=".12" /><text x="39" y={y + 4} textAnchor="end" fill="#94a3b8" fontSize="10">{tick}</text></g>;
        })}
        {[-3, -2, -1, 0, 1, 2, 3].map((tick) => {
          const x = 48 + ((tick + 3) / 6) * 444;
          return <g key={tick}><line x1={x} x2={x} y1="20" y2="228" stroke="#94a3b8" strokeOpacity=".1" /><text x={x} y="246" textAnchor="middle" fill="#94a3b8" fontSize="10">{tick}</text></g>;
        })}
        <line x1="48" x2="492" y1="228" y2="228" stroke="#cbd5e1" strokeOpacity=".55" />
        <line x1="270" x2="270" y1="20" y2="228" stroke="#cbd5e1" strokeOpacity=".55" />
        <line x1="48" x2="492" y1="228" y2="228" stroke="#facc15" strokeOpacity=".2" strokeWidth="3" />
        <polyline points={points} fill="none" stroke="url(#curveGradient)" strokeWidth="4" strokeLinecap="round" filter="url(#curveGlow)" />
        <circle cx="270" cy="202" r="5" fill="#fef08a" />
        <text x="280" y="198" fill="#fef08a" fontSize="11">(0, 1)</text>
        <text x="487" y="263" textAnchor="end" fill="#cbd5e1" fontSize="11">x</text>
        <text x="28" y="27" fill="#cbd5e1" fontSize="11">y</text>
      </svg>
      <div className={`mt-2 rounded-xl px-3 py-2 text-center font-display text-sm font-bold ${base > 1 ? "bg-cyan-300/10 text-cyan-100" : "bg-pink-300/10 text-pink-100"}`}>
        <InlineMath math={`y = ${base.toFixed(1)}^x`} /> · {base > 1 ? "kurva naik" : "kurva turun"}
      </div>
    </div>
  );
};

const ChallengeCard = ({
  number,
  tone,
  question,
  answer,
}: {
  number: string;
  tone: Tone;
  question: ReactNode;
  answer: ReactNode;
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className={`rounded-2xl border p-4 ${toneClasses[tone]}`}>
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">Tantangan {number}</span>
      </div>
      <div className="min-h-16 rounded-xl bg-slate-950/45 p-3 font-body text-sm leading-relaxed text-white">{question}</div>
      <button
        type="button"
        onClick={() => { playPopSound(); setShowAnswer((value) => !value); }}
        className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 font-body text-xs font-bold text-white transition hover:border-white/35 hover:bg-white/15"
      >
        {showAnswer ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        {showAnswer ? "Sembunyikan pembahasan" : "Lihat pembahasan"}
      </button>
      {showAnswer && <div className="mt-3 border-l-2 border-white/25 pl-3 font-body text-sm leading-relaxed text-white/80">{answer}</div>}
    </div>
  );
};

const SmaFungsiEksponenPage = () => {
  const allSections = ["phenomena", "definition", "graph", "growth", "decay", "practice"];
  const [expanded, setExpanded] = useState<string[]>(["phenomena", "definition", "graph"]);
  const [base, setBase] = useState(2);

  const toggle = (id: string) => {
    setExpanded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const toggleAll = () => {
    setExpanded((current) => current.length === allSections.length ? [] : allSections);
  };

  return (
    <div className="relative min-h-screen overflow-hidden gradient-space text-white">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/fungsi-eksponen" />

      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 pt-12 md:px-6">
        <header className="relative mb-8 overflow-hidden rounded-[2rem] border border-cyan-300/25 bg-gradient-to-br from-cyan-950/90 via-indigo-950/80 to-fuchsia-950/70 p-6 shadow-[0_0_60px_rgba(34,211,238,0.14)] md:p-10">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.15fr_.85fr]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/35 bg-cyan-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100">
                <BookOpen className="h-4 w-4" />
                Buku Animasi Matematika SMA
              </div>
              <p className="mb-2 font-body text-xs font-bold uppercase tracking-[0.22em] text-cyan-200/70">Bab · Fungsi dan Pemodelan</p>
              <h1 className="font-display text-3xl font-black leading-tight text-white md:text-5xl">
                Fungsi <span className="text-cyan-300 text-glow-cyan">Eksponen</span>
              </h1>
              <p className="mt-4 max-w-2xl font-body text-sm leading-7 text-white/75 md:text-base">
                Membaca perubahan yang berlipat ganda: dari rantai perbuatan baik, pantulan bola, bunga majemuk, hingga peluruhan radioaktif.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 font-body text-xs text-white/70">
                {["Konsep inti", "Visualisasi kurva", "Contoh kontekstual", "Latihan reflektif"].map((label) => (
                  <span key={label} className="rounded-full border border-white/15 bg-white/10 px-3 py-2">{label}</span>
                ))}
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <svg viewBox="0 0 330 220" role="img" aria-label="Ilustrasi kurva fungsi eksponen yang tumbuh" className="w-full">
                <defs>
                  <linearGradient id="heroCurve" x1="0" x2="1">
                    <stop offset="0%" stopColor="#67e8f9" />
                    <stop offset="100%" stopColor="#f9a8d4" />
                  </linearGradient>
                  <filter id="heroGlow"><feGaussianBlur stdDeviation="6" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>
                <path d="M25 190 H305 M45 205 V25" stroke="#e0f2fe" strokeOpacity=".3" />
                <path d="M48 183 C92 179 122 171 149 151 C180 128 203 98 220 67 C235 40 254 25 298 14" fill="none" stroke="#67e8f9" strokeOpacity=".15" strokeWidth="20" />
                <path d="M48 183 C92 179 122 171 149 151 C180 128 203 98 220 67 C235 40 254 25 298 14" fill="none" stroke="url(#heroCurve)" strokeWidth="5" filter="url(#heroGlow)" />
                <circle cx="149" cy="151" r="6" fill="#fde68a" />
                <circle cx="220" cy="67" r="6" fill="#f9a8d4" />
                <text x="164" y="147" fill="#fef3c7" fontSize="12">berlipat</text>
                <text x="270" y="207" fill="#bae6fd" fontSize="12">waktu</text>
                <text x="24" y="29" fill="#bae6fd" fontSize="12">nilai</text>
              </svg>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-xl border border-white/15 bg-slate-950/50 px-4 py-2 font-display text-sm font-bold text-cyan-100 backdrop-blur">
                <InlineMath math="f(x)=b\cdot a^x" />
              </div>
            </div>
          </div>
        </header>

        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-body text-xs text-white/50">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            Materi visual · siap dipakai mengajar
          </div>
          <button type="button" onClick={toggleAll} className="rounded-full border border-white/15 bg-white/5 px-3 py-2 font-body text-xs text-white/70 transition hover:border-cyan-300/50 hover:text-cyan-100">
            {expanded.length === allSections.length ? "Tutup semua" : "Buka semua"}
          </button>
        </div>

        <div className="space-y-4">
          <Accordion id="phenomena" title="Saat perubahan kecil menjadi besar" eyebrow="Fenomena pembuka · amati polanya" icon={<Sparkles className="h-5 w-5" />} tone="amber" open={expanded.includes("phenomena")} onToggle={toggle}>
            <ColorCard tone="amber">
              <div className="flex gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-yellow-200" />
                <p className="font-body text-sm leading-relaxed text-amber-50/90">
                  Banyak fenomena tidak bertambah dengan selisih tetap. Nilainya justru <strong className="text-yellow-200">dikalikan oleh faktor yang sama</strong> pada setiap langkah. Pola inilah yang menjadi pintu masuk fungsi eksponen.
                </p>
              </div>
            </ColorCard>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/5 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <CircleDot className="h-5 w-5 text-cyan-200" />
                  <h2 className="font-display text-base font-bold text-cyan-100">Fenomena A · rantai perbuatan baik</h2>
                </div>
                <p className="font-body text-sm leading-relaxed text-white/75">Anda mengajak 2 orang melakukan kebaikan. Minggu berikutnya, masing-masing mengajak 2 orang baru.</p>
                <ChainIllustration />
                <Formula tone="cyan">N(n)=2^n</Formula>
                <p className="font-body text-xs leading-relaxed text-white/60">Basis tetap <InlineMath math="2" />, sedangkan waktu <InlineMath math="n" /> menjadi pangkat. Pada minggu ke-<InlineMath math="n" />, ada <InlineMath math="2^n" /> perbuatan baik.</p>
              </div>
              <div className="rounded-2xl border border-amber-300/20 bg-amber-400/5 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-amber-200" />
                  <h2 className="font-display text-base font-bold text-amber-100">Fenomena B · pantulan bola</h2>
                </div>
                <p className="font-body text-sm leading-relaxed text-white/75">Bola dijatuhkan dari ketinggian 8 m. Setiap pantulan mencapai setengah tinggi sebelumnya.</p>
                <BounceIllustration />
                <Formula tone="amber">h(x)=8\left(\frac12\right)^x</Formula>
                <p className="font-body text-xs leading-relaxed text-white/60">Karena faktor pengali <InlineMath math="\frac12" /> lebih kecil dari 1, tinggi bola semakin mendekati nol.</p>
              </div>
            </div>
          </Accordion>

          <Accordion id="definition" title="Apa yang dimaksud fungsi eksponen?" eyebrow="Bagian 1 · definisi dan syarat" icon={<Target className="h-5 w-5" />} tone="cyan" open={expanded.includes("definition")} onToggle={toggle}>
            <ColorCard tone="cyan">
              <p className="font-body text-sm leading-relaxed text-cyan-50/85">
                Fungsi eksponen adalah fungsi yang <strong className="text-cyan-100">variabel bebasnya berada pada posisi pangkat</strong>. Bentuk umumnya:
              </p>
              <Formula>{"f(x)=b\\cdot a^x\\qquad\\text{atau}\\qquad y=b\\cdot a^x"}</Formula>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["a", "basis", "a > 0 dan a \\ne 1"],
                  ["x", "eksponen", "variabel bebas"],
                  ["b", "faktor awal", "b \\ne 0"],
                ].map(([symbol, label, note]) => (
                  <div key={symbol} className="rounded-xl bg-slate-950/35 p-3 text-center">
                    <p className="font-display text-2xl font-black text-cyan-200">{symbol}</p>
                    <p className="text-xs font-bold text-white">{label}</p>
                    <p className="mt-1 text-xs text-white/55"><InlineMath math={note} /></p>
                  </div>
                ))}
              </div>
            </ColorCard>
            <div className="grid gap-4 md:grid-cols-2">
              <ColorCard tone="violet">
                <h2 className="mb-2 font-display text-base font-bold text-violet-100">Bedakan posisi variabelnya</h2>
                <div className="space-y-2 font-body text-sm leading-relaxed text-white/75">
                  <p><InlineMath math="f(x)=x^2" /> adalah fungsi kuadrat: <InlineMath math="x" /> menjadi basis.</p>
                  <p><InlineMath math="f(x)=2^x" /> adalah fungsi eksponen: <InlineMath math="x" /> menjadi pangkat.</p>
                </div>
              </ColorCard>
              <ColorCard tone="rose">
                <h2 className="mb-2 font-display text-base font-bold text-rose-100">Tiga syarat penting</h2>
                <ul className="space-y-2 font-body text-sm leading-relaxed text-white/75">
                  <li><CheckCircle2 className="mr-2 inline h-4 w-4 text-rose-200" /><InlineMath math="a>0" /> agar pangkat pecahan tetap real.</li>
                  <li><CheckCircle2 className="mr-2 inline h-4 w-4 text-rose-200" /><InlineMath math="a\ne1" /> agar fungsi tidak konstan.</li>
                  <li><CheckCircle2 className="mr-2 inline h-4 w-4 text-rose-200" /><InlineMath math="b\ne0" /> agar nilai awal tidak selalu nol.</li>
                </ul>
              </ColorCard>
            </div>
          </Accordion>

          <Accordion id="graph" title="Laboratorium grafik: ubah basisnya!" eyebrow="Bagian 2 · visualisasi interaktif" icon={<BarChart3 className="h-5 w-5" />} tone="blue" open={expanded.includes("graph")} onToggle={toggle}>
            <div className="grid gap-5 lg:grid-cols-[1fr_1.35fr]">
              <div className="rounded-2xl border border-blue-300/20 bg-blue-400/5 p-4">
                <p className="font-body text-sm leading-relaxed text-white/80">Geser nilai basis <InlineMath math="a" />. Perhatikan bahwa titik <InlineMath math="(0,1)" /> tetap dilalui, tetapi arah kurva berubah.</p>
                <label htmlFor="basis-range" className="mt-5 block font-display text-sm font-bold text-blue-100">Basis <span className="text-2xl text-yellow-200">{base.toFixed(1)}</span></label>
                <input id="basis-range" type="range" min="0.5" max="3" step="0.1" value={base} onChange={(event) => setBase(Number(event.target.value))} className="mt-3 w-full accent-cyan-300" />
                <div className="mt-2 flex justify-between text-xs text-white/45"><span>0,5 · turun</span><span>1 · dilarang</span><span>3 · naik cepat</span></div>
                <div className="mt-5 grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-xl bg-slate-950/35 p-3"><TrendingUp className="mx-auto mb-1 h-5 w-5 text-cyan-200" /><p className="text-xs text-white/60">a &gt; 1</p><p className="text-xs font-bold text-white">naik</p></div>
                  <div className="rounded-xl bg-slate-950/35 p-3"><TrendingDown className="mx-auto mb-1 h-5 w-5 text-pink-200" /><p className="text-xs text-white/60">0 &lt; a &lt; 1</p><p className="text-xs font-bold text-white">turun</p></div>
                </div>
              </div>
              <ExponentialGraph base={base} />
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ["Titik potong sumbu-Y", "(0,b)", "Saat x=0, y=b."],
                ["Asimtot horizontal", "y=0", "Kurva mendekati, tidak menyentuh."],
                ["Domain", "\\mathbb{R}", "Semua bilangan real."],
              ].map(([title, formula, description]) => (
                <div key={title} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <p className="text-xs font-bold text-white/55">{title}</p>
                  <p className="my-2 font-display text-xl font-black text-cyan-100"><InlineMath math={formula} /></p>
                  <p className="text-xs leading-relaxed text-white/55">{description}</p>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion id="growth" title="Aplikasi 1 · pertumbuhan eksponensial" eyebrow="Bagian 3 · faktor lebih besar dari satu" icon={<ArrowUpRight className="h-5 w-5" />} tone="emerald" open={expanded.includes("growth")} onToggle={toggle}>
            <ColorCard tone="emerald">
              <p className="font-body text-sm leading-relaxed text-emerald-50/85">Gunakan model ini ketika kuantitas bertambah dengan persentase tetap dari nilai sebelumnya: populasi, pembiakan sel, atau bunga majemuk.</p>
              <Formula tone="emerald">y=b\cdot(1+r)^t</Formula>
              <div className="grid gap-3 sm:grid-cols-3 font-body text-xs text-white/70">
                <span><strong className="text-emerald-100">b</strong> = jumlah awal</span>
                <span><strong className="text-emerald-100">r</strong> = laju pertumbuhan</span>
                <span><strong className="text-emerald-100">t</strong> = banyak periode</span>
              </div>
            </ColorCard>
            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/5 p-5">
              <div className="mb-3 flex items-center gap-2"><CircleDot className="h-5 w-5 text-emerald-200" /><h2 className="font-display text-lg font-bold text-emerald-100">Contoh · bunga majemuk</h2></div>
              <p className="font-body text-sm leading-relaxed text-white/80">Tabungan awal <strong className="text-white">Rp1.000.000.000,00</strong> mendapat bunga majemuk 6% per tahun. Berapa saldo setelah 10 tahun?</p>
              <Formula tone="emerald">{"y=1.000.000.000\\cdot(1+0{,}06)^{10}=1.000.000.000\\cdot1{,}06^{10}"}</Formula>
              <div className="flex flex-wrap items-center gap-3 font-body text-sm text-white/75"><ArrowUpRight className="h-5 w-5 text-emerald-200" /><span><InlineMath math="1{,}06^{10}\approx1{,}7908477" />, sehingga saldo akhir ≈</span><strong className="rounded-xl bg-emerald-300/15 px-3 py-2 text-emerald-100">Rp1.790.847.700,00</strong></div>
            </div>
          </Accordion>

          <Accordion id="decay" title="Aplikasi 2 · peluruhan eksponensial" eyebrow="Bagian 4 · faktor antara nol dan satu" icon={<ArrowDownRight className="h-5 w-5" />} tone="violet" open={expanded.includes("decay")} onToggle={toggle}>
            <ColorCard tone="violet">
              <p className="font-body text-sm leading-relaxed text-violet-50/85">Gunakan model ini ketika kuantitas berkurang secara proporsional: depresiasi kendaraan, efektivitas obat, atau peluruhan radioaktif.</p>
              <Formula tone="violet">{"y=b\\cdot(1-r)^t\\qquad\\text{atau}\\qquad m=m_0\\left(\\frac12\\right)^n"}</Formula>
              <p className="font-body text-xs leading-relaxed text-white/60"><InlineMath math="n=\frac{t}{T}" /> adalah banyaknya waktu paruh. Setiap satu waktu paruh, massa atau aktivitas menjadi setengahnya.</p>
            </ColorCard>
            <div className="rounded-2xl border border-violet-300/20 bg-violet-400/5 p-5">
              <div className="mb-3 flex items-center gap-2"><TrendingDown className="h-5 w-5 text-violet-200" /><h2 className="font-display text-lg font-bold text-violet-100">Contoh · depresiasi mobil</h2></div>
              <p className="font-body text-sm leading-relaxed text-white/80">Harga mobil Rp400.000.000,00 menyusut 12% per tahun. Estimasi harga lima tahun mendatang:</p>
              <Formula tone="violet">{"y=400.000.000\\cdot(1-0{,}12)^5=400.000.000\\cdot0{,}88^5"}</Formula>
              <p className="font-body text-sm text-white/75"><InlineMath math="0{,}88^5\approx0{,}52773" />, sehingga harga ≈ <strong className="text-violet-100">Rp211.092.000,00</strong> atau sekitar <strong className="text-violet-100">Rp211,09 juta</strong>.</p>
            </div>
          </Accordion>

          <Accordion id="practice" title="Ruang uji pemahaman" eyebrow="Bagian 5 · coba jelaskan dengan kata-katamu" icon={<CheckCircle2 className="h-5 w-5" />} tone="rose" open={expanded.includes("practice")} onToggle={toggle}>
            <div className="grid gap-4 md:grid-cols-3">
              <ChallengeCard number="1" tone="cyan" question={<><p>Diketahui kurva <InlineMath math="y=b\cdot a^x" /> melalui titik <InlineMath math="(0,5)" /> dan <InlineMath math="(3,40)" />. Tentukan <InlineMath math="b" />, <InlineMath math="a" />, dan persamaannya.</p></>} answer={<><p>Dari <InlineMath math="x=0" />, diperoleh <InlineMath math="b=5" />. Lalu <InlineMath math="40=5a^3" />, sehingga <InlineMath math="a^3=8" /> dan <InlineMath math="a=2" />.</p><Formula>y=5\cdot2^x</Formula></>} />
              <ChallengeCard number="2" tone="violet" question={<p>Aktivitas Iodium-131 adalah 16 mCi. Waktu paruhnya 8 hari. Berapa sisa aktivitas setelah 32 hari?</p>} answer={<><p>Empat waktu paruh berlalu: <InlineMath math="n=\frac{32}{8}=4" />.</p><Formula>{"m=16\\left(\\frac12\\right)^4=1\\text{ mCi}"}</Formula></>} />
              <ChallengeCard number="3" tone="amber" question={<p>Mengapa kurva <InlineMath math="y=2^x" /> tidak pernah memotong garis <InlineMath math="y=0" />? Jelaskan berdasarkan definisi pemangkatan.</p>} answer={<p>Untuk setiap bilangan real <InlineMath math="x" />, <InlineMath math="2^x" /> selalu positif. Nilainya dapat mendekati nol ketika <InlineMath math="x" /> semakin negatif, tetapi tidak pernah sama dengan nol.</p>} />
            </div>
            <ColorCard tone="rose">
              <div className="flex gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-rose-200" />
                <p className="font-body text-sm leading-relaxed text-rose-50/85"><strong className="text-rose-100">Pesan untuk guru:</strong> minta siswa menyebutkan faktor pengali sebelum menulis rumus. Jika faktornya lebih dari 1, pikirkan pertumbuhan; jika di antara 0 dan 1, pikirkan peluruhan.</p>
              </div>
            </ColorCard>
          </Accordion>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 text-center font-body text-xs text-white/45">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Basis: a &gt; 0, a ≠ 1</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Pertumbuhan: a &gt; 1</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Peluruhan: 0 &lt; a &lt; 1</span>
        </div>
      </main>
    </div>
  );
};

export default SmaFungsiEksponenPage;