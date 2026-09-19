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

const latihanDasar: LatihanSoal[] = [
  { no: 1, soal: "Titik A(5, -2) ditranslasi oleh $T\\binom{-3}{1}$. Tentukan koordinat bayangan titik A tersebut!", options: ["A. A'(2, 1)", "B. A'(1, 1)", "C. A'(2, 2)", "D. A'(2, -1)", "E. A'(-2, 1)"] },
  { no: 2, soal: "Tentukan bayangan titik A(3, -4) jika digeser oleh $T\\binom{-3}{9}$ ...", options: ["A. A'(0, 13)", "B. A'(0, 5)", "C. A'(6, 13)", "D. A'(6, 5)"] },
  { no: 3, soal: "Tentukan bayangan titik B(-2, -13) jika digeser oleh $T\\binom{3}{-6}$ ...", options: ["A. B'(5, 7)", "B. B'(5, -7)", "C. B'(1, -19)", "D. B'(1, 19)"] },
  { no: 4, soal: "Tentukanlah bayangan titik C(2, 8) jika digeser oleh $T_1\\binom{2}{8}$ dan dilanjutkan oleh $T_2\\binom{-2}{-5}$ ...", options: ["A. C''(2, 8)", "B. C''(2, 16)", "C. C''(2, 21)", "D. C''(2, 11)"] },
  { no: 5, soal: "Tentukanlah bayangan titik D(9, 0) jika digeser oleh $T_1\\binom{7}{18}$ dan dilanjutkan oleh $T_2\\binom{6}{-15}$ ...", options: ["A. D''(9, 13)", "B. D''(22, 9)", "C. D''(22, 13)", "D. D''(22, 3)"] },
  { no: 6, soal: "Jika titik A(27, -12) digeser oleh T(a, b) sehingga bayangannya adalah titik A'(20, -3), tentukan a + b ...", options: ["A. -7", "B. 9", "C. 2", "D. 16"] },
  { no: 7, soal: "Jika titik B(3, -7) digeser oleh T(a, b) sehingga bayangannya adalah titik B'(20, -3), tentukan T ...", options: ["A. T(17, 4)", "B. T(17, 10)", "C. T(3, 4)", "D. T(2, 10)"] },
  { no: 8, soal: "Jika titik A digeser oleh $T\\binom{2}{9}$ menjadi A'(0, 5) maka titik A adalah ...", options: ["A. A(2, 14)", "B. A(-2, 4)", "C. A(2, 4)", "D. A(-2, 14)"] },
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
  { no: 22, soal: "Titik M'(8, -6) merupakan hasil dilatasi dari titik M(-24, 18). Maka faktor skala dilatasi tersebut jika pusatnya (0, 0) adalah ...", options: ["A. 2", "B. 3", "C. -3", "D. -2"] },
  { no: 23, soal: "Segitiga PQR memiliki koordinat P(1, 1); Q(1, 5) dan R(3, 3). Didilatasi dengan [O, c] menghasilkan bayangan P'(-2, -2); Q'(-2, -10) dan R'(-6, -6). Nilai c adalah ...", options: ["A. 2", "B. 3", "C. -3", "D. -2"] },
];

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
