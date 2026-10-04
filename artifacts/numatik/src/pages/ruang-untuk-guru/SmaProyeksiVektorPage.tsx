import { useState, type ReactNode } from "react";
import { ArrowDownToLine, Compass, RotateCcw, Sparkles } from "lucide-react";
import { BlockMath, InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import PageNavigation from "@/components/PageNavigation";
import Starfield from "@/components/Starfield";

const normalizeMath = (math: string) => math.replace(/\\\\/g, "\\");
const InlineMath = ({ math }: { math: string }) => <KaTeXInlineMath math={normalizeMath(math)} />;

const Formula = ({ math, testId }: { math: string; testId?: string }) => (
  <div className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/90 px-4 py-3 text-center text-cyan-100 sm:px-6" data-testid={testId}>
    <BlockMath math={normalizeMath(math)} />
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

const RangeControl = ({ label, value, min, max, step, onChange, testId, accent = "cyan", displayValue }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void; testId: string; accent?: "cyan" | "amber" | "violet"; displayValue?: string;
}) => (
  <label className="block rounded-2xl border border-white/10 bg-white/[.035] p-3">
    <span className="flex items-center justify-between gap-2 font-body text-xs font-bold text-slate-200">
      <span>{label}</span><output className={`font-display text-sm tabular-nums ${accent === "amber" ? "text-amber-100" : accent === "violet" ? "text-violet-100" : "text-cyan-100"}`} data-testid={`${testId}-value`}>{displayValue ?? value}</output>
    </span>
    <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} aria-label={label} data-testid={testId}
      className={`mt-3 h-2 w-full cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101b2d] ${accent === "amber" ? "accent-amber-300 focus-visible:ring-amber-200" : accent === "violet" ? "accent-violet-300 focus-visible:ring-violet-200" : "accent-cyan-300 focus-visible:ring-cyan-200"}`} />
    <span className="mt-1 flex justify-between font-body text-[10px] text-slate-400"><span>{min}{testId === "projection-input-theta" ? "°" : ""}</span><span>{max}{testId === "projection-input-theta" ? "°" : ""}</span></span>
  </label>
);

const ProjectionDiagram = ({ magnitudeA, magnitudeB, angle }: { magnitudeA: number; magnitudeB: number; angle: number }) => {
  const origin = { x: 214, y: 164 };
  const scale = 31;
  const radians = angle * Math.PI / 180;
  const projection = magnitudeB * Math.cos(radians);
  const foot = { x: origin.x + projection * scale, y: origin.y };
  const bEnd = { x: origin.x + magnitudeB * Math.cos(radians) * scale, y: origin.y - magnitudeB * Math.sin(radians) * scale };
  const aEnd = { x: origin.x + magnitudeA * scale, y: origin.y };
  const labelX = Math.max(23, Math.min(foot.x + (projection < 0 ? -25 : 8), 376));
  const labelY = Math.max(34, Math.min(bEnd.y - 12, 275));
  return (
    <svg viewBox="0 0 430 310" role="img" aria-label={`Proyeksi vektor b pada a. Sudut ${angle} derajat; komponen skalar ${projection.toFixed(2)}; kaki proyeksi berada pada koordinat ${projection.toFixed(2)}, 0.`} className="block h-auto w-full" data-testid="projection-vector-diagram">
      <defs>
        <pattern id="projection-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#94a3b8" strokeOpacity=".14" /></pattern>
        <marker id="projection-a-tip" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L10 5L0 10Z" fill="#67e8f9" /></marker>
        <marker id="projection-b-tip" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L10 5L0 10Z" fill="#fbbf24" /></marker>
        <marker id="projection-p-tip" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L10 5L0 10Z" fill="#c4b5fd" /></marker>
        <marker id="projection-perp-tip" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L10 5L0 10Z" fill="#fb7185" /></marker>
      </defs>
      <rect x="10" y="10" width="410" height="290" rx="18" fill="url(#projection-grid)" />
      <line x1="24" y1={origin.y} x2="405" y2={origin.y} stroke="#94a3b8" strokeOpacity=".48" />
      <line x1={origin.x} y1="22" x2={origin.x} y2="286" stroke="#94a3b8" strokeOpacity=".25" />
       <line x1={origin.x} y1={origin.y} x2={aEnd.x} y2={aEnd.y} stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" markerEnd="url(#projection-a-tip)" style={{ transition: "all .25s ease" }} />
      {Math.abs(projection) > 0.001
         ? <line x1={origin.x} y1={origin.y} x2={foot.x} y2={foot.y} stroke="#c4b5fd" strokeWidth="5" strokeLinecap="round" markerEnd="url(#projection-p-tip)" style={{ transition: "all .25s ease" }} />
        : <circle cx={origin.x} cy={origin.y} r="5" fill="#c4b5fd" />}
       <line x1={origin.x} y1={origin.y} x2={bEnd.x} y2={bEnd.y} stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" markerEnd="url(#projection-b-tip)" style={{ transition: "all .25s ease" }} />
       <line x1={foot.x} y1={foot.y} x2={bEnd.x} y2={bEnd.y} stroke="#fb7185" strokeWidth="4" strokeLinecap="round" markerEnd="url(#projection-perp-tip)" style={{ transition: "all .25s ease" }} />
      {Math.abs(bEnd.y - foot.y) > 1 ? <line x1={foot.x} y1={foot.y} x2={foot.x} y2={bEnd.y} stroke="#fb7185" strokeOpacity=".42" strokeDasharray="4 5" /> : null}
       <path d={angle === 0 ? "" : `M ${origin.x + 40} ${origin.y} A 40 40 0 0 0 ${origin.x + 40 * Math.cos(radians)} ${origin.y - 40 * Math.sin(radians)}`} fill="none" stroke="#fda4af" strokeWidth="2.5" strokeLinecap="round" style={{ transition: "all .25s ease" }} />
      <circle cx={origin.x} cy={origin.y} r="5" fill="#f8fafc" />
      {Math.abs(bEnd.y - foot.y) > 1 && Math.abs(foot.x - origin.x) > 1 ? <path d={`M ${foot.x} ${foot.y - 10} h ${projection > 0 ? -10 : 10} v 10`} fill="none" stroke="#fda4af" strokeWidth="1.7" /> : null}
      <text x={aEnd.x - 4} y={aEnd.y + 23} fill="#a5f3fc" fontSize="15" fontWeight="700">a</text>
      <text x={bEnd.x + (angle > 145 ? -16 : 8)} y={labelY} fill="#fde68a" fontSize="15" fontWeight="700">b</text>
      <text x={labelX} y={origin.y + 23} fill="#ddd6fe" fontSize="13" fontWeight="700">projₐ(b)</text>
      <text x={foot.x + (projection < 0 ? -20 : 8)} y={(foot.y + bEnd.y) / 2} fill="#fda4af" fontSize="14" fontWeight="700">b⊥</text>
      <text x={origin.x + 47 * Math.cos(radians / 2)} y={origin.y - 47 * Math.sin(radians / 2) - 5} fill="#fda4af" fontSize="12" fontWeight="700">{angle}°</text>
      <text x="394" y={origin.y - 8} fill="#cbd5e1" fontSize="11">arah a</text>
    </svg>
  );
};

const ProjectionLab = () => {
  const [magnitudeA, setMagnitudeA] = useState(4);
  const [magnitudeB, setMagnitudeB] = useState(3);
  const [angle, setAngle] = useState(55);
  const radians = angle * Math.PI / 180;
   const dot = magnitudeA * magnitudeB * Math.cos(radians);
   const signedScalar = magnitudeB * Math.cos(radians);
  const projX = signedScalar;
  const perpX = magnitudeB * Math.cos(radians) - projX;
  const perpY = magnitudeB * Math.sin(radians);
  const isZero = Math.abs(signedScalar) < 1e-9;
  const status = angle === 0
    ? "Sejajar searah: projeksi sama dengan b."
    : angle === 90
      ? "Siku-siku: komponen skalar nol dan proyeksi vektor adalah vektor nol."
      : angle === 180
        ? "Sejajar berlawanan arah: proyeksi mengarah berlawanan dengan a."
        : angle < 90
          ? "Lancip: komponen skalar positif; proyeksi searah dengan a."
          : "Tumpul: komponen skalar negatif; proyeksi mengarah berlawanan dengan a.";
  const reset = () => { setMagnitudeA(4); setMagnitudeB(3); setAngle(55); };
  return (
    <div className="overflow-hidden rounded-[2rem] border border-violet-200/20 bg-[linear-gradient(145deg,rgba(41,27,66,.78),rgba(10,20,37,.98))]" data-testid="projection-lab">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div><p className="font-body text-[10px] font-black uppercase tracking-[.18em] text-violet-100/75">Meja eksperimen</p><h3 className="font-display text-lg font-extrabold text-white">Jatuhkan bayangan vektor b</h3></div>
        <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 font-body text-xs font-bold text-slate-100 hover:bg-white/[.09] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-200" data-testid="reset-projection-lab"><RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />Atur ulang</button>
      </div>
      <div className="grid items-start lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 p-3 sm:p-5">
          <div className="rounded-2xl border border-white/10 bg-[#081426]/90 p-2 sm:p-3"><ProjectionDiagram magnitudeA={magnitudeA} magnitudeB={magnitudeB} angle={angle} /></div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-body text-xs text-slate-200">
            <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-cyan-300" />Vektor a</span>
            <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-amber-300" />Vektor b</span>
            <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-violet-300" />projₐ(b)</span>
            <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-rose-300" />b⊥</span>
          </div>
        </div>
        <aside className="border-t border-white/10 bg-black/10 p-4 sm:p-5 lg:border-l lg:border-t-0" aria-label="Kontrol eksperimen proyeksi vektor">
          <p className="mb-3 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-300">Atur panjang dan arah</p>
          <div className="space-y-2">
            <RangeControl label="Besar vektor a" value={magnitudeA} min={1} max={5} step={0.5} onChange={setMagnitudeA} testId="projection-input-a" />
            <RangeControl label="Besar vektor b" value={magnitudeB} min={1} max={5} step={0.5} onChange={setMagnitudeB} testId="projection-input-b" accent="amber" />
            <RangeControl label="Sudut apit (derajat)" value={angle} min={0} max={180} step={1} onChange={setAngle} testId="projection-input-theta" accent="violet" displayValue={`${angle}°`} />
          </div>
           <div className="mt-3 rounded-2xl border border-violet-200/20 bg-violet-300/[.08] p-4" data-testid="projection-lab-result">
            <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.18em] text-violet-100/80">Hasil saat ini</p>
            <p className="font-body text-xs text-slate-100" data-testid="projection-live-magnitudes">|a| = {magnitudeA.toFixed(1)} · |b| = {magnitudeB.toFixed(1)}</p>
            <p className="mt-1 font-body text-xs text-slate-100" data-testid="projection-live-angle">Sudut: <strong className="text-violet-100">{angle}°</strong></p>
             <p className="mt-1 font-body text-xs text-slate-100" data-testid="projection-live-dot">Hasil kali titik: <InlineMath math={`\\vec a\\cdot\\vec b=${dot.toFixed(2)}`} /></p>
            <div className="mt-3 rounded-xl border border-white/10 bg-[#071326]/90 px-2 py-2 text-center text-violet-50" data-testid="projection-live-scalar"><BlockMath math={`\\operatorname{comp}_{\\vec a}(\\vec b)=${signedScalar.toFixed(2)}`} /></div>
             <p className="mt-3 font-body text-xs leading-relaxed text-slate-100" data-testid="projection-live-coordinate">Koordinat ujung <InlineMath math="\\operatorname{proj}_{\\vec a}(\\vec b)" /> saat <InlineMath math="\\vec a" /> searah sumbu-<InlineMath math="x" />: <strong className="tabular-nums text-violet-100">({projX.toFixed(2)}, 0)</strong></p>
            <p className="mt-1 font-body text-xs leading-relaxed text-slate-100" data-testid="projection-live-perpendicular">|b<sub>⊥</sub>| = <strong className="text-rose-200">{Math.hypot(perpX, perpY).toFixed(2)}</strong></p>
             <p role="status" aria-live="polite" className="mt-2 font-body text-xs font-bold leading-relaxed text-amber-100" data-testid="projection-live-status">{status}{isZero && angle !== 90 ? " Nilai proyeksi tepat nol." : ""}</p>
          </div>
          <p className="mt-3 flex items-start gap-2 font-body text-[11px] leading-relaxed text-slate-400"><ArrowDownToLine className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-200" aria-hidden="true" />Garis tegak lurus menunjukkan bagian b yang tidak searah a.</p>
        </aside>
      </div>
    </div>
  );
};

const SmaProyeksiVektorPage = () => (
  <div className="relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
    <Starfield />
    <style>{`
      @keyframes projection-enter { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      .projection-enter { animation: projection-enter .55s cubic-bezier(.2,.7,.2,1) both; }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
      }
    `}</style>
    <PageNavigation />
    <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
      <header className="projection-enter relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.97),rgba(16,22,43,.96)_58%,rgba(54,37,71,.9))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10" data-testid="lesson-hero">
        <div className="pointer-events-none absolute -right-12 -top-14 h-64 w-64 rounded-full border border-cyan-100/10" />
        <div className="relative grid items-center gap-7 md:grid-cols-[1.08fr_.92fr]">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2"><span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Matematika · SMA</span><span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-200">Vektor dan Operasinya</span></div>
            <p className="mb-2 font-body text-xs font-bold uppercase tracking-[.24em] text-amber-200">Geometri arah · 7 menit</p>
            <h1 className="max-w-2xl font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="lesson-title">Proyeksi<br /><span className="text-cyan-200">vektor</span></h1>
            <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-slate-200 sm:text-lg">Bayangkan bayangan vektor b jatuh pada arah a. Seberapa jauh bayangan itu, dan ke arah mana ia menunjuk?</p>
            <div className="mt-6 flex items-center gap-2 text-sm text-amber-100"><Sparkles className="h-4 w-4" aria-hidden="true" /><span>Geser b, lalu ikuti bayangannya dan bagian yang tegak lurus.</span></div>
          </div>
          <div className="mx-auto w-full max-w-md rounded-[1.75rem] border border-white/10 bg-[#091528]/75 p-3" data-testid="hero-projection-illustration">
            <svg viewBox="0 0 390 245" role="img" aria-label="Vektor b terurai menjadi proyeksi pada a dan komponen tegak lurus b tegak lurus" className="w-full">
              <defs><marker id="hero-proj-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#67e8f9" /></marker><marker id="hero-proj-b" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#fbbf24" /></marker><marker id="hero-proj-p" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#c4b5fd" /></marker><marker id="hero-proj-perp" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#fb7185" /></marker></defs>
              <circle cx="140" cy="159" r="100" fill="none" stroke="#a5f3fc" strokeOpacity=".13" strokeDasharray="3 9" />
              <line x1="42" y1="159" x2="338" y2="159" stroke="#94a3b8" strokeOpacity=".4" />
              <line x1="140" y1="159" x2="300" y2="159" stroke="#67e8f9" strokeWidth="5" strokeLinecap="round" markerEnd="url(#hero-proj-a)" />
              <line x1="140" y1="159" x2="224" y2="159" stroke="#c4b5fd" strokeWidth="5" strokeLinecap="round" markerEnd="url(#hero-proj-p)" />
              <line x1="140" y1="159" x2="224" y2="68" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" markerEnd="url(#hero-proj-b)" />
              <line x1="224" y1="159" x2="224" y2="68" stroke="#fb7185" strokeWidth="4" strokeLinecap="round" markerEnd="url(#hero-proj-perp)" />
              <path d="M208 159v-16h16" fill="none" stroke="#fda4af" strokeWidth="2" />
              <circle cx="140" cy="159" r="5" fill="#f8fafc" />
              <text x="307" y="166" fill="#a5f3fc" fontSize="15" fontWeight="700">a</text><text x="233" y="66" fill="#fde68a" fontSize="15" fontWeight="700">b</text>
              <text x="166" y="181" fill="#ddd6fe" fontSize="12" fontWeight="700">projₐ(b)</text><text x="231" y="119" fill="#fda4af" fontSize="14" fontWeight="700">b⊥</text>
            </svg>
          </div>
        </div>
      </header>

      <div className="mb-8 rounded-2xl border border-white/10 bg-[#0d1728]/90 p-4 sm:flex sm:items-center sm:justify-between sm:gap-4" data-testid="lesson-map">
        <p className="mb-3 flex items-center gap-2 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-300 sm:mb-0"><Compass className="h-4 w-4 text-cyan-200" /> Alur penemuan</p>
        <nav aria-label="Peta materi" className="grid grid-cols-3 gap-2 pl-12 sm:flex sm:flex-wrap sm:pl-0">
          {[["Makna", "#makna-proyeksi"], ["Eksperimen", "#eksperimen-proyeksi"], ["Contoh", "#contoh-proyeksi"]].map(([label, target], index) => <a key={target} href={target} data-testid={`link-projection-section-${index + 1}`} className="whitespace-nowrap rounded-full border border-white/10 bg-white/[.035] px-2 py-2 text-center font-body text-[10px] font-bold text-slate-100 transition hover:border-cyan-100/35 hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 sm:px-3 sm:text-xs">{String(index + 1).padStart(2, "0")} · {label}</a>)}
        </nav>
      </div>

      <div className="space-y-14">
        <section id="makna-proyeksi" className="scroll-mt-6" data-testid="projection-theory-section">
          <SectionTitle index="01" kicker="Bayangan yang punya arah" title="Apa arti proyeksi?" description="Pisahkan dua hal: ukuran bayangan pada garis a, dan vektor bayangan yang punya arah. Keduanya berhubungan, tetapi bukan objek yang sama." />
          <div className="grid gap-4 md:grid-cols-[.9fr_1.1fr]">
            <article className="rounded-3xl border border-cyan-200/20 bg-cyan-300/[.06] p-5 sm:p-6" data-testid="projection-summary">
              <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.18em] text-cyan-100">Inti konsep</p>
              <p className="font-body text-sm leading-relaxed text-slate-100">Komponen skalar adalah panjang bertanda: ia bisa positif, nol, atau negatif. Proyeksi vektor adalah panah pada garis a—panjangnya memuat besar bayangan, arahnya mengikuti tanda tersebut.</p>
              <div className="mt-4 space-y-2">
                <Formula math="\\operatorname{comp}_{\\vec a}(\\vec b)=\\frac{\\vec a\\cdot\\vec b}{\\|\\vec a\\|}=\\|\\vec b\\|\\cos\\theta" testId="formula-scalar-projection" />
                <Formula math="\\operatorname{proj}_{\\vec a}(\\vec b)=\\frac{\\vec a\\cdot\\vec b}{\\|\\vec a\\|^2}\\,\\vec a=\\operatorname{comp}_{\\vec a}(\\vec b)\\frac{\\vec a}{\\|\\vec a\\|}" testId="formula-vector-projection" />
                <Formula math="\\vec b=\\operatorname{proj}_{\\vec a}(\\vec b)+\\vec b_{\\perp}" testId="formula-vector-decomposition" />
                <Formula math="\\vec b_{\\perp}=\\vec b-\\operatorname{proj}_{\\vec a}(\\vec b),\\qquad \\vec a\\cdot\\vec b_{\\perp}=0" testId="formula-perpendicular-component" />
              </div>
            </article>
            <div className="grid content-start gap-3" data-testid="projection-angle-guide">
              <article className="rounded-3xl border border-emerald-200/20 bg-emerald-300/[.07] p-5" data-testid="projection-acute"><p className="font-display text-xl font-black text-emerald-200"><InlineMath math="0^\circ\\leq\\theta<90^\circ" /></p><h3 className="mt-1 font-display text-base font-extrabold text-white">Lancip: bayangan searah</h3><p className="mt-2 font-body text-sm leading-relaxed text-slate-100">Karena <InlineMath math="\\cos\\theta>0" />, komponen skalar positif. Panah proyeksi menunjuk searah <InlineMath math="\\vec a" />.</p></article>
              <article className="rounded-3xl border border-sky-200/20 bg-sky-300/[.07] p-5" data-testid="projection-right"><p className="font-display text-xl font-black text-sky-200"><InlineMath math="\\theta=90^\\circ" /></p><h3 className="mt-1 font-display text-base font-extrabold text-white">Siku-siku: tak ada bayangan</h3><p className="mt-2 font-body text-sm leading-relaxed text-slate-100">Komponen skalar nol dan proyeksi vektornya vektor nol. Seluruh <InlineMath math="\\vec b" /> menjadi bagian tegak lurus.</p></article>
              <article className="rounded-3xl border border-rose-200/20 bg-rose-300/[.07] p-5" data-testid="projection-obtuse"><p className="font-display text-xl font-black text-rose-200"><InlineMath math="90^\\circ<\\theta\\leq180^\\circ" /></p><h3 className="mt-1 font-display text-base font-extrabold text-white">Tumpul: bayangan berbalik</h3><p className="mt-2 font-body text-sm leading-relaxed text-slate-100">Di sini <InlineMath math="\\cos\\theta<0" />. Komponen skalarnya negatif dan proyeksi vektor menunjuk berlawanan arah dengan <InlineMath math="\\vec a" />.</p></article>
            </div>
          </div>
          <blockquote className="mt-4 rounded-2xl border-l-4 border-amber-300 bg-amber-200/[.08] px-5 py-4 font-body text-sm leading-relaxed text-amber-50" data-testid="projection-key-tip">
            <span className="mb-1 block font-body text-[10px] font-black uppercase tracking-[.18em] text-amber-200">Jangan lupakan syaratnya</span>
            Proyeksi pada vektor nol tidak terdefinisi: penyebut rumusnya memuat <InlineMath math="\\|\\vec a\\|" /> atau <InlineMath math="\\|\\vec a\\|^2" />, yang bernilai nol jika <InlineMath math="\\vec a=\\vec 0" />.
          </blockquote>
          <div className="mt-4 grid gap-4 md:grid-cols-[.8fr_1.2fr]">
            <div className="rounded-3xl border border-white/10 bg-[#101b2d]/90 p-5" data-testid="projection-identity-card">
              <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.18em] text-violet-200">Tiga benda, tiga nama</p>
              <p className="font-body text-sm leading-relaxed text-slate-100"><strong className="text-violet-200">Skalar</strong> memberi jarak bertanda. <strong className="text-cyan-200">Vektor proyeksi</strong> adalah bagian b yang sejajar a. <strong className="text-rose-200">b tegak lurus</strong> adalah sisanya, selalu tegak lurus a.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#101b2d]/90 p-5" data-testid="projection-proof-card">
              <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.18em] text-rose-200">Mengapa sisanya tegak lurus?</p>
              <p className="font-body text-sm leading-relaxed text-slate-100">Kurangi bayangan dari b. Hasil kali titik sisa dengan a adalah <InlineMath math="\\vec a\\cdot(\\vec b-\\operatorname{proj}_{\\vec a}(\\vec b))=\\vec a\\cdot\\vec b-\\frac{\\vec a\\cdot\\vec b}{\\|\\vec a\\|^2}(\\vec a\\cdot\\vec a)=0" />. Jadi sudut sisa dan a selalu siku-siku.</p>
            </div>
          </div>
        </section>

        <section id="eksperimen-proyeksi" className="scroll-mt-6" data-testid="projection-lab-section">
          <SectionTitle index="02" kicker="Coba sendiri" title="Geser b, lihat proyeksinya" description="Arah a menjadi garis acuan. Atur panjang serta sudut b—komponen skalar, koordinat ujung proyeksi, dan sisa tegak lurus akan ikut berubah." />
          <ProjectionLab />
        </section>

        <section id="contoh-proyeksi" className="scroll-mt-6" data-testid="projection-examples-section">
          <SectionTitle index="03" kicker="Tiga tingkat tantangan" title="Dari rumus ke komponen" description="Untuk setiap soal, cari hasil kali titik dan panjang a dahulu. Lalu hitung skalar bertanda, bentuk vektor proyeksi, dan ambil sisanya." />
          <div className="grid gap-3 lg:grid-cols-3">
            <Example id="projection-easy" level="Mudah" question={<>Diketahui <InlineMath math="\\vec a=(3,4)" /> dan <InlineMath math="\\vec b=(4,0)" />. Tentukan komponen skalar proyeksi b pada a, proyeksi vektor, dan <InlineMath math="\\vec b_{\\perp}" />.</>} steps={[
              <>Hasil kali titik <InlineMath math="\\vec a\\cdot\\vec b=3(4)+4(0)=12" />, dan <InlineMath math="\\|\\vec a\\|=\\sqrt{3^2+4^2}=5" />.</>,
              <>Skalarnya bertanda <InlineMath math="\\operatorname{comp}_{\\vec a}(\\vec b)=\\frac{12}{5}" />.</>,
              <>Vektor proyeksi <InlineMath math="\\operatorname{proj}_{\\vec a}(\\vec b)=\\frac{12}{25}(3,4)=\\left(\\frac{36}{25},\\frac{48}{25}\\right)" />.</>,
              <>Kurangi dari b: <InlineMath math="\\vec b_{\\perp}=(4,0)-\\left(\\frac{36}{25},\\frac{48}{25}\\right)=\\left(\\frac{64}{25},-\\frac{48}{25}\\right)" />.</>,
            ]} conclusion={<>Jadi <InlineMath math="\\operatorname{comp}_{\\vec a}(\\vec b)=\\frac{12}{5}" />, <InlineMath math="\\operatorname{proj}_{\\vec a}(\\vec b)=\\left(\\frac{36}{25},\\frac{48}{25}\\right)" />, dan <InlineMath math="\\vec b_{\\perp}=\\left(\\frac{64}{25},-\\frac{48}{25}\\right)" />.</>} />
            <Example id="projection-medium" level="Sedang" question={<>Untuk <InlineMath math="\\vec a=(1,2)" /> dan <InlineMath math="\\vec b=(4,1)" />, cari proyeksi skalar, proyeksi vektor, serta komponen tegak lurus.</>} steps={[
              <>Hitung <InlineMath math="\\vec a\\cdot\\vec b=1(4)+2(1)=6" /> dan <InlineMath math="\\|\\vec a\\|=\\sqrt{1+4}=\\sqrt5" />.</>,
              <>Komponen skalar <InlineMath math="\\operatorname{comp}_{\\vec a}(\\vec b)=\\frac{6}{\\sqrt5}" />.</>,
              <>Proyeksi vektor <InlineMath math="\\frac{6}{5}(1,2)=\\left(\\frac65,\\frac{12}5\\right)" />.</>,
              <>Bagian sisanya <InlineMath math="\\vec b_{\\perp}=(4,1)-\\left(\\frac65,\\frac{12}5\\right)=\\left(\\frac{14}5,-\\frac75\\right)" />.</>,
            ]} conclusion={<>Proyeksi skalar <InlineMath math="\\frac6{\\sqrt5}" />, proyeksi vektor <InlineMath math="\\left(\\frac65,\\frac{12}5\\right)" />, dan <InlineMath math="\\vec b_{\\perp}=\\left(\\frac{14}5,-\\frac75\\right)" />.</>} />
            <Example id="projection-hard" level="Sulit" question={<>Diberikan <InlineMath math="\\vec a=(2,-1)" /> dan <InlineMath math="\\vec b=(-1,3)" />. Tentukan semua komponen proyeksi dan buktikan sisanya tegak lurus a.</>} steps={[
              <>Dot product <InlineMath math="\\vec a\\cdot\\vec b=2(-1)+(-1)(3)=-5" />; panjang <InlineMath math="\\|\\vec a\\|=\\sqrt5" />.</>,
              <>Komponen skalar <InlineMath math="\\operatorname{comp}_{\\vec a}(\\vec b)=\\frac{-5}{\\sqrt5}=-\\sqrt5" />. Tanda minus berarti arahnya berlawanan dengan a.</>,
              <>Proyeksi vektor <InlineMath math="\\frac{-5}{5}(2,-1)=(-2,1)" />.</>,
              <>Sisanya <InlineMath math="\\vec b_{\\perp}=(-1,3)-(-2,1)=(1,2)" />.</>,
              <>Uji tegak lurus: <InlineMath math="\\vec a\\cdot\\vec b_{\\perp}=2(1)+(-1)(2)=0" />.</>,
            ]} conclusion={<>Hasilnya <InlineMath math="\\operatorname{comp}_{\\vec a}(\\vec b)=-\\sqrt5" />, <InlineMath math="\\operatorname{proj}_{\\vec a}(\\vec b)=(-2,1)" />, dan <InlineMath math="\\vec b_{\\perp}=(1,2)" /> yang tegak lurus a.</>} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-cyan-200/15 bg-[linear-gradient(135deg,rgba(9,79,100,.2),rgba(16,24,43,.94))] p-5 sm:p-7" data-testid="lesson-summary">
          <div className="mb-4 flex items-center gap-2 text-amber-200"><Sparkles className="h-4 w-4" aria-hidden="true" /><p className="font-body text-xs font-black uppercase tracking-[.2em]">Bawa pulang</p></div>
          <h2 className="font-display text-2xl font-extrabold text-white">Skalar bertanda. Vektor punya arah.</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            <div className="rounded-2xl border border-violet-200/15 bg-[#0b1424]/75 p-4"><span className="font-display text-xl font-black text-violet-200"><InlineMath math="\\operatorname{comp}_{\\vec a}(\\vec b)" /></span><p className="mt-1 font-body text-sm text-slate-100">ukuran bayangan dengan tanda</p></div><span className="hidden font-display text-xl text-slate-500 md:block">→</span>
            <div className="rounded-2xl border border-cyan-200/15 bg-[#0b1424]/75 p-4"><span className="font-display text-xl font-black text-cyan-200"><InlineMath math="\\operatorname{proj}_{\\vec a}(\\vec b)" /></span><p className="mt-1 font-body text-sm text-slate-100">bagian b yang sejajar a</p></div><span className="hidden font-display text-xl text-slate-500 md:block">→</span>
            <div className="rounded-2xl border border-rose-200/15 bg-[#0b1424]/75 p-4"><span className="font-display text-xl font-black text-rose-200"><InlineMath math="\\vec b_{\\perp}" /></span><p className="mt-1 font-body text-sm text-slate-100">sisa b yang tegak lurus a</p></div>
          </div>
          <p className="mt-4 font-body text-sm leading-relaxed text-slate-200">Tumpul? Komponen skalar negatif, sehingga proyeksi vektornya menunjuk ke arah berlawanan dengan <InlineMath math="\\vec a" />. Dan selalu <InlineMath math="\\vec b=\\operatorname{proj}_{\\vec a}(\\vec b)+\\vec b_{\\perp}" />.</p>
        </section>
      </div>
    </main>
  </div>
);

export default SmaProyeksiVektorPage;