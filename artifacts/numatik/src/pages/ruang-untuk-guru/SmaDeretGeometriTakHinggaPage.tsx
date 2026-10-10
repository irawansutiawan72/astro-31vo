import { useMemo, type ReactNode } from "react";
import { ArrowDown, Check, Compass, Lightbulb, Sparkles } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import PageNavigation from "@/components/PageNavigation";
import Starfield from "@/components/Starfield";

const Formula = ({ math, tone = "cyan" }: { math: string; tone?: "cyan" | "pink" | "amber" }) => {
  const tones = {
    cyan: "border-cyan-200/25 bg-cyan-300/[.08] text-cyan-50",
    pink: "border-pink-200/25 bg-pink-300/[.08] text-pink-50",
    amber: "border-amber-200/25 bg-amber-300/[.08] text-amber-50",
  };
  return (
    <div className={`series-formula w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain rounded-2xl border px-2 py-3 text-center sm:px-5 ${tones[tone]}`}>
      <BlockMath math={math} />
    </div>
  );
};

const SectionHeading = ({ number, eyebrow, title, children }: { number: string; eyebrow: string; title: ReactNode; children: ReactNode }) => (
  <div className="mb-6 flex gap-4">
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-cyan-100/20 bg-cyan-200/10 font-display text-sm font-black text-cyan-100">{number}</span>
    <div className="min-w-0"><p className="mb-1 font-body text-[10px] font-black uppercase tracking-[.22em] text-cyan-200/70">{eyebrow}</p><h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2><p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-slate-300">{children}</p></div>
  </div>
);

const ExampleCard = ({ number, title, problem, children, answer }: { number: string; title: string; problem: ReactNode; children: ReactNode; answer: ReactNode }) => (
  <article className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#111c31]/90 shadow-xl shadow-black/15" data-testid={`infinite-series-example-${number}`}>
    <div className="flex items-center gap-3 border-b border-white/10 bg-white/[.025] px-4 py-4 sm:px-6">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-300 to-pink-300 font-display text-sm font-black text-[#311630]">{number}</span>
      <h3 className="font-display text-base font-extrabold text-white sm:text-lg">{title}</h3>
    </div>
      <div className="grid min-w-0 gap-3 p-4 sm:p-6 md:grid-cols-[.85fr_1.15fr] md:items-start">
      <div className="min-w-0 rounded-2xl border border-amber-200/20 bg-amber-300/[.07] p-4">
        <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.18em] text-amber-200">Soal</p>
        <div className="font-body text-sm leading-relaxed text-amber-50">{problem}</div>
      </div>
      <div className="min-w-0 rounded-2xl border border-cyan-200/20 bg-cyan-300/[.055] p-4">
        <p className="mb-3 font-body text-[10px] font-black uppercase tracking-[.18em] text-cyan-200">Pembahasan</p>
        <div className="space-y-3 font-body text-sm leading-relaxed text-slate-200">{children}</div>
        <div className="mt-4 rounded-xl border border-emerald-200/20 bg-emerald-300/[.08] p-3 font-body text-sm font-semibold text-emerald-100"><div className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><div className="min-w-0 flex-1">{answer}</div></div></div>
      </div>
    </div>
  </article>
);

const outline = [
  ["Ide dasar", "ide-dasar"],
  ["Rumus & konvergensi", "rumus-konvergensi"],
  ["Contoh", "contoh-soal"],
  ["Suku ganjil-genap", "ganjil-genap"],
];

const SmaDeretGeometriTakHinggaPage = () => {
  const map = useMemo(() => outline, []);
  return (
    <div className="series-lesson relative min-h-[100dvh] overflow-hidden bg-[#090f20] text-slate-100">
      <Starfield />
      <style>{`
        @keyframes series-enter { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes series-drift { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-7px) rotate(2deg); } }
        .series-enter { animation: series-enter .55s cubic-bezier(.2,.7,.2,1) both; }
        .series-drift { animation: series-drift 5s ease-in-out infinite; }
        .series-enter-delay { animation-delay: .12s; }
        .series-formula { font-size: clamp(.72rem, 3.2vw, .95rem); }
        .series-formula .katex-display { margin: 0; overflow: visible; }
        .series-formula .katex-display > .katex { white-space: nowrap; }
        @media (min-width: 640px) { .series-formula { font-size: 1rem; } }
        @media (orientation: portrait) {
          .series-lesson > div.fixed.left-0.bottom-0 { top: max(1rem, env(safe-area-inset-top, 0px)); bottom: auto; }
          .series-lesson > main { padding-top: 8rem; }
        }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }
      `}</style>
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/barisan-dan-deret" />
        <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-20 sm:px-7 sm:pt-11 lg:px-10">
        <header className="series-enter relative mb-8 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(13,47,74,.97),rgba(28,27,61,.96)_55%,rgba(78,35,72,.9))] px-5 py-7 shadow-2xl shadow-black/30 sm:px-9 sm:py-10" data-testid="infinite-series-hero">
          <div className="pointer-events-none absolute -right-12 -top-20 h-72 w-72 rounded-full border border-cyan-100/10" />
          <div className="pointer-events-none absolute -right-2 top-12 h-44 w-44 rounded-full border border-pink-100/10" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1.15fr_.85fr]">
            <div>
              <div className="mb-5 flex flex-wrap gap-2"><span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Matematika · SMA</span><span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">Barisan dan Deret</span></div>
              <p className="mb-2 font-body text-xs font-bold uppercase tracking-[.22em] text-amber-200">Petualangan Seru di Dunia</p>
              <h1 className="max-w-3xl font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="lesson-title">Deret Geometri <span className="bg-gradient-to-r from-cyan-200 via-amber-200 to-pink-200 bg-clip-text text-transparent">Tak Hingga!</span> 🚀✨</h1>
              <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-slate-200 sm:text-lg">Halo teman-teman hebat kelas SMA! Pernahkah kalian membayangkan sesuatu yang berlangsung tanpa henti alias tak hingga, tapi hasilnya justru bisa dihitung dengan pas dan rapi? Wah, terdengar seperti keajaiban, bukan? Yuk, kita bedah rahasianya bersama-sama dengan penuh semangat dan senyuman ceria! 😊</p>
            </div>
            <div className="series-drift mx-auto w-full max-w-sm rounded-[2rem] border border-white/10 bg-[#0a1428]/65 p-4 shadow-2xl shadow-black/20">
              <div className="rounded-[1.5rem] border border-cyan-100/10 bg-[radial-gradient(circle_at_50%_48%,rgba(34,211,238,.13),transparent_57%)] p-4">
                <svg viewBox="0 0 360 230" role="img" aria-label="Deret dengan suku-suku yang semakin kecil mendekati jumlah terbatas" className="w-full">
                  <defs><linearGradient id="series-bars" x1="0" x2="1"><stop stopColor="#67e8f9" /><stop offset="1" stopColor="#f9a8d4" /></linearGradient></defs>
                  <path d="M24 188H336" stroke="#94a3b8" strokeOpacity=".35" strokeWidth="2" />
                  {[132, 90, 61, 41, 28, 19, 13].map((height, i) => <g key={i}><rect x={38 + i * 43} y={188 - height} width="25" height={height} rx="8" fill="url(#series-bars)" opacity={1 - i * .07} /><circle cx={50 + i * 43} cy={183 - height} r="3.5" fill="#fff" /></g>)}
                  <path d="M50 42C108 70 154 117 196 145S276 173 322 177" fill="none" stroke="#fde68a" strokeWidth="2.5" strokeDasharray="5 7" />
                  <text x="25" y="218" fill="#cbd5e1" fontSize="11">suku makin kecil</text><text x="230" y="42" fill="#fde68a" fontSize="11">jumlah mendekati batas</text>
                </svg>
              </div>
              <p className="mt-3 text-center font-body text-xs font-semibold tracking-wide text-cyan-100/80">Tak berujung, tetapi bisa punya jumlah yang pasti</p>
            </div>
          </div>
        </header>

        <div className="mb-12 rounded-2xl border border-white/10 bg-[#0e192c]/90 p-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
          <p className="mb-3 flex items-center gap-2 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-400 sm:mb-0"><Compass className="h-4 w-4 text-cyan-200" aria-hidden="true" /> Peta belajar</p>
          <nav aria-label="Peta materi" className="flex flex-wrap gap-2">{map.map(([label, target], index) => <a key={target} href={`#${target}`} className="rounded-full border border-white/10 bg-white/[.035] px-3 py-2 font-body text-xs font-bold text-slate-200 transition hover:border-cyan-100/35 hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200">{String(index + 1).padStart(2, "0")} · {label}</a>)}</nav>
        </div>

        <div className="space-y-14">
          <section id="ide-dasar" className="scroll-mt-6">
            <SectionHeading
              number="01"
              eyebrow="Mulai dari gambaran besar"
              title={<>B. Apa Sih Sebenarnya Deret Geometri Tak Hingga (<InlineMath math="S_{\infty}" />) itu? 🎢</>}
            >
              Bayangkan kamu menaiki roller coaster angka yang suku-sukunya meluncur terus tanpa ujung! Nah, deret geometri tak hingga adalah penjumlahan suku-suku dari barisan geometri yang banyaknya tidak terhingga (<InlineMath math="n \to \infty" />).
            </SectionHeading>
            <div className="grid min-w-0 gap-4 md:grid-cols-[1.1fr_.9fr]">
              <div className="min-w-0 rounded-[1.8rem] border border-violet-200/20 bg-gradient-to-br from-violet-400/[.11] to-cyan-300/[.04] p-5 sm:p-7"><p className="mb-3 font-body text-[10px] font-black uppercase tracking-[.2em] text-violet-200">Bentuk Umumnya:</p><Formula math="\begin{aligned}S_{\infty}&=U_1+U_2+U_3+\dots\\&\quad+U_n+\dots\end{aligned}" tone="pink" /><p className="my-4 text-center font-body text-sm text-slate-300">Atau bisa juga kita tuliskan sebagai:</p><Formula math="\begin{aligned}S_{\infty}&=a+ar+ar^2+ar^3+\dots\\&\quad+ar^{n-1}+\dots\end{aligned}" /></div>
              <aside className="min-w-0 flex flex-col justify-center rounded-[1.8rem] border border-amber-200/20 bg-amber-300/[.055] p-5 sm:p-7"><div className="mb-4 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-300/15 text-amber-100"><Lightbulb className="h-5 w-5" aria-hidden="true" /></span><h3 className="font-display text-lg font-extrabold text-amber-100">Satu ide penting</h3></div><p className="font-body text-sm leading-relaxed text-slate-200">Setiap suku diperoleh dengan mengalikan suku sebelumnya dengan rasio tetap <InlineMath math="r" />. Kunci jumlah tak hingga ada pada perilaku <InlineMath math="r^n" /> saat <InlineMath math="n" /> makin besar.</p></aside>
            </div>
          </section>

          <section id="rumus-konvergensi" className="scroll-mt-6">
            <SectionHeading number="02" eyebrow="Ikuti jejak rumus" title="Bagaimana Cara Menemukan Rumusnya? 🕵️‍♂️🔍">Ingat kan rumus jumlah <InlineMath math="n" /> suku pertama (<InlineMath math="S_n" />) deret geometri? Jika kita ambil batasnya saat <InlineMath math="n" /> melompat menuju tak hingga (<InlineMath math="n \to \infty" />), kita cari nilai limitnya:</SectionHeading>
              <div className="min-w-0 space-y-4 rounded-[1.8rem] border border-cyan-200/20 bg-[#101b30]/90 p-4 sm:p-7">
              <Formula math="S_n=\frac{a(1-r^n)}{1-r}" />
              <div className="flex justify-center text-cyan-100/60"><ArrowDown className="h-5 w-5" aria-hidden="true" /></div>
              <Formula math="\begin{aligned}S_{\infty}&=\lim_{n\to\infty}S_n\\&=\lim_{n\to\infty}\frac{a(1-r^n)}{1-r}\end{aligned}" tone="amber" />
              <p className="pt-2 font-body text-sm leading-relaxed text-slate-200">Dari sinilah keajaiban matematika terbagi menjadi dua jalur seru:</p>
              <div className="grid min-w-0 gap-4 pt-2 md:grid-cols-2">
                <div className="min-w-0 rounded-2xl border border-emerald-200/25 bg-emerald-300/[.075] p-5"><p className="mb-2 font-display text-lg font-extrabold text-emerald-100">Jalur Konvergen (Menuju Satu Titik / Punya Hasil):</p><p className="mb-3 font-body text-sm leading-relaxed text-slate-200">Jika rasio kita berada di antara <InlineMath math="-1<r<1" /> (atau ditulis <InlineMath math="|r|<1" />), suku <InlineMath math="r^n" /> akan semakin mengecil mendekati angka nol (<InlineMath math="0" />) saat <InlineMath math="n" /> sangat besar!</p><p className="mb-2 font-body text-sm text-emerald-100">Maka, rumusnya menjadi:</p><Formula math="S_{\infty}=\frac{a}{1-r}\quad\text{(Deret Konvergen)}" /></div>
                <div className="min-w-0 rounded-2xl border border-rose-200/25 bg-rose-300/[.065] p-5"><p className="mb-2 font-display text-lg font-extrabold text-rose-100">Jalur Divergen (Meledak Tanpa Batas):</p><p className="mb-3 font-body text-sm leading-relaxed text-slate-200">Jika rasio kita <InlineMath math="r\le -1" /> atau <InlineMath math="r\ge 1" /> (atau <InlineMath math="|r|\ge1" />), deret tidak memiliki jumlah konvergen yang berhingga. Jadi, tidak ada hasil angka pastinya!</p><p className="font-body text-xs leading-relaxed text-rose-100/85">Catatan: untuk <InlineMath math="r=-1" />, jumlah parsial berosilasi; untuk <InlineMath math="|r|>1" />, jumlah parsial tidak menuju nilai berhingga.</p></div>
              </div>
            </div>
          </section>

          <section id="contoh-soal" className="scroll-mt-6">
            <SectionHeading number="03" eyebrow="Lihat rumus bekerja" title="🌟 Contoh Soal Super Seru & Pembahasannya!">Coba ikuti informasi yang diketahui, tentukan rasionya, lalu periksa apakah syarat konvergensi terpenuhi.</SectionHeading>
            <div className="space-y-5">
              <ExampleCard
                number="1"
                title="Contoh 1: Menjelajah Deret Angka Cantik 🎈"
                problem={<>Tentukan jumlah tak hingga dari deret geometri berikut:<BlockMath math="24,\;12,\;6,\;3,\;\dots" /></>}
                answer={<>Hore! Jumlah tak hingganya adalah <InlineMath math="48" />! 🎉</>}
              >
                <p>Suku pertama (<InlineMath math="a" />) = <InlineMath math="24" />.</p>
                <p>Rasio (<InlineMath math="r" />) = <InlineMath math="\frac{12}{24}=\frac12" />.</p>
                <p>Karena <InlineMath math="\frac12" /> berada di antara <InlineMath math="-1" /> dan <InlineMath math="1" /> (artinya <InlineMath math="|r|<1" />), deret ini konvergen dan bisa kita hitung!</p>
                <p>Yuk hitung jumlah tak hingganya (<InlineMath math="S_{\infty}" />):</p>
                <Formula math="\begin{aligned}S_{\infty}&=\frac{a}{1-r}\\&=\frac{24}{1-\frac12}\\&=\frac{24}{\frac12}\\&=24\times2=48\end{aligned}" />
              </ExampleCard>

              <ExampleCard
                number="2"
                title="Contoh 2: Misteri Pecahan Berulang 🕵️‍♀️✨"
                problem={<>Tentukan bentuk pecahan biasa yang setara dengan desimal berulang:<BlockMath math="0{,}424242\dots=0{,}\overline{42}" /></>}
                answer={<>Hebat sekali! Bentuk pecahan dari <InlineMath math="0{,}\overline{42}" /> adalah <InlineMath math="\frac{14}{33}" />. 🥳</>}
              >
                <p>Kita bisa uraikan desimal berulang ini menjadi deret geometri tak hingga yang asik:</p>
                <Formula math="0{,}\overline{42}=0{,}42+0{,}0042+0{,}000042+\dots" tone="pink" />
                <p>Suku pertama (<InlineMath math="a" />) = <InlineMath math="0{,}42=\frac{42}{100}" />.</p>
                <p>Rasio (<InlineMath math="r" />) = <InlineMath math="0{,}01=\frac{1}{100}" /> (karena <InlineMath math="|r|<1" />, aman untuk dihitung!). Mari kita masukkan ke rumus ajaib kita:</p>
                <Formula math="\begin{aligned}S_{\infty}&=\frac{a}{1-r}\\&=\frac{\frac{42}{100}}{1-\frac{1}{100}}\\&=\frac{\frac{42}{100}}{\frac{99}{100}}\\&=\frac{42}{99}\end{aligned}" />
                <p>Sederhanakan pembilang dan penyebut dengan membagi <InlineMath math="3" />:</p>
                <Formula math="S_{\infty}=\frac{14}{33}" tone="pink" />
              </ExampleCard>

              <ExampleCard
                number="3"
                title="Contoh 3: Tantangan Mencari Batasan x yang Ramah 🎯"
                problem={<>Tentukan batasan nilai <InlineMath math="x" /> agar deret geometri tak hingga berikut bernilai konvergen:<BlockMath math="1+(x-2)+(x-2)^2+\dots" /><span>(dengan asumsi suku-sukunya tidak bernilai nol)</span></>}
                answer={<><p>Karena kita punya syarat tambahan <InlineMath math="x\ne2" />, maka nilai yang memenuhi adalah:</p><BlockMath math="\begin{aligned}1&<x<2\\2&<x<3\end{aligned}" /></>}
              >
                <p>Pembahasan: suku pertama (<InlineMath math="a" />) = <InlineMath math="1" />.</p>
                <p>Rasio (<InlineMath math="r" />) = <InlineMath math="\frac{x-2}{1}=x-2" />.</p>
                <p><strong className="text-amber-100">Syarat 1: Suku tidak bernilai nol.</strong></p>
                <Formula math="r\ne0\implies x-2\ne0\implies x\ne2" tone="amber" />
                <p><strong className="text-cyan-100">Syarat 2: Syarat konvergensi deret geometri tak hingga (<InlineMath math="-1<r<1" />).</strong></p>
                <Formula math="-1<x-2<1" />
                <p>Mari kita tambahkan <InlineMath math="2" /> ke semua sisi agar <InlineMath math="x" /> bisa berdiri sendiri dengan gembira:</p>
                <Formula math="\begin{aligned}-1+2&<x<1+2\\1&<x<3\end{aligned}" tone="pink" />
              </ExampleCard>
            </div>
          </section>

          <section id="ganjil-genap" className="scroll-mt-6">
            <SectionHeading number="04" eyebrow="Perluasan yang menarik" title="C. Perluasan Formula Asik: Suku Ganjil vs Suku Genap 🧩✨">Bagaimana kalau kita membedah deret geometri tak hingga menjadi dua kelompok pasukan: pasukan indeks ganjil dan pasukan indeks genap? Wah, makin menantang nih! Perhatikan bentuk umumnya:</SectionHeading>
            <div className="space-y-5 rounded-[1.8rem] border border-violet-200/20 bg-gradient-to-br from-violet-300/[.08] via-[#101a30] to-pink-300/[.07] p-4 sm:p-7">
              <Formula math="\begin{aligned}S_{\infty}&=U_1+U_2+U_3+U_4+U_5+\dots\\&=(U_1+U_3+U_5+\dots)\\&\quad+(U_2+U_4+U_6+\dots)\end{aligned}" />
              <div className="grid min-w-0 gap-4 md:grid-cols-2">
                <article className="min-w-0 rounded-2xl border border-pink-200/25 bg-pink-300/[.07] p-4 sm:p-5"><p className="mb-3 font-display text-lg font-extrabold text-pink-100">Jumlah Suku Ganjil (<InlineMath math="S_{\infty}^{\text{ganjil}}" />):</p><Formula math="\begin{aligned}S_{\infty}^{\text{ganjil}}&=U_1+U_3+U_5+\dots\\&=a+ar^2+ar^4+\dots\end{aligned}" tone="pink" /><p className="my-3 font-body text-sm leading-relaxed text-slate-200">Dengan rasio baru = <InlineMath math="r^2" /> dan rumusnya:</p><Formula math="S_{\infty}^{\text{ganjil}}=\frac{a}{1-r^2}" /><p className="mt-3 font-body text-xs leading-relaxed text-pink-100/80">Rumus ini berlaku karena syarat deret asal <InlineMath math="|r|<1" /> menjadikan <InlineMath math="|r^2|<1" />.</p></article>
                <article className="min-w-0 rounded-2xl border border-cyan-200/25 bg-cyan-300/[.07] p-4 sm:p-5"><p className="mb-3 font-display text-lg font-extrabold text-cyan-100">Jumlah Suku Genap (<InlineMath math="S_{\infty}^{\text{genap}}" />):</p><Formula math="\begin{aligned}S_{\infty}^{\text{genap}}&=U_2+U_4+U_6+\dots\\&=ar+ar^3+ar^5+\dots\end{aligned}" /><p className="my-3 font-body text-sm leading-relaxed text-slate-200">Dengan rasio baru = <InlineMath math="r^2" /> dan rumusnya:</p><Formula math="S_{\infty}^{\text{genap}}=\frac{ar}{1-r^2}" tone="amber" /><p className="mt-3 font-body text-xs leading-relaxed text-cyan-100/80">Rumus ini juga mensyaratkan deret asal <InlineMath math="|r|<1" />.</p></article>
              </div>
              <div className="rounded-2xl border border-amber-200/20 bg-amber-300/[.06] p-4 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-5"><p className="font-body text-sm leading-relaxed text-slate-200">Dari kedua rumus sakti di atas, kita bisa merumuskan hubungan keren berikut untuk mencari rasio (<InlineMath math="r" />) dan suku pertama (<InlineMath math="a" />):</p><div className="mt-3 min-w-0 sm:mt-0 sm:min-w-[280px]"><Formula math="r=\frac{S_{\infty}^{\text{genap}}}{S_{\infty}^{\text{ganjil}}}" tone="amber" /></div></div>
            </div>
          </section>

          <footer className="series-enter series-enter-delay overflow-hidden rounded-[2rem] border border-amber-100/20 bg-[linear-gradient(110deg,rgba(17,71,86,.65),rgba(48,34,75,.75),rgba(80,39,69,.55))] p-6 sm:p-9">
            <div className="flex items-start gap-4"><Sparkles className="mt-1 h-6 w-6 shrink-0 text-amber-200" aria-hidden="true" /><p className="font-body text-base leading-relaxed text-slate-100">Gimana teman-teman? Belajar deret geometri tak hingga ternyata seru dan tidak menyeramkan kan? Tetap semangat belajar matematikanya ya, kalian pasti bisa menguasainya! 🚀🌟</p></div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default SmaDeretGeometriTakHinggaPage;
