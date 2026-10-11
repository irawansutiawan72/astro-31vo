import type { ReactNode } from "react";
import {
  ArrowDownUp,
  BookOpen,
  Check,
  CircleHelp,
  Compass,
  Lightbulb,
  MoveUpRight,
  Sparkles,
  Target,
} from "lucide-react";
import { BlockMath, InlineMath as KaTeXInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

const InlineMath = ({ math }: { math: string }) => (
  <span className="inline-block max-w-full overflow-x-auto align-baseline whitespace-nowrap">
    <KaTeXInlineMath math={math} />
  </span>
);

const Formula = ({ math, label }: { math: string; label?: string }) => (
  <div className="my-3 min-w-0 max-w-full overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/90 px-2.5 py-2.5 text-center text-[13px] leading-relaxed text-cyan-100 sm:px-4 sm:py-3 sm:text-base">
    {label && <p className="mb-2 whitespace-normal text-left font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/55">{label}</p>}
    <div className="w-max min-w-full"><BlockMath math={math} /></div>
  </div>
);

const SectionHeading = ({ index, kicker, title, icon }: { index: string; kicker: string; title: string; icon: ReactNode }) => (
  <div className="mb-5 flex min-w-0 items-start gap-3">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-200">{icon}</span>
    <div className="min-w-0">
      <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-200/70">Bagian {index} · {kicker}</p>
      <h2 className="font-display text-xl font-extrabold leading-tight text-white sm:text-2xl">{title}</h2>
    </div>
  </div>
);

const Step = ({ n, children }: { n: number; children: ReactNode }) => (
  <li className="flex min-w-0 gap-3">
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 font-display text-[11px] font-black text-cyan-100">{n}</span>
    <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
  </li>
);

type Level = "Mudah" | "Sedang" | "Sulit";
const levelTone: Record<Level, string> = {
  Mudah: "border-emerald-200/25 bg-emerald-200/[.08] text-emerald-100",
  Sedang: "border-cyan-200/25 bg-cyan-200/[.08] text-cyan-100",
  Sulit: "border-rose-200/25 bg-rose-200/[.08] text-rose-100",
};

const Example = ({ id, level, title, problem, children }: { id: string; level: Level; title: string; problem: ReactNode; children: ReactNode }) => (
  <article data-testid={`example-${id}`} className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-[#101b2d]/90">
    <div className="flex min-w-0 flex-wrap items-center gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
      <span className={`rounded-full border px-3 py-1 font-body text-[10px] font-black uppercase tracking-[.16em] ${levelTone[level]}`}>{level}</span>
      <h3 className="min-w-0 font-display text-lg font-extrabold text-white">{title}</h3>
    </div>
    <div className="min-w-0 space-y-3 p-4 sm:p-5">
      <div className="rounded-2xl border border-white/[.07] bg-black/10 p-3 sm:p-4">
        <p className="font-body text-[10px] font-black uppercase tracking-[.16em] text-slate-400">Tantangan</p>
        <div className="mt-2">{problem}</div>
        <p className="mb-3 mt-4 font-body text-[10px] font-black uppercase tracking-[.16em] text-amber-200">Langkah penyelesaian</p>
        <ol className="min-w-0 space-y-3 font-body text-sm leading-relaxed text-slate-200">{children}</ol>
      </div>
    </div>
  </article>
);

const SmaRumusRumusTrigonometriPage = () => (
  <div className="animation-submaterial-route relative min-h-[100dvh] overflow-x-hidden bg-[#080f1e] text-slate-100">
    <Starfield />
    <style>{`
      @keyframes rumus-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      .rumus-rise { animation: rumus-rise .65s cubic-bezier(.2,.7,.2,1) both; }
      .rumus-rise-delay { animation-delay: .12s; }
      @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }
    `}</style>
    <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri" />
    <main className="relative z-10 mx-auto w-full max-w-6xl min-w-0 px-3 pb-24 pt-8 sm:px-7 sm:pt-12">
      <header className="rumus-rise relative mb-8 min-w-0 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,48,70,.97),rgba(16,25,45,.95)_57%,rgba(66,43,66,.9))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-cyan-100/10" />
        <div className="pointer-events-none absolute right-9 top-12 h-40 w-40 rounded-full border border-amber-100/10" />
        <div className="relative min-w-0">
          <div className="mb-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100"><BookOpen className="h-3.5 w-3.5" /> Matematika · SMA · Buku Animasi</div>
          <p className="mb-2 font-body text-xs font-bold uppercase tracking-[.24em] text-amber-200">Perbandingan trigonometri</p>
          <h1 className="max-w-3xl font-display text-[clamp(2rem,8vw,4rem)] font-black leading-[1.04] tracking-tight text-white">Rumus-rumus <span className="text-cyan-200">Trigonometri</span></h1>
          <p className="mt-5 max-w-2xl font-body text-sm leading-relaxed text-slate-300 sm:text-lg">Sudut bisa dijumlah, dikurangi, atau digandakan—dan setiap gerak punya pola. Kita urai rumusnya pelan-pelan supaya kamu tahu dari mana hasilnya datang.</p>
          <div className="mt-6 inline-flex max-w-full items-start gap-2 rounded-xl border border-amber-100/20 bg-amber-200/10 px-3 py-2 text-xs font-semibold leading-relaxed text-amber-100"><Target className="mt-0.5 h-4 w-4 shrink-0" /> Misi: pilih identitas yang tepat, lalu ikuti setiap baris dengan tenang.</div>
        </div>
      </header>

      <nav aria-label="Isi materi" className="mb-9 flex min-w-0 gap-2 overflow-x-auto pb-2">
        {[
          ["jumlah-selisih", "Jumlah & selisih"],
          ["sudut-ganda", "Sudut ganda"],
          ["produk-jumlah", "Produk & jumlah"],
          ["contoh", "Contoh soal"],
          ["rangkuman", "Rangkuman"],
        ].map(([id, label]) => <a key={id} href={`#${id}`} data-testid={`link-nav-${id}`} className="shrink-0 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 font-body text-xs font-bold text-slate-300 transition hover:border-cyan-200/35 hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200">{label}</a>)}
      </nav>

      <div className="min-w-0 space-y-10">
        <section id="jumlah-selisih" className="scroll-mt-8">
          <SectionHeading index="01" kicker="Gabungkan dua putaran" title="Rumus jumlah dan selisih sudut" icon={<Compass className="h-5 w-5" />} />
          <div className="grid min-w-0 items-center gap-4 md:grid-cols-[.82fr_1.18fr]">
            <div className="min-w-0 rounded-3xl border border-amber-200/15 bg-[linear-gradient(145deg,rgba(146,64,14,.13),rgba(15,27,44,.88))] p-4">
              <svg viewBox="0 0 320 230" role="img" aria-label="Dua putaran sudut alfa dan beta digabungkan menjadi satu putaran sebesar alfa tambah beta." data-testid="visual-angle-addition" className="block h-auto w-full">
                <line x1="48" y1="173" x2="275" y2="173" stroke="#94a3b8" strokeWidth="2" />
                <line x1="48" y1="173" x2="151" y2="95" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
                <line x1="48" y1="173" x2="222" y2="60" stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" />
                <path d="M 91 173 A 43 43 0 0 0 82 147" fill="none" stroke="#f472b6" strokeWidth="3" />
                <path d="M 122 117 A 130 130 0 0 0 107 132" fill="none" stroke="#a78bfa" strokeWidth="3" />
                <circle cx="48" cy="173" r="5" fill="#fff" />
                <circle cx="151" cy="95" r="5" fill="#fbbf24" />
                <circle cx="222" cy="60" r="5" fill="#67e8f9" />
                <text x="76" y="166" fill="#fda4af" fontSize="15" fontWeight="700">α</text>
                <text x="112" y="120" fill="#c4b5fd" fontSize="15" fontWeight="700">β</text>
                <text x="229" y="57" fill="#a5f3fc" fontSize="14" fontWeight="700">α + β</text>
                <text x="40" y="196" fill="#cbd5e1" fontSize="12">O</text>
                <text x="55" y="40" textAnchor="start" fill="#fde68a" fontSize="12" fontWeight="700">PUTARAN BERURUTAN</text>
                <text x="160" y="218" textAnchor="middle" fill="#94a3b8" fontSize="11">arah akhir menunjukkan gabungan sudut</text>
              </svg>
              <p className="mt-2 text-center font-body text-xs leading-relaxed text-slate-400">Bayangkan kompas yang diputar dua kali: arah akhirnya setara satu putaran <InlineMath math="\alpha+\beta" />.</p>
            </div>
            <div className="min-w-0 space-y-3">
              <p className="font-body text-sm leading-relaxed text-slate-300">Komponen mendatar dan tegak dari putaran gabungan menghasilkan rumus sinus dan cosinus. Tanda <InlineMath math="\pm" /> dan <InlineMath math="\mp" /> bergerak berpasangan: pilih baris atas untuk jumlah, baris bawah untuk selisih.</p>
              <article className="min-w-0 rounded-3xl border border-cyan-200/15 bg-cyan-200/[.04] p-3 sm:p-5">
                <h3 className="font-display text-lg font-extrabold text-cyan-100">Sinus: tanda mengikuti</h3>
                <Formula math="\begin{aligned}\sin(\alpha+\beta)&=\sin\alpha\cos\beta+\cos\alpha\sin\beta\\[2pt]\sin(\alpha-\beta)&=\sin\alpha\cos\beta-\cos\alpha\sin\beta\end{aligned}" />
                <p className="text-xs leading-relaxed text-slate-400">Pada sinus, operasi di dalam kurung tetap sama dengan tanda di antara dua suku.</p>
              </article>
              <article className="min-w-0 rounded-3xl border border-violet-200/15 bg-violet-200/[.04] p-3 sm:p-5">
                <h3 className="font-display text-lg font-extrabold text-violet-100">Cosinus: tanda berlawanan</h3>
                <Formula math="\begin{aligned}\cos(\alpha+\beta)&=\cos\alpha\cos\beta-\sin\alpha\sin\beta\\[2pt]\cos(\alpha-\beta)&=\cos\alpha\cos\beta+\sin\alpha\sin\beta\end{aligned}" />
                <p className="text-xs leading-relaxed text-slate-400">Cosinus memakai tanda kebalikan: jumlah sudut memberi pengurangan, selisih sudut memberi penjumlahan.</p>
              </article>
            </div>
          </div>
          <div className="mt-4 flex min-w-0 items-start gap-3 rounded-2xl border border-amber-200/15 bg-amber-200/[.06] p-4">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" />
            <p className="font-body text-sm leading-relaxed text-amber-50/90"><strong className="text-amber-100">Cara mengingat:</strong> sinus menyalin tanda, cosinus membalik tanda. Coba ucapkan pelan: “sinus sama, cosinus lawan.”</p>
          </div>
        </section>

        <section id="tangen" className="scroll-mt-8">
          <SectionHeading index="02" kicker="Bagi sinus dengan cosinus" title="Penjumlahan dan pengurangan tangen" icon={<MoveUpRight className="h-5 w-5" />} />
          <div className="grid min-w-0 gap-4 md:grid-cols-[1.05fr_.95fr]">
            <article className="min-w-0 rounded-3xl border border-emerald-200/15 bg-emerald-200/[.04] p-4 sm:p-5">
              <h3 className="font-display text-lg font-extrabold text-emerald-100">Dua rumus tangen</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">Keduanya berasal dari <InlineMath math="\tan\theta=\frac{\sin\theta}{\cos\theta}" />. Pembilang dan penyebut dapat dibagi dengan <InlineMath math="\cos\alpha\cos\beta" />.</p>
              <Formula math="\tan(\alpha+\beta)=\frac{\tan\alpha+\tan\beta}{1-\tan\alpha\tan\beta}" />
              <Formula math="\tan(\alpha-\beta)=\frac{\tan\alpha-\tan\beta}{1+\tan\alpha\tan\beta}" />
            </article>
            <aside className="min-w-0 rounded-3xl border border-rose-200/20 bg-rose-200/[.055] p-4 sm:p-5">
              <h3 className="font-display text-lg font-extrabold text-rose-100">Cek domain, ya!</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-rose-50/85">Rumus tangen hanya boleh dipakai jika semua tangen yang muncul terdefinisi. Selain itu, penyebut pecahan tidak boleh nol.</p>
              <Formula math="\begin{aligned}\tan(\alpha+\beta):\;&\cos\alpha\ne0,\ \cos\beta\ne0\\&1-\tan\alpha\tan\beta\ne0\\[2pt]\tan(\alpha-\beta):\;&\cos\alpha\ne0,\ \cos\beta\ne0\\&1+\tan\alpha\tan\beta\ne0\end{aligned}" />
              <p className="text-xs leading-relaxed text-slate-400">Syarat penyebut ini setara dengan <InlineMath math="\cos(\alpha\pm\beta)\ne0" />; hasil tangen memang harus terdefinisi.</p>
            </aside>
          </div>
          <div className="mt-4 rounded-2xl border border-cyan-200/15 bg-cyan-200/[.045] p-4">
            <p className="font-body text-sm leading-relaxed text-slate-300"><strong className="text-cyan-100">Jejak penurunan:</strong> mulai dari <InlineMath math="\tan(\alpha+\beta)=\frac{\sin(\alpha+\beta)}{\cos(\alpha+\beta)}" />, masukkan dua rumus jumlah di atas, lalu bagi pembilang dan penyebut dengan <InlineMath math="\cos\alpha\cos\beta" />. Langkah yang sama dengan <InlineMath math="\beta\mapsto-\beta" /> memberi rumus selisih.</p>
          </div>
        </section>

        <section id="sudut-ganda" className="scroll-mt-8">
          <SectionHeading index="03" kicker="Sudut yang sama dua kali" title="Rumus sudut ganda" icon={<Sparkles className="h-5 w-5" />} />
          <p className="mb-4 max-w-3xl font-body text-sm leading-relaxed text-slate-300">Cukup ganti <InlineMath math="\beta" /> dengan <InlineMath math="\alpha" /> pada rumus jumlah. Tiga hasil berikut adalah bentuk-bentuk setara yang bisa dipilih sesuai kebutuhan soal.</p>
          <div className="grid min-w-0 gap-4 md:grid-cols-3">
            <article className="min-w-0 rounded-3xl border border-pink-200/15 bg-pink-200/[.045] p-4">
              <h3 className="font-display text-base font-extrabold text-pink-100">Sinus dua kali sudut</h3>
              <Formula math="\sin 2\alpha=2\sin\alpha\cos\alpha" />
              <p className="text-xs leading-relaxed text-slate-400">Dua suku hasil rumus jumlah sinus menjadi pasangan yang sama.</p>
            </article>
            <article className="min-w-0 rounded-3xl border border-amber-200/15 bg-amber-200/[.045] p-4">
              <h3 className="font-display text-base font-extrabold text-amber-100">Tiga bentuk cosinus</h3>
              <Formula math="\begin{aligned}\cos 2\alpha&=\cos^2\alpha-\sin^2\alpha\\&=2\cos^2\alpha-1\\&=1-2\sin^2\alpha\end{aligned}" />
              <p className="text-xs leading-relaxed text-slate-400">Dua bentuk terakhir memakai <InlineMath math="\sin^2\alpha+\cos^2\alpha=1" />.</p>
            </article>
            <article className="min-w-0 rounded-3xl border border-violet-200/15 bg-violet-200/[.045] p-4">
              <h3 className="font-display text-base font-extrabold text-violet-100">Tangen dua kali sudut</h3>
              <Formula math="\tan 2\alpha=\frac{2\tan\alpha}{1-\tan^2\alpha}" />
              <p className="text-xs leading-relaxed text-slate-400">Terdefinisi jika <InlineMath math="\tan\alpha" /> terdefinisi dan <InlineMath math="1-\tan^2\alpha\ne0" />.</p>
            </article>
          </div>
          <div className="mt-4 rounded-2xl border border-emerald-200/15 bg-emerald-200/[.05] p-4">
            <p className="font-body text-sm leading-relaxed text-emerald-50/85"><strong className="text-emerald-100">Pilih bentuk cosinus dengan cermat:</strong> jika yang diketahui <InlineMath math="\sin\alpha" />, gunakan <InlineMath math="1-2\sin^2\alpha" />; jika yang diketahui <InlineMath math="\cos\alpha" />, pakai <InlineMath math="2\cos^2\alpha-1" />.</p>
          </div>
        </section>

        <section id="produk-jumlah" className="scroll-mt-8">
          <SectionHeading index="04" kicker="Ubah bentuk, buka pola" title="Produk dan jumlah menjadi pasangan" icon={<ArrowDownUp className="h-5 w-5" />} />
          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            <article className="min-w-0 rounded-3xl border border-sky-200/15 bg-sky-200/[.045] p-4 sm:p-5">
              <h3 className="font-display text-lg font-extrabold text-sky-100">Produk → jumlah</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">Kalikan dua perbandingan? Jumlahkan atau kurangkan sudutnya.</p>
              <Formula math="\begin{aligned}2\sin\alpha\cos\beta&=\sin(\alpha+\beta)+\sin(\alpha-\beta)\\2\cos\alpha\sin\beta&=\sin(\alpha+\beta)-\sin(\alpha-\beta)\end{aligned}" />
              <Formula math="\begin{aligned}2\cos\alpha\cos\beta&=\cos(\alpha+\beta)+\cos(\alpha-\beta)\\2\sin\alpha\sin\beta&=\cos(\alpha-\beta)-\cos(\alpha+\beta)\end{aligned}" />
            </article>
            <article className="min-w-0 rounded-3xl border border-orange-200/15 bg-orange-200/[.045] p-4 sm:p-5">
              <h3 className="font-display text-lg font-extrabold text-orange-100">Jumlah → produk</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">Dua suku dengan fungsi sama? Sudut tengah dan setengah selisih sering membantu.</p>
              <Formula math="\begin{aligned}\sin x+\sin y&=2\sin\frac{x+y}{2}\cos\frac{x-y}{2}\\\sin x-\sin y&=2\cos\frac{x+y}{2}\sin\frac{x-y}{2}\end{aligned}" />
              <Formula math="\begin{aligned}\cos x+\cos y&=2\cos\frac{x+y}{2}\cos\frac{x-y}{2}\\\cos x-\cos y&=-2\sin\frac{x+y}{2}\sin\frac{x-y}{2}\end{aligned}" />
            </article>
          </div>
          <p className="mt-4 rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4 font-body text-sm leading-relaxed text-slate-300"><strong className="text-violet-100">Dari mana pola setengah sudut datang?</strong> Misalkan <InlineMath math="u=\frac{x+y}{2}" /> dan <InlineMath math="v=\frac{x-y}{2}" />. Maka <InlineMath math="x=u+v" /> dan <InlineMath math="y=u-v" />. Masukkan ke rumus jumlah-selisih, lalu jumlahkan atau kurangkan kedua persamaan.</p>
        </section>

        <section id="contoh" className="scroll-mt-8">
          <SectionHeading index="05" kicker="Latihan bertahap" title="Tiga contoh, tiga strategi" icon={<Lightbulb className="h-5 w-5" />} />
          <div className="space-y-4">
            <Example id="mudah" level="Mudah" title="Temukan sinus 75°" problem={<p className="font-body text-sm leading-relaxed text-slate-200">Tentukan nilai eksak <InlineMath math="\sin75^\circ" /> tanpa kalkulator.</p>}>
              <Step n={1}>Pecah sudut menjadi sudut istimewa: <InlineMath math="75^\circ=45^\circ+30^\circ" />. Gunakan rumus jumlah sinus.</Step>
              <li className="ml-9"><Formula math="\begin{aligned}\sin75^\circ&=\sin45^\circ\cos30^\circ+\cos45^\circ\sin30^\circ\end{aligned}" /></li>
              <Step n={2}>Masukkan nilai khusus <InlineMath math="\sin45^\circ=\cos45^\circ=\frac{\sqrt2}{2}" />, <InlineMath math="\cos30^\circ=\frac{\sqrt3}{2}" />, dan <InlineMath math="\sin30^\circ=\frac12" />.</Step>
              <li className="ml-9"><Formula math="\begin{aligned}\sin75^\circ&=\frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2}+\frac{\sqrt2}{2}\cdot\frac12\\&=\frac{\sqrt6+\sqrt2}{4}\end{aligned}" /></li>
              <Step n={3}>Jadi, <InlineMath math="\boxed{\sin75^\circ=\frac{\sqrt6+\sqrt2}{4}}" />. Pecahan kedua hasil kali adalah <InlineMath math="\frac{\sqrt2}{4}" />.</Step>
            </Example>

            <Example id="sedang" level="Sedang" title="Gabungkan dua cosinus" problem={<p className="font-body text-sm leading-relaxed text-slate-200">Sederhanakan <InlineMath math="2\cos75^\circ\cos15^\circ" />.</p>}>
              <Step n={1}>Bentuk <InlineMath math="2\cos\alpha\cos\beta" /> cocok dengan rumus produk menjadi jumlah.</Step>
              <li className="ml-9"><Formula math="2\cos75^\circ\cos15^\circ=\cos(75^\circ+15^\circ)+\cos(75^\circ-15^\circ)" /></li>
              <Step n={2}>Hitung sudutnya: jumlahnya 90° dan selisihnya 60°. Nilai cosinusnya adalah 0 dan <InlineMath math="\frac12" />.</Step>
              <li className="ml-9"><Formula math="\begin{aligned}\cos90^\circ+\cos60^\circ&=0+\frac12\\&=\frac12\end{aligned}" /></li>
              <Step n={3}>Maka <InlineMath math="\boxed{2\cos75^\circ\cos15^\circ=\frac12}" />. Rumus ini mengubah hasil kali menjadi dua nilai sudut istimewa.</Step>
            </Example>

            <Example id="sulit" level="Sulit" title="Kenali penjumlahan tangen" problem={<p className="font-body text-sm leading-relaxed text-slate-200">Hitung <InlineMath math="\frac{\tan80^\circ+\tan55^\circ}{1-\tan80^\circ\tan55^\circ}" />.</p>}>
              <Step n={1}>Bentuk pecahan persis sama dengan rumus <InlineMath math="\tan(\alpha+\beta)" />. Ambil <InlineMath math="\alpha=80^\circ" /> dan <InlineMath math="\beta=55^\circ" />.</Step>
              <li className="ml-9"><Formula math="\frac{\tan80^\circ+\tan55^\circ}{1-\tan80^\circ\tan55^\circ}=\tan(80^\circ+55^\circ)" /></li>
              <Step n={2}>Sudut awal dan sudut akhirnya aman: <InlineMath math="\cos80^\circ\ne0" />, <InlineMath math="\cos55^\circ\ne0" />, serta <InlineMath math="\cos135^\circ=-\frac{\sqrt2}{2}\ne0" />. Jadi kedua tangen dan hasil tangen jumlah terdefinisi; penyebut pecahan tidak nol.</Step>
              <li className="ml-9"><Formula math="\tan(80^\circ+55^\circ)=\tan135^\circ" /></li>
              <Step n={3}>Karena <InlineMath math="135^\circ=180^\circ-45^\circ" /> dan tangen berubah tanda pada sudut suplementer, <InlineMath math="\tan135^\circ=-\tan45^\circ=-1" />.</Step>
              <li className="ml-9"><Formula math="\boxed{\frac{\tan80^\circ+\tan55^\circ}{1-\tan80^\circ\tan55^\circ}=-1}" /></li>
            </Example>
          </div>
        </section>

        <section id="rangkuman" className="scroll-mt-8">
          <div className="rounded-[1.8rem] border border-amber-200/20 bg-[linear-gradient(145deg,rgba(24,36,72,.97),rgba(41,35,68,.96))] p-4 shadow-xl shadow-indigo-950/20 sm:p-6">
            <SectionHeading index="06" kicker="Simpan pola penting" title="Rangkuman, tips, dan trik" icon={<Check className="h-5 w-5" />} />
            <div className="grid min-w-0 gap-4 md:grid-cols-[1.15fr_.85fr]">
              <div className="min-w-0 rounded-2xl border border-cyan-200/15 bg-cyan-200/[.045] p-3 sm:p-4">
                <h3 className="mb-2 font-display text-sm font-black text-cyan-100">Kartu rumus ringkas</h3>
                <Formula math="\begin{aligned}\sin(\alpha\pm\beta)&=\sin\alpha\cos\beta\pm\cos\alpha\sin\beta\\\cos(\alpha\pm\beta)&=\cos\alpha\cos\beta\mp\sin\alpha\sin\beta\\\tan(\alpha\pm\beta)&=\frac{\tan\alpha\pm\tan\beta}{1\mp\tan\alpha\tan\beta}\end{aligned}" />
                <Formula math="\begin{aligned}\sin2\alpha&=2\sin\alpha\cos\alpha\\\cos2\alpha&=\cos^2\alpha-\sin^2\alpha\\\tan2\alpha&=\frac{2\tan\alpha}{1-\tan^2\alpha}\end{aligned}" />
                <p className="font-body text-xs leading-relaxed text-slate-400">Rumus produk-ke-jumlah dan jumlah-ke-produk tersedia di Bagian 04; gunakan versi yang mengubah bentuk paling cepat.</p>
              </div>
              <div className="min-w-0 space-y-3">
                <div className="rounded-2xl border border-emerald-200/15 bg-emerald-200/[.05] p-4">
                  <h3 className="font-display text-sm font-black text-emerald-100">Pilih jalur yang pas</h3>
                  <ul className="mt-2 space-y-2 font-body text-sm leading-relaxed text-slate-200">
                    <li>• Sudut istimewa dijumlah atau dikurang? Gunakan rumus jumlah-selisih.</li>
                    <li>• Sudutnya <InlineMath math="2\alpha" />? Mulai dari rumus sudut ganda.</li>
                    <li>• Ada perkalian dua sinus/cosinus? Coba produk-ke-jumlah.</li>
                    <li>• Ada penjumlahan dua sinus/cosinus? Coba jumlah-ke-produk.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-rose-200/15 bg-rose-200/[.05] p-4">
                  <h3 className="font-display text-sm font-black text-rose-100">Dua pemeriksaan akhir</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-slate-200">Pastikan satuan konsisten: contoh memakai derajat, sedangkan kalkulator sering perlu mode DEG. Untuk tangen, periksa setiap cosinus dan penyebut agar tidak nol.</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex min-w-0 items-start gap-3 rounded-2xl border border-amber-200/15 bg-amber-200/[.06] p-4">
              <CircleHelp className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" />
              <p className="font-body text-sm leading-relaxed text-amber-50/90"><strong className="text-amber-100">Trik kecil:</strong> sebelum menghitung, tandai bentuk yang terlihat—jumlah sudut, sudut ganda, atau produk. Setelah memakai rumus, cek lagi tanda dan domainnya. Langkah kecil ini sering menyelamatkan jawaban.</p>
            </div>
            <p className="mt-5 text-center font-display text-base font-bold text-cyan-100">Kamu sudah punya peta polanya. Lanjutkan satu langkah demi satu langkah!</p>
          </div>
        </section>
      </div>
    </main>
  </div>
);

export default SmaRumusRumusTrigonometriPage;
