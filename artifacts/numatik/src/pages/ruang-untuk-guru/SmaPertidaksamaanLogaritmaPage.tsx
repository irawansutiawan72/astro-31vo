import { useMemo, useState, type ReactNode } from "react";
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Scale,
  Sparkles,
  Target,
  TriangleAlert,
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

const toTeacherLogNotation = (math: string) =>
  math.replace(/\\log_(\{[^{}]+\}|[A-Za-z0-9]+)/g, (_match, rawBase: string) => {
    const base = rawBase.startsWith("{") ? rawBase.slice(1, -1) : rawBase;
    return `{}^{${base}}\\log `;
  });

const InlineMath = ({ math }: { math: string }) => <KaTeXInlineMath math={toTeacherLogNotation(math)} />;

const Formula = ({ children, tone = "cyan" }: { children: string; tone?: Tone }) => (
  <div className={`my-3 overflow-x-auto rounded-xl border px-4 py-3 text-center text-cyan-100 ${toneClasses[tone]}`}>
    <BlockMath math={toTeacherLogNotation(children)} />
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

const ExampleCard = ({
  number,
  difficulty,
  tone,
  question,
  children,
}: {
  number: number;
  difficulty: string;
  tone: Tone;
  question: ReactNode;
  children: ReactNode;
}) => (
  <div className={`rounded-2xl border p-4 ${toneClasses[tone]}`}>
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">Contoh {number}</span>
      <span className="rounded-full border border-white/15 bg-slate-950/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/65">{difficulty}</span>
    </div>
    <div className="rounded-xl bg-slate-950/50 p-3 font-body text-sm leading-relaxed text-white">{question}</div>
    <div className="mt-3 border-l-2 border-white/25 pl-3 font-body text-sm leading-relaxed text-white/80">
      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/45">Pembahasan detail</p>
      {children}
    </div>
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

const LogarithmMascot = () => (
  <svg viewBox="0 0 380 245" role="img" aria-label="Maskot roket dan simbol pertidaksamaan logaritma" className="h-auto w-full">
    <defs>
      <linearGradient id="logRocketBody" x1="0" x2="1">
        <stop offset="0%" stopColor="#67e8f9" />
        <stop offset="100%" stopColor="#c4b5fd" />
      </linearGradient>
      <linearGradient id="logFlame" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="100%" stopColor="#fb7185" />
      </linearGradient>
      <filter id="logGlow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
    </defs>
    <circle cx="308" cy="53" r="30" fill="#fef08a" fillOpacity=".12" />
    <circle cx="308" cy="53" r="12" fill="#fde68a" fillOpacity=".8" />
    <path d="M18 182 C83 125 126 213 183 153 S286 108 357 140" fill="none" stroke="#22d3ee" strokeOpacity=".2" strokeWidth="16" />
    <path d="M18 182 C83 125 126 213 183 153 S286 108 357 140" fill="none" stroke="#67e8f9" strokeDasharray="4 8" strokeWidth="2" />
    <g transform="translate(118 47) rotate(-18 72 72)" filter="url(#logGlow)">
      <path d="M72 7 C106 23 120 56 113 101 L72 131 L31 101 C24 56 38 23 72 7Z" fill="url(#logRocketBody)" stroke="#e0f2fe" strokeWidth="3" />
      <path d="M31 87 L8 103 L31 113Z M113 87 L136 103 L113 113Z" fill="#f9a8d4" stroke="#fce7f3" strokeWidth="2" />
      <path d="M58 126 Q72 171 86 126 Q72 143 58 126Z" fill="url(#logFlame)" />
      <circle cx="72" cy="63" r="19" fill="#07152d" stroke="#fef3c7" strokeWidth="3" />
      <circle cx="66" cy="59" r="3.5" fill="#f8fafc" /><circle cx="78" cy="59" r="3.5" fill="#f8fafc" />
      <path d="M64 70 Q72 78 80 70" fill="none" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
      <text x="72" y="36" textAnchor="middle" fill="#082f49" fontSize="11" fontWeight="800">logₐx</text>
    </g>
    <g fill="#fde68a"><circle cx="54" cy="56" r="3" /><circle cx="83" cy="28" r="2" /><circle cx="351" cy="82" r="3" /><circle cx="265" cy="23" r="2" /></g>
    <text x="28" y="218" fill="#bae6fd" fontSize="13" fontWeight="700">cek basis dan domainnya!</text>
  </svg>
);

const LogarithmGraph = ({ base }: { base: number }) => {
  const points = useMemo(() => {
    const xMin = 0.25;
    const xMax = 8;
    const yMin = -3;
    const yMax = 3;
    const left = 58;
    const top = 20;
    const width = 438;
    const height = 200;
    return Array.from({ length: 90 }, (_, index) => {
      const x = xMin + ((xMax - xMin) * index) / 89;
      const y = Math.log(x) / Math.log(base);
      const px = left + ((x - xMin) / (xMax - xMin)) * width;
      const py = top + height - ((Math.max(yMin, Math.min(yMax, y)) - yMin) / (yMax - yMin)) * height;
      return `${px.toFixed(1)},${py.toFixed(1)}`;
    }).join(" ");
  }, [base]);

  return (
    <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/40 p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="font-body text-xs font-bold uppercase tracking-[0.16em] text-cyan-100/70">Visualisasi arah fungsi</p>
        <span className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-xs text-white/75">{base > 1 ? "naik" : "turun"} · basis {base === 0.5 ? "½" : base}</span>
      </div>
      <svg viewBox="0 0 540 255" role="img" aria-label={`Grafik fungsi logaritma dengan basis ${base}`} className="h-auto w-full">
        <path d="M58 220 H506 M58 20 V220" stroke="#94a3b8" strokeOpacity=".55" />
        <path d="M58 120 H496" stroke="#64748b" strokeOpacity=".16" strokeDasharray="4 6" />
        <path d="M114 20 V220" stroke="#64748b" strokeOpacity=".16" strokeDasharray="4 6" />
        <polyline points={points} fill="none" stroke={base > 1 ? "#67e8f9" : "#f9a8d4"} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="114" cy="120" r="5" fill="#fde68a" stroke="#fff7ed" strokeWidth="2" />
        <text x="124" y="113" fill="#fde68a" fontSize="11" fontWeight="700">(1, 0)</text>
        <text x="498" y="239" fill="#cbd5e1" fontSize="11">x</text><text x="66" y="26" fill="#cbd5e1" fontSize="11">y</text>
      </svg>
      <p className="mt-1 text-center font-body text-xs leading-relaxed text-white/55">
        Untuk <InlineMath math="a>1" />, grafik logaritma naik. Untuk <InlineMath math="0<a<1" />, grafiknya turun. Domainnya selalu <InlineMath math="x>0" />.
      </p>
    </div>
  );
};

const CurveComparisonIllustration = () => {
  const [position, setPosition] = useState<"above" | "below">("above");
  const fIsAbove = position === "above";
  const fY = fIsAbove ? 96 : 190;
  const gY = fIsAbove ? 190 : 96;

  return (
    <ColorCard tone="violet">
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <Target className="mt-0.5 h-5 w-5 shrink-0 text-violet-200" />
            <div>
              <p className="font-display text-base font-bold text-violet-100">Membandingkan isi logaritma</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-violet-50/85">
                Pada <strong>x yang sama</strong>, kurva yang lebih tinggi memiliki nilai <InlineMath math="y" /> lebih besar.
                Untuk logaritma, pastikan juga kedua isi logaritma positif sebelum membandingkan.
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => { playPopSound(); setPosition("above"); }} className={`rounded-xl px-3 py-2 font-body text-xs font-bold transition ${fIsAbove ? "bg-emerald-300/25 text-emerald-100" : "bg-white/10 text-white/60"}`}>f(x) di atas g(x)</button>
            <button type="button" onClick={() => { playPopSound(); setPosition("below"); }} className={`rounded-xl px-3 py-2 font-body text-xs font-bold transition ${!fIsAbove ? "bg-rose-300/25 text-rose-100" : "bg-white/10 text-white/60"}`}>f(x) di bawah g(x)</button>
          </div>
        </div>
        <div className="w-full shrink-0 md:max-w-[390px]">
          <svg viewBox="0 0 520 265" role="img" aria-label={fIsAbove ? "Kurva f berada di atas kurva g" : "Kurva f berada di bawah kurva g"} className="h-auto w-full rounded-2xl border border-white/10 bg-slate-950/45">
            <path d="M48 220 H488 M94 22 V220" stroke="#94a3b8" strokeOpacity=".6" />
            <path d="M94 42 V220 M180 42 V220 M266 42 V220 M352 42 V220 M438 42 V220" stroke="#64748b" strokeOpacity=".12" strokeDasharray="4 6" />
            <path d="M48 171 C125 126 182 132 239 164 S355 203 488 74" fill="none" stroke="#a78bfa" strokeWidth="4" strokeLinecap="round" />
            <path d="M48 84 C126 124 183 115 239 80 S356 72 488 164" fill="none" stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" />
            <text x="465" y="69" fill="#67e8f9" fontSize="13" fontWeight="800">f</text><text x="465" y="180" fill="#c4b5fd" fontSize="13" fontWeight="800">g</text>
            <line x1="352" y1={fY} x2="352" y2={gY} stroke={fIsAbove ? "#86efac" : "#fda4af"} strokeWidth="3" strokeDasharray="6 5" />
            <circle cx="352" cy={fY} r="6" fill="#67e8f9" stroke="#ecfeff" strokeWidth="2" /><circle cx="352" cy={gY} r="6" fill="#a78bfa" stroke="#f5f3ff" strokeWidth="2" />
            <text x="363" y={fY - 9} fill="#bae6fd" fontSize="12" fontWeight="700">f(x)</text><text x="363" y={gY + 17} fill="#ddd6fe" fontSize="12" fontWeight="700">g(x)</text>
            <text x="358" y="237" fill="#cbd5e1" fontSize="11">x yang sama</text>
          </svg>
        </div>
      </div>
      <div className={`mt-4 rounded-xl border px-4 py-3 font-body text-sm leading-relaxed ${fIsAbove ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-50" : "border-rose-300/25 bg-rose-300/10 text-rose-50"}`}>
        {fIsAbove ? <><strong>Kurva f lebih tinggi.</strong> Pada nilai <InlineMath math="x" /> yang sama, <InlineMath math="f(x)>g(x)" />.</> : <><strong>Kurva f lebih rendah.</strong> Pada nilai <InlineMath math="x" /> yang sama, <InlineMath math="f(x)<g(x)" />.</>}
      </div>
    </ColorCard>
  );
};

const SignChart = () => (
  <div className="overflow-x-auto rounded-2xl border border-amber-300/25 bg-slate-950/35 p-4">
    <p className="mb-3 font-body text-xs font-black uppercase tracking-[0.18em] text-amber-100/75">Pola tanda kuadrat</p>
    <div className="min-w-[560px] font-mono text-sm text-white/80">
      <div className="grid grid-cols-[90px_1fr] gap-3 border-b border-white/10 pb-2"><span>y</span><span className="flex justify-between"><span>−∞</span><span>y₁</span><span>y₂</span><span>+∞</span></span></div>
      <div className="grid grid-cols-[90px_1fr] gap-3 border-b border-white/10 py-2"><span>py²+qy+r</span><span className="flex justify-between text-rose-200"><span>+</span><span>0</span><span>−</span><span>0</span><span>+</span></span></div>
      <div className="grid grid-cols-[90px_1fr] gap-3 pt-2 text-xs text-white/60"><span>jika p &gt; 0</span><span className="flex justify-between"><span>di luar akar</span><span>di antara akar</span><span>di luar akar</span></span></div>
    </div>
  </div>
);

const SmaPertidaksamaanLogaritmaPage = () => {
  const allSections = ["direction", "quadratic", "summary"];
  const [expanded, setExpanded] = useState(allSections);
  const [base, setBase] = useState(2);

  const toggle = (id: string) => {
    playPopSound();
    setExpanded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const toggleAll = () => {
    playPopSound();
    setExpanded((current) => current.length === allSections.length ? [] : allSections);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#070b23] text-white">
      <Starfield />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[650px] bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.25),_transparent_65%)]" />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma" />
      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-20 pt-16">
        <header className="relative mb-8 overflow-hidden rounded-[2rem] border border-cyan-200/25 bg-gradient-to-br from-cyan-500/20 via-blue-600/15 to-fuchsia-600/20 p-6 shadow-2xl shadow-cyan-950/30 md:p-10">
          <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-fuchsia-400/20 blur-3xl" /><div className="absolute -bottom-16 -left-8 h-44 w-44 rounded-full bg-cyan-300/15 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/35 bg-cyan-200/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100"><BookOpen className="h-4 w-4" /> Buku Animasi Matematika · SMA</div>
              <p className="mb-2 font-body text-xs font-bold uppercase tracking-[0.22em] text-cyan-200/70">Eksponen dan Logaritma · Ruang untuk Guru</p>
              <h1 className="font-display text-3xl font-black leading-tight text-white md:text-5xl">Pertidaksamaan <span className="text-cyan-300 text-glow-cyan">Logaritma</span></h1>
              <p className="mt-4 max-w-2xl font-body text-sm leading-7 text-white/75 md:text-base">Baca arah grafiknya, periksa domain, lalu ubah bentuk kuadrat dengan substitusi agar langkah penyelesaiannya lebih teratur.</p>
              <div className="mt-6 flex flex-wrap gap-2 font-body text-xs text-white/70">{["Konsep inti", "Grafik interaktif", "6 contoh bertahap", "Siap mengajar"].map((label) => <span key={label} className="rounded-full border border-white/15 bg-white/10 px-3 py-2">{label}</span>)}</div>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <LogarithmMascot />
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-xl border border-white/15 bg-slate-950/60 px-4 py-2 font-display text-sm font-bold text-cyan-100 backdrop-blur"><InlineMath math="\log_a f(x)\gtreqless\log_a g(x)" /></div>
            </div>
          </div>
        </header>

        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-body text-xs text-white/50"><Sparkles className="h-4 w-4 text-yellow-300" /> Materi visual · warna · animasi · contoh bertahap</div>
          <button type="button" onClick={toggleAll} className="rounded-full border border-white/15 bg-white/5 px-3 py-2 font-body text-xs text-white/70 transition hover:border-cyan-300/50 hover:text-cyan-100">{expanded.length === allSections.length ? "Tutup semua" : "Buka semua"}</button>
        </div>

        <div className="space-y-4">
          <Accordion id="direction" title="Bentuk I · ikuti arah basisnya" eyebrow="Sub-bab 1 · aturan utama pertidaksamaan" icon={<Scale className="h-5 w-5" />} tone="cyan" open={expanded.includes("direction")} onToggle={toggle}>
            <ColorCard tone="cyan">
              <div className="flex gap-3"><Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-yellow-200" /><div><p className="font-display text-base font-bold text-cyan-100">Ringkasan intisari</p><p className="mt-1 font-body text-sm leading-relaxed text-cyan-50/85">Fungsi logaritma dengan basis lebih besar dari <InlineMath math="1" /> bergerak naik. Jika basis berada di antara <InlineMath math="0" /> dan <InlineMath math="1" />, grafiknya bergerak turun. Selain itu, setiap isi logaritma wajib positif.</p></div></div>
              <Formula tone="cyan">{"\\begin{aligned} a>1 &:&& \\log_a f(x)>\\log_a g(x)\\Longleftrightarrow f(x)>g(x) \\\\ 0<a<1 &:&& \\log_a f(x)>\\log_a g(x)\\Longleftrightarrow f(x)<g(x) \\end{aligned}"}</Formula>
              <blockquote className="rounded-xl border-l-4 border-yellow-300 bg-yellow-300/10 px-4 py-3 font-body text-sm leading-relaxed text-yellow-50"><strong>Tips:</strong> tulis dua syarat sebelum mulai: <InlineMath math="a>0,\ a\ne1" /> dan semua isi logaritma harus lebih besar dari <InlineMath math="0" />.</blockquote>
            </ColorCard>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => { playPopSound(); setBase(2); }} className={`rounded-xl px-3 py-2 font-body text-xs font-bold transition ${base > 1 ? "bg-cyan-300/25 text-cyan-100" : "bg-white/10 text-white/60"}`}>Basis 2 · naik</button>
                  <button type="button" onClick={() => { playPopSound(); setBase(0.5); }} className={`rounded-xl px-3 py-2 font-body text-xs font-bold transition ${base < 1 ? "bg-pink-300/25 text-pink-100" : "bg-white/10 text-white/60"}`}>Basis ½ · turun</button>
                </div>
                <LogarithmGraph base={base} />
              </div>
              <ColorCard tone="blue">
                <p className="font-display text-base font-bold text-blue-100">Tabel keputusan cepat</p>
                <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full min-w-[420px] text-left font-body text-xs"><thead className="bg-slate-950/45 text-blue-100"><tr><th className="px-3 py-3">Syarat basis</th><th className="px-3 py-3">Jika kiri &gt; kanan</th><th className="px-3 py-3">Arah isi logaritma</th></tr></thead>
                    <tbody className="text-white/75"><tr className="border-t border-white/10"><td className="px-3 py-3"><InlineMath math="a>1" /></td><td className="px-3 py-3"><InlineMath math="\log_a f>\log_a g" /></td><td className="px-3 py-3 font-bold text-emerald-200"><InlineMath math="f>g" /></td></tr><tr className="border-t border-white/10"><td className="px-3 py-3"><InlineMath math="0<a<1" /></td><td className="px-3 py-3"><InlineMath math="\log_a f>\log_a g" /></td><td className="px-3 py-3 font-bold text-rose-200"><InlineMath math="f<g" /></td></tr></tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">Tanda <InlineMath math="<,\ \le,\ \ge" /> mengikuti aturan yang sama. Setelah itu, gabungkan dengan syarat domain.</p>
              </ColorCard>
            </div>

            <CurveComparisonIllustration />

            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} difficulty="Mudah" tone="emerald" question={<>Tentukan penyelesaian <InlineMath math="\log_2 x>3" />.</>}>
                <p>Karena <InlineMath math="2>1" />, tanda tetap. Ubah ke bentuk eksponen:</p>
                <Formula tone="emerald">{"x>2^3\\Rightarrow x>8"}</Formula>
                <p className="text-emerald-100"><strong>Jawaban:</strong> <InlineMath math="x>8" />.</p>
              </ExampleCard>
              <ExampleCard number={2} difficulty="Sedang" tone="blue" question={<>Selesaikan <InlineMath math="\log_{\frac13}(x-1)\le2" />.</>}>
                <p>Basis <InlineMath math="\frac13" /> kurang dari <InlineMath math="1" />, jadi arah tanda berbalik. Jangan lupa <InlineMath math="x-1>0" />.</p>
                <Formula tone="blue">{"x-1\\ge\\left(\\frac13\\right)^2=\\frac19\\Rightarrow x\\ge\\frac{10}{9}"}</Formula>
                <p className="text-blue-100"><strong>Jawaban:</strong> <InlineMath math="x\ge\frac{10}{9}" />.</p>
              </ExampleCard>
              <ExampleCard number={3} difficulty="Sulit" tone="violet" question={<>Tentukan himpunan penyelesaian <InlineMath math="\log_3(x+1)>\log_3(2x-3)" />.</>}>
                <p>Domain: <InlineMath math="x+1>0" /> dan <InlineMath math="2x-3>0" />, sehingga <InlineMath math="x>\frac32" />. Basis <InlineMath math="3>1" />, maka:</p>
                <Formula tone="violet">{"x+1>2x-3\\Rightarrow x<4"}</Formula>
                <p>Gabungkan dengan domain: <strong className="text-violet-100"><InlineMath math="\frac32<x<4" /></strong>.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="quadratic" title="Bentuk II · ubah menjadi pertidaksamaan kuadrat" eyebrow="Sub-bab 2 · substitusi dan garis bilangan" icon={<BarChart3 className="h-5 w-5" />} tone="amber" open={expanded.includes("quadratic")} onToggle={toggle}>
            <ColorCard tone="amber">
              <p className="font-display text-base font-bold text-amber-100">Ringkasan intisari</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-amber-50/85">Jika <InlineMath math="(\log_a x)^2" /> dan <InlineMath math="\log_a x" /> muncul bersama, misalkan <InlineMath math="y=\log_a x" />. Selesaikan pertidaksamaan kuadrat dalam <InlineMath math="y" />, lalu kembalikan ke <InlineMath math="x" />. Domain awal tetap <InlineMath math="x>0" />.</p>
              <Formula tone="amber">{"p(\\log_a x)^2+q\\log_a x+r\\gtreqless0\\quad\\xrightarrow{\\ y=\\log_a x\\ }\\quad py^2+qy+r\\gtreqless0"}</Formula>
              <div className="grid gap-3 md:grid-cols-3"><div className="rounded-xl border border-white/10 bg-slate-950/25 p-3 text-sm text-white/75"><strong className="text-amber-100">1. Domain:</strong> pastikan <InlineMath math="x>0" />.</div><div className="rounded-xl border border-white/10 bg-slate-950/25 p-3 text-sm text-white/75"><strong className="text-amber-100">2. Substitusi:</strong> tetapkan <InlineMath math="y=\log_a x" />.</div><div className="rounded-xl border border-white/10 bg-slate-950/25 p-3 text-sm text-white/75"><strong className="text-amber-100">3. Kembali ke x:</strong> perhatikan apakah basis naik atau turun.</div></div>
              <blockquote className="mt-4 rounded-xl border-l-4 border-rose-300 bg-rose-300/10 px-4 py-3 font-body text-sm leading-relaxed text-rose-50"><TriangleAlert className="mr-2 inline h-4 w-4 align-text-bottom" /> <strong>Catatan penting:</strong> saat menerjemahkan kembali dari <InlineMath math="y" /> ke <InlineMath math="x" />, basis <InlineMath math="a>1" /> mempertahankan arah, sedangkan <InlineMath math="0<a<1" /> membalik arah.</blockquote>
            </ColorCard>
            <SignChart />
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} difficulty="Mudah" tone="emerald" question={<>Selesaikan <InlineMath math="(\log_2x)^2-3\log_2x+2\le0" />.</>}>
                <p>Misalkan <InlineMath math="y=\log_2x" />:</p>
                <Formula tone="emerald">{"y^2-3y+2\\le0\\Rightarrow(y-1)(y-2)\\le0\\Rightarrow1\\le y\\le2"}</Formula>
                <p>Karena basis <InlineMath math="2>1" />, <InlineMath math="2^1\le x\le2^2" />. Jadi <strong className="text-emerald-100"><InlineMath math="2\le x\le4" /></strong>.</p>
              </ExampleCard>
              <ExampleCard number={2} difficulty="Sedang" tone="blue" question={<>Tentukan penyelesaian <InlineMath math="(\log_3x)^2-4\log_3x+3>0" />.</>}>
                <p>Ambil <InlineMath math="y=\log_3x" />:</p>
                <Formula tone="blue">{"y^2-4y+3>0\\Rightarrow(y-1)(y-3)>0\\Rightarrow y<1\\text{ atau }y>3"}</Formula>
                <p>Karena basis <InlineMath math="3>1" />, diperoleh <strong className="text-blue-100"><InlineMath math="0<x<3" /> atau <InlineMath math="x>27" /></strong>.</p>
              </ExampleCard>
              <ExampleCard number={3} difficulty="Sulit" tone="rose" question={<>Selesaikan <InlineMath math="(\log_{\frac12}x)^2-3\log_{\frac12}x+2\ge0" />.</>}>
                <p>Misalkan <InlineMath math="y=\log_{\frac12}x" />:</p>
                <Formula tone="rose">{"(y-1)(y-2)\\ge0\\Rightarrow y\\le1\\text{ atau }y\\ge2"}</Formula>
                <p>Basis pecahan membalik arah: <InlineMath math="y\le1\Rightarrow x\ge\frac12" /> dan <InlineMath math="y\ge2\Rightarrow0<x\le\frac14" />. Jadi <strong className="text-rose-100"><InlineMath math="0<x\le\frac14" /> atau <InlineMath math="x\ge\frac12" /></strong>.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="summary" title="Peta konsep dan jebakan umum" eyebrow="Penutup · bekal mengajar" icon={<BookOpen className="h-5 w-5" />} tone="violet" open={expanded.includes("summary")} onToggle={toggle}>
            <div className="overflow-x-auto rounded-2xl border border-white/10"><table className="w-full min-w-[720px] text-left font-body text-sm"><thead className="bg-slate-950/60 text-cyan-100"><tr><th className="px-4 py-3">Situasi</th><th className="px-4 py-3">Langkah utama</th><th className="px-4 py-3">Pengingat</th></tr></thead><tbody className="text-white/75">{[["Basis naik", "$a>1$", "Tanda tetap"],["Basis turun", "$0<a<1$", "Tanda berbalik"],["Isi logaritma", "$f(x)>0$", "Syarat domain"],["Bentuk kuadrat", "$y=\\log_a x$", "Kembali ke x dengan arah basis"]].map(([situation, step, note], index) => <tr key={situation} className={`border-t border-white/5 ${index % 2 === 0 ? "bg-white/[0.025]" : ""}`}><td className="px-4 py-3 font-semibold text-white">{situation}</td><td className="px-4 py-3 text-cyan-100"><InlineMath math={step.slice(1, -1)} /></td><td className="px-4 py-3">{note}</td></tr>)}</tbody></table></div>
            <div className="grid gap-3 md:grid-cols-3"><ColorCard tone="rose"><p className="font-bold text-rose-100">Jangan lupa domain</p><p className="mt-2 text-sm leading-relaxed text-white/70">Isi setiap logaritma harus positif, bukan sekadar hasil akhir yang terlihat benar.</p></ColorCard><ColorCard tone="amber"><p className="font-bold text-amber-100">Cek arah basis</p><p className="mt-2 text-sm leading-relaxed text-white/70">Basis di antara <InlineMath math="0" /> dan <InlineMath math="1" /> membuat tanda perbandingan berbalik.</p></ColorCard><ColorCard tone="emerald"><p className="font-bold text-emerald-100">Uji kembali</p><p className="mt-2 text-sm leading-relaxed text-white/70">Masukkan titik uji dari interval jawaban ke bentuk logaritma semula.</p></ColorCard></div>
            <blockquote className="rounded-2xl border border-cyan-300/25 bg-cyan-300/10 p-4 font-body text-sm leading-relaxed text-cyan-50"><strong>Pesan untuk guru:</strong> biasakan siswa menulis “domain dahulu, arah basis kemudian”. Urutan ini membuat kesalahan tanda dan nilai yang tidak boleh masuk menjadi lebih mudah terlihat.</blockquote>
          </Accordion>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 text-center font-body text-xs text-white/45"><span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Cek domain</span><span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Cek basis</span><span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Uji kembali</span></div>
      </main>
    </div>
  );
};

export default SmaPertidaksamaanLogaritmaPage;