import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ListChecks,
  Puzzle,
  Rocket,
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
      <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
        Contoh {number}
      </span>
      <span className="rounded-full border border-white/15 bg-slate-950/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/65">
        {difficulty}
      </span>
    </div>
    <div className="rounded-xl border border-white/5 bg-slate-950/55 p-3 font-body text-sm leading-relaxed text-white">
      <p className="mb-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/45">Soal</p>
      {question}
    </div>
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
  <svg viewBox="0 0 390 250" role="img" aria-label="Maskot roket logaritma dengan papan syarat" className="h-auto w-full">
    <defs>
      <linearGradient id="equationRocket" x1="0" x2="1">
        <stop offset="0%" stopColor="#67e8f9" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
      <linearGradient id="equationFlame" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="100%" stopColor="#fb7185" />
      </linearGradient>
      <filter id="equationGlow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
    </defs>
    <circle cx="312" cy="48" r="30" fill="#fef08a" fillOpacity=".12" />
    <circle cx="312" cy="48" r="12" fill="#fde68a" fillOpacity=".8" />
    <path d="M18 188 C83 132 128 215 188 158 S291 111 366 143" fill="none" stroke="#22d3ee" strokeOpacity=".2" strokeWidth="16" />
    <path d="M18 188 C83 132 128 215 188 158 S291 111 366 143" fill="none" stroke="#67e8f9" strokeDasharray="4 8" strokeWidth="2" />
    <g transform="translate(118 49) rotate(-18 72 72)" filter="url(#equationGlow)">
      <path d="M72 7 C106 23 120 56 113 101 L72 131 L31 101 C24 56 38 23 72 7Z" fill="url(#equationRocket)" stroke="#e0f2fe" strokeWidth="3" />
      <path d="M31 87 L8 103 L31 113Z M113 87 L136 103 L113 113Z" fill="#f9a8d4" stroke="#fce7f3" strokeWidth="2" />
      <path d="M58 126 Q72 171 86 126 Q72 143 58 126Z" fill="url(#equationFlame)" />
      <circle cx="72" cy="63" r="19" fill="#07152d" stroke="#fef3c7" strokeWidth="3" />
      <circle cx="66" cy="59" r="3.5" fill="#f8fafc" /><circle cx="78" cy="59" r="3.5" fill="#f8fafc" />
      <path d="M64 70 Q72 78 80 70" fill="none" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
      <text x="72" y="36" textAnchor="middle" fill="#082f49" fontSize="11" fontWeight="800">logₐx</text>
    </g>
    <g transform="translate(245 124) rotate(5)">
      <rect width="122" height="60" rx="11" fill="#101936" stroke="#fde68a" strokeOpacity=".8" strokeWidth="2" />
      <text x="61" y="25" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="800">a &gt; 0, a ≠ 1</text>
      <text x="61" y="45" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="700">f(x) &gt; 0</text>
    </g>
    <g fill="#fde68a"><circle cx="54" cy="58" r="3" /><circle cx="84" cy="29" r="2" /><circle cx="352" cy="82" r="3" /><circle cx="270" cy="22" r="2" /></g>
    <text x="28" y="227" fill="#bae6fd" fontSize="13" fontWeight="700">cek syarat sebelum mencari x!</text>
  </svg>
);

const EquationAnimation = () => {
  const steps = [
    { title: "Baca bentuknya", left: "\\log_2(3x-1)", right: "3", note: "Cari nilai x yang membuat logaritma bernilai 3." },
    { title: "Ubah 3 menjadi logaritma", left: "\\log_2(3x-1)", right: "\\log_2 2^3", note: "Nilai 3 adalah pangkat dari 2 pada ruas kanan." },
    { title: "Samakan numerus", left: "3x-1", right: "8", note: "Basis sama, maka numerusnya sama." },
    { title: "Selesaikan", left: "3x-1=8", right: "x=3", note: "Uji kembali: numerusnya 8, jadi valid." },
  ];
  const [step, setStep] = useState(0);
  const current = steps[step];

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-cyan-300/30 bg-gradient-to-br from-cyan-500/10 via-slate-950/40 to-violet-500/10 p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-cyan-300/15 p-2 text-cyan-200"><Rocket className="h-5 w-5" /></div>
        <div>
          <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-cyan-200/70">Animasi langkah demi langkah</p>
          <h3 className="font-display text-lg font-bold text-white">Jembatan dari logaritma ke persamaan biasa</h3>
        </div>
      </div>
      <div className="my-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center">
        <motion.div key={`left-${step}`} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-2 py-4 font-display text-xl font-black text-cyan-100 md:text-3xl">
          <InlineMath math={current.left} />
        </motion.div>
        <span className="font-display text-xl font-black text-yellow-200">=</span>
        <motion.div key={`right-${step}`} initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="rounded-xl border border-violet-300/30 bg-violet-300/10 px-2 py-4 font-display text-xl font-black text-violet-100 md:text-3xl">
          <InlineMath math={current.right} />
        </motion.div>
      </div>
      <div className="rounded-xl bg-slate-950/45 p-3 text-center">
        <p className="font-display text-sm font-bold text-yellow-100">{current.title}</p>
        <p className="mt-1 font-body text-xs leading-relaxed text-white/65">{current.note}</p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex gap-1.5">
          {steps.map((item, index) => (
            <button type="button" key={item.title} onClick={() => setStep(index)} aria-label={`Langkah ${index + 1}`} className={`h-2 rounded-full transition-all ${index === step ? "w-8 bg-cyan-300" : "w-3 bg-white/20"}`} />
          ))}
        </div>
        <button type="button" onClick={() => { playPopSound(); setStep((value) => (value + 1) % steps.length); }} className="rounded-xl bg-cyan-300/15 px-3 py-2 font-body text-xs font-bold text-cyan-100 transition hover:bg-cyan-300/25">
          {step === steps.length - 1 ? "Ulangi animasi" : "Langkah berikutnya"}
        </button>
      </div>
    </div>
  );
};

const SmaPersamaanLogaritmaPage = () => {
  const allSections = ["meaning", "constant", "same-base", "different-base", "quadratic", "summary"];
  const [expanded, setExpanded] = useState(allSections);
  const toggle = (id: string) => {
    playPopSound();
    setExpanded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };
  const toggleAll = () => {
    playPopSound();
    setExpanded((current) => current.length === allSections.length ? [] : allSections);
  };
  const isOpen = (id: string) => expanded.includes(id);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#070b23] text-white">
      <Starfield />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.25),_transparent_65%)]" />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma" />

      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-20 pt-16">
        <header className="relative mb-8 overflow-hidden rounded-[2rem] border border-cyan-200/25 bg-gradient-to-br from-cyan-500/20 via-blue-600/15 to-violet-600/20 p-6 shadow-2xl shadow-cyan-950/30 md:p-10">
          <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-8 h-44 w-44 rounded-full bg-cyan-300/15 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/35 bg-cyan-200/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">
                <BookOpen className="h-4 w-4" /> Buku Animasi Matematika · SMA
              </div>
              <p className="mb-2 font-body text-xs font-bold uppercase tracking-[0.22em] text-cyan-200/70">Eksponen dan Logaritma · Ruang untuk Guru</p>
              <h1 className="font-display text-3xl font-black leading-tight text-white md:text-5xl">
                Persamaan <span className="text-cyan-300 text-glow-cyan">Logaritma</span>
              </h1>
              <p className="mt-4 max-w-2xl font-body text-sm leading-7 text-white/75 md:text-base">
                Pelajari cara menemukan nilai <InlineMath math="x" /> dengan membaca syarat, menyamakan bentuk logaritma, dan menguji semua calon jawaban.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 font-body text-xs text-white/70">
                {["Konsep inti", "Animasi alur", "15 contoh bertahap", "Siap mengajar"].map((label) => (
                  <span key={label} className="rounded-full border border-white/15 bg-white/10 px-3 py-2">{label}</span>
                ))}
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <LogarithmMascot />
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-xl border border-white/15 bg-slate-950/60 px-4 py-2 font-display text-sm font-bold text-cyan-100 backdrop-blur">
                <InlineMath math="\log_a f(x)=\log_b g(x)" />
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
          <Accordion id="meaning" title="Mengenal persamaan logaritma" eyebrow="Sub-bab 1 · definisi dan syarat" icon={<Target className="h-5 w-5" />} tone="cyan" open={isOpen("meaning")} onToggle={toggle}>
            <ColorCard tone="cyan">
              <div className="flex gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-yellow-200" />
                <div>
                  <p className="font-display text-base font-bold text-cyan-100">Ringkasan intisari</p>
                  <p className="mt-1 font-body text-sm leading-relaxed text-cyan-50/85">
                    <strong>Persamaan logaritma</strong> adalah persamaan yang memuat variabel pada basis, numerus, atau nilai logaritmanya. Kunci pertama bukan langsung menghitung, melainkan menulis syarat: basis harus memenuhi <InlineMath math="a>0,\ a\ne1" />, sedangkan setiap numerus harus positif.
                  </p>
                </div>
              </div>
              <Formula tone="cyan">{"\\log_a f(x)=c\\quad\\Longleftrightarrow\\quad f(x)=a^c\\qquad(a>0,\\ a\\ne1,\\ f(x)>0)"}</Formula>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-slate-950/30 p-3 text-center"><p className="text-xs font-bold text-cyan-100">Basis</p><p className="my-1 font-display text-2xl font-black text-cyan-200"><InlineMath math="a" /></p><p className="text-xs text-white/55"><InlineMath math="a>0,\ a\ne1" /></p></div>
                <div className="rounded-xl border border-white/10 bg-slate-950/30 p-3 text-center"><p className="text-xs font-bold text-violet-100">Numerus</p><p className="my-1 font-display text-2xl font-black text-violet-200"><InlineMath math="f(x)" /></p><p className="text-xs text-white/55"><InlineMath math="f(x)>0" /></p></div>
                <div className="rounded-xl border border-white/10 bg-slate-950/30 p-3 text-center"><p className="text-xs font-bold text-amber-100">Target</p><p className="my-1 font-display text-2xl font-black text-amber-200"><InlineMath math="x" /></p><p className="text-xs text-white/55">nilai yang dicari</p></div>
              </div>
              <blockquote className="mt-4 rounded-xl border-l-4 border-yellow-300 bg-yellow-300/10 px-4 py-3 font-body text-sm leading-relaxed text-yellow-50">
                <strong>Tips:</strong> tulis “domain dahulu, operasi kemudian”. Calon akar yang membuat numerus nol atau negatif wajib ditolak.
              </blockquote>
            </ColorCard>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} difficulty="Mudah" tone="emerald" question={<>Tentukan penyelesaian <InlineMath math="\log_2 x=3" />.</>}>
                <p>Ubah ke bentuk eksponen:</p>
                <Formula tone="emerald">{"\\log_2x=3\\Longleftrightarrow x=2^3=8"}</Formula>
                <p>Numerus <InlineMath math="x=8" /> positif, jadi jawabannya <strong className="text-emerald-100"><InlineMath math="\{8\}" /></strong>.</p>
              </ExampleCard>
              <ExampleCard number={2} difficulty="Sedang" tone="blue" question={<>Tentukan penyelesaian <InlineMath math="\log_3(2x-1)=2" />.</>}>
                <p>Syarat domainnya <InlineMath math="2x-1>0" />. Lalu ubah ke bentuk eksponen:</p>
                <Formula tone="blue">{"2x-1=3^2=9\\Longrightarrow2x=10\\Longrightarrow x=5"}</Formula>
                <p>Cek numerus: <InlineMath math="2(5)-1=9>0" />. Jadi <strong className="text-blue-100"><InlineMath math="x=5" /></strong>.</p>
              </ExampleCard>
              <ExampleCard number={3} difficulty="Sulit" tone="violet" question={<>Tentukan HP dari <InlineMath math="\log(x^2+9x)=1" />.</>}>
                <p>Karena basis tidak ditulis, gunakan basis <InlineMath math="10" />. Maka:</p>
                <Formula tone="violet">{"x^2+9x=10\\Longrightarrow x^2+9x-10=0\\Longrightarrow(x+10)(x-1)=0"}</Formula>
                <p>Calon <InlineMath math="x=-10" /> dan <InlineMath math="x=1" /> sama-sama membuat numerus bernilai <InlineMath math="10>0" />.</p>
                <p className="text-violet-100"><strong>HP:</strong> <InlineMath math="\{-10,1\}" />.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="constant" title="Bentuk I · logaritma sama dengan konstanta" eyebrow="Sub-bab 2 · ubah ke bentuk eksponen" icon={<Rocket className="h-5 w-5" />} tone="emerald" open={isOpen("constant")} onToggle={toggle}>
            <ColorCard tone="emerald">
              <p className="font-display text-base font-bold text-emerald-100">Ringkasan intisari</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-emerald-50/85">Jika satu logaritma disamakan dengan bilangan biasa, ubah bilangan itu menjadi pangkat dari basisnya. Cara ini membuat persoalan kembali menjadi persamaan aljabar.</p>
              <Formula tone="emerald">{"\\log_a f(x)=p\\quad\\Longleftrightarrow\\quad f(x)=a^p"}</Formula>
            </ColorCard>
            <EquationAnimation />
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} difficulty="Mudah" tone="emerald" question={<>Tentukan <InlineMath math="x" /> dari <InlineMath math="\log_2(3x-1)=3" />.</>}>
                <p>Gunakan hubungan logaritma dan eksponen:</p>
                <Formula tone="emerald">{"3x-1=2^3=8\\Longrightarrow3x=9\\Longrightarrow x=3"}</Formula>
                <p>Numerusnya <InlineMath math="8" />, sehingga valid. <strong className="text-emerald-100"><InlineMath math="HP=\{3\}" /></strong>.</p>
              </ExampleCard>
              <ExampleCard number={2} difficulty="Sedang" tone="blue" question={<>Tentukan HP dari <InlineMath math="\log_2(x-5)+\log_2(x-2)=\log_9 81" />.</>}>
                <p>Syarat domain: <InlineMath math="x-5>0" /> dan <InlineMath math="x-2>0" />, jadi <InlineMath math="x>5" />. Karena <InlineMath math="\log_9 81=2" />, gabungkan dua logaritma:</p>
                <Formula tone="blue">{"\\log_2((x-5)(x-2))=2\\Longrightarrow(x-5)(x-2)=4"}</Formula>
                <p>Peroleh <InlineMath math="x^2-7x+6=0" />, sehingga <InlineMath math="x=1" /> atau <InlineMath math="x=6" />. Hanya <InlineMath math="x=6" /> yang memenuhi <InlineMath math="x>5" />.</p>
                <p className="text-blue-100"><strong>HP:</strong> <InlineMath math="\{6\}" />.</p>
              </ExampleCard>
              <ExampleCard number={3} difficulty="Sulit" tone="rose" question={<>Tentukan HP dari <InlineMath math="\log_3((x-1)(x+2))=\log_3 12" />.</>}>
                <p>Karena basis sama, samakan numerus. Syaratnya <InlineMath math="(x-1)(x+2)>0" />.</p>
                <Formula tone="rose">{"(x-1)(x+2)=12\\Longrightarrow x^2+x-14=0\\Longrightarrow x=\\frac{-1\\pm\\sqrt{57}}2"}</Formula>
                <p>Kedua akar membuat numerus bernilai <InlineMath math="12>0" />, sehingga keduanya sah.</p>
                <p className="text-rose-100"><strong>HP:</strong> <InlineMath math="\left\{\frac{-1-\sqrt{57}}2,\frac{-1+\sqrt{57}}2\right\}" />.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="same-base" title="Bentuk II · basis sama, numerus berbeda" eyebrow="Sub-bab 3 · samakan isi logaritma" icon={<CheckCircle2 className="h-5 w-5" />} tone="blue" open={isOpen("same-base")} onToggle={toggle}>
            <ColorCard tone="blue">
              <p className="font-display text-base font-bold text-blue-100">Ringkasan intisari</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-blue-50/85">Untuk basis yang sama dan memenuhi <InlineMath math="a>0,\ a\ne1" />, dua logaritma bernilai sama jika numerusnya sama. Namun, syarat positif pada kedua numerus tetap harus diperiksa.</p>
              <Formula tone="blue">{"\\log_a f(x)=\\log_a g(x)\\quad\\Longleftrightarrow\\quad f(x)=g(x)\\qquad(f(x)>0,\\ g(x)>0)"}</Formula>
              <blockquote className="rounded-xl border-l-4 border-yellow-300 bg-yellow-300/10 px-4 py-3 font-body text-sm leading-relaxed text-yellow-50"><strong>Catatan:</strong> menyamakan numerus bukan berarti boleh melewati pemeriksaan domain. Akar persamaan aljabar belum tentu menjadi solusi logaritma.</blockquote>
            </ColorCard>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} difficulty="Mudah" tone="emerald" question={<>Tentukan HP dari <InlineMath math="\log(x^2+5x-7)=\log(x-2)" />.</>}>
                <p>Samakan numerus:</p>
                <Formula tone="emerald">{"x^2+5x-7=x-2\\Longrightarrow x^2+4x-5=0\\Longrightarrow x=-5\\text{ atau }x=1"}</Formula>
                <p>Untuk <InlineMath math="x=-5" /> dan <InlineMath math="x=1" />, <InlineMath math="x-2<0" />. Keduanya ditolak.</p>
                <p className="text-emerald-100"><strong>HP:</strong> <InlineMath math="\varnothing" />.</p>
              </ExampleCard>
              <ExampleCard number={2} difficulty="Sedang" tone="blue" question={<>Tentukan <InlineMath math="x" /> dari <InlineMath math="\log(2x+1)=\log(9-x)" />.</>}>
                <p>Samakan numerus:</p>
                <Formula tone="blue">{"2x+1=9-x\\Longrightarrow3x=8\\Longrightarrow x=\\frac83"}</Formula>
                <p>Cek domain: <InlineMath math="2(\frac83)+1>0" /> dan <InlineMath math="9-\frac83>0" />. Jadi <strong className="text-blue-100"><InlineMath math="HP=\{\frac83\}" /></strong>.</p>
              </ExampleCard>
              <ExampleCard number={3} difficulty="Sulit" tone="violet" question={<>Tentukan HP dari <InlineMath math="\log_2(x^2-4x+3)=\log_2(2x-1)" />.</>}>
                <p>Samakan numerus lalu selesaikan kuadrat:</p>
                <Formula tone="violet">{"x^2-4x+3=2x-1\\Longrightarrow x^2-6x+4=0\\Longrightarrow x=3\\pm\\sqrt5"}</Formula>
                <p>Syarat <InlineMath math="2x-1>0" /> mengharuskan <InlineMath math="x>\frac12" />. Kedua akar memenuhi syarat dan membuat numerus positif.</p>
                <p className="text-violet-100"><strong>HP:</strong> <InlineMath math="\{3-\sqrt5,3+\sqrt5\}" />.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="different-base" title="Bentuk III · numerus sama, basis berbeda" eyebrow="Sub-bab 4 · cari numerus yang tepat" icon={<Puzzle className="h-5 w-5" />} tone="amber" open={isOpen("different-base")} onToggle={toggle}>
            <ColorCard tone="amber">
              <p className="font-display text-base font-bold text-amber-100">Ringkasan intisari</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-amber-50/85">Jika numerus yang sama dilogaritmakan dengan dua basis berbeda, nilainya sama hanya ketika numerus tersebut adalah <InlineMath math="1" />. Ini berasal dari fakta <InlineMath math="\log_a1=0" /> untuk semua basis yang valid.</p>
              <Formula tone="amber">{"\\log_a f(x)=\\log_b f(x)\\quad(a\\ne b)\\quad\\Longrightarrow\\quad f(x)=1"}</Formula>
              <p className="font-body text-sm text-white/70">Pastikan <InlineMath math="a>0,\ a\ne1,\ b>0,\ b\ne1" /> dan <InlineMath math="f(x)>0" />.</p>
            </ColorCard>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} difficulty="Mudah" tone="emerald" question={<>Tentukan HP dari <InlineMath math="\log_2(x+4)=\log_8(x+4)" />.</>}>
                <p>Basis berbeda, maka numerus harus <InlineMath math="1" />:</p>
                <Formula tone="emerald">{"x+4=1\\Longrightarrow x=-3"}</Formula>
                <p>Cek numerus: <InlineMath math="-3+4=1>0" />. Jadi <strong className="text-emerald-100"><InlineMath math="HP=\{-3\}" /></strong>.</p>
              </ExampleCard>
              <ExampleCard number={2} difficulty="Sedang" tone="blue" question={<>Tentukan HP dari <InlineMath math="\log_2(2x+7)=\log_3(2x+7)" />.</>}>
                <p>Karena basis <InlineMath math="2" /> dan <InlineMath math="3" /> berbeda, tetapkan numerus sama dengan <InlineMath math="1" />:</p>
                <Formula tone="blue">{"2x+7=1\\Longrightarrow2x=-6\\Longrightarrow x=-3"}</Formula>
                <p>Numerusnya <InlineMath math="1" /> dan kedua basis valid. <strong className="text-blue-100"><InlineMath math="HP=\{-3\}" /></strong>.</p>
              </ExampleCard>
              <ExampleCard number={3} difficulty="Sulit" tone="rose" question={<>Tentukan HP dari <InlineMath math="\log_2(x^2-4x+5)=\log_4(x^2-4x+5)" />.</>}>
                <p>Numerus yang sama harus bernilai <InlineMath math="1" />:</p>
                <Formula tone="rose">{"x^2-4x+5=1\\Longrightarrow x^2-4x+4=0\\Longrightarrow(x-2)^2=0"}</Formula>
                <p>Jadi <InlineMath math="x=2" />. Numerusnya <InlineMath math="1" /> sehingga kedua logaritma sama-sama bernilai <InlineMath math="0" />.</p>
                <p className="text-rose-100"><strong>HP:</strong> <InlineMath math="\{2\}" />.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="quadratic" title="Bentuk IV · persamaan kuadrat dalam logaritma" eyebrow="Sub-bab 5 · substitusi variabel baru" icon={<ListChecks className="h-5 w-5" />} tone="violet" open={isOpen("quadratic")} onToggle={toggle}>
            <ColorCard tone="violet">
              <p className="font-display text-base font-bold text-violet-100">Ringkasan intisari</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-violet-50/85">Jika <InlineMath math="(\log_a x)^2" /> dan <InlineMath math="\log_a x" /> muncul bersama, jadikan <InlineMath math="p=\log_a x" />. Selesaikan persamaan kuadrat dalam <InlineMath math="p" />, lalu kembalikan setiap nilai <InlineMath math="p" /> ke bentuk <InlineMath math="x" />.</p>
              <Formula tone="violet">{"A(\\log_a x)^2+B\\log_a x+C=0\\quad\\xrightarrow{\\ p=\\log_a x\\ }\\quad Ap^2+Bp+C=0"}</Formula>
              <blockquote className="rounded-xl border-l-4 border-rose-300 bg-rose-300/10 px-4 py-3 font-body text-sm leading-relaxed text-rose-50"><TriangleAlert className="mr-2 inline h-4 w-4 align-text-bottom" /> <strong>Catatan penting:</strong> setelah menemukan <InlineMath math="p" />, jangan berhenti. Ubah kembali ke <InlineMath math="x" /> dan pastikan <InlineMath math="x>0" />.</blockquote>
            </ColorCard>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} difficulty="Mudah" tone="emerald" question={<>Tentukan HP dari <InlineMath math="(\log x)^2-2\log x-24=0" />.</>}>
                <p>Misalkan <InlineMath math="p=\log x" />:</p>
                <Formula tone="emerald">{"p^2-2p-24=0\\Longrightarrow(p-6)(p+4)=0\\Longrightarrow p=6\\text{ atau }p=-4"}</Formula>
                <p>Jika <InlineMath math="p=6" />, maka <InlineMath math="x=10^6" />. Jika <InlineMath math="p=-4" />, maka <InlineMath math="x=10^{-4}" />.</p>
                <p className="text-emerald-100"><strong>HP:</strong> <InlineMath math="\{10^{-4},10^6\}" />.</p>
              </ExampleCard>
              <ExampleCard number={2} difficulty="Sedang" tone="blue" question={<>Tentukan HP dari <InlineMath math="(\log_5x)^2-6\log_5x+5=0" />.</>}>
                <p>Ambil <InlineMath math="p=\log_5x" />:</p>
                <Formula tone="blue">{"p^2-6p+5=0\\Longrightarrow(p-1)(p-5)=0\\Longrightarrow p=1\\text{ atau }p=5"}</Formula>
                <p>Balikkan satu per satu: <InlineMath math="\log_5x=1\Rightarrow x=5" /> dan <InlineMath math="\log_5x=5\Rightarrow x=5^5=3125" />.</p>
                <p className="text-blue-100"><strong>HP:</strong> <InlineMath math="\{5,3125\}" />.</p>
              </ExampleCard>
              <ExampleCard number={3} difficulty="Sulit" tone="rose" question={<>Tentukan HP dari <InlineMath math="2(\log_2x)^2-3\log_2x-2=0" />.</>}>
                <p>Misalkan <InlineMath math="p=\log_2x" />:</p>
                <Formula tone="rose">{"2p^2-3p-2=0\\Longrightarrow(2p+1)(p-2)=0\\Longrightarrow p=-\\frac12\\text{ atau }p=2"}</Formula>
                <p>Untuk <InlineMath math="p=-\frac12" />, diperoleh <InlineMath math="x=2^{-1/2}=\frac1{\sqrt2}" />. Untuk <InlineMath math="p=2" />, diperoleh <InlineMath math="x=4" />.</p>
                <p className="text-rose-100"><strong>HP:</strong> <InlineMath math="\left\{\frac1{\sqrt2},4\right\}" />.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="summary" title="Peta konsep dan jebakan umum" eyebrow="Penutup · bekal mengajar" icon={<BookOpen className="h-5 w-5" />} tone="cyan" open={isOpen("summary")} onToggle={toggle}>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[720px] text-left font-body text-sm">
                <thead className="bg-slate-950/60 text-cyan-100"><tr><th className="px-4 py-3">Bentuk</th><th className="px-4 py-3">Gerak utama</th><th className="px-4 py-3">Pemeriksaan</th></tr></thead>
                <tbody className="text-white/75">
                  <tr className="border-t border-white/5 bg-white/[0.025]"><td className="px-4 py-3 font-semibold text-white"><InlineMath math="\log_a f(x)=p" /></td><td className="px-4 py-3 text-cyan-100"><InlineMath math="f(x)=a^p" /></td><td className="px-4 py-3">Numerus positif</td></tr>
                  <tr className="border-t border-white/5"><td className="px-4 py-3 font-semibold text-white"><InlineMath math="\log_a f(x)=\log_a g(x)" /></td><td className="px-4 py-3 text-cyan-100"><InlineMath math="f(x)=g(x)" /></td><td className="px-4 py-3">Kedua numerus positif</td></tr>
                  <tr className="border-t border-white/5 bg-white/[0.025]"><td className="px-4 py-3 font-semibold text-white"><InlineMath math="\log_a f(x)=\log_b f(x)" /></td><td className="px-4 py-3 text-cyan-100"><InlineMath math="f(x)=1" /></td><td className="px-4 py-3">Basis valid dan berbeda</td></tr>
                  <tr className="border-t border-white/5"><td className="px-4 py-3 font-semibold text-white"><InlineMath math="A(\log_a x)^2+B\log_a x+C=0" /></td><td className="px-4 py-3 text-cyan-100"><InlineMath math="p=\log_a x" /></td><td className="px-4 py-3">Kembalikan <InlineMath math="p" /> ke <InlineMath math="x" /></td></tr>
                </tbody>
              </table>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} difficulty="Cek cepat" tone="emerald" question={<>Apakah <InlineMath math="\log_2(-3)" /> terdefinisi?</>}>
                <p>Tidak, karena numerus harus positif. <InlineMath math="-3\not>0" />.</p>
              </ExampleCard>
              <ExampleCard number={2} difficulty="Cek cepat" tone="amber" question={<>Apa syarat basis pada <InlineMath math="\log_a x" />?</>}>
                <Formula tone="amber">{"a>0\\qquad a\\ne1\\qquad x>0"}</Formula>
                <p>Ketiga syarat ini ditulis sebelum manipulasi aljabar.</p>
              </ExampleCard>
              <ExampleCard number={3} difficulty="Cek cepat" tone="rose" question={<>Bolehkah <InlineMath math="\log_a(u+v)" /> dipecah menjadi dua logaritma?</>}>
                <p>Tidak. Sifat penjumlahan berlaku pada logaritma yang dijumlahkan, bukan pada numerus yang berupa penjumlahan.</p>
                <Formula tone="rose">{"\\log_a(uv)=\\log_a u+\\log_a v"}</Formula>
              </ExampleCard>
            </div>
            <blockquote className="rounded-2xl border border-cyan-300/25 bg-cyan-300/10 p-4 font-body text-sm leading-relaxed text-cyan-50">
              <strong>Pesan untuk guru:</strong> biasakan siswa menuliskan tiga kata kerja saat menyelesaikan soal: <strong>tulis syarat</strong>, <strong>ubah bentuk</strong>, dan <strong>uji kembali</strong>. Dengan begitu, mereka memahami alasan setiap langkah, bukan hanya menyalin hasil akhir.
            </blockquote>
          </Accordion>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 text-center font-body text-xs text-white/45">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2"><InlineMath math="a>0,\ a\ne1" /></span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Numerus harus positif</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Uji semua calon akar</span>
        </div>
      </main>
    </div>
  );
};

export default SmaPersamaanLogaritmaPage;