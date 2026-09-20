import type { ReactNode } from "react";
import type { MateriSection } from "@/components/tka/TKAPemantapanLayout";

export interface TkaPolaBilanganSoal {
  no: number;
  soal: string;
  options: string[];
}

export const polaBilanganMateriSections: MateriSection[] = [
  {
    heading: "A. Barisan",
    content:
      "Barisan adalah daftar urutan bilangan dari kiri ke kanan yang mempunyai pola tertentu. Setiap bilangan dalam barisan merupakan suku dalam barisan.",
  },
  {
    heading: "B. Barisan Aritmatika",
    content: `Barisan aritmatika adalah barisan dengan selisih antara dua suku yang berurutan selalu tetap. Selisih tersebut dinamakan beda dan dilambangkan dengan "b"

Rumus:
$b = U_n - U_{n-1}$
$U_n = a + (n-1)b$
$U_n = S_n - S_{n-1}$

Deret adalah penjumlahan suku-suku dari suatu barisan. Jika suatu barisan: $U_1, U_2, U_3, ..., U_n$ maka $S_n = U_1 + U_2 + U_3 + ... + U_n$ adalah deret.

Rumus:
$S_n = \\frac{n}{2}(2a + (n-1)b)$
$S_n = \\frac{n}{2}(a + U_n)$

Keterangan:
a = $U_1$ = Suku pertama
b = beda
n = banyak suku
$U_n$ = Suku ke-n
$S_n$ = Jumlah n suku pertama`,
  },
  {
    heading: "C. Barisan Geometri",
    content: `Barisan geometri adalah barisan dengan rasio antara dua suku yang berurutan selalu tetap. Rasio tersebut dilambangkan dengan "r".

Rumus:
$r = \\frac{U_n}{U_{n-1}}$
$U_n = ar^{n-1}$

Deret geometri:
$S_n = \\frac{a(r^n - 1)}{r - 1}$ untuk $r > 1$
$S_n = \\frac{a(1 - r^n)}{1 - r}$ untuk $r < 1$

Keterangan:
a = $U_1$ = Suku pertama
r = rasio
n = banyak suku
$U_n$ = Suku ke-n
$S_n$ = Jumlah n suku pertama`,
  },
  {
    heading: "D. Barisan Bertingkat",
    content: `1. Pola Bilangan Persegi
$U_n = n^2$

2. Pola Bilangan Persegi Panjang
$U_n = n(n+1)$

3. Pola Bilangan Segitiga
$U_n = \\frac{n(n+1)}{2}$`,
  },
  {
    heading: "E. Menentukan Rumus Suku Ke-n dengan Prosedur Matematika",
    content: `Prosedur matematika dapat dilakukan dengan cara mengamati pola selisih suku-suku yang berurutan pada barisan bilangan yang bersangkutan.

Secara umum, jika selisih tetapnya ditemukan pada:
- Satu Tingkat penyelidikan, maka $U_n$ berupa polinom berderajat 1: $U_n = an + b$
- Dua Tingkat penyelidikan, maka $U_n$ berupa polinom berderajat 2: $U_n = an^2 + bn + c$
- Tiga Tingkat penyelidikan, maka $U_n$ berupa polinom berderajat 3: $U_n = an^3 + bn^2 + cn + d$

Contoh:
Tentukan rumus ke-n dari barisan 0, 1, 3, 6, 10, 15
Jawab: $U_n = \\frac{1}{2}n(n-1)$`,
  },
];

export const latihanDasarPolaBilanganTka: TkaPolaBilanganSoal[] = [
  { no: 1, soal: "Diketahui barisan bilangan aritmetika sebagai berikut.\n$-8, -4, 0, 4, 8, 12, n, 20, 24$\nNilai n yang memenuhi adalah ....", options: ["A. 10", "B. 14", "C. 16", "D. 18"] },
  { no: 2, soal: "Perhatikan pola bilangan berselang-seling berikut.\n$1, 3, 5, 8, 9, 13, 13, 18, 17, \\ldots$\nPernyataan yang sesuai dengan pola tersebut adalah ....", options: ["A. Suku ke-7, ke-8, dan ke-9 adalah 13, 18, 17", "B. Suku ke-7, ke-8, dan ke-9 adalah 14, 17, 18", "C. Suku ke-7, ke-8, dan ke-9 adalah 13, 17, 18", "D. Suku ke-7, ke-8, dan ke-9 adalah 14, 18, 19"] },
  { no: 3, soal: "Suku ke-22 dari barisan 99, 93, 87, 81, … adalah ....", options: ["A. –27", "B. –21", "C. –15", "D. –9"] },
  { no: 4, soal: "Suku pertama dari barisan aritmatika adalah 3 dan bedanya 4, suku ke-10 dari barisan aritmatika tersebut adalah ....", options: ["A. 30", "B. 33", "C. 36", "D. 39"] },
  { no: 5, soal: "Dari barisan aritmetika diketahui $U_3 = 18$ dan $U_7 = 38$. Jumlah 24 suku pertama adalah ....", options: ["A. 786", "B. 1248", "C. 1572", "D. 3144"] },
  { no: 6, soal: "Dalam gedung pertunjukkan disusun kursi dengan baris paling depan terdiri dari 12 buah, baris kedua berisi 14 buah, baris ketiga 16 buah dan seterusnya selalu bertambah 2. Banyaknya kursi pada baris ke-20 adalah ....", options: ["A. 28 buah", "B. 50 buah", "C. 58 buah", "D. 60 buah"] },
  { no: 7, soal: "Pada tumpukan batu bata, banyak batu bata paling atas ada 8 buah, tepat di bawahnya ada 10 buah, dan seterusnya setiap tumpukan di bawahnya selalu lebih banyak 2 buah dari tumpukan di atasnya. Jika ada 15 tumpukan batu bata (dari atas sampai bawah), berapa banyak batu bata pada tumpukan paling bawah?", options: ["A. 35 buah", "B. 36 buah", "C. 38 buah", "D. 40 buah"] },
  { no: 8, soal: "Dalam suatu ruang terdapat 15 baris kursi, baris paling depan terdapat 23 kursi, baris berikutnya 2 kursi lebih banyak dari baris di depannya. Jumlah kursi dalam ruang tersebut adalah ....", options: ["A. 555", "B. 385", "C. 1.110", "D. 1.140"] },
  { no: 9, soal: "Permintaan suatu produk barang diperkirakan mengalami kenaikan 5.000 unit setiap bulan. Jika jumlah produk pertamanya 100.000, maka jumlah produk selama satu tahun pertama adalah ....", options: ["A. 1.205.000 unit", "B. 1.255.000 unit", "C. 1.260.000 unit", "D. 1.530.000 unit", "E. 1.560.000 unit"] },
  { no: 10, soal: "Diketahui barisan aritmatika, suku ke-7 dan suku ke-4 adalah 26 dan 14. Jika $U_n$ menyatakan suku ke-n dan $S_n$ menyatakan jumlah sampai n suku pertama, pernyataan yang benar adalah ....", options: ["A. $U_{30} = 108$", "B. $U_{35} = 158$", "C. $S_{15} = 450$", "D. $S_{20} = 1.600$"] },
  { no: 11, soal: "Tentukan jumlah semua bilangan asli antara 200 dan 400 yang habis dibagi 4 dan habis dibagi 6.", options: ["A. 3.000", "B. 3.200", "C. 3.600", "D. 3.800"] },
  { no: 12, soal: "Berapakah jumlah semua bilangan bulat dari 100 sampai 500 yang habis dibagi 8 dan habis dibagi 12?", options: ["A. 3.000", "B. 3.120", "C. 3.360", "D. 3.600"] },
  { no: 13, soal: "Tentukan jumlah semua bilangan asli antara 100 dan 300 yang habis dibagi 7 tetapi tidak habis dibagi 5.", options: ["A. 3.424", "B. 3.696", "C. 4.060", "D. 4.200"] },
  { no: 14, soal: "Diberikan deret bilangan bulat positif: 1, 2, 3, …, 200. Tentukan jumlah bilangan dalam deret tersebut yang habis dibagi 4 tetapi tidak habis dibagi 10.", options: ["A. 4.000", "B. 4.200", "C. 4.400", "D. 4.800"] },
  { no: 15, soal: "Diketahui barisan bilangan 8, 4, 2, 1, …. Rumus suku ke-n barisan tersebut adalah ....", options: ["A. $2^{n+2}$", "B. $2^{n-4}$", "C. $2^{-n+4}$", "D. $2^{n-1}$"] },
  { no: 16, soal: "Suku pertama dan kelima suatu barisan geometri berturut-turut 5 dan 80. Suku ke-9 barisan geometri tersebut adalah ....", options: ["A. 90", "B. 405", "C. 940", "D. 1.280"] },
  { no: 17, soal: "Suku ke-2 dan ke-4 barisan geometri adalah 384 dan 96. Suku ke-8 barisan tersebut adalah ....", options: ["A. 3", "B. 6", "C. 9", "D. 12"] },
  { no: 18, soal: "Suku ke-1 dan suku ke-4 barisan geometri adalah 5 dan 40. Jumlah 6 suku pertama dari barisan tersebut adalah ....", options: ["A. 155", "B. 160", "C. 315", "D. 320"] },
  { no: 19, soal: "Celin melipat-lipat kertas berkali-kali. Jika ketebalan kertas mula-mula 2 mm, maka butuh berapa kali lipatan sehingga ketebalan kertas menjadi 256 mm?", options: ["A. 7 kali", "B. 8 kali", "C. 9 kali", "D. 10 kali"] },
  { no: 20, soal: "Seutas tali dibagi menjadi enam bagian, sehingga bagian-bagiannya membentuk barisan geometri. Jika panjang tali terpendek 9 cm dan panjang tali terpanjang 288 cm, maka panjang tali mula-mula adalah ....", options: ["A. 567 cm", "B. 576 cm", "C. 586 cm", "D. 596 cm"] },
  { no: 21, soal: "Setiap bakteri akan membelah diri menjadi 2 setiap 15 menit. Jika banyak bakteri pada pukul 10.00 ada 25 buah, maka banyak bakteri pada pukul 12.15 adalah ....", options: ["A. 800", "B. 1600", "C. 3200", "D. 6400"] },
  { no: 22, soal: "Diketahui barisan $15, 24, 35, 48, \\ldots$. Suku ke-14 barisan tersebut adalah ....", options: ["A. 280", "B. 286", "C. 288", "D. 290"] },
  { no: 23, soal: "Diketahui barisan $3, 5, 9, 15, 23, \\ldots$. Suku ke-40 barisan tersebut adalah ....", options: ["A. 1.560", "B. 1.563", "C. 1.584", "D. 1.603"] },
  { no: 24, soal: "Perhatikan pola bilangan berselang-seling berikut.\n$1, 3, 6, 7, 11, 11, \\ldots$\nTiga suku berikutnya adalah ....", options: ["A. 15, 16, 20", "B. 16, 15, 21", "C. 16, 16, 21", "D. 17, 15, 22"] },
  { no: 25, soal: "Rumus suku ke-n barisan adalah $U_n = 2n(n-1)$. Hasil dari $U_9 - U_7$ adalah ....", options: ["A. 80", "B. 70", "C. 60", "D. 50"] },
  { no: 26, soal: "Rumus suku ke-n dari barisan bilangan 0, 4, 10, 18, … adalah ....", options: ["A. $\\frac{1}{2}n(n+1)$", "B. $2n(n+1)$", "C. $(n-1)(n+2)$", "D. $(n+1)(n+2)$"] },
  { no: 27, soal: "Perhatikan gambar berikut!\nBanyak persegi satuan pada pola ke-19 adalah ....", options: ["A. 36", "B. 38", "C. 40", "D. 42"] },
  { no: 28, soal: "Perhatikan gambar pola berikut.\nBanyak lingkaran pada pola ke-15 adalah ....", options: ["A. 105", "B. 120", "C. 210", "D. 240"] },
  { no: 29, soal: "Gambar berikut adalah pola segitiga.\nBanyak segitiga satu-satuan pada pola ke-7 adalah ....", options: ["A. 28", "B. 36", "C. 42", "D. 49"] },
  { no: 30, soal: "Perhatikan gambar pola berikut!\nBanyak lingkaran pada pola ke-10 adalah ....", options: ["A. 99 buah", "B. 104 buah", "C. 115 buah", "D. 120 buah"] },
  { no: 31, soal: "Perhatikanlah pola berikut.\nBanyak lingkaran pada pola ke-30 adalah ....", options: ["A. 39", "B. 41", "C. 57", "D. 59"] },
];

const Soal27Svg = () => {
  const square = 18;
  const gap = 22;
  const patterns = [{ columns: 2 }, { columns: 3 }, { columns: 4 }];
  let currentX = 8;
  const positions: number[] = [];
  for (const pattern of patterns) {
    positions.push(currentX);
    currentX += pattern.columns * square + gap;
  }
  return (
    <svg width={currentX - gap + 8} height={2 * square + 12}>
      {patterns.map((pattern, index) => {
        const x = positions[index];
        const rectangles: ReactNode[] = [];
        for (let row = 0; row < 2; row++) {
          for (let column = 0; column < pattern.columns; column++) {
            rectangles.push(
              <rect
                key={`${row}-${column}`}
                x={x + column * square}
                y={6 + row * square}
                width={square}
                height={square}
                fill="#5b9ec9"
                stroke="var(--icon-stroke)"
                strokeWidth="1.5"
                rx="1"
              />,
            );
          }
        }
        return <g key={index}>{rectangles}</g>;
      })}
    </svg>
  );
};

const Soal28Svg = () => {
  const radius = 7;
  const spacing = 17;
  const patterns = [1, 2, 3, 4];
  const gap = 22;
  let currentX = 8;
  const positions: number[] = [];
  for (const pattern of patterns) {
    positions.push(currentX);
    currentX += pattern * spacing + gap;
  }
  const maxHeight = 4 * spacing;
  return (
    <svg width={currentX - gap + 8} height={maxHeight + 30}>
      {patterns.map((pattern, index) => {
        const x = positions[index];
        const patternWidth = pattern * spacing;
        const circles: ReactNode[] = [];
        for (let row = 0; row < pattern; row++) {
          const number = pattern - row;
          const rowOffset = (patternWidth - number * spacing) / 2;
          const y = 8 + maxHeight - (row + 1) * spacing + spacing / 2;
          for (let column = 0; column < number; column++) {
            circles.push(
              <circle
                key={`${row}-${column}`}
                cx={x + rowOffset + column * spacing + spacing / 2}
                cy={y}
                r={radius}
                fill="none"
                stroke="#5b9ec9"
                strokeWidth="1.5"
              />,
            );
          }
        }
        return (
          <g key={index}>
            {circles}
            <text x={x + patternWidth / 2} y={8 + maxHeight + 20} textAnchor="middle" fill="#ffffffcc" fontSize="12" fontFamily="sans-serif">
              {pattern}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const Soal30Svg = () => {
  const dotRadius = 5;
  const spacing = 13;
  const patterns = [
    { rows: 1, columns: 3 },
    { rows: 2, columns: 4 },
    { rows: 3, columns: 5 },
    { rows: 4, columns: 6 },
  ];
  const gap = 18;
  let currentX = 8;
  const positions: number[] = [];
  for (const pattern of patterns) {
    positions.push(currentX);
    currentX += pattern.columns * spacing + gap;
  }
  const maxHeight = 4 * spacing;
  return (
    <svg width={currentX - gap + 8} height={maxHeight + 12}>
      {patterns.map((pattern, index) => {
        const x = positions[index];
        const height = pattern.rows * spacing;
        const offsetY = 6 + maxHeight - height;
        const dots: ReactNode[] = [];
        for (let row = 0; row < pattern.rows; row++) {
          for (let column = 0; column < pattern.columns; column++) {
            dots.push(
              <circle
                key={`${row}-${column}`}
                cx={x + column * spacing + dotRadius}
                cy={offsetY + row * spacing + dotRadius}
                r={dotRadius}
                fill="var(--icon-stroke)"
              />,
            );
          }
        }
        return <g key={index}>{dots}</g>;
      })}
    </svg>
  );
};

const Soal31Svg = () => {
  const dotRadius = 5;
  const spacing = 14;
  const patterns = [1, 2, 3, 4];
  const gap = 22;
  let currentX = 8;
  const positions: number[] = [];
  for (const pattern of patterns) {
    positions.push(currentX);
    currentX += pattern * spacing + gap;
  }
  const maxHeight = 4 * spacing;
  return (
    <svg width={currentX - gap + 8} height={maxHeight + 12}>
      {patterns.map((pattern, index) => {
        const x = positions[index];
        const baseY = 6 + maxHeight;
        const dots: ReactNode[] = [];
        for (let column = 0; column < pattern; column++) {
          dots.push(
            <circle
              key={`bottom-${column}`}
              cx={x + column * spacing + dotRadius}
              cy={baseY - dotRadius}
              r={dotRadius}
              fill="var(--icon-stroke)"
            />,
          );
        }
        for (let row = 1; row < pattern; row++) {
          dots.push(
            <circle
              key={`right-${row}`}
              cx={x + (pattern - 1) * spacing + dotRadius}
              cy={baseY - row * spacing - dotRadius}
              r={dotRadius}
              fill="var(--icon-stroke)"
            />,
          );
        }
        return <g key={index}>{dots}</g>;
      })}
    </svg>
  );
};

export const polaBilanganSoalSvgMap: Record<string, ReactNode> = {
  "27": <Soal27Svg />,
  "28": <Soal28Svg />,
  "29": (
    <img
      src="https://drive.google.com/thumbnail?id=1f-EBr1I4CaOwcZbixjEMgb5NxepLfmoM&sz=w800"
      alt="Pola segitiga"
      className="my-2 max-w-xs w-full rounded"
    />
  ),
  "30": <Soal30Svg />,
  "31": <Soal31Svg />,
};