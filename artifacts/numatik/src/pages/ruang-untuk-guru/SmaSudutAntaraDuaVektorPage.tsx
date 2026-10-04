import { useState, type ReactNode } from "react";
import { Compass, RotateCcw, Sparkles } from "lucide-react";
import { BlockMath, InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import PageNavigation from "@/components/PageNavigation";
import Starfield from "@/components/Starfield";

const InlineMath = ({ math }: { math: string }) => <KaTeXInlineMath math={math} />;

const Formula = ({ math, testId }: { math: string; testId?: string }) => (
  <div className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/90 px-4 py-3 text-center text-cyan-100 sm:px-6" data-testid={testId}>
    <BlockMath math={math} />
  </div>
);

const SectionTitle = ({ index, kicker, title, description }: { index: string; kicker: string; title: string; description: string }) => (
  <div className="mb-6 flex gap-4" data-testid={`section-heading-${index}`}>
    <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-display text-xs font-black text-cyan-100">{index}</span>
    <div>
      <p className="mb-1 font-body text-[10px] font-black uppercase tracking-[.22em] text-cyan-200/65">{kicker}</p>
      <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-slate-300">{description}</p>
    </div>
  </div>
);

type ExampleProps = { id: string; level: string; question: ReactNode; steps: ReactNode[]; conclusion: ReactNode };
const Example = ({ id, level, question, steps, conclusion }: ExampleProps) => (
  <article className="overflow-hidden rounded-3xl border border-white/10 bg-[#101b2d]/90" data-testid={`example-${id}`}>
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
      <h3 className="font-display text-lg font-extrabold text-white">Contoh {level}</h3>
      <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">{level}</span>
    </div>
    <div className="grid gap-3 p-3 sm:p-4">
      <div className="rounded-2xl border border-amber-200/25 bg-amber-300/[.09] p-4" data-testid={`question-${id}`}>
        <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.18em] text-amber-200">Tantangan</p>
        <div className="font-body text-sm leading-relaxed text-amber-50/95">{question}</div>
      </div>
      <div className="rounded-2xl border border-cyan-200/20 bg-cyan-300/[.07] p-4" data-testid={`solution-${id}`}>
        <p className="mb-3 font-body text-[10px] font-black uppercase tracking-[.18em] text-cyan-200">Urai bersama</p>
        <ol className="space-y-3">
          {steps.map((step, index) => <li key={`${id}-step-${index}`} className="grid grid-cols-[1.5rem_1fr] gap-2 text-sm leading-relaxed text-slate-200"><span className="grid h-6 w-6 place-items-center rounded-lg bg-cyan-200/10 font-display text-xs font-black text-cyan-100">{index + 1}</span><div>{step}</div></li>)}
        </ol>
        <p className="mt-3 border-t border-cyan-100/10 pt-3 font-body text-sm font-semibold leading-relaxed text-white">{conclusion}</p>
      </div>
    </div>
  </article>
);

const RangeControl = ({ label, value, min, max, step, onChange, testId, accent = "cyan" }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void; testId: string; accent?: "cyan" | "amber" | "violet";
}) => (
  <label className="block rounded-2xl border border-white/10 bg-white/[.035] p-3">
    <span className="flex items-center justify-between gap-2 font-body text-xs font-bold text-slate-200">
      <span>{label}</span><output className={`font-display text-sm tabular-nums ${accent === "amber" ? "text-amber-100" : accent === "violet" ? "text-violet-100" : "text-cyan-100"}`} data-testid={`${testId}-value`}>{value}</output>
    </span>
    <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} aria-label={label} data-testid={testId}
      className={`mt-3 h-2 w-full cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101b2d] ${accent === "amber" ? "accent-amber-300 focus-visible:ring-amber-200" : accent === "violet" ? "accent-violet-300 focus-visible:ring-violet-200" : "accent-cyan-300 focus-visible:ring-cyan-200"}`} />
    <span className="mt-1 flex justify-between font-body text-[10px] text-slate-400"><span>{min}</span><span>{max}</span></span>
  </label>
);

const VectorDiagram = ({ magnitudeA, magnitudeB, angle }: { magnitudeA: number; magnitudeB: number; angle: number }) => {
  const origin = { x: 215, y: 185 };
  const scale = 29;
  const radians = angle * Math.PI / 180;
  const aEnd = { x: origin.x + magnitudeA * scale, y: origin.y };
  const bEnd = { x: origin.x + magnitudeB * scale * Math.cos(radians), y: origin.y - magnitudeB * scale * Math.sin(radians) };
  const radius = 47;
  const arcEnd = { x: origin.x + radius * Math.cos(radians), y: origin.y - radius * Math.sin(radians) };
  const arcPath = angle === 0 ? "" : `M ${origin.x + radius} ${origin.y} A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 0 ${arcEnd.x} ${arcEnd.y}`;
  return (
    <svg viewBox="0 0 430 300" role="img" aria-label={`Dua vektor dengan besar ${magnitudeA} dan ${magnitudeB} membentuk sudut ${angle} derajat`} className="block h-auto w-full" data-testid="angle-vector-diagram">
      <defs>
        <pattern id="angle-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#94a3b8" strokeOpacity=".14" /></pattern>
        <marker id="angle-a-tip" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L10 5L0 10Z" fill="#67e8f9" /></marker>
        <marker id="angle-b-tip" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L10 5L0 10Z" fill="#fbbf24" /></marker>
      </defs>
      <rect x="10" y="10" width="410" height="280" rx="18" fill="url(#angle-grid)" />
      <line x1="24" y1={origin.y} x2="405" y2={origin.y} stroke="#94a3b8" strokeOpacity=".48" />
      <line x1={origin.x} y1="22" x2={origin.x} y2="278" stroke="#94a3b8" strokeOpacity=".25" />
      <line x1={origin.x} y1={origin.y} x2={aEnd.x} y2={aEnd.y} stroke="#67e8f9" strokeWidth="5" strokeLinecap="round" markerEnd="url(#angle-a-tip)" style={{ transition: "x2 .25s ease, y2 .25s ease" }} />
      <line x1={origin.x} y1={origin.y} x2={bEnd.x} y2={bEnd.y} stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" markerEnd="url(#angle-b-tip)" style={{ transition: "x2 .25s ease, y2 .25s ease" }} />
      {angle === 0 ? <circle cx={origin.x + 18} cy={origin.y} r="3" fill="#fda4af" /> : <path d={arcPath} fill="none" stroke="#fda4af" strokeWidth="3" strokeLinecap="round" style={{ transition: "all .25s ease" }} />}
      <circle cx={origin.x} cy={origin.y} r="5" fill="#f8fafc" />
      <text x={aEnd.x - 5} y={aEnd.y + 23} fill="#a5f3fc" fontSize="15" fontWeight="700">a</text>
      <text x={bEnd.x + (angle > 145 ? -15 : 8)} y={bEnd.y - 10} fill="#fde68a" fontSize="15" fontWeight="700">b</text>
      <text x={origin.x + 54 * Math.cos(radians / 2)} y={origin.y - 54 * Math.sin(radians / 2) - 5} fill="#fda4af" fontSize="13" fontWeight="700">θ = {angle}°</text>
      <text x="394" y={origin.y - 8} fill="#cbd5e1" fontSize="11">x</text>
      <text x={origin.x + 8} y="30" fill="#cbd5e1" fontSize="11">y</text>
    </svg>
  );
};

const AngleLab = () => {
  const [a, setA] = useState(4);
  const [b, setB] = useState(3);
  const [angle, setAngle] = useState(60);
  const radians = angle * Math.PI / 180;
  const dot = a * b * Math.cos(radians);
  const cosine = Math.max(-1, Math.min(1, dot / (a * b)));
  const calculatedAngle = Math.acos(cosine) * 180 / Math.PI;
  const relation = angle === 0
    ? <>Sejajar searah: sudut <InlineMath math="0^\circ" />.</>
    : angle === 180
      ? <>Sejajar berlawanan arah: sudut <InlineMath math="180^\circ" />.</>
      : angle === 90
        ? <>Tegak lurus: hasil kali titik nol.</>
        : angle < 90
          ? <>Sudut lancip: hasil kali titik positif.</>
          : <>Sudut tumpul: hasil kali titik negatif.</>;
  const reset = () => { setA(4); setB(3); setAngle(60); };
  return (
    <div className="overflow-hidden rounded-[2rem] border border-violet-200/20 bg-[linear-gradient(145deg,rgba(41,27,66,.78),rgba(10,20,37,.98))]" data-testid="angle-lab">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div><p className="font-body text-[10px] font-black uppercase tracking-[.18em] text-violet-100/75">Meja eksperimen</p><h3 className="font-display text-lg font-extrabold text-white">Putar arah, amati hasil</h3></div>
        <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 font-body text-xs font-bold text-slate-100 hover:bg-white/[.09] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-200" data-testid="reset-angle-lab"><RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />Atur ulang</button>
      </div>
      <div className="grid items-start lg:grid-cols-[1fr_300px]">
        <div className="min-w-0 p-3 sm:p-5">
          <div className="rounded-2xl border border-white/10 bg-[#081426]/90 p-2 sm:p-3"><VectorDiagram magnitudeA={a} magnitudeB={b} angle={angle} /></div>
          <div className="mt-3 flex flex-wrap gap-4 font-body text-xs text-slate-200"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-cyan-300" />Vektor a</span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-amber-300" />Vektor b</span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-rose-300" />Sudut apit</span></div>
        </div>
        <aside className="border-t border-white/10 bg-black/10 p-4 sm:p-5 lg:border-l lg:border-t-0" aria-label="Kontrol eksperimen sudut vektor">
          <p className="mb-3 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-300">Atur panjang dan arah</p>
          <div className="space-y-2">
            <RangeControl label="Besar vektor a" value={a} min={1} max={5} step={0.5} onChange={setA} testId="angle-input-a" />
            <RangeControl label="Besar vektor b" value={b} min={1} max={5} step={0.5} onChange={setB} testId="angle-input-b" accent="amber" />
            <RangeControl label="Sudut apit (derajat)" value={angle} min={0} max={180} step={1} onChange={setAngle} testId="angle-input-theta" accent="violet" />
          </div>
          <div className="mt-3 rounded-2xl border border-violet-200/20 bg-violet-300/[.08] p-4" data-testid="angle-lab-result">
            <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.18em] text-violet-100/80">Hasil saat ini</p>
            <div className="rounded-xl border border-white/10 bg-[#071326]/90 px-3 py-3 text-center text-violet-50" data-testid="angle-live-dot"><BlockMath math={`\\vec a\\cdot\\vec b=${dot.toFixed(2)}`} /></div>
            <p className="mt-3 font-body text-xs text-slate-100">Sudut dari rumus kosinus: <strong className="text-violet-100" data-testid="angle-live-value"><InlineMath math={`${calculatedAngle.toFixed(1)}^\\circ`} /></strong></p>
            <p role="status" aria-live="polite" className="mt-2 font-body text-xs font-bold leading-relaxed text-amber-100" data-testid="angle-live-status">{relation} Tanda dot product: {dot > 0 ? "positif" : dot < 0 ? "negatif" : "nol"}.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

const SmaSudutAntaraDuaVektorPage = () => (
  <div className="relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
    <Starfield />
    <style>{`
      @keyframes angle-enter { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      .angle-enter { animation: angle-enter .55s cubic-bezier(.2,.7,.2,1) both; }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
      }
    `}</style>
    <PageNavigation />
    <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
      <header className="angle-enter relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.97),rgba(16,22,43,.96)_58%,rgba(54,37,71,.9))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10" data-testid="lesson-hero">
        <div className="pointer-events-none absolute -right-12 -top-14 h-64 w-64 rounded-full border border-cyan-100/10" />
        <div className="relative grid items-center gap-7 md:grid-cols-[1.08fr_.92fr]">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2"><span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Matematika · SMA</span><span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-200">Vektor dan Operasinya</span></div>
            <p className="mb-2 font-body text-xs font-bold uppercase tracking-[.24em] text-amber-200">Eksperimen arah · 5 menit</p>
            <h1 className="max-w-2xl font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="lesson-title">Sudut antara<br /><span className="text-cyan-200">dua vektor</span></h1>
            <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-slate-200 sm:text-lg">Putar satu panah. Perhatikan hasil kali titiknya. Bisakah kamu menebak kapan sudutnya lancip, siku-siku, atau tumpul?</p>
            <div className="mt-6 flex items-center gap-2 text-sm text-amber-100"><Sparkles className="h-4 w-4" aria-hidden="true" /><span>Geser sudutnya, lalu lihat hubungan arah dan tandanya.</span></div>
          </div>
          <div className="mx-auto w-full max-w-md rounded-[1.75rem] border border-white/10 bg-[#091528]/75 p-3" data-testid="hero-angle-illustration">
            <svg viewBox="0 0 390 245" role="img" aria-label="Vektor a dan b berpangkal sama; lengkung di antara keduanya menandai sudut theta" className="w-full">
              <defs><marker id="hero-angle-cyan" markerWidth="11" markerHeight="11" refX="9" refY="5.5" orient="auto"><path d="M0 0L11 5.5L0 11Z" fill="#67e8f9" /></marker><marker id="hero-angle-gold" markerWidth="11" markerHeight="11" refX="9" refY="5.5" orient="auto"><path d="M0 0L11 5.5L0 11Z" fill="#fbbf24" /></marker></defs>
              <circle cx="168" cy="151" r="100" fill="none" stroke="#a5f3fc" strokeOpacity=".14" strokeDasharray="3 9" />
              <line x1="168" y1="151" x2="314" y2="151" stroke="#67e8f9" strokeWidth="6" strokeLinecap="round" markerEnd="url(#hero-angle-cyan)" />
              <line x1="168" y1="151" x2="265" y2="62" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" markerEnd="url(#hero-angle-gold)" />
              <path d="M218 151 A50 50 0 0 0 204 116" fill="none" stroke="#fda4af" strokeWidth="4" strokeLinecap="round" />
              <circle cx="168" cy="151" r="6" fill="#f8fafc" />
              <text x="319" y="158" fill="#a5f3fc" fontSize="16" fontWeight="700">a</text><text x="271" y="57" fill="#fde68a" fontSize="16" fontWeight="700">b</text><text x="218" y="117" fill="#fda4af" fontSize="15" fontWeight="700">θ</text>
              <text x="190" y="218" fill="#cbd5e1" fontSize="12" textAnchor="middle">pangkal sama · arah berbeda</text>
            </svg>
          </div>
        </div>
      </header>

      <div className="mb-8 rounded-2xl border border-white/10 bg-[#0d1728]/90 p-4 sm:flex sm:items-center sm:justify-between sm:gap-4" data-testid="lesson-map">
        <p className="mb-3 flex items-center gap-2 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-300 sm:mb-0"><Compass className="h-4 w-4 text-cyan-200" /> Alur penemuan</p>
        <nav aria-label="Peta materi" className="grid grid-cols-3 gap-2 pl-12 sm:flex sm:flex-wrap sm:pl-0">
          {[["Konsep", "#makna-sudut"], ["Eksperimen", "#eksperimen"], ["Latihan", "#contoh"]].map(([label, target], index) => <a key={target} href={target} data-testid={`link-lesson-section-${index + 1}`} className="whitespace-nowrap rounded-full border border-white/10 bg-white/[.035] px-2 py-2 text-center font-body text-[10px] font-bold text-slate-100 transition hover:border-cyan-100/35 hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 sm:px-3 sm:text-xs">{String(index + 1).padStart(2, "0")} · {label}</a>)}
        </nav>
      </div>

      <div className="space-y-14">
        <section id="makna-sudut" className="scroll-mt-6" data-testid="angle-theory-section">
          <SectionTitle index="01" kicker="Dari arah ke ukuran" title="Apa yang disebut sudut apit?" description="Bayangkan kedua vektor berangkat dari titik yang sama. Sudut apitnya adalah sudut terkecil di antara arah keduanya." />
          <div className="grid gap-4 md:grid-cols-[.9fr_1.1fr]">
            <article className="rounded-3xl border border-cyan-200/20 bg-cyan-300/[.06] p-5 sm:p-6" data-testid="angle-summary">
              <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.18em] text-cyan-100">Inti konsep</p>
              <p className="font-body text-sm leading-relaxed text-slate-100">Untuk dua vektor tak nol, sudut apit yang kita pakai selalu sudut terkecil, <InlineMath math="\theta\in[0^\circ,180^\circ]" />. Hasil kali titik menghubungkan arah vektor dengan kosinus sudutnya.</p>
              <div className="mt-4 space-y-2">
                <Formula math="\cos\theta=\frac{\vec a\cdot\vec b}{|\vec a|\,|\vec b|}" />
                <Formula math="\theta=\cos^{-1}\left(\frac{\vec a\cdot\vec b}{|\vec a|\,|\vec b|}\right)" />
                <Formula math="\vec a\cdot\vec b=a_xb_x+a_yb_y\quad\text{(2D)}" />
                <Formula math="\vec a\cdot\vec b=a_xb_x+a_yb_y+a_zb_z\quad\text{(3D)}" />
              </div>
            </article>
            <div className="grid content-start gap-3" data-testid="angle-sign-guide">
              <article className="rounded-3xl border border-emerald-200/20 bg-emerald-300/[.07] p-5"><p className="font-display text-xl font-black text-emerald-200"><InlineMath math="\vec a\cdot\vec b>0" /></p><h3 className="mt-1 font-display text-base font-extrabold text-white">Lancip</h3><p className="mt-2 font-body text-sm leading-relaxed text-slate-100">Sudut kurang dari <InlineMath math="90^\circ" />.</p></article>
              <article className="rounded-3xl border border-sky-200/20 bg-sky-300/[.07] p-5"><p className="font-display text-xl font-black text-sky-200"><InlineMath math="\vec a\cdot\vec b=0" /></p><h3 className="mt-1 font-display text-base font-extrabold text-white">Siku-siku</h3><p className="mt-2 font-body text-sm leading-relaxed text-slate-100">Kedua vektor tegak lurus.</p></article>
              <article className="rounded-3xl border border-rose-200/20 bg-rose-300/[.07] p-5"><p className="font-display text-xl font-black text-rose-200"><InlineMath math="\vec a\cdot\vec b<0" /></p><h3 className="mt-1 font-display text-base font-extrabold text-white">Tumpul</h3><p className="mt-2 font-body text-sm leading-relaxed text-slate-100">Sudut lebih dari <InlineMath math="90^\circ" />.</p></article>
            </div>
          </div>
          <blockquote className="mt-4 rounded-2xl border-l-4 border-amber-300 bg-amber-200/[.08] px-5 py-4 font-body text-sm leading-relaxed text-amber-50" data-testid="angle-key-tip">
            <span className="mb-1 block font-body text-[10px] font-black uppercase tracking-[.18em] text-amber-200">Ingat saat menghitung</span>
            Vektor nol tidak memiliki arah, jadi sudutnya tidak terdefinisi. Pastikan kedua vektor bukan vektor nol sebelum memakai rumus sudut.
          </blockquote>
        </section>

        <section id="eksperimen" className="scroll-mt-6" data-testid="angle-lab-section">
          <SectionTitle index="02" kicker="Coba sendiri" title="Putar vektor b" description="Besar kedua vektor tetap bisa diubah, tetapi sudutlah yang menentukan tanda dot product. Geser kontrol dengan tetikus atau tombol panah." />
          <AngleLab />
        </section>

        <section id="contoh" className="scroll-mt-6" data-testid="angle-examples-section">
          <SectionTitle index="03" kicker="Tiga tingkat tantangan" title="Dari gambar ke perhitungan" description="Kita hitung sudut dengan langkah yang sama: temukan dot product, cari panjang, lalu gunakan invers kosinus." />
          <div className="grid gap-3 lg:grid-cols-3">
            <Example id="angle-easy" level="Mudah" question={<>Tentukan sudut antara <InlineMath math="\vec a=(1,0)" /> dan <InlineMath math="\vec b=(1,1)" />.</>} steps={[
              <>Hasil kali titiknya <InlineMath math="\vec a\cdot\vec b=1(1)+0(1)=1" />.</>,
              <>Panjangnya <InlineMath math="|\vec a|=1" /> dan <InlineMath math="|\vec b|=\sqrt{1^2+1^2}=\sqrt2" />.</>,
              <>Maka <InlineMath math="\cos\theta=\frac{1}{1\cdot\sqrt2}=\frac1{\sqrt2}" />.</>,
              <>Ambil invers kosinus: <InlineMath math="\theta=\cos^{-1}\left(\frac1{\sqrt2}\right)=45^\circ" />.</>,
            ]} conclusion={<>Sudutnya <InlineMath math="45^\circ" />, yaitu sudut lancip karena dot product bernilai positif.</>} />
            <Example id="angle-medium" level="Sedang" question={<>Cari sudut antara <InlineMath math="\vec a=(1,2,2)" /> dan <InlineMath math="\vec b=(2,1,0)" />. Bulatkan ke satu angka desimal.</>} steps={[
              <>Kalikan komponen sepasang-sepasang: <InlineMath math="\vec a\cdot\vec b=1(2)+2(1)+2(0)=4" />.</>,
              <>Panjang kedua vektor: <InlineMath math="|\vec a|=\sqrt{1+4+4}=3" /> dan <InlineMath math="|\vec b|=\sqrt{4+1+0}=\sqrt5" />.</>,
              <>Jadi <InlineMath math="\cos\theta=\frac{4}{3\sqrt5}\approx0.596" />.</>,
              <>Dengan invers kosinus, <InlineMath math="\theta=\cos^{-1}\left(\frac{4}{3\sqrt5}\right)\approx53.4^\circ" />.</>,
            ]} conclusion={<>Sudutnya sekitar <InlineMath math="53.4^\circ" />. Nilainya lancip, selaras dengan dot product positif.</>} />
            <Example id="angle-hard" level="Sulit" question={<>Tentukan sudut antara <InlineMath math="\vec a=(1,2,-2)" /> dan <InlineMath math="\vec b=(3,-1,2)" />. Jelaskan makna tandanya.</>} steps={[
              <>Hitung dot product: <InlineMath math="\vec a\cdot\vec b=1(3)+2(-1)+(-2)(2)=3-2-4=-3" />.</>,
              <>Panjang vektor pertama <InlineMath math="|\vec a|=\sqrt{1+4+4}=3" />, sedangkan <InlineMath math="|\vec b|=\sqrt{9+1+4}=\sqrt{14}" />.</>,
              <>Maka <InlineMath math="\cos\theta=\frac{-3}{3\sqrt{14}}=-\frac1{\sqrt{14}}\approx-0.267" />.</>,
              <>Invers kosinus memberi <InlineMath math="\theta=\cos^{-1}\left(-\frac1{\sqrt{14}}\right)\approx105.5^\circ" />.</>,
            ]} conclusion={<>Sudut sekitar <InlineMath math="105.5^\circ" /> adalah tumpul; dot product negatif menandai bahwa arah kedua vektor membentuk sudut lebih dari <InlineMath math="90^\circ" />.</>} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-cyan-200/15 bg-[linear-gradient(135deg,rgba(9,79,100,.2),rgba(16,24,43,.94))] p-5 sm:p-7" data-testid="lesson-summary">
          <div className="mb-4 flex items-center gap-2 text-amber-200"><Sparkles className="h-4 w-4" aria-hidden="true" /><p className="font-body text-xs font-black uppercase tracking-[.2em]">Bawa pulang</p></div>
          <h2 className="font-display text-2xl font-extrabold text-white">Tanda dot adalah petunjuk arah</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            <div className="rounded-2xl border border-emerald-200/15 bg-[#0b1424]/75 p-4"><span className="font-display text-xl font-black text-emerald-200"><InlineMath math="\vec a\cdot\vec b>0" /></span><p className="mt-1 font-body text-sm text-slate-100">sudut lancip</p></div><span className="hidden font-display text-xl text-slate-500 md:block">→</span>
            <div className="rounded-2xl border border-sky-200/15 bg-[#0b1424]/75 p-4"><span className="font-display text-xl font-black text-sky-200"><InlineMath math="\vec a\cdot\vec b=0" /></span><p className="mt-1 font-body text-sm text-slate-100">sudut siku-siku</p></div><span className="hidden font-display text-xl text-slate-500 md:block">→</span>
            <div className="rounded-2xl border border-rose-200/15 bg-[#0b1424]/75 p-4"><span className="font-display text-xl font-black text-rose-200"><InlineMath math="\vec a\cdot\vec b<0" /></span><p className="mt-1 font-body text-sm text-slate-100">sudut tumpul</p></div>
          </div>
        </section>
      </div>
    </main>
  </div>
);

export default SmaSudutAntaraDuaVektorPage;