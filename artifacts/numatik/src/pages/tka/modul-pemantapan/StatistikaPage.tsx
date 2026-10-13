import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { LatihanSoal } from "@/components/tka/TKAPemantapanLayout";
import { statistikaContohSoal, statistikaContohSvgMap } from "@/data/statistikaContohSoal";
import { tkaStatistikaMateri } from "@/data/tkaStatistikaMateri";

type TableVisual = { kind: "table"; title: string; headers: string[]; rows: string[][] };
type LineVisual = { kind: "line"; title: string; unit: string; rows: [string, number][] };
type PieVisual = { kind: "pie"; title: string; unit: "%" | "°"; rows: [string, number][] };
type StatVisual = TableVisual | LineVisual | PieVisual;

// Visual data is keyed by the question's original number, before the exercise is reordered.
const visualData: Record<number, StatVisual> = {
  1: { kind: "table", title: "Tabel frekuensi nilai", headers: ["Nilai", "Frekuensi"], rows: [["5", "2"], ["6", "4"], ["7", "8"], ["8", "4"], ["9", "2"]] },
  5: { kind: "table", title: "Tinggi badan ideal anak", headers: ["Usia (tahun)", "Laki-laki (cm)", "Perempuan (cm)"], rows: [["1", "74,5", "74,0"], ["2", "87,2", "86,4"], ["3", "96,1", "95,1"], ["4", "103,2", "102,7"], ["5", "110,0", "109,4"]] },
  13: { kind: "table", title: "Tabel distribusi frekuensi hasil seleksi", headers: ["Nilai", "Frekuensi"], rows: [["10", "2"], ["20", "3"], ["30", "5"], ["40", "x"], ["50", "1"]] },
  14: { kind: "pie", title: "Kegemaran siswa (sudut)", unit: "°", rows: [["Matematika", 30], ["IPA", 54], ["IPS", 48], ["Bahasa", 72], ["Penjas", 156]] },
  15: { kind: "pie", title: "Koleksi buku perpustakaan", unit: "%", rows: [["Kesenian", 20], ["Kesehatan", 18], ["Fiksi", 25], ["Pendidikan", 22], ["Umum", 15]] },
  16: { kind: "line", title: "Penyusutan harga mobil", unit: "juta rupiah", rows: [["2015", 110], ["2016", 102.5], ["2017", 95], ["2018", 87.5], ["2019", 80]] },
  17: { kind: "pie", title: "Menu favorit pelanggan", unit: "%", rows: [["Rendang", 40], ["Ayam goreng", 30], ["Soto", 20], ["Lainnya", 10]] },
  18: { kind: "line", title: "Suhu udara", unit: "°C", rows: [["19.00", 29], ["21.00", 27], ["23.00", 26], ["01.00", 24], ["03.00", 25], ["05.00", 28]] },
  20: { kind: "pie", title: "Demografi usia warga", unit: "%", rows: [["Balita", 10], ["Anak-anak", 20], ["Remaja", 25], ["Dewasa", 35], ["Lansia", 10]] },
  21: { kind: "line", title: "Pengunjung pameran buku", unit: "orang", rows: [["Hari 1", 50], ["Hari 2", 150], ["Hari 3", 250], ["Hari 4", 200], ["Hari 5", 230], ["Hari 6", 270]] },
  22: { kind: "line", title: "Nilai tukar USD terhadap Rupiah", unit: "rupiah per USD", rows: [["Sen", 16000], ["Sel", 16400], ["Rab", 16100], ["Kam", 16300], ["Jum", 16200], ["Sab", 16600], ["Min", 16500]] },
  23: { kind: "pie", title: "Moda transportasi siswa (sudut)", unit: "°", rows: [["Jalan kaki", 60], ["Sepeda", 60], ["Angkutan umum", 60], ["Ojek online", 72], ["Sepeda motor", 48], ["Lainnya", 60]] },
  24: { kind: "table", title: "Tinggi tanaman", headers: ["Tinggi", "Frekuensi"], rows: [["10", "3"], ["11", "6"], ["12", "10"], ["13", "11"], ["14", "8"], ["15", "2"]] },
};

const chartColors = ["#22d3ee", "#a78bfa", "#fb7185", "#fbbf24", "#34d399", "#60a5fa"];
const formatStatNumber = (value: number) => value.toLocaleString("id-ID", { maximumFractionDigits: 1 });

const renderTableVisual = (data: TableVisual) => (
  <div className="my-3 w-full max-w-full rounded-xl border border-cyan-400/30 bg-white/5">
    <div className="rounded-t-xl border-b border-cyan-400/20 bg-cyan-500/15 px-2 py-2 text-center text-xs font-bold text-cyan-200">{data.title}</div>
    <table className="w-full table-fixed text-center text-[11px] text-white/85">
      <thead className="border-b border-white/10 bg-white/5">
        <tr>{data.headers.map((header) => <th key={header} className="break-words px-1.5 py-2 font-semibold text-cyan-300">{header}</th>)}</tr>
      </thead>
      <tbody>
        {data.rows.map((row, rowIndex) => (
          <tr key={`${rowIndex}-${row.join("-")}`} className="border-b border-white/5 last:border-b-0">
            {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`} className="break-words px-1.5 py-1.5">{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const renderPieVisual = (data: PieVisual) => {
  const total = data.rows.reduce((sum, [, value]) => sum + value, 0);
  let startAngle = -90;
  const cx = 112;
  const cy = 112;
  const radius = 88;
  const slices = data.rows.map(([label, value], index) => {
    const angle = (value / total) * 360;
    const endAngle = startAngle + angle;
    const toPoint = (degrees: number) => {
      const radians = (degrees * Math.PI) / 180;
      return [cx + radius * Math.cos(radians), cy + radius * Math.sin(radians)] as const;
    };
    const [x1, y1] = toPoint(startAngle);
    const [x2, y2] = toPoint(endAngle);
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 ${x2} ${y2} Z`;
    const mid = (startAngle + endAngle) / 2;
    const [labelX, labelY] = [cx + radius * 0.62 * Math.cos((mid * Math.PI) / 180), cy + radius * 0.62 * Math.sin((mid * Math.PI) / 180)];
    startAngle = endAngle;
    return { label, value, index, path, labelX, labelY, share: (value / total) * 100 };
  });

  return (
    <div className="my-3 w-full max-w-full rounded-xl border border-cyan-400/30 bg-white/5 p-2">
      <div className="mb-1 text-center text-xs font-bold text-cyan-200">{data.title}</div>
      <svg viewBox="0 0 440 232" role="img" aria-label={`${data.title}; ${data.rows.map(([label, value]) => `${label} ${formatStatNumber(value)}${data.unit}`).join(", ")}`} className="block h-auto w-full">
        {slices.map((slice) => (
          <g key={slice.label}>
            <path d={slice.path} fill={chartColors[slice.index % chartColors.length]} stroke="#101827" strokeWidth="2" />
            {slice.share >= 8 && <text x={slice.labelX} y={slice.labelY} textAnchor="middle" dominantBaseline="middle" fill="#101827" fontSize="10" fontWeight="700">{formatStatNumber(slice.value)}{data.unit}</text>}
          </g>
        ))}
        {slices.map((slice, index) => (
          <g key={`${slice.label}-legend`} transform={`translate(220 ${27 + index * 34})`}>
            <rect width="12" height="12" rx="3" fill={chartColors[slice.index % chartColors.length]} />
            <text x="20" y="10" fill="#e2e8f0" fontSize="12">{slice.label}</text>
            <text x="205" y="10" textAnchor="end" fill="#a5f3fc" fontSize="12" fontWeight="700">{formatStatNumber(slice.value)}{data.unit}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const renderLineVisual = (data: LineVisual) => {
  const values = data.rows.map(([, value]) => value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const padding = Math.max((max - min) * 0.18, 1);
  const low = min - padding;
  const high = max + padding;
  const left = 48;
  const right = 420;
  const top = 36;
  const bottom = 190;
  const points = data.rows.map(([label, value], index) => ({
    label,
    value,
    x: left + (index * (right - left)) / Math.max(data.rows.length - 1, 1),
    y: bottom - ((value - low) / (high - low)) * (bottom - top),
  }));

  return (
    <div className="my-3 w-full max-w-full rounded-xl border border-cyan-400/30 bg-white/5 p-2">
      <div className="text-center text-xs font-bold text-cyan-200">{data.title}</div>
      <div className="text-center text-[10px] text-white/60">{data.unit}</div>
      <svg viewBox="0 0 440 236" role="img" aria-label={`${data.title}; ${data.rows.map(([label, value]) => `${label}: ${formatStatNumber(value)} ${data.unit}`).join(", ")}`} className="block h-auto w-full">
        {[0, 1, 2, 3].map((step) => {
          const y = top + ((bottom - top) * step) / 3;
          const value = high - ((high - low) * step) / 3;
          return <g key={step}><line x1={left} y1={y} x2={right} y2={y} stroke="#ffffff22" /><text x={left - 6} y={y + 3} textAnchor="end" fill="#cbd5e1" fontSize="9">{formatStatNumber(value)}</text></g>;
        })}
        <polyline points={points.map(({ x, y }) => `${x},${y}`).join(" ")} fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="4" fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />
            <text x={point.x} y={point.y - 10} textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="700">{formatStatNumber(point.value)}</text>
            <text x={point.x} y={bottom + 18} textAnchor="middle" fill="#e2e8f0" fontSize="9">{point.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const renderTkaStatistikaVisual = (no: number): React.ReactNode => {
  const data = visualData[no];
  if (!data) throw new Error(`Visual statistika untuk soal asal ${no} belum tersedia.`);
  if (data.kind === "table") return renderTableVisual(data);
  if (data.kind === "pie") return renderPieVisual(data);
  return renderLineVisual(data);
};

const latihanDasarSumber: LatihanSoal[] = [
  {
    "no": 1,
    "soal": "Perhatikan tabel distribusi frekuensi berikut. Pilih semua pernyataan yang benar.",
    "type": "pgk",
    "pernyataan": [
      "Modus data tersebut adalah 7.",
      "Median data tersebut adalah 7.",
      "Rata-rata data tersebut adalah 7.",
      "Jangkauan data tersebut adalah 5."
    ],
    "jawabanPGK": [
      0,
      1,
      2
    ],
    "pembahasan": "Jumlah data = $2+4+8+4+2=20$.\n\nModus adalah 7 karena frekuensinya paling besar, yaitu 8.\nMean = $\\frac{(5\\times2)+(6\\times4)+(7\\times8)+(8\\times4)+(9\\times2)}{20}=\\frac{140}{20}=7$.\n\nData ke-1–2 bernilai 5, ke-3–6 bernilai 6, dan ke-7–14 bernilai 7. Jadi data ke-10 dan ke-11 sama-sama 7, sehingga median = 7.\nJangkauan = $9-5=4$. Maka pernyataan 1, 2, dan 3 benar; pernyataan 4 salah."
  },
  {
    "no": 2,
    "type": "pgk",
    "soal": "Diagram batang berikut menunjukkan distribusi nilai kuis IPA siswa kelas VIII:\nBerdasarkan diagram batang diatas, pilihlah semua pernyataan yang benar. pernyataan yang benar (Jawaban benar lebih dari satu):",
    "pernyataan": [
      "Jumlah seluruh siswa di kelas tersebut adalah 22 orang.",
      "Nilai 8 merupakan modus (nilai yang paling banyak diperoleh).",
      "Selisih banyaknya siswa yang mendapat nilai tertinggi (10) dan terendah (5) adalah 2 orang.",
      "Jumlah siswa yang memperoleh nilai 6 dan 9 adalah 8 orang."
    ],
    "jawabanPGK": [
      0,
      1,
      3
    ],
    "pembahasan": "Jawaban Akhir:\nJumlah seluruh siswa di kelas tersebut adalah 22 orang (Benar).\nNilai 8 merupakan modus (Benar).\nJumlah siswa yang memperoleh nilai 6 dan 9 adalah 8 orang (Benar).\n\nKonsep dan Trik: Modus = nilai dengan batang tertinggi (frekuensi terbesar). $\\text{Total Siswa} = \\sum \\text{Frekuensi}$.\n\nStep by Step Penyelesaian:\n1. Total siswa: $1 + 4 + 5 + 6 + 4 + 2 = 22\\text{ orang}$ → Benar.\n2. Batang tertinggi ada pada nilai 8 (frekuensi = 6) → Benar.\n3. Selisih siswa nilai 10 (2 orang) dan nilai 5 (1 orang) $= 2 - 1 = 1\\text{ orang}$ → Salah.\n4. Siswa bernilai 6 (4 orang) + siswa bernilai 9 (4 orang) $= 8\\text{ orang}$ → Benar."
  },
  {
    "no": 3,
    "type": "pgk",
    "soal": "Dalam suatu pemeriksaan kesehatan, dicatat massa tubuh dari 11 siswa sebagai berikut: 42, 45, 50, 55, 50, 55, 60, 55, 40, 65, 55.\nBerdasarkan data di atas, pilihlah semua pernyataan yang benar.",
    "pernyataan": [
      "Jangkauan data tersebut adalah 25 kg.",
      "Nilai modus dari data tersebut adalah 55 kg.",
      "Rata-rata massa tubuh siswa adalah 52 kg.",
      "Nilai median dari data tersebut adalah 50 kg."
    ],
    "jawabanPGK": [
      0,
      1,
      2
    ],
    "pembahasan": "Jawaban Akhir: Jangkauan data 25 kg (Benar); modus 55 kg (Benar); rata-rata 52 kg (Benar).\n\nKonsep & Trik: Urutkan data terlebih dahulu untuk menentukan median dan modus dengan cepat.\n\nStep by Step:\nData terurut: 40, 42, 45, 50, 50, 55, 55, 55, 55, 60, 65 (banyak data, $n = 11$).\nJangkauan: $\\text{Maks} - \\text{Min} = 65 - 40 = 25\\text{ kg}$.\nModus: nilai paling sering muncul adalah 55 (muncul 4 kali).\nMedian: data ke-$\\frac{11+1}{2} = 6$, yaitu 55.\nRata-rata: $\\frac{572}{11} = 52\\text{ kg}$."
  },
  {
    "no": 4,
    "type": "pgkbs",
    "soal": "Perhatikan diagram batang berikut.\nBerdasarkan diagram tersebut, tentukan kebenaran dari pernyataan berikut.",
    "pernyataan": [
      "Modus data sama dengan mediannya.",
      "Jangkauan data tersebut adalah 50.",
      "Rata-rata nilai ujian siswa adalah 75."
    ],
    "jawabanBS": [
      "B",
      "B",
      "B"
    ],
    "pembahasan": "Jawaban Akhir: Pernyataan 1 Benar; Pernyataan 2 Benar; Pernyataan 3 Benar.\n\nStep by Step:\nTotal siswa = $2 + 3 + 8 + 5 + 6 + 1 = 25$ orang.\nModus: frekuensi terbanyak adalah 8 (nilai 70). Median: data ke-13 adalah nilai 70. Maka modus = median = 70.\nJangkauan: $100 - 50 = 50$.\nRata-rata: $\\frac{(50\\times2)+(60\\times3)+(70\\times8)+(80\\times5)+(90\\times6)+(100\\times1)}{25} = \\frac{1.875}{25} = 75$."
  },
  {
    "no": 5,
    "type": "pgkbs",
    "soal": "Perhatikan tabel distribusi frekuensi berikut.\n[DIAGRAM]\nTentukan status Benar / Salah untuk pernyataan berikut.",
    "pernyataan": [
      "Rata-rata tinggi badan ideal anak laki-laki usia 3 tahun adalah 96,1 cm.",
      "Selisih tinggi badan ideal anak laki-laki dan perempuan pada usia 5 tahun adalah 0,6 cm.",
      "Jangkauan pertumbuhan tinggi badan ideal anak perempuan dari usia 1 hingga 5 tahun adalah 35,4 cm."
    ],
    "jawabanBS": [
      "B",
      "B",
      "B"
    ],
    "pembahasan": "Jawaban Akhir: Semua pernyataan benar.\n\nStep by Step:\n1. Usia 3 tahun, kolom laki-laki → 96,1 cm (Benar).\n2. Usia 5 tahun → $110{,}0 - 109{,}4 = 0{,}6$ cm (Benar).\n3. Jangkauan perempuan → $109{,}4 - 74{,}0 = 35{,}4$ cm (Benar)."
  },
  {
    "no": 6,
    "soal": "Dalam sebuah kelas, nilai rata-rata siswa putra adalah 7,2, sedangkan rata-rata kelompok putri adalah 8,1. Jika nilai rata-rata kelas adalah 7,5, maka perbandingan banyak putra dan siswa putri adalah ...",
    "options": [
      "A. 2 : 1",
      "B. 1 : 2",
      "C. 1 : 3",
      "D. 2 : 3"
    ],
    "type": "pgkbs",
    "pernyataan": [
      "Perbandingan banyak siswa putra dan putri adalah 2 : 1.",
      "Banyak siswa putra dua kali banyak siswa putri.",
      "Jika jumlah siswa 30 orang, banyak siswa putri adalah 15 orang."
    ],
    "jawabanBS": [
      "B",
      "B",
      "S"
    ],
    "jawaban": "A",
    "pembahasan": "Gunakan rumus rata-rata gabungan: $\\bar{x}_{gab} = \\frac{n_1\\bar{x}_1 + n_2\\bar{x}_2}{n_1 + n_2}$. Buat persamaan dan cari perbandingan $n_1 : n_2$.\n\nMisal banyak putra = $x$, putri = $y$\n$\\frac{7{,}2x + 8{,}1y}{x+y} = 7{,}5$\n$7{,}2x + 8{,}1y = 7{,}5x + 7{,}5y$\n$0{,}6y = 0{,}3x \\Rightarrow \\frac{x}{y} = 2$\nRasio putra : putri = 2 : 1\n\nPada masalah rata-rata gabungan, jika rata-rata gabungan lebih dekat ke salah satu kelompok, kelompok itu lebih banyak.\n\nPerbandingan siswa putra dan putri = 2 : 1."
  },
  {
    "no": 7,
    "soal": "Rata-rata nilai remedial 20 siswa adalah 7, rata-rata nilai siswa laki-laki adalah 6 dan rata-rata nilai siswa perempuan adalah 8,5. Selisih banyak siswa laki-laki dan perempuan adalah ...",
    "options": [
      "A. 8",
      "B. 6",
      "C. 4",
      "D. 3"
    ],
    "type": "pgk",
    "pernyataan": [
      "Banyak siswa laki-laki adalah 12 orang.",
      "Banyak siswa perempuan adalah 8 orang.",
      "Selisih banyak siswa laki-laki dan perempuan adalah 4 orang.",
      "Banyak siswa laki-laki lebih sedikit daripada siswa perempuan."
    ],
    "jawabanPGK": [
      0,
      1,
      2
    ],
    "jawaban": "C",
    "pembahasan": "Buat sistem persamaan: L + P = 20 dan persamaan rata-rata gabungan. Cari masing-masing, lalu hitung selisihnya.\n\nL + P = 20, rata-rata gabungan 7\n$6L + 8{,}5P = 20 \\times 7 = 140$\nSubstitusi $L = 20 - P$:\n$6(20-P) + 8{,}5P = 140$\n$2{,}5P = 20 \\Rightarrow P = 8$, $L = 12$\nSelisih = 12 − 8 = 4\n\nSelisih L − P = 4. Periksa: rata-rata gabungan mendekati 6 (rata-rata laki-laki) → laki-laki lebih banyak.\n\nSelisih banyak siswa laki-laki dan perempuan = 4 orang."
  },
  {
    "no": 8,
    "soal": "Suatu hari Ani menemukan sobekan kertas koran yang memuat data pengunjung perpustakaan berupa gambar diagram batang. Rata-rata pengunjung 41 orang selama lima hari. Data tersedia: Senin = 30, Selasa = 45, Rabu = ?, Kamis = 50, Jumat = 25. Tolong bantu Ani mencari banyak pengunjung pada hari Rabu ...",
    "options": [
      "A. 55 orang",
      "B. 60 orang",
      "C. 65 orang",
      "D. 70 orang"
    ],
    "jawaban": "A",
    "pembahasan": "Total pengunjung 5 hari = mean × banyak hari. Pengunjung hari yang tidak diketahui = total − jumlah hari lain.\n\nTotal 5 hari = 5 × 41 = 205 orang\nJumlah Senin, Selasa, Kamis, Jumat = 30+45+50+25 = 150\nPengunjung Rabu = 205 − 150 = 55 orang\n\nJika mean dan total hari diketahui, total keseluruhan = mean × n. Lalu kurangi data yang diketahui.\n\nPengunjung perpustakaan pada hari Rabu = 55 orang.",
    "type": "pg"
  },
  {
    "no": 9,
    "soal": "Ada 25 murid perempuan dalam sebuah kelas. Rata-rata tinggi mereka adalah 130 cm. Pernyataan yang benar adalah ...",
    "options": [
      "A. Jika ada seorang murid perempuan dengan tinggi 132 cm, maka pasti ada seorang murid perempuan dengan tinggi 128 cm.",
      "B. Jika 23 orang dari murid perempuan tersebut tingginya masing-masing 130 cm dan satu orang tingginya 133 cm, maka satu lagi tingginya 127 cm.",
      "C. Jika anda mengurutkan semua perempuan tersebut dari yang terpendek sampai yang tertinggi, maka yang di tengah pasti mempunyai tinggi 130 cm.",
      "D. Setengah dari perempuan di kelas pasti di bawah 130 cm dan setengahnya lagi pasti di atas 130 cm."
    ],
    "type": "pgk",
    "pernyataan": [
      "Jika ada seorang murid setinggi 132 cm, pasti ada seorang murid setinggi 128 cm.",
      "Jika 23 murid tingginya 130 cm dan satu murid 133 cm, tinggi murid terakhir adalah 127 cm.",
      "Murid yang berada di tengah setelah semua tinggi diurutkan pasti memiliki tinggi 130 cm.",
      "Jumlah tinggi seluruh murid perempuan tersebut adalah 3.250 cm."
    ],
    "jawabanPGK": [
      1,
      3
    ],
    "pembahasan": "Jumlah tinggi seluruh murid = $25\\times130=3.250$ cm, jadi pernyataan 4 benar.\n\nPada pernyataan 2, jumlah 25 tinggi harus 3.250 cm. Jumlah 23 murid setinggi 130 cm dan satu murid setinggi 133 cm adalah $23\\times130+133=3.123$ cm. Tinggi murid terakhir = $3.250-3.123=127$ cm, jadi pernyataan 2 benar.\n\nPernyataan 1 tidak harus benar karena selisih 2 cm dari rata-rata dapat diimbangi oleh gabungan beberapa murid, bukan harus tepat satu murid setinggi 128 cm. Mean juga tidak menentukan median, sehingga pernyataan 3 tidak selalu benar."
  },
  {
    "no": 10,
    "soal": "Rata-rata usia dari 12 orang pekerja adalah 28 tahun. Ketika ada 1 pekerja baru bergabung, rata-rata usia kelompok tersebut berubah menjadi 29 tahun. Usia pekerja yang baru bergabung tersebut adalah ....",
    "options": [
      "A. 41 tahun",
      "B. 39 tahun",
      "C. 37 tahun",
      "D. 35 tahun"
    ],
    "jawaban": "A",
    "pembahasan": "Jawaban Akhir: A. 41 tahun\n\nKonsep & Trik: $\\text{Nilai Baru} = (N_{akhir} \\times \\bar{x}_{akhir}) - (N_{awal} \\times \\bar{x}_{awal})$.\n\nStep by Step:\nTotal usia 12 pekerja awal: $12 \\times 28 = 336$ tahun.\nTotal usia 13 pekerja setelah bertambah: $13 \\times 29 = 377$ tahun.\nUsia pekerja baru: $377 - 336 = 41$ tahun.",
    "type": "pg"
  },
  {
    "no": 11,
    "soal": "Kelompok A terdiri atas 10 orang dengan rata-rata hasil panen jagung 6 ton per orang. Kelompok B terdiri atas 15 orang dengan rata-rata 9 ton per orang. Satu orang dari setiap kelompok bertukar kelompok. Jika rata-rata kedua kelompok setelah pertukaran menjadi sama, berapa selisih hasil panen kedua orang tersebut?",
    "options": [
      "A. 18 ton",
      "B. 15 ton",
      "C. 12 ton",
      "D. 9 ton"
    ],
    "jawaban": "A",
    "pembahasan": "Misalkan hasil panen orang yang pindah dari A adalah $x$ ton dan dari B adalah $y$ ton. Jumlah awal panen A = $10\\times6=60$ ton dan B = $15\\times9=135$ ton.\n\nSetelah bertukar, kedua rata-rata sama:\n$\\frac{60-x+y}{10}=\\frac{135-y+x}{15}$.\nKalikan silang: $15(60-x+y)=10(135-y+x)$, sehingga $25(y-x)=450$ dan $y-x=18$.\nJadi, selisih hasil panen kedua orang tersebut adalah 18 ton.",
    "type": "pg"
  },
  {
    "no": 12,
    "soal": "Rata-rata nilai ujian siswa laki-laki di suatu kelas adalah 7,5 dan rata-rata nilai siswa perempuan adalah 8,0. Jika rata-rata gabungan seluruh siswa di kelas tersebut adalah 7,8, berapakah perbandingan banyaknya siswa laki-laki dan perempuan?",
    "options": [
      "A. $2 : 3$",
      "B. $3 : 2$",
      "C. $1 : 4$",
      "D. $4 : 1$"
    ],
    "jawaban": "A",
    "pembahasan": "Jawaban Akhir: A. 2 : 3\n\nKonsep & Trik: Gunakan metode selisih silang rata-rata terhadap rata-rata gabungan.\n\nStep by Step:\nRumus: $n_L(\\bar{x}_L - \\bar{x}_G) = n_P(\\bar{x}_G - \\bar{x}_P)$.\n$n_L(7{,}8 - 7{,}5) = n_P(8{,}0 - 7{,}8)$.\n$0{,}3 \\cdot n_L = 0{,}2 \\cdot n_P$.\nPerbandingan: $\\frac{n_L}{n_P} = \\frac{0{,}2}{0{,}3} = \\frac{2}{3} \\implies 2 : 3$.",
    "type": "pg"
  },
  {
    "no": 13,
    "soal": "Data hasil seleksi disajikan dalam tabel distribusi frekuensi berikut.\n[DIAGRAM]\nJika rata-rata nilai tes adalah 30, jumlah peserta yang memperoleh nilai lebih besar daripada rata-rata adalah ....",
    "options": [
      "A. 4 orang",
      "B. 5 orang",
      "C. 6 orang",
      "D. 7 orang"
    ],
    "jawaban": "C",
    "pembahasan": "Misalkan frekuensi untuk nilai 40 adalah $x$. Jumlah frekuensi yang diketahui = $2+3+5+1=11$, sedangkan jumlah nilai kali frekuensinya = $10(2)+20(3)+30(5)+50(1)=280$.\n\nGunakan mean 30:\n$\\frac{280+40x}{11+x}=30 \\Rightarrow 280+40x=330+30x \\Rightarrow x=5$.\nNilai yang lebih besar dari 30 adalah 40 dan 50, sehingga jumlah peserta = $5+1=6$ orang.",
    "type": "pg"
  },
  {
    "no": 14,
    "soal": "Diagram lingkaran berikut menunjukkan kegemaran 240 siswa terhadap mata pelajaran. Tentukan Benar atau Salah untuk setiap pernyataan.",
    "type": "pgkbs",
    "pernyataan": [
      "Besar sudut sektor Penjas adalah 150°.",
      "Bagian siswa yang gemar Penjas adalah $\\frac{13}{30}$ dari seluruh siswa.",
      "Jumlah siswa yang gemar Penjas adalah 104 orang."
    ],
    "jawabanBS": [
      "S",
      "B",
      "B"
    ],
    "pembahasan": "Jumlah sudut seluruh sektor adalah $360°$. Sudut Penjas = $360°-(30°+54°+48°+72°)=156°$, sehingga pernyataan 1 salah.\n\nBagian Penjas = $\\frac{156}{360}=\\frac{13}{30}$, jadi pernyataan 2 benar. Banyak siswa yang gemar Penjas = $\\frac{156}{360}\\times240=104$ orang, jadi pernyataan 3 benar. Tepat dua pernyataan benar."
  },
  {
    "no": 15,
    "soal": "Data koleksi jenis buku di sebuah perpustakaan tersaji dalam diagram lingkaran berikut.\n[DIAGRAM]\nJika banyak buku Kesenian 200 eksemplar, banyak buku Kesehatan .... eksemplar",
    "options": [
      "A. 180",
      "B. 200",
      "C. 210",
      "D. 220"
    ],
    "jawaban": "A",
    "pembahasan": "Pada diagram lingkaran dengan persentase, gunakan proporsi: banyak buku = persentase × total buku.\n\n20% buku kesenian = 200 eksemplar\nTotal buku = $\\frac{200}{20\\%} = 1000$ eksemplar\nBuku kesehatan = 18% × 1000 = 180 eksemplar\n\nGunakan salah satu data yang lengkap (persentase + jumlah) untuk mencari total, lalu hitung sisanya.\n\nBanyak buku kesehatan = 180 eksemplar.",
    "type": "pg"
  },
  {
    "no": 16,
    "soal": "Diagram garis menunjukkan harga sebuah mobil dari tahun 2015 sampai 2019 dalam juta rupiah.\n[DIAGRAM]\nPilih semua pernyataan yang benar.",
    "options": [
      "A. Rp 2.500.000,00",
      "B. Rp 5.000.000,00",
      "C. Rp 5.500.000,00",
      "D. Rp 7.500.000,00"
    ],
    "type": "pgk",
    "pernyataan": [
      "Penyusutan harga antara tahun 2015 dan 2016 adalah Rp7.500.000,00.",
      "Harga mobil berkurang dari Rp110.000.000,00 menjadi Rp102.500.000,00.",
      "Persentase penyusutan terhadap harga tahun 2015 adalah sekitar 6,8%.",
      "Selisih harga tahun 2015 dan 2016 adalah Rp7.500.000,00."
    ],
    "jawabanPGK": [
      0,
      1,
      3
    ],
    "jawaban": "D",
    "pembahasan": "Dari diagram, harga pada 2015 adalah Rp110.000.000 dan pada 2016 Rp102.500.000.\n\nPenyusutan = $110-102{,}5=7{,}5$ juta rupiah. Persentasenya terhadap harga 2015 = $\\frac{7{,}5}{110}\\times100\\%\\approx6{,}8\\%$.\n\nJadi pernyataan 1, 2, dan 4 benar; pernyataan 3 salah."
  },
  {
    "no": 17,
    "soal": "Hasil survei terhadap pelanggan restoran mengenai menu makanan favorit disajikan dalam diagram lingkaran berikut.\n[DIAGRAM]\nJika sebanyak 60 orang memilih Rendang sebagai makanan favoritnya, jumlah total orang yang mengikuti survei tersebut adalah ....",
    "options": [
      "A. 120 orang",
      "B. 150 orang",
      "C. 180 orang",
      "D. 200 orang"
    ],
    "jawaban": "B",
    "pembahasan": "Jawaban Akhir: B. 150 orang\n\nKonsep dan Trik: $\\text{Total Responden} = \\frac{\\text{Jumlah Bagian Diketahui}}{\\text{Persentase Bagian Diketahui}} \\times 100\\%$.\nTrik: Bagi jumlah orang dengan nilai persentasenya dalam bentuk desimal ($60 \\div 0{,}4$).\n\nStep by Step Penyelesaian:\n1. Persentase Rendang = $40\\% = 0{,}4$.\n2. $\\text{Total Responden} = \\frac{60}{40\\%} = \\frac{60}{40} \\times 100 = 150\\text{ orang}$.",
    "type": "pg"
  },
  {
    "no": 18,
    "type": "pgkbs",
    "soal": "Suhu udara di suatu wilayah pegunungan dicatat dari sore hingga pagi hari dan disajikan dalam grafik garis berikut.\n[DIAGRAM]\nBerdasarkan grafik di atas, tentukan status Benar/Salah untuk setiap pernyataan.",
    "pernyataan": [
      "Suhu udara paling dingin terjadi pada pukul 01.00.",
      "Kenaikan suhu terbesar terjadi pada rentang pukul 03.00 sampai 05.00.",
      "Penurunan suhu dari pukul 19.00 hingga 21.00 adalah $2^\\circ\\text{C}$."
    ],
    "jawabanBS": [
      "B",
      "B",
      "B"
    ],
    "pembahasan": "Jawaban Akhir: 1. Benar; 2. Benar; 3. Benar.\n\nStep by Step Penyelesaian:\n1. Suhu terendah pada titik grafik terendah yaitu $24^\\circ\\text{C}$ pada pukul 01.00 → Benar.\n2. Perubahan suhu naik: 01.00–03.00 (naik $1^\\circ\\text{C}$), 03.00–05.00 (naik $3^\\circ\\text{C}$). Kenaikan terbesar adalah $3^\\circ\\text{C}$ pada 03.00–05.00 → Benar.\n3. Beda suhu pukul 19.00–21.00: $29^\\circ\\text{C} - 27^\\circ\\text{C} = 2^\\circ\\text{C}$ → Benar."
  },
  {
    "no": 19,
    "soal": "Berdasarkan trend grafik suhu tersebut, perkiraan suhu udara pada pukul 22.00 adalah ....",
    "options": [
      "A. $28^\\circ\\text{C}$",
      "B. $27{,}5^\\circ\\text{C}$",
      "C. $27^\\circ\\text{C}$",
      "D. $26{,}5^\\circ\\text{C}$"
    ],
    "jawaban": "D",
    "pembahasan": "Jawaban Akhir: D. $26{,}5^\\circ\\text{C}$\n\nKonsep dan Trik: Interpolasi linear di antara dua titik waktu yang mengapit jam tersebut: $\\text{Nilai Tengah} = \\frac{\\text{Suhu Awal} + \\text{Suhu Akhir}}{2}$.\n\nStep by Step Penyelesaian:\n1. Pukul 22.00 berada tepat di tengah pukul 21.00 ($27^\\circ\\text{C}$) dan pukul 23.00 ($26^\\circ\\text{C}$).\n2. Perkiraan suhu: $\\frac{27 + 26}{2} = 26{,}5^\\circ\\text{C}$.",
    "type": "pg"
  },
  {
    "no": 20,
    "type": "pgkbs",
    "soal": "Sebanyak 200 warga di RW 05 mengikuti pendataan demografi usia yang disajikan dalam diagram lingkaran persentase berikut.\n[DIAGRAM]\nTentukan nilai Benar / Salah untuk pernyataan berikut.",
    "pernyataan": [
      "Banyak penduduk kategori anak-anak adalah 40 orang.",
      "Jumlah gabungan warga kategori remaja dan lansia adalah 70 orang.",
      "Selisih banyaknya warga dewasa dan balita adalah 50 orang."
    ],
    "jawabanBS": [
      "B",
      "B",
      "B"
    ],
    "pembahasan": "Jawaban Akhir: 1. Benar; 2. Benar; 3. Benar.\n\nStep by Step Penyelesaian:\n1. Anak-anak = $20\\% \\times 200 = 40\\text{ orang}$ → Benar.\n2. Remaja + Lansia = $(25\\% + 10\\%) \\times 200 = 35\\% \\times 200 = 70\\text{ orang}$ → Benar.\n3. Selisih Dewasa − Balita = $(35\\% - 10\\%) \\times 200 = 25\\% \\times 200 = 50\\text{ orang}$ → Benar."
  },
  {
    "no": 21,
    "type": "pgk",
    "soal": "Data pengunjung pameran buku selama 6 hari disajikan dalam grafik garis berikut.\n[DIAGRAM]\nPilihlah semua jawaban yang benar.",
    "pernyataan": [
      "Kenaikan pengunjung tertinggi terjadi pada hari ke-2 ke hari ke-3.",
      "Penurunan pengunjung hanya terjadi dari hari ke-3 ke hari ke-4.",
      "Pengunjung paling sedikit terjadi pada hari pertama.",
      "Total seluruh pengunjung pameran selama 6 hari adalah 1.150 orang."
    ],
    "jawabanPGK": [
      1,
      2,
      3
    ],
    "pembahasan": "Pernyataan 1 salah karena kenaikan terbesar terjadi pada H1–H2 dan H2–H3, masing-masing 100 orang. Pernyataan 2 benar: satu-satunya penurunan terjadi dari H3 ke H4. Pengunjung paling sedikit pada H1, yaitu 50 orang, sehingga pernyataan 3 benar.\n\nTotal pengunjung = $50+150+250+200+230+270=1.150$ orang. Pernyataan 4 benar."
  },
  {
    "no": 22,
    "soal": "Perhatikan grafik nilai tukar mata uang Dolar AS (USD) terhadap Rupiah (IDR) dalam satu minggu berikut.\n[DIAGRAM]\nJika Danang ingin menukarkan uang Rupiah sebanyak Rp825.000,00 ke Dolar AS pada hari Minggu, berapa banyak uang Dolar AS yang akan diperolehnya?",
    "options": [
      "A. 40 dolar",
      "B. 45 dolar",
      "C. 50 dolar",
      "D. 52 dolar"
    ],
    "jawaban": "C",
    "pembahasan": "Jawaban Akhir: C. 50 dolar\n\nKonsep dan Trik: $\\text{Dolar diperoleh} = \\frac{\\text{Jumlah Rupiah}}{\\text{Kurs Dolar Hari Terkait}}$.\n\nStep by Step Penyelesaian:\n1. Nilai kurs pada hari Minggu: Rp16.500,00 / 1 USD.\n2. $\\text{USD} = \\frac{825.000}{16.500}$.\n3. $\\text{USD} = \\frac{8.250}{165} = 50\\text{ dolar}$.",
    "type": "pg"
  },
  {
    "no": 23,
    "type": "pgk",
    "soal": "Suatu sekolah mendata moda transportasi siswa. Data disajikan dalam diagram lingkaran derajat berikut.\n[DIAGRAM]\nJika jumlah siswa yang menggunakan ojek online adalah 30 orang, pilihlah semua jawaban yang benar.",
    "pernyataan": [
      "Persentase siswa yang berjalan kaki adalah $16{,}67\\%$.",
      "Banyak siswa yang menggunakan sepeda motor adalah 20 orang.",
      "Moda transportasi terbanyak yang digunakan siswa adalah ojek online.",
      "Total seluruh siswa yang didata adalah 150 orang."
    ],
    "jawabanPGK": [
      0,
      1,
      2,
      3
    ],
    "pembahasan": "Jawaban Akhir: Semua pernyataan benar.\n\nStep by Step:\nTotal siswa: $\\frac{360^\\circ}{72^\\circ} \\times 30 = 5 \\times 30 = 150$ orang.\nSepeda motor: $\\frac{48^\\circ}{360^\\circ} \\times 150 = 20$ orang.\nJalan kaki: $\\frac{60^\\circ}{360^\\circ} \\times 100\\% = 16{,}67\\%$.\nModus ditunjukkan oleh sudut terbesar, yaitu Ojek Online ($72^\\circ$)."
  },
  {
    "no": 24,
    "soal": "Hasil pengukuran tinggi tanaman disajikan pada tabel frekuensi berikut.\n[DIAGRAM]\nJumlah kuartil atas dan kuartil bawah dari data tersebut adalah ....",
    "options": [
      "A. 24",
      "B. 25",
      "C. 25,75",
      "D. 27"
    ],
    "jawaban": "C",
    "pembahasan": "Jumlah data $N=3+6+10+11+8+2=40$. Gunakan posisi kuartil $Q_1=\\frac{N+1}{4}=10{,}25$ dan $Q_3=\\frac{3(N+1)}{4}=30{,}75$, dengan interpolasi di antara dua data yang mengapit posisi tersebut.\n\nDari tabel, data ke-10 dan ke-11 bernilai 12, sehingga $Q_1=12$. Data ke-30 bernilai 13 dan data ke-31 bernilai 14, sehingga $Q_3=13+0{,}75(14-13)=13{,}75$.\nJadi, $Q_1+Q_3=12+13{,}75=25{,}75$.",
    "type": "pg"
  },
  {
    "no": 25,
    "type": "pgk",
    "soal": "Data tunggal berikut terdiri atas 13 angka yang telah diurutkan: 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16. Dengan kuartil bawah dan kuartil atas ditentukan sebagai median dari masing-masing separuh data (tanpa menyertakan median keseluruhan), pilih semua pernyataan yang benar.",
    "pernyataan": [
      "Kuartil bawah $Q_1$ adalah 5,5.",
      "Median $Q_2$ adalah 9.",
      "Kuartil atas $Q_3$ adalah 13.",
      "Jangkauan antarkuartil $Q_3-Q_1$ adalah 8."
    ],
    "jawabanPGK": [
      0,
      1
    ],
    "pembahasan": "Karena ada 13 data, median keseluruhan adalah data ke-7, yaitu $Q_2=9$. Tanpa memasukkan median ke dalam kedua separuh data:\n\nSeparuh bawah: 2, 4, 5, 6, 7, 8. Maka $Q_1=\\frac{5+6}{2}=5{,}5$.\nSeparuh atas: 10, 11, 12, 13, 14, 16. Maka $Q_3=\\frac{12+13}{2}=12{,}5$, bukan 13.\n\nJangkauan antarkuartil = $Q_3-Q_1=12{,}5-5{,}5=7$, bukan 8. Jadi pernyataan 1 dan 2 benar."
  }
];

const urutanNomorSoalSumber = [3, 1, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 24];
const soalBerdasarkanNomor = new Map(latihanDasarSumber.map((soal) => [soal.no, soal]));
const latihanDasar: LatihanSoal[] = urutanNomorSoalSumber.map((nomorSumber, index) => {
  const soal = soalBerdasarkanNomor.get(nomorSumber);
  if (!soal) throw new Error(`Soal statistika asal nomor ${nomorSumber} tidak ditemukan.`);
  return { ...soal, no: index + 1 };
});

const visualBerdasarkanNomorSumber: Record<number, React.ReactNode> = {
  1: renderTkaStatistikaVisual(1),
  5: renderTkaStatistikaVisual(5),
  8: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto/v1787612146/STATISTIKA_-_LATIHAN_DASAR_-_NO_13_fxctir.png",
  13: renderTkaStatistikaVisual(13),
  14: renderTkaStatistikaVisual(14),
  15: renderTkaStatistikaVisual(15),
  16: renderTkaStatistikaVisual(16),
  17: renderTkaStatistikaVisual(17),
  18: renderTkaStatistikaVisual(18),
  20: renderTkaStatistikaVisual(20),
  21: renderTkaStatistikaVisual(21),
  22: renderTkaStatistikaVisual(22),
  23: renderTkaStatistikaVisual(23),
  24: renderTkaStatistikaVisual(24),
};
const gambarMap = Object.fromEntries(
  urutanNomorSoalSumber.flatMap((nomorSumber, index) => {
    const visual = visualBerdasarkanNomorSumber[nomorSumber];
    return visual === undefined ? [] : [[index + 1, visual]];
  }),
) as Record<number, React.ReactNode>;

const StatistikaPage = () => (
  <TKAPemantapanLayout
    title="STATISTIKA"
    materiSections={tkaStatistikaMateri}
    contohSoal={statistikaContohSoal}
    soalSvgMap={statistikaContohSvgMap}
    latihanDasar={latihanDasar}
    gambarMap={gambarMap}
    imageScale="default"
    showImageSourceLinks={false}
  />
);

export default StatistikaPage;
