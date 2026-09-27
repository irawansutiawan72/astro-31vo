import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Rocket,
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
      <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
        Contoh {number}
      </span>
      <span className="rounded-full border border-white/15 bg-slate-950/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/65">
        {difficulty}
      </span>
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

const InequalityMascot = () => (
  <svg viewBox="0 0 380 245" role="img" aria-label="Maskot roket dan simbol pertidaksamaan eksponen" className="h-auto w-full">
    <defs>
      <linearGradient id="ineqRocketBody" x1="0" x2="1">
        <stop offset="0%" stopColor="#67e8f9" />
        <stop offset="100%" stopColor="#c4b5fd" />
      </linearGradient>
      <linearGradient id="ineqFlame" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="100%" stopColor="#fb7185" />
      </linearGradient>
      <filter id="ineqGlow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
    </defs>
    <circle cx="308" cy="53" r="30" fill="#fef08a" fillOpacity=".12" />
    <circle cx="308" cy="53" r="12" fill="#fde68a" fillOpacity=".8" />
    <path d="M18 182 C83 125 126 213 183 153 S286 108 357 140" fill="none" stroke="#22d3ee" strokeOpacity=".2" strokeWidth="16" />
    <path d="M18 182 C83 125 126 213 183 153 S286 108 357 140" fill="none" stroke="#67e8f9" strokeDasharray="4 8" strokeWidth="2" />
    <g transform="translate(118 47) rotate(-18 72 72)" filter="url(#ineqGlow)">
      <path d="M72 7 C106 23 120 56 113 101 L72 131 L31 101 C24 56 38 23 72 7Z" fill="url(#ineqRocketBody)" stroke="#e0f2fe" strokeWidth="3" />
      <path d="M31 87 L8 103 L31 113Z M113 87 L136 103 L113 113Z" fill="#f9a8d4" stroke="#fce7f3" strokeWidth="2" />
      <path d="M58 126 Q72 171 86 126 Q72 143 58 126Z" fill="url(#ineqFlame)" />
      <circle cx="72" cy="63" r="19" fill="#07152d" stroke="#fef3c7" strokeWidth="3" />
      <circle cx="66" cy="59" r="3.5" fill="#f8fafc" />
      <circle cx="78" cy="59" r="3.5" fill="#f8fafc" />
      <path d="M64 70 Q72 78 80 70" fill="none" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
      <text x="72" y="36" textAnchor="middle" fill="#082f49" fontSize="13" fontWeight="800">aˣ</text>
    </g>
    <g fill="#fde68a"><circle cx="54" cy="56" r="3" /><circle cx="83" cy="28" r="2" /><circle cx="351" cy="82" r="3" /><circle cx="265" cy="23" r="2" /></g>
    <text x="28" y="218" fill="#bae6fd" fontSize="13" fontWeight="700">perhatikan arah tanda!</text>
  </svg>
);

const ExponentialGraph = ({ base }: { base: number }) => {
  const points = useMemo(() => {
    const xMin = -3;
    const xMax = 3;
    const yMax = 9;
    const plotLeft = 48;
    const plotTop = 18;
    const plotWidth = 456;
    const plotHeight = 202;
    return Array.from({ length: 61 }, (_, index) => {
      const x = xMin + ((xMax - xMin) * index) / 60;
      const y = Math.pow(base, x);
      const px = plotLeft + ((x - xMin) / (xMax - xMin)) * plotWidth;
      const py = plotTop + plotHeight - (Math.min(y, yMax) / yMax) * plotHeight;
      return `${px.toFixed(1)},${py.toFixed(1)}`;
    }).join(" ");
  }, [base]);

  return (
    <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/40 p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="font-body text-xs font-bold uppercase tracking-[0.16em] text-cyan-100/70">Visualisasi arah fungsi</p>
        <span className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-xs text-white/75">
          {base > 1 ? "naik" : "turun"} · basis {base === 0.5 ? "\\frac{1}{2}" : base}
        </span>
      </div>
      <svg viewBox="0 0 540 255" role="img" aria-label={`Grafik fungsi eksponen dengan basis ${base}`} className="h-auto w-full">
        <path d="M48 220 H512 M276 18 V220" stroke="#94a3b8" strokeOpacity=".55" />
        {[0, 1, 2, 3].map((value) => {
          const y = 18 + 202 - (value / 9) * 202;
          return <g key={value}><path d={`M48 ${y} H504`} stroke="#64748b" strokeOpacity=".14" strokeDasharray="4 6" /><text x="34" y={y + 4} textAnchor="end" fill="#94a3b8" fontSize="10">{value}</text></g>;
        })}
        <polyline points={points} fill="none" stroke={base > 1 ? "#67e8f9" : "#f9a8d4"} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="276" cy="197.6" r="5" fill="#fde68a" stroke="#fff7ed" strokeWidth="2" />
        <text x="285" y="193" fill="#fde68a" fontSize="11" fontWeight="700"> (0, 1)</text>
        <text x="507" y="239" fill="#cbd5e1" fontSize="11">x</text>
        <text x="283" y="25" fill="#cbd5e1" fontSize="11">y</text>
      </svg>
      <p className="mt-1 text-center font-body text-xs leading-relaxed text-white/55">
        Saat basis lebih besar dari <InlineMath math="1" />, grafik naik. Saat basis berada di antara <InlineMath math="0" /> dan <InlineMath math="1" />, grafik turun.
      </p>
    </div>
  );
};

const SignChart = () => (
  <div className="overflow-x-auto rounded-2xl border border-amber-300/25 bg-slate-950/35 p-4">
    <p className="mb-3 font-body text-xs font-black uppercase tracking-[0.18em] text-amber-100/75">Pola tanda kuadrat</p>
    <div className="min-w-[560px] font-mono text-sm text-white/80">
      <div className="grid grid-cols-[90px_1fr] gap-3 border-b border-white/10 pb-2">
        <span>y</span><span className="flex justify-between"><span>−∞</span><span>y₁</span><span>y₂</span><span>+∞</span></span>
      </div>
      <div className="grid grid-cols-[90px_1fr] gap-3 border-b border-white/10 py-2">
        <span>py²+qy+r</span>
        <span className="flex justify-between text-rose-200"><span>+</span><span>0</span><span>−</span><span>0</span><span>+</span></span>
      </div>
      <div className="grid grid-cols-[90px_1fr] gap-3 pt-2 text-xs text-white/60">
        <span>jika p &gt; 0</span><span className="flex justify-between"><span>di luar akar</span><span>di antara akar</span><span>di luar akar</span></span>
      </div>
    </div>
  </div>
);

const SmaPertidaksamaanEksponenPage = () => {
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
          <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-8 h-44 w-44 rounded-full bg-cyan-300/15 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/35 bg-cyan-200/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">
                <BookOpen className="h-4 w-4" /> Buku Animasi Matematika · SMA
              </div>
              <p className="mb-2 font-body text-xs font-bold uppercase tracking-[0.22em] text-cyan-200/70">Eksponen dan Logaritma · Ruang untuk Guru</p>
              <h1 className="font-display text-3xl font-black leading-tight text-white md:text-5xl">
                Pertidaksamaan <span className="text-cyan-300 text-glow-cyan">Eksponen</span>
              </h1>
              <p className="mt-4 max-w-2xl font-body text-sm leading-7 text-white/75 md:text-base">
                Ikuti arah grafiknya, jaga tanda pertidaksamaannya, lalu ubah bentuk kuadrat menjadi lebih bersahabat dengan substitusi.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 font-body text-xs text-white/70">
                {["Konsep inti", "Grafik interaktif", "6 contoh bertahap", "Siap mengajar"].map((label) => (
                  <span key={label} className="rounded-full border border-white/15 bg-white/10 px-3 py-2">{label}</span>
                ))}
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <InequalityMascot />
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-xl border border-white/15 bg-slate-950/60 px-4 py-2 font-display text-sm font-bold text-cyan-100 backdrop-blur">
                <InlineMath math="a^{f(x)}\gtreqless a^{g(x)}" />
              </div>
            </div>
          </div>
        </header>

        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-body text-xs text-white/50"><Sparkles className="h-4 w-4 text-yellow-300" /> Materi visual · warna · animasi · contoh bertahap</div>
          <button type="button" onClick={toggleAll} className="rounded-full border border-white/15 bg-white/5 px-3 py-2 font-body text-xs text-white/70 transition hover:border-cyan-300/50 hover:text-cyan-100">
            {expanded.length === allSections.length ? "Tutup semua" : "Buka semua"}
          </button>
        </div>

        <div className="space-y-4">
          <Accordion id="direction" title="Bentuk I · ikuti arah basisnya" eyebrow="Sub-bab 1 · aturan utama pertidaksamaan" icon={<Scale className="h-5 w-5" />} tone="cyan" open={expanded.includes("direction")} onToggle={toggle}>
            <ColorCard tone="cyan">
              <div className="flex gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-yellow-200" />
                <div>
                  <p className="font-display text-base font-bold text-cyan-100">Ringkasan intisari</p>
                  <p className="mt-1 font-body text-sm leading-relaxed text-cyan-50/85">
                    Fungsi eksponen dengan basis lebih besar dari <InlineMath math="1" /> bergerak naik, sedangkan basis di antara <InlineMath math="0" /> dan <InlineMath math="1" /> bergerak turun. Karena itu, tanda pertidaksamaan <strong>tetap</strong> untuk <InlineMath math="a>1" />, tetapi <strong>berbalik</strong> untuk <InlineMath math="0<a<1" />.
                  </p>
                </div>
              </div>
              <Formula tone="cyan">{"\\begin{aligned} a>1 &:&& a^{f(x)}>a^{g(x)}\\Longleftrightarrow f(x)>g(x) \\\\ 0<a<1 &:&& a^{f(x)}>a^{g(x)}\\Longleftrightarrow f(x)<g(x) \\end{aligned}"}</Formula>
              <blockquote className="rounded-xl border-l-4 border-yellow-300 bg-yellow-300/10 px-4 py-3 font-body text-sm leading-relaxed text-yellow-50">
                <strong>Tips:</strong> sebelum mengerjakan, tulis dulu apakah basisnya lebih besar dari <InlineMath math="1" /> atau berada di antara <InlineMath math="0" /> dan <InlineMath math="1" />. Langkah kecil ini mencegah tanda tertukar.
              </blockquote>
            </ColorCard>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => { playPopSound(); setBase(2); }} className={`rounded-xl px-3 py-2 font-body text-xs font-bold transition ${base > 1 ? "bg-cyan-300/25 text-cyan-100" : "bg-white/10 text-white/60"}`}>Basis 2 · naik</button>
                  <button type="button" onClick={() => { playPopSound(); setBase(0.5); }} className={`rounded-xl px-3 py-2 font-body text-xs font-bold transition ${base < 1 ? "bg-pink-300/25 text-pink-100" : "bg-white/10 text-white/60"}`}>Basis ½ · turun</button>
                </div>
                <ExponentialGraph base={base} />
              </div>
              <ColorCard tone="blue">
                <p className="font-display text-base font-bold text-blue-100">Tabel keputusan cepat</p>
                <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full min-w-[380px] text-left font-body text-xs">
                    <thead className="bg-slate-950/45 text-blue-100"><tr><th className="px-3 py-3">Syarat basis</th><th className="px-3 py-3">Jika ruas kiri &gt; kanan</th><th className="px-3 py-3">Arah</th></tr></thead>
                    <tbody className="text-white/75">
                      <tr className="border-t border-white/10"><td className="px-3 py-3"><InlineMath math="a>1" /></td><td className="px-3 py-3"><InlineMath math="a^{f(x)}>a^{g(x)}" /></td><td className="px-3 py-3 font-bold text-emerald-200"><InlineMath math="f(x)>g(x)" /></td></tr>
                      <tr className="border-t border-white/10"><td className="px-3 py-3"><InlineMath math="0<a<1" /></td><td className="px-3 py-3"><InlineMath math="a^{f(x)}>a^{g(x)}" /></td><td className="px-3 py-3 font-bold text-rose-200"><InlineMath math="f(x)<g(x)" /></td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">Untuk tanda <InlineMath math="<,\ \le,\ \ge" />, alurnya sama. Hanya simbol akhirnya yang mengikuti aturan basis.</p>
              </ColorCard>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} difficulty="Mudah" tone="emerald" question={<>Tentukan penyelesaian dari <InlineMath math="2^{x+1}>8" />.</>}>
                <p>Karena <InlineMath math="2>1" />, tanda tidak berubah. Ubah <InlineMath math="8=2^3" />:</p>
                <Formula tone="emerald">{"2^{x+1}>2^3\\Rightarrow x+1>3\\Rightarrow x>2"}</Formula>
                <p className="text-emerald-100"><strong>Jawaban:</strong> <InlineMath math="x>2" />.</p>
              </ExampleCard>
              <ExampleCard number={2} difficulty="Sedang" tone="blue" question={<>Selesaikan <InlineMath math="\left(\frac14\right)^{x-2}<\left(\frac14\right)^3" />.</>}>
                <p>Basis <InlineMath math="\frac14" /> berada di antara <InlineMath math="0" /> dan <InlineMath math="1" />, jadi tanda berbalik:</p>
                <Formula tone="blue">{"x-2>3\\Rightarrow x>5"}</Formula>
                <p className="text-blue-100"><strong>Jawaban:</strong> <InlineMath math="x>5" />.</p>
              </ExampleCard>
              <ExampleCard number={3} difficulty="Sulit" tone="violet" question={<>Tentukan himpunan penyelesaian <InlineMath math="9^{x-1}>27^{x-2}" />.</>}>
                <p>Ubah ke basis <InlineMath math="3" />: <InlineMath math="9=3^2" /> dan <InlineMath math="27=3^3" />.</p>
                <Formula tone="violet">{"3^{2x-2}>3^{3x-6}\\Rightarrow2x-2>3x-6\\Rightarrow x<4"}</Formula>
                <p className="text-violet-100"><strong>Jawaban:</strong> <InlineMath math="x<4" />.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="quadratic" title="Bentuk II · ubah menjadi pertidaksamaan kuadrat" eyebrow="Sub-bab 2 · substitusi dan garis bilangan" icon={<BarChart3 className="h-5 w-5" />} tone="amber" open={expanded.includes("quadratic")} onToggle={toggle}>
            <ColorCard tone="amber">
              <p className="font-display text-base font-bold text-amber-100">Ringkasan intisari</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-amber-50/85">
                Saat bentuk <InlineMath math="a^{2f(x)}" /> dan <InlineMath math="a^{f(x)}" /> muncul bersama, jadikan pangkat itu variabel baru. Misalkan <InlineMath math="y=a^{f(x)}" /> sehingga <InlineMath math="a^{2f(x)}=y^2" />. Ingat: karena <InlineMath math="a^{f(x)}>0" />, nilai <InlineMath math="y" /> wajib positif.
              </p>
              <Formula tone="amber">{"p\\left(a^{f(x)}\\right)^2+q\\,a^{f(x)}+r\\gtreqless0\\quad\\xrightarrow{\\ y=a^{f(x)}>0\\ }\\quad py^2+qy+r\\gtreqless0"}</Formula>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-slate-950/25 p-3 text-sm text-white/75"><strong className="text-amber-100">1. Substitusi:</strong> tetapkan <InlineMath math="y=a^{f(x)}" />.</div>
                <div className="rounded-xl border border-white/10 bg-slate-950/25 p-3 text-sm text-white/75"><strong className="text-amber-100">2. Cari interval y:</strong> gunakan faktorisasi atau rumus kuadrat.</div>
                <div className="rounded-xl border border-white/10 bg-slate-950/25 p-3 text-sm text-white/75"><strong className="text-amber-100">3. Kembali ke x:</strong> terjemahkan <InlineMath math="y" /> dengan syarat <InlineMath math="y>0" />.</div>
              </div>
              <blockquote className="mt-4 rounded-xl border-l-4 border-rose-300 bg-rose-300/10 px-4 py-3 font-body text-sm leading-relaxed text-rose-50">
                <TriangleAlert className="mr-2 inline h-4 w-4 align-text-bottom" /> <strong>Catatan penting:</strong> akar substitusi yang nol atau negatif langsung ditolak karena bentuk eksponen selalu bernilai positif.
              </blockquote>
            </ColorCard>
            <SignChart />
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} difficulty="Mudah" tone="emerald" question={<>Selesaikan <InlineMath math="3^{2x}-10\cdot3^x+9\le0" />.</>}>
                <p>Misalkan <InlineMath math="y=3^x>0" />. Maka:</p>
                <Formula tone="emerald">{"y^2-10y+9\\le0\\Rightarrow(y-1)(y-9)\\le0\\Rightarrow1\\le y\\le9"}</Formula>
                <p>Kembalikan ke basis <InlineMath math="3" />: <InlineMath math="3^0\le3^x\le3^2" />, sehingga <strong className="text-emerald-100"><InlineMath math="0\le x\le2" /></strong>.</p>
              </ExampleCard>
              <ExampleCard number={2} difficulty="Sedang" tone="blue" question={<>Tentukan penyelesaian <InlineMath math="2^{2x}-5\cdot2^x+6>0" />.</>}>
                <p>Ambil <InlineMath math="y=2^x>0" />:</p>
                <Formula tone="blue">{"y^2-5y+6>0\\Rightarrow(y-2)(y-3)>0\\Rightarrow y<2\\text{ atau }y>3"}</Formula>
                <p>Karena <InlineMath math="2^x<2^1" /> atau <InlineMath math="2^x>3" />, diperoleh <strong className="text-blue-100"><InlineMath math="x<1" /> atau <InlineMath math="x>\log_2 3" /></strong>.</p>
              </ExampleCard>
              <ExampleCard number={3} difficulty="Sulit" tone="rose" question={<>Selesaikan <InlineMath math="4^x-5\cdot2^x+4\ge0" />.</>}>
                <p>Ubah <InlineMath math="4^x=(2^x)^2" />, lalu misalkan <InlineMath math="y=2^x>0" />:</p>
                <Formula tone="rose">{"y^2-5y+4\\ge0\\Rightarrow(y-1)(y-4)\\ge0\\Rightarrow y\\le1\\text{ atau }y\\ge4"}</Formula>
                <p>Terjemahkan kembali: <InlineMath math="2^x\le2^0" /> atau <InlineMath math="2^x\ge2^2" />. Jadi <strong className="text-rose-100"><InlineMath math="x\le0" /> atau <InlineMath math="x\ge2" /></strong>.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="summary" title="Peta konsep dan jebakan umum" eyebrow="Penutup · bekal mengajar" icon={<BookOpen className="h-5 w-5" />} tone="violet" open={expanded.includes("summary")} onToggle={toggle}>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[720px] text-left font-body text-sm">
                <thead className="bg-slate-950/60 text-cyan-100"><tr><th className="px-4 py-3">Situasi</th><th className="px-4 py-3">Langkah utama</th><th className="px-4 py-3">Pengingat</th></tr></thead>
                <tbody className="text-white/75">
                  {[
                    ["Basis naik", "$a>1$", "Tanda tetap"],
                    ["Basis turun", "$0<a<1$", "Tanda berbalik"],
                    ["Bentuk kuadrat", "$y=a^{f(x)}$", "Wajib cek y>0"],
                    ["Dua akar", "$(y-y_1)(y-y_2)$", "Uji interval pada garis bilangan"],
                  ].map(([situation, step, note], index) => (
                    <tr key={situation} className={`border-t border-white/5 ${index % 2 === 0 ? "bg-white/[0.025]" : ""}`}>
                      <td className="px-4 py-3 font-semibold text-white">{situation}</td>
                      <td className="px-4 py-3 text-cyan-100"><InlineMath math={step.slice(1, -1)} /></td>
                      <td className="px-4 py-3">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <ColorCard tone="rose"><p className="font-bold text-rose-100">Jangan lupa membalik tanda</p><p className="mt-2 text-sm leading-relaxed text-white/70">Khusus untuk <InlineMath math="0<a<1" />, arah perbandingan eksponen berubah.</p></ColorCard>
              <ColorCard tone="amber"><p className="font-bold text-amber-100">Jangan menerima semua akar</p><p className="mt-2 text-sm leading-relaxed text-white/70">Substitusi <InlineMath math="y=a^{f(x)}" /> hanya menerima <InlineMath math="y>0" />.</p></ColorCard>
              <ColorCard tone="emerald"><p className="font-bold text-emerald-100">Selalu cek interval</p><p className="mt-2 text-sm leading-relaxed text-white/70">Untuk pertidaksamaan kuadrat, uji tanda di setiap interval akar sebelum menulis jawaban.</p></ColorCard>
            </div>
            <blockquote className="rounded-2xl border border-cyan-300/25 bg-cyan-300/10 p-4 font-body text-sm leading-relaxed text-cyan-50">
              <strong>Pesan untuk guru:</strong> minta siswa menggambar sketsa naik-turun sebelum memanipulasi simbol. Dengan begitu, aturan “tanda berbalik” dipahami sebagai perilaku fungsi, bukan hafalan terpisah.
            </blockquote>
          </Accordion>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 text-center font-body text-xs text-white/45">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Cek basis</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Balik tanda jika perlu</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Cek y &gt; 0</span>
        </div>
      </main>
    </div>
  );
};

export default SmaPertidaksamaanEksponenPage;