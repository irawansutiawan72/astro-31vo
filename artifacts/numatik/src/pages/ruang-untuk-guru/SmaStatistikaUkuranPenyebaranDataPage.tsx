import { useState, type ReactNode } from "react";
import { BookOpen, Sparkles } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

type Row = ReactNode[];
const fmt = (n: number, digits = 2) =>
  n.toLocaleString("id-ID", { maximumFractionDigits: digits, minimumFractionDigits: 0 });

function Table({ headers, rows, caption }: { headers: ReactNode[]; rows: Row[]; caption?: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-max border-collapse text-left text-xs sm:text-sm">
        {caption && <caption className="px-3 py-2 text-left font-bold text-cyan-100">{caption}</caption>}
        <thead><tr className="bg-cyan-300/[.1] text-cyan-50">{headers.map((h, i) => <th key={i} scope="col" className="border-b border-white/10 px-3 py-2 font-bold">{h}</th>)}</tr></thead>
        <tbody>{rows.map((row, i) => <tr key={i} className={i % 2 ? "bg-white/[.015]" : "bg-white/[.035]"}>{row.map((cell, j) => <td key={j} className="border-b border-white/[.06] px-3 py-2 text-slate-200">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Heading({ n, title, intro }: { n: string; title: string; intro: string }) {
  return <div className="mb-5 flex gap-4"><span className="grid h-10 min-w-10 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] px-2 font-mono text-xs font-black text-cyan-100">{n}</span><div><h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2><p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-slate-300">{intro}</p></div></div>;
}

function Example({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return <article data-testid={`example-${n}`} className="overflow-hidden rounded-3xl border border-orange-200/20 bg-[linear-gradient(140deg,rgba(106,45,35,.16),rgba(14,25,42,.92)_48%)]"><header className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-300/15 text-orange-200"><BookOpen className="h-4 w-4" aria-hidden="true" /></span><div><p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">Contoh {n}</p><h3 className="font-display text-base font-bold text-white sm:text-lg">{title}</h3></div></header><div className="space-y-4 p-4 sm:p-5">{children}</div></article>;
}

function Formula({ children, label }: { children: ReactNode; label?: string }) {
  return <div className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/90 px-4 py-4 text-center">{label && <p className="mb-2 text-left font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/55">{label}</p>}<div className="whitespace-nowrap font-mono text-sm font-semibold leading-relaxed text-cyan-100 sm:text-base">{children}</div></div>;
}

function ComparisonPlot() {
  const A = [8, 12, 15, 16, 16, 18, 20];
  const B = [1, 5, 10, 16, 19, 27, 34];
  const x = (v: number) => 55 + (v / 36) * 620;
  const rowY = (row: number, i: number) => row === 0 ? 74 + (i % 2) * 16 : 164 + (i % 2) * 16;
  return <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/75 p-2 sm:p-3">
    <svg viewBox="0 0 720 238" role="img" aria-label="Plot titik dua kelompok dengan median sama-sama 16. Kelompok A berjangkan 12, kelompok B berjangkan 33." className="h-auto min-w-[520px] w-full">
      <title>Median sama, penyebaran berbeda</title>
      {[0, 10, 20, 30].map(v => <g key={v}><line x1={x(v)} x2={x(v)} y1="34" y2="202" stroke="#b7c9d7" strokeOpacity=".16" strokeDasharray="3 5" /><text x={x(v)} y="222" fill="#cbd5e1" fontSize="11" textAnchor="middle">{v}</text></g>)}
      <text x="14" y="88" fill="#7de2d5" fontSize="13" fontWeight="700">A</text><text x="14" y="178" fill="#ffbd84" fontSize="13" fontWeight="700">B</text>
      {[A, B].map((values, row) => {
        const min = values[0], max = values[values.length - 1];
        return <g key={row}>
          <line x1={x(min)} x2={x(max)} y1={rowY(row, 0) + 8} y2={rowY(row, 0) + 8} stroke={row === 0 ? "#72dbcb" : "#f4a47b"} strokeWidth="3" strokeLinecap="round" opacity=".8"/>
          {values.map((v, i) => <circle key={`${row}-${i}`} cx={x(v)} cy={rowY(row, i)} r="5.5" fill={row === 0 ? "#72dbcb" : "#f4a47b"} stroke="#071326" strokeWidth="2" />)}
          <text x="690" y={rowY(row, 0) + 12} textAnchor="end" fill="#dbe6ef" fontSize="11">J = {max - min}</text>
        </g>;
      })}
      <line x1={x(16)} x2={x(16)} y1="43" y2="189" stroke="#ffd16f" strokeWidth="2" strokeDasharray="5 5" />
      <text x={x(16)} y="25" textAnchor="middle" fill="#ffd16f" fontSize="11" fontWeight="700">Median keduanya = 16</text>
      <text x="365" y="236" fill="#cbd5e1" fontSize="10" textAnchor="middle">Nilai data</text>
    </svg>
  </div>;
}

function RangePlayground() {
  const [maximum, setMaximum] = useState(20);
  const min = 8, range = maximum - min;
  const left = 54, right = 654, y = 88;
  const px = (v: number) => left + (v / 40) * (right - left);
  return <section className="range-playground space-y-4 rounded-3xl border border-violet-200/20 bg-[linear-gradient(135deg,rgba(74,54,112,.24),rgba(9,24,44,.82))] p-4 sm:p-6" aria-labelledby="range-lab-title">
    <style>{`@media (prefers-reduced-motion: reduce) { .range-playground .range-span, .range-playground .range-dot { transition: none !important; } }`}</style>
    <div><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-violet-200">Laboratorium mini · geser titik maksimum</p><h3 id="range-lab-title" className="mt-1 font-display text-xl font-bold text-white">Rasakan jangkauan berubah</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Titik minimum tetap 8. Geser skor maksimum untuk melihat rentang data ikut memanjang atau memendek.</p></div>
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/70 p-2">
      <svg viewBox="0 0 700 145" role="img" aria-label={`Visualisasi garis bilangan dari minimum 8 sampai maksimum ${maximum}. Jangkauan ${range}.`} className="h-auto min-w-[470px] w-full">
        <title>Visual jangkauan skor yang dapat diubah</title>
        {[0,10,20,30,40].map(v=><g key={v}><line x1={px(v)} x2={px(v)} y1="46" y2="112" stroke="#c4d4e1" strokeOpacity=".2"/><text x={px(v)} y="132" fill="#cbd5e1" fontSize="11" textAnchor="middle">{v}</text></g>)}
        <line x1={left} x2={right} y1={y} y2={y} stroke="#496273" strokeWidth="3" strokeLinecap="round"/>
        <rect className="range-span" x={px(min)} y={y - 4} width={px(maximum) - px(min)} height="8" rx="4" fill="#74dfd0" style={{ transition: "x 260ms ease, width 260ms ease" }} />
        <circle cx={px(min)} cy={y} r="8" fill="#ffd16f" stroke="#071326" strokeWidth="3"/>
        <circle className="range-dot" cx={px(maximum)} cy={y} r="9" fill="#ff9d7b" stroke="#071326" strokeWidth="3" style={{ transition: "cx 260ms ease" }} />
        <text x={px(min)} y="35" fill="#ffe7a3" fontSize="12" fontWeight="700" textAnchor="middle">Min 8</text>
        <text x={px(maximum)} y="35" fill="#ffc0a9" fontSize="12" fontWeight="700" textAnchor="middle">Maks {maximum}</text>
      </svg>
    </div>
    <label htmlFor="maximum-score" className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-200"><span>Maksimum skor</span><output data-testid="range-maximum" className="rounded-lg border border-violet-100/20 bg-violet-100/10 px-3 py-1 font-mono text-violet-100">{maximum}</output></label>
    <input id="maximum-score" data-testid="input-maximum-score" type="range" min="12" max="40" step="1" value={maximum} aria-label="Ubah maksimum skor untuk melihat jangkauan" onChange={(event) => setMaximum(Number(event.target.value))} className="w-full accent-cyan-300" />
    <p aria-live="polite" data-testid="range-calculation" className="rounded-xl border border-cyan-200/15 bg-cyan-200/[.05] p-3 font-mono text-sm text-cyan-100">J = xₙ − x₁ = {maximum} − {min} = <strong data-testid="range-result">{range}</strong></p>
  </section>;
}

const outline = [
  ["Jangkauan", "jangkauan"], ["Hamparan & kuartil", "hamparan"], ["Simpangan rata-rata", "simpangan-rata-rata"], ["Ragam & baku", "ragam-baku"],
];

export default function SmaStatistikaUkuranPenyebaranDataPage() {
  const ex39Rows = [
    ["11–15",13,14,2,28],["16–20",18,9,4,36],["21–25",23,4,6,24],
    ["26–30",28,1,8,8],["31–35",33,6,6,36],["36–40",38,11,4,44],
    ["Jumlah","—","—",30,176],
  ];
  const ex42Rows = [
    ["41–45",43,-12.5,156.25,2,312.5],["46–50",48,-7.5,56.25,4,225],
    ["51–55",53,-2.5,6.25,6,37.5],["56–60",58,2.5,6.25,6,37.5],
    ["61–65",63,7.5,56.25,4,225],["66–70",68,12.5,156.25,2,312.5],
    ["Jumlah","—","—","—",24,1150],
  ];
  return <div className="animation-submaterial-route relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
    <Starfield />
    <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/statistika/ukuran-letak-data" />
    <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
      <header className="relative mb-8 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.96),rgba(16,22,43,.95)_60%,rgba(75,36,43,.76))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10" data-testid="lesson-hero">
        <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-cyan-100/10"/><div className="relative max-w-4xl">
          <div className="mb-5 flex flex-wrap gap-2"><span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Ruang untuk Guru · SMA</span><span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">Buku Animasi Matematika · Statistika</span></div>
          <div className="mb-3 flex items-center gap-2 text-amber-200"><Sparkles className="h-4 w-4" aria-hidden="true"/><p className="font-body text-xs font-bold uppercase tracking-[.24em]">Data bukan cuma pusatnya—lihat sebarannya!</p></div>
          <p className="mb-2 font-mono text-xs font-bold tracking-[.22em] text-cyan-100">BAB 2.5</p>
          <h1 className="font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="lesson-title">Ukuran Penyebaran <span className="text-cyan-200">Data</span></h1>
          <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">Median memberi tahu titik tengah. Tapi seberapa jauh nilai-nilai menyebar? Kita akan mengukur rentang, jarak kuartil, simpangan, ragam, dan simpangan baku—dengan contoh yang bisa dihitung langkah demi langkah.</p>
          <div className="mt-6 flex flex-wrap gap-2">{["Jangkauan", "Kuartil", "Simpangan rata-rata", "Ragam", "Simpangan baku"].map(t=><span key={t} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs font-semibold text-slate-200">{t}</span>)}</div>
        </div>
      </header>
      <nav className="mb-8 flex gap-2 overflow-x-auto pb-2 lg:hidden" aria-label="Peta materi" data-testid="lesson-map-mobile">{outline.map(([label,id])=><a key={id} href={`#${id}`} className="shrink-0 rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-xs text-slate-200 hover:border-cyan-200/40 hover:text-cyan-100">{label}</a>)}</nav>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_245px]"><div className="min-w-0 space-y-12">
        <section id="jangkauan" className="scroll-mt-8 space-y-5">
          <Heading n="2.5" title="Saat median sama, apakah sebarannya sama?" intro="Ukuran penyebaran memberi gambaran seberapa rapat atau renggang data. Dua kelompok bisa punya median identik, tetapi nilai-nilai di sekitarnya menempati rentang yang sangat berbeda."/>
          <div className="space-y-4 rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
            <p className="text-sm leading-relaxed text-slate-300">Bayangkan dua klub sains mencatat poin pada tantangan mingguan. Kelompok A: <span className="font-mono text-cyan-100">8, 12, 15, 16, 16, 18, 20</span>. Kelompok B: <span className="font-mono text-orange-100">1, 5, 10, 16, 19, 27, 34</span>. Keduanya memiliki median 16, tetapi poin kelompok B jauh lebih menyebar.</p>
            <ComparisonPlot/>
            <p className="rounded-2xl border border-amber-200/15 bg-amber-200/[.04] p-4 text-sm leading-relaxed text-amber-50">Median yang sama <strong>tidak</strong> berarti penyebaran sama. Jangkauan A = 20 − 8 = 12, sedangkan jangkauan B = 34 − 1 = 33. Ukuran penyebaran melengkapi cerita yang belum tampak dari satu nilai pusat.</p>
            <RangePlayground/>
            <div className="rounded-2xl border border-cyan-200/15 bg-[#071326]/65 p-4">
              <p className="text-sm leading-relaxed text-slate-300">Kelima nilai yang membantu merangkum posisi data disebut <strong className="text-cyan-100">statistik lima serangkai</strong>: nilai minimum, kuartil bawah, median, kuartil atas, dan nilai maksimum.</p>
              <div className="mt-3"><Formula label="Statistik lima serangkai">x₁ (minimum) — Q₁ — Q₂ (median) — Q₃ — xₙ (maksimum)</Formula></div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">Jika data sudah diurutkan, x₁ adalah data terkecil dan xₙ data terbesar. Q₁, Q₂, dan Q₃ berturut-turut adalah kuartil bawah, kuartil tengah (median), dan kuartil atas.</p>
            </div>
          </div>
          <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
            <h3 className="font-display text-lg font-bold text-cyan-100">A. Jangkauan data (J)</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">Jangkauan adalah selisih antara statistik maksimum dan statistik minimum. Jika data terurut ditulis x₁, x₂, …, xₙ, maka x₁ adalah nilai terkecil dan xₙ nilai terbesar.</p>
            <div className="mt-4"><Formula label="Jangkauan">J = xₙ − x₁ = nilai terbesar − nilai terkecil</Formula></div>
            <div className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-2"><p><strong className="text-cyan-100">J</strong> = jangkauan data.</p><p><strong className="text-cyan-100">xₙ</strong> = nilai maksimum.</p><p><strong className="text-cyan-100">x₁</strong> = nilai minimum.</p><p>Jangkauan cepat dihitung dan hanya memerlukan nilai terkecil serta terbesar.</p></div>
            <p className="mt-3 text-sm leading-relaxed text-amber-100">Catatan penting: karena hanya memakai dua nilai ujung, jangkauan mudah berubah jika ada pencilan atau nilai ekstrem.</p>
          </div>
          <Example n={36} title="Jangkauan, hamparan, dan simpangan kuartil">
            <p className="text-sm leading-relaxed text-slate-300">Urutkan catatan waktu (detik) peserta lomba susun puzzle: 32, 34, 35, 36, 37, 38, 40, 42, 44, 45, 46, 48, 49, 51, 53, 55. Tentukan minimum, maksimum, kuartil, jangkauan, hamparan, dan simpangan kuartil.</p>
            <p className="text-sm leading-relaxed text-slate-300">Ada 16 data. Bagi data menjadi dua bagian sama banyak. Bagian bawah adalah 32, 34, 35, 36, 37, 38, 40, 42; bagian atas 44, 45, 46, 48, 49, 51, 53, 55.</p>
            <div className="space-y-2 rounded-2xl border border-orange-200/15 bg-black/15 p-4 font-mono text-xs leading-relaxed text-slate-100 sm:text-sm">
              <p>x₁ = minimum = 32; &nbsp; xₙ = maksimum = 55</p><p>Q₁ = median separuh bawah = (36 + 37) ÷ 2 = 36,5</p><p>Median = (42 + 44) ÷ 2 = 43</p><p>Q₃ = median separuh atas = (48 + 49) ÷ 2 = 48,5</p><p>J = xₙ − x₁ = 55 − 32 = <strong className="text-cyan-100">23</strong></p><p>H = Q₃ − Q₁ = 48,5 − 36,5 = <strong className="text-cyan-100">12</strong></p><p>Qd = ½H = ½ × 12 = <strong className="text-cyan-100">6</strong></p>
            </div>
          </Example>
        </section>

        <section id="hamparan" className="scroll-mt-8 space-y-5">
          <Heading n="B–C" title="Hamparan dan simpangan kuartil" intro="Jangkauan menoleh ke kedua ujung. Untuk melihat lebar bagian tengah tanpa terlalu dipengaruhi nilai ekstrem, kita pakai kuartil."/>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-violet-200/15 bg-violet-200/[.045] p-4 sm:p-5"><h3 className="font-display text-lg font-bold text-violet-100">B. Jangkauan antarkuartil / hamparan</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Hamparan H adalah selisih kuartil atas dan kuartil bawah. Nilainya merentang di antara Q₁ dan Q₃, yaitu wilayah yang memuat 50% data bagian tengah. Karena tidak memakai nilai minimum dan maksimum, hamparan mengabaikan kedua ujung ekstrem.</p><div className="mt-4"><Formula>H = Q₃ − Q₁</Formula></div><ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-300"><li>Lebih tidak peka terhadap nilai ekstrem dibanding jangkauan.</li><li>Perhitungannya hanya melibatkan Q₁ dan Q₃.</li></ul></div>
            <div className="rounded-3xl border border-orange-200/15 bg-orange-200/[.04] p-4 sm:p-5"><h3 className="font-display text-lg font-bold text-orange-100">C. Simpangan kuartil</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Simpangan kuartil Qd adalah setengah selisih antara kuartil atas dan kuartil bawah. Dengan kata lain, Qd merupakan separuh hamparan.</p><div className="mt-4"><Formula>Qd = ½(Q₃ − Q₁) = ½H</Formula></div><p className="mt-3 text-sm leading-relaxed text-slate-300">Pada Contoh 36, separuh hamparan 12 adalah Qd = 6.</p></div>
          </div>
          <Example n={37} title="Membaca ringkasan lengkap dari 15 data">
            <p className="text-sm leading-relaxed text-slate-300">Nilai proyek desain poster: 18, 22, 22, 25, 27, 29, 30, 32, 34, 34, 37, 40, 42, 46, 50. Tentukan minimum, maksimum, kuartil bawah, median, kuartil atas, modus, jangkauan, hamparan, dan simpangan kuartil.</p>
            <p className="text-sm leading-relaxed text-slate-300">Data sudah terurut. Karena n = 15, median adalah data ke-8. Untuk Q₁, ambil separuh bawah tanpa median; untuk Q₃, ambil separuh atas tanpa median.</p>
            <div className="rounded-2xl border border-orange-200/15 bg-black/15 p-4 font-mono text-xs leading-loose text-slate-100 sm:text-sm">
              <p>Separuh bawah: 18, 22, 22, 25, 27, 29, 30 → nilai tengah Q₁ = <strong>25</strong></p>
              <p>Median = data ke-8 = <strong>32</strong></p><p>Separuh atas: 34, 34, 37, 40, 42, 46, 50 → nilai tengah Q₃ = <strong>40</strong></p>
              <p>Minimum = 18; maksimum = 50.</p><p>Modus = 22 dan 34 (keduanya muncul dua kali), jadi data bimodal.</p>
              <p>J = 50 − 18 = <strong>32</strong></p><p>H = 40 − 25 = <strong>15</strong></p><p>Qd = ½(40 − 25) = <strong>7,5</strong></p>
            </div>
          </Example>
        </section>

        <section id="simpangan-rata-rata" className="scroll-mt-8 space-y-5">
          <Heading n="2.5.2" title="Simpangan: jarak tiap nilai dari rataan" intro="Ukuran simpangan mempertimbangkan jarak setiap data terhadap rataan. Kita mulai dengan jarak mutlak, lalu memberi jarak itu bobot kuadrat."/>
          <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
            <h3 className="font-display text-lg font-bold text-cyan-100">A. Simpangan rata-rata (Sᵣ)</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">Simpangan rata-rata untuk data tunggal adalah rata-rata dari semua jarak data ke rataan. Tanda mutlak membuat jarak selalu tidak negatif, baik nilai berada di bawah maupun di atas rataan.</p>
            <div className="mt-4"><Formula label="Data tunggal">Sᵣ = Σ|xᵢ − x̄| ÷ n</Formula></div>
            <div className="mt-3 grid gap-2 text-sm leading-relaxed text-slate-300 sm:grid-cols-2"><p><strong className="text-cyan-100">xᵢ</strong> = data ke-i.</p><p><strong className="text-cyan-100">x̄</strong> = rataan (mean).</p><p><strong className="text-cyan-100">n</strong> = ukuran atau banyak data.</p><p><strong className="text-cyan-100">|xᵢ − x̄|</strong> = jarak mutlak data ke rataan.</p></div>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">Jika data dikelompokkan, gunakan titik tengah setiap interval dan kalikan jarak mutlaknya dengan frekuensi:</p>
            <div className="mt-3"><Formula label="Data berkelompok">Sᵣ = Σ fᵢ|xᵢ − x̄| ÷ Σfᵢ</Formula></div>
            <p className="mt-3 text-sm text-slate-300"><strong className="text-cyan-100">xᵢ</strong> adalah titik tengah kelas ke-i, <strong className="text-cyan-100">fᵢ</strong> frekuensinya, dan <strong className="text-cyan-100">x̄</strong> rataan.</p>
          </div>
          <Example n={38} title="Ragam waktu membaca harian">
            <p className="text-sm leading-relaxed text-slate-300">Delapan siswa membaca selama 2, 3, 4, 4, 5, 6, 7, dan 9 menit pada sesi pagi. Berapa simpangan rata-ratanya?</p>
            <div className="rounded-2xl border border-orange-200/15 bg-black/15 p-4 font-mono text-xs leading-loose text-slate-100 sm:text-sm"><p>x̄ = (2 + 3 + 4 + 4 + 5 + 6 + 7 + 9) ÷ 8 = 40 ÷ 8 = 5 menit</p><p>Σ|xᵢ − x̄| = |2−5| + |3−5| + |4−5| + |4−5| + |5−5| + |6−5| + |7−5| + |9−5|</p><p>= 3 + 2 + 1 + 1 + 0 + 1 + 2 + 4 = 14</p><p>Sᵣ = 14 ÷ 8 = <strong className="text-cyan-100">1,75 menit</strong></p></div>
            <p className="text-sm text-slate-300">Jadi, jarak mutlak waktu membaca dari rataan 5 menit rata-rata adalah 1,75 menit.</p>
          </Example>
          <Example n={39} title="Simpangan rata-rata data berkelompok">
            <p className="text-sm leading-relaxed text-slate-300">Data durasi latihan musik diringkas pada tabel berikut. Titik tengah kelas membantu mewakili nilai dalam setiap interval. Rataan sudah dihitung: x̄ = 810 ÷ 30 = 27.</p>
            <Table caption="Perhitungan simpangan rata-rata" headers={["Interval","Titik tengah xᵢ","|xᵢ − x̄|","fᵢ","fᵢ|xᵢ − x̄|"]} rows={ex39Rows}/>
            <div className="rounded-2xl border border-orange-200/15 bg-black/15 p-4 font-mono text-xs leading-relaxed text-slate-100 sm:text-sm"><p>n = Σfᵢ = 30; &nbsp; Σfᵢxᵢ = 810; &nbsp; x̄ = 810/30 = 27</p><p>Sᵣ = Σfᵢ|xᵢ − x̄| ÷ Σfᵢ = 176 ÷ 30 ≈ <strong className="text-cyan-100">5,87</strong></p></div>
            <p className="text-sm leading-relaxed text-slate-300">Artinya, titik tengah kelas dalam ringkasan ini berjarak mutlak rata-rata sekitar 5,87 satuan dari rataan 27.</p>
          </Example>
        </section>

        <section id="ragam-baku" className="scroll-mt-8 space-y-5">
          <Heading n="B–C" title="Ragam dan simpangan baku" intro="Ragam mengkuadratkan simpangan agar arah positif dan negatif tidak saling meniadakan. Akar ragam mengembalikan ukuran ke satuan data semula."/>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-violet-200/15 bg-violet-200/[.045] p-4 sm:p-5"><h3 className="font-display text-lg font-bold text-violet-100">B. Ragam (varians)</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Untuk data tunggal, ragam σ² adalah rata-rata kuadrat simpangan setiap nilai terhadap rataan. Rumus yang setara dapat diperoleh dari rata-rata kuadrat data dikurangi kuadrat rata-rata.</p><div className="mt-4 space-y-3"><Formula>σ² = Σ(xᵢ − x̄)² ÷ n</Formula><Formula>σ² = (Σxᵢ² ÷ n) − (Σxᵢ ÷ n)²</Formula></div><p className="mt-3 text-sm leading-relaxed text-slate-300"><strong className="text-violet-100">xᵢ</strong> = data ke-i; <strong className="text-violet-100">x̄</strong> = mean; <strong className="text-violet-100">n</strong> = ukuran data.</p><p className="mt-3 text-sm text-slate-300">Untuk data berkelompok:</p><div className="mt-2"><Formula>σ² = Σfᵢ(xᵢ − x̄)² ÷ Σfᵢ</Formula></div><p className="mt-3 text-sm leading-relaxed text-slate-300">xᵢ = titik tengah kelas ke-i; x̄ = rataan; fᵢ = frekuensi kelas ke-i; Σfᵢ = jumlah seluruh frekuensi.</p></div>
            <div className="rounded-3xl border border-orange-200/15 bg-orange-200/[.04] p-4 sm:p-5"><h3 className="font-display text-lg font-bold text-orange-100">C. Simpangan baku (standar deviasi)</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Simpangan baku σ adalah akar kuadrat dari ragam. Ukurannya kembali ke satuan yang sama dengan data, sehingga mudah ditafsirkan sebagai besar penyimpangan.</p><div className="mt-4 space-y-3"><Formula>σ = √[Σ(xᵢ − x̄)² ÷ n]</Formula><Formula>σ = √[(Σxᵢ² ÷ n) − (Σxᵢ ÷ n)²]</Formula></div><p className="mt-3 text-sm leading-relaxed text-slate-300">Jadi, simpangan baku adalah akar ragam: <strong className="text-orange-100">σ = √σ²</strong>. Pada data berkelompok, titik tengah dan frekuensi digunakan bersama:</p><div className="mt-3"><Formula>σ = √[Σfᵢ(xᵢ − x̄)² ÷ Σfᵢ]</Formula></div><p className="mt-3 text-sm text-slate-300">xᵢ = titik tengah kelas; x̄ = rataan; fᵢ = frekuensi; Σfᵢ = total frekuensi.</p></div>
          </div>
          <Example n={40} title="Menghitung ragam dengan dua rumus setara">
            <p className="text-sm leading-relaxed text-slate-300">Nilai enam rancangan prototipe adalah 3, 4, 5, 6, 7, 5. Tentukan ragam data.</p>
            <div className="rounded-2xl border border-orange-200/15 bg-black/15 p-4 font-mono text-xs leading-loose text-slate-100 sm:text-sm"><p>x̄ = (3 + 4 + 5 + 6 + 7 + 5) ÷ 6 = 30 ÷ 6 = 5</p><p>Σ(xᵢ − x̄)² = (3−5)² + (4−5)² + (5−5)² + (6−5)² + (7−5)² + (5−5)²</p><p>= 4 + 1 + 0 + 1 + 4 + 0 = 10</p><p>σ² = 10 ÷ 6 = 5/3 ≈ <strong className="text-cyan-100">1,67</strong></p><p className="pt-2">Pakai bentuk setara: Σxᵢ² = 160, sehingga σ² = (160/6) − 5² = 160/6 − 25 = 5/3 ≈ <strong className="text-cyan-100">1,67</strong>.</p></div>
            <p className="text-sm text-slate-300">Kedua cara menghasilkan ragam yang sama.</p>
          </Example>
          <Example n={41} title="Dari ragam ke simpangan baku">
            <p className="text-sm leading-relaxed text-slate-300">Gunakan kembali data prototipe Contoh 40: 3, 4, 5, 6, 7, 5. Kita sudah memperoleh mean 5 dan jumlah kuadrat simpangan 10.</p>
            <div className="rounded-2xl border border-orange-200/15 bg-black/15 p-4 font-mono text-sm leading-loose text-slate-100"><p>x̄ = 5</p><p>σ = √(10/6) = √(5/3) ≈ <strong className="text-cyan-100">1,29</strong></p></div>
            <p className="text-sm leading-relaxed text-slate-300">Simpangan baku kumpulan nilai tersebut sekitar 1,29 poin.</p>
          </Example>
          <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5"><h3 className="font-display text-lg font-bold text-cyan-100">Simpangan baku untuk data berkelompok</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Gunakan titik tengah setiap kelas sebagai xᵢ, lalu timbang kuadrat simpangannya dengan frekuensi kelas.</p><div className="mt-4"><Formula>σ = √[Σfᵢ(xᵢ − x̄)² ÷ Σfᵢ]</Formula></div><p className="mt-3 text-sm leading-relaxed text-slate-300"><strong className="text-cyan-100">xᵢ</strong> = titik tengah kelas ke-i; <strong className="text-cyan-100">x̄</strong> = rataan; <strong className="text-cyan-100">fᵢ</strong> = frekuensi kelas ke-i; <strong className="text-cyan-100">Σfᵢ</strong> = jumlah frekuensi seluruh kelas.</p></div>
          <Example n={42} title="Ragam dan simpangan baku dari tabel frekuensi">
            <p className="text-sm leading-relaxed text-slate-300">Skor eksperimen 24 kelompok diringkas menurut interval berikut. Titik tengah dipakai sebagai wakil nilai tiap kelas.</p>
            <Table caption="Tabel kuadrat simpangan berbobot" headers={["Interval","Titik tengah xᵢ","xᵢ − x̄","(xᵢ − x̄)²","fᵢ","fᵢ(xᵢ − x̄)²"]} rows={ex42Rows}/>
            <div className="rounded-2xl border border-orange-200/15 bg-black/15 p-4 font-mono text-xs leading-loose text-slate-100 sm:text-sm"><p>Σfᵢxᵢ = 2(43) + 4(48) + 6(53) + 6(58) + 4(63) + 2(68) = 1.332</p><p>x̄ = 1.332 ÷ 24 = <strong>55,5</strong></p><p>Σfᵢ(xᵢ − x̄)² = 312,5 + 225 + 37,5 + 37,5 + 225 + 312,5 = <strong>1.150</strong></p><p>σ² = 1.150 ÷ 24 ≈ <strong>47,92</strong></p><p>σ = √(1.150 ÷ 24) = √47,916… ≈ <strong className="text-cyan-100">6,92</strong></p></div>
            <p className="text-sm leading-relaxed text-slate-300">Jadi, ragam skor kelompok sekitar 47,92 satuan kuadrat dan simpangan bakunya sekitar 6,92 poin. Perhatikan tabel mengikuti rataan 55,5: deviasi negatif untuk titik tengah di bawah mean, positif untuk titik tengah di atas mean.</p>
          </Example>
        </section>
      </div>
      <aside className="hidden lg:block"><div className="sticky top-6 rounded-3xl border border-white/10 bg-[#101b2d]/90 p-4 backdrop-blur"><p className="mb-3 font-mono text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Peta materi</p><nav aria-label="Peta materi halaman" className="space-y-1">{outline.map(([label,id],i)=><a key={id} href={`#${id}`} className="block rounded-xl px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-cyan-200/[.08] hover:text-cyan-100"><span className="mr-2 font-mono text-xs text-cyan-200/70">0{i+1}</span>{label}</a>)}</nav></div></aside></div>
    </main>
  </div>;
}
