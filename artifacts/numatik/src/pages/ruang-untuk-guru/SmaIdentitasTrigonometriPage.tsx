import { useState, type ReactNode } from "react";
import {
  BookOpen,
  Check,
  CircleHelp,
  Compass,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import { BlockMath, InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

const InlineMath = ({ math }: { math: string }) => (
  <span className="inline-block min-w-0 max-w-full overflow-x-auto align-baseline whitespace-nowrap">
    <KaTeXInlineMath math={math} />
  </span>
);

const Formula = ({ math, label }: { math: string; label?: string }) => (
  <div className="my-3 min-w-0 max-w-full overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/90 px-2.5 py-2.5 text-center text-[13px] leading-relaxed text-cyan-100 sm:px-4 sm:py-3 sm:text-base" data-testid={label ? `formula-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined}>
    {label && <p className="mb-2 whitespace-normal text-left font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/45">{label}</p>}
    <div className="w-max min-w-full"><BlockMath math={math} /></div>
  </div>
);

const Panel = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <section className={`min-w-0 rounded-[1.6rem] border border-white/10 bg-[#121a37]/90 p-4 shadow-xl shadow-indigo-950/20 sm:p-6 ${className}`}>
    {children}
  </section>
);

const Heading = ({ index, title, kicker, icon }: { index: string; title: string; kicker: string; icon: ReactNode }) => (
  <div className="mb-5 flex min-w-0 items-start gap-3">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-200">{icon}</span>
    <div className="min-w-0">
      <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-200/70">Bagian {index} · {kicker}</p>
      <h2 className="font-display text-xl font-extrabold leading-tight text-white sm:text-2xl">{title}</h2>
    </div>
  </div>
);

const Step = ({ n, children }: { n: number; children: ReactNode }) => (
  <li className="flex min-w-0 gap-3">
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 font-display text-[11px] font-black text-cyan-100">{n}</span>
    <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
  </li>
);

type Level = "Mudah" | "Sedang" | "Sulit";
const levelTone: Record<Level, string> = {
  Mudah: "border-emerald-200/20 bg-emerald-200/[.07] text-emerald-100",
  Sedang: "border-cyan-200/20 bg-cyan-200/[.07] text-cyan-100",
  Sulit: "border-rose-200/20 bg-rose-200/[.07] text-rose-100",
};

const Example = ({ level, title, problem, children, id }: { level: Level; title: string; problem: ReactNode; children: ReactNode; id: string }) => (
  <article data-testid={`example-${id}`} className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-[#101b2d]/85">
    <div className="flex min-w-0 flex-wrap items-center gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
      <span className={`rounded-full border px-3 py-1 font-body text-[10px] font-black uppercase tracking-[.16em] ${levelTone[level]}`}>{level}</span>
      <h3 className="min-w-0 font-display text-lg font-extrabold text-white">{title}</h3>
    </div>
    <div className="min-w-0 space-y-3 p-4 sm:p-5">
      <div className="rounded-2xl border border-white/[.07] bg-black/10 p-3 sm:p-4">
        <p className="font-body text-xs font-black uppercase tracking-[.16em] text-slate-400">Tantangan</p>
        {problem}
        <p className="mb-3 font-body text-[10px] font-black uppercase tracking-[.16em] text-amber-200">Langkah penyelesaian</p>
        <ol className="min-w-0 space-y-3 font-body text-sm leading-relaxed text-slate-200">{children}</ol>
      </div>
    </div>
  </article>
);

const TrigExplorer = () => {
  const [angle, setAngle] = useState(35);
  const rad = (angle * Math.PI) / 180;
  const sine = Math.sin(rad);
  const cosine = Math.cos(rad);
  const cx = 150;
  const cy = 130;
  const radius = 86;
  const px = cx + radius * cosine;
  const py = cy - radius * sine;
  const fmt = (n: number) => (Math.abs(n) < 0.0005 ? "0.00" : n.toFixed(2).replace("-", "−"));
  return (
    <div className="grid min-w-0 items-center gap-5 md:grid-cols-[1fr_.85fr]">
      <div className="min-w-0 rounded-2xl border border-cyan-200/15 bg-[#071326]/80 p-2 sm:p-4">
        <svg viewBox="0 0 300 270" role="img" aria-label={`Lingkaran satuan pada sudut ${angle} derajat. Koordinat titik adalah (${fmt(cosine)}, ${fmt(sine)}).`} className="block h-auto w-full" data-testid="visual-identitas-lingkaran">
          <text x="150" y="20" textAnchor="middle" fill="#a5f3fc" fontSize="12" fontWeight="700">LINGKARAN SATUAN</text>
          <circle cx={cx} cy={cy} r={radius} fill="#0a1c31" stroke="#50647e" strokeWidth="2" />
          <line x1="38" y1={cy} x2="266" y2={cy} stroke="#8495a8" strokeWidth="1.4" />
          <line x1={cx} y1="28" x2={cx} y2="235" stroke="#8495a8" strokeWidth="1.4" />
           <motion.line x1={cx} y1={cy} x2={px} y2={py} stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round" transition={{ duration: 0.24, ease: "easeOut" }} />
           <motion.line x1={px} y1={py} x2={px} y2={cy} stroke="#67e8f9" strokeWidth="2.5" strokeDasharray="5 4" transition={{ duration: 0.24, ease: "easeOut" }} />
           <motion.line x1={cx} y1={cy} x2={px} y2={cy} stroke="#c4b5fd" strokeWidth="2.5" strokeDasharray="5 4" transition={{ duration: 0.24, ease: "easeOut" }} />
          <path d={`M ${cx + 28} ${cy} A 28 28 0 ${angle > 180 ? 1 : 0} 0 ${cx + 28 * cosine} ${cy - 28 * sine}`} fill="none" stroke="#fb7185" strokeWidth="2.5" />
           <motion.circle cx={px} cy={py} r="6" fill="#34d399" stroke="#ecfdf5" strokeWidth="2" transition={{ type: "spring", stiffness: 180, damping: 22 }} />
          <circle cx={cx} cy={cy} r="3" fill="#f8fafc" />
          <text x={cx + 6} y={cy + 15} fill="#cbd5e1" fontSize="10">O</text>
          <text x={cx + radius + 7} y={cy - 8} fill="#94a3b8" fontSize="10">x</text>
          <text x={cx + 7} y="35" fill="#94a3b8" fontSize="10">y</text>
          <text x={cx + 22} y={cy + 18} fill="#ddd6fe" fontSize="10">cos θ</text>
          <text x={px + 5} y={Math.max(43, py - 7)} fill="#a5f3fc" fontSize="10">sin θ</text>
          <text x="150" y="250" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="700">{`θ = ${angle}°  ·  (cos θ, sin θ)`}</text>
        </svg>
      </div>
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-amber-200/20 bg-amber-300/[.07] p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="identitas-angle" className="font-body text-sm font-bold text-amber-100">Putar titik pada lingkaran</label>
            <output htmlFor="identitas-angle" data-testid="text-identitas-angle" className="rounded-full bg-amber-200/15 px-3 py-1 font-display text-sm font-black text-amber-100">{angle}°</output>
          </div>
          <input id="identitas-angle" data-testid="input-identitas-angle" type="range" min="0" max="360" step="1" value={angle} onChange={(event) => setAngle(Number(event.target.value))} aria-label="Atur sudut theta dari 0 sampai 360 derajat" aria-valuetext={`${angle} derajat`} className="w-full cursor-pointer accent-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200" />
          <div className="mt-1 flex justify-between text-[10px] text-amber-50/55"><span>0°</span><span>360°</span></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="min-w-0 rounded-xl border border-cyan-200/15 bg-cyan-300/[.07] p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-100/60">cos θ · mendatar</p>
            <p data-testid="text-identitas-cosine" aria-live="polite" className="mt-1 font-display text-xl font-black text-cyan-200">{fmt(cosine)}</p>
          </div>
          <div className="min-w-0 rounded-xl border border-emerald-200/15 bg-emerald-300/[.07] p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-100/60">sin θ · tegak</p>
            <p data-testid="text-identitas-sine" aria-live="polite" className="mt-1 font-display text-xl font-black text-emerald-200">{fmt(sine)}</p>
          </div>
        </div>
        <div className="rounded-xl border border-violet-200/15 bg-violet-300/[.06] p-3 text-center">
          <p className="text-[10px] font-black uppercase tracking-[.15em] text-violet-100/65">Jumlah kuadrat koordinat</p>
          <p data-testid="text-identitas-pythagoras" aria-live="polite" className="mt-1 font-display text-base font-black text-white">{`${fmt(cosine * cosine)} + ${fmt(sine * sine)} = 1.00`}</p>
        </div>
        <p className="font-body text-xs leading-relaxed text-slate-400">Jari-jari lingkaran satuan adalah 1. Titik selalu berkoordinat <InlineMath math="(\cos\theta,\sin\theta)" />; karena itu jumlah kuadrat koordinatnya tetap 1.</p>
      </div>
    </div>
  );
};

const SmaIdentitasTrigonometriPage = () => (
  <div className="animation-submaterial-route sma-trigonometry-route relative min-h-[100dvh] overflow-x-hidden bg-[#080f1e] text-slate-100">
    <Starfield />
    <style>{`
      @keyframes identitas-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      .identitas-rise { animation: identitas-rise .65s cubic-bezier(.2,.7,.2,1) both; }
      .identitas-rise-delay { animation-delay: .12s; }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
      }
    `}</style>
    <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri" />
    <main className="relative z-10 mx-auto w-full max-w-6xl min-w-0 px-3 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
      <header className="identitas-rise relative mb-8 min-w-0 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,48,70,.97),rgba(16,25,45,.95)_57%,rgba(66,43,66,.9))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-cyan-100/10" />
        <div className="pointer-events-none absolute right-9 top-12 h-40 w-40 rounded-full border border-amber-100/10" />
        <div className="relative min-w-0">
          <div className="mb-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100"><BookOpen className="h-3.5 w-3.5" /> Matematika · SMA · Buku Animasi</div>
          <p className="mb-2 font-body text-xs font-bold uppercase tracking-[.24em] text-amber-200">Perbandingan trigonometri</p>
           <h1 className="max-w-3xl font-display text-[clamp(2rem,8vw,4rem)] font-black leading-[1.04] tracking-tight text-white">Identitas <span className="text-cyan-200">Trigonometri</span></h1>
          <p className="mt-5 max-w-2xl font-body text-sm leading-relaxed text-slate-300 sm:text-lg">Enam perbandingan, beberapa pola kuat, dan satu lingkaran yang menyatukan semuanya. Mari ubah bentuk rumit menjadi langkah yang lebih sederhana.</p>
          <div className="mt-6 inline-flex max-w-full items-start gap-2 rounded-xl border border-amber-100/20 bg-amber-200/10 px-3 py-2 text-xs font-semibold leading-relaxed text-amber-100"><Target className="mt-0.5 h-4 w-4 shrink-0" /> Misi: kenali pola, lalu pilih identitas yang membuat soal lebih mudah.</div>
        </div>
      </header>

      <nav aria-label="Isi materi" className="mb-9 flex min-w-0 gap-2 overflow-x-auto pb-2">
        {[
          ["makna-rasio", "Enam rasio"],
          ["pola-identitas", "Pola identitas"],
          ["lingkaran-interaktif", "Jelajahi"],
          ["contoh-identitas", "Contoh soal"],
          ["ringkasan-identitas", "Rangkuman"],
        ].map(([id, label]) => (
          <a key={id} href={`#${id}`} data-testid={`link-nav-${id}`} className="shrink-0 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 font-body text-xs font-bold text-slate-300 transition hover:border-cyan-200/35 hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200">{label}</a>
        ))}
      </nav>

      <div className="min-w-0 space-y-10">
        <section id="makna-rasio" className="scroll-mt-8">
          <Heading index="01" kicker="Titik pada lingkaran" title="Enam rasio dari satu koordinat" icon={<Compass className="h-5 w-5" />} />
          <div className="grid min-w-0 items-center gap-4 md:grid-cols-[.82fr_1.18fr]">
            <div className="rounded-3xl border border-cyan-200/15 bg-[linear-gradient(145deg,rgba(13,92,112,.13),rgba(15,27,44,.88))] p-4">
              <svg viewBox="0 0 300 250" role="img" aria-label="Titik P dengan koordinat x dan y berada pada lingkaran berjari-jari r; sudut theta diukur dari sumbu x positif." className="block h-auto w-full" data-testid="visual-titik-xy">
                <circle cx="145" cy="133" r="86" fill="#0a1c31" stroke="#50647e" strokeWidth="2" />
                <line x1="35" y1="133" x2="263" y2="133" stroke="#8495a8" strokeWidth="1.4" />
                <line x1="145" y1="231" x2="145" y2="26" stroke="#8495a8" strokeWidth="1.4" />
                <line x1="145" y1="133" x2="204" y2="70" stroke="#fbbf24" strokeWidth="3" />
                <line x1="204" y1="70" x2="204" y2="133" stroke="#67e8f9" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="145" y1="133" x2="204" y2="133" stroke="#c4b5fd" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="204" cy="70" r="5" fill="#34d399" />
                <text x="211" y="67" fill="#e2e8f0" fontSize="12" fontWeight="700">P(x, y)</text>
                <text x="162" y="96" fill="#fde68a" fontSize="11">r</text>
                <text x="169" y="149" fill="#c4b5fd" fontSize="11">x</text>
                <text x="210" y="105" fill="#a5f3fc" fontSize="11">y</text>
                <text x="155" y="124" fill="#fda4af" fontSize="11">θ</text>
                <text x="264" y="128" fill="#94a3b8" fontSize="11">x</text>
                <text x="151" y="28" fill="#94a3b8" fontSize="11">y</text>
                <text x="150" y="244" textAnchor="middle" fill="#94a3b8" fontSize="10">r² = x² + y²</text>
              </svg>
              <p className="text-center font-body text-xs leading-relaxed text-slate-400">Titik <InlineMath math="P(x,y)" /> berjarak <InlineMath math="r" /> dari pusat.</p>
            </div>
            <div className="min-w-0">
              <p className="mb-3 font-body text-sm leading-relaxed text-slate-300">Untuk titik <InlineMath math="P(x,y)" /> pada sisi akhir sudut <InlineMath math="\theta" />, jarak ke pusat adalah <InlineMath math="r=\sqrt{x^2+y^2}" />. Definisi rasio trigonometri dapat ditulis langsung dari koordinatnya:</p>
              <div className="grid min-w-0 gap-2 sm:grid-cols-2">
                {[
                  ["Sinus", "\\sin\\theta=\\frac{y}{r}", "text-cyan-100", "border-cyan-200/15 bg-cyan-200/[.045]"],
                  ["Cosinus", "\\cos\\theta=\\frac{x}{r}", "text-amber-100", "border-amber-200/15 bg-amber-200/[.045]"],
                  ["Tangen", "\\tan\\theta=\\frac{y}{x}", "text-violet-100", "border-violet-200/15 bg-violet-200/[.045]"],
                  ["Cotangen", "\\cot\\theta=\\frac{x}{y}", "text-rose-100", "border-rose-200/15 bg-rose-200/[.045]"],
                  ["Sekan", "\\sec\\theta=\\frac{r}{x}", "text-emerald-100", "border-emerald-200/15 bg-emerald-200/[.045]"],
                  ["Kosekan", "\\cosec\\theta=\\frac{r}{y}", "text-sky-100", "border-sky-200/15 bg-sky-200/[.045]"],
                ].map(([name, math, color, tone]) => (
                  <article key={name} data-testid={`card-rasio-${name.toLowerCase()}`} className={`min-w-0 rounded-2xl border p-3 ${tone}`}>
                    <h3 className={`font-body text-[10px] font-black uppercase tracking-[.16em] ${color}`}>{name}</h3>
                    <Formula math={math} />
                  </article>
                ))}
              </div>
              <p className="mt-3 rounded-xl border border-rose-200/15 bg-rose-200/[.045] p-3 font-body text-xs leading-relaxed text-rose-50/80"><strong className="text-rose-100">Perhatikan domain:</strong> <InlineMath math="\tan\theta" /> dan <InlineMath math="\sec\theta" /> memerlukan <InlineMath math="x\ne0" />; <InlineMath math="\cot\theta" /> dan <InlineMath math="\cosec\theta" /> memerlukan <InlineMath math="y\ne0" />.</p>
            </div>
          </div>
        </section>

        <section id="pola-identitas" className="scroll-mt-8">
          <Heading index="02" kicker="Hubungan yang selalu benar" title="Pola identitas utama" icon={<Sparkles className="h-5 w-5" />} />
          <p className="mb-5 max-w-3xl font-body text-sm leading-relaxed text-slate-300">Identitas berlaku untuk setiap sudut pada domainnya. Kita tidak sedang mencari satu nilai sudut tertentu; kita mengenali hubungan yang tetap benar saat sudut berubah.</p>
          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            <article className="min-w-0 rounded-3xl border border-cyan-200/15 bg-cyan-200/[.04] p-4 sm:p-5">
              <h3 className="font-display text-lg font-extrabold text-cyan-100">Sudut berkomplemen</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">Pasangan sudutnya berjumlah 90°. Sinus bertukar menjadi cosinus, tangen menjadi cotangen, dan seterusnya.</p>
              <Formula math="\begin{aligned}\sin\theta&=\cos(90^\circ-\theta)\\\cos\theta&=\sin(90^\circ-\theta)\\\tan\theta&=\cot(90^\circ-\theta)\\\cot\theta&=\tan(90^\circ-\theta)\\\sec\theta&=\cosec(90^\circ-\theta)\\\cosec\theta&=\sec(90^\circ-\theta)\end{aligned}" />
              <p className="text-xs leading-relaxed text-slate-400">Contoh: <InlineMath math="\sin70^\circ=\cos20^\circ" />. Kedua sudut saling melengkapi menjadi 90°.</p>
            </article>
            <article className="min-w-0 rounded-3xl border border-violet-200/15 bg-violet-200/[.04] p-4 sm:p-5">
              <h3 className="font-display text-lg font-extrabold text-violet-100">Sudut negatif: genap dan ganjil</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">Bayangkan memutar sudut ke arah sebaliknya. Cosinus dan sekan tidak berubah; sinus, tangen, cotangen, dan kosekan berganti tanda.</p>
              <Formula math="\begin{aligned}\sin(-\theta)&=-\sin\theta&\cos(-\theta)&=\cos\theta\\\tan(-\theta)&=-\tan\theta&\cot(-\theta)&=-\cot\theta\\\sec(-\theta)&=\sec\theta&\cosec(-\theta)&=-\cosec\theta\end{aligned}" />
              <p className="text-xs leading-relaxed text-slate-400">Ingat cepat: fungsi genap memenuhi <InlineMath math="f(-\theta)=f(\theta)" />; fungsi ganjil memenuhi <InlineMath math="f(-\theta)=-f(\theta)" />.</p>
            </article>
          </div>

          <div className="mt-4 grid min-w-0 gap-4 md:grid-cols-2">
            <article className="min-w-0 rounded-3xl border border-amber-200/15 bg-amber-200/[.04] p-4 sm:p-5">
              <h3 className="font-display text-lg font-extrabold text-amber-100">Identitas Pythagoras</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">Mulai dari <InlineMath math="x^2+y^2=r^2" />, lalu bagi dengan kuadrat penyebut yang sesuai.</p>
              <Formula math="\begin{aligned}\sin^2\theta+\cos^2\theta&=1\\1+\tan^2\theta&=\sec^2\theta\\1+\cot^2\theta&=\cosec^2\theta\end{aligned}" />
              <p className="text-xs leading-relaxed text-slate-400">Contoh pangkat: <InlineMath math="\sin^2\theta" /> berarti <InlineMath math="(\sin\theta)^2" />, bukan <InlineMath math="\sin(\theta^2)" />.</p>
            </article>
            <article className="min-w-0 rounded-3xl border border-emerald-200/15 bg-emerald-200/[.04] p-4 sm:p-5">
              <h3 className="font-display text-lg font-extrabold text-emerald-100">Kebalikan dan hasil kali</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">Setiap pasangan kebalikan menghasilkan 1 selama kedua rasio terdefinisi.</p>
              <Formula math="\begin{aligned}\sin\theta\cdot\cosec\theta&=1\\\cos\theta\cdot\sec\theta&=1\\\tan\theta\cdot\cot\theta&=1\end{aligned}" />
              <Formula math="\tan\theta=\frac{\sin\theta}{\cos\theta},\quad \cot\theta=\frac{\cos\theta}{\sin\theta}" />
              <p className="text-xs leading-relaxed text-slate-400">Identitas ini memberi jalan pintas: ubah rasio yang belum cocok ke sinus dan cosinus, lalu sederhanakan.</p>
            </article>
          </div>
          <div className="mt-4 flex min-w-0 items-start gap-3 rounded-2xl border border-amber-200/15 bg-amber-200/[.06] p-4">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" />
            <p className="font-body text-sm leading-relaxed text-amber-50/90"><strong className="text-amber-100">Mengapa identitas berguna?</strong> Identitas membantu kita menyederhanakan ekspresi—misalnya mengganti <InlineMath math="1+\cot^2\theta" /> dengan <InlineMath math="\cosec^2\theta" />—dan membuktikan dua bentuk setara dengan mengubah satu ruas langkah demi langkah.</p>
          </div>
        </section>

        <section id="lingkaran-interaktif" className="scroll-mt-8">
          <Heading index="03" kicker="Geser dan amati" title="Satu lingkaran, satu identitas" icon={<RotateCcw className="h-5 w-5" />} />
          <Panel className="border-cyan-200/15 bg-[#111a36]/90">
            <p className="mb-4 font-body text-sm leading-relaxed text-slate-300">Geser sudut dengan mouse, sentuhan, atau tombol panah pada papan ketik. Koordinat titik berubah, tetapi ia tetap berada pada lingkaran berjari-jari 1. Coba beberapa sudut dan amati jumlah kuadratnya.</p>
            <TrigExplorer />
            <Formula math="\cos^2\theta+\sin^2\theta=1" label="Yang selalu tetap" />
          </Panel>
        </section>

        <section id="contoh-identitas" className="scroll-mt-8">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-300/10 text-amber-200"><Lightbulb className="h-5 w-5" /></span>
            <div><p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-amber-200/65">Latihan bertahap</p><h2 className="font-display text-2xl font-black text-white sm:text-3xl">Tiga contoh, tiga strategi</h2></div>
          </div>
          <div className="space-y-4">
            <Example id="mudah" level="Mudah" title="Ubah sinus menjadi cosinus" problem={<p className="font-body text-sm leading-relaxed text-slate-200">Tentukan <InlineMath math="\sin70^\circ" /> dengan identitas sudut berkomplemen.</p>}>
              <Step n={1}>Gunakan pasangan sudut yang jumlahnya 90°. Untuk 70°, sudut pelengkapnya adalah <InlineMath math="90^\circ-70^\circ=20^\circ" />.</Step>
              <Step n={2}>Terapkan identitas kofungsi <InlineMath math="\sin\theta=\cos(90^\circ-\theta)" /> pada <InlineMath math="\theta=70^\circ" />:</Step>
              <li className="ml-9"><Formula math="\sin70^\circ=\cos(90^\circ-70^\circ)=\cos20^\circ" /></li>
              <Step n={3}>Jadi, <InlineMath math="\sin70^\circ" /> tepat sama dengan <InlineMath math="\cos20^\circ" />. Jika ingin nilai hampiran, keduanya sekitar 0,9397; identitasnya sendiri sudah memberi kesamaan eksak.</Step>
            </Example>

            <Example id="sedang" level="Sedang" title="Sederhanakan dengan Pythagoras" problem={<Formula math="\frac{\sin\theta}{1+\cot^2\theta}" />}>
              <Step n={1}>Penyebut <InlineMath math="1+\cot^2\theta" /> cocok dengan identitas <InlineMath math="1+\cot^2\theta=\cosec^2\theta" />. Maka:</Step>
              <li className="ml-9"><Formula math="\frac{\sin\theta}{1+\cot^2\theta}=\frac{\sin\theta}{\cosec^2\theta}" /></li>
              <Step n={2}>Karena <InlineMath math="\cosec\theta=\frac1{\sin\theta}" />, maka <InlineMath math="\cosec^2\theta=\frac1{\sin^2\theta}" />. Membagi dengan <InlineMath math="\frac1{\sin^2\theta}" /> sama dengan mengalikan dengan <InlineMath math="\sin^2\theta" />:</Step>
              <li className="ml-9"><Formula math="\frac{\sin\theta}{\cosec^2\theta}=\sin\theta\cdot\sin^2\theta=\sin^3\theta" /></li>
              <Step n={3}>Hasilnya <InlineMath math="\boxed{\sin^3\theta}" />. Ekspresi awal terdefinisi saat <InlineMath math="\cot\theta" /> terdefinisi, yaitu ketika <InlineMath math="\sin\theta\ne0" />. Jadi domainnya <InlineMath math="\theta\ne k\cdot180^\circ" /> untuk <InlineMath math="k\in\mathbb Z" />; nilai <InlineMath math="\cos\theta=0" /> tetap diperbolehkan.</Step>
            </Example>

            <Example id="sulit" level="Sulit" title="Buktikan dengan selisih kuadrat" problem={<Formula math="\cos^4 A-\sin^4 A=1-2\sin^2 A" />}>
              <Step n={1}>Mulai dari ruas kiri. Selisih pangkat empat adalah selisih kuadrat:</Step>
              <li className="ml-9"><Formula math="\begin{aligned}\cos^4 A-\sin^4 A&=(\cos^2 A)^2-(\sin^2 A)^2\\&=(\cos^2 A-\sin^2 A)\\&\qquad\cdot(\cos^2 A+\sin^2 A)\end{aligned}" /></li>
              <Step n={2}>Gunakan identitas Pythagoras <InlineMath math="\cos^2A+\sin^2A=1" /> sehingga:</Step>
              <li className="ml-9"><Formula math="(\cos^2A-\sin^2A)(1)=\cos^2A-\sin^2A" /></li>
              <Step n={3}>Tulis kembali <InlineMath math="\cos^2A=1-\sin^2A" />, lalu gabungkan suku sejenis:</Step>
              <li className="ml-9"><Formula math="\begin{aligned}\cos^2 A-\sin^2 A&=(1-\sin^2 A)-\sin^2 A\\&=1-2\sin^2 A\end{aligned}" /></li>
              <Step n={4}>Ruas kiri berubah tepat menjadi ruas kanan. Maka terbukti <InlineMath math="\cos^4A-\sin^4A=1-2\sin^2A" />. Kuncinya: faktorkan dahulu, baru gunakan identitas yang cocok.</Step>
            </Example>
          </div>
        </section>

        <section id="ringkasan-identitas" className="scroll-mt-8">
          <Panel className="border-amber-200/20 bg-gradient-to-br from-[#182448] to-[#292344]">
            <Heading index="04" kicker="Simpan pola penting" title="Rangkuman dan strategi" icon={<Check className="h-5 w-5" />} />
            <ul className="space-y-3 font-body text-sm leading-relaxed text-slate-200">
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Titik <InlineMath math="P(x,y)" /> berjarak <InlineMath math="r" /> memberi <InlineMath math="\sin\theta=y/r" />, <InlineMath math="\cos\theta=x/r" />, dan <InlineMath math="\tan\theta=y/x" />; tiga rasio lain adalah kebalikannya.</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Sudut berkomplemen bertukar pasangan: sinus–cosinus, tangen–cotangen, sekan–kosekan.</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Untuk sudut negatif, cosinus dan sekan genap; sinus, tangen, cotangen, dan kosekan ganjil.</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Tiga pola utama: <InlineMath math="\sin^2\theta+\cos^2\theta=1" />, <InlineMath math="1+\tan^2\theta=\sec^2\theta" />, dan <InlineMath math="1+\cot^2\theta=\cosec^2\theta" />.</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Saat menyederhanakan atau membuktikan, ubah satu bagian dalam satu waktu dan periksa domainnya.</li>
            </ul>
            <div className="mt-5 rounded-2xl border border-amber-100/15 bg-amber-200/[.06] p-4">
              <h3 className="flex items-center gap-2 font-display text-sm font-black text-amber-100"><CircleHelp className="h-4 w-4" /> Pertanyaan pemandu</h3>
              <p data-testid="text-tip-identitas" className="mt-2 font-body text-sm leading-relaxed text-white/75">Sebelum mengutak-atik rumus, tanyakan: apakah ada bentuk <InlineMath math="1+\tan^2\theta" />, <InlineMath math="1+\cot^2\theta" />, atau sudut yang berjumlah 90°? Mengenali pola sering kali menjadi langkah paling cerdas.</p>
            </div>
            <p className="mt-5 text-center font-display text-base font-bold text-cyan-100">Teruskan dengan teliti: satu identitas yang tepat bisa membuka seluruh soal.</p>
          </Panel>
        </section>
      </div>
    </main>
  </div>
);

export default SmaIdentitasTrigonometriPage;
