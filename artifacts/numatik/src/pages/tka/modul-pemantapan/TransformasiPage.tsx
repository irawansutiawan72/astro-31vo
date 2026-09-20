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
  { no: 1, soal: "Titik A(5, -2) ditranslasi oleh $T\\binom{-3}{1}$. Tentukan koordinat bayangan titik A tersebut!", options: ["A. A'(2, 1)", "B. A'(1, 1)", "C. A'(2, 2)", "D. A'(2, -1)", "E. A'(-2, 1)"] },
  { no: 2, soal: "Tentukan bayangan titik A(3, -4) jika digeser oleh $T\\binom{-3}{9}$ ...", options: ["A. A'(0, 13)", "B. A'(0, 5)", "C. A'(6, 13)", "D. A'(6, 5)"] },
  { no: 3, soal: "Tentukan bayangan titik B(-2, -13) jika digeser oleh $T\\binom{3}{-6}$ ...", options: ["A. B'(5, 7)", "B. B'(5, -7)", "C. B'(1, -19)", "D. B'(1, 19)"] },
  { no: 4, soal: "Tentukanlah bayangan titik C(2, 8) jika digeser oleh $T_1\\binom{2}{8}$ dan dilanjutkan oleh $T_2\\binom{-2}{-5}$ ...", options: ["A. C''(2, 8)", "B. C''(2, 16)", "C. C''(2, 21)", "D. C''(2, 11)"] },
  { no: 5, soal: "Tentukanlah bayangan titik D(9, 0) jika digeser oleh $T_1\\binom{7}{18}$ dan dilanjutkan oleh $T_2\\binom{6}{-15}$ ...", options: ["A. D''(9, 13)", "B. D''(22, 9)", "C. D''(22, 13)", "D. D''(22, 3)"] },
  { no: 6, soal: "Jika titik A(27, -12) digeser oleh T(a, b) sehingga bayangannya adalah titik A'(20, -3), tentukan a + b ...", options: ["A. -7", "B. 9", "C. 2", "D. 16"] },
  { no: 7, soal: "Jika titik B(3, -7) digeser oleh T(a, b) sehingga bayangannya adalah titik B'(20, -3), tentukan T ...", options: ["A. T(17, 4)", "B. T(17, 10)", "C. T(3, 4)", "D. T(2, 10)"] },
  { no: 8, soal: "Jika titik A digeser oleh $T\\binom{2}{9}$ menjadi A'(0, 5) maka titik A adalah ...", options: ["A. A(2, 14)", "B. A(-2, -4)", "C. A(2, 4)", "D. A(-2, 14)"] },
  { no: 9, soal: "Jika titik B digeser oleh $T\\binom{6}{-2}$ menjadi B'(1, 7) maka titik B adalah ...", options: ["A. B(7, 5)", "B. B(7, 9)", "C. B(-5, 5)", "D. B(-5, 9)"] },
  { no: 10, soal: "Tentukan bayangan titik A(3, -4) jika dicerminkan oleh garis x = 3 ...", options: ["A. A'(3, 10)", "B. A'(4, -3)", "C. A'(3, -4)", "D. A'(3, 4)"] },
  { no: 11, soal: "Tentukan bayangan titik B(-2, -13) jika dicerminkan oleh garis y = 4 ...", options: ["A. B'(-2, 21)", "B. B'(12, -19)", "C. B'(10, 21)", "D. B'(1, 4)"] },
  { no: 12, soal: "Tentukanlah bayangan titik C(2, 8) jika dicerminkan oleh sumbu x ...", options: ["A. C''(2, 8)", "B. C''(2, -8)", "C. C''(-2, 8)", "D. C''(-2, -8)"] },
  { no: 13, soal: "Tentukanlah bayangan titik D(9, 0) jika dicerminkan oleh sumbu y ...", options: ["A. D''(9, 0)", "B. D''(-9, 0)", "C. D''(0, 9)", "D. D''(0, -9)"] },
  { no: 14, soal: "Jika titik A(27, -12) dicerminkan menjadi A'(27, 12), sumbu refleksinya adalah ...", options: ["A. Sumbu x", "B. Titik (0, 0)", "C. Sumbu y", "D. x = 2"] },
  { no: 15, soal: "Jika titik B(3, -7) dicerminkan menjadi A'(-7, 3), sumbu refleksinya adalah ...", options: ["A. Sumbu y = x", "B. Sumbu x", "C. Sumbu y = -x", "D. Sumbu y"] },
  { no: 16, soal: "Jika titik A(2, 8) dicerminkan menjadi A'(2, 12), sumbu refleksinya adalah ...", options: ["A. x = 10", "B. y = 2", "C. x = 2", "D. y = 10"] },
  { no: 17, soal: "Jika titik B(2, -2) dicerminkan menjadi A'(6, -2), sumbu refleksinya adalah ...", options: ["A. x = 4", "B. y = 4", "C. x = 5", "D. y = 5"] },
  { no: 18, soal: "Bayangan titik A oleh refleksi terhadap titik (1, -2) adalah titik A'(3, 5). Tentukan koordinat titik A!", options: ["A. A(1, 9)", "B. A(1, 1)", "C. A(-9, 1)", "D. A(-1, -9)", "E. A(9, 1)"] },
  { no: 19, soal: "Tentukan bayangan titik (5, -3) oleh rotasi $R(P,\\ 90^{\\circ})$ dengan koordinat titik P(-1, 2)!", options: ["A. (8, 4)", "B. (-8, 4)", "C. (8, -4)", "D. (-4, -8)", "E. (4, 8)"] },
  { no: 20, soal: "Titik A(-3, 1) jika dirotasi terhadap sudut $90^{\\circ}$ dan $180^{\\circ}$ menghasilkan bayangan pada titik ... dan ...", options: ["A. (1, 3) dan (-3, -1)", "B. (-1, -3) dan (3, -1)", "C. (1, -2) dan (-1, -2)", "D. (-2, 1) dan (2, -1)"] },
  { no: 21, soal: "Tentukan bayangan titik (9, 3) oleh dilatasi $[O,\\ \\frac{1}{3}]$!", options: ["A. (1, 3)", "B. (3, 1)", "C. (-1, -3)", "D. (3, -1)", "E. (1, -3)"] },
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
  "A", "D", "A", "D", "E", "B", "B", "A", "D",
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
  8: {
    soal: "Titik $A$ ditranslasi oleh $T\\binom{2}{9}$ menjadi $A'(0,5)$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Koordinat x titik A adalah -2.",
      "Koordinat y titik A adalah -4.",
      "Titik asalnya adalah $A(-2,-4)$.",
      "Titik asalnya adalah $A(-2,4)$.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Untuk mencari titik asal, kurangkan vektor translasi dari bayangan: $A=(0-2,5-9)=(-2,-4)$. Jadi (1), (2), dan (3) benar.",
  },
  11: {
    soal: "Titik $B(-2,-13)$ dicerminkan terhadap garis $y=4$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Koordinat x tetap -2.",
      "Koordinat y bayangan adalah 21.",
      "Bayangan titik B adalah $B'(-2,21)$.",
      "Bayangan titik B adalah $B'(2,21)$.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Refleksi terhadap $y=4$ memakai $y'=2(4)-(-13)=21$, sedangkan x tetap. Jadi $B'=(-2,21)$ dan (1), (2), dan (3) benar.",
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
    pembahasan: "Garis cermin berada di titik tengah koordinat x, yaitu $x=\\frac{2+6}{2}=4$. Koordinat y tetap dan jarak ke garis adalah $|4-2|=2$. Jadi (1), (2), dan (3) benar.",
  },
  20: {
    soal: "Titik $A(-3,1)$ diputar terhadap pusat $O(0,0)$ sejauh $90^\\circ$ dan $180^\\circ$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Bayangan rotasi $90^\\circ$ berlawanan arah jarum jam adalah $(-1,-3)$.",
      "Bayangan rotasi $180^\\circ$ adalah $(3,-1)$.",
      "Kedua bayangan tersebut adalah $(-1,-3)$ dan $(3,-1)$.",
      "Bayangan rotasi $90^\\circ$ berlawanan arah jarum jam adalah $(1,3)$.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Rotasi $90^\\circ$ berlawanan arah jarum jam memakai $(x,y)\\mapsto(-y,x)$ sehingga diperoleh $(-1,-3)$. Rotasi $180^\\circ$ menghasilkan $(3,-1)$. Jadi (1), (2), dan (3) benar.",
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
  3: {
    soal: "Titik $B(-2,-13)$ ditranslasi oleh $T\\binom{3}{-6}$. Tentukan Benar atau Salah untuk setiap pernyataan.",
    pernyataan: [
      "Koordinat x bayangan adalah 1.",
      "Koordinat y bayangan adalah -19.",
      "Bayangan titik B adalah $B'(1,-19)$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Hasil translasi adalah $B'=(-2+3,-13-6)=(1,-19)$. Semua pernyataan benar.",
  },
  6: {
    soal: "Titik $A(27,-12)$ ditranslasi menjadi $A'(20,-3)$ oleh $T(a,b)$. Tentukan Benar atau Salah.",
    pernyataan: [
      "Nilai $a=-7$.",
      "Nilai $b=9$.",
      "Nilai $a+b=2$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Vektor translasi adalah $T=(20-27,-3-(-12))=(-7,9)$. Jadi $a+b=-7+9=2$ dan semua pernyataan benar.",
  },
  9: {
    soal: "Titik $B$ ditranslasi oleh $T\\binom{6}{-2}$ menjadi $B'(1,7)$. Tentukan Benar atau Salah.",
    pernyataan: [
      "Koordinat x titik B adalah -5.",
      "Koordinat y titik B adalah 9.",
      "Translasi titik $B(-5,9)$ menghasilkan $B'(1,7)$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Titik asal diperoleh dengan mengurangkan vektor translasi: $B=(1-6,7-(-2))=(-5,9)$. Jika ditranslasi, hasilnya $(1,7)$. Semua pernyataan benar.",
  },
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
      "Bayangannya adalah $(7,-3)$.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Pemetaan $(x,y)\\mapsto(y,x)$ adalah refleksi terhadap garis $y=x$. Jadi $(3,-7)$ menjadi $(-7,3)$, bukan $(7,-3)$.",
  },
  18: {
    soal: "Bayangan titik A oleh refleksi terhadap titik pusat $(1,-2)$ adalah $A'(3,5)$. Tentukan Benar atau Salah.",
    pernyataan: [
      "Titik pusat $(1,-2)$ merupakan titik tengah A dan A'.",
      "Koordinat x titik A adalah -1.",
      "Koordinat y titik A adalah -9.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Pada refleksi terhadap titik, pusat adalah titik tengah. Maka $A=2(1,-2)-(3,5)=(-1,-9)$. Semua pernyataan benar.",
  },
  21: {
    soal: "Titik $(9,3)$ didilatasi terhadap pusat $O(0,0)$ dengan faktor skala $\\frac13$. Tentukan Benar atau Salah.",
    pernyataan: [
      "Faktor skalanya adalah $\\frac13$.",
      "Bayangannya adalah $(3,1)$.",
      "Bayangannya adalah $(-3,-1)$.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Dilatasi berpusat di O memetakan $(x,y)$ menjadi $(kx,ky)$. Jadi $\\frac13(9,3)=(3,1)$; (1) dan (2) benar, sedangkan (3) salah.",
  },
};

const latihanDasar: LatihanSoal[] = latihanDasarSource
  .filter((soal) => soal.no <= 23)
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

    return {
      ...soal,
      type: "pg" as const,
      jawaban: kunciJawaban[soal.no - 1],
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
