import type { ReactNode } from "react";
import { BookOpen, Sparkles, ChartNoAxesCombined, MoveRight } from "lucide-react";
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
  return <div className="mb-5 flex gap-4"><span className="grid h-10 w-12 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-mono text-xs font-black text-cyan-100">{n}</span><div><h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2><p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-slate-300">{intro}</p></div></div>;
}

function Example({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return <article data-testid={`example-${n}`} className="overflow-hidden rounded-3xl border border-orange-200/20 bg-[linear-gradient(140deg,rgba(106,45,35,.16),rgba(14,25,42,.92)_48%)]"><header className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-300/15 text-orange-200"><BookOpen className="h-4 w-4" aria-hidden="true" /></span><div><p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">Contoh {n}</p><h3 className="font-display text-base font-bold text-white sm:text-lg">{title}</h3></div></header><div className="space-y-4 p-4 sm:p-5">{children}</div></article>;
}

function Formula({ children, label }: { children: ReactNode; label?: string }) {
  return <div className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/90 px-4 py-4 text-center">{label && <p className="mb-2 text-left font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/55">{label}</p>}<div className="whitespace-nowrap font-mono text-sm font-semibold leading-relaxed text-cyan-100 sm:text-base">{children}</div></div>;
}

function BoxPlot({ values, label, min, max }: { values: [number, number, number, number, number]; label: string; min?: number; max?: number }) {
  const [lo, q1, med, q3, hi] = values;
  const low = min ?? lo - (hi - lo) * .08;
  const high = max ?? hi + (hi - lo) * .08;
  const x = (v: number) => 42 + ((v - low) / (high - low)) * 516;
  return <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/70 p-2"><svg viewBox="0 0 600 118" role="img" aria-label={`${label}: boxplot min ${fmt(lo)}, kuartil satu ${fmt(q1)}, median ${fmt(med)}, kuartil tiga ${fmt(q3)}, maksimum ${fmt(hi)}`} className="h-auto min-w-[470px] w-full"><title>{label} — ringkasan lima angka</title><line x1={42} x2={558} y1={58} y2={58} stroke="#94a3b8" strokeWidth="1"/><line x1={x(lo)} x2={x(q1)} y1={58} y2={58} stroke="#f6a779" strokeWidth="3"/><line x1={x(q3)} x2={x(hi)} y1={58} y2={58} stroke="#f6a779" strokeWidth="3"/><line x1={x(lo)} x2={x(lo)} y1={43} y2={73} stroke="#f6a779" strokeWidth="3"/><line x1={x(hi)} x2={x(hi)} y1={43} y2={73} stroke="#f6a779" strokeWidth="3"/><rect x={x(q1)} y={37} width={Math.max(1, x(q3) - x(q1))} height={42} rx={8} fill="#59c8bd" fillOpacity=".3" stroke="#79e0d0" strokeWidth="2"/><line x1={x(med)} x2={x(med)} y1={37} y2={79} stroke="#ffd16f" strokeWidth="3"/>{values.map((v, i) => <g key={i}><circle cx={x(v)} cy={58} r="3.5" fill={i === 2 ? "#ffd16f" : "#fff0d2"}/><text x={x(v)} y={22} fill="#e8edf4" fontSize="11" textAnchor="middle">{["Min", "Q1", "Median", "Q3", "Maks"][i]}</text><text x={x(v)} y={101} fill="#cbd5e1" fontSize="11" textAnchor="middle">{fmt(v)}</text></g>)}</svg></div>;
}

function ShapeBoxplots() {
  const shapes: { name: string; vals: [number, number, number, number, number] }[] = [
    { name: "Kemencengan positif (ekor ke kanan)", vals: [1, 3, 4, 5, 10] },
    { name: "Kemencengan negatif (ekor ke kiri)", vals: [1, 6, 7, 8, 10] },
    { name: "Simetris", vals: [1, 4, 5, 6, 9] },
  ];
  return <div className="grid gap-3 md:grid-cols-3">{shapes.map(s => <figure key={s.name} className="rounded-2xl border border-white/10 bg-white/[.03] p-3"><figcaption className="mb-2 text-xs font-bold text-amber-100">{s.name}</figcaption><BoxPlot values={s.vals} label={`Boxplot ${s.name}`} min={0} max={11}/></figure>)}</div>;
}

function QuartileLine() {
  return <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/70 p-3"><svg viewBox="0 0 740 164" role="img" aria-label="Garis data terurut dibagi oleh Q1, median Q2, dan Q3 menjadi empat bagian yang sama banyak"><title>Kuartil membagi data terurut menjadi empat bagian</title><line x1="66" x2="674" y1="74" y2="74" stroke="#597080" strokeWidth="8" strokeLinecap="round"/>{[66,218,370,522,674].map((x,i)=><g key={x}><circle cx={x} cy="74" r="9" fill={i===2?"#ffd16f":"#73d8cb"} stroke="#071326" strokeWidth="3"/><text x={x} y="42" textAnchor="middle" fill="#f4f3e9" fontSize="15" fontWeight="700">{["Minimum","Q₁","Q₂ / Median","Q₃","Maksimum"][i]}</text>{i<4&&<text x={x+76} y="112" textAnchor="middle" fill="#cbd5e1" fontSize="12">25% data</text>}</g>)}</svg></div>;
}

function ScalePlot({ data, label }: { data: [number, number, number, number, number]; label: string }) {
  const [a,b,c,d,e] = data;
  const low = Math.floor(a / 10) * 10;
  const high = Math.ceil(e / 10) * 10;
  const x = (v: number) => 48 + ((v - low) / (high - low)) * 604;
  return <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/70 p-2"><svg viewBox="0 0 700 126" role="img" aria-label={`${label}; titik minimum ${a}, Q1 ${b}, median ${c}, Q3 ${d}, maksimum ${e}`} className="h-auto min-w-[520px] w-full"><title>{label}: skala dan lima titik ringkasan</title><line x1="48" x2="652" y1="72" y2="72" stroke="#9aaebc" strokeWidth="2"/>{Array.from({length:11},(_,i)=>{const tick=low+(high-low)*i/10;const tx=48+i*60.4;return <g key={i}><line x1={tx} x2={tx} y1="66" y2="79" stroke="#9aaebc"/><text x={tx} y="101" textAnchor="middle" fill="#cbd5e1" fontSize="10">{fmt(tick,0)}</text></g>})}{[a,b,c,d,e].map((v,i)=>{const px=x(v);return <g key={i}><circle cx={px} cy="72" r="6" fill={i===2?"#ffd16f":"#72dbcb"}/><text x={px} y="43" textAnchor="middle" fill="#fff0d2" fontSize="11">{["Min","Q1","Q2","Q3","Maks"][i]} {v}</text></g>})}</svg></div>;
}

function Histogram({ labels, freq, title }: { labels: string[]; freq: number[]; title: string }) {
  const max = Math.max(...freq), left=50, right=650, top=22, bottom=222, slot=(right-left)/freq.length;
  return <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/70 p-2"><svg viewBox="0 0 700 286" role="img" aria-label={title} className="h-auto min-w-[590px] w-full"><title>{title}</title>{[0,.25,.5,.75,1].map((t,i)=><g key={i}><line x1={left} x2={right} y1={bottom-t*(bottom-top)} y2={bottom-t*(bottom-top)} stroke="#94a3b8" strokeOpacity=".2"/><text x={left-8} y={bottom-t*(bottom-top)+4} textAnchor="end" fill="#cbd5e1" fontSize="10">{fmt(max*t)}</text></g>)}{freq.map((v,i)=><g key={labels[i]}><rect x={left+i*slot} y={bottom-(v/max)*(bottom-top)} width={slot} height={(v/max)*(bottom-top)} fill="#f4a47b" fillOpacity=".78" stroke="#ffe1db" strokeWidth="1.2"/><text x={left+(i+.5)*slot} y={bottom-(v/max)*(bottom-top)-6} textAnchor="middle" fill="#fff" fontSize="10">{v}</text><text x={left+(i+.5)*slot} y={bottom+16} textAnchor="middle" fill="#e2e8f0" fontSize={labels.length>8?8:10}>{labels[i]}</text></g>)}<line x1={left} x2={right} y1={bottom} y2={bottom} stroke="#cbd5e1"/><text x="350" y="273" textAnchor="middle" fill="#e2e8f0" fontSize="11">Interval kelas</text></svg></div>;
}

function Ogive({ xValues, yValues, maxY, label, yPercent = false }: { xValues: number[]; yValues: number[]; maxY: number; label: string; yPercent?: boolean }) {
  const left=56,right=660,top=22,bottom=228;
  const minX=Math.min(...xValues),maxX=Math.max(...xValues);
  const x=(v:number)=>left+(v-minX)/(maxX-minX)*(right-left), y=(v:number)=>bottom-(v/maxY)*(bottom-top);
  return <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/70 p-2"><svg viewBox="0 0 710 286" role="img" aria-label={label} className="h-auto min-w-[590px] w-full"><title>{label}</title>{[0,.25,.5,.75,1].map((t,i)=><g key={i}><line x1={left} x2={right} y1={y(maxY*t)} y2={y(maxY*t)} stroke="#94a3b8" strokeOpacity=".2"/><text x={left-8} y={y(maxY*t)+4} textAnchor="end" fill="#cbd5e1" fontSize="10">{yPercent?`${fmt(maxY*t)}%`:fmt(maxY*t)}</text></g>)}<polyline points={xValues.map((v,i)=>`${x(v)},${y(yValues[i])}`).join(" ")} fill="none" stroke="#ffd16f" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>{xValues.map((v,i)=><g key={`${v}-${i}`}><circle cx={x(v)} cy={y(yValues[i])} r="4" fill="#73d8cb"/><text x={x(v)} y={bottom+16} textAnchor="middle" fill="#e2e8f0" fontSize="9">{fmt(v)}</text></g>)}<line x1={left} x2={right} y1={bottom} y2={bottom} stroke="#cbd5e1"/><text x="350" y="273" textAnchor="middle" fill="#e2e8f0" fontSize="11">{yPercent?"Tepi atas kelas":"Tepi atas kelas"}</text></svg></div>;
}

const outline = [
  ["Kuartil & boxplot","kuartil"],["Data tunggal","tunggal"],["Data berkelompok","kelompok"],
  ["Ogive & interpretasi","ogive"],["Desil","desil"],["Persentil","persentil"],
];
const grouped = [["21–25",4,4],["26–30",8,12],["31–35",6,18],["36–40",10,28],["41–45",5,33],["46–50",7,40]];

export default function SmaStatistikaUkuranLetakDataPage() {
  return <div className="animation-submaterial-route sma-statistika-route relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
    <Starfield />
    <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/statistika/ukuran-pemusatan-data" />
    <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
      <header className="relative mb-8 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.96),rgba(16,22,43,.95)_60%,rgba(75,36,43,.76))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10" data-testid="lesson-hero">
        <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-cyan-100/10"/><div className="relative max-w-4xl">
          <div className="mb-5 flex flex-wrap gap-2"><span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Ruang untuk Guru · SMA</span><span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">Buku Animasi Matematika · Statistika</span></div>
          <div className="mb-3 flex items-center gap-2 text-amber-200"><Sparkles className="h-4 w-4" aria-hidden="true"/><p className="font-body text-xs font-bold uppercase tracking-[.24em]">Angka punya posisi. Yuk, temukan polanya.</p></div>
          <p className="mb-2 font-mono text-xs font-bold tracking-[.22em] text-cyan-100">BAB 2.4</p>
          <h1 className="font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="lesson-title">Ukuran Letak <span className="text-cyan-200">Data</span></h1>
          <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">Dari kuartil sampai persentil, kita belajar membaca di mana sebuah nilai berada. Urutkan, cari posisinya, lalu biarkan diagram membantu melihat cerita data dengan lebih jernih.</p>
          <div className="mt-6 flex flex-wrap gap-2">{["Kuartil","Boxplot","Data tunggal","Data berkelompok","Ogive","Desil","Persentil"].map(t=><span key={t} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs font-semibold text-slate-200">{t}</span>)}</div>
        </div>
      </header>
      <nav className="mb-8 flex gap-2 overflow-x-auto pb-2 lg:hidden" aria-label="Peta materi" data-testid="lesson-map-mobile">{outline.map(([label,id])=><a key={id} href={`#${id}`} data-testid={`link-map-${id}`} className="shrink-0 rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-xs text-slate-200 hover:border-cyan-200/40 hover:text-cyan-100">{label}</a>)}</nav>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_245px]"><div className="min-w-0 space-y-12">
        <section id="kuartil" className="scroll-mt-8 space-y-5" data-testid="section-kuartil">
          <Heading n="2.4" title="Ukuran letak: peta posisi data" intro="Ukuran letak menunjukkan posisi suatu nilai ketika data disusun berurutan. Berbeda dari ukuran pemusatan yang mencari nilai wakil, ukuran letak menandai batas-batas bagian data."/>
          <div className="space-y-4 rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
            <p className="text-sm leading-relaxed text-slate-300"><strong className="text-cyan-100">Kuartil</strong> membagi data terurut menjadi empat bagian sama banyak. Q₁ adalah kuartil bawah, Q₂ adalah median, dan Q₃ adalah kuartil atas. Masing-masing menandai titik batas seperempat, setengah, dan tiga perempat data.</p>
            <QuartileLine/>
            <Formula label="Ringkasan lima angka (five-number summary)">Minimum — Q₁ — Median (Q₂) — Q₃ — Maksimum</Formula>
            <p className="text-sm leading-relaxed text-slate-300">Diagram kotak-garis (boxplot) merangkum lima angka tersebut. Garis di dalam kotak menunjukkan median; kotak membentang dari Q₁ sampai Q₃; “kumis” menuju minimum dan maksimum. Bentuk dan panjang bagian-bagiannya membantu membandingkan posisi median, sebaran data, serta melihat kemencengan positif/negatif atau pola yang kurang lebih simetris.</p>
            <ShapeBoxplots/>
            <p className="text-xs leading-relaxed text-slate-400">Pada kemencengan positif, bagian kanan/ekor lebih panjang; pada kemencengan negatif, bagian kiri lebih panjang. Pada bentuk simetris, kedua sisi relatif seimbang. Bentuk boxplot adalah petunjuk pola, bukan bukti tunggal bentuk distribusi.</p>
          </div>
        </section>

        <section id="tunggal" className="scroll-mt-8 space-y-5">
          <Heading n="A" title="Kuartil data tunggal" intro="Mulai dengan mengurutkan data dari yang terkecil ke terbesar. Rumus posisi memberi tahu letak kuartil; jika posisinya pecahan, kita interpolasikan di antara dua data yang mengapitnya."/>
          <Formula label="Posisi kuartil data tunggal">posisi Qᵢ = data ke-[i(n + 1) ÷ 4], &nbsp; i = 1, 2, 3</Formula>
          <p className="text-sm leading-relaxed text-slate-300"><strong className="text-cyan-100">n</strong> adalah banyak data dan <strong className="text-cyan-100">i</strong> memilih Q₁, Q₂, atau Q₃. Jika posisi = k + r, dengan k bilangan bulat dan 0 ≤ r &lt; 1, maka Qᵢ = data ke-k + r × (data ke-(k+1) − data ke-k). Posisi bulat langsung menunjuk data tersebut.</p>
          <Example n={26} title="Kuartil dua kelompok data tunggal">
            <p className="text-sm text-slate-300">Untuk setiap kelompok, urutkan dulu nilainya, hitung posisi Q₁–Q₃, lalu interpolasikan bila perlu.</p>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[.025] p-3"><h4 className="font-display font-bold text-cyan-100">Kelompok A · 9 data</h4><p className="text-sm text-slate-300">Data awal: 4, 9, 6, 13, 7, 16, 11, 18, 8</p><p className="text-sm text-slate-300">Urut: <span className="font-mono text-white">4, 6, 7, 8, 9, 11, 13, 16, 18</span>. Minimum 4, maksimum 18.</p><div className="space-y-2 rounded-xl bg-black/15 p-3 font-mono text-xs leading-relaxed text-slate-100"><p>n = 9; posisi Q₁ = 1(10)/4 = 2,5</p><p>Q₁ = data₂ + 0,5(data₃ − data₂) = 6 + 0,5(7 − 6) = 6,5</p><p>posisi Q₂ = 2(10)/4 = 5 → Q₂ = data₅ = 9</p><p>posisi Q₃ = 3(10)/4 = 7,5</p><p>Q₃ = data₇ + 0,5(data₈ − data₇) = 13 + 0,5(16 − 13) = 14,5</p></div><BoxPlot values={[4,6.5,9,14.5,18]} label="Boxplot kelompok A"/></div>
              <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[.025] p-3"><h4 className="font-display font-bold text-cyan-100">Kelompok B · 8 data</h4><p className="text-sm text-slate-300">Data terurut: <span className="font-mono text-white">24, 27, 31, 33, 38, 43, 47, 50</span>. Minimum 24, maksimum 50.</p><div className="space-y-2 rounded-xl bg-black/15 p-3 font-mono text-xs leading-relaxed text-slate-100"><p>n = 8; posisi Q₁ = 1(9)/4 = 2,25</p><p>Q₁ = data₂ + 0,25(data₃ − data₂) = 27 + 0,25(31 − 27) = 28</p><p>posisi Q₂ = 2(9)/4 = 4,5 → 33 + 0,5(38 − 33) = 35,5</p><p>posisi Q₃ = 3(9)/4 = 6,75</p><p>Q₃ = 43 + 0,75(47 − 43) = 46</p></div><BoxPlot values={[24,28,35.5,46,50]} label="Boxplot kelompok B"/></div>
            </div>
          </Example>
          <Example n={27} title="Menggambar boxplot dari five-number summary">
            <p className="text-sm leading-relaxed text-slate-300">Tanpa data mentah pun boxplot bisa digambar. Tandai kelima nilai pada skala yang sesuai, buat kotak Q₁–Q₃ dengan garis median, lalu tarik kumis ke minimum dan maksimum.</p>
            <div className="grid gap-4 md:grid-cols-2"><div className="space-y-2 rounded-2xl border border-white/10 bg-white/[.025] p-3"><h4 className="font-bold text-cyan-100">Himpunan A · skala 10–36</h4><ScalePlot data={[12,20,24,27,34]} label="Himpunan A"/><p className="text-xs text-slate-300">Urutan titik: min 12, Q₁ 20, median 24, Q₃ 27, maks 34.</p></div><div className="space-y-2 rounded-2xl border border-white/10 bg-white/[.025] p-3"><h4 className="font-bold text-cyan-100">Himpunan B · skala 90–116</h4><ScalePlot data={[92,98,103,108,115]} label="Himpunan B"/><p className="text-xs text-slate-300">Urutan titik: min 92, Q₁ 98, median 103, Q₃ 108, maks 115.</p></div></div>
          </Example>
        </section>

        <section id="kelompok" className="scroll-mt-8 space-y-5">
          <Heading n="B" title="Kuartil pada data berkelompok" intro="Saat nilai diringkas ke dalam interval, kita tidak melihat setiap nilai satu per satu. Kuartil dihitung dengan interpolasi di dalam kelas yang memuat posisi kuartil."/>
          <Formula label="Rumus kuartil berkelompok">Qᵢ = L + c × ((i n ÷ 4 − F) ÷ f), &nbsp; i = 1, 2, 3</Formula>
          <div className="grid gap-2 sm:grid-cols-2 text-sm leading-relaxed text-slate-300"><p><strong className="text-cyan-100">L</strong> = tepi bawah kelas kuartil.</p><p><strong className="text-cyan-100">c</strong> = panjang kelas.</p><p><strong className="text-cyan-100">n</strong> = jumlah seluruh frekuensi/data.</p><p><strong className="text-cyan-100">i n/4</strong> = posisi kuartil yang dicari.</p><p><strong className="text-cyan-100">F</strong> = frekuensi kumulatif sebelum kelas kuartil.</p><p><strong className="text-cyan-100">f</strong> = frekuensi kelas kuartil.</p></div>
          <Example n={28} title="Menentukan Q₁, Q₂, dan Q₃ dari tabel frekuensi">
            <p className="text-sm text-slate-300">Tabel ini memiliki n = 40. Tepi kelas kontinu, misalnya interval 26–30 memiliki tepi 25,5–30,5 dan panjang kelas c = 5.</p>
            <Table caption="Distribusi frekuensi nilai" headers={["Interval","Frekuensi (f)","Frekuensi kumulatif"]} rows={grouped.map(r=>[r[0],r[1],r[2]])}/>
            <div className="space-y-2 rounded-2xl border border-orange-200/15 bg-black/15 p-4 font-mono text-xs leading-relaxed text-slate-100"><p><strong className="text-orange-200">Q₁</strong>: posisi n/4 = 40/4 = 10, berada di kelas 26–30 (F=4, f=8, L=25,5).</p><p>Q₁ = 25,5 + 5 × ((10 − 4)/8) = 25,5 + 3,75 = <strong>29,25</strong>.</p><p><strong className="text-orange-200">Q₂</strong>: posisi 2n/4 = 20, berada di kelas 36–40 (F=18, f=10, L=35,5).</p><p>Q₂ = 35,5 + 5 × ((20 − 18)/10) = 35,5 + 1 = <strong>36,5</strong>.</p><p><strong className="text-orange-200">Q₃</strong>: posisi 3n/4 = 30, berada di kelas 41–45 (F=28, f=5, L=40,5).</p><p>Q₃ = 40,5 + 5 × ((30 − 28)/5) = 40,5 + 2 = <strong>42,5</strong>.</p></div>
          </Example>
          <aside className="rounded-3xl border border-amber-200/20 bg-amber-200/[.05] p-4 sm:p-5" data-testid="challenge-q3">
            <p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-amber-200">Coba pikirkan · pilihan ganda</p><h3 className="mt-1 font-display text-lg font-bold text-white">Berapa Q₃ berat badan peserta?</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">Berat 36 peserta disajikan berikut. Pilih hasil Q₃ yang tepat.</p>
            <Table caption="Berat badan peserta" headers={["Berat (kg)","Frekuensi","Frekuensi kumulatif"]} rows={[["41–50",3,3],["51–60",7,10],["61–70",6,16],["71–80",8,24],["81–90",12,36],["Jumlah",36,36]]}/>
            <p className="mt-3 text-sm font-semibold text-amber-100">A. 80,0 kg &nbsp; B. 82,5 kg &nbsp; C. 83,0 kg &nbsp; D. 86,0 kg</p>
            <div className="mt-3 rounded-xl border border-emerald-200/15 bg-emerald-200/[.05] p-3 text-sm leading-relaxed text-slate-200"><strong className="text-emerald-100">Jawaban C.</strong> Posisi Q₃ = 3(36)/4 = 27; posisi ke-27 berada di kelas 81–90 karena kumulatif sebelum kelas 24 dan sesudahnya 36. Gunakan L=80,5; c=10; F=24; f=12: Q₃ = 80,5 + 10 × ((27−24)/12) = 80,5 + 2,5 = <strong>83,0 kg</strong>.</div>
          </aside>
          <Example n={29} title="Kuartil umur sebagai data diskret">
            <p className="text-sm leading-relaxed text-slate-300">Tepat 100 siswa dikelompokkan menurut umur dalam tahun penuh. Karena umur yang dicatat berupa bilangan diskret, untuk membaca kuartil kita telusuri nilai pada posisi tengah yang mengapit batas seperempat, setengah, dan tiga perempat.</p>
            <Table caption="Umur siswa" headers={["Umur (tahun)","Frekuensi","Frekuensi kumulatif"]} rows={[[17,5,5],[18,8,13],[19,12,25],[20,21,46],[21,23,69],[22,18,87],[23,9,96],[24,4,100],["Jumlah",100,100]]}/>
            <div className="rounded-2xl bg-black/15 p-4 text-sm leading-relaxed text-slate-200"><p>n = 100. Batas seperempat berada di sekitar posisi ke-25/26: data ke-25 = 19 dan data ke-26 = 20, sehingga Q₁ = (19 + 20)/2 = <strong>19,5 tahun</strong>.</p><p className="mt-2">Batas tengah berada di posisi ke-50/51. Keduanya berada pada umur 20, jadi median (Q₂) = <strong>20 tahun</strong>.</p><p className="mt-2">Batas tiga perempat berada di posisi ke-75/76. Keduanya berada pada umur 21, jadi Q₃ = <strong>21 tahun</strong>.</p><p className="mt-2 text-cyan-100">Nilai di sekitar posisi itulah yang menentukan kuartil: frekuensi kumulatif menunjukkan nilai mana yang memuat setiap posisi, lalu dua nilai yang mengapit batas dirata-ratakan jika diperlukan.</p></div>
            <BoxPlot values={[17,19.5,20,21,24]} label="Boxplot umur siswa"/>
          </Example>
          <Example n={30} title="Tinggi badan 60 siswa: tabel, histogram, dan ogive">
            <p className="text-sm text-slate-300">Tepi kelas dan titik tengah (xᵢ) ditampilkan bersama frekuensi serta kumulatif agar alur data mudah diikuti.</p>
            <Table caption="Distribusi tinggi badan siswa" headers={["Interval (cm)","Tepi kelas","xᵢ","f","F kumulatif"]} rows={[["90–94","89,5–94,5",92,3,3],["95–99","94,5–99,5",97,9,12],["100–104","99,5–104,5",102,18,30],["105–109","104,5–109,5",107,16,46],["110–114","109,5–114,5",112,8,54],["115–119","114,5–119,5",117,4,58],["120–124","119,5–124,5",122,2,60],["Jumlah","—","—",60,60]]}/>
            <Histogram labels={["90–94","95–99","100–104","105–109","110–114","115–119","120–124"]} freq={[3,9,18,16,8,4,2]} title="Histogram tinggi badan 60 siswa; tinggi batang menunjukkan frekuensi tiap interval"/>
            <Ogive xValues={[89.5,94.5,99.5,104.5,109.5,114.5,119.5,124.5]} yValues={[0,3,12,30,46,54,58,60]} maxY={60} label="Ogive kurang dari tinggi badan siswa berdasarkan frekuensi kumulatif"/>
            <div className="rounded-2xl border border-orange-200/15 bg-black/15 p-4 font-mono text-xs leading-relaxed text-slate-100"><p>n=60; posisi Q₁=15. Kelas 100–104: L=99,5, F=12, f=18, c=5.</p><p>Q₁ = 99,5 + 5 × ((15−12)/18) = 100,333… ≈ <strong>100,33 cm</strong>.</p><p className="mt-2">Posisi Q₂=30. Kelas 105–109 (posisi pada ujung bawah kelas): L=104,5, F=30, f=16, c=5.</p><p>Q₂ = 104,5 + 5 × ((30−30)/16) = <strong>104,5 cm</strong>.</p><p className="mt-2">Posisi Q₃=45. Kelas 105–109: L=104,5, F=30, f=16, c=5.</p><p>Q₃ = 104,5 + 5 × ((45−30)/16) = 109,1875 ≈ <strong>109,19 cm</strong>.</p></div>
            <p className="text-sm leading-relaxed text-slate-300">Median juga merupakan ukuran pemusatan. Karena ditentukan oleh posisi tengah, median tidak mudah tertarik oleh nilai ekstrem yang terlalu besar atau terlalu kecil, berbeda dari rataan yang dapat berubah cukup jauh.</p>
            <BoxPlot values={[90,100.33,104.5,109.19,124]} label="Boxplot tinggi badan siswa"/>
          </Example>
        </section>

        <section id="ogive" className="scroll-mt-8 space-y-5">
          <Heading n="C" title="Membaca kuartil dari ogive" intro="Ogive kurang dari menghubungkan tepi atas kelas dengan frekuensi kumulatif. Persentase kumulatif membuat posisi kuartil atau persentil dapat dibaca pada skala 0%–100%."/>
          <Example n={31} title="Distribusi nilai 500 siswa dan tiga keputusan">
            <p className="text-sm leading-relaxed text-slate-300">Data nilai dikelompokkan per rentang 10 angka. Persentase kumulatif dihitung dari frekuensi kumulatif ÷ 500 × 100%.</p>
            <Table caption="Nilai 500 siswa" headers={["Interval nilai","f","Frekuensi kumulatif","Persentase kumulatif"]} rows={[["0–9",10,10,"2%"],["10–19",15,25,"5%"],["20–29",30,55,"11%"],["30–39",45,100,"20%"],["40–49",70,170,"34%"],["50–59",125,295,"59%"],["60–69",95,390,"78%"],["70–79",60,450,"90%"],["80–89",35,485,"97%"],["90–99",15,500,"100%"]]}/>
            <Ogive xValues={[-0.5,9.5,19.5,29.5,39.5,49.5,59.5,69.5,79.5,89.5,99.5]} yValues={[0,2,5,11,20,34,59,78,90,97,100]} maxY={100} label="Ogive persentase kumulatif 500 siswa, diplot pada tepi atas kelas" yPercent/>
            <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.04] p-4 text-sm leading-relaxed text-slate-300"><p className="font-bold text-cyan-100">Membaca kuartil dengan interpolasi</p><p className="mt-2">Q₁ adalah posisi 25% (125 siswa), di kelas 40–49: Q₁ = 39,5 + 10 × ((125−100)/70) ≈ <strong>43,07</strong>.</p><p className="mt-2">Q₂ posisi 50% (250 siswa), di kelas 50–59: Q₂ = 49,5 + 10 × ((250−170)/125) = <strong>55,9</strong>.</p><p className="mt-2">Q₃ posisi 75% (375 siswa), di kelas 60–69: Q₃ = 59,5 + 10 × ((375−295)/95) ≈ <strong>67,92</strong>.</p><p className="mt-2 text-slate-400">Garis ogive menghubungkan titik-titik kelas; nilai di dalam kelas diperkirakan secara linear. Jadi hasil interpolasi adalah taksiran berdasarkan data berkelompok, bukan angka pasti yang dapat dibaca langsung dari plot.</p></div>
            <div className="grid gap-3 md:grid-cols-3"><div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.04] p-4"><p className="text-xs font-black uppercase tracking-widest text-amber-200">Lulus mulai 45</p><p className="mt-2 text-sm leading-relaxed text-slate-200">Ambang 45 berada pada kelas 40–49. Perkiraan bagian nilai ≥45: 100% − [20% + ((45−39,5)/10) × 14%] ≈ <strong>72,3%</strong>, atau sekitar <strong>73%</strong> siswa.</p></div><div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.04] p-4"><p className="text-xs font-black uppercase tracking-widest text-amber-200">85% peserta harus lulus</p><p className="mt-2 text-sm leading-relaxed text-slate-200">Agar 85% berada di atas ambang, cari P₁₅. P₁₅ di kelas 30–39: 29,5 + 10 × ((75−55)/45) ≈ <strong>33,94</strong>. Ambang nilai bulat: <strong>34</strong>.</p></div><div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.04] p-4"><p className="text-xs font-black uppercase tracking-widest text-amber-200">Beasiswa 6% tertinggi</p><p className="mt-2 text-sm leading-relaxed text-slate-200">Batasnya P₉₄. Di kelas 80–89: 79,5 + 10 × ((470−450)/35) ≈ <strong>85,21</strong>. Ambang nilai bulat agar masuk kelompok atas: <strong>86</strong>.</p></div></div>
            <p className="text-xs leading-relaxed text-slate-400">Tiga keputusan di atas membaca persentase pada ogive lalu menginterpolasi secara terbuka di kelas terkait. Pembulatan ambang nilai disesuaikan dengan konteks skor bulat.</p>
          </Example>
        </section>

        <section id="desil" className="scroll-mt-8 space-y-5">
          <Heading n="D" title="Desil: membagi data menjadi sepuluh" intro="Sembilan titik desil, D₁ sampai D₉, membagi data terurut menjadi sepuluh bagian sama banyak. Rumusnya serupa kuartil; yang berubah adalah pembaginya."/>
          <Formula label="Posisi desil data tunggal">posisi Dᵢ = data ke-[i(n + 1) ÷ 10], &nbsp; i = 1, 2, …, 9</Formula>
          <p className="text-sm leading-relaxed text-slate-300">Jika posisi pecahan, gunakan interpolasi di antara data yang mengapit posisi tersebut seperti pada kuartil. Pada data berkelompok, tentukan kelas desil melalui frekuensi kumulatif lalu interpolasikan dalam kelas.</p>
          <Example n={32} title="D₂ dan D₄ pada dua himpunan">
            <div className="grid gap-4 lg:grid-cols-2"><div className="space-y-3 rounded-2xl border border-white/10 bg-white/[.025] p-4"><h4 className="font-bold text-cyan-100">Kelompok A · n = 11</h4><p className="text-sm text-slate-300">Data awal: 4, 10, 6, 18, 12, 8, 16, 20, 7, 14, 9</p><p className="font-mono text-sm text-white">Urut: 4, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20</p><div className="rounded-xl bg-black/15 p-3 font-mono text-xs leading-relaxed text-slate-100"><p>Posisi D₂ = 2(12)/10 = 2,4</p><p>D₂ = data₂ + 0,4(data₃−data₂) = 6 + 0,4(7−6) = <strong>6,4</strong></p><p className="mt-2">Posisi D₄ = 4(12)/10 = 4,8</p><p>D₄ = data₄ + 0,8(data₅−data₄) = 8 + 0,8(9−8) = <strong>8,8</strong></p></div></div><div className="space-y-3 rounded-2xl border border-white/10 bg-white/[.025] p-4"><h4 className="font-bold text-cyan-100">Kelompok B · n = 14</h4><p className="text-sm text-slate-300">Data awal: 26, 35, 31, 42, 38, 47, 44, 50, 33, 41, 46, 36, 48, 40</p><p className="font-mono text-sm text-white">Urut: 26, 31, 33, 35, 36, 38, 40, 41, 42, 44, 46, 47, 48, 50</p><div className="rounded-xl bg-black/15 p-3 font-mono text-xs leading-relaxed text-slate-100"><p>Posisi D₂ = 2(15)/10 = 3 → D₂ = data₃ = <strong>33</strong></p><p className="mt-2">Posisi D₄ = 4(15)/10 = 6 → D₄ = data₆ = <strong>38</strong></p></div></div></div>
          </Example>
          <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5"><h3 className="font-display text-lg font-bold text-cyan-100">Desil data berkelompok</h3><Formula label="Rumus desil berkelompok">Dᵢ = L + c × ((i n ÷ 10 − F) ÷ f)</Formula><p className="mt-3 text-sm leading-relaxed text-slate-300">Simbolnya sama seperti rumus kuartil: L tepi bawah kelas desil, c panjang kelas, n jumlah data, F frekuensi kumulatif sebelum kelas, dan f frekuensi kelas desil. Kita gunakan tabel Contoh 28 yang sama.</p><Table caption="Frekuensi kumulatif untuk menghitung desil" headers={["Interval","f","F kumulatif"]} rows={grouped.map(r=>[r[0],r[1],r[2]])}/><div className="mt-3 rounded-2xl bg-black/15 p-4 font-mono text-xs leading-relaxed text-slate-100"><p>D₅: posisi 5(40)/10 = 20, berada di kelas 36–40 (L=35,5; F=18; f=10; c=5).</p><p>D₅ = 35,5 + 5 × ((20−18)/10) = <strong>36,5</strong>.</p><p className="mt-2">D₉: posisi 9(40)/10 = 36, berada di kelas 46–50 (L=45,5; F=33; f=7; c=5).</p><p>D₉ = 45,5 + 5 × ((36−33)/7) ≈ <strong>47,64</strong>.</p><p className="mt-2 text-cyan-100">Di data ini D₅ = Q₂ = 36,5: keduanya tepat menunjuk posisi ke-20, yaitu setengah dari 40 data.</p></div></div>
        </section>

        <section id="persentil" className="scroll-mt-8 space-y-5">
          <Heading n="E" title="Persentil: posisi hingga seratus bagian" intro="Persentil membagi data menjadi 100 bagian. Ada 99 titik pemisah, P₁ sampai P₉₉. Persentil berguna ketika kita ingin membaca posisi dengan lebih rinci."/>
          <Formula label="Posisi persentil data tunggal">posisi Pᵢ = data ke-[i(n + 1) ÷ 100], &nbsp; i = 1, 2, …, 99</Formula>
          <p className="text-sm leading-relaxed text-slate-300">Data harus diurutkan terlebih dahulu. Posisi bulat menunjuk data secara langsung; posisi pecahan diinterpolasikan proporsional di antara dua nilai berturutan.</p>
          <Example n={34} title="Mencari P₆₅ dari 15 data tunggal">
            <p className="text-sm text-slate-300">Data awal: 12, 16, 22, 14, 18, 20, 13, 17, 24, 19, 15, 21, 18, 23, 14.</p>
            <p className="font-mono text-sm leading-relaxed text-white">Urut: 12, 13, 14, 14, 15, 16, 17, 18, 18, 19, 20, 21, 22, 23, 24</p>
            <div className="rounded-2xl bg-black/15 p-4 font-mono text-xs leading-relaxed text-slate-100"><p>n = 15; posisi P₆₅ = 65(15+1)/100 = 10,4.</p><p>Data ke-10 = 19 dan data ke-11 = 20.</p><p>P₆₅ = 19 + 0,4(20−19) = <strong>19,4</strong>.</p></div>
          </Example>
          <Example n={35} title="Persentil data berkelompok: berat 50 peserta">
            <Formula label="Rumus persentil berkelompok">Pᵢ = L + c × ((i n ÷ 100 − F) ÷ f)</Formula>
            <p className="text-sm leading-relaxed text-slate-300"><strong className="text-cyan-100">Pᵢ</strong> adalah persentil ke-i; <strong className="text-cyan-100">L</strong> tepi bawah kelas persentil; <strong className="text-cyan-100">c</strong> panjang kelas; <strong className="text-cyan-100">n</strong> jumlah seluruh data; <strong className="text-cyan-100">F</strong> frekuensi kumulatif sebelum kelas; dan <strong className="text-cyan-100">f</strong> frekuensi kelas persentil.</p>
            <Table caption="Berat badan 50 peserta" headers={["Berat (kg)","f","Frekuensi kumulatif"]} rows={[["40–49",6,6],["50–59",12,18],["60–69",18,36],["70–79",10,46],["80–89",4,50],["Jumlah",50,50]]}/>
            <div className="rounded-2xl border border-orange-200/15 bg-black/15 p-4 font-mono text-xs leading-relaxed text-slate-100"><p><strong className="text-orange-200">P₃₀:</strong> posisi = 30(50)/100 = 15, berada di kelas 50–59 (L=49,5; c=10; F=6; f=12).</p><p>P₃₀ = 49,5 + 10 × ((15−6)/12) = 49,5 + 7,5 = <strong>57 kg</strong>.</p><p className="mt-3"><strong className="text-orange-200">P₉₉:</strong> posisi = 99(50)/100 = 49,5, berada di kelas 80–89 (L=79,5; c=10; F=46; f=4).</p><p>P₉₉ = 79,5 + 10 × ((49,5−46)/4) = 79,5 + 8,75 = <strong>88,25 kg</strong>.</p></div>
          </Example>
        </section>
        <footer className="rounded-3xl border border-cyan-200/15 bg-[linear-gradient(110deg,rgba(21,75,79,.28),rgba(16,22,43,.7))] p-5 sm:p-6"><div className="flex items-start gap-3"><ChartNoAxesCombined className="mt-1 h-5 w-5 shrink-0 text-cyan-200" aria-hidden="true"/><div><h2 className="font-display text-xl font-bold text-white">Satu cara baca, banyak sudut pandang</h2><p className="mt-2 text-sm leading-relaxed text-slate-300">Urutkan atau susun frekuensi kumulatif, tentukan posisi, temukan kelas/data yang memuat posisi, lalu interpolasikan bila perlu. Kuartil, desil, dan persentil adalah alat untuk melihat letak—diagram membantu kita mengubah angka menjadi pola.</p><a href="#kuartil" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-100 hover:text-white" data-testid="link-back-to-start">Kembali ke awal <MoveRight className="h-4 w-4 rotate-[-90deg]" aria-hidden="true"/></a></div></div></footer>
      </div>
      <aside className="hidden lg:block"><nav aria-label="Peta materi" className="sticky top-6 rounded-3xl border border-white/10 bg-[#101a2c]/85 p-4 backdrop-blur" data-testid="lesson-map"><p className="mb-3 font-mono text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Peta materi</p><ol className="space-y-1">{outline.map(([label,id],i)=><li key={id}><a href={`#${id}`} data-testid={`link-map-${id}-desktop`} className="flex items-start gap-2 rounded-xl px-2 py-2 text-xs leading-relaxed text-slate-300 transition-colors hover:bg-cyan-200/[.08] hover:text-cyan-100"><span className="font-mono text-cyan-200/70">0{i+1}</span>{label}</a></li>)}</ol><div className="mt-4 rounded-2xl border border-amber-200/15 bg-amber-200/[.04] p-3 text-xs leading-relaxed text-amber-50"><Sparkles className="mb-2 h-4 w-4 text-amber-200" aria-hidden="true"/>Petunjuk: posisi dulu, hitung setelahnya.</div></nav></aside>
      </div>
    </main>
  </div>;
}
