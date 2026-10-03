import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Compass,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Waypoints,
} from "lucide-react";
import { BlockMath, InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

type Operation = "add" | "subtract";
type DiagramMethod = "triangle" | "parallelogram";

const InlineMath = ({ math }: { math: string }) => <KaTeXInlineMath math={math} />;

const Formula = ({ math, label }: { math: string; label?: string }) => (
  <div className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/90 px-4 py-3 text-center text-cyan-100 sm:px-6">
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

const DynamicVectorDiagram = ({ ax, ay, bx, by, operation, method }: {
  ax: number; ay: number; bx: number; by: number; operation: Operation; method: DiagramMethod;
}) => {
  const sign = operation === "add" ? 1 : -1;
  const vx = bx * sign;
  const vy = by * sign;
  const scale = 34;
  const ox = 250;
  const oy = 226;
  const point = (x: number, y: number) => `${ox + x * scale},${oy - y * scale}`;
  const aEnd = point(ax, ay);
  const bEnd = point(vx, vy);
  const result = point(ax + vx, ay + vy);
  const translatedEnd = point(ax + vx, ay + vy);

  return (
    <svg viewBox="0 0 520 310" role="img"
      aria-label={`Diagram ${operation === "add" ? "penjumlahan" : "pengurangan"} vektor. Vektor a dari pangkal ke (${ax}, ${ay}), vektor ${operation === "add" ? "b" : "minus b"} menuju resultan (${ax + vx}, ${ay + vy}).`}
      className="block h-auto w-full">
      <defs>
        <pattern id="lab-grid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0V34" fill="none" stroke="#8292ac" strokeOpacity=".14" strokeWidth="1" /></pattern>
        <marker id="lab-arrow-a" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L9 4.5L0 9Z" fill="#67e8f9" /></marker>
        <marker id="lab-arrow-b" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L9 4.5L0 9Z" fill="#fbbf24" /></marker>
        <marker id="lab-arrow-r" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0L10 5L0 10Z" fill="#c4b5fd" /></marker>
      </defs>
      <rect x="16" y="14" width="488" height="280" rx="18" fill="url(#lab-grid)" />
      <line x1="36" y1={oy} x2="486" y2={oy} stroke="#a5b4c8" strokeOpacity=".45" />
      <line x1={ox} y1="34" x2={ox} y2="278" stroke="#a5b4c8" strokeOpacity=".45" />
      {method === "parallelogram" ? (
        <>
          <line className="vector-move" x1={aEnd.split(",")[0]} y1={aEnd.split(",")[1]} x2={translatedEnd.split(",")[0]} y2={translatedEnd.split(",")[1]} stroke="#fbbf24" strokeOpacity=".36" strokeDasharray="5 5" />
          <line className="vector-move" x1={bEnd.split(",")[0]} y1={bEnd.split(",")[1]} x2={translatedEnd.split(",")[0]} y2={translatedEnd.split(",")[1]} stroke="#67e8f9" strokeOpacity=".36" strokeDasharray="5 5" />
          <line className="vector-move" x1={ox} y1={oy} x2={aEnd.split(",")[0]} y2={aEnd.split(",")[1]} stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" markerEnd="url(#lab-arrow-a)" />
          <line className="vector-move" x1={ox} y1={oy} x2={bEnd.split(",")[0]} y2={bEnd.split(",")[1]} stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" markerEnd="url(#lab-arrow-b)" />
        </>
      ) : (
        <>
          <line className="vector-move" x1={ox} y1={oy} x2={aEnd.split(",")[0]} y2={aEnd.split(",")[1]} stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" markerEnd="url(#lab-arrow-a)" />
          <line className="vector-move" x1={aEnd.split(",")[0]} y1={aEnd.split(",")[1]} x2={translatedEnd.split(",")[0]} y2={translatedEnd.split(",")[1]} stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" markerEnd="url(#lab-arrow-b)" />
        </>
      )}
      <line className="vector-move" x1={ox} y1={oy} x2={result.split(",")[0]} y2={result.split(",")[1]} stroke="#c4b5fd" strokeWidth="5" strokeLinecap="round" markerEnd="url(#lab-arrow-r)" />
      <circle cx={ox} cy={oy} r="4" fill="#f8fafc" />
      <text x={ox + ax * scale / 2 - 6} y={oy - ay * scale / 2 - 10} fill="#a5f3fc" fontSize="15" fontWeight="700">a</text>
      <text x={method === "triangle" ? ox + ax * scale + vx * scale / 2 : ox + vx * scale / 2} y={oy - (method === "triangle" ? ay * scale + vy * scale / 2 : vy * scale / 2) - 10} fill="#fde68a" fontSize="15" fontWeight="700">{operation === "add" ? "b" : "−b"}</text>
      <text x={ox + (ax + vx) * scale / 2 + 8} y={oy - (ay + vy) * scale / 2 - 6} fill="#ddd6fe" fontSize="15" fontWeight="700">R</text>
      <text x="33" y="278" fill="#94a3b8" fontSize="11">pangkal bersama</text>
      <text x="485" y="219" fill="#94a3b8" fontSize="12">x</text>
      <text x={ox + 8} y="43" fill="#94a3b8" fontSize="12">y</text>
    </svg>
  );
};

const SmaOperasiVektorPage = () => {
  const [operation, setOperation] = useState<Operation>("add");
  const [method, setMethod] = useState<DiagramMethod>("triangle");
  const [ax, setAx] = useState(2);
  const [ay, setAy] = useState(1);
  const [bx, setBx] = useState(1);
  const [by, setBy] = useState(2);

  const result = useMemo(() => {
    const sign = operation === "add" ? 1 : -1;
    return [ax + sign * bx, ay + sign * by];
  }, [ax, ay, bx, by, operation]);
  const magnitude = Math.hypot(...result);

  const resetLab = () => {
    setOperation("add");
    setMethod("triangle");
    setAx(2); setAy(1); setBx(1); setBy(2);
  };

  const vectorInput = (label: string, value: number, update: (n: number) => void, testId: string, color: string) => (
    <label className="block rounded-2xl border border-white/10 bg-white/[.035] p-3" key={testId}>
      <span className={`flex items-center justify-between font-body text-xs font-bold ${color}`}>
        <span>{label}</span><output className="font-display text-sm tabular-nums" data-testid={`${testId}-value`}>{value}</output>
      </span>
      <input type="range" min="-3" max="3" step="1" value={value} onChange={(event) => update(Number(event.target.value))}
        aria-label={label} data-testid={testId}
        className="mt-3 h-2 w-full cursor-pointer accent-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200" />
      <span className="mt-1 flex justify-between font-body text-[10px] text-slate-500"><span>−3</span><span>0</span><span>3</span></span>
    </label>
  );

  return (
    <div className="animation-submaterial-route relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
      <Starfield />
      <style>{`
        @keyframes vector-entrance { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes vector-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .vector-entrance { animation: vector-entrance .65s cubic-bezier(.2,.7,.2,1) both; }
        .vector-float { animation: vector-float 4s ease-in-out infinite; }
        .vector-move { transition: x1 .32s cubic-bezier(.2,.7,.2,1), y1 .32s cubic-bezier(.2,.7,.2,1), x2 .32s cubic-bezier(.2,.7,.2,1), y2 .32s cubic-bezier(.2,.7,.2,1); }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
        }
      `}</style>
      <PageNavigation />
      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
        <header className="vector-entrance relative mb-12 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.96),rgba(16,22,43,.94)_58%,rgba(54,37,71,.85))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10" data-testid="lesson-hero">
          <div className="pointer-events-none absolute -right-12 -top-14 h-64 w-64 rounded-full border border-cyan-100/10" />
          <div className="pointer-events-none absolute right-4 top-12 h-40 w-40 rounded-full border border-amber-100/10" />
          <div className="relative grid items-center gap-7 md:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Matematika · SMA</span>
                <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">Buku Animasi Matematika</span>
              </div>
              <p className="mb-2 font-body text-xs font-bold uppercase tracking-[.24em] text-amber-200">Jumlah &amp; selisih vektor · vektor satuan</p>
              <h1 className="max-w-2xl font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="lesson-title">Gerakkan panah,<br /><span className="text-cyan-200">temukan resultan</span></h1>
              <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">Vektor bisa dijumlahkan seperti langkah perjalanan. Geser, sambung, lalu lihat ke mana resultannya menunjuk.</p>
              <div className="mt-6 flex items-center gap-2 text-sm text-amber-100"><Sparkles className="h-4 w-4" aria-hidden="true" /><span>Tujuan hari ini: mengubah operasi vektor menjadi gerak yang terlihat.</span></div>
            </div>
            <div className="vector-float relative mx-auto w-full max-w-md" aria-hidden="true">
              <svg viewBox="0 0 400 240" className="w-full">
                <defs><marker id="hero-tip-cyan" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto"><path d="M0 0L12 6L0 12Z" fill="#67e8f9" /></marker><marker id="hero-tip-gold" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto"><path d="M0 0L12 6L0 12Z" fill="#fbbf24" /></marker><marker id="hero-tip-lilac" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto"><path d="M0 0L12 6L0 12Z" fill="#c4b5fd" /></marker></defs>
                <circle cx="198" cy="122" r="88" fill="none" stroke="#a5f3fc" strokeOpacity=".12" strokeDasharray="3 8" />
                <path d="M70 174L192 110" stroke="#67e8f9" strokeWidth="6" strokeLinecap="round" markerEnd="url(#hero-tip-cyan)" />
                <path d="M192 110L282 154" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" markerEnd="url(#hero-tip-gold)" />
                <path d="M70 174L282 154" stroke="#c4b5fd" strokeWidth="5" strokeLinecap="round" markerEnd="url(#hero-tip-lilac)" />
                <circle cx="70" cy="174" r="5" fill="#fff" />
                <text x="113" y="120" fill="#a5f3fc" fontSize="17" fontWeight="700">a</text><text x="243" y="111" fill="#fde68a" fontSize="17" fontWeight="700">b</text><text x="175" y="190" fill="#ddd6fe" fontSize="17" fontWeight="700">a + b</text>
              </svg>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_250px]">
          <div className="min-w-0 space-y-12">
            <section id="cara-grafis" data-testid="graphical-methods-section">
              <SectionTitle index="01" kicker="Bangun dari gambar" title="Dua panah, satu resultan" description="Jumlah vektor adalah perpindahan total. Panjang dan arah tiap panah tetap; yang berubah hanya posisi saat kita menyusunnya." />
              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-3xl border border-cyan-200/20 bg-[linear-gradient(145deg,rgba(13,92,112,.2),rgba(18,27,43,.86))] p-5 sm:p-6" data-testid="triangle-method">
                  <div className="mb-4 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-200/10 text-cyan-200"><ArrowRight className="h-5 w-5" /></span><h3 className="font-display text-xl font-extrabold text-cyan-100">Metode segitiga</h3></div>
                  <p className="font-body text-sm leading-relaxed text-slate-300">Pindahkan pangkal <InlineMath math="\vec b" /> ke ujung <InlineMath math="\vec a" /> tanpa mengubah arah atau panjangnya. Resultan ditarik dari pangkal <InlineMath math="\vec a" /> ke ujung <InlineMath math="\vec b" /> yang baru.</p>
                  <div className="mt-4"><Formula math="\vec a+\vec b=\overrightarrow{P Q}+\overrightarrow{Q R}=\overrightarrow{P R}" /></div>
                  <p className="mt-3 font-body text-xs leading-relaxed text-cyan-50/70">Ingat: ujung ke pangkal, lalu hubungkan titik awal ke titik akhir.</p>
                </article>
                <article className="rounded-3xl border border-amber-200/20 bg-[linear-gradient(145deg,rgba(120,82,20,.17),rgba(18,27,43,.86))] p-5 sm:p-6" data-testid="parallelogram-method">
                  <div className="mb-4 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-200/10 text-amber-200"><Waypoints className="h-5 w-5" /></span><h3 className="font-display text-xl font-extrabold text-amber-100">Metode jajargenjang</h3></div>
                  <p className="font-body text-sm leading-relaxed text-slate-300">Letakkan pangkal <InlineMath math="\vec a" /> dan <InlineMath math="\vec b" /> di titik yang sama. Salin masing-masing vektor dari ujung vektor yang lain hingga terbentuk jajargenjang.</p>
                  <div className="mt-4"><Formula math="\vec R=\vec a+\vec b" label="Diagonal dari pangkal bersama" /></div>
                  <p className="mt-3 font-body text-xs leading-relaxed text-amber-50/70">Diagonal yang berawal di pangkal bersama adalah resultannya.</p>
                </article>
              </div>
            </section>

            <section id="laboratorium-vektor" className="scroll-mt-6" data-testid="vector-lab-section">
              <SectionTitle index="02" kicker="Laboratorium vektor" title="Coba gerakkan sendiri" description="Pilih operasi, lalu ubah komponen dengan tombol panah pada papan ketik atau geser kontrolnya. Perhatikan perubahan arah resultan." />
              <div className="overflow-hidden rounded-[2rem] border border-violet-200/20 bg-[linear-gradient(145deg,rgba(27,28,57,.96),rgba(10,20,37,.97))] shadow-xl shadow-black/20">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl border border-violet-100/20 bg-violet-200/[.08] text-violet-100"><Compass className="h-5 w-5" /></span><div><p className="font-body text-xs font-black uppercase tracking-[.18em] text-violet-100/70">Meja eksperimen</p><p className="font-display text-lg font-extrabold text-white">Ubah vektor, amati hasil</p></div></div>
                  <button type="button" onClick={resetLab} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 font-body text-xs font-bold text-slate-200 transition hover:bg-white/[.09] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-200" data-testid="reset-vector-lab"><RotateCcw className="h-3.5 w-3.5" />Atur ulang</button>
                </div>
                <div className="grid lg:grid-cols-[1fr_280px]">
                  <div className="min-w-0 p-3 sm:p-5">
                    <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Pilih operasi vektor">
                      <button type="button" onClick={() => setOperation("add")} aria-pressed={operation === "add"} data-testid="operation-add" className={`rounded-full border px-4 py-2 font-body text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 ${operation === "add" ? "border-cyan-200/50 bg-cyan-300/15 text-cyan-50" : "border-white/10 bg-white/[.035] text-slate-300 hover:border-cyan-100/30"}`}>Penjumlahan · a + b</button>
                      <button type="button" onClick={() => setOperation("subtract")} aria-pressed={operation === "subtract"} data-testid="operation-subtract" className={`rounded-full border px-4 py-2 font-body text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 ${operation === "subtract" ? "border-amber-200/50 bg-amber-300/15 text-amber-50" : "border-white/10 bg-white/[.035] text-slate-300 hover:border-amber-100/30"}`}>Pengurangan · a − b</button>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#081426]/90 p-2 sm:p-3">
                      <DynamicVectorDiagram ax={ax} ay={ay} bx={bx} by={by} operation={operation} method={method} />
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih cara menggambar">
                        <button type="button" onClick={() => setMethod("triangle")} aria-pressed={method === "triangle"} data-testid="diagram-triangle" className={`rounded-lg px-3 py-2 font-body text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 ${method === "triangle" ? "bg-cyan-200/15 text-cyan-100" : "text-slate-400 hover:bg-white/[.05] hover:text-slate-200"}`}>Susun segitiga</button>
                        <button type="button" onClick={() => setMethod("parallelogram")} aria-pressed={method === "parallelogram"} data-testid="diagram-parallelogram" className={`rounded-lg px-3 py-2 font-body text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 ${method === "parallelogram" ? "bg-cyan-200/15 text-cyan-100" : "text-slate-400 hover:bg-white/[.05] hover:text-slate-200"}`}>Bentuk jajargenjang</button>
                      </div>
                      <p className="font-body text-[11px] text-slate-400">Gunakan Tab, lalu tombol panah untuk menggeser nilai.</p>
                    </div>
                  </div>
                  <aside className="border-t border-white/10 bg-black/10 p-4 sm:p-5 lg:border-l lg:border-t-0" aria-label="Pengaturan dan hasil eksperimen">
                    <p className="mb-3 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-400">Komponen (bilangan bulat)</p>
                    <div className="grid grid-cols-2 gap-2">
                      {vectorInput("aₓ", ax, setAx, "input-ax", "text-cyan-100")}
                      {vectorInput("aᵧ", ay, setAy, "input-ay", "text-cyan-100")}
                      {vectorInput("bₓ", bx, setBx, "input-bx", "text-amber-100")}
                      {vectorInput("bᵧ", by, setBy, "input-by", "text-amber-100")}
                    </div>
                    <div className="mt-4 rounded-2xl border border-violet-200/20 bg-violet-300/[.07] p-4" data-testid="vector-lab-feedback">
                      <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.18em] text-violet-100/70">Resultan saat ini</p>
                      <p className="font-display text-lg font-extrabold text-white" data-testid="vector-result-components">
                        {operation === "add" ? "a + b" : "a − b"} = ({result[0]}, {result[1]})
                      </p>
                      <p className="mt-1 font-body text-sm text-violet-100/85">Panjang <InlineMath math="|\vec R|" /> = <strong data-testid="vector-result-magnitude">{Number.isInteger(magnitude) ? magnitude : magnitude.toFixed(2)}</strong></p>
                      <p className="mt-3 text-xs leading-relaxed text-slate-300" role="status" aria-live="polite" data-testid="vector-lab-hint">
                        {magnitude === 0 ? "Resultan nol: kedua vektor saling meniadakan." : `Komponen resultan adalah (${result[0]}, ${result[1]}). Panah R selalu berawal di pangkal bersama.`}
                      </p>
                    </div>
                    <p className="mt-3 font-body text-[11px] leading-relaxed text-slate-500">Diagram menunjukkan bidang dua dimensi. Prinsip komponen yang sama berlaku di ruang tiga dimensi.</p>
                  </aside>
                </div>
              </div>
            </section>

            <section id="pengurangan" data-testid="subtraction-section">
              <SectionTitle index="03" kicker="Kurangi dengan membalik" title="Pengurangan adalah penjumlahan vektor lawan" description="Untuk mengurangi b, balik arah b terlebih dahulu. Setelah itu, susun a dengan vektor lawan −b seperti penjumlahan biasa." />
              <div className="grid items-center gap-5 rounded-3xl border border-amber-200/15 bg-[linear-gradient(130deg,rgba(82,57,18,.14),rgba(14,25,42,.94)_58%)] p-5 sm:p-6 md:grid-cols-[1.1fr_.9fr]">
                <div className="space-y-4">
                  <Formula math="\vec a-\vec b=\vec a+(-\vec b)" label="Balik arah, bukan panjang" />
                  <p className="font-body text-sm leading-relaxed text-slate-300">Vektor <InlineMath math="-\vec b" /> memiliki panjang yang sama dengan <InlineMath math="\vec b" />, tetapi arahnya berlawanan. Karena itu, ujung <InlineMath math="-\vec b" /> menghadap ke sisi sebaliknya.</p>
                  <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.06] p-4 text-sm leading-relaxed text-amber-50/90"><strong className="text-amber-100">Cek arah:</strong> saat <InlineMath math="\vec b" /> menghadap kanan-atas, <InlineMath math="-\vec b" /> menghadap kiri-bawah.</div>
                </div>
                <svg viewBox="0 0 360 220" role="img" aria-label="Vektor b dan vektor lawannya minus b memiliki panjang sama tetapi arah berlawanan" className="mx-auto block h-auto w-full max-w-sm">
                  <defs><marker id="minus-b-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#fbbf24" /></marker><marker id="b-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#67e8f9" /></marker></defs>
                  <circle cx="180" cy="110" r="75" fill="none" stroke="#cbd5e1" strokeOpacity=".12" strokeDasharray="3 8" />
                  <line x1="180" y1="110" x2="291" y2="45" stroke="#67e8f9" strokeWidth="5" strokeLinecap="round" markerEnd="url(#b-arrow)" />
                  <line x1="180" y1="110" x2="69" y2="175" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" markerEnd="url(#minus-b-arrow)" />
                  <circle cx="180" cy="110" r="5" fill="#fff" />
                  <text x="262" y="39" fill="#a5f3fc" fontSize="17" fontWeight="700">b</text><text x="52" y="195" fill="#fde68a" fontSize="17" fontWeight="700">−b</text>
                  <text x="146" y="205" fill="#94a3b8" fontSize="11">panjang sama · arah berlawanan</text>
                </svg>
              </div>
            </section>

            <section id="komponen" data-testid="component-operations-section">
              <SectionTitle index="04" kicker="Hitung per sumbu" title="Operasi komponen demi komponen" description="Jumlahkan atau kurangkan koordinat yang sejenis. Komponen x bertemu x, y bertemu y, dan z bertemu z." />
              <div className="grid gap-4 md:grid-cols-[.95fr_1.05fr]">
                <article className="rounded-3xl border border-cyan-200/15 bg-[#101b2d]/85 p-5 sm:p-6">
                  <p className="mb-3 font-body text-xs font-black uppercase tracking-[.17em] text-cyan-100">Aturan umum di ruang 3D</p>
                  <Formula math="\vec a=(a_x,a_y,a_z),\quad \vec b=(b_x,b_y,b_z)" />
                  <div className="mt-3"><Formula math="\vec a\pm\vec b=(a_x\pm b_x,\ a_y\pm b_y,\ a_z\pm b_z)" /></div>
                  <p className="mt-3 font-body text-sm leading-relaxed text-slate-300">Tanda operasi berlaku pada setiap pasangan komponen. Jangan mencampur sumbu.</p>
                </article>
                <article className="overflow-hidden rounded-3xl border border-violet-200/15 bg-[linear-gradient(145deg,rgba(49,37,83,.19),rgba(16,27,45,.9))]" data-testid="worked-3d-example">
                  <div className="border-b border-white/10 px-5 py-4"><p className="font-body text-xs font-black uppercase tracking-[.18em] text-violet-100">Contoh ruang tiga dimensi</p><p className="mt-1 font-body text-sm text-slate-300"><InlineMath math="\vec a=(2,-3,5)" /> dan <InlineMath math="\vec b=(-1,4,-2)" /></p></div>
                  <div className="space-y-3 p-4 sm:p-5">
                    <div><p className="mb-2 font-body text-[10px] font-bold uppercase tracking-wider text-cyan-100">Penjumlahan</p><Formula math="\vec a+\vec b=(2+(-1),\ -3+4,\ 5+(-2))=(1,1,3)" /></div>
                    <div><p className="mb-2 font-body text-[10px] font-bold uppercase tracking-wider text-amber-100">Pengurangan</p><Formula math="\vec a-\vec b=(2-(-1),\ -3-4,\ 5-(-2))=(3,-7,7)" /></div>
                    <p className="rounded-xl bg-white/[.04] p-3 font-body text-xs leading-relaxed text-slate-300">Tanda negatif penting: mengurangkan bilangan negatif sama dengan menambahkan bilangan positif.</p>
                  </div>
                </article>
              </div>
            </section>

            <section id="besar-resultan" data-testid="resultant-magnitude-section">
              <SectionTitle index="05" kicker="Besar resultan" title="Sudut ikut menentukan panjang" description="Jika besar dua vektor dan sudut apitnya diketahui, gunakan hukum cosinus. Sudut θ diukur di antara kedua vektor saat pangkalnya berimpit." />
              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[.04] p-5 sm:p-6">
                  <p className="mb-3 font-body text-xs font-black uppercase tracking-[.17em] text-cyan-100">Besar penjumlahan</p>
                  <Formula math="|\vec a+\vec b|=\sqrt{|\vec a|^2+|\vec b|^2+2|\vec a||\vec b|\cos\theta}" />
                  <p className="mt-4 font-body text-sm leading-relaxed text-slate-300">Saat <InlineMath math="\theta=0^\circ" />, keduanya searah dan resultan paling panjang, yaitu <InlineMath math="|\vec a|+|\vec b|" />.</p>
                </article>
                <article className="rounded-3xl border border-amber-200/15 bg-amber-200/[.04] p-5 sm:p-6">
                  <p className="mb-3 font-body text-xs font-black uppercase tracking-[.17em] text-amber-100">Besar pengurangan</p>
                  <Formula math="|\vec a-\vec b|=\sqrt{|\vec a|^2+|\vec b|^2-2|\vec a||\vec b|\cos\theta}" />
                  <p className="mt-4 font-body text-sm leading-relaxed text-slate-300">Saat <InlineMath math="\theta=0^\circ" />, kedua vektor searah sehingga besar selisihnya <InlineMath math="\bigl||\vec a|-|\vec b|\bigr|" />.</p>
                </article>
              </div>
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-violet-200/15 bg-violet-300/[.06] p-4 text-sm leading-relaxed text-violet-50/90"><Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-violet-200" /><p><strong className="text-violet-100">Perhatikan tandanya:</strong> plus pada rumus penjumlahan dan minus pada rumus pengurangan berasal dari hukum cosinus, bukan dari panjang yang bernilai negatif.</p></div>
            </section>

            <section id="vektor-satuan" data-testid="unit-vector-section">
              <SectionTitle index="06" kicker="Arah dengan panjang satu" title="Vektor satuan: penunjuk arah" description="Vektor satuan merapikan informasi arah. Kita mengambil vektor, lalu membaginya dengan besar vektor tersebut." />
              <div className="grid items-center gap-5 rounded-3xl border border-violet-200/15 bg-[linear-gradient(130deg,rgba(49,37,83,.18),rgba(14,25,42,.94)_58%)] p-5 sm:p-6 md:grid-cols-[.9fr_1.1fr]">
                <div>
                  <Formula math="\hat{\mathbf u}=\frac{\vec a}{|\vec a|},\quad \vec a\ne\vec 0,\qquad |\hat{\mathbf u}|=1" label="Definisi vektor satuan" />
                  <p className="mt-4 font-body text-sm leading-relaxed text-slate-300">Membagi semua komponen dengan panjangnya membuat besar vektor menjadi tepat satu, sementara arahnya tetap sama.</p>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/[.035] p-4">
                    <p className="mb-2 font-body text-xs font-bold uppercase tracking-[.16em] text-violet-100">Arah dasar Kartesius</p>
                    <Formula math="\hat{\mathbf i}=(1,0,0),\quad \hat{\mathbf j}=(0,1,0),\quad \hat{\mathbf k}=(0,0,1)" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4">
                    <p className="mb-3 font-body text-xs font-black uppercase tracking-[.17em] text-cyan-100">Uraikan vektor pada tiga arah</p>
                    <Formula math="\vec A=A_x\hat{\mathbf i}+A_y\hat{\mathbf j}+A_z\hat{\mathbf k}" />
                    <p className="mt-3 font-body text-xs leading-relaxed text-slate-400">Setiap koefisien menyatakan seberapa jauh vektor bergerak pada sumbu x, y, dan z.</p>
                  </div>
                  <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.05] p-4">
                    <p className="mb-2 font-body text-xs font-black uppercase tracking-[.17em] text-amber-100">Contoh singkat</p>
                    <p className="font-body text-sm leading-relaxed text-slate-300">Jika <InlineMath math="\vec A=(2, -3, 6)" />, maka <InlineMath math="|\vec A|=7" /> dan vektor satuannya <InlineMath math="\hat{\mathbf A}=(\frac27,-\frac37,\frac67)" />. Panjangnya satu, arahnya tetap searah <InlineMath math="\vec A" />.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-cyan-200/20 bg-[linear-gradient(135deg,rgba(9,79,100,.18),rgba(16,24,43,.94))] p-5 sm:p-6" data-testid="lesson-takeaways">
              <div className="mb-4 flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-100/20 bg-cyan-100/[.08] text-cyan-100"><Check className="h-5 w-5" /></span><div><p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-200/65">Bekal setelah belajar</p><h2 className="mt-1 font-display text-xl font-extrabold text-white">Tiga gerakan inti operasi vektor</h2></div></div>
              <ol className="grid gap-3 sm:grid-cols-3">
                <li className="rounded-2xl border border-white/10 bg-[#0b1424]/70 p-4"><span className="font-display text-lg font-black text-cyan-200">01</span><p className="mt-2 font-body text-sm leading-relaxed text-slate-300">Jumlahkan secara grafis dengan <strong className="text-white">ujung-ke-pangkal</strong> atau jajargenjang.</p></li>
                <li className="rounded-2xl border border-white/10 bg-[#0b1424]/70 p-4"><span className="font-display text-lg font-black text-amber-200">02</span><p className="mt-2 font-body text-sm leading-relaxed text-slate-300">Kurangkan dengan <strong className="text-white">membalik arah</strong> vektor kedua.</p></li>
                <li className="rounded-2xl border border-white/10 bg-[#0b1424]/70 p-4"><span className="font-display text-lg font-black text-violet-200">03</span><p className="mt-2 font-body text-sm leading-relaxed text-slate-300">Hitung komponen sejenis; gunakan sudut untuk mencari besar resultan.</p></li>
              </ol>
            </section>
          </div>

          <aside className="hidden lg:block" aria-label="Ringkasan navigasi materi">
            <div className="sticky top-6 rounded-2xl border border-white/10 bg-[#0d1728]/90 p-4 backdrop-blur" data-testid="lesson-outline">
              <p className="mb-4 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-400">Peta materi</p>
              <ol className="space-y-3 font-body text-xs text-slate-300">
                {[["Metode grafis", "cara-grafis"], ["Laboratorium", "laboratorium-vektor"], ["Pengurangan", "pengurangan"], ["Operasi komponen", "komponen"], ["Besar resultan", "besar-resultan"], ["Vektor satuan", "vektor-satuan"]].map(([item, target], index) => (
                  <li key={target}><a href={`#${target}`} data-testid={`link-lesson-section-${index + 1}`} className="flex items-center gap-2 rounded-md transition-colors hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"><span className="grid h-5 w-5 place-items-center rounded-md bg-white/[.06] text-[10px] font-bold text-cyan-100/80">{String(index + 1).padStart(2, "0")}</span>{item}</a></li>
                ))}
              </ol>
              <div className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-400"><span className="mb-2 flex items-center gap-2 font-bold text-amber-100"><ChevronDown className="h-3.5 w-3.5" />Tips belajar</span>Untuk pengurangan, gambar dulu <InlineMath math="-\vec b" />. Setelah itu, ikuti aturan penjumlahan biasa.</div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SmaOperasiVektorPage;