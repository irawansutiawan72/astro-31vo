import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Link2,
  Sparkles,
  Target,
} from "lucide-react";
import { BlockMath, InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

type Tone = "cyan" | "emerald" | "amber" | "violet" | "rose" | "blue";

const toneClasses: Record<Tone, string> = {
  cyan: "border-cyan-300/35 bg-cyan-400/10",
  emerald: "border-emerald-300/35 bg-emerald-400/10",
  amber: "border-amber-300/35 bg-amber-400/10",
  violet: "border-violet-300/35 bg-violet-400/10",
  rose: "border-rose-300/35 bg-rose-400/10",
  blue: "border-blue-300/35 bg-blue-400/10",
};

const toTeacherLogNotation = (math: string) =>
  math.replace(/\\log_(\{[^{}]+\}|[A-Za-z0-9]+)/g, (_match, rawBase: string) => {
    const base = rawBase.startsWith("{") ? rawBase.slice(1, -1) : rawBase;
    return `{}^{${base}}\\log`;
  });

const InlineMath = ({ math }: { math: string }) => <KaTeXInlineMath math={toTeacherLogNotation(math)} />;

const Formula = ({ children }: { children: string }) => (
  <div className="my-3 overflow-x-auto rounded-xl border border-white/10 bg-slate-950/55 px-4 py-3 text-center text-cyan-100">
    <BlockMath math={toTeacherLogNotation(children)} />
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
  tone,
  question,
  children,
}: {
  number: string;
  tone: Tone;
  question: ReactNode;
  children: ReactNode;
}) => (
  <div className={`rounded-2xl border p-4 ${toneClasses[tone]}`}>
    <div className="mb-3 flex items-center gap-2">
      <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
        Contoh {number}
      </span>
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
  eyebrow?: string;
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
          {eyebrow && <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.2em] text-white/45">{eyebrow}</span>}
          <span className="font-display text-base font-bold text-white md:text-lg">{title}</span>
        </span>
      </span>
      {open ? <ChevronUp className="h-5 w-5 shrink-0 text-white/70" /> : <ChevronDown className="h-5 w-5 shrink-0 text-white/70" />}
    </button>
    {open && <div className="space-y-4 px-5 pb-6">{children}</div>}
  </section>
);

const SmaLogaritmaPage = () => {
  const allSections = ["opening", "definition", "basic", "addition", "subtraction", "power", "base", "chain", "cancel", "summary"];
  const [expanded, setExpanded] = useState(allSections);

  const toggle = (id: string) => {
    playPopSound();
    setExpanded((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const isOpen = (id: string) => expanded.includes(id);
  const toggleAll = () => {
    playPopSound();
    setExpanded((current) => (current.length === allSections.length ? [] : allSections));
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#070b23] text-white">
      <Starfield />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.26),_transparent_65%)]" />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma" />

      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-20 pt-16">
        <header className="relative mb-8 overflow-hidden rounded-[2rem] border border-cyan-200/25 bg-gradient-to-br from-cyan-500/20 via-blue-600/15 to-violet-600/20 p-6 text-center shadow-2xl shadow-cyan-950/30 md:p-10">
          <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-8 h-44 w-44 rounded-full bg-cyan-300/15 blur-3xl" />
          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/35 bg-cyan-200/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">
              <BookOpen className="h-4 w-4" />
              Ruang untuk Guru · SMA
            </div>
            <h1 className="font-display text-3xl font-black leading-tight text-cyan-100 drop-shadow-[0_0_18px_rgba(34,211,238,0.35)] md:text-5xl">
              KONSEP DAN SIFAT-SIFAT LOGARITMA
            </h1>
            <p className="mt-3 font-body text-sm text-white/65 md:text-base">Buku Animasi Matematika SMA · Eksponen dan Logaritma</p>
            <div className="mx-auto mt-7 max-w-2xl rounded-2xl border border-yellow-200/30 bg-yellow-300/10 p-4 text-left shadow-inner shadow-yellow-100/5 md:p-5">
              <div className="flex gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-yellow-300" />
                <div>
                  <p className="font-display text-base font-bold text-yellow-100">Pernahkah kamu bertanya?</p>
                  <p className="mt-1 font-body text-sm leading-relaxed text-yellow-50/80">
                    “2 dipangkatkan berapa supaya hasilnya 32?” Itulah logaritma! Yuk, kuasai konsep dan 6 sifat saktinya langkah demi langkah.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-body text-white/50">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            Materi visual · contoh bertahap · siap dipakai mengajar
          </div>
          <button type="button" onClick={toggleAll} className="rounded-full border border-white/15 bg-white/5 px-3 py-2 font-body text-xs text-white/70 transition hover:border-cyan-300/50 hover:text-cyan-100">
            {expanded.length === allSections.length ? "Tutup semua" : "Buka semua"}
          </button>
        </div>

        <div className="space-y-4">
          <Accordion id="opening" title="Logaritma adalah kebalikan perpangkatan" eyebrow="Mulai dari pertanyaan sederhana" icon={<Lightbulb className="h-5 w-5" />} tone="amber" open={isOpen("opening")} onToggle={toggle}>
            <ColorCard tone="amber">
              <p className="font-body text-sm leading-relaxed text-amber-50/85">
                Perpangkatan menjawab pertanyaan <strong className="text-yellow-200">“hasilnya berapa?”</strong>. Logaritma membalik pertanyaan itu menjadi <strong className="text-yellow-200">“pangkatnya berapa?”</strong>.
              </p>
              <Formula>{"\\log_a b = c \\Longleftrightarrow a^c=b"}</Formula>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Basis", "a", "a > 0 dan a \\ne 1"],
                  ["Numerus", "b", "b > 0"],
                  ["Hasil logaritma", "c", "pangkat yang dicari"],
                ].map(([label, symbol, note]) => (
                  <div key={label} className="rounded-xl bg-slate-950/35 p-3 text-center">
                    <p className="text-xs font-bold text-white/55">{label}</p>
                    <p className="my-1 font-display text-2xl font-black text-cyan-200">{symbol}</p>
                    <p className="text-xs text-white/60">{note}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-body text-sm text-white/75">
                Jika basis tidak ditulis, artinya basis 10. Jadi <InlineMath math="\log 100 = \log_{10}100 = 2" />.
              </p>
            </ColorCard>
          </Accordion>

          <Accordion id="definition" title="Pengertian dan contoh dasar" eyebrow="Bagian 1 · Fondasi konsep" icon={<Target className="h-5 w-5" />} tone="cyan" open={isOpen("definition")} onToggle={toggle}>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number="1" tone="cyan" question={<><InlineMath math="5^2=25" /> dapat diubah menjadi bentuk logaritma.</>}>
                <Formula>{"\\log_5 25=2"}</Formula>
                <p>Basisnya 5, numerusnya 25, dan pangkat yang dicari adalah 2.</p>
              </ExampleCard>
              <ExampleCard number="2" tone="violet" question={<>Pangkat negatif juga dapat ditulis sebagai logaritma.</>}>
                <Formula>{"6^{-2}=\\frac{1}{36}\\Longleftrightarrow\\log_6\\frac{1}{36}=-2"}</Formula>
                <p>Numerus boleh pecahan selama tetap positif. Hasil logaritma boleh negatif.</p>
              </ExampleCard>
              <ExampleCard number="3" tone="emerald" question={<>Tentukan <InlineMath math="\log_3 81" />.</>}>
                <p>Tanyakan: “3 dipangkatkan berapa menjadi 81?” Karena <InlineMath math="3^4=81" />, maka:</p>
                <Formula>{"\\log_3 81=4"}</Formula>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="basic" title="Tiga sifat dasar yang wajib diingat" eyebrow="Sebelum masuk ke 6 sifat" icon={<CheckCircle2 className="h-5 w-5" />} tone="emerald" open={isOpen("basic")} onToggle={toggle}>
            <ColorCard tone="emerald">
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  ["Sifat dasar 1", "\\log_a a^n=n", "Pangkat turun menjadi hasil."],
                  ["Sifat dasar 2", "\\log_a a=1", "Karena a^1=a."],
                  ["Sifat dasar 3", "\\log_a 1=0", "Karena a^0=1."],
                ].map(([title, formula, note]) => (
                  <div key={title} className="rounded-2xl border border-emerald-200/15 bg-slate-950/30 p-4">
                    <p className="text-xs font-bold text-emerald-200">{title}</p>
                    <Formula>{formula}</Formula>
                    <p className="text-xs leading-relaxed text-white/60">{note}</p>
                  </div>
                ))}
              </div>
            </ColorCard>
            <ExampleCard number="4" tone="emerald" question={<>Hitung <InlineMath math="\log_9 1+\log_9 9+\log_9 81" />.</>}>
              <Formula>{"0+1+2=3"}</Formula>
              <p><InlineMath math="\log_9 1=0" />, <InlineMath math="\log_9 9=1" />, dan <InlineMath math="81=9^2" /> sehingga <InlineMath math="\log_9 81=2" />.</p>
            </ExampleCard>
          </Accordion>

          <div className="relative py-3">
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-fuchsia-300/30 to-transparent" />
            <p className="relative mx-auto w-fit bg-[#070b23] px-4 font-display text-sm font-bold uppercase tracking-[0.22em] text-fuchsia-200">Enam sifat sakti logaritma</p>
          </div>

          <Accordion id="addition" title="Sifat 1 · Penjumlahan" eyebrow="Log ditambah · numerus dikali" icon={<span className="font-display text-lg font-black">+</span>} tone="blue" open={isOpen("addition")} onToggle={toggle}>
            <Formula>{"\\log_a b+\\log_a c=\\log_a(b\\times c)"}</Formula>
            <p className="font-body text-sm text-white/70">Syarat penting: basisnya harus sama.</p>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number="1" tone="blue" question={<><InlineMath math="\log_2 4+\log_2 8" /></>}>
                <Formula>{"\\log_2(4\\times8)=\\log_2 32=5"}</Formula>
                <p>Gabungkan numerus, lalu cari pangkat 2 yang menghasilkan 32.</p>
              </ExampleCard>
              <ExampleCard number="2" tone="blue" question={<><InlineMath math="\log_5\\frac12+\log_5 50" /></>}>
                <Formula>{"\\log_5\\left(\\frac12\\times50\\right)=\\log_5 25=2"}</Formula>
                <p><InlineMath math="\frac12\times50=25" /> dan <InlineMath math="5^2=25" />.</p>
              </ExampleCard>
              <ExampleCard number="3" tone="blue" question={<><InlineMath math="\log_3 6+\log_3 1{,}5" /></>}>
                <Formula>{"\\log_3 9=2"}</Formula>
                <p>Karena <InlineMath math="6\times1{,}5=9" />.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="subtraction" title="Sifat 2 · Pengurangan" eyebrow="Log dikurang · numerus dibagi" icon={<span className="font-display text-lg font-black">−</span>} tone="rose" open={isOpen("subtraction")} onToggle={toggle}>
            <Formula>{"\\log_a b-\\log_a c=\\log_a\\left(\\frac{b}{c}\\right)"}</Formula>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number="1" tone="rose" question={<><InlineMath math="\log_7 217-\log_7 31" /></>}>
                <Formula>{"\\log_7\\frac{217}{31}=\\log_7 7=1"}</Formula>
                <p><InlineMath math="217\div31=7" />, lalu gunakan sifat dasar <InlineMath math="\log_7 7=1" />.</p>
              </ExampleCard>
              <ExampleCard number="2" tone="rose" question={<><InlineMath math="\log 0{,}04-\log 4" /></>}>
                <Formula>{"\\log\\frac{0{,}04}{4}=\\log 0{,}01=-2"}</Formula>
                <p>Basis 10 tidak ditulis dan <InlineMath math="0{,}01=10^{-2}" />.</p>
              </ExampleCard>
              <ExampleCard number="3" tone="rose" question={<><InlineMath math="\log_2 48-\log_2 3" /></>}>
                <Formula>{"\\log_2 16=4"}</Formula>
                <p><InlineMath math="48\div3=16" /> dan <InlineMath math="2^4=16" />.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="power" title="Sifat 3 · Pangkat numerus" eyebrow="Pangkat turun menjadi pengali" icon={<span className="font-display text-lg font-black">×</span>} tone="violet" open={isOpen("power")} onToggle={toggle}>
            <Formula>{"\\log_a b^n=n\\times\\log_a b"}</Formula>
            <div className="grid gap-4 md:grid-cols-2">
              <ExampleCard number="1" tone="violet" question={<><InlineMath math="\log_3 9^4" /></>}>
                <Formula>{"4\\times\\log_3 9=4\\times2=8"}</Formula>
                <p>Turunkan pangkat 4 menjadi pengali.</p>
              </ExampleCard>
              <ExampleCard number="2" tone="violet" question="Gabungkan sifat 1, 2, dan 3: 2 log 25 − 3 log 5 + log 20.">
                <Formula>{"\\log25^2-\\log5^3+\\log20=\\log\\frac{625\\times20}{125}=\\log100=2"}</Formula>
                <p>Pengali dinaikkan menjadi pangkat, pengurangan menjadi pembagian, dan penjumlahan menjadi perkalian.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="base" title="Sifat 4 · Ganti basis" eyebrow="Pindah ke basis baru yang lebih nyaman" icon={<ArrowRight className="h-5 w-5" />} tone="amber" open={isOpen("base")} onToggle={toggle}>
            <Formula>{"\\log_a b=\\frac{\\log_p b}{\\log_p a}=\\frac{1}{\\log_b a}"}</Formula>
            <p className="font-body text-sm text-white/70">Pilih basis baru <InlineMath math="p" /> yang membuat perhitungan lebih mudah.</p>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number="1" tone="amber" question={<><InlineMath math="\log_4 32" /></>}>
                <Formula>{"\\frac{\\log_2 32}{\\log_2 4}=\\frac52"}</Formula>
                <p>Pindah ke basis 2 karena <InlineMath math="32=2^5" /> dan <InlineMath math="4=2^2" />.</p>
              </ExampleCard>
              <ExampleCard number="2" tone="amber" question={<>Jika <InlineMath math="\log_2 3=a" />, tentukan <InlineMath math="\log_8 3" />.</>}>
                <Formula>{"\\log_8 3=\\frac{\\log 3}{\\log 8}=\\frac{\\log 3}{3\\log2}=\\frac a3"}</Formula>
              </ExampleCard>
              <ExampleCard number="3" tone="amber" question={<>Jika <InlineMath math="\log_2 3=a" />, tentukan <InlineMath math="\log_3 2" />.</>}>
                <Formula>{"\\log_3 2=\\frac{1}{\\log_2 3}=\\frac1a"}</Formula>
                <p>Membalik basis dan numerus membalik pecahannya.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="chain" title="Sifat 5 · Rantai dan pangkat basis" eyebrow="Tiga bentuk yang saling melengkapi" icon={<Link2 className="h-5 w-5" />} tone="cyan" open={isOpen("chain")} onToggle={toggle}>
            <ColorCard tone="cyan">
              <div className="grid gap-3 md:grid-cols-3">
                <Formula>{"\\log_g a\\times\\log_a b=\\log_g b"}</Formula>
                <Formula>{"\\log_{g^n}a^m=\\frac mn\\log_g a"}</Formula>
                <Formula>{"\\log_{g^n}a^n=\\log_g a"}</Formula>
              </div>
              <p className="font-body text-sm text-cyan-50/75">Sifat pertama seperti rantai: “a” di tengah saling menghilangkan.</p>
            </ColorCard>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number="1" tone="cyan" question={<><InlineMath math="\log_2 5\times\log_5 64" /></>}>
                <Formula>{"\\log_2 64=\\log_2 2^6=6"}</Formula>
              </ExampleCard>
              <ExampleCard number="2" tone="cyan" question={<>Jika <InlineMath math="\log_2 3=a" />, tentukan <InlineMath math="\log_4 81" />.</>}>
                <Formula>{"\\log_{2^2}3^4=\\frac42\\log_2 3=2a"}</Formula>
              </ExampleCard>
              <ExampleCard number="3" tone="cyan" question={<><InlineMath math="\log_2 3\times\log_3 4\times\log_4 8" /></>}>
                <Formula>{"\\log_2 8=3"}</Formula>
                <p>Angka 3 dan 4 di tengah saling habis.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="cancel" title="Sifat 6 · Pangkat dan log saling menghapus" eyebrow="Basis sama · kembali ke numerus" icon={<Sparkles className="h-5 w-5" />} tone="emerald" open={isOpen("cancel")} onToggle={toggle}>
            <Formula>{"a^{\\log_a b}=b"}</Formula>
            <div className="grid gap-4 md:grid-cols-3">
              <ExampleCard number="1" tone="emerald" question={<><InlineMath math="2^{\log_2 5}" /></>}>
                <Formula>{"=5"}</Formula>
              </ExampleCard>
              <ExampleCard number="2" tone="emerald" question={<><InlineMath math="7^{\log_7 25}" /></>}>
                <Formula>{"=25"}</Formula>
                <p>Basis pangkat dan basis log sama-sama 7, jadi saling menghapus.</p>
              </ExampleCard>
              <ExampleCard number="3" tone="emerald" question={<><InlineMath math="4^{\log_2 3}" />.</>}>
                <Formula>{"(2^2)^{\\log_2 3}=2^{2\\log_2 3}=2^{\\log_2 9}=9"}</Formula>
                <p>Samakan basis menjadi 2, masukkan pengali 2 ke pangkat, lalu gunakan sifat 6.</p>
              </ExampleCard>
            </div>
          </Accordion>

          <Accordion id="summary" title="Rangkuman dan jebakan umum" eyebrow="Simpan sebagai peta konsep" icon={<BookOpen className="h-5 w-5" />} tone="rose" open={isOpen("summary")} onToggle={toggle}>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[680px] text-left font-body text-sm">
                <thead className="bg-slate-950/60 text-cyan-100">
                  <tr><th className="px-4 py-3">Sifat</th><th className="px-4 py-3">Rumus inti</th></tr>
                </thead>
                <tbody className="text-white/75">
                  {[
                    ["Dasar", "\\log_a a^n=n;\\quad\\log_a a=1;\\quad\\log_a1=0"],
                    ["1 · Penjumlahan", "\\log_a b+\\log_a c=\\log_a(bc)"],
                    ["2 · Pengurangan", "\\log_a b-\\log_a c=\\log_a\\left(\\frac bc\\right)"],
                    ["3 · Pangkat numerus", "\\log_a b^n=n\\log_a b"],
                    ["4 · Ganti basis", "\\log_a b=\\frac{\\log_p b}{\\log_p a}=\\frac1{\\log_b a}"],
                    ["5 · Rantai", "\\log_g a\\cdot\\log_a b=\\log_g b"],
                    ["6 · Saling menghapus", "a^{\\log_a b}=b"],
                  ].map(([name, formula], index) => (
                    <tr key={name} className={`border-t border-white/5 ${index % 2 === 0 ? "bg-white/[0.025]" : ""}`}>
                      <td className="px-4 py-3 font-semibold text-white">{name}</td>
                      <td className="px-4 py-3 text-cyan-100"><InlineMath math={formula} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ColorCard tone="rose">
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-200" />
                <div className="font-body text-sm leading-relaxed text-rose-50/85">
                  <strong className="text-rose-100">Jebakan umum:</strong> <InlineMath math="\log_a(b+c)" /> tidak sama dengan <InlineMath math="\log_a b+\log_a c" />. Yang boleh digabung adalah perkalian, yaitu <InlineMath math="\log_a(bc)" />.
                </div>
              </div>
            </ColorCard>
            <ColorCard tone="emerald">
              <p className="font-body text-sm leading-relaxed text-emerald-50/85">
                <strong className="text-emerald-100">Pesan untuk siswa:</strong> saat melihat logaritma, ubah pertanyaan menjadi “basis dipangkatkan berapa?”. Cek basis, numerus, dan syaratnya sebelum memilih sifat.
              </p>
            </ColorCard>
          </Accordion>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 text-center font-body text-xs text-white/45">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Basis: a &gt; 0, a ≠ 1</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Numerus: b &gt; 0</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Belajar dengan memahami pola</span>
        </div>
      </main>
    </div>
  );
};

export default SmaLogaritmaPage;