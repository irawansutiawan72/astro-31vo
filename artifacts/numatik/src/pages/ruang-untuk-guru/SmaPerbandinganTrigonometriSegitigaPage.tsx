import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  Target,
} from "lucide-react";
import { BlockMath, InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

type Tone = "cyan" | "emerald" | "amber" | "violet" | "rose" | "blue";

const toneClasses: Record<Tone, string> = {
  cyan: "border-cyan-300/35 bg-cyan-400/10",
  emerald: "border-emerald-300/35 bg-emerald-400/10",
  amber: "border-amber-300/35 bg-amber-400/10",
  violet: "border-violet-300/35 bg-violet-400/10",
  rose: "border-rose-300/35 bg-rose-400/10",
  blue: "border-blue-300/35 bg-blue-400/10",
};

const InlineMath = ({ math }: { math: string }) => <KaTeXInlineMath math={math.replace(/\\\\/g, "\\")} />;

const portraitFormula = (math: string) => {
  const lines = math.split(/\\(?:qquad|quad)/g).flatMap((group) =>
    group.split("\\Longrightarrow").flatMap((part, implicationIndex) => {
      const expression = part.trim();
      if (!expression) return [];

      const equalities = expression.split("=");
      const rows = expression.length > 42 && equalities.length > 2
        ? [`${equalities[0]}=${equalities[1]}`, ...equalities.slice(2).map((item) => `=${item}`)]
        : [expression];

      return rows.map((row, rowIndex) => (
        implicationIndex > 0 && rowIndex === 0 ? `\\Longrightarrow ${row}` : row
      ));
    }),
  );

  return lines.length > 1
    ? `\\begin{gathered}${lines.join("\\\\")}\\end{gathered}`
    : math;
};

const Formula = ({ children }: { children: string }) => (
  <div className="my-3 min-w-0 max-w-full rounded-xl border border-white/10 bg-slate-950/60 px-2 py-2 text-center text-[0.72rem] text-cyan-100 sm:px-4 sm:text-sm [&_.katex-display]:my-1">
    <BlockMath math={portraitFormula(children)} />
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

const Step = ({ number, children }: { number: number; children: ReactNode }) => (
  <li className="flex gap-3">
    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 font-display text-xs font-black text-cyan-100">
      {number}
    </span>
    <span className="min-w-0 leading-relaxed">{children}</span>
  </li>
);

const ExampleCard = ({
  number,
  difficulty,
  tone,
  question,
  children,
}: {
  number: string;
  difficulty: string;
  tone: Tone;
  question: ReactNode;
  children: ReactNode;
}) => (
  <article className={`min-w-0 rounded-2xl border p-4 ${toneClasses[tone]}`}>
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
        Contoh {number}
      </span>
      <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/65">
        {difficulty}
      </span>
    </div>
    <div className="min-w-0 max-w-full rounded-xl border border-white/10 bg-slate-950/55 p-3 font-body text-sm leading-relaxed text-white">
      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/45">Soal</p>
      <code className="whitespace-normal font-body">{question}</code>
    </div>
    <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.045] p-3 font-body text-sm text-white/80">
      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-200">Pembahasan langkah demi langkah</p>
      <ol className="space-y-3">{children}</ol>
    </div>
  </article>
);

const LessonSection = ({
  title,
  eyebrow,
  tone,
  children,
}: {
  title: string;
  eyebrow: string;
  tone: Tone;
  children: ReactNode;
}) => (
  <section className={`overflow-hidden rounded-3xl border shadow-xl shadow-black/15 ${toneClasses[tone]}`}>
    <div className="flex items-center gap-4 px-5 py-5 text-left">
      <span className="flex min-w-0 items-center gap-3">
        <span className="shrink-0 rounded-xl bg-white/10 p-2 text-white"><BookOpen className="h-5 w-5" /></span>
        <span>
          <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{eyebrow}</span>
          <h2 className="font-display text-base font-bold text-white md:text-lg">{title}</h2>
        </span>
      </span>
    </div>
    <div className="space-y-4 px-4 pb-5 sm:px-5 sm:pb-6">{children}</div>
  </section>
);

const TriangleExplorer = () => {
  const [angle, setAngle] = useState(35);
  const radians = (angle * Math.PI) / 180;
  const rightX = 255;
  const baseline = 232;
  const hypotenuseLength = 160;
  const leftX = rightX - hypotenuseLength * Math.cos(radians);
  const baseLength = rightX - leftX;
  const height = hypotenuseLength * Math.sin(radians);
  const topY = baseline - height;
  const arcRadius = 31;
  const arcStartX = rightX - arcRadius;
  const baselineExtensionStart = Math.min(leftX, arcStartX - 8);
  const rightAngleSize = Math.min(12, baseLength * 0.3, height * 0.3);
  const hypotenuseMidX = (leftX + rightX) / 2;
  const hypotenuseMidY = (topY + baseline) / 2;
  const values = [
    ["\\sin\\theta", Math.sin(radians)],
    ["\\cos\\theta", Math.cos(radians)],
    ["\\tan\\theta", Math.tan(radians)],
  ] as const;

  return (
    <div className="grid items-center gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="overflow-hidden rounded-2xl border border-cyan-200/20 bg-[#07152b] p-2 sm:p-4">
        <svg viewBox="0 0 360 290" role="img" aria-label="Segitiga siku-siku interaktif dengan sisi depan, samping, dan miring berwarna berbeda" className="mx-auto block w-full max-w-lg">
          <defs>
            <linearGradient id="triangle-fill" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity=".16" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity=".06" />
            </linearGradient>
            <filter id="triangle-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path d={`M ${leftX} ${baseline} L ${rightX} ${baseline} L ${leftX} ${topY} Z`} fill="url(#triangle-fill)" stroke="#64748b" strokeWidth="1.5" />
          <path d={`M ${leftX} ${baseline} L ${leftX} ${topY}`} fill="none" stroke="#fb7185" strokeWidth="6" strokeLinecap="round" filter="url(#triangle-glow)" />
          <path d={`M ${leftX} ${baseline} L ${rightX} ${baseline}`} fill="none" stroke="#22d3ee" strokeWidth="6" strokeLinecap="round" filter="url(#triangle-glow)" />
          <path d={`M ${rightX} ${baseline} L ${leftX} ${topY}`} fill="none" stroke="#a78bfa" strokeWidth="6" strokeLinecap="round" filter="url(#triangle-glow)" />
          <path d={`M ${leftX} ${baseline - rightAngleSize} L ${leftX + rightAngleSize} ${baseline - rightAngleSize} L ${leftX + rightAngleSize} ${baseline}`} fill="none" stroke="#f8fafc" strokeWidth="2" />
          {baselineExtensionStart < leftX && <line x1={baselineExtensionStart} y1={baseline} x2={leftX} y2={baseline} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" opacity=".55" />}
          <path d={`M ${arcStartX} ${baseline} A ${arcRadius} ${arcRadius} 0 0 1 ${rightX - arcRadius * Math.cos(radians)} ${baseline - arcRadius * Math.sin(radians)}`} fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          <text x={leftX - 46} y={(topY + baseline) / 2} fill="#fda4af" fontSize="13" fontWeight="700" textAnchor="middle" transform={`rotate(-90 ${leftX - 46} ${(topY + baseline) / 2})`}>depan</text>
          <text x={(leftX + rightX) / 2} y={baseline + 24} fill="#67e8f9" fontSize="13" fontWeight="700" textAnchor="middle">samping</text>
          <text x={hypotenuseMidX + 19} y={hypotenuseMidY - 3} fill="#c4b5fd" fontSize="13" fontWeight="700" textAnchor="middle" transform={`rotate(${-angle} ${hypotenuseMidX + 19} ${hypotenuseMidY - 3})`}>miring</text>
          <text x={rightX - 48} y={baseline - 10} fill="#fde68a" fontSize="12" fontWeight="700">sudut</text>
          <g className="trig-mascot" transform="translate(302 49)">
            <circle r="22" fill="#fde68a" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="-7" cy="-2" r="2.1" fill="#713f12" />
            <circle cx="7" cy="-2" r="2.1" fill="#713f12" />
            <path d="M -7 6 Q 0 13 7 6" fill="none" stroke="#713f12" strokeWidth="2" strokeLinecap="round" />
            <path d="M -20 -14 L -25 -19 M 20 -14 L 25 -19" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <text x="0" y="39" fill="#fde68a" fontSize="9" fontWeight="700" textAnchor="middle">Semangat!</text>
          </g>
          <text x="16" y="282" fill="#94a3b8" fontSize="10">Geser pengatur sudut untuk melihat bentuk segitiga berubah.</text>
        </svg>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-amber-200/20 bg-amber-300/10 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <label htmlFor="trig-angle" className="font-body text-sm font-bold text-amber-100">Sudut yang dijelajahi</label>
            <span className="rounded-full bg-amber-200/15 px-3 py-1 font-display text-sm font-black text-amber-100"><InlineMath math={`\\theta=${angle}^\\circ`} /></span>
          </div>
          <input
            id="trig-angle"
            type="range"
            min="20"
            max="89"
            step="1"
            value={angle}
            onChange={(event) => setAngle(Number(event.target.value))}
            aria-label="Atur besar sudut segitiga dari 20 sampai 89 derajat"
            aria-valuetext={`${angle} derajat`}
            className="w-full accent-amber-300"
          />
          <div className="mt-1 flex justify-between font-body text-[10px] text-amber-50/60"><span><InlineMath math="20^\\circ" /></span><span><InlineMath math="89^\\circ" /></span></div>
        </div>
        <div className="grid gap-2">
          {values.map(([math, value], index) => {
            const colors = ["text-rose-200", "text-cyan-200", "text-violet-200"];
            return (
              <div key={math} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2.5">
                <span className={colors[index]}><InlineMath math={math.replaceAll("\\theta", `(${angle}^\\circ)`)} /></span>
                <span className="font-mono text-sm font-bold text-white">{value.toFixed(3)}</span>
              </div>
            );
          })}
        </div>
        <p className="font-body text-xs leading-relaxed text-white/60">Panjang gambar ikut berubah, tetapi setiap warna tetap menunjukkan peran sisi terhadap sudut yang dipilih.</p>
      </div>
      <style>{`
        @keyframes trig-mascot-bob {
          0%, 100% { transform: translate(302px, 49px) rotate(-3deg); }
          50% { transform: translate(302px, 43px) rotate(3deg); }
        }
        .trig-mascot { transform-box: fill-box; transform-origin: center; animation: trig-mascot-bob 2.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .trig-mascot { animation: none; } }
      `}</style>
    </div>
  );
};

const ContextSketch = () => (
  <div className="overflow-hidden rounded-2xl border border-emerald-200/20 bg-[#07152b] p-3">
    <svg viewBox="0 0 390 185" role="img" aria-label="Ilustrasi pengukuran tinggi gedung dengan sudut elevasi" className="mx-auto block w-full max-w-xl">
      <path d="M 18 157 H 372" stroke="#64748b" strokeWidth="2" />
      <rect x="303" y="43" width="48" height="114" rx="3" fill="#334155" stroke="#67e8f9" strokeWidth="2" />
      <rect x="312" y="56" width="10" height="13" rx="2" fill="#fde68a" />
      <rect x="332" y="56" width="10" height="13" rx="2" fill="#fde68a" />
      <rect x="312" y="81" width="10" height="13" rx="2" fill="#fde68a" />
      <rect x="332" y="81" width="10" height="13" rx="2" fill="#fde68a" />
      <rect x="319" y="125" width="16" height="32" rx="3" fill="#0f172a" />
      <path d="M 74 157 L 303 43" stroke="#fbbf24" strokeWidth="3" strokeDasharray="8 6" />
      <path d="M 74 157 H 303 M 291 43 V 157" stroke="#34d399" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="74" cy="133" r="9" fill="#fb7185" />
      <path d="M 74 142 V 157 M 74 147 L 65 154 M 74 147 L 83 154" stroke="#fb7185" strokeWidth="4" strokeLinecap="round" />
      <path d="M 103 157 A 29 29 0 0 0 99 144" stroke="#fda4af" strokeWidth="3" fill="none" />
      <text x="183" y="174" fill="#a7f3d0" fontSize="12" fontWeight="700" textAnchor="middle">jarak mendatar</text>
      <text x="280" y="106" fill="#a7f3d0" fontSize="12" fontWeight="700" textAnchor="middle" transform="rotate(-90 280 106)">tinggi</text>
      <text x="109" y="140" fill="#fde68a" fontSize="11" fontWeight="700">sudut elevasi</text>
      <text x="327" y="31" fill="#bae6fd" fontSize="11" fontWeight="700" textAnchor="middle">gedung</text>
      <g className="trig-star" transform="translate(185 91)">
        <path d="M 0 -9 L 2.5 -2.5 L 9 0 L 2.5 2.5 L 0 9 L -2.5 2.5 L -9 0 L -2.5 -2.5 Z" fill="#fde68a" />
      </g>
    </svg>
    <style>{`
      @keyframes trig-star-pulse { 0%,100% { opacity: .55; transform: scale(.8); } 50% { opacity: 1; transform: scale(1.25); } }
      .trig-star { transform-box: fill-box; transform-origin: center; animation: trig-star-pulse 1.7s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) { .trig-star { animation: none; } }
    `}</style>
  </div>
);

const SmaPerbandinganTrigonometriSegitigaPage = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#070b23] text-white">
      <Starfield />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.24),_transparent_65%)]" />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri" />

      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-20 pt-16">
        <header className="relative mb-7 overflow-hidden rounded-[2rem] border border-cyan-200/25 bg-gradient-to-br from-cyan-500/20 via-blue-600/15 to-violet-600/20 p-5 text-center shadow-2xl shadow-cyan-950/30 sm:p-8 md:p-10">
          <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-8 h-44 w-44 rounded-full bg-cyan-300/15 blur-3xl" />
          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/35 bg-cyan-200/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">
              <BookOpen className="h-4 w-4" /> Ruang untuk Guru · SMA
            </div>
            <h1 className="font-display text-2xl font-black leading-tight text-cyan-100 drop-shadow-[0_0_18px_rgba(34,211,238,0.35)] sm:text-3xl md:text-5xl">
              PERBANDINGAN TRIGONOMETRI PADA SEGITIGA SIKU-SIKU
            </h1>
            <p className="mt-3 font-body text-sm text-white/65 md:text-base">Buku Animasi Matematika SMA · Trigonometri</p>
            <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-yellow-200/30 bg-yellow-300/10 p-4 text-left shadow-inner shadow-yellow-100/5 sm:p-5">
              <div className="flex gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-yellow-300" />
                <div>
                  <p className="font-display text-base font-bold text-yellow-100">Bayangkan mengukur gedung tanpa memanjatnya.</p>
                  <p className="mt-1 font-body text-sm leading-relaxed text-yellow-50/80">
                    Dengan jarak di tanah dan sudut pandang, kita bisa memperkirakan tinggi. Trigonometri menghubungkan kedua ukuran itu lewat perbandingan sisi segitiga siku-siku.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <ColorCard tone="blue" className="mb-5">
          <div className="mb-3 flex items-center gap-2 font-display font-bold text-blue-100">
            <Target className="h-5 w-5" /> Setelah belajar, siswa diharapkan mampu
          </div>
          <ul className="grid gap-2 font-body text-sm leading-relaxed text-white/75 sm:grid-cols-2">
            <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Menentukan sisi depan, samping, dan miring terhadap sudut acuan.</li>
            <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Menggunakan enam perbandingan trigonometri pada segitiga siku-siku.</li>
            <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Menentukan panjang sisi dengan sudut istimewa maupun rasio dasar.</li>
            <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Memodelkan situasi pengukuran sederhana dengan sinus, cosinus, atau tangen.</li>
          </ul>
        </ColorCard>

        <section className="mb-5 rounded-3xl border border-cyan-200/20 bg-slate-900/65 p-4 shadow-xl shadow-black/15 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-300" />
            <h2 className="font-display text-lg font-bold text-white">Eksplorasi sudut: segitiganya ikut berubah</h2>
          </div>
          <TriangleExplorer />
        </section>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <p className="flex items-center gap-2 font-body text-xs text-white/55">
            <Sparkles className="h-4 w-4 text-yellow-300" /> Empat subbab · contoh bertahap · visual interaktif
          </p>
        </div>

        <div className="space-y-4">
          <LessonSection title="Enam rasio, satu segitiga" eyebrow="Subbab 1 · Pahami peran sisi" tone="cyan">
            <ColorCard tone="cyan">
              <p className="font-body text-sm leading-relaxed text-cyan-50/85">
                Pilih dulu satu <strong className="text-cyan-100">sudut lancip</strong> sebagai acuan. Sisi yang berhadapan dengan sudut itu disebut sisi depan, sisi yang menempel pada sudut (selain sisi miring) disebut sisi samping, dan sisi di depan sudut siku-siku adalah sisi miring.
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {[
                  ["Sinus", "\\sin\\theta=\\frac{\\text{sisi depan}}{\\text{sisi miring}}", "perbandingan sisi depan dengan sisi miring"],
                  ["Cosinus", "\\cos\\theta=\\frac{\\text{sisi samping}}{\\text{sisi miring}}", "perbandingan sisi samping dengan sisi miring"],
                  ["Tangen", "\\tan\\theta=\\frac{\\text{sisi depan}}{\\text{sisi samping}}", "perbandingan sisi depan dengan sisi samping"],
                  ["Cosecan", "\\operatorname{cosec}\\theta=\\frac{\\text{sisi miring}}{\\text{sisi depan}}", "kebalikan sinus"],
                  ["Secan", "\\sec\\theta=\\frac{\\text{sisi miring}}{\\text{sisi samping}}", "kebalikan cosinus"],
                  ["Cotan", "\\operatorname{cotan}\\theta=\\frac{\\text{sisi samping}}{\\text{sisi depan}}", "kebalikan tangen"],
                ].map(([name, formula, note]) => (
                  <div key={name} className="rounded-xl border border-white/10 bg-slate-950/45 p-3">
                    <p className="text-xs font-bold text-cyan-100">{name}</p>
                    <div className="my-1 min-w-0 max-w-full text-sm text-white"><InlineMath math={formula} /></div>
                    <p className="text-[11px] text-white/50">{note}</p>
                  </div>
                ))}
              </div>
              <blockquote className="mt-4 rounded-xl border-l-4 border-amber-300 bg-amber-300/10 px-4 py-3 font-body text-sm leading-relaxed text-amber-50/85">
                <strong className="text-amber-200">Tips:</strong> hafalkan urutan <strong>S-O-H / C-A-H / T-O-A</strong> sebagai pengingat sinus, cosinus, dan tangen. Label sisi depan dan samping bergantung pada sudut acuan; sisi miring selalu berhadapan dengan sudut siku-siku.
              </blockquote>
            </ColorCard>

            <div className="grid gap-4 lg:grid-cols-2">
              <ExampleCard number="1" difficulty="Mudah" tone="cyan" question={<>Segitiga <InlineMath math="KLM" /> siku-siku di <InlineMath math="L" />. Terhadap sudut <InlineMath math="K" />, panjang sisi depan <InlineMath math="LM=6\\text{ cm}" />, sisi samping <InlineMath math="KL=8\\text{ cm}" />, dan sisi miring <InlineMath math="KM=10\\text{ cm}" />. Tentukan keenam perbandingan trigonometri.</>}>
                <Step number={1}>Cocokkan letak sisi dengan sudut acuan <InlineMath math="K" />: depan <InlineMath math="6" />, samping <InlineMath math="8" />, miring <InlineMath math="10" />.</Step>
                <Step number={2}>Hitung rasio dasar dan sederhanakan pecahannya.</Step>
                <Step number={3}><Formula>{"\\sin K=\\frac{6}{10}=\\frac35,\\quad \\cos K=\\frac{8}{10}=\\frac45,\\quad \\tan K=\\frac68=\\frac34"}</Formula></Step>
                <Step number={4}>Balik masing-masing rasio untuk memperoleh tiga rasio lainnya.</Step>
                <Step number={5}><Formula>{"\\operatorname{cosec}K=\\frac53,\\quad \\sec K=\\frac54,\\quad \\operatorname{cotan}K=\\frac43"}</Formula></Step>
              </ExampleCard>

              <ExampleCard number="2" difficulty="Sedang" tone="violet" question={<>Segitiga <InlineMath math="PQR" /> siku-siku di <InlineMath math="Q" />. Diketahui <InlineMath math="QR=5\\text{ cm}" /> dan sisi miring <InlineMath math="PR=13\\text{ cm}" />. Tentukan keenam rasio terhadap sudut <InlineMath math="P" />.</>}>
                <Step number={1}>Sisi <InlineMath math="QR" /> berada di depan sudut <InlineMath math="P" />. Cari sisi samping <InlineMath math="PQ" /> memakai Teorema Pythagoras.</Step>
                <Step number={2}><Formula>{"PQ=\\sqrt{PR^2-QR^2}=\\sqrt{13^2-5^2}=\\sqrt{144}=12\\text{ cm}"}</Formula></Step>
                <Step number={3}>Terhadap sudut <InlineMath math="P" />, sisi depan <InlineMath math="5" />, samping <InlineMath math="12" />, dan miring <InlineMath math="13" />.</Step>
                <Step number={4}><Formula>{"\\sin P=\\frac5{13},\\quad \\cos P=\\frac{12}{13},\\quad \\tan P=\\frac5{12}"}</Formula></Step>
                <Step number={5}><Formula>{"\\operatorname{cosec}P=\\frac{13}{5},\\quad \\sec P=\\frac{13}{12},\\quad \\operatorname{cotan}P=\\frac{12}{5}"}</Formula></Step>
              </ExampleCard>

              <ExampleCard number="3" difficulty="Tantangan" tone="rose" question={<>Untuk sudut lancip <InlineMath math="\\theta" />, diketahui <InlineMath math="\\sin\\theta=\\frac7{25}" />. Tentukan lima rasio trigonometri lainnya.</>}>
                <Step number={1}>Sinus memberi perbandingan sisi depan terhadap sisi miring. Gunakan sisi depan <InlineMath math="7" /> dan sisi miring <InlineMath math="25" />.</Step>
                <Step number={2}>Cari sisi samping dengan Pythagoras.</Step>
                <Step number={3}><Formula>{"\\text{sisi samping}=\\sqrt{25^2-7^2}=\\sqrt{576}=24"}</Formula></Step>
                <Step number={4}>Substitusikan ketiga panjang sisi ke definisi rasio.</Step>
                <Step number={5}><Formula>{"\\cos\\theta=\\frac{24}{25},\\quad \\tan\\theta=\\frac7{24},\\quad \\operatorname{cosec}\\theta=\\frac{25}{7},\\quad \\sec\\theta=\\frac{25}{24},\\quad \\operatorname{cotan}\\theta=\\frac{24}{7}"}</Formula></Step>
              </ExampleCard>
            </div>
          </LessonSection>

          <LessonSection title="Mencari panjang sisi yang belum diketahui" eyebrow="Subbab 2 · Pilih rasio yang tepat" tone="emerald">
            <ColorCard tone="emerald">
              <p className="font-body text-sm leading-relaxed text-emerald-50/85">
                Pilih rasio yang memuat <strong className="text-emerald-100">sudut acuan</strong>, panjang yang sudah diketahui, dan panjang yang dicari. Kalau dua sisi diketahui, Teorema Pythagoras juga bisa membantu menemukan sisi ketiga.
              </p>
              <Formula>{"\\sin\\theta=\\frac{\\text{depan}}{\\text{miring}},\\qquad \\cos\\theta=\\frac{\\text{samping}}{\\text{miring}},\\qquad \\tan\\theta=\\frac{\\text{depan}}{\\text{samping}}"}</Formula>
            </ColorCard>
            <div className="grid gap-4 lg:grid-cols-2">
              <ExampleCard number="1" difficulty="Mudah" tone="emerald" question={<>Sebuah segitiga siku-siku memiliki sisi miring <InlineMath math="14\\text{ cm}" /> dan sudut acuan <InlineMath math="30^\\circ" />. Tentukan sisi di depan sudut itu.</>}>
                <Step number={1}>Sisi yang diketahui adalah sisi miring, sedangkan yang dicari adalah sisi depan. Gunakan sinus.</Step>
                <Step number={2}><Formula>{"\\sin30^\\circ=\\frac{\\text{depan}}{14}=\\frac12"}</Formula></Step>
                <Step number={3}>Kalikan kedua ruas dengan <InlineMath math="14" />.</Step>
                <Step number={4}><Formula>{"\\text{depan}=14\\times\\frac12=7\\text{ cm}"}</Formula></Step>
              </ExampleCard>

              <ExampleCard number="2" difficulty="Sedang" tone="blue" question={<>Sudut sebuah segitiga siku-siku adalah <InlineMath math="60^\\circ" />. Sisi samping sudut itu panjangnya <InlineMath math="8\\text{ cm}" />. Tentukan sisi depan dan sisi miring.</>}>
                <Step number={1}>Sisi samping dan sisi depan berpasangan dalam tangen.</Step>
                <Step number={2}><Formula>{"\\tan60^\\circ=\\frac{\\text{depan}}8=\\sqrt3\\quad\\Longrightarrow\\quad \\text{depan}=8\\sqrt3\\text{ cm}"}</Formula></Step>
                <Step number={3}>Gunakan cosinus untuk mencari sisi miring.</Step>
                <Step number={4}><Formula>{"\\cos60^\\circ=\\frac8{\\text{miring}}=\\frac12\\quad\\Longrightarrow\\quad \\text{miring}=16\\text{ cm}"}</Formula></Step>
                <Step number={5}>Pemeriksaan, sesuai Pythagoras:<Formula>{"(8\\sqrt3)^2+8^2=192+64=256=16^2"}</Formula></Step>
              </ExampleCard>

              <ExampleCard number="3" difficulty="Tantangan" tone="violet" question={<>Sebuah tangga membentuk sudut <InlineMath math="45^\\circ" /> dengan lantai. Jarak kaki tangga dari dinding adalah <InlineMath math="5\\sqrt2\\text{ m}" />. Tentukan tinggi ujung tangga pada dinding dan panjang tangganya.</>}>
                <Step number={1}>Jarak mendatar menjadi sisi samping. Tinggi dinding adalah sisi depan, sedangkan tangga adalah sisi miring.</Step>
                <Step number={2}>Cari tinggi dengan tangen.</Step>
                <Step number={3}><Formula>{"\\tan45^\\circ=\\frac{\\text{tinggi}}{5\\sqrt2}=1\\quad\\Longrightarrow\\quad \\text{tinggi}=5\\sqrt2\\text{ m}"}</Formula></Step>
                <Step number={4}>Cari panjang tangga menggunakan cosinus.</Step>
                <Step number={5}><Formula>{"\\cos45^\\circ=\\frac{5\\sqrt2}{\\text{tangga}}=\\frac{\\sqrt2}{2}\\quad\\Longrightarrow\\quad \\text{tangga}=10\\text{ m}"}</Formula></Step>
                <Step number={6}>Pemeriksaan:<Formula>{"(5\\sqrt2)^2+(5\\sqrt2)^2=100=10^2"}</Formula></Step>
              </ExampleCard>
            </div>
          </LessonSection>

          <LessonSection title="Sudut istimewa tanpa kalkulator" eyebrow="Subbab 3 · Kenali pola segitiganya" tone="amber">
            <ColorCard tone="amber">
              <p className="font-body text-sm leading-relaxed text-amber-50/85">
                Nilai untuk sudut tertentu bisa diturunkan dari dua bentuk segitiga: segitiga sama sisi yang dibelah dua, serta segitiga siku-siku sama kaki. Tabel ini cukup untuk nilai sinus, cosinus, dan tangen.
              </p>
              <div className="mt-3 space-y-2 rounded-xl border border-white/10 p-2 sm:hidden">
                {[
                  ["30^\\circ", "\\frac12", "\\frac{\\sqrt3}{2}", "\\frac{\\sqrt3}{3}"],
                  ["45^\\circ", "\\frac{\\sqrt2}{2}", "\\frac{\\sqrt2}{2}", "1"],
                  ["60^\\circ", "\\frac{\\sqrt3}{2}", "\\frac12", "\\sqrt3"],
                ].map(([angle, sine, cosine, tangent]) => (
                  <div key={angle} className="rounded-xl bg-white/[0.04] p-3">
                    <h3 className="font-display text-sm font-bold text-amber-100"><InlineMath math={angle} /></h3>
                    <dl className="mt-2 grid grid-cols-3 gap-2 text-center">
                      {[
                        ["sin", sine],
                        ["cos", cosine],
                        ["tan", tangent],
                      ].map(([name, value]) => (
                        <div key={name} className="min-w-0 rounded-lg bg-slate-950/45 px-1.5 py-2">
                          <dt className="text-[10px] font-bold text-white/55">{name}</dt>
                          <dd className="mt-1 text-xs text-white"><InlineMath math={value} /></dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
              <div className="mt-3 hidden rounded-xl border border-white/10 sm:block">
                <table className="w-full table-fixed border-collapse text-center font-body text-sm">
                  <thead className="bg-amber-200/10 text-amber-100">
                    <tr>
                      <th className="p-3 text-left">Sudut</th>
                      <th className="p-3"><InlineMath math="\\sin" /></th>
                      <th className="p-3"><InlineMath math="\\cos" /></th>
                      <th className="p-3"><InlineMath math="\\tan" /></th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-t border-white/10"><th className="p-3 text-left font-semibold"><InlineMath math="30^\\circ" /></th><td className="p-3"><InlineMath math="\\frac12" /></td><td className="p-3"><InlineMath math="\\frac{\\sqrt3}{2}" /></td><td className="p-3"><InlineMath math="\\frac{\\sqrt3}{3}" /></td></tr>
                    <tr className="border-t border-white/10 bg-white/[0.035]"><th className="p-3 text-left font-semibold"><InlineMath math="45^\\circ" /></th><td className="p-3"><InlineMath math="\\frac{\\sqrt2}{2}" /></td><td className="p-3"><InlineMath math="\\frac{\\sqrt2}{2}" /></td><td className="p-3"><InlineMath math="1" /></td></tr>
                    <tr className="border-t border-white/10"><th className="p-3 text-left font-semibold"><InlineMath math="60^\\circ" /></th><td className="p-3"><InlineMath math="\\frac{\\sqrt3}{2}" /></td><td className="p-3"><InlineMath math="\\frac12" /></td><td className="p-3"><InlineMath math="\\sqrt3" /></td></tr>
                  </tbody>
                </table>
              </div>
              <blockquote className="mt-4 rounded-xl border-l-4 border-amber-300 bg-amber-300/10 px-4 py-3 font-body text-sm leading-relaxed text-amber-50/85">
                <strong className="text-amber-200">Catatan:</strong> nilai <InlineMath math="\\operatorname{cosec}" />, <InlineMath math="\\sec" />, dan <InlineMath math="\\operatorname{cotan}" /> untuk sudut-sudut ini diperoleh dengan membalik nilai <InlineMath math="\\sin" />, <InlineMath math="\\cos" />, dan <InlineMath math="\\tan" /> yang bersesuaian.
              </blockquote>
            </ColorCard>
            <div className="grid gap-4 lg:grid-cols-2">
              <ExampleCard number="1" difficulty="Mudah" tone="amber" question={<>Segitiga siku-siku memiliki sisi miring <InlineMath math="12\\text{ cm}" /> dan sudut <InlineMath math="30^\\circ" />. Tentukan sisi depan dan sisi samping sudut tersebut.</>}>
                <Step number={1}>Dari tabel, <InlineMath math="\\sin30^\\circ=\\frac12" />. Maka sisi depan adalah setengah sisi miring.</Step>
                <Step number={2}><Formula>{"\\text{depan}=12\\times\\frac12=6\\text{ cm}"}</Formula></Step>
                <Step number={3}>Dari tabel, <InlineMath math="\\cos30^\\circ=\\frac{\\sqrt3}{2}" />. Gunakan sisi miring untuk memperoleh sisi samping.</Step>
                <Step number={4}><Formula>{"\\text{samping}=12\\times\\frac{\\sqrt3}{2}=6\\sqrt3\\text{ cm}"}</Formula></Step>
              </ExampleCard>

              <ExampleCard number="2" difficulty="Sedang" tone="rose" question={<>Segitiga siku-siku sama kaki mempunyai dua sisi siku-siku yang masing-masing panjangnya <InlineMath math="9\\text{ cm}" />. Tentukan sisi miring dan nilai <InlineMath math="\\sin" /> serta <InlineMath math="\\cos" /> salah satu sudut lancipnya.</>}>
                <Step number={1}>Dua sudut lancipnya sama besar. Karena jumlahnya <InlineMath math="90^\\circ" />, masing-masing sudut adalah <InlineMath math="45^\\circ" />.</Step>
                <Step number={2}>Gunakan Pythagoras untuk memperoleh sisi miring.</Step>
                <Step number={3}><Formula>{"\\text{miring}=\\sqrt{9^2+9^2}=\\sqrt{162}=9\\sqrt2\\text{ cm}"}</Formula></Step>
                <Step number={4}>Karena kedua kaki sama panjang, nilai sinus dan cosinusnya juga sama.</Step>
                <Step number={5}><Formula>{"\\sin45^\\circ=\\cos45^\\circ=\\frac9{9\\sqrt2}=\\frac{\\sqrt2}{2}"}</Formula></Step>
              </ExampleCard>

              <ExampleCard number="3" difficulty="Tantangan" tone="violet" question={<>Tentukan nilai <InlineMath math="2\\sin30^\\circ+\\cos60^\\circ+\\tan45^\\circ" /> tanpa kalkulator.</>}>
                <Step number={1}>Ambil nilai sudut-sudut tersebut dari tabel: <InlineMath math="\\sin30^\\circ=\\frac12" />, <InlineMath math="\\cos60^\\circ=\\frac12" />, dan <InlineMath math="\\tan45^\\circ=1" />.</Step>
                <Step number={2}>Substitusikan semuanya ke dalam bentuk yang ditanyakan.</Step>
                <Step number={3}><Formula>{"2\\left(\\frac12\\right)+\\frac12+1=1+\\frac12+1=\\frac52"}</Formula></Step>
                <Step number={4}>Jadi, hasil akhirnya adalah <InlineMath math="\\frac52" />.</Step>
              </ExampleCard>
            </div>
          </LessonSection>

          <LessonSection title="Mengukur tinggi dan jarak di sekitar kita" eyebrow="Subbab 4 · Buat model, lalu hitung" tone="rose">
            <ColorCard tone="rose">
              <p className="font-body text-sm leading-relaxed text-rose-50/85">
                Sudut elevasi adalah sudut pandang ke atas dari garis mendatar; sudut depresi adalah sudut pandang ke bawah. Gambar situasi sebagai segitiga siku-siku, tentukan sudut acuan, lalu tandai jarak mendatar, tinggi, dan garis pandang.
              </p>
              <div className="mt-4"><ContextSketch /></div>
              <div className="mt-3 rounded-xl border border-white/10 bg-slate-950/45 p-3">
                <p className="font-body text-xs font-bold text-rose-100">Model yang sering dipakai</p>
                <Formula>{"\\tan\\theta=\\frac{\\text{tinggi}}{\\text{jarak mendatar}}"}</Formula>
                <p className="font-body text-xs leading-relaxed text-white/55">Model ini cocok saat tinggi dan jarak mendatar diketahui atau dicari. Bila garis pandang diketahui, pertimbangkan sinus atau cosinus.</p>
              </div>
            </ColorCard>

            <div className="grid gap-4 lg:grid-cols-2">
              <ExampleCard number="1" difficulty="Mudah" tone="rose" question={<>Benang layang-layang sepanjang <InlineMath math="20\\text{ m}" /> membentuk sudut <InlineMath math="30^\\circ" /> terhadap tanah. Abaikan tinggi tangan. Seberapa tinggi layang-layang dari tanah, dan seberapa jauh jaraknya secara mendatar?</>}>
                <Step number={1}>Benang adalah sisi miring. Ketinggian merupakan sisi depan, dan jarak di tanah merupakan sisi samping.</Step>
                <Step number={2}>Gunakan sinus untuk ketinggian.</Step>
                <Step number={3}><Formula>{"\\sin30^\\circ=\\frac{\\text{tinggi}}{20}=\\frac12\\quad\\Longrightarrow\\quad \\text{tinggi}=10\\text{ m}"}</Formula></Step>
                <Step number={4}>Gunakan cosinus untuk jarak mendatar.</Step>
                <Step number={5}><Formula>{"\\cos30^\\circ=\\frac{\\text{jarak}}{20}=\\frac{\\sqrt3}{2}\\quad\\Longrightarrow\\quad \\text{jarak}=10\\sqrt3\\text{ m}"}</Formula></Step>
              </ExampleCard>

              <ExampleCard number="2" difficulty="Sedang" tone="blue" question={<>Dari titik di tanah yang berjarak <InlineMath math="24\\text{ m}" /> dari kaki gedung, sudut elevasi ke puncak gedung adalah <InlineMath math="45^\\circ" />. Berapa tinggi gedung dari tinggi mata pengamat?</>}>
                <Step number={1}>Jarak mendatar adalah sisi samping dan tinggi gedung di atas mata pengamat adalah sisi depan.</Step>
                <Step number={2}>Tangen menghubungkan kedua sisi tersebut.</Step>
                <Step number={3}><Formula>{"\\tan45^\\circ=\\frac{\\text{tinggi}}{24}=1"}</Formula></Step>
                <Step number={4}><Formula>{"\\text{tinggi}=24\\text{ m}"}</Formula></Step>
                <Step number={5}>Tinggi <InlineMath math="24\\text{ m}" /> ini diukur dari posisi mata. Jika tinggi mata dari tanah diketahui, tambahkan untuk memperoleh tinggi gedung dari tanah.</Step>
              </ExampleCard>

              <ExampleCard number="3" difficulty="Tantangan" tone="violet" question={<>Dari suatu titik, sudut elevasi ke puncak menara adalah <InlineMath math="30^\\circ" />. Setelah bergerak <InlineMath math="20\\text{ m}" /> mendekati menara, sudutnya menjadi <InlineMath math="45^\\circ" />. Tentukan tinggi menara dan jarak titik awal ke kaki menara. Anggap kedua pengukuran dilakukan pada ketinggian mata yang sama.</>}>
                <Step number={1}>Misalkan jarak awal <InlineMath math="x\\text{ m}" /> dan tinggi menara di atas mata pengamat <InlineMath math="h\\text{ m}" />. Dari posisi pertama, <InlineMath math="\\tan30^\\circ=\\frac{h}{x}" />.</Step>
                <Step number={2}>Dari posisi kedua, jaraknya <InlineMath math="(x-20)\\text{ m}" /> dan <InlineMath math="\\tan45^\\circ=\\frac{h}{x-20}=1" />, sehingga <InlineMath math="h=x-20" />.</Step>
                <Step number={3}>Samakan kedua bentuk tinggi: <InlineMath math="\\frac{x}{\\sqrt3}=x-20" />.</Step>
                <Step number={4}><Formula>{"x=\\frac{60}{3-\\sqrt3}=10(3+\\sqrt3)\\text{ m}\\approx47{,}3\\text{ m}"}</Formula></Step>
                <Step number={5}>Masukkan nilai <InlineMath math="x" /> ke <InlineMath math="h=x-20" />.</Step>
                <Step number={6}><Formula>{"h=10(1+\\sqrt3)\\text{ m}\\approx27{,}3\\text{ m}"}</Formula></Step>
                <Step number={7}>Jadi jarak awal sekitar <InlineMath math="47{,}3\\text{ m}" /> dan tinggi menara di atas mata pengamat sekitar <InlineMath math="27{,}3\\text{ m}" />.</Step>
              </ExampleCard>
            </div>
          </LessonSection>
        </div>

        <ColorCard tone="blue" className="mt-5">
          <div className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
            <div>
              <h2 className="font-display font-bold text-blue-100">Rangkuman · Bekal sebelum lanjut</h2>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100/55">Halaman akhir</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-white/75">
                Tetapkan sudut acuan, kenali tiga sisi, lalu pilih rasio yang memuat ukuran yang diketahui dan yang dicari. Untuk soal cerita, buat sketsa dahulu dan nyatakan apa yang sebenarnya diukur.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl bg-slate-950/45 p-3 text-sm">
                <InlineMath math="\\sin\\theta=\\frac{\\text{depan}}{\\text{miring}}" />
                <InlineMath math="\\cos\\theta=\\frac{\\text{samping}}{\\text{miring}}" />
                <InlineMath math="\\tan\\theta=\\frac{\\text{depan}}{\\text{samping}}" />
                <ArrowRight className="h-4 w-4 text-cyan-300" />
                <span className="font-body text-xs text-white/65">rasio kebalikannya menghasilkan cosecan, secan, dan cotan.</span>
              </div>
              <div className="mt-4 rounded-xl border border-amber-200/15 bg-amber-300/[0.08] p-4">
                <h3 className="flex items-center gap-2 font-display text-sm font-bold text-amber-100"><Lightbulb className="h-4 w-4" /> Tips &amp; Trik</h3>
                <ul className="mt-2 space-y-2 font-body text-sm leading-relaxed text-white/75">
                  <li>• Pilih sudut acuan terlebih dahulu; nama sisi depan dan samping bergantung pada sudut itu.</li>
                  <li>• Cocokkan pasangan sisi dengan SOH–CAH–TOA, lalu balik rasionya untuk cosecan, secan, atau cotan.</li>
                  <li>• Periksa jawaban: sisi miring harus paling panjang, satuannya konsisten, dan tinggi pada soal elevasi jelas diukur dari mana.</li>
                </ul>
              </div>
            </div>
          </div>
        </ColorCard>
      </main>
    </div>
  );
};

export default SmaPerbandinganTrigonometriSegitigaPage;