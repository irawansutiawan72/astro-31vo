import { useState, type ReactNode } from "react";
import { BookOpen, Calculator, ChevronDown, ChevronUp, Lightbulb, Target } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/contexts/LanguageContext";

type SectionId = "intro" | "meaning" | "fractional" | "simplify" | "operations" | "rationalize" | "nested";

const translations: Record<Language, {
  title: string;
  subtitle: string;
  intro: string;
  introBody: string;
  note: string;
  meaning: string;
  fractional: string;
  simplify: string;
  operations: string;
  rationalize: string;
  nested: string;
  summary: string;
  examples: string;
  step: string;
  result: string;
  tip: string;
  back: string;
}> = {
  id: {
    title: "BENTUK AKAR DAN MERASIONALKAN PENYEBUT",
    subtitle: "SMA · Bilangan Berpangkat · Materi Matematika",
    intro: "🌟 Kenapa kita perlu belajar bentuk akar?",
    introBody: "Pernahkah kamu menghitung panjang sisi persegi yang luasnya 5 cm²? Jawabannya adalah √5 cm — bukan bilangan bulat dan bukan pecahan biasa. Inilah yang disebut bentuk akar. Bentuk akar muncul saat menghitung diagonal, jarak, dan banyak masalah matematika lainnya.",
    note: "Materi ini erat kaitannya dengan pangkat. Pastikan kamu sudah memahami konsep bilangan berpangkat sebelum melanjutkan.",
    meaning: "📘 Pengertian Bentuk Akar",
    fractional: "📘 Hubungan Bentuk Akar dengan Pangkat Pecahan",
    simplify: "📘 Penyederhanaan Bentuk Akar",
    operations: "📘 Operasi pada Bentuk Akar",
    rationalize: "📘 Merasionalkan Penyebut",
    nested: "📘 Menyederhanakan Bentuk Akar Bertingkat",
    summary: "🎯 Ringkasan Intisari",
    examples: "📝 Contoh Soal",
    step: "Langkah",
    result: "Hasil",
    tip: "Tips",
    back: "Kembali ke Eksponen dan Logaritma",
  },
  en: {
    title: "RADICAL EXPRESSIONS AND RATIONALISING DENOMINATORS",
    subtitle: "High School · Exponents · Mathematics Material",
    intro: "🌟 Why do we need to learn radical expressions?",
    introBody: "Have you ever found the side of a square with area 5 cm²? The answer is √5 cm — neither an integer nor an ordinary fraction. This is a radical expression. Radicals appear when calculating diagonals, distances, and many other mathematical problems.",
    note: "This material is closely related to exponents. Make sure you understand powers before continuing.",
    meaning: "📘 What Are Radical Expressions?",
    fractional: "📘 Radicals and Fractional Exponents",
    simplify: "📘 Simplifying Radical Expressions",
    operations: "📘 Operations with Radicals",
    rationalize: "📘 Rationalising the Denominator",
    nested: "📘 Simplifying Nested Radicals",
    summary: "🎯 Key Summary",
    examples: "📝 Worked Examples",
    step: "Step",
    result: "Result",
    tip: "Tip",
    back: "Back to Exponents and Logarithms",
  },
  ja: {
    title: "根号の表現と分母の有理化",
    subtitle: "高校 · 累乗 · 数学教材",
    intro: "🌟 なぜ根号の表現を学ぶのか？",
    introBody: "面積5 cm²の正方形の一辺は√5 cm。整数でも普通の分数でもない、この形が根号の表現です。根号は対角線や距離など、さまざまな数学の問題に現れます。",
    note: "この内容は累乗と深く関係しています。先に累乗の概念を理解してから進みましょう。",
    meaning: "📘 根号の表現とは？",
    fractional: "📘 根号と分数指数の関係",
    simplify: "📘 根号の簡略化",
    operations: "📘 根号の演算",
    rationalize: "📘 分母の有理化",
    nested: "📘 二重根号の簡略化",
    summary: "🎯 要点まとめ",
    examples: "📝 例題",
    step: "ステップ",
    result: "結果",
    tip: "ヒント",
    back: "指数と対数に戻る",
  },
};

const allSections: SectionId[] = ["intro", "meaning", "fractional", "simplify", "operations", "rationalize", "nested"];

const Section = ({
  id,
  title,
  icon,
  color,
  open,
  onToggle,
  children,
}: {
  id: SectionId;
  title: string;
  icon: ReactNode;
  color: string;
  open: boolean;
  onToggle: (id: SectionId) => void;
  children: ReactNode;
}) => (
  <section className={`overflow-hidden rounded-2xl border border-${color}-400/30 bg-card/80 backdrop-blur`}>
    <button
      type="button"
      onClick={() => onToggle(id)}
      aria-expanded={open}
      className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-white/5"
    >
      <span className="flex items-center gap-3">
        <span className={`text-${color}-400`}>{icon}</span>
        <span className="font-body text-sm font-semibold text-white md:text-base">{title}</span>
      </span>
      {open ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-primary" />}
    </button>
    {open && <div className="space-y-4 px-5 pb-5">{children}</div>}
  </section>
);

const Example = ({
  number,
  color,
  question,
  children,
}: {
  number: number;
  color: string;
  question: ReactNode;
  children: ReactNode;
}) => (
  <div className={`rounded-xl border border-${color}-400/25 bg-${color}-500/5 p-4`}>
    <div className={`mb-3 text-xs font-bold uppercase tracking-wider text-${color}-400`}>Contoh {number}</div>
    <div className="rounded-lg bg-slate-900/60 p-3 text-sm text-white">{question}</div>
    <div className="mt-3 space-y-2 text-sm leading-relaxed text-white/80">{children}</div>
  </div>
);

const SmaBentukAkarPage = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [expanded, setExpanded] = useState<SectionId[]>(allSections);

  const toggle = (id: SectionId) => {
    playPopSound();
    setExpanded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden gradient-space text-white">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma" />
      <main className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-20 pt-12">
        <header className="mb-8 rounded-[2rem] border border-cyan-300/25 bg-gradient-to-br from-cyan-950/90 via-indigo-950/80 to-fuchsia-950/70 p-6 text-center shadow-2xl shadow-cyan-950/30 md:p-10">
          <BookOpen className="mx-auto mb-4 h-10 w-10 text-cyan-300" />
          <div className="mb-3 inline-flex rounded-full border border-cyan-200/30 bg-cyan-200/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">
            Ruang untuk Guru · SMA
          </div>
          <h1 className="font-display text-2xl font-black leading-tight text-cyan-100 md:text-4xl">{t.title}</h1>
          <p className="mt-3 font-body text-sm text-white/65 md:text-base">{t.subtitle}</p>
        </header>

        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-white/55">
            <Lightbulb className="h-4 w-4 text-yellow-300" />
            Materi visual · contoh bertahap · siap dipakai mengajar
          </div>
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setExpanded((current) => current.length === allSections.length ? [] : allSections);
            }}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/70 hover:border-cyan-300/50 hover:text-cyan-100"
          >
            {expanded.length === allSections.length ? "Tutup semua" : "Buka semua"}
          </button>
        </div>

        <div className="space-y-4">
          <Section id="intro" title={t.intro} icon={<Lightbulb className="h-5 w-5" />} color="yellow" open={expanded.includes("intro")} onToggle={toggle}>
            <p className="font-body text-sm leading-relaxed text-white/80">{t.introBody}</p>
            <div className="rounded-xl border border-yellow-400/30 bg-yellow-500/10 p-4 text-sm leading-relaxed text-yellow-100">
              <strong>{t.tip}:</strong> {t.note}
            </div>
          </Section>

          <Section id="meaning" title={t.meaning} icon={<Target className="h-5 w-5" />} color="green" open={expanded.includes("meaning")} onToggle={toggle}>
            <div className="rounded-xl border border-green-400/25 bg-green-500/10 p-4">
              <p className="text-sm leading-relaxed text-white/80">
                Bentuk akar adalah akar dari suatu bilangan yang tidak dapat disederhanakan menjadi bilangan rasional. Secara umum:
              </p>
              <BlockMath math="\sqrt[n]{a}=b \Longleftrightarrow b^n=a,\quad a\ge 0,\;b\ge 0" />
              <p className="text-sm leading-relaxed text-white/75">
                Jika <InlineMath math="n=2" />, tanda akar ditulis <InlineMath math="\sqrt{\;}" />. Bilangan di dalam tanda akar disebut radicand.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-900/60 p-4 text-center text-sm">
                <p className="mb-2 text-xs text-white/55">Bukan bentuk akar (rasional)</p>
                <InlineMath math="\sqrt{9}=3,\quad \sqrt{49}=7" />
              </div>
              <div className="rounded-xl bg-slate-900/60 p-4 text-center text-sm text-cyan-200">
                <p className="mb-2 text-xs text-white/55">Bentuk akar (irasional)</p>
                <InlineMath math="\sqrt{2},\quad \sqrt{3},\quad \sqrt{5}" />
              </div>
            </div>
            <Example number={1} color="green" question={<>Tentukan apakah <InlineMath math="\sqrt{16},\sqrt{20},\sqrt{36},\sqrt{50}" /> merupakan bentuk akar.</>}>
              <p><strong>{t.step}:</strong> cek apakah radicand merupakan bilangan kuadrat sempurna.</p>
              <p><InlineMath math="\sqrt{16}=4" /> dan <InlineMath math="\sqrt{36}=6" /> bukan bentuk akar, sedangkan <InlineMath math="\sqrt{20}" /> dan <InlineMath math="\sqrt{50}" /> merupakan bentuk akar.</p>
            </Example>
          </Section>

          <Section id="fractional" title={t.fractional} icon={<Target className="h-5 w-5" />} color="purple" open={expanded.includes("fractional")} onToggle={toggle}>
            <p className="text-sm leading-relaxed text-white/80">Bentuk akar dan pangkat pecahan adalah dua cara berbeda untuk menulis konsep yang sama.</p>
            <div className="rounded-xl border border-purple-400/25 bg-purple-500/10 p-4 text-center">
              <BlockMath math="a^{\frac{1}{n}}=\sqrt[n]{a}" />
              <BlockMath math="a^{\frac{m}{n}}=\sqrt[n]{a^m}=\left(\sqrt[n]{a}\right)^m" />
            </div>
            <Example number={2} color="purple" question={<>Hitung <InlineMath math="8^{\frac{2}{3}}" />.</>}>
              <p><strong>{t.step} 1:</strong> ubah ke bentuk akar: <InlineMath math="8^{\frac{2}{3}}=\sqrt[3]{8^2}" />.</p>
              <p><strong>{t.result}:</strong> <InlineMath math="\sqrt[3]{64}=4" />.</p>
            </Example>
          </Section>

          <Section id="simplify" title={t.simplify} icon={<Target className="h-5 w-5" />} color="cyan" open={expanded.includes("simplify")} onToggle={toggle}>
            <p className="text-sm leading-relaxed text-white/80">Faktorkan radicand, keluarkan faktor yang merupakan kuadrat sempurna, lalu tulis bentuk paling sederhana.</p>
            <div className="rounded-xl border border-cyan-400/25 bg-cyan-500/10 p-4">
              <BlockMath math="\sqrt{a\cdot b}=\sqrt{a}\cdot\sqrt{b}" />
              <BlockMath math="\sqrt{m^2\cdot k}=m\sqrt{k},\quad m>0" />
            </div>
            <Example number={3} color="cyan" question={<>Sederhanakan <InlineMath math="\sqrt{48}" />.</>}>
              <p><strong>{t.step} 1:</strong> <InlineMath math="48=16\cdot3" />.</p>
              <p><strong>{t.result}:</strong> <InlineMath math="\sqrt{48}=\sqrt{16\cdot3}=4\sqrt{3}" />.</p>
            </Example>
          </Section>

          <Section id="operations" title={t.operations} icon={<Calculator className="h-5 w-5" />} color="orange" open={expanded.includes("operations")} onToggle={toggle}>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-xl bg-slate-900/60 p-4 text-sm">
                <p className="mb-2 font-semibold text-orange-300">Penjumlahan/Pengurangan</p>
                <BlockMath math="a\sqrt{b}\pm c\sqrt{b}=(a\pm c)\sqrt{b}" />
                <p className="text-white/65">Hanya bentuk akar sejenis yang dapat dijumlahkan.</p>
              </div>
              <div className="rounded-xl bg-slate-900/60 p-4 text-sm">
                <p className="mb-2 font-semibold text-orange-300">Perkalian</p>
                <BlockMath math="\sqrt{a}\cdot\sqrt{b}=\sqrt{ab}" />
                <BlockMath math="p\sqrt{a}\cdot q\sqrt{b}=pq\sqrt{ab}" />
              </div>
              <div className="rounded-xl bg-slate-900/60 p-4 text-sm">
                <p className="mb-2 font-semibold text-orange-300">Pembagian</p>
                <BlockMath math="\frac{\sqrt{a}}{\sqrt{b}}=\sqrt{\frac{a}{b}}" />
              </div>
            </div>
            <Example number={4} color="orange" question={<>Hitung <InlineMath math="\sqrt{12}+\sqrt{27}-\sqrt{48}" />.</>}>
              <p><InlineMath math="\sqrt{12}=2\sqrt{3}" />, <InlineMath math="\sqrt{27}=3\sqrt{3}" />, dan <InlineMath math="\sqrt{48}=4\sqrt{3}" />.</p>
              <p><strong>{t.result}:</strong> <InlineMath math="2\sqrt{3}+3\sqrt{3}-4\sqrt{3}=\sqrt{3}" />.</p>
            </Example>
          </Section>

          <Section id="rationalize" title={t.rationalize} icon={<Target className="h-5 w-5" />} color="pink" open={expanded.includes("rationalize")} onToggle={toggle}>
            <p className="text-sm leading-relaxed text-white/80">Merasionalkan penyebut adalah menghilangkan bentuk akar dari penyebut pecahan.</p>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl bg-slate-900/60 p-4">
                <p className="mb-2 text-sm font-semibold text-pink-300">Penyebut tunggal</p>
                <BlockMath math="\frac{a}{\sqrt{b}}=\frac{a\sqrt{b}}{b}" />
              </div>
              <div className="rounded-xl bg-slate-900/60 p-4">
                <p className="mb-2 text-sm font-semibold text-pink-300">Penyebut binomial</p>
                <BlockMath math="\frac{c}{\sqrt{a}+\sqrt{b}}=\frac{c(\sqrt{a}-\sqrt{b})}{a-b}" />
              </div>
            </div>
            <Example number={5} color="pink" question={<>Rasionalkan penyebut <InlineMath math="\dfrac{8}{\sqrt{6}-\sqrt{2}}" />.</>}>
              <p>Kalikan pembilang dan penyebut dengan konjugat <InlineMath math="\sqrt{6}+\sqrt{2}" />.</p>
              <p><strong>{t.result}:</strong> <InlineMath math="2\sqrt{6}+2\sqrt{2}" />.</p>
            </Example>
          </Section>

          <Section id="nested" title={t.nested} icon={<Target className="h-5 w-5" />} color="violet" open={expanded.includes("nested")} onToggle={toggle}>
            <p className="text-sm leading-relaxed text-white/80">Akar bertingkat memiliki bentuk akar di dalam akar. Gunakan hubungan jumlah dan hasil kali untuk menemukan dua bilangan yang sesuai.</p>
            <div className="rounded-xl border border-violet-400/25 bg-violet-500/10 p-4">
              <BlockMath math="\sqrt{a+b+2\sqrt{ab}}=\sqrt{a}+\sqrt{b}" />
              <BlockMath math="\sqrt{a+b-2\sqrt{ab}}=\sqrt{a}-\sqrt{b},\quad a>b" />
            </div>
            <Example number={6} color="violet" question={<>Sederhanakan <InlineMath math="\sqrt{5+2\sqrt{6}}" />.</>}>
              <p>Cari <InlineMath math="a+b=5" /> dan <InlineMath math="ab=6" />, yaitu <InlineMath math="a=3,b=2" />.</p>
              <p><strong>{t.result}:</strong> <InlineMath math="\sqrt{5+2\sqrt{6}}=\sqrt{3}+\sqrt{2}" />.</p>
            </Example>
          </Section>
        </div>

        <div className="mt-8 rounded-2xl border border-cyan-300/20 bg-cyan-500/10 p-5 text-center">
          <p className="font-display text-sm font-bold text-cyan-200">{t.summary}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Bentuk akar dapat diubah ke pangkat pecahan, disederhanakan dengan faktorisasi, dioperasikan setelah menjadi suku sejenis, dan dirasionalkan dengan faktor sekawan.
          </p>
        </div>
      </main>
    </div>
  );
};

export default SmaBentukAkarPage;