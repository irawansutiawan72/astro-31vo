import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  BookOpen,
  Calculator,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Target,
} from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { useLanguage } from "@/contexts/LanguageContext";

type LanguageCopy = {
  title: string;
  subtitle: string;
  back: string;
  intro: string;
  foundation: string;
  practice: string;
  laws: string;
  lawsPractice: string;
  summary: string;
  takeAway: string;
  step: string;
  solution: string;
  example: string;
  easy: string;
  medium: string;
  hard: string;
  openAnimation: string;
  resetAnimation: string;
};

const copy: Record<"id" | "en" | "ja", LanguageCopy> = {
  id: {
    title: "SIFAT-SIFAT EKSPONEN",
    subtitle: "SMA · Eksponen dan Logaritma · Buku Animasi Matematika",
    back: "Kembali ke subtopik",
    intro: "Pengertian, notasi, dan sifat-sifat operasi bilangan berpangkat",
    foundation: "Bagian 1 · Pengertian dan Notasi Pangkat",
    practice: "Contoh Soal dan Pembahasan",
    laws: "Bagian 2 · Sifat-Sifat Operasi Bilangan Berpangkat",
    lawsPractice: "Latihan Sifat-Sifat Eksponen",
    summary: "Rangkuman Rumus",
    takeAway: "Inti yang perlu diingat",
    step: "Langkah",
    solution: "PEMBAHASAN",
    example: "Contoh",
    easy: "MUDAH",
    medium: "SEDANG",
    hard: "SULIT",
    openAnimation: "Tekan untuk membelah",
    resetAnimation: "Ulangi dari awal",
  },
  en: {
    title: "LAWS OF EXPONENTS",
    subtitle: "Senior High School · Exponents and Logarithms · Animated Math Book",
    back: "Back to subtopics",
    intro: "Meaning, notation, and operation laws for powers",
    foundation: "Part 1 · Meaning and Exponential Notation",
    practice: "Worked Examples",
    laws: "Part 2 · Laws of Operations with Powers",
    lawsPractice: "Exponent Law Practice",
    summary: "Formula Summary",
    takeAway: "Key takeaways",
    step: "Step",
    solution: "SOLUTION",
    example: "Example",
    easy: "EASY",
    medium: "MEDIUM",
    hard: "HARD",
    openAnimation: "Press to split",
    resetAnimation: "Restart",
  },
  ja: {
    title: "指数法則",
    subtitle: "高校数学 · 指数と対数 · 数学アニメーション教材",
    back: "小単元に戻る",
    intro: "累乗の意味・表記・計算法則",
    foundation: "第1部 · 累乗の概念と表記",
    practice: "例題と解説",
    laws: "第2部 · 累乗の演算法則",
    lawsPractice: "指数法則の練習",
    summary: "公式まとめ",
    takeAway: "覚えておきたいこと",
    step: "ステップ",
    solution: "解説",
    example: "例題",
    easy: "基本",
    medium: "標準",
    hard: "発展",
    openAnimation: "分裂させる",
    resetAnimation: "最初から",
  },
};

const Card = ({
  children,
  tone = "slate",
}: {
  children: ReactNode;
  tone?: "cyan" | "green" | "yellow" | "purple" | "orange" | "blue" | "slate";
}) => {
  const tones = {
    cyan: "border-cyan-400/30 bg-cyan-500/10",
    green: "border-emerald-400/30 bg-emerald-500/10",
    yellow: "border-yellow-400/30 bg-yellow-500/10",
    purple: "border-violet-400/30 bg-violet-500/10",
    orange: "border-orange-400/30 bg-orange-500/10",
    blue: "border-blue-400/30 bg-blue-500/10",
    slate: "border-slate-600/40 bg-slate-900/45",
  };
  return <div className={`rounded-xl border p-4 ${tones[tone]}`}>{children}</div>;
};

const Formula = ({ children }: { children: string }) => (
  <div className="overflow-x-auto rounded-lg bg-slate-950/60 px-3 py-3 text-center">
    <BlockMath math={children} />
  </div>
);

const ExampleCard = ({
  level,
  label,
  question,
  children,
}: {
  level: "easy" | "medium" | "hard";
  label: string;
  question: ReactNode;
  children: ReactNode;
}) => {
  const styles = {
    easy: "border-emerald-400/30 bg-emerald-500/5 text-emerald-300",
    medium: "border-yellow-400/30 bg-yellow-500/5 text-yellow-300",
    hard: "border-rose-400/30 bg-rose-500/5 text-rose-300",
  };
  return (
    <div className={`rounded-xl border p-4 ${styles[level]}`}>
      <div className="mb-3 flex items-center gap-2 text-xs font-bold">
        <span className="rounded bg-black/20 px-2 py-1">{label}</span>
      </div>
      <div className="rounded-lg bg-slate-900/60 p-3 font-body text-sm text-white">{question}</div>
      <div className="mt-3 rounded-lg border border-white/10 bg-black/10 p-3">
        <p className="mb-2 text-[10px] font-bold tracking-wider opacity-80">PEMBAHASAN</p>
        <div className="space-y-2 font-body text-sm text-white/80">{children}</div>
      </div>
    </div>
  );
};

const Accordion = ({
  id,
  title,
  icon,
  iconClass,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: ReactNode;
  icon: ReactNode;
  iconClass: string;
  open: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
}) => (
  <section className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-lg backdrop-blur">
    <button
      type="button"
      onClick={() => onToggle(id)}
      className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left"
      aria-expanded={open}
    >
      <span className="flex items-center gap-3 font-body text-sm font-semibold text-white">
        <span className={iconClass}>{icon}</span>
        {title}
      </span>
      {open ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-primary" />}
    </button>
    {open && <div className="space-y-4 px-5 pb-5">{children}</div>}
  </section>
);

const BacteriaAnimation = ({ t }: { t: LanguageCopy }) => {
  const [generation, setGeneration] = useState(0);
  const count = 2 ** generation;
  const isMax = generation === 5;

  return (
    <Card tone="cyan">
      <div className="mb-3 text-center">
        <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
          Animasi Interaktif
        </p>
        <h3 className="font-display text-base font-bold text-white">Pembelahan Kuman dan Notasi Pangkat</h3>
      </div>
      <div className="mb-3 text-center">
        <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 font-display text-xl font-bold text-cyan-200">
          <InlineMath math={`2^${generation} = ${count}`} />
        </span>
      </div>
      <div className="flex min-h-[92px] flex-wrap items-center justify-center gap-2 rounded-xl bg-slate-950/30 p-3">
        {Array.from({ length: count }, (_, index) => (
          <button
            key={`${generation}-${index}`}
            type="button"
            onClick={() => !isMax && setGeneration((value) => value + 1)}
            className="cursor-pointer text-2xl transition-transform hover:scale-125"
            aria-label="Belah kuman"
          >
            🦠
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setGeneration(isMax ? 0 : generation + 1)}
        className="mt-4 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-body text-sm font-bold text-white transition hover:opacity-90"
      >
        {isMax ? t.resetAnimation : `${t.openAnimation} (${count} → ${count * 2})`}
      </button>
      <p className="mt-2 text-center font-body text-xs text-white/50">
        {isMax ? "2⁵ = 32 kuman. Perhatikan pertumbuhan yang sangat cepat!" : "Klik kuman atau tombol untuk melihat generasi berikutnya."}
      </p>
    </Card>
  );
};

const SmaEksponenLogaritmaPage = () => {
  const { language } = useLanguage();
  const t = copy[language];
  const allSections = [
    "intro",
    "pengertian",
    "contoh-pengertian",
    "pecahan",
    "contoh-pecahan",
    "negatif",
    "nol-negatif",
    "sifat",
    "contoh-sifat",
    "rangkuman",
  ];
  const [expanded, setExpanded] = useState(allSections);
  const toggle = (id: string) => {
    playPopSound();
    setExpanded((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };
  const isOpen = (id: string) => expanded.includes(id);

  const laws = [
    ["Perkalian pangkat", "a^m \\times a^n = a^{m+n}", "Basis sama, pangkat dijumlahkan.", "green"],
    ["Pembagian pangkat", "\\dfrac{a^m}{a^n} = a^{m-n}", "Basis sama, pangkat dikurangkan; a ≠ 0.", "cyan"],
    ["Pangkat dari pangkat", "(a^m)^n = a^{mn}", "Kalikan kedua pangkat.", "purple"],
    ["Pangkat dari perkalian", "(ab)^n = a^n b^n", "Pangkat didistribusikan ke setiap faktor.", "blue"],
    ["Pangkat dari pecahan", "\\left(\\dfrac{a}{b}\\right)^n = \\dfrac{a^n}{b^n}", "Pangkat didistribusikan ke pembilang dan penyebut.", "orange"],
    ["Pangkat nol", "a^0 = 1", "Berlaku untuk a ≠ 0.", "yellow"],
    ["Pangkat negatif", "a^{-n} = \\dfrac{1}{a^n}", "Pindahkan basis ke posisi kebalikan.", "orange"],
    ["Pangkat pecahan", "a^{\\frac{m}{n}} = \\sqrt[n]{a^m}", "Penyebut menjadi indeks akar.", "purple"],
    ["Menggabungkan basis", "a^n b^n = (ab)^n", "Kebalikan dari pangkat perkalian.", "blue"],
  ] as const;

  return (
    <div className="relative min-h-screen overflow-x-hidden gradient-space text-white">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma" />
      <main className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-16 pt-16">
        <header className="mb-8 text-center">
          <BookOpen className="mx-auto mb-3 h-11 w-11 text-primary" />
          <h1 className="font-display text-2xl font-bold text-primary text-glow-cyan md:text-3xl">{t.title}</h1>
          <p className="mt-2 font-body text-xs text-white/55">{t.subtitle}</p>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-white/75">{t.intro}</p>
        </header>

        <div className="flex flex-col gap-4 animate-slide-up">
          <Accordion id="intro" title="🚀 Mengapa kita membutuhkan eksponen?" icon={<Lightbulb className="h-5 w-5" />} iconClass="text-yellow-400" open={isOpen("intro")} onToggle={toggle}>
            <BacteriaAnimation t={t} />
            <Card tone="yellow">
              <p className="font-body text-sm leading-relaxed text-yellow-100">
                Perkalian berulang seperti <InlineMath math="2 \times 2 \times \cdots \times 2" /> dapat ditulis singkat sebagai{" "}
                <strong><InlineMath math="2^{10}" /></strong>. Notasi pangkat membantu ilmuwan, ekonom, dan insinyur menulis bilangan sangat besar atau sangat kecil secara ringkas.
              </p>
            </Card>
          </Accordion>

          <div className="pt-3">
            <h2 className="font-display text-lg font-bold text-primary">{t.foundation}</h2>
          </div>

          <Accordion id="pengertian" title="📘 Pengertian Bilangan Berpangkat" icon={<Target className="h-5 w-5" />} iconClass="text-emerald-400" open={isOpen("pengertian")} onToggle={toggle}>
            <Card tone="green">
              <p className="font-body text-sm leading-relaxed text-white/85">
                Bilangan berpangkat adalah cara singkat untuk menuliskan perkalian berulang dari bilangan yang sama.
              </p>
              <Formula>{"a^n = \\underbrace{a \\times a \\times \\cdots \\times a}_{n\\text{ faktor}}"}</Formula>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-950/40 p-3 text-sm text-white/75"><strong className="text-cyan-300">Basis</strong> adalah bilangan yang dikalikan berulang-ulang.</div>
                <div className="rounded-lg bg-slate-950/40 p-3 text-sm text-white/75"><strong className="text-yellow-300">Eksponen</strong> menunjukkan berapa kali basis digunakan sebagai faktor.</div>
              </div>
            </Card>
            <Card tone="slate">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-300">Anatomi notasi pangkat</p>
              <div className="flex items-center justify-center gap-1 py-3 font-display text-6xl font-bold">
                <span className="text-cyan-300">5</span><sup className="text-3xl text-yellow-300">3</sup>
              </div>
              <p className="text-center font-body text-sm text-white/70"><InlineMath math="5^3 = 5 \times 5 \times 5 = 125" /> · dibaca “lima pangkat tiga” atau “lima kubik”.</p>
            </Card>
          </Accordion>

          <Accordion id="contoh-pengertian" title={`📝 ${t.practice} · Notasi Pangkat`} icon={<Calculator className="h-5 w-5" />} iconClass="text-blue-400" open={isOpen("contoh-pengertian")} onToggle={toggle}>
            <ExampleCard level="easy" label={t.easy} question={<>Nyatakan <InlineMath math="7 \times 7 \times 7 \times 7" /> dalam notasi pangkat.</>}>
              <p><strong>{t.step} 1:</strong> Angka 7 muncul 4 kali.</p>
              <Formula>7 \times 7 \times 7 \times 7 = 7^4</Formula>
              <p>Basis = 7, eksponen = 4, dan nilainya <InlineMath math="7^4 = 2.401" />.</p>
            </ExampleCard>
            <ExampleCard level="medium" label={t.medium} question={<>Sebuah kubus memiliki panjang rusuk <InlineMath math="6\,\mathrm{cm}" />. Hitung volumenya.</>}>
              <p><strong>{t.step} 1:</strong> Gunakan <InlineMath math="V=s^3" />.</p>
              <Formula>{"V = 6^3 = 6 \\times 6 \\times 6 = 216\\,\\mathrm{cm}^3"}</Formula>
            </ExampleCard>
            <ExampleCard level="hard" label={t.hard} question="Bakteri membelah menjadi 2 setiap jam. Jika awalnya 1 bakteri, berapa jumlahnya setelah 8 jam?">
              <p><strong>{t.step} 1:</strong> Polanya adalah <InlineMath math="2^0,2^1,2^2,\ldots" />.</p>
              <Formula>2^8 = 256</Formula>
              <p className="font-bold text-primary">Setelah 8 jam terdapat 256 bakteri.</p>
            </ExampleCard>
          </Accordion>

          <Accordion id="pecahan" title="📗 Pecahan Berpangkat dan Pangkat Pecahan" icon={<Target className="h-5 w-5" />} iconClass="text-violet-400" open={isOpen("pecahan")} onToggle={toggle}>
            <Card tone="purple">
              <p className="font-body text-sm text-white/80">Jika basisnya pecahan, pangkatkan pembilang dan penyebut secara terpisah.</p>
              <Formula>{"\\left(\\dfrac{p}{q}\\right)^n = \\dfrac{p^n}{q^n}"}</Formula>
              <p className="font-body text-sm text-white/75">Pangkat pecahan menghubungkan eksponen dengan bentuk akar:</p>
              <Formula>{"a^{\\frac{m}{n}} = \\sqrt[n]{a^m} = \\left(\\sqrt[n]{a}\\right)^m"}</Formula>
            </Card>
          </Accordion>

          <Accordion id="contoh-pecahan" title={`📝 ${t.practice} · Pecahan Berpangkat`} icon={<Calculator className="h-5 w-5" />} iconClass="text-violet-400" open={isOpen("contoh-pecahan")} onToggle={toggle}>
            <ExampleCard level="easy" label={t.easy} question={<>Hitung <InlineMath math="\left(\dfrac{3}{5}\right)^3" />.</>}>
              <p><strong>{t.step} 1:</strong> Gunakan sifat pangkat pecahan.</p>
              <Formula>{"\\left(\\dfrac{3}{5}\\right)^3 = \\dfrac{3^3}{5^3} = \\dfrac{27}{125}"}</Formula>
            </ExampleCard>
            <ExampleCard level="medium" label={t.medium} question={<>Hitung <InlineMath math="81^{\frac{3}{4}}" />.</>}>
              <Formula>{"81^{\\frac{3}{4}} = \\left(\\sqrt[4]{81}\\right)^3 = 3^3 = 27"}</Formula>
            </ExampleCard>
          </Accordion>

          <Accordion id="negatif" title="⚠️ Bilangan Negatif Berpangkat" icon={<AlertTriangle className="h-5 w-5" />} iconClass="text-orange-400" open={isOpen("negatif")} onToggle={toggle}>
            <Card tone="orange">
              <p className="font-body text-sm text-white/80">Tanda kurung menentukan apakah tanda minus menjadi bagian dari basis.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-cyan-400/30 bg-slate-950/40 p-3">
                  <p className="mb-2 text-xs font-bold text-cyan-300"><InlineMath math="(-a)^n" /> · tanda kurung</p>
                  <p className="text-xs text-white/70">Minus termasuk basis dan seluruh bilangan negatif dipangkatkan.</p>
                  <Formula>(-3)^2 = 9</Formula>
                </div>
                <div className="rounded-lg border border-rose-400/30 bg-slate-950/40 p-3">
                  <p className="mb-2 text-xs font-bold text-rose-300"><InlineMath math="-a^n" /> · tanpa kurung</p>
                  <p className="text-xs text-white/70">Hanya a yang dipangkatkan, lalu hasilnya dikalikan −1.</p>
                  <Formula>-3^2 = -9</Formula>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-200"><strong>Pangkat genap:</strong> <InlineMath math="(-a)^{2k} > 0" />.</div>
                <div className="rounded-lg bg-rose-500/10 p-3 text-sm text-rose-200"><strong>Pangkat ganjil:</strong> <InlineMath math="(-a)^{2k-1} < 0" />.</div>
              </div>
            </Card>
          </Accordion>

          <Accordion id="nol-negatif" title="📌 Pangkat Nol dan Pangkat Negatif" icon={<Target className="h-5 w-5" />} iconClass="text-cyan-400" open={isOpen("nol-negatif")} onToggle={toggle}>
            <Card tone="cyan">
              <p className="font-body text-sm text-white/80">Dari pola pembagian, setiap turun satu pangkat berarti membagi dengan basis.</p>
              <Formula>a^0 = 1,\quad a \ne 0</Formula>
              <Formula>{"a^{-n} = \\dfrac{1}{a^n},\\quad a \\ne 0"}</Formula>
              <p className="font-body text-sm text-white/70"><InlineMath math="0^0" /> tidak terdefinisi dalam konteks ini. Syarat <InlineMath math="a \ne 0" /> harus diperhatikan.</p>
            </Card>
          </Accordion>

          <div className="pt-3">
            <h2 className="font-display text-lg font-bold text-primary">{t.laws}</h2>
          </div>

          <Accordion id="sifat" title="📊 Sembilan Sifat Utama Eksponen" icon={<Target className="h-5 w-5" />} iconClass="text-green-400" open={isOpen("sifat")} onToggle={toggle}>
            <div className="grid gap-3 sm:grid-cols-2">
              {laws.map(([name, formula, note, tone], index) => (
                <Card key={name} tone={tone}>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-body text-sm font-bold text-white">{index + 1}. {name}</p>
                    <span className="text-xs text-white/40">Sifat {index + 1}</span>
                  </div>
                  <Formula>{formula}</Formula>
                  <p className="mt-2 font-body text-xs text-white/65">{note}</p>
                </Card>
              ))}
            </div>
            <Card tone="yellow">
              <p className="font-body text-sm text-yellow-100"><strong>{t.takeAway}:</strong> periksa dulu apakah basisnya sama, apakah ada pangkat nol/negatif, dan apakah penyebut tidak bernilai nol.</p>
            </Card>
          </Accordion>

          <Accordion id="contoh-sifat" title={`🧮 ${t.lawsPractice}`} icon={<Calculator className="h-5 w-5" />} iconClass="text-blue-400" open={isOpen("contoh-sifat")} onToggle={toggle}>
            <ExampleCard level="easy" label={t.easy} question={<>Sederhanakan <InlineMath math="5^3 \times 5^6" />.</>}>
              <p><strong>{t.step} 1:</strong> Basis sama, jumlahkan eksponen.</p>
              <Formula>{"5^3 \\times 5^6 = 5^{3+6} = 5^9"}</Formula>
            </ExampleCard>
            <ExampleCard level="medium" label={t.medium} question={<>Sederhanakan <InlineMath math="\dfrac{x^8}{x^3}" />.</>}>
              <p><strong>{t.step} 1:</strong> Kurangkan eksponen pembilang dan penyebut.</p>
              <Formula>{"\\dfrac{x^8}{x^3} = x^{8-3} = x^5"}</Formula>
            </ExampleCard>
            <ExampleCard level="medium" label={t.medium} question={<>Sederhanakan <InlineMath math="(2^3)^4" />.</>}>
              <p><strong>{t.step} 1:</strong> Kalikan pangkatnya.</p>
              <Formula>{"(2^3)^4 = 2^{3 \\cdot 4} = 2^{12}"}</Formula>
            </ExampleCard>
            <ExampleCard level="hard" label={t.hard} question={<>Jika <InlineMath math="2^a \times 2^3 = 2^7" />, tentukan <InlineMath math="a" />.</>}>
              <p><strong>{t.step} 1:</strong> Terapkan sifat perkalian pangkat.</p>
              <Formula>{"2^{a+3} = 2^7 \\implies a+3=7 \\implies a=4"}</Formula>
            </ExampleCard>
            <ExampleCard level="hard" label={t.hard} question={<>Hitung <InlineMath math="4^0 + 2^{-3} + \left(\dfrac{1}{3}\right)^2" />.</>}>
              <p><strong>{t.step} 1:</strong> Ubah pangkat nol, negatif, dan pecahan.</p>
              <Formula>{"1 + \\dfrac{1}{8} + \\dfrac{1}{9} = \\dfrac{89}{72}"}</Formula>
            </ExampleCard>
          </Accordion>

          <Accordion id="rangkuman" title={`✅ ${t.summary}`} icon={<BookOpen className="h-5 w-5" />} iconClass="text-yellow-400" open={isOpen("rangkuman")} onToggle={toggle}>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[560px] text-left font-body text-xs">
                <thead className="bg-slate-900/70 text-primary">
                  <tr><th className="px-3 py-3">Sifat</th><th className="px-3 py-3">Rumus</th><th className="px-3 py-3">Catatan</th></tr>
                </thead>
                <tbody className="text-white/75">
                  {laws.slice(0, 8).map(([name, formula, note], index) => (
                    <tr key={name} className="border-t border-white/5 odd:bg-white/[0.02]">
                      <td className="px-3 py-3">{index + 1}. {name}</td>
                      <td className="px-3 py-3"><InlineMath math={formula} /></td>
                      <td className="px-3 py-3">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Card tone="green">
              <p className="font-body text-sm leading-relaxed text-emerald-100">
                Eksponen adalah cara ringkas untuk menulis perkalian berulang. Kuasai hubungan antara perkalian, pembagian, pangkat nol, pangkat negatif, pangkat pecahan, dan akar agar dapat menyederhanakan bentuk yang lebih kompleks.
              </p>
            </Card>
          </Accordion>
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => {
              playPopSound();
              window.history.back();
            }}
            className="font-body text-sm text-white/60 transition-colors hover:text-primary"
          >
            ← {t.back}
          </button>
        </div>
      </main>
    </div>
  );
};

export default SmaEksponenLogaritmaPage;