import { useState, type ReactNode } from "react";
import {
  BookOpen, Check, Lightbulb, Sparkles, Waves,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { InlineMath as KaTeXInlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

const InlineMath = ({ math }: { math: string }) => (
  <span className="inline-block max-w-full overflow-x-auto whitespace-nowrap align-baseline"><KaTeXInlineMath math={math} /></span>
);

const Formula = ({ math, label }: { math: string; label?: string }) => (
  <div className="my-3 max-w-full overflow-x-auto rounded-2xl border border-amber-200/20 bg-[#102337] px-2 py-2.5 text-center text-cyan-50 sm:px-4 sm:py-3">
    {label && <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.16em] text-amber-200">{label}</p>}
    <div className="w-max min-w-full [&_.katex]:text-[.95em] sm:[&_.katex]:text-[1.05em]"><BlockMath math={math} /></div>
  </div>
);

const Section = ({ id, number, title, subtitle, children }: { id: string; number: string; title: string; subtitle: string; children: ReactNode }) => (
  <section id={id} className="scroll-mt-6">
    <div className="mb-4 flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-300/10 font-display text-sm font-black text-amber-200">{number}</span>
      <div className="min-w-0"><p className="font-body text-[10px] font-black uppercase tracking-[.18em] text-cyan-200/70">{subtitle}</p><h2 className="font-display text-xl font-black leading-tight text-white sm:text-2xl">{title}</h2></div>
    </div>
    {children}
  </section>
);

type Level = "Mudah" | "Sedang" | "Sulit";
const tone: Record<Level, string> = {
  Mudah: "border-emerald-200/25 bg-emerald-300/10 text-emerald-100",
  Sedang: "border-sky-200/25 bg-sky-300/10 text-sky-100",
  Sulit: "border-rose-200/25 bg-rose-300/10 text-rose-100",
};

const Example = ({ level, title, question, children }: { level: Level; title: string; question: ReactNode; children: ReactNode }) => (
  <article className="min-w-0 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#111a31]/90">
    <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-4 py-3.5">
      <span className={`rounded-full border px-3 py-1 font-body text-[10px] font-black uppercase tracking-wider ${tone[level]}`}>{level}</span>
      <h3 className="font-display text-base font-extrabold text-white sm:text-lg">{title}</h3>
    </div>
    <div className="space-y-3 p-4 sm:p-5">
      <div className="rounded-xl border border-white/[.08] bg-white/[.035] p-3">
        <p className="mb-1 font-body text-[10px] font-black uppercase tracking-[.16em] text-amber-200">Tantangan</p>
        <div className="font-body text-sm leading-relaxed text-slate-200">{question}</div>
      </div>
      <div><p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.16em] text-cyan-200">Langkah pembahasan</p>
        <ol className="space-y-2.5 font-body text-sm leading-relaxed text-slate-200">{children}</ol></div>
    </div>
  </article>
);

const Step = ({ n, children }: { n: number; children: ReactNode }) => <li className="flex min-w-0 gap-2.5"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-200/10 font-display text-[11px] font-black text-cyan-100">{n}</span><span className="min-w-0 [overflow-wrap:anywhere]">{children}</span></li>;

const TriangleDiagram = ({ variant = "standard" }: { variant?: "standard" | "circum" | "height" }) => {
  const isCircum = variant === "circum";
  const ax = isCircum ? 70 : 62;
  const ay = isCircum ? 200 : 178;
  const bx = isCircum ? 250 : 252;
  const by = ay;
  const cx = isCircum ? 180 : 174;
  const cy = isCircum ? 70 : 47;
  const ox = 160;
  const oy = 165;
  return (
    <div className="mx-auto w-full max-w-[380px] rounded-2xl border border-cyan-200/15 bg-[#0b192c] p-2 sm:p-3">
      <svg viewBox={isCircum ? "0 0 320 280" : "0 0 320 220"} role="img" aria-label={isCircum ? "Segitiga ABC terletak pada lingkaran luar berpusat O; jari-jari lingkaran R menghubungkan pusat ke titik sudut." : "Diagram segitiga ABC dengan sisi a, b, c berhadapan dengan sudut A, B, C"} className="block h-auto w-full">
        {isCircum && <><circle cx={ox} cy={oy} r="96.7" fill="none" stroke="#415a72" strokeWidth="1.5" strokeDasharray="5 5" /><circle cx={ox} cy={oy} r="3" fill="#fbbf24" /><text x={ox + 5} y={oy - 3} fill="#fde68a" fontSize="11">O</text><text x="112" y="185" fill="#fde68a" fontSize="11">R</text><line x1={ox} y1={oy} x2={cx} y2={cy} stroke="#a5b4fc" strokeWidth="1.4" /><line x1={ox} y1={oy} x2={ax} y2={ay} stroke="#a5b4fc" strokeWidth="1.4" /></>}
        <path d={`M${ax} ${ay} L${bx} ${by} L${cx} ${cy} Z`} fill={variant === "height" ? "rgba(34,211,238,.12)" : "rgba(251,191,36,.07)"} stroke="#fbbf24" strokeWidth="3" strokeLinejoin="round" />
        {variant === "height" && <><line x1={cx} y1={cy} x2={cx} y2={by} stroke="#67e8f9" strokeWidth="2" strokeDasharray="5 4" /><path d={`M${cx} ${by - 12} h12 v12`} fill="none" stroke="#67e8f9" strokeWidth="1.5" /><text x={cx + 6} y={(cy + by) / 2} fill="#a5f3fc" fontSize="11">tinggi</text></>}
        <circle cx={ax} cy={ay} r="4" fill="#f472b6" /><circle cx={bx} cy={by} r="4" fill="#34d399" /><circle cx={cx} cy={cy} r="4" fill="#38bdf8" />
        <text x={ax - 13} y={ay + 19} fill="#fbcfe8" fontSize="13" fontWeight="700">A</text><text x={bx + 4} y={by + 19} fill="#bbf7d0" fontSize="13" fontWeight="700">B</text><text x={cx - 3} y={cy - 10} fill="#bae6fd" fontSize="13" fontWeight="700">C</text>
        <text x={(ax + bx) / 2 - 3} y={ay + 17} fill="#fde68a" fontSize="12">c</text><text x={(ax + cx) / 2 - 10} y={(ay + cy) / 2 - 6} fill="#fde68a" fontSize="12">b</text><text x={(bx + cx) / 2 + 4} y={(by + cy) / 2 - 5} fill="#fde68a" fontSize="12">a</text>
        <text x={ax + 14} y={ay - 9} fill="#fda4af" fontSize="11">A</text><text x={bx - 21} y={by - 9} fill="#fda4af" fontSize="11">B</text><text x={cx - 3} y={cy + 20} fill="#fda4af" fontSize="11">C</text>
      </svg>
    </div>
  );
};

const AreaExplorer = () => {
  const [angle, setAngle] = useState(40);
  const [sideB, setSideB] = useState(10);
  const [sideC, setSideC] = useState(8);
  const reduceMotion = useReducedMotion();
  const transition = { duration: reduceMotion ? 0 : 0.28, ease: "easeOut" as const };
  const radians = angle * Math.PI / 180;
  const area = 0.5 * sideB * sideC * Math.sin(radians);
  const rawCx = sideB * Math.cos(radians);
  const rawCy = sideB * Math.sin(radians);
  const minX = Math.min(0, sideC, rawCx);
  const maxX = Math.max(0, sideC, rawCx);
  const scale = Math.min(210 / Math.max(maxX - minX, 0.01), 130 / Math.max(rawCy, 0.01));
  const originX = 155 - ((minX + maxX) * scale) / 2;
  const baseY = 190;
  const x = originX + rawCx * scale;
  const y = baseY - rawCy * scale;
  const baseEndX = originX + sideC * scale;
  const heightFootX = x;
  const fmt = (n: number) => n.toFixed(2).replace(".", ",");
  return <div className="grid min-w-0 gap-4 md:grid-cols-[.92fr_1.08fr]">
    <div className="min-w-0 rounded-2xl border border-cyan-200/15 bg-[#0b192c] p-2 sm:p-3">
      <svg viewBox="0 0 310 230" role="img" aria-label={`Segitiga interaktif: sisi b ${sideB} cm, sisi c ${sideC} cm, sudut apit ${angle} derajat, luas ${fmt(area)} sentimeter persegi`} className="block h-auto w-full" data-testid="visual-area-triangle">
        <motion.path d={`M${originX} ${baseY} L${baseEndX} ${baseY} L${x} ${y} Z`} fill="rgba(34,211,238,.17)" stroke="#fbbf24" strokeWidth="3" strokeLinejoin="round" transition={transition} />
        <motion.line x1={x} y1={y} x2={heightFootX} y2={baseY} stroke="#67e8f9" strokeWidth="2" strokeDasharray="5 4" transition={transition} />
        <motion.path d={`M${heightFootX >= originX ? heightFootX - 10 : heightFootX + 10} ${baseY} v-10 h${heightFootX >= originX ? 10 : -10}`} fill="none" stroke="#67e8f9" strokeWidth="1.5" transition={transition} />
        <motion.path d={`M${originX + 18} ${baseY} A18 18 0 0 0 ${originX + 18 * Math.cos(radians)} ${baseY - 18 * Math.sin(radians)}`} fill="none" stroke="#f472b6" strokeWidth="2.5" transition={transition} />
        <motion.circle cx={originX} cy={baseY} r="4" fill="#f472b6" transition={transition} /><motion.circle cx={baseEndX} cy={baseY} r="4" fill="#34d399" transition={transition} /><motion.circle cx={x} cy={y} r="4" fill="#38bdf8" transition={transition} />
        <motion.text x={originX - 12} y={baseY + 17} fill="#fbcfe8" fontSize="12" fontWeight="700" transition={transition}>A</motion.text><motion.text x={baseEndX + 5} y={baseY + 17} fill="#bbf7d0" fontSize="12" fontWeight="700" transition={transition}>B</motion.text><motion.text x={x + 6} y={y - 5} fill="#bae6fd" fontSize="12" fontWeight="700" transition={transition}>C</motion.text>
        <motion.text x={(originX + baseEndX) / 2 - 14} y={baseY + 16} fill="#fde68a" fontSize="11" transition={transition}>c = {sideC} cm</motion.text><motion.text x={(originX + x) / 2 + 5} y={(baseY + y) / 2} fill="#fde68a" fontSize="11" transition={transition}>b = {sideB} cm</motion.text>
        <motion.text x={originX + 20} y={baseY - 8} fill="#fda4af" fontSize="10" transition={transition}>A {angle}°</motion.text><motion.text x={heightFootX + 4} y={(baseY + y) / 2} fill="#a5f3fc" fontSize="9" transition={transition}>tinggi</motion.text>
      </svg>
    </div>
    <div className="min-w-0 space-y-3">
      <div className="rounded-2xl border border-amber-200/15 bg-amber-300/[.06] p-4">
        <label htmlFor="explore-angle" className="flex justify-between gap-2 text-xs font-bold text-amber-100"><span>Ubah sudut apit A</span><output htmlFor="explore-angle" data-testid="text-area-angle" aria-live="polite">{angle}°</output></label>
        <input id="explore-angle" data-testid="input-area-angle" type="range" min="15" max="150" value={angle} aria-label="Atur sudut apit A dari 15 sampai 150 derajat" aria-valuetext={`${angle} derajat`} onChange={e=>setAngle(Number(e.target.value))} className="mt-2 w-full accent-amber-300" />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="text-[11px] font-bold text-cyan-100">Sisi b (cm)<input data-testid="input-area-side-b" aria-label="Panjang sisi b dalam sentimeter" type="number" min="1" max="20" value={sideB} onChange={e=>setSideB(Math.max(1,Math.min(20,Number(e.target.value)||1)))} className="mt-1 w-full rounded-lg border border-white/15 bg-[#0b192c] px-2 py-2 text-sm text-white" /></label>
          <label className="text-[11px] font-bold text-cyan-100">Sisi c (cm)<input data-testid="input-area-side-c" aria-label="Panjang sisi c dalam sentimeter" type="number" min="1" max="20" value={sideC} onChange={e=>setSideC(Math.max(1,Math.min(20,Number(e.target.value)||1)))} className="mt-1 w-full rounded-lg border border-white/15 bg-[#0b192c] px-2 py-2 text-sm text-white" /></label>
        </div>
      </div>
      <div className="rounded-2xl border border-emerald-200/20 bg-emerald-300/[.06] p-4" aria-live="polite">
        <p className="text-[10px] font-black uppercase tracking-[.16em] text-emerald-100/70">Luas ikut berubah</p>
        <p data-testid="text-area-result" aria-live="polite" className="mt-1 font-display text-xl font-black text-emerald-100">{fmt(area)} cm²</p>
        <p data-testid="text-area-calculation" className="mt-2 break-words text-xs leading-relaxed text-white/75">L = ½ × {sideB} × {sideC} × sin {angle}° = {fmt(area)} cm²</p>
      </div>
      <p className="text-xs leading-relaxed text-slate-400">Geser sudut, lalu amati: alas dan sisi bisa tetap, tetapi tinggi—dan luasnya—ikut berubah.</p>
    </div>
  </div>;
};

const SmaAturanSinusCosinusLuasSegitigaPage = () => (
  <div className="animation-submaterial-route relative min-h-[100dvh] overflow-x-hidden bg-[#080f1e] text-slate-100">
    <Starfield />
    <style>{`
      @keyframes lesson-rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      .lesson-rise { animation: lesson-rise .55s ease-out both; }
      .lesson-delay { animation-delay: .1s; }
      @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }
    `}</style>
    <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri" />
    <main className="relative z-10 mx-auto w-full max-w-5xl min-w-0 px-3 pb-20 pt-8 sm:px-6 sm:pt-12">
      <header className="lesson-rise relative mb-6 overflow-hidden rounded-[2rem] border border-amber-100/20 bg-[linear-gradient(125deg,rgba(91,61,33,.97),rgba(28,53,66,.97)_58%,rgba(37,75,77,.95))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-8 sm:py-9">
        <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full border-[18px] border-amber-100/[.08]" />
        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-100/25 bg-amber-100/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.17em] text-amber-100"><BookOpen className="h-3.5 w-3.5" /> Matematika · SMA · Buku Animasi</div>
          <p className="font-body text-[11px] font-bold uppercase tracking-[.2em] text-cyan-100/80">Perbandingan trigonometri</p>
          <h1 className="mt-2 max-w-3xl font-display text-[clamp(1.9rem,7.5vw,3.5rem)] font-black leading-[1.06] tracking-tight text-white">Aturan Sinus, Cosinus dan Luas Segitiga</h1>
          <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-slate-200 sm:text-base">Segitiga punya banyak petunjuk. Dengan sinus, cosinus, dan Heron, kita bisa menemukan sisi, sudut, bahkan luasnya—ayo pecahkan dengan langkah yang rapi!</p>
          <div className="mt-5 inline-flex max-w-full items-start gap-2 rounded-xl border border-cyan-100/20 bg-cyan-200/[.08] px-3 py-2 text-xs font-semibold leading-relaxed text-cyan-50"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" /> Misi belajar: kenali data yang diketahui, pilih rumus yang pas, lalu cek satuannya.</div>
        </div>
      </header>
      <nav aria-label="Isi materi" className="mb-8 flex min-w-0 gap-2 overflow-x-auto pb-2">
        {[["aturan-sinus","Aturan sinus"],["aturan-cosinus","Aturan cosinus"],["luas-segitiga","Luas segitiga"],["rumus-heron","Rumus Heron"],["jelajah-luas","Lab interaktif"],["ringkasan","Rangkuman"]].map(([id,label])=><a key={id} data-testid={`link-nav-${id}`} href={`#${id}`} className="shrink-0 rounded-full border border-white/10 bg-white/[.045] px-3.5 py-2 font-body text-xs font-bold text-slate-200 transition hover:border-amber-200/40 hover:text-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200">{label}</a>)}
      </nav>

      <div className="min-w-0 space-y-9">
        <Section id="aturan-sinus" number="01" title="Aturan sinus" subtitle="Pasangkan setiap sisi dengan sudut di hadapannya">
          <div className="grid min-w-0 items-center gap-4 md:grid-cols-[.8fr_1.2fr]">
            <TriangleDiagram variant="circum" />
            <div className="min-w-0">
              <p className="mb-3 text-sm leading-relaxed text-slate-300">Pada segitiga ABC, sisi yang berlabel <InlineMath math="a,b,c" /> masing-masing berhadapan dengan sudut <InlineMath math="A,B,C" />. Aturan sinus menghubungkan setiap pasangan sisi dan sudut tersebut.</p>
              <Formula math="\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}=2R" label="Aturan sinus · R adalah jari-jari lingkaran luar" />
              <div className="rounded-xl border border-cyan-200/15 bg-cyan-300/[.05] p-3 text-xs leading-relaxed text-slate-300">Gunakan saat tersedia pasangan sisi dan sudut yang berhadapan. Pada kasus SSA, cek kemungkinan dua segitiga; jangan lupa jumlah sudut segitiga adalah 180°.</div>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <Example level="Mudah" title="Sisi dari tiga sudut istimewa" question={<>Pada segitiga ABC diketahui <InlineMath math="A=30^\circ,\ B=60^\circ" />, dan <InlineMath math="c=AB=12\text{ cm}" />. Tentukan <InlineMath math="C,a,b" />.</>}>
              <Step n={1}>Jumlah sudut segitiga 180°, jadi <InlineMath math="C=180^\circ-30^\circ-60^\circ=90^\circ" />.</Step>
              <Step n={2}>Karena <InlineMath math="c" /> berhadapan dengan sudut C, aturan sinus memberi <InlineMath math="a=\frac{12\sin30^\circ}{\sin90^\circ}=6\text{ cm}" />.</Step>
              <Step n={3}>Sisi berikutnya <InlineMath math="b=\frac{12\sin60^\circ}{\sin90^\circ}=6\sqrt3\text{ cm}\approx10{,}39\text{ cm}" />. Jadi <InlineMath math="C=90^\circ,\ a=6\text{ cm},\ b=6\sqrt3\text{ cm}" />.</Step>
            </Example>
            <Example level="Sedang" title="Temukan tiga sisi dari dua sudut" question={<>Pada segitiga PQR, <InlineMath math="Q=40^\circ" />, <InlineMath math="R=65^\circ" />, dan <InlineMath math="r=PQ=8\text{ cm}" />. Tentukan <InlineMath math="P,p=QR,q=PR" />.</>}>
              <Step n={1}>Jumlah sudut segitiga 180°, jadi <InlineMath math="P=180^\circ-40^\circ-65^\circ=75^\circ" />.</Step>
              <Step n={2}>Aturan sinus memberi <InlineMath math="p=\frac{8\sin75^\circ}{\sin65^\circ}\approx8{,}53\text{ cm}" /> dan <InlineMath math="q=\frac{8\sin40^\circ}{\sin65^\circ}\approx5{,}88\text{ cm}" />.</Step>
              <Step n={3}>Hasil: <InlineMath math="P=75^\circ,\ QR\approx8{,}53\text{ cm},\ PR\approx5{,}88\text{ cm}" />. Cocokkan sisi kecil dengan sudut di hadapannya.</Step>
            </Example>
            <Example level="Sulit" title="Kasus SSA dengan sudut tumpul" question={<>Diketahui <InlineMath math="A=125^\circ" />, <InlineMath math="a=BC=25\text{ cm}" />, dan <InlineMath math="c=AB=10{,}6\text{ cm}" />. Cari <InlineMath math="B,C,b" />.</>}>
              <Step n={1}>Aturan sinus: <InlineMath math="\sin C=\frac{c\sin A}{a}=\frac{10{,}6\sin125^\circ}{25}\approx0{,}3473" />, sehingga <InlineMath math="C\approx20{,}32^\circ" />.</Step>
              <Step n={2}>Karena <InlineMath math="A" /> sudah tumpul, dua sudut lain harus lancip. Maka <InlineMath math="B=180^\circ-125^\circ-20{,}32^\circ=34{,}68^\circ" />.</Step>
              <Step n={3}>Cari sisi <InlineMath math="b" />: <InlineMath math="b=\frac{25\sin34{,}68^\circ}{\sin125^\circ}\approx17{,}36\text{ cm}" />. Jadi <InlineMath math="C\approx20{,}32^\circ,\ B\approx34{,}68^\circ,\ b\approx17{,}36\text{ cm}" />.</Step>
            </Example>
          </div>
        </Section>

        <Section id="aturan-cosinus" number="02" title="Aturan cosinus" subtitle="Sambungkan ketiga sisi dengan sudut apit">
          <div className="grid min-w-0 items-center gap-4 md:grid-cols-[.8fr_1.2fr]">
            <TriangleDiagram />
            <div className="min-w-0">
              <p className="mb-2 text-sm leading-relaxed text-slate-300">Saat kita mengenal dua sisi dan sudut apit, aturan cosinus mencari sisi ketiga. Jika tiga sisi diketahui, rumus yang sama dapat mencari besar sudut.</p>
              <Formula math="\begin{aligned}a^2&=b^2+c^2-2bc\cos A\\b^2&=a^2+c^2-2ac\cos B\\c^2&=a^2+b^2-2ab\cos C\end{aligned}" label="Tiga bentuk aturan cosinus" />
              <p className="text-xs leading-relaxed text-slate-400">Untuk mencari sudut A, susun ulang menjadi <InlineMath math="\cos A=\frac{b^2+c^2-a^2}{2bc}" />.</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <Example level="Mudah" title="Sudut dari ketiga panjang sisi" question={<>Dalam segitiga ABC, <InlineMath math="a=5,\ b=2\sqrt{13},\ c=9" />. Tentukan sudut <InlineMath math="A" />.</>}>
              <Step n={1}>Semua sisi diketahui, maka <InlineMath math="\cos A=\frac{b^2+c^2-a^2}{2bc}" />.</Step>
              <Step n={2}>Substitusi dan sederhanakan: <InlineMath math="\cos A=\frac{52+81-25}{2(2\sqrt{13})(9)}=\frac{108}{36\sqrt{13}}=\frac{3}{\sqrt{13}}" />.</Step>
              <Step n={3}>Jadi <InlineMath math="A=\cos^{-1}\left(\frac{3}{\sqrt{13}}\right)\approx33{,}69^\circ" />. Pastikan kalkulator dalam mode derajat.</Step>
            </Example>
            <Example level="Sedang" title="Dua segitiga siku-siku, satu panjang yang dicari" question={<>Titik T, B, C segaris dengan B di antara T dan C. Diketahui <InlineMath math="AB=BC=5\text{ cm},\ TC=8\text{ cm}" />, serta <InlineMath math="AT\perp TC" />. Tentukan <InlineMath math="AC" />.</>}>
              <Step n={1}>Karena B berada di antara T dan C, <InlineMath math="TB=TC-BC=8-5=3\text{ cm}" />. Segitiga ATB siku-siku di T.</Step>
              <Step n={2}>Pakai Pythagoras pada ATB: <InlineMath math="AT^2=AB^2-TB^2=5^2-3^2=16" />, sehingga <InlineMath math="AT=4\text{ cm}" />.</Step>
              <Step n={3}>Pada segitiga ATC, sudut apit T adalah 90°. Terapkan aturan cosinus: <InlineMath math="AC^2=AT^2+TC^2-2(AT)(TC)\cos90^\circ=4^2+8^2-2(4)(8)(0)=80" />.</Step>
              <Step n={4}>Maka <InlineMath math="AC=\sqrt{80}=4\sqrt5\text{ cm}\approx8{,}94\text{ cm}" />. Cosinus 90° meniadakan suku silang, tepat seperti yang diharapkan untuk sisi siku-siku.</Step>
            </Example>
            <Example level="Sulit" title="Dua sisi dan sudut apit mencari sisi" question={<>Pada segitiga PQR diketahui <InlineMath math="q=428{,}6\text{ m},\ r=540{,}2\text{ m},\ P=72{,}5^\circ" />. Tentukan panjang <InlineMath math="p" />.</>}>
              <Step n={1}>Sudut P diapit sisi q dan r, sehingga gunakan <InlineMath math="p^2=q^2+r^2-2qr\cos P" />.</Step>
              <Step n={2}>Substitusi nilai: <InlineMath math="p^2=428{,}6^2+540{,}2^2-2(428{,}6)(540{,}2)\cos72{,}5^\circ\approx336269{,}34" />.</Step>
              <Step n={3}>Hitung lalu akarkan: <InlineMath math="p\approx579{,}9\text{ m}" />. Tabel nilai atau pembulatan antara bisa memberi hasil sangat dekat.</Step>
            </Example>
          </div>
        </Section>

        <Section id="luas-segitiga" number="03" title="Luas segitiga dari sinus sudut apit" subtitle="Dua sisi, satu sudut, luas langsung didapat">
          <div className="grid min-w-0 items-center gap-4 md:grid-cols-[.8fr_1.2fr]">
            <TriangleDiagram variant="height" />
            <div className="min-w-0">
              <p className="text-sm leading-relaxed text-slate-300">Tarik tinggi dari titik C ke alas. Tingginya <InlineMath math="b\sin A" />, sehingga luas adalah setengah alas kali tinggi. Pilih pasangan sisi dan sudut apitnya:</p>
              <Formula math="L=\frac12bc\sin A=\frac12ac\sin B=\frac12ab\sin C" label="Sudut berada di antara dua sisi yang dipakai" />
              <p className="text-xs leading-relaxed text-slate-400">Pastikan kalkulator memakai derajat untuk sudut bertanda °. Luas memakai satuan kuadrat.</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <Example level="Mudah" title="Sudut 30° membuat hitungan ringkas" question={<>Sebuah segitiga memiliki <InlineMath math="AB=14\text{ cm}" />, <InlineMath math="BC=10\text{ cm}" />, dan <InlineMath math="\angle ABC=30^\circ" />. Berapa luasnya?</>}>
              <Step n={1}>Sudut B diapit sisi AB dan BC, jadi <InlineMath math="L=\frac12(14)(10)\sin30^\circ" />.</Step>
              <Step n={2}>Karena <InlineMath math="\sin30^\circ=\frac12" />, diperoleh <InlineMath math="L=70\cdot\frac12=35\text{ cm}^2" />.</Step>
              <Step n={3}>Luas segitiga adalah <InlineMath math="35\text{ cm}^2" />. Pasangan sisi yang mengapit sudut sudah tepat.</Step>
            </Example>
            <Example level="Sedang" title="Sudut apit bukan sudut istimewa" question={<>Diketahui <InlineMath math="b=16\text{ cm}, c=9\text{ cm}, A=72^\circ" />. Hitung luas segitiga.</>}>
              <Step n={1}>Sisi <InlineMath math="b" /> dan <InlineMath math="c" /> mengapit sudut <InlineMath math="A" />, jadi gunakan <InlineMath math="L=\frac12bc\sin A" />.</Step>
              <Step n={2}>Substitusi: <InlineMath math="L=\frac12(16)(9)\sin72^\circ=72(0{,}9511)\approx68{,}48\text{ cm}^2" />.</Step>
              <Step n={3}>Jadi luasnya sekitar <InlineMath math="68{,}48\text{ cm}^2" /> (pembulatan dua desimal).</Step>
            </Example>
            <Example level="Sulit" title="Cari sisi dahulu, baru luas" question={<>Pada segitiga PQR, <InlineMath math="P=48^\circ,\ R=80^\circ,\ q=20\text{ cm}" />. Tentukan luas segitiga.</>}>
              <Step n={1}>Sudut sisanya <InlineMath math="Q=180^\circ-48^\circ-80^\circ=52^\circ" />. Sisi <InlineMath math="q" /> berhadapan dengan sudut Q.</Step>
              <Step n={2}>Dengan aturan sinus, <InlineMath math="r=\frac{20\sin80^\circ}{\sin52^\circ}\approx25{,}00\text{ cm}" />.</Step>
              <Step n={3}>Sisi <InlineMath math="q" /> dan <InlineMath math="r" /> mengapit sudut P. Maka <InlineMath math="L=\frac12(20)(25{,}00)\sin48^\circ\approx185{,}8\text{ cm}^2" />.</Step>
              <Step n={4}>Luas segitiga PQR sekitar <InlineMath math="185{,}8\text{ cm}^2" />. Strateginya: tentukan sudut, cari sisi pasangan, baru hitung luas.</Step>
            </Example>
          </div>
        </Section>

        <Section id="rumus-heron" number="04" title="Rumus Heron: tiga sisi, luas ketemu" subtitle="Tak ada sudut? Tetap bisa menghitung luas">
          <div className="grid min-w-0 items-center gap-4 md:grid-cols-[.8fr_1.2fr]">
            <TriangleDiagram />
            <div className="min-w-0">
              <p className="text-sm leading-relaxed text-slate-300">Kalau ketiga panjang sisi diketahui, hitung setengah keliling <InlineMath math="s" /> terlebih dahulu. Lalu masukkan ke rumus Heron.</p>
              <Formula math="s=\frac{a+b+c}{2}\qquad L=\sqrt{s(s-a)(s-b)(s-c)}" label="Rumus Heron" />
              <p className="text-xs leading-relaxed text-slate-400">Syarat segitiga tetap berlaku: jumlah dua sisi mana pun harus lebih besar dari sisi ketiga.</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <Example level="Mudah" title="Sisi 5, 6, dan 7" question={<>Hitung luas segitiga dengan sisi <InlineMath math="a=5\text{ cm}, b=6\text{ cm}, c=7\text{ cm}" />.</>}>
              <Step n={1}>Setengah kelilingnya <InlineMath math="s=\frac{5+6+7}{2}=9\text{ cm}" />.</Step>
              <Step n={2}>Rumus Heron: <InlineMath math="L=\sqrt{9(9-5)(9-6)(9-7)}=\sqrt{9\cdot4\cdot3\cdot2}=\sqrt{216}" />.</Step>
              <Step n={3}>Sederhanakan: <InlineMath math="L=6\sqrt6\text{ cm}^2\approx14{,}70\text{ cm}^2" />.</Step>
            </Example>
            <Example level="Sedang" title="Hasil akar yang tetap rapi" question={<>Sisi segitiga berturut-turut <InlineMath math="7\text{ cm},8\text{ cm},9\text{ cm}" />. Tentukan luasnya.</>}>
              <Step n={1}>Hitung <InlineMath math="s=\frac{7+8+9}{2}=12\text{ cm}" />.</Step>
              <Step n={2}>Masukkan ke Heron: <InlineMath math="L=\sqrt{12(12-7)(12-8)(12-9)}=\sqrt{12\cdot5\cdot4\cdot3}=\sqrt{720}" />.</Step>
              <Step n={3}>Jadi <InlineMath math="L=12\sqrt5\text{ cm}^2\approx26{,}83\text{ cm}^2" />. Luas eksaknya tetap boleh ditulis dalam bentuk akar.</Step>
            </Example>
            <Example level="Sulit" title="Segitiga 13–14–15" question={<>Sebuah segitiga memiliki sisi <InlineMath math="13\text{ cm},14\text{ cm},15\text{ cm}" />. Cari luasnya.</>}>
              <Step n={1}>Setengah keliling: <InlineMath math="s=\frac{13+14+15}{2}=21\text{ cm}" />.</Step>
              <Step n={2}>Selisihnya <InlineMath math="21-13=8,\ 21-14=7,\ 21-15=6" />. Maka <InlineMath math="L=\sqrt{21\cdot8\cdot7\cdot6}=\sqrt{7056}" />.</Step>
              <Step n={3}>Karena <InlineMath math="84^2=7056" />, luasnya tepat <InlineMath math="84\text{ cm}^2" />. Cek akhir: satuannya kuadrat dan ketiga sisinya membentuk segitiga.</Step>
            </Example>
          </div>
        </Section>

        <section id="jelajah-luas" className="scroll-mt-6">
          <div className="mb-4 flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-100"><Waves className="h-5 w-5" /></span>
            <div><p className="font-body text-[10px] font-black uppercase tracking-[.18em] text-cyan-200/70">Eksperimen langsung</p><h2 className="font-display text-xl font-black leading-tight text-white sm:text-2xl">Coba sendiri: putar sudutnya!</h2></div>
          </div>
          <div className="rounded-[1.6rem] border border-cyan-200/15 bg-[#111a36]/90 p-4 sm:p-6">
            <div className="mb-4 flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-100"><Waves className="h-5 w-5" /></span><p className="text-sm leading-relaxed text-slate-300">Atur panjang kedua sisi dan geser sudut apit. Diagram SVG, nilai sinus, dan luas berubah serempak. Coba 90° lalu bandingkan dengan sudut yang lebih lancip!</p></div>
            <AreaExplorer />
            <Formula math="L=\frac12bc\sin A" label="Amati pola: sisi tetap, sudut mengubah tinggi" />
          </div>
        </section>

        <section id="ringkasan" className="scroll-mt-6 rounded-[1.6rem] border border-amber-200/20 bg-gradient-to-br from-[#1a2b40] to-[#302b3a] p-4 sm:p-6">
          <div className="mb-4 flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-300/10 text-amber-100"><Check className="h-5 w-5" /></span><div><p className="font-body text-[10px] font-black uppercase tracking-[.18em] text-amber-200/70">Bekal sebelum lanjut</p><h2 className="font-display text-xl font-black text-white sm:text-2xl">Rangkuman &amp; strategi jitu</h2></div></div>
          <ul className="space-y-3 text-sm leading-relaxed text-slate-200">
            <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Aturan sinus: <InlineMath math="\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}=2R" />; pasangan huruf kecil dan besar harus berhadapan.</li>
            <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Aturan cosinus mengaitkan tiga sisi dengan cosinus sudut apit; gunakan saat data sisi-sudutnya cocok.</li>
            <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Luas dari dua sisi dan sudut apit: <InlineMath math="L=\frac12bc\sin A" /> (atau pasangan lain yang setara).</li>
            <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Jika ketiga sisi diketahui, pakai Heron: <InlineMath math="L=\sqrt{s(s-a)(s-b)(s-c)}" />, dengan <InlineMath math="s=\frac{a+b+c}{2}" />.</li>
          </ul>
          <div className="mt-5 rounded-2xl border border-cyan-100/15 bg-cyan-200/[.06] p-4">
            <h3 className="flex items-center gap-2 font-display text-sm font-black text-cyan-100"><Lightbulb className="h-4 w-4" /> Cek cepat sebelum menjawab</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">Tandai sisi yang berhadapan, pastikan sudut apit tepat, gunakan satuan sudut yang benar, lalu tulis satuan luas dalam bentuk kuadrat. Teliti bukan berarti lambat—teliti membuat jawaban makin mantap!</p>
          </div>
          <p className="mt-5 text-center font-display text-sm font-bold text-amber-100">Satu segitiga, banyak jalan. Pilih rumus yang tepat dan terus melangkah!</p>
        </section>
      </div>
    </main>
  </div>
);

export default SmaAturanSinusCosinusLuasSegitigaPage;
