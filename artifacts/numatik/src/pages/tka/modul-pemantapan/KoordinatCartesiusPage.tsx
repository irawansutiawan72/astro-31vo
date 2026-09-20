import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";
import { getTkaContohSoal } from "@/data/tkaContohSoal";
import { koordinatKartesiusDasarPembahasan } from "@/data/pembahasan/koordinatKartesiusDasar";

const materiSections: MateriSection[] = [
  { heading: "A. Sistem Koordinat Kartesius", content: `Sistem koordinat kartesius memposisikan titik dengan acuan sumbu-x (mendatar) dan sumbu-y (tegak) yang saling tegak lurus.\n\n- Sumbu X: ke kanan positif, ke kiri negatif\n- Sumbu Y: ke atas positif, ke bawah negatif\n- Titik potong = titik asal O(0, 0)\n- Koordinat titik ditulis (x, y)\n  - x = absis (jarak dari sumbu-Y)\n  - y = ordinat (jarak dari sumbu-X)` },
  { heading: "B. Kuadran", content: `Sumbu-X dan sumbu-Y membagi bidang menjadi 4 kuadran:\n- Kuadran I: x > 0, y > 0\n- Kuadran II: x < 0, y > 0\n- Kuadran III: x < 0, y < 0\n- Kuadran IV: x > 0, y < 0` },
  { heading: "C. Jarak Antara 2 Titik", content: `Jarak titik $P(x_1, y_1)$ ke $Q(x_2, y_2)$:\n\n$|PQ| = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$` },
  { heading: "D. Titik Tengah Segmen", content: `Titik tengah antara $A(x_1, y_1)$ dan $B(x_2, y_2)$:\n\n$M = \\left(\\dfrac{x_1 + x_2}{2},\\ \\dfrac{y_1 + y_2}{2}\\right)$` },
  { heading: "E. Jarak Titik ke Garis", content: `Jarak titik $A(x_1, y_1)$ ke garis $ax + by + c = 0$:\n\n$d = \\dfrac{|ax_1 + by_1 + c|}{\\sqrt{a^2 + b^2}}$` },
  { heading: "F. Posisi Relatif", content: `Posisi relatif titik $T(x_2, y_2)$ terhadap titik acuan $D(x_1, y_1)$:\n\n$T_D = (x_2 - x_1,\\ y_2 - y_1)$` },
];

const latihanDasarTkaLama: LatihanSoal[] = [
  { no: 1, soal: "Perhatikan titik-titik pada koordinat kartesius berikut.\nTitik yang berkoordinat (1, 3) adalah.....", options: ["A. titik A", "B. titik B", "C. titik C", "D. titik D"] },
  { no: 2, soal: "Perhatikan gambar berikut. Koordinat titik Q adalah....", options: ["A. $(3, 1)$", "B. $(3, -1)$", "C. $(1, 3)$", "D. $(-1, 3)$"] },
  { no: 3, soal: "Perhatikan gambar di samping!\nKoordinat-koordinat di bawah ini yang sesuai dengan gambar adalah....", options: ["A. $A(-2, -4)$", "B. $B(5, 4)$", "C. $C(-2, 6)$", "D. $D(1, -4)$"] },
  { no: 4, soal: "Pada persegi EFGH dibawah ini, tentukan koordinat titik E dan G?", options: ["A. $E(0,0)$ dan $G(a,0)$", "B. $E(0,-1)$ dan $G(a,a)$", "C. $E(0,0)$ dan $G(a,a)$", "D. $E(0,-1)$ dan $G(a,0)$"] },
  { no: 5, soal: "Titik $P(-5, 7)$ terletak di kuadran...", options: ["A. II", "B. IV", "C. I", "D. III"] },
  { no: 6, soal: "Perhatikan gambar di samping!\nKoordinat titik C dan D berturut-turut $C(4, -3)$ dan $D(4, 1)$, bangun ABCD disebut...", options: ["A. jajargenjang", "B. layang-layang", "C. persegi", "D. persegi panjang"] },
  { no: 7, soal: "Bangun yang terbentuk dari titik $M(0,3)$, $N(0,-3)$ dan $O(7,0)$ adalah bangun ....", options: ["A. Segitiga sama sisi", "B. Segitiga sembarang", "C. Segitiga sama kaki", "D. Segitiga siku-siku"] },
  { no: 8, soal: "Diketahui titik $A(3,1)$, $B(3, 5)$, $C(-2, 5)$. Jika ketiga titik tersebut dihubungkan akan membentuk", options: ["A. segitiga sama sisi", "B. segitiga sama kaki", "C. segitiga siku-siku", "D. segitiga sembarang"] },
  { no: 9, soal: "Diketahui dalam koordinat Kartesius terdapat titik P, Q, dan R. Titik $P(4, 6)$ dan titik $Q(7, 1)$. Jika titik P, Q, dan R dihubungkan akan membentuk segitiga siku-siku, maka koordinat titik R adalah ....", options: ["A. $(6, 5)$", "B. $(4, 5)$", "C. $(6, 1)$", "D. $(4, 1)$"] },
  { no: 10, soal: "Diketahui segiempat ABCD dengan koordinat titik $A(-2, 5)$, $B(-2, 1)$, $C(4, 1)$, dan $D(4,5)$. Segiempat ABCD berbentuk....", options: ["A. persegi", "B. persegi panjang", "C. jajargenjang", "D. trapesium"] },
  { no: 11, soal: "Diketahui koordinat titik $A(-3, 5)$; $B(-5, 1)$; $C(-3, -3)$; dan $D(-1, 1)$. Jika keempat titik tersebut dihubungkan, ABCD membentuk bangun...", options: ["A. trapesium", "B. layang-layang", "C. jajargenjang", "D. belahketupat"] },
  { no: 12, soal: "Diketahui koordinat titik $A(-3, 5)$; $B(-5, 1)$; $C(-3, -3)$; dan $D(-1,1)$. Jika keempat titik tersebut dihubungkan, ABCD membentuk bangun ...", options: ["A. Trapesium", "B. Layang-Layang", "C. Jajargenjang", "D. Belahketupat"] },
  { no: 13, soal: "Jarak titik $(-3, 5)$ terhadap sumbu-x adalah ...", options: ["A. 3 satuan", "B. 4 satuan", "C. 5 satuan", "D. 8 satuan"] },
  { no: 14, soal: "Jarak titik $(-4, -5)$ terhadap sumbu-y adalah ...", options: ["A. 4 satuan", "B. 5 satuan", "C. 8 satuan", "D. 9 satuan"] },
  { no: 15, soal: "Jarak antara titik $P(3, 5)$ dan garis $x = -2$ adalah...", options: ["A. 7", "B. 3", "C. 1", "D. 5"] },
  { no: 16, soal: "Jarak antara titik $A(2, 3)$ dan $B(10, -3)$ adalah...", options: ["A. 12", "B. 14", "C. 10", "D. 8"] },
  { no: 17, soal: "Koordinat titik R berada di tengah-tengah garis PQ. Jika titik $P(-2, 5)$ dan $Q(4, -11)$, koordinat titik R adalah ...", options: ["A. $(2, -6)$", "B. $(1, -6)$", "C. $(1, -3)$", "D. $(3, 1)$"] },
  { no: 18, soal: "Titik tengah dari segmen garis yang menghubungkan titik $A(2, 8)$ dan $B(10, 4)$ adalah...", options: ["A. $(4, 2)$", "B. $(6, 6)$", "C. $(12, 12)$", "D. $(8, 4)$"] },
  { no: 19, soal: "Titik $M(5, -2)$ adalah titik tengah dari segmen garis PQ. Jika koordinat titik P adalah $(8, 3)$, maka koordinat titik Q adalah...", options: ["A. $(3, -5)$", "B. $(2, -7)$", "C. $(6.5, 0.5)$", "D. $(11, -1)$"] },
  { no: 20, soal: "Titik $M(4, -1)$ adalah titik tengah dari ruas garis AB. Jika koordinat titik A adalah $(1, 5)$, maka koordinat titik B adalah...", options: ["A. $(2.5, 2)$", "B. $(5, 4)$", "C. $(7, -7)$", "D. $(3, -6)$"] },
  { no: 21, soal: "Titik M adalah titik tengah dari $A(1, 1)$ dan $B(3, 5)$. Jarak dari titik M ke garis $x = 7$ adalah...", options: ["A. 3", "B. 4", "C. 5", "D. 2"] },
  { no: 22, soal: "Luas segitiga yang titik-titik sudutnya adalah $P(0, 0)$, $Q(6, 4)$, dan $R(8, 2)$ adalah...", options: ["A. 12", "B. 10", "C. 14", "D. 20"] },
  { no: 23, soal: "Titik $P(x, 5)$ berjarak 10 satuan dari titik $Q(-4, -1)$. Salah satu nilai x yang mungkin adalah...", options: ["A. 2", "B. 12", "C. 6", "D. 4"] },
  { no: 24, soal: "Jarak tegak lurus dari titik $P(2, 5)$ ke garis $3x + 4y - 6 = 0$ adalah ...", options: ["A. 5", "B. 4", "C. 20", "D. 26"] },
  { no: 25, soal: "Jarak titik $(3, -5)$ terhadap titik acuan $(0, 1)$ adalah ...", options: ["A. Tiga langkah ke kanan dan enam langkah ke atas", "B. Tiga langkah ke kanan dan enam langkah ke bawah", "C. Tiga langkah ke kiri dan enam langkah ke atas", "D. Enam langkah ke kanan dan tiga langkah ke atas"] },
];

type ComplexVariant = {
  soal: string;
  pernyataan: string[];
  pembahasan: string;
};

const kunciJawaban = [
  "A", "B", "B", "C", "A", "D", "C", "C", "D", "B", "D", "D", "C",
  "A", "D", "C", "C", "B", "B", "C", "C", "B", "D", "B", "B",
] as const;

const pgkVariants: Record<number, ComplexVariant & { jawabanPGK: number[] }> = {
  2: {
    soal: "Titik $Q(3,-1)$ berada pada bidang koordinat Kartesius. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Absis titik Q adalah 3.",
      "Ordinat titik Q adalah -1.",
      "Titik Q berada di kuadran IV.",
      "Titik Q berada di kuadran II.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Pada titik $Q(3,-1)$, absisnya adalah 3 dan ordinatnya -1. Karena x positif dan y negatif, Q berada di kuadran IV. Jadi (1), (2), dan (3) benar.",
  },
  5: {
    soal: "Titik $P(-5,7)$ berada pada bidang koordinat Kartesius. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Absis titik P bernilai negatif.",
      "Ordinat titik P bernilai positif.",
      "Titik P berada di kuadran II.",
      "Titik P berada di kuadran IV.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Titik $P(-5,7)$ memiliki x negatif dan y positif, sehingga berada di kuadran II. Jadi (1), (2), dan (3) benar.",
  },
  8: {
    soal: "Diketahui $A(3,1)$, $B(3,5)$, dan $C(-2,5)$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Panjang AB adalah 4 satuan.",
      "Panjang BC adalah 5 satuan.",
      "AB tegak lurus BC.",
      "Segitiga ABC adalah segitiga sama sisi.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "AB vertikal dengan panjang $|5-1|=4$, sedangkan BC horizontal dengan panjang $|3-(-2)|=5$. Keduanya tegak lurus di B, sehingga (1), (2), dan (3) benar.",
  },
  11: {
    soal: "Diketahui $A(-3,5)$, $B(-5,1)$, $C(-3,-3)$, dan $D(-1,1)$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Panjang AB adalah $\\sqrt{20}$.",
      "Keempat sisi ABCD sama panjang.",
      "Diagonal AC berupa garis vertikal.",
      "Panjang diagonal AC adalah 4 satuan.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Setiap sisi memiliki panjang $\\sqrt{(2)^2+(4)^2}=\\sqrt{20}$. Diagonal AC menghubungkan $(-3,5)$ dan $(-3,-3)$ sehingga vertikal dan panjangnya 8, bukan 4. Jadi (1), (2), dan (3) benar.",
  },
  14: {
    soal: "Titik $P(-4,-5)$ berada pada bidang koordinat Kartesius. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Jarak titik P ke sumbu-Y adalah 4 satuan.",
      "Jarak ke sumbu-Y dihitung dengan $|x|$.",
      "Jarak titik P ke sumbu-Y adalah 5 satuan.",
      "Titik P berada 4 satuan di sebelah kiri sumbu-Y.",
    ],
    jawabanPGK: [0, 1, 3],
    pembahasan: "Jarak ke sumbu-Y adalah $|x|=|-4|=4$. Tanda x negatif berarti titik berada di sebelah kiri sumbu-Y. Jadi (1), (2), dan (4) benar.",
  },
  17: {
    soal: "Titik R adalah titik tengah dari $P(-2,5)$ dan $Q(4,-11)$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Absis titik R adalah 1.",
      "Ordinat titik R adalah -3.",
      "Koordinat R adalah $(1,-3)$.",
      "Koordinat R adalah $(2,-6)$.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Titik tengahnya adalah $R=(({-2+4})/2,({5-11})/2)=(1,-3)$. Jadi (1), (2), dan (3) benar.",
  },
  20: {
    soal: "Titik $M(4,-1)$ adalah titik tengah ruas $AB$ dan $A(1,5)$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Absis titik B adalah 7.",
      "Ordinat titik B adalah -7.",
      "Koordinat B adalah $(7,-7)$.",
      "Koordinat B adalah $(5,4)$.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Gunakan $B=2M-A$: $B=(2(4)-1,2(-1)-5)=(7,-7)$. Jadi (1), (2), dan (3) benar.",
  },
  23: {
    soal: "Titik $P(x,5)$ berjarak 10 satuan dari $Q(-4,-1)$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Persamaannya adalah $(x+4)^2+36=100$.",
      "Salah satu nilai x yang mungkin adalah 4.",
      "Salah satu nilai x yang mungkin adalah -12.",
      "Satu-satunya nilai x yang mungkin adalah 4.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Rumus jarak memberi $(x+4)^2+(5+1)^2=100$, sehingga $(x+4)^2=64$ dan $x=4$ atau $x=-12$. Jadi (1), (2), dan (3) benar.",
  },
};

const pgkbsVariants: Record<number, ComplexVariant & { jawabanBS: ("B" | "S")[] }> = {
  3: {
    soal: "Diberikan titik $A(-2,-4)$, $B(5,4)$, $C(-2,6)$, dan $D(1,-4)$. Tentukan Benar atau Salah.",
    pernyataan: [
      "Titik B memiliki koordinat $(5,4)$.",
      "Titik B berada di kuadran I.",
      "Titik A berada di kuadran III.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Koordinat B memang $(5,4)$ dan keduanya positif, sehingga berada di kuadran I. Koordinat A memiliki x dan y negatif, sehingga berada di kuadran III. Semua pernyataan benar.",
  },
  6: {
    soal: "Diberikan persegi panjang ABCD dengan $A(0,-3)$, $B(0,1)$, $C(6,1)$, dan $D(6,-3)$. Tentukan Benar atau Salah.",
    pernyataan: [
      "Panjang CD adalah 4 satuan.",
      "Panjang AD adalah 6 satuan.",
      "Bangun ABCD adalah persegi.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "CD vertikal dengan panjang 4 dan AD horizontal dengan panjang 6. Karena panjang sisi berdekatan berbeda, ABCD adalah persegi panjang, bukan persegi.",
  },
  9: {
    soal: "Titik $P(4,6)$ dan $Q(7,1)$ dihubungkan dengan titik $R(4,1)$ untuk membentuk segitiga siku-siku. Tentukan Benar atau Salah.",
    pernyataan: [
      "P dan R memiliki absis yang sama.",
      "Q dan R memiliki ordinat yang sama.",
      "Koordinat titik R adalah $(4,1)$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "P dan R sama-sama memiliki x=4, sedangkan Q dan R sama-sama memiliki y=1. Jadi R=(4,1) dan semua pernyataan benar.",
  },
  12: {
    soal: "Diketahui $A(-3,5)$, $B(-5,1)$, $C(-3,-3)$, dan $D(-1,1)$. Tentukan Benar atau Salah.",
    pernyataan: [
      "Keempat sisi ABCD memiliki panjang $\\sqrt{20}$.",
      "Diagonal AC merupakan garis vertikal.",
      "Diagonal BD merupakan garis horizontal.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Semua sisi memiliki panjang $\\sqrt{20}$. A dan C memiliki x yang sama sehingga AC vertikal, sedangkan B dan D memiliki y yang sama sehingga BD horizontal. Semua pernyataan benar.",
  },
  15: {
    soal: "Tentukan jarak titik $P(3,5)$ ke garis $x=-2$. Tentukan Benar atau Salah.",
    pernyataan: [
      "Jaraknya adalah 5 satuan.",
      "Jarak dapat dihitung dengan $|3-(-2)|$.",
      "Jaraknya adalah 7 satuan.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Jarak ke garis vertikal $x=k$ adalah $|x-k|=|3-(-2)|=5$. Jadi (1) dan (2) benar, sedangkan (3) salah.",
  },
  18: {
    soal: "Titik tengah segmen yang menghubungkan $A(2,8)$ dan $B(10,4)$ adalah M. Tentukan Benar atau Salah.",
    pernyataan: [
      "Absis titik M adalah 6.",
      "Ordinat titik M adalah 6.",
      "Koordinat M adalah $(4,2)$.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Titik tengahnya adalah $M=((2+10)/2,(8+4)/2)=(6,6)$. Jadi (1) dan (2) benar, sedangkan (3) salah.",
  },
  21: {
    soal: "Titik M adalah titik tengah $A(1,1)$ dan $B(3,5)$. Tentukan Benar atau Salah.",
    pernyataan: [
      "Koordinat M adalah $(2,3)$.",
      "Jarak M ke garis $x=7$ adalah 5 satuan.",
      "Jarak M ke garis $x=7$ adalah 4 satuan.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Titik tengahnya $M=((1+3)/2,(1+5)/2)=(2,3)$. Jarak ke $x=7$ adalah $|2-7|=5$. Jadi (1) dan (2) benar, sedangkan (3) salah.",
  },
  24: {
    soal: "Titik $P(2,5)$ dan garis $3x+4y-6=0$ diberikan. Tentukan Benar atau Salah.",
    pernyataan: [
      "Pembilang rumus jarak bernilai 20.",
      "Penyebut rumus jarak bernilai 5.",
      "Jarak titik P ke garis adalah 5 satuan.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Jaraknya $\\frac{|3(2)+4(5)-6|}{\\sqrt{3^2+4^2}}=\\frac{20}{5}=4$. Jadi (1) dan (2) benar, sedangkan (3) salah.",
  },
};

const latihanDasar: LatihanSoal[] = latihanDasarTkaLama
  .filter((soal) => soal.no <= 25)
  .sort((a, b) => a.no - b.no)
  .map((soal) => {
    const type = soal.no % 3 === 1 ? "pg" : soal.no % 3 === 2 ? "pgk" : "pgkbs";
    const pgk = pgkVariants[soal.no];
    const pgkbs = pgkbsVariants[soal.no];

    if (type === "pgk" && pgk) {
      return {
        ...soal,
        type,
        soal: pgk.soal,
        options: undefined,
        pernyataan: pgk.pernyataan,
        jawabanPGK: pgk.jawabanPGK,
        jawaban: undefined,
        pembahasan: pgk.pembahasan,
      };
    }

    if (type === "pgkbs" && pgkbs) {
      return {
        ...soal,
        type,
        soal: pgkbs.soal,
        options: undefined,
        pernyataan: pgkbs.pernyataan,
        jawabanBS: pgkbs.jawabanBS,
        jawaban: undefined,
        pembahasan: pgkbs.pembahasan,
      };
    }

    const pembahasan = koordinatKartesiusDasarPembahasan[soal.no];
    return {
      ...soal,
      type: "pg" as const,
      jawaban: kunciJawaban[soal.no - 1],
      pembahasan: pembahasan ? JSON.stringify(pembahasan) : "",
    };
  });

const KoordinatCartesiusPage = () => (
  <TKAPemantapanLayout
    title="KOORDINAT KARTESIUS"
    materiSections={materiSections}
    contohSoal={getTkaContohSoal("koordinat-kartesius")}
    latihanDasar={latihanDasar}
  />
);

export default KoordinatCartesiusPage;
