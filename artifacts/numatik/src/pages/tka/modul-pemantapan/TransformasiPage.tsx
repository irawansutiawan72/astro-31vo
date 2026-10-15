import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { LatihanSoal } from "@/components/tka/TKAPemantapanLayout";
import { getTkaContohSoal } from "@/data/tkaContohSoal";
import { tkaTransformasiMateri } from "@/data/tkaTransformasiMateri";

const materiImagesByHeading: Record<string, string> = {
  "A. Definisi Transformasi": "/translasi-claw-machine.png",
  "B. Translasi (Pergeseran)": "/cermin-refleksi.png",
  "C. Refleksi (Pencerminan)": "/pontiac-rotasi.png",
};

const materiSections = tkaTransformasiMateri.map((section) => {
  const image = materiImagesByHeading[section.heading];
  return {
    ...section,
    content: image ? `${section.content}\n\n[IMAGE:${image}]` : section.content,
  };
});

const latihanDasarSource: LatihanSoal[] = [
  { no: 1, soal: "Titik A(5, -2) ditranslasi oleh $T\\binom{-3}{1}$. Tentukan koordinat bayangan titik A tersebut!", options: ["A. A'(2, 1)", "B. A'(1, 1)", "C. A'(2, 2)", "D. A'(2, -1)"], pembahasan: `Pembahasan Soal 1:
Translasi $T\\binom{-3}{1}$ memetakan setiap titik $(x,y)$ menjadi $(x-3,y+1)$.

Untuk titik $A(5,-2)$:
$$A'=(5-3,-2+1)=(2,-1)$$

Jadi, koordinat bayangan titik A adalah $A'(2,-1)$.
Jawaban: D.` },
  { no: 2, soal: "Tentukan bayangan titik A(3, -4) jika digeser oleh $T\\binom{-3}{9}$ ...", options: ["A. A'(0, 13)", "B. A'(0, 5)", "C. A'(6, 13)", "D. A'(6, 5)"] },
  { no: 5, soal: "Tentukanlah bayangan titik D(9, 0) jika digeser oleh $T_1\\binom{7}{18}$ dan dilanjutkan oleh $T_2\\binom{6}{-15}$ ...", options: ["A. D''(9, 13)", "B. D''(22, 9)", "C. D''(22, 13)", "D. D''(22, 3)"] },
  { no: 7, soal: "Jika titik B(3, -7) digeser oleh T(a, b) sehingga bayangannya adalah titik B'(20, -3), tentukan T ...", options: ["A. T(17, 4)", "B. T(17, 10)", "C. T(3, 4)", "D. T(2, 10)"] },
  { no: 10, soal: "Tentukan bayangan titik A(3, -4) jika dicerminkan oleh garis x = 3 ...", options: ["A. A'(3, 10)", "B. A'(4, -3)", "C. A'(3, -4)", "D. A'(3, 4)"] },
  { no: 12, soal: "Tentukanlah bayangan titik C(2, 8) jika dicerminkan oleh sumbu x ...", options: ["A. C''(2, 8)", "B. C''(2, -8)", "C. C''(-2, 8)", "D. C''(-2, -8)"] },
  { no: 13, soal: "Tentukanlah bayangan titik D(9, 0) jika dicerminkan oleh sumbu y ...", options: ["A. D''(9, 0)", "B. D''(-9, 0)", "C. D''(0, 9)", "D. D''(0, -9)"] },
  { no: 14, soal: "Jika titik A(27, -12) dicerminkan menjadi A'(27, 12), sumbu refleksinya adalah ...", options: ["A. Sumbu x", "B. Titik (0, 0)", "C. Sumbu y", "D. x = 2"] },
  { no: 15, soal: "Jika titik B(3, -7) dicerminkan menjadi A'(-7, 3), sumbu refleksinya adalah ...", options: ["A. Sumbu y = x", "B. Sumbu x", "C. Sumbu y = -x", "D. Sumbu y"] },
  { no: 16, soal: "Jika titik A(2, 8) dicerminkan menjadi A'(2, 12), sumbu refleksinya adalah ...", options: ["A. x = 10", "B. y = 2", "C. x = 2", "D. y = 10"] },
  { no: 17, soal: "Jika titik B(2, -2) dicerminkan menjadi A'(6, -2), sumbu refleksinya adalah ...", options: ["A. x = 4", "B. y = 4", "C. x = 5", "D. y = 5"] },
  { no: 19, soal: "Titik $(5,-3)$ dirotasi $90^\\circ$ berlawanan arah jarum jam dengan pusat rotasi $O(0,0)$. Koordinat bayangannya adalah ...", options: ["A. $(3,5)$", "B. $(-3,-5)$", "C. $(-3,5)$", "D. $(3,-5)$"], pembahasan: `Pembahasan Soal 12:
Rotasi $90^\\circ$ berlawanan arah jarum jam dengan pusat $O(0,0)$ menggunakan aturan $(x,y)\\mapsto(-y,x)$.

Substitusikan titik $(5,-3)$:
$$ (5,-3)\\mapsto(-(-3),5)=(3,5) $$

Jadi, bayangannya adalah $(3,5)$.
Jawaban: A.` },
  { no: 20, soal: "Titik $A(-3,1)$ diputar dengan pusat $O(0,0)$ sejauh $90^\\circ$ dan $180^\\circ$ berlawanan arah jarum jam. Tentukan bayangan-bayangan yang dihasilkan.", options: ["A. $(1,3)$ dan $(-3,-1)$", "B. $(-1,-3)$ dan $(3,-1)$", "C. $(1,-2)$ dan $(-1,-2)$", "D. $(-2,1)$ dan $(2,-1)$"] },
  { no: 22, soal: "Titik M'(8, -6) merupakan hasil dilatasi dari titik M(-24, 18). Maka faktor skala dilatasi tersebut jika pusatnya (0, 0) adalah ...", options: ["A. $-\\frac{1}{3}$", "B. 3", "C. -3", "D. -2"] },
  { no: 23, soal: "Segitiga PQR memiliki koordinat P(1, 1); Q(1, 5) dan R(3, 3). Didilatasi dengan [O, c] menghasilkan bayangan P'(-2, -2); Q'(-2, -10) dan R'(-6, -6). Nilai c adalah ...", options: ["A. 2", "B. 3", "C. -3", "D. -2"] },
];

type ComplexVariant = {
  soal: string;
  pernyataan: string[];
  pembahasan: string;
};

const kunciJawaban = [
  "D", "B", "C", "D", "D", "C", "A", "B", "D", "C", "A", "B", "B", "A",
  "A", "D", "A", "D", "A", "B", "B", "A", "D",
] as const;

const pgkVariants: Record<number, ComplexVariant & { jawabanPGK: number[] }> = {
  2: {
    soal: "Titik $A(3,-4)$ ditranslasi oleh $T\\binom{-3}{9}$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Koordinat x bertambah -3.",
      "Koordinat y bertambah 9.",
      "Bayangan titik A adalah $A'(0,5)$.",
      "Bayangan titik A adalah $A'(6,5)$.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Translasi $T(-3,9)$ memberi $(x',y')=(x-3,y+9)$. Jadi $A'=(3-3,-4+9)=(0,5)$. Pernyataan (1), (2), dan (3) benar.",
  },
  5: {
    soal: "Titik $D(9,0)$ digeser oleh $T_1\\binom{7}{18}$ kemudian $T_2\\binom{6}{-15}$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Setelah translasi pertama, titik D menjadi $(16,18)$.",
      "Bayangan akhir titik D adalah $(22,3)$.",
      "Translasi gabungannya adalah $T\\binom{13}{3}$.",
      "Bayangan akhir titik D adalah $(22,13)$.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Translasi pertama menghasilkan $(9+7,0+18)=(16,18)$. Translasi kedua menghasilkan $(16+6,18-15)=(22,3)$. Jumlah vektornya adalah $(13,3)$, sehingga (1), (2), dan (3) benar.",
  },
  14: {
    soal: "Titik $A(27,-12)$ dicerminkan menjadi $A'(27,12)$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Koordinat x tidak berubah.",
      "Koordinat y berubah tanda.",
      "Sumbu refleksinya adalah sumbu x.",
      "Sumbu refleksinya adalah sumbu y.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Refleksi terhadap sumbu x memetakan $(x,y)$ menjadi $(x,-y)$. Karena $(27,-12)$ menjadi $(27,12)$, pernyataan (1), (2), dan (3) benar.",
  },
  17: {
    soal: "Titik $B(2,-2)$ dicerminkan menjadi $B'(6,-2)$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Garis refleksinya adalah $x=4$.",
      "Koordinat y tetap -2.",
      "Jarak titik B ke garis refleksi adalah 2 satuan.",
      "Garis refleksinya adalah $y=4$.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Titik $B(2,-2)$ dan bayangannya $B'(6,-2)$ memiliki ordinat yang sama. Garis cermin tegak lurus ruas $BB'$ dan melalui titik tengahnya. Titik tengah $BB'$ adalah $\\left(\\frac{2+6}{2},\\frac{-2+(-2)}{2}\\right)=(4,-2)$, sehingga sumbu refleksinya adalah garis vertikal $x=4$. Jarak titik B ke garis tersebut adalah $|2-4|=2$ satuan. Jadi pernyataan (1), (2), dan (3) benar, sedangkan (4) salah.",
  },
  20: {
    soal: "Titik $A(-3,1)$ diputar terhadap pusat $O(0,0)$ sejauh $90^\\circ$ dan $180^\\circ$ berlawanan arah jarum jam. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Bayangan rotasi $90^\\circ$ berlawanan arah jarum jam adalah $(-1,-3)$.",
      "Bayangan rotasi $180^\\circ$ adalah $(3,-1)$.",
      "Kedua bayangan tersebut adalah $(-1,-3)$ dan $(3,-1)$.",
      "Jika titik A diputar $90^\\circ$ berlawanan arah jarum jam, lalu dilanjutkan dengan rotasi $180^\\circ$, bayangannya adalah $(1,3)$.",
    ],
    jawabanPGK: [0, 1, 2, 3],
    pembahasan: "Rotasi $90^\\circ$ berlawanan arah jarum jam memakai aturan $(x,y)\\mapsto(-y,x)$, sehingga $A(-3,1)$ menjadi $(-1,-3)$. Rotasi $180^\\circ$ memetakan $(x,y)\\mapsto(-x,-y)$, sehingga bayangan langsung A adalah $(3,-1)$. Untuk pernyataan (4), lakukan rotasi berurutan: $(-3,1)\\mapsto(-1,-3)\\mapsto(1,3)$. Jadi pernyataan (1), (2), (3), dan (4) semuanya benar.",
  },
  23: {
    soal: "Segitiga $PQR$ didilatasi terhadap pusat $O(0,0)$ sehingga $P(1,1)$ menjadi $P'(-2,-2)$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Faktor skala dilatasi adalah $-2$.",
      "Titik $Q(1,5)$ menjadi $Q'(-2,-10)$.",
      "Titik $R(3,3)$ menjadi $R'(-6,-6)$.",
      "Faktor skala dilatasi adalah 2.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Karena $(1,1)$ menjadi $(-2,-2)$, faktor skala adalah $c=-2$. Maka $Q'=(-2,-10)$ dan $R'=(-6,-6)$. Jadi (1), (2), dan (3) benar.",
  },
};

const pgkbsVariants: Record<number, ComplexVariant & { jawabanBS: ("B" | "S")[] }> = {
  12: {
    soal: "Titik $C(2,8)$ dicerminkan terhadap sumbu x. Tentukan Benar atau Salah.",
    pernyataan: [
      "Koordinat x tetap 2.",
      "Koordinat y berubah menjadi -8.",
      "Bayangannya adalah $C'(2,8)$.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Refleksi terhadap sumbu x memetakan $(x,y)$ menjadi $(x,-y)$, sehingga $C'=(2,-8)$. Pernyataan (1) dan (2) benar, sedangkan (3) salah.",
  },
  15: {
    soal: "Titik $B(3,-7)$ dicerminkan menjadi $B'(-7,3)$. Tentukan Benar atau Salah.",
    pernyataan: [
      "Koordinat x dan y saling bertukar.",
      "Sumbu refleksinya adalah garis $y=x$.",
      "Sumbu refleksinya adalah garis $y=-x$.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Refleksi terhadap garis $y=x$ memetakan $(x,y)\\mapsto(y,x)$. Maka titik $(3,-7)$ menjadi $(-7,3)$, sehingga pernyataan (1) dan (2) benar. Sebaliknya, refleksi terhadap garis $y=-x$ memakai aturan $(x,y)\\mapsto(-y,-x)$ dan menghasilkan $(7,-3)$, bukan $(-7,3)$. Jadi pernyataan (3) salah.",
  },
};

const latihanDasar: LatihanSoal[] = latihanDasarSource
  .filter((soal) => soal.no <= 23)
  .sort((a, b) => a.no - b.no)
  .map((soal, index) => {
    const sourceNo = soal.no;
    const displayNo = index + 1;
    const type = sourceNo % 3 === 1 ? "pg" : sourceNo % 3 === 2 ? "pgk" : "pgkbs";
    const pgk = pgkVariants[sourceNo];
    const pgkbs = pgkbsVariants[sourceNo];

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
      };
    }

    return {
      ...soal,
      no: displayNo,
      type: "pg" as const,
      jawaban: kunciJawaban[sourceNo - 1],
    };
  });

const uploadedRefleksiImage = "/soal-refleksi-segitiga-klm.png";

const uploadedContohSoal: LatihanSoal[] = [
  {
    no: 1,
    type: "pgkbs",
    soal: "Sebuah segitiga $KLM$ dicerminkan terhadap garis tegak $x = 5$ sehingga menghasilkan bayangan segitiga $K'L'M'$. Diketahui koordinat titik $K(2, 4)$, $L'(6, 2)$, dan $M'(4, 8)$.",
    pernyataan: [
      "Koordinat awal titik $L$ adalah $(4, 2)$.",
      "Koordinat bayangan titik $M'$ adalah $(6, 8)$.",
      "Jarak antara garis cermin $x = 5$ ke titik $K$ adalah 3 satuan.",
    ],
    jawabanBS: ["B", "S", "B"],
    gambar: <img src={uploadedRefleksiImage} alt="Diagram refleksi segitiga KLM terhadap garis x = 5" className="mx-auto w-full max-w-xl rounded-xl border border-white/10 bg-white p-2" />,
    pembahasan: `Pembahasan Soal 1:
Konsep & Trik Cepat:
Refleksi terhadap garis vertikal $x = k$ menggunakan rumus:
$$P(x, y) \\xrightarrow{x=k} P'(2k - x, y)$$
Trik: Koordinat tegak ($y$) nilainya selalu tetap, sedangkan koordinat datar ($x$) berjarak sama terhadap garis cermin $x = k$.

Penyelesaian Step-by-Step:
Analisis Pernyataan 1:
Titik bayangan $L'(6, 2)$ dicerminkan oleh garis $x = 5$.
$$6 = 2(5) - x \\implies x = 4$$
Karena nilai $y$ tetap ($y = 2$), maka koordinat titik $L$ adalah $(4, 2)$. Pernyataan 1 BENAR.

Analisis Pernyataan 2:
Titik awal $M(x, y)$ yang menghasilkan $M'(4, 8)$ melalui garis $x = 5$:
$$4 = 2(5) - x \\implies x = 6$$
Maka koordinat asal titik $M$ adalah $(6, 8)$. Bayangan yang terbentuk tetap $M'(4, 8)$. Pernyataan 2 SALAH.

Analisis Pernyataan 3:
$$\\text{Jarak} = |5 - 2| = 3 \\text{ satuan}$$
Pernyataan 3 BENAR.

Jawaban: 1. Benar | 2. Salah | 3. Benar`,
  },
  {
    no: 2,
    type: "pg",
    soal: "Pada bidang Kartesius, titik $A(4, -3)$ dicerminkan terhadap garis mendatar $y = 3$ hingga menghasilkan bayangan titik $B$. Jarak antara titik $A$ dan titik $B$ adalah ....",
    options: ["A. 6 satuan", "B. 8 satuan", "C. 12 satuan", "D. 14 satuan"],
    jawaban: "C",
    pembahasan: `Pembahasan Soal 2:
Refleksi terhadap garis horizontal $y = h$ menggunakan rumus $P(x, y) \\to P'(x, 2h - y)$.

Bayangan titik $B$:
$$B = (4, 2(3) - (-3)) = (4, 9)$$
Maka jarak antara $A(4, -3)$ dan $B(4, 9)$ adalah:
$$AB = |9 - (-3)| = 12 \\text{ satuan}$$

Jawaban: C.`,
  },
  {
    no: 3,
    type: "pgk",
    soal: "Sebuah bangun datar diputar dengan pusat rotasi $O(0,0)$. Salah satu titik sudutnya $P(3, 4)$ berpindah posisi ke bayangannya $P'(-4, 3)$. Sudut rotasi $\\theta$ yang memenuhi pemetaan tersebut adalah .... Pilih semua jawaban yang benar.",
    pernyataan: [
      "Rotasi sejauh $90^\\circ$ searah jarum jam ($-90^\\circ$)",
      "Rotasi sejauh $90^\\circ$ berlawanan arah jarum jam ($90^\\circ$)",
      "Rotasi sejauh $270^\\circ$ searah jarum jam ($-270^\\circ$)",
      "Rotasi sejauh $180^\\circ$",
    ],
    jawabanPGK: [1, 2],
    pembahasan: `Pembahasan Soal 3:
Aturan rotasi pusat $(0,0)$:
Rotasi $+90^\\circ$: $(x, y) \\to (-y, x)$.
Rotasi $-90^\\circ$: $(x, y) \\to (y, -x)$.

Dari $P(3, 4)$ ke $P'(-4, 3)$ berlaku:
$$ (3, 4) \\to (-4, 3) = (-y, x) $$
Jadi, rotasinya adalah $90^\\circ$ berlawanan arah jarum jam atau ekuivalen dengan $-270^\\circ$ searah jarum jam.

Jawaban: rotasi $90^\\circ$ berlawanan arah jarum jam dan rotasi $270^\\circ$ searah jarum jam.`,
  },
  {
    no: 4,
    type: "pg",
    soal: "Titik $R(-3, 2)$ didilatasi terhadap titik pusat $O(0,0)$ dengan faktor skala $k$ sehingga menghasilkan bayangan $R'(-12, 8)$. Faktor skala $k$ dan koordinat bayangan jika titik $S(2, -5)$ didilatasi dengan faktor skala yang sama adalah ....",
    options: [
      "A. $k = 4$ dan $S'(8, -20)$",
      "B. $k = -4$ dan $S'(-8, 20)$",
      "C. $k = 4$ dan $S'(-8, 20)$",
      "D. $k = 3$ dan $S'(6, -15)$",
    ],
    jawaban: "A",
    pembahasan: `Pembahasan Soal 4:
Dilatasi dengan pusat $O(0,0)$ dan faktor skala $k$ memetakan $(x,y) \\to (kx,ky)$.

Dari $R(-3, 2) \\to R'(-12, 8)$:
$$k = \\frac{-12}{-3} = \\frac{8}{2} = 4$$
Maka:
$$S' = (4 \\times 2, 4 \\times (-5)) = (8, -20)$$

Jawaban: A.`,
  },
  {
    no: 5,
    type: "pg",
    soal: "Persamaan bayangan dari garis $3x - 2y + 6 = 0$ oleh translasi $T(-3, 4)$ adalah ....",
    options: [
      "A. $3x - 2y + 23 = 0$",
      "B. $3x - 2y - 11 = 0$",
      "C. $3x - 2y + 17 = 0$",
      "D. $3x + 2y + 23 = 0$",
    ],
    jawaban: "A",
    pembahasan: `Pembahasan Soal 5:
Translasi $T(a,b)$ menggunakan penggantian $x$ dengan $(x-a)$ dan $y$ dengan $(y-b)$ pada persamaan awal.

Untuk $T(-3,4)$:
$$3(x+3) - 2(y-4) + 6 = 0$$
$$3x + 9 - 2y + 8 + 6 = 0$$
$$3x - 2y + 23 = 0$$

Jawaban: A.`,
  },
];

const contohSoal: LatihanSoal[] = [
  ...uploadedContohSoal,
  ...getTkaContohSoal("transformasi-geometri").map((soal) => ({
    ...soal,
    no: soal.no + uploadedContohSoal.length,
  })),
];

const TransformasiPage = () => (
  <TKAPemantapanLayout
    title="TRANSFORMASI GEOMETRI"
  materiSections={materiSections}
  contohSoal={contohSoal}
  latihanDasar={latihanDasar}
  showImageSourceLinks={false}
  />
);

export default TransformasiPage;
