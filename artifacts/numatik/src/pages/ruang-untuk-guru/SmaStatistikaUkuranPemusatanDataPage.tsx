import type { ReactNode } from "react";
import { BookOpen, Sparkles } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

type TableRow = ReactNode[];

const schoolScoreIntervals = ["30–39", "40–49", "50–59", "60–69", "70–79", "80–89", "90–99"];
const schoolA = [7, 12, 21, 28, 17, 10, 5];
const schoolB = [4, 10, 18, 25, 20, 14, 9];

const repeatedScores = [1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5];
const repeatedScoreValues = [1, 2, 3, 4, 5];
const repeatedScoreFrequencies = [2, 2, 3, 2, 3];

const groupedScores = [
  4, 4, 5, 5, 5, 5, 5, 6, 6,
  6, 6, 6, 6, 6, 6, 6, 7, 7,
  7, 7, 7, 7, 7, 7, 7, 7, 8,
  8, 8, 8, 8, 8, 8, 8, 9, 9,
  9, 9, 9, 9, 9, 10, 10, 10, 10,
];
const groupedScoreValues = [4, 5, 6, 7, 8, 9, 10];
const groupedScoreFrequencies = [2, 5, 9, 10, 8, 7, 4];

const intervalValues = [20, 25, 30, 35, 40, 45];
const intervalFrequencies = [3, 7, 10, 5, 3, 2];
const intervalLabels = ["18–22", "23–27", "28–32", "33–37", "38–42", "43–47"];

const marbleDiameters = [
  14, 15, 15, 16, 17, 17, 18, 18, 19, 19,
  20, 20, 21, 21, 21, 22, 22, 22, 23, 23,
  24, 24, 24, 24, 25, 25, 25, 23, 24, 25,
  26, 26, 27, 27, 27, 28, 28, 28, 26, 29,
  29, 30, 30, 30, 31, 31, 32, 33, 33, 34,
];
const marbleClasses = ["14–16", "17–19", "20–22", "23–25", "26–28", "29–31", "32–34"];
const marbleFrequencies = [4, 6, 8, 12, 9, 7, 4];
const marbleMidpoints = [15, 18, 21, 24, 27, 30, 33];

const examIntervals = ["31–40", "41–50", "51–60", "61–70", "71–80"];
const examFrequencies = [2, 4, 11, 5, 3];
const examMidpoints = [35.5, 45.5, 55.5, 65.5, 75.5];
const bagWeightIntervals = ["3–4", "5–6", "7–8", "9–10", "11–12"];
const bagWeightFrequencies = [4, 9, 12, 8, 3];
const bagWeightMidpoints = [3.5, 5.5, 7.5, 9.5, 11.5];

const modeGroupedIntervals = ["31–35", "36–40", "41–45", "46–50", "51–55", "56–60"];
const modeGroupedFrequencies = [3, 7, 11, 8, 5, 2];
const modeHistogramIntervals = ["25–29", "30–34", "35–39", "40–44", "45–49", "50–54"];
const modeHistogramFrequencies = [4, 9, 14, 20, 16, 7];
const commuteIntervals = ["10–14", "15–19", "20–24", "25–29", "30–34", "35–39"];
const commuteFrequencies = [2, 5, 11, 9, 4, 1];

const formatNumber = (value: number, digits = 2) =>
  value.toLocaleString("id-ID", { maximumFractionDigits: digits, minimumFractionDigits: 0 });

function DataTable({
  headers,
  rows,
  caption,
}: {
  headers: ReactNode[];
  rows: TableRow[];
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-max border-collapse text-left text-xs sm:text-sm">
        {caption && <caption className="px-3 py-2 text-left font-bold text-cyan-100">{caption}</caption>}
        <thead>
          <tr className="bg-cyan-300/[.1] text-cyan-50">
            {headers.map((header, index) => (
              <th key={index} scope="col" className="border-b border-white/10 px-3 py-2 font-bold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white/[.035]" : "bg-white/[.015]"}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border-b border-white/[.06] px-3 py-2 text-slate-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
    <div className="mb-5 flex gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-display text-xs font-black text-cyan-100">
        {number}
      </span>
      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-slate-300">{intro}</p>
      </div>
    </div>
  );
}

function Example({ number, title, children }: { number: number; title: string; children: ReactNode }) {
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

function Formula({
  children,
  label,
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/90 px-4 py-4 text-center">
      {label && (
        <p className="mb-2 text-left font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/55">
          {label}
        </p>
      )}
      <div className="whitespace-nowrap font-serif text-lg font-semibold tracking-wide text-cyan-100 sm:text-xl">
        {children}
      </div>
    </div>
  );
}

function Histogram({
  labels,
  frequencies,
  ariaLabel,
  xAxisLabel,
}: {
  labels: string[];
  frequencies: number[];
  ariaLabel: string;
  xAxisLabel: string;
}) {
  const left = 58;
  const right = 690;
  const top = 28;
  const bottom = 270;
  const maxFrequency = Math.max(...frequencies);
  const step = maxFrequency <= 12 ? 2 : 5;
  const maxY = Math.ceil(maxFrequency / step) * step;
  const slotWidth = (right - left) / labels.length;
  const y = (value: number) => bottom - (value / maxY) * (bottom - top);

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/65 p-2 sm:p-3">
      <svg
        viewBox="0 0 730 340"
        role="img"
        aria-label={ariaLabel}
        className="h-auto min-w-[590px] w-full"
      >
        {Array.from({ length: maxY / step + 1 }, (_, index) => {
          const value = index * step;
          return (
            <g key={value}>
              <line x1={left} x2={right} y1={y(value)} y2={y(value)} stroke="#94a3b8" strokeOpacity=".2" />
              <text x={left - 9} y={y(value) + 4} fill="#cbd5e1" fontSize="11" textAnchor="end">
                {value}
              </text>
            </g>
          );
        })}
        <line x1={left} x2={right} y1={bottom} y2={bottom} stroke="#cbd5e1" strokeWidth="1.5" />
        <line x1={left} x2={left} y1={top} y2={bottom} stroke="#cbd5e1" strokeWidth="1.5" />
        {frequencies.map((frequency, index) => {
          const x = left + index * slotWidth;
          return (
            <g key={labels[index]}>
              <rect
                x={x}
                y={y(frequency)}
                width={slotWidth}
                height={bottom - y(frequency)}
                fill="#fb8b79"
                fillOpacity=".8"
                stroke="#ffe1db"
                strokeWidth="1.5"
              />
              <text x={x + slotWidth / 2} y={y(frequency) - 8} fill="#fff" fontSize="11" textAnchor="middle">
                {frequency}
              </text>
              <text x={x + slotWidth / 2} y={bottom + 18} fill="#e2e8f0" fontSize="10" textAnchor="middle">
                {labels[index]}
              </text>
            </g>
          );
        })}
        <text x={(left + right) / 2} y="326" fill="#e2e8f0" fontSize="12" textAnchor="middle">
          {xAxisLabel}
        </text>
        <text
          x="15"
          y={(top + bottom) / 2}
          fill="#e2e8f0"
          fontSize="11"
          textAnchor="middle"
          transform={`rotate(-90 15 ${(top + bottom) / 2})`}
        >
          Frekuensi
        </text>
      </svg>
    </div>
  );
}

const lessonOutline = [
  ["Mengapa perlu ukuran pemusatan?", "pengantar"],
  ["Rataan hitung data tunggal", "rataan-tunggal"],
  ["Rataan sementara", "rataan-sementara"],
  ["Rataan data berkelompok", "rataan-berkelompok"],
  ["Modus", "modus"],
];

const SmaStatistikaUkuranPemusatanDataPage = () => {
  const repeatedScoreTotal = repeatedScoreFrequencies.reduce(
    (sum, frequency, index) => sum + frequency * repeatedScoreValues[index],
    0,
  );
  const groupedScoreTotal = groupedScoreFrequencies.reduce(
    (sum, frequency, index) => sum + frequency * groupedScoreValues[index],
    0,
  );
  const groupedScoreDeviationTotal = groupedScoreFrequencies.reduce(
    (sum, frequency, index) => sum + frequency * (groupedScoreValues[index] - 7),
    0,
  );
  const marbleTotal = marbleFrequencies.reduce(
    (sum, frequency, index) => sum + frequency * marbleMidpoints[index],
    0,
  );
  const marbleDeviationTotal = marbleFrequencies.reduce(
    (sum, frequency, index) => sum + frequency * (marbleMidpoints[index] - 24),
    0,
  );
  const examTotal = examFrequencies.reduce(
    (sum, frequency, index) => sum + frequency * examMidpoints[index],
    0,
  );
  const examDeviationTotal = examFrequencies.reduce(
    (sum, frequency, index) => sum + frequency * (examMidpoints[index] - 55.5),
    0,
  );
  const bagWeightTotal = bagWeightFrequencies.reduce(
    (sum, frequency, index) => sum + frequency * bagWeightMidpoints[index],
    0,
  );
  const commuteTotal = commuteFrequencies.reduce((sum, frequency) => sum + frequency, 0);

  return (
    <div className="animation-submaterial-route relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/statistika" />
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
        <header
          className="relative mb-8 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.96),rgba(16,22,43,.95)_60%,rgba(75,36,43,.76))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10"
          data-testid="lesson-hero"
        >
          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-cyan-100/10" />
          <div className="relative max-w-4xl">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">
                Ruang untuk Guru · SMA
              </span>
              <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">
                Buku Animasi Matematika SMA · Statistika
              </span>
            </div>
            <div className="mb-3 flex items-center gap-2 text-amber-200">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <p className="font-body text-xs font-bold uppercase tracking-[.24em]">Temukan titik kumpul data!</p>
            </div>
            <h1 className="font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="lesson-title">
              Ukuran Pemusatan <span className="text-cyan-200">Data</span>
            </h1>
            <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">
              Siap membaca cerita di balik sekumpulan angka? Yuk, cari nilai yang bisa mewakili data dengan rataan dan modus—pelan-pelan, satu langkah ceria setiap kali!
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Rataan hitung", "Data tunggal", "Data berkelompok", "Rataan sementara", "Modus"].map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs font-semibold text-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <nav className="mb-8 flex gap-2 overflow-x-auto pb-2 lg:hidden" aria-label="Peta materi">
          {lessonOutline.map(([label, target]) => (
            <a
              key={target}
              href={`#${target}`}
              className="shrink-0 rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-xs text-slate-200 transition-colors hover:border-cyan-200/40 hover:text-cyan-100"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_245px]">
          <div className="min-w-0 space-y-12">
            <section id="pengantar" className="scroll-mt-8 space-y-5">
              <SectionHeading
                number="2.3"
                title="Ukuran Pemusatan Data"
                intro="Saat data berjumlah banyak, kita membutuhkan nilai ringkas untuk membantu membacanya. Nilai yang mewakili kecenderungan pusat data disebut ukuran pemusatan."
              />
              <div className="space-y-3 rounded-3xl border border-white/10 bg-white/[.035] p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-slate-300">
                  Bayangkan dua SMA mengadakan kuis matematika. Nilai 100 siswa dari setiap sekolah dikelompokkan ke dalam interval berikut. Angka di tabel menunjukkan banyak siswa di tiap rentang nilai.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <DataTable
                    caption="Nilai kuis SMA Garuda"
                    headers={["Interval nilai", "Banyak siswa"]}
                    rows={schoolScoreIntervals.map((interval, index) => [interval, schoolA[index]]).concat([["Jumlah", schoolA.reduce((a, b) => a + b, 0)]])}
                  />
                  <DataTable
                    caption="Nilai kuis SMA Mentari"
                    headers={["Interval nilai", "Banyak siswa"]}
                    rows={schoolScoreIntervals.map((interval, index) => [interval, schoolB[index]]).concat([["Jumlah", schoolB.reduce((a, b) => a + b, 0)]])}
                  />
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  Dari tabel frekuensi saja, belum tentu langsung terlihat sekolah mana yang memperoleh hasil lebih baik. Kita perlu nilai ringkas yang mewakili seluruh data pada masing-masing sekolah. Itulah salah satu alasan ukuran pemusatan berguna!
                </p>
                <div className="rounded-2xl border border-amber-200/20 bg-amber-200/[.05] p-4">
                  <p className="text-sm leading-relaxed text-amber-50">
                    Dalam statistika, ukuran pemusatan mencakup rataan hitung (mean), median, modus, dan rataan harmonis. Masing-masing punya cara hitung serta kegunaan yang sesuai dengan karakter datanya. Halaman yang tersedia menjelaskan rataan hitung dan modus; median disebut di pengantar, tetapi bagian cara menghitungnya tidak ada di berkas yang diunggah.
                  </p>
                </div>
              </div>
            </section>

            <section id="rataan-tunggal" className="scroll-mt-8 space-y-5">
              <SectionHeading
                number="2.3.1"
                title="Rataan Hitung (Mean)"
                intro="Rataan hitung membagi jumlah seluruh nilai dengan banyaknya data. Kita mulai dari data tunggal, lalu lanjut ke data yang sudah dikelompokkan."
              />
              <div className="space-y-4">
                <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
                  <h3 className="font-display text-lg font-bold text-cyan-100">A. Menghitung rataan data tunggal</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Untuk data x₁, x₂, x₃, …, xₙ, rataan hitung diperoleh dengan menjumlahkan semua nilainya lalu membaginya dengan banyak data.
                  </p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <Formula label="Jika data ditulis satu per satu">x̄ = (x₁ + x₂ + ⋯ + xₙ) ÷ n</Formula>
                    <Formula label="Jika data dilengkapi frekuensi">x̄ = (Σ fᵢxᵢ) ÷ (Σ fᵢ)</Formula>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm leading-relaxed text-slate-300 sm:grid-cols-2">
                    <p><strong className="text-cyan-100">x̄</strong> = rataan atau mean.</p>
                    <p><strong className="text-cyan-100">xᵢ</strong> = nilai data ke-i.</p>
                    <p><strong className="text-cyan-100">n</strong> = banyak seluruh data.</p>
                    <p><strong className="text-cyan-100">fᵢ</strong> = frekuensi nilai xᵢ.</p>
                  </div>
                </div>

                <Example number={17} title="Mencari rataan nilai enam pemain kuis">
                  <p className="text-sm leading-relaxed text-slate-300">
                    Nilai enam pemain di babak final adalah 66, 72, 75, 81, 84, dan 90. Berapa rataan nilainya?
                  </p>
                  <div className="rounded-2xl border border-orange-200/15 bg-black/15 p-4">
                    <p className="mb-2 text-xs font-black uppercase tracking-[.18em] text-orange-200">Jawab, jumlahkan lalu bagi</p>
                    <p className="font-mono text-sm leading-loose text-slate-100">x̄ = (66 + 72 + 75 + 81 + 84 + 90) ÷ 6</p>
                    <p className="font-mono text-sm leading-loose text-slate-100">x̄ = 468 ÷ 6 = 78</p>
                    <p className="mt-2 text-sm text-emerald-100">Jadi, rataan nilai para pemain adalah 78.</p>
                  </div>
                </Example>

                <Example number={18} title="Data nilai yang memiliki angka berulang">
                  <p className="text-sm leading-relaxed text-slate-300">
                    Catatan waktu latihan (dalam menit) adalah: {repeatedScores.join(", ")}. Kita boleh menjumlahkan semua data langsung atau memakai tabel frekuensi agar angka yang berulang lebih mudah dihitung.
                  </p>
                  <Formula label="Cara langsung">
                    x̄ = (1 + 1 + 2 + 2 + 3 + 3 + 3 + 4 + 4 + 5 + 5 + 5) ÷ 12 = 38 ÷ 12 ≈ 3,17 menit
                  </Formula>
                  <Formula>x̄ = (2 + 2 + 6 + 8 + 15) ÷ 12 = {formatNumber(repeatedScoreTotal / repeatedScores.length)} menit</Formula>
                  <DataTable
                    caption="Cara ringkas dengan frekuensi"
                    headers={["Waktu (xᵢ)", ...repeatedScoreValues, "Jumlah"]}
                    rows={[
                      ["Frekuensi (fᵢ)", ...repeatedScoreFrequencies, repeatedScores.length],
                      ["fᵢxᵢ", ...repeatedScoreFrequencies.map((frequency, index) => frequency * repeatedScoreValues[index]), repeatedScoreTotal],
                    ]}
                  />
                  <p className="text-sm leading-relaxed text-slate-300">
                    Perhitungannya: Σfᵢxᵢ ÷ Σfᵢ = {repeatedScoreTotal} ÷ {repeatedScores.length} = {formatNumber(repeatedScoreTotal / repeatedScores.length)} menit. Frekuensi membantu kita menghitung kelompok nilai yang sama tanpa menulis penjumlahan berulang-ulang.
                  </p>
                </Example>

                <Example number={19} title="Membandingkan rataan dua tim robotika">
                  <p className="text-sm leading-relaxed text-slate-300">
                    Dua tim mendapat poin pada enam tantangan robotika. Tim Surya dan Tim Pelangi memperoleh nilai berikut. Tim mana yang memiliki rataan poin lebih tinggi?
                  </p>
                  <DataTable
                    headers={["Tantangan robotika", "Tim Surya", "Tim Pelangi"]}
                    rows={[
                      ["Navigasi", 86, 82],
                      ["Pemrograman", 78, 84],
                      ["Sensor", 88, 80],
                      ["Ketepatan", 92, 88],
                      ["Efisiensi", 80, 86],
                      ["Misi akhir", 84, 82],
                      ["Jumlah nilai", 508, 502],
                      ["Rataan", "508 ÷ 6 = 84,67", "502 ÷ 6 = 83,67"],
                    ]}
                  />
                  <p className="text-sm leading-relaxed text-slate-300">
                    Rataan Tim Surya adalah 84,67, sedangkan rataan Tim Pelangi 83,67. Jadi, berdasarkan enam tantangan tersebut, Tim Surya memiliki rataan poin lebih tinggi.
                  </p>
                </Example>
              </div>
            </section>

            <section id="rataan-sementara" className="scroll-mt-8 space-y-5">
              <SectionHeading
                number="B"
                title="Rataan dengan Cara Rataan Sementara"
                intro="Kalau nilai-nilainya berdekatan, menghitung selisih dari sebuah nilai patokan bisa membuat penjumlahan jauh lebih ringan."
              />
              <div className="space-y-4">
                <div className="rounded-3xl border border-violet-200/15 bg-violet-200/[.045] p-4 sm:p-5">
                  <p className="text-sm leading-relaxed text-slate-300">
                    Misalkan rataan sementara dipilih sebagai xₛ. Untuk setiap data, hitung simpangannya dᵢ = xᵢ − xₛ. Rataan sesungguhnya sama dengan rataan sementara ditambah rataan semua simpangan.
                  </p>
                  <Formula label="Rataan sementara untuk data tunggal">x̄ = xₛ + (Σdᵢ ÷ n), &nbsp; dᵢ = xᵢ − xₛ</Formula>
                  <div className="mt-3 grid gap-2 text-sm leading-relaxed text-slate-300 sm:grid-cols-2">
                    <p><strong className="text-violet-100">x̄</strong> = rataan data.</p>
                    <p><strong className="text-violet-100">xₛ</strong> = rataan sementara atau nilai patokan.</p>
                    <p><strong className="text-violet-100">xᵢ</strong> = data ke-i.</p>
                    <p><strong className="text-violet-100">dᵢ</strong> = simpangan data ke-i terhadap xₛ.</p>
                    <p><strong className="text-violet-100">n</strong> = banyak data.</p>
                  </div>
                </div>
                <Example number={20} title="Rataan sementara nilai kuis 45 siswa">
                  <p className="text-sm leading-relaxed text-slate-300">
                    Berikut poin yang dikumpulkan 45 peserta dalam turnamen teka-teki matematika. Tentukan rataan poinnya dengan cara langsung dan dengan memilih rataan sementara xₛ = 7.
                  </p>
                  <DataTable
                    caption="Data nilai kuis"
                    headers={Array.from({ length: 9 }, (_, index) => `Data ${index + 1}`)}
                    rows={Array.from({ length: 5 }, (_, row) => groupedScores.slice(row * 9, row * 9 + 9))}
                  />
                  <DataTable
                    caption="Tabel frekuensi dan simpangan"
                    headers={["Nilai xᵢ", ...groupedScoreValues, "Jumlah"]}
                    rows={[
                      ["Frekuensi fᵢ", ...groupedScoreFrequencies, groupedScores.length],
                      ["fᵢxᵢ", ...groupedScoreFrequencies.map((frequency, index) => frequency * groupedScoreValues[index]), groupedScoreTotal],
                      ["dᵢ = xᵢ − 7", ...groupedScoreValues.map((value) => value - 7), "—"],
                      ["fᵢdᵢ", ...groupedScoreFrequencies.map((frequency, index) => frequency * (groupedScoreValues[index] - 7)), groupedScoreDeviationTotal],
                    ]}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.04] p-4">
                      <h4 className="font-display font-bold text-cyan-100">Cara langsung</h4>
                      <p className="mt-2 font-mono text-sm leading-relaxed text-slate-100">
                        x̄ = Σfᵢxᵢ ÷ Σfᵢ = {groupedScoreTotal} ÷ {groupedScores.length} = {formatNumber(groupedScoreTotal / groupedScores.length)}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.04] p-4">
                      <h4 className="font-display font-bold text-violet-100">Cara rataan sementara (xₛ = 7)</h4>
                      <p className="mt-2 font-mono text-sm leading-relaxed text-slate-100">
                        x̄ = 7 + ({groupedScoreDeviationTotal} ÷ 45) = {formatNumber(7 + groupedScoreDeviationTotal / 45)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Kedua cara memberikan hasil yang sama, yaitu rataan {formatNumber(groupedScoreTotal / groupedScores.length)}. Nilai xₛ yang dekat dengan titik tengah data membuat simpangan lebih mudah dijumlahkan.
                  </p>
                </Example>
              </div>
            </section>

            <section id="rataan-berkelompok" className="scroll-mt-8 space-y-5">
              <SectionHeading
                number="C"
                title="Menghitung Rataan Data Berkelompok"
                intro="Untuk data yang sudah diringkas ke dalam kelas atau interval, kita wakili setiap kelas dengan titik tengahnya. Hasil rataan kelompok merupakan nilai perkiraan berdasarkan ringkasan tersebut."
              />
              <div className="space-y-4">
                <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
                  <p className="text-sm leading-relaxed text-slate-300">
                    Titik tengah xᵢ didapat dari (batas bawah kelas + batas atas kelas) ÷ 2. Kalikan titik tengah dengan frekuensi kelas untuk mendapatkan fᵢxᵢ, lalu gunakan rumus:
                  </p>
                  <Formula label="Rataan data berkelompok">x̄ = (Σfᵢxᵢ) ÷ (Σfᵢ)</Formula>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Di sini, fᵢ adalah frekuensi kelas ke-i, xᵢ titik tengah kelas ke-i, dan Σfᵢ = n adalah jumlah seluruh data.
                  </p>
                </div>

                <div className="space-y-4 rounded-3xl border border-orange-200/15 bg-[linear-gradient(140deg,rgba(106,45,35,.12),rgba(14,25,42,.92)_48%)] p-4 sm:p-5">
                  <div>
                    <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">Dari tabel frekuensi ke rataan</p>
                    <h3 className="mt-1 font-display text-lg font-bold text-white">Dua tabel, satu langkah menuju rataan</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Hasil kuis 30 siswa sudah dikelompokkan. Tabel frekuensi berikut memperlihatkan ringkasan data. Susun lagi tabelnya dengan titik tengah supaya rataan dapat dihitung.
                  </p>
                  <DataTable
                    caption="Tabel 2.9 · Distribusi nilai kuis"
                    headers={["Interval nilai", ...intervalLabels, "Jumlah"]}
                    rows={[
                      ["Frekuensi", ...intervalFrequencies, intervalFrequencies.reduce((sum, frequency) => sum + frequency, 0)],
                    ]}
                  />
                  <p className="text-sm leading-relaxed text-slate-300">
                    Misalnya, titik tengah kelas 18–22 adalah (18 + 22) ÷ 2 = 20. Karena ada 3 siswa di kelas itu, fᵢxᵢ = 3 × 20 = 60.
                  </p>
                  <DataTable
                    caption="Tabel 2.10 · Titik tengah untuk menghitung rataan langsung"
                    headers={["Interval", "Titik tengah (xᵢ)", "Frekuensi (fᵢ)", "fᵢxᵢ"]}
                    rows={intervalLabels
                      .map((label, index) => [
                        label,
                        intervalValues[index],
                        intervalFrequencies[index],
                        intervalValues[index] * intervalFrequencies[index],
                      ])
                      .concat([["Jumlah", "—", 30, 920]])}
                  />
                  <DataTable
                    caption="Tabel 2.11 · Simpangan terhadap xₛ = 30"
                    headers={["Interval", "Titik tengah (xᵢ)", "Frekuensi (fᵢ)", "dᵢ = xᵢ − 30", "fᵢdᵢ"]}
                    rows={intervalLabels
                      .map((label, index) => [
                        label,
                        intervalValues[index],
                        intervalFrequencies[index],
                        intervalValues[index] - 30,
                        intervalFrequencies[index] * (intervalValues[index] - 30),
                      ])
                      .concat([["Jumlah", "—", 30, "—", 20]])}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.04] p-4">
                      <h4 className="font-display font-bold text-cyan-100">Cara langsung</h4>
                      <p className="mt-2 font-mono text-sm leading-relaxed text-slate-100">x̄ = 920 ÷ 30 ≈ 30,67</p>
                    </div>
                    <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.04] p-4">
                      <h4 className="font-display font-bold text-violet-100">Cara rataan sementara</h4>
                      <p className="mt-2 font-mono text-sm leading-relaxed text-slate-100">x̄ = 30 + (20 ÷ 30) ≈ 30,67</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Jadi, rataan nilai yang diperkirakan dari tabel adalah 30,67. Karena nilai setiap siswa di dalam kelas tidak dicantumkan satu per satu, kita menggunakan titik tengah kelas.
                  </p>
                </div>

                <div className="rounded-3xl border border-violet-200/15 bg-violet-200/[.045] p-4 sm:p-5">
                  <h3 className="font-display text-lg font-bold text-violet-100">D. Rataan sementara untuk data berkelompok</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Cara rataan sementara juga bisa dipakai pada data berkelompok. Pilih titik tengah sebagai patokan xₛ, lalu hitung dᵢ = xᵢ − xₛ untuk setiap kelas. Karena tiap titik tengah mewakili beberapa data, simpangannya dikalikan frekuensi.
                  </p>
                  <Formula label="Rataan sementara data berkelompok">x̄ = xₛ + (Σfᵢdᵢ ÷ Σfᵢ), &nbsp; dᵢ = xᵢ − xₛ</Formula>
                  <div className="mt-3 grid gap-2 text-sm leading-relaxed text-slate-300 sm:grid-cols-2">
                    <p><strong className="text-violet-100">xₛ</strong> = rataan sementara yang dipilih.</p>
                    <p><strong className="text-violet-100">xᵢ</strong> = titik tengah kelas ke-i.</p>
                    <p><strong className="text-violet-100">fᵢ</strong> = frekuensi kelas ke-i.</p>
                    <p><strong className="text-violet-100">dᵢ</strong> = simpangan titik tengah terhadap xₛ.</p>
                    <p><strong className="text-violet-100">Σfᵢ</strong> = jumlah seluruh data.</p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Pada tabel Contoh 21, pilih xₛ = 30. Simpangan titik tengahnya berturut-turut −10, −5, 0, 5, 10, dan 15. Setelah dikalikan dengan frekuensi, jumlah fᵢdᵢ = 20.
                  </p>
                  <Formula>x̄ = 30 + (20 ÷ 30) = 30,67</Formula>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Hasilnya sama dengan cara langsung: x̄ = 30,67. Pilih cara yang membuat hitunganmu paling nyaman, ya!
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.05] p-4">
                  <h3 className="mb-3 font-display font-bold text-amber-100">Kapan rataan sangat membantu—dan kapan perlu hati-hati?</h3>
                  <DataTable
                    headers={["Kelebihan rataan", "Hal yang perlu diperhatikan"]}
                    rows={[
                      ["Mudah dihitung.", "Nilai ekstrem (terlalu besar atau terlalu kecil) dapat sangat memengaruhi hasil."],
                      ["Perhitungannya melibatkan seluruh data.", "Lihat juga sebaran datanya sebelum menarik kesimpulan."],
                    ]}
                  />
                </div>

                <Example number={21} title="Mengelompokkan 50 diameter kelereng">
                  <p className="text-sm leading-relaxed text-slate-300">
                    Sebuah bengkel kerajinan mengukur diameter 50 kelereng kaca (dalam mm). Buat distribusi frekuensi dengan interval 14–16, 17–19, 20–22, 23–25, 26–28, 29–31, dan 32–34; lalu tentukan rataan diameter perkiraannya.
                  </p>
                  <DataTable
                    caption="Data diameter 50 kelereng (mm)"
                    headers={Array.from({ length: 10 }, (_, index) => `Data ${index + 1}`)}
                    rows={Array.from({ length: 5 }, (_, row) => marbleDiameters.slice(row * 10, row * 10 + 10))}
                  />
                  <p className="text-sm leading-relaxed text-slate-300">
                    Setelah data mentah dikelompokkan ke interval yang diminta, titik tengah dan hasil kali frekuensinya seperti berikut.
                  </p>
                  <DataTable
                    headers={["Interval (mm)", "Titik tengah (xᵢ)", "Frekuensi (fᵢ)", "fᵢxᵢ"]}
                    rows={marbleClasses
                      .map((label, index) => [
                        label,
                        marbleMidpoints[index],
                        marbleFrequencies[index],
                        marbleMidpoints[index] * marbleFrequencies[index],
                      ])
                      .concat([["Jumlah", "—", 50, marbleTotal]])}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.04] p-4">
                      <h4 className="font-display font-bold text-cyan-100">Cara langsung</h4>
                      <p className="mt-2 font-mono text-sm leading-relaxed text-slate-100">x̄ = {marbleTotal} ÷ 50 = {formatNumber(marbleTotal / 50)} mm</p>
                    </div>
                    <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.04] p-4">
                      <h4 className="font-display font-bold text-violet-100">Cara rataan sementara (xₛ = 24)</h4>
                      <p className="mt-2 font-mono text-sm leading-relaxed text-slate-100">Σfᵢdᵢ = {marbleDeviationTotal}</p>
                      <p className="font-mono text-sm leading-relaxed text-slate-100">x̄ = 24 + ({marbleDeviationTotal} ÷ 50) = {formatNumber(24 + marbleDeviationTotal / 50)} mm</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Kedua cara memberi hasil yang sama. Dengan data berkelompok, rataan ini adalah perkiraan berdasarkan titik tengah interval.
                  </p>
                </Example>

                <Example number={22} title="Menaksir rataan dari sebuah histogram">
                  <p className="text-sm leading-relaxed text-slate-300">
                    Histogram berikut menunjukkan waktu penyelesaian tantangan sains dari 25 tim siswa. Ubah dulu tinggi setiap batang menjadi tabel frekuensi, lalu gunakan titik tengah kelas untuk memperkirakan rataan.
                  </p>
                  <Histogram
                    labels={examIntervals}
                    frequencies={examFrequencies}
                    xAxisLabel="Waktu penyelesaian (menit)"
                    ariaLabel="Histogram waktu penyelesaian tantangan sains oleh 25 tim dalam lima interval; frekuensinya 2, 4, 11, 5, dan 3."
                  />
                  <DataTable
                    headers={["Interval nilai", "Titik tengah (xᵢ)", "Frekuensi (fᵢ)", "fᵢxᵢ"]}
                    rows={examIntervals
                      .map((label, index) => [
                        label,
                        formatNumber(examMidpoints[index], 1),
                        examFrequencies[index],
                        formatNumber(examMidpoints[index] * examFrequencies[index], 1),
                      ])
                      .concat([["Jumlah", "—", 25, formatNumber(examTotal, 1)]])}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.04] p-4">
                      <h4 className="font-display font-bold text-cyan-100">Cara langsung</h4>
                      <p className="mt-2 font-mono text-sm leading-relaxed text-slate-100">x̄ = {formatNumber(examTotal, 1)} ÷ 25 = {formatNumber(examTotal / 25)}.</p>
                    </div>
                    <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.04] p-4">
                      <h4 className="font-display font-bold text-violet-100">Cara rataan sementara (xₛ = 55,5)</h4>
                      <p className="mt-2 font-mono text-sm leading-relaxed text-slate-100">Σfᵢdᵢ = {examDeviationTotal}</p>
                      <p className="font-mono text-sm leading-relaxed text-slate-100">x̄ = 55,5 + (30 ÷ 25) = {formatNumber(55.5 + examDeviationTotal / 25)}.</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Jadi, rataan waktu penyelesaian diperkirakan 56,7 menit. Grafik membantu kita melihat distribusi frekuensi, sedangkan tabel titik tengah membantu menghitung rataan.
                  </p>
                </Example>

                <div className="rounded-3xl border border-amber-200/20 bg-amber-200/[.045] p-4 sm:p-5" data-testid="mean-challenge">
                  <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-amber-200">Soal pendalaman · Rataan</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-white">Ayo hitung rataan berat tas!</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Berat tas siswa di sebuah kelas dicatat dalam kelompok berikut. Rataan berat tas yang paling tepat adalah ….
                  </p>
                  <DataTable
                    headers={["Berat tas (kg)", ...bagWeightIntervals, "Jumlah"]}
                    rows={[
                      ["Frekuensi", ...bagWeightFrequencies, bagWeightFrequencies.reduce((sum, frequency) => sum + frequency, 0)],
                    ]}
                  />
                  <p className="text-sm leading-relaxed text-slate-300">
                    Pilihan: A. 6,83 kg &nbsp; B. 7,00 kg &nbsp; C. 7,33 kg &nbsp; D. 7,50 kg &nbsp; E. 8,00 kg
                  </p>
                  <p className="rounded-xl border border-emerald-200/15 bg-emerald-200/[.04] p-3 text-sm leading-relaxed text-emerald-50">
                    <strong>Jawaban: C.</strong> Titik tengah kelasnya 3,5; 5,5; 7,5; 9,5; dan 11,5. Maka Σfᵢxᵢ = {formatNumber(bagWeightTotal, 1)} dan n = 36, sehingga x̄ = {formatNumber(bagWeightTotal, 1)} ÷ 36 ≈ 7,33 kg.
                  </p>
                </div>
              </div>
            </section>

            <section id="modus" className="scroll-mt-8 space-y-5">
              <SectionHeading
                number="2.3.2"
                title="Modus"
                intro="Kalau ingin tahu nilai atau kategori yang paling sering muncul, carilah modus. Mari telusuri baik data mentah maupun data berkelompok!"
              />
              <div className="space-y-4">
                <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
                  <p className="text-sm leading-relaxed text-slate-300">
                    <strong className="text-cyan-100">Modus</strong> adalah nilai (ukuran) yang paling banyak muncul atau mempunyai frekuensi tertinggi.
                  </p>
                  <h3 className="mt-4 font-display text-lg font-bold text-cyan-100">A. Modus data tunggal</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Untuk data tunggal, hitung kemunculan setiap nilai lalu pilih nilai dengan frekuensi paling tinggi. Jika dua atau lebih nilai sama-sama paling sering muncul, semuanya menjadi modus.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Data yang memiliki satu modus disebut <strong className="text-cyan-100">unimodal</strong>; dua modus disebut <strong className="text-cyan-100">bimodal</strong>; dan lebih dari dua modus disebut <strong className="text-cyan-100">multimodal</strong>.
                  </p>
                </div>

                <Example number={23} title="Menentukan modus dari dua kumpulan data">
                  <p className="text-sm leading-relaxed text-slate-300">Tentukan modus dari kumpulan nilai berikut.</p>
                  <DataTable
                    headers={["Kumpulan", "Nilai", "Modus"]}
                    rows={[
                      ["a", "4, 6, 5, 4, 7, 6, 4, 8, 5, 4", "4 (muncul 4 kali)"],
                      ["b", "3, 8, 5, 8, 6, 3, 8, 5, 3, 2", "3 dan 8 (masing-masing muncul 3 kali)"],
                    ]}
                  />
                  <p className="text-sm leading-relaxed text-slate-300">
                    Pada kumpulan (a), nilai 4 paling sering muncul. Pada kumpulan (b), nilai 3 dan 8 sama-sama memiliki frekuensi tertinggi, jadi data itu mempunyai dua modus.
                  </p>
                </Example>

                <div className="rounded-3xl border border-violet-200/15 bg-violet-200/[.045] p-4 sm:p-5">
                  <h3 className="font-display text-lg font-bold text-violet-100">B. Modus data berkelompok</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Untuk data berkelompok, tentukan dahulu kelas dengan frekuensi paling tinggi. Kelas itu disebut kelas modus. Modus diperkirakan dengan rumus berikut.
                  </p>
                  <Formula label="Rumus modus data berkelompok">Mo = L + c × (d₁ ÷ (d₁ + d₂))</Formula>
                  <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                    <p><strong className="text-violet-100">L</strong> = tepi bawah kelas modus.</p>
                    <p><strong className="text-violet-100">d₁</strong> = frekuensi kelas modus dikurangi frekuensi kelas sebelumnya.</p>
                    <p><strong className="text-violet-100">d₂</strong> = frekuensi kelas modus dikurangi frekuensi kelas sesudahnya.</p>
                    <p><strong className="text-violet-100">c</strong> = panjang atau lebar kelas.</p>
                  </div>
                </div>

                <Example number={24} title="Modus dari tabel distribusi frekuensi">
                  <p className="text-sm leading-relaxed text-slate-300">
                    Tabel berikut merangkum rentang waktu perjalanan 36 peserta menuju lokasi kegiatan. Tentukan kelas modus dan taksiran modusnya.
                  </p>
                  <DataTable
                    headers={["Interval waktu (menit)", ...modeGroupedIntervals, "Jumlah"]}
                    rows={[
                      ["Frekuensi", ...modeGroupedFrequencies, modeGroupedFrequencies.reduce((sum, frequency) => sum + frequency, 0)],
                    ]}
                  />
                  <p className="text-sm leading-relaxed text-slate-300">
                    Frekuensi terbesar adalah 11, sehingga kelas modusnya 41–45. Tepi bawah kelas itu L = 40,5; panjang kelas c = 5; d₁ = 11 − 7 = 4; dan d₂ = 11 − 8 = 3.
                  </p>
                  <Formula>Mo = 40,5 + 5 × (4 ÷ (4 + 3)) ≈ 43,36 menit</Formula>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Jadi, modus waktu perjalanan diperkirakan 43,36 menit. Karena data sudah dikelompokkan, hasil ini merupakan taksiran di dalam kelas modus.
                  </p>
                </Example>

                <div className="rounded-3xl border border-amber-200/20 bg-amber-200/[.045] p-4 sm:p-5" data-testid="mode-challenge">
                  <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-amber-200">Soal pendalaman · Modus</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-white">Taksir waktu perjalanan yang paling umum</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Catatan waktu perjalanan siswa menuju sekolah dikelompokkan seperti berikut. Berapakah taksiran modusnya?
                  </p>
                  <DataTable
                    headers={["Waktu (menit)", ...commuteIntervals, "Jumlah"]}
                    rows={[
                      ["Frekuensi", ...commuteFrequencies, commuteTotal],
                    ]}
                  />
                  <p className="text-sm leading-relaxed text-slate-300">
                    Pilihan: A. 22,50 menit &nbsp; B. 22,75 menit &nbsp; C. 23,25 menit &nbsp; D. 24,00 menit &nbsp; E. 24,75 menit
                  </p>
                  <p className="rounded-xl border border-emerald-200/15 bg-emerald-200/[.04] p-3 text-sm leading-relaxed text-emerald-50">
                    <strong>Jawaban: C.</strong> Kelas modus adalah 20–24, sehingga L = 19,5; c = 5; d₁ = 11 − 5 = 6; dan d₂ = 11 − 9 = 2. Jadi, Mo = 19,5 + 5 × (6 ÷ 8) = 23,25 menit.
                  </p>
                </div>

                <Example number={25} title="Menaksir modus dari histogram">
                  <p className="text-sm leading-relaxed text-slate-300">
                    Histogram di bawah menampilkan waktu (menit) yang dibutuhkan 70 siswa untuk menyelesaikan tantangan. Gunakan batang tertinggi untuk menentukan kelas modus.
                  </p>
                  <Histogram
                    labels={modeHistogramIntervals}
                    frequencies={modeHistogramFrequencies}
                    xAxisLabel="Waktu menyelesaikan tantangan (menit)"
                    ariaLabel="Histogram waktu 70 siswa dalam enam interval; frekuensinya 4, 9, 14, 20, 16, dan 7."
                  />
                  <p className="text-sm leading-relaxed text-slate-300">
                    Batang tertinggi berada di kelas 40–44, jadi itulah kelas modus. Tepi bawahnya L = 39,5; c = 5; d₁ = 20 − 14 = 6; dan d₂ = 20 − 16 = 4.
                  </p>
                  <Formula>Mo = 39,5 + 5 × (6 ÷ (6 + 4)) = 42,5 menit</Formula>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Jadi, modus waktu penyelesaian tantangan diperkirakan 42,5 menit.
                  </p>
                </Example>

                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.05] p-4">
                  <h3 className="mb-3 font-display font-bold text-amber-100">Kelebihan dan hal yang perlu diperhatikan dari modus</h3>
                  <DataTable
                    caption="Tabel 2.12 · Kelebihan dan kekurangan modus"
                    headers={["Kelebihan", "Hal yang perlu diperhatikan"]}
                    rows={[
                      ["Menunjukkan nilai atau kategori yang paling sering berulang.", "Data bisa mempunyai lebih dari satu modus."],
                      ["Mudah ditentukan tanpa perhitungan rumit.", "Tidak semua data memiliki satu nilai yang paling sering muncul."],
                    ]}
                  />
                </div>
              </div>
            </section>

          </div>

          <aside className="hidden lg:block" aria-label="Daftar bagian materi">
            <div className="sticky top-6 rounded-2xl border border-white/10 bg-[#0d1728]/90 p-4 backdrop-blur">
              <p className="mb-4 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-400">Peta materi</p>
              <ol className="space-y-3 font-body text-xs text-slate-300">
                {lessonOutline.map(([label, target], index) => (
                  <li key={target}>
                    <a
                      href={`#${target}`}
                      className="flex items-center gap-2 rounded-md transition-colors hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
                    >
                      <span className="grid h-5 w-5 place-items-center rounded-md bg-white/[.06] text-[10px] font-bold text-cyan-100/80">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SmaStatistikaUkuranPemusatanDataPage;
