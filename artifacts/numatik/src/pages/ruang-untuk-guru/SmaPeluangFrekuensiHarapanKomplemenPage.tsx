import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, BookOpen, Check, Lightbulb, Sparkles } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const sections = [
  ["4.3", "Frekuensi harapan", "frekuensi-harapan"],
  ["4.4", "Komplemen suatu kejadian", "komplemen"],
] as const;

function SectionHeading({
  number,
  title,
  intro,
}: {
  number: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="mb-5 flex gap-4" data-testid={`heading-${number.replace(".", "-")}`}>
      <span className="grid h-10 w-14 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-display text-xs font-black text-cyan-100">
        {number}
      </span>
      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-slate-300">{intro}</p>
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
    <article
      className="overflow-hidden rounded-3xl border border-orange-200/20 bg-[linear-gradient(140deg,rgba(106,45,35,.16),rgba(14,25,42,.92)_48%)]"
      data-testid={`example-${number}`}
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-300/15 text-orange-200">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">Contoh {number}</p>
          <h3 className="font-display text-base font-bold text-white sm:text-lg">{title}</h3>
        </div>
      </div>
      <div className="space-y-4 p-4 sm:p-5">{children}</div>
    </article>
  );
}

function Formula({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/80 px-4 py-3 text-center font-mono text-sm leading-7 text-cyan-100 sm:text-base">
      {children}
    </div>
  );
}

function Answer({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-emerald-200/15 bg-emerald-200/[.045] p-3 text-sm leading-relaxed text-emerald-50">
      <Check className="mr-2 inline h-4 w-4 text-emerald-200" aria-hidden="true" />
      {children}
    </p>
  );
}

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="rounded-2xl border border-violet-200/20 bg-violet-300/[.06] p-4">
      <p className="font-display text-sm font-bold text-violet-100">{title}</p>
      <div className="mt-2 text-sm leading-relaxed text-slate-300">{children}</div>
    </aside>
  );
}

function DataTable({
  caption,
  headers,
  rows,
}: {
  caption?: string;
  headers: ReactNode[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-max border-collapse text-left text-xs sm:text-sm">
        {caption && <caption className="px-3 py-2 text-left font-bold text-cyan-100">{caption}</caption>}
        <thead>
          <tr className="bg-cyan-300/[.1] text-cyan-50">
            {headers.map((header, index) => (
              <th key={index} scope="col" className="border-b border-white/10 px-3 py-2 font-bold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white/[.035]" : "bg-white/[.015]"}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border-b border-white/[.06] px-3 py-2 text-slate-200">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExpectedSpinnerSvg() {
  const center = 125;
  const radius = 82;
  const sectors = Array.from({ length: 10 }, (_, index) => {
    const start = ((index * 36 - 90) * Math.PI) / 180;
    const end = (((index + 1) * 36 - 90) * Math.PI) / 180;
    const x1 = center + radius * Math.cos(start);
    const y1 = center + radius * Math.sin(start);
    const x2 = center + radius * Math.cos(end);
    const y2 = center + radius * Math.sin(end);
    const middle = (start + end) / 2;
    const labelX = center + 58 * Math.cos(middle);
    const labelY = center + 58 * Math.sin(middle);
    const isStar = index === 1 || index === 6;
    return { index, x1, y1, x2, y2, labelX, labelY, isStar };
  });
  return (
    <svg
      viewBox="0 0 250 250"
      role="img"
      aria-label="Pemutar adil dengan sepuluh sektor sama besar, dua di antaranya bergambar bintang"
      className="mx-auto h-auto w-full max-w-xs rounded-2xl border border-white/10 bg-[#091426] p-3"
      data-testid="diagram-expected-frequency-spinner"
    >
      {sectors.map((sector) => (
        <g key={sector.index}>
          <path
            d={`M${center} ${center} L${sector.x1} ${sector.y1} A${radius} ${radius} 0 0 1 ${sector.x2} ${sector.y2} Z`}
            fill={sector.isStar ? "#e7a927" : sector.index % 2 ? "#1d5870" : "#18334b"}
            stroke="#9edce8"
            strokeWidth="1.5"
          />
          <text x={sector.labelX} y={sector.labelY + 4} fill="#fff" fontSize="11" fontWeight="700" textAnchor="middle">
            {sector.isStar ? "★" : sector.index + 1}
          </text>
        </g>
      ))}
      <circle cx={center} cy={center} r="7" fill="#f8fafc" stroke="#0e2338" strokeWidth="2" />
      <text x="125" y="231" fill="#d5e5f5" fontSize="11" textAnchor="middle">2 sektor bintang dari 10 sektor</text>
    </svg>
  );
}

function TargetSvg() {
  return (
    <svg
      viewBox="0 0 330 210"
      role="img"
      aria-label="Ilustrasi papan sasaran panahan dengan lingkaran konsentris dan anak panah yang mengenai papan"
      className="mx-auto h-auto w-full max-w-sm rounded-2xl border border-white/10 bg-[#091426] p-3"
      data-testid="diagram-target-trials"
    >
      <circle cx="137" cy="100" r="77" fill="#e8edf5" stroke="#cbd5e1" strokeWidth="2" />
      <circle cx="137" cy="100" r="59" fill="#fb7185" />
      <circle cx="137" cy="100" r="42" fill="#f8fafc" />
      <circle cx="137" cy="100" r="26" fill="#60a5fa" />
      <circle cx="137" cy="100" r="10" fill="#f6bd60" />
      <path d="M253 43L154 95" stroke="#8ce2b8" strokeWidth="4" strokeLinecap="round" />
      <path d="M253 43l-4 17-9-10-12 1 8-10-2-13z" fill="#8ce2b8" />
      <path d="M154 95l10-2-5 9z" fill="#f8fafc" />
      <text x="246" y="78" fill="#d5e5f5" fontSize="12" textAnchor="middle">mencoba</text>
      <text x="164" y="190" fill="#d5e5f5" fontSize="11" textAnchor="middle">papan sasaran</text>
    </svg>
  );
}

function ComplementDiagramSvg() {
  return (
    <svg
      viewBox="0 0 420 250"
      role="img"
      aria-label="Diagram Venn: persegi panjang S adalah ruang sampel, lingkaran A berada di dalamnya, dan daerah di luar A merupakan komplemen A"
      className="mx-auto h-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#091426] p-3"
      data-testid="diagram-event-complement"
    >
      <defs>
        <pattern id="complement-stripes" width="10" height="10" patternTransform="rotate(35)" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="#593650" />
          <path d="M0 0V10" stroke="#fda4af" strokeOpacity=".35" strokeWidth="4" />
        </pattern>
      </defs>
      <rect x="28" y="25" width="364" height="194" rx="10" fill="url(#complement-stripes)" stroke="#fda4af" strokeWidth="2" />
      <circle cx="210" cy="122" r="68" fill="#143d58" stroke="#a5f3fc" strokeWidth="3" />
      <text x="50" y="52" fill="#fff" fontSize="17" fontWeight="800" fontFamily="sans-serif">S</text>
      <text x="210" y="128" fill="#fff" fontSize="20" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">A</text>
      <text x="90" y="135" fill="#ffe4e6" fontSize="14" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">Aᶜ</text>
      <text x="292" y="135" fill="#ffe4e6" fontSize="14" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">Aᶜ</text>
      <text x="210" y="241" fill="#d5e5f5" fontSize="11" textAnchor="middle">Daerah di S yang berada di luar A membentuk komplemen A</text>
    </svg>
  );
}

const SmaPeluangFrekuensiHarapanKomplemenPage = () => {
  const jumpTo = (id: string) => {
    playPopSound();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden gradient-space">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/peluang" />
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <header className="mx-auto mb-9 max-w-4xl text-center" data-testid="lesson-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/[.06] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Peluang · Yuk hitung dan temukan kebalikannya!
          </div>
          <p className="font-display text-xs font-bold uppercase tracking-[.24em] text-orange-200">Bab 4</p>
          <h1 className="mt-2 font-display text-3xl font-black leading-tight tracking-tight text-primary text-glow-cyan sm:text-5xl">
            Frekuensi Harapan dan Komplemen Suatu Kejadian
          </h1>
          <p className="mx-auto mt-4 max-w-3xl font-body text-sm leading-relaxed text-slate-300 sm:text-base">
            Kita bisa memperkirakan berapa kali suatu hasil muncul, lalu menghitung peluang bahwa kejadian itu justru
            tidak terjadi. Ayo gunakan peluang untuk membuat perkiraan yang masuk akal dan menemukan kejadian
            pelengkapnya!
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {sections.map(([number, label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => jumpTo(id)}
                data-testid={`jump-${id}`}
                className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 font-body text-xs text-slate-200 transition-colors hover:border-cyan-200/40 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200/60"
              >
                {number} · {label}
              </button>
            ))}
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0 space-y-10">
            <section id="frekuensi-harapan" className="scroll-mt-6" data-testid="section-expected-frequency">
              <SectionHeading
                number="4.3"
                title="Frekuensi harapan"
                intro="Kalau suatu percobaan dilakukan berulang kali, kita dapat memperkirakan berapa kali kejadian tertentu akan muncul. Perkiraan itu disebut frekuensi harapan."
              />
              <div className="grid min-w-0 gap-4 md:grid-cols-[minmax(0,1fr)_300px]">
                <div className="min-w-0 space-y-4">
                  <p className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-relaxed text-slate-200">
                    Misalkan sebuah pemutar adil memiliki 10 sektor sama besar dan 2 di antaranya bergambar bintang.
                    Peluang berhenti di bintang adalah 2/10 = 1/5. Jika pemutar dicoba 75 kali, frekuensi harapan
                    bintang adalah 1/5 × 75 = 15 kali.
                  </p>
                  <Formula>Frekuensi harapan kejadian E: F(E) = P(E) × n</Formula>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Di sini, <span className="font-mono text-cyan-100">P(E)</span> adalah peluang terjadinya E dan{" "}
                    <span className="font-mono text-cyan-100">n</span> adalah banyak percobaan. Frekuensi harapan
                    adalah perkiraan berdasarkan peluang, bukan janji bahwa hasil percobaan yang sebenarnya pasti
                    persis sama.
                  </p>
                </div>
                <ExpectedSpinnerSvg />
              </div>
              <Callout title="Perkiraan tidak sama dengan kepastian">
                Walaupun peluang sebuah hasil dan banyak percobaan sudah diketahui, hasil nyata tetap dapat lebih
                sedikit atau lebih banyak daripada frekuensi harapannya. Semakin banyak percobaan, frekuensi relatif
                biasanya makin dekat dengan peluang teoretik, tetapi tidak harus selalu tepat.
              </Callout>

              <div className="mt-5 space-y-5">
                <Example number={12} title="Memperkirakan banyak hasil dari peluangnya">
                  <ol className="list-inside list-decimal space-y-3 text-sm leading-relaxed text-slate-200">
                    <li>
                      Sebuah koin adil dilempar 44 kali. Berapa frekuensi harapan muncul sisi Gambar (G)?
                      <Formula>
                        P(G) = 1/2 · F(G) = 1/2 × 44 = 22 kali
                      </Formula>
                    </li>
                    <li>
                      Pemutar hadiah mempunyai 8 sektor sama besar dan tepat 3 sektor berwarna ungu. Pemutar diputar
                      144 kali. Berapa frekuensi harapan jarum berhenti di ungu?
                      <Formula>
                        P(ungu) = 3/8 · F(ungu) = 3/8 × 144 = 54 kali
                      </Formula>
                    </li>
                  </ol>
                  <Answer>
                    Frekuensi harapan sisi Gambar adalah 22 kali, sedangkan frekuensi harapan warna ungu adalah 54
                    kali. Angka-angka ini merupakan nilai perkiraan; hasil percobaan bisa berbeda.
                  </Answer>
                </Example>

                <Example number={13} title="Perkiraan tembakan yang mengenai sasaran">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Dalam sebuah latihan, peluang seorang pemain bowling menjatuhkan semua pin pada satu giliran
                    adalah 0,45. Jika ia berlatih sebanyak 200 giliran, berapa banyak giliran strike yang diharapkan?
                  </p>
                  <TargetSvg />
                  <Formula>
                    F(strike) = P(strike) × n = 0,45 × 200 = 90 giliran
                  </Formula>
                  <Answer>
                    Frekuensi harapan strike adalah 90 giliran. Ini bukan berarti pemain pasti mencatat tepat 90
                    strike; banyak sebenarnya dapat berbeda dari hasil perkiraan.
                  </Answer>
                </Example>

                <div className="rounded-3xl border border-amber-200/20 bg-amber-300/[.05] p-5" data-testid="expected-frequency-check">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-200/10 text-amber-100">
                      <Lightbulb className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-body text-[10px] font-black uppercase tracking-[.18em] text-amber-200">Coba hitung cepat</p>
                      <h3 className="font-display text-lg font-bold text-white">Dua dadu dilempar berulang</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-200">
                    Sepasang dadu adil dilempar bersama-sama sebanyak 216 kali. Berapa frekuensi harapan jumlah mata
                    dadu sama dengan 8? Kemungkinan jumlah 8 adalah (2,6), (3,5), (4,4), (5,3), dan (6,2), yaitu 5
                    dari 36 hasil yang sama mungkin.
                  </p>
                  <Formula>F(jumlah 8) = 5/36 × 216 = 30 kali</Formula>
                  <Answer>
                    Jawabannya 30 kali. Hitung dulu peluang kejadian, kemudian kalikan dengan banyak seluruh
                    percobaan.
                  </Answer>
                </div>
              </div>
            </section>

            <section id="komplemen" className="scroll-mt-6" data-testid="section-complement">
              <SectionHeading
                number="4.4"
                title="Komplemen suatu kejadian"
                intro="Setiap kejadian memiliki pasangan berupa semua hasil di ruang sampel yang tidak termasuk kejadian itu. Pasangan inilah yang disebut komplemen."
              />
              <div className="grid min-w-0 gap-4 md:grid-cols-[minmax(0,1fr)_400px]">
                <div className="min-w-0 space-y-4">
                  <p className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-relaxed text-slate-200">
                    Komplemen kejadian A dapat ditulis <span className="font-mono text-cyan-100">Aᶜ</span> atau{" "}
                    <span className="font-mono text-cyan-100">A′</span>. Isinya adalah semua anggota ruang sampel
                    yang bukan anggota A. A dan komplemennya tidak memiliki anggota yang sama, tetapi jika
                    digabungkan keduanya mencakup seluruh ruang sampel.
                  </p>
                  <Formula>
                    A ∩ Aᶜ = ∅ · A ∪ Aᶜ = S
                  </Formula>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Karena A dan Aᶜ merupakan dua kemungkinan yang saling melengkapi, jumlah peluang keduanya adalah
                    1. Maka peluang komplemen dapat dicari langsung dari ruang sampel, atau lebih cepat dengan
                    mengurangkan peluang A dari 1.
                  </p>
                </div>
                <ComplementDiagramSvg />
              </div>
              <Formula>
                P(Aᶜ) = n(Aᶜ) / n(S) = [n(S) − n(A)] / n(S) = 1 − P(A)
              </Formula>

              <div className="mt-5 space-y-5">
                <Example number={14} title="Hasil pemutar yang bukan kelipatan tiga">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Pemutar adil bernomor 1 sampai 10 memiliki sektor sama besar. Misalkan A adalah kejadian jarum
                    berhenti pada kelipatan 3. Tentukan peluang A dan peluang komplemennya.
                  </p>
                  <Formula>
                    S = {"{1,2,3,4,5,6,7,8,9,10}"} · A = {"{3,6,9}"} · Aᶜ = {"{1,2,4,5,7,8,10}"}
                  </Formula>
                  <DataTable
                    headers={["Cara menghitung", "Peluang"]}
                    rows={[
                      ["Langsung: n(Aᶜ)/n(S)", "7/10"],
                      ["Dengan rumus komplemen: 1 − P(A)", "1 − 3/10 = 7/10"],
                    ]}
                  />
                  <Answer>
                    P(A) = 3/10, sehingga P(Aᶜ) = 1 − 3/10 = 7/10. Kedua cara menghasilkan nilai yang sama.
                  </Answer>
                </Example>

                <Example number={15} title="Peluang bus terlambat">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Berdasarkan catatan perjalanan, peluang bus sekolah tiba tepat waktu adalah 0,86. Berapa peluang
                    bus tersebut tidak tiba tepat waktu?
                  </p>
                  <Formula>
                    P(terlambat) = 1 − P(tepat waktu) = 1 − 0,86 = 0,14
                  </Formula>
                  <Answer>
                    Peluang bus tidak tiba tepat waktu adalah 0,14 atau 14%. “Tidak tepat waktu” merupakan komplemen
                    dari “tepat waktu”.
                  </Answer>
                </Example>

                <Example number={16} title="Empat lemparan koin dan kejadian komplemennya">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Empat keping uang logam dilempar bersama-sama. Misalkan B adalah kejadian muncul sekurang-kurangnya
                    satu sisi Gambar (G), sedangkan C adalah kejadian semua keping menunjukkan sisi Angka (A).
                    Kelompokkan seluruh hasil menurut banyaknya Gambar, lalu tentukan peluang B.
                  </p>
                  <Formula>
                    n(S) = 2 × 2 × 2 × 2 = 16
                  </Formula>
                  <DataTable
                    caption="Semua hasil dikelompokkan menurut banyaknya sisi Gambar"
                    headers={["Banyak Gambar", "Rincian hasil", "Banyak hasil"]}
                    rows={[
                      ["4G", <span className="font-mono">GGGG</span>, "1"],
                      ["3G + 1A", <span className="font-mono">GGGA, GGAG, GAGG, AGGG</span>, "4"],
                      ["2G + 2A", <span className="font-mono">GGAA, GAGA, GAAG, AGGA, AGAG, AAGG</span>, "6"],
                      ["1G + 3A", <span className="font-mono">GAAA, AGAA, AAGA, AAAG</span>, "4"],
                      ["4A", <span className="font-mono">AAAA</span>, "1"],
                    ]}
                  />
                  <p className="text-sm leading-relaxed text-slate-300">
                    Kejadian C hanya terdiri atas hasil AAAA, yaitu semua koin menunjukkan Angka. Jadi C merupakan
                    komplemen dari B: B terjadi jika dan hanya jika bukan semua hasilnya Angka.
                  </p>
                  <Formula>
                    P(C) = 1/16 · P(B) = 1 − P(C) = 1 − 1/16 = 15/16
                  </Formula>
                  <Answer>
                    Peluang muncul sekurang-kurangnya satu Gambar adalah 15/16. Dari 16 hasil yang sama mungkin,
                    hanya satu hasil (AAAA) yang tidak memenuhi B.
                  </Answer>
                </Example>
              </div>
            </section>

            <section className="rounded-3xl border border-cyan-200/15 bg-cyan-300/[.045] p-5" data-testid="lesson-takeaways">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-200/10 text-cyan-100">
                  <Check className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="font-display text-xl font-extrabold text-white">Sip, dua rumus penting sudah dikuasai!</h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-200">
                <li>• Frekuensi harapan memperkirakan banyak kemunculan: F(E) = P(E) × n.</li>
                <li>• Hasil nyata tidak harus sama persis dengan frekuensi harapan.</li>
                <li>• Komplemen A, ditulis Aᶜ atau A′, memuat hasil di S yang bukan anggota A.</li>
                <li>• A ∩ Aᶜ = ∅ dan A ∪ Aᶜ = S.</li>
                <li>• Peluang komplemen: P(Aᶜ) = 1 − P(A).</li>
              </ul>
              <p className="mt-4 font-body text-sm font-semibold text-cyan-100">
                Mantap! Sekarang kamu bisa memperkirakan banyak hasil dan menghitung peluang “bukan A” dengan cepat.
              </p>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-6 rounded-3xl border border-white/10 bg-[#0a1424]/80 p-4 backdrop-blur">
              <p className="font-display text-sm font-bold text-white">Jelajahi materi</p>
              <nav className="mt-3 space-y-1" aria-label="Navigasi bagian materi">
                {sections.map(([number, label, id]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => jumpTo(id)}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs text-slate-300 transition-colors hover:bg-white/[.06] hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200/60"
                  >
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-cyan-200" aria-hidden="true" />
                    <span><span className="mr-1 font-mono text-orange-200">{number}</span>{label}</span>
                  </button>
                ))}
              </nav>
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-xs leading-relaxed text-slate-400">
                  Kalikan peluang dengan banyak percobaan untuk perkiraan; gunakan 1 − P(A) untuk peluang bukan A.
                </p>
                <button
                  type="button"
                  onClick={() => jumpTo("frekuensi-harapan")}
                  className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-cyan-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200/60"
                >
                  <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                  Mulai dari awal
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SmaPeluangFrekuensiHarapanKomplemenPage;
