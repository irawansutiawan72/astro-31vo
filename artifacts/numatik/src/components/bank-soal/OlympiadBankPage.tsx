import { useState } from "react";
import { ChevronDown, ChevronUp, Trophy } from "lucide-react";

type OlympiadQuestion = {
  no: number;
  soal: string;
  options?: string[];
  jawaban?: string;
  image?: string;
  pembahasan?: { konsep?: string; langkah?: string[]; rumus?: string };
};

export default function OlympiadBankPage({
  title,
  questions,
  headline,
  headlineDescription,
}: {
  title: string;
  questions: OlympiadQuestion[];
  headline?: string;
  headlineDescription?: string;
}) {
  return <main className="relative min-h-screen overflow-hidden bg-background px-4 py-10 text-foreground">
    <section className="relative z-10 mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <Trophy className="mx-auto mb-3 h-10 w-10 text-primary" />
        <h1 className="text-balance text-2xl font-bold text-primary md:text-3xl">BANK SOAL – {title}</h1>
        {headline && (
          <div className="mx-auto mt-5 max-w-2xl rounded-2xl border border-primary/25 bg-primary/10 px-5 py-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Misi Materi</p>
            <h2 className="mt-1 text-balance text-xl font-bold text-foreground md:text-2xl">{headline}</h2>
            {headlineDescription && <p className="mt-2 text-sm leading-6 text-muted-foreground">{headlineDescription}</p>}
          </div>
        )}
        <p className="mt-4 text-sm text-muted-foreground">Soal Olimpiade Matematika lengkap dengan pembahasan</p>
      </div>
      <div className="grid gap-5">{questions.map((question) => <QuestionCard key={question.no} question={question} />)}</div>
    </section>
  </main>;
}

function QuestionCard({ question }: { question: OlympiadQuestion }) {
  const [open, setOpen] = useState(false);
  return <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
    <div className="mb-3 flex items-center justify-between"><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Soal {question.no}</span><span className="text-xs text-muted-foreground">Olimpiade Matematika</span></div>
    <p className="whitespace-pre-line text-base leading-7">{question.soal}</p>
    {question.image && <img src={question.image} alt={`Gambar soal ${question.no}`} className="mx-auto my-4 max-h-72 max-w-full rounded-lg object-contain" />}
    {!!question.options?.length && <div className="mt-4 grid gap-2 text-sm leading-6 text-muted-foreground">{question.options.map((option) => <p key={option}>{option}</p>)}</div>}
    <button type="button" onClick={() => setOpen((value) => !value)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/20">{open ? "Sembunyikan Pembahasan" : "Lihat Pembahasan"}{open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</button>
    {open && <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm leading-7"><p className="font-semibold text-primary">Jawaban: {question.jawaban || "Tidak tersedia"}</p>{question.pembahasan?.konsep && <p className="mt-2"><strong>Konsep:</strong> {question.pembahasan.konsep}</p>}{question.pembahasan?.langkah?.map((step, index) => <p key={`${question.no}-${index}`} className="mt-1">{index + 1}. {step}</p>)}{question.pembahasan?.rumus && <p className="mt-2"><strong>Rumus:</strong> {question.pembahasan.rumus}</p>}</div>}
  </article>;
}

export type { OlympiadQuestion };
                                                                      
