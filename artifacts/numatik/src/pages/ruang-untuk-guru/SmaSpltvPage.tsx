import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Target,
  WandSparkles,
} from "lucide-react";
import { BlockMath, InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const InlineMath = ({ math }: { math: string }) => <KaTeXInlineMath math={math} />;

const Formula = ({ math, label }: { math: string; label?: string }) => (
  <div className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/90 px-4 py-3 text-center text-cyan-100 sm:px-6">
    {label && <p className="mb-2 text-left font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/45">{label}</p>}
    <BlockMath math={math} />
  </div>
);

const SectionTitle = ({
  index,
  kicker,
  title,
  description,
}: {
  index: string;
  kicker: string;
  title: string;
  description: string;
}) => (
  <div className="mb-6 flex gap-4" data-testid={`section-heading-${index}`}>
    <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-display text-xs font-black text-cyan-100">
      {index}
    </span>
    <div>
      <p className="mb-1 font-body text-[10px] font-black uppercase tracking-[.22em] text-cyan-200/65">{kicker}</p>
      <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-slate-300">{description}</p>
    </div>
  </div>
);

const HeroIllustration = () => (
  <div className="relative mx-auto grid w-full max-w-sm gap-3" aria-label="Ilustrasi tiga persamaan yang bertemu pada satu solusi">
    {[
      { label: "PETUNJUK 1", expression: "x + y + z = ...", color: "border-cyan-200/30 bg-cyan-200/[.08] text-cyan-100" },
      { label: "PETUNJUK 2", expression: "2x − y + z = ...", color: "border-violet-200/30 bg-violet-200/[.08] text-violet-100" },
      { label: "PETUNJUK 3", expression: "x + 2y − z = ...", color: "border-amber-200/30 bg-amber-200/[.08] text-amber-100" },
    ].map((item, index) => (
      <div
        key={item.label}
        className={`spl-t-v-float flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 shadow-lg shadow-black/20 ${item.color}`}
        style={{ animationDelay: `${index * 180}ms` }}
      >
        <span className="text-[9px] font-black tracking-[.18em] opacity-65">{item.label}</span>
        <span className="font-display text-sm font-bold sm:text-base">{item.expression}</span>
      </div>
    ))}
    <div className="mx-auto flex items-center gap-2 rounded-full border border-emerald-200/25 bg-emerald-300/[.08] px-4 py-2 text-xs font-bold text-emerald-100">
      <Sparkles className="h-4 w-4" /> Temukan satu trio jawaban!
    </div>
  </div>
);

const exampleSteps = [
  {
    title: "Kenali tiga petunjuknya",
    note: "Kita punya tiga persamaan sekaligus. Supaya variabel berkurang satu demi satu, mulai dengan menghilangkan z.",
    formulas: [
      { label: "Persamaan (1)", math: "x + y + z = 12" },
      { label: "Persamaan (2) dan (3)", math: "2x − y + z = 8,  x + 2y − z = 1" },
    ],
  },
  {
    title: "Hilangkan z, dapatkan dua persamaan baru",
    note: "Kurangkan (2) dari (1) agar z lenyap. Lalu jumlahkan (1) dan (3); z juga saling meniadakan.",
    formulas: [
      { label: "(1) − (2)", math: "−x + 2y = 4" },
      { label: "(1) + (3)", math: "2x + 3y = 13" },
    ],
  },
  {
    title: "Cari x dan y",
    note: "Kalikan persamaan pertama dengan 2, lalu jumlahkan. Setelah y ditemukan, masukkan kembali untuk memperoleh x.",
    formulas: [
      { label: "Jumlahkan kedua persamaan", math: "(−2x + 4y) + (2x + 3y) = 8 + 13" },
      { label: "Nilai y", math: "7y = 21 → y = 3" },
      { label: "Masukkan y = 3 ke −x + 2y = 4", math: "−x + 6 = 4 → x = 2" },
    ],
  },
  {
    title: "Lengkapi z, lalu cek semuanya",
    note: "Masukkan x = 2 dan y = 3 ke persamaan (1). Terakhir, pastikan ketiganya benar-benar memenuhi tiga persamaan awal.",
    formulas: [
      { label: "Cari z dari (1)", math: "2 + 3 + z = 12 → z = 7" },
      { label: "Cek (1), (2), dan (3)", math: "2 + 3 + 7 = 12; 2(2) − 3 + 7 = 8; 2 + 2(3) − 7 = 1" },
    ],
    answer: "Jadi, solusi SPLTV ini adalah (x, y, z) = (2, 3, 7).",
  },
];

type PracticeChoice = { value: string; label: string };
type PracticeCardProps = {
  id: string;
  title: string;
  equations: string[];
  choices: PracticeChoice[];
  selected?: string;
  correctValue: string;
  explanation: string;
  onSelect: (choice: string) => void;
};

const PracticeCard = ({
  id,
  title,
  equations,
  choices,
  selected,
  correctValue,
  explanation,
  onSelect,
}: PracticeCardProps) => {
  const isCorrect = selected === correctValue;
  return (
    <article className="rounded-3xl border border-violet-200/20 bg-[linear-gradient(145deg,rgba(59,40,103,.2),rgba(14,25,42,.92))] p-5 sm:p-6" data-testid={`practice-card-${id}`}>
      <div className="mb-4 flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-violet-200/20 bg-violet-200/[.08] font-display text-sm font-black text-violet-100">{id}</span>
        <div>
          <h3 className="font-display text-lg font-extrabold text-white">{title}</h3>
          <p className="mt-1 font-body text-sm text-slate-300">Pilih trio <InlineMath math="(x,y,z)" /> yang memenuhi semua persamaan.</p>
        </div>
      </div>
      <div className="mb-4 grid gap-2 sm:grid-cols-3">
        {equations.map((equation, index) => (
          <div key={equation} className="rounded-xl border border-white/10 bg-[#071326]/75 px-2 py-2 text-center">
            <p className="mb-1 text-[9px] font-black uppercase tracking-[.16em] text-white/40">Persamaan {index + 1}</p>
            <InlineMath math={equation} />
          </div>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {choices.map((choice, index) => (
          <button
            type="button"
            key={choice.value}
            onClick={() => { playPopSound(); onSelect(choice.value); }}
            aria-pressed={selected === choice.value}
            data-testid={`button-answer-${id}-${index + 1}`}
            className={`rounded-xl border px-3 py-3 font-display text-sm font-bold transition hover:-translate-y-0.5 ${
              selected === choice.value
                ? isCorrect
                  ? "border-emerald-200/50 bg-emerald-300/15 text-emerald-100"
                  : "border-rose-200/50 bg-rose-300/15 text-rose-100"
                : "border-white/10 bg-white/[.04] text-white/80 hover:border-violet-200/35 hover:bg-violet-200/[.08]"
            }`}
          >
            <InlineMath math={choice.label} />
          </button>
        ))}
      </div>
      {selected && (
        <p
          className={`mt-4 flex items-start gap-2 rounded-xl border p-3 font-body text-sm leading-relaxed ${
            isCorrect
              ? "border-emerald-200/20 bg-emerald-300/[.07] text-emerald-50"
              : "border-rose-200/20 bg-rose-300/[.07] text-rose-50"
          }`}
          aria-live="polite"
          data-testid={`feedback-${id}`}
        >
          {isCorrect ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />}
          {isCorrect ? `Tepat! ${explanation}` : "Belum cocok. Coba substitusikan pilihanmu ke ketiga persamaan, lalu pilih lagi."}
        </p>
      )}
    </article>
  );
};

const SmaSpltvPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const currentStep = exampleSteps[step];

  const changeStep = (nextStep: number) => {
    playPopSound();
    setStep(nextStep);
  };

  const selectAnswer = (id: string, choice: string) => {
    setAnswers((current) => ({ ...current, [id]: choice }));
  };

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
      <Starfield />
      <style>{`
        @keyframes spltv-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .spl-t-v-float { animation: spltv-float 3.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
        }
      `}</style>
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/sistem-persamaan-dan-pertidaksamaan-linear" />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-28 pt-8 sm:px-7 sm:pt-12 lg:px-10">
        <header className="relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.94),rgba(16,22,43,.92)_60%,rgba(44,31,70,.76))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10" data-testid="lesson-hero">
          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-cyan-100/10" />
          <div className="pointer-events-none absolute -right-2 top-0 h-52 w-52 rounded-full border border-violet-200/10" />
          <div className="relative grid items-center gap-7 md:grid-cols-[1.15fr_.85fr]">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Matematika · SMA</span>
                <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">Sistem Persamaan Linear</span>
              </div>
              <p className="mb-2 font-body text-xs font-bold uppercase tracking-[.24em] text-amber-200">Ruang untuk bertumbuh</p>
              <h1 className="max-w-2xl font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="lesson-title">
                SPLTV: tiga variabel, <span className="text-cyan-200">satu petualangan!</span>
              </h1>
              <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">
                Tiga persamaan menyimpan tiga petunjuk. Yuk, susun strategi, eliminasi variabel, dan temukan trio nilai yang cocok!
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-amber-100">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>Misi kita: memahami konsep, menuntaskan contoh, lalu mencoba sendiri.</span>
              </div>
            </div>
            <HeroIllustration />
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_250px]">
          <div className="min-w-0 space-y-12">
            <section id="spltv-concept" data-testid="spltv-concept-section">
              <SectionTitle index="01" kicker="Mulai dari ide utama" title="Apa itu SPLTV?" description="SPLTV adalah beberapa persamaan linear yang bekerja bersama untuk mencari tiga nilai yang belum diketahui." />
              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-3xl border border-cyan-200/20 bg-[linear-gradient(145deg,rgba(13,92,112,.2),rgba(18,27,43,.86))] p-5 sm:p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-200/10 text-cyan-200"><Target className="h-5 w-5" /></span>
                    <h3 className="font-display text-xl font-extrabold text-cyan-100">Tiga variabel</h3>
                  </div>
                  <p className="font-body text-sm leading-relaxed text-slate-300">
                    Huruf <strong className="text-white"><InlineMath math="x" />, <InlineMath math="y" />, dan <InlineMath math="z" /></strong> mewakili nilai yang sedang kita cari. Disebut linear karena setiap variabel berpangkat satu dan tidak saling dikalikan.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["x + 2y − z = 5", "3x − y + z = 9", "2x + y + 4z = 12"].map((item) => (
                      <span key={item} className="rounded-full border border-cyan-200/15 bg-cyan-100/[.06] px-3 py-1.5 font-body text-xs text-cyan-50/90"><InlineMath math={item} /></span>
                    ))}
                  </div>
                </article>
                <article className="rounded-3xl border border-violet-200/20 bg-[linear-gradient(145deg,rgba(92,58,145,.2),rgba(18,27,43,.86))] p-5 sm:p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-200/10 text-violet-200"><BookOpen className="h-5 w-5" /></span>
                    <h3 className="font-display text-xl font-extrabold text-violet-100">Tiga persamaan</h3>
                  </div>
                  <p className="font-body text-sm leading-relaxed text-slate-300">Setiap persamaan memberi petunjuk berbeda. Jawaban disebut solusi jika pasangan nilai yang sama membuat <strong className="text-white">ketiga persamaan benar sekaligus</strong>.</p>
                  <div className="mt-4 space-y-2">
                    <Formula math="a_1x + b_1y + c_1z = d_1" label="Bentuk umum · persamaan 1" />
                    <Formula math="a_2x + b_2y + c_2z = d_2" label="Persamaan 2" />
                    <Formula math="a_3x + b_3y + c_3z = d_3" label="Persamaan 3" />
                  </div>
                </article>
              </div>
              <div className="mt-4 flex gap-3 rounded-2xl border border-amber-200/15 bg-amber-300/[.06] p-4 text-sm leading-relaxed text-amber-50/90">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" />
                <p><strong className="text-amber-100">Catatan penting:</strong> tiga persamaan belum tentu menghasilkan tepat satu solusi. Setelah menghitung, masukkan kembali hasilnya ke semua persamaan untuk memastikan jawaban kita pas!</p>
              </div>
            </section>

            <section id="spltv-methods" data-testid="spltv-methods-section">
              <SectionTitle index="02" kicker="Pilih strategi" title="Bagaimana cara menyelesaikannya?" description="Prinsipnya: ubah SPLTV menjadi sistem dua variabel, selesaikan, lalu cari nilai terakhir." />
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  { title: "Eliminasi", color: "cyan", icon: <WandSparkles className="h-5 w-5" />, detail: "Samakan koefisien satu variabel, lalu jumlahkan atau kurangkan persamaan agar variabel itu hilang." },
                  { title: "Substitusi", color: "violet", icon: <ArrowRight className="h-5 w-5" />, detail: "Nyatakan satu variabel dari sebuah persamaan, kemudian gantikan nilainya ke persamaan lain." },
                  { title: "Cara campuran", color: "amber", icon: <Sparkles className="h-5 w-5" />, detail: "Gabungkan eliminasi dan substitusi. Biasanya ini terasa luwes: pilih langkah yang paling sederhana." },
                ].map((method) => (
                  <article key={method.title} className={`rounded-2xl border p-4 ${method.color === "cyan" ? "border-cyan-200/20 bg-cyan-200/[.045]" : method.color === "violet" ? "border-violet-200/20 bg-violet-200/[.045]" : "border-amber-200/20 bg-amber-200/[.045]"}`}>
                    <div className={`mb-3 flex items-center gap-2 font-display text-lg font-extrabold ${method.color === "cyan" ? "text-cyan-100" : method.color === "violet" ? "text-violet-100" : "text-amber-100"}`}>
                      {method.icon}{method.title}
                    </div>
                    <p className="font-body text-sm leading-relaxed text-slate-300">{method.detail}</p>
                  </article>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-[#101b2d]/85 p-4 sm:p-5">
                <p className="mb-3 font-body text-xs font-black uppercase tracking-[.17em] text-cyan-100">Rute eliminasi yang rapi</p>
                <ol className="grid gap-3 sm:grid-cols-3">
                  {[
                    "Pilih satu variabel dan eliminasi dari sepasang persamaan.",
                    "Eliminasi variabel yang sama dari pasangan lain.",
                    "Selesaikan dua variabel, lalu substitusikan untuk nilai ketiga.",
                  ].map((item, index) => (
                    <li key={item} className="flex gap-3 rounded-xl border border-white/[.06] bg-white/[.025] p-3 font-body text-sm leading-relaxed text-slate-300">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cyan-200/10 font-display text-xs font-black text-cyan-100">{index + 1}</span>{item}
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section id="spltv-example" data-testid="spltv-example-section">
              <SectionTitle index="03" kicker="Kita kerjakan bareng" title="Ikuti jejak sampai ketemu solusinya" description="Coba baca satu langkah dulu, lalu tekan tombol berikutnya. Perhatikan bagaimana variabel berkurang secara bertahap." />
              <article className="overflow-hidden rounded-3xl border border-amber-200/20 bg-[linear-gradient(135deg,rgba(81,59,26,.16),rgba(14,25,42,.94)_55%)]" data-testid="worked-spltv-example">
                <div className="border-b border-white/10 px-5 py-4 sm:px-6">
                  <p className="font-body text-xs font-black uppercase tracking-[.18em] text-amber-200">Contoh terpandu · angka baru</p>
                  <p className="mt-2 font-body text-sm text-slate-300">Tentukan <InlineMath math="x,y,z" /> yang memenuhi sistem berikut.</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {["x + y + z = 12", "2x − y + z = 8", "x + 2y − z = 1"].map((equation, index) => (
                      <div key={equation} className="rounded-xl border border-white/10 bg-[#071326]/75 px-2 py-2 text-center">
                        <p className="mb-1 text-[9px] font-black uppercase tracking-[.16em] text-white/40">({index + 1})</p>
                        <InlineMath math={equation} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="mb-4 flex flex-wrap items-center gap-2" aria-label={`Langkah ${step + 1} dari ${exampleSteps.length}`}>
                    {exampleSteps.map((item, index) => (
                      <button
                        type="button"
                        key={item.title}
                        onClick={() => changeStep(index)}
                        aria-label={`Buka langkah ${index + 1}: ${item.title}`}
                        aria-current={index === step ? "step" : undefined}
                        data-testid={`button-example-step-${index + 1}`}
                        className={`h-2.5 rounded-full transition-all ${index === step ? "w-9 bg-cyan-300" : "w-2.5 bg-white/20 hover:bg-white/40"}`}
                      />
                    ))}
                    <span className="ml-auto font-body text-xs font-bold text-cyan-100/70">Langkah {step + 1} / {exampleSteps.length}</span>
                  </div>
                  <motion.div
                    key={step}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-2xl border border-cyan-200/15 bg-[#071326]/55 p-4 sm:p-5"
                    data-testid="example-step-content"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-200/10 text-cyan-100"><WandSparkles className="h-5 w-5" /></span>
                      <h3 className="font-display text-lg font-extrabold text-white">{currentStep.title}</h3>
                    </div>
                    <p className="mb-4 font-body text-sm leading-relaxed text-slate-300">{currentStep.note}</p>
                    <div className="grid gap-3">
                      {currentStep.formulas.map((formula) => <Formula key={formula.label} math={formula.math} label={formula.label} />)}
                    </div>
                    {currentStep.answer && (
                      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-200/20 bg-emerald-300/[.07] p-4 text-emerald-50" data-testid="worked-example-answer">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-200" />
                        <p className="font-body text-sm leading-relaxed"><strong>{currentStep.answer}</strong></p>
                      </div>
                    )}
                  </motion.div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => changeStep(Math.max(0, step - 1))}
                      disabled={step === 0}
                      data-testid="button-example-previous"
                      className="inline-flex items-center gap-1 rounded-xl border border-white/10 px-3 py-2 font-body text-xs font-bold text-white/75 transition hover:bg-white/[.06] disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <ChevronLeft className="h-4 w-4" /> Sebelumnya
                    </button>
                    {step === exampleSteps.length - 1 ? (
                      <button type="button" onClick={() => changeStep(0)} data-testid="button-example-restart" className="inline-flex items-center gap-1 rounded-xl bg-cyan-300/15 px-3 py-2 font-body text-xs font-bold text-cyan-100 transition hover:bg-cyan-300/25">
                        <RotateCcw className="h-3.5 w-3.5" /> Ulangi dari awal
                      </button>
                    ) : (
                      <button type="button" onClick={() => changeStep(Math.min(exampleSteps.length - 1, step + 1))} data-testid="button-example-next" className="inline-flex items-center gap-1 rounded-xl bg-cyan-300/15 px-3 py-2 font-body text-xs font-bold text-cyan-100 transition hover:bg-cyan-300/25">
                        Langkah berikutnya <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            </section>

            <section id="spltv-application" data-testid="spltv-application-section">
              <SectionTitle index="04" kicker="Matematika di sekitar kita" title="Dari cerita menjadi persamaan" description="Harga beberapa barang bisa dicari dengan cara yang sama—terjemahkan petunjuk belanja menjadi tiga persamaan." />
              <div className="rounded-3xl border border-emerald-200/20 bg-[linear-gradient(140deg,rgba(6,78,59,.2),rgba(14,25,42,.93)_55%)] p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-200/10 text-emerald-200"><BookOpen className="h-5 w-5" /></span>
                  <h3 className="font-display text-xl font-extrabold text-emerald-100">Misi bazar kelas</h3>
                </div>
                <p className="font-body text-sm leading-relaxed text-slate-300">
                  Di bazar, buku catatan berharga <InlineMath math="x" /> ribu rupiah, pulpen <InlineMath math="y" /> ribu rupiah, dan penggaris <InlineMath math="z" /> ribu rupiah. Tiga paket belanja mencatat total <InlineMath math="16" />, <InlineMath math="39" />, dan <InlineMath math="27" /> ribu rupiah.
                </p>
                <div className="my-4 grid gap-2 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-[#071326]/75 p-3 text-center"><p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-100/60">Paket A</p><InlineMath math="x + y + z = 16" /></div>
                  <div className="rounded-xl border border-white/10 bg-[#071326]/75 p-3 text-center"><p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-100/60">Paket B</p><InlineMath math="2x + y + 3z = 39" /></div>
                  <div className="rounded-xl border border-white/10 bg-[#071326]/75 p-3 text-center"><p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-100/60">Paket C</p><InlineMath math="x + 3y + 2z = 27" /></div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-emerald-200/15 bg-emerald-200/[.05] p-4">
                  <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-emerald-200" />
                  <p className="font-body text-sm leading-relaxed text-emerald-50/90"><strong className="text-emerald-100">Cara menerjemahkan:</strong> banyak barang menjadi koefisien, harga satuan menjadi variabel, dan jumlah pembayaran menjadi ruas kanan. Setelah sistem terbentuk, gunakan eliminasi-substitusi seperti contoh tadi.</p>
                </div>
              </div>
            </section>

            <section id="spltv-practice" data-testid="spltv-practice-section">
              <SectionTitle index="05" kicker="Giliranmu!" title="Cek ketelitian si pemecah SPLTV" description="Pilih satu jawaban untuk setiap tantangan. Petunjuk kecil: uji pilihanmu dengan memasukkan nilainya ke semua persamaan." />
              <div className="space-y-4">
                <PracticeCard
                  id="1"
                  title="Tantangan pertama"
                  equations={["x + y + z = 9", "2x − y + z = 8", "x + 2y − z = 3"]}
                  choices={[
                    { value: "3,2,4", label: "(3, 2, 4)" },
                    { value: "2,3,4", label: "(2, 3, 4)" },
                    { value: "3,4,2", label: "(3, 4, 2)" },
                  ]}
                  selected={answers.first}
                  correctValue="3,2,4"
                  explanation="nilai x = 3, y = 2, dan z = 4 memenuhi ketiga persamaan."
                  onSelect={(choice) => selectAnswer("first", choice)}
                />
                <PracticeCard
                  id="2"
                  title="Tantangan kedua"
                  equations={["x + y + z = 6", "2x − y + z = 3", "x + 2y + z = 8"]}
                  choices={[
                    { value: "1,2,3", label: "(1, 2, 3)" },
                    { value: "2,1,3", label: "(2, 1, 3)" },
                    { value: "1,3,2", label: "(1, 3, 2)" },
                  ]}
                  selected={answers.second}
                  correctValue="1,2,3"
                  explanation="nilai x = 1, y = 2, dan z = 3 memenuhi ketiga persamaan."
                  onSelect={(choice) => selectAnswer("second", choice)}
                />
              </div>
            </section>

            <section id="spltv-summary" data-testid="spltv-summary-section">
              <SectionTitle index="06" kicker="Bawa pulang idenya" title="Ringkasan kilat" description="Sebelum menutup buku, yuk kumpulkan lagi bekal penting kita." />
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "SPLTV memuat tiga variabel linear dan tiga persamaan yang saling terkait.",
                  "Solusi ditulis sebagai trio terurut (x, y, z) dan harus cocok di semua persamaan.",
                  "Eliminasi mengurangi jumlah variabel; substitusi membantu menemukan nilai berikutnya.",
                  "Periksa kembali hasil akhir ke setiap persamaan agar tidak ada tanda yang terlewat.",
                ].map((item, index) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-cyan-200/15 bg-cyan-200/[.045] p-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cyan-200/10 font-display text-xs font-black text-cyan-100">{index + 1}</span>
                    <p className="font-body text-sm leading-relaxed text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-amber-200/20 bg-amber-200/[.06] p-4 text-amber-50/90">
                <Sparkles className="h-5 w-5 shrink-0 text-amber-200" />
                <p className="font-body text-sm leading-relaxed"><strong className="text-amber-100">Kamu bisa!</strong> Kalau tiga persamaan terasa ramai, rapikan langkahnya satu demi satu. Setiap eliminasi membawa kita lebih dekat ke jawabannya.</p>
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-8 rounded-3xl border border-white/10 bg-[#101b2d]/80 p-4 backdrop-blur">
              <p className="mb-3 flex items-center gap-2 font-body text-xs font-black uppercase tracking-[.17em] text-cyan-100"><Target className="h-4 w-4" /> Peta belajar</p>
              <nav aria-label="Navigasi materi SPLTV" className="space-y-1">
                {[
                  ["spltv-concept", "Kenali SPLTV"],
                  ["spltv-methods", "Pilih strategi"],
                  ["spltv-example", "Contoh terpandu"],
                  ["spltv-application", "Cerita bazar"],
                  ["spltv-practice", "Coba sendiri"],
                  ["spltv-summary", "Ringkasan"],
                ].map(([id, label], index) => (
                  <a key={id} href={`#${id}`} data-testid={`link-lesson-section-${index + 1}`} className="flex items-center gap-2 rounded-xl px-3 py-2.5 font-body text-xs text-slate-300 transition hover:bg-cyan-200/[.08] hover:text-cyan-100">
                    <span className="grid h-6 w-6 place-items-center rounded-lg bg-white/[.06] text-[10px] font-bold text-cyan-100/80">{index + 1}</span>{label}
                  </a>
                ))}
              </nav>
              <div className="mt-4 rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-3">
                <p className="flex items-center gap-2 font-display text-sm font-bold text-violet-100"><ArrowRight className="h-4 w-4" /> Trik kecil</p>
                <p className="mt-2 font-body text-xs leading-relaxed text-slate-400">Tulis nomor persamaan saat menjumlah atau mengurangkan. Tanda plus dan minus jadi lebih mudah dilacak!</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SmaSpltvPage;
