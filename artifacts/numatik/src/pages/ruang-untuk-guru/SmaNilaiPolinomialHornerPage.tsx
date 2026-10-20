import type { ReactNode } from "react";
import { BookOpen, Check, Lightbulb, Sparkles, Target } from "lucide-react";
import { BlockMath, InlineMath as KatexInlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import PageNavigation from "@/components/PageNavigation";
import Starfield from "@/components/Starfield";

const InlineMath = ({ math }: { math: string }) => <KatexInlineMath math={math} />;

const MENU_PATH = "/ruang-untuk-guru/sma/buku-animasi/polinomial";

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
            Contoh {number} · angka diubah
          </p>
          <h3 className="font-display text-base font-bold text-white sm:text-lg">{title}</h3>
        </div>
      </div>
      <div className="space-y-4 p-4 sm:p-5">{children}</div>
    </article>
  );
}

function HornerTable({
  value,
  coefficients,
  polynomial,
}: {
  value: number;
  coefficients: number[];
  polynomial: string;
}) {
  const results = [coefficients[0]];
  for (let index = 1; index < coefficients.length; index += 1) {
    results.push(coefficients[index] + value * results[index - 1]);
  }
  const products = results.slice(0, -1).map((result) => result * value);
  const degrees = coefficients.map((_, index) => coefficients.length - index - 1);
  const format = (number: number) => (number < 0 ? `−${Math.abs(number)}` : `${number}`);

  return (
    <div>
      <p className="mb-2 font-body text-xs font-bold uppercase tracking-[.16em] text-cyan-100/80">
        Skema Horner untuk <InlineMath math={`${polynomial}(${value})`} />
      </p>
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[530px] border-collapse text-center font-body text-sm">
          <caption className="sr-only">
            Skema Horner dengan nilai pengganti {value} dan koefisien {coefficients.join(", ")}
          </caption>
          <thead>
            <tr className="bg-white/[.06] text-slate-300">
              <th className="px-3 py-2 text-left font-semibold">Langkah</th>
              {degrees.map((degree) => (
                <th key={degree} className="px-3 py-2 font-semibold">
                  {degree === 0 ? "konstanta" : `x${degree === 1 ? "" : `^${degree}`}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[.08] text-slate-100">
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-amber-100">Koefisien</th>
              {coefficients.map((coefficient, index) => (
                <td key={`${index}-${coefficient}`} className="px-3 py-2">
                  {format(coefficient)}
                </td>
              ))}
            </tr>
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-violet-100">
                × {format(value)}, lalu jumlahkan
              </th>
              {coefficients.map((_, index) => (
                <td key={index} className="px-3 py-2 text-violet-100">
                  {index === 0 ? "—" : format(products[index - 1])}
                </td>
              ))}
            </tr>
            <tr className="bg-emerald-200/[.06]">
              <th className="px-3 py-2 text-left font-semibold text-emerald-100">Hasil</th>
              {results.map((result, index) => (
                <td
                  key={index}
                  className={`px-3 py-2 font-bold ${index === results.length - 1 ? "text-emerald-200" : ""}`}
                >
                  {format(result)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">
        Mulai dari koefisien paling kiri: kalikan hasil sebelumnya dengan {format(value)}, lalu
        tambahkan koefisien berikutnya. Angka terakhir adalah nilai polinomialnya.
      </p>
    </div>
  );
}

const SmaNilaiPolinomialHornerPage = () => (
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
              Siap menghitung kilat bersama Horner?
            </p>
          </div>
          <h1 className="max-w-4xl font-display text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Nilai Polinomial <span className="text-cyan-200">dan Metode Horner</span>
          </h1>
          <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">
            Yuk, cari nilai polinomial dengan substitusi, lalu kenalan dengan skema Horner yang
            merapikan hitungan pangkat menjadi langkah kali-tambah yang seru dan sistematis.
            Koefisiennya kita jaga tetap lengkap—tak ada suku yang boleh menyelinap pergi!
          </p>
          <div className="mt-6 flex items-start gap-2 text-sm text-amber-100">
            <Target className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              Target belajar: menghitung <InlineMath math="P(k)" />, memakai skema Horner untuk
              nilai positif maupun negatif, dan menuliskan koefisien nol saat ada pangkat yang
              hilang.
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-12">
        <section id="nilai-polinomial">
          <SectionHeading
            index="4.2"
            title="Nilai polinomial"
            description="Nilai suatu polinomial diperoleh dengan mengganti variabelnya memakai bilangan yang ditentukan, kemudian menghitung hasilnya. Kita juga dapat mengecek apakah dua bentuk aljabar yang berbeda benar-benar menyatakan polinomial yang sama."
          />
          <div className="space-y-4">
            <Equation
              math="P(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0\quad\Longrightarrow\quad P(k)=a_nk^n+a_{n-1}k^{n-1}+\cdots+a_1k+a_0"
              label="Mengganti setiap x dengan k"
            />
            <article className="overflow-hidden rounded-3xl border border-orange-200/20 bg-[linear-gradient(140deg,rgba(106,45,35,.16),rgba(14,25,42,.92)_48%)]">
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-300/15 text-orange-200">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">
                    Yuk, cek kesamaan aljabar!
                  </p>
                  <h3 className="font-display text-base font-bold text-white sm:text-lg">
                    Memeriksa dua bentuk polinomial
                  </h3>
                </div>
              </div>
              <div className="space-y-4 p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-slate-300">
                  Misalkan <InlineMath math="P(x)=2x^3-3x^2-2x+2" /> dan{" "}
                  <InlineMath math="Q(x)=(x-2)(2x^2+x)+2" />. Ayo tunjukkan bahwa kedua bentuk ini
                  sama, lalu cek nilainya pada dua bilangan!
                </p>
                <Equation
                  math="\begin{aligned}Q(x)&=(x-2)(2x^2+x)+2\\&=2x^3-3x^2-2x+2\\&=P(x)\end{aligned}"
                  label="Uraikan Q(x)"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-[#071326]/70 p-4">
                    <p className="mb-2 font-display font-bold text-cyan-100">
                      Saat <InlineMath math="x=3" />
                    </p>
                    <Equation
                      math="\begin{aligned}P(3)&=2(3)^3-3(3)^2-2(3)+2=23\\Q(3)&=(3-2)(2(3)^2+3)+2=23\end{aligned}"
                    />
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#071326]/70 p-4">
                    <p className="mb-2 font-display font-bold text-violet-100">
                      Saat <InlineMath math="x=-1" />
                    </p>
                    <Equation
                      math="\begin{aligned}P(-1)&=2(-1)^3-3(-1)^2-2(-1)+2=-1\\Q(-1)&=(-1-2)(2(-1)^2-1)+2=-1\end{aligned}"
                    />
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-emerald-100">
                  <Check className="mr-2 inline h-4 w-4" aria-hidden="true" />
                  Hasil substitusinya cocok: <InlineMath math="P(3)=Q(3)=23" /> dan{" "}
                  <InlineMath math="P(-1)=Q(-1)=-1" />. Penguraian aljabar di atas memastikan kedua
                  polinomial memang identik.
                </p>
              </div>
            </article>
            <Note title="Satu hal penting sebelum menghitung:" tone="amber">
              Menguji nilai pada beberapa bilangan membantu memeriksa hitungan, tetapi untuk
              memastikan dua polinomial identik kita tetap perlu menunjukkan kesamaan bentuk
              aljabarnya. Kalau ada nilai <InlineMath math="x" /> yang negatif, tulis dalam tanda
              kurung saat disubstitusikan, ya!
            </Note>
          </div>
        </section>

        <section id="metode-horner">
          <SectionHeading
            index="4.2.1"
            title="Metode Horner: hitung dengan pola kali-tambah"
            description="Metode Horner menyusun koefisien polinomial menurut pangkat tertinggi sampai konstanta. Kita turunkan hasilnya tahap demi tahap—lebih ringkas daripada menghitung setiap pangkat secara terpisah."
          />
          <div className="space-y-4">
            <Equation
              math="P(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0"
              label="Susun pangkat dari tertinggi ke terendah"
            />
            <div className="grid gap-3 md:grid-cols-2">
              <article className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.045] p-4">
                <h3 className="mb-2 font-display text-lg font-extrabold text-cyan-100">
                  Urutan langkahnya
                </h3>
                <ol className="list-inside list-decimal space-y-2 font-body text-sm leading-relaxed text-slate-300 marker:font-bold marker:text-cyan-200">
                  <li>Tulis semua koefisien, mulai dari pangkat tertinggi hingga konstanta.</li>
                  <li>Letakkan bilangan pengganti <InlineMath math="k" /> di sisi kiri.</li>
                  <li>Turunkan koefisien pertama apa adanya.</li>
                  <li>Kalikan hasil terakhir dengan <InlineMath math="k" />, lalu jumlahkan dengan koefisien berikutnya.</li>
                  <li>Ulangi pola kali-tambah sampai koefisien terakhir.</li>
                </ol>
              </article>
              <article className="rounded-2xl border border-violet-200/15 bg-violet-200/[.045] p-4">
                <h3 className="mb-2 font-display text-lg font-extrabold text-violet-100">
                  Hasil terakhir adalah jawabannya
                </h3>
                <p className="font-body text-sm leading-relaxed text-slate-300">
                  Jika nilai yang dimasukkan adalah <InlineMath math="x=k" />, angka terakhir
                  pada baris hasil Horner langsung menjadi <InlineMath math="P(k)" />. Tanda{" "}
                  <InlineMath math="k" /> ikut digunakan saat mengalikan—jadi nilai negatif tetap
                  dikalikan sebagai bilangan negatif.
                </p>
                <div className="mt-3 rounded-xl border border-violet-200/10 bg-[#071326]/70 p-3 text-sm text-violet-100">
                  Bawa turun → kalikan dengan <InlineMath math="k" /> → jumlahkan koefisien
                  berikutnya → ulangi!
                </div>
              </article>
            </div>
            <Note title="Pangkat yang tidak terlihat tetap punya koefisien:" tone="amber">
              Jika suku untuk suatu pangkat tidak muncul, sisipkan koefisien{" "}
              <InlineMath math="0" /> di posisi yang tepat. Dengan begitu urutan koefisien tetap
              rapi dan semua pangkat terwakili.
            </Note>
          </div>
        </section>

        <section id="contoh-horner" className="space-y-5">
          <SectionHeading
            index="5–8"
            title="Ayo berlatih dengan skema Horner!"
            description="Empat contoh berikut memperlihatkan pola yang sama untuk pangkat tinggi, nilai pengganti negatif, serta suku yang koefisiennya nol. Ikuti setiap barisnya—kita pasti bisa!"
          />

          <Example number={5} title="Nilai polinomial saat x positif">
            <p className="text-sm leading-relaxed text-slate-300">
              Hitunglah <InlineMath math="P(4)" /> jika{" "}
              <InlineMath math="P(x)=3x^3-2x^2+5x-1" />.
            </p>
            <Equation
              math="P(4)=3(4)^3-2(4)^2+5(4)-1"
              label="Koefisien: 3, −2, 5, −1"
            />
            <HornerTable value={4} coefficients={[3, -2, 5, -1]} polynomial="P" />
            <p className="text-sm leading-relaxed text-slate-300">
              Langkahnya: turunkan <InlineMath math="3" />, lalu{" "}
              <InlineMath math="3\cdot4-2=10" />, lanjutkan{" "}
              <InlineMath math="10\cdot4+5=45" />, dan terakhir{" "}
              <InlineMath math="45\cdot4-1=179" />.
            </p>
            <p className="text-sm font-bold text-emerald-100">
              <Check className="mr-2 inline h-4 w-4" aria-hidden="true" />
              Jadi, <InlineMath math="P(4)=179" />. Setiap panah pada skema Horner berarti hasil
              sebelumnya dikalikan dengan <InlineMath math="4" />, kemudian dijumlahkan dengan
              koefisien berikutnya.
            </p>
          </Example>

          <Example number={6} title="Menghitung dengan bilangan pengganti negatif">
            <p className="text-sm leading-relaxed text-slate-300">
              Hitunglah <InlineMath math="P(-4)" /> jika{" "}
              <InlineMath math="P(x)=2x^3+5x-3" />.
            </p>
            <Note title="Ada suku yang hilang!" tone="violet">
              Tidak ada suku <InlineMath math="x^2" />, maka kita tulis{" "}
              <InlineMath math="0x^2" />. Koefisien lengkapnya adalah{" "}
              <InlineMath math="2,0,5,-3" />.
            </Note>
            <Equation
              math="P(x)=2x^3+0x^2+5x-3"
              label="Tulis koefisien nol agar urutan pangkat tetap lengkap"
            />
            <HornerTable value={-4} coefficients={[2, 0, 5, -3]} polynomial="P" />
            <p className="text-sm leading-relaxed text-slate-300">
              Perhatikan tanda kalinya: <InlineMath math="2\cdot(-4)=-8" />, lalu{" "}
              <InlineMath math="(-8)\cdot(-4)+5=37" />, dan{" "}
              <InlineMath math="37\cdot(-4)-3=-151" />.
            </p>
            <p className="text-sm font-bold text-emerald-100">
              <Check className="mr-2 inline h-4 w-4" aria-hidden="true" />
              Jadi, <InlineMath math="P(-4)=-151" />. Tanda negatif pada bilangan pengganti ikut
              dikalikan di setiap langkah.
            </p>
          </Example>

          <Example number={7} title="Menyisipkan koefisien nol pada pangkat yang hilang">
            <p className="text-sm leading-relaxed text-slate-300">
              Hitunglah <InlineMath math="P(-2)" /> jika{" "}
              <InlineMath math="P(x)=x^4+x^2+2x-1" />.
            </p>
            <Note title="Jangan lewatkan pangkat tiga:" tone="amber">
              Tidak ada suku <InlineMath math="x^3" />. Karena itu, bentuk lengkap dan koefisiennya
              adalah <InlineMath math="P(x)=x^4+0x^3+x^2+2x-1" /> serta{" "}
              <InlineMath math="1,0,1,2,-1" />.
            </Note>
            <HornerTable value={-2} coefficients={[1, 0, 1, 2, -1]} polynomial="P" />
            <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
              <h4 className="mb-2 font-display font-bold text-cyan-100">
                Kita periksa lagi dengan substitusi langsung
              </h4>
              <Equation
                math="\begin{aligned}P(-2)&=(-2)^4+(-2)^2+2(-2)-1\\&=16+4-4-1\\&=15\end{aligned}"
              />
              <p className="mt-3 text-sm font-bold text-emerald-100">
                Cocok! <InlineMath math="P(-2)=15" /> pada substitusi langsung maupun pada skema
                Horner. Hitungan kita benar!
              </p>
            </div>
          </Example>

          <Example number={8} title="Menentukan nilai f(x) dengan cepat">
            <p className="text-sm leading-relaxed text-slate-300">
              Hitunglah <InlineMath math="f(-1)" /> jika{" "}
              <InlineMath math="f(x)=4x^3+7x^2-3x+2" />.
            </p>
            <Equation
              math="f(-1)=4(-1)^3+7(-1)^2-3(-1)+2"
              label="Koefisien: 4, 7, −3, 2"
            />
            <HornerTable value={-1} coefficients={[4, 7, -3, 2]} polynomial="f" />
            <p className="text-sm leading-relaxed text-slate-300">
              Turunkan <InlineMath math="4" />, lalu{" "}
              <InlineMath math="4\cdot(-1)+7=3" />, kemudian{" "}
              <InlineMath math="3\cdot(-1)-3=-6" />, dan terakhir{" "}
              <InlineMath math="(-6)\cdot(-1)+2=8" />.
            </p>
            <p className="text-sm font-bold text-emerald-100">
              <Check className="mr-2 inline h-4 w-4" aria-hidden="true" />
              Jadi, <InlineMath math="f(-1)=8" />. Mantap, kita berhasil menyelesaikan semua
              langkahnya!
            </p>
          </Example>
        </section>

        <Note title="Rangkuman langkah Horner:" tone="emerald">
          susun koefisien dari pangkat tertinggi, lengkapi koefisien yang hilang dengan nol,
          turunkan angka pertama, lalu ulangi pola kali dan jumlahkan sampai selesai. Angka
          terakhir adalah nilai polinomial yang dicari. Semangat—sekarang pola Horner sudah
          semakin akrab!
        </Note>
      </div>
    </main>
  </div>
);

export default SmaNilaiPolinomialHornerPage;
