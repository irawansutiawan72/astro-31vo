import type { ReactNode } from "react";
import { ArrowDown, BookOpen, Check, Compass, Lightbulb, Sparkles } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const sections = [
  ["A", "Mencari pola dari pangkat suku dua", "pola-binomial"],
  ["B", "Aktivitas: merakit Segitiga Pascal", "aktivitas-pascal"],
  ["C", "Teorema Binomial Newton", "teorema-newton"],
  ["D", "Menggunakan rumus suku umum", "contoh-binomial"],
] as const;

const pascalRows = [
  [1],
  [1, 1],
  [1, 2, 1],
  [1, 3, 3, 1],
  [1, 4, 6, 4, 1],
  [1, 5, 10, 10, 5, 1],
  [1, 6, 15, 20, 15, 6, 1],
  [1, 7, 21, 35, 35, 21, 7, 1],
];

function SectionHeading({ number, title, intro }: { number: string; title: string; intro: string }) {
  return (
    <div className="mb-5 flex gap-4" data-testid={`heading-${number}`}>
      <span className="grid h-10 w-12 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-display text-xs font-black text-cyan-100">{number}</span>
      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-slate-300">{intro}</p>
      </div>
    </div>
  );
}

function Formula({ children, label }: { children: ReactNode; label?: string }) {
  return <div data-testid={label ? `formula-${label}` : undefined} className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/80 px-4 py-3 text-center font-mono text-sm leading-7 text-cyan-100 sm:text-base">{children}</div>;
}

function Answer({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-emerald-200/15 bg-emerald-200/[.045] p-3 text-sm leading-relaxed text-emerald-50"><Check className="mr-2 inline h-4 w-4 text-emerald-200" aria-hidden="true" />{children}</p>;
}

function Example({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-orange-200/20 bg-[linear-gradient(140deg,rgba(106,45,35,.16),rgba(14,25,42,.92)_48%)]" data-testid={`example-${number}`}>
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-300/15 text-orange-200"><BookOpen className="h-4 w-4" aria-hidden="true" /></span>
        <div><p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">Contoh {number}</p><h3 className="font-display text-base font-bold text-white sm:text-lg">{title}</h3></div>
      </div>
      <div className="space-y-4 p-4 sm:p-5">{children}</div>
    </article>
  );
}

function ActivityCard({ number, title, children, solution }: { number: string; title: string; children: ReactNode; solution: ReactNode }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#091426]/80 p-4 sm:p-5" data-testid={`activity-${number.toLowerCase().replaceAll(".", "-")}`}>
      <div className="flex gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-orange-200/10 font-mono font-bold text-orange-100">{number}</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-bold text-white">{title}</h3>
          <div className="mt-2 text-sm leading-relaxed text-slate-300">{children}</div>
          <details className="group mt-4 rounded-xl border border-cyan-200/10 bg-cyan-200/[.035] p-3" data-testid={`solution-${number.toLowerCase().replaceAll(".", "-")}`}>
            <summary className="cursor-pointer list-none font-display text-sm font-bold text-cyan-100 marker:hidden focus:outline-none focus:ring-2 focus:ring-cyan-200/60">Lihat pembahasan <span className="ml-1 inline-block transition-transform group-open:rotate-180" aria-hidden="true">⌄</span></summary>
            <div className="mt-3 space-y-3 border-t border-white/10 pt-3 text-sm leading-relaxed text-slate-300">{solution}</div>
          </details>
        </div>
      </div>
    </article>
  );
}

function PascalTriangleDiagram() {
  return (
    <svg viewBox="0 0 800 430" role="img" aria-label="Segitiga Pascal dari baris ke-0 sampai baris ke-7. Setiap bilangan di bagian dalam diperoleh dengan menjumlahkan dua bilangan yang tepat di atasnya." className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-2 sm:p-4" data-testid="diagram-pascal-triangle">
      <g fill="#a8b8cf" fontSize="13" fontFamily="sans-serif" textAnchor="end">
        {pascalRows.map((_, row) => <text key={`row-label-${row}`} x="145" y={39 + row * 50}>n = {row}</text>)}
      </g>
      {pascalRows.map((row, rowIndex) => {
        const center = 445;
        const step = 56;
        const y = 39 + rowIndex * 50;
        return (
          <g key={`pascal-row-${rowIndex}`}>
            {rowIndex === 7 && <rect x="185" y={y - 24} width="520" height="38" rx="14" fill="#f6bd60" fillOpacity=".08" stroke="#f6bd60" strokeOpacity=".24" />}
            {row.map((value, column) => {
              const x = center + (column - rowIndex / 2) * step;
              const isEdge = column === 0 || column === rowIndex;
              return <g key={`pascal-${rowIndex}-${column}`}>
                <circle cx={x} cy={y - 5} r="16" fill={rowIndex === 7 ? "#3b2d1c" : "#13243a"} stroke={isEdge ? "#f6bd60" : "#66d9e8"} strokeWidth="1.5" />
                <text x={x} y={y} fill={rowIndex === 7 ? "#ffe0a3" : "#eaf6ff"} fontSize="13" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">{value}</text>
              </g>;
            })}
          </g>
        );
      })}
      <text x="445" y="426" fill="#8ce2b8" fontSize="12" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">Baris ke-7 disorot: koefisien untuk (x + y)⁷</text>
    </svg>
  );
}

const SmaPeluangEkspansiBinomialPage = () => {
  const jumpTo = (id: string) => {
    playPopSound();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden gradient-space">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/peluang" />
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <header className="mx-auto mb-9 max-w-4xl pt-20 text-center sm:pt-0" data-testid="lesson-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/[.06] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" />Peluang · Pola yang terus berkembang</div>
          <h1 className="mt-2 font-display text-3xl font-black leading-tight tracking-tight text-primary text-glow-cyan sm:text-5xl">Ekspansi Binomial</h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-slate-300 sm:text-base">Pangkat tinggi dari dua suku kelihatannya panjang, tapi koefisiennya ternyata mengikuti pola yang cantik. Yuk, temukan Segitiga Pascal dan gunakan Teorema Binomial Newton untuk menghitung suku yang kita cari dengan lebih cepat!</p>
          <p className="mt-2 font-body text-xs font-bold uppercase tracking-[.18em] text-orange-200">Materi pengayaan · Peluang SMA</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {sections.map(([number, label, id]) => <button key={id} type="button" onClick={() => jumpTo(id)} data-testid={`jump-${id}`} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 font-body text-xs text-slate-200 transition-colors hover:border-cyan-200/40 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200/60">{number} · {label}</button>)}
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0 space-y-10">
            <section id="pola-binomial" data-testid="section-binomial-pattern" className="scroll-mt-6">
              <SectionHeading number="A" title="Pangkat suku dua punya pola!" intro="Ekspansi binomial adalah penjabaran perpangkatan suatu bentuk yang terdiri dari dua suku. Contohnya (2x + y)⁵, (m − 3n)⁷, dan (p + q)⁹. Daripada mengalikan panjang berkali-kali, mari amati dulu pola koefisiennya." />
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["n = 0", "(x + y)⁰ = 1"],
                  ["n = 1", "(x + y)¹ = x + y"],
                  ["n = 2", "(x + y)² = x² + 2xy + y²"],
                  ["n = 3", "(x + y)³ = x³ + 3x²y + 3xy² + y³"],
                  ["n = 4", "(x + y)⁴ = x⁴ + 4x³y + 6x²y² + 4xy³ + y⁴"],
                  ["n = 5", "(x + y)⁵ = x⁵ + 5x⁴y + 10x³y² + 10x²y³ + 5xy⁴ + y⁵"],
                ].map(([power, expansion]) => <div key={power} className="rounded-2xl border border-white/10 bg-[#0d1728]/85 p-4" data-testid={`expansion-${power.replaceAll(" ", "-")}`}>
                  <p className="mb-2 font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">{power}</p>
                  <p className="overflow-x-auto font-mono text-sm leading-7 text-cyan-100">{expansion}</p>
                </div>)}
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-[1.05fr_.95fr]">
                <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[.05] p-5">
                  <h3 className="font-display font-bold text-cyan-100">Koefisiennya membentuk segitiga</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Perhatikan angka di depan setiap suku: baris demi baris, angka paling kiri dan kanan selalu 1. Angka di bagian tengah didapat dengan menjumlahkan dua angka yang berada tepat di atasnya. Susunan bilangan ini disebut <strong className="text-cyan-100">Segitiga Pascal</strong>.</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">Baris <span className="font-mono text-cyan-100">n</span> menjadi deretan koefisien untuk penjabaran <span className="font-mono text-cyan-100">(x+y)ⁿ</span>. Di samping itu, jumlah semua bilangan pada baris n adalah <span className="font-mono text-cyan-100">2ⁿ</span>, sebab menurut teorema binomial jumlah tersebut sama dengan <span className="font-mono text-cyan-100">(1+1)ⁿ</span>.</p>
                </div>
                <div className="rounded-3xl border border-orange-200/15 bg-orange-200/[.045] p-5">
                  <h3 className="font-display font-bold text-orange-100">Contoh membaca baris ke-4</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Baris ke-4 memuat <span className="font-mono text-orange-100">1, 4, 6, 4, 1</span>. Jadi, lima koefisien untuk suku-suku <span className="font-mono text-orange-100">x⁴, x³y, x²y², xy³, y⁴</span> tepat mengikuti urutan tersebut.</p>
                  <Formula>1 + 4 + 6 + 4 + 1 = 16 = 2⁴</Formula>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">Pola sudah mulai kelihatan? Sekarang coba bangun baris-baris berikutnya melalui aktivitas ini.</p>
                </div>
              </div>
              <div className="mt-5">
                <PascalTriangleDiagram />
                <p className="mt-2 text-center text-xs leading-relaxed text-slate-400">Segitiga Pascal digambar ulang dalam SVG. Baris ke-0 sampai ke-5 muncul dari pola ekspansi, dan baris ke-6 serta ke-7 membantu kegiatan prediksi.</p>
              </div>
            </section>

            <section id="aktivitas-pascal" data-testid="section-pascal-activity" className="scroll-mt-6">
              <SectionHeading number="B" title="Aktivitas: yuk, rakit Segitiga Pascal!" intro="Siapkan kertas dan pensil. Kerjakan dulu sebelum membuka pembahasan—kamu akan melihat pola yang sama muncul lagi dan lagi. Tekan “Lihat pembahasan” kalau sudah siap mencocokkan jawaban." />
              <div className="space-y-3 rounded-3xl border border-orange-200/15 bg-orange-200/[.035] p-4 sm:p-5">
                <ActivityCard number="1" title="Mulai dari pangkat empat" solution={<><p>Gunakan baris ke-4 Segitiga Pascal, yaitu 1, 4, 6, 4, 1. Pangkat x turun satu-satu, sedangkan pangkat y naik satu-satu:</p><Formula>(x+y)⁴ = x⁴ + 4x³y + 6x²y² + 4xy³ + y⁴</Formula></>}>
                  <p>Jabarkan <span className="font-mono text-cyan-100">(x + y)⁴</span>. Coba periksa koefisiennya dari baris yang sudah terlihat.</p>
                </ActivityCard>
                <ActivityCard number="2" title="Lanjutkan ke pangkat lima" solution={<><p>Kalikan jawaban nomor 1 dengan <span className="font-mono text-cyan-100">(x+y)</span>, atau ambil koefisien dari baris ke-5 Segitiga Pascal: 1, 5, 10, 10, 5, 1.</p><Formula>(x+y)⁵ = x⁵ + 5x⁴y + 10x³y² + 10x²y³ + 5xy⁴ + y⁵</Formula></>}>
                  <p>Jabarkan <span className="font-mono text-cyan-100">(x + y)⁵</span> dengan memakai hasil pangkat empat dari nomor 1.</p>
                </ActivityCard>
                <ActivityCard number="3" title="Tantang dirimu dengan pangkat enam" solution={<><p>Koefisien baris ke-6 adalah 1, 6, 15, 20, 15, 6, 1. Deretan ini juga muncul dengan menjumlahkan suku-suku sejenis ketika <span className="font-mono text-cyan-100">(x+y)⁵</span> dikalikan <span className="font-mono text-cyan-100">(x+y)</span>.</p><Formula>(x+y)⁶ = x⁶ + 6x⁵y + 15x⁴y² + 20x³y³ + 15x²y⁴ + 6xy⁵ + y⁶</Formula><p>a. Koefisien pada baris n adalah 1 di kedua ujungnya; koefisien di tengah adalah jumlah dua koefisien yang berdampingan dari baris sebelumnya. Untuk n=1 sampai 6, koefisien ujungnya tetap 1.</p><p>b. Segitiga Pascal sampai baris ke-6: n=0: 1; n=1: 1,1; n=2: 1,2,1; n=3: 1,3,3,1; n=4: 1,4,6,4,1; n=5: 1,5,10,10,5,1; n=6: 1,6,15,20,15,6,1.</p></>}>
                  <p>Jabarkan <span className="font-mono text-cyan-100">(x + y)⁶</span> dengan memakai hasil pangkat lima. Lalu amati: apa yang selalu terjadi pada koefisien paling kiri dan kanan? Bagaimana koefisien-koefisien di tengah terbentuk?</p>
                </ActivityCard>
                <ActivityCard number="4" title="Prediksi baris selanjutnya" solution={<><p>a. Tambahkan pasangan bilangan yang bertetangga pada baris sebelumnya, lalu beri angka 1 di kedua ujung. Dari baris n=6, kita memperoleh baris n=7: <span className="font-mono text-cyan-100">1, 7, 21, 35, 35, 21, 7, 1</span>.</p><p>b. Jumlah semua bilangan pada baris ke-n adalah <span className="font-mono text-cyan-100">2ⁿ</span>. Lihat baris-barisnya: 1=2⁰, 2=2¹, 4=2², 8=2³, 16=2⁴, dan seterusnya. Ini juga mengikuti identitas <span className="font-mono text-cyan-100">(1+1)ⁿ=2ⁿ</span>.</p></>}>
                  <p>a. Dari suatu baris, bagaimana caramu memprediksi semua bilangan pada baris berikutnya?</p><p className="mt-2">b. Buat dugaan rumus untuk jumlah bilangan di baris ke-n. Periksa dugaanmu dengan beberapa baris yang sudah diketahui.</p>
                </ActivityCard>
                <ActivityCard number="5" title="Pakai baris ketujuh untuk ekspansi" solution={<><p>Baris ke-7 adalah <span className="font-mono text-cyan-100">1, 7, 21, 35, 35, 21, 7, 1</span>. Masukkan koefisien sesuai urutan pangkat x yang turun dan pangkat y yang naik:</p><Formula>(x+y)⁷ = x⁷ + 7x⁶y + 21x⁵y² + 35x⁴y³ + 35x³y⁴ + 21x²y⁵ + 7xy⁶ + y⁷</Formula><p>Untuk memeriksa, kalikan ekspansi pangkat enam dengan <span className="font-mono text-cyan-100">(x+y)</span>. Misalnya, koefisien <span className="font-mono text-cyan-100">x⁵y²</span> adalah <span className="font-mono text-cyan-100">15+6=21</span>, sedangkan koefisien <span className="font-mono text-cyan-100">x⁴y³</span> adalah <span className="font-mono text-cyan-100">20+15=35</span>.</p></>}>
                  <p>Tentukan baris ke-7, tuliskan ekspansi lengkap <span className="font-mono text-cyan-100">(x + y)⁷</span>, lalu uji dengan mengalikan <span className="font-mono text-cyan-100">(x + y)⁶</span> dengan <span className="font-mono text-cyan-100">(x + y)</span>.</p>
                </ActivityCard>
              </div>
            </section>

            <section id="teorema-newton" data-testid="section-newton-theorem" className="scroll-mt-6">
              <SectionHeading number="C" title="Teorema Binomial Newton" intro="Segitiga Pascal memberi cara yang cepat untuk membaca koefisien. Teorema Binomial Newton merangkum pola itu menjadi satu rumus, sehingga kita bisa menjabarkan pangkat berapa pun tanpa menuliskan perkalian panjang." />
              <div className="space-y-5">
                <div className="rounded-3xl border border-white/10 bg-white/[.035] p-5">
                  <h3 className="font-display font-bold text-cyan-100">Dua penjabaran kecil membukakan polanya</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Koefisien pada penjabaran dapat ditulis sebagai bilangan kombinasi, dibaca “n pilih r”. Sebagai contoh, <span className="font-mono text-cyan-100">C(n,r) = n!/[r!(n−r)!]</span>.</p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-[#071326]/70 p-4">
                      <p className="mb-2 font-display font-bold text-orange-100">Pangkat dua</p>
                      <Formula>(a+b)² = C(2,0)a² + C(2,1)ab + C(2,2)b²</Formula>
                      <Formula>C(2,0)=1, C(2,1)=2, C(2,2)=1<br />(a+b)² = a² + 2ab + b²</Formula>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#071326]/70 p-4">
                      <p className="mb-2 font-display font-bold text-orange-100">Pangkat tiga</p>
                      <Formula>(a+b)³ = C(3,0)a³ + C(3,1)a²b + C(3,2)ab² + C(3,3)b³</Formula>
                      <Formula>C(3,0)=1, C(3,1)=3, C(3,2)=3, C(3,3)=1<br />(a+b)³ = a³ + 3a²b + 3ab² + b³</Formula>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-orange-200/15 bg-orange-200/[.045] p-5">
                  <h3 className="font-display font-bold text-orange-100">Rumus umum untuk pangkat n</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Untuk bilangan bulat <span className="font-mono text-orange-100">n ≥ 0</span>, suku pertama memuat <span className="font-mono text-orange-100">aⁿ</span>, lalu pangkat a turun satu per satu. Pada saat yang sama, pangkat b naik satu per satu sampai suku terakhir memuat <span className="font-mono text-orange-100">bⁿ</span>.</p>
                  <Formula label="newton-expanded">(a+b)ⁿ = C(n,0)aⁿ + C(n,1)aⁿ⁻¹b + C(n,2)aⁿ⁻²b² + ··· + C(n,n)bⁿ</Formula>
                  <div className="my-4">
                    <Formula label="newton-summation">(a+b)ⁿ = ∑ᵣ₌₀ⁿ C(n,r) aⁿ⁻ʳ bʳ</Formula>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">Penjabaran ini disebut <strong className="text-orange-100">ekspansi binomial</strong> atau <strong className="text-orange-100">ekspansi binomium Newton</strong>. Untuk suku ke-k, indeksnya <span className="font-mono text-orange-100">r = k−1</span>, karena penomoran suku dimulai dari 1 sedangkan penjumlahan r dimulai dari 0.</p>
                  <div className="mt-4 rounded-2xl border border-violet-200/15 bg-violet-200/[.045] p-4">
                    <p className="font-display font-bold text-violet-100">Bagaimana jika tandanya minus?</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">Tidak perlu rumus baru! Ganti saja <span className="font-mono text-violet-100">b</span> dengan bentuk bertanda negatif. Faktor <span className="font-mono text-violet-100">(−1)ʳ</span> membuat tanda suku berganti-ganti: pangkat r genap positif, pangkat r ganjil negatif.</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="contoh-binomial" data-testid="section-binomial-examples" className="scroll-mt-6">
              <SectionHeading number="D" title="Gunakan rumus, ambil suku yang dicari" intro="Tak harus menulis seluruh ekspansi jika yang ditanyakan hanya satu suku atau koefisien tertentu. Tentukan indeks r dari nomor suku atau dari pangkat variabel yang diminta, lalu masukkan ke Teorema Binomial Newton." />
              <div className="space-y-5">
                <Example number={23} title="Mencari suku keenam dari binomial bertanda negatif">
                  <p className="text-sm leading-relaxed text-slate-300">Tentukan koefisien suku ke-6 pada ekspansi <span className="font-mono text-cyan-100">(3u − 2v²)⁸</span>.</p>
                  <p className="text-sm leading-relaxed text-slate-300">Untuk suku ke-6, <span className="font-mono text-cyan-100">r=6−1=5</span>. Di sini <span className="font-mono text-cyan-100">n=8</span>, <span className="font-mono text-cyan-100">a=3u</span>, dan <span className="font-mono text-cyan-100">b=−2v²</span>.</p>
                  <Formula>T₆ = C(8,5)(3u)³(−2v²)⁵</Formula>
                  <Formula>T₆ = 56 × 27u³ × (−32v¹⁰) = −48.384u³v¹⁰</Formula>
                  <Answer>Koefisien numeriknya adalah −48.384. Tanda minus muncul karena pangkat faktor negatifnya, yaitu 5, adalah ganjil.</Answer>
                </Example>
                <Example number={24} title="Menemukan koefisien x¹⁴">
                  <p className="text-sm leading-relaxed text-slate-300">Tentukan koefisien <span className="font-mono text-cyan-100">x¹⁴</span> dalam ekspansi <span className="font-mono text-cyan-100">(2x² + 5x)⁹</span>.</p>
                  <p className="text-sm leading-relaxed text-slate-300">Suku umum ke-(r+1) ialah <span className="font-mono text-cyan-100">C(9,r)(2x²)⁹⁻ʳ(5x)ʳ</span>. Pangkat x pada suku itu adalah <span className="font-mono text-cyan-100">2(9−r)+r = 18−r</span>.</p>
                  <Formula>18 − r = 14　→　r = 4</Formula>
                  <p className="text-sm leading-relaxed text-slate-300">Jadi, koefisien untuk <span className="font-mono text-cyan-100">x¹⁴</span> diperoleh dari suku dengan indeks <span className="font-mono text-cyan-100">r=4</span>:</p>
                  <Formula>C(9,4) × 2⁵ × 5⁴ = 126 × 32 × 625 = 2.520.000</Formula>
                  <Answer>Koefisien <span className="font-mono">x¹⁴</span> adalah 2.520.000. Pangkat variabel membantu kita menemukan indeks yang tepat sebelum menghitung koefisiennya.</Answer>
                </Example>
              </div>
            </section>

            <section data-testid="section-binomial-checklist" className="rounded-3xl border border-cyan-200/15 bg-[linear-gradient(145deg,rgba(25,75,95,.24),rgba(12,21,37,.88))] p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-200/10 text-cyan-100"><Lightbulb className="h-5 w-5" aria-hidden="true" /></span><div><p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Bekal sebelum lanjut</p><h2 className="font-display text-xl font-extrabold text-white">Ringkas polanya, bukan materinya!</h2></div></div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.04] p-4"><p className="font-display font-bold text-cyan-100">Butuh seluruh koefisien?</p><p className="mt-2 text-sm leading-relaxed text-slate-300">Baca baris ke-n Segitiga Pascal. Koefisiennya muncul berurutan dari suku pertama sampai suku terakhir.</p></div>
                <div className="rounded-2xl border border-orange-200/15 bg-orange-200/[.04] p-4"><p className="font-display font-bold text-orange-100">Hanya perlu satu suku?</p><p className="mt-2 text-sm leading-relaxed text-slate-300">Gunakan <span className="font-mono text-orange-100">Tₖ=C(n,k−1)aⁿ⁻ᵏ⁺¹bᵏ⁻¹</span>. Jika yang diketahui pangkat variabel, samakan dulu pangkatnya untuk menemukan k atau r.</p></div>
              </div>
              <p className="mt-4 rounded-xl bg-[#071326]/70 p-3 text-sm leading-relaxed text-slate-300"><strong className="text-white">Kamu berhasil menemukan polanya!</strong> Koefisien berasal dari Segitiga Pascal, pangkat suku pertama bergerak turun, dan pangkat suku kedua bergerak naik. Terus latihan—semakin sering mencoba, semakin cepat kamu membaca ekspansinya!</p>
            </section>
          </div>

          <aside className="hidden lg:block" aria-label="Daftar bagian materi">
            <div className="sticky top-6 rounded-2xl border border-white/10 bg-[#0d1728]/90 p-4 backdrop-blur" data-testid="lesson-outline">
              <p className="mb-4 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-400">Peta materi</p>
              <ol className="space-y-3 font-body text-xs text-slate-300">
                {sections.map(([number, label, id]) => <li key={id}><button type="button" onClick={() => jumpTo(id)} className="flex w-full items-start gap-2 text-left transition-colors hover:text-cyan-100" data-testid={`outline-${id}`}><span className="font-mono text-cyan-200">{number}</span><span>{label}</span></button></li>)}
              </ol>
              <div className="mt-5 rounded-xl border border-violet-200/10 bg-violet-200/[.04] p-3">
                <Compass className="mb-2 h-4 w-4 text-violet-200" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-slate-300">Coba kerjakan aktivitas terlebih dahulu, lalu gunakan contoh untuk mengecek langkah dan hasil hitunganmu.</p>
              </div>
              <button type="button" onClick={() => jumpTo("pola-binomial")} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-200/15 bg-cyan-200/[.06] px-3 py-2 text-xs font-bold text-cyan-100 hover:bg-cyan-200/[.1]" data-testid="back-to-top"><ArrowDown className="h-3.5 w-3.5 rotate-180" aria-hidden="true" />Kembali ke awal</button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SmaPeluangEkspansiBinomialPage;
