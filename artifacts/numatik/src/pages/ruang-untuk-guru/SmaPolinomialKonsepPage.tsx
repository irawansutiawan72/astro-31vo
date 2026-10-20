import type { ReactNode } from "react";
import { BookOpen, Check, Lightbulb, Sparkles, Target } from "lucide-react";
import { BlockMath, InlineMath as KatexInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import PageNavigation from "@/components/PageNavigation";
import Starfield from "@/components/Starfield";

const InlineMath = ({ math }: { math: string }) => <KatexInlineMath math={math} />;

const PAGE_PATH = "/ruang-untuk-guru/sma/buku-animasi/polinomial";

const lessonMap = [
  ["polinomial-konsep", "Konsep dan bentuk polinomial"],
  ["polinomial-nilai-fungsi", "Nilai fungsi polinomial"],
  ["polinomial-identik", "Polinomial identik"],
  ["polinomial-operasi", "Operasi aljabar"],
  ["polinomial-faktor", "Faktor dan uji faktor"],
  ["polinomial-rangkuman", "Bekal penting"],
];

function Equation({
  math,
  label,
}: {
  math: string;
  label?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/90 px-4 py-3 text-center text-cyan-100 sm:px-6">
      {label && <p className="mb-2 text-left font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/50">{label}</p>}
      <BlockMath math={math} />
    </div>
  );
}

function SectionHeading({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 flex gap-4">
      <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-display text-xs font-black text-cyan-100">
        {index}
      </span>
      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-slate-300">{description}</p>
      </div>
    </div>
  );
}

function Example({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-orange-200/20 bg-[linear-gradient(140deg,rgba(106,45,35,.16),rgba(14,25,42,.92)_48%)]">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-300/15 text-orange-200">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">Contoh {number} · angka dan situasi baru</p>
          <h3 className="font-display text-base font-bold text-white sm:text-lg">{title}</h3>
        </div>
      </div>
      <div className="space-y-4 p-4 sm:p-5">{children}</div>
    </article>
  );
}

function Note({
  title,
  children,
  tone = "cyan",
}: {
  title: string;
  children: ReactNode;
  tone?: "cyan" | "amber" | "emerald" | "violet";
}) {
  const colors = {
    cyan: "border-cyan-200/15 bg-cyan-200/[.05] text-cyan-50",
    amber: "border-amber-200/15 bg-amber-200/[.05] text-amber-50",
    emerald: "border-emerald-200/15 bg-emerald-200/[.05] text-emerald-50",
    violet: "border-violet-200/15 bg-violet-200/[.05] text-violet-50",
  };
  return (
    <div className={`flex gap-3 rounded-2xl border p-4 text-sm leading-relaxed ${colors[tone]}`}>
      <Lightbulb className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <p><strong>{title}</strong> {children}</p>
    </div>
  );
}

const SmaPolinomialKonsepPage = () => (
  <div className="animation-submaterial-route relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
    <Starfield />
    <PageNavigation prevPath={PAGE_PATH} />

    <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
      <header className="relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.96),rgba(16,22,43,.95)_60%,rgba(75,36,43,.76))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10" data-testid="polynomial-lesson-hero">
        <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-cyan-100/10" />
        <div className="relative max-w-4xl">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Ruang untuk Guru · SMA</span>
            <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">Buku Animasi Matematika · Polinomial</span>
          </div>
          <div className="mb-3 flex items-center gap-2 text-amber-200">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <p className="font-body text-xs font-bold uppercase tracking-[.24em]">Siap berteman dengan polinomial?</p>
          </div>
          <h1 className="max-w-4xl font-display text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="polynomial-lesson-title">
            Konsep dasar, <span className="text-cyan-200">nilai fungsi, identitas,</span> dan faktor polinomial
          </h1>
          <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">
            Yuk, kenali bentuk polinomial, baca koefisien dan derajatnya, hitung nilai fungsi, buktikan dua polinomial identik, lalu gunakan faktorisasi untuk menemukan akar. Kita urai setiap ide dengan langkah yang jelas—pelan-pelan, tetapi mantap!
          </p>
          <div className="mt-6 flex items-start gap-2 text-sm text-amber-100">
            <Target className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Target belajar: memahami bentuk polinomial, menentukan nilainya, membandingkan koefisien, melakukan operasi, serta menguji apakah suatu bentuk merupakan faktor.</span>
          </div>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0 space-y-12">
          <section id="polinomial-konsep" data-testid="section-polynomial-concept">
            <SectionHeading
              index="4.1"
              title="Kenalan dulu dengan polinomial"
              description="Polinomial—disebut juga suku banyak—adalah bentuk aljabar dengan sejumlah suku berhingga. Setiap suku memuat koefisien dan variabel berpangkat bilangan bulat tak negatif."
            />
            <div className="space-y-4">
              <Equation math="P(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_2x^2+a_1x+a_0,\qquad a_n\ne 0" label="Bentuk umum polinomial berderajat n" />
              <div className="grid gap-3 sm:grid-cols-2">
                <article className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.045] p-4">
                  <h3 className="mb-2 font-display text-lg font-extrabold text-cyan-100">Apa arti simbolnya?</h3>
                  <ul className="space-y-2 font-body text-sm leading-relaxed text-slate-300">
                    <li><strong className="text-white"><InlineMath math="x" /></strong> adalah variabel.</li>
                    <li><strong className="text-white"><InlineMath math="a_0,a_1,\ldots,a_n" /></strong> adalah koefisien yang berupa bilangan real.</li>
                    <li><strong className="text-white"><InlineMath math="n" /></strong> adalah bilangan bulat tak negatif; pangkat tertinggi dengan koefisien tak nol menentukan derajat polinomial.</li>
                    <li><strong className="text-white"><InlineMath math="a_n" /></strong> disebut koefisien utama, sedangkan <InlineMath math="a_0" /> adalah suku konstanta.</li>
                  </ul>
                </article>
                <article className="rounded-2xl border border-violet-200/15 bg-violet-200/[.045] p-4">
                  <h3 className="mb-2 font-display text-lg font-extrabold text-violet-100">Aturan pangkat yang penting</h3>
                  <p className="font-body text-sm leading-relaxed text-slate-300">
                    Pangkat variabel pada polinomial harus bilangan bulat tak negatif, misalnya <InlineMath math="0,1,2,3,\ldots" />. Karena itu, pangkat pecahan atau negatif tidak termasuk bentuk polinomial.
                  </p>
                  <div className="mt-3 space-y-2 text-sm text-slate-300">
                    <p>✅ <InlineMath math="4x^3-2x+7" /> adalah polinomial.</p>
                    <p>❌ <InlineMath math="3x^{-1}+2" /> bukan polinomial.</p>
                    <p>❌ <InlineMath math="\sqrt{x}+5" /> bukan polinomial dalam <InlineMath math="x" />.</p>
                  </div>
                </article>
              </div>
              <article className="rounded-3xl border border-white/10 bg-[#101b2d]/80 p-5 sm:p-6">
                <h3 className="font-display text-xl font-extrabold text-white">Menulis polinomial dengan rapi</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Kita biasanya menata suku menurut pangkat variabel dari yang tertinggi ke yang terendah. Jika suatu pangkat tidak muncul, koefisiennya boleh ditulis <InlineMath math="0" /> agar semua pangkat terlihat berurutan.
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <Equation math="5x^4-3x^2+2x-7=5x^4+0x^3-3x^2+2x-7" label="Koefisien x³ yang tidak tertulis adalah 0" />
                  <Equation math="2x^3+6x^2-4x+9" label="Contoh polinomial berderajat 3" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Pada <InlineMath math="2x^3+6x^2-4x+9" />, koefisien-koefisiennya berturut-turut adalah <InlineMath math="2,6,-4,9" />, koefisien utama <InlineMath math="2" />, suku konstanta <InlineMath math="9" />, dan derajatnya <InlineMath math="3" />. Suku yang pangkat variabelnya sama disebut suku sejenis.
                </p>
              </article>
              <Example number={1} title="Mengenali derajat, koefisien, dan suku konstanta">
                <p className="text-sm leading-relaxed text-slate-300">
                  Perhatikan <InlineMath math="R(x)=7x^5-2x^3+4x^2-6" />. Pangkat yang hilang dapat kita sisipkan dengan koefisien nol:
                </p>
                <Equation math="R(x)=7x^5+0x^4-2x^3+4x^2+0x-6" />
                <div className="grid gap-2 sm:grid-cols-2">
                  <p className="rounded-xl border border-white/10 bg-white/[.03] p-3 text-sm leading-relaxed text-slate-300">Derajat: <strong className="text-white">5</strong>, sebab suku berpangkat tertinggi adalah <InlineMath math="7x^5" />.</p>
                  <p className="rounded-xl border border-white/10 bg-white/[.03] p-3 text-sm leading-relaxed text-slate-300">Koefisien <InlineMath math="x^3" />: <strong className="text-white">−2</strong>; koefisien <InlineMath math="x" />: <strong className="text-white">0</strong>.</p>
                  <p className="rounded-xl border border-white/10 bg-white/[.03] p-3 text-sm leading-relaxed text-slate-300">Koefisien utama: <strong className="text-white">7</strong>.</p>
                  <p className="rounded-xl border border-white/10 bg-white/[.03] p-3 text-sm leading-relaxed text-slate-300">Suku konstanta: <strong className="text-white">−6</strong>.</p>
                </div>
              </Example>
              <Note title="Polinomial sama dengan persamaan polinomial? Belum tentu, ya!" tone="amber">
                <span> <InlineMath math="P(x)" /> adalah fungsi atau bentuk suku banyak. Jika kita menetapkan <InlineMath math="P(x)=0" />, kita memperoleh persamaan polinomial yang akar-akarnya perlu dicari. Contohnya, dari <InlineMath math="P(x)=2x^3-3x+1" />, persamaannya adalah <InlineMath math="2x^3-3x+1=0" />.</span>
              </Note>
            </div>
          </section>

          <section id="polinomial-nilai-fungsi" data-testid="section-polynomial-function-values">
            <SectionHeading
              index="4.1.1"
              title="Nilai fungsi polinomial"
              description="Untuk mendapatkan nilai fungsi, ganti setiap variabel dengan bilangan yang diminta. Substitusikan ke semua kemunculan variabel, lalu hitung dengan tertib."
            />
            <div className="space-y-4">
              <Equation math="x=k\quad\Longrightarrow\quad P(k)=a_nk^n+a_{n-1}k^{n-1}+\cdots+a_1k+a_0" label="Nilai P(x) saat x=k" />
              <Note title="Trik tanda yang bikin hitungan aman:" tone="violet">
                <span> <InlineMath math="(-2)^2=4" />, sedangkan <InlineMath math="-2^2=-4" />. Kalau nilai pengganti negatif, tulis dengan tanda kurung sebelum memangkatkannya.</span>
              </Note>
              <Example number={2} title="Menghitung nilai di dua titik">
                <p className="text-sm leading-relaxed text-slate-300">
                  Diberikan <InlineMath math="F(x)=3x^3-2x^2+4x-5" />. Tentukan <InlineMath math="F(2)" /> dan <InlineMath math="F(-1)" />.
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-[#071326]/70 p-4">
                    <p className="mb-2 font-display font-bold text-cyan-100">Saat <InlineMath math="x=2" /></p>
                    <Equation math="\begin{aligned}F(2)&=3(2)^3-2(2)^2+4(2)-5\\&=24-8+8-5\\&=19\end{aligned}" />
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#071326]/70 p-4">
                    <p className="mb-2 font-display font-bold text-violet-100">Saat <InlineMath math="x=-1" /></p>
                    <Equation math="\begin{aligned}F(-1)&=3(-1)^3-2(-1)^2+4(-1)-5\\&=-3-2-4-5\\&=-14\end{aligned}" />
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-emerald-100"><Check className="mr-2 inline h-4 w-4" />Jadi, <InlineMath math="F(2)=19" /> dan <InlineMath math="F(-1)=-14" />. Tanda negatif ikut masuk ke setiap suku yang memuat <InlineMath math="x" />.</p>
              </Example>
              <Example number={3} title="Nilai fungsi dan operasi pada dua polinomial">
                <p className="text-sm leading-relaxed text-slate-300">
                  Misalkan <InlineMath math="P(x)=2x-5" /> dan <InlineMath math="Q(x)=x^3+1" />. Ayo kita hitung nilai fungsi, lalu jumlahkan dan kalikan kedua bentuknya!
                </p>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <h3 className="mb-2 font-display font-bold text-cyan-100">A. Nilai fungsi saat <InlineMath math="x=2" /></h3>
                    <Equation math="\begin{aligned}P(2)&=2(2)-5=-1, & Q(2)&=2^3+1=9\\P(Q(2))&=P(9)=2(9)-5=13, & Q(P(2))&=Q(-1)=(-1)^3+1=0\end{aligned}" />
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">Perhatikan urutannya: <InlineMath math="P(Q(2))" /> berarti hitung <InlineMath math="Q(2)" /> terlebih dahulu, kemudian masukkan hasilnya ke fungsi <InlineMath math="P" />.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <h3 className="mb-2 font-display font-bold text-amber-100">B. Jumlahkan kedua polinomial</h3>
                    <Equation math="\begin{aligned}P(x)+Q(x)&=(2x-5)+(x^3+1)\\&=x^3+2x-4\end{aligned}" />
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <h3 className="mb-2 font-display font-bold text-emerald-100">C. Kalikan kedua polinomial</h3>
                    <Equation math="\begin{aligned}P(x)Q(x)&=(2x-5)(x^3+1)\\&=2x^4-5x^3+2x-5\end{aligned}" />
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">Setiap suku pada faktor pertama dikalikan dengan setiap suku pada faktor kedua. Tak ada suku yang tertinggal—hore, distributif bekerja!</p>
                  </div>
                </div>
              </Example>
            </div>
          </section>

          <section id="polinomial-identik" data-testid="section-identical-polynomials">
            <SectionHeading
              index="4.1.2"
              title="Polinomial identik"
              description="Dua polinomial disebut identik jika nilainya sama untuk setiap nilai variabel. Untuk polinomial dalam variabel yang sama, identitas ini terjadi tepat ketika koefisien pada pangkat yang bersesuaian sama."
            />
            <div className="space-y-4">
              <Equation math="P(x)\equiv Q(x)\quad\Longleftrightarrow\quad\text{koefisien setiap pangkat yang bersesuaian sama}" />
              <Note title="Bedakan identitas dan persamaan biasa." tone="amber">
                <span> <InlineMath math="x^2=1" /> benar hanya untuk <InlineMath math="x=1" /> atau <InlineMath math="x=-1" />, jadi bukan identitas. Sebaliknya, <InlineMath math="(x+2)^2\equiv x^2+4x+4" /> berlaku untuk setiap nilai <InlineMath math="x" />.</span>
              </Note>
              <Example number={4} title="Menentukan koefisien dari dua polinomial identik">
                <p className="text-sm leading-relaxed text-slate-300">
                  Agar persamaan berikut benar untuk setiap <InlineMath math="x" />, tentukan <InlineMath math="A" />, <InlineMath math="B" />, dan <InlineMath math="C" />.
                </p>
                <Equation math="(2A+1)x^3+(B-4)x^2+(3C+2)x-7\equiv9x^3-2x^2+14x-7" />
                <ol className="space-y-3 text-sm leading-relaxed text-slate-300">
                  <li className="rounded-xl border border-white/10 bg-white/[.025] p-3"><strong className="text-cyan-100">Samakan koefisien <InlineMath math="x^3" />:</strong> <InlineMath math="2A+1=9" />, maka <InlineMath math="A=4" />.</li>
                  <li className="rounded-xl border border-white/10 bg-white/[.025] p-3"><strong className="text-violet-100">Samakan koefisien <InlineMath math="x^2" />:</strong> <InlineMath math="B-4=-2" />, maka <InlineMath math="B=2" />.</li>
                  <li className="rounded-xl border border-white/10 bg-white/[.025] p-3"><strong className="text-amber-100">Samakan koefisien <InlineMath math="x" />:</strong> <InlineMath math="3C+2=14" />, maka <InlineMath math="C=4" />.</li>
                  <li className="rounded-xl border border-emerald-200/15 bg-emerald-200/[.05] p-3 text-emerald-50"><strong>Koefisien konstanta:</strong> kedua ruas sama-sama <InlineMath math="-7" />, jadi bagian ini juga cocok.</li>
                </ol>
                <p className="text-sm font-bold text-emerald-100">Mantap! Diperoleh <InlineMath math="A=4" />, <InlineMath math="B=2" />, dan <InlineMath math="C=4" />.</p>
              </Example>
              <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.04] p-4 text-sm leading-relaxed text-slate-300">
                <strong className="text-cyan-100">Mengapa caranya sah?</strong> Jika dua polinomial identik, selisih keduanya adalah polinomial nol. Karena polinomial nol memiliki koefisien nol pada setiap pangkat, semua koefisien yang bersesuaian harus sama.
              </div>
            </div>
          </section>

          <section id="polinomial-operasi" data-testid="section-polynomial-operations">
            <SectionHeading
              index="4.1.3"
              title="Sifat operasi aljabar polinomial"
              description="Polinomial dapat dijumlahkan, dikurangkan, dan dikalikan. Saat menjumlahkan atau mengurangkan, kelompokkan suku sejenis; saat mengalikan, gunakan sifat distributif hingga semua pasangan suku sudah dikalikan."
            />
            <div className="space-y-4">
              <article className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.045] p-4">
                  <h3 className="mb-2 font-display font-bold text-cyan-100">Penjumlahan</h3>
                  <p className="text-sm leading-relaxed text-slate-300">Jumlahkan koefisien pada pangkat yang sama. Pangkat yang tidak memiliki pasangan tetap ditulis.</p>
                </div>
                <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.045] p-4">
                  <h3 className="mb-2 font-display font-bold text-violet-100">Pengurangan</h3>
                  <p className="text-sm leading-relaxed text-slate-300">Ubah tanda semua suku pada polinomial pengurang, lalu gabungkan koefisien suku sejenis.</p>
                </div>
                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-4">
                  <h3 className="mb-2 font-display font-bold text-amber-100">Perkalian</h3>
                  <p className="text-sm leading-relaxed text-slate-300">Kalikan setiap suku dengan setiap suku. Untuk variabel berpangkat sama, gunakan <InlineMath math="x^a\cdot x^b=x^{a+b}" />.</p>
                </div>
              </article>
              <Example number={5} title="Menjumlahkan, mengurangkan, dan mengalikan">
                <p className="text-sm leading-relaxed text-slate-300">
                  Diberikan <InlineMath math="P(x)=2x^2+3x-1" /> dan <InlineMath math="Q(x)=x^2-4" />. Kita kerjakan tiap operasi, ya!
                </p>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <h3 className="mb-2 font-display font-bold text-cyan-100">a. Penjumlahan</h3>
                    <Equation math="\begin{aligned}P(x)+Q(x)&=(2x^2+3x-1)+(x^2-4)\\&=(2+1)x^2+3x+(-1-4)\\&=3x^2+3x-5\end{aligned}" />
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <h3 className="mb-2 font-display font-bold text-violet-100">b. Pengurangan</h3>
                    <Equation math="\begin{aligned}P(x)-Q(x)&=(2x^2+3x-1)-(x^2-4)\\&=2x^2+3x-1-x^2+4\\&=x^2+3x+3\end{aligned}" />
                    <p className="mt-2 text-sm text-slate-300">Tanda minus di depan kurung mengubah <InlineMath math="-4" /> menjadi <InlineMath math="+4" />. Jangan lupa membagikan tanda itu!</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <h3 className="mb-2 font-display font-bold text-amber-100">c. Perkalian</h3>
                    <Equation math="\begin{aligned}P(x)Q(x)&=(2x^2+3x-1)(x^2-4)\\&=2x^4-8x^2+3x^3-12x-x^2+4\\&=2x^4+3x^3-9x^2-12x+4\end{aligned}" />
                    <p className="mt-2 text-sm text-slate-300">Sebelum merapikan jawaban, periksa apakah semua pasangan suku sudah dikalikan. Setelah itu, satukan suku sejenis seperti <InlineMath math="-8x^2-x^2=-9x^2" />.</p>
                  </div>
                </div>
              </Example>
              <article className="rounded-3xl border border-white/10 bg-[#101b2d]/80 p-5 sm:p-6">
                <h3 className="font-display text-xl font-extrabold text-white">Apa yang terjadi pada derajatnya?</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Misalkan <InlineMath math="P_n(x)" /> berderajat <InlineMath math="n" /> dan <InlineMath math="Q_m(x)" /> berderajat <InlineMath math="m" />. Aturannya perlu dibaca dengan teliti:
                </p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.04] p-4">
                    <p className="mb-2 font-bold text-cyan-100">Penjumlahan atau pengurangan</p>
                    <p className="text-sm leading-relaxed text-slate-300">Jika derajatnya berbeda, hasil biasanya berderajat yang lebih tinggi: saat <InlineMath math="n>m" />, derajat hasil <InlineMath math="n" />; saat <InlineMath math="n<m" />, derajat hasil <InlineMath math="m" />. Jika <InlineMath math="n=m" />, suku pangkat tertinggi dapat saling menghapus, sehingga derajat hasil bisa lebih kecil.</p>
                  </div>
                  <Equation math="\deg(PQ)=\deg(P)+\deg(Q)=n+m" label="Perkalian polinomial tak nol" />
                  <Example number={6} title="Waspadai suku tertinggi yang saling menghapus">
                    <p className="text-sm leading-relaxed text-slate-300">Ambil <InlineMath math="A(x)=3x^2+2" /> dan <InlineMath math="B(x)=-3x^2+x+1" />. Keduanya berderajat dua, tetapi:</p>
                    <Equation math="A(x)+B(x)=x+3,\qquad \deg(A+B)=1" />
                    <p className="text-sm leading-relaxed text-slate-300">Suku <InlineMath math="3x^2" /> dan <InlineMath math="-3x^2" /> lenyap saat dijumlahkan. Karena itu, derajat jumlah tidak selalu sama dengan derajat masing-masing polinomial ketika pangkat tertinggi sama.</p>
                  </Example>
                </div>
              </article>
            </div>
          </section>

          <section id="polinomial-faktor" data-testid="section-polynomial-factors">
            <SectionHeading
              index="4.1.4"
              title="Faktor dari suatu polinomial"
              description="Faktorisasi menulis suatu polinomial sebagai hasil kali beberapa faktor yang lebih sederhana. Dengan menguji nilai fungsi, kita dapat mengetahui apakah faktor berbentuk (x − a) benar-benar membagi polinomial."
            />
            <div className="space-y-4">
              <Example number={7} title="Mengurai polinomial menjadi faktor">
                <p className="text-sm leading-relaxed text-slate-300">
                  Perhatikan <InlineMath math="6x^3+9x^2-15x" />. Pertama, keluarkan faktor persekutuan terbesarnya, yaitu <InlineMath math="3x" />:
                </p>
                <Equation math="\begin{aligned}6x^3+9x^2-15x&=3x(2x^2+3x-5)\\&=3x(2x+5)(x-1)\end{aligned}" />
                <p className="text-sm leading-relaxed text-slate-300">
                  Cek perkalian kuadratnya: <InlineMath math="(2x+5)(x-1)=2x^2+3x-5" />. Jadi bentuk faktor-faktornya adalah <InlineMath math="3" />, <InlineMath math="x" />, <InlineMath math="2x+5" />, dan <InlineMath math="x-1" />. Ingat, bilangan tak nol pun bisa menjadi faktor konstanta.
                </p>
              </Example>
              <article className="rounded-3xl border border-emerald-200/15 bg-[linear-gradient(145deg,rgba(6,78,59,.13),rgba(14,25,42,.9))] p-5 sm:p-6">
                <h3 className="font-display text-xl font-extrabold text-emerald-100">Teorema faktor: substitusi jadi alat uji!</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Untuk polinomial <InlineMath math="P(x)" /> dan bilangan <InlineMath math="a" />, bentuk <InlineMath math="x-a" /> merupakan faktor dari <InlineMath math="P(x)" /> tepat ketika <InlineMath math="P(a)=0" />. Dengan kata lain:
                </p>
                <div className="my-4">
                  <Equation math="P(a)=0\quad\Longleftrightarrow\quad (x-a)\text{ adalah faktor dari }P(x)" />
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  Kenapa? Jika <InlineMath math="P(x)=(x-a)Q(x)" />, maka ketika <InlineMath math="x=a" />, kita memperoleh <InlineMath math="P(a)=(a-a)Q(a)=0" />. Sebaliknya, teorema sisa menyatakan bahwa pembagian <InlineMath math="P(x)" /> oleh <InlineMath math="x-a" /> bersisa <InlineMath math="P(a)" />. Sisa nol berarti pembagian habis.
                </p>
              </article>
              <Example number={8} title="Menguji faktor dan memfaktorkan sampai tuntas">
                <p className="text-sm leading-relaxed text-slate-300">
                  Misalkan <InlineMath math="f(x)=x^3-4x^2-7x+10" />. Uji apakah <InlineMath math="x-1" />, <InlineMath math="x+2" />, <InlineMath math="x-5" />, dan <InlineMath math="x+3" /> merupakan faktor.
                </p>
                <ol className="space-y-3 text-sm leading-relaxed text-slate-300">
                  <li className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><strong className="text-cyan-100">Uji <InlineMath math="x-1" /> dengan menghitung <InlineMath math="f(1)" />:</strong><div className="mt-2"><Equation math="f(1)=1-4-7+10=0" /></div><p className="mt-2">Karena hasilnya nol, <InlineMath math="x-1" /> adalah faktor.</p></li>
                  <li className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><strong className="text-violet-100">Bagi polinomial dengan faktor itu:</strong><div className="mt-2"><Equation math="\begin{array}{r|rrrr}1&1&-4&-7&10\\& &1&-3&-10\\\hline&1&-3&-10&0\end{array}" /></div><p className="mt-2">Hasil baginya adalah <InlineMath math="x^2-3x-10" />, jadi <InlineMath math="f(x)=(x-1)(x^2-3x-10)" />.</p></li>
                  <li className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><strong className="text-amber-100">Faktorkan bentuk kuadrat:</strong><div className="mt-2"><Equation math="x^2-3x-10=(x-5)(x+2)" /></div><p className="mt-2">Dengan demikian, <InlineMath math="f(x)=(x-1)(x-5)(x+2)" />. Akar-akarnya adalah <InlineMath math="1,5,-2" />.</p></li>
                  <li className="rounded-2xl border border-rose-200/15 bg-rose-200/[.04] p-4"><strong className="text-rose-100">Uji <InlineMath math="x+3" />:</strong> bentuk ini sama dengan <InlineMath math="x-(-3)" />, jadi hitung <InlineMath math="f(-3)=-27-36+21+10=-32" />. Karena tidak nol, <InlineMath math="x+3" /> bukan faktor.</li>
                </ol>
                <Note title="Pemeriksaan cepat:" tone="emerald">
                  <span> Setelah faktorisasi, kalikan kembali faktor-faktornya atau uji setiap akar ke fungsi semula. Pemeriksaan singkat ini membantu menangkap salah tanda sebelum jawaban dikumpulkan.</span>
                </Note>
              </Example>
              <Example number={9} title="Memeriksa faktor dengan nilai fungsi">
                <p className="text-sm leading-relaxed text-slate-300">
                  Diketahui <InlineMath math="g(x)=2x^3-3x^2-8x+12" />. Apakah <InlineMath math="x-2" /> merupakan faktor?
                </p>
                <Equation math="\begin{aligned}g(2)&=2(2)^3-3(2)^2-8(2)+12\\&=16-12-16+12\\&=0\end{aligned}" />
                <p className="text-sm leading-relaxed text-emerald-100">Ya! Karena <InlineMath math="g(2)=0" />, teorema faktor memastikan bahwa <InlineMath math="x-2" /> adalah faktor <InlineMath math="g(x)" />.</p>
                <p className="text-sm leading-relaxed text-slate-300">Sebaliknya, jika hasil substitusi tidak nol, bentuk <InlineMath math="x-2" /> bukan faktor. Misalnya, <InlineMath math="g(0)=12" />, sehingga <InlineMath math="x" /> bukan faktor dari polinomial ini.</p>
              </Example>
            </div>
          </section>

          <section id="polinomial-rangkuman" data-testid="section-polynomial-takeaways">
            <SectionHeading
              index="✦"
              title="Simpan bekal penting ini"
              description="Kita sudah menelusuri konsep lengkap dari bentuk polinomial sampai pengujian faktor. Ini pengingat ringkas untuk menemani latihan berikutnya."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Pangkat variabel pada polinomial adalah bilangan bulat tak negatif; derajat ditentukan oleh pangkat tertinggi yang koefisiennya tidak nol.",
                "Nilai P(k) diperoleh dengan mengganti setiap x dengan k. Jika k negatif, gunakan tanda kurung saat substitusi.",
                "Dua polinomial identik jika koefisien pada setiap pangkat bersesuaian sama.",
                "Saat menjumlahkan atau mengurangkan, gabungkan suku sejenis. Ketika mengalikan, gunakan sifat distributif untuk setiap pasangan suku.",
                "Derajat hasil kali dua polinomial tak nol adalah jumlah derajat kedua faktor.",
                "x − a menjadi faktor P(x) tepat ketika P(a) = 0; sisa pembagian oleh x − a adalah P(a).",
              ].map((item, index) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-cyan-200/15 bg-cyan-200/[.04] p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cyan-200/10 font-display text-xs font-black text-cyan-100">{index + 1}</span>
                  <p className="font-body text-sm leading-relaxed text-slate-300">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-amber-200/20 bg-amber-200/[.06] p-4 text-amber-50/90">
              <Sparkles className="h-5 w-5 shrink-0 text-amber-200" aria-hidden="true" />
              <p className="font-body text-sm leading-relaxed"><strong className="text-amber-100">Kamu siap melangkah!</strong> Rapikan suku, jaga tanda, dan cek hasil substitusi. Polinomial yang panjang pun bisa ditaklukkan satu langkah pada satu waktu.</p>
            </div>
          </section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-8 rounded-3xl border border-white/10 bg-[#101b2d]/80 p-4 backdrop-blur">
            <p className="mb-3 flex items-center gap-2 font-body text-xs font-black uppercase tracking-[.17em] text-cyan-100"><Target className="h-4 w-4" aria-hidden="true" /> Peta belajar</p>
            <nav aria-label="Navigasi materi polinomial" className="space-y-1">
              {lessonMap.map(([id, label], index) => (
                <a key={id} href={`#${id}`} className="flex items-center gap-2 rounded-xl px-3 py-2.5 font-body text-xs text-slate-300 transition hover:bg-cyan-200/[.08] hover:text-cyan-100">
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-white/[.06] text-[10px] font-bold text-cyan-100/80">{index + 1}</span>{label}
                </a>
              ))}
            </nav>
            <div className="mt-4 rounded-2xl border border-amber-200/15 bg-amber-200/[.05] p-3">
              <p className="flex items-center gap-2 font-display text-sm font-bold text-amber-100"><Check className="h-4 w-4" aria-hidden="true" /> Ingat langkah ini</p>
              <p className="mt-2 font-body text-xs leading-relaxed text-slate-400">Untuk menguji faktor <InlineMath math="x-a" />, cukup hitung <InlineMath math="P(a)" />. Jika hasilnya nol, faktor itu cocok!</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
);

export default SmaPolinomialKonsepPage;
