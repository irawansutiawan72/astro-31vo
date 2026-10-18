import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const sections = [
  ["4.1", "Ruang sampel", "ruang-sampel"],
  ["4.2", "Kejadian", "kejadian"],
  ["4.2.1", "Frekuensi relatif", "frekuensi-relatif"],
  ["4.2.2", "Kisaran nilai peluang", "kisaran-peluang"],
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
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
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
          <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">
            Contoh {number}
          </p>
          <h3 className="font-display text-base font-bold text-white sm:text-lg">{title}</h3>
        </div>
      </div>
      <div className="space-y-4 p-4 sm:p-5">{children}</div>
    </article>
  );
}

function Formula({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div
      data-testid={label ? `formula-${label}` : undefined}
      className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/80 px-4 py-3 text-center font-mono text-sm leading-7 text-cyan-100 sm:text-base"
    >
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

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="rounded-2xl border border-violet-200/20 bg-violet-300/[.06] p-4">
      <p className="font-display text-sm font-bold text-violet-100">{title}</p>
      <div className="mt-2 text-sm leading-relaxed text-slate-300">{children}</div>
    </aside>
  );
}

function TokenBagSvg() {
  return (
    <svg
      viewBox="0 0 330 210"
      role="img"
      aria-label="Ilustrasi kantong berisi tiga token kuning, dua token merah, dan satu token hijau"
      className="mx-auto h-auto w-full max-w-sm rounded-2xl border border-white/10 bg-[#091426] p-3"
      data-testid="diagram-token-bag"
    >
      <path d="M120 38Q165 58 210 38L222 75Q266 105 253 170Q165 195 77 170Q64 105 108 75Z" fill="#172a40" stroke="#9bd9e6" strokeWidth="3" />
      <path d="M117 42Q165 61 213 42" fill="none" stroke="#f6bd60" strokeWidth="8" strokeLinecap="round" />
      <g stroke="#fff" strokeOpacity=".8" strokeWidth="2">
        <circle cx="125" cy="104" r="20" fill="#f5c84c" /><circle cx="173" cy="105" r="20" fill="#e65a61" />
        <circle cx="215" cy="110" r="20" fill="#f5c84c" /><circle cx="108" cy="148" r="20" fill="#36c6a1" />
        <circle cx="155" cy="151" r="20" fill="#e65a61" /><circle cx="202" cy="153" r="20" fill="#f5c84c" />
      </g>
      <g fill="#102033" fontSize="12" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">
        <text x="125" y="109">K</text><text x="173" y="110">M</text><text x="215" y="115">K</text>
        <text x="108" y="153">H</text><text x="155" y="156">M</text><text x="202" y="158">K</text>
      </g>
      <text x="165" y="198" fill="#d5e5f5" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Kuning 3 · Merah 2 · Hijau 1</text>
    </svg>
  );
}

function LightStatusTree() {
  return (
    <svg
      viewBox="0 0 640 240"
      role="img"
      aria-label="Diagram pohon empat kemungkinan status dua lampu: nyala-nyala, nyala-mati, mati-nyala, dan mati-mati"
      className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-2"
      data-testid="diagram-light-status-tree"
    >
      <g fill="none" stroke="#66d9e8" strokeWidth="2.5">
        <path d="M90 120L225 60M90 120L225 180M260 60L430 40M260 60L430 83M260 180L430 157M260 180L430 200" />
      </g>
      <g fill="#13243a" stroke="#f6bd60" strokeWidth="2">
        <circle cx="70" cy="120" r="25" /><circle cx="245" cy="60" r="22" /><circle cx="245" cy="180" r="22" />
      </g>
      <g fill="#fff4db" fontSize="13" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">
        <text x="70" y="125">Mulai</text><text x="245" y="65">N</text><text x="245" y="185">M</text>
      </g>
      <g fill="#d8ffea" fontSize="13" fontWeight="700" fontFamily="sans-serif">
        <text x="455" y="45">(N, N)</text><text x="455" y="88">(N, M)</text>
        <text x="455" y="162">(M, N)</text><text x="455" y="205">(M, M)</text>
      </g>
      <g fill="#a8b8cf" fontSize="11" fontFamily="sans-serif">
        <text x="130" y="68">status lampu 1</text><text x="324" y="33">status lampu 2</text>
        <text x="520" y="115">N = nyala</text><text x="520" y="133">M = mati</text>
      </g>
    </svg>
  );
}

function EventSetSvg() {
  return (
    <svg
      viewBox="0 0 420 220"
      role="img"
      aria-label="Ruang sampel berisi angka satu sampai delapan, dengan kejadian prima dua, tiga, lima, dan tujuh ditandai"
      className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-3"
      data-testid="diagram-event-subset"
    >
      <rect x="28" y="28" width="364" height="154" rx="24" fill="#102238" stroke="#66d9e8" strokeWidth="2" />
      <text x="48" y="53" fill="#a8e9f3" fontSize="13" fontWeight="700" fontFamily="sans-serif">S = {1, 2, 3, 4, 5, 6, 7, 8}</text>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((value, index) => {
        const x = 66 + (index % 4) * 83;
        const y = index < 4 ? 98 : 148;
        const isPrime = [2, 3, 5, 7].includes(value);
        return (
          <g key={value}>
            <circle cx={x} cy={y} r="20" fill={isPrime ? "#176a68" : "#28394f"} stroke={isPrime ? "#8ce2b8" : "#62748b"} strokeWidth="2" />
            <text x={x} y={y + 5} fill="#fff" fontSize="15" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">{value}</text>
          </g>
        );
      })}
      <text x="210" y="205" fill="#8ce2b8" fontSize="12" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">A = kejadian mendapat bilangan prima</text>
    </svg>
  );
}

function SuitCardsSvg() {
  const suits = [
    { symbol: "♣", name: "Keriting", color: "#19263a" },
    { symbol: "♦", name: "Wajik", color: "#fb7185" },
    { symbol: "♥", name: "Hati", color: "#fb7185" },
    { symbol: "♠", name: "Sekop", color: "#19263a" },
  ];
  return (
    <svg
      viewBox="0 0 440 165"
      role="img"
      aria-label="Empat kartu lambang keriting, wajik, hati, dan sekop; keriting dan sekop berwarna hitam"
      className="mx-auto h-auto w-full max-w-xl rounded-2xl border border-white/10 bg-[#091426] p-3"
      data-testid="diagram-card-suits"
    >
      {suits.map((suit, index) => {
        const x = 28 + index * 101;
        return (
          <g key={suit.name}>
            <rect x={x} y="12" width="78" height="108" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            <text x={x + 39} y="80" fill={suit.color} fontSize="48" fontFamily="serif" textAnchor="middle">{suit.symbol}</text>
            <text x={x + 39} y="145" fill="#d5e5f5" fontSize="11" fontFamily="sans-serif" textAnchor="middle">{suit.name}</text>
          </g>
        );
      })}
    </svg>
  );
}

function FrequencyTrendSvg() {
  const values = [0.52, 0.2, 0.43, 0.3, 0.36, 0.27, 0.33, 0.29, 0.32, 0.3, 0.31, 0.3];
  const points = values.map((value, index) => `${42 + index * 43},${155 - value * 190}`).join(" ");
  return (
    <svg
      viewBox="0 0 560 220"
      role="img"
      aria-label="Grafik ilustratif frekuensi relatif hasil percobaan yang berfluktuasi lalu mendekati peluang teoretik tiga per sepuluh"
      className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-2"
      data-testid="diagram-relative-frequency-trend"
    >
      <path d="M45 24V165H535" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
      {[0, 0.2, 0.4, 0.6].map((value) => {
        const y = 155 - value * 190;
        return <g key={value}><path d={`M45 ${y}H535`} stroke="#94a3b8" strokeOpacity=".16" /><text x="35" y={y + 4} fill="#a8b8cf" fontSize="10" textAnchor="end">{value.toFixed(1)}</text></g>;
      })}
      <path d="M45 98H535" stroke="#f6bd60" strokeWidth="2" strokeDasharray="7 6" />
      <polyline points={points} fill="none" stroke="#66d9e8" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      {values.map((value, index) => <circle key={index} cx={42 + index * 43} cy={155 - value * 190} r="3.5" fill="#8ce2b8" />)}
      <text x="528" y="91" fill="#f6bd60" fontSize="11" fontWeight="700" textAnchor="end">nilai acuan 0,3</text>
      <text x="290" y="197" fill="#d5e5f5" fontSize="11" textAnchor="middle">jumlah percobaan bertambah →</text>
      <text x="14" y="38" fill="#d5e5f5" fontSize="10" transform="rotate(-90 14 38)">frekuensi relatif</text>
    </svg>
  );
}

function TwoSpinnerGridSvg() {
  return (
    <svg
      viewBox="0 0 360 330"
      role="img"
      aria-label="Tabel 16 pasangan hasil dua spinner bernomor satu sampai empat; empat pasangan yang jumlahnya lima ditandai"
      className="mx-auto h-auto w-full max-w-md rounded-2xl border border-white/10 bg-[#091426] p-3"
      data-testid="diagram-two-spinner-grid"
    >
      <text x="190" y="20" fill="#d5e5f5" fontSize="12" textAnchor="middle">Spinner kedua</text>
      <text x="14" y="174" fill="#d5e5f5" fontSize="12" textAnchor="middle" transform="rotate(-90 14 174)">Spinner pertama</text>
      {[1, 2, 3, 4].map((value, index) => (
        <g key={`header-${value}`} fill="#9edce8" fontSize="12" fontWeight="700" textAnchor="middle">
          <text x={94 + index * 58} y="49">{value}</text><text x="53" y={87 + index * 58}>{value}</text>
        </g>
      ))}
      {[1, 2, 3, 4].flatMap((first) =>
        [1, 2, 3, 4].map((second) => {
          const x = 68 + (second - 1) * 58;
          const y = 60 + (first - 1) * 58;
          const sumFive = first + second === 5;
          const same = first === second;
          return (
            <g key={`${first}-${second}`}>
              <rect x={x} y={y} width="54" height="54" rx="8" fill={sumFive ? "#155e55" : same ? "#704b19" : "#172a40"} stroke={sumFive ? "#8ce2b8" : same ? "#f6bd60" : "#52657b"} />
              <text x={x + 27} y={y + 33} fill="#fff" fontSize="13" fontFamily="monospace" textAnchor="middle">({first},{second})</text>
            </g>
          );
        }),
      )}
      <text x="176" y="307" fill="#8ce2b8" fontSize="11" fontWeight="700" textAnchor="middle">(hijau) jumlah 5 · (jingga) hasil kembar</text>
    </svg>
  );
}

function ProbabilityNumberLineSvg() {
  return (
    <svg
      viewBox="0 0 560 145"
      role="img"
      aria-label="Garis bilangan peluang dari nol untuk mustahil sampai satu untuk pasti; semua peluang berada di antaranya"
      className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-3"
      data-testid="diagram-probability-range"
    >
      <path d="M65 72H495" stroke="#66d9e8" strokeWidth="5" strokeLinecap="round" />
      <path d="m485 62 16 10-16 10" fill="none" stroke="#66d9e8" strokeWidth="4" strokeLinejoin="round" />
      {[65, 280, 495].map((x) => <path key={x} d={`M${x} 58V87`} stroke="#f8fafc" strokeWidth="3" />)}
      <circle cx="65" cy="72" r="11" fill="#fb7185" /><circle cx="495" cy="72" r="11" fill="#8ce2b8" />
      <text x="65" y="35" fill="#fda4af" fontSize="13" fontWeight="700" textAnchor="middle">0 · mustahil</text>
      <text x="280" y="110" fill="#d5e5f5" fontSize="12" textAnchor="middle">0 &lt; P(A) &lt; 1 · mungkin</text>
      <text x="495" y="35" fill="#8ce2b8" fontSize="13" fontWeight="700" textAnchor="middle">1 · pasti</text>
      <text x="65" y="108" fill="#d5e5f5" fontSize="12" textAnchor="middle">P(A) = 0</text>
      <text x="495" y="108" fill="#d5e5f5" fontSize="12" textAnchor="middle">P(A) = 1</text>
    </svg>
  );
}

function PrizeBagSvg() {
  return (
    <svg
      viewBox="0 0 360 190"
      role="img"
      aria-label="Ilustrasi kotak undian yang seluruhnya berisi delapan kartu bergambar bintang"
      className="mx-auto h-auto w-full max-w-sm rounded-2xl border border-white/10 bg-[#091426] p-3"
      data-testid="diagram-certain-prize"
    >
      <path d="M75 65H285L270 160H90Z" fill="#162b43" stroke="#66d9e8" strokeWidth="3" />
      <path d="M63 54H297V72H63Z" fill="#f6bd60" />
      {Array.from({ length: 8 }, (_, index) => {
        const x = 112 + (index % 4) * 46;
        const y = 91 + Math.floor(index / 4) * 43;
        return <g key={index}><rect x={x - 17} y={y - 15} width="34" height="31" rx="6" fill="#f8fafc" stroke="#dbeafe" /><text x={x} y={y + 7} fill="#e7a927" fontSize="19" textAnchor="middle">★</text></g>;
      })}
      <text x="180" y="183" fill="#d5e5f5" fontSize="12" textAnchor="middle">8 kartu bintang · tidak ada kartu bulan</text>
    </svg>
  );
}

function DiceSumGridSvg() {
  const cells = [];
  for (let first = 1; first <= 6; first += 1) {
    for (let second = 1; second <= 6; second += 1) {
      const x = 86 + (second - 1) * 47;
      const y = 62 + (first - 1) * 45;
      const sum = first + second;
      const sumEight = sum === 8;
      const sumTen = sum === 10;
      cells.push(
        <g key={`${first}-${second}`}>
          <rect
            x={x}
            y={y}
            width="43"
            height="41"
            rx="7"
            fill={sumEight ? "#155e55" : sumTen ? "#704b19" : "#172a40"}
            stroke={sumEight ? "#8ce2b8" : sumTen ? "#f6bd60" : "#43566d"}
          />
          <text x={x + 21.5} y={y + 25} fill="#e7eef8" fontSize="12" fontFamily="monospace" textAnchor="middle">
            {first},{second}
          </text>
        </g>,
      );
    }
  }
  return (
    <svg
      viewBox="0 0 430 355"
      role="img"
      aria-label="Tabel 36 pasangan hasil dua dadu; lima pasangan berjumlah delapan ditandai hijau dan tiga pasangan berjumlah sepuluh ditandai jingga"
      className="mx-auto h-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#091426] p-2"
      data-testid="diagram-two-dice-sums"
    >
      <text x="225" y="21" fill="#d5e5f5" fontSize="12" textAnchor="middle">Dadu kedua</text>
      <text x="17" y="203" fill="#d5e5f5" fontSize="12" textAnchor="middle" transform="rotate(-90 17 203)">Dadu pertama</text>
      {[1, 2, 3, 4, 5, 6].map((value, index) => (
        <g key={value} fill="#9edce8" fontSize="12" fontWeight="700" textAnchor="middle">
          <text x={107 + index * 47} y="49">{value}</text><text x="69" y={87 + index * 45}>{value}</text>
        </g>
      ))}
      {cells}
      <text x="220" y="345" fill="#8ce2b8" fontSize="11" fontWeight="700" textAnchor="middle">(hijau) jumlah 8 · (jingga) jumlah 10</text>
    </svg>
  );
}

const SmaPeluangRuangSampelDistribusiPage = () => {
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
            Peluang · Kita jelajahi kemungkinan!
          </div>
          <p className="font-display text-xs font-bold uppercase tracking-[.24em] text-orange-200">Bab 4</p>
          <h1 className="mt-2 font-display text-3xl font-black leading-tight tracking-tight text-primary text-glow-cyan sm:text-5xl">
            Ruang Sampel dan Distribusi Peluang Kejadian
          </h1>
          <p className="mx-auto mt-4 max-w-3xl font-body text-sm leading-relaxed text-slate-300 sm:text-base">
            Siap menjelajahi semua hasil yang mungkin muncul? Kita akan menyusun ruang sampel, mengenali kejadian,
            membaca frekuensi relatif, lalu menghitung peluang dengan teliti. Pelan-pelan saja—setiap kemungkinan
            bisa kita petakan!
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
            <section id="ruang-sampel" className="scroll-mt-6" data-testid="section-sample-space">
              <SectionHeading
                number="4.1"
                title="Ruang sampel: daftar lengkap semua hasil yang mungkin"
                intro="Dalam suatu percobaan, hasil yang benar-benar muncul belum tentu bisa kita ramalkan. Namun, semua hasil yang mungkin dapat kita daftarkan lebih dahulu. Kumpulan lengkap itulah ruang sampel."
              />
              <div className="grid min-w-0 gap-4 md:grid-cols-[minmax(0,1fr)_300px]">
                <div className="min-w-0 space-y-4">
                  <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4 text-sm leading-relaxed text-slate-200">
                    <p>
                      Ruang sampel biasanya dilambangkan dengan <span className="font-mono text-cyan-100">S</span>.
                      Setiap hasil yang mungkin di dalamnya disebut <strong className="text-white">titik sampel</strong>.
                      Banyak anggota ruang sampel ditulis <span className="font-mono text-cyan-100">n(S)</span>.
                    </p>
                    <p className="mt-3">
                      Contohnya, sebuah kantong berisi 3 token kuning (K), 2 token merah (M), dan 1 token hijau (H).
                      Jika yang dicatat hanya warnanya, hasil satu kali pengambilan adalah{" "}
                      <span className="font-mono text-cyan-100">S = {"{K, M, H}"}</span>, sehingga{" "}
                      <span className="font-mono text-cyan-100">n(S) = 3</span>. Setiap warna adalah satu titik sampel.
                    </p>
                  </div>
                  <Formula label="sample-space">
                    Ruang sampel S = {"{semua hasil yang mungkin}"} · titik sampel = satu anggota S
                  </Formula>
                  <DataTable
                    caption="Cara menuliskan hasil bergantung pada apa yang diamati"
                    headers={["Percobaan", "Ruang sampel", "Banyak titik sampel"]}
                    rows={[
                      [<>Lempar satu koin</>, <span className="font-mono">{"{A, G}"}</span>, "2"],
                      [<>Putar pemutar bernomor 1–4</>, <span className="font-mono">{"{1, 2, 3, 4}"}</span>, "4"],
                      [<>Pilih satu token berdasarkan identitasnya</>, <span className="font-mono">{"{K₁, K₂, K₃, M₁, M₂, H₁}"}</span>, "6"],
                    ]}
                  />
                </div>
                <TokenBagSvg />
              </div>
              <Callout title="Catatan penting: hasil apa yang sedang dicatat?">
                Jika kita hanya mencatat warna, tiga token kuning tampak sebagai satu hasil “kuning”. Jika tiap token
                diberi label dan identitasnya dicatat, ada enam hasil. Keduanya dapat menjadi ruang sampel yang tepat—
                asalkan cara pencatatan konsisten. Untuk menghitung peluang dengan membagi banyak hasil, pastikan dulu
                titik-titik sampelnya sama mungkin terjadi.
              </Callout>

              <div className="mt-5 space-y-5">
                <Example number={1} title="Mencatat status dua lampu panggung">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Dua lampu panggung diperiksa satu demi satu. Setiap lampu mungkin menyala (N) atau mati (M).
                    Tuliskan ruang sampelnya, lalu tentukan kejadian “tepat satu lampu menyala”.
                  </p>
                  <LightStatusTree />
                  <Formula>
                    S = {"{(N,N), (N,M), (M,N), (M,M)}"} · n(S) = 4
                  </Formula>
                  <Answer>
                    Kejadian tepat satu lampu menyala adalah A = {"{(N,M), (M,N)}"}. Ada dua hasil yang memenuhi
                    kejadian tersebut.
                  </Answer>
                </Example>

                <Example number={2} title="Mengelompokkan hasil tiga modul lampu">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Tiga modul lampu diuji secara terpisah. Catat setiap modul sebagai N (nyala) atau M (mati), dan
                    urutkan hasil sesuai Modul 1, Modul 2, lalu Modul 3. Berapa ruang sampelnya? Mana hasil dengan
                    tepat dua lampu menyala?
                  </p>
                  <DataTable
                    caption="Semua hasil yang mungkin dikelompokkan berdasarkan banyak lampu yang menyala"
                    headers={["Banyak yang nyala", "Hasil-hasil", "Banyak hasil"]}
                    rows={[
                      ["0", <span className="font-mono">MMM</span>, "1"],
                      ["1", <span className="font-mono">NMM, MNM, MMN</span>, "3"],
                      ["2", <span className="font-mono">NNM, NMN, MNN</span>, "3"],
                      ["3", <span className="font-mono">NNN</span>, "1"],
                    ]}
                  />
                  <Formula>
                    S = {"{NNN, NNM, NMN, MNN, NMM, MNM, MMN, MMM}"} · n(S) = 8
                  </Formula>
                  <Answer>
                    A = {"{NNM, NMN, MNN}"} adalah kejadian tepat dua lampu menyala. Urutan penting karena Modul 1
                    yang nyala dan Modul 2 yang nyala merupakan hasil berbeda.
                  </Answer>
                </Example>
              </div>
            </section>

            <section id="kejadian" className="scroll-mt-6" data-testid="section-events">
              <SectionHeading
                number="4.2"
                title="Kejadian adalah bagian dari ruang sampel"
                intro="Setelah semua kemungkinan terkumpul, kita bisa memilih hasil-hasil yang memenuhi syarat tertentu. Kumpulan terpilih itu disebut kejadian."
              />
              <div className="grid min-w-0 gap-4 md:grid-cols-[minmax(0,1fr)_380px]">
                <div className="min-w-0 space-y-4">
                  <p className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-relaxed text-slate-200">
                    Jika ruang sampel adalah <span className="font-mono text-cyan-100">S</span>, kejadian{" "}
                    <span className="font-mono text-cyan-100">A</span> merupakan himpunan bagian dari{" "}
                    <span className="font-mono text-cyan-100">S</span>, ditulis{" "}
                    <span className="font-mono text-cyan-100">A ⊆ S</span>. Jadi, setiap anggota kejadian A juga
                    harus merupakan titik sampel yang mungkin. Kejadian dapat memuat satu, beberapa, semua, atau
                    bahkan tidak satu pun hasil.
                  </p>
                  <Formula>
                    A ⊆ S · kejadian = kumpulan titik sampel yang memenuhi syarat
                  </Formula>
                </div>
                <EventSetSvg />
              </div>

              <Example number={3} title="Memilih satu kartu dari empat lambang">
                <p className="text-sm leading-relaxed text-slate-200">
                  Dalam permainan mini, satu kartu lambang diambil secara acak dari ♣, ♦, ♥, dan ♠. Ruang sampelnya
                  adalah S = {"{♣, ♦, ♥, ♠}"}. Misalkan kejadian B adalah “mendapat lambang berwarna hitam” dan
                  kejadian R adalah “mendapat lambang merah”.
                </p>
                <SuitCardsSvg />
                <Formula>
                  B = {"{♣, ♠}"} · R = {"{♦, ♥}"} · B ⊆ S dan R ⊆ S
                </Formula>
                <Answer>
                  Setiap kejadian berisi titik sampel dari ruang sampel. Di sini, B dan R masing-masing memiliki dua
                  anggota. Keduanya tidak terjadi bersamaan saat satu kartu saja dipilih.
                </Answer>
              </Example>
            </section>

            <section id="frekuensi-relatif" className="scroll-mt-6" data-testid="section-relative-frequency">
              <SectionHeading
                number="4.2.1"
                title="Frekuensi relatif: peluang yang terlihat dari percobaan"
                intro="Kadang-kadang kita ingin mengetahui seberapa sering suatu kejadian benar-benar muncul. Caranya, bandingkan banyak kemunculan kejadian itu dengan seluruh percobaan."
              />
              <Formula label="relative-frequency">
                Frekuensi relatif A = banyak kemunculan A ÷ banyak seluruh percobaan
              </Formula>
              <p className="mt-4 text-sm leading-relaxed text-slate-200">
                Frekuensi relatif juga disebut peluang empirik. Nilainya dihitung setelah percobaan dilakukan; karena
                itu, hasilnya bergantung pada data percobaan. Semakin banyak percobaan sejenis dilakukan, frekuensi
                relatif biasanya makin mendekati peluang teoretik, meskipun tidak harus tepat sama pada setiap tahap.
              </p>

              <Example number={4} title="Pemutar hadiah berwarna biru">
                <p className="text-sm leading-relaxed text-slate-200">
                  Sebuah pemutar hadiah dicoba 150 kali. Jarumnya berhenti pada warna biru sebanyak 45 kali. Berapa
                  frekuensi relatif kejadian “berhenti di biru”?
                </p>
                <Formula>
                  f<sub>rel</sub>(biru) = 45 / 150 = 3 / 10 = 0,3 = 30%
                </Formula>
                <Answer>
                  Pada percobaan ini, hasil biru muncul pada 30% putaran. Nilai 0,3 adalah frekuensi relatif yang
                  teramati, bukan jaminan bahwa setiap kelompok 10 putaran selalu menghasilkan tepat 3 warna biru.
                </Answer>
              </Example>

              <div className="mt-5 grid min-w-0 gap-4 md:grid-cols-[minmax(0,1fr)_380px]">
                <div className="min-w-0 space-y-4">
                  <h3 className="font-display text-lg font-bold text-white">Apa yang terjadi saat percobaan diulang?</h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Bayangkan pemutar pada contoh sebelumnya memiliki peluang teoretik berhenti di biru sebesar 0,3.
                    Frekuensi relatif dapat naik-turun ketika percobaan masih sedikit. Seiring jumlah percobaan
                    bertambah, nilainya cenderung mendekati 0,3. Grafik di samping hanya ilustrasi pola—bukan data
                    pengukuran wajib.
                  </p>
                  <Formula>
                    P(A) = lim<sub>n→∞</sub> N<sub>n</sub>(A) / n
                  </Formula>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Di sini, <span className="font-mono text-cyan-100">Nₙ(A)</span> adalah banyaknya kejadian A yang
                    muncul dalam <span className="font-mono text-cyan-100">n</span> percobaan. Rumus ini menyatakan
                    gagasan peluang sebagai nilai yang didekati frekuensi relatif ketika percobaan diulang sangat
                    banyak kali.
                  </p>
                </div>
                <FrequencyTrendSvg />
              </div>

              <div className="mt-5 rounded-3xl border border-amber-200/20 bg-amber-300/[.05] p-5" data-testid="activity-relative-frequency">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-200/10 text-amber-100">
                    <Lightbulb className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-body text-[10px] font-black uppercase tracking-[.18em] text-amber-200">Aktivitas · Coba dan catat!</p>
                    <h3 className="font-display text-lg font-bold text-white">Menyelidiki frekuensi relatif koin</h3>
                  </div>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-[#091426]/70 p-4">
                    <p className="font-display text-sm font-bold text-cyan-100">Alat dan cara kerja</p>
                    <ul className="mt-2 list-inside list-disc space-y-2 text-sm leading-relaxed text-slate-300">
                      <li>Siapkan satu koin dan lembar untuk mencatat hasil.</li>
                      <li>Lakukan 30 lemparan. Catat sisi Angka (A) atau Gambar (G) setiap kali.</li>
                      <li>Hitung banyak kemunculan A dan G, lalu bagi masing-masing dengan 30.</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#091426]/70 p-4">
                    <p className="font-display text-sm font-bold text-cyan-100">Pertanyaan untuk dibahas</p>
                    <ol className="mt-2 list-inside list-decimal space-y-2 text-sm leading-relaxed text-slate-300">
                      <li>Apakah sebelum dilempar kita dapat memastikan sisi mana yang akan muncul? Jelaskan.</li>
                      <li>Apakah banyak A dan G pasti sama setelah 30 lemparan? Mengapa?</li>
                      <li>Bandingkan frekuensi relatif A dengan nilai teoretiknya, yaitu 1/2.</li>
                      <li>Ulangi hingga 60 atau 100 lemparan. Apakah hasilnya berubah dan cenderung ke mana?</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>

            <section id="peluang" className="scroll-mt-6" data-testid="section-probability">
              <SectionHeading
                number="4.2"
                title="Menghitung peluang kejadian"
                intro="Untuk ruang sampel berhingga dengan semua titik sampel sama mungkin terjadi, peluang A dapat dihitung dengan membandingkan banyak anggota A terhadap seluruh anggota S."
              />
              <Formula label="classical-probability">
                P(A) = n(A) / n(S)
              </Formula>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4">
                  <p className="font-display text-sm font-bold text-cyan-100">P(A)</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">Peluang kejadian A.</p>
                </div>
                <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4">
                  <p className="font-display text-sm font-bold text-violet-100">n(A)</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">Banyak titik sampel yang mendukung atau memenuhi kejadian A.</p>
                </div>
                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.05] p-4">
                  <p className="font-display text-sm font-bold text-amber-100">n(S)</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">Banyak semua titik sampel dalam ruang sampel.</p>
                </div>
              </div>
              <Callout title="Kapan rumus n(A)/n(S) boleh dipakai?">
                Rumus ini berlaku langsung jika setiap titik sampel mempunyai peluang yang sama. Untuk token yang
                identitasnya berbeda, kartu dari setumpuk kartu, dadu adil, atau pemutar dengan sektor sama besar,
                hasil-hasil rinci dapat dianggap sama mungkin. Jika peluang titik sampelnya berbeda, peluang tiap hasil
                perlu diperhitungkan—jangan sekadar menghitung banyak anggotanya.
              </Callout>

              <div className="mt-5 space-y-5">
                <Example number={5} title="Memilih nomor pada pemutar sepuluh sektor">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Pemutar yang adil memiliki sepuluh sektor sama besar bernomor 1 sampai 10. Jarum diputar sekali.
                    Tentukan peluang mendapat kelipatan 3 dan peluang mendapat bilangan ganjil.
                  </p>
                  <Formula>S = {"{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}"} · n(S) = 10</Formula>
                  <DataTable
                    headers={["Kejadian", "Anggota kejadian", "Perhitungan peluang"]}
                    rows={[
                      ["Kelipatan 3", <span className="font-mono">{"{3, 6, 9}"}</span>, "P = 3/10"],
                      ["Bilangan ganjil", <span className="font-mono">{"{1, 3, 5, 7, 9}"}</span>, "P = 5/10 = 1/2"],
                    ]}
                  />
                  <Answer>
                    Ada 3 dari 10 sektor yang merupakan kelipatan 3, jadi peluangnya 3/10. Ada 5 bilangan ganjil dari
                    10 kemungkinan, sehingga peluang bilangan ganjil adalah 1/2.
                  </Answer>
                </Example>

                <Example number={6} title="Memutar dua pemutar angka">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Dua pemutar terpisah masing-masing memuat angka 1, 2, 3, dan 4 dengan sektor sama besar. Putar
                    keduanya satu kali. Tentukan peluang jumlah angkanya 5 dan peluang kedua angka sama.
                  </p>
                  <TwoSpinnerGridSvg />
                  <Formula>
                    n(S) = 4 × 4 = 16 · jumlah 5: (1,4), (2,3), (3,2), (4,1)
                  </Formula>
                  <Answer>
                    P(jumlah 5) = 4/16 = 1/4. Ada empat hasil kembar, yaitu (1,1), (2,2), (3,3), dan (4,4), maka
                    P(angka sama) = 4/16 = 1/4.
                  </Answer>
                </Example>

                <Example number={7} title="Mengambil satu kupon hadiah">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Sebuah kotak undian berisi 3 kupon buku, 4 kupon alat gambar, dan 5 kupon stiker. Setiap kupon
                    diberi nomor berbeda dan peluang terambilnya sama. Satu kupon diambil acak. Berapa peluang
                    mendapat kupon alat gambar? Berapa peluang mendapat kupon yang bukan stiker?
                  </p>
                  <Formula>n(S) = 3 + 4 + 5 = 12 kupon</Formula>
                  <DataTable
                    headers={["Kejadian", "Banyak kupon yang memenuhi", "Peluang"]}
                    rows={[
                      ["Kupon alat gambar", "4", "4/12 = 1/3"],
                      ["Bukan kupon stiker", "3 + 4 = 7", "7/12"],
                    ]}
                  />
                  <Answer>
                    Peluang mendapat kupon alat gambar adalah 1/3, sedangkan peluang mendapat kupon selain stiker adalah
                    7/12. Kupon diberi nomor agar 12 kemungkinan rinci sama-sama diperhitungkan.
                  </Answer>
                </Example>

                <Example number={8} title="Memilih dua huruf dari kata CERIA">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Dua huruf berbeda dipilih sekaligus dari kata CERIA. Urutan tidak diperhatikan. Tentukan peluang
                    bahwa pasangan yang terpilih memuat huruf A.
                  </p>
                  <Formula>
                    S = {"{CE, CR, CI, CA, ER, EI, EA, RI, RA, IA}"} · n(S) = C(5,2) = 10
                  </Formula>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Pasangan yang memuat A adalah {"{CA, EA, RA, IA}"}, sehingga n(A) = 4.
                  </p>
                  <Formula>P(A) = n(A) / n(S) = 4/10 = 2/5</Formula>
                  <Answer>
                    Peluang pasangan huruf pilihan memuat A adalah 2/5. Misalnya, CA dan AC dianggap pasangan yang
                    sama karena kedua huruf diambil sekaligus dan urutannya tidak dicatat.
                  </Answer>
                </Example>

                <Example number={9} title="Mengambil dua kartu hati dari satu set kartu">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Satu set kartu bridge terdiri atas 52 kartu, dengan 13 kartu hati. Dua kartu diambil sekaligus
                    tanpa pengembalian. Berapa peluang keduanya merupakan kartu hati?
                  </p>
                  <SuitCardsSvg />
                  <Formula>
                    n(S) = C(52,2) = (52 × 51) / 2 = 1.326
                    <br />
                    n(A) = C(13,2) = (13 × 12) / 2 = 78
                  </Formula>
                  <Formula>P(A) = 78 / 1.326 = 1 / 17</Formula>
                  <Answer>
                    Peluang kedua kartu yang terambil sama-sama hati adalah 1/17. Karena kartu diambil sekaligus,
                    pasangan tanpa urutan dihitung dengan kombinasi, bukan dengan menghitung urutan dua kali.
                  </Answer>
                </Example>
              </div>
            </section>

            <section id="kisaran-peluang" className="scroll-mt-6" data-testid="section-probability-range">
              <SectionHeading
                number="4.2.2"
                title="Kisaran nilai peluang"
                intro="Peluang selalu berada antara 0 dan 1, termasuk kedua ujungnya. Nilai ini langsung memberi petunjuk: apakah kejadian mustahil, mungkin, atau pasti?"
              />
              <ProbabilityNumberLineSvg />
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-rose-200/15 bg-rose-300/[.05] p-4">
                  <p className="font-display text-sm font-bold text-rose-100">Peluang 0</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">Kejadian mustahil—tidak ada titik sampel yang memenuhinya.</p>
                </div>
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-300/[.05] p-4">
                  <p className="font-display text-sm font-bold text-cyan-100">Di antara 0 dan 1</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">Kejadian mungkin terjadi, tetapi belum pasti.</p>
                </div>
                <div className="rounded-2xl border border-emerald-200/15 bg-emerald-300/[.05] p-4">
                  <p className="font-display text-sm font-bold text-emerald-100">Peluang 1</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">Kejadian pasti—semua titik sampel memenuhinya.</p>
                </div>
              </div>
              <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-relaxed text-slate-200">
                <p>
                  <strong className="text-white">Sifat-sifat peluang:</strong>
                </p>
                <ol className="list-inside list-decimal space-y-2">
                  <li>
                    Untuk setiap kejadian A, <span className="font-mono text-cyan-100">0 ≤ P(A) ≤ 1</span>.
                  </li>
                  <li>
                    Peluang ruang sampel adalah <span className="font-mono text-cyan-100">P(S) = 1</span>, karena
                    salah satu hasil dalam S pasti terjadi.
                  </li>
                  <li>
                    Jika A dan B saling lepas (tidak memiliki anggota yang sama), maka{" "}
                    <span className="font-mono text-cyan-100">P(A ∪ B) = P(A) + P(B)</span>.
                  </li>
                </ol>
              </div>

              <Example number={10} title="Undian yang selalu memberi kartu bintang">
                <p className="text-sm leading-relaxed text-slate-200">
                  Sebuah kotak berisi 8 kartu undian dan semuanya bergambar bintang. Tidak ada kartu bergambar bulan.
                  Satu kartu diambil secara acak. Tentukan peluang mendapat bintang dan peluang mendapat bulan.
                </p>
                <PrizeBagSvg />
                <Formula>
                  S = {"{bintang₁, bintang₂, …, bintang₈}"} · n(S) = 8
                  <br />
                  A = S ⇒ P(A) = 8/8 = 1 · B = ∅ ⇒ P(B) = 0/8 = 0
                </Formula>
                <Answer>
                  Mendapat bintang adalah kejadian pasti, jadi peluangnya 1. Mendapat bulan adalah kejadian mustahil
                  karena tidak ada kartu bulan, jadi peluangnya 0.
                </Answer>
              </Example>

              <Example number={11} title="Jumlah mata dua dadu">
                <p className="text-sm leading-relaxed text-slate-200">
                  Dua dadu adil dilempar bersamaan. Tentukan peluang jumlah mata dadu 8 dan peluang jumlah mata dadu 10.
                  Tulis hasil sebagai pasangan berurutan (dadu pertama, dadu kedua).
                </p>
                <DiceSumGridSvg />
                <DataTable
                  headers={["Kejadian", "Pasangan yang memenuhi", "Peluang"]}
                  rows={[
                    [<>Jumlah 8</>, <span className="font-mono">(2,6), (3,5), (4,4), (5,3), (6,2)</span>, "5/36"],
                    [<>Jumlah 10</>, <span className="font-mono">(4,6), (5,5), (6,4)</span>, "3/36 = 1/12"],
                  ]}
                />
                <Formula>
                  S = {"{(1,1), (1,2), …, (6,6)}"} · n(S) = 6 × 6 = 36
                </Formula>
                <Answer>
                  Ada lima pasangan yang jumlahnya 8, jadi peluangnya 5/36. Ada tiga pasangan yang jumlahnya 10,
                  sehingga peluangnya 3/36 = 1/12. Perhatikan bahwa (2,6) dan (6,2) adalah dua hasil berbeda karena
                  dadu pertama dan kedua dibedakan.
                </Answer>
              </Example>
            </section>

            <section className="rounded-3xl border border-cyan-200/15 bg-cyan-300/[.045] p-5" data-testid="lesson-takeaways">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-200/10 text-cyan-100">
                  <Check className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="font-display text-xl font-extrabold text-white">Mantap! Cek lagi ide utamanya</h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-200">
                <li>• Ruang sampel memuat semua hasil yang mungkin; satu hasil disebut titik sampel.</li>
                <li>• Kejadian adalah himpunan bagian dari ruang sampel.</li>
                <li>• Frekuensi relatif = banyak kemunculan kejadian ÷ banyak percobaan.</li>
                <li>• Jika semua titik sampel sama mungkin, P(A) = n(A)/n(S).</li>
                <li>• Nilai peluang berada dari 0 sampai 1: mustahil bernilai 0 dan pasti bernilai 1.</li>
              </ul>
              <p className="mt-4 font-body text-sm font-semibold text-cyan-100">
                Terus berlatih menyusun hasil dengan rapi—kamu makin jago membaca peluang!
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
                  Empat langkah: petakan semua hasil, tandai kejadian, amati percobaan, lalu hitung peluangnya.
                </p>
                <button
                  type="button"
                  onClick={() => jumpTo("ruang-sampel")}
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

export default SmaPeluangRuangSampelDistribusiPage;
