import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, CheckCircle2, ClipboardList, RotateCcw } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

type Question = {
  number: number;
  before: string;
  formula: string;
  after: string;
  secondaryFormula?: string;
  ending?: string;
  options: string[];
};

const questions: Question[] = [
  {
    number: 1,
    before: "Bentuk sederhana dari",
    formula: String.raw`(5x^4 y^2)\cdot(4x^3 y^5)`,
    after: "adalah ....",
    options: [String.raw`20x^7 y^7`, String.raw`20x^{12} y^{10}`, String.raw`20x^7 y^{10}`, String.raw`9x^7 y^7`, String.raw`9x^{12} y^{10}`],
  },
  {
    number: 2,
    before: "Hasil dari ekspresi aljabar",
    formula: String.raw`(a^3+b^3)(a^3-b^3)`,
    after: "adalah ....",
    options: [String.raw`a^6+b^6`, String.raw`a^6-b^6`, String.raw`a^9-b^9`, String.raw`a^6-2a^3b^3+b^6`, String.raw`a^5-b^5`],
  },
  {
    number: 3,
    before: "Bentuk sederhana dari",
    formula: String.raw`\frac{\left(\frac{1}{2}\right)^2p^5q^3}{\left(\frac{1}{2}\right)^4p^2q^6}`,
    after: "adalah ....",
    options: [String.raw`\frac{p^3}{4q^3}`, String.raw`\frac{4p^3}{q^3}`, String.raw`\frac{p^3q^3}{4}`, String.raw`\frac{4q^3}{p^3}`, String.raw`4p^3q^3`],
  },
  {
    number: 4,
    before: "Nilai dari",
    formula: String.raw`\frac{3^{m+3}-3^{m+1}}{3^m-3^{m+2}}`,
    after: "adalah ....",
    options: [String.raw`-2`, String.raw`-1`, String.raw`1`, String.raw`2`, String.raw`8`],
  },
  {
    number: 5,
    before: "Hasil pemangkatan dari",
    formula: String.raw`(2p^3)^5`,
    after: "adalah ....",
    options: [String.raw`10p^8`, String.raw`10p^{15}`, String.raw`32p^8`, String.raw`32p^{15}`, String.raw`64p^{15}`],
  },
  {
    number: 6,
    before: "Jika",
    formula: String.raw`a\ne0\text{ dan }b\ne0`,
    after: "bentuk sederhana dari",
    secondaryFormula: String.raw`\left[\left(a\cdot b^k\right)^{2-k}\right]^3\cdot\left[\left(a\cdot b^k\right)^{k-2}\right]^3`,
    ending: "adalah ....",
    options: [String.raw`(ab)^{6k-6k^2}`, String.raw`a^3b^{3k}`, String.raw`a^6b^{6k^2}`, String.raw`1`, String.raw`0`],
  },
  {
    number: 7,
    before: "Bentuk sederhana dari",
    formula: String.raw`(27a^6b^4)\cdot\left(\frac{1}{3^2}a^{-4}b^{-3}\right)`,
    after: "adalah ....",
    options: [String.raw`3a^2b`, String.raw`3a^{-2}b^{-1}`, String.raw`9a^2b`, String.raw`9a^{-2}b`, String.raw`27a^2b`],
  },
  {
    number: 8,
    before: "Nilai dari bentuk",
    formula: String.raw`\frac{(0{,}5)^0-(0{,}2)^{-1}}{\left(\frac{2}{5^2}\right)^{-1}\cdot\left(\frac{2}{5}\right)^2+\left(-\frac{1}{2}\right)^{-1}}`,
    after: "adalah ....",
    options: [String.raw`-\frac{4}{3}`, String.raw`-\frac{3}{4}`, String.raw`\frac{3}{4}`, String.raw`\frac{4}{3}`, String.raw`1`],
  },
  {
    number: 9,
    before: "Bentuk sederhana dari",
    formula: String.raw`\left(\frac{4x^5\cdot y^{-4}}{64x^8\cdot y^{-1}}\right)^{-1}`,
    after: "adalah ....",
    options: [String.raw`(4xy)^3`, String.raw`(2xy)^3`, String.raw`(4xy)^2`, String.raw`(2xy)^2`, String.raw`(2xy)^{-3}`],
  },
  {
    number: 10,
    before: "Bentuk sederhana dari",
    formula: String.raw`\frac{a^{-1}-b^{-1}}{a^{-1}+b^{-1}}`,
    after: "adalah ....",
    options: [String.raw`\frac{b+a}{b-a}`, String.raw`\frac{b-a}{b+a}`, String.raw`\frac{a-b}{a+b}`, String.raw`\frac{a+b}{a-b}`, String.raw`1`],
  },
];

const optionLabels = ["A", "B", "C", "D", "E"];

const SmaEksponenLogaritmaLatihanPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Record<number, number>>({});

  const selectOption = (questionNumber: number, optionIndex: number) => {
    playPopSound();
    setSelected((current) => ({ ...current, [questionNumber]: optionIndex }));
  };

  const resetAnswers = () => {
    playPopSound();
    setSelected({});
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#070b23] text-white">
      <Starfield />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,_rgba(217,70,239,0.24),_transparent_68%)]" />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/tugas-latihan-mandiri/eksponen-dan-logaritma" />

      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-20 pt-16">
        <header className="relative mb-8 overflow-hidden rounded-[2rem] border border-fuchsia-200/25 bg-gradient-to-br from-fuchsia-500/20 via-violet-600/15 to-cyan-600/20 p-6 text-center shadow-2xl shadow-fuchsia-950/30 md:p-10">
          <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-8 h-44 w-44 rounded-full bg-fuchsia-300/15 blur-3xl" />
          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-200/35 bg-fuchsia-200/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-100">
              <ClipboardList className="h-4 w-4" />
              Ruang untuk Guru · SMA
            </div>
            <h1 className="font-display text-3xl font-black leading-tight text-fuchsia-100 drop-shadow-[0_0_18px_rgba(232,121,249,0.35)] md:text-5xl">
              KONSEP DAN SIFAT-SIFAT EKSPONEN
            </h1>
            <p className="mt-3 font-body text-sm text-white/65 md:text-base">
              Tugas-Latihan Mandiri · Eksponen dan Logaritma
            </p>
            <div className="mx-auto mt-7 max-w-2xl rounded-2xl border border-cyan-200/25 bg-cyan-300/10 p-4 text-left shadow-inner shadow-cyan-100/5 md:p-5">
              <div className="flex gap-3">
                <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                <div>
                  <p className="font-display text-base font-bold text-cyan-100">Latihan mandiri</p>
                  <p className="mt-1 font-body text-sm leading-relaxed text-cyan-50/80">
                    Pilih jawaban yang menurutmu paling tepat. Klik kembali pada opsi lain jika ingin mengganti pilihan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-body text-white/50">
            <CheckCircle2 className="h-4 w-4 text-fuchsia-300" />
            {questions.length} soal pilihan ganda · opsi A–E
          </div>
          <button
            type="button"
            onClick={resetAnswers}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 font-body text-xs text-white/70 transition hover:border-fuchsia-300/50 hover:text-fuchsia-100"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Hapus pilihan
          </button>
        </div>

        <div className="space-y-4">
          {questions.map((question) => {
            const chosen = selected[question.number];
            return (
              <article key={question.number} className="overflow-hidden rounded-3xl border border-fuchsia-300/25 bg-gradient-to-br from-fuchsia-400/10 via-slate-950/45 to-violet-500/10 shadow-xl shadow-black/15">
                <div className="flex items-start gap-3 border-b border-white/10 px-5 py-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-fuchsia-300/45 bg-fuchsia-400/15 font-display text-sm font-black text-fuchsia-100">
                    {question.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-body text-sm leading-relaxed text-white/90">
                      {question.before}{" "}
                      <span className="inline-block max-w-full align-middle overflow-x-auto">
                        <InlineMath math={question.formula} />
                      </span>{" "}
                      {question.after}{" "}
                      {question.secondaryFormula && (
                        <span className="inline-block max-w-full align-middle overflow-x-auto">
                          <InlineMath math={question.secondaryFormula} />
                        </span>
                      )}{" "}
                      {question.ending ?? ""}
                    </p>
                  </div>
                </div>

                <div className="grid gap-2 px-5 py-4 sm:grid-cols-2">
                  {question.options.map((option, optionIndex) => {
                    const isChosen = chosen === optionIndex;
                    return (
                      <button
                        key={optionLabels[optionIndex]}
                        type="button"
                        onClick={() => selectOption(question.number, optionIndex)}
                        aria-pressed={isChosen}
                        className={`flex min-h-12 items-center gap-3 rounded-xl border px-3 py-2 text-left transition-all ${
                          isChosen
                            ? "border-fuchsia-300/70 bg-fuchsia-400/20 text-fuchsia-50 shadow-[0_0_18px_rgba(217,70,239,0.12)]"
                            : "border-white/10 bg-white/[0.04] text-white/80 hover:border-fuchsia-300/40 hover:bg-fuchsia-400/10"
                        }`}
                      >
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-black ${
                          isChosen ? "border-fuchsia-200 bg-fuchsia-300/25 text-fuchsia-50" : "border-white/20 bg-white/10 text-white/65"
                        }`}>
                          {optionLabels[optionIndex]}
                        </span>
                        <span className="min-w-0 overflow-x-auto text-sm">
                          <InlineMath math={option} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 text-center font-body text-xs text-white/45">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Eksponen dan Logaritma</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{Object.keys(selected).length} dari {questions.length} dipilih</span>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => { playPopSound(); navigate("/ruang-untuk-guru/sma/tugas-latihan-mandiri/eksponen-dan-logaritma"); }}
            className="font-body text-sm text-white/50 transition hover:text-fuchsia-200"
          >
            Kembali ke subtopik
          </button>
        </div>
      </main>
    </div>
  );
};

export default SmaEksponenLogaritmaLatihanPage;