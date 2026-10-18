import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, BookOpen, Check, Lightbulb, Sparkles } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const sections = [
  ["4.5", "Mengenal kejadian majemuk", "pengertian"],
  ["4.5.1", "Kejadian saling lepas", "saling-lepas"],
  ["∪", "Peluang gabungan", "peluang-gabungan"],
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
      <span className="grid h-10 min-w-14 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] px-2 font-display text-xs font-black text-cyan-100">
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

function DisjointAndOverlappingSvg() {
  return (
    <svg
      viewBox="0 0 650 230"
      role="img"
      aria-label="Perbandingan diagram Venn dua kejadian saling lepas yang lingkarannya terpisah dan dua kejadian beririsan yang lingkarannya bertumpang tindih"
      className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-3"
      data-testid="diagram-disjoint-and-overlapping-events"
    >
      <rect x="14" y="16" width="295" height="190" rx="18" fill="#11243a" stroke="#9edce8" strokeWidth="2" />
      <rect x="341" y="16" width="295" height="190" rx="18" fill="#11243a" stroke="#9edce8" strokeWidth="2" />
      <circle cx="102" cy="108" r="52" fill="#245972" stroke="#67e8f9" strokeWidth="3" />
      <circle cx="224" cy="108" r="52" fill="#71471f" stroke="#f6bd60" strokeWidth="3" />
      <circle cx="435" cy="108" r="55" fill="#245972" fillOpacity=".9" stroke="#67e8f9" strokeWidth="3" />
      <circle cx="540" cy="108" r="55" fill="#71471f" fillOpacity=".85" stroke="#f6bd60" strokeWidth="3" />
      <g fill="#fff" fontSize="18" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">
        <text x="102" y="115">A</text><text x="224" y="115">B</text>
        <text x="415" y="115">A</text><text x="560" y="115">B</text>
      </g>
      <g fill="#d5e5f5" fontSize="12" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">
        <text x="162" y="192">A ∩ B = ∅ · saling lepas</text>
        <text x="488" y="192">A ∩ B ≠ ∅ · beririsan</text>
      </g>
      <text x="160" y="40" fill="#a8b8cf" fontSize="11" fontFamily="sans-serif" textAnchor="middle">Ruang sampel S</text>
      <text x="488" y="40" fill="#a8b8cf" fontSize="11" fontFamily="sans-serif" textAnchor="middle">Ruang sampel S</text>
    </svg>
  );
}

function DiceSumGridSvg() {
  const cells = [];
  for (let first = 1; first <= 8; first += 1) {
    for (let second = 1; second <= 8; second += 1) {
      const x = 76 + (second - 1) * 38;
      const y = 51 + (first - 1) * 37;
      const sum = first + second;
      const sumFive = sum === 5;
      const sumEleven = sum === 11;
      cells.push(
        <g key={`${first}-${second}`}>
          <rect
            x={x}
            y={y}
            width="35"
            height="34"
            rx="5"
            fill={sumFive ? "#155e55" : sumEleven ? "#704b19" : "#172a40"}
            stroke={sumFive ? "#8ce2b8" : sumEleven ? "#f6bd60" : "#43566d"}
          />
          <text x={x + 17.5} y={y + 22} fill="#e7eef8" fontSize="10" fontFamily="monospace" textAnchor="middle">
            {first},{second}
          </text>
        </g>,
      );
    }
  }
  return (
    <svg
      viewBox="0 0 430 405"
      role="img"
      aria-label="Tabel ruang sampel 64 pasangan dari dua dadu delapan sisi; empat pasangan berjumlah lima diberi warna hijau dan enam pasangan berjumlah sebelas diberi warna jingga"
      className="mx-auto h-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#091426] p-2"
      data-testid="diagram-two-eight-sided-dice"
    >
      <text x="228" y="19" fill="#d5e5f5" fontSize="11" textAnchor="middle">Dadu kedua</text>
      <text x="16" y="210" fill="#d5e5f5" fontSize="11" textAnchor="middle" transform="rotate(-90 16 210)">Dadu pertama</text>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((value, index) => (
        <g key={value} fill="#9edce8" fontSize="10" fontWeight="700" textAnchor="middle">
          <text x={93 + index * 38} y="44">{value}</text><text x="67" y={72 + index * 37}>{value}</text>
        </g>
      ))}
      {cells}
      <text x="220" y="390" fill="#8ce2b8" fontSize="10" fontWeight="700" textAnchor="middle">
        Hijau: jumlah 5 · jingga: jumlah 11
      </text>
    </svg>
  );
}

function MarbleBagSvg() {
  const marbles = [
    ...Array.from({ length: 5 }, (_, i) => ({ color: "#ef6472", label: "M", i })),
    ...Array.from({ length: 7 }, (_, i) => ({ color: "#51b7e5", label: "B", i: i + 5 })),
    ...Array.from({ length: 4 }, (_, i) => ({ color: "#f1c453", label: "K", i: i + 12 })),
  ];
  return (
    <svg
      viewBox="0 0 340 220"
      role="img"
      aria-label="Kantong berisi lima kelereng merah, tujuh biru, dan empat kuning, seluruhnya enam belas"
      className="mx-auto h-auto w-full max-w-sm rounded-2xl border border-white/10 bg-[#091426] p-3"
      data-testid="diagram-marble-bag"
    >
      <path d="M86 38Q170 58 254 38L267 79Q300 120 275 183Q170 203 65 183Q40 120 73 79Z" fill="#152940" stroke="#9bd9e6" strokeWidth="3" />
      <path d="M86 41Q170 60 254 41" fill="none" stroke="#f6bd60" strokeWidth="8" strokeLinecap="round" />
      {marbles.map((marble) => {
        const x = 101 + (marble.i % 4) * 46;
        const y = 96 + Math.floor(marble.i / 4) * 39;
        return (
          <g key={marble.i}>
            <circle cx={x} cy={y} r="16" fill={marble.color} stroke="#fff" strokeOpacity=".75" strokeWidth="1.5" />
            <text x={x} y={y + 4} fill="#102033" fontSize="10" fontWeight="800" textAnchor="middle">{marble.label}</text>
          </g>
        );
      })}
      <text x="170" y="211" fill="#d5e5f5" fontSize="11" textAnchor="middle">Merah 5 · Biru 7 · Kuning 4</text>
    </svg>
  );
}

function SpinnerCoinOutcomesSvg() {
  const rows = Array.from({ length: 6 }, (_, index) => index + 1);
  return (
    <svg
      viewBox="0 0 390 315"
      role="img"
      aria-label="Dua kolom hasil koin Angka atau Gambar untuk pemutar bernomor satu sampai enam; hasil pemutar genap dan sisi Gambar ditandai"
      className="mx-auto h-auto w-full max-w-md rounded-2xl border border-white/10 bg-[#091426] p-3"
      data-testid="diagram-spinner-and-coin"
    >
      <text x="237" y="23" fill="#d5e5f5" fontSize="12" textAnchor="middle">Sisi koin</text>
      <text x="18" y="173" fill="#d5e5f5" fontSize="12" textAnchor="middle" transform="rotate(-90 18 173)">Angka pemutar</text>
      <text x="184" y="52" fill="#9edce8" fontSize="12" fontWeight="700" textAnchor="middle">A</text>
      <text x="286" y="52" fill="#9edce8" fontSize="12" fontWeight="700" textAnchor="middle">G</text>
      {rows.map((value, index) => {
        const y = 61 + index * 39;
        const isEven = value % 2 === 0;
        return (
          <g key={value}>
            <text x="80" y={y + 23} fill="#9edce8" fontSize="12" fontWeight="700" textAnchor="middle">{value}</text>
            {[{ side: "A", x: 143 }, { side: "G", x: 245 }].map(({ side, x }) => {
              const isBoth = isEven && side === "G";
              return (
                <g key={side}>
                  <rect x={x} y={y} width="94" height="33" rx="8" fill={isBoth ? "#155e55" : isEven ? "#17394b" : "#172a40"} stroke={isBoth ? "#8ce2b8" : "#52657b"} />
                  <text x={x + 47} y={y + 21} fill="#fff" fontSize="11" fontFamily="monospace" textAnchor="middle">
                    ({value},{side})
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
      <text x="194" y="303" fill="#8ce2b8" fontSize="10" fontWeight="700" textAnchor="middle">
        Hijau: pemutar genap sekaligus sisi Gambar
      </text>
    </svg>
  );
}

function NumberSetVennSvg() {
  const entries = [
    { value: "1", x: 48, y: 82 }, { value: "5", x: 48, y: 173 }, { value: "7", x: 432, y: 82 },
    { value: "11", x: 432, y: 173 }, { value: "13", x: 240, y: 42 },
    { value: "2", x: 112, y: 104 }, { value: "4", x: 128, y: 145 }, { value: "8", x: 112, y: 184 },
    { value: "10", x: 169, y: 91 }, { value: "14", x: 170, y: 195 },
    { value: "6", x: 239, y: 112 }, { value: "12", x: 239, y: 167 },
    { value: "3", x: 330, y: 104 }, { value: "9", x: 346, y: 145 }, { value: "15", x: 330, y: 184 },
  ];
  return (
    <svg
      viewBox="0 0 480 255"
      role="img"
      aria-label="Diagram Venn ruang sampel bilangan satu sampai lima belas. Lingkaran A memuat bilangan genap, B memuat kelipatan tiga, irisan A dan B memuat enam dan dua belas."
      className="mx-auto h-auto w-full max-w-xl rounded-2xl border border-white/10 bg-[#091426] p-3"
      data-testid="diagram-number-set-venn"
    >
      <rect x="17" y="18" width="446" height="222" rx="15" fill="#102238" stroke="#9edce8" strokeWidth="2" />
      <circle cx="177" cy="144" r="91" fill="#155e55" fillOpacity=".54" stroke="#8ce2b8" strokeWidth="3" />
      <circle cx="294" cy="144" r="91" fill="#704b19" fillOpacity=".54" stroke="#f6bd60" strokeWidth="3" />
      <text x="34" y="44" fill="#fff" fontSize="14" fontWeight="800">S</text>
      <text x="131" y="70" fill="#d8ffea" fontSize="14" fontWeight="800">A</text>
      <text x="336" y="70" fill="#ffedc7" fontSize="14" fontWeight="800">B</text>
      {entries.map((entry) => (
        <text key={entry.value} x={entry.x} y={entry.y} fill="#fff" fontSize="12" fontWeight="700" textAnchor="middle">{entry.value}</text>
      ))}
      <text x="240" y="253" fill="#d5e5f5" fontSize="10" textAnchor="middle">A: bilangan genap · B: kelipatan 3</text>
    </svg>
  );
}

const SmaPeluangKejadianMajemukPage = () => {
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
            Peluang · Gabungkan kemungkinan!
          </div>
          <p className="font-display text-xs font-bold uppercase tracking-[.24em] text-orange-200">Bab 4</p>
          <h1 className="mt-2 font-display text-3xl font-black leading-tight tracking-tight text-primary text-glow-cyan sm:text-5xl">
            Kejadian Majemuk
          </h1>
          <p className="mx-auto mt-4 max-w-3xl font-body text-sm leading-relaxed text-slate-300 sm:text-base">
            Dua kejadian bisa saling lepas, atau bisa juga punya hasil yang sama. Yuk, gambarkan hubungan keduanya
            lalu hitung peluang “A atau B” tanpa menghitung hasil yang sama dua kali!
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
            <section id="pengertian" className="scroll-mt-6" data-testid="section-compound-events">
              <SectionHeading
                number="4.5"
                title="Kejadian majemuk: menggabungkan beberapa kejadian"
                intro="Kejadian majemuk dibentuk dengan menggabungkan dua atau lebih kejadian dari ruang sampel yang sama. Kita akan sering memakai dua operasi himpunan: irisan dan gabungan."
              />
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-300/[.05] p-4">
                  <p className="font-display text-sm font-bold text-cyan-100">Irisan A ∩ B · “A dan B”</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Memuat hasil yang sekaligus menjadi anggota A dan anggota B. Kedua syarat harus terpenuhi pada
                    hasil yang sama.
                  </p>
                </div>
                <div className="rounded-2xl border border-amber-200/15 bg-amber-300/[.05] p-4">
                  <p className="font-display text-sm font-bold text-amber-100">Gabungan A ∪ B · “A atau B”</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Memuat hasil yang termasuk A, B, atau keduanya. Dalam matematika, “atau” pada gabungan bersifat
                    inklusif: bagian irisan juga ikut dihitung.
                  </p>
                </div>
              </div>
              <DisjointAndOverlappingSvg />
              <Callout title="Jangan sampai irisan terhitung dua kali!">
                Saat A dan B memiliki hasil yang sama, menjumlahkan P(A) + P(B) menghitung anggota irisan dua kali.
                Karena itu, untuk gabungan umum kita kurangi P(A ∩ B) satu kali. Jika A dan B saling lepas, irisannya
                kosong sehingga tidak ada yang perlu dikurangkan.
              </Callout>
            </section>

            <section id="saling-lepas" className="scroll-mt-6" data-testid="section-mutually-exclusive">
              <SectionHeading
                number="4.5.1"
                title="Dua kejadian saling lepas"
                intro="Dua kejadian disebut saling lepas jika keduanya tidak mungkin terjadi pada satu percobaan yang sama. Dengan kata lain, tidak ada titik sampel yang menjadi anggota kedua kejadian sekaligus."
              />
              <Formula>A dan B saling lepas jika A ∩ B = ∅</Formula>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200/15 bg-emerald-300/[.05] p-4">
                  <p className="font-display text-sm font-bold text-emerald-100">Jika saling lepas</p>
                  <Formula>P(A ∪ B) = P(A) + P(B)</Formula>
                </div>
                <div className="rounded-2xl border border-orange-200/15 bg-orange-300/[.05] p-4">
                  <p className="font-display text-sm font-bold text-orange-100">Jika beririsan</p>
                  <Formula>P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</Formula>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Ruang sampel yang sama bisa menghasilkan pasangan kejadian yang saling lepas maupun beririsan.
                Periksa dulu anggota irisannya sebelum memilih rumus. Kalau irisan kosong, gunakan rumus sederhana;
                kalau ada anggota bersama, kurangi peluang irisan.
              </p>

              <div className="mt-5 space-y-5">
                <Example number={17} title="Mengenali kejadian yang saling lepas pada pemutar angka">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Sebuah pemutar adil memiliki delapan sektor sama besar bernomor 1 sampai 8. Ditetapkan:
                    A = mendapat bilangan genap, B = mendapat bilangan prima, dan C = mendapat angka 1 atau 3.
                  </p>
                  <Formula>
                    S = {"{1,2,3,4,5,6,7,8}"} · A = {"{2,4,6,8}"} · B = {"{2,3,5,7}"} · C = {"{1,3}"}
                  </Formula>
                  <DataTable
                    headers={["Pasangan kejadian", "Irisan", "Hubungan"]}
                    rows={[
                      ["A dan C", <span className="font-mono">∅</span>, "Saling lepas"],
                      ["A dan B", <span className="font-mono">{"{2}"}</span>, "Beririsan"],
                      ["B dan C", <span className="font-mono">{"{3}"}</span>, "Beririsan"],
                    ]}
                  />
                  <DataTable
                    caption="Hitung peluang gabungan sesuai irisan masing-masing"
                    headers={["Pertanyaan", "Perhitungan", "Hasil"]}
                    rows={[
                      [
                        "A atau C",
                        <span className="font-mono">4/8 + 2/8</span>,
                        "6/8 = 3/4",
                      ],
                      [
                        "A atau B",
                        <span className="font-mono">4/8 + 4/8 − 1/8</span>,
                        "7/8",
                      ],
                      [
                        "B atau C",
                        <span className="font-mono">4/8 + 2/8 − 1/8</span>,
                        "5/8",
                      ],
                    ]}
                  />
                  <Answer>
                    A dan C saling lepas, sehingga peluang gabungannya cukup dijumlahkan. A dan B serta B dan C
                    beririsan; hasil 2 atau 3 yang sama-sama masuk ke dua kejadian harus dikurangi sekali.
                  </Answer>
                </Example>

                <Example number={18} title="Siswa yang mengikuti klub robotik atau fotografi">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Dari 32 siswa, 14 mengikuti klub robotik, 10 mengikuti klub fotografi, dan 4 mengikuti keduanya.
                    Jika satu siswa dipilih secara acak, berapa peluang ia mengikuti sedikitnya salah satu klub?
                  </p>
                  <Formula>
                    P(R ∪ F) = P(R) + P(F) − P(R ∩ F)
                    <br />
                    = 14/32 + 10/32 − 4/32 = 20/32 = 5/8
                  </Formula>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Irisan sebanyak 4 siswa dikurangi agar mereka yang mengikuti dua klub tidak terhitung dua kali.
                  </p>
                  <Answer>
                    Peluang siswa pilihan mengikuti klub robotik atau fotografi adalah 5/8. Jika ingin mencari
                    peluang tidak mengikuti keduanya, gunakan komplemennya: 1 − 5/8 = 3/8.
                  </Answer>
                </Example>

                <Example number={19} title="Jumlah dua dadu delapan sisi">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Dua dadu adil bersisi delapan bernomor 1 sampai 8 dilempar bersama-sama. Tentukan peluang jumlah
                    mata dadu 5, jumlah mata dadu 11, kedua jumlah itu sekaligus, dan jumlah 5 atau 11.
                  </p>
                  <DiceSumGridSvg />
                  <Formula>
                    n(S) = 8 × 8 = 64
                    <br />
                    E₅ = {"{(1,4),(2,3),(3,2),(4,1)}"} · n(E₅) = 4
                    <br />
                    E₁₁ = {"{(3,8),(4,7),(5,6),(6,5),(7,4),(8,3)}"} · n(E₁₁) = 6
                  </Formula>
                  <DataTable
                    headers={["Kejadian", "Perhitungan", "Peluang"]}
                    rows={[
                      ["Jumlah 5", "4/64", "1/16"],
                      ["Jumlah 11", "6/64", "3/32"],
                      ["Jumlah 5 dan 11 sekaligus", "0/64", "0"],
                      ["Jumlah 5 atau 11", "(4 + 6)/64", "10/64 = 5/32"],
                    ]}
                  />
                  <Answer>
                    Dalam satu lemparan, jumlahnya tidak mungkin sekaligus 5 dan 11, jadi kedua kejadian saling
                    lepas. Peluang jumlah 5 atau 11 adalah 1/16 + 3/32 = 5/32.
                  </Answer>
                </Example>
              </div>
            </section>

            <section id="peluang-gabungan" className="scroll-mt-6" data-testid="section-union-probability">
              <SectionHeading
                number="∪"
                title="Peluang gabungan saat kejadian beririsan"
                intro="Pada percobaan lain, dua kejadian dapat muncul bersamaan. Gunakan rumus umum gabungan dan pastikan hasil yang menjadi anggota kedua kejadian tidak dihitung ganda."
              />
              <Formula>P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</Formula>

              <div className="mt-5 space-y-5">
                <Example number={20} title="Mengambil satu kelereng dari kantong">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Sebuah kantong berisi 5 kelereng merah (M), 7 biru (B), dan 4 kuning (K). Satu kelereng diambil
                    secara acak. Tentukan peluang mendapat kelereng merah, biru, merah dan biru sekaligus, serta kuning
                    atau biru.
                  </p>
                  <MarbleBagSvg />
                  <Formula>n(S) = 5 + 7 + 4 = 16</Formula>
                  <DataTable
                    headers={["Kejadian", "Alasan atau perhitungan", "Peluang"]}
                    rows={[
                      ["Merah", "5 dari 16 kelereng", "5/16"],
                      ["Biru", "7 dari 16 kelereng", "7/16"],
                      ["Merah dan biru", "Satu kelereng tidak mungkin memiliki dua warna", "0"],
                      ["Kuning atau biru", "K dan B saling lepas: (4 + 7)/16", "11/16"],
                    ]}
                  />
                  <Answer>
                    Saat hanya satu kelereng diambil, warnanya tidak mungkin sekaligus merah dan biru. Karena itu,
                    kejadian merah dan biru saling lepas, sedangkan peluang kuning atau biru diperoleh dengan
                    menjumlahkan 4/16 dan 7/16.
                  </Answer>
                </Example>

                <Example number={21} title="Pemutar angka dan satu lemparan koin">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Sebuah pemutar bernomor 1 sampai 6 dan sekeping koin (A = Angka, G = Gambar) dimainkan bersama.
                    Misalkan E₁ adalah kejadian pemutar menunjukkan bilangan genap, dan E₂ adalah kejadian koin
                    menunjukkan Gambar. Tentukan peluang E₁, E₂, E₁ dan E₂, serta E₁ atau E₂.
                  </p>
                  <SpinnerCoinOutcomesSvg />
                  <Formula>
                    S = {"{(1,A),(1,G),(2,A),(2,G),…,(6,A),(6,G)}"} · n(S) = 12
                    <br />
                    n(E₁) = 6 · n(E₂) = 6 · n(E₁ ∩ E₂) = 3
                  </Formula>
                  <DataTable
                    headers={["Kejadian", "Perhitungan", "Peluang"]}
                    rows={[
                      ["E₁: pemutar genap", "6/12", "1/2"],
                      ["E₂: koin Gambar", "6/12", "1/2"],
                      ["E₁ dan E₂", "3/12", "1/4"],
                      ["E₁ atau E₂", "(6 + 6 − 3)/12", "9/12 = 3/4"],
                    ]}
                  />
                  <Answer>
                    E₁ dan E₂ tidak saling lepas karena ada tiga hasil yang memenuhi keduanya: (2,G), (4,G), dan
                    (6,G). Jadi, peluang gabungannya adalah P(E₁) + P(E₂) − P(E₁ ∩ E₂) = 1/2 + 1/2 − 1/4 = 3/4.
                  </Answer>
                </Example>

                <Example number={22} title="Bilangan genap atau kelipatan tiga">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Satu bilangan dipilih secara acak dari S = {"{1, 2, 3, …, 15}"}. Misalkan A adalah kejadian
                    terpilih bilangan genap dan B adalah kejadian terpilih kelipatan 3. Gunakan diagram Venn untuk
                    menentukan peluang A, B, A dan B, serta A atau B.
                  </p>
                  <NumberSetVennSvg />
                  <Formula>
                    A = {"{2,4,6,8,10,12,14}"} · n(A) = 7
                    <br />
                    B = {"{3,6,9,12,15}"} · n(B) = 5
                    <br />
                    A ∩ B = {"{6,12}"} · n(A ∩ B) = 2
                  </Formula>
                  <DataTable
                    headers={["Peluang", "Perhitungan", "Hasil"]}
                    rows={[
                      ["P(A)", "7/15", "7/15"],
                      ["P(B)", "5/15", "1/3"],
                      ["P(A ∩ B)", "2/15", "2/15"],
                      ["P(A ∪ B)", "(7 + 5 − 2)/15", "10/15 = 2/3"],
                    ]}
                  />
                  <Answer>
                    A dan B tidak saling lepas karena 6 dan 12 adalah bilangan genap sekaligus kelipatan 3. Rumus
                    gabungan mengurangi dua anggota irisan itu satu kali, sehingga P(A ∪ B) = 2/3.
                  </Answer>
                </Example>
              </div>
            </section>

            <section className="rounded-3xl border border-cyan-200/15 bg-cyan-300/[.045] p-5" data-testid="lesson-takeaways">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-200/10 text-cyan-100">
                  <Check className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="font-display text-xl font-extrabold text-white">Waktunya pilih rumus yang tepat!</h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-200">
                <li>• Irisan A ∩ B berarti A dan B terjadi bersama.</li>
                <li>• Gabungan A ∪ B berarti A atau B atau keduanya terjadi.</li>
                <li>• Jika saling lepas, A ∩ B = ∅ dan P(A ∪ B) = P(A) + P(B).</li>
                <li>• Jika beririsan, P(A ∪ B) = P(A) + P(B) − P(A ∩ B).</li>
                <li>• Selalu periksa apakah ada titik sampel yang termasuk kedua kejadian.</li>
              </ul>
              <p className="mt-4 font-body text-sm font-semibold text-cyan-100">
                Hebat! Sekarang kamu tahu kapan peluang dijumlahkan langsung dan kapan irisan harus dikurangi.
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
                  Cek irisan lebih dulu: kosong berarti saling lepas; ada anggota yang sama berarti gunakan rumus
                  gabungan umum.
                </p>
                <button
                  type="button"
                  onClick={() => jumpTo("pengertian")}
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

export default SmaPeluangKejadianMajemukPage;
