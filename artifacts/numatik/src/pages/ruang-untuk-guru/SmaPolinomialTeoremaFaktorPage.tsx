import type { ReactNode } from "react";
import { BookOpen, Lightbulb, Sparkles, Target } from "lucide-react";
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
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-slate-300">{description}</p>
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
            Contoh {number} · angka dan data baru
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
  label,
  description,
}: {
  value: number;
  coefficients: number[];
  label: string;
  description: string;
}) {
  const results = [coefficients[0]];
  for (let index = 1; index < coefficients.length; index += 1) {
    results.push(coefficients[index] + value * results[index - 1]);
  }
  const products = results.slice(0, -1).map((result) => result * value);
  const startX = 108;
  const gap = 74;
  const width = startX + (coefficients.length - 1) * gap + 48;
  const id = `${label}-${value}`.toLowerCase().replace(/[^a-z0-9-]/g, "-");
  const markerId = `horner-arrow-${id}`;
  const format = (number: number) => (number < 0 ? `−${Math.abs(number)}` : `${number}`);

  return (
    <div>
      <p className="mb-2 font-body text-xs font-bold uppercase tracking-[.16em] text-cyan-100/80">
        Skema Horner · {label}
      </p>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/80 p-2">
        <svg
          viewBox={`0 0 ${width} 174`}
          className="h-auto min-w-[440px] text-slate-100"
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
        >
          <title id={`${id}-title`}>Skema Horner untuk {label}</title>
          <desc id={`${id}-desc`}>
            {description} Koefisien: {coefficients.join(", ")}. Baris hasil: {results.join(", ")}.
          </desc>
          <defs>
            <marker id={markerId} markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="#c4b5fd" />
            </marker>
          </defs>
          <text x="20" y="52" fill="#fcd34d" fontSize="14" fontWeight="700">
            {format(value)}
          </text>
          <text x="13" y="98" fill="#c4b5fd" fontSize="11" fontWeight="700">
            × {format(value)}
          </text>
          <text x="15" y="149" fill="#86efac" fontSize="11" fontWeight="700">
            Hasil
          </text>
          <line x1="78" y1="65" x2={width - 12} y2="65" stroke="#64748b" strokeWidth="1.2" />
          <line x1="78" y1="119" x2={width - 12} y2="119" stroke="#64748b" strokeWidth="1.2" />
          {coefficients.map((coefficient, index) => {
            const x = startX + index * gap;
            const previousX = x - gap;
            return (
              <g key={`${id}-column-${index}`}>
                <text x={x} y="51" fill="#e2e8f0" fontSize="16" fontWeight="700" textAnchor="middle">
                  {format(coefficient)}
                </text>
                {index > 0 && (
                  <>
                    <path
                      d={`M ${previousX + 8} 137 Q ${(previousX + x) / 2} 85 ${x - 8} 84`}
                      fill="none"
                      stroke="#c4b5fd"
                      strokeWidth="1.5"
                      markerEnd={`url(#${markerId})`}
                    />
                    <text x={x} y="105" fill="#c4b5fd" fontSize="14" fontWeight="700" textAnchor="middle">
                      {format(products[index - 1])}
                    </text>
                  </>
                )}
                <text x={x} y="148" fill="#86efac" fontSize="16" fontWeight="700" textAnchor="middle">
                  {format(results[index])}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

const SmaPolinomialTeoremaFaktorPage = () => (
  <div className="animation-submaterial-route relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
    <Starfield />
    <PageNavigation prevPath={MENU_PATH} />

    <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
      <header className="relative mb-10 overflow-hidden rounded-[2rem] border border-orange-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.96),rgba(25,30,47,.95)_58%,rgba(106,45,35,.7))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-orange-100/10" />
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
            <p className="font-body text-xs font-bold uppercase tracking-[.24em]">Ayo, berburu faktor polinomial!</p>
          </div>
          <h1 className="max-w-4xl font-display text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Teorema <span className="text-orange-200">Faktor</span>
          </h1>
          <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">
            Siapkan semangatmu! Kita akan menguji faktor dengan substitusi, mencoba calon akar rasional, membaca
            diskriminan, dan menyusun faktor-faktor polinomial langkah demi langkah.
          </p>
          <div className="mt-6 flex items-start gap-2 text-sm text-amber-100">
            <Target className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              Pegangan utama: <InlineMath math="(x-k)" /> adalah faktor <InlineMath math="P(x)" /> tepat ketika{" "}
              <InlineMath math="P(k)=0" />. Nilai nol berarti pembagian bersisa nol—hore, faktornya cocok!
            </span>
          </div>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0 space-y-12">
          <section id="makna-teorema-faktor">
            <SectionHeading
              index="4.5"
              title="Kapan suatu bentuk disebut faktor?"
              description="Kita mulai dengan hubungan sederhana antara nilai polinomial, sisa pembagian, akar, dan faktor. Keempatnya saling terhubung!"
            />
            <div className="space-y-4">
              <article className="rounded-3xl border border-orange-200/20 bg-[linear-gradient(145deg,rgba(106,45,35,.16),rgba(14,25,42,.9))] p-5 sm:p-6">
                <p className="font-body text-sm leading-relaxed text-slate-200">
                  Misalkan nilai suatu polinomial atau suku banyak <InlineMath math="P(k)=0" />. Menurut Teorema
                  Sisa, jika <InlineMath math="P(x)" /> dibagi dengan <InlineMath math="(x-k)" />, sisanya adalah{" "}
                  <InlineMath math="P(k)" />. Karena nilainya nol, pembagian itu bersisa nol. Jadi,{" "}
                  <InlineMath math="(x-k)" /> merupakan faktor dari <InlineMath math="P(x)" />. Seru, ya—cukup
                  memeriksa satu nilai untuk mengetahui apakah pembagian habis!
                </p>
                <div className="my-4">
                  <Equation math="P(x)=(x-k)Q(x)\quad\Longleftrightarrow\quad P(k)=0" label="Inti teorema faktor" />
                </div>
                <p className="font-body text-sm leading-relaxed text-slate-200">
                  Dengan kata lain, polinomial <InlineMath math="P(x)" /> mempunyai faktor <InlineMath math="(x-k)" />{" "}
                  jika dan hanya jika <InlineMath math="P(k)=0" />. Sebaliknya, jika <InlineMath math="(x-k)" />{" "}
                  adalah faktor <InlineMath math="P(x)" />, maka <InlineMath math="k" /> merupakan akar dari{" "}
                  <InlineMath math="P(x)" />; artinya, <InlineMath math="P(k)=0" />. Dua arah pernyataan ini
                  sama-sama penting!
                </p>
              </article>

              <Example number={18} title="Buktikan bahwa x − 3 adalah faktor">
                <p className="text-sm leading-relaxed text-slate-300">
                  Tunjukkan bahwa <InlineMath math="x-3" /> merupakan faktor dari{" "}
                  <InlineMath math="P(x)=x^3-2x^2-5x+6" />.
                </p>
                <p className="font-display text-sm font-bold text-orange-200">Jawab, kita cek dengan Horner!</p>
                <HornerDiagram
                  value={3}
                  coefficients={[1, -2, -5, 6]}
                  label="P(3), koefisien 1, −2, −5, 6"
                  description="Kalikan hasil sebelumnya dengan tiga, lalu jumlahkan dengan koefisien berikutnya."
                />
                <p className="text-sm leading-relaxed text-slate-300">
                  Baris hasil memberi sisa <InlineMath math="0" />, jadi <InlineMath math="P(3)=0" />. Teorema
                  Faktor langsung memastikan bahwa <InlineMath math="x-3" /> benar-benar faktor{" "}
                  <InlineMath math="P(x)" />. Hasil bagi pada baris yang sama ialah{" "}
                  <InlineMath math="x^2+x-2" />, sehingga:
                </p>
                <Equation math="x^3-2x^2-5x+6=(x-3)(x^2+x-2)" />
              </Example>
            </div>
          </section>

          <section id="faktor-rasional">
            <SectionHeading
              index="1"
              title="Mencari faktor rasional"
              description="Kalau faktor linear belum terlihat, kita bisa menguji calon akar rasional. Teorema Faktor membantu kita mengubah setiap tebakan menjadi pemeriksaan yang pasti."
            />
            <div className="space-y-4">
              <Note title="Calon akar rasional:" tone="violet">
                Untuk polinomial berkoefisien bulat, jika akar rasionalnya berbentuk{" "}
                <InlineMath math="\frac{p}{q}" /> dalam bentuk paling sederhana, maka <InlineMath math="p" /> harus
                membagi suku konstanta dan <InlineMath math="q" /> harus membagi koefisien pangkat tertinggi.
                Daftar ini membantu kita memilih bilangan untuk diuji; akar yang benar tetap perlu dibuktikan dengan
                hasil substitusi nol.
              </Note>

              <Example number={19} title="Faktorkan kubik dengan faktor rasional">
                <p className="text-sm leading-relaxed text-slate-300">
                  Faktorkan <InlineMath math="x^3-7x^2+13x-4" /> atas faktor-faktor rasional.
                </p>
                <p className="font-display text-sm font-bold text-orange-200">Jawab, kita susun calon akarnya!</p>
                <p className="text-sm leading-relaxed text-slate-300">
                  Karena polinomial ini monik dan suku konstantanya <InlineMath math="-4" />, calon akar bulatnya
                  adalah <InlineMath math="\pm1,\pm2,\pm4" />. Kita coba <InlineMath math="k=4" />:
                </p>
                <HornerDiagram
                  value={4}
                  coefficients={[1, -7, 13, -4]}
                  label="P(4), koefisien 1, −7, 13, −4"
                  description="Hasil akhir nol membuktikan bahwa empat adalah akar dan x dikurangi empat adalah faktor."
                />
                <p className="text-sm leading-relaxed text-slate-300">
                  Sisa pembagian nol, sehingga <InlineMath math="x-4" /> adalah faktor. Hasil baginya{" "}
                  <InlineMath math="x^2-3x+1" />:
                </p>
                <Equation math="x^3-7x^2+13x-4=(x-4)(x^2-3x+1)" />
                <Note title="Apakah faktor kuadratnya bisa diuraikan lagi?" tone="amber">
                  Diskriminan <InlineMath math="x^2-3x+1=0" /> adalah{" "}
                  <InlineMath math="D=b^2-4ac=(-3)^2-4(1)(1)=5" />. Karena <InlineMath math="\sqrt{5}" /> bukan
                  bilangan rasional, kuadrat ini tidak memiliki faktor linear rasional. Jadi, di antara faktor
                  linear rasional, yang kita temukan adalah <InlineMath math="x-4" />.
                </Note>
              </Example>
            </div>
          </section>

          <section id="banyak-faktor-dan-diskriminan">
            <SectionHeading
              index="2"
              title="Uji beberapa faktor dan baca diskriminan"
              description="Polinomial berpangkat tinggi kadang punya pola tersembunyi. Jika semua pangkat variabel genap, coba pandang x² sebagai satu variabel baru."
            />
            <div className="space-y-4">
              <Example number={20} title="Temukan seluruh faktor rasional polinomial pangkat enam">
                <p className="text-sm leading-relaxed text-slate-300">
                  Tentukan faktor-faktor rasional dari{" "}
                  <InlineMath math="2x^6-19x^4+8x^2+9" />.
                </p>
                <p className="font-display text-sm font-bold text-orange-200">Jawab, kita cari polanya bersama!</p>
                <p className="text-sm leading-relaxed text-slate-300">
                  Koefisien <InlineMath math="x^6" /> adalah <InlineMath math="2" /> dan suku konstantanya{" "}
                  <InlineMath math="9" />. Menurut aturan calon akar rasional, pembilang membagi{" "}
                  <InlineMath math="9" /> dan penyebut membagi <InlineMath math="2" />. Jadi, calon-calon yang
                  mungkin ialah <InlineMath math="\pm1,\pm3,\pm9,\pm\frac12,\pm\frac32,\pm\frac92" />. Karena
                  hanya pangkat genap yang muncul, kita buat substitusi <InlineMath math="y=x^2" />:
                </p>
                <Equation math="2y^3-19y^2+8y+9" label="Polinomial dalam y" />
                <p className="text-sm leading-relaxed text-slate-300">
                  Kita uji <InlineMath math="y=1" /> dari daftar tadi. Horner memberi sisa nol, jadi{" "}
                  <InlineMath math="y-1" /> merupakan faktor:
                </p>
                <HornerDiagram
                  value={1}
                  coefficients={[2, -19, 8, 9]}
                  label="polinomial y, diuji pada y = 1"
                  description="Baris hasil berakhir dengan nol; hasil baginya adalah dua y kuadrat dikurangi tujuh belas y dikurangi sembilan."
                />
                <p className="text-sm leading-relaxed text-slate-300">
                  Hasil bagi itu dapat diuraikan:{" "}
                  <InlineMath math="2y^2-17y-9=(2y+1)(y-9)" />. Jadi,{" "}
                  <InlineMath math="2y^3-19y^2+8y+9=(y-1)(y-9)(2y+1)" />. Kembalikan{" "}
                  <InlineMath math="y=x^2" />:
                </p>
                <Equation math="2x^6-19x^4+8x^2+9=(x^2-1)(x^2-9)(2x^2+1)" />
                <p className="text-sm leading-relaxed text-slate-300">
                  Dua kuadrat pertama dapat diuraikan menjadi{" "}
                  <InlineMath math="(x-1)(x+1)" /> dan <InlineMath math="(x-3)(x+3)" />. Kita pun memperoleh{" "}
                  <InlineMath math="(x-1)(x+1)(x-3)(x+3)(2x^2+1)" />.
                </p>
                <Note title="Cek diskriminan faktor terakhir:" tone="amber">
                  Untuk <InlineMath math="2x^2+1=0" />, diskriminannya{" "}
                  <InlineMath math="D=0^2-4(2)(1)=-8" />. Karena <InlineMath math="D<0" />, faktor ini tidak
                  mempunyai akar real dan tidak dapat diuraikan lagi menjadi faktor linear real.
                </Note>
              </Example>
            </div>
          </section>

          <section id="soal-pendalaman">
            <SectionHeading
              index="3"
              title="Soal pendalaman: gunakan akar dan urutannya"
              description="Sekarang kita gabungkan Teorema Faktor, faktorisasi, dan informasi bahwa akar-akar sudah diurutkan. Coba pikirkan jawabannya sebelum membuka pembahasan!"
            />
            <article className="rounded-3xl border border-violet-200/20 bg-[linear-gradient(145deg,rgba(76,29,149,.15),rgba(14,25,42,.92))] p-5 sm:p-6">
              <p className="mb-3 font-display text-sm font-bold text-violet-100">Tantangan pendalaman</p>
              <p className="text-sm leading-relaxed text-slate-200">
                Diketahui <InlineMath math="(x+3)" /> dan <InlineMath math="(x-4)" /> merupakan faktor dari{" "}
                <InlineMath math="P(x)=2x^3+px^2+qx+24" />. Jika akar-akar <InlineMath math="x_1,x_2,x_3" />{" "}
                memenuhi <InlineMath math="x_1<x_2<x_3" />, berapakah nilai{" "}
                <InlineMath math="x_1+4x_2+x_3" />?
              </p>
              <ol className="mt-4 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
                {["A. 7", "B. 6", "C. 5", "D. −3", "E. −4"].map((choice) => (
                  <li key={choice} className="rounded-xl border border-white/10 bg-white/[.035] px-3 py-2">
                    {choice}
                  </li>
                ))}
              </ol>
              <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
                <p className="font-display text-sm font-bold text-emerald-200">Pembahasan, kita cari akar ketiganya!</p>
                <p className="text-sm leading-relaxed text-slate-300">
                  Dari informasi faktor, dua akar sudah diketahui, yaitu <InlineMath math="-3" /> dan{" "}
                  <InlineMath math="4" />. Membagi <InlineMath math="P(x)" /> dengan{" "}
                  <InlineMath math="(x+3)" /> menghasilkan <InlineMath math="2x^2-10x+8" />, lalu:
                </p>
                <Equation math="P(x)=(x+3)(2x^2-10x+8)=2(x+3)(x-1)(x-4)" />
                <p className="text-sm leading-relaxed text-slate-300">
                  Maka akar-akarnya berurutan adalah <InlineMath math="x_1=-3" />,{" "}
                  <InlineMath math="x_2=1" />, dan <InlineMath math="x_3=4" />. Jadi,{" "}
                  <InlineMath math="x_1+4x_2+x_3=-3+4(1)+4=5" />. Jawaban yang tepat:{" "}
                  <strong className="text-emerald-200">C</strong>!
                </p>
              </div>
            </article>
          </section>

          <section id="koefisien-tak-diketahui">
            <SectionHeading
              index="4"
              title="Menemukan koefisien yang belum diketahui"
              description="Teorema Faktor dapat memberi persamaan untuk koefisien. Jika ditambah informasi sisa pembagian, kita memperoleh persamaan kedua—dan misterinya terpecahkan!"
            />
            <div className="space-y-4">
              <Example number={21} title="Tentukan a dan b, lalu faktorkan polinomial">
                <p className="text-sm leading-relaxed text-slate-300">
                  Diketahui <InlineMath math="P(x)=2x^3+ax^2-2ax+b" />. Salah satu faktornya adalah{" "}
                  <InlineMath math="(x-1)" />. Jika polinomial dibagi dengan <InlineMath math="(x+2)" />, sisanya{" "}
                  <InlineMath math="-144" />. Hitung <InlineMath math="a" /> dan <InlineMath math="b" />, lalu
                  tentukan faktor-faktor lainnya.
                </p>
                <p className="font-display text-sm font-bold text-orange-200">Jawab, kita bentuk dua persamaan!</p>
                <p className="text-sm leading-relaxed text-slate-300">
                  Karena <InlineMath math="x-1" /> faktor, Teorema Faktor memberi{" "}
                  <InlineMath math="P(1)=0" />. Sementara itu, sisa pembagian oleh{" "}
                  <InlineMath math="x+2" /> adalah <InlineMath math="P(-2)" />:
                </p>
                <Equation math="\begin{aligned}P(1)&=2+a-2a+b=0 &\Longrightarrow&\quad b=a-2 \quad (1)\\P(-2)&=2(-2)^3+a(-2)^2-2a(-2)+b=-144 &\Longrightarrow&\quad 8a+b=-128 \quad (2)\end{aligned}" />
                <p className="text-sm leading-relaxed text-slate-300">
                  Substitusikan <InlineMath math="b=a-2" /> dari (1) ke (2):{" "}
                  <InlineMath math="8a+(a-2)=-128" />, sehingga <InlineMath math="a=-14" /> dan{" "}
                  <InlineMath math="b=-16" />. Polinomialnya sekarang menjadi:
                </p>
                <HornerDiagram
                  value={1}
                  coefficients={[2, -14, 28, -16]}
                  label="P(1), koefisien 2, −14, 28, −16"
                  description="Sisa nol. Koefisien hasil baginya dua, minus dua belas, dan enam belas."
                />
                <p className="text-sm leading-relaxed text-slate-300">
                  Hasil bagi adalah <InlineMath math="2x^2-12x+16=2(x-2)(x-4)" />. Jadi:
                </p>
                <Equation math="P(x)=2x^3-14x^2+28x-16=2(x-1)(x-2)(x-4)" />
                <p className="text-sm leading-relaxed text-emerald-100">
                  Mantap! Faktor-faktor linearnya adalah <InlineMath math="x-1" />,{" "}
                  <InlineMath math="x-2" />, dan <InlineMath math="x-4" />, dengan faktor konstanta{" "}
                  <InlineMath math="2" />.
                </p>
              </Example>
            </div>
          </section>

          <section id="faktor-rasional-polinomial">
            <SectionHeading
              index="5"
              title="Memfaktorkan polinomial berderajat empat"
              description="Untuk polinomial berderajat empat, kita bisa menguji akar rasional satu per satu. Setiap kali mendapat sisa nol, satu faktor linear berhasil ditemukan!"
            />
            <div className="space-y-4">
              <Example number={22} title="Carilah faktor-faktor rasional">
                <p className="text-sm leading-relaxed text-slate-300">
                  Carilah faktor-faktor rasional dari{" "}
                  <InlineMath math="x^4+x^3-3x^2-17x-30" />.
                </p>
                <p className="font-display text-sm font-bold text-orange-200">Jawab, kita mulai dari calon akar!</p>
                <p className="text-sm leading-relaxed text-slate-300">
                  Karena koefisien pangkat tertinggi adalah <InlineMath math="1" />, calon akar bulat membagi{" "}
                  <InlineMath math="30" />. Kita coba <InlineMath math="3" />; hasil Horner berakhir dengan{" "}
                  <InlineMath math="0" />, jadi <InlineMath math="x-3" /> adalah faktor:
                </p>
                <HornerDiagram
                  value={3}
                  coefficients={[1, 1, -3, -17, -30]}
                  label="P(3), koefisien 1, 1, −3, −17, −30"
                  description="Sisa nol; hasil bagi kubiknya adalah x pangkat tiga ditambah empat x kuadrat ditambah sembilan x ditambah sepuluh."
                />
                <p className="text-sm leading-relaxed text-slate-300">
                  Hasil baginya <InlineMath math="x^3+4x^2+9x+10" />. Sekarang kita uji{" "}
                  <InlineMath math="-2" /> pada hasil bagi itu:
                </p>
                <HornerDiagram
                  value={-2}
                  coefficients={[1, 4, 9, 10]}
                  label="hasil bagi, diuji pada x = −2"
                  description="Sisa pembagian nol, sehingga x ditambah dua menjadi faktor berikutnya."
                />
                <p className="text-sm leading-relaxed text-slate-300">
                  Sisa kembali nol dan hasil baginya <InlineMath math="x^2+2x+5" />. Maka:
                </p>
                <Equation math="x^4+x^3-3x^2-17x-30=(x-3)(x+2)(x^2+2x+5)" />
                <Note title="Pemeriksaan terakhir:" tone="amber">
                  Diskriminan <InlineMath math="x^2+2x+5=0" /> ialah{" "}
                  <InlineMath math="D=2^2-4(1)(5)=-16" />. Karena negatif, persamaan kuadrat ini tidak mempunyai
                  akar real. Jadi, faktorisasi di atas sudah selesai untuk faktor rasionalnya.
                </Note>
              </Example>
            </div>
          </section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-8 rounded-3xl border border-white/10 bg-[#101b2d]/85 p-4 backdrop-blur">
            <p className="mb-3 flex items-center gap-2 font-body text-xs font-black uppercase tracking-[.17em] text-orange-100">
              <Target className="h-4 w-4" aria-hidden="true" /> Peta belajar
            </p>
            <nav aria-label="Navigasi materi teorema faktor" className="space-y-1">
              {[
                ["makna-teorema-faktor", "Bunyi teorema faktor"],
                ["faktor-rasional", "Calon faktor rasional"],
                ["banyak-faktor-dan-diskriminan", "Faktor dan diskriminan"],
                ["soal-pendalaman", "Soal pendalaman"],
                ["koefisien-tak-diketahui", "Koefisien tak diketahui"],
                ["faktor-rasional-polinomial", "Faktorisasi derajat empat"],
              ].map(([id, label], index) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 font-body text-xs text-slate-300 transition hover:bg-orange-200/[.08] hover:text-orange-100"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-white/[.06] text-[10px] font-bold text-orange-100/80">
                    {index + 1}
                  </span>
                  {label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex items-start gap-2 rounded-2xl border border-emerald-200/15 bg-emerald-200/[.05] p-3 text-xs leading-relaxed text-emerald-50">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" aria-hidden="true" />
              Cek sisa sama dengan nol, lalu tuliskan faktor linearnya. Kamu bisa!
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
);

export default SmaPolinomialTeoremaFaktorPage;
