import { type ReactNode } from "react";
import {
  ArrowDown,
  BookOpen,
  Compass,
  Lightbulb,
  Sparkles,
  Target,
} from "lucide-react";
import { BlockMath, InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

const InlineMath = ({ math }: { math: string }) => (
  <span className="inline-block min-w-0 max-w-full overflow-x-auto align-baseline whitespace-nowrap">
    <KaTeXInlineMath math={math} />
  </span>
);

const Formula = ({ math, label }: { math: string; label?: string }) => (
  <div
    className="quadrant-formula min-w-0 max-w-full overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/90 px-3 py-3 text-left text-[13px] leading-relaxed text-cyan-100 sm:px-5 sm:py-3 sm:text-base"
    aria-label={label ?? "Rumus trigonometri"}
    data-testid="formula-box"
  >
    {label && <p className="mb-1 whitespace-normal font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/55">{label}</p>}
    <div className="w-max min-w-full text-left">
      <BlockMath math={math} />
    </div>
  </div>
);

const IdentityRows = ({
  rows,
}: {
  rows: { ratio: string; equation: string }[];
}) => (
  <div className="overflow-hidden rounded-2xl border border-cyan-200/10 bg-[#071326]/60" aria-label="Rumus perbandingan trigonometri">
    {rows.map(({ ratio, equation }, index) => (
      <div
        key={`${ratio}-${index}`}
        className="grid grid-cols-[3.1rem_minmax(0,1fr)] items-baseline gap-2 border-b border-white/[.07] px-3 py-2 last:border-0 sm:grid-cols-[3.7rem_minmax(0,1fr)] sm:gap-3 sm:px-4"
      >
        <span className="font-body text-xs font-black uppercase tracking-wide text-cyan-100">{ratio}</span>
        <div className="min-w-0 text-left text-[13px] leading-normal text-slate-100 sm:text-sm">
          <InlineMath math={equation} />
        </div>
      </div>
    ))}
  </div>
);

const SectionHeading = ({
  index,
  kicker,
  title,
  description,
}: {
  index: string;
  kicker: string;
  title: string;
  description: string;
}) => (
  <div className="mb-5 flex gap-3 sm:gap-4">
    <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-display text-xs font-black text-cyan-100">{index}</span>
    <div className="min-w-0">
      <p className="mb-1 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-200/65">{kicker}</p>
      <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-slate-300">{description}</p>
    </div>
  </div>
);

const QuadrantDiagram = () => (
  <svg
    viewBox="0 0 360 300"
    role="img"
    aria-label="Bidang koordinat dibagi menjadi empat kuadran. Kuadran satu semua sin, cos, tan positif; kuadran dua hanya sin positif; kuadran tiga hanya tan positif; kuadran empat hanya cos positif."
    className="block h-auto w-full"
    data-testid="diagram-tanda-kuadran"
  >
    <defs>
      <marker id="axis-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
        <path d="M0,0 L7,3.5 L0,7" fill="#94a3b8" />
      </marker>
    </defs>
    <rect width="360" height="300" rx="18" fill="#071326" />
    <path d="M175 145 L175 44 A101 101 0 0 0 74 145 Z" fill="#fbbf24" fillOpacity=".14" />
    <path d="M175 145 L276 145 A101 101 0 0 0 175 44 Z" fill="#22d3ee" fillOpacity=".15" />
    <path d="M175 145 L175 246 A101 101 0 0 0 276 145 Z" fill="#fb7185" fillOpacity=".13" />
    <path d="M175 145 L74 145 A101 101 0 0 0 175 246 Z" fill="#a78bfa" fillOpacity=".14" />
    <circle cx="175" cy="145" r="101" fill="none" stroke="#64748b" strokeWidth="1.5" />
    <line x1="36" y1="145" x2="316" y2="145" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#axis-arrow)" />
    <line x1="175" y1="270" x2="175" y2="22" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#axis-arrow)" />
    <line x1="175" y1="145" x2="245" y2="75" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
    <circle cx="245" cy="75" r="5" fill="#fbbf24" stroke="#fff" strokeWidth="1.5" />
    <path d="M202 145 A27 27 0 0 0 194 126" fill="none" stroke="#fda4af" strokeWidth="2.5" />
    <circle cx="175" cy="145" r="3.5" fill="#fff" />
    <text x="227" y="55" fill="#fde68a" fontSize="13" fontWeight="700">P(cos θ, sin θ)</text>
    <text x="188" y="123" fill="#fda4af" fontSize="12" fontWeight="700">θ</text>
    <text x="230" y="105" fill="#e2e8f0" fontSize="12">r</text>
    <text x="226" y="111" fill="#bae6fd" fontSize="16" fontWeight="800">I</text>
    <text x="111" y="111" fill="#fde68a" fontSize="16" fontWeight="800">II</text>
    <text x="111" y="190" fill="#c4b5fd" fontSize="16" fontWeight="800">III</text>
    <text x="226" y="190" fill="#fda4af" fontSize="16" fontWeight="800">IV</text>
    <text x="320" y="140" fill="#cbd5e1" fontSize="12">x</text>
    <text x="181" y="22" fill="#cbd5e1" fontSize="12">y</text>
    <text x="182" y="163" fill="#94a3b8" fontSize="10">O</text>
    <text x="16" y="289" fill="#94a3b8" fontSize="10">Koordinat titik: (cos θ, sin θ)</text>
  </svg>
);

type ExampleLevel = "Mudah" | "Sedang" | "Susah";

const levelStyles: Record<ExampleLevel, string> = {
  Mudah: "border-emerald-200/20 bg-emerald-200/[.08] text-emerald-100",
  Sedang: "border-cyan-200/20 bg-cyan-200/[.08] text-cyan-100",
  Susah: "border-rose-200/20 bg-rose-200/[.08] text-rose-100",
};

const ExampleCard = ({
  level,
  title,
  prompt,
  children,
}: {
  level: ExampleLevel;
  title: string;
  prompt: string;
  children: ReactNode;
}) => (
  <article className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-[#101b2d]/80" data-testid={`contoh-${level.toLowerCase()}`}>
    <div className="flex flex-wrap items-center gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
      <span className={`rounded-full border px-3 py-1 font-body text-[10px] font-black uppercase tracking-[.16em] ${levelStyles[level]}`}>{level}</span>
      <h3 className="min-w-0 font-display text-lg font-extrabold text-white">{title}</h3>
    </div>
    <div className="min-w-0 space-y-3 p-4 sm:p-5">
      <p className="font-body text-sm leading-relaxed text-slate-200"><strong className="text-white">Soal:</strong> {prompt}</p>
      <div className="min-w-0 space-y-3 rounded-2xl border border-white/[.07] bg-black/10 p-3 sm:p-4">
        <p className="font-body text-xs font-black uppercase tracking-[.16em] text-slate-400">Langkah penyelesaian</p>
        {children}
      </div>
    </div>
  </article>
);

const SmaNilaiKuadranPage = () => {
  const jumpTo = (id: string) => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
  };

  return (
    <div className="animation-submaterial-route relative min-h-[100dvh] overflow-x-hidden bg-[#080f1e] text-slate-100">
      <Starfield />
      <style>{`
        @keyframes quadrant-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .quadrant-rise { animation: quadrant-rise .65s cubic-bezier(.2,.7,.2,1) both; }
        .quadrant-rise-delay { animation-delay: .12s; }
        .quadrant-formula .katex-display { margin: 0; text-align: left; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
        }
      `}</style>
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/sudut-sudut-istimewa-dan-relasi-sudut" />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12">
        <header className="quadrant-rise relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,48,70,.97),rgba(16,25,45,.95)_57%,rgba(66,43,66,.9))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-cyan-100/10" />
          <div className="pointer-events-none absolute right-9 top-12 h-40 w-40 rounded-full border border-amber-100/10" />
          <div className="relative grid min-w-0 items-center gap-7 md:grid-cols-[1.1fr_.9fr]">
            <div className="min-w-0">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100"><BookOpen className="h-3.5 w-3.5" aria-hidden="true" /> Matematika · SMA</span>
                <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">Buku Animasi Matematika</span>
              </div>
              <p className="mb-2 font-body text-xs font-bold uppercase tracking-[.24em] text-amber-200">Trigonometri · peta kuadran</p>
              <h1 className="max-w-2xl font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">Sudutnya berputar.<br /><span className="text-cyan-200">Tandanya tetap punya pola.</span></h1>
              <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">Cari kuadran, baca tanda sinus–cosinus–tangen, lalu ubah sudut besar menjadi sudut acuan yang lebih akrab.</p>
              <button type="button" onClick={() => jumpTo("peta-tanda")} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-300 px-4 py-3 font-body text-sm font-extrabold text-slate-950 transition hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-100" data-testid="button-lompat-peta">
                Mulai dari peta tanda <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <figure className="mx-auto w-full min-w-0 max-w-sm rounded-3xl border border-cyan-100/10 bg-[#071326]/55 p-3 sm:p-4">
              <QuadrantDiagram />
              <figcaption className="px-2 pb-1 text-center font-body text-xs leading-relaxed text-slate-400">Titik pada lingkaran satuan: <InlineMath math="(\cos\theta,\sin\theta)" />.</figcaption>
            </figure>
          </div>
        </header>

        <nav aria-label="Isi materi nilai trigonometri pada kuadran" className="mb-12 flex min-w-0 gap-2 overflow-x-auto pb-2">
          {[
            ["peta-tanda", "Peta tanda"],
            ["sudut-acuan", "Sudut acuan"],
            ["sudut-berelasi", "Sudut berelasi"],
            ["sudut-negatif", "Sudut negatif"],
            ["contoh-soal", "Contoh soal"],
            ["ringkasan-tips", "Rangkuman & tips"],
          ].map(([id, label]) => (
            <button key={id} type="button" onClick={() => jumpTo(id)} className="shrink-0 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 font-body text-xs font-bold text-slate-300 transition hover:border-cyan-200/35 hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200" data-testid={`button-nav-${id}`}>
              {label}
            </button>
          ))}
        </nav>

        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_230px] lg:gap-12">
          <div className="min-w-0 space-y-14">
            <section id="peta-tanda" className="scroll-mt-8">
              <SectionHeading index="01" kicker="Baca arah sebelum menghitung" title="Tiga rasio, empat wilayah" description="Pada lingkaran satuan, koordinat titik sudut θ adalah (cos θ, sin θ). Jadi cos mengikuti arah mendatar (x), sedangkan sin mengikuti arah tegak (y). Tangen adalah sin dibagi cos." />
              <div className="grid min-w-0 items-center gap-4 md:grid-cols-[.9fr_1.1fr]">
                <div className="min-w-0 rounded-3xl border border-cyan-200/15 bg-[linear-gradient(145deg,rgba(13,92,112,.13),rgba(15,27,44,.88))] p-3 sm:p-5">
                  <QuadrantDiagram />
                </div>
                <div className="min-w-0 space-y-3">
                  <div className="overflow-x-auto rounded-3xl border border-cyan-200/15 bg-[#101b2d]/90 p-2 sm:p-4">
                    <table className="w-full min-w-[350px] border-collapse text-center font-body text-sm" aria-label="Tanda sinus, cosinus, dan tangen pada tiap kuadran" data-testid="tabel-tanda-kuadran">
                      <thead className="text-cyan-100"><tr className="border-b border-white/10"><th scope="col" className="p-3 text-left font-black">Rasio</th><th scope="col" className="p-3">I</th><th scope="col" className="p-3">II</th><th scope="col" className="p-3">III</th><th scope="col" className="p-3">IV</th></tr></thead>
                      <tbody className="text-slate-200">
                        {[
                          ["sin θ", "+", "+", "−", "−"],
                          ["cos θ", "+", "−", "−", "+"],
                          ["tan θ", "+", "−", "+", "−"],
                        ].map(([name, ...signs]) => (
                          <tr key={name} className="border-b border-white/[.07] last:border-0">
                            <th scope="row" className="p-3 text-left font-bold text-white"><InlineMath math={name.replace(" ", "\\,")} /></th>
                            {signs.map((sign, i) => <td key={`${name}-${i}`} className={`p-3 text-lg font-black ${sign === "+" ? "text-emerald-200" : "text-rose-200"}`}>{sign}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.06] p-4">
                    <p className="font-body text-sm leading-relaxed text-amber-50/90">
                      <strong className="text-amber-100">Trik ingatan, urut kuadran I sampai IV:</strong> ucapkan “Saya Sudah Tahu Caranya”. Kata yang disebut menunjukkan rasio yang positif; di kuadran II–IV, rasio lainnya negatif.
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {[
                        { quadrant: "I", word: "Saya", meaning: "Semua positif", tone: "border-cyan-200/15 bg-cyan-200/[.06] text-cyan-50" },
                        { quadrant: "II", word: "Sudah", meaning: "Sinus positif", tone: "border-amber-200/15 bg-amber-200/[.06] text-amber-50" },
                        { quadrant: "III", word: "Tahu", meaning: "Tangen positif", tone: "border-violet-200/15 bg-violet-200/[.06] text-violet-50" },
                        { quadrant: "IV", word: "Caranya", meaning: "Cosinus positif", tone: "border-rose-200/15 bg-rose-200/[.06] text-rose-50" },
                      ].map((item) => (
                        <div key={item.quadrant} className={`rounded-xl border p-3 ${item.tone}`}>
                          <p className="font-body text-[10px] font-bold uppercase tracking-[.14em] opacity-70">Kuadran {item.quadrant}</p>
                          <p className="mt-1 font-display text-base font-extrabold">{item.word}</p>
                          <p className="font-body text-xs leading-relaxed opacity-85">{item.meaning}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 rounded-xl border border-violet-200/15 bg-violet-200/[.045] px-4 py-3 font-body text-xs leading-relaxed text-violet-50/85"><strong className="text-violet-100">Kenapa begitu?</strong> Di kuadran II, koordinat <InlineMath math="(x,y)" /> adalah <InlineMath math="(-,+)" />. Maka cos negatif, sin positif, dan tan <InlineMath math="y/x" /> negatif. Pola koordinat yang sama menjelaskan kuadran lainnya.</p>
            </section>

            <section id="sudut-acuan" className="scroll-mt-8">
              <SectionHeading index="02" kicker="Sudut kecil sebagai kompas" title="Apa itu sudut acuan α?" description="Sudut acuan adalah sudut lancip antara sisi akhir sudut dan sumbu-x. Besarnya selalu positif dan tidak lebih dari 90°; nilai rasio dasarnya sama dengan sudut lancip itu, lalu tandanya mengikuti kuadran." />
              <div className="grid min-w-0 gap-3 sm:grid-cols-3">
                {[
                  { q: "Kuadran II", formula: "\\alpha=180^\\circ-\\theta", example: "\\theta=150^\\circ\\Rightarrow\\alpha=30^\\circ", color: "border-amber-200/15 bg-amber-200/[.045]", ink: "text-amber-100" },
                  { q: "Kuadran III", formula: "\\alpha=\\theta-180^\\circ", example: "\\theta=225^\\circ\\Rightarrow\\alpha=45^\\circ", color: "border-violet-200/15 bg-violet-200/[.045]", ink: "text-violet-100" },
                  { q: "Kuadran IV", formula: "\\alpha=360^\\circ-\\theta", example: "\\theta=330^\\circ\\Rightarrow\\alpha=30^\\circ", color: "border-rose-200/15 bg-rose-200/[.045]", ink: "text-rose-100" },
                ].map((item) => (
                  <article key={item.q} className={`min-w-0 rounded-2xl border p-4 ${item.color}`}>
                    <h3 className={`mb-2 font-body text-xs font-black uppercase tracking-[.16em] ${item.ink}`}>{item.q}</h3>
                    <div className="mb-2 min-w-0 overflow-x-auto text-sm text-white"><InlineMath math={item.formula} /></div>
                    <p className="font-body text-xs leading-relaxed text-slate-400"><InlineMath math={item.example.replace("=>", "\\Rightarrow")} /></p>
                  </article>
                ))}
              </div>
              <div className="mt-4 flex min-w-0 items-start gap-3 rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4">
                <Compass className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" aria-hidden="true" />
                <p className="font-body text-sm leading-relaxed text-slate-300">Bayangkan sisi akhir sudut memantul ke sumbu-x terdekat. Jarak sudut kecil itulah α. Sudut acuannya membantu kita memakai lagi nilai sudut istimewa, tanpa kehilangan tanda kuadrannya.</p>
              </div>
            </section>

            <section id="sudut-berelasi" className="scroll-mt-8">
              <SectionHeading index="03" kicker="Sudut besar, pola sederhana" title="Identitas sudut berelasi" description="Untuk α sudut lancip, tanda ditentukan oleh kuadran. Sudut 180° dan 360° mempertahankan nama rasio; pada 90° dan 270°, nama sinus–cosinus serta tangen–kotangen bertukar." />
              <div className="space-y-3">
                <article className="min-w-0 rounded-3xl border border-amber-200/15 bg-[linear-gradient(130deg,rgba(82,57,18,.13),rgba(14,25,42,.94)_58%)] p-4 sm:p-5">
                  <p className="mb-1 font-body text-[10px] font-black uppercase tracking-[.2em] text-amber-100/70">Kuadran II · sudut θ = 180° − α</p>
                  <h3 className="mb-3 font-display text-xl font-extrabold text-white">Sinus tetap, cosinus dan tangen negatif</h3>
                  <IdentityRows rows={[
                    { ratio: "sin", equation: "\\sin(180^\\circ-\\alpha)=\\sin\\alpha" },
                    { ratio: "cos", equation: "\\cos(180^\\circ-\\alpha)=-\\cos\\alpha" },
                    { ratio: "tan", equation: "\\tan(180^\\circ-\\alpha)=-\\tan\\alpha" },
                  ]} />
                </article>
                <article className="min-w-0 rounded-3xl border border-violet-200/15 bg-[linear-gradient(130deg,rgba(49,37,83,.16),rgba(14,25,42,.94)_58%)] p-4 sm:p-5">
                  <p className="mb-1 font-body text-[10px] font-black uppercase tracking-[.2em] text-violet-100/70">Kuadran III · sudut θ = 180° + α</p>
                  <h3 className="mb-3 font-display text-xl font-extrabold text-white">Tangen positif; sinus dan cosinus negatif</h3>
                  <IdentityRows rows={[
                    { ratio: "sin", equation: "\\sin(180^\\circ+\\alpha)=-\\sin\\alpha" },
                    { ratio: "cos", equation: "\\cos(180^\\circ+\\alpha)=-\\cos\\alpha" },
                    { ratio: "tan", equation: "\\tan(180^\\circ+\\alpha)=\\tan\\alpha" },
                  ]} />
                </article>
                <article className="min-w-0 rounded-3xl border border-rose-200/15 bg-[linear-gradient(130deg,rgba(82,35,51,.16),rgba(14,25,42,.94)_58%)] p-4 sm:p-5">
                  <p className="mb-1 font-body text-[10px] font-black uppercase tracking-[.2em] text-rose-100/70">Kuadran IV · sudut θ = 360° − α</p>
                  <h3 className="mb-3 font-display text-xl font-extrabold text-white">Cosinus positif; sinus dan tangen negatif</h3>
                  <IdentityRows rows={[
                    { ratio: "sin", equation: "\\sin(360^\\circ-\\alpha)=-\\sin\\alpha" },
                    { ratio: "cos", equation: "\\cos(360^\\circ-\\alpha)=\\cos\\alpha" },
                    { ratio: "tan", equation: "\\tan(360^\\circ-\\alpha)=-\\tan\\alpha" },
                  ]} />
                </article>
              </div>

              <div className="mt-7">
                <p className="mb-1 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-200/70">Ganti nama, lalu cek tandanya</p>
                <h3 className="font-display text-xl font-extrabold leading-tight text-white sm:text-2xl">Di sekitar 90° dan 270°, rasio saling bertukar</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-slate-300">
                  Sinus bertukar menjadi cosinus, cosinus menjadi sinus, dan tangen menjadi kotangen (<InlineMath math="\cot" />). Tanda plus atau minus tetap mengikuti kuadran. Ingat, <InlineMath math="\cot\alpha=\frac{\cos\alpha}{\sin\alpha}" />.
                </p>
                <div className="mt-4 grid min-w-0 gap-3 md:grid-cols-2">
                  <article className="min-w-0 rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
                    <h4 className="mb-3 font-display text-lg font-extrabold text-cyan-50">Di sekitar 90°</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="mb-2 font-body text-xs font-bold text-cyan-100/80">Kuadran I · θ = 90° − α</p>
                        <IdentityRows rows={[
                          { ratio: "sin", equation: "\\sin(90^\\circ-\\alpha)=\\cos\\alpha" },
                          { ratio: "cos", equation: "\\cos(90^\\circ-\\alpha)=\\sin\\alpha" },
                          { ratio: "tan", equation: "\\tan(90^\\circ-\\alpha)=\\cot\\alpha" },
                        ]} />
                      </div>
                      <div>
                        <p className="mb-2 font-body text-xs font-bold text-cyan-100/80">Kuadran II · θ = 90° + α</p>
                        <IdentityRows rows={[
                          { ratio: "sin", equation: "\\sin(90^\\circ+\\alpha)=\\cos\\alpha" },
                          { ratio: "cos", equation: "\\cos(90^\\circ+\\alpha)=-\\sin\\alpha" },
                          { ratio: "tan", equation: "\\tan(90^\\circ+\\alpha)=-\\cot\\alpha" },
                        ]} />
                      </div>
                    </div>
                  </article>
                  <article className="min-w-0 rounded-3xl border border-violet-200/15 bg-violet-200/[.045] p-4 sm:p-5">
                    <h4 className="mb-3 font-display text-lg font-extrabold text-violet-50">Di sekitar 270°</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="mb-2 font-body text-xs font-bold text-violet-100/80">Kuadran III · θ = 270° − α</p>
                        <IdentityRows rows={[
                          { ratio: "sin", equation: "\\sin(270^\\circ-\\alpha)=-\\cos\\alpha" },
                          { ratio: "cos", equation: "\\cos(270^\\circ-\\alpha)=-\\sin\\alpha" },
                          { ratio: "tan", equation: "\\tan(270^\\circ-\\alpha)=\\cot\\alpha" },
                        ]} />
                      </div>
                      <div>
                        <p className="mb-2 font-body text-xs font-bold text-violet-100/80">Kuadran IV · θ = 270° + α</p>
                        <IdentityRows rows={[
                          { ratio: "sin", equation: "\\sin(270^\\circ+\\alpha)=-\\cos\\alpha" },
                          { ratio: "cos", equation: "\\cos(270^\\circ+\\alpha)=\\sin\\alpha" },
                          { ratio: "tan", equation: "\\tan(270^\\circ+\\alpha)=-\\cot\\alpha" },
                        ]} />
                      </div>
                    </div>
                  </article>
                </div>
              </div>
              <p className="mt-4 font-body text-sm leading-relaxed text-slate-300">Contoh pembacaan: <InlineMath math="150^\circ=180^\circ-30^\circ" /> berada di kuadran II. Jadi <InlineMath math="\sin150^\circ=\sin30^\circ" />, tetapi <InlineMath math="\cos150^\circ=-\cos30^\circ" />.</p>
            </section>

            <section id="sudut-negatif" className="scroll-mt-8">
              <SectionHeading index="04" kicker="Putar ke arah sebaliknya" title="Sudut negatif bukan masalah baru" description="Sudut −θ berarti berputar θ derajat searah jarum jam. Pada lingkaran satuan, titiknya merupakan cerminan titik θ terhadap sumbu-x: koordinat x tetap, koordinat y berganti tanda." />
              <div className="grid min-w-0 gap-3 md:grid-cols-[1fr_.9fr]">
                <div className="min-w-0 rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
                  <IdentityRows rows={[
                    { ratio: "sin", equation: "\\sin(-\\theta)=-\\sin\\theta" },
                    { ratio: "cos", equation: "\\cos(-\\theta)=\\cos\\theta" },
                    { ratio: "tan", equation: "\\tan(-\\theta)=-\\tan\\theta" },
                  ]} />
                  <p className="mt-3 font-body text-sm leading-relaxed text-slate-300">Sinus dan tangen adalah fungsi ganjil: nilainya berlawanan tanda. Cosinus adalah fungsi genap: nilainya sama.</p>
                </div>
                <div className="min-w-0 rounded-3xl border border-amber-200/15 bg-amber-200/[.045] p-4 sm:p-5">
                  <p className="mb-2 font-body text-xs font-black uppercase tracking-[.17em] text-amber-100">Contoh cepat</p>
                  <p className="font-body text-sm leading-relaxed text-slate-300">Karena <InlineMath math="\sin30^\circ=\frac12" />, maka <InlineMath math="\sin(-30^\circ)=-\frac12" />. Sementara <InlineMath math="\cos(-30^\circ)=\cos30^\circ=\frac{\sqrt3}{2}" />.</p>
                </div>
              </div>
            </section>

            <section id="contoh-soal" className="scroll-mt-8">
              <SectionHeading index="05" kicker="Coba ikuti jejaknya" title="Tiga contoh, tiga tingkat" description="Urutannya selalu serupa: tentukan bentuk sudut, cari sudut acuan, tentukan tanda, lalu gunakan nilai sudut istimewa." />
              <div className="space-y-4">
                <ExampleCard level="Mudah" title="Sinus di kuadran II" prompt="Tentukan nilai sin 150°." >
                  <p className="font-body text-sm leading-relaxed text-slate-300">1. Ubah bentuk sudut: <InlineMath math="150^\circ=180^\circ-30^\circ" />. Jadi sudut acuan <InlineMath math="\alpha=30^\circ" /> dan sudutnya berada di kuadran II.</p>
                  <p className="font-body text-sm leading-relaxed text-slate-300">2. Di kuadran II, sinus bertanda positif; gunakan <InlineMath math="\sin(180^\circ-\alpha)=\sin\alpha" />.</p>
                  <Formula math="\sin150^\circ=\sin30^\circ=\boxed{\frac12}" label="Hasil perhitungan" />
                </ExampleCard>
                <ExampleCard level="Sedang" title="Cosinus di kuadran III" prompt="Tentukan nilai cos 225°." >
                  <p className="font-body text-sm leading-relaxed text-slate-300">1. Tulis <InlineMath math="225^\circ=180^\circ+45^\circ" />, sehingga <InlineMath math="\alpha=45^\circ" /> dan sudut berada di kuadran III.</p>
                  <p className="font-body text-sm leading-relaxed text-slate-300">2. Cosinus di kuadran III negatif. Identitasnya <InlineMath math="\cos(180^\circ+\alpha)=-\cos\alpha" />.</p>
                  <Formula math="\cos225^\circ=-\cos45^\circ=-\frac{\sqrt2}{2}" label="Hasil perhitungan" />
                </ExampleCard>
                <ExampleCard level="Susah" title="Gabungkan beberapa rasio" prompt="Hitung 2 sin 210° + 3 cos 300° − tan 135°." >
                  <p className="font-body text-sm leading-relaxed text-slate-300">1. Cari sudut acuan dan tanda tiap rasio: <InlineMath math="210^\circ=180^\circ+30^\circ" /> (sin negatif), <InlineMath math="300^\circ=360^\circ-60^\circ" /> (cos positif), dan <InlineMath math="135^\circ=180^\circ-45^\circ" /> (tan negatif).</p>
                  <p className="font-body text-sm leading-relaxed text-slate-300">2. Ganti dengan nilai sudut istimewa: <InlineMath math="\sin210^\circ=-\frac12" />, <InlineMath math="\cos300^\circ=\frac12" />, <InlineMath math="\tan135^\circ=-1" />.</p>
                  <Formula math="2\left(-\frac12\right)+3\left(\frac12\right)-(-1)=-1+\frac32+1=\boxed{\frac32}" label="Hasil perhitungan" />
                  <p className="font-body text-xs leading-relaxed text-emerald-100/80">Cek cepat: pengurangan tangen negatif berubah menjadi penjumlahan.</p>
                </ExampleCard>
              </div>
            </section>

            <section id="ringkasan-tips" className="scroll-mt-8">
              <div className="overflow-hidden rounded-3xl border border-emerald-200/15 bg-[linear-gradient(130deg,rgba(16,79,64,.16),rgba(14,25,42,.94)_58%)]" data-testid="ringkasan-kuadran">
                <div className="border-b border-white/10 px-5 py-4 sm:px-6">
                  <div className="mb-2 flex items-center gap-2"><Sparkles className="h-4 w-4 text-emerald-200" aria-hidden="true" /><p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-emerald-100/70">Simpan di kepala</p></div>
                  <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">Peta kecil untuk langkah berikutnya</h2>
                </div>
                <div className="grid min-w-0 gap-5 p-5 sm:p-6 md:grid-cols-[1fr_.9fr]">
                  <div className="space-y-3">
                    <p className="font-body text-sm leading-relaxed text-slate-300"><strong className="text-emerald-100">Tanda kuadran:</strong> ingat “Saya Sudah Tahu Caranya”: I semua positif, II sin, III tan, IV cos.</p>
                    <p className="font-body text-sm leading-relaxed text-slate-300"><strong className="text-emerald-100">Sudut acuan:</strong> II pakai <InlineMath math="180^\circ-\theta" />, III pakai <InlineMath math="\theta-180^\circ" />, IV pakai <InlineMath math="360^\circ-\theta" />.</p>
                    <p className="font-body text-sm leading-relaxed text-slate-300"><strong className="text-emerald-100">Sudut negatif:</strong> sin dan tan berganti tanda, cos tetap.</p>
                  </div>
                  <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.055] p-4">
                    <div className="mb-2 flex items-center gap-2"><Lightbulb className="h-4 w-4 text-amber-200" aria-hidden="true" /><h3 className="font-display text-base font-extrabold text-amber-50">Trik 4 langkah</h3></div>
                    <ol className="list-inside list-decimal space-y-2 font-body text-sm leading-relaxed text-slate-200">
                      <li>Letakkan sudut di kuadran yang tepat.</li>
                      <li>Temukan sudut acuannya, α.</li>
                      <li>Pilih tanda dari CAST / ASTC.</li>
                      <li>Masukkan nilai sudut istimewa dan hitung rapi.</li>
                    </ol>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-white/10 bg-white/[.025] px-5 py-4 sm:px-6">
                  <Target className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" aria-hidden="true" />
                  <p className="font-body text-sm leading-relaxed text-slate-300">Saat ragu, jangan hafalkan rumus tanpa arah. Gambar sumbu-x dan sumbu-y kecil, tandai kuadran, lalu cek tanda dari koordinatnya. Kamu bisa menelusuri polanya sendiri.</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-8 rounded-3xl border border-white/10 bg-[#101b2d]/75 p-5">
              <p className="mb-3 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-200/65">Bekal sesi ini</p>
              <p className="font-display text-3xl font-black text-white">4 <span className="text-sm font-bold text-slate-400">langkah</span></p>
              <div className="my-4 h-px bg-white/10" />
              <p className="font-body text-sm leading-relaxed text-slate-300">Tentukan kuadran, ukur sudut acuan, pilih tanda, lalu gunakan nilai sudut istimewa.</p>
              <button type="button" onClick={() => jumpTo("contoh-soal")} className="mt-4 w-full rounded-xl border border-cyan-200/20 bg-cyan-200/[.08] px-3 py-2.5 text-left font-body text-xs font-bold text-cyan-100 transition hover:bg-cyan-200/[.14] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200" data-testid="button-ulang-contoh">Lihat contoh langkah demi langkah</button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SmaNilaiKuadranPage;
