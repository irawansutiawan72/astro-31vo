import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import PageNavigation from "@/components/PageNavigation";

type OlympiadQuestion = {
  no: number;
  soal: string;
  category?: string;
  type?: "pg" | "mcma" | "pgkbs";
  options?: string[];
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
      <div className="grid gap-5">{questions.map((question) => <QuestionCard key={question.no} question={question} questionLabel={questionLabel} showDiscussion={showDiscussion} />)}</div>
    </section>
  </main>;
}

function QuestionCard({
  question,
  questionLabel,
  showDiscussion,
}: {
  question: OlympiadQuestion;
  questionLabel: string;
  showDiscussion: boolean;
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
    <div className="mb-3 flex items-center justify-between gap-3"><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Soal {question.no}</span><span className="text-right text-xs text-muted-foreground">{question.category || questionLabel}</span></div>
    <p className="whitespace-pre-line text-base leading-7">{question.soal}</p>
    {question.image && <img src={question.image} alt={`Gambar soal ${question.no}`} className="mx-auto my-4 max-h-72 max-w-full rounded-lg object-contain" />}
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

export type { OlympiadQuestion };