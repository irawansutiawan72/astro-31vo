import { useMemo, useState, type ReactNode } from "react";
import { ArrowDown, Compass, Lightbulb, RotateCcw, Sparkles } from "lucide-react";
import { BlockMath, InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import PageNavigation from "@/components/PageNavigation";
import Starfield from "@/components/Starfield";

const InlineMath = ({ math }: { math: string }) => <KaTeXInlineMath math={math} />;

const Formula = ({ math, label, testId }: { math: string; label?: string; testId?: string }) => (
  <div className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/90 px-4 py-3 text-center text-cyan-100 sm:px-6" data-testid={testId}>
    {label && <p className="mb-2 text-left font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/45">{label}</p>}
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

const Tip = ({ children, testId }: { children: ReactNode; testId: string }) => (
  <blockquote className="rounded-2xl border-l-4 border-amber-300 bg-amber-200/[.07] px-4 py-3 font-body text-sm leading-relaxed text-amber-50/90" data-testid={testId}>
    <span className="mb-1 flex items-center gap-2 text-[10px] font-black uppercase tracking-[.18em] text-amber-200"><Lightbulb className="h-3.5 w-3.5" aria-hidden="true" /> Catatan penting</span>
    {children}
  </blockquote>
);

type ExampleProps = { id: string; level: string; question: ReactNode; steps: ReactNode[]; conclusion: ReactNode };
const Example = ({ id, level, question, steps, conclusion }: ExampleProps) => (
  <article className="overflow-hidden rounded-3xl border border-white/10 bg-[#101b2d]/90" data-testid={`example-${id}`}>
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
      <h3 className="font-display text-lg font-extrabold text-white">Contoh {level}</h3>
      <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">{level}</span>
    </div>
    <div className="grid gap-3 p-3 sm:p-4">
      <div className="rounded-2xl border border-amber-200/20 bg-amber-300/[.08] p-4" data-testid={`question-${id}`}>
        <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.18em] text-amber-200">Soal</p>
        <div className="font-body text-sm leading-relaxed text-amber-50/95">{question}</div>
      </div>
      <div className="rounded-2xl border border-cyan-200/20 bg-cyan-300/[.07] p-4" data-testid={`solution-${id}`}>
        <p className="mb-3 font-body text-[10px] font-black uppercase tracking-[.18em] text-cyan-200">Pembahasan langkah demi langkah</p>
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
    <span className="mt-1 flex justify-between font-body text-[10px] text-slate-500"><span>{min}</span><span>{max}</span></span>
  </label>
);

const ScalarDiagram = ({ x, y, k }: { x: number; y: number; k: number }) => {
  const origin = { x: 205, y: 145 };
  const scale = 18;
  const end = (factor: number) => ({ x: origin.x + x * factor * scale, y: origin.y - y * factor * scale });
  const original = end(1);
  const result = end(k);
  return <svg viewBox="0 0 410 290" role="img" aria-label={`Vektor asal (${x}, ${y}) dan hasil perkalian skalar ${k}, yaitu (${x * k}, ${y * k})`} className="block h-auto w-full" data-testid="scalar-vector-diagram">
    <defs>
      <pattern id="scalar-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#94a3b8" strokeOpacity=".12" /></pattern>
      <marker id="scalar-original-tip" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L9 4.5L0 9Z" fill="#67e8f9" /></marker>
      <marker id="scalar-result-tip" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L10 5L0 10Z" fill={k < 0 ? "#fbbf24" : "#c4b5fd"} /></marker>
    </defs>
    <rect x="12" y="12" width="386" height="266" rx="18" fill="url(#scalar-grid)" />
    <line x1="28" y1={origin.y} x2="386" y2={origin.y} stroke="#94a3b8" strokeOpacity=".5" /><line x1={origin.x} y1="26" x2={origin.x} y2="268" stroke="#94a3b8" strokeOpacity=".5" />
    <line x1={origin.x} y1={origin.y} x2={original.x} y2={original.y} stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" markerEnd="url(#scalar-original-tip)" />
    <line className="lesson-vector-move" x1={origin.x} y1={origin.y} x2={result.x} y2={result.y} stroke={k < 0 ? "#fbbf24" : "#c4b5fd"} strokeWidth="5" strokeLinecap="round" markerEnd="url(#scalar-result-tip)" />
    <circle cx={origin.x} cy={origin.y} r="4" fill="#f8fafc" />
    <text x={original.x + 7} y={original.y - 9} fill="#a5f3fc" fontSize="13" fontWeight="700">v</text>
    <text x={result.x + (k < 0 ? -15 : 8)} y={result.y + (k < 0 ? 18 : -10)} fill={k < 0 ? "#fde68a" : "#ddd6fe"} fontSize="13" fontWeight="700">kv</text>
    <text x="379" y={origin.y - 8} fill="#94a3b8" fontSize="11">x</text><text x={origin.x + 8} y="35" fill="#94a3b8" fontSize="11">y</text>
  </svg>;
};

const ScalarLab = () => {
  const [x, setX] = useState(2);
  const [y, setY] = useState(1);
  const [k, setK] = useState(2);
  const result = [x * k, y * k];
  const magnitude = Math.hypot(...result);
  const originalMagnitude = Math.hypot(x, y);
  const direction = k > 0 ? "Searah" : k < 0 ? "Berlawanan arah" : "Menjadi vektor nol";
  const reset = () => { setX(2); setY(1); setK(2); };
  return <div className="overflow-hidden rounded-[2rem] border border-violet-200/20 bg-[linear-gradient(145deg,rgba(27,28,57,.96),rgba(10,20,37,.97))]" data-testid="scalar-lab">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
      <div><p className="font-body text-[10px] font-black uppercase tracking-[.18em] text-violet-100/70">Meja eksperimen</p><h3 className="font-display text-lg font-extrabold text-white">Tarik, balik, atau nolkan</h3></div>
      <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 font-body text-xs font-bold text-slate-200 hover:bg-white/[.09] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-200" data-testid="reset-scalar-lab"><RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />Atur ulang</button>
    </div>
    <div className="grid lg:grid-cols-[1fr_290px]">
      <div className="min-w-0 p-3 sm:p-5"><div className="rounded-2xl border border-white/10 bg-[#081426]/90 p-2 sm:p-3"><ScalarDiagram x={x} y={y} k={k} /></div>
        <div className="mt-3 flex flex-wrap gap-4 font-body text-xs text-slate-300"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-cyan-300" />Vektor asal <InlineMath math="\vec v" /></span><span className="flex items-center gap-2"><i className={`h-2.5 w-2.5 rounded-full ${k < 0 ? "bg-amber-300" : "bg-violet-300"}`} />Hasil <InlineMath math="k\vec v" /></span></div>
      </div>
      <aside className="border-t border-white/10 bg-black/10 p-4 sm:p-5 lg:border-l lg:border-t-0" aria-label="Kontrol perkalian skalar">
        <p className="mb-3 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-400">Atur komponen dan skalar</p>
        <div className="grid grid-cols-2 gap-2">
          <RangeControl label="Komponen vₓ" value={x} min={-3} max={3} step={1} onChange={setX} testId="scalar-input-x" />
          <RangeControl label="Komponen vᵧ" value={y} min={-3} max={3} step={1} onChange={setY} testId="scalar-input-y" />
          <div className="col-span-2"><RangeControl label="Skalar k" value={k} min={-3} max={3} step={1} onChange={setK} testId="scalar-input-k" accent="amber" /></div>
        </div>
        <div className="mt-3 rounded-2xl border border-violet-200/20 bg-violet-300/[.07] p-4" data-testid="scalar-lab-result">
          <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.18em] text-violet-100/70">Hasil langsung</p>
          <Formula math={`\\begin{gathered}\\vec v=(${x},${y})\\\\k\\vec v=(${result[0]},${result[1]})\\end{gathered}`} testId="scalar-live-components" />
          <p className="mt-3 font-body text-xs text-violet-50/90">Panjang hasil: <strong data-testid="scalar-live-magnitude">{magnitude.toFixed(2)}</strong> <span className="text-slate-400">(asal {originalMagnitude.toFixed(2)})</span></p>
          <p role="status" aria-live="polite" className="mt-2 font-body text-xs font-bold text-amber-100" data-testid="scalar-live-status">{direction}. {k === 0 ? "Semua komponen menjadi nol." : `Panjang berubah dengan faktor ${Math.abs(k)}.`}</p>
        </div>
      </aside>
    </div>
  </div>;
};

const DotDiagram = ({ magnitudeA, magnitudeB, angle }: { magnitudeA: number; magnitudeB: number; angle: number }) => {
  const origin = { x: 96, y: 170 };
  const scale = 27;
  const radians = angle * Math.PI / 180;
  const aEnd = { x: origin.x + magnitudeA * scale, y: origin.y };
  const bEnd = { x: origin.x + magnitudeB * scale * Math.cos(radians), y: origin.y - magnitudeB * scale * Math.sin(radians) };
  const projection = { x: origin.x + magnitudeA * Math.cos(radians) * scale * Math.cos(radians), y: origin.y - magnitudeA * Math.cos(radians) * scale * Math.sin(radians) };
  const dot = magnitudeA * magnitudeB * Math.cos(radians);
  const interpretation = Math.abs(dot) < 0.001 ? "tegak lurus" : dot > 0 ? "searah dengan b" : "berlawanan arah dengan b";
  return <svg viewBox="0 0 390 300" role="img" aria-label={`Vektor a dan b membentuk sudut ${angle} derajat, dengan proyeksi a pada b`} className="block h-auto w-full" data-testid="dot-vector-diagram">
    <defs>
      <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#94a3b8" strokeOpacity=".12" /></pattern>
      <marker id="dot-a-tip" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L9 4.5L0 9Z" fill="#67e8f9" /></marker>
      <marker id="dot-b-tip" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L9 4.5L0 9Z" fill="#fbbf24" /></marker>
      <marker id="dot-p-tip" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L9 4.5L0 9Z" fill="#c4b5fd" /></marker>
    </defs>
    <rect x="8" y="10" width="374" height="276" rx="18" fill="url(#dot-grid)" /><line x1="25" y1={origin.y} x2="370" y2={origin.y} stroke="#94a3b8" strokeOpacity=".4" /><line x1={origin.x} y1="25" x2={origin.x} y2="270" stroke="#94a3b8" strokeOpacity=".25" />
    <line x1={origin.x} y1={origin.y} x2={aEnd.x} y2={aEnd.y} stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" markerEnd="url(#dot-a-tip)" />
    <line className="lesson-vector-move" x1={origin.x} y1={origin.y} x2={bEnd.x} y2={bEnd.y} stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" markerEnd="url(#dot-b-tip)" />
    <line x1={origin.x} y1={origin.y} x2={projection.x} y2={projection.y} stroke="#c4b5fd" strokeWidth="4" strokeDasharray="6 3" markerEnd="url(#dot-p-tip)" />
    <line x1={aEnd.x} y1={aEnd.y} x2={projection.x} y2={projection.y} stroke="#c4b5fd" strokeOpacity=".65" strokeDasharray="4 4" />
    <circle cx={origin.x} cy={origin.y} r="4" fill="#fff" /><text x={aEnd.x - 4} y={aEnd.y + 22} fill="#a5f3fc" fontSize="14" fontWeight="700">a</text><text x={bEnd.x + 3} y={bEnd.y - 7} fill="#fde68a" fontSize="14" fontWeight="700">b</text>
    <text x={projection.x + 5} y={projection.y - 8} fill="#ddd6fe" fontSize="11">proyeksi</text>
    <path d={`M${origin.x + 38} ${origin.y} A38 38 0 ${angle > 180 ? 1 : 0} 0 ${origin.x + 38 * Math.cos(radians)} ${origin.y - 38 * Math.sin(radians)}`} fill="none" stroke="#fda4af" strokeWidth="2" />
    <text x={origin.x + 45} y={origin.y - 16} fill="#fda4af" fontSize="11">{angle}°</text>
    <text x="338" y={origin.y - 8} fill="#94a3b8" fontSize="11">x</text>
    <text x="20" y="270" fill="#94a3b8" fontSize="10">{interpretation}</text>
  </svg>;
};

const DotLab = () => {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [angle, setAngle] = useState(60);
  const dot = a * b * Math.cos(angle * Math.PI / 180);
  const projectionLength = a * Math.cos(angle * Math.PI / 180);
  const interpretation = Math.abs(dot) < 0.0001 ? "Ortogonal: hasil kali titik nol." : dot > 0 ? "Proyeksi searah b: hasil kali titik positif." : "Proyeksi berlawanan arah b: hasil kali titik negatif.";
  const reset = () => { setA(3); setB(4); setAngle(60); };
  return <div className="overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-[linear-gradient(145deg,rgba(11,48,61,.8),rgba(10,20,37,.98))]" data-testid="dot-lab">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4"><div><p className="font-body text-[10px] font-black uppercase tracking-[.18em] text-cyan-100/70">Meja eksperimen</p><h3 className="font-display text-lg font-extrabold text-white">Baca sudut lewat proyeksi</h3></div>
      <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 font-body text-xs font-bold text-slate-200 hover:bg-white/[.09] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200" data-testid="reset-dot-lab"><RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />Atur ulang</button></div>
    <div className="grid lg:grid-cols-[1fr_290px]"><div className="min-w-0 p-3 sm:p-5"><div className="rounded-2xl border border-white/10 bg-[#081426]/90 p-2 sm:p-3"><DotDiagram magnitudeA={a} magnitudeB={b} angle={angle} /></div>
      <div className="mt-3 flex flex-wrap gap-4 font-body text-xs text-slate-300"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-cyan-300" /><InlineMath math="\vec a" /></span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-amber-300" /><InlineMath math="\vec b" /></span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-violet-300" />proyeksi</span></div></div>
      <aside className="border-t border-white/10 bg-black/10 p-4 sm:p-5 lg:border-l lg:border-t-0" aria-label="Kontrol hasil kali titik"><p className="mb-3 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-400">Atur besar dan sudut</p>
        <div className="space-y-2"><RangeControl label="Besar vektor a" value={a} min={1} max={5} step={0.5} onChange={setA} testId="dot-input-a" /><RangeControl label="Besar vektor b" value={b} min={1} max={5} step={0.5} onChange={setB} testId="dot-input-b" accent="amber" /><RangeControl label="Sudut apit θ (derajat)" value={angle} min={0} max={180} step={5} onChange={setAngle} testId="dot-input-angle" accent="violet" /></div>
        <div className="mt-3 rounded-2xl border border-cyan-200/20 bg-cyan-300/[.07] p-4" data-testid="dot-lab-result"><p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.18em] text-cyan-100/70">Hasil langsung</p>
          <Formula math={`\\vec a\\cdot\\vec b=${dot.toFixed(2)}`} testId="dot-live-value" />
          <p className="mt-3 font-body text-xs text-slate-200">Proyeksi bertanda <InlineMath math="\\vec a" /> pada <InlineMath math="\\vec b" />: <strong className="text-violet-100" data-testid="dot-live-projection">{projectionLength.toFixed(2)}</strong></p>
          <p role="status" aria-live="polite" className="mt-2 font-body text-xs font-bold text-cyan-100" data-testid="dot-live-status">{interpretation}</p>
        </div>
      </aside>
    </div>
  </div>;
};

const CrossDiagram = ({ a, b, angle }: { a: number; b: number; angle: number }) => {
  const origin = { x: 132, y: 158 };
  const scale = 25;
  const radians = angle * Math.PI / 180;
  const aEnd = { x: origin.x + a * scale, y: origin.y };
  const bEnd = { x: origin.x + b * scale * Math.cos(radians), y: origin.y - b * scale * Math.sin(radians) };
  const z = a * b * Math.sin(radians);
  const direction = Math.abs(z) < 0.001 ? "nol" : z > 0 ? "keluar bidang" : "masuk bidang";
  return <svg viewBox="0 0 420 300" role="img" aria-label={`Vektor a dan b berotasi ${angle} derajat; hasil silang mengarah ${direction}`} className="block h-auto w-full" data-testid="cross-vector-diagram">
    <defs><pattern id="cross-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#94a3b8" strokeOpacity=".12" /></pattern>
      <marker id="cross-a-tip" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L9 4.5L0 9Z" fill="#67e8f9" /></marker><marker id="cross-b-tip" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L9 4.5L0 9Z" fill="#fbbf24" /></marker></defs>
    <rect x="10" y="10" width="400" height="278" rx="18" fill="url(#cross-grid)" /><line x1="20" y1={origin.y} x2="402" y2={origin.y} stroke="#94a3b8" strokeOpacity=".4" /><line x1={origin.x} y1="25" x2={origin.x} y2="275" stroke="#94a3b8" strokeOpacity=".25" />
    <line x1={origin.x} y1={origin.y} x2={aEnd.x} y2={aEnd.y} stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" markerEnd="url(#cross-a-tip)" />
    <line className="lesson-vector-move" x1={origin.x} y1={origin.y} x2={bEnd.x} y2={bEnd.y} stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" markerEnd="url(#cross-b-tip)" />
    <path d={`M${origin.x + 38} ${origin.y} A38 38 0 ${Math.abs(angle) > 180 ? 1 : 0} ${angle >= 0 ? 0 : 1} ${origin.x + 38 * Math.cos(radians)} ${origin.y - 38 * Math.sin(radians)}`} fill="none" stroke="#fda4af" strokeWidth="2" />
    <circle cx={origin.x} cy={origin.y} r="4" fill="#fff" /><text x={aEnd.x - 3} y={aEnd.y + 23} fill="#a5f3fc" fontSize="14" fontWeight="700">a</text><text x={bEnd.x + 3} y={bEnd.y - 8} fill="#fde68a" fontSize="14" fontWeight="700">b</text><text x={origin.x + 48} y={origin.y - 17} fill="#fda4af" fontSize="11">{angle}°</text>
    <circle cx="333" cy="91" r="35" fill="#111c30" stroke="#c4b5fd" strokeOpacity=".5" strokeWidth="2" />
    {Math.abs(z) < .001 ? <><circle cx="333" cy="91" r="8" fill="none" stroke="#c4b5fd" strokeWidth="3" /><text x="333" y="145" fill="#ddd6fe" fontSize="11" textAnchor="middle">z = 0</text></> : z > 0 ? <><circle cx="333" cy="91" r="9" fill="#c4b5fd" /><text x="333" y="145" fill="#ddd6fe" fontSize="11" textAnchor="middle">keluar (+z)</text></> : <><circle cx="333" cy="91" r="9" fill="none" stroke="#c4b5fd" strokeWidth="3" /><path d="M327 85l12 12m0-12l-12 12" stroke="#c4b5fd" strokeWidth="2" /><text x="333" y="145" fill="#ddd6fe" fontSize="11" textAnchor="middle">masuk (−z)</text></>}
    <text x="333" y="40" fill="#c4b5fd" fontSize="11" textAnchor="middle">arah a × b</text><text x="28" y="270" fill="#94a3b8" fontSize="10">Rotasi bertanda dari a ke b</text>
  </svg>;
};

const CrossLab = () => {
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  const [angle, setAngle] = useState(60);
  const crossZ = a * b * Math.sin(angle * Math.PI / 180);
  const smallerAngle = Math.min(Math.abs(angle), 360 - Math.abs(angle));
  const status = Math.abs(crossZ) < 0.0001 ? "Hasil nol: kedua vektor sejajar atau berlawanan arah." : crossZ > 0 ? "Arah hasil keluar bidang (sumbu z positif)." : "Arah hasil masuk bidang (sumbu z negatif).";
  const reset = () => { setA(3); setB(2); setAngle(60); };
  return <div className="overflow-hidden rounded-[2rem] border border-violet-200/20 bg-[linear-gradient(145deg,rgba(41,27,66,.78),rgba(10,20,37,.98))]" data-testid="cross-lab">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4"><div><p className="font-body text-[10px] font-black uppercase tracking-[.18em] text-violet-100/70">Meja eksperimen</p><h3 className="font-display text-lg font-extrabold text-white">Putar b, baca arah z</h3></div>
      <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 font-body text-xs font-bold text-slate-200 hover:bg-white/[.09] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-200" data-testid="reset-cross-lab"><RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />Atur ulang</button></div>
    <div className="grid lg:grid-cols-[1fr_290px]"><div className="min-w-0 p-3 sm:p-5"><div className="rounded-2xl border border-white/10 bg-[#081426]/90 p-2 sm:p-3"><CrossDiagram a={a} b={b} angle={angle} /></div>
      <div className="mt-3 flex flex-wrap gap-4 font-body text-xs text-slate-300"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-cyan-300" /><InlineMath math="\vec a" /></span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-amber-300" /><InlineMath math="\vec b" /></span></div></div>
      <aside className="border-t border-white/10 bg-black/10 p-4 sm:p-5 lg:border-l lg:border-t-0" aria-label="Kontrol hasil kali silang"><p className="mb-3 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-400">Atur besar dan rotasi</p>
        <div className="space-y-2"><RangeControl label="Besar vektor a" value={a} min={1} max={5} step={0.5} onChange={setA} testId="cross-input-a" /><RangeControl label="Besar vektor b" value={b} min={1} max={5} step={0.5} onChange={setB} testId="cross-input-b" accent="amber" /><RangeControl label="Rotasi bertanda (derajat)" value={angle} min={-180} max={180} step={15} onChange={setAngle} testId="cross-input-angle" accent="violet" /></div>
        <div className="mt-3 rounded-2xl border border-violet-200/20 bg-violet-300/[.07] p-4" data-testid="cross-lab-result"><p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.18em] text-violet-100/70">Hasil langsung</p>
          <Formula math={`\\vec a\\times\\vec b=(${crossZ.toFixed(2)})\\,\\mathbf{k}`} testId="cross-live-value" />
          <div className="mt-3 flex items-center justify-between gap-3 font-body text-xs text-slate-200"><span>Besar hasil silang</span><strong className="text-violet-100" data-testid="cross-live-magnitude">{Math.abs(crossZ).toFixed(2)}</strong></div>
          <p className="mt-1 font-body text-[11px] text-slate-400">Sudut kecil untuk rumus besar: {smallerAngle.toFixed(0)}°.</p>
          <p role="status" aria-live="polite" className="mt-2 font-body text-xs font-bold text-violet-100" data-testid="cross-live-status">{status}</p>
          <p className="mt-2 flex gap-2 font-body text-[11px] leading-relaxed text-slate-400"><ArrowDown className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-200" aria-hidden="true" />Ibu jari tangan kanan mengikuti a × b; rotasi bertanda menunjukkan sisi bidang, bukan sudut kecil pada rumus besar.</p>
        </div>
      </aside>
    </div>
  </div>;
};

const navItems = [
  ["Skalar", "perkalian-skalar"],
  ["Dot", "dot-product"],
  ["Cross", "cross-product"],
];

const SmaVektorPadaSistemKoordinatKartesiusPage = () => {
  const outline = useMemo(() => navItems, []);
  return <div className="relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
    <Starfield />
    <style>{`
      @keyframes lesson-enter { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes lesson-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
      .lesson-enter { animation: lesson-enter .55s cubic-bezier(.2,.7,.2,1) both; }
      .lesson-float { animation: lesson-float 4.2s ease-in-out infinite; }
      .lesson-vector-move { transition: x2 .25s ease, y2 .25s ease; }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
      }
    `}</style>
    <PageNavigation />
    <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
      <header className="lesson-enter relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.96),rgba(16,22,43,.94)_58%,rgba(54,37,71,.85))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10" data-testid="lesson-hero">
        <div className="pointer-events-none absolute -right-12 -top-14 h-64 w-64 rounded-full border border-cyan-100/10" /><div className="pointer-events-none absolute right-4 top-12 h-40 w-40 rounded-full border border-amber-100/10" />
        <div className="relative grid items-center gap-7 md:grid-cols-[1.1fr_.9fr]">
          <div><div className="mb-5 flex flex-wrap items-center gap-2"><span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Matematika · SMA</span><span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">Vektor dan Operasinya</span></div>
            <p className="mb-2 font-body text-xs font-bold uppercase tracking-[.24em] text-amber-200">Tiga operasi · satu bahasa panah</p>
            <h1 className="max-w-2xl font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="lesson-title">Vektor di ruang<br /><span className="text-cyan-200">Kartesius</span></h1>
            <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">Kali skalar mengubah panjang, dot product membaca sudut, cross product menunjukkan arah yang tegak lurus. Yuk lihat semuanya bekerja.</p>
            <div className="mt-6 flex items-center gap-2 text-sm text-amber-100"><Sparkles className="h-4 w-4" aria-hidden="true" /><span>Geser kontrolnya. Matematika akan ikut bergerak.</span></div>
          </div>
          <div className="lesson-float mx-auto w-full max-w-md" data-testid="hero-vector-illustration">
            <svg viewBox="0 0 400 250" role="img" aria-label="Ilustrasi tiga operasi vektor: skalar mengubah panah, dot product mengukur proyeksi, dan cross product menunjuk tegak lurus" className="w-full">
              <defs><marker id="lesson-hero-cyan" markerWidth="11" markerHeight="11" refX="9" refY="5.5" orient="auto"><path d="M0 0L11 5.5L0 11Z" fill="#67e8f9" /></marker><marker id="lesson-hero-gold" markerWidth="11" markerHeight="11" refX="9" refY="5.5" orient="auto"><path d="M0 0L11 5.5L0 11Z" fill="#fbbf24" /></marker></defs>
              <circle cx="197" cy="125" r="92" fill="none" stroke="#a5f3fc" strokeOpacity=".12" strokeDasharray="4 9" /><path d="M62 180L184 116" stroke="#67e8f9" strokeWidth="6" strokeLinecap="round" markerEnd="url(#lesson-hero-cyan)" /><path d="M184 116L278 68" stroke="#c4b5fd" strokeWidth="5" strokeLinecap="round" /><path d="M184 116L278 164" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" markerEnd="url(#lesson-hero-gold)" /><path d="M280 72L280 160" stroke="#fda4af" strokeWidth="3" strokeDasharray="4 5" />
              <circle cx="184" cy="116" r="5" fill="#f8fafc" /><text x="113" y="132" fill="#a5f3fc" fontSize="15" fontWeight="700">v</text><text x="276" y="58" fill="#ddd6fe" fontSize="14" fontWeight="700">k v</text><text x="284" y="183" fill="#fde68a" fontSize="14" fontWeight="700">b</text><text x="298" y="119" fill="#fda4af" fontSize="12">a × b</text>
              <text x="200" y="226" fill="#cbd5e1" fontSize="11" textAnchor="middle">besar · sudut · arah tegak lurus</text>
            </svg>
          </div>
        </div>
      </header>

      <div className="mb-8 rounded-2xl border border-white/10 bg-[#0d1728]/90 p-4 sm:flex sm:items-center sm:justify-between sm:gap-4" data-testid="lesson-map">
        <p className="mb-3 flex items-center gap-2 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-400 sm:mb-0"><Compass className="h-4 w-4 text-cyan-200" /> Peta belajar</p>
        <nav aria-label="Peta materi" className="flex flex-wrap gap-2">
          {outline.map(([label, target], index) => <a key={target} href={`#${target}`} data-testid={`link-lesson-section-${index + 1}`} className="rounded-full border border-white/10 bg-white/[.035] px-3 py-2 font-body text-xs font-bold text-slate-200 transition hover:border-cyan-100/35 hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200">{String(index + 1).padStart(2, "0")} · {label}</a>)}
        </nav>
      </div>

      <div className="space-y-14">
        <section id="perkalian-skalar" className="scroll-mt-6" data-testid="scalar-section">
          <SectionTitle index="01" kicker="Panjang dan arah" title="Perkalian vektor dengan skalar" description="Skalar meregangkan atau mengecilkan vektor. Tanda skalar menentukan apakah arahnya tetap, berbalik, atau lenyap." />
          <div className="mb-4 grid gap-4 md:grid-cols-[.82fr_1.18fr]">
            <article className="rounded-3xl border border-cyan-200/20 bg-cyan-300/[.055] p-5 sm:p-6" data-testid="scalar-summary">
              <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.18em] text-cyan-100">Ringkasan Intisari</p>
              <p className="font-body text-sm leading-relaxed text-slate-300">Kalikan setiap komponen dengan angka yang sama. Panjang ikut dikalikan besar nilai skalar; tanda negatif membalik arah.</p>
              <div className="mt-4 space-y-2"><Formula math="k\vec v=(kv_x,kv_y,kv_z)" /><Formula math="|k\vec v|=|k|\,|\vec v|" /></div>
              <Tip testId="scalar-tip"><InlineMath math="k>0" /> arah tetap; <InlineMath math="k<0" /> arah berlawanan; dan <InlineMath math="k=0" /> menghasilkan vektor nol.</Tip>
            </article>
            <ScalarLab />
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            <Example id="scalar-easy" level="Mudah" question={<>Hitung <InlineMath math="3(2,-1)" /> dan nyatakan perubahan panjangnya.</>} steps={[
              <>Kalikan tiap komponen dengan <InlineMath math="3" />: <InlineMath math="3(2,-1)=(3\cdot2,3\cdot(-1))" />.</>,
              <>Hasil komponennya adalah <InlineMath math="(6,-3)" />.</>,
              <>Panjang awal <InlineMath math="\sqrt{2^2+(-1)^2}=\sqrt5" />; panjang baru <InlineMath math="\sqrt{6^2+(-3)^2}=3\sqrt5" />.</>,
            ]} conclusion={<>Jadi, <InlineMath math="3(2,-1)=(6,-3)" /> dan panjangnya menjadi <InlineMath math="3" /> kali semula.</>} />
            <Example id="scalar-medium" level="Sedang" question={<>Tentukan <InlineMath math="-2(1,-2,2)" />. Bagaimana panjang dan arahnya berubah?</>} steps={[
              <>Kalikan komponen satu per satu: <InlineMath math="(-2\cdot1,\,-2\cdot(-2),\,-2\cdot2)" />.</>,
              <>Diperoleh vektor baru <InlineMath math="(-2,4,-4)" />.</>,
              <>Panjang asal <InlineMath math="\sqrt{1+4+4}=3" />; panjang baru <InlineMath math="\sqrt{4+16+16}=6" />.</>,
              <>Nilai pengali negatif, sehingga arah vektor hasil berlawanan dengan arah semula.</>,
            ]} conclusion={<>Hasilnya <InlineMath math="(-2,4,-4)" />, panjangnya <InlineMath math="6" />, dan arahnya berbalik.</>} />
            <Example id="scalar-hard" level="Sulit" question={<>Diketahui <InlineMath math="\vec v=(1,-2,2)" /> dan <InlineMath math="\vec w=k\vec v" />. Jika <InlineMath math="|\vec w|=9" /> dan <InlineMath math="\vec w" /> berlawanan arah dengan <InlineMath math="\vec v" />, tentukan <InlineMath math="k" /> dan <InlineMath math="\vec w" />.</>} steps={[
              <>Hitung panjang asal: <InlineMath math="|\vec v|=\sqrt{1^2+(-2)^2+2^2}=3" />.</>,
              <>Gunakan <InlineMath math="|\vec w|=|k||\vec v|" />: <InlineMath math="9=3|k|" />, maka <InlineMath math="|k|=3" />.</>,
              <>Karena arahnya berlawanan, pilih skalar negatif: <InlineMath math="k=-3" />.</>,
              <>Kalikan komponen: <InlineMath math="\vec w=-3(1,-2,2)=(-3,6,-6)" />.</>,
            ]} conclusion={<>Maka <InlineMath math="k=-3" /> dan <InlineMath math="\vec w=(-3,6,-6)" />.</>} />
          </div>
        </section>

        <section id="dot-product" className="scroll-mt-6" data-testid="dot-section">
          <SectionTitle index="02" kicker="Sudut dan proyeksi" title="Dot product: hasilnya sebuah skalar" description="Perkalian titik mengubah dua vektor menjadi satu bilangan. Bilangan itu memberi petunjuk apakah keduanya condong searah atau saling tegak lurus." />
          <div className="mb-4 grid gap-4 md:grid-cols-[.82fr_1.18fr]">
            <article className="rounded-3xl border border-amber-200/20 bg-amber-300/[.045] p-5 sm:p-6" data-testid="dot-summary">
              <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.18em] text-amber-100">Ringkasan Intisari</p>
              <p className="font-body text-sm leading-relaxed text-slate-300">Hasil dot product adalah <strong className="text-white">skalar, bukan vektor</strong>. Rumus komponen praktis untuk menghitung; rumus sudut menjelaskan maknanya.</p>
              <div className="mt-4 space-y-2"><Formula math="\vec a\cdot\vec b=a_xb_x+a_yb_y+a_zb_z" /><Formula math="\vec a\cdot\vec b=|\vec a|\,|\vec b|\cos\theta" /></div>
              <Tip testId="dot-tip">Untuk dua vektor tak nol: sudut lancip memberi hasil positif, sudut siku-siku memberi nol, dan sudut tumpul memberi hasil negatif. Hasil nol juga terjadi jika salah satu vektornya vektor nol; jadi kesimpulan tegak lurus perlu mensyaratkan kedua vektor tidak nol.</Tip>
            </article>
            <DotLab />
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            <Example id="dot-easy" level="Mudah" question={<>Hitung hasil kali titik <InlineMath math="(2,-1,3)\cdot(1,4,2)" />.</>} steps={[
              <>Kalikan pasangan komponen sejenis: <InlineMath math="2\cdot1,\;(-1)\cdot4,\;3\cdot2" />.</>,
              <>Jumlahkan hasilnya: <InlineMath math="2-4+6" />.</>,
              <>Perhitungan memberi <InlineMath math="4" />; hasil dot product berupa satu bilangan.</>,
            ]} conclusion={<>Jadi, <InlineMath math="(2,-1,3)\cdot(1,4,2)=4" />.</>} />
            <Example id="dot-medium" level="Sedang" question={<>Jika <InlineMath math="|\vec a|=4" />, <InlineMath math="|\vec b|=3" />, dan sudut di antara keduanya <InlineMath math="120^\circ" />, tentukan <InlineMath math="\vec a\cdot\vec b" />.</>} steps={[
              <>Pakai rumus sudut: <InlineMath math="\vec a\cdot\vec b=|\vec a||\vec b|\cos\theta" />.</>,
              <>Substitusi nilainya: <InlineMath math="(4)(3)\cos120^\circ" />.</>,
              <>Karena <InlineMath math="\cos120^\circ=-\frac12" />, maka <InlineMath math="12\left(-\frac12\right)=-6" />.</>,
            ]} conclusion={<>Hasilnya <InlineMath math="\vec a\cdot\vec b=-6" />. Tanda negatif cocok dengan sudut tumpul.</>} />
            <Example id="dot-hard" level="Sulit" question={<>Untuk <InlineMath math="\vec a=(1,2,2)" /> dan <InlineMath math="\vec b=(2,1,2)" />, tentukan sudut apitnya.</>} steps={[
              <>Hitung dot product: <InlineMath math="\vec a\cdot\vec b=1(2)+2(1)+2(2)=8" />.</>,
              <>Panjang masing-masing: <InlineMath math="|\vec a|=\sqrt{1+4+4}=3" /> dan <InlineMath math="|\vec b|=\sqrt{4+1+4}=3" />.</>,
              <>Dari rumus sudut, <InlineMath math="\cos\theta=\frac{\vec a\cdot\vec b}{|\vec a||\vec b|}=\frac{8}{3\cdot3}=\frac89" />.</>,
              <>Ambil invers cosinus: <InlineMath math="\theta=\cos^{-1}\left(\frac89\right)\approx27.3^\circ" />.</>,
            ]} conclusion={<>Sudut antara kedua vektor sekitar <InlineMath math="27.3^\circ" />, yaitu sudut lancip.</>} />
          </div>
        </section>

        <section id="cross-product" className="scroll-mt-6" data-testid="cross-section">
          <SectionTitle index="03" kicker="Arah yang tegak lurus" title="Cross product: hasilnya vektor baru" description="Perkalian silang khas ruang tiga dimensi. Panah hasil tegak lurus pada kedua masukan, dengan arahnya ditentukan oleh aturan tangan kanan." />
          <div className="mb-4 grid gap-4 md:grid-cols-[.82fr_1.18fr]">
            <article className="rounded-3xl border border-violet-200/20 bg-violet-300/[.05] p-5 sm:p-6" data-testid="cross-summary">
              <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.18em] text-violet-100">Ringkasan Intisari</p>
              <p className="font-body text-sm leading-relaxed text-slate-300">Hasil cross product adalah vektor 3D yang tegak lurus terhadap <InlineMath math="\vec a" /> dan <InlineMath math="\vec b" />. Urutan penting: menukar posisi masukan membalik arah hasil.</p>
              <div className="mt-4 space-y-2"><Formula math="\vec a\times\vec b=(a_yb_z-a_zb_y,\ a_zb_x-a_xb_z,\ a_xb_y-a_yb_x)" /><Formula math="|\vec a\times\vec b|=|\vec a|\,|\vec b|\sin\theta" /></div>
              <Tip testId="cross-tip"><InlineMath math="\theta" /> pada rumus besar adalah sudut kecil tak bertanda dalam <InlineMath math="[0^\circ,180^\circ]" />. Vektor sejajar atau berlawanan arah menghasilkan vektor nol. Aturan tangan kanan menentukan orientasi: <InlineMath math="\vec a\times\vec b=-(\vec b\times\vec a)" />.</Tip>
            </article>
            <CrossLab />
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            <Example id="cross-easy" level="Mudah" question={<>Gunakan basis satuan untuk menentukan <InlineMath math="\mathbf i\times\mathbf j" />.</>} steps={[
              <>Vektor <InlineMath math="\mathbf i=(1,0,0)" /> mengarah ke sumbu <InlineMath math="x" />, sedangkan <InlineMath math="\mathbf j=(0,1,0)" /> mengarah ke sumbu <InlineMath math="y" />.</>,
              <>Dengan urutan tangan kanan dari <InlineMath math="x" /> ke <InlineMath math="y" />, arah tegak lurusnya adalah sumbu <InlineMath math="z" /> positif.</>,
              <>Maka <InlineMath math="(1,0,0)\times(0,1,0)=(0,0,1)" />.</>,
            ]} conclusion={<>Jadi, <InlineMath math="\mathbf i\times\mathbf j=\mathbf k" />.</>} />
            <Example id="cross-medium" level="Sedang" question={<>Hitung <InlineMath math="(1,2,0)\times(3,1,0)" /> dan jelaskan tanda komponen <InlineMath math="z" />-nya.</>} steps={[
              <>Gunakan rumus komponen: <InlineMath math="(a_yb_z-a_zb_y,\ a_zb_x-a_xb_z,\ a_xb_y-a_yb_x)" />.</>,
              <>Komponen pertama: <InlineMath math="2(0)-0(1)=0" />; komponen kedua: <InlineMath math="0(3)-1(0)=0" />.</>,
              <>Komponen ketiga: <InlineMath math="1(1)-2(3)=1-6=-5" />.</>,
              <>Karena nilainya negatif, hasil menunjuk ke arah sumbu <InlineMath math="z" /> negatif, masuk ke bidang <InlineMath math="xy" />.</>,
            ]} conclusion={<>Maka <InlineMath math="(1,2,0)\times(3,1,0)=(0,0,-5)" />.</>} />
            <Example id="cross-hard" level="Sulit" question={<>Tentukan <InlineMath math="(2,-1,3)\times(1,4,2)" /> dan verifikasi hasilnya tegak lurus pada kedua masukan.</>} steps={[
              <>Komponen <InlineMath math="x" />: <InlineMath math="(-1)(2)-3(4)=-2-12=-14" />.</>,
              <>Komponen <InlineMath math="y" />: <InlineMath math="3(1)-2(2)=3-4=-1" />.</>,
              <>Komponen <InlineMath math="z" />: <InlineMath math="2(4)-(-1)(1)=8+1=9" />. Hasilnya <InlineMath math="(-14,-1,9)" />.</>,
              <>Cek terhadap vektor pertama: <InlineMath math="(-14,-1,9)\cdot(2,-1,3)=-28+1+27=0" />.</>,
              <>Cek terhadap vektor kedua: <InlineMath math="(-14,-1,9)\cdot(1,4,2)=-14-4+18=0" />.</>,
            ]} conclusion={<>Hasil cross product ialah <InlineMath math="(-14,-1,9)" />; kedua dot product bernilai nol, jadi hasil tegak lurus pada kedua vektor.</>} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-cyan-200/15 bg-[linear-gradient(135deg,rgba(9,79,100,.18),rgba(16,24,43,.94))] p-5 sm:p-7" data-testid="lesson-summary">
          <div className="mb-4 flex items-center gap-2 text-amber-200"><Sparkles className="h-4 w-4" aria-hidden="true" /><p className="font-body text-xs font-black uppercase tracking-[.2em]">Bekal yang dibawa</p></div>
          <h2 className="font-display text-2xl font-extrabold text-white">Tiga operasi, tiga jenis petunjuk</h2>
          <ol className="mt-5 grid gap-3 md:grid-cols-3">
            <li className="rounded-2xl border border-cyan-200/10 bg-[#0b1424]/70 p-4"><span className="font-display text-lg font-black text-cyan-200">01</span><p className="mt-2 font-body text-sm leading-relaxed text-slate-300">Skalar mengubah besar; tanda negatif membalik arah.</p></li>
            <li className="rounded-2xl border border-amber-200/10 bg-[#0b1424]/70 p-4"><span className="font-display text-lg font-black text-amber-200">02</span><p className="mt-2 font-body text-sm leading-relaxed text-slate-300">Dot product adalah skalar yang membaca kesearahan melalui cosinus sudut.</p></li>
            <li className="rounded-2xl border border-violet-200/10 bg-[#0b1424]/70 p-4"><span className="font-display text-lg font-black text-violet-200">03</span><p className="mt-2 font-body text-sm leading-relaxed text-slate-300">Cross product adalah vektor tegak lurus; urutan menentukan arahnya.</p></li>
          </ol>
        </section>
      </div>
    </main>
  </div>;
};

export default SmaVektorPadaSistemKoordinatKartesiusPage;