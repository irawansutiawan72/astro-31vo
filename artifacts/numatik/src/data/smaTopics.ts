export type SmaLearningMode = "buku-animasi" | "tugas-latihan-mandiri";

export type SmaSubtopic = {
  title: string;
  slug: string;
};

export type SmaTopic = {
  title: string;
  slug: string;
  subtopics: SmaSubtopic[];
};

export const SMA_TOPICS: SmaTopic[] = [
  {
    title: "Fungsi Eksponen",
    slug: "fungsi-eksponen",
    subtopics: [
      { title: "Pertumbuhan, Peluruhan, dan Grafik Eksponen", slug: "eksplorasi-fungsi-eksponen" },
    ],
  },
  {
    title: "Eksponen dan Logaritma",
    slug: "eksponen-dan-logaritma",
    subtopics: [
      { title: "Sifat-sifat Eksponen (Bilangan Berpangkat)", slug: "sifat-sifat-eksponen" },
      { title: "Pertumbuhan dan Peluruhan Eksponensial", slug: "pertumbuhan-dan-peluruhan-eksponensial" },
      { title: "Bentuk Akar dan Merasionalkan Penyebut", slug: "bentuk-akar-dan-merasionalkan-penyebut" },
      { title: "Konsep dan Sifat-sifat Logaritma", slug: "konsep-dan-sifat-sifat-logaritma" },
    ],
  },
  {
    title: "Barisan dan Deret",
    slug: "barisan-dan-deret",
    subtopics: [
      { title: "Barisan dan Deret Aritmatika", slug: "barisan-dan-deret-aritmatika" },
      { title: "Barisan dan Deret Geometri", slug: "barisan-dan-deret-geometri" },
      { title: "Deret Geometri Tak Hingga", slug: "deret-geometri-tak-hingga" },
    ],
  },
  {
    title: "Vektor dan Operasinya",
    slug: "vektor-dan-operasinya",
    subtopics: [
      { title: "Konsep Dasar Vektor (Notasi, Panjang, dan Arah Vektor)", slug: "konsep-dasar-vektor" },
      { title: "Operasi Vektor secara Geometris (Segitiga, Jajar Genjang, Poligon)", slug: "operasi-vektor-secara-geometris" },
      { title: "Vektor pada Sistem Koordinat Kartesius (Komponen Vektor Dimensi 2 & 3)", slug: "vektor-pada-sistem-koordinat-kartesius" },
      { title: "Operasi Aljabar pada Vektor", slug: "operasi-aljabar-pada-vektor" },
    ],
  },
  {
    title: "Perbandingan Trigonometri",
    slug: "perbandingan-trigonometri",
    subtopics: [
      { title: "Perbandingan Trigonometri pada Segitiga Siku-Siku (Sin, Cos, Tan, Sec, Cosec, Cotan)", slug: "perbandingan-trigonometri-segitiga-siku-siku" },
      { title: "Sudut-Sudut Istimewa dan Relasi Sudut", slug: "sudut-sudut-istimewa-dan-relasi-sudut" },
      { title: "Penerapan dan Pemodelan Trigonometri (Aturan Sinus & Cosinus)", slug: "penerapan-dan-pemodelan-trigonometri" },
    ],
  },
  {
    title: "Sistem Persamaan dan Pertidaksamaan Linear",
    slug: "sistem-persamaan-dan-pertidaksamaan-linear",
    subtopics: [
      { title: "Sistem Persamaan Linear Tiga Variabel (SPLTV)", slug: "sistem-persamaan-linear-tiga-variabel" },
      { title: "Sistem Pertidaksamaan Linear Dua Variabel (SPtLDV)", slug: "sistem-pertidaksamaan-linear-dua-variabel" },
    ],
  },
  {
    title: "Fungsi Kuadrat",
    slug: "fungsi-kuadrat",
    subtopics: [
      { title: "Karakteristik dan Unsur Grafik Fungsi Kuadrat", slug: "karakteristik-dan-unsur-grafik-fungsi-kuadrat" },
      { title: "Mengkonstruksi/Membentuk Persamaan Fungsi Kuadrat", slug: "mengkonstruksi-persamaan-fungsi-kuadrat" },
      { title: "Pemecahan Masalah Nyata dengan Fungsi Kuadrat", slug: "pemecahan-masalah-nyata-dengan-fungsi-kuadrat" },
    ],
  },
  {
    title: "Statistika",
    slug: "statistika",
    subtopics: [
      { title: "Penyajian Data (Histogram, Frekuensi Relatif, Ogive)", slug: "penyajian-data" },
      { title: "Ukuran Pemusatan Data (Mean, Median, Modus)", slug: "ukuran-pemusatan-data" },
      { title: "Ukuran Penempatan/Penyebaran Data (Kuartil, Jangkauan Interkuartil, Simpangan Baku)", slug: "ukuran-penempatan-penyebaran-data" },
    ],
  },
  {
    title: "Peluang",
    slug: "peluang",
    subtopics: [
      { title: "Ruang Sampel dan Distribusi Peluang Kejadian", slug: "ruang-sampel-dan-distribusi-peluang-kejadian" },
      { title: "Aturan Penjumlahan Peluang (Kejadian Saling Lepas & Tidak Saling Lepas)", slug: "aturan-penjumlahan-peluang" },
    ],
  },
  {
    title: "Komposisi Fungsi dan Fungsi Invers",
    slug: "komposisi-fungsi-dan-fungsi-invers",
    subtopics: [
      { title: "Konsep Fungsi, Domain, Kodomain, dan Range", slug: "konsep-fungsi-domain-kodomain-range" },
      { title: "Operasi Aljabar pada Fungsi", slug: "operasi-aljabar-pada-fungsi" },
      { title: "Fungsi Komposisi", slug: "fungsi-komposisi" },
      { title: "Fungsi Invers", slug: "fungsi-invers" },
    ],
  },
  {
    title: "Lingkaran",
    slug: "lingkaran",
    subtopics: [
      { title: "Unsur-Unsur Lingkaran, Panjang Busur, dan Luas Juring", slug: "unsur-lingkaran-panjang-busur-luas-juring" },
      { title: "Sudut Pusat dan Sudut Keliling (Sifat Tali Busur)", slug: "sudut-pusat-dan-sudut-keliling" },
      { title: "Garis Singgung Lingkaran", slug: "garis-singgung-lingkaran" },
    ],
  },
  {
    title: "Statistika (Data Bivariat)",
    slug: "statistika-data-bivariat",
    subtopics: [
      { title: "Diagram Pencar (Scatter Plot)", slug: "diagram-pencar" },
      { title: "Regresi Linear Utama / Metode Kuadrat Terkecil (Least Squares)", slug: "regresi-linear-metode-kuadrat-terkecil" },
      { title: "Analisis Korelasi (Korelasi Product Moment dan Koefisien Determinasi)", slug: "analisis-korelasi" },
    ],
  },
  {
    title: "Bilangan Kompleks (Peminatan MIPA)",
    slug: "bilangan-kompleks",
    subtopics: [
      { title: "Konsep dan Bentuk Bilangan Kompleks (Kartesius, Polar, Eksponensial)", slug: "konsep-dan-bentuk-bilangan-kompleks" },
      { title: "Operasi Aljabar Bilangan Kompleks", slug: "operasi-aljabar-bilangan-kompleks" },
      { title: "Konjugat, Modulus, dan Argumen Bilangan Kompleks", slug: "konjugat-modulus-dan-argumen" },
    ],
  },
  {
    title: "Polinomial (Peminatan MIPA)",
    slug: "polinomial",
    subtopics: [
      { title: "Konsep Dasar dan Operasi Aljabar Polinomial", slug: "konsep-dasar-dan-operasi-polinomial" },
      { title: "Pembagian Polinomial (Metode Bersusun dan Horner)", slug: "pembagian-polinomial" },
      { title: "Teorema Sisa dan Teorema Faktor", slug: "teorema-sisa-dan-teorema-faktor" },
      { title: "Persamaan Polinomial dan Teorema Vieta", slug: "persamaan-polinomial-dan-teorema-vieta" },
    ],
  },
  {
    title: "Matriks (Peminatan MIPA)",
    slug: "matriks",
    subtopics: [
      { title: "Konsep, Jenis, Kesamaan, dan Transpose Matriks", slug: "konsep-jenis-kesamaan-transpose-matriks" },
      { title: "Operasi Aljabar Matriks (Penjumlahan, Pengurangan, Perkalian)", slug: "operasi-aljabar-matriks" },
      { title: "Determinan dan Invers Matriks", slug: "determinan-dan-invers-matriks" },
      { title: "Penerapan Matriks pada Sistem Persamaan Linear (SPL)", slug: "penerapan-matriks-pada-spl" },
    ],
  },
  {
    title: "Transformasi Geometri (Peminatan MIPA)",
    slug: "transformasi-geometri",
    subtopics: [
      { title: "Translasi (Pergeseran) & Refleksi (Pencerminan)", slug: "translasi-dan-refleksi" },
      { title: "Rotasi (Perputaran) & Dilatasi (Perbesaran/Pengecilan)", slug: "rotasi-dan-dilatasi" },
      { title: "Transformasi Menggunakan Matriks", slug: "transformasi-menggunakan-matriks" },
      { title: "Komposisi Transformasi Geometri", slug: "komposisi-transformasi-geometri" },
    ],
  },
  {
    title: "Fungsi dan Pemodelannya (Peminatan MIPA)",
    slug: "fungsi-dan-pemodelannya",
    subtopics: [
      { title: "Fungsi Trigonometri dan Grafiknya", slug: "fungsi-trigonometri-dan-grafiknya" },
      { title: "Fungsi Nilai Mutlak, Fungsi Tangga, dan Fungsi Piecewise", slug: "fungsi-nilai-mutlak-tangga-piecewise" },
      { title: "Pemodelan Fenomena Nyata Menggunakan Fungsi", slug: "pemodelan-fenomena-nyata-menggunakan-fungsi" },
    ],
  },
  {
    title: "Geometri Ruang",
    slug: "geometri-ruang",
    subtopics: [
      { title: "Jarak Antartitik, Titik ke Garis, dan Titik ke Bidang", slug: "jarak-antartitik-titik-ke-garis-dan-bidang" },
      { title: "Jarak Antargaris dan Garis ke Bidang", slug: "jarak-antargaris-dan-garis-ke-bidang" },
      { title: "Sudut dalam Ruang (Sudut Antaragaris, Garis-Bidang, dan Bidang-Bidang)", slug: "sudut-dalam-ruang" },
    ],
  },
  {
    title: "Limit Fungsi",
    slug: "limit-fungsi",
    subtopics: [
      { title: "Konsep dan Sifat-Sifat Limit Fungsi Aljabar", slug: "konsep-dan-sifat-limit-fungsi-aljabar" },
      { title: "Menentukan Nilai Limit Fungsi Aljabar (Metode Subtitusi, Pemfaktoran, Merasionalkan)", slug: "menentukan-nilai-limit-fungsi-aljabar" },
      { title: "Limit Fungsi Tak Hingga (x → ∞)", slug: "limit-fungsi-tak-hingga" },
    ],
  },
  {
    title: "Turunan Fungsi (Diferensial)",
    slug: "turunan-fungsi",
    subtopics: [
      { title: "Konsep Turunan dan Sifat-Sifat Turunan Fungsi Aljabar", slug: "konsep-dan-sifat-turunan-fungsi-aljabar" },
      { title: "Penerapan Turunan: Persamaan Garis Singgung Kurva", slug: "penerapan-turunan-garis-singgung" },
      { title: "Fungsi Naik, Fungsi Turun, dan Nilai Stasioner (Maksimum/Minimum)", slug: "fungsi-naik-turun-dan-nilai-stasioner" },
    ],
  },
  {
    title: "Integral Fungsi",
    slug: "integral-fungsi",
    subtopics: [
      { title: "Konsep Integral Tak Tentu dan Sifat-Sifatnya", slug: "konsep-integral-tak-tentu" },
      { title: "Integral Tentu", slug: "integral-tentu" },
      { title: "Penerapan Integral (Luas Daerah di Bawah Kurva)", slug: "penerapan-integral" },
    ],
  },
  {
    title: "Limit dan Kontinuitas (Peminatan MIPA)",
    slug: "limit-dan-kontinuitas",
    subtopics: [
      { title: "Limit Fungsi Trigonometri", slug: "limit-fungsi-trigonometri" },
      { title: "Limit di Ketakhinggaan Fungsi Aljabar & Trigonometri", slug: "limit-di-ketakhinggaan" },
      { title: "Kekontineuan Fungsi", slug: "kekontinuan-fungsi" },
    ],
  },
  {
    title: "Turunan Fungsi Trigonometri (Peminatan MIPA)",
    slug: "turunan-fungsi-trigonometri",
    subtopics: [
      { title: "Turunan Fungsi Trigonometri dasar dan aturan rantai", slug: "turunan-trigonometri-dan-aturan-rantai" },
      { title: "Garis Singgung dan Garis Normal Kurva Trigonometri", slug: "garis-singgung-dan-garis-normal" },
      { title: "Kecekungan Kurva dan Pengaplikasian Turunan Trigonometri", slug: "kecekungan-kurva" },
    ],
  },
  {
    title: "Integral Fungsi Trigonometri & Teknik Pengintegralan (Peminatan MIPA)",
    slug: "integral-fungsi-trigonometri",
    subtopics: [
      { title: "Integral Fungsi Trigonometri", slug: "integral-fungsi-trigonometri" },
      { title: "Teknik Pengintegralan (Integral Substitusi dan Integral Parsial)", slug: "teknik-pengintegralan" },
      { title: "Penerapan Integral: Luas Daerah dan Volume Benda Putar", slug: "penerapan-integral-luas-dan-volume" },
    ],
  },
  {
    title: "Irisan Kerucut (Peminatan MIPA)",
    slug: "irisan-kerucut",
    subtopics: [
      { title: "Parabola, Elips, dan Hiperbola (Persamaan dan Sifat-Sifat Geometrisnya)", slug: "parabola-elips-dan-hiperbola" },
      { title: "Penerapan Irisan Kerucut dalam Kehidupan Nyata", slug: "penerapan-irisan-kerucut" },
    ],
  },
  {
    title: "Geometri Analitik / Vektor Dimensi Tiga (Lanjutan)",
    slug: "geometri-analitik-vektor-dimensi-tiga",
    subtopics: [
      { title: "Persamaan Garis dan Bidang Datar dalam Ruang Tiga Dimensi", slug: "persamaan-garis-dan-bidang-datar" },
      { title: "Aplikasi Vektor pada Pemodelan Geometri Ruang", slug: "aplikasi-vektor-pemodelan-geometri-ruang" },
    ],
  },
];

export const getSmaTopic = (slug: string | undefined) =>
  SMA_TOPICS.find((topic) => topic.slug === slug);