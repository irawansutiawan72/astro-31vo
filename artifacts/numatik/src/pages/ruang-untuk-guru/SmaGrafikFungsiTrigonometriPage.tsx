import { useMemo, useState, type ReactNode } from "react";
import {
  Activity,
  BookOpen,
  Check,
  Lightbulb,
  MoveHorizontal,
  RotateCcw,
  Scaling,
  Waves,
} from "lucide-react";
import { InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

type FunctionKind = "sin" | "cos" | "tan";
type Settings = { a: number; k: number; h: number; d: number };

const fmt = (value: number) => {
  if (Math.abs(value) < 0.005) return "0";
  return Number(value.toFixed(2)).toString().replace("-", "−");
};

const InlineMath = ({ math }: { math: string }) => (
  <KaTeXInlineMath math={math.replace(/\\\\/g, "\\")} />
);

const Panel = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <section className={`rounded-[1.6rem] border border-white/10 bg-[#121a37]/90 p-4 shadow-xl shadow-indigo-950/20 sm:p-6 ${className}`}>
    {children}
  </section>
);

const SectionTitle = ({
  index,
  title,
  icon,
}: {
  index: string;
  title: string;
  icon: ReactNode;
}) => (
  <div className="mb-4 flex items-start gap-3">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-200">{icon}</span>
    <div className="min-w-0">
      <p className="font-body text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200/70">Bagian {index}</p>
      <h2 className="font-display text-lg font-extrabold leading-tight text-white sm:text-xl">{title}</h2>
    </div>
  </div>
);

const Formula = ({ children }: { children: string }) => (
  <div className="my-3 rounded-2xl border border-cyan-200/15 bg-[#09122d] px-3 py-3 text-center text-cyan-100 [overflow-wrap:anywhere] [&_.katex]:text-[0.92em] sm:px-4 sm:[&_.katex]:text-[1.05em]">
    <InlineMath math={children} />
  </div>
);

function equation(kind: FunctionKind, { a, k, h, d }: Settings) {
  const shift = h === 0 ? "x" : h > 0 ? `(x-${fmt(h)})` : `(x+${fmt(-h)})`;
  const inside = k === 1 ? shift : `${fmt(k)}${shift}`;
  const base = kind === "tan" ? "\\tan" : kind === "cos" ? "\\cos" : "\\sin";
  const lead = a === 1 ? "" : a === -1 ? "-" : fmt(a);
  const outside = d === 0 ? "" : d > 0 ? `+${fmt(d)}` : fmt(d);
  return `y=${lead}${base}\\left(${inside}\\right)${outside}`;
}

function GraphExplorer() {
  const [kind, setKind] = useState<FunctionKind>("sin");
  const [settings, setSettings] = useState<Settings>({ a: 1, k: 1, h: 0, d: 0 });
  const bounds = { left: 42, right: 340, top: 20, bottom: 224 };
  const xMin = -2 * Math.PI;
  const xMax = 2 * Math.PI;
  const yMin = -4;
  const yMax = 4;
  const xToSvg = (x: number) => bounds.left + ((x - xMin) / (xMax - xMin)) * (bounds.right - bounds.left);
  const yToSvg = (y: number) => bounds.bottom - ((y - yMin) / (yMax - yMin)) * (bounds.bottom - bounds.top);
  const curve = useMemo(() => {
    const paths: string[] = [];
    let segment: string[] = [];
    const samples = 800;
    for (let i = 0; i <= samples; i += 1) {
      const x = xMin + (i / samples) * (xMax - xMin);
      const arg = settings.k * (x - settings.h);
      const raw = kind === "sin" ? Math.sin(arg) : kind === "cos" ? Math.cos(arg) : Math.tan(arg);
      const y = settings.a * raw + settings.d;
      if (!Number.isFinite(y) || Math.abs(y) > 8) {
        if (segment.length > 1) paths.push(segment.join(" "));
        segment = [];
        continue;
      }
      const point = `${segment.length === 0 ? "M" : "L"} ${xToSvg(x).toFixed(2)} ${yToSvg(y).toFixed(2)}`;
      segment.push(point);
    }
    if (segment.length > 1) paths.push(segment.join(" "));
    return paths;
  // The coordinates are pure functions of the settings and fixed plot bounds.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, settings.a, settings.d, settings.h, settings.k]);
  const asymptotes = useMemo(() => {
    if (kind !== "tan") return [];
    const first = Math.ceil((settings.k * (xMin - settings.h) - Math.PI / 2) / Math.PI);
    const last = Math.floor((settings.k * (xMax - settings.h) - Math.PI / 2) / Math.PI);
    const values: number[] = [];
    for (let n = first; n <= last; n += 1) {
      const x = settings.h + (Math.PI / 2 + n * Math.PI) / settings.k;
      if (x > xMin && x < xMax) values.push(x);
    }
    return values;
  }, [kind, settings.h, settings.k]);
  const period = kind === "tan" ? Math.PI / Math.abs(settings.k) : (2 * Math.PI) / Math.abs(settings.k);
  const amplitude = kind === "tan" ? null : Math.abs(settings.a);
  const update = (key: keyof Settings, value: number) =>
    setSettings((current) => ({ ...current, [key]: value }));
  const ticks = [-2 * Math.PI, -Math.PI, 0, Math.PI, 2 * Math.PI];
  const tickText = ["−2π", "−π", "0", "π", "2π"];

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="min-w-0 rounded-2xl border border-cyan-200/15 bg-[#08112b] p-2 sm:p-3">
        <svg viewBox="0 0 360 270" role="img"
          aria-label={`Grafik fungsi ${kind}; faktor skala a ${fmt(settings.a)}, frekuensi k ${fmt(settings.k)}, pergeseran horizontal h ${fmt(settings.h)} radian, dan pergeseran vertikal d ${fmt(settings.d)}`}
          className="block h-auto w-full" data-testid="visual-trig-function-graph">
          <defs><clipPath id="plot-clip"><rect x={bounds.left} y={bounds.top} width={bounds.right - bounds.left} height={bounds.bottom - bounds.top} /></clipPath></defs>
          {[-3, -2, -1, 0, 1, 2, 3].map((y) => (
            <g key={`gy-${y}`}>
              <line x1={bounds.left} x2={bounds.right} y1={yToSvg(y)} y2={yToSvg(y)} stroke={y === 0 ? "#7183a4" : "#273653"} strokeWidth={y === 0 ? 1.2 : 0.7} />
              <text x={bounds.left - 7} y={yToSvg(y) + 3} textAnchor="end" fill="#96a7c3" fontSize="9">{y}</text>
            </g>
          ))}
          {ticks.map((x, i) => (
            <g key={`gx-${i}`}>
              <line x1={xToSvg(x)} x2={xToSvg(x)} y1={bounds.top} y2={bounds.bottom} stroke={x === 0 ? "#7183a4" : "#273653"} strokeWidth={x === 0 ? 1.2 : 0.7} />
              <text x={xToSvg(x)} y={bounds.bottom + 17} textAnchor="middle" fill="#96a7c3" fontSize="9">{tickText[i]}</text>
            </g>
          ))}
          {settings.d !== 0 && <line x1={bounds.left} x2={bounds.right} y1={yToSvg(settings.d)} y2={yToSvg(settings.d)} stroke="#fbbf24" strokeDasharray="4 4" strokeWidth="1.5" />}
          <g clipPath="url(#plot-clip)">
            {asymptotes.map((x, index) => <line key={`asym-${index}`} x1={xToSvg(x)} x2={xToSvg(x)} y1={bounds.top} y2={bounds.bottom} stroke="#fb7185" strokeWidth="1.5" strokeDasharray="5 5" />)}
            {curve.map((path, index) => <path key={`curve-${index}`} d={path} fill="none" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />)}
          </g>
          <text x={bounds.right - 2} y={bounds.top - 5} textAnchor="end" fill="#a5f3fc" fontSize="10" fontWeight="700">{kind === "tan" ? "TANGEN" : kind === "cos" ? "COSINUS" : "SINUS"}</text>
          <text x={bounds.right - 3} y={yToSvg(settings.d) - 5} textAnchor="end" fill="#fcd34d" fontSize="9">garis tengah d={fmt(settings.d)}</text>
          <text x={(bounds.left + bounds.right) / 2} y="263" textAnchor="middle" fill="#94a3b8" fontSize="9">x (radian)</text>
        </svg>
        <div className="mt-2 rounded-xl bg-white/[0.04] p-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-100/55">Persamaan saat ini</p>
          <div className="mt-1 [overflow-wrap:anywhere] text-cyan-100"><InlineMath math={equation(kind, settings)} /></div>
        </div>
      </div>
      <div className="min-w-0 space-y-3">
        <div>
          <label htmlFor="graph-function" className="mb-1 block text-xs font-bold text-white/75">Pilih fungsi dasar</label>
          <select id="graph-function" data-testid="select-graph-function" value={kind}
            onChange={(event) => setKind(event.target.value as FunctionKind)}
            className="w-full rounded-xl border border-cyan-100/20 bg-[#09122d] px-3 py-2.5 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <option value="sin">sinus · sin</option><option value="cos">cosinus · cos</option><option value="tan">tangen · tan</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="rounded-xl border border-cyan-100/10 bg-white/[0.035] p-3 text-xs font-bold text-white/75">
            <span className="block">Skala a</span>
            <select aria-label="Faktor skala a" data-testid="select-graph-a" value={settings.a} onChange={(e) => update("a", Number(e.target.value))}
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#09122d] px-2 py-2 text-sm text-cyan-100 focus-visible:ring-2 focus-visible:ring-cyan-300">
              {[-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2].map((v) => <option key={v} value={v}>{fmt(v)}</option>)}
            </select>
          </label>
          <label className="rounded-xl border border-cyan-100/10 bg-white/[0.035] p-3 text-xs font-bold text-white/75">
            <span className="block">Frekuensi k</span>
            <select aria-label="Faktor frekuensi k" data-testid="select-graph-k" value={settings.k} onChange={(e) => update("k", Number(e.target.value))}
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#09122d] px-2 py-2 text-sm text-cyan-100 focus-visible:ring-2 focus-visible:ring-cyan-300">
              {[0.5, 0.75, 1, 1.5, 2, 3].map((v) => <option key={v} value={v}>{fmt(v)}</option>)}
            </select>
          </label>
          <label className="rounded-xl border border-cyan-100/10 bg-white/[0.035] p-3 text-xs font-bold text-white/75">
            <span className="block">Geser horizontal h</span>
            <select aria-label="Pergeseran horizontal h dalam radian" data-testid="select-graph-h" value={settings.h} onChange={(e) => update("h", Number(e.target.value))}
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#09122d] px-2 py-2 text-sm text-cyan-100 focus-visible:ring-2 focus-visible:ring-cyan-300">
              {[-Math.PI, -Math.PI / 2, 0, Math.PI / 2, Math.PI].map((v) => <option key={v} value={v}>{v === 0 ? "0" : `${v < 0 ? "−" : ""}${Math.abs(v) === Math.PI ? "π" : "π/2"}`}</option>)}
            </select>
          </label>
          <label className="rounded-xl border border-cyan-100/10 bg-white/[0.035] p-3 text-xs font-bold text-white/75">
            <span className="block">Geser vertikal d</span>
            <select aria-label="Pergeseran vertikal d" data-testid="select-graph-d" value={settings.d} onChange={(e) => update("d", Number(e.target.value))}
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#09122d] px-2 py-2 text-sm text-cyan-100 focus-visible:ring-2 focus-visible:ring-cyan-300">
              {[-2, -1, 0, 1, 2].map((v) => <option key={v} value={v}>{fmt(v)}</option>)}
            </select>
          </label>
        </div>
        <div aria-live="polite" className="rounded-xl border border-amber-200/20 bg-amber-300/[0.07] p-3">
          <p className="text-[10px] font-black uppercase tracking-wider text-amber-100/65">Yang terlihat di grafik</p>
          <p className="mt-2 text-xs leading-relaxed text-white/80">Periode: <strong className="text-amber-100"><InlineMath math={kind === "tan" ? `\\frac{\\pi}{${fmt(settings.k)}}` : `\\frac{2\\pi}{${fmt(settings.k)}}`} /></strong> ≈ {fmt(period)} radian.</p>
          <p className="mt-1 text-xs leading-relaxed text-white/80">{amplitude === null ? "Tangen tidak memiliki amplitudo; kurvanya tak terbatas." : <>Amplitudo <strong className="text-amber-100">{fmt(amplitude)}</strong>; garis tengah <strong className="text-amber-100">y={fmt(settings.d)}</strong>.</>}</p>
          {kind === "tan" && <p className="mt-1 text-[11px] text-rose-200">Garis putus-putus merah muda menandai asimtot (tangen tak terdefinisi).</p>}
          {settings.a < 0 && <p className="mt-1 text-[11px] text-cyan-100">Nilai a negatif membalik grafik terhadap garis tengah.</p>}
        </div>
        <button type="button" data-testid="button-reset-graph" onClick={() => { setKind("sin"); setSettings({ a: 1, k: 1, h: 0, d: 0 }); }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-xs font-bold text-white/80 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
          <RotateCcw className="h-4 w-4" /> Kembalikan bentuk awal
        </button>
      </div>
    </div>
  );
}

const SmaGrafikFungsiTrigonometriPage = () => (
  <div className="relative min-h-screen overflow-x-hidden bg-[#080d22] text-white">
    <Starfield />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.19),_transparent_68%)]" />
    <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri" />
    <main className="relative z-10 mx-auto w-full max-w-5xl px-3 pb-16 pt-16 sm:px-5 sm:pt-20">
      <header className="relative mb-5 overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-gradient-to-br from-[#153b60] via-[#17254a] to-[#39244a] p-5 shadow-2xl shadow-indigo-950/40 sm:p-8 md:p-10">
        <div className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 rounded-full border-[22px] border-cyan-200/10" />
        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-100/25 bg-cyan-100/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100"><BookOpen className="h-3.5 w-3.5" /> Ruang untuk Guru · SMA</div>
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-amber-200/80">Trigonometri · Buku Animasi</p>
          <h1 className="mt-2 max-w-3xl font-display text-3xl font-black leading-[1.08] text-white sm:text-4xl md:text-5xl">Grafik fungsi trigonometri</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cyan-50/75 sm:text-base">Dari gelombang yang berulang sampai kurva tangen yang melonjak: baca pola, lalu ubah bentuknya dengan percaya diri.</p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-amber-100/20 bg-amber-200/10 px-3 py-2 text-xs font-semibold text-amber-100"><Activity className="h-4 w-4 shrink-0" /> Misi: temukan periode, garis tengah, dan transformasi grafik.</div>
        </div>
      </header>

      <div className="mb-5 grid gap-3 sm:grid-cols-[1.25fr_0.75fr]">
        <Panel className="bg-[#111a36]/95">
          <div className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-300/10 text-amber-200"><Waves className="h-5 w-5" /></span>
            <div className="min-w-0"><h2 className="font-display text-base font-bold text-amber-100">Grafik adalah cerita nilai fungsi</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">Setiap nilai <InlineMath math="x" /> menjadi posisi mendatar, lalu fungsi menentukan tinggi <InlineMath math="y" />. Sinus dan cosinus membentuk gelombang terbatas; tangen berulang dengan cabang-cabang yang dipisahkan asimtot.</p>
            </div>
          </div>
        </Panel>
        <Panel className="flex flex-col justify-center border-amber-200/15 bg-amber-200/[0.06]">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-100/60">Ingat satuan sudut</p>
          <p className="mt-2 font-display text-lg font-black text-amber-100">π rad = 180°</p>
          <p className="mt-1 text-xs leading-relaxed text-white/60">Di grafik ini sumbu-x memakai radian. Satu putaran penuh adalah 2π rad.</p>
        </Panel>
      </div>

      <Panel className="mb-5"><SectionTitle index="01" title="Tiga bentuk dasar" icon={<Waves className="h-5 w-5" />} />
        <p className="mb-4 text-sm leading-relaxed text-white/75">Mulai dari pola paling sederhana. Perhatikan tinggi, titik awal, dan kapan pola kembali mengulang.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { name: "Sinus", formula: "y=\\sin x", period: "2π", range: "−1 ≤ y ≤ 1", note: "Mulai dari 0, naik ke puncak." , tone: "border-cyan-200/20 bg-cyan-300/[0.06]", color: "text-cyan-100" },
            { name: "Cosinus", formula: "y=\\cos x", period: "2π", range: "−1 ≤ y ≤ 1", note: "Mulai dari puncak saat x = 0.", tone: "border-amber-200/20 bg-amber-300/[0.055]", color: "text-amber-100" },
            { name: "Tangen", formula: "y=\\tan x", period: "π", range: "semua nilai real", note: "Cabang terpisah oleh asimtot.", tone: "border-rose-200/20 bg-rose-300/[0.05]", color: "text-rose-100" },
          ].map((item) => <article key={item.name} className={`min-w-0 rounded-2xl border p-4 ${item.tone}`}>
            <h3 className={`font-display text-sm font-black ${item.color}`}>{item.name}</h3><Formula>{item.formula}</Formula>
            <div className="space-y-1 text-xs leading-relaxed text-white/70"><p>Periode: <strong className="text-white">{item.period}</strong></p><p>Nilai: {item.range}</p><p>{item.note}</p></div>
          </article>)}
        </div>
      </Panel>

      <Panel className="mb-5 border-cyan-200/20 bg-[#101a38]/95"><SectionTitle index="02" title="Periode, amplitudo, dan garis tengah" icon={<Scaling className="h-5 w-5" />} />
        <p className="mb-4 text-sm leading-relaxed text-white/75">Untuk membaca bentuk umum, bayangkan <InlineMath math="a" /> meregangkan atau membalik gelombang, <InlineMath math="k" /> mengatur rapatnya ulangan, lalu <InlineMath math="h" /> dan <InlineMath math="d" /> menggeser grafik.</p>
        <Formula>{"y=a\\,f\\bigl(k(x-h)\\bigr)+d"}</Formula>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-cyan-100/10 bg-cyan-300/[0.045] p-3 text-xs leading-relaxed text-white/75"><strong className="text-cyan-100">Sinus dan cosinus.</strong> Amplitudo <InlineMath math="|a|" /> (jarak dari garis tengah ke puncak), periode <InlineMath math="\\frac{2\\pi}{|k|}" />, garis tengah <InlineMath math="y=d" />. Nilainya terbatas di antara <InlineMath math="d-|a|" /> dan <InlineMath math="d+|a|" />.</div>
          <div className="rounded-xl border border-rose-100/10 bg-rose-300/[0.045] p-3 text-xs leading-relaxed text-white/75"><strong className="text-rose-100">Tangen.</strong> Periode <InlineMath math="\\frac{\\pi}{|k|}" /> dan garis tengah <InlineMath math="y=d" />. Tangen tidak mempunyai amplitudo karena nilainya tak berbatas.</div>
          <div className="rounded-xl border border-amber-100/10 bg-amber-300/[0.045] p-3 text-xs leading-relaxed text-white/75"><strong className="text-amber-100">Pergeseran mendatar.</strong> Bentuk <InlineMath math="x-h" /> menggeser grafik ke kanan sejauh <InlineMath math="h" />; jika <InlineMath math="h" /> negatif, bergeser ke kiri.</div>
          <div className="rounded-xl border border-emerald-100/10 bg-emerald-300/[0.045] p-3 text-xs leading-relaxed text-white/75"><strong className="text-emerald-100">Tanda a.</strong> Jika <InlineMath math="a<0" />, grafik dicerminkan terhadap garis tengah. Nilai <InlineMath math="d" /> menggeser seluruh grafik naik atau turun.</div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-white/55">Di sini <InlineMath math="f" /> berarti sinus, cosinus, atau tangen. Periode selalu positif, jadi gunakan nilai mutlak <InlineMath math="k" />.</p>
      </Panel>

      <Panel className="mb-5 border-violet-200/15 bg-[#131a38]/95"><SectionTitle index="03" title="Atur grafik dan amati" icon={<MoveHorizontal className="h-5 w-5" />} />
        <p className="mb-4 text-sm leading-relaxed text-white/70">Pilih fungsi, lalu ubah parameternya. Kurva, garis tengah, periode, dan asimtot tangen ikut menyesuaikan. Semua kontrol dapat dijangkau dengan tombol Tab dan diubah memakai papan ketik.</p>
        <GraphExplorer />
      </Panel>

      <Panel className="mb-5 border-emerald-200/15 bg-[#111a36]/95"><SectionTitle index="04" title="Contoh transformasi, langkah demi langkah" icon={<Check className="h-5 w-5" />} />
        <div className="rounded-[1.4rem] border border-emerald-100/15 bg-emerald-300/[0.045] p-4 sm:p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.17em] text-emerald-100/65">Tantangan</p>
          <Formula>{"y=-2\\cos\\left(2\\left(x-\\frac{\\pi}{4}\\right)\\right)+1"}</Formula>
          <ol className="space-y-3 text-sm leading-relaxed text-white/80">
            <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-black text-cyan-100">1</span><span>Kenali parameternya: <InlineMath math="a=-2,\ k=2,\ h=\\frac{\\pi}{4},\ d=1" />. Mulai dengan garis tengah <InlineMath math="y=1" />.</span></li>
            <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-black text-cyan-100">2</span><span>Amplitudo <InlineMath math="|a|=2" />, jadi puncak dan lembah berjarak 2 dari garis tengah: nilai maksimum 3 dan minimum −1.</span></li>
            <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-black text-cyan-100">3</span><span>Periode <InlineMath math="\\frac{2\\pi}{|k|}=\\pi" />. Satu gelombang selesai sepanjang π radian. Geser ke kanan sebesar <InlineMath math="\\frac{\\pi}{4}" />.</span></li>
            <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-black text-cyan-100">4</span><span>Tanda negatif pada <InlineMath math="a" /> membalik cosinus terhadap <InlineMath math="y=1" />. Pada <InlineMath math="x=\\frac{\\pi}{4}" />, nilai cosinusnya 1, sehingga grafik berada di lembah <InlineMath math="y=-1" />.</span></li>
          </ol>
          <div className="mt-4 rounded-xl border border-emerald-100/15 bg-emerald-100/[0.06] p-3 text-sm font-bold text-emerald-100">Sketsa siap: garis tengah y = 1, amplitudo 2, periode π, dan titik lembah pertama berada di (π/4, −1).</div>
        </div>
      </Panel>

      <Panel className="mb-5"><SectionTitle index="05" title="Urutan cepat untuk membuat sketsa" icon={<RotateCcw className="h-5 w-5" />} />
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            ["Tandai garis tengah", "Gambar y=d terlebih dahulu sebagai patokan pergeseran vertikal."],
            ["Hitung periode", "Gunakan 2π/|k| untuk sin dan cos, atau π/|k| untuk tan."],
            ["Tentukan tinggi dan arah", "Untuk sin/cos, ukur |a| dari garis tengah. Jika a negatif, balik pola."],
            ["Geser pola dasarnya", "Pindahkan satu pola ke kanan/kiri sesuai h, lalu tandai titik penting."],
            ["Lengkapi dan cek ulang", "Ulangi dengan periode yang benar. Untuk tan, gambar asimtot dan jangan sambungkan cabang."],
          ].map(([title, copy], i) => <div key={title} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 font-display text-xs font-black text-cyan-100">{i + 1}</span>
            <div className="min-w-0"><h3 className="text-sm font-bold text-white">{title}</h3><p className="mt-1 text-xs leading-relaxed text-white/65">{copy}</p></div>
          </div>)}
        </div>
      </Panel>

      <Panel className="border-amber-200/20 bg-gradient-to-br from-[#182448] to-[#292344]">
        <SectionTitle index="06" title="Rangkuman dan tips" icon={<Lightbulb className="h-5 w-5" />} />
        <ul className="space-y-2 text-sm leading-relaxed text-white/75">
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Sinus dan cosinus berperiode 2π; tangen berperiode π.</li>
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Faktor frekuensi memperpendek atau memperpanjang periode: gunakan nilai mutlak k.</li>
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Sinus/cosinus punya amplitudo |a|; tangen tidak. Garis tengah semua bentuk adalah y=d.</li>
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Pergeseran mendatar dibaca dari x−h, dan a negatif berarti refleksi terhadap garis tengah.</li>
        </ul>
        <div className="mt-5 rounded-2xl border border-amber-100/15 bg-amber-200/[0.06] p-4">
          <h3 className="flex items-center gap-2 font-display text-sm font-black text-amber-100"><Lightbulb className="h-4 w-4" /> Tips &amp; trik</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/75">Sebelum menggambar kurva, tandai dulu garis tengah dan satu periode. Dua patokan ini membuat sketsa tetap rapi meski grafik diregangkan atau dipindahkan. Untuk tangen, beri ruang di sekitar asimtot—kurva mendekat, tetapi tidak pernah menyentuhnya.</p>
        </div>
        <p className="mt-4 text-center font-display text-sm font-bold text-cyan-100">Baca parameternya, temukan polanya, lalu biarkan grafiknya bercerita.</p>
      </Panel>
    </main>
  </div>
);

export default SmaGrafikFungsiTrigonometriPage;
