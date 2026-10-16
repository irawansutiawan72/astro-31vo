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

const SoalSatuKoordinatSvg = () => {
  const originX = 275;
  const originY = 218;
  const unit = 36;
  const ticks = Array.from({ length: 11 }, (_, index) => index - 5);
  const points = [
    { name: "A", x: 1, y: 3, dx: 9, dy: -10 },
    { name: "B", x: -3, y: 2, dx: -18, dy: -10 },
    { name: "C", x: 3, y: 1, dx: 9, dy: -8 },
    { name: "D", x: -2, y: -2, dx: 9, dy: 18 },
  ];
  const toX = (x: number) => originX + x * unit;
  const toY = (y: number) => originY - y * unit;

  return (
    <div className="mx-auto my-3 w-full max-w-xl rounded-xl bg-white p-2">
      <svg
        viewBox="0 0 560 440"
        className="block h-auto w-full"
        role="img"
        aria-label="Bidang koordinat Kartesius dengan titik A di (1, 3), B di (-3, 2), C di (3, 1), dan D di (-2, -2)"
      >
        <defs>
          <marker id="koordinat-soal-1-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#334155" />
          </marker>
        </defs>
        <rect x="0" y="0" width="560" height="440" rx="10" fill="#ffffff" />
        {ticks.map((tick) => (
          <g key={`grid-${tick}`}>
            <line x1={toX(tick)} y1={38} x2={toX(tick)} y2={398} stroke="#dbe3ed" strokeWidth="1" />
            <line x1={95} y1={toY(tick)} x2={455} y2={toY(tick)} stroke="#dbe3ed" strokeWidth="1" />
          </g>
        ))}
        <line x1="79" y1={originY} x2="478" y2={originY} stroke="#334155" strokeWidth="2" markerEnd="url(#koordinat-soal-1-arrow)" />
        <line x1={originX} y1="414" x2={originX} y2="12" stroke="#334155" strokeWidth="2" markerEnd="url(#koordinat-soal-1-arrow)" />
        {ticks.map((tick) => (
          <g key={`x-tick-${tick}`}>
            <line x1={toX(tick)} y1={originY - 4} x2={toX(tick)} y2={originY + 4} stroke="#334155" strokeWidth="1.5" />
            <text x={toX(tick)} y={originY + 22} textAnchor="middle" fontSize="11" fill="#334155">{tick}</text>
          </g>
        ))}
        {ticks.map((tick) => (
          <g key={`y-tick-${tick}`}>
            <line x1={originX - 4} y1={toY(tick)} x2={originX + 4} y2={toY(tick)} stroke="#334155" strokeWidth="1.5" />
            {tick !== 0 && <text x={originX - 11} y={toY(tick) + 4} textAnchor="end" fontSize="11" fill="#334155">{tick}</text>}
          </g>
        ))}
        <text x="490" y={originY + 5} fontSize="14" fontWeight="700" fill="#0f172a">x</text>
        <text x={originX + 7} y="18" fontSize="14" fontWeight="700" fill="#0f172a">y</text>
        {points.map((point) => (
          <g key={point.name}>
            <circle cx={toX(point.x)} cy={toY(point.y)} r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
            <text
              x={toX(point.x) + point.dx}
              y={toY(point.y) + point.dy}
              fontSize="14"
              fontWeight="700"
              fill="#0f172a"
              paintOrder="stroke"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinejoin="round"
            >
              {point.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const SoalEmpatKoordinatSvg = () => (
  <div className="mx-auto my-3 w-full max-w-xl rounded-xl bg-white p-2">
    <svg
      viewBox="0 0 560 420"
      className="block h-auto w-full"
      role="img"
      aria-label="Persegi EFGH pada bidang koordinat. Titik E berada di titik asal dan sisi persegi sejajar dengan sumbu koordinat."
    >
      <defs>
        <marker id="koordinat-soal-4-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="#334155" />
        </marker>
      </defs>
      <rect x="0" y="0" width="560" height="420" rx="10" fill="#ffffff" />
      <rect x="150" y="140" width="180" height="180" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
      <line x1="92" y1="320" x2="454" y2="320" stroke="#334155" strokeWidth="2" markerEnd="url(#koordinat-soal-4-arrow)" />
      <line x1="150" y1="378" x2="150" y2="42" stroke="#334155" strokeWidth="2" markerEnd="url(#koordinat-soal-4-arrow)" />
      <line x1="326" y1="320" x2="334" y2="320" stroke="#334155" strokeWidth="2" />
      <line x1="150" y1="136" x2="150" y2="144" stroke="#334155" strokeWidth="2" />
      <text x="140" y="344" textAnchor="end" fontSize="13" fill="#334155">0</text>
      <text x="330" y="344" textAnchor="middle" fontSize="13" fill="#334155">a</text>
      <text x="135" y="145" textAnchor="end" fontSize="13" fill="#334155">a</text>
      <text x="466" y="325" fontSize="14" fontWeight="700" fill="#0f172a">x</text>
      <text x="157" y="44" fontSize="14" fontWeight="700" fill="#0f172a">y</text>
      <g fill="#2563eb" stroke="#ffffff" strokeWidth="2">
        <circle cx="150" cy="320" r="5" />
        <circle cx="330" cy="320" r="5" />
        <circle cx="330" cy="140" r="5" />
        <circle cx="150" cy="140" r="5" />
      </g>
      <g fontSize="14" fontWeight="700" fill="#0f172a" paintOrder="stroke" stroke="#ffffff" strokeWidth="3" strokeLinejoin="round">
        <text x="132" y="306">E</text>
        <text x="338" y="307">F</text>
        <text x="338" y="136">G</text>
        <text x="160" y="136">H</text>
      </g>
    </svg>
  </div>
);

const latihanDasarTkaLama: LatihanSoal[] = [
  { no: 1, soal: "Perhatikan titik-titik pada koordinat Kartesius berikut.\nTitik yang berkoordinat $(1, 3)$ adalah ....", gambar: <SoalSatuKoordinatSvg />, options: ["A. titik A", "B. titik B", "C. titik C", "D. titik D"] },
  { no: 2, soal: "Perhatikan gambar berikut. Koordinat titik Q adalah....", options: ["A. $(3, 1)$", "B. $(3, -1)$", "C. $(1, 3)$", "D. $(-1, 3)$"] },
  { no: 3, soal: "Perhatikan gambar di samping!\nKoordinat-koordinat di bawah ini yang sesuai dengan gambar adalah....", options: ["A. $A(-2, -4)$", "B. $B(5, 4)$", "C. $C(-2, 6)$", "D. $D(1, -4)$"] },
  { no: 4, soal: "Pada persegi EFGH di bawah ini, tentukan koordinat titik E dan G.\n[DIAGRAM]", gambar: <SoalEmpatKoordinatSvg />, options: ["A. $E(0, 0)$ dan $G(a, 0)$", "B. $E(0, -1)$ dan $G(a, a)$", "C. $E(0, 0)$ dan $G(a, a)$", "D. $E(0, -1)$ dan $G(a, 0)$"] },
  { no: 5, soal: "Titik $P(-5, 7)$ terletak di kuadran...", options: ["A. II", "B. IV", "C. I", "D. III"] },
  { no: 6, soal: "Perhatikan gambar di samping!\nKoordinat titik C dan D berturut-turut $C(4, -3)$ dan $D(4, 1)$, bangun ABCD disebut...", options: ["A. jajargenjang", "B. layang-layang", "C. persegi", "D. persegi panjang"] },
  { no: 7, soal: "Bangun yang terbentuk dari titik $M(0,3)$, $N(0,-3)$ dan $O(7,0)$ adalah bangun ....", options: ["A. Segitiga sama sisi", "B. Segitiga sembarang", "C. Segitiga sama kaki", "D. Segitiga siku-siku"] },
  { no: 8, soal: "Diketahui titik $A(3,1)$, $B(3, 5)$, $C(-2, 5)$. Jika ketiga titik tersebut dihubungkan akan membentuk", options: ["A. segitiga sama sisi", "B. segitiga sama kaki", "C. segitiga siku-siku", "D. segitiga sembarang"] },
  { no: 10, soal: "Diketahui segiempat ABCD dengan koordinat titik $A(-2, 5)$, $B(-2, 1)$, $C(4, 1)$, dan $D(4,5)$. Segiempat ABCD berbentuk....", options: ["A. persegi", "B. persegi panjang", "C. jajargenjang", "D. trapesium"] },
  { no: 11, soal: "Diketahui koordinat titik $A(-3, 5)$; $B(-5, 1)$; $C(-3, -3)$; dan $D(-1, 1)$. Jika keempat titik tersebut dihubungkan, ABCD membentuk bangun...", options: ["A. trapesium", "B. layang-layang", "C. jajargenjang", "D. belahketupat"] },
  { no: 13, soal: "Jarak titik $(-3, 5)$ terhadap sumbu-x adalah ...", options: ["A. 3 satuan", "B. 4 satuan", "C. 5 satuan", "D. 8 satuan"] },
  { no: 14, soal: "Jarak titik $(-4, -5)$ terhadap sumbu-y adalah ...", options: ["A. 4 satuan", "B. 5 satuan", "C. 8 satuan", "D. 9 satuan"] },
  { no: 15, soal: "Jarak antara titik $P(3, 5)$ dan garis $x = -2$ adalah...", options: ["A. 7", "B. 3", "C. 1", "D. 5"] },
  { no: 16, soal: "Jarak antara titik $A(2, 3)$ dan $B(10, -3)$ adalah...", options: ["A. 12", "B. 14", "C. 10", "D. 8"] },
  { no: 17, soal: "Koordinat titik R berada di tengah-tengah garis PQ. Jika titik $P(-2, 5)$ dan $Q(4, -11)$, koordinat titik R adalah ...", options: ["A. $(2, -6)$", "B. $(1, -6)$", "C. $(1, -3)$", "D. $(3, 1)$"] },
  { no: 18, soal: "Titik tengah dari segmen garis yang menghubungkan titik $A(2, 8)$ dan $B(10, 4)$ adalah...", options: ["A. $(4, 2)$", "B. $(6, 6)$", "C. $(12, 12)$", "D. $(8, 4)$"] },
  { no: 19, soal: "Titik $M(5, -2)$ adalah titik tengah dari segmen garis PQ. Jika koordinat titik P adalah $(8, 3)$, maka koordinat titik Q adalah...", options: ["A. $(3, -5)$", "B. $(2, -7)$", "C. $(6.5, 0.5)$", "D. $(11, -1)$"] },
  { no: 22, soal: "Luas segitiga yang titik-titik sudutnya adalah $P(0, 0)$, $Q(6, 4)$, dan $R(8, 2)$ adalah...", options: ["A. 12", "B. 10", "C. 14", "D. 20"] },
];

type ComplexVariant = {
  soal: string;
  pernyataan: string[];
  pembahasan: string;
};

const kunciJawaban: Record<number, string> = {
  1: "A",
  2: "B",
  3: "B",
  4: "C",
  5: "A",
  6: "D",
  7: "C",
  8: "C",
  10: "B",
  11: "D",
  13: "C",
  14: "A",
  15: "D",
  16: "C",
  17: "C",
  18: "B",
  19: "B",
  22: "B",
};

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
    pembahasan: "Titik tengahnya adalah $R=\\left(\\frac{-2+4}{2},\\frac{5+(-11)}{2}\\right)=(1,-3)$. Jadi (1), (2), dan (3) benar.",
  },
};

const pgkbsVariants: Record<number, ComplexVariant & { jawabanBS: ("B" | "S")[] }> = {
  3: {
    soal: "Diberikan titik $A(-2,-4)$, $B(5,4)$, $C(-2,6)$, dan $D(1,-4)$. Tentukan Benar atau Salah.",
    pernyataan: [
      "Titik C berada pada kuadran IV.",
      "Titik B berada di kuadran I.",
      "Titik A berada di kuadran III.",
    ],
    jawabanBS: ["S", "B", "B"],
    pembahasan: "Titik $C(-2,6)$ memiliki absis negatif dan ordinat positif, sehingga berada di kuadran II, bukan kuadran IV. Titik $B(5,4)$ berada di kuadran I, sedangkan $A(-2,-4)$ berada di kuadran III. Jadi pernyataan (1) salah, sementara (2) dan (3) benar.",
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
};

const latihanDasar: LatihanSoal[] = latihanDasarTkaLama
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
      jawaban: kunciJawaban[soal.no],
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
