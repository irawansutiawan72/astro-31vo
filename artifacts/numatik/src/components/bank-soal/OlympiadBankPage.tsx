import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import PageNavigation from "@/components/PageNavigation";

type OlympiadQuestion = {
  no: number;
  soal: string;
  category?: string;
  type?: "pg" | "mcma" | "pgkbs";
  options?: string[];
  diagram?: "numberLine" | "temperatureGlasses";
  statementList?: string[];
  correctIndex?: number;
  correctIndices?: number[];
  statementAnswers?: boolean[];
  jawaban?: string;
  image?: string;
  pembahasan?: { konsep?: string; langkah?: string[]; rumus?: string };
};

export default function OlympiadBankPage({
  title,
  questions,
  heading,
  topicLabel,
  headline,
  headlineDescription,
  backPath,
  questionLabel = "Olimpiade Matematika",
  showDiscussion = true,
  showQuestionCategory = true,
}: {
  title: string;
  questions: OlympiadQuestion[];
  heading?: string;
  topicLabel?: string;
  headline?: string;
  headlineDescription?: string;
  backPath?: string;
  questionLabel?: string;
  showDiscussion?: boolean;
  showQuestionCategory?: boolean;
}) {
  return <main className="relative min-h-screen overflow-hidden bg-background px-4 py-10 text-foreground">
    {backPath && <PageNavigation prevPath={backPath} />}
    <section className="relative z-10 mx-auto max-w-4xl">
      <div className="mb-8 overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-[0_8px_30px_rgba(8,145,178,0.12)]">
        <div className="h-1.5 bg-primary" />
        <div className="px-5 py-6 text-center md:px-8 md:py-7">
          <div className="mx-auto mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-primary/50" />
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">Numatik</span>
            <span className="h-px w-12 bg-primary/50" />
          </div>
          <h1 className="text-balance text-2xl font-bold text-primary md:text-3xl">{heading || `BANK SOAL – ${title}`}</h1>
          {topicLabel ? (
            <p className="mt-2 text-sm font-medium text-muted-foreground">{topicLabel}</p>
          ) : headline && (
            <div className="mx-auto mt-5 max-w-2xl rounded-xl border border-primary/25 bg-primary/10 px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Misi Materi</p>
              <h2 className="mt-1 text-balance text-xl font-bold text-foreground md:text-2xl">{headline}</h2>
              {headlineDescription && <p className="mt-2 text-sm leading-6 text-muted-foreground">{headlineDescription}</p>}
            </div>
          )}
          {!topicLabel && <p className="mt-4 text-sm text-muted-foreground">Soal Olimpiade Matematika lengkap dengan pembahasan</p>}
        </div>
      </div>
      <div className="grid gap-5">{questions.map((question) => <QuestionCard key={question.no} question={question} questionLabel={questionLabel} showDiscussion={showDiscussion} showQuestionCategory={showQuestionCategory} />)}</div>
    </section>
  </main>;
}

function QuestionCard({
  question,
  questionLabel,
  showDiscussion,
  showQuestionCategory,
}: {
  question: OlympiadQuestion;
  questionLabel: string;
  showDiscussion: boolean;
  showQuestionCategory: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [selectedStatements, setSelectedStatements] = useState<Record<number, boolean>>({});
  const [checked, setChecked] = useState(false);
  const isInteractive = Boolean(question.type && question.options?.length);

  const toggleMultipleChoice = (index: number) => {
    setSelectedIndices((current) => {
      const next = new Set(current);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
    setChecked(false);
  };

  const checkMultipleChoice = () => {
    if (selectedIndices.size > 0) setChecked(true);
  };

  const multipleChoiceIsCorrect = (index: number) =>
    question.correctIndices?.includes(index) ?? false;

  return <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
    <div className="mb-3 flex items-center justify-between gap-3"><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Soal {question.no}</span>{showQuestionCategory && <span className="text-right text-xs text-muted-foreground">{question.category || questionLabel}</span>}</div>
    <p className="whitespace-pre-line text-base leading-7">{question.soal}</p>
    {question.image && <img src={question.image} alt={`Gambar soal ${question.no}`} className="mx-auto my-4 max-h-72 max-w-full rounded-lg object-contain" />}
    {question.diagram === "numberLine" && <IntegerNumberLine />}
    {question.diagram === "temperatureGlasses" && <TemperatureGlassesDiagram />}
    {question.statementList && (
      <ol className="mt-3 grid gap-1 pl-6 text-base leading-7 marker:font-semibold marker:text-primary">
        {question.statementList.map((statement) => <li key={statement}>{statement}</li>)}
      </ol>
    )}
    {isInteractive && question.type === "pg" && question.correctIndex !== undefined && (
      <div className="mt-4 grid gap-2">
        {question.options?.map((option, index) => {
          const selected = selectedIndex === index;
          const answered = selectedIndex !== null;
          const correct = index === question.correctIndex;
          const stateClass = !answered
            ? "border-border bg-background/50 hover:border-primary/60 hover:bg-primary/5"
            : correct
            ? "border-emerald-400 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
            : selected
            ? "border-rose-400 bg-rose-500/10 text-rose-700 dark:text-rose-300"
            : "border-border bg-background/30 opacity-60";
          return (
            <button
              key={option}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-all ${stateClass}`}
            >
              <span>{option}</span>
              {answered && selected && <span className="float-right font-bold">{correct ? "✓ Benar" : "✗ Salah"}</span>}
            </button>
          );
        })}
      </div>
    )}
    {isInteractive && question.type === "mcma" && question.correctIndices && (
      <div className="mt-4">
        <div className="grid gap-2">
          {question.options?.map((option, index) => {
            const selected = selectedIndices.has(index);
            const correct = multipleChoiceIsCorrect(index);
            const stateClass = !checked
              ? selected
                ? "border-primary bg-primary/10"
                : "border-border bg-background/50 hover:border-primary/60"
              : correct
              ? "border-emerald-400 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              : selected
              ? "border-rose-400 bg-rose-500/10 text-rose-700 dark:text-rose-300"
              : "border-border bg-background/30 opacity-60";
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggleMultipleChoice(index)}
                className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-all ${stateClass}`}
              >
                <span className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded border border-current text-[10px]">
                  {selected ? "✓" : ""}
                </span>
                <span>{option}</span>
                {checked && <span className="float-right font-bold">{correct ? "✓ Benar" : selected ? "✗ Salah" : ""}</span>}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={checkMultipleChoice}
          className="mt-3 w-full rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
        >
          Periksa Jawaban
        </button>
        {checked && (
          <p className={`mt-2 text-center text-sm font-semibold ${[...selectedIndices].every(multipleChoiceIsCorrect) && selectedIndices.size === question.correctIndices.length ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`}>
            {[...selectedIndices].every(multipleChoiceIsCorrect) && selectedIndices.size === question.correctIndices.length
              ? "Jawaban kamu benar!"
              : "Masih ada jawaban yang perlu diperbaiki."}
          </p>
        )}
      </div>
    )}
    {isInteractive && question.type === "pgkbs" && question.statementAnswers && (
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="bg-primary/10">
              <th className="border border-border px-3 py-2 text-left">Pernyataan</th>
              <th className="w-24 border border-border px-2 py-2 text-center">Benar</th>
              <th className="w-24 border border-border px-2 py-2 text-center">Salah</th>
            </tr>
          </thead>
          <tbody>
            {question.options?.map((option, index) => {
              const selected = selectedStatements[index];
              const answered = selected !== undefined;
              const correct = answered && selected === question.statementAnswers?.[index];
              const rowClass = !answered
                ? ""
                : correct
                ? "bg-emerald-500/10"
                : "bg-rose-500/10";
              return (
                <tr key={option} className={rowClass}>
                  <td className="border border-border px-3 py-2">{option.replace(/^[a-c]\.\s*/i, "")}</td>
                  {[true, false].map((value) => (
                    <td key={String(value)} className="border border-border px-2 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedStatements((current) => ({ ...current, [index]: value }))}
                        className={`w-full rounded-lg border px-2 py-1.5 text-xs font-bold transition-all ${
                          selected === value
                            ? correct
                              ? "border-emerald-400 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                              : "border-rose-400 bg-rose-500/20 text-rose-700 dark:text-rose-300"
                            : "border-border bg-background/40 hover:border-primary/60"
                        }`}
                      >
                        {value ? "Benar" : "Salah"}
                        {selected === value && (correct ? " ✓" : " ✗")}
                      </button>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {Object.keys(selectedStatements).length === question.statementAnswers.length && (
          <p className={`mt-2 text-center text-sm font-semibold ${Object.entries(selectedStatements).every(([key, value]) => value === question.statementAnswers?.[Number(key)]) ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`}>
            {Object.entries(selectedStatements).every(([key, value]) => value === question.statementAnswers?.[Number(key)])
              ? "Semua jawaban benar!"
              : "Ada pernyataan yang jawabannya belum tepat."}
          </p>
        )}
      </div>
    )}
    {!isInteractive && !!question.options?.length && <div className="mt-4 grid gap-2 text-sm leading-6 text-muted-foreground">{question.options.map((option) => <p key={option}>{option}</p>)}</div>}
    {showDiscussion && <button type="button" onClick={() => setOpen((value) => !value)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/20">{open ? "Sembunyikan Pembahasan" : "Lihat Pembahasan"}{open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</button>}
    {showDiscussion && open && <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm leading-7"><p className="font-semibold text-primary">Jawaban: {question.jawaban || "Tidak tersedia"}</p>{question.pembahasan?.konsep && <p className="mt-2"><strong>Konsep:</strong> {question.pembahasan.konsep}</p>}{question.pembahasan?.langkah?.map((step, index) => <p key={`${question.no}-${index}`} className="mt-1">{index + 1}. {step}</p>)}{question.pembahasan?.rumus && <p className="mt-2"><strong>Rumus:</strong> {question.pembahasan.rumus}</p>}</div>}
  </article>;
}

function IntegerNumberLine() {
  const values = Array.from({ length: 13 }, (_, index) => index - 6);
  const xFor = (value: number) => 34 + (value + 6) * 38;
  const points = [
    { label: "P", value: -4, color: "#22d3ee" },
    { label: "Q", value: -2, color: "#a78bfa" },
    { label: "R", value: 1, color: "#34d399" },
    { label: "S", value: 3, color: "#fbbf24" },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-xl border border-primary/20 bg-primary/5 px-3 py-2" aria-label="Garis bilangan dengan P di minus 4, Q di minus 2, R di 1, dan S di 3">
      <svg viewBox="0 0 524 112" className="mx-auto h-auto min-w-[440px] max-w-full" role="img">
        <line x1="24" y1="58" x2="500" y2="58" stroke="currentColor" strokeWidth="2" className="text-primary" />
        <path d="M24 58 L34 52 L34 64 Z M500 58 L490 52 L490 64 Z" fill="currentColor" className="text-primary" />
        {values.map((value) => (
          <g key={value}>
            <line x1={xFor(value)} y1="50" x2={xFor(value)} y2="66" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
            <text x={xFor(value)} y="84" textAnchor="middle" fontSize="12" fill="currentColor" className="text-muted-foreground">{value}</text>
          </g>
        ))}
        {points.map((point) => (
          <g key={point.label}>
            <circle cx={xFor(point.value)} cy="58" r="7" fill={point.color} />
            <text x={xFor(point.value)} y="30" textAnchor="middle" fontSize="13" fontWeight="700" fill={point.color}>{point.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function TemperatureGlassesDiagram() {
  const glasses = [
    { label: "W", temperature: "18°C", x: 28, color: "#fbbf24", fill: "#f59e0b", level: 102 },
    { label: "X", temperature: "−25°C", x: 148, color: "#60a5fa", fill: "#2563eb", level: 122 },
    { label: "Y", temperature: "−4°C", x: 268, color: "#a78bfa", fill: "#7c3aed", level: 114 },
    { label: "Z", temperature: "7°C", x: 388, color: "#34d399", fill: "#059669", level: 108 },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-xl border border-primary/20 bg-primary/5 px-3 py-2" aria-label="Ilustrasi empat gelas dengan suhu W 18 derajat Celsius, X minus 25 derajat Celsius, Y minus 4 derajat Celsius, dan Z 7 derajat Celsius">
      <svg viewBox="0 0 520 180" className="mx-auto h-auto min-w-[440px] max-w-full" role="img">
        <text x="260" y="18" textAnchor="middle" fontSize="13" fontWeight="700" fill="currentColor">Perbandingan suhu air dalam gelas</text>
        {glasses.map((glass) => (
          <g key={glass.label}>
            <text x={glass.x + 42} y="43" textAnchor="middle" fontSize="15" fontWeight="700" fill={glass.color}>{glass.label}</text>
            <path d={`M${glass.x + 12} 55 L${glass.x + 72} 55 L${glass.x + 64} 143 Q${glass.x + 42} 158 ${glass.x + 20} 143 Z`} fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
            <path d={`M${glass.x + 20} ${glass.level} L${glass.x + 64} ${glass.level} L${glass.x + 61} 140 Q${glass.x + 42} 151 ${glass.x + 23} 140 Z`} fill={glass.fill} fillOpacity="0.7" />
            <line x1={glass.x + 20} y1={glass.level} x2={glass.x + 64} y2={glass.level} stroke={glass.color} strokeWidth="2" />
            <text x={glass.x + 42} y="174" textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor">{glass.temperature}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export type { OlympiadQuestion };