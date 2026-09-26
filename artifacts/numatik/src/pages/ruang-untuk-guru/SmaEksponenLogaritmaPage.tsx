import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  BookOpen,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Sparkles,
  Target,
} from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

type Tone = "cyan" | "emerald" | "amber" | "violet" | "rose" | "blue" | "orange";

const tones: Record<Tone, string> = {
  cyan: "border-cyan-300/30 bg-cyan-400/10",
  emerald: "border-emerald-300/30 bg-emerald-400/10",
  amber: "border-amber-300/30 bg-amber-400/10",
  violet: "border-violet-300/30 bg-violet-400/10",
  rose: "border-rose-300/30 bg-rose-400/10",
  blue: "border-blue-300/30 bg-blue-400/10",
  orange: "border-orange-300/30 bg-orange-400/10",
};

const Formula = ({ children, tone = "cyan" }: { children: string; tone?: Tone }) => (
  <div className={`my-3 overflow-x-auto rounded-xl border px-4 py-3 text-center text-cyan-100 ${tones[tone]}`}>
    <BlockMath math={children} />
  </div>
);

const InfoCard = ({ children, tone = "cyan", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) => (
  <div className={`rounded-2xl border p-4 shadow-lg shadow-black/10 ${tones[tone]} ${className}`}>{children}</div>
);

const ExampleCard = ({
  number,
  tone,
  question,
  children,
}: {
  number: number;
  tone: Tone;
  question: ReactNode;
  children: ReactNode;
}) => (
  <div className={`rounded-2xl border p-4 ${tones[tone]}`}>
    <div className="mb-3 flex items-center gap-2">
      <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">Contoh {number}</span>
    </div>
    <div className="rounded-xl bg-slate-950/45 p-3 font-body text-sm leading-relaxed text-white">{question}</div>
    <div className="mt-3 border-l-2 border-white/25 pl-3 font-body text-sm leading-relaxed text-white/75">
      <p className="mb-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/45">Pembahasan</p>
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
  <section className={`overflow-hidden rounded-3xl border shadow-xl shadow-black/15 ${tones[tone]}`}>
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

const bacteriaSteps = [
  { count: 1, label: "2^0=1", color: "from-emerald-400 to-teal-600", border: "border-emerald-400/50", bg: "bg-emerald-500/20", text: "text-emerald-300" },
  { count: 2, label: "2^1=2", color: "from-cyan-400 to-blue-600", border: "border-cyan-400/50", bg: "bg-cyan-500/20", text: "text-cyan-300" },
  { count: 4, label: "2^2=4", color: "from-violet-400 to-purple-700", border: "border-violet-400/50", bg: "bg-violet-500/20", text: "text-violet-300" },
  { count: 8, label: "2^3=8", color: "from-orange-400 to-red-600", border: "border-orange-400/50", bg: "bg-orange-500/20", text: "text-orange-300" },
  { count: 16, label: "2^4=16", color: "from-pink-400 to-fuchsia-600", border: "border-pink-400/50", bg: "bg-pink-500/20", text: "text-pink-300" },
  { count: 32, label: "2^5=32", color: "from-yellow-400 to-amber-600", border: "border-yellow-400/50", bg: "bg-yellow-500/20", text: "text-yellow-300" },
];

const BacteriaAnimation = () => {
  const [step, setStep] = useState(0);
  const [splitting, setSplitting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const current = bacteriaSteps[step];
  const next = bacteriaSteps[step + 1] ?? current;

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const advance = () => {
    if (splitting) return;
    playPopSound();
    if (step === bacteriaSteps.length - 1) {
      setStep(0);
      return;
    }
    setSplitting(true);
    timer.current = setTimeout(() => {
      setStep((value) => value + 1);
      setSplitting(false);
    }, 900);
  };

  return (
    <div className={`overflow-hidden rounded-2xl border-2 ${current.border} ${current.bg} backdrop-blur-sm`}>
      <div className="px-5 pt-4 text-center">
        <p className="font-body text-xs font-semibold uppercase tracking-widest text-white/60">🎬 Animasi Interaktif</p>
        <h3 className="font-display text-base font-bold text-white">Pembelahan Kuman & Notasi Pangkat</h3>
      </div>
      <div className="flex items-center justify-center py-3">
        <motion.div key={step} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`rounded-full border px-5 py-2 ${current.border} ${current.bg}`}>
          <span className={`font-display text-2xl font-bold ${current.text}`}><InlineMath math={current.label} /></span>
        </motion.div>
      </div>
      <div className="flex min-h-[150px] flex-wrap content-center items-center justify-center gap-3 px-4 py-2">
        {splitting ? Array.from({ length: current.count }, (_, index) => (
          <motion.div
            key={index}
            initial={{ scaleX: 1, scaleY: 0.6 }}
            animate={{ scaleX: 1.8, scaleY: 0.55 }}
            transition={{ duration: 0.7 }}
            className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${current.color} text-xl shadow-lg`}
          >🦠</motion.div>
        )) : Array.from({ length: current.count }, (_, index) => (
          <motion.button
            type="button"
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.025 }}
            onClick={advance}
            aria-label="Belah kuman"
            className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${current.color} text-xl shadow-lg transition hover:scale-110`}
          >🦠</motion.button>
        ))}
      </div>
      <div className="flex justify-center gap-1.5 pb-3">
        {bacteriaSteps.map((item, index) => <div key={item.label} className={`h-1.5 rounded-full transition-all ${index === step ? `w-6 bg-gradient-to-r ${item.color}` : index < step ? "w-3 bg-white/40" : "w-3 bg-white/10"}`} />)}
      </div>
      <div className="px-5 pb-5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={advance}
          disabled={splitting}
          className={`w-full rounded-xl bg-gradient-to-r ${current.color} py-3 font-body text-sm font-bold text-white shadow-lg transition hover:opacity-90 disabled:opacity-50`}
        >
          {splitting ? "⏳ Membelah…" : step === bacteriaSteps.length - 1 ? "🔄 Ulangi dari awal" : `🦠 Tekan untuk membelah! (${current.count} → ${next.count})`}
        </motion.button>
        <p className="mt-2 text-center font-body text-xs text-white/40">{step === bacteriaSteps.length - 1 ? "Sudah 2⁵ = 32 kuman!" : "Klik kuman atau tombol untuk melihat pembelahan selanjutnya"}</p>
      </div>
    </div>
  );
};

const laws = [
  { title: "Sifat 1 · Perkalian", formula: "a^m\\times a^n=a^{m+n}", tone: "emerald" as Tone, text: "Jika basis sama, pangkat dijumlahkan.", example: "2^3\\times2^4=2^7=128" },
  { title: "Sifat 2 · Pembagian", formula: "\\frac{a^m}{a^n}=a^{m-n}", tone: "cyan" as Tone, text: "Jika basis sama, pangkat penyebut dikurangkan.", example: "\\frac{7^8}{7^5}=7^3=343" },
  { title: "Sifat 3 · Pangkat dari pangkat", formula: "(a^m)^n=a^{mn}", tone: "violet" as Tone, text: "Pangkat luar dikalikan dengan pangkat di dalam.", example: "(3^4)^5=3^{20}" },
  { title: "Sifat 4 · Pangkat perkalian", formula: "(ab)^n=a^n b^n", tone: "orange" as Tone, text: "Pangkat dapat didistribusikan ke setiap faktor.", example: "(2\\cdot3)^4=2^4\\cdot3^4" },
  { title: "Sifat 5 · Pangkat pecahan", formula: "\\left(\\frac ab\\right)^n=\\frac{a^n}{b^n}", tone: "rose" as Tone, text: "Pangkat didistribusikan ke pembilang dan penyebut.", example: "\\left(\\frac34\\right)^2=\\frac9{16}" },
  { title: "Sifat 6 · Pangkat nol", formula: "a^0=1\\quad(a\\ne0)", tone: "blue" as Tone, text: "Bilangan bukan nol berpangkat nol bernilai satu.", example: "7^0+(-5)^0+100^0=3" },
  { title: "Sifat 7 · Pangkat negatif", formula: "a^{-n}=\\frac1{a^n}", tone: "amber" as Tone, text: "Pangkat negatif berarti kebalikan dari pangkat positif.", example: "2^{-4}+5^{-1}=\\frac{21}{80}" },
  { title: "Sifat 8 · Pangkat pecahan", formula: "a^{\\frac mn}=\\sqrt[n]{a^m}", tone: "emerald" as Tone, text: "Penyebut menjadi indeks akar dan pembilang menjadi pangkat.", example: "32^{3/5}=\\sqrt[5]{32^3}=8" },
  { title: "Sifat 9 · Perkalian basis", formula: "a^n b^n=(ab)^n", tone: "cyan" as Tone, text: "Dua pangkat dengan eksponen sama dapat digabungkan basisnya.", example: "2^3\\cdot3^3=6^3=216" },
];

const SmaEksponenLogaritmaPage = () => {
  const allSections = ["opening", "concept", "examples", "fraction", "negative", "zero", "laws", "practice", "summary"];
  const [expanded, setExpanded] = useState(allSections);

  const toggle = (id: string) => {
    playPopSound();
    setExpanded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };
  const toggleAll = () => {
    playPopSound();
    setExpanded((current) => current.length === allSections.length ? [] : allSections);
  };
  const open = (id: string) => expanded.includes(id);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#070b23] text-white">
      <Starfield />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[580px] bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.26),_transparent_65%)]" />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma" />

      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-20 pt-16">
        <header className="relative mb-8 overflow-hidden rounded-[2rem] border border-cyan-200/25 bg-gradient-to-br from-cyan-500/20 via-blue-600/15 to-violet-600/20 p-6 text-center shadow-2xl shadow-cyan-950/30 md:p-10">
          <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-8 h-44 w-44 rounded-full bg-cyan-300/15 blur-3xl" />
          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/35 bg-cyan-200/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">
              <BookOpen className="h-4 w-4" /> Buku Animasi Matematika · SMA
            </div>
            <h1 className="font-display text-3xl font-black leading-tight text-cyan-100 drop-shadow-[0_0_18px_rgba(34,211,238,0.35)] md:text-5xl">
              KONSEP DAN SIFAT-SIFAT EKSPONEN
            </h1>
            <p className="mt-3 font-body text-sm text-white/65 md:text-base">Eksponen dan Logaritma · Pengertian, Notasi, dan Operasi Bilangan Berpangkat</p>
            <div className="mx-auto mt-7 max-w-2xl rounded-2xl border border-yellow-200/30 bg-yellow-300/10 p-4 text-left shadow-inner shadow-yellow-100/5 md:p-5">
              <div className="flex gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-yellow-300" />
                <div>
                  <p className="font-display text-base font-bold text-yellow-100">Pernahkah kamu bertanya?</p>
                  <p className="mt-1 font-body text-sm leading-relaxed text-yellow-50/80">Bagaimana menulis perkalian berulang dengan singkat? Dari pertanyaan sederhana ini, kita menemukan notasi pangkat dan sifat-sifatnya.</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-body text-xs text-white/50"><Sparkles className="h-4 w-4 text-yellow-300" /> Materi visual · animasi · contoh bertahap</div>
          <button type="button" onClick={toggleAll} className="rounded-full border border-white/15 bg-white/5 px-3 py-2 font-body text-xs text-white/70 transition hover:border-cyan-300/50 hover:text-cyan-100">
            {expanded.length === allSections.length ? "Tutup semua" : "Buka semua"}
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2 px-1 text-center">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-white/40">Sebelum mulai belajar…</p>
            <h2 className="font-display text-xl font-bold text-white">🦠 Yuk, amati kuman ini membelah diri!</h2>
            <p className="mx-auto max-w-xl font-body text-sm leading-relaxed text-white/60">Tekan tombol di bawah dan perhatikan pola matematika yang tersembunyi di dalam pembelahan sel.</p>
          </div>
          <BacteriaAnimation />

          <Accordion id="opening" title="Perkalian berulang? Ada cara lebih cepat!" eyebrow="Pembuka · motivasi belajar" icon={<Lightbulb className="h-5 w-5" />} tone="amber" open={open("opening")} onToggle={toggle}>
            <InfoCard tone="amber">
              <p className="font-body text-sm leading-relaxed text-amber-50/85">Kuman berkembang dari <strong className="text-yellow-200">1, 2, 4, 8, 16, 32</strong>. Menulis perkalian 2 berulang kali sampai generasi ke-10 tentu panjang dan melelahkan. Notasi pangkat meringkasnya menjadi:</p>
              <Formula tone="amber">{"2^{10}=1.024"}</Formula>
              <p className="font-body text-sm leading-relaxed text-white/75">Notasi pangkat juga dipakai untuk menulis bilangan sangat besar dan sangat kecil.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-950/35 p-3"><p className="mb-2 text-xs font-bold text-cyan-200">📏 Bilangan sangat besar</p><p className="text-sm text-white/70">Kecepatan cahaya: <InlineMath math="3\\times10^8" /> m/s</p><p className="text-sm text-white/70">Perkiraan kekayaan: <InlineMath math="2\\times10^{11}" /> dolar</p></div>
                <div className="rounded-xl bg-slate-950/35 p-3"><p className="mb-2 text-xs font-bold text-emerald-200">🔬 Bilangan sangat kecil</p><p className="text-sm text-white/70">Ukuran bakteri: <InlineMath math="2\\times10^{-6}" /> m</p><p className="text-sm text-white/70">Ukuran virus: <InlineMath math="1\\times10^{-7}" /> m</p></div>
              </div>
            </InfoCard>
          </Accordion>

          <Accordion id="concept" title="Pengertian dan notasi pangkat" eyebrow="Bagian 1 · konsep dasar" icon={<Target className="h-5 w-5" />} tone="emerald" open={open("concept")} onToggle={toggle}>
            <InfoCard tone="emerald">
              <p className="font-body text-sm leading-relaxed text-white/80"><strong className="text-emerald-200">Bilangan berpangkat</strong> adalah cara singkat menuliskan perkalian berulang dari bilangan yang sama.</p>
              <Formula tone="emerald">{"a^n=\\underbrace{a\\times a\\times a\\times\\cdots\\times a}_{n\\text{ faktor}}"}</Formula>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-950/35 p-3 text-center"><p className="font-display text-3xl font-black text-cyan-200">a</p><p className="text-xs font-bold text-white">Basis</p><p className="text-xs text-white/55">bilangan yang dikalikan</p></div>
                <div className="rounded-xl bg-slate-950/35 p-3 text-center"><p className="font-display text-3xl font-black text-yellow-200">n</p><p className="text-xs font-bold text-white">Eksponen</p><p className="text-xs text-white/55">banyak faktor</p></div>
                <div className="rounded-xl bg-slate-950/35 p-3 text-center"><p className="font-display text-3xl font-black text-violet-200">aⁿ</p><p className="text-xs font-bold text-white">Nilai berpangkat</p><p className="text-xs text-white/55">hasil perkalian berulang</p></div>
              </div>
            </InfoCard>
            <InfoCard tone="cyan">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-200">🔍 Anatomi notasi pangkat</p>
              <div className="rounded-xl bg-slate-950/45 p-4 text-center"><span className="font-display text-6xl font-black text-white">5<sup className="text-3xl text-yellow-300">3</sup></span><p className="mt-2 font-body text-sm text-white/65"><InlineMath math="5^3=5\\times5\\times5=125" /> · dibaca “lima pangkat tiga”</p></div>
              <p className="mt-3 font-body text-sm text-yellow-100"><strong>Tips:</strong> pangkat 2 disebut kuadrat dan pangkat 3 disebut kubik.</p>
            </InfoCard>
          </Accordion>

          <Accordion id="examples" title="Contoh pengertian bilangan berpangkat" eyebrow="Bagian 2 · latihan bertahap" icon={<Calculator className="h-5 w-5" />} tone="blue" open={open("examples")} onToggle={toggle}>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} tone="emerald" question={<>Nyatakan <InlineMath math="7\\times7\\times7\\times7" /> dalam notasi pangkat.</>}>
                <Formula tone="emerald">{"7\\times7\\times7\\times7=7^4"}</Formula><p>Basis = 7 dan eksponen = 4. Nilainya <InlineMath math="2.401" />.</p>
              </ExampleCard>
              <ExampleCard number={2} tone="blue" question={<>Kubus memiliki rusuk 6 cm. Tentukan volumenya.</>}>
                <Formula>{"V=s^3=6^3=216\\,\\mathrm{cm}^3"}</Formula><p>Volume kubus adalah sisi dikalikan tiga kali.</p>
              </ExampleCard>
              <ExampleCard number={3} tone="violet" question={<>Bakteri membelah menjadi 2 setiap jam. Berapa setelah 8 jam?</>}>
                <Formula>2^8=256</Formula><p>Setelah 8 jam terdapat 256 bakteri.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="fraction" title="Pecahan berpangkat" eyebrow="Bagian 3 · basis pecahan" icon={<Target className="h-5 w-5" />} tone="violet" open={open("fraction")} onToggle={toggle}>
            <InfoCard tone="violet">
              <p className="font-body text-sm text-white/80">Pangkat pada pecahan diterapkan secara terpisah kepada pembilang dan penyebut.</p>
              <Formula tone="violet">{"\\left(\\frac pq\\right)^n=\\frac pq\\times\\cdots\\times\\frac pq=\\frac{p^n}{q^n}"}</Formula>
              <p className="font-body text-sm text-yellow-100"><strong>Tips:</strong> pangkatkan pembilang dan penyebutnya secara terpisah.</p>
            </InfoCard>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} tone="violet" question={<>Hitung <InlineMath math="\\left(\\frac35\\right)^3" />.</>}><Formula>{"\\left(\\frac35\\right)^3=\\frac{3^3}{5^3}=\\frac{27}{125}"}</Formula></ExampleCard>
              <ExampleCard number={2} tone="blue" question={<>Hitung <InlineMath math="\\left(\\frac23\\right)^4" />.</>}><Formula>{"\\left(\\frac23\\right)^4=\\frac{16}{81}"}</Formula></ExampleCard>
              <ExampleCard number={3} tone="rose" question={<>Sederhanakan <InlineMath math="\\left(\\frac{x^3}{y^2}\\right)^4" />.</>}><Formula>{"\\frac{x^{12}}{y^8}"}</Formula></ExampleCard>
            </div>
          </Accordion>

          <Accordion id="negative" title="Bilangan negatif berpangkat" eyebrow="Bagian 4 · perhatikan tanda kurung" icon={<AlertTriangle className="h-5 w-5" />} tone="orange" open={open("negative")} onToggle={toggle}>
            <InfoCard tone="orange">
              <p className="font-body text-sm text-white/80">Tanda kurung menentukan apakah tanda minus termasuk ke dalam basis.</p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-cyan-300/25 bg-slate-950/40 p-3"><p className="font-bold text-cyan-200">(-a)ⁿ · minus termasuk basis</p><Formula tone="cyan">{"(-a)^n=(-a)\\times\\cdots\\times(-a)"}</Formula><p className="text-xs text-white/65">Pangkat genap menghasilkan positif, pangkat ganjil menghasilkan negatif.</p></div>
                <div className="rounded-xl border border-rose-300/25 bg-slate-950/40 p-3"><p className="font-bold text-rose-200">-aⁿ · minus di luar basis</p><Formula tone="rose">-a^n=-(a^n)</Formula><p className="text-xs text-white/65">Hanya a yang dipangkatkan, kemudian diberi tanda minus.</p></div>
              </div>
              <Formula tone="orange">{"(-3)^2=9\\qquad\\text{sedangkan}\\qquad-3^2=-9"}</Formula>
            </InfoCard>
            <div className="grid gap-4 md:grid-cols-2">
              <ExampleCard number={1} tone="emerald" question={<>Tentukan nilai <InlineMath math="(-4)^2" /> dan <InlineMath math="-4^2" />.</>}><Formula>{"(-4)^2=16\\qquad-4^2=-16"}</Formula><p>Hasil berbeda karena posisi tanda kurung berbeda.</p></ExampleCard>
              <ExampleCard number={2} tone="orange" question={<>Tentukan <InlineMath math="(-3)^4,(-3)^3,-3^4" />.</>}><Formula>{"(-3)^4=81,\\quad(-3)^3=-27,\\quad-3^4=-81"}</Formula><p>Genap positif, ganjil negatif, dan minus di luar tetap negatif.</p></ExampleCard>
            </div>
          </Accordion>

          <Accordion id="zero" title="Pangkat nol dan pangkat negatif" eyebrow="Bagian 5 · perluasan definisi" icon={<CheckCircle2 className="h-5 w-5" />} tone="cyan" open={open("zero")} onToggle={toggle}>
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard tone="cyan"><p className="font-bold text-cyan-200">Pangkat nol</p><p className="mt-2 text-sm text-white/75">Setiap bilangan bukan nol berpangkat nol bernilai satu.</p><Formula>{"a^0=1\\quad(a\\ne0)"}</Formula><p className="text-xs text-white/60"><InlineMath math="2^4=16,2^3=8,2^2=4,2^1=2,2^0=1" /></p></InfoCard>
              <InfoCard tone="amber"><p className="font-bold text-amber-200">Pangkat negatif</p><p className="mt-2 text-sm text-white/75">Pangkat negatif adalah kebalikan dari pangkat positif.</p><Formula>{"a^{-n}=\\frac1{a^n}\\quad(a\\ne0)"}</Formula><p className="text-xs text-white/60"><InlineMath math="3^{-2}=\\frac19" /></p></InfoCard>
            </div>
            <div className="rounded-xl border border-yellow-300/25 bg-yellow-400/10 p-4 text-sm text-yellow-100"><strong>Catatan penting:</strong> <InlineMath math="0^0" /> tidak terdefinisi. Rumus <InlineMath math="a^0=1" /> hanya berlaku jika <InlineMath math="a\\ne0" />.</div>
          </Accordion>

          <Accordion id="laws" title="Sifat-sifat operasi bilangan berpangkat" eyebrow="Bagian 6 · sembilan sifat utama" icon={<Sparkles className="h-5 w-5" />} tone="blue" open={open("laws")} onToggle={toggle}>
            <InfoCard tone="blue"><p className="font-body text-sm leading-relaxed text-white/80">Kuasai logika setiap sifat, bukan hanya menghafal rumusnya. Jika lupa, rumus dapat diturunkan kembali dari definisi perkalian berulang.</p></InfoCard>
            <div className="grid gap-4 md:grid-cols-2">
              {laws.map((law) => (
                <InfoCard key={law.title} tone={law.tone}>
                  <p className="font-display text-sm font-bold text-white">{law.title}</p>
                  <Formula tone={law.tone}>{law.formula}</Formula>
                  <p className="font-body text-sm leading-relaxed text-white/75">{law.text}</p>
                  <div className="mt-3 rounded-xl bg-slate-950/45 p-3 text-center"><InlineMath math={law.example} /></div>
                </InfoCard>
              ))}
            </div>
          </Accordion>

          <Accordion id="practice" title="Contoh soal gabungan" eyebrow="Bagian 7 · terapkan beberapa sifat" icon={<Calculator className="h-5 w-5" />} tone="amber" open={open("practice")} onToggle={toggle}>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number={1} tone="emerald" question={<>Hitung <InlineMath math="5^0+3^{-2}" />.</>}><Formula>{"5^0+3^{-2}=1+\\frac19=\\frac{10}{9}"}</Formula></ExampleCard>
              <ExampleCard number={2} tone="violet" question={<>Sederhanakan <InlineMath math="\\frac{(-2)^3\\times3^{-2}}{6^0}" />.</>}><Formula>{"\\frac{-8\\times\\frac19}{1}=-\\frac89"}</Formula></ExampleCard>
              <ExampleCard number={3} tone="rose" question={<>Jika <InlineMath math="a=2^{-3}" />, tentukan <InlineMath math="a^{-2}" />.</>}><Formula>{"a^{-2}=(2^{-3})^{-2}=2^6=64"}</Formula></ExampleCard>
            </div>
          </Accordion>

          <Accordion id="summary" title="Rangkuman konsep dan sifat" eyebrow="Peta konsep · simpan sebagai pengingat" icon={<BookOpen className="h-5 w-5" />} tone="rose" open={open("summary")} onToggle={toggle}>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[700px] text-left font-body text-sm">
                <thead className="bg-slate-950/60 text-cyan-100"><tr><th className="px-4 py-3">Materi</th><th className="px-4 py-3">Rumus inti</th><th className="px-4 py-3">Kunci</th></tr></thead>
                <tbody className="text-white/75">
                  {[
                    ["Definisi", "a^n=\\underbrace{a\\cdots a}_n", "Perkalian berulang"],
                    ["Pangkat nol", "a^0=1", "a\\ne0"],
                    ["Pangkat negatif", "a^{-n}=\\frac1{a^n}", "Kebalikan"],
                    ["Pecahan", "\\left(\\frac ab\\right)^n=\\frac{a^n}{b^n}", "Distribusi"],
                    ["Perkalian basis sama", "a^m a^n=a^{m+n}", "Jumlahkan pangkat"],
                    ["Pembagian basis sama", "\\frac{a^m}{a^n}=a^{m-n}", "Kurangkan pangkat"],
                    ["Pangkat dari pangkat", "(a^m)^n=a^{mn}", "Kalikan pangkat"],
                    ["Pangkat pecahan", "a^{m/n}=\\sqrt[n]{a^m}", "Akar dan pangkat"],
                  ].map(([name, formula, key], index) => (
                    <tr key={name} className={`border-t border-white/5 ${index % 2 === 0 ? "bg-white/[0.025]" : ""}`}>
                      <td className="px-4 py-3 font-semibold text-white">{name}</td>
                      <td className="px-4 py-3 text-cyan-100"><InlineMath math={formula} /></td>
                      <td className="px-4 py-3">{key}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <InfoCard tone="rose"><div className="flex gap-3"><AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-200" /><p className="font-body text-sm leading-relaxed text-rose-50/85"><strong>Jebakan umum:</strong> jangan menggabungkan basis yang berbeda pada perkalian, dan selalu periksa tanda kurung pada bilangan negatif.</p></div></InfoCard>
          </Accordion>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 text-center font-body text-xs text-white/45">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Basis dan eksponen</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Pahami pola, bukan hafalan</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Siap dipakai mengajar</span>
        </div>
      </main>
    </div>
  );
};

export default SmaEksponenLogaritmaPage;