import { useState, type ReactNode } from "react";
import {
  ArrowDownRight,
  BookOpen,
  Check,
  CircleHelp,
  Compass,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";
import { InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

const fmt = (value: number) => {
  if (Math.abs(value) < 0.0005) return "0";
  if (Math.abs(value - 1) < 0.0005) return "1";
  if (Math.abs(value + 1) < 0.0005) return "−1";
  return value.toFixed(2).replace("-", "−");
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

const Formula = ({ children, testId }: { children: string; testId?: string }) => (
  <div data-testid={testId} className="my-3 rounded-2xl border border-cyan-200/15 bg-[#09122d] px-3 py-3 text-center text-cyan-100 [overflow-wrap:anywhere] [&_.katex-display]:my-1 [&_.katex]:text-[0.95em] sm:px-4 sm:[&_.katex]:text-[1.05em]">
    <InlineMath math={children} />
  </div>
);

const WorkedExample = ({
  number,
  level,
  title,
  problem,
  tone,
  children,
}: {
  number: string;
  level: string;
  title: string;
  problem: string;
  tone: string;
  children: ReactNode;
}) => (
  <article className={`rounded-[1.5rem] border p-4 sm:p-5 ${tone}`}>
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <span className="rounded-full bg-white/10 px-3 py-1 font-display text-[10px] font-black uppercase tracking-[0.16em] text-white">Contoh {number}</span>
      <span className="rounded-full border border-white/15 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-white/70">{level}</span>
      <h3 className="w-full font-display text-base font-bold text-white sm:w-auto">{title}</h3>
    </div>
    <div className="rounded-2xl bg-[#09122d]/80 p-3 sm:p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">Tantangan</p>
      <Formula>{problem}</Formula>
      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-amber-200">Kita pecahkan</p>
      <ol className="space-y-3 text-sm leading-relaxed text-white/80">{children}</ol>
    </div>
  </article>
);

const Step = ({ n, children }: { n: number; children: ReactNode }) => (
  <li className="flex min-w-0 gap-3">
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 font-display text-[11px] font-black text-cyan-100">{n}</span>
    <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
  </li>
);

function TrigExplorer() {
  const [angle, setAngle] = useState(30);
  const radians = (angle * Math.PI) / 180;
  const sinValue = Math.sin(radians);
  const cosValue = Math.cos(radians);
  const cx = 180;
  const cy = 110;
  const radius = 65;
  const px = cx + radius * cosValue;
  const py = cy - radius * sinValue;
  const graphLeft = 38;
  const graphRight = 322;
  const graphCenter = 292;
  const graphScale = 48;
  const gx = graphLeft + (angle / 360) * (graphRight - graphLeft);
  const gy = graphCenter - sinValue * graphScale;
  const graphPath = Array.from({ length: 73 }, (_, index) => {
    const a = (index / 72) * Math.PI * 2;
    const x = graphLeft + (index / 72) * (graphRight - graphLeft);
    const y = graphCenter - Math.sin(a) * graphScale;
    return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
      <div className="min-w-0 rounded-2xl border border-cyan-200/15 bg-[#08112b] p-2 sm:p-3">
        <svg
          viewBox="0 0 360 400"
          role="img"
          aria-label={`Lingkaran satuan dan grafik sinus pada sudut ${angle} derajat; nilai sinus ${fmt(sinValue)}`}
          className="block h-auto w-full"
          data-testid="visual-trig-explorer"
        >
          <text x="180" y="25" textAnchor="middle" fill="#a5f3fc" fontSize="12" fontWeight="700">LINGKARAN SATUAN</text>
          <circle cx={cx} cy={cy} r={radius} fill="#122247" stroke="#526687" strokeWidth="1.5" />
          <line x1={cx - radius - 12} y1={cy} x2={cx + radius + 13} y2={cy} stroke="#64748b" strokeWidth="1" />
          <line x1={cx} y1={cy - radius - 12} x2={cx} y2={cy + radius + 12} stroke="#64748b" strokeWidth="1" />
          <line x1={cx} y1={cy} x2={px} y2={py} stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          <path d={`M ${cx + 25} ${cy} A 25 25 0 ${angle > 180 ? 1 : 0} 0 ${cx + 25 * cosValue} ${cy - 25 * sinValue}`} fill="none" stroke="#fb7185" strokeWidth="2.5" />
          <circle cx={px} cy={py} r="7" fill="#34d399" stroke="#d1fae5" strokeWidth="2" />
          <text x={cx - 8} y={cy + 15} textAnchor="middle" fill="#cbd5e1" fontSize="10">O</text>
          <text x={cx + 8} y={cy - radius - 4} fill="#94a3b8" fontSize="10">y</text>
          <text x={cx + radius + 8} y={cy - 7} fill="#94a3b8" fontSize="10">x</text>
          <text x="180" y="194" textAnchor="middle" fill="#cbd5e1" fontSize="11">{`(${fmt(cosValue)}, ${fmt(sinValue)})`}</text>

          <text x="180" y="220" textAnchor="middle" fill="#a5f3fc" fontSize="12" fontWeight="700">GRAFIK y = sin x</text>
          <line x1={graphLeft} y1={graphCenter} x2={graphRight} y2={graphCenter} stroke="#64748b" strokeWidth="1" />
          <line x1={graphLeft} y1={graphCenter - graphScale} x2={graphRight} y2={graphCenter - graphScale} stroke="#334155" strokeDasharray="3 5" />
          <line x1={graphLeft} y1={graphCenter + graphScale} x2={graphRight} y2={graphCenter + graphScale} stroke="#334155" strokeDasharray="3 5" />
          <path d={graphPath} fill="none" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1={gx} y1={graphCenter} x2={gx} y2={gy} stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx={gx} cy={gy} r="6" fill="#fb7185" stroke="#fff1f2" strokeWidth="1.5" />
          <text x={graphLeft} y="362" textAnchor="middle" fill="#94a3b8" fontSize="10">0°</text>
          <text x={(graphLeft + graphRight) / 2} y="362" textAnchor="middle" fill="#94a3b8" fontSize="10">180°</text>
          <text x={graphRight} y="362" textAnchor="middle" fill="#94a3b8" fontSize="10">360°</text>
          <text x={graphLeft - 7} y={graphCenter - graphScale + 4} textAnchor="end" fill="#94a3b8" fontSize="9">1</text>
          <text x={graphLeft - 7} y={graphCenter + 4} textAnchor="end" fill="#94a3b8" fontSize="9">0</text>
          <text x={graphLeft - 7} y={graphCenter + graphScale + 4} textAnchor="end" fill="#94a3b8" fontSize="9">−1</text>
          <text x={gx} y="385" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="700">{`${angle}°`}</text>
        </svg>
      </div>
      <div className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-amber-200/20 bg-amber-300/[0.08] p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="explore-angle" className="font-body text-sm font-bold text-amber-100">Geser sudut x</label>
            <output data-testid="text-explorer-angle" htmlFor="explore-angle" className="rounded-full bg-amber-200/15 px-3 py-1 font-display text-sm font-black text-amber-100">{angle}°</output>
          </div>
          <input
            id="explore-angle"
            data-testid="input-explorer-angle"
            type="range"
            min="0"
            max="360"
            step="1"
            value={angle}
            onChange={(event) => setAngle(Number(event.target.value))}
            aria-label="Atur sudut x dari 0 sampai 360 derajat"
            aria-valuetext={`${angle} derajat`}
            className="w-full cursor-pointer accent-amber-300"
          />
          <div className="mt-1 flex justify-between text-[10px] text-amber-50/55"><span>0°</span><span>360°</span></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-emerald-200/15 bg-emerald-300/[0.07] p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-100/60">sin x</p>
            <p data-testid="text-explorer-sine" aria-live="polite" className="mt-1 font-display text-lg font-black text-emerald-200">{fmt(sinValue)}</p>
          </div>
          <div className="rounded-xl border border-cyan-200/15 bg-cyan-300/[0.07] p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-100/60">cos x</p>
            <p data-testid="text-explorer-cosine" aria-live="polite" className="mt-1 font-display text-lg font-black text-cyan-200">{fmt(cosValue)}</p>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-white/65">Titik di lingkaran punya koordinat <InlineMath math="(\\cos x,\\sin x)" />. Pada grafik, tinggi titik yang sama menunjukkan nilai <InlineMath math="\\sin x" />.</p>
      </div>
    </div>
  );
}

const SmaPersamaanTrigonometriPage = () => (
  <div className="relative min-h-screen overflow-x-hidden bg-[#080d22] text-white">
    <Starfield />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.19),_transparent_68%)]" />
    <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri" />

    <main className="relative z-10 mx-auto w-full max-w-5xl px-3 pb-16 pt-16 sm:px-5 sm:pt-20">
      <header className="relative mb-5 overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-gradient-to-br from-[#153b60] via-[#17254a] to-[#39244a] p-5 shadow-2xl shadow-indigo-950/40 sm:p-8 md:p-10">
        <div className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 rounded-full border-[22px] border-cyan-200/10" />
        <div className="pointer-events-none absolute -bottom-14 right-24 h-36 w-36 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-100/25 bg-cyan-100/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">
            <BookOpen className="h-3.5 w-3.5" /> Ruang untuk Guru · SMA
          </div>
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-amber-200/80">Trigonometri · Buku Animasi</p>
          <h1 className="mt-2 max-w-3xl font-display text-3xl font-black leading-[1.08] text-white sm:text-4xl md:text-5xl">Persamaan trigonometri</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cyan-50/75 sm:text-base">
            Mencari sudut yang cocok itu seperti berburu titik pada lingkaran: satu putaran, beberapa jawaban, lalu kita saring sesuai batasnya.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-amber-100/20 bg-amber-200/10 px-3 py-2 text-xs font-semibold text-amber-100">
            <Target className="h-4 w-4 shrink-0" /> Misi: temukan semua sudut, jangan sampai ada yang terlewat.
          </div>
        </div>
      </header>

      <div className="mb-5 grid gap-3 sm:grid-cols-[1.3fr_0.7fr]">
        <Panel className="bg-[#111a36]/95">
          <div className="flex gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-300/10 text-amber-200"><CircleHelp className="h-5 w-5" /></span>
            <div className="min-w-0">
              <h2 className="font-display text-base font-bold text-amber-100">Apa yang sedang kita cari?</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Persamaan trigonometri meminta kita mencari semua nilai sudut yang membuat dua ruas bernilai sama. Contohnya, <InlineMath math="\\sin x=\\tfrac12" /> bertanya: pada sudut mana tinggi titik di lingkaran satuan bernilai <InlineMath math="\\tfrac12" />?
              </p>
            </div>
          </div>
        </Panel>
        <Panel className="flex flex-col justify-center border-amber-200/15 bg-amber-200/[0.06]">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-100/60">Rentang latihan</p>
          <p className="mt-2 font-display text-lg font-black text-amber-100">0° ≤ x ≤ 360°</p>
          <p className="mt-1 text-xs leading-relaxed text-white/60">Batas kiri dan kanan ikut dihitung karena intervalnya tertutup.</p>
        </Panel>
      </div>

      <Panel className="mb-5">
        <SectionTitle index="01" title="Baca tanda lewat kuadran" icon={<Compass className="h-5 w-5" />} />
        <p className="mb-4 text-sm leading-relaxed text-white/75">Di lingkaran satuan, <InlineMath math="\\cos x" /> adalah koordinat mendatar dan <InlineMath math="\\sin x" /> koordinat tegak. Tanda koordinat berubah saat titik berpindah kuadran.</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            ["I", "sin +", "cos +", "tan +", "border-emerald-200/20 bg-emerald-300/[0.06]"],
            ["II", "sin +", "cos −", "tan −", "border-cyan-200/20 bg-cyan-300/[0.06]"],
            ["III", "sin −", "cos −", "tan +", "border-rose-200/20 bg-rose-300/[0.06]"],
            ["IV", "sin −", "cos +", "tan −", "border-amber-200/20 bg-amber-300/[0.06]"],
          ].map(([quad, sin, cos, tan, color]) => (
            <div key={quad} className={`rounded-2xl border p-3 ${color}`}>
              <p className="font-display text-sm font-black text-white">Kuadran {quad}</p>
              <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-bold">
                <span className="rounded-md bg-white/10 px-2 py-1 text-white/80">{sin}</span>
                <span className="rounded-md bg-white/10 px-2 py-1 text-white/80">{cos}</span>
                <span className="rounded-md bg-white/10 px-2 py-1 text-white/80">{tan}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-white/55">Ingat pola tanda: sinus positif di I–II, cosinus di I–IV, tangen di I–III. Di sumbu (misalnya 90°), salah satu rasio bisa bernilai 0 atau tangen tidak terdefinisi.</p>
      </Panel>

      <Panel className="mb-5 border-cyan-200/20 bg-[#101a38]/95">
        <SectionTitle index="02" title="Sudut acuan dan putaran penuh" icon={<RotateCcw className="h-5 w-5" />} />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="min-w-0">
            <h3 className="font-display text-sm font-bold text-cyan-100">Cari sudut acuan</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">Sudut acuan <InlineMath math="\\alpha" /> adalah sudut lancip antara sisi akhir sudut dan sumbu-x. Nilainya membantu kita menemukan sudut lain dengan besar sinus atau cosinus yang sama. Misalnya untuk sudut acuan <InlineMath math="\\alpha" />:</p>
            <div className="mt-3 space-y-2 text-xs leading-relaxed text-white/75">
              <p className="rounded-xl bg-white/[0.04] p-3"><strong className="text-cyan-100">I:</strong> <InlineMath math="\\alpha" /> · <strong className="text-cyan-100">II:</strong> <InlineMath math="180^\\circ-\\alpha" /></p>
              <p className="rounded-xl bg-white/[0.04] p-3"><strong className="text-cyan-100">III:</strong> <InlineMath math="180^\\circ+\\alpha" /> · <strong className="text-cyan-100">IV:</strong> <InlineMath math="360^\\circ-\\alpha" /></p>
            </div>
          </div>
          <div className="min-w-0 rounded-2xl border border-violet-200/15 bg-violet-300/[0.06] p-4">
            <h3 className="font-display text-sm font-bold text-violet-100">Kenapa jawaban berulang?</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">Sinus dan cosinus mengulang setiap 360°, sedangkan tangen mengulang setiap 180°. Karena itu satu nilai dapat muncul lagi setelah satu atau lebih putaran.</p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">Huruf <InlineMath math="k" /> menyatakan sembarang bilangan bulat (..., −1, 0, 1, ...). Untuk satu interval terbatas, kita hanya mengambil putaran yang sudutnya masuk rentang.</p>
          </div>
        </div>
      </Panel>

      <Panel className="mb-5 border-emerald-200/15 bg-[#111a36]/95">
        <SectionTitle index="03" title="Pola solusi umum" icon={<Sparkles className="h-5 w-5" />} />
        <p className="mb-3 text-sm leading-relaxed text-white/70">Untuk <InlineMath math="\\alpha" /> yang memenuhi domain fungsi dan dipakai sebagai sudut acuan, semua solusi real ditulis:</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="min-w-0 rounded-2xl border border-cyan-200/15 bg-cyan-300/[0.06] p-3">
            <p className="text-[10px] font-black uppercase tracking-wider text-cyan-100/65">Sinus · periode 360°</p>
            <Formula>{"\\sin x=\\sin\\alpha"}</Formula>
            <p className="text-center text-xs leading-6 text-white/80"><InlineMath math="x=\\alpha+360^\\circ k" /><br />atau<br /><InlineMath math="x=180^\\circ-\\alpha+360^\\circ k" /></p>
          </div>
          <div className="min-w-0 rounded-2xl border border-amber-200/15 bg-amber-300/[0.06] p-3">
            <p className="text-[10px] font-black uppercase tracking-wider text-amber-100/65">Cosinus · periode 360°</p>
            <Formula>{"\\cos x=\\cos\\alpha"}</Formula>
            <p className="text-center text-xs leading-6 text-white/80"><InlineMath math="x=\\alpha+360^\\circ k" /><br />atau<br /><InlineMath math="x=360^\\circ-\\alpha+360^\\circ k" /></p>
          </div>
          <div className="min-w-0 rounded-2xl border border-rose-200/15 bg-rose-300/[0.06] p-3">
            <p className="text-[10px] font-black uppercase tracking-wider text-rose-100/65">Tangen · periode 180°</p>
            <Formula>{"\\tan x=\\tan\\alpha"}</Formula>
            <p className="text-center text-xs leading-6 text-white/80"><InlineMath math="x=\\alpha+180^\\circ k" /><br /><span className="text-[11px] text-white/55">α bukan 90° + 180°k; tan harus terdefinisi.</span></p>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-white/55">Rumus sinus dan cosinus tetap benar untuk sudut umum <InlineMath math="\\alpha" />; bentuk sudut acuan membuat pasangan solusi tampak jelas. Jika kedua cabang kebetulan sama, hitung nilai uniknya satu kali saja.</p>
      </Panel>

      <Panel className="mb-5 border-violet-200/15 bg-[#131a38]/95">
        <SectionTitle index="04" title="Putar, amati, temukan" icon={<ArrowDownRight className="h-5 w-5" />} />
        <p className="mb-4 text-sm leading-relaxed text-white/70">Geser kontrolnya. Titik pada lingkaran bergerak, lalu titik yang sama muncul di grafik sinus. Tinggi titik itulah nilai <InlineMath math="\\sin x" />.</p>
        <TrigExplorer />
      </Panel>

      <div className="mb-4 flex items-center gap-2 px-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-300/10 text-amber-200"><Lightbulb className="h-4 w-4" /></span>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-200/65">Latihan bertahap</p>
          <h2 className="font-display text-xl font-black text-white">Tiga tantangan, satu strategi</h2>
        </div>
      </div>
      <div className="space-y-4">
        <WorkedExample number="1" level="Mudah" title="Tangen berulang tiap setengah putaran" problem={"\\tan x=1,\\quad 0^\\circ\\le x\\le360^\\circ"} tone="border-emerald-200/20 bg-emerald-300/[0.055]">
          <Step n={1}>Nilai tangen positif di kuadran I dan III. Sudut acuannya <InlineMath math="\\alpha=45^\\circ" /> karena <InlineMath math="\\tan45^\\circ=1" />.</Step>
          <Step n={2}>Periode tangen adalah 180°, jadi <InlineMath math="x=45^\\circ+180^\\circ k" />, dengan <InlineMath math="k" /> bilangan bulat.</Step>
          <Step n={3}>Untuk <InlineMath math="k=0" /> dan <InlineMath math="k=1" />, diperoleh 45° dan 225°. Putaran berikutnya memberi 405°, sudah melewati 360°; nilai untuk <InlineMath math="k<0" /> berada di bawah 0°.</Step>
          <li data-testid="result-easy" className="ml-9 rounded-xl border border-emerald-100/15 bg-emerald-100/[0.07] p-3 font-bold text-emerald-100"><Check className="mr-2 inline h-4 w-4" />Himpunan solusi: {"{45°, 225°}"}.</li>
        </WorkedExample>

        <WorkedExample number="2" level="Sedang" title="Sudut di dalam sudut" problem={"\\sin(2x)=\\frac{\\sqrt3}{2},\\quad 0^\\circ\\le x\\le360^\\circ"} tone="border-cyan-200/20 bg-cyan-300/[0.045]">
          <Step n={1}>Misalkan <InlineMath math="\\theta=2x" />. Saat x berada pada [0°, 360°], sudut <InlineMath math="\\theta" /> berada pada [0°, 720°]. Nilai sinus positif, dengan sudut acuan 60°.</Step>
          <Step n={2}>Dalam satu putaran solusi <InlineMath math="\\theta=60^\\circ" /> atau <InlineMath math="120^\\circ" />. Karena rentangnya dua putaran, tambahkan 360° sekali: 420° dan 480°. Jadi daftar θ: 60°, 120°, 420°, 480°.</Step>
          <Step n={3}>Bagi setiap sudut dengan 2: <InlineMath math="x=30^\\circ,60^\\circ,210^\\circ,240^\\circ" />. Cek semuanya ada pada [0°, 360°]; tambahan putaran untuk θ mulai dari 780° sudah melewati 720°, sehingga tak memberi x di interval.</Step>
          <li data-testid="result-medium" className="ml-9 rounded-xl border border-cyan-100/15 bg-cyan-100/[0.07] p-3 font-bold text-cyan-100"><Check className="mr-2 inline h-4 w-4" />Himpunan solusi: {"{30°, 60°, 210°, 240°}"}.</li>
        </WorkedExample>

        <WorkedExample number="3" level="Sulit" title="Persamaan kuadrat dalam sinus" problem={"3\\sin^2x+\\sin x-2=0,\\quad 0^\\circ\\le x\\le360^\\circ"} tone="border-rose-200/20 bg-rose-300/[0.045]">
          <Step n={1}>Anggap <InlineMath math="u=\\sin x" />. Faktorkan persamaan kuadrat: <InlineMath math="3u^2+u-2=(3u-2)(u+1)=0" />.</Step>
          <Step n={2}>Maka <InlineMath math="\\sin x=\\tfrac23" /> atau <InlineMath math="\\sin x=-1" />. Keduanya mungkin karena nilai sinus berada pada [−1, 1]. Untuk <InlineMath math="\\tfrac23" />, sudut acuan <InlineMath math="\\alpha=\\arcsin(\\tfrac23)\\approx41.81^\\circ" />.</Step>
          <Step n={3}>Sinus positif di kuadran I dan II: <InlineMath math="x\\approx41.81^\\circ" /> atau <InlineMath math="180^\\circ-41.81^\\circ\\approx138.19^\\circ" />. Untuk <InlineMath math="\\sin x=-1" />, satu putaran memberi <InlineMath math="x=270^\\circ" />.</Step>
          <Step n={4}>Cek interval: 41.81°, 138.19°, dan 270° semuanya memenuhi <InlineMath math="0^\\circ\\le x\\le360^\\circ" />. Pembulatan dua angka di belakang koma dipakai untuk dua nilai pendekatan; 270° tepat.</Step>
          <li data-testid="result-hard" className="ml-9 rounded-xl border border-rose-100/15 bg-rose-100/[0.07] p-3 font-bold text-rose-100"><Check className="mr-2 inline h-4 w-4" />Himpunan solusi: {"{41.81°, 138.19°, 270°}"}.</li>
        </WorkedExample>
      </div>

      <Panel className="mt-5 border-amber-200/20 bg-gradient-to-br from-[#182448] to-[#292344]">
        <SectionTitle index="05" title="Rangkuman" icon={<Check className="h-5 w-5" />} />
        <ul className="space-y-2 text-sm leading-relaxed text-white/75">
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Solusi adalah sudut yang membuat persamaan benar.</li>
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Tanda kuadran membantu memilih sudut; sudut acuan membantu menghitungnya.</li>
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Sinus dan cosinus berulang tiap 360°, tangen tiap 180°.</li>
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> Untuk bentuk kuadrat, faktorkan dahulu dalam satu rasio, lalu cari sudut untuk setiap nilai yang mungkin.</li>
        </ul>
        <div className="mt-5 rounded-2xl border border-amber-100/15 bg-amber-200/[0.06] p-4">
          <h3 className="flex items-center gap-2 font-display text-sm font-black text-amber-100"><Lightbulb className="h-4 w-4" /> Tips &amp; Trik</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/75">Tulis interval untuk sudut yang sedang dicari sebelum menghitung. Jika yang muncul <InlineMath math="\\sin(2x)" />, rentang sudut dalamnya juga menjadi dua kali lebih lebar. Di akhir, urutkan akar dan uji satu per satu pada batas interval—jangan berhenti di rumus umum.</p>
        </div>
        <p className="mt-4 text-center font-display text-sm font-bold text-cyan-100">Pelan-pelan, cek kuadran, lalu saring. Kamu bisa menemukan semuanya.</p>
      </Panel>
    </main>
  </div>
);

export default SmaPersamaanTrigonometriPage;
