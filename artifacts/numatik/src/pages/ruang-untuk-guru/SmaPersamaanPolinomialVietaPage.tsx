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
  valueLabel,
  coefficients,
  label,
  description,
}: {
  value: number;
  valueLabel?: string;
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
  const shownValue = valueLabel ?? (value < 0 ? `−${Math.abs(value)}` : `${value}`);
  const id = `${label}-${shownValue}`.toLowerCase().replace(/[^a-z0-9-]/g, "-");
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
            {shownValue}
          </text>
          <text x="13" y="98" fill="#c4b5fd" fontSize="11" fontWeight="700">
            × {shownValue}
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

function PolynomialGraph() {
  const xMin = -3.4;
  const xMax = 4;
  const yMin = -32;
  const yMax = 24;
  const left = 62;
  const right = 610;
  const top = 34;
  const bottom = 330;
  const f = (x: number) => (x + 2) * (x - 1) * (x - 3);
  const mapX = (x: number) => left + ((x - xMin) / (xMax - xMin)) * (right - left);
  const mapY = (y: number) => bottom - ((y - yMin) / (yMax - yMin)) * (bottom - top);
  const samples = Array.from({ length: 221 }, (_, index) => xMin + ((xMax - xMin) * index) / 220);
  const curve = samples
    .map((x, index) => `${index === 0 ? "M" : "L"} ${mapX(x).toFixed(2)} ${mapY(f(x)).toFixed(2)}`)
    .join(" ");
  const xTicks = [-3, -2, -1, 0, 1, 2, 3, 4];
  const yTicks = [-30, -20, -10, 0, 10, 20];
  const yAxisX = mapX(0);
  const xAxisY = mapY(0);

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/85 p-2 sm:p-3">
      <svg
        viewBox="0 0 660 380"
        className="h-auto min-w-[520px] text-slate-100"
        role="img"
        aria-labelledby="vieta-graph-title vieta-graph-desc"
      >
        <title id="vieta-graph-title">Grafik y sama dengan x tambah dua, kali x kurang satu, kali x kurang tiga</title>
        <desc id="vieta-graph-desc">
          Kurva kubik memotong sumbu x pada minus dua, satu, dan tiga, serta memotong sumbu y pada enam.
        </desc>
        {yTicks.filter((tick) => tick !== 0).map((tick) => (
          <g key={`graph-y-${tick}`}>
            <line x1={left} y1={mapY(tick)} x2={right} y2={mapY(tick)} stroke="#334155" strokeWidth="1" />
            <text x={left - 12} y={mapY(tick) + 4} fill="#94a3b8" fontSize="11" textAnchor="end">
              {tick}
            </text>
          </g>
        ))}
        {xTicks.filter((tick) => tick !== 0).map((tick) => (
          <g key={`graph-x-${tick}`}>
            <line x1={mapX(tick)} y1={top} x2={mapX(tick)} y2={bottom} stroke="#263449" strokeWidth="1" />
            <text x={mapX(tick)} y={xAxisY + 20} fill="#94a3b8" fontSize="11" textAnchor="middle">
              {tick}
            </text>
          </g>
        ))}
        <line x1={left} y1={xAxisY} x2={right} y2={xAxisY} stroke="#cbd5e1" strokeWidth="1.6" />
        <line x1={yAxisX} y1={top} x2={yAxisX} y2={bottom} stroke="#cbd5e1" strokeWidth="1.6" />
        <path d={curve} fill="none" stroke="#fb923c" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x={right - 4} y={xAxisY - 8} fill="#e2e8f0" fontSize="12" fontWeight="700" textAnchor="end">x</text>
        <text x={yAxisX + 10} y={top + 12} fill="#e2e8f0" fontSize="12" fontWeight="700">y</text>
        {[-2, 1, 3].map((root) => (
          <g key={`root-${root}`}>
            <circle cx={mapX(root)} cy={xAxisY} r="5" fill="#fcd34d" stroke="#071326" strokeWidth="2" />
            <text x={mapX(root)} y={xAxisY - 12} fill="#fde68a" fontSize="11" fontWeight="700" textAnchor="middle">
              ({root}, 0)
            </text>
          </g>
        ))}
        <circle cx={mapX(0)} cy={mapY(6)} r="5" fill="#67e8f9" stroke="#071326" strokeWidth="2" />
        <text x={mapX(0) + 9} y={mapY(6) - 9} fill="#a5f3fc" fontSize="11" fontWeight="700">(0, 6)</text>
      </svg>
    </div>
  );
}

const SmaPersamaanPolinomialVietaPage = () => (
  <div className="animation-submaterial-route relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
    <Starfield />
    <PageNavigation prevPath={MENU_PATH} />

    <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
      <header className="relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.96),rgba(16,22,43,.95)_60%,rgba(26,65,73,.78))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10">
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
            <p className="font-body text-xs font-bold uppercase tracking-[.24em]">Ayo, temukan akar dan pola koefisiennya!</p>
          </div>
          <h1 className="max-w-4xl font-display text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Persamaan Polinomial <span className="text-cyan-200">dan Teorema Vieta</span>
          </h1>
          <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">
            Kita akan mencari penyelesaian persamaan polinomial, membaca akar dari faktornya, menggambar grafik,
            dan memakai koefisien untuk menemukan jumlah serta hasil kali akar. Yuk, pecahkan satu per satu!
          </p>
          <div className="mt-6 flex items-start gap-2 text-sm text-amber-100">
            <Target className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              Dua bekal penting: gunakan prinsip hasil kali nol untuk menyelesaikan persamaan, lalu gunakan hubungan
              Vieta untuk menghubungkan akar dan koefisien.
            </span>
          </div>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0 space-y-12">
          <section id="menyelesaikan-persamaan-polinomial">
            <SectionHeading
              index="4.6.1"
              title="Menyelesaikan persamaan polinomial"
              description="Persamaan polinomial berderajat tinggi biasanya kita selesaikan dengan memfaktorkan bentuknya, lalu memeriksa setiap faktor."
            />
            <div className="space-y-4">
              <article className="rounded-3xl border border-cyan-200/15 bg-[#101b2d]/80 p-5 sm:p-6">
                <p className="text-sm leading-relaxed text-slate-200">
                  Pada saat menyelesaikan persamaan kuadrat, salah satu cara penyelesaiannya adalah dengan
                  memfaktorkan bentuk tersebut. Prinsip yang digunakan adalah prinsip hasil kali nol:
                </p>
                <div className="my-4">
                  <Equation math="a\cdot b=0\quad\Longrightarrow\quad a=0\ \text{atau}\ b=0" />
                </div>
                <p className="text-sm leading-relaxed text-slate-200">
                  Jika <InlineMath math="a\cdot b=0" />, maka <InlineMath math="a=0" /> atau{" "}
                  <InlineMath math="b=0" />. Prinsip yang sama berlaku untuk persamaan polinomial atau suku banyak.
                  Untuk bentuk umum
                </p>
                <div className="my-4">
                  <Equation math="a_nx^n+a_{n-1}x^{n-1}+a_{n-2}x^{n-2}+\cdots+a_2x^2+a_1x+a_0=0" />
                </div>
                <p className="text-sm leading-relaxed text-slate-200">
                  penyelesaiannya dicari dengan memfaktorkan persamaan. Cara ini penting karena persamaan suku banyak
                  berderajat lebih dari dua umumnya tidak mempunyai rumus khusus sederhana seperti rumus kuadrat.
                  Tenang, dengan faktorisasi dan Teorema Faktor kita tetap bisa menelusuri akarnya!
                </p>
              </article>

              <Example number={23} title="Tentukan himpunan penyelesaian persamaan">
                <p className="text-sm leading-relaxed text-slate-300">
                  Tentukan himpunan penyelesaian dari <InlineMath math="x^3-5x^2+2x+8=0" />.
                </p>
                <p className="font-display text-sm font-bold text-orange-200">Jawab, kita cari akar yang membuat sisa nol!</p>
                <p className="text-sm leading-relaxed text-slate-300">
                  Suku konstanta <InlineMath math="8" /> mempunyai faktor{" "}
                  <InlineMath math="\pm1,\pm2,\pm4,\pm8" />. Kita coba{" "}
                  <InlineMath math="x=-1" /> dengan skema Horner:
                </p>
                <HornerDiagram
                  value={-1}
                  coefficients={[1, -5, 2, 8]}
                  label="P(−1), koefisien 1, −5, 2, 8"
                  description="Sisa pembagian sama dengan nol dan hasil baginya x kuadrat dikurangi enam x ditambah delapan."
                />
                <p className="text-sm leading-relaxed text-slate-300">
                  Sisa nol, jadi <InlineMath math="x+1" /> adalah faktor. Hasil baginya{" "}
                  <InlineMath math="x^2-6x+8=(x-2)(x-4)" />. Maka:
                </p>
                <Equation math="x^3-5x^2+2x+8=(x+1)(x-2)(x-4)=0" />
                <p className="text-sm leading-relaxed text-emerald-100">
                  Prinsip hasil kali nol memberi <InlineMath math="x=-1" />,{" "}
                  <InlineMath math="x=2" />, atau <InlineMath math="x=4" />. Jadi, himpunan penyelesaiannya adalah{" "}
                  <InlineMath math="\{-1,2,4\}" />. Berhasil!
                </p>
              </Example>
            </div>
          </section>

          <section id="akar-rasional-dan-rumus-kuadrat">
            <SectionHeading
              index="2"
              title="Gunakan satu akar untuk menemukan akar lainnya"
              description="Setelah satu akar diketahui, Teorema Faktor memberi faktor linear. Sisa polinomial bisa kita selesaikan dengan rumus kuadrat."
            />
            <div className="space-y-4">
              <Example number={24} title="Tentukan akar-akar persamaan polinomial">
                <p className="text-sm leading-relaxed text-slate-300">
                  Jika <InlineMath math="\frac13" /> merupakan salah satu akar dari{" "}
                  <InlineMath math="3x^3-10x^2-3x+2=0" />, tentukan akar-akar yang lain.
                </p>
                <p className="font-display text-sm font-bold text-orange-200">Jawab, satu akar sudah menjadi petunjuk!</p>
                <p className="text-sm leading-relaxed text-slate-300">
                  Karena <InlineMath math="\frac13" /> adalah akar, <InlineMath math="x-\frac13" /> adalah faktor.
                  Kita gunakan skema Horner dengan <InlineMath math="k=\frac13" />:
                </p>
                <HornerDiagram
                  value={1 / 3}
                  valueLabel="1/3"
                  coefficients={[3, -10, -3, 2]}
                  label="P(1/3), koefisien 3, −10, −3, 2"
                  description="Sisa nol. Hasil bagi adalah tiga x kuadrat dikurangi sembilan x dikurangi enam."
                />
                <p className="text-sm leading-relaxed text-slate-300">
                  Hasil baginya <InlineMath math="3x^2-9x-6=3(x^2-3x-2)" />. Persamaan menjadi:
                </p>
                <Equation math="(3x-1)(x^2-3x-2)=0" />
                <p className="text-sm leading-relaxed text-slate-300">
                  Persamaan kuadrat <InlineMath math="x^2-3x-2=0" /> tidak dapat difaktorkan dengan bilangan bulat,
                  jadi kita gunakan rumus kuadrat:
                </p>
                <Equation math="x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}=\frac{3\pm\sqrt{(-3)^2-4(1)(-2)}}{2}=\frac{3\pm\sqrt{17}}{2}" />
                <p className="text-sm leading-relaxed text-emerald-100">
                  Jadi, ketiga akar persamaan adalah{" "}
                  <InlineMath math="\frac13,\ \frac{3+\sqrt{17}}2,\ \frac{3-\sqrt{17}}2" />. Dua akar terakhir
                  muncul dari rumus kuadrat—pola yang sama selalu bisa kita ikuti.
                </p>
              </Example>
            </div>
          </section>

          <section id="grafik-persamaan-polinomial">
            <SectionHeading
              index="3"
              title="Hubungkan akar dengan grafik"
              description="Akar-akar persamaan f(x)=0 menunjukkan tempat grafik y=f(x) memotong sumbu x. Nilai f(0) memberi titik potong dengan sumbu y."
            />
            <div className="space-y-4">
              <Example number={25} title="Titik potong dan sketsa grafik fungsi">
                <p className="text-sm leading-relaxed text-slate-300">
                  Misalkan <InlineMath math="f(x)=x^3-2x^2-5x+6" />. Carilah titik potong kurva dengan sumbu{" "}
                  <InlineMath math="Y" /> dan sumbu <InlineMath math="X" />, kemudian sketsalah grafiknya.
                </p>
                <p className="font-display text-sm font-bold text-orange-200">Jawab, kita cari titik-titik potongnya dulu!</p>
                <p className="text-sm leading-relaxed text-slate-300">
                  Untuk memotong sumbu <InlineMath math="Y" />, gunakan <InlineMath math="x=0" />. Kita memperoleh{" "}
                  <InlineMath math="f(0)=6" />, sehingga titik potong sumbu <InlineMath math="Y" /> adalah{" "}
                  <InlineMath math="(0,6)" />. Untuk memotong sumbu <InlineMath math="X" />, selesaikan{" "}
                  <InlineMath math="f(x)=0" />:
                </p>
                <Equation math="\begin{aligned}f(x)&=x^3-2x^2-5x+6\\&=(x+2)(x-1)(x-3)\end{aligned}" />
                <p className="text-sm leading-relaxed text-slate-300">
                  Jadi, akar-akarnya <InlineMath math="x=-2,1,3" /> dan titik potong sumbu{" "}
                  <InlineMath math="X" /> ialah <InlineMath math="(-2,0)" />, <InlineMath math="(1,0)" />, dan{" "}
                  <InlineMath math="(3,0)" />. Kurva menembus sumbu <InlineMath math="X" /> di tiap akar karena
                  setiap faktornya berpangkat satu.
                </p>
                <PolynomialGraph />
                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/70 p-3">
                  <table className="w-full min-w-[620px] border-collapse text-center text-xs text-slate-200">
                    <caption className="mb-2 text-left font-body text-xs font-bold text-cyan-100">
                      Tanda <InlineMath math="f(x)" /> pada setiap selang
                    </caption>
                    <tbody>
                      <tr className="border-b border-white/10">
                        <th className="px-2 py-2 text-left font-bold text-cyan-100">x</th>
                        {["(−∞, −2)", "−2", "(−2, 1)", "1", "(1, 3)", "3", "(3, ∞)"].map((interval) => (
                          <td key={interval} className="px-2 py-2">{interval}</td>
                        ))}
                      </tr>
                      <tr>
                        <th className="px-2 py-2 text-left font-bold text-cyan-100">Tanda f(x)</th>
                        {["−", "0", "+", "0", "−", "0", "+"].map((sign, index) => (
                          <td key={`${sign}-${index}`} className={sign === "0" ? "px-2 py-2 text-amber-200" : "px-2 py-2"}>
                            {sign}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Example>
            </div>
          </section>

          <section id="persamaan-pangkat-empat">
            <SectionHeading
              index="4"
              title="Siasati persamaan pangkat empat"
              description="Ada persamaan yang terlihat rumit, tetapi memiliki pola x dan 1/x. Substitusi yang tepat bisa mengubahnya menjadi persamaan kuadrat."
            />
            <div className="space-y-4">
              <Example number={26} title="Temukan akar-akar persamaan pangkat empat">
                <p className="text-sm leading-relaxed text-slate-300">
                  Tentukan akar-akar persamaan <InlineMath math="x^4-3x^3-6x^2+3x+1=0" />.
                </p>
                <p className="font-display text-sm font-bold text-orange-200">
                  Petunjuk: misalkan <InlineMath math="y=x-\frac1x" />.
                </p>
                <p className="text-sm leading-relaxed text-slate-300">
                  Suku konstantanya <InlineMath math="1" />, jadi calon akar rasionalnya hanya{" "}
                  <InlineMath math="\pm1" />. Akan tetapi,{" "}
                  <InlineMath math="P(1)=P(-1)=-4" />, sehingga tidak ada akar rasional yang ditemukan dengan
                  percobaan tersebut. Jangan menyerah—kita gunakan petunjuk substitusi! Karena{" "}
                  <InlineMath math="P(0)=1" />, akar persamaan tidak mungkin nol; membagi persamaan dengan{" "}
                  <InlineMath math="x^2" /> aman dilakukan:
                </p>
                <Equation math="x^2-3x-6+\frac3x+\frac1{x^2}=0" />
                <p className="text-sm leading-relaxed text-slate-300">
                  Kelompokkan suku-sukunya. Untuk <InlineMath math="y=x-\frac1x" />, berlaku{" "}
                  <InlineMath math="y^2=x^2+\frac1{x^2}-2" />, sehingga{" "}
                  <InlineMath math="x^2+\frac1{x^2}=y^2+2" />:
                </p>
                <Equation math="\left(x^2+\frac1{x^2}\right)-3\left(x-\frac1x\right)-6=0\quad\Longrightarrow\quad y^2-3y-4=0" />
                <p className="text-sm leading-relaxed text-slate-300">
                  Faktorkan persamaan dalam <InlineMath math="y" />:
                </p>
                <Equation math="(y-4)(y+1)=0\quad\Longrightarrow\quad y=4\ \text{atau}\ y=-1" />
                <p className="text-sm leading-relaxed text-slate-300">
                  Untuk <InlineMath math="y=4" />, kita selesaikan{" "}
                  <InlineMath math="x-\frac1x=4" />, atau{" "}
                  <InlineMath math="x^2-4x-1=0" />. Untuk <InlineMath math="y=-1" />, kita selesaikan{" "}
                  <InlineMath math="x-\frac1x=-1" />, atau <InlineMath math="x^2+x-1=0" />:
                </p>
                <Equation math="\begin{aligned}y=4&\quad\Longrightarrow\quad x=2\pm\sqrt5\\y=-1&\quad\Longrightarrow\quad x=\frac{-1\pm\sqrt5}{2}\end{aligned}" />
                <p className="text-sm leading-relaxed text-emerald-100">
                  Jadi, himpunan penyelesaiannya adalah{" "}
                  <InlineMath math="\left\{2+\sqrt5,\ 2-\sqrt5,\ \frac{-1+\sqrt5}{2},\ \frac{-1-\sqrt5}{2}\right\}" />.
                  Kerja bagus—persamaan derajat empat tadi berubah menjadi dua persamaan kuadrat!
                </p>
              </Example>
            </div>
          </section>

          <section id="hubungan-akar-dan-koefisien">
            <SectionHeading
              index="4.6.2"
              title="Hubungan akar-akar dengan koefisien"
              description="Teorema Vieta menuliskan jumlah dan hasil kali akar langsung dari koefisien. Kita tidak selalu perlu mencari nilai setiap akar satu per satu."
            />
            <div className="space-y-4">
              <article className="rounded-3xl border border-cyan-200/15 bg-[#101b2d]/80 p-5 sm:p-6">
                <h3 className="font-display text-lg font-extrabold text-cyan-100">Mulai dari persamaan kuadrat</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Jika akar-akar dari <InlineMath math="ax^2+bx+c=0" /> adalah{" "}
                  <InlineMath math="x_1" /> dan <InlineMath math="x_2" />, kita bagi persamaan dengan{" "}
                  <InlineMath math="a" /> lalu membandingkannya dengan hasil perkalian faktor:
                </p>
                <Equation math="x^2+\frac ba x+\frac ca=0=(x-x_1)(x-x_2)=x^2-(x_1+x_2)x+x_1x_2" />
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.04] p-4">
                    <p className="mb-1 font-bold text-cyan-100">Jumlah akar-akar</p>
                    <Equation math="x_1+x_2=-\frac ba" />
                  </div>
                  <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.04] p-4">
                    <p className="mb-1 font-bold text-cyan-100">Hasil kali akar-akar</p>
                    <Equation math="x_1x_2=\frac ca" />
                  </div>
                </div>
              </article>

              <article className="overflow-hidden rounded-3xl border border-orange-200/20 bg-[linear-gradient(140deg,rgba(106,45,35,.16),rgba(14,25,42,.92)_48%)]">
                <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-300/15 text-orange-200">
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-base font-bold text-white sm:text-lg">
                    Bandingkan akar dan koefisien pada dua persamaan kubik
                  </h3>
                </div>
                <div className="space-y-4 p-4 sm:p-5">
                  <p className="text-sm leading-relaxed text-slate-300">
                    Diberikan persamaan <InlineMath math="x^3+10x^2+29x+20=0" /> dengan akar-akar{" "}
                    <InlineMath math="x_1=-1" />, <InlineMath math="x_2=-4" />, dan{" "}
                    <InlineMath math="x_3=-5" />. Mari kita bandingkan akar-akarnya dengan koefisien:
                  </p>
                  <ol className="space-y-3 text-sm leading-relaxed text-slate-300">
                    <li className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                      <strong className="text-cyan-100">(i) Jumlah akar:</strong>
                      <div className="mt-2"><Equation math="x_1+x_2+x_3=(-1)+(-4)+(-5)=-10" /></div>
                    </li>
                    <li className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                      <strong className="text-violet-100">(ii) Jumlah hasil kali setiap dua akar:</strong>
                      <div className="mt-2"><Equation math="x_1x_2+x_1x_3+x_2x_3=4+5+20=29" /></div>
                    </li>
                    <li className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                      <strong className="text-amber-100">(iii) Hasil kali ketiga akar:</strong>
                      <div className="mt-2"><Equation math="x_1x_2x_3=(-1)(-4)(-5)=-20" /></div>
                    </li>
                  </ol>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Sekarang perhatikan <InlineMath math="x^3-2x^2-19x+20=0" /> yang berakar{" "}
                    <InlineMath math="1,-4,5" />:
                  </p>
                  <Equation math="\begin{aligned}x_1+x_2+x_3&=1+(-4)+5=2\\x_1x_2+x_1x_3+x_2x_3&=-4+5-20=-19\\x_1x_2x_3&=(1)(-4)(5)=-20\end{aligned}" />
                  <p className="text-sm leading-relaxed text-emerald-100">
                    Koefisien memberi hasil yang sama: untuk <InlineMath math="x^3+p_1x^2+p_2x+p_3=0" />, jumlah
                    akar adalah <InlineMath math="-p_1" />, jumlah hasil kali berpasangan adalah{" "}
                    <InlineMath math="p_2" />, dan hasil kali semua akar adalah <InlineMath math="-p_3" />.
                  </p>
                </div>
              </article>

              <article className="rounded-3xl border border-emerald-200/15 bg-[linear-gradient(145deg,rgba(6,78,59,.13),rgba(14,25,42,.9))] p-5 sm:p-6">
                <h3 className="font-display text-lg font-extrabold text-emerald-100">Mengapa hubungan Vieta berlaku?</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Misalkan akar-akar persamaan kubik <InlineMath math="x^3+p_1x^2+p_2x+p_3=0" /> adalah{" "}
                  <InlineMath math="x_1,x_2,x_3" />. Bentuk faktor dan hasil perkaliannya:
                </p>
                <Equation math="\begin{aligned}x^3+p_1x^2+p_2x+p_3&=(x-x_1)(x-x_2)(x-x_3)\\&=x^3-(x_1+x_2+x_3)x^2+(x_1x_2+x_1x_3+x_2x_3)x-x_1x_2x_3\end{aligned}" />
                <p className="mt-3 text-sm leading-relaxed text-slate-300">Maka, dengan membandingkan koefisien yang bersesuaian:</p>
                <div className="mt-3 space-y-3">
                  <Equation math="\begin{aligned}x_1+x_2+x_3&=-p_1\\x_1x_2+x_1x_3+x_2x_3&=p_2\\x_1x_2x_3&=-p_3\end{aligned}" />
                  <p className="text-sm leading-relaxed text-slate-300">
                    Tanda pada hasil kali terakhir berubah karena sukunya adalah{" "}
                    <InlineMath math="-x_1x_2x_3" />. Perhatikan tanda-tandanya baik-baik, ya!
                  </p>
                </div>
              </article>

              <article className="rounded-3xl border border-violet-200/15 bg-violet-200/[.035] p-5 sm:p-6">
                <h3 className="font-display text-lg font-extrabold text-violet-100">Pola yang sama untuk derajat n</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Untuk persamaan umum <InlineMath math="a_0x^n+a_1x^{n-1}+\cdots+a_{n-1}x+a_n=0" />, bagi
                  dahulu dengan <InlineMath math="a_0" /> agar polinomialnya monik. Jika koefisien setelah dibagi
                  berturut-turut ditulis <InlineMath math="p_1,p_2,\ldots,p_n" />, dan akar-akarnya{" "}
                  <InlineMath math="x_1,x_2,\ldots,x_n" />, hubungan jumlah hasil kali akar adalah:
                </p>
                <div className="my-4">
                  <Equation math="\begin{aligned}x_1+x_2+\cdots+x_n&=(-1)^1p_1=-p_1\\\sum_{i<j}x_ix_j&=(-1)^2p_2=p_2\\\sum_{i<j<k}x_ix_jx_k&=(-1)^3p_3=-p_3\\&\ \vdots\\x_1x_2\cdots x_n&=(-1)^np_n\end{aligned}" />
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  Jadi, tanda berganti-ganti saat kita bergerak dari jumlah satu akar, jumlah hasil kali dua akar,
                  jumlah hasil kali tiga akar, dan seterusnya.
                </p>
                <Note title="Catatan untuk semua akar:" tone="amber">
                  Hasil kali semua akar persamaan polinomial monik berderajat <InlineMath math="n" /> adalah{" "}
                  <InlineMath math="(-1)^np_n" />.
                </Note>
              </article>

              <article className="rounded-3xl border border-orange-200/15 bg-orange-200/[.035] p-5 sm:p-6">
                <h3 className="font-display text-lg font-extrabold text-orange-100">Khusus polinomial derajat empat</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Untuk <InlineMath math="x^4+p_1x^3+p_2x^2+p_3x+p_4=0" /> yang memiliki akar{" "}
                  <InlineMath math="x_1,x_2,x_3,x_4" />, bentuk hubungan akarnya adalah:
                </p>
                <div className="my-4 space-y-3">
                  <Equation math="\begin{aligned}x_1+x_2+x_3+x_4&=-p_1\\x_1x_2+x_1x_3+x_1x_4+x_2x_3+x_2x_4+x_3x_4&=p_2\\x_1x_2x_3+x_1x_2x_4+x_1x_3x_4+x_2x_3x_4&=-p_3\\x_1x_2x_3x_4&=p_4\end{aligned}" />
                  <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
                    <li>• Jumlah akar-akarnya adalah <InlineMath math="-p_1" />.</li>
                    <li>• Jumlah hasil kali setiap dua akar adalah <InlineMath math="p_2" />.</li>
                    <li>• Jumlah hasil kali setiap tiga akar adalah <InlineMath math="-p_3" />.</li>
                    <li>• Hasil kali keempat akar adalah <InlineMath math="p_4" />.</li>
                  </ul>
                </div>
              </article>
            </div>
          </section>

          <section id="penerapan-teorema-vieta">
            <SectionHeading
              index="5"
              title="Penerapan Teorema Vieta"
              description="Kita dapat menggunakan hubungan akar dan koefisien untuk mencari parameter yang belum diketahui, bahkan tanpa menyelesaikan seluruh persamaan."
            />
            <div className="space-y-4">
              <Example number={27} title="Tentukan m dari sifat akar-akarnya">
                <p className="text-sm leading-relaxed text-slate-300">
                  Diketahui persamaan <InlineMath math="x^3-12x+m=0" />. Tentukan nilai{" "}
                  <InlineMath math="m" /> jika:
                </p>
                <ol className="list-inside list-[lower-alpha] space-y-1 text-sm text-slate-300">
                  <li>dua akarnya kembar;</li>
                  <li>dua akarnya berlawanan.</li>
                </ol>
                <p className="font-display text-sm font-bold text-orange-200">Jawab, kita pakai hubungan Vieta!</p>
                <p className="text-sm leading-relaxed text-slate-300">
                  Misalkan akar-akar persamaan adalah <InlineMath math="x_1,x_2,x_3" />. Pada persamaan{" "}
                  <InlineMath math="x^3+0x^2-12x+m=0" />, koefisiennya memberi:
                </p>
                <Equation math="\begin{aligned}x_1+x_2+x_3&=0\\x_1x_2+x_1x_3+x_2x_3&=-12\\x_1x_2x_3&=-m\end{aligned}" />

                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.035] p-4 sm:p-5">
                  <h4 className="font-display font-bold text-cyan-100">a. Dua akar kembar</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Misalkan <InlineMath math="x_1=x_2=r" />. Karena jumlah ketiga akar nol,{" "}
                    <InlineMath math="x_3=-2r" />. Gunakan jumlah hasil kali dua akar:
                  </p>
                  <Equation math="\begin{aligned}r^2+r(-2r)+r(-2r)&=-12\\-3r^2&=-12\\r&=2\ \text{atau}\ r=-2\end{aligned}" />
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Jika <InlineMath math="r=2" />, akar ketiganya <InlineMath math="-4" /> dan hasil kalinya{" "}
                    <InlineMath math="(2)(2)(-4)=-16=-m" />, sehingga <InlineMath math="m=16" />. Jika{" "}
                    <InlineMath math="r=-2" />, akar ketiganya <InlineMath math="4" /> dan hasil kalinya{" "}
                    <InlineMath math="(-2)(-2)(4)=16=-m" />, sehingga <InlineMath math="m=-16" />.
                  </p>
                  <Equation math="m=16:\ (x-2)^2(x+4)=0\qquad m=-16:\ (x+2)^2(x-4)=0" />
                </div>

                <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.035] p-4 sm:p-5">
                  <h4 className="font-display font-bold text-violet-100">b. Dua akar berlawanan</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Misalkan dua akar itu <InlineMath math="r" /> dan <InlineMath math="-r" />. Karena jumlah semua
                    akar nol, akar ketiganya adalah <InlineMath math="0" />. Hasil kali ketiga akar pun nol:
                  </p>
                  <Equation math="x_1x_2x_3=0=-m\quad\Longrightarrow\quad m=0" />
                  <p className="mt-2 text-sm leading-relaxed text-emerald-100">
                    Pemeriksaan: untuk <InlineMath math="m=0" />,{" "}
                    <InlineMath math="x^3-12x=x(x^2-12)=0" /> memiliki akar{" "}
                    <InlineMath math="0,2\sqrt3,-2\sqrt3" />. Dua akar terakhir memang saling berlawanan.
                  </p>
                </div>
              </Example>
            </div>
          </section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-8 rounded-3xl border border-white/10 bg-[#101b2d]/85 p-4 backdrop-blur">
            <p className="mb-3 flex items-center gap-2 font-body text-xs font-black uppercase tracking-[.17em] text-cyan-100">
              <Target className="h-4 w-4" aria-hidden="true" /> Peta belajar
            </p>
            <nav aria-label="Navigasi persamaan polinomial dan teorema Vieta" className="space-y-1">
              {[
                ["menyelesaikan-persamaan-polinomial", "Prinsip hasil kali nol"],
                ["akar-rasional-dan-rumus-kuadrat", "Akar rasional & kuadrat"],
                ["grafik-persamaan-polinomial", "Akar dan grafik"],
                ["persamaan-pangkat-empat", "Persamaan pangkat empat"],
                ["hubungan-akar-dan-koefisien", "Hubungan akar-koefisien"],
                ["penerapan-teorema-vieta", "Penerapan Teorema Vieta"],
              ].map(([id, label], index) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 font-body text-xs text-slate-300 transition hover:bg-cyan-200/[.08] hover:text-cyan-100"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-white/[.06] text-[10px] font-bold text-cyan-100/80">
                    {index + 1}
                  </span>
                  {label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-200/15 bg-amber-200/[.05] p-3 text-xs leading-relaxed text-amber-50">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-200" aria-hidden="true" />
              Akar memberi informasi tentang koefisien—dan koefisien menyimpan petunjuk tentang akar!
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
);

export default SmaPersamaanPolinomialVietaPage;
