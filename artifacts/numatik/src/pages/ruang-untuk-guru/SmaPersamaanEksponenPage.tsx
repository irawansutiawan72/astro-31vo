import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  Lightbulb,
  Rocket,
  Sparkles,
  Target,
  WandSparkles,
} from "lucide-react";
import { BlockMath, InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

type Tone = "cyan" | "emerald" | "amber" | "violet" | "rose" | "blue" | "orange";

const toneClasses: Record<Tone, string> = {
  cyan: "border-cyan-300/35 bg-cyan-400/10",
  emerald: "border-emerald-300/35 bg-emerald-400/10",
  amber: "border-amber-300/35 bg-amber-400/10",
  violet: "border-violet-300/35 bg-violet-400/10",
  rose: "border-rose-300/35 bg-rose-400/10",
  blue: "border-blue-300/35 bg-blue-400/10",
  orange: "border-orange-300/35 bg-orange-400/10",
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

const EquationBridge = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Mulai dari soal", left: "4^x", right: "64", note: "Kita mencari nilai $x$ yang membuat kedua ruas sama." },
    { title: "Ubah ke basis 2", left: "(2^2)^x", right: "2^6", note: "Karena $4=2^2$ dan $64=2^6$, kedua ruas punya basis yang sama." },
    { title: "Samakan pangkat", left: "2^{2x}", right: "2^6", note: "Jika basis sama dan positif, eksponennya boleh disamakan." },
    { title: "Temukan jawaban", left: "2x=6", right: "x=3", note: "Bagi kedua ruas dengan $2$. Selesai!" },
  ];
  const current = steps[step];

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-cyan-300/30 bg-gradient-to-br from-cyan-500/10 via-slate-950/40 to-violet-500/10 p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-cyan-300/15 p-2 text-cyan-200"><WandSparkles className="h-5 w-5" /></div>
        <div>
          <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-cyan-200/70">Animasi langkah demi langkah</p>
          <h3 className="font-display text-lg font-bold text-white">Jembatan penyamaan basis</h3>
        </div>
      </div>
      <div className="my-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center">
        <motion.div key={`left-${step}`} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-2 py-4 font-display text-xl font-black text-cyan-100 md:text-3xl">
          <InlineMath math={current.left} />
        </motion.div>
        <ArrowRight className="h-5 w-5 text-yellow-200" />
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
            <button
              type="button"
              key={item.title}
              onClick={() => setStep(index)}
              aria-label={`Langkah ${index + 1}`}
              className={`h-2 rounded-full transition-all ${index === step ? "w-8 bg-cyan-300" : "w-3 bg-white/20"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => { playPopSound(); setStep((value) => (value + 1) % steps.length); }}
          className="rounded-xl bg-cyan-300/15 px-3 py-2 font-body text-xs font-bold text-cyan-100 transition hover:bg-cyan-300/25"
        >
          {step === steps.length - 1 ? "Ulangi animasi" : "Langkah berikutnya"}
        </button>
      </div>
    </div>
  );
};

const ExponentMascot = () => (
  <svg viewBox="0 0 360 230" role="img" aria-label="Maskot roket yang membawa persamaan eksponen" className="h-auto w-full">
    <defs>
      <linearGradient id="rocketBody" x1="0" x2="1">
        <stop offset="0%" stopColor="#67e8f9" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
      <linearGradient id="flame" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="100%" stopColor="#fb7185" />
      </linearGradient>
      <filter id="rocketGlow"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
    </defs>
    <circle cx="284" cy="52" r="25" fill="#fef08a" fillOpacity=".12" />
    <circle cx="284" cy="52" r="10" fill="#fde68a" fillOpacity=".75" />
    <path d="M18 177 C80 120 115 203 172 147 S270 100 340 133" fill="none" stroke="#22d3ee" strokeOpacity=".2" strokeWidth="14" />
    <path d="M18 177 C80 120 115 203 172 147 S270 100 340 133" fill="none" stroke="#67e8f9" strokeDasharray="4 8" strokeWidth="2" />
    <g transform="translate(116 48) rotate(-18 72 72)" filter="url(#rocketGlow)">
      <path d="M72 7 C106 23 120 56 113 101 L72 131 L31 101 C24 56 38 23 72 7Z" fill="url(#rocketBody)" stroke="#e0f2fe" strokeWidth="3" />
      <path d="M31 87 L8 103 L31 113Z M113 87 L136 103 L113 113Z" fill="#f9a8d4" stroke="#fce7f3" strokeWidth="2" />
      <path d="M58 126 Q72 171 86 126 Q72 143 58 126Z" fill="url(#flame)" />
      <circle cx="72" cy="63" r="19" fill="#07152d" stroke="#fef3c7" strokeWidth="3" />
      <circle cx="66" cy="59" r="3.5" fill="#f8fafc" />
      <circle cx="78" cy="59" r="3.5" fill="#f8fafc" />
      <path d="M64 70 Q72 78 80 70" fill="none" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
      <text x="72" y="36" textAnchor="middle" fill="#082f49" fontSize="13" fontWeight="800">aˣ</text>
    </g>
    <g fill="#fde68a">
      <circle cx="47" cy="54" r="3" /><circle cx="74" cy="26" r="2" /><circle cx="330" cy="77" r="3" /><circle cx="248" cy="22" r="2" />
    </g>
    <text x="25" y="213" fill="#bae6fd" fontSize="13" fontWeight="700">ikuti jejak basisnya!</text>
  </svg>
);

const SmaPersamaanEksponenPage = () => {
  const allSections = ["meaning", "same-base", "change-base", "substitution", "context", "summary"];
  const [expanded, setExpanded] = useState(allSections);

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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.25),_transparent_65%)]" />
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
                Persamaan <span className="text-cyan-300 text-glow-cyan">Eksponen</span>
              </h1>
              <p className="mt-4 max-w-2xl font-body text-sm leading-7 text-white/75 md:text-base">
                Temukan nilai yang tersembunyi di posisi pangkat. Mulai dari menyamakan basis sampai memodelkan pertumbuhan dan peluruhan dalam kehidupan sehari-hari.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 font-body text-xs text-white/70">
                {["Konsep inti", "Animasi penyamaan basis", "15 contoh bertahap", "Siap mengajar"].map((label) => (
                  <span key={label} className="rounded-full border border-white/15 bg-white/10 px-3 py-2">{label}</span>
                ))}
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <ExponentMascot />
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-xl border border-white/15 bg-slate-950/60 px-4 py-2 font-display text-sm font-bold text-cyan-100 backdrop-blur">
                <InlineMath math="a^{f(x)}=a^{g(x)}" />
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
          <Accordion id="meaning" title="Mengenal persamaan eksponen" eyebrow="Sub-bab 1 · pahami pertanyaannya" icon={<Target className="h-5 w-5" />} tone="cyan" open={expanded.includes("meaning")} onToggle={toggle}>
            <ColorCard tone="cyan">
              <div className="flex gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-yellow-200" />
                <div>
                  <p className="font-display text-base font-bold text-cyan-100">Ringkasan intisari</p>
                  <p className="mt-1 font-body text-sm leading-relaxed text-cyan-50/85">
                    <strong>Persamaan eksponen</strong> adalah persamaan yang memuat variabel pada pangkat. Tugas kita adalah menemukan semua nilai <InlineMath math="x" /> yang membuat ruas kiri dan ruas kanan bernilai sama. Bentuknya dapat berupa <InlineMath math="a^{f(x)}=b" /> atau dua bentuk berpangkat seperti <InlineMath math="a^{f(x)}=a^{g(x)}" />.
                  </p>
                </div>
              </div>
              <Formula tone="cyan">{"a^{f(x)}=b\\qquad\\Longleftrightarrow\\qquad\\text{cari nilai }x\\text{ yang membuat kedua ruas sama}"}</Formula>
              <div className="mt-4 rounded-2xl border border-violet-300/30 bg-violet-400/10 p-4">
                <p className="font-display text-sm font-bold text-violet-100">Termasuk basis pecahan</p>
                <p className="mt-1 font-body text-sm leading-relaxed text-violet-50/85">
                  Basis <InlineMath math="a" /> boleh berupa pecahan, selama <InlineMath math="a>0" /> dan <InlineMath math="a\ne1" />. Jika ruas kanan dapat ditulis sebagai pangkat dari basis yang sama, maka bentuk umum ini berubah menjadi persamaan dengan basis sama:
                </p>
                <Formula tone="violet">{"a^{f(x)}=b\\quad\\text{dan}\\quad b=a^p\\quad\\Longrightarrow\\quad a^{f(x)}=a^p\\quad\\Longrightarrow\\quad f(x)=p"}</Formula>
                <p className="font-body text-xs leading-relaxed text-violet-50/75">
                  Contoh: <InlineMath math={"\\left(\\frac{1}{2}\\right)^{f(x)}=\\frac{1}{8}=\\left(\\frac{1}{2}\\right)^3"} />, sehingga <strong className="text-violet-100"><InlineMath math="f(x)=3" /></strong>. Aturan penyamaan pangkat tetap berlaku untuk basis pecahan karena fungsi eksponen tetap satu-satu.
                </p>
              </div>
              <blockquote className="rounded-xl border-l-4 border-yellow-300 bg-yellow-300/10 px-4 py-3 font-body text-sm leading-relaxed text-yellow-50">
                <strong>Tips:</strong> jangan buru-buru memakai logaritma. Cek dulu apakah kedua ruas bisa ditulis dengan <strong>basis yang sama</strong>.
              </blockquote>
            </ColorCard>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} difficulty="Mudah" tone="emerald" question={<>Tentukan penyelesaian dari <InlineMath math="2^x=16" />.</>}>
                <p>Ubah <InlineMath math="16" /> menjadi pangkat berbasis <InlineMath math="2" />:</p>
                <Formula tone="emerald">2^x=16=2^4</Formula>
                <p>Basis sama, maka pangkatnya sama: <InlineMath math="x=4" />.</p>
              </ExampleCard>
              <ExampleCard number={2} difficulty="Sedang" tone="blue" question={<>Tentukan penyelesaian dari <InlineMath math="3^{x+1}=81" />.</>}>
                <p>Karena <InlineMath math="81=3^4" />, persamaan menjadi:</p>
                <Formula tone="blue">{"3^{x+1}=3^4\\Rightarrow x+1=4\\Rightarrow x=3"}</Formula>
                <p>Jadi, himpunan penyelesaiannya adalah <InlineMath math="\{3\}" />.</p>
              </ExampleCard>
              <ExampleCard number={3} difficulty="Sulit" tone="violet" question={<>Tentukan penyelesaian dari <InlineMath math="4^{x-1}=8" />.</>}>
                <p>Ubah kedua bilangan ke basis <InlineMath math="2" />:</p>
                <Formula tone="violet">{"(2^2)^{x-1}=2^3\\Rightarrow2^{2x-2}=2^3"}</Formula>
                <p>Samakan pangkat: <InlineMath math="2x-2=3" />, sehingga <InlineMath math="x=\frac{5}{2}" />.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="same-base" title="Strategi 1 · basis sudah sama" eyebrow="Sub-bab 2 · langsung samakan pangkat" icon={<CheckCircle2 className="h-5 w-5" />} tone="emerald" open={expanded.includes("same-base")} onToggle={toggle}>
            <ColorCard tone="emerald">
              <p className="font-display text-base font-bold text-emerald-100">Ringkasan intisari</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-emerald-50/85">
                Jika <InlineMath math="a>0" /> dan <InlineMath math="a\ne1" />, fungsi <InlineMath math="a^x" /> bersifat satu-satu. Artinya, ketika basisnya sama, persamaan <InlineMath math="a^m=a^n" /> dapat disederhanakan menjadi <InlineMath math="m=n" />.
              </p>
              <Formula tone="emerald">a^m=a^n\qquad\Longrightarrow\qquad m=n</Formula>
              <p className="font-body text-sm text-white/70"><strong className="text-emerald-100">Urutan kerja:</strong> hilangkan basis yang sama → selesaikan persamaan biasa → cek jawaban.</p>
            </ColorCard>
            <ColorCard tone="blue">
              <p className="font-display text-base font-bold text-blue-100">Pola penting yang perlu dibedakan</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-blue-50/85">
                Gunakan aturan berikut setelah memastikan syarat basis dan domainnya. Jangan langsung menyamakan pangkat jika basisnya belum memenuhi syarat.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-slate-950/25 p-3">
                  <p className="font-body text-xs font-black uppercase tracking-[0.16em] text-blue-100/70">Basis sama</p>
                  <Formula tone="blue">{"a^{f(x)}=a^{g(x)}\\quad\\Longrightarrow\\quad f(x)=g(x)\\qquad(a>0,\\ a\\ne1)"}</Formula>
                  <p className="font-body text-xs leading-relaxed text-white/65">Kedua pangkat disamakan karena fungsi <InlineMath math="a^x" /> bersifat satu-satu.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-950/25 p-3">
                  <p className="font-body text-xs font-black uppercase tracking-[0.16em] text-blue-100/70">Pangkat sama</p>
                  <Formula tone="blue">{"a^{f(x)}=b^{f(x)}\\quad\\Longrightarrow\\quad f(x)=0\\qquad(a,b>0,\\ a\\ne b)"}</Formula>
                  <p className="font-body text-xs leading-relaxed text-white/65">Syarat <InlineMath math="a\ne b" /> penting. Saat <InlineMath math="f(x)=0" />, kedua ruas sama-sama bernilai <InlineMath math="1" />.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-950/25 p-3">
                  <p className="font-body text-xs font-black uppercase tracking-[0.16em] text-blue-100/70">Pangkat fungsi sama</p>
                  <Formula tone="blue">{"f(x)^{h(x)}=g(x)^{h(x)}\\quad\\Longrightarrow\\quad f(x)=g(x)\\qquad(f(x),g(x)>0,\\ h(x)\\ne0)"}</Formula>
                  <p className="font-body text-xs leading-relaxed text-white/65">Jika <InlineMath math="h(x)=0" />, kedua ruas bernilai <InlineMath math="1" /> sehingga basis tidak harus sama.</p>
                </div>
              </div>
              <div className="mt-3 rounded-xl border border-violet-300/25 bg-violet-400/10 p-3">
                <p className="font-body text-xs font-black uppercase tracking-[0.16em] text-violet-100/75">Basis berupa fungsi</p>
                <p className="mt-1 font-body text-sm leading-relaxed text-white/80">
                  Untuk <InlineMath math="h(x)^{f(x)}=h(x)^{g(x)}" />, periksa kemungkinan berikut sesuai domain:
                </p>
                <ul className="mt-2 grid gap-2 font-body text-sm leading-relaxed text-white/75 md:grid-cols-2">
                  <li><strong className="text-violet-100">a)</strong> <InlineMath math="f(x)=g(x)" /> jika basis memenuhi <InlineMath math="h(x)>0" /> dan <InlineMath math="h(x)\ne1" />.</li>
                  <li><strong className="text-violet-100">b)</strong> <InlineMath math="h(x)=1" />, karena <InlineMath math="1^{f(x)}=1^{g(x)}=1" />.</li>
                  <li><strong className="text-violet-100">c)</strong> <InlineMath math="h(x)=0" /> jika <InlineMath math="f(x)>0" /> dan <InlineMath math="g(x)>0" />.</li>
                  <li><strong className="text-violet-100">d)</strong> <InlineMath math="h(x)=-1" /> jika <InlineMath math="f(x)" /> dan <InlineMath math="g(x)" /> keduanya ganjil atau keduanya genap.</li>
                </ul>
              </div>
            </ColorCard>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} difficulty="Mudah" tone="emerald" question={<>Tentukan <InlineMath math="x" /> dari <InlineMath math="5^{2x-1}=5^7" />.</>}>
                <Formula tone="emerald">2x-1=7</Formula>
                <p>Tambahkan <InlineMath math="1" /> pada kedua ruas: <InlineMath math="2x=8" />.</p>
                <p>Bagi dengan <InlineMath math="2" />: <strong className="text-emerald-100"><InlineMath math="x=4" /></strong>.</p>
              </ExampleCard>
              <ExampleCard number={2} difficulty="Sedang" tone="blue" question={<>Tentukan penyelesaian <InlineMath math="2^{x+1}=8^{x-1}" />.</>}>
                <p>Ubah <InlineMath math="8" /> menjadi <InlineMath math="2^3" />:</p>
                <Formula tone="blue">{"2^{x+1}=(2^3)^{x-1}=2^{3x-3}"}</Formula>
                <p>Samakan pangkat: <InlineMath math="x+1=3x-3" />. Jadi <InlineMath math="4=2x" /> dan <strong className="text-blue-100"><InlineMath math="x=2" /></strong>.</p>
              </ExampleCard>
              <ExampleCard number={3} difficulty="Sulit" tone="rose" question={<>Tentukan penyelesaian <InlineMath math="9^{x-1}=27^{2x-3}" />.</>}>
                <p>Pilih basis <InlineMath math="3" /> karena <InlineMath math="9=3^2" /> dan <InlineMath math="27=3^3" />:</p>
                <Formula tone="rose">{"3^{2x-2}=3^{6x-9}\\Rightarrow2x-2=6x-9"}</Formula>
                <p>Diperoleh <InlineMath math="7=4x" />, sehingga <strong className="text-rose-100"><InlineMath math="x=\frac{7}{4}" /></strong>.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="change-base" title="Strategi 2 · menyamakan basis dengan cerdas" eyebrow="Sub-bab 3 · ubah bentuk, bukan nilainya" icon={<Rocket className="h-5 w-5" />} tone="violet" open={expanded.includes("change-base")} onToggle={toggle}>
            <ColorCard tone="violet">
              <p className="font-display text-base font-bold text-violet-100">Ringkasan intisari</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-violet-50/85">
                Banyak bilangan terlihat berbeda, padahal dapat ditulis dari basis yang sama. Gunakan faktorisasi prima atau pola pangkat: <InlineMath math="4=2^2" />, <InlineMath math="8=2^3" />, <InlineMath math="9=3^2" />, dan <InlineMath math="27=3^3" />.
              </p>
              <Formula tone="violet">{"(a^m)^n=a^{mn}\\qquad\\text{dan}\\qquad a^m\\cdot a^n=a^{m+n}"}</Formula>
            </ColorCard>
            <EquationBridge />
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} difficulty="Mudah" tone="cyan" question={<>Tentukan <InlineMath math="x" /> dari <InlineMath math="4^x=32" />.</>}>
                <p>Tulis semua bilangan sebagai pangkat <InlineMath math="2" />:</p>
                <Formula tone="cyan">{"2^{2x}=2^5\\Rightarrow2x=5\\Rightarrow x=\\frac52"}</Formula>
                <p>Jadi, <InlineMath math="x=\frac52" />.</p>
              </ExampleCard>
              <ExampleCard number={2} difficulty="Sedang" tone="amber" question={<>Selesaikan <InlineMath math="27^{x-1}=9^{x+1}" />.</>}>
                <p>Gunakan basis <InlineMath math="3" />:</p>
                <Formula tone="amber">{"3^{3x-3}=3^{2x+2}"}</Formula>
                <p>Samakan eksponen: <InlineMath math="3x-3=2x+2" />, maka <strong className="text-amber-100"><InlineMath math="x=5" /></strong>.</p>
              </ExampleCard>
              <ExampleCard number={3} difficulty="Sulit" tone="rose" question={<>Tentukan <InlineMath math="x" /> dari <InlineMath math="16^{x+1}=8^{2x-1}" />.</>}>
                <p>Ubah ke basis <InlineMath math="2" />:</p>
                <Formula tone="rose">{"2^{4x+4}=2^{6x-3}\\Rightarrow4x+4=6x-3"}</Formula>
                <p>Berarti <InlineMath math="7=2x" />, sehingga <strong className="text-rose-100"><InlineMath math="x=\frac72" /></strong>. Cek cepat: kedua ruas sama-sama bernilai <InlineMath math="2^{18}" />.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="substitution" title="Strategi 3 · substitusi untuk bentuk kuadrat" eyebrow="Sub-bab 4 · jadikan pangkat sebagai variabel baru" icon={<Calculator className="h-5 w-5" />} tone="amber" open={expanded.includes("substitution")} onToggle={toggle}>
            <ColorCard tone="amber">
              <p className="font-display text-base font-bold text-amber-100">Ringkasan intisari</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-amber-50/85">
                Jika muncul <InlineMath math="a^{2x}" /> dan <InlineMath math="a^x" /> sekaligus, gunakan substitusi <InlineMath math="y=a^x" />. Dengan begitu, <InlineMath math="a^{2x}=(a^x)^2=y^2" /> dan persamaan eksponen berubah menjadi persamaan kuadrat.
              </p>
              <Formula tone="amber">{"y=a^x\\quad\\Longrightarrow\\quad a^{2x}=y^2"}</Formula>
              <Formula tone="amber">{"p\\left(a^{f(x)}\\right)^2+q\\,a^{f(x)}+r=0\\quad\\xrightarrow{\\,y=a^{f(x)}\\,}\\quad py^2+qy+r=0"}</Formula>
              <p className="font-body text-sm leading-relaxed text-amber-50/80">
                Setelah persamaan kuadrat dalam <InlineMath math="y" /> selesai, kembalikan ke <InlineMath math="y=a^{f(x)}" />. Karena <InlineMath math="a^{f(x)}>0" />, hanya akar <InlineMath math="y>0" /> yang boleh dipakai.
              </p>
              <blockquote className="rounded-xl border-l-4 border-rose-300 bg-rose-300/10 px-4 py-3 font-body text-sm leading-relaxed text-rose-50">
                <strong>Catatan penting:</strong> untuk <InlineMath math="a>0" />, nilai <InlineMath math="y=a^x" /> selalu positif. Akar <InlineMath math="y\le0" /> harus ditolak.
              </blockquote>
            </ColorCard>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} difficulty="Mudah" tone="emerald" question={<>Selesaikan <InlineMath math="2^{2x}-5\cdot2^x+6=0" />.</>}>
                <p>Misalkan <InlineMath math="y=2^x" />, sehingga <InlineMath math="2^{2x}=y^2" />:</p>
                <Formula tone="emerald">y^2-5y+6=0\Rightarrow(y-2)(y-3)=0</Formula>
                <p><InlineMath math="y=2" /> memberi <InlineMath math="2^x=2" /> sehingga <InlineMath math="x=1" />. Nilai <InlineMath math="y=3" /> memberi <InlineMath math="x=\log_2 3" />.</p>
                <p className="text-emerald-100"><strong>Jawaban:</strong> <InlineMath math="x=1" /> atau <InlineMath math="x=\log_2 3" />.</p>
              </ExampleCard>
              <ExampleCard number={2} difficulty="Sedang" tone="blue" question={<>Selesaikan <InlineMath math="3^{2x}-10\cdot3^x+9=0" />.</>}>
                <p>Ambil <InlineMath math="y=3^x>0" />:</p>
                <Formula tone="blue">y^2-10y+9=0\Rightarrow(y-1)(y-9)=0</Formula>
                <p>Jika <InlineMath math="y=1" />, maka <InlineMath math="3^x=1=3^0" /> sehingga <InlineMath math="x=0" />.</p>
                <p>Jika <InlineMath math="y=9=3^2" />, maka <InlineMath math="x=2" />. Jadi <strong className="text-blue-100"><InlineMath math="x=0" /> atau <InlineMath math="x=2" /></strong>.</p>
              </ExampleCard>
              <ExampleCard number={3} difficulty="Sulit" tone="rose" question={<>Tentukan penyelesaian <InlineMath math="4^x-6\cdot2^x+8=0" />.</>}>
                <p>Karena <InlineMath math="4^x=(2^2)^x=(2^x)^2" />, misalkan <InlineMath math="y=2^x>0" />:</p>
                <Formula tone="rose">y^2-6y+8=0\Rightarrow(y-2)(y-4)=0</Formula>
                <p><InlineMath math="y=2" /> menghasilkan <InlineMath math="x=1" />; <InlineMath math="y=4=2^2" /> menghasilkan <InlineMath math="x=2" />.</p>
                <p className="text-rose-100"><strong>Himpunan penyelesaian:</strong> <InlineMath math="\{1,2\}" />.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="context" title="Persamaan eksponen di dunia nyata" eyebrow="Sub-bab 5 · terjemahkan cerita menjadi model" icon={<CircleHelp className="h-5 w-5" />} tone="rose" open={expanded.includes("context")} onToggle={toggle}>
            <ColorCard tone="rose">
              <p className="font-display text-base font-bold text-rose-100">Ringkasan intisari</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-rose-50/85">
                Dalam soal cerita, tentukan dulu <strong>nilai awal</strong>, <strong>faktor perubahan</strong>, dan <strong>satuan waktu</strong>. Setelah model eksponennya terbentuk, samakan dengan target yang diketahui.
              </p>
              <Formula tone="rose">{"N(t)=N_0\\cdot r^{t/p}"}</Formula>
              <p className="font-body text-xs text-white/65"><InlineMath math="N_0" /> = nilai awal, <InlineMath math="r" /> = faktor perubahan tiap periode, dan <InlineMath math="p" /> = panjang satu periode.</p>
            </ColorCard>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} difficulty="Mudah" tone="cyan" question={<>Sebuah koloni berisi 200 bakteri dan berlipat dua setiap 3 jam. Kapan jumlahnya menjadi 1.600 bakteri?</>}>
                <p>Modelnya <InlineMath math="N(t)=200\cdot2^{t/3}" />. Masukkan target:</p>
                <Formula tone="cyan">{"200\\cdot2^{t/3}=1.600\\Rightarrow2^{t/3}=8=2^3"}</Formula>
                <p>Samakan pangkat: <InlineMath math="\frac{t}{3}=3" />, jadi <strong className="text-cyan-100"><InlineMath math="t=9" /> jam</strong>.</p>
              </ExampleCard>
              <ExampleCard number={2} difficulty="Sedang" tone="emerald" question={<>Tabungan Rp1.500.000,00 tumbuh 10% per tahun. Setelah berapa tahun nilainya mencapai Rp2.196.150,00?</>}>
                <p>Faktor pertumbuhan 10% adalah <InlineMath math="1+0{,}10=1{,}1" />:</p>
                <Formula tone="emerald">{"1.500.000(1{,}1)^t=2.196.150\\Rightarrow1{,}1^t=1{,}1^4"}</Formula>
                <p>Karena basis sama, <InlineMath math="t=4" />. Jadi tabungan mencapai target setelah <strong className="text-emerald-100">4 tahun</strong>.</p>
              </ExampleCard>
              <ExampleCard number={3} difficulty="Sulit" tone="violet" question={<>Suatu zat bermassa 80 mg memiliki waktu paruh 6 jam. Berapa lama hingga massanya tersisa 10 mg?</>}>
                <p>Model peluruhan: <InlineMath math="m(t)=80\left(\frac12\right)^{t/6}" />. Masukkan massa akhir:</p>
                <Formula tone="violet">{"80\\left(\\frac12\\right)^{t/6}=10\\Rightarrow\\left(\\frac12\\right)^{t/6}=\\frac18=\\left(\\frac12\\right)^3"}</Formula>
                <p>Samakan pangkat: <InlineMath math="\frac{t}{6}=3" />, maka <strong className="text-violet-100"><InlineMath math="t=18" /> jam</strong>.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="summary" title="Peta konsep dan jebakan umum" eyebrow="Penutup · bekal mengajar" icon={<BookOpen className="h-5 w-5" />} tone="blue" open={expanded.includes("summary")} onToggle={toggle}>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[720px] text-left font-body text-sm">
                <thead className="bg-slate-950/60 text-cyan-100">
                  <tr><th className="px-4 py-3">Situasi</th><th className="px-4 py-3">Langkah utama</th><th className="px-4 py-3">Pengingat</th></tr>
                </thead>
                <tbody className="text-white/75">
                  {[
                    ["Basis sama", "$a^m=a^n$", "Samakan eksponen"],
                    ["Bentuk fungsi eksponen", "$a^{f(x)}=a^{g(x)}$", "Samakan $f(x)$ dan $g(x)$"],
                    ["Pangkat sama, basis berbeda", "$a^{f(x)}=b^{f(x)}$", "Jika $a\\ne b$, maka $f(x)=0$"],
                    ["Pangkat fungsi sama", "$f(x)^{h(x)}=g(x)^{h(x)}$", "Jika $h(x)\\ne0$, samakan basis"],
                    ["Basis berupa fungsi", "$h(x)^{f(x)}=h(x)^{g(x)}$", "Periksa $h(x)=1$, $0$, atau $-1$"],
                    ["Basis berbeda", "$4=2^2$, $8=2^3$", "Ubah ke basis yang sama"],
                    ["Bentuk kuadrat", "$p(a^{f(x)})^2+q a^{f(x)}+r=0$", "Substitusi $y=a^{f(x)}$"],
                    ["Soal cerita", "$N(t)=N_0r^{t/p}$", "Periksa satuan waktu"],
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
              <ColorCard tone="amber"><p className="font-bold text-amber-100">Jangan mencoret basis sembarangan</p><p className="mt-2 text-sm leading-relaxed text-white/70">Basis harus positif dan tidak sama dengan <InlineMath math="1" /> agar aturan penyamaan pangkat berlaku.</p></ColorCard>
              <ColorCard tone="rose"><p className="font-bold text-rose-100">Jangan lupa syarat substitusi</p><p className="mt-2 text-sm leading-relaxed text-white/70">Karena <InlineMath math="a^x>0" />, akar substitusi yang nol atau negatif harus dibuang.</p></ColorCard>
              <ColorCard tone="emerald"><p className="font-bold text-emerald-100">Selalu lakukan cek</p><p className="mt-2 text-sm leading-relaxed text-white/70">Masukkan kembali nilai <InlineMath math="x" /> ke persamaan awal untuk memastikan tidak ada langkah yang keliru.</p></ColorCard>
            </div>
            <blockquote className="rounded-2xl border border-cyan-300/25 bg-cyan-300/10 p-4 font-body text-sm leading-relaxed text-cyan-50">
              <strong>Pesan untuk guru:</strong> minta siswa menyebutkan alasan setiap perubahan bentuk, bukan hanya menulis hasil akhir. Pertanyaan kecil seperti “mengapa basisnya diubah?” membantu mereka membangun strategi, bukan sekadar hafalan.
            </blockquote>
          </Accordion>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 text-center font-body text-xs text-white/45">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Samakan basis</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Substitusi dengan teliti</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Cek kembali jawaban</span>
        </div>
      </main>
    </div>
  );
};

export default SmaPersamaanEksponenPage;