import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { BlockMath, InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

const InlineMath = ({ math }: { math: string }) => <KaTeXInlineMath math={math} />;

const Formula = ({ math, label }: { math: string; label?: string }) => (
  <div className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/90 px-3 py-3 text-center text-cyan-100 sm:px-5">
    {label && <p className="mb-2 text-left font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/45">{label}</p>}
    <BlockMath math={math} />
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
    <div>
      <p className="mb-1 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-200/65">{kicker}</p>
      <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-slate-300">{description}</p>
    </div>
  </div>
);

const UnitCircleDiagram = () => (
  <svg viewBox="0 0 360 290" role="img" aria-label="Lingkaran satuan: titik pada sudut nol derajat adalah (1, 0), sedangkan titik pada sudut 90 derajat adalah (0, 1)." className="block h-auto w-full">
    <circle cx="166" cy="145" r="94" fill="#0a1c31" stroke="#50647e" strokeWidth="2" />
    <line x1="45" y1="145" x2="294" y2="145" stroke="#8495a8" strokeWidth="1.5" />
    <line x1="166" y1="265" x2="166" y2="27" stroke="#8495a8" strokeWidth="1.5" />
    <line x1="166" y1="145" x2="260" y2="145" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
    <line x1="166" y1="145" x2="166" y2="51" stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" />
    <circle cx="260" cy="145" r="6" fill="#fbbf24" stroke="#fffbeb" strokeWidth="2" />
    <circle cx="166" cy="51" r="6" fill="#67e8f9" stroke="#ecfeff" strokeWidth="2" />
    <circle cx="166" cy="145" r="4" fill="#f8fafc" />
    <text x="276" y="136" fill="#fde68a" fontSize="12" fontWeight="700">(1, 0)</text>
    <text x="176" y="45" fill="#a5f3fc" fontSize="12" fontWeight="700">(0, 1)</text>
    <text x="264" y="163" fill="#fde68a" fontSize="12" fontWeight="700">0°</text>
    <text x="174" y="68" fill="#a5f3fc" fontSize="12" fontWeight="700">90°</text>
    <text x="294" y="139" fill="#94a3b8" fontSize="12">x</text>
    <text x="171" y="26" fill="#94a3b8" fontSize="12">y</text>
    <text x="210" y="133" fill="#fde68a" fontSize="11" fontWeight="700">cos θ</text>
    <text x="176" y="101" fill="#a5f3fc" fontSize="11" fontWeight="700">sin θ</text>
    <text x="23" y="280" fill="#94a3b8" fontSize="10">Jari-jari = 1 · koordinat titik = (cos θ, sin θ)</text>
  </svg>
);

const FortyFiveTriangle = () => (
  <svg viewBox="0 0 360 300" role="img" aria-label="Segitiga siku-siku sama kaki dengan kedua kaki panjang 1, sisi miring akar 2, dan dua sudut lancip masing-masing 45 derajat." className="block h-auto w-full">
    <path d="M90 242 L90 82 L250 242 Z" fill="#67e8f9" fillOpacity=".08" stroke="#66809c" strokeWidth="1.5" />
    <path d="M90 242 L90 82" stroke="#67e8f9" strokeWidth="6" strokeLinecap="round" />
    <path d="M90 242 L250 242" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
    <path d="M90 242 L250 82" stroke="#c4b5fd" strokeWidth="6" strokeLinecap="round" />
    <path d="M90 222 L110 222 L110 242" fill="none" stroke="#e2e8f0" strokeWidth="2" />
    <path d="M90 215 A27 27 0 0 1 109 223" fill="none" stroke="#fda4af" strokeWidth="2.5" />
    <path d="M226 242 A24 24 0 0 0 233 225" fill="none" stroke="#fda4af" strokeWidth="2.5" />
    <text x="53" y="167" fill="#a5f3fc" fontSize="14" fontWeight="700" transform="rotate(-90 53 167)">1</text>
    <text x="167" y="266" fill="#fde68a" fontSize="14" fontWeight="700" textAnchor="middle">1</text>
    <text x="180" y="151" fill="#ddd6fe" fontSize="14" fontWeight="700" transform="rotate(-45 180 151)">√2</text>
    <text x="116" y="223" fill="#fda4af" fontSize="12" fontWeight="700">45°</text>
    <text x="204" y="229" fill="#fda4af" fontSize="12" fontWeight="700">45°</text>
    <text x="77" y="259" fill="#94a3b8" fontSize="10">90°</text>
    <text x="22" y="288" fill="#94a3b8" fontSize="10">Dua kaki sama panjang: segitiga siku-siku sama kaki.</text>
  </svg>
);

const ThirtySixtyTriangle = () => (
  <svg viewBox="0 0 390 300" role="img" aria-label="Segitiga siku-siku 30-60-90 dengan sisi di depan sudut 30 derajat panjang 1, sisi di depan 60 derajat panjang akar 3, dan sisi miring 2." className="block h-auto w-full">
    <path d="M92 242 L92 122 L300 242 Z" fill="#fbbf24" fillOpacity=".07" stroke="#66809c" strokeWidth="1.5" />
    <path d="M92 242 L92 122" stroke="#67e8f9" strokeWidth="6" strokeLinecap="round" />
    <path d="M92 242 L300 242" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
    <path d="M92 122 L300 242" stroke="#c4b5fd" strokeWidth="6" strokeLinecap="round" />
    <path d="M92 224 L110 224 L110 242" fill="none" stroke="#e2e8f0" strokeWidth="2" />
    <path d="M92 148 A26 26 0 0 1 114 135" fill="none" stroke="#fda4af" strokeWidth="2.5" />
    <path d="M275 242 A25 25 0 0 0 278 229" fill="none" stroke="#fda4af" strokeWidth="2.5" />
    <text x="62" y="185" fill="#a5f3fc" fontSize="14" fontWeight="700">1</text>
    <text x="194" y="266" fill="#fde68a" fontSize="14" fontWeight="700" textAnchor="middle">√3</text>
    <text x="200" y="163" fill="#ddd6fe" fontSize="14" fontWeight="700" transform="rotate(30 200 163)">2</text>
    <text x="117" y="154" fill="#fda4af" fontSize="12" fontWeight="700">60°</text>
    <text x="247" y="231" fill="#fda4af" fontSize="12" fontWeight="700">30°</text>
    <text x="74" y="259" fill="#94a3b8" fontSize="10">90°</text>
    <text x="22" y="288" fill="#94a3b8" fontSize="10">Sisi 1, √3, dan 2 adalah perbandingan panjang.</text>
  </svg>
);

const SmaSudutIstimewaPage = () => {
  const [answerVisible, setAnswerVisible] = useState(false);

  const jumpTo = (id: string) => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
  };

  return (
    <div className="animation-submaterial-route relative min-h-[100dvh] overflow-x-hidden bg-[#080f1e] text-slate-100">
      <Starfield />
      <style>{`
        @keyframes special-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .special-rise { animation: special-rise .65s cubic-bezier(.2,.7,.2,1) both; }
        .special-rise-delay { animation-delay: .12s; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
        }
      `}</style>
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri" />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
        <header className="special-rise relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,48,70,.97),rgba(16,25,45,.95)_57%,rgba(66,43,66,.9))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-cyan-100/10" />
          <div className="pointer-events-none absolute right-9 top-12 h-40 w-40 rounded-full border border-amber-100/10" />
          <div className="relative grid items-center gap-7 md:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100"><BookOpen className="h-3.5 w-3.5" /> Matematika · SMA</span>
                <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">Buku Animasi Matematika</span>
              </div>
              <p className="mb-2 font-body text-xs font-bold uppercase tracking-[.24em] text-amber-200">Trigonometri · sudut istimewa</p>
              <h1 className="max-w-2xl font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">Lima sudut.<br /><span className="text-cyan-200">Pola yang mudah diingat.</span></h1>
              <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">Kenali nilai sinus, cosinus, dan tangen dari bentuk segitiga dan lingkaran satuan—tanpa menebak, tanpa kalkulator.</p>
              <button type="button" onClick={() => jumpTo("ringkasan-nilai")} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-300 px-4 py-3 font-body text-sm font-extrabold text-slate-950 transition hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-100" data-testid="button-lompat-tabel">
                Langsung ke tabel <ArrowDown className="h-4 w-4" />
              </button>
            </div>
            <div className="mx-auto w-full max-w-sm rounded-3xl border border-cyan-100/10 bg-[#071326]/55 p-3 sm:p-4">
              <UnitCircleDiagram />
              <p className="px-2 pb-1 text-center font-body text-xs leading-relaxed text-slate-400">Sudut berputar, koordinat titik pada lingkaran satuan bercerita.</p>
            </div>
          </div>
        </header>

        <nav aria-label="Isi materi" className="mb-12 flex gap-2 overflow-x-auto pb-2">
          {[
            ["rasio-dasar", "Rasio dasar"],
            ["nol-dan-sembilan-puluh", "0° & 90°"],
            ["segitiga-khusus", "Segitiga khusus"],
            ["ringkasan-nilai", "Tabel nilai"],
          ].map(([id, label]) => (
            <button key={id} type="button" onClick={() => jumpTo(id)} className="shrink-0 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 font-body text-xs font-bold text-slate-300 transition hover:border-cyan-200/35 hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200" data-testid={`button-nav-${id}`}>
              {label}
            </button>
          ))}
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_230px] lg:gap-12">
          <div className="min-w-0 space-y-14">
            <section id="rasio-dasar" className="scroll-mt-8">
              <SectionHeading index="01" kicker="Mulai dari segitiga siku-siku" title="Tiga rasio, satu sudut acuan" description="Pilih sudut lancip θ. Nama sisi depan dan sisi samping ditentukan dari posisi θ; sisi miring selalu berada di seberang sudut siku-siku." />
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { title: "Sinus", math: "\\sin\\theta=\\frac{\\text{sisi depan}}{\\text{sisi miring}}", style: "border-cyan-200/15 bg-cyan-200/[.045]", titleStyle: "text-cyan-100", note: "depan dibanding miring" },
                  { title: "Cosinus", math: "\\cos\\theta=\\frac{\\text{sisi samping}}{\\text{sisi miring}}", style: "border-amber-200/15 bg-amber-200/[.045]", titleStyle: "text-amber-100", note: "samping dibanding miring" },
                  { title: "Tangen", math: "\\tan\\theta=\\frac{\\text{sisi depan}}{\\text{sisi samping}}", style: "border-violet-200/15 bg-violet-200/[.045]", titleStyle: "text-violet-100", note: "depan dibanding samping" },
                ].map((item) => (
                  <article key={item.title} className={`rounded-2xl border p-4 ${item.style}`}>
                    <p className={`mb-2 font-body text-xs font-black uppercase tracking-[.16em] ${item.titleStyle}`}>{item.title}</p>
                    <div className="overflow-x-auto text-sm text-white"><InlineMath math={item.math} /></div>
                    <p className="mt-2 font-body text-xs text-slate-400">{item.note}</p>
                  </article>
                ))}
              </div>
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200/15 bg-amber-200/[.06] p-4">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" />
                <p className="font-body text-sm leading-relaxed text-amber-50/90"><strong className="text-amber-100">Pengingat penting:</strong> “depan” dan “samping” berubah saat sudut acuannya berubah. Sisi miring tidak berubah.</p>
              </div>
            </section>

            <section id="nol-dan-sembilan-puluh" className="scroll-mt-8">
              <SectionHeading index="02" kicker="Buka definisi ke lingkaran satuan" title="Apa yang terjadi di 0° dan 90°?" description="Di lingkaran satuan, jari-jari bernilai 1. Titik pada sudut θ memiliki koordinat (cos θ, sin θ), jadi koordinatnya langsung memberi cosinus dan sinus." />
              <div className="grid items-center gap-4 md:grid-cols-[.9fr_1.1fr]">
                <div className="rounded-3xl border border-cyan-200/15 bg-[linear-gradient(145deg,rgba(13,92,112,.13),rgba(15,27,44,.88))] p-4 sm:p-5">
                  <UnitCircleDiagram />
                </div>
                <div className="space-y-3">
                  <article className="rounded-2xl border border-amber-200/15 bg-amber-200/[.05] p-4">
                    <p className="mb-2 font-body text-xs font-black uppercase tracking-[.17em] text-amber-100">Titik pada 0°</p>
                    <Formula math="(\cos 0^\circ,\sin 0^\circ)=(1,0)" />
                    <p className="mt-3 font-body text-sm leading-relaxed text-slate-300">Maka <InlineMath math="\cos0^\circ=1" /> dan <InlineMath math="\sin0^\circ=0" />. Karena <InlineMath math="\tan\theta=\frac{\sin\theta}{\cos\theta}" />, <InlineMath math="\tan0^\circ=0" />.</p>
                  </article>
                  <article className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4">
                    <p className="mb-2 font-body text-xs font-black uppercase tracking-[.17em] text-cyan-100">Titik pada 90°</p>
                    <Formula math="(\cos 90^\circ,\sin 90^\circ)=(0,1)" />
                    <p className="mt-3 font-body text-sm leading-relaxed text-slate-300">Maka <InlineMath math="\cos90^\circ=0" /> dan <InlineMath math="\sin90^\circ=1" />. <InlineMath math="\tan90^\circ" /> <strong className="text-rose-200">tidak terdefinisi</strong>, sebab pembagian dengan nol tidak boleh dilakukan.</p>
                  </article>
                </div>
              </div>
              <p className="mt-4 rounded-xl border border-rose-200/15 bg-rose-200/[.045] px-4 py-3 font-body text-xs leading-relaxed text-rose-50/80"><strong className="text-rose-100">Jangan tertukar:</strong> tangen 90° bukan nilai “tak hingga” biasa. Nilainya tidak terdefinisi karena <InlineMath math="\frac{1}{0}" /> tidak memiliki hasil.</p>
            </section>

            <section id="segitiga-khusus" className="scroll-mt-8">
              <SectionHeading index="03" kicker="Bangun dari bentuk istimewa" title="Dua segitiga membuka tiga sudut" description="Skalanya boleh berbeda; yang penting adalah perbandingan panjang sisinya. Dari sini, semua nilai dapat diturunkan dengan definisi rasio." />

              <article className="mb-4 overflow-hidden rounded-3xl border border-violet-200/15 bg-[linear-gradient(130deg,rgba(49,37,83,.16),rgba(14,25,42,.94)_58%)]">
                <div className="border-b border-white/10 px-5 py-4 sm:px-6">
                  <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-violet-100/70">Bentuk A · sama kaki</p>
                  <h3 className="mt-1 font-display text-xl font-extrabold text-white">Segitiga 45°–45°–90°</h3>
                </div>
                <div className="grid items-center gap-3 p-4 sm:p-5 md:grid-cols-[.85fr_1.15fr]">
                  <div className="rounded-2xl border border-white/10 bg-[#071326]/75 p-2 sm:p-3"><FortyFiveTriangle /></div>
                  <div className="space-y-3">
                    <p className="font-body text-sm leading-relaxed text-slate-300">Kedua kaki sama panjang, kita pilih masing-masing 1. Dengan Pythagoras, sisi miringnya <InlineMath math="\sqrt{1^2+1^2}=\sqrt2" />.</p>
                    <Formula math="\sin45^\circ=\frac{1}{\sqrt2}=\frac{\sqrt2}{2},\quad \cos45^\circ=\frac{1}{\sqrt2}=\frac{\sqrt2}{2}" />
                    <Formula math="\tan45^\circ=\frac{1}{1}=1" />
                    <p className="rounded-xl bg-violet-200/[.06] p-3 font-body text-xs leading-relaxed text-violet-50/80">Sudut 45° punya kaki “depan” dan “samping” yang sama panjang. Itu sebabnya sinus = cosinus dan tangen = 1.</p>
                  </div>
                </div>
              </article>

              <article className="overflow-hidden rounded-3xl border border-amber-200/15 bg-[linear-gradient(130deg,rgba(82,57,18,.13),rgba(14,25,42,.94)_58%)]">
                <div className="border-b border-white/10 px-5 py-4 sm:px-6">
                  <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-amber-100/70">Bentuk B · setengah segitiga sama sisi</p>
                  <h3 className="mt-1 font-display text-xl font-extrabold text-white">Segitiga 30°–60°–90°</h3>
                </div>
                <div className="grid items-center gap-3 p-4 sm:p-5 md:grid-cols-[.85fr_1.15fr]">
                  <div className="rounded-2xl border border-white/10 bg-[#071326]/75 p-2 sm:p-3"><ThirtySixtyTriangle /></div>
                  <div className="space-y-3">
                    <p className="font-body text-sm leading-relaxed text-slate-300">Belah segitiga sama sisi bersisi 2 menjadi dua. Setengah alasnya 1, sisi miring tetap 2, dan tinggi dari Pythagoras adalah <InlineMath math="\sqrt{2^2-1^2}=\sqrt3" />.</p>
                    <div className="rounded-2xl border border-cyan-200/10 bg-cyan-200/[.035] p-3">
                      <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.17em] text-cyan-100">Terhadap sudut 30° · depan 1, samping √3, miring 2</p>
                      <Formula math="\sin30^\circ=\frac12,\quad \cos30^\circ=\frac{\sqrt3}{2},\quad \tan30^\circ=\frac{1}{\sqrt3}=\frac{\sqrt3}{3}" />
                    </div>
                    <div className="rounded-2xl border border-amber-200/10 bg-amber-200/[.035] p-3">
                      <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.17em] text-amber-100">Terhadap sudut 60° · depan √3, samping 1, miring 2</p>
                      <Formula math="\sin60^\circ=\frac{\sqrt3}{2},\quad \cos60^\circ=\frac12,\quad \tan60^\circ=\sqrt3" />
                    </div>
                  </div>
                </div>
              </article>
            </section>

            <section id="ringkasan-nilai" className="scroll-mt-8">
              <SectionHeading index="04" kicker="Ringkas, lalu kenali polanya" title="Tabel sudut istimewa" description="Gunakan garis yang tepat untuk mencari nilai. Simbol “tidak terdefinisi” menandai pembagian dengan nol, bukan sebuah bilangan." />
              <div className="overflow-x-auto rounded-3xl border border-cyan-200/15 bg-[#101b2d]/90 p-2 sm:p-4">
                <table className="w-full min-w-[420px] border-collapse text-center font-body text-sm" aria-label="Nilai sinus, cosinus, dan tangen untuk sudut nol, 30, 45, 60, dan 90 derajat">
                  <thead className="text-cyan-100">
                    <tr className="border-b border-white/10">
                      <th scope="col" className="p-3 text-left font-black">Sudut</th>
                      <th scope="col" className="p-3 font-black"><InlineMath math="\sin\theta" /></th>
                      <th scope="col" className="p-3 font-black"><InlineMath math="\cos\theta" /></th>
                      <th scope="col" className="p-3 font-black"><InlineMath math="\tan\theta" /></th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-200">
                    {[
                      ["0°", "0", "1", "0"],
                      ["30°", "\\frac12", "\\frac{\\sqrt3}{2}", "\\frac{\\sqrt3}{3}"],
                      ["45°", "\\frac{\\sqrt2}{2}", "\\frac{\\sqrt2}{2}", "1"],
                      ["60°", "\\frac{\\sqrt3}{2}", "\\frac12", "\\sqrt3"],
                      ["90°", "1", "0", "\\text{tidak terdefinisi}"],
                    ].map(([angle, sin, cos, tan], index) => (
                      <tr key={angle} className={`border-b border-white/[.07] last:border-0 ${index % 2 ? "bg-white/[.025]" : ""}`}>
                        <th scope="row" className="p-3 text-left font-bold text-white">{angle}</th>
                        <td className="p-3"><InlineMath math={sin} /></td>
                        <td className="p-3"><InlineMath math={cos} /></td>
                        <td className={`p-3 ${angle === "90°" ? "text-rose-200" : ""}`}><InlineMath math={tan} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-[1.1fr_.9fr]">
                <article className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-5">
                  <div className="mb-3 flex items-center gap-2"><Sparkles className="h-4 w-4 text-cyan-200" /><h3 className="font-display text-lg font-extrabold text-cyan-50">Pola akar yang gampang diingat</h3></div>
                  <p className="font-body text-sm leading-relaxed text-slate-300">Urutkan sudut dari 0° sampai 90°. Untuk sinus, akar bilangannya naik dari 0 sampai 4; cosinus membaca urutan yang sama dari belakang.</p>
                  <Formula math="\sin\theta:\quad \frac{\sqrt0}{2},\ \frac{\sqrt1}{2},\ \frac{\sqrt2}{2},\ \frac{\sqrt3}{2},\ \frac{\sqrt4}{2}" />
                  <div className="mt-3"><Formula math="\cos\theta:\quad \frac{\sqrt4}{2},\ \frac{\sqrt3}{2},\ \frac{\sqrt2}{2},\ \frac{\sqrt1}{2},\ \frac{\sqrt0}{2}" /></div>
                  <p className="mt-3 font-body text-xs leading-relaxed text-slate-400">Urutan sudut: <InlineMath math="0^\circ,30^\circ,45^\circ,60^\circ,90^\circ" />. Contohnya, <InlineMath math="\sqrt0/2=0" /> dan <InlineMath math="\sqrt4/2=1" />.</p>
                </article>
                <article className="rounded-3xl border border-violet-200/15 bg-violet-200/[.045] p-5">
                  <div className="mb-3 flex items-center gap-2"><ArrowRight className="h-4 w-4 text-violet-200" /><h3 className="font-display text-lg font-extrabold text-violet-50">Tangen tinggal membagi</h3></div>
                  <p className="font-body text-sm leading-relaxed text-slate-300">Untuk setiap sudut yang cosinusnya bukan nol, tangen adalah sinus dibagi cosinus. Pada 90°, pembaginya nol, jadi tangen tidak terdefinisi.</p>
                  <Formula math="\tan\theta=\frac{\sin\theta}{\cos\theta}\quad (\cos\theta\ne0)" />
                  <p className="mt-3 font-body text-xs leading-relaxed text-slate-400">Contoh cek: <InlineMath math="\tan30^\circ=(1/2)/(\sqrt3/2)=\sqrt3/3" />.</p>
                </article>
              </div>
            </section>

            <section aria-labelledby="cek-pemahaman">
              <div className="overflow-hidden rounded-3xl border border-emerald-200/15 bg-[linear-gradient(130deg,rgba(16,79,64,.16),rgba(14,25,42,.94)_58%)]">
                <div className="border-b border-white/10 px-5 py-4 sm:px-6">
                  <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-emerald-100/70">Cek pemahaman · satu menit</p>
                  <h2 id="cek-pemahaman" className="mt-1 font-display text-xl font-extrabold text-white">Kalau <InlineMath math="\theta=60^\circ" />, berapa nilai cosinus dan tangen?</h2>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="font-body text-sm leading-relaxed text-slate-300">Coba jawab dulu dari tabel atau pola: untuk sudut 60°, sisi samping bernilai 1, sisi depan <InlineMath math="\sqrt3" />, dan sisi miring 2.</p>
                  <button type="button" onClick={() => setAnswerVisible((visible) => !visible)} aria-expanded={answerVisible} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-200/20 bg-emerald-200/[.08] px-4 py-2.5 font-body text-sm font-bold text-emerald-50 transition hover:bg-emerald-200/[.14] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200" data-testid="button-jawaban-cek">
                    {answerVisible ? "Sembunyikan jawaban" : "Lihat jawaban"} <ChevronDown className={`h-4 w-4 transition-transform ${answerVisible ? "rotate-180" : ""}`} />
                  </button>
                  {answerVisible && (
                    <div className="mt-4 flex gap-3 rounded-2xl border border-emerald-200/15 bg-emerald-200/[.06] p-4" role="status" data-testid="answer-cek">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-200" />
                      <p className="font-body text-sm leading-relaxed text-emerald-50/90"><strong>Jawaban:</strong> <InlineMath math="\cos60^\circ=\frac12" /> dan <InlineMath math="\tan60^\circ=\sqrt3" />. Cosinus membagi samping dengan miring; tangen membagi depan dengan samping.</p>
                    </div>
                  )}
                  <div className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-400"><CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200/70" /><p>Jika hasilnya berbeda, periksa lagi sudut acuan dan urutan pembagian sisinya.</p></div>
                </div>
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-8 rounded-2xl border border-white/10 bg-[#101b2d]/75 p-4">
              <p className="mb-3 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-400">Peta belajar</p>
              <ol className="space-y-3 font-body text-xs text-slate-300">
                {[
                  ["01", "Tiga rasio", "rasio-dasar"],
                  ["02", "Lingkaran satuan", "nol-dan-sembilan-puluh"],
                  ["03", "Segitiga khusus", "segitiga-khusus"],
                  ["04", "Tabel & pola", "ringkasan-nilai"],
                ].map(([number, label, id]) => (
                  <li key={id}><button type="button" onClick={() => jumpTo(id)} className="flex w-full items-center gap-2 text-left transition hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"><span className="font-mono text-[10px] text-cyan-200/70">{number}</span>{label}</button></li>
                ))}
              </ol>
              <div className="mt-5 rounded-xl border border-amber-200/10 bg-amber-200/[.045] p-3">
                <p className="font-body text-[10px] font-black uppercase tracking-[.16em] text-amber-100">Inti yang dibawa</p>
                <p className="mt-1 font-body text-xs leading-relaxed text-slate-300">Sinus naik, cosinus berbalik, tangen = sinus ÷ cosinus.</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SmaSudutIstimewaPage;
