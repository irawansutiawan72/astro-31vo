import type { ReactNode } from "react";
import { BookOpen, Check, Lightbulb, Sparkles, Target } from "lucide-react";
import { BlockMath, InlineMath as KatexInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import PageNavigation from "@/components/PageNavigation";
import Starfield from "@/components/Starfield";

const MENU_PATH = "/ruang-untuk-guru/sma/buku-animasi/polinomial";
const InlineMath = ({ math }: { math: string }) => <KatexInlineMath math={math} />;

function Equation({ math, label }: { math: string; label?: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/90 px-4 py-3 text-center text-cyan-100 sm:px-6">
      {label && (
        <p className="mb-2 text-left font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/50">
          {label}
        </p>
      )}
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
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-slate-300">
          {description}
        </p>
      </div>
    </div>
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
      <p>
        <strong>{title}</strong> {children}
      </p>
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
          <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">
            Contoh {number} · angka dan kasus baru
          </p>
          <h3 className="font-display text-base font-bold text-white sm:text-lg">{title}</h3>
        </div>
      </div>
      <div className="space-y-4 p-4 sm:p-5">{children}</div>
    </article>
  );
}

function HornerDiagram({
  value,
  coefficients,
  polynomialName,
}: {
  value: number;
  coefficients: number[];
  polynomialName: string;
}) {
  const results = [coefficients[0]];
  for (let index = 1; index < coefficients.length; index += 1) {
    results.push(coefficients[index] + value * results[index - 1]);
  }
  const products = results.slice(0, -1).map((result) => result * value);
  const startX = 112;
  const gap = 78;
  const width = startX + coefficients.length * gap + 20;
  const arrowId = `horner-arrow-${polynomialName}-${value}`.replace(/[^a-zA-Z0-9_-]/g, "");
  const format = (number: number) => (number < 0 ? `−${Math.abs(number)}` : `${number}`);

  return (
    <div>
      <p className="mb-2 font-body text-xs font-bold uppercase tracking-[.16em] text-cyan-100/80">
        Skema Horner · <InlineMath math={`${polynomialName}(${value})`} />
      </p>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/80 p-2">
        <svg
          viewBox={`0 0 ${width} 166`}
          className="h-auto min-w-[470px] text-slate-100"
          role="img"
          aria-labelledby={`${polynomialName}-horner-title-${value} ${polynomialName}-horner-desc-${value}`}
        >
          <title id={`${polynomialName}-horner-title-${value}`}>Skema Horner untuk {polynomialName}({value})</title>
          <desc id={`${polynomialName}-horner-desc-${value}`}>
            Koefisien {coefficients.join(", ")} dihitung dengan mengalikan hasil sebelumnya dengan {value}.
            Baris hasil akhirnya adalah {results.join(", ")}.
          </desc>
          <text x="22" y="49" fill="#fcd34d" fontSize="14" fontWeight="700">
            {format(value)}
          </text>
          <text x="18" y="85" fill="#c4b5fd" fontSize="11" fontWeight="700">
            × {format(value)}
          </text>
          <text x="19" y="137" fill="#86efac" fontSize="11" fontWeight="700">
            Jumlah
          </text>
          <line x1="86" y1="62" x2={width - 14} y2="62" stroke="#64748b" strokeWidth="1.2" />
          <line x1="86" y1="108" x2={width - 14} y2="108" stroke="#64748b" strokeWidth="1.2" />
          {coefficients.map((coefficient, index) => {
            const x = startX + index * gap;
            const previousX = x - gap;
            return (
              <g key={`horner-column-${index}`}>
                <text
                  x={x}
                  y="48"
                  fill="#e2e8f0"
                  fontSize="16"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {format(coefficient)}
                </text>
                {index > 0 && (
                  <>
                    <path
                      d={`M ${previousX + 7} 128 Q ${(previousX + x) / 2} 77 ${x - 7} 78`}
                      fill="none"
                      stroke="#c4b5fd"
                      strokeWidth="1.5"
                      markerEnd={`url(#${arrowId})`}
                    />
                    <text
                      x={x}
                      y="96"
                      fill="#c4b5fd"
                      fontSize="14"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      {format(products[index - 1])}
                    </text>
                  </>
                )}
                <text
                  x={x}
                  y="138"
                  fill={index === results.length - 1 ? "#86efac" : "#f8fafc"}
                  fontSize="16"
                  fontWeight="800"
                  textAnchor="middle"
                >
                  {format(results[index])}
                </text>
              </g>
            );
          })}
          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#c4b5fd" />
            </marker>
          </defs>
          <text x="20" y="158" fill="#94a3b8" fontSize="10">
            koefisien
          </text>
          <text x={width - 16} y="158" fill="#86efac" fontSize="10" textAnchor="end">
            angka terakhir = sisa
          </text>
        </svg>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">
        Turunkan koefisien pertama. Kalikan hasil yang baru diperoleh dengan {format(value)}, lalu jumlahkan
        dengan koefisien berikutnya. Ulangi sampai selesai!
      </p>
    </div>
  );
}

function LongDivisionDiagram() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/80 p-3 sm:p-4">
      <svg
        viewBox="0 0 680 365"
        className="h-auto min-w-[600px] text-slate-100"
        role="img"
        aria-labelledby="long-division-title long-division-desc"
      >
        <title id="long-division-title">Pembagian bersusun polinomial dengan sisa</title>
        <desc id="long-division-desc">
          Pembagian 2x pangkat tiga tambah 5x kuadrat kurang 4x tambah 7 oleh x tambah 2.
          Hasil baginya 2x kuadrat tambah x kurang 6 dan sisanya 19.
        </desc>
        <text x="325" y="34" fill="#67e8f9" fontFamily="Georgia, serif" fontSize="22" fontWeight="700" textAnchor="middle">
          2x² + x − 6
        </text>
        <line x1="135" y1="48" x2="630" y2="48" stroke="#94a3b8" strokeWidth="1.4" />
        <text x="15" y="85" fill="#fcd34d" fontFamily="Georgia, serif" fontSize="20">
          x + 2
        </text>
        <path d="M 94 58 L 94 96 Q 94 103 104 103 L 625 103" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="116" y="88" fill="#e2e8f0" fontFamily="Georgia, serif" fontSize="20">
          2x³ + 5x² − 4x + 7
        </text>
        <text x="204" y="130" fill="#c4b5fd" fontFamily="Georgia, serif" fontSize="19">
          − (2x³ + 4x²)
        </text>
        <line x1="198" y1="139" x2="490" y2="139" stroke="#64748b" strokeWidth="1.1" />
        <text x="283" y="169" fill="#e2e8f0" fontFamily="Georgia, serif" fontSize="19">
          x² − 4x + 7
        </text>
        <text x="283" y="209" fill="#c4b5fd" fontFamily="Georgia, serif" fontSize="19">
          − (x² + 2x)
        </text>
        <line x1="278" y1="218" x2="501" y2="218" stroke="#64748b" strokeWidth="1.1" />
        <text x="366" y="248" fill="#e2e8f0" fontFamily="Georgia, serif" fontSize="19">
          −6x + 7
        </text>
        <text x="366" y="288" fill="#c4b5fd" fontFamily="Georgia, serif" fontSize="19">
          − (−6x − 12)
        </text>
        <line x1="360" y1="297" x2="533" y2="297" stroke="#64748b" strokeWidth="1.1" />
        <text x="443" y="330" fill="#86efac" fontFamily="Georgia, serif" fontSize="21" fontWeight="700">
          19
        </text>
        <text x="475" y="330" fill="#86efac" fontFamily="Georgia, serif" fontSize="13">
          sisa
        </text>
      </svg>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">
        Baris demi baris: bagi suku berpangkat tertinggi, kalikan balik, kurangkan, lalu ulangi pada sisa
        yang baru.
      </p>
    </div>
  );
}

const SmaPembagianPolinomialPage = () => (
  <div className="animation-submaterial-route relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
    <Starfield />
    <PageNavigation prevPath={MENU_PATH} />

    <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
      <header className="relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.96),rgba(16,22,43,.95)_60%,rgba(75,36,43,.76))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-cyan-100/10" />
        <div className="relative max-w-4xl">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">
              Ruang untuk Guru · SMA
            </span>
            <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">
              Buku Animasi Matematika · Polinomial
            </span>
          </div>
          <div className="mb-3 flex items-center gap-2 text-amber-200">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <p className="font-body text-xs font-bold uppercase tracking-[.24em]">
              Siap membagi polinomial dengan penuh percaya diri?
            </p>
          </div>
          <h1 className="max-w-4xl font-display text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Pembagian Polinomial <span className="text-cyan-200">Bersusun dan Horner</span>
          </h1>
          <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">
            Yuk, kita bagi polinomial dengan dua cara: metode bersusun yang memperlihatkan setiap
            pengurangan, dan skema Horner yang merapikan hitungan melalui koefisien. Setelah itu,
            teorema sisa membantu kita menemukan sisa dengan cepat. Pelan-pelan saja—setiap langkah
            punya pola yang bisa kita ikuti!
          </p>
          <div className="mt-6 flex items-start gap-2 text-sm text-amber-100">
            <Target className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              Target belajar: menentukan hasil bagi dan sisa, menggunakan Horner untuk pembagi
              berbentuk <InlineMath math="x-h" />, menangani koefisien nol, dan memahami teorema sisa.
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-12">
        <section id="pembagian-bersusun">
          <SectionHeading
            index="4.3"
            title="Pembagian polinomial dengan metode bersusun"
            description="Caranya mirip pembagian bilangan bersusun. Kita membagi suku berpangkat tertinggi terlebih dahulu, mengalikan hasilnya dengan pembagi, lalu mengurangkannya. Sisa yang baru menjadi bahan untuk putaran berikutnya."
          />
          <div className="space-y-4">
            <Equation
              math="P(x)=D(x)\cdot H(x)+S(x)"
              label="Hubungan antara yang dibagi, pembagi, hasil bagi, dan sisa"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.045] p-4">
                <h3 className="mb-2 font-display text-lg font-extrabold text-cyan-100">
                  Kenali setiap bagiannya
                </h3>
                <ul className="space-y-2 font-body text-sm leading-relaxed text-slate-300">
                  <li><strong className="text-white">Yang dibagi</strong> adalah polinomial <InlineMath math="P(x)" />.</li>
                  <li><strong className="text-white">Pembagi</strong> adalah polinomial <InlineMath math="D(x)" />.</li>
                  <li><strong className="text-white">Hasil bagi</strong> ditulis <InlineMath math="H(x)" />.</li>
                  <li><strong className="text-white">Sisa</strong> ditulis <InlineMath math="S(x)" />.</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-violet-200/15 bg-violet-200/[.045] p-4">
                <h3 className="mb-2 font-display text-lg font-extrabold text-violet-100">
                  Aturan derajat sisa
                </h3>
                <p className="font-body text-sm leading-relaxed text-slate-300">
                  Derajat sisa harus lebih kecil daripada derajat pembagi. Jika pembaginya linear,
                  misalnya <InlineMath math="x-h" />, sisanya berupa konstanta—termasuk kemungkinan
                  sisa nol.
                </p>
              </article>
            </div>
            <ol className="grid gap-3 md:grid-cols-2">
              {[
                ["1", "Susun polinom yang dibagi dan pembagi menurut pangkat tertinggi ke terendah."],
                ["2", "Bagi suku terdepan polinom yang sedang dikerjakan dengan suku terdepan pembagi."],
                ["3", "Tuliskan hasil pembagian itu sebagai suku berikutnya pada hasil bagi."],
                ["4", "Kalikan suku hasil bagi tersebut dengan seluruh pembagi."],
                ["5", "Kurangkan hasil perkalian dari baris polinom yang sedang dikerjakan."],
                ["6", "Ulangi sampai derajat sisa lebih kecil daripada derajat pembagi."],
              ].map(([step, text]) => (
                <li
                  key={step}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/[.025] p-4 text-sm leading-relaxed text-slate-300"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cyan-200/10 font-display text-xs font-black text-cyan-100">
                    {step}
                  </span>
                  {text}
                </li>
              ))}
            </ol>

            <article className="overflow-hidden rounded-3xl border border-orange-200/20 bg-[linear-gradient(140deg,rgba(106,45,35,.16),rgba(14,25,42,.92)_48%)]">
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-300/15 text-orange-200">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">
                    Contoh alur pembagian bersusun
                  </p>
                  <h3 className="font-display text-base font-bold text-white sm:text-lg">
                    Membagi polinomial dengan susunan lengkap
                  </h3>
                </div>
              </div>
              <div className="space-y-4 p-4 sm:p-5">
              <p className="text-sm leading-relaxed text-slate-300">
                Mari tentukan hasil bagi dan sisa dari <InlineMath math="2x^3+5x^2-4x+7" /> jika
                dibagi dengan <InlineMath math="x+2" />. Kita mulai dari suku paling kiri, ya!
              </p>
              <LongDivisionDiagram />
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[#071326]/70 p-4">
                  <h4 className="mb-2 font-display font-bold text-cyan-100">Langkah pembagiannya</h4>
                  <ol className="list-inside list-decimal space-y-2 text-sm leading-relaxed text-slate-300 marker:text-cyan-200">
                    <li><InlineMath math="2x^3\div x=2x^2" />, lalu kurangkan <InlineMath math="2x^3+4x^2" />; tersisa <InlineMath math="x^2-4x+7" />.</li>
                    <li><InlineMath math="x^2\div x=x" />, lalu kurangkan <InlineMath math="x^2+2x" />; tersisa <InlineMath math="-6x+7" />.</li>
                    <li><InlineMath math="-6x\div x=-6" />, lalu kurangkan <InlineMath math="-6x-12" />; tersisa <InlineMath math="19" />.</li>
                  </ol>
                </div>
                <div className="rounded-2xl border border-emerald-200/15 bg-emerald-200/[.04] p-4">
                  <h4 className="mb-2 font-display font-bold text-emerald-100">Hasilnya</h4>
                  <Equation math="H(x)=2x^2+x-6,\qquad S=19" />
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Jadi, pembagian ini dapat ditulis{" "}
                    <InlineMath math="2x^3+5x^2-4x+7=(x+2)(2x^2+x-6)+19" />. Karena sisa 19
                    berderajat nol dan pembagi berderajat satu, pembagiannya sudah selesai.
                  </p>
                </div>
              </div>
              </div>
            </article>
          </div>
        </section>

        <section id="metode-horner">
          <SectionHeading
            index="4.3.1"
            title="Skema Horner: cukup bawa koefisiennya"
            description="Untuk pembagi linear berbentuk x − h, pembagian bersusun bisa dibuat lebih ringkas. Kita cukup menuliskan koefisien polinom, membawa turun koefisien pertama, lalu memakai pola kali dan jumlahkan."
          />
          <div className="space-y-4">
            <Equation
              math="x-h\text{ adalah pembagi}\quad\Longrightarrow\quad h\text{ menjadi bilangan Horner}"
              label="Perhatikan tanda pada pembagi"
            />
            <div className="grid gap-3 md:grid-cols-2">
              <article className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.045] p-4">
                <h3 className="mb-2 font-display text-lg font-extrabold text-cyan-100">
                  Urutan kali-tambah
                </h3>
                <ol className="list-inside list-decimal space-y-2 font-body text-sm leading-relaxed text-slate-300 marker:font-bold marker:text-cyan-200">
                  <li>Susun semua koefisien dari pangkat tertinggi sampai konstanta.</li>
                  <li>Tulis nilai <InlineMath math="h" /> di sebelah kiri skema.</li>
                  <li>Turunkan koefisien pertama apa adanya.</li>
                  <li>Kalikan angka yang baru turun dengan <InlineMath math="h" />.</li>
                  <li>Jumlahkan hasil kali itu dengan koefisien berikutnya.</li>
                  <li>Ulangi pola kali-tambah sampai koefisien terakhir.</li>
                </ol>
              </article>
              <article className="rounded-2xl border border-violet-200/15 bg-violet-200/[.045] p-4">
                <h3 className="mb-2 font-display text-lg font-extrabold text-violet-100">
                  Membaca baris paling bawah
                </h3>
                <p className="font-body text-sm leading-relaxed text-slate-300">
                  Semua angka pada baris hasil, kecuali angka paling kanan, menjadi koefisien
                  hasil bagi secara berurutan. Angka paling kanan adalah sisa pembagian.
                </p>
                <div className="mt-3 rounded-xl border border-violet-200/10 bg-[#071326]/70 p-3 text-sm text-violet-100">
                  Hasil bagi turun satu derajat; angka terakhir menjadi sisa. Asyik dan sistematis!
                </div>
              </article>
            </div>
            <Note title="Tanda pembagi menentukan angka Horner:" tone="amber">
              jika pembaginya <InlineMath math="x-4" />, gunakan <InlineMath math="4" />. Jika
              pembaginya <InlineMath math="x+2" />, tulis dahulu sebagai{" "}
              <InlineMath math="x-(-2)" />, jadi angka Horner-nya <InlineMath math="-2" />. Jangan
              sampai tandanya tertukar, ya!
            </Note>
            <Note title="Pangkat yang hilang tetap harus punya tempat:" tone="violet">
              kalau polinom tidak memuat suatu pangkat, masukkan koefisien{" "}
              <InlineMath math="0" /> pada posisi pangkat tersebut. Misalnya,{" "}
              <InlineMath math="4x^3-9x+8=4x^3+0x^2-9x+8" />, sehingga koefisiennya lengkap menjadi{" "}
              <InlineMath math="4,0,-9,8" />.
            </Note>
          </div>
        </section>

        <section id="contoh-horner" className="space-y-5">
          <SectionHeading
            index="9–10"
            title="Latihan pembagian dengan skema Horner"
            description="Dua contoh ini memperlihatkan cara membaca hasil bagi dan sisa. Contoh pertama memakai polinom lengkap; contoh kedua mengajak kita mengisi koefisien nol untuk pangkat yang tidak muncul."
          />

          <Example number={9} title="Menentukan hasil bagi dan sisa">
            <p className="text-sm leading-relaxed text-slate-300">
              Tentukan hasil bagi dan sisa pembagian{" "}
              <InlineMath math="2x^3+x^2-7x+5" /> dengan <InlineMath math="x-2" />.
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              Pembaginya sudah berbentuk <InlineMath math="x-h" />, sehingga{" "}
              <InlineMath math="h=2" />. Koefisien yang kita susun adalah{" "}
              <InlineMath math="2,1,-7,5" />.
            </p>
            <HornerDiagram value={2} coefficients={[2, 1, -7, 5]} polynomialName="P" />
            <Equation
              math="\begin{aligned}P(x)&=2x^3+x^2-7x+5\\&=(x-2)(2x^2+5x+3)+11\end{aligned}"
              label="Periksa kembali dengan identitas pembagian"
            />
            <p className="text-sm font-bold text-emerald-100">
              <Check className="mr-2 inline h-4 w-4" aria-hidden="true" />
              Jadi, hasil baginya <InlineMath math="2x^2+5x+3" /> dan sisanya{" "}
              <InlineMath math="11" />. Mantap, semua koefisien terbaca dari satu baris!
            </p>
          </Example>

          <Example number={10} title="Jangan lupakan koefisien nol">
            <p className="text-sm leading-relaxed text-slate-300">
              Bagilah <InlineMath math="4x^3-9x+8" /> dengan <InlineMath math="x+1" />, lalu
              tuliskan hasil bagi dan sisanya.
            </p>
            <Note title="Ada pangkat yang tidak tampil:" tone="amber">
              Tidak ada suku <InlineMath math="x^2" />, maka kita tambahkan{" "}
              <InlineMath math="0x^2" />. Selain itu, <InlineMath math="x+1=x-(-1)" />, jadi{" "}
              <InlineMath math="h=-1" />.
            </Note>
            <Equation
              math="4x^3+0x^2-9x+8,\qquad \text{koefisien: }4,0,-9,8"
              label="Lengkapi urutan pangkat sebelum menghitung"
            />
            <HornerDiagram value={-1} coefficients={[4, 0, -9, 8]} polynomialName="P" />
            <Equation
              math="4x^3-9x+8=(x+1)(4x^2-4x-5)+13"
              label="Cek: pembagi × hasil bagi + sisa"
            />
            <p className="text-sm font-bold text-emerald-100">
              <Check className="mr-2 inline h-4 w-4" aria-hidden="true" />
              Maka hasil baginya <InlineMath math="4x^2-4x-5" /> dan sisanya{" "}
              <InlineMath math="13" />. Koefisien nol menjaga urutan pangkat agar hitungan tetap
              tepat!
            </p>
          </Example>
        </section>

        <section id="teorema-sisa">
          <SectionHeading
            index="4.4"
            title="Teorema sisa"
            description="Kita sudah melihat bahwa pembagian selalu dapat ditulis sebagai hasil bagi dikalikan pembagi, lalu ditambah sisa. Bentuk ini memberi jalan pintas yang menyenangkan saat yang dicari hanya sisanya."
          />
          <div className="space-y-4">
            <article className="rounded-3xl border border-white/10 bg-[#101b2d]/80 p-5 sm:p-6">
              <h3 className="font-display text-xl font-extrabold text-white">
                Dari pembagian bilangan ke polinomial
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Contohnya, <InlineMath math="29=6\cdot4+5" />. Bilangan 29 dibagi 6 menghasilkan
                hasil bagi 4 dan sisa 5. Untuk polinomial, hubungan serupa berlaku:
              </p>
              <div className="mt-4 space-y-3">
                <Equation math="P(x)=D(x)\cdot H(x)+S(x)" />
                <p className="text-sm leading-relaxed text-slate-300">
                  Khusus pembagi linear <InlineMath math="D(x)=x-k" />, persamaan itu menjadi:
                </p>
                <Equation math="\begin{aligned}P(x)&=(x-k)H(x)+S\\\frac{P(x)}{x-k}&=H(x)+\frac{S}{x-k}\end{aligned}" />
              </div>
            </article>
            <article className="rounded-3xl border border-amber-200/15 bg-amber-200/[.04] p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-300/15 text-amber-200">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-extrabold text-amber-100">
                  Bunyi Teorema Sisa
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-200">
                Jika suatu polinomial <InlineMath math="P(x)" /> dibagi dengan{" "}
                <InlineMath math="x-k" />, sisanya adalah <InlineMath math="P(k)" />.
              </p>
            </article>
            <article className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[.035] p-5 sm:p-6">
              <h3 className="font-display text-xl font-extrabold text-cyan-100">
                Bukti singkat—dan tetap lengkap!
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Misalkan hasil bagi pembagian <InlineMath math="P(x)" /> oleh{" "}
                <InlineMath math="x-k" /> adalah <InlineMath math="H(x)" />, sedangkan sisanya
                konstanta <InlineMath math="S" />. Berdasarkan identitas pembagian:
              </p>
              <div className="mt-4 space-y-3">
                <Equation math="P(x)=(x-k)H(x)+S" />
                <p className="text-sm leading-relaxed text-slate-300">
                  Gantikan <InlineMath math="x" /> dengan <InlineMath math="k" /> pada persamaan
                  tersebut. Karena <InlineMath math="k-k=0" />, bagian yang memuat{" "}
                  <InlineMath math="H(k)" /> menjadi nol:
                </p>
                <Equation math="\begin{aligned}P(k)&=(k-k)H(k)+S\\&=0\cdot H(k)+S\\&=S\end{aligned}" />
                <p className="text-sm font-bold text-emerald-100">
                  Terbukti: sisa pembagian <InlineMath math="P(x)" /> oleh{" "}
                  <InlineMath math="x-k" /> memang sama dengan <InlineMath math="P(k)" />. Kita
          tinggal menghitung nilai polinomialnya!
                </p>
              </div>
            </article>
          </div>
        </section>

        <section id="contoh-teorema-sisa" className="space-y-5">
          <SectionHeading
            index="11–12"
            title="Gunakan teorema sisa untuk mengecek pembagian"
            description="Teorema sisa langsung memberikan angka terakhir pada skema Horner. Untuk mendapatkan hasil bagi juga, kita baca koefisien lainnya pada baris hasil."
          />
          <Example number={11} title="Pembagi x − k dan nilai polinomial P(k)">
            <p className="text-sm leading-relaxed text-slate-300">
              Tentukan hasil bagi dan sisa pembagian{" "}
              <InlineMath math="4x^4+3x^3-2x^2+5x-6" /> dengan <InlineMath math="x-1" />.
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              Karena pembaginya <InlineMath math="x-1" />, kita pakai{" "}
              <InlineMath math="k=1" />. Baris koefisiennya adalah{" "}
              <InlineMath math="4,3,-2,5,-6" />.
            </p>
            <HornerDiagram value={1} coefficients={[4, 3, -2, 5, -6]} polynomialName="P" />
            <div className="grid gap-3 sm:grid-cols-2">
              <Equation math="H(x)=4x^3+7x^2+5x+10,\qquad S=4" label="Hasil bagi dan sisa" />
              <Equation math="\begin{aligned}P(1)&=4+3-2+5-6\\&=4=S\end{aligned}" label="Cek sisa dengan teorema sisa" />
            </div>
            <p className="text-sm leading-relaxed text-emerald-100">
              Jadi, hasil baginya <InlineMath math="4x^3+7x^2+5x+10" /> dan sisanya{" "}
              <InlineMath math="4" />. Cek cepatnya cocok: <InlineMath math="P(1)=4" />!
            </p>
          </Example>

          <Example number={12} title="Pembagi x + 2 berarti k = −2">
            <p className="text-sm leading-relaxed text-slate-300">
              Carilah hasil bagi dan sisa jika <InlineMath math="2x^3-5x^2+4x+9" /> dibagi oleh{" "}
              <InlineMath math="x+2" />.
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              Ubah pembagi menjadi <InlineMath math="x-(-2)" />. Jadi, bilangan Horner-nya{" "}
              <InlineMath math="k=-2" />. Perhatikan tanda minusnya!
            </p>
            <HornerDiagram value={-2} coefficients={[2, -5, 4, 9]} polynomialName="P" />
            <div className="grid gap-3 sm:grid-cols-2">
              <Equation math="H(x)=2x^2-9x+22,\qquad S=-35" label="Hasil pembagian" />
              <Equation math="\begin{aligned}P(-2)&=2(-2)^3-5(-2)^2+4(-2)+9\\&=-16-20-8+9\\&=-35=S\end{aligned}" label="Cek sisa dengan teorema sisa" />
            </div>
            <p className="text-sm leading-relaxed text-emerald-100">
              Dengan demikian, hasil baginya <InlineMath math="2x^2-9x+22" /> dan sisanya{" "}
              <InlineMath math="-35" />. Nilai <InlineMath math="P(-2)" /> menegaskan sisa yang
              sama—berhasil!
            </p>
          </Example>
        </section>

        <section id="soal-pendalaman">
          <SectionHeading
            index="Tantangan"
            title="Soal pendalaman: gabungkan teorema faktor dan sisa"
            description="Sekarang waktunya memakai lebih dari satu ide. Jika sebuah pembagi diketahui sebagai faktor, nilai polinomial pada akarnya harus nol. Setelah itu, Horner membantu kita membagi dengan pembagi yang lain."
          />
          <article className="rounded-3xl border border-violet-200/15 bg-[linear-gradient(135deg,rgba(76,29,149,.16),rgba(14,25,42,.92)_55%)] p-5 sm:p-6">
            <p className="text-sm leading-relaxed text-slate-200">
              Diketahui <InlineMath math="f(x)=2x^3+ax^2-5x-6" /> habis dibagi{" "}
              <InlineMath math="x+2" />. Manakah pasangan hasil bagi dan sisa saat{" "}
              <InlineMath math="f(x)" /> dibagi oleh <InlineMath math="x-1" />?
            </p>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                ["A", "Hasil bagi 2x² + 5x, sisa −6"],
                ["B", "Hasil bagi 2x² + x − 4, sisa −2"],
                ["C", "Hasil bagi 2x² + 5x − 6, sisa 0"],
                ["D", "Hasil bagi 2x² − 5x, sisa 6"],
              ].map(([letter, choice]) => (
                <li
                  key={letter}
                  className="rounded-xl border border-white/10 bg-[#071326]/65 p-3 text-sm leading-relaxed text-slate-200"
                >
                  <strong className="mr-2 text-violet-200">{letter}.</strong>
                  {choice}
                </li>
              ))}
            </ol>
            <details className="group mt-5 rounded-2xl border border-emerald-200/15 bg-emerald-200/[.04] p-4">
              <summary className="cursor-pointer list-none font-display font-bold text-emerald-100 marker:hidden">
                <span className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Buka pembahasan lengkap
                </span>
              </summary>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
                <p>
                  Karena <InlineMath math="x+2" /> adalah faktor, Teorema Sisa memberi{" "}
                  <InlineMath math="f(-2)=0" />. Maka:
                </p>
                <Equation math="\begin{aligned}f(-2)&=2(-2)^3+a(-2)^2-5(-2)-6\\&=-16+4a+10-6\\&=4a-12=0\end{aligned}" />
                <p>
                  Jadi <InlineMath math="a=3" /> dan{" "}
                  <InlineMath math="f(x)=2x^3+3x^2-5x-6" />. Untuk membagi dengan{" "}
                  <InlineMath math="x-1" />, gunakan <InlineMath math="k=1" />:
                </p>
                <HornerDiagram value={1} coefficients={[2, 3, -5, -6]} polynomialName="f" />
                <p className="font-bold text-emerald-100">
                  Jawaban yang benar adalah A: hasil bagi <InlineMath math="2x^2+5x" /> dan sisa{" "}
                  <InlineMath math="-6" />. Sebagai cek, <InlineMath math="f(1)=2+3-5-6=-6" />,
                  sama dengan sisanya.
                </p>
              </div>
            </details>
          </article>
        </section>

        <Note title="Bekal sebelum menutup halaman:" tone="emerald">
          metode bersusun memperlihatkan setiap tahap pembagian; skema Horner mempercepat pembagian
          oleh <InlineMath math="x-h" /> dengan koefisien saja; dan Teorema Sisa menyatakan bahwa
          sisanya adalah <InlineMath math="P(h)" />. Susun pangkat dengan teliti, periksa tanda{" "}
          <InlineMath math="h" />, dan jangan lupa koefisien nol. Kita siap mencoba soal berikutnya!
        </Note>
      </div>
    </main>
  </div>
);

export default SmaPembagianPolinomialPage;
