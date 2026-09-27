import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ClipboardList, RotateCcw } from "lucide-react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

type Question = {
  number: number;
  before: string;
  formula: string;
  after: string;
  options: string[];
};

const questions: Question[] = [
  {
    number: 1,
    before: "Diketahui persamaan eksponensial",
    formula: String.raw`5^{2x-8}=1`,
    after: "Tentukan nilai x yang memenuhi!",
    options: [String.raw`8`, String.raw`6`, String.raw`4`, String.raw`2`, String.raw`0`],
  },
  {
    number: 2,
    before: "Tentukan himpunan penyelesaian dari persamaan",
    formula: String.raw`\frac{3^{x^2}}{3^{x+2}}=1`,
    after: "",
    options: [
      String.raw`\{-1,2\}`,
      String.raw`\{-2,1\}`,
      String.raw`\{-1,-2\}`,
      String.raw`\{1,2\}`,
      String.raw`\{2,3\}`,
    ],
  },
  {
    number: 3,
    before: "Agar nilai dari",
    formula: String.raw`5\cdot3^{x-1}=45`,
    after: "terpenuhi, maka nilai x adalah ...",
    options: [String.raw`1`, String.raw`2`, String.raw`3`, String.raw`4`, String.raw`5`],
  },
  {
    number: 4,
    before: "Nilai x yang memenuhi persamaan",
    formula: String.raw`\frac{\left(\sqrt[3]{\frac{1}{64}}\right)^x}{2^{x-5}}=1`,
    after: "adalah ...",
    options: [String.raw`\frac{5}{3}`, String.raw`2`, String.raw`\frac{10}{7}`, String.raw`1`, String.raw`\frac{2}{3}`],
  },
  {
    number: 5,
    before: "Apabila",
    formula: String.raw`\left(\frac{3}{3^{x-2}}\right)^2\cdot\sqrt[3]{\frac{1}{27}}=1`,
    after: "berapakah nilai dari x + 2?",
    options: [String.raw`3`, String.raw`4`, String.raw`4{,}5`, String.raw`5`, String.raw`5{,}5`],
  },
  {
    number: 6,
    before: "Nilai variabel x yang memenuhi",
    formula: String.raw`3^{3x-2}=3^7`,
    after: "adalah ...",
    options: [String.raw`1`, String.raw`2`, String.raw`3`, String.raw`4`, String.raw`5`],
  },
  {
    number: 7,
    before: "Apabila",
    formula: String.raw`4^{2x-1}=32`,
    after: "maka nilai x adalah ...",
    options: [String.raw`1{,}17`, String.raw`1{,}25`, String.raw`1{,}35`, String.raw`1{,}50`, String.raw`1{,}75`],
  },
  {
    number: 8,
    before: "Himpunan penyelesaian persamaan eksponen",
    formula: String.raw`3^{x^2-3x}=81`,
    after: "adalah ...",
    options: [
      String.raw`\{-1,4\}`,
      String.raw`\{1,-4\}`,
      String.raw`\{2,-2\}`,
      String.raw`\{-2,4\}`,
      String.raw`\{1,4\}`,
    ],
  },
  {
    number: 9,
    before: "Berapa nilai x yang memenuhi",
    formula: String.raw`\left(\sqrt[4]{3}\right)^{x+6}=27`,
    after: "?",
    options: [String.raw`6`, String.raw`5`, String.raw`4`, String.raw`3`, String.raw`2`],
  },
  {
    number: 10,
    before: "Tentukan nilai x yang memenuhi persamaan:",
    formula: String.raw`2^x\cdot(2^{x+1})^x\cdot(2^x)^{1-x}=32`,
    after: "",
    options: [String.raw`1`, String.raw`2`, String.raw`3`, String.raw`4`, String.raw`5`],
  },
  {
    number: 11,
    before: "Jika",
    formula: String.raw`2^{3x+1}=16^{x-2}`,
    after: "maka harga x yang sesuai adalah ...",
    options: [String.raw`7`, String.raw`8`, String.raw`9`, String.raw`10`, String.raw`11`],
  },
  {
    number: 12,
    before: "Nilai x yang memenuhi",
    formula: String.raw`\sqrt{4^{3x-1}}=8^{x+1}`,
    after: "adalah ...",
    options: [
      String.raw`2`,
      String.raw`4`,
      String.raw`6`,
      String.raw`8`,
      String.raw`\text{Tidak ada nilai }x\text{ yang memenuhi}`,
    ],
  },
  {
    number: 13,
    before: "Nilai x yang memenuhi persamaan",
    formula: String.raw`2^{3x+1}+2^{3x+3}=10\cdot\sqrt[3]{8^{x+1}}`,
    after: "adalah ...",
    options: [String.raw`0{,}25`, String.raw`0{,}50`, String.raw`0{,}75`, String.raw`1{,}00`, String.raw`1{,}25`],
  },
  {
    number: 14,
    before: "Himpunan penyelesaian dari",
    formula: String.raw`x^{x^2}=x^{5x-6}`,
    after: "adalah ...",
    options: [
      String.raw`\{1,2,3\}`,
      String.raw`\{-1,1,2,3\}`,
      String.raw`\{0,2,3\}`,
      String.raw`\{2,3\}`,
      String.raw`\{1,3\}`,
    ],
  },
  {
    number: 15,
    before: "Himpunan penyelesaian dari",
    formula: String.raw`(x+3)^{x+2}=(x+3)^{x^2-4}`,
    after: "adalah ...",
    options: [
      String.raw`\{-2,3\}`,
      String.raw`\{-3,-2,3\}`,
      String.raw`\{-4,-2,3\}`,
      String.raw`\{-4,-3,-2,3\}`,
      String.raw`\{-2,1,3\}`,
    ],
  },
  {
    number: 16,
    before: "Tentukan semua nilai x yang memenuhi persamaan",
    formula: String.raw`(x-2)^{x^2+2}=(x-2)^{4x-1}`,
    after: "!",
    options: [
      String.raw`\{-1,1,3\}`,
      String.raw`\{1,3\}`,
      String.raw`\{1,2,3\}`,
      String.raw`\{3\}`,
      String.raw`\{1\}`,
    ],
  },
  {
    number: 17,
    before: "Diketahui",
    formula: String.raw`(2x+1)^{3x^2-12}=(4x-3)^{3x^2-12}`,
    after: "Manakah dari pilihan berikut yang merupakan nilai-nilai x yang memenuhi persamaan tersebut?",
    options: [
      String.raw`2`,
      String.raw`-2`,
      String.raw`2\text{ atau }-2`,
      String.raw`2\text{ atau }1`,
      String.raw`-2, 2\text{, atau }2`,
    ],
  },
  {
    number: 18,
    before: "Solusi dari persamaan eksponen",
    formula: String.raw`3^{2x}-3^{x+1}-18=0`,
    after: "adalah ...",
    options: [
      String.raw`x=2`,
      String.raw`x=1`,
      String.raw`x=0`,
      String.raw`x=2\text{ dan }x=-3`,
      String.raw`x=1\text{ dan }x=-2`,
    ],
  },
  {
    number: 19,
    before: "Jika",
    formula: String.raw`2^{2x+1}+7\cdot2^x-4=0`,
    after: "maka harga x yang tepat adalah ...",
    options: [String.raw`-2`, String.raw`-1`, String.raw`0`, String.raw`1`, String.raw`2`],
  },
  {
    number: 20,
    before: "Nilai dari penyelesaian persamaan",
    formula: String.raw`5^x-\frac{125}{5^x}-20=0`,
    after: "adalah ...",
    options: [String.raw`1`, String.raw`2`, String.raw`3`, String.raw`4`, String.raw`5`],
  },
  {
    number: 21,
    before: "Hasil penjumlahan dari semua akar-akar persamaan",
    formula: String.raw`2\cdot4^x-9\cdot2^x+4=0`,
    after: "adalah ...",
    options: [String.raw`-1`, String.raw`0`, String.raw`1`, String.raw`2`, String.raw`4`],
  },
];

const optionLabels = ["A", "B", "C", "D", "E"];

const SmaPersamaanEksponenLatihanPage = () => {
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
              PERSAMAAN EKSPONEN
            </h1>
            <p className="mt-3 font-body text-sm text-white/65 md:text-base">
              Tugas-Latihan Mandiri · Eksponen dan Logaritma
            </p>
            <div className="mx-auto mt-7 max-w-2xl rounded-2xl border border-cyan-200/25 bg-cyan-300/10 p-4 text-left shadow-inner shadow-cyan-100/5 md:p-5">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
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
                      {question.after}
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

export default SmaPersamaanEksponenLatihanPage;