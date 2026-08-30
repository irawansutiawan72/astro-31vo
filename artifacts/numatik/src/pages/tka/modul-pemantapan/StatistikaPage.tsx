import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { LatihanSoal } from "@/components/tka/TKAPemantapanLayout";
import { statistikaContohSoal, statistikaContohSvgMap } from "@/data/statistikaContohSoal";
import {
  renderDasarVisual,
  materiSections,
} from "@/pages/OlimpiadeStatistikaPage";

const latihanDasar: LatihanSoal[] = [
  {
    "no": 1,
    "soal": "Perhatikan tabel berikut!\nPernyataan yang benar dari tabel di atas adalah ...",
    "options": [
      "A. Modus dari data 5",
      "B. Median data 6,5",
      "C. Rata-rata data 6,6",
      "D. Jangkauan data 6"
    ],
    "type": "pgk",
    "pernyataan": [
      "Modus data tersebut adalah 5.",
      "Median data tersebut adalah 6,5.",
      "Rata-rata data tersebut adalah 6,5.",
      "Jangkauan data tersebut adalah 6."
    ],
    "jawabanPGK": [
      0,
      1,
      2
    ],
    "jawaban": "B",
    "pembahasan": "Hitung semua ukuran statistik: mean, modus, median, dan jangkauan. Lalu verifikasi pernyataan mana yang benar.\n\nTotal = 30 data\nMean = $\\frac{6+20+25+18+28+32+36+30}{30} = \\frac{195}{30} = 6{,}5$\nKumulatif: 2, 7, 12, 15, 19, ... → data ke-15 = nilai 6, ke-16 = nilai 7\nMedian = $\\frac{6+7}{2} = 6{,}5$ ✓\n\nJika soal meminta pernyataan yang benar/salah, hitung semua ukuran lalu bandingkan satu per satu.\n\nMedian data adalah 6,5 (sama dengan mean). Pernyataan B adalah yang benar."
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
      "Pasti setengah murid berada di bawah 130 cm dan setengah lainnya di atas 130 cm."
    ],
    "jawabanPGK": [
      1
    ],
    "pembahasan": "Pernyataan tentang statistik: mean tidak harus sama dengan median. Periksa pernyataan B: jika ada 23 anak setinggi tepat 130 cm dan 1 anak 133 cm, tinggi anak ke-25 bisa dihitung dari total.\n\nTotal tinggi = 25 × 130 = 3250 cm\nJika 23 anak @ 130 cm, 1 anak @ 133 cm:\nTotal 24 anak = 23×130 + 133 = 3123 cm\nTinggi anak ke-25 = 3250 − 3123 = 127 cm ✓\nPernyataan B terbukti benar.\n\nUntuk membuktikan pernyataan tentang data statistik, cari contoh konkret yang memenuhi kondisi tersebut.\n\nPernyataan B adalah yang pasti benar: satu anak memiliki tinggi 127 cm jika kondisi lainnya terpenuhi."
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
    "soal": "Dua kelompok tani, Kelompok A dan Kelompok B, mencatat hasil panen jagung. Rata-rata hasil panen Kelompok A adalah 6 ton, sedangkan Kelompok B adalah 9 ton. Jika 1 orang dari masing-masing kelompok saling bertukar tempat, rata-rata hasil panen kedua kelompok menjadi sama. Selisih hasil panen kedua orang yang bertukar tempat tersebut adalah ....",
    "options": [
      "A. 3,6 ton",
      "B. 4,2 ton",
      "C. 5,0 ton",
      "D. 6,0 ton"
    ],
    "jawaban": "A",
    "pembahasan": "Jawaban Akhir: A. 3,6 ton\n\nKonsep & Trik: Gunakan persamaan kesamaan rata-rata baru setelah terjadi pertukaran nilai $x$ dan $y$.\n\nStep by Step:\nTotal awal: $S_A = 10 \\times 6 = 60$ ton; $S_B = 15 \\times 9 = 135$ ton.\nRata-rata baru sama: $\\frac{60 - x + y}{10} = \\frac{135 - y + x}{15}$.\nSederhanakan: $3(60 - x + y) = 2(135 - y + x)$ sehingga $5(y-x)=18$.\nSelisih $y-x = 3{,}6$ ton.",
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
    "soal": "Data hasil seleksi penerimaan karyawan disajikan dalam tabel distribusi frekuensi berikut.\n[DIAGRAM]\nPanitia menetapkan bahwa peserta yang dinyatakan lulus adalah mereka yang memiliki nilai lebih besar dari rata-rata. Jika rata-rata nilai tes adalah 70,2, jumlah peserta yang diterima adalah ....",
    "options": [
      "A. 15 orang",
      "B. 18 orang",
      "C. 24 orang",
      "D. 30 orang"
    ],
    "jawaban": "C",
    "pembahasan": "Jawaban Akhir: C. 24 orang\n\nKonsep & Trik: Cari nilai variabel $x$ terlebih dahulu dari rumus rata-rata keseluruhan.\n\nStep by Step:\n$\\frac{5.820 + 80x}{85 + x} = 70{,}2 \\implies 5.820 + 80x = 5.967 + 70{,}2x$.\n$9{,}8x = 147 \\implies x = 15$.\nPeserta lulus = nilai $> 70{,}2$ → $x + 4 + 5 = 15 + 4 + 5 = 24$ orang.",
    "type": "pg"
  },
  {
    "no": 14,
    "soal": "Diagram lingkaran menunjukkan kegemaran siswa terhadap mata pelajaran berikut.\n[DIAGRAM]\nJika jumlah siswa seluruhnya 240 orang, jumlah siswa yang gemar Penjas adalah ...",
    "options": [
      "A. 76 orang",
      "B. 90 orang",
      "C. 104 orang",
      "D. 156 orang"
    ],
    "type": "pgkbs",
    "pernyataan": [
      "Besar sudut sektor Penjas adalah 156°.",
      "Bagian siswa yang gemar Penjas adalah 13/30 dari seluruh siswa.",
      "Jumlah siswa yang gemar Penjas adalah 104 orang."
    ],
    "jawabanBS": [
      "B",
      "B",
      "B"
    ],
    "jawaban": "C",
    "pembahasan": "Pada diagram lingkaran, jumlah semua sudut = 360°. Cari sudut sektor Penjas, lalu hitung proporsinya dari total.\n\nSudut Penjas = 360° − (30°+54°+48°+72°) = 360° − 204° = 156°\nBanyak siswa Penjas = $\\frac{156}{360} \\times 240 = 104$ orang\n\nJumlah semua sudut = 360°. Cari sudut yang belum diketahui dengan pengurangan.\n\nBanyak siswa yang gemar Penjas = 104 orang."
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
    "soal": "Diagram garis menunjukkan penyusutan harga mobil setelah dipakai dalam kurun waktu 5 tahun.\n[DIAGRAM]\nBesarnya penyusutan antara tahun 2015 dan 2016 adalah ...",
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
      "Persentase penyusutan terhadap harga tahun 2015 adalah 7,5%.",
      "Selisih harga tahun 2015 dan 2016 adalah Rp7.500.000,00."
    ],
    "jawabanPGK": [
      0,
      1,
      3
    ],
    "jawaban": "D",
    "pembahasan": "Penyusutan dalam satu tahun = harga tahun ini − harga tahun berikutnya. Baca nilai dari diagram garis.\n\nHarga 2015 = Rp 110.000.000\nHarga 2016 = Rp 102.500.000\nPenyusutan = 110.000.000 − 102.500.000 = Rp 7.500.000\n\nBaca diagram garis dengan teliti. Nilai di sumbu-y harus dibaca dengan tepat sesuai skala.\n\nPenyusutan harga mobil dari 2015 ke 2016 = Rp 7.500.000."
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
      "Penurunan pengunjung hanya terjadi pada hari ke-4.",
      "Pengunjung paling sedikit terjadi pada hari pertama.",
      "Total seluruh pengunjung pameran selama 6 hari adalah 1.150 orang."
    ],
    "jawabanPGK": [
      1,
      2,
      3
    ],
    "pembahasan": "Jawaban Akhir: Penurunan pengunjung hanya terjadi pada hari ke-4 (Benar); pengunjung paling sedikit terjadi pada hari pertama (Benar); total seluruh pengunjung selama 6 hari adalah 1.150 orang (Benar).\n\nStep by Step Penyelesaian:\n1. Hitung lonjakan harian: H1–H2 naik 100; H2–H3 naik 100; H3–H4 turun 50; H4–H5 naik 30; H5–H6 naik 40.\n2. Kenaikan tertinggi di H1–H2 dan H2–H3 bernilai sama (100 orang), sehingga pernyataan pertama tidak tepat.\n3. Penurunan grafik hanya tampak dari H3 ke H4 → Benar.\n4. Nilai terendah di H1 (50 orang) → Benar.\n5. Total = $50 + 150 + 250 + 200 + 230 + 270 = 1.150\\text{ orang}$ → Benar."
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
      "A. 23",
      "B. 25",
      "C. 26",
      "D. 27"
    ],
    "jawaban": "B",
    "pembahasan": "Jawaban Akhir: B. 25\n\nKonsep & Trik: Tentukan letak posisi data $Q_1$ pada data ke-$\\frac{N+1}{4}$ dan $Q_3$ pada data ke-$\\frac{3(N+1)}{4}$.\n\nStep by Step:\nTotal data $N = 3 + 6 + 10 + 11 + 8 + 2 = 40$.\nPosisi $Q_1 = \\frac{1}{4}(40 + 1) = 10{,}25$ → bernilai 12.\nPosisi $Q_3 = \\frac{3}{4}(40 + 1) = 30{,}75$ → bernilai 13.\nJumlah $Q_1 + Q_3 = 12 + 13 = 25$.",
    "type": "pg"
  },
  {
    "no": 25,
    "type": "pgkbs",
    "soal": "Tabel nilai ujian seleksi pegawai disajikan dalam tabel frekuensi berikut.\n[DIAGRAM]\nTentukan status Benar / Salah untuk setiap pernyataan.",
    "pernyataan": [
      "Kuartil atas nilai tes pegawai adalah 800.",
      "Simpangan kuartil nilai tes pegawai adalah 50.",
      "Median dari nilai tes pegawai adalah 750."
    ],
    "jawabanBS": [
      "B",
      "B",
      "B"
    ],
    "pembahasan": "Jawaban Akhir: Kuartil atas 800 (Benar); simpangan kuartil 50 (Benar); median 750 (Benar).\n\nStep by Step:\nTotal frekuensi $N = 3 + 6 + 7 + 8 + 4 + 2 = 30$.\nMedian ($Q_2$): rata-rata data ke-15 dan ke-16, keduanya bernilai 750.\nKuartil bawah ($Q_1$) = data ke-8 = 700. Kuartil atas ($Q_3$) = data ke-23 = 800.\nSimpangan kuartil: $\\frac{Q_3 - Q_1}{2} = \\frac{800 - 700}{2} = 50$."
  }
];

const gambarMap = {
  1: renderDasarVisual(4),
  2: renderDasarVisual(41),
  4: renderDasarVisual(51),
  5: renderDasarVisual(60),
  8: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto/v1787612146/STATISTIKA_-_LATIHAN_DASAR_-_NO_13_fxctir.png",
  13: renderDasarVisual(15),
  14: renderDasarVisual(9),
  15: renderDasarVisual(10),
  16: renderDasarVisual(11),
  17: renderDasarVisual(19),
  18: renderDasarVisual(20),
  20: renderDasarVisual(22),
  21: renderDasarVisual(23),
  22: renderDasarVisual(24),
  23: renderDasarVisual(25),
  24: renderDasarVisual(26),
  25: renderDasarVisual(27),
};

const StatistikaPage = () => (
  <TKAPemantapanLayout
    title="STATISTIKA"
    materiSections={materiSections}
    contohSoal={statistikaContohSoal}
    soalSvgMap={statistikaContohSvgMap}
    latihanDasar={latihanDasar}
    gambarMap={gambarMap}
    imageScale="half"
    showImageSourceLinks={false}
  />
);

export default StatistikaPage;
