import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Compass,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";
import { BlockMath, InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const InlineMath = ({ math }: { math: string }) => <KaTeXInlineMath math={math} />;

const Formula = ({ math, label }: { math: string; label?: string }) => (
  <div
    className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/90 px-4 py-3 text-center text-cyan-100 sm:px-6"
  >
    {label && <p className="mb-2 text-left font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/45">{label}</p>}
    <BlockMath math={math} />
  </div>
);

const SectionTitle = ({
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
  <div className="mb-6 flex gap-4" data-testid={`section-heading-${index}`}>
    <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-display text-xs font-black text-cyan-100">
      {index}
    </span>
    <div>
      <p className="mb-1 font-body text-[10px] font-black uppercase tracking-[.22em] text-cyan-200/65">{kicker}</p>
      <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-slate-300">{description}</p>
    </div>
  </div>
);

const ArrowDiagram = () => (
  <svg viewBox="0 0 520 240" role="img" aria-label="Dua panah vektor sama panjang dan searah, meskipun pangkalnya berbeda" className="block h-auto w-full">
    <defs>
      <marker id="vector-arrowhead" markerWidth="10" markerHeight="10" markerUnits="userSpaceOnUse" refX="8" refY="5" orient="auto">
        <path d="M0 0L10 5L0 10Z" fill="#67e8f9" />
      </marker>
      <marker id="vector-arrowhead-lilac" markerWidth="10" markerHeight="10" markerUnits="userSpaceOnUse" refX="8" refY="5" orient="auto">
        <path d="M0 0L10 5L0 10Z" fill="#c4b5fd" />
      </marker>
      <pattern id="vector-grid" width="28" height="28" patternUnits="userSpaceOnUse">
        <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#94a3b8" strokeOpacity=".1" strokeWidth="1" />
      </pattern>
    </defs>
    <rect x="8" y="8" width="504" height="224" rx="18" fill="url(#vector-grid)" />
    <line x1="86" y1="176" x2="260" y2="88" stroke="#67e8f9" strokeWidth="5" strokeLinecap="round" markerEnd="url(#vector-arrowhead)" />
    <line x1="260" y1="202" x2="434" y2="114" stroke="#c4b5fd" strokeWidth="5" strokeLinecap="round" markerEnd="url(#vector-arrowhead-lilac)" />
    <circle cx="86" cy="176" r="5" fill="#e2e8f0" /><circle cx="260" cy="202" r="5" fill="#e2e8f0" />
    <text x="71" y="198" fill="#cbd5e1" fontSize="13">pangkal P</text>
    <text x="245" y="223" fill="#cbd5e1" fontSize="13">pangkal Q</text>
    <text x="161" y="111" fill="#a5f3fc" fontSize="16" fontWeight="700">u</text>
    <text x="335" y="137" fill="#ddd6fe" fontSize="16" fontWeight="700">v</text>
    <text x="260" y="31" fill="#94a3b8" fontSize="11" textAnchor="middle">Bentuk dan posisi berbeda; besar serta arah sama</text>
    <path d="M168 159l7 14 7-14M342 184l7 14 7-14" fill="none" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CoordinateDiagram = () => (
  <svg viewBox="0 0 390 300" role="img" aria-label="Vektor dari titik A ke titik B di bidang koordinat dengan komponen mendatar dan tegak" className="mx-auto block h-auto w-full max-w-md">
    <defs>
      <marker id="coord-arrow" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" refX="7" refY="4.5" orient="auto">
        <path d="M0 0L9 4.5L0 9Z" fill="#fbbf24" />
      </marker>
      <pattern id="coord-grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M30 0H0V30" fill="none" stroke="#64748b" strokeOpacity=".24" strokeWidth="1" />
      </pattern>
    </defs>
    <rect x="32" y="20" width="330" height="242" rx="14" fill="url(#coord-grid)" />
    <line x1="48" y1="206" x2="352" y2="206" stroke="#94a3b8" strokeWidth="1.5" />
    <line x1="152" y1="250" x2="152" y2="34" stroke="#94a3b8" strokeWidth="1.5" />
    <path d="M180 187L276 91" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" markerEnd="url(#coord-arrow)" />
    <path d="M180 187H276V91" fill="none" stroke="#67e8f9" strokeWidth="2" strokeDasharray="5 5" />
    <circle cx="180" cy="187" r="5" fill="#67e8f9" />
    <circle cx="276" cy="91" r="5" fill="#fbbf24" />
    <text x="161" y="210" fill="#a5f3fc" fontSize="13" fontWeight="700">A</text>
    <text x="281" y="87" fill="#fde68a" fontSize="13" fontWeight="700">B</text>
    <text x="226" y="220" fill="#a5f3fc" fontSize="12" textAnchor="middle">Δx</text>
    <text x="291" y="145" fill="#a5f3fc" fontSize="12">Δy</text>
    <text x="348" y="224" fill="#94a3b8" fontSize="12">x</text>
    <text x="141" y="36" fill="#94a3b8" fontSize="12">y</text>
    <text x="190" y="55" fill="#cbd5e1" fontSize="11">B − A</text>
  </svg>
);

const VectorPage = () => {
  const [answer, setAnswer] = useState<string | null>(null);
  const correct = answer === "components";

  const chooseAnswer = (choice: string) => {
    setAnswer(choice);
    playPopSound();
  };

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
      <Starfield />
      <style>{`
        @keyframes vector-drift { 0%,100% { transform: translateY(0); opacity: .82; } 50% { transform: translateY(-7px); opacity: 1; } }
        @keyframes vector-draw { from { stroke-dashoffset: 340; } to { stroke-dashoffset: 0; } }
        .vector-drift { animation: vector-drift 4.5s ease-in-out infinite; }
        .vector-draw { stroke-dasharray: 340; animation: vector-draw 1.5s cubic-bezier(.2,.7,.25,1) both; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
          .vector-draw { stroke-dasharray: none; }
        }
      `}</style>
      <PageNavigation />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-28 pt-8 sm:px-7 sm:pt-12 lg:px-10">
        <header className="relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.94),rgba(16,22,43,.92)_60%,rgba(44,31,70,.76))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10" data-testid="lesson-hero">
          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-cyan-100/10" />
          <div className="pointer-events-none absolute -right-2 top-0 h-52 w-52 rounded-full border border-violet-200/10" />
          <div className="relative grid items-center gap-7 md:grid-cols-[1.15fr_.85fr]">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Matematika · SMA</span>
                <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">Vektor dan Operasinya</span>
              </div>
              <p className="mb-2 font-body text-xs font-bold uppercase tracking-[.24em] text-amber-200">Ruang untuk bertumbuh</p>
              <h1 className="max-w-2xl font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="lesson-title">
                Konsep dasar <span className="text-cyan-200">vektor</span>
              </h1>
              <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">
                Panah kecil, ide besar. Yuk pahami apa yang membuat vektor berbeda—dan bagaimana membaca komponennya.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-amber-100">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>Tujuan hari ini: mengenali, menuliskan, dan membandingkan vektor.</span>
              </div>
            </div>
            <div className="vector-drift relative mx-auto w-full max-w-md" data-testid="hero-vector-illustration">
              <svg viewBox="0 0 390 230" role="img" aria-label="Ilustrasi vektor sebagai panah dengan panjang dan arah" className="w-full">
                <defs>
                  <linearGradient id="hero-vector-gradient" x1="0" x2="1">
                    <stop offset="0%" stopColor="#67e8f9" /><stop offset="100%" stopColor="#c4b5fd" />
                  </linearGradient>
                  <marker id="hero-vector-tip" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" refX="9" refY="6" orient="auto"><path d="M0 0L12 6L0 12Z" fill="#c4b5fd" /></marker>
                </defs>
                <circle cx="194" cy="112" r="83" fill="none" stroke="#a5f3fc" strokeOpacity=".12" strokeDasharray="3 8" />
                <circle cx="194" cy="112" r="57" fill="none" stroke="#c4b5fd" strokeOpacity=".1" />
                <path d="M63 181L295 54" fill="none" stroke="url(#hero-vector-gradient)" strokeWidth="6" strokeLinecap="round" markerEnd="url(#hero-vector-tip)" className="vector-draw" />
                <circle cx="63" cy="181" r="6" fill="#67e8f9" />
                <text x="42" y="207" fill="#a5f3fc" fontSize="14" fontWeight="700">pangkal</text>
                <text x="296" y="45" fill="#ddd6fe" fontSize="15" fontWeight="700">ujung</text>
                <text x="160" y="102" fill="#f8fafc" fontSize="17" fontWeight="700">besar</text>
                <path d="M202 109l27-15" stroke="#fbbf24" strokeWidth="2" />
                <text x="165" y="205" fill="#94a3b8" fontSize="11">arah ditunjukkan oleh ujung panah</text>
              </svg>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_250px]">
          <div className="min-w-0 space-y-12">
            <section id="section-scalars-vectors" data-testid="scalar-vector-section">
              <SectionTitle index="01" kicker="Kenali dulu" title="Skalar atau vektor?" description="Keduanya punya besar, tetapi hanya vektor yang membawa informasi arah." />
              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-3xl border border-amber-200/20 bg-[linear-gradient(145deg,rgba(120,82,20,.18),rgba(18,27,43,.86))] p-5 sm:p-6" data-testid="scalar-definition">
                  <div className="mb-4 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-200/10 text-amber-200"><Target className="h-5 w-5" /></span><h3 className="font-display text-xl font-extrabold text-amber-100">Skalar</h3></div>
                  <p className="font-body text-sm leading-relaxed text-slate-300">Besaran yang cukup dijelaskan dengan <strong className="text-white">nilai (besar) saja</strong>. Tidak menunjuk ke arah tertentu.</p>
                  <div className="mt-5 flex flex-wrap gap-2">{["massa 2 kg", "waktu 5 s", "suhu 28 °C", "jarak 4 km"].map((item) => <span key={item} className="rounded-full border border-amber-200/15 bg-amber-100/[.06] px-3 py-1.5 font-body text-xs text-amber-50/90">{item}</span>)}</div>
                </article>
                <article className="rounded-3xl border border-cyan-200/20 bg-[linear-gradient(145deg,rgba(13,92,112,.2),rgba(18,27,43,.86))] p-5 sm:p-6" data-testid="vector-definition">
                  <div className="mb-4 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-200/10 text-cyan-200"><ArrowDownRight className="h-5 w-5" /></span><h3 className="font-display text-xl font-extrabold text-cyan-100">Vektor</h3></div>
                  <p className="font-body text-sm leading-relaxed text-slate-300">Besaran yang memiliki <strong className="text-white">besar dan arah</strong>. Arah membuat ceritanya lengkap.</p>
                  <div className="mt-5 flex flex-wrap gap-2">{["perpindahan 4 km ke timur", "kecepatan 20 m/s ke utara", "gaya 10 N ke kanan"].map((item) => <span key={item} className="rounded-full border border-cyan-200/15 bg-cyan-100/[.06] px-3 py-1.5 font-body text-xs text-cyan-50/90">{item}</span>)}</div>
                </article>
              </div>
              <div className="mt-4 flex gap-3 rounded-2xl border border-violet-200/15 bg-violet-300/[.06] p-4 text-sm leading-relaxed text-violet-50/90">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-violet-200" />
                <p><strong className="text-violet-100">Cek cepat:</strong> jarak tempuh adalah skalar; perpindahan adalah vektor. Angka yang sama belum tentu menceritakan hal yang sama.</p>
              </div>
            </section>

            <section id="section-vector-notation" data-testid="notation-section">
              <SectionTitle index="02" kicker="Baca gambarnya" title="Vektor adalah panah" description="Pangkal menunjukkan titik awal, ujung panah menunjukkan arah, dan panjang panah menggambarkan besar vektor." />
              <div className="grid items-center gap-5 rounded-3xl border border-white/10 bg-[#101b2d]/85 p-4 sm:p-6 md:grid-cols-[1.2fr_.8fr]">
                <div className="rounded-2xl border border-white/5 bg-[#071326]/70 p-2 sm:p-3"><ArrowDiagram /></div>
                <div className="space-y-4">
                  <p className="font-body text-sm leading-relaxed text-slate-300">Vektor biasa ditulis dengan huruf tebal atau tanda panah di atas huruf, misalnya <InlineMath math="\vec{u}" />. Panah membantu kita melihat arah, bukan sekadar besar.</p>
                  <Formula math="\vec{u}=\overrightarrow{PQ}" label="Notasi dari P menuju Q" />
                  <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.06] p-4 font-body text-sm leading-relaxed text-cyan-50/90" data-testid="vector-equality-principle">
                    Dua vektor <strong className="text-white">sama</strong> jika besar dan arahnya sama. Letak atau posisi pangkalnya tidak harus sama.
                  </div>
                </div>
              </div>
            </section>

            <section id="section-components" data-testid="components-section">
              <SectionTitle index="03" kicker="Dari titik ke komponen" title="Komponen = ujung dikurangi pangkal" description="Untuk mencari perpindahan, hitung perubahan koordinat pada setiap sumbu. Urutannya selalu titik akhir dikurangi titik awal." />
              <div className="grid items-center gap-5 rounded-3xl border border-white/10 bg-[#101b2d]/85 p-4 sm:p-6 md:grid-cols-[.9fr_1.1fr]">
                <CoordinateDiagram />
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                    <p className="mb-3 font-body text-xs font-bold uppercase tracking-[.18em] text-slate-400">Di bidang <InlineMath math="\mathbb{R}^2" /></p>
                    <Formula math="\overrightarrow{AB}=(x_B-x_A,\ y_B-y_A)" />
                    <p className="mt-3 font-body text-xs leading-relaxed text-slate-400">Komponen pertama arah <InlineMath math="x" />, komponen kedua arah <InlineMath math="y" />.</p>
                  </div>
                  <div className="rounded-2xl border border-violet-200/15 bg-violet-300/[.05] p-4">
                    <p className="mb-3 font-body text-xs font-bold uppercase tracking-[.18em] text-violet-100/75">Di ruang <InlineMath math="\mathbb{R}^3" /></p>
                    <Formula math="\overrightarrow{AB}=(x_B-x_A,\ y_B-y_A,\ z_B-z_A)" />
                    <p className="mt-3 font-body text-xs leading-relaxed text-slate-400">Tambahkan perubahan pada sumbu <InlineMath math="z" />.</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="section-representations" data-testid="representations-section">
              <SectionTitle index="04" kicker="Tiga cara menulis" title="Koordinat, kolom, dan basis satuan" description="Bentuknya bisa berbeda, tetapi komponen yang dibawa tetap sama." />
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.045] p-4">
                  <p className="mb-3 font-body text-xs font-black uppercase tracking-[.15em] text-cyan-100">Koordinat Kartesius</p>
                  <Formula math="\vec{v}=(a,b)" />
                  <p className="mt-3 font-body text-xs leading-relaxed text-slate-400">Menuliskan komponen sejajar sumbu <InlineMath math="x" /> dan <InlineMath math="y" />.</p>
                </div>
                <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.045] p-4">
                  <p className="mb-3 font-body text-xs font-black uppercase tracking-[.15em] text-violet-100">Vektor kolom</p>
                  <Formula math="\vec{v}=\begin{pmatrix}a\\b\end{pmatrix}" />
                  <p className="mt-3 font-body text-xs leading-relaxed text-slate-400">Komponen ditumpuk; di <InlineMath math="\mathbb{R}^3" /> menjadi kolom tiga baris.</p>
                </div>
                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-4">
                  <p className="mb-3 font-body text-xs font-black uppercase tracking-[.15em] text-amber-100">Basis satuan</p>
                  <Formula math="\vec{v}=a\mathbf{i}+b\mathbf{j}+c\mathbf{k}" />
                  <p className="mt-3 font-body text-xs leading-relaxed text-slate-400"><InlineMath math="\mathbf{i},\mathbf{j},\mathbf{k}" /> menunjuk arah satuan pada sumbu <InlineMath math="x,y,z" />.</p>
                </div>
              </div>
              <div className="mt-3 rounded-2xl border border-white/10 bg-white/[.035] p-4">
                <p className="mb-2 font-body text-xs font-bold uppercase tracking-[.16em] text-slate-300">Basis satuan dalam koordinat</p>
                <Formula math="\mathbf{i}=(1,0,0),\quad \mathbf{j}=(0,1,0),\quad \mathbf{k}=(0,0,1)" />
              </div>
            </section>

            <section id="section-magnitude" data-testid="magnitude-section">
              <SectionTitle index="05" kicker="Seberapa panjang?" title="Menentukan besar vektor" description="Panjang panah didapat dengan Teorema Pythagoras: kuadratkan setiap komponen, jumlahkan, lalu akarkan." />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-cyan-200/15 bg-[#101b2d]/85 p-5">
                  <p className="mb-3 font-body text-xs font-black uppercase tracking-[.17em] text-cyan-100">Dua dimensi</p>
                  <Formula math="\vec{v}=(a,b)\quad\Longrightarrow\quad |\vec{v}|=\sqrt{a^2+b^2}" />
                  <div className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-slate-300"><Compass className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" /><p>Komponen <InlineMath math="a" /> dan <InlineMath math="b" /> menjadi kaki segitiga siku-siku.</p></div>
                </div>
                <div className="rounded-3xl border border-violet-200/15 bg-[#101b2d]/85 p-5">
                  <p className="mb-3 font-body text-xs font-black uppercase tracking-[.17em] text-violet-100">Tiga dimensi</p>
                  <Formula math="\vec{v}=(a,b,c)\quad\Longrightarrow\quad |\vec{v}|=\sqrt{a^2+b^2+c^2}" />
                  <div className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-slate-300"><Compass className="mt-0.5 h-4 w-4 shrink-0 text-violet-200" /><p>Komponen arah <InlineMath math="z" /> ikut menyumbang pada panjang total.</p></div>
                </div>
              </div>
            </section>

            <section id="section-worked-example" data-testid="worked-example-section">
              <SectionTitle index="06" kicker="Coba bersama" title="Dari A ke B: hitung komponen, lalu panjang" description="Hati-hati dengan tanda negatif. Tulis koordinat tujuan dikurangi koordinat awal." />
              <article className="overflow-hidden rounded-3xl border border-amber-200/20 bg-[linear-gradient(135deg,rgba(81,59,26,.16),rgba(14,25,42,.94)_55%)]" data-testid="worked-vector-example">
                <div className="border-b border-white/10 px-5 py-4 sm:px-6">
                  <p className="font-body text-xs font-black uppercase tracking-[.18em] text-amber-200">Contoh terpandu · <InlineMath math="A(3,-5),\\ B(-2,7)" /></p>
                  <p className="mt-2 font-body text-sm text-slate-300">Tentukan <InlineMath math="\overrightarrow{AB}" /> dan panjangnya.</p>
                </div>
                <div className="grid gap-3 p-4 sm:p-6">
                  <div className="grid gap-3 sm:grid-cols-[115px_1fr] sm:items-center">
                    <span className="font-body text-xs font-bold uppercase tracking-wider text-cyan-100">1 · Komponen</span>
                    <Formula math="\overrightarrow{AB}=B-A=((-2)-3,\ 7-(-5))=(-5,12)" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-[115px_1fr] sm:items-center">
                    <span className="font-body text-xs font-bold uppercase tracking-wider text-violet-100">2 · Panjang</span>
                    <Formula math="|\overrightarrow{AB}|=\sqrt{(-5)^2+12^2}=\sqrt{25+144}=\sqrt{169}=13" />
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl border border-emerald-200/20 bg-emerald-300/[.07] p-4" data-testid="worked-example-result">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-200" />
                    <p className="font-body text-sm leading-relaxed text-emerald-50"><strong>Jadi,</strong> <InlineMath math="\overrightarrow{AB}=(-5,12)" /> dan panjangnya <InlineMath math="13" /> satuan. Tanda negatif pada komponen <InlineMath math="x" /> berarti bergerak ke kiri.</p>
                  </div>
                </div>
              </article>
            </section>

            <section id="section-equality-parallel" data-testid="equality-parallel-section">
              <SectionTitle index="07" kicker="Bandingkan arahnya" title="Sama, atau sejajar?" description="Komponen membantu kita mengenali kedua hubungan ini dengan cepat." />
              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-3xl border border-emerald-200/15 bg-emerald-200/[.045] p-5">
                  <h3 className="mb-3 font-display text-lg font-extrabold text-emerald-100">Vektor sama</h3>
                  <p className="mb-4 font-body text-sm leading-relaxed text-slate-300">Dua vektor sama jika komponen-komponen yang bersesuaian sama. Artinya, besar dan arahnya juga sama.</p>
                  <Formula math="\vec{u}=(a,b),\ \vec{v}=(c,d)\quad\Longrightarrow\quad \vec{u}=\vec{v}\iff a=c\text{ dan }b=d" />
                </article>
                <article className="rounded-3xl border border-violet-200/15 bg-violet-200/[.045] p-5">
                  <h3 className="mb-3 font-display text-lg font-extrabold text-violet-100">Vektor sejajar</h3>
                  <p className="mb-4 font-body text-sm leading-relaxed text-slate-300">Vektor sejajar jika salah satunya merupakan kelipatan skalar vektor yang lain. Pengali negatif membalik arah.</p>
                  <Formula math="\vec{v}=k\vec{u},\quad k\in\mathbb{R}" />
                  <div className="mt-3 space-y-2 rounded-xl border border-white/10 bg-[#071326]/65 p-3 font-body text-xs leading-relaxed text-slate-300">
                    <p><InlineMath math="k>0" />: searah dan sejajar.</p>
                    <p><InlineMath math="k<0" />: berlawanan arah, tetap sejajar.</p>
                    <p>Contoh: <InlineMath math="\vec{u}=(2,3)" /> dan <InlineMath math="\vec{v}=(-4,-6)=-2\vec{u}" /> sejajar, arahnya berlawanan.</p>
                  </div>
                </article>
              </div>
            </section>

            <section id="section-concept-check" className="rounded-3xl border border-cyan-200/20 bg-[linear-gradient(135deg,rgba(9,79,100,.18),rgba(16,24,43,.94))] p-5 sm:p-6" data-testid="concept-check">
              <div className="mb-4 flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-100/20 bg-cyan-100/[.08] text-cyan-100"><Lightbulb className="h-5 w-5" /></span>
                <div><p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-200/65">Cek pemahaman</p><h2 className="mt-1 font-display text-xl font-extrabold text-white">Apa yang menentukan kesamaan dua vektor?</h2></div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  ["position", "Posisi pangkalnya harus sama"],
                  ["components", "Besar dan arah harus sama"],
                  ["length", "Panjangnya saja harus sama"],
                  ["color", "Warna panahnya harus sama"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => chooseAnswer(value)}
                    aria-pressed={answer === value}
                    data-testid={`answer-${value}`}
                    className={`rounded-xl border px-4 py-3 text-left font-body text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-200/70 ${answer === value ? (value === "components" ? "border-emerald-200/50 bg-emerald-300/10 text-emerald-50" : "border-rose-200/50 bg-rose-300/10 text-rose-50") : "border-white/10 bg-white/[.035] text-slate-200 hover:border-cyan-100/35 hover:bg-cyan-100/[.05]"}`}
                  >{label}</button>
                ))}
              </div>
              {answer && (
                <div className={`mt-4 flex items-start gap-3 rounded-xl border p-4 font-body text-sm leading-relaxed ${correct ? "border-emerald-200/20 bg-emerald-300/[.07] text-emerald-50" : "border-amber-200/20 bg-amber-300/[.06] text-amber-50"}`} role="status" data-testid="answer-feedback">
                  {correct ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />}
                  <p>{correct ? "Betul! Vektor tetap sama meskipun pangkalnya berpindah, selama besar dan arahnya tidak berubah." : "Belum tepat. Bayangkan panah yang sama digeser tanpa diputar atau diubah panjangnya—apakah vektornya berubah?"}</p>
                </div>
              )}
              {answer && <button type="button" onClick={() => { setAnswer(null); playPopSound(); }} className="mt-3 inline-flex items-center gap-2 rounded-lg px-2 py-1 font-body text-xs font-bold text-cyan-100/75 transition-colors hover:text-cyan-50" data-testid="reset-answer"><RotateCcw className="h-3.5 w-3.5" />Coba lagi</button>}
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/[.035] p-5 sm:p-7" data-testid="lesson-summary">
              <div className="mb-4 flex items-center gap-2 text-amber-200"><Sparkles className="h-4 w-4" /><p className="font-body text-xs font-black uppercase tracking-[.2em]">Bekal yang dibawa</p></div>
              <h2 className="font-display text-2xl font-extrabold text-white">Inti konsepnya, dalam tiga pengingat</h2>
              <ol className="mt-5 grid gap-3 sm:grid-cols-3">
                <li className="rounded-2xl border border-white/10 bg-[#0b1424]/70 p-4"><span className="font-display text-lg font-black text-cyan-200">01</span><p className="mt-2 font-body text-sm leading-relaxed text-slate-300">Vektor punya <strong className="text-white">besar dan arah</strong>; skalar hanya punya besar.</p></li>
                <li className="rounded-2xl border border-white/10 bg-[#0b1424]/70 p-4"><span className="font-display text-lg font-black text-violet-200">02</span><p className="mt-2 font-body text-sm leading-relaxed text-slate-300">Komponen perpindahan = <strong className="text-white">koordinat tujuan − awal</strong>.</p></li>
                <li className="rounded-2xl border border-white/10 bg-[#0b1424]/70 p-4"><span className="font-display text-lg font-black text-amber-200">03</span><p className="mt-2 font-body text-sm leading-relaxed text-slate-300">Kelipatan negatif tetap sejajar, tetapi <strong className="text-white">berlawanan arah</strong>.</p></li>
              </ol>
            </section>
          </div>

          <aside className="hidden lg:block" aria-label="Ringkasan navigasi materi">
            <div className="sticky top-6 rounded-2xl border border-white/10 bg-[#0d1728]/90 p-4 backdrop-blur" data-testid="lesson-outline">
              <p className="mb-4 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-400">Peta materi</p>
              <ol className="space-y-3 font-body text-xs text-slate-300">
                {[
                  ["Skalar dan vektor", "section-scalars-vectors"],
                  ["Notasi panah", "section-vector-notation"],
                  ["Komponen", "section-components"],
                  ["Representasi", "section-representations"],
                  ["Besar vektor", "section-magnitude"],
                  ["Contoh A ke B", "section-worked-example"],
                  ["Sama dan sejajar", "section-equality-parallel"],
                  ["Cek pemahaman", "section-concept-check"],
                ].map(([item, target], index) => (
                  <li key={target}>
                    <a href={`#${target}`} data-testid={`link-lesson-section-${index + 1}`} className="flex items-center gap-2 rounded-md transition-colors hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200/70">
                      <span className="grid h-5 w-5 place-items-center rounded-md bg-white/[.06] text-[10px] font-bold text-cyan-100/80">{String(index + 1).padStart(2, "0")}</span>{item}
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-400"><span className="mb-2 flex items-center gap-2 font-bold text-amber-100"><ArrowRight className="h-3.5 w-3.5" />Tips belajar</span>Selalu tulis urutan titiknya. <InlineMath math="\overrightarrow{AB}" /> berarti tujuan <InlineMath math="B" /> dikurangi awal <InlineMath math="A" />.</div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default VectorPage;