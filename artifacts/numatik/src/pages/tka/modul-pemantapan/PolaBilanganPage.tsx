import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { LatihanSoal, MateriSection } from "@/components/tka/TKAPemantapanLayout";
import { getTkaContohSoal } from "@/data/tkaContohSoal";
import { polaBilanganDasarPembahasan } from "@/data/pembahasan/polaBilanganDasar";
import {
  latihanDasarPolaBilanganTka,
  polaBilanganMateriSections,
  polaBilanganSoalSvgMap,
} from "@/data/tka/polaBilanganLatihan";

const kunciJawaban = [
  "C", "C", "A", "D", "C", "B", "B", "A", "D", "C", "C", "D", "D", "A",
  "C", "D", "B", "C", "A", "A", "D", "C", "B", "C", "C", "C", "C", "B",
  "D", "D", "D", "B", "C", "D", "A", "B", "B", "A", "B", "A", "A", "A",
] as const;

type ComplexVariant = {
  soal: string;
  pernyataan: string[];
  pembahasan: string;
};

const pgkVariants: Record<number, ComplexVariant & { jawabanPGK: number[] }> = {
  2: {
    soal: "Perhatikan pola bilangan berselang-seling $1, 3, 5, 8, 9, 13, 13, 18, 17, \\ldots$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Suku ke-7 adalah 13.",
      "Suku ke-8 adalah 18.",
      "Suku ke-9 adalah 17.",
      "Suku ke-10 adalah 22.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Pisahkan posisi ganjil dan genap. Posisi ganjil membentuk $1,5,9,13,17,\\ldots$, sedangkan posisi genap membentuk $3,8,13,18,23,\\ldots$. Jadi suku ke-7, ke-8, dan ke-9 berturut-turut 13, 18, dan 17. Suku ke-10 adalah 23, bukan 22; pernyataan (1), (2), dan (3) benar.",
  },
  4: {
    soal: "Suku pertama suatu barisan aritmetika adalah 3 dan bedanya 4. Tentukan semua pernyataan yang benar.",
    pernyataan: [
      "Beda barisan tersebut adalah 4.",
      "Suku ke-10 adalah 39.",
      "Suku ke-15 adalah 59.",
      "Suku ke-20 adalah 79.",
    ],
    jawabanPGK: [0, 1, 2, 3],
    pembahasan: "Gunakan $U_n=3+(n-1)4$. Diperoleh $U_{10}=39$, $U_{15}=59$, dan $U_{20}=79$. Keempat pernyataan benar.",
  },
  8: {
    soal: "Dalam ruang terdapat 15 baris kursi. Baris pertama memiliki 23 kursi dan setiap baris berikutnya bertambah 2 kursi. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Banyak kursi pada baris ke-15 adalah 51.",
      "Jumlah seluruh kursi adalah 555.",
      "Banyak kursi pada baris ke-10 adalah 41.",
      "Jumlah seluruh kursi adalah 545.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Dengan $a=23$, $b=2$, dan $n=15$, diperoleh $U_{15}=23+14(2)=51$, $U_{10}=41$, dan $S_{15}=\\frac{15}{2}(23+51)=555$. Jadi (1), (2), dan (3) benar.",
  },
  11: {
    soal: "Tentukan jumlah bilangan asli antara 200 dan 400 yang habis dibagi 5. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Bilangan-bilangan tersebut merupakan kelipatan 5.",
      "Bilangan pertama dalam rentang tersebut adalah 205.",
      "Bilangan terakhir dalam rentang tersebut adalah 395.",
      "Jumlah semua bilangan tersebut adalah 11.500.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Bilangan yang memenuhi adalah $205,210,\\ldots,395$, sebanyak $((395-205)/5)+1=39$ bilangan. Jumlahnya $\\frac{39}{2}(205+395)=11.700$. Jadi pernyataan (1), (2), dan (3) benar, sedangkan (4) salah.",
  },
  10: {
    soal: "Diketahui barisan aritmetika dengan $U_7=26$ dan $U_4=14$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Suku ke-30 adalah 118.",
      "Jumlah 15 suku pertama adalah 450.",
    ],
    jawabanPGK: [0, 1],
    pembahasan: "$U_7-U_4=3b=12$, sehingga $b=4$. Dari $U_4=a+3b=14$ diperoleh $a=2$. Maka $U_{30}=2+29(4)=118$ dan $S_{15}=\\frac{15}{2}(2(2)+14(4))=450$. Kedua pernyataan benar.",
  },
  14: {
    soal: "Dari bilangan 1 sampai 200, tentukan jumlah bilangan yang habis dibagi 4 tetapi tidak habis dibagi 10. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Ada 50 kelipatan 4 dari 1 sampai 200.",
      "Ada 10 bilangan yang merupakan kelipatan 4 sekaligus 10.",
      "Jumlah bilangan yang memenuhi adalah 4.000.",
      "Jumlah bilangan yang memenuhi adalah 5.100.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Jumlah kelipatan 4 adalah $5.100$. Yang juga habis dibagi 10 adalah kelipatan 20 dengan jumlah $1.100$. Selisihnya $5.100-1.100=4.000$. Jadi (1), (2), dan (3) benar.",
  },
  17: {
    soal: "Diketahui $U_2=384$ dan $U_4=96$ pada barisan geometri dengan rasio positif. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Rasio barisan adalah $\\frac{1}{2}$.",
      "Suku pertamanya adalah 768.",
      "Suku ke-8 adalah 6.",
      "Suku ke-6 adalah 24.",
    ],
    jawabanPGK: [0, 1, 2, 3],
    pembahasan: "$r^2=\\frac{U_4}{U_2}=\\frac{96}{384}=\\frac14$. Karena rasionya positif, $r=\\frac12$. Maka $a=768$, $U_8=768(\\frac12)^7=6$, dan $U_6=768(\\frac12)^5=24$. Keempat pernyataan benar.",
  },
  20: {
    soal: "Seutas tali dibagi menjadi enam bagian yang membentuk barisan geometri. Bagian terpendek 9 cm dan terpanjang 288 cm. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Rasio barisan adalah 2.",
      "Panjang tali mula-mula adalah 567 cm.",
      "Dua bagian tengah berturut-turut panjangnya 36 cm dan 72 cm.",
      "Panjang tali mula-mula adalah 576 cm.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "$9r^5=288$ sehingga $r=2$. Enam bagian tersebut adalah $9,18,36,72,144,288$. Jumlahnya $567$ cm. Jadi (1), (2), dan (3) benar.",
  },
  23: {
    soal: "Diketahui barisan $3,5,9,15,23,\\ldots$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Selisih antar suku adalah $2,4,6,8,\\ldots$.",
      "Rumus suku ke-n adalah $U_n=n^2-n+3$.",
      "Suku ke-40 adalah 1.563.",
      "Suku ke-20 adalah 383.",
    ],
    jawabanPGK: [0, 1, 2, 3],
    pembahasan: "Selisihnya membentuk $2,4,6,8,\\ldots$, sehingga $U_n=n^2-n+3$. Maka $U_{40}=1.563$ dan $U_{20}=20^2-20+3=383$. Keempat pernyataan benar.",
  },
  26: {
    soal: "Diketahui barisan $0,4,10,18,\\ldots$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Selisih tingkat keduanya adalah 2.",
      "Rumus suku ke-n adalah $U_n=n^2+n-2$.",
      "Suku ke-5 adalah 28.",
      "Rumus suku ke-n adalah $U_n=n^2-n-2$.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Selisih pertama adalah $4,6,8,\\ldots$, sehingga selisih tingkat kedua 2. Rumusnya $U_n=n^2+n-2=(n-1)(n+2)$ dan $U_5=28$. Jadi (1), (2), dan (3) benar.",
  },
};

const pgkbsVariants: Record<number, ComplexVariant & { jawabanBS: ("B" | "S")[] }> = {
  3: {
    soal: "Diketahui barisan $99,93,87,81,\\ldots$. Tentukan Benar atau Salah untuk setiap pernyataan.",
    pernyataan: [
      "Beda barisan tersebut adalah $-6$.",
      "Suku ke-22 adalah $-27$.",
      "Suku ke-25 adalah $-39$.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Bedanya $93-99=-6$. Dengan $U_n=99+(n-1)(-6)$, diperoleh $U_{22}=-27$ dan $U_{25}=-45$, bukan $-39$. Pernyataan (1) dan (2) benar, sedangkan (3) salah.",
  },
  5: {
    soal: "Diketahui $U_3=18$ dan $U_7=38$ pada suatu barisan aritmetika. Tentukan Benar atau Salah untuk setiap pernyataan.",
    pernyataan: [
      "Beda barisan tersebut adalah 5.",
      "Suku pertamanya adalah 8.",
      "Suku ke-24 adalah 123.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "$4b=38-18=20$ sehingga $b=5$. Lalu $a=18-2(5)=8$ dan $U_{24}=8+23(5)=123$. Ketiga pernyataan benar.",
  },
  9: {
    soal: "Permintaan produk naik 5.000 unit setiap bulan, dimulai dari 100.000 unit. Perhatikan grafik berikut.\n[DIAGRAM]\nTentukan Benar atau Salah untuk setiap pernyataan.",
    pernyataan: [
      "Jumlah produk pada bulan pertama adalah 100.000 unit.",
      "Jumlah produk pada bulan ke-12 adalah 155.000 unit.",
      "Jumlah produk selama 12 bulan pertama adalah 1.530.000 unit.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "$U_{12}=100.000+11(5.000)=155.000$. Jumlah 12 bulan adalah $\\frac{12}{2}(100.000+155.000)=1.530.000$. Semua pernyataan benar.",
  },
  15: {
    soal: "Diketahui barisan $8,4,2,1,\\ldots$. Tentukan Benar atau Salah.",
    pernyataan: [
      "Rasio barisan adalah $\\frac12$.",
      "Rumus suku ke-n adalah $U_n=2^{4-n}$.",
      "Suku ke-5 adalah $\\frac12$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Setiap suku adalah setengah suku sebelumnya, sehingga $r=\\frac12$. Rumusnya $U_n=8(\\frac12)^{n-1}=2^{4-n}$ dan $U_5=\\frac12$. Semua pernyataan benar.",
  },
  21: {
    soal: "Setiap bakteri membelah menjadi dua setiap 15 menit. Pada pukul 10.00 terdapat 25 bakteri. Tentukan Benar atau Salah untuk pukul 12.15.",
    pernyataan: [
      "Lama waktu tersebut sama dengan 9 periode pembelahan.",
      "Banyak bakteri pada pukul 12.15 adalah 12.800.",
      "Banyak bakteri pada pukul 12.15 adalah 6.400.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Dari 10.00 sampai 12.15 ada 135 menit atau 9 periode. Banyak bakteri $=25\\cdot2^9=12.800$. Jadi (1) dan (2) benar, sedangkan (3) salah.",
  },
  24: {
    soal: "Diberikan pola bilangan berselang-seling $1,3,6,7,11,11,\\ldots$. Tentukan Benar atau Salah.",
    pernyataan: [
      "Suku-suku pada posisi ganjil membentuk $1,6,11,16,\\ldots$.",
      "Suku-suku pada posisi genap membentuk $3,7,11,15,\\ldots$.",
      "Tiga suku berikutnya adalah $16,15,21$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Pisahkan posisi ganjil dan genap. Posisi ganjil bertambah 5, sedangkan posisi genap bertambah 4. Maka tiga suku berikutnya adalah 16, 15, dan 21. Semua pernyataan benar.",
  },
};

const toPembahasanText = (soalNo: number) => {
  if (soalNo === 1) {
    return [
      "Konsep & Trik: Barisan dengan selisih tingkat kedua tetap 2 mengikuti rumus kuadrat. Untuk barisan ini, $U_n=n(n+1)$.",
      "Step-by-Step Penyelesaian:\nSelisih pertama: $4,6,8,10,\\ldots$. Selisih tingkat kedua: $2,2,2,\\ldots$.\nPola suku ke-$n$: $U_n=n(n+1)$.\n$U_8=8(8+1)=72$.",
      "Tips: Periksa selisih pertama, lalu selisih keduanya untuk mengenali pola bertingkat dua.",
      "Kesimpulan: Suku ke-8 adalah $72$ (C).",
    ].join("\n\n");
  }
  const pembahasan = polaBilanganDasarPembahasan[soalNo];
  if (!pembahasan) return undefined;
  return [
    `Konsep & Trik: ${pembahasan.konsepTrik}`,
    `Langkah Penyelesaian:\n${pembahasan.stepByStep}`,
    `Tips: ${pembahasan.tips}`,
    `Kesimpulan: ${pembahasan.kesimpulan}`,
  ].join("\n\n");
};

const materiSections: MateriSection[] = polaBilanganMateriSections;

const tambahanSoal = latihanDasarPolaBilanganTka.filter((soal) => soal.no <= 26 && ![6, 12, 18].includes(soal.no));

const latihanDasar: LatihanSoal[] = tambahanSoal
  .sort((a, b) => a.no - b.no)
  .map((soal, index) => {
    const sourceNo = soal.no;
    const displayNo = index + 1;
    const pgk = pgkVariants[sourceNo];
    const pgkbs = pgkbsVariants[sourceNo];
    const type = pgkbs ? "pgkbs" : pgk ? "pgk" : sourceNo % 3 === 1 ? "pg" : sourceNo % 3 === 2 ? "pgk" : "pgkbs";

    if (type === "pgk" && pgk) {
      return {
        ...soal,
        no: displayNo,
        type,
        soal: pgk.soal,
        options: undefined,
        pernyataan: pgk.pernyataan,
        jawabanPGK: pgk.jawabanPGK,
        jawaban: undefined,
        pembahasan: pgk.pembahasan,
        soalSvg: polaBilanganSoalSvgMap[String(sourceNo)] ? String(sourceNo) : undefined,
      };
    }

    if (type === "pgkbs" && pgkbs) {
      return {
        ...soal,
        no: displayNo,
        type,
        soal: pgkbs.soal,
        options: undefined,
        pernyataan: pgkbs.pernyataan,
        jawabanBS: pgkbs.jawabanBS,
        jawaban: undefined,
        pembahasan: pgkbs.pembahasan,
        soalSvg: polaBilanganSoalSvgMap[String(sourceNo)] ? String(sourceNo) : undefined,
      };
    }

    return {
      ...soal,
      no: displayNo,
      type: "pg" as const,
      jawaban: kunciJawaban[sourceNo - 1],
      pembahasan: toPembahasanText(sourceNo),
      soalSvg: polaBilanganSoalSvgMap[String(sourceNo)] ? String(sourceNo) : undefined,
    };
  });

const PolaBilanganPage = () => (
  <TKAPemantapanLayout
    title="POLA BILANGAN"
    materiSections={materiSections}
    contohSoal={getTkaContohSoal("pola-bilangan")}
    latihanDasar={latihanDasar}
    soalSvgMap={polaBilanganSoalSvgMap}
  />
);

export default PolaBilanganPage;