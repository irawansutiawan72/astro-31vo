import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";
import { getTkaContohSoal } from "@/data/tkaContohSoal";
import { brslDasarPembahasan } from "@/data/pembahasan/brslDasar";
import type { ReactNode } from "react";
import {
  BolaDalamTabungAnimation,
  LilinTerbakarAnimation,
  TornAirAnimation,
} from "./BangunRuangSisiLengkungAnimations";

const toPembahasanText = (soalNo: number) => {
  const pembahasan = brslDasarPembahasan[soalNo];
  if (!pembahasan) return undefined;

  return [
    `Konsep & Trik: ${pembahasan.konsepTrik}`,
    `Step-by-Step Penyelesaian:\n${pembahasan.stepByStep}`,
    `Tips: ${pembahasan.tips}`,
    `Kesimpulan: ${pembahasan.kesimpulan}`,
  ].join("\n\n");
};

const materiSections: MateriSection[] = [
  { heading: "A. Tabung (Silinder)", content: `Tabung: bangun ruang dengan dua sisi alas dan tutup berbentuk lingkaran, sisi selimut berbentuk persegi panjang.\n\nJika jari-jari = r dan tinggi = t:\n- Luas selimut = $2\\pi rt$\n- Luas permukaan = $2\\pi r(r + t)$\n- Volume = $\\pi r^2 t$` },
  { heading: "B. Kerucut", content: `Kerucut: bangun ruang dengan satu sisi alas berbentuk lingkaran dan satu sisi selimut berbentuk juring lingkaran.\n\nJika jari-jari = r, tinggi = t, garis pelukis = s:\n- $s = \\sqrt{r^2 + t^2}$\n- Luas selimut = $\\pi rs$\n- Luas permukaan = $\\pi r(r + s)$\n- Volume = $\\frac{1}{3} \\pi r^2 t$` },
  { heading: "C. Bola", content: `Bola: bangun ruang dengan semua titik pada permukaannya berjarak sama dari pusat.\n\nJika jari-jari = r:\n- Luas permukaan = $4\\pi r^2$\n- Volume = $\\frac{4}{3} \\pi r^3$` },
  { heading: "D. Perbandingan Volume", content: `Tabung : Kerucut : Bola\nDengan r dan t yang sama:\n$V_{tabung} : V_{kerucut} : V_{bola} = 3 : 1 : 2$\n\n(Catatan: r dan t/d harus sesuai)` },
];

const latihanDasarTkaLama: LatihanSoal[] = [
  { no: 6, soal: "Perhatikan gambar selimut tabung berikut.\nJari-jari tabung yang terjadi adalah ...", options: ["A. 3,5 cm", "B. 5 cm", "C. 7 cm", "D. 10 cm"] },
  { no: 7, soal: "Suatu tabung tanpa tutup dengan jari-jari alas 6 cm dan tingginya 10 cm. Jika $\\pi = 3,14$ maka luas tabung tanpa tutup adalah ...", options: ["A. 602,88 $cm^2$", "B. 489,84 $cm^2$", "C. 376,84 $cm^2$", "D. 301,44 $cm^2$"] },
  {
    no: 8,
    type: "pgk",
    soal: "Suatu kerucut berjari-jari 7 cm dan tinggi 24 cm. Jika $\\pi = \\frac{22}{7}$, tentukan semua pernyataan yang benar tentang kerucut tersebut.",
    pernyataan: [
      "Panjang garis pelukis kerucut adalah 25 cm.",
      "Luas alas kerucut adalah 154 $cm^2$.",
      "Luas selimut kerucut adalah 550 $cm^2$.",
      "Luas seluruh permukaan kerucut adalah 680 $cm^2$.",
    ],
    jawabanPGK: [0, 1, 2],
  },
  {
    no: 9,
    type: "pgk",
    soal: "Sebuah kerucut memiliki luas alas 154 $cm^2$ dan tinggi 24 cm. Tentukan pernyataan yang benar tentang luas seluruh permukaannya ($\\pi = \\frac{22}{7}$).",
    pernyataan: [
      "Jari-jari alas kerucut adalah 7 cm.",
      "Panjang garis pelukis kerucut adalah 25 cm.",
      "Luas selimut kerucut adalah 550 $cm^2$.",
      "Luas seluruh permukaan kerucut adalah 680 $cm^2$.",
    ],
    jawabanPGK: [0, 1, 2],
  },
  {
    no: 10,
    type: "pgk",
    soal: "Luas permukaan sebuah bola adalah 616 $cm^2$ dan $\\pi = \\frac{22}{7}$. Tentukan pernyataan yang benar tentang bola tersebut.",
    pernyataan: [
      "Jari-jari bola adalah 7 cm.",
      "Diameter bola adalah 14 cm.",
      "Luas permukaan bola adalah 616 $cm^2$.",
      "Jari-jari bola adalah 14 cm.",
    ],
    jawabanPGK: [0, 1, 2],
  },
  {
    no: 11,
    type: "pgk",
    soal: "Sebuah bangun padat berbentuk $\\frac{3}{4}$ bola berjari-jari 7 cm. Luas permukaannya mencakup seluruh bidang potong datar ($\\pi = \\frac{22}{7}$). Tentukan pernyataan yang benar.",
    pernyataan: [
      "Luas bagian lengkung bangun adalah 462 $cm^2$.",
      "Luas bidang potong datar adalah 154 $cm^2$.",
      "Luas seluruh permukaan bangun adalah 616 $cm^2$.",
      "Luas seluruh permukaan bangun adalah 462 $cm^2$.",
    ],
    jawabanPGK: [0, 1, 2],
  },
  {
    no: 12,
    type: "pgk",
    soal: "Tanti membuat dua topi ulang tahun tanpa alas dari karton berukuran 30 cm × 50 cm. Diameter setiap topi 21 cm dan garis pelukisnya 20 cm ($\\pi = \\frac{22}{7}$). Tentukan pernyataan yang benar.",
    pernyataan: [
      "Luas karton untuk satu topi adalah 660 $cm^2$.",
      "Luas karton untuk dua topi adalah 1.320 $cm^2$.",
      "Luas karton mula-mula adalah 1.500 $cm^2$.",
      "Sisa karton yang tidak terpakai adalah 150 $cm^2$.",
    ],
    jawabanPGK: [0, 1, 2],
  },
  { no: 13, soal: "Perhatikan gambar topi berbentuk kerucut terbuat dari karton berikut ini!\nJika diameter lingkaran alas 28 cm dan tinggi topi 48 cm, luas karton minimal yang diperlukan untuk membuat 3 buah topi tersebut adalah ....", options: ["A. 2.112 $cm^2$", "B. 2.200 $cm^2$", "C. 6.336 $cm^2$", "D. 6.600 $cm^2$"] },
  {
    no: 14,
    type: "pgkbs",
    soal: "Sebuah kerucut berdiameter 21 cm dan tinggi 12 cm ($\\pi = \\frac{22}{7}$). Tentukan benar atau salah pernyataan berikut.",
    pernyataan: [
      "Jari-jari alas kerucut adalah 10,5 cm.",
      "Panjang garis pelukis kerucut adalah 12 cm.",
      "Volume kerucut adalah 1.386 $cm^3$.",
    ],
    jawabanBS: ["B", "S", "B"],
  },
  {
    no: 15,
    type: "pgkbs",
    soal: "Sebuah kerucut setinggi 30 cm memiliki alas dengan keliling 66 cm ($\\pi = \\frac{22}{7}$). Tentukan benar atau salah pernyataan berikut tentang kerucut tersebut.",
    pernyataan: [
      "Jari-jari alas kerucut adalah 10,5 cm.",
      "Luas alas kerucut adalah 346,5 $cm^2$.",
      "Volume kerucut adalah 6.930 $cm^3$.",
    ],
    jawabanBS: ["B", "B", "S"],
  },
  {
    no: 16,
    type: "pgkbs",
    soal: "Diketahui luas selimut kerucut 550 $cm^2$ dan panjang garis pelukisnya 25 cm ($\\pi = \\frac{22}{7}$). Tentukan benar atau salah pernyataan berikut tentang kerucut tersebut.",
    pernyataan: [
      "Jari-jari alas kerucut adalah 7 cm.",
      "Tinggi kerucut adalah 24 cm.",
      "Volume kerucut adalah 2.464 $cm^3$.",
    ],
    jawabanBS: ["B", "B", "S"],
  },
  {
    no: 18,
    type: "pgkbs",
    soal: "Luas seluruh permukaan bola adalah 144$\\pi$ $cm^2$. Tentukan benar atau salah pernyataan berikut tentang bola tersebut.",
    pernyataan: [
      "Jari-jari bola adalah 6 cm.",
      "Volume bola adalah 288$\\pi$ $cm^3$.",
      "Diameter bola adalah 6 cm.",
    ],
    jawabanBS: ["B", "B", "S"],
  },
  {
    no: 19,
    type: "pgkbs",
    soal: "Nasyara membuat nasi tumpeng berbentuk kerucut. Bagian selimut (tanpa alas) akan dihias makanan. Diameter tumpeng 28 cm dan tingginya 48 cm ($\\pi = \\frac{22}{7}$). Tentukan benar atau salah pernyataan berikut.",
    pernyataan: [
      "Jari-jari alas tumpeng adalah 14 cm.",
      "Garis pelukis tumpeng adalah 50 cm.",
      "Luas selimut yang dihias adalah 2.816 $cm^2$.",
    ],
    jawabanBS: ["B", "B", "S"],
  },
  {
    no: 20,
    type: "pgkbs",
    soal: "Panjang jari-jari alas kerucut 6 cm dan tingginya 8 cm ($\\pi = 3,14$). Tentukan benar atau salah pernyataan berikut tentang kerucut tersebut.",
    pernyataan: [
      "Panjang garis pelukis kerucut adalah 10 cm.",
      "Luas selimut kerucut adalah 188,4 $cm^2$.",
      "Luas seluruh permukaan kerucut adalah 188,4 $cm^2$.",
    ],
    jawabanBS: ["B", "B", "S"],
  },
  { no: 21, soal: "Atap sebuah gedung berbentuk setengah bola dengan panjang diameter 14 m. Atap gedung tersebut akan dicat dengan biaya Rp50.000,00 setiap $m^2$. Biaya yang diperlukan untuk mengecat atap gedung itu adalah ....", options: ["A. Rp13.700.000,00", "B. Rp15.400.000,00", "C. Rp15.850.000,00", "D. Rp16.400.000,00"] },
  { no: 23, soal: "Volume sebuah kerucut adalah 314 $cm^3$, Jika jari-jari alasnya 5 cm dan $\\pi = 3,14$, maka panjang garis pelukisnya adalah ...", options: ["A. 4 cm", "B. 12 cm", "C. 13 cm", "D. 20 cm"] },
  { no: 24, soal: "Sebuah drum berbentuk tabung dengan panjang jari-jari 70 cm dan tinggi 100 cm penuh berisi minyak tanah. Minyak tanah tersebut akan dituang ke dalam tabung-tabung kecil dengan panjang jari-jari 35 cm dan tinggi 50 cm. Banyak tabung kecil yang akan diperlukan adalah....", options: ["A. 2 buah", "B. 4 buah", "C. 6 buah", "D. 8 buah"] },
  { no: 25, soal: "Sebuah drum berbentuk tabung dengan diameter alas 10 cm dan tinggi 100 cm. Bila $\\frac{3}{4}$ bagian dari drum berisi minyak, banyak minyak di dalam drum tersebut adalah ...", options: ["A. 8587,5 $cm^3$", "B. 8578,5 $cm^3$", "C. 5887,5 $cm^3$", "D. 5878,5 $cm^3$"] },
  { no: 26, soal: "Panjang jari-jari dua buah bola masing-masing adalah 12 cm dan 20 cm. tentukan perbandingan volume kedua bola itu...", options: ["A. 27 : 125", "B. 9 : 25", "C. 3 : 20", "D. 3 : 5"] },
  { no: 27, soal: "Sebuah kerucut mempunyai volume 40 $cm^3$, jika diameter kerucut diperbesar 2 kali dan tinggi diperbesar 3 kali, maka volume kerucut yang baru adalah ....", options: ["A. 240 $cm^3$", "B. 480 $cm^3$", "C. 720 $cm^3$", "D. 1440 $cm^3$"] },
  { no: 28, soal: "Diketahui volume suatu kerucut 120 $cm^3$, jika diameter kerucut diperbesar dua kali dan tinggi diperpanjang 3 kali, maka volume kerucut sekarang adalah....", options: ["A. 240 $cm^3$", "B. 480 $cm^3$", "C. 1.440 $cm^3$", "D. 1.540 $cm^3$"] },
  { no: 29, soal: "Sebuah kertas karton berbentuk juring lingkaran dengan sudut pusat $216^0$ dan panjang jari-jarinya 15 cm. Jika kertas karton tersebut dibuat kerucut, maka volume kerucut maksimum adalah ....", options: ["A. $324\\pi$ $cm^3$", "B. $405\\pi$ $cm^3$", "C. $620\\pi$ $cm^3$", "D. $675\\pi$ $cm^3$"] },
  { no: 30, soal: "Perhatikan gambar!\nLuas permukaan bangun ruang tersebut adalah .... ($\\pi = \\frac{22}{7}$)", options: ["A. 550 $cm^2$", "B. 1320 $cm^2$", "C. 1474 $cm^2$", "D. 1584 $cm^2$"] },
  { no: 31, soal: "Perhatikan gambar!\nLuas permukaan gambar disamping adalah ...", options: ["A. 400$\\pi$ $cm^2$", "B. 800$\\pi$ $cm^2$", "C. 1200$\\pi$ $cm^2$", "D. 1600$\\pi$ $cm^2$"] },
  { no: 32, soal: "Perhatikan gambar!\nBandul logam terdiri atas kerucut dan setengah bola. Jika massa setiap 1 $cm^3$ logam adalah 15 gram dan $\\pi = 3,14$, berat bandul seluruhnya adalah ....", options: ["A. 7.122 gram", "B. 7.212 gram", "C. 7.222 gram", "D. 8.635 gram"] },
  { no: 33, soal: "Sebuah bandul terdiri dari kerucut dan belahan bola.\nJika diameter bola 14 cm dan garis pelukis kerucutnya 25 cm, maka volume bandul tersebut adalah ....", options: ["A. 132,6 $cm^3$", "B. 1232,0 $cm^3$", "C. 1950,7 $cm^3$", "D. 2002,0 $cm^3$"] },
  { no: 34, soal: "Perhatikan gambar benda padat berbentuk tabung dan setengah bola berikut!\nLuas permukaan benda tersebut adalah ... ($\\pi = \\frac{22}{7}$)", options: ["A. 702 cm²", "B. 802 cm²", "C. 902 cm²", "D. 1.002 cm²"] },
  { no: 35, soal: "Perhatikan gambar berikut!\nSebuah peluru terbentuk dari tabung dan kerucut. Volume peluru tersebut adalah... ($\\pi = \\frac{22}{7}$)", options: ["A. 4.312,0 $cm^3$", "B. 4.230,0 $cm^3$", "C. 4.358,2 $cm^3$", "D. 5.312,4 $cm^3$"] },
  { no: 36, soal: "Bangun pada gambar berikut terdiri dari tabung dan belahan bola.\nLuas permukaan bangun tersebut adalah....", options: ["A. 880 $cm^2$", "B. 1.496 $cm^2$", "C. 1.596 $cm^2$", "D. 2.010 $cm^2$"] },
  { no: 37, soal: "Bola tepat pas di dalam tabung seperti pada gambar. Jika luas permukaan bola 616 $cm^2$ dan $\\pi = \\frac{22}{7}$, luas seluruh permukaan tabung adalah ....", options: ["A. 616 $cm^2$", "B. 770 $cm^2$", "C. 880 $cm^2$", "D. 924 $cm^2$"] },
  { no: 38, soal: "Sebuah bak air berbentuk tabung dengan diameter 140 cm dan memiliki tinggi 1 m yang terisi penuh. Dari tabung tersebut dialirkan air melalui kran dengan debit 20 liter/menit selama 1 jam. Maka volume air yang masih tersisa adalah ...", options: ["A. 40 liter", "B. 140 liter", "C. 240 liter", "D. 340 liter"] },
  { no: 41, soal: "Sebuah tabung berjari-jari 10 cm dan tinggi 50 cm berisi air setinggi $\\frac{3}{5}$ tinggi tabung. Jika 3 bola besi berjari-jari 5 cm dimasukkan hingga tenggelam, tinggi permukaan air setelahnya adalah ...", options: ["A. 32 cm", "B. 35 cm", "C. 38 cm", "D. 40 cm"] },
  { no: 42, soal: "Sebuah torn pengisi air berbentuk tabung dengan diameter 2 m dan tinggi 10 m. Torn tersebut diisi air dengan debit 200 liter/menit ($\\pi = 3,14$). Torn akan terisi penuh selama ...", options: ["A. 2 jam 15 menit", "B. 2 jam 27 menit", "C. 2 jam 37 menit", "D. 2 jam 38 menit"], gambar: <TornAirAnimation /> },
  { no: 43, soal: "Sebuah bola logam dimasukkan ke dalam tabung yang berisi air sehingga permukaan air di dalam tabung menjadi naik. Hitunglah tinggi air yang naik jika diameternya 3 cm dan diameter tabung 5 cm.", options: ["A. 0,72", "B. 52", "C. 18", "D. 7,2"], gambar: <BolaDalamTabungAnimation /> },
  { no: 44, soal: "Fitra menyalakan lilin berbentuk tabung dengan diameter 2,8 cm dan tinggi 15 cm. Jika setiap menit lilin terbakar 1,68 $cm^3$, maka lilin akan habis terbakar dalam waktu ... ($\\pi = \\frac{22}{7}$)", options: ["A. 48 menit", "B. 50 menit", "C. 55 menit", "D. 56 menit"], gambar: <LilinTerbakarAnimation /> },
  { no: 45, soal: "Wadah pembuatan es cream berbentuk tabung dengan diameter 0,2 m dan tinggi 0,75 m. Jika es cream tersebut dimasukkan kedalam corong-corong es cream berbentuk kerucut dengan jari-jari 2,5 cm dan tinggi 10 cm. Maka banyak corong es cream yang dibutuhkan adalah...", options: ["A. 60", "B. 120", "C. 240", "D. 360"] },
];

const brslDasarImages: Record<number, string> = {
  6: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117359/BANGUN_RUANG_SISI_LENGKUNG_-_LATIHAN_DASAR_-_NO_6_pgbiec.png",
  13: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117359/BANGUN_RUANG_SISI_LENGKUNG_-_LATIHAN_DASAR_-_NO_13_oosn5o.png",
  30: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117360/BANGUN_RUANG_SISI_LENGKUNG_-_LATIHAN_DASAR_-_NO_30_zftbie.png",
  31: "https://res.cloudinary.com/s4ge6not/image/upload/v1783117358/BANGUN_RUANG_SISI_LENGKUNG_-_LATIHAN_DASAR_-_NO_31_nlgpvg.png",
  32: "https://res.cloudinary.com/s4ge6not/image/upload/v1783117365/BANGUN_RUANG_SISI_LENGKUNG_-_LATIHAN_DASAR_-_NO_32_klahbw.png",
  33: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117358/BANGUN_RUANG_SISI_LENGKUNG_-_LATIHAN_DASAR_-_NO_33_nsnj1g.png",
  34: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117357/BANGUN_RUANG_SISI_LENGKUNG_-_LATIHAN_DASAR_-_NO_34_eqdmwj.png",
  35: "https://res.cloudinary.com/s4ge6not/image/upload/v1783117358/BANGUN_RUANG_SISI_LENGKUNG_-_LATIHAN_DASAR_-_NO_35_uu8ch9.png",
  36: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117357/BANGUN_RUANG_SISI_LENGKUNG_-_LATIHAN_DASAR_-_NO_36_aqje7y.png",
  37: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117356/BANGUN_RUANG_SISI_LENGKUNG_-_LATIHAN_DASAR_-_NO_37_zvgxf3.png",
};

const gambarSetengahNomorAsli = new Set([6, 13, 35, 36]);
const gambarSeperempatNomorAsli = new Set([35, 36]);
const gambarSeperdelapanNomorAsli = new Set([30, 31, 32, 33, 34, 37]);
const nomorTampilPerNomorAsli = new Map(
  latihanDasarTkaLama.map((soal, index) => [soal.no, index + 1]),
);
const latihanDasarTkaBerurutan = latihanDasarTkaLama.map((soal, index) => ({
  ...soal,
  no: index + 1,
  jawaban: soal.type ? undefined : brslDasarPembahasan[soal.no]?.jawaban.match(/^([A-D])\./)?.[1],
  pembahasan: toPembahasanText(soal.no),
}));
const brslDasarGambarMap: Record<number, ReactNode> = {};

for (const [nomorAsli, src] of Object.entries(brslDasarImages)) {
  const nomorTampil = nomorTampilPerNomorAsli.get(Number(nomorAsli));
  if (nomorTampil === undefined) continue;
  const originalQuestionNo = Number(nomorAsli);
  const widthClass = gambarSeperdelapanNomorAsli.has(originalQuestionNo)
    ? "max-w-[48px]"
    : gambarSeperempatNomorAsli.has(originalQuestionNo)
      ? "max-w-[96px]"
      : gambarSetengahNomorAsli.has(originalQuestionNo)
      ? "max-w-[192px]"
      : "max-w-sm";
  brslDasarGambarMap[nomorTampil] = (
    <img
      src={src}
      alt={`Gambar soal ${nomorTampil}`}
      className={`mx-auto w-full ${widthClass} rounded-lg border border-border/40 bg-background p-2`}
    />
  );
}

const BangunRuangSisiLengkungPage = () => (
  <TKAPemantapanLayout
    title="BANGUN RUANG SISI LENGKUNG"
    materiSections={materiSections}
    contohSoal={getTkaContohSoal("bangun-ruang-sisi-lengkung")}
    latihanDasar={latihanDasarTkaBerurutan}
    gambarMap={brslDasarGambarMap}
    showImmediateAnswerFeedback
  />
);

export default BangunRuangSisiLengkungPage;
