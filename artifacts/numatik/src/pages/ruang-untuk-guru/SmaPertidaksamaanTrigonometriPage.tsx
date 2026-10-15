import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Activity,
  BookOpen,
  Check,
  CircleHelp,
  Lightbulb,
  Pause,
  Play,
  RotateCcw,
  TriangleAlert,
} from "lucide-react";
import { InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

type FunctionKind = "sin" | "cos" | "tan";
type Comparator = ">" | ">=" | "<" | "<=";

const InlineMath = ({ math }: { math: string }) => (
  <KaTeXInlineMath math={math.replace(/\\\\/g, "\\")} />
);

const Panel = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <section className={`rounded-[1.6rem] border border-white/10 bg-[#121a37]/90 p-4 shadow-xl shadow-indigo-950/20 sm:p-6 ${className}`}>
    {children}
  </section>
);

const SectionTitle = ({ index, title, icon }: { index: string; title: string; icon: ReactNode }) => (
  <div className="mb-4 flex items-start gap-3">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-200">{icon}</span>
    <div>
      <p className="font-body text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200/70">Bagian {index}</p>
      <h2 className="font-display text-lg font-extrabold leading-tight text-white sm:text-xl">{title}</h2>
    </div>
  </div>
);

const Formula = ({ children }: { children: string }) => (
  <div className="my-3 overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#09122d] px-3 py-3 text-center text-cyan-100 [&_.katex]:text-[0.95em] sm:px-4 sm:[&_.katex]:text-[1.05em]">
    <InlineMath math={children} />
  </div>
);

const Step = ({ number, children }: { number: number; children: ReactNode }) => (
  <li className="flex gap-3 text-sm leading-relaxed text-white/80">
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 font-display text-[11px] font-black text-cyan-100">{number}</span>
    <span>{children}</span>
  </li>
);

const fmt = (value: number) => {
  if (!Number.isFinite(value)) return "tidak terdefinisi";
  if (Math.abs(value) < 0.005) return "0";
  if (Math.abs(value - 1) < 0.005) return "1";
  if (Math.abs(value + 1) < 0.005) return "−1";
  return Number(value.toFixed(2)).toString().replace("-", "−");
};

const valueAt = (kind: FunctionKind, degrees: number) => {
  const radians = degrees * Math.PI / 180;
  if (kind === "sin") return Math.sin(radians);
  if (kind === "cos") return Math.cos(radians);
  if (Math.abs(Math.cos(radians)) < 1e-7) return Number.NaN;
  return Math.tan(radians);
};

const compare = (value: number, comparator: Comparator, threshold: number) => {
  if (!Number.isFinite(value)) return false;
  if (comparator === ">") return value > threshold;
  if (comparator === ">=") return value >= threshold;
  if (comparator === "<") return value < threshold;
  return value <= threshold;
};

function InequalityVisualizer() {
  const [kind, setKind] = useState<FunctionKind>("sin");
  const [comparator, setComparator] = useState<Comparator>(">");
  const [threshold, setThreshold] = useState(0.5);
  const [angle, setAngle] = useState(35);
  const [playing, setPlaying] = useState(false);
  const direction = useRef(1);
  const plot = { left: 42, right: 340, top: 22, bottom: 184 };
  const yMin = kind === "tan" ? -3 : -1.2;
  const yMax = kind === "tan" ? 3 : 1.2;
  const xToSvg = (x: number) => plot.left + x / 360 * (plot.right - plot.left);
  const yToSvg = (y: number) => plot.bottom - (y - yMin) / (yMax - yMin) * (plot.bottom - plot.top);
  const value = valueAt(kind, angle);
  const satisfies = compare(value, comparator, threshold);

  useEffect(() => {
    if (!playing) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const timer = window.setInterval(() => {
        setAngle((current) => {
          const next = current + direction.current * 2;
          if (next >= 360) { direction.current = -1; return 360; }
          if (next <= 0) { direction.current = 1; return 0; }
          return next;
        });
      }, 450);
      return () => window.clearInterval(timer);
    }
    let frame = 0;
    let last = 0;
    const animate = (time: number) => {
      if (last && time - last > 45) {
        last = time;
        setAngle((current) => {
          const next = current + direction.current * 1.1;
          if (next >= 360) { direction.current = -1; return 360; }
          if (next <= 0) { direction.current = 1; return 0; }
          return next;
        });
      } else if (!last) last = time;
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [playing]);

  const graphPaths = useMemo(() => {
    const paths: string[] = [];
    let points: string[] = [];
    const samples = 720;
    for (let i = 0; i <= samples; i += 1) {
      const degrees = i / samples * 360;
      const y = valueAt(kind, degrees);
      const clippedOrUndefined = !Number.isFinite(y) || Math.abs(y) > (kind === "tan" ? 3.3 : 1.3);
      if (clippedOrUndefined) {
        if (points.length > 1) paths.push(points.join(" "));
        points = [];
        continue;
      }
      points.push(`${points.length ? "L" : "M"} ${xToSvg(degrees).toFixed(2)} ${yToSvg(y).toFixed(2)}`);
    }
    if (points.length > 1) paths.push(points.join(" "));
    return paths;
  }, [kind]);

  const solutionBands = useMemo(() => {
    const bands: { start: number; end: number }[] = [];
    let start: number | null = null;
    const samples = 720;
    for (let index = 0; index <= samples; index += 1) {
      const degrees = index / samples * 360;
      const included = compare(valueAt(kind, degrees), comparator, threshold);
      if (included && start === null) start = degrees;
      if ((!included || index === samples) && start !== null) {
        bands.push({ start, end: included && index === samples ? degrees : degrees - 360 / samples });
        start = null;
      }
    }
    return bands;
  }, [kind, comparator, threshold]);

  const asymptotes = kind === "tan" ? [90, 270] : [];
  const selectedLabel = kind === "sin" ? "sin x" : kind === "cos" ? "cos x" : "tan x";

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="min-w-0 rounded-2xl border border-cyan-200/15 bg-[#08112b] p-2 sm:p-3">
        <svg viewBox="0 0 360 256" role="img" aria-label={`Grafik ${selectedLabel} pada 0 sampai 360 derajat. Area hijau menunjukkan sudut yang memenuhi ${selectedLabel} ${comparator} ${fmt(threshold)}.`} className="block h-auto w-full" data-testid="visual-inequality-graph">
          <defs><clipPath id="ineq-plot-clip"><rect x={plot.left} y={plot.top} width={plot.right - plot.left} height={plot.bottom - plot.top} /></clipPath></defs>
          {[yMin, 0, yMax].map((y) => (
            <g key={`y-${y}`}>
              <line x1={plot.left} x2={plot.right} y1={yToSvg(y)} y2={yToSvg(y)} stroke={y === 0 ? "#70809c" : "#293653"} strokeWidth="1" />
              <text x={plot.left - 7} y={yToSvg(y) + 4} fill="#9aa9c2" fontSize="9" textAnchor="end">{fmt(y)}</text>
            </g>
          ))}
          {[0, 90, 180, 270, 360].map((x) => (
            <g key={`x-${x}`}>
              <line x1={xToSvg(x)} x2={xToSvg(x)} y1={plot.top} y2={plot.bottom} stroke="#26334e" strokeWidth=".8" />
              <text x={xToSvg(x)} y={plot.bottom + 18} fill="#9aa9c2" fontSize="9" textAnchor="middle">{x}°</text>
            </g>
          ))}
          <g clipPath="url(#ineq-plot-clip)">
            {solutionBands.map((band, index) => <rect key={`band-${index}`} data-testid="solution-region" x={xToSvg(band.start)} y={plot.bottom - 8} width={Math.max(1, xToSvg(band.end) - xToSvg(band.start))} height="8" fill="#34d399" fillOpacity=".82" />)}
            {asymptotes.map((x) => <line key={`asymptote-${x}`} x1={xToSvg(x)} x2={xToSvg(x)} y1={plot.top} y2={plot.bottom} stroke="#fb7185" strokeWidth="1.5" strokeDasharray="5 5" />)}
            <line x1={plot.left} x2={plot.right} y1={yToSvg(Math.max(yMin, Math.min(yMax, threshold)))} y2={yToSvg(Math.max(yMin, Math.min(yMax, threshold)))} stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="5 4" />
            {graphPaths.map((path, index) => <path key={`curve-${index}`} d={path} fill="none" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />)}
            {Number.isFinite(value) && Math.abs(value) <= (kind === "tan" ? 3.3 : 1.3) && (
              <g aria-hidden="true">
                <line x1={xToSvg(angle)} x2={xToSvg(angle)} y1={plot.bottom} y2={yToSvg(value)} stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx={xToSvg(angle)} cy={yToSvg(value)} r="5.5" fill={satisfies ? "#34d399" : "#fb7185"} stroke="#fff" strokeWidth="1.5" />
              </g>
            )}
          </g>
          <text x={plot.right - 2} y={plot.top - 6} fill="#a5f3fc" fontSize="10" fontWeight="700" textAnchor="end">{selectedLabel}</text>
          <text x={plot.left} y="224" fill="#86efac" fontSize="9">rentang hijau = solusi</text>
          {kind === "tan" && <text x={plot.right} y="240" fill="#fda4af" fontSize="9" textAnchor="end">garis putus-putus = tan tidak terdefinisi</text>}
        </svg>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white/[0.04] px-3 py-2 text-[11px]">
          <span className="text-white/50">Uji sudut</span>
          <span data-testid="status-test-angle" className="font-display font-black text-amber-100">{angle.toFixed(0)}°</span>
          <span className="text-white/50">{selectedLabel} =</span>
          <span data-testid="status-function-value" aria-live="polite" className={`font-display font-black ${satisfies ? "text-emerald-200" : "text-rose-200"}`}>{fmt(value)}</span>
          <span data-testid="status-inequality-result" aria-live="polite" className={`rounded-full px-2.5 py-1 font-bold ${satisfies ? "bg-emerald-300/15 text-emerald-100" : "bg-rose-300/15 text-rose-100"}`}>{!Number.isFinite(value) ? "Tidak terdefinisi" : satisfies ? "Memenuhi" : "Tidak memenuhi"}</span>
        </div>
      </div>
      <div className="min-w-0 space-y-3">
        <label className="block text-xs font-bold text-white/75" htmlFor="ineq-function">Pilih fungsi
          <select id="ineq-function" data-testid="select-inequality-function" value={kind} onChange={(event) => setKind(event.target.value as FunctionKind)} className="mt-1.5 w-full rounded-xl border border-cyan-100/20 bg-[#09122d] px-3 py-2.5 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <option value="sin">sinus · sin x</option><option value="cos">cosinus · cos x</option><option value="tan">tangen · tan x</option>
          </select>
        </label>
        <label className="block text-xs font-bold text-white/75" htmlFor="ineq-comparator">Pilih tanda
          <select id="ineq-comparator" data-testid="select-inequality-comparator" value={comparator} onChange={(event) => setComparator(event.target.value as Comparator)} className="mt-1.5 w-full rounded-xl border border-cyan-100/20 bg-[#09122d] px-3 py-2.5 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <option value="&gt;">lebih dari · &gt;</option><option value="&gt;=">lebih dari atau sama dengan · ≥</option><option value="&lt;">kurang dari · &lt;</option><option value="&lt;=">kurang dari atau sama dengan · ≤</option>
          </select>
        </label>
        <label htmlFor="ineq-threshold" className="block rounded-xl border border-amber-200/15 bg-amber-200/[0.045] p-3 text-xs font-bold text-amber-50/80">
          <span className="flex items-center justify-between gap-2"><span>Nilai pembanding</span><output data-testid="status-threshold" htmlFor="ineq-threshold" className="rounded-lg bg-amber-200/10 px-2 py-1 text-amber-100">{fmt(threshold)}</output></span>
          <input id="ineq-threshold" data-testid="input-inequality-threshold" aria-label="Atur nilai pembanding" type="range" min="-3" max="3" step="0.05" value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} className="mt-3 block w-full accent-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300" />
          <span className="mt-1 flex justify-between text-[10px] text-white/40"><span>−3</span><span>3</span></span>
        </label>
        <label htmlFor="ineq-angle" className="block rounded-xl border border-cyan-200/15 bg-cyan-300/[0.045] p-3 text-xs font-bold text-cyan-50/80">
          <span className="flex items-center justify-between gap-2"><span>Sudut uji</span><output htmlFor="ineq-angle" className="rounded-lg bg-cyan-200/10 px-2 py-1 text-cyan-100">{angle.toFixed(0)}°</output></span>
          <input id="ineq-angle" data-testid="input-test-angle" aria-label="Atur sudut uji dari 0 sampai 360 derajat" type="range" min="0" max="360" step="1" value={angle} onChange={(event) => { setPlaying(false); direction.current = 1; setAngle(Number(event.target.value)); }} className="mt-3 block w-full accent-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" />
        </label>
        <div className="flex gap-2">
          <button type="button" data-testid="button-play-pause" aria-label={playing ? "Jeda animasi sudut" : "Putar animasi sudut"} aria-pressed={playing} onClick={() => setPlaying((current) => !current)} className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-100/20 bg-cyan-200/10 px-3 py-2 text-xs font-bold text-cyan-50 hover:bg-cyan-200/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}{playing ? "Jeda" : "Putar"}
          </button>
          <button type="button" data-testid="button-reset-animation" onClick={() => { setPlaying(false); direction.current = 1; setAngle(35); }} className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-bold text-white/75 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><RotateCcw className="h-4 w-4" /> Reset</button>
        </div>
        <p data-testid="status-region-count" className="rounded-xl border border-emerald-200/15 bg-emerald-300/[0.06] p-3 text-xs leading-relaxed text-emerald-50/75">Pita hijau menandai {solutionBands.length ? `${solutionBands.length} rentang sudut` : "tidak ada rentang sudut"} yang memenuhi pertidaksamaan pada satu putaran.</p>
      </div>
    </div>
  );
}

const SmaPertidaksamaanTrigonometriPage = () => (
  <div className="relative min-h-screen overflow-x-hidden bg-[#080d22] text-white">
    <Starfield />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.19),_transparent_68%)]" />
    <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri" />
    <main className="relative z-10 mx-auto w-full max-w-5xl px-3 pb-16 pt-16 sm:px-5 sm:pt-20">
      <header className="relative mb-5 overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-gradient-to-br from-[#153b60] via-[#17254a] to-[#39244a] p-5 shadow-2xl shadow-indigo-950/40 sm:p-8 md:p-10">
        <div className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 rounded-full border-[22px] border-cyan-200/10" />
        <div className="pointer-events-none absolute -bottom-14 right-24 h-36 w-36 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-100/25 bg-cyan-100/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100"><BookOpen className="h-3.5 w-3.5" /> Ruang untuk Guru · SMA</div>
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-amber-200/80">Trigonometri · Buku Animasi Matematika</p>
          <h1 className="mt-2 max-w-3xl font-display text-3xl font-black leading-[1.08] text-white sm:text-4xl md:text-5xl">Pertidaksamaan trigonometri</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cyan-50/75 sm:text-base">Bukan sekadar mencari satu sudut yang pas. Kita sedang memetakan semua bagian putaran ketika nilai trigonometrinya berada di sisi yang diminta.</p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-amber-100/20 bg-amber-200/10 px-3 py-2 text-xs font-semibold text-amber-100"><Activity className="h-4 w-4 shrink-0" /> Misi: baca nilai, tandai interval, dan jaga batasnya.</div>
        </div>
      </header>

      <div className="mb-5 grid gap-3 sm:grid-cols-[1.3fr_0.7fr]">
        <Panel className="bg-[#111a36]/95"><div className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-300/10 text-amber-200"><CircleHelp className="h-5 w-5" /></span><div><h2 className="font-display text-base font-bold text-amber-100">Apa yang ditanyakan?</h2><p className="mt-2 text-sm leading-relaxed text-white/75">Pertidaksamaan seperti <InlineMath math="\sin x>\frac12" /> meminta semua sudut <InlineMath math="x" /> yang membuat nilai sinus benar-benar lebih besar dari <InlineMath math="\frac12" />. Jawabannya biasanya satu atau beberapa <strong className="text-white">interval sudut</strong>, bukan satu titik saja.</p></div></div></Panel>
        <Panel className="flex flex-col justify-center border-amber-200/15 bg-amber-200/[0.06]"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-100/60">Wilayah latihan</p><p className="mt-2 font-display text-lg font-black text-amber-100">0° ≤ x ≤ 360°</p><p className="mt-1 text-xs leading-relaxed text-white/60">Satu putaran penuh, dengan kedua batas ikut dipertimbangkan.</p></Panel>
      </div>

      <Panel className="mb-5">
        <SectionTitle index="01" title="Satu grafik, banyak sudut yang cocok" icon={<Activity className="h-5 w-5" />} />
        <p className="mb-4 text-sm leading-relaxed text-white/75">Pada grafik, pilih semua posisi mendatar ketika kurva memenuhi syarat terhadap garis pembanding. Pita hijau menandai rentang solusinya; titik uji bergerak untuk memeriksa satu sudut tertentu.</p>
        <InequalityVisualizer />
        <p className="mt-4 text-xs leading-relaxed text-white/55">Grafik menampilkan satu putaran. Untuk sinus dan cosinus, pola berulang setiap 360°; untuk tangen setiap 180°. Jika domain lebih luas, salin interval solusi sejauh kelipatan periode yang sesuai.</p>
      </Panel>

      <Panel className="mb-5 border-cyan-200/20 bg-[#101a38]/95">
        <SectionTitle index="02" title="Baca lingkaran satuan dan tanda" icon={<BookOpen className="h-5 w-5" />} />
        <p className="mb-4 text-sm leading-relaxed text-white/75">Bayangkan nilai fungsi sebagai koordinat titik pada lingkaran satuan: sinus adalah tinggi, cosinus adalah posisi mendatar, sedangkan tangen adalah perbandingan tinggi terhadap posisi mendatar. Tanda kuadran memberi peta awal sebelum kita menandai ambang nilai.</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            ["I", "sin +", "cos +", "tan +", "border-emerald-200/20 bg-emerald-300/[0.06]"],
            ["II", "sin +", "cos −", "tan −", "border-cyan-200/20 bg-cyan-300/[0.06]"],
            ["III", "sin −", "cos −", "tan +", "border-rose-200/20 bg-rose-300/[0.06]"],
            ["IV", "sin −", "cos +", "tan −", "border-amber-200/20 bg-amber-300/[0.06]"],
          ].map(([quadrant, sin, cos, tan, tone]) => <div key={quadrant} className={`rounded-2xl border p-3 ${tone}`}><p className="font-display text-sm font-black text-white">Kuadran {quadrant}</p><div className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-bold text-white/80"><span className="rounded-md bg-white/10 px-2 py-1">{sin}</span><span className="rounded-md bg-white/10 px-2 py-1">{cos}</span><span className="rounded-md bg-white/10 px-2 py-1">{tan}</span></div></div>)}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-white/55">Sumbu juga penting: nilai sinus atau cosinus dapat tepat nol. Tangen tidak terdefinisi ketika cosinus nol, yaitu pada <InlineMath math="90^\circ+180^\circ k" />.</p>
      </Panel>

      <Panel className="mb-5 border-amber-200/15 bg-amber-300/[0.035]">
        <SectionTitle index="03" title="Strategi yang bisa diandalkan" icon={<Check className="h-5 w-5" />} />
        <ol className="space-y-3">
          <Step number={1}>Tulis interval untuk sudut yang diminta. Tentukan apakah memakai derajat atau radian, dan jangan melupakan batas interval.</Step>
          <Step number={2}>Pindahkan konstanta dengan operasi yang sah sampai bentuknya <InlineMath math="f(x)\ \gtreqless\ c" />. Jika mengalikan atau membagi kedua ruas dengan bilangan negatif, <strong>balik arah tanda</strong>.</Step>
          <Step number={3}>Cari titik batas dari persamaan <InlineMath math="f(x)=c" />, lalu catat juga titik yang membuat fungsi tidak terdefinisi.</Step>
          <Step number={4}>Bagi garis sudut di titik-titik batas. Uji satu sudut di setiap bagian, atau baca daerah terhadap garis <InlineMath math="y=c" /> pada grafik.</Step>
          <Step number={5}>Masukkan titik batas hanya untuk tanda <InlineMath math="\le" /> atau <InlineMath math="\ge" /> (dan bila fungsi terdefinisi). Terakhir, saring semua hasil sesuai interval awal.</Step>
        </ol>
      </Panel>

      <div className="mb-4 flex items-center gap-2 px-1"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-300/10 text-amber-200"><Lightbulb className="h-4 w-4" /></span><div><p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-200/65">Contoh terarah</p><h2 className="font-display text-xl font-black text-white">Cari intervalnya, lalu cek batas</h2></div></div>

      <div className="mb-5 grid gap-4">
        <article className="rounded-[1.5rem] border border-emerald-200/20 bg-emerald-300/[0.055] p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2"><span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">Contoh 1 · sinus</span><h3 className="font-display text-base font-bold text-white">Ambang pada dua kuadran</h3></div>
          <div className="rounded-2xl bg-[#09122d]/80 p-3 sm:p-4"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">Selesaikan</p><Formula>{"\\sin x>\\frac12,\\qquad 0^\\circ\\le x\\le360^\\circ"}</Formula>
            <ol className="space-y-3">
              <Step number={1}>Garis <InlineMath math="y=\frac12" /> memotong sinus pada sudut acuan 30°. Dalam satu putaran, persamaan batas memberi <InlineMath math="x=30^\circ" /> dan <InlineMath math="x=150^\circ" />.</Step>
              <Step number={2}>Sinus berada di atas <InlineMath math="\frac12" /> di antara kedua potong itu. Karena tandanya ketat <InlineMath math=">" />, titik potong tidak ikut.</Step>
              <Step number={3}>Pada 0° dan 360°, sinus bernilai 0, jadi batas interval luar juga tidak memenuhi.</Step>
              <li data-testid="result-sine-example" className="ml-9 rounded-xl border border-emerald-100/15 bg-emerald-100/[0.07] p-3 font-bold text-emerald-100">Himpunan solusi: <InlineMath math="30^\circ<x<150^\circ" />.</li>
            </ol>
          </div>
        </article>

        <article className="rounded-[1.5rem] border border-cyan-200/20 bg-cyan-300/[0.045] p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2"><span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">Contoh 2 · cosinus</span><h3 className="font-display text-base font-bold text-white">Tanda inklusif, ujung ikut</h3></div>
          <div className="rounded-2xl bg-[#09122d]/80 p-3 sm:p-4"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">Selesaikan</p><Formula>{"\\cos x\\le-\\frac{\\sqrt2}{2},\\qquad 0^\\circ\\le x\\le360^\\circ"}</Formula>
            <ol className="space-y-3">
              <Step number={1}>Nilai batas <InlineMath math="-\frac{\sqrt2}{2}" /> muncul pada 135° dan 225°. Cosinus adalah koordinat mendatar pada lingkaran satuan.</Step>
              <Step number={2}>Pada busur 135° sampai 225°, koordinat mendatarnya tidak lebih besar dari batas tersebut. Tanda <InlineMath math="\le" /> menyertakan kedua titik potong.</Step>
              <li data-testid="result-cosine-example" className="ml-9 rounded-xl border border-cyan-100/15 bg-cyan-100/[0.07] p-3 font-bold text-cyan-100">Himpunan solusi: <InlineMath math="135^\circ\le x\le225^\circ" />.</li>
            </ol>
          </div>
        </article>

        <article className="rounded-[1.5rem] border border-rose-200/20 bg-rose-300/[0.045] p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2"><span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">Contoh 3 · tangen</span><h3 className="font-display text-base font-bold text-white">Pisahkan cabang di asimtot</h3></div>
          <div className="rounded-2xl bg-[#09122d]/80 p-3 sm:p-4"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">Selesaikan</p><Formula>{"\\tan x\\ge1,\\qquad 0^\\circ\\le x\\le360^\\circ"}</Formula>
            <ol className="space-y-3">
              <Step number={1}>Pada cabang pertama, tangen meningkat dari 0° sampai asimtot 90°. Nilai 1 tercapai di 45°, sehingga bagian yang memenuhi adalah <InlineMath math="[45^\circ,90^\circ)" />.</Step>
              <Step number={2}>Setelah asimtot 90°, cabang berikutnya mulai dari nilai sangat negatif dan meningkat. Nilai 1 tercapai kembali di 225°, sehingga bagian berikutnya adalah <InlineMath math="[225^\circ,270^\circ)" />.</Step>
              <Step number={3}>Titik 90° dan 270° bukan jawaban: tangen di sana tidak terdefinisi. Tanda sama dengan menyertakan 45° dan 225° saja.</Step>
              <li data-testid="result-tangent-example" className="ml-9 rounded-xl border border-rose-100/15 bg-rose-100/[0.07] p-3 font-bold text-rose-100">Himpunan solusi: <InlineMath math="[45^\circ,90^\circ)\cup[225^\circ,270^\circ)" />.</li>
            </ol>
          </div>
        </article>
      </div>

      <Panel className="mb-5 border-violet-200/15 bg-[#131a38]/95">
        <SectionTitle index="04" title="Sudut di dalam fungsi: ubah rentang dulu" icon={<RotateCcw className="h-5 w-5" />} />
        <p className="text-sm leading-relaxed text-white/75">Misalkan <InlineMath math="\sin(2x+30^\circ)\ge\frac12" /> untuk <InlineMath math="0^\circ\le x\le180^\circ" />. Jangan langsung memakai satu putaran untuk sudut bagian dalam. Tetapkan <InlineMath math="\theta=2x+30^\circ" />.</p>
        <Formula>{"0^\\circ\\le x\\le180^\\circ\\quad\\Longrightarrow\\quad30^\\circ\\le\\theta\\le390^\\circ"}</Formula>
        <ol className="space-y-3">
          <Step number={1}>Di rentang <InlineMath math="30^\circ\le\theta\le390^\circ" />, sinus minimal <InlineMath math="\frac12" /> pada <InlineMath math="[30^\circ,150^\circ]\cup[390^\circ,390^\circ]" />. Titik 390° muncul karena sama dengan 30° setelah satu putaran.</Step>
          <Step number={2}>Kembalikan setiap bagian menggunakan <InlineMath math="x=\frac{\theta-30^\circ}{2}" />. Dari <InlineMath math="[30^\circ,150^\circ]" /> didapat <InlineMath math="0^\circ\le x\le60^\circ" />; dari <InlineMath math="\theta=390^\circ" /> didapat <InlineMath math="x=180^\circ" />.</Step>
          <li className="ml-9 rounded-xl border border-violet-100/15 bg-violet-100/[0.07] p-3 font-bold text-violet-100">Solusi: <InlineMath math="[0^\circ,60^\circ]\cup\{180^\circ\}" />. Cek: nilai sinus pada 180° adalah sin 390° = sin 30° = 1/2.</li>
        </ol>
      </Panel>

      <Panel className="mb-5 border-rose-200/15 bg-rose-300/[0.035]">
        <SectionTitle index="05" title="Dua jebakan yang gampang dihindari" icon={<TriangleAlert className="h-5 w-5" />} />
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-rose-100/10 bg-rose-200/[0.045] p-3 text-sm leading-relaxed text-white/75"><strong className="text-rose-100">Operasi negatif membalik tanda.</strong><p className="mt-2">Dari <InlineMath math="-2\sin x>1" />, membagi kedua ruas dengan <InlineMath math="-2" /> memberi <InlineMath math="\sin x<-\frac12" />, bukan <InlineMath math=">" />.</p></div>
          <div className="rounded-xl border border-amber-100/10 bg-amber-200/[0.045] p-3 text-sm leading-relaxed text-white/75"><strong className="text-amber-100">Asimtot tangen bukan titik solusi.</strong><p className="mt-2">Pada <InlineMath math="90^\circ+180^\circ k" />, fungsi tangen tidak ada. Pisahkan cabang grafik dan jangan pernah menutup interval pada asimtot.</p></div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-white/55">Titik batas dari persamaan hanya kandidat. Uji apakah tandanya ketat atau inklusif, apakah fungsi terdefinisi, dan apakah titiknya masih berada di interval yang diminta.</p>
      </Panel>

      <Panel className="border-amber-200/20 bg-gradient-to-br from-[#182448] to-[#292344]">
        <SectionTitle index="06" title="Rangkuman dan cek mandiri" icon={<Check className="h-5 w-5" />} />
        <ul className="space-y-2 text-sm leading-relaxed text-white/75">
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Solusi adalah seluruh interval sudut yang membuat pertidaksamaan benar.</li>
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Sinus dan cosinus berperiode 360°; tangen berperiode 180°.</li>
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Tanda ketat membuang titik kesamaan; tanda inklusif memasukkannya jika fungsi terdefinisi.</li>
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Untuk sudut linear di dalam fungsi, ubah interval sudut dalam, selesaikan, lalu transformasikan balik.</li>
        </ul>
        <div className="mt-5 rounded-2xl border border-amber-100/15 bg-amber-200/[0.06] p-4">
          <h3 className="font-display text-sm font-black text-amber-100">Cek mandiri</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/75">Tanpa melihat contoh: tentukan himpunan penyelesaian <InlineMath math="\cos x>0" /> pada <InlineMath math="0^\circ\le x\le360^\circ" />. Apakah 90° dan 270° ikut?</p>
          <details className="mt-3 rounded-xl border border-white/10 bg-[#09122d]/60 p-3 text-sm text-white/75">
            <summary data-testid="summary-self-check" className="cursor-pointer font-bold text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">Tampilkan pembahasan</summary>
            <p data-testid="answer-self-check" className="mt-3 leading-relaxed">Cosinus positif di kuadran I dan IV. Batas 90° dan 270° memiliki cosinus 0, jadi tidak ikut: <strong className="text-emerald-100"><InlineMath math="[0^\circ,90^\circ)\cup(270^\circ,360^\circ]" />.</strong></p>
          </details>
        </div>
        <p className="mt-4 text-center font-display text-sm font-bold text-cyan-100">Tandai batasnya, uji wilayahnya, lalu percaya pada pemeriksaanmu.</p>
      </Panel>
    </main>
  </div>
);

export default SmaPertidaksamaanTrigonometriPage;
