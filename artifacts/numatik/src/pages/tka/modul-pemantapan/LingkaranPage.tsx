import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";
import { getTkaContohSoal } from "@/data/tkaContohSoal";

const questionImage = (src: string, alt: string) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    decoding="async"
    className="mx-auto block h-auto max-h-[380px] w-full max-w-[380px] rounded-lg bg-white object-contain"
  />
);

const materiSections: MateriSection[] = [
  { heading: "A. Unsur-unsur Lingkaran", content: `- Pusat (O): titik yang berjarak sama dari semua titik pada lingkaran\n- Jari-jari (r): jarak dari pusat ke tepi lingkaran\n- Diameter (d): dua kali jari-jari, $d = 2r$\n- Busur: bagian keliling lingkaran\n- Tali busur: garis lurus menghubungkan dua titik pada lingkaran\n- Apotema: jarak terpendek dari pusat ke tali busur\n- Juring (sektor): daerah antara dua jari-jari dan busur\n- Tembereng: daerah antara tali busur dan busur` },
  { heading: "B. Keliling dan Luas Lingkaran", content: `Keliling (K): $K = 2\\pi r = \\pi d$\n\nLuas (L): $L = \\pi r^2$\n\nDengan $\\pi \\approx \\frac{22}{7}$ atau $\\pi \\approx 3,14$` },
  { heading: "C. Panjang Busur dan Luas Juring", content: `Panjang busur (PB) dengan sudut pusat α:\n$PB = \\dfrac{\\alpha}{360°} \\times 2\\pi r$\n\nLuas juring (LJ):\n$LJ = \\dfrac{\\alpha}{360°} \\times \\pi r^2$\n\nLuas tembereng:\n$L_{tembereng} = L_{juring} - L_{segitiga}$` },
  { heading: "D. Hubungan Sudut Pusat dan Sudut Keliling", content: `Sudut keliling yang menghadap busur yang sama:\n$\\angle keliling = \\dfrac{1}{2} \\angle pusat$\n\nSemua sudut keliling yang menghadap busur yang sama adalah sama besar.\n\nSudut keliling yang menghadap diameter = 90°` },
  { heading: "E. Garis Singgung Lingkaran", content: `Garis singgung lingkaran adalah garis yang hanya menyentuh lingkaran di satu titik (titik singgung).\n\nSifat: Garis singgung tegak lurus jari-jari di titik singgung.\n\nDua garis singgung dari titik luar:\n$PT^2 = PO^2 - r^2$\n\nGaris singgung persekutuan luar dua lingkaran:\n$d^2 = p^2 - (R-r)^2$\n\nGaris singgung persekutuan dalam:\n$d^2 = p^2 - (R+r)^2$\n\nDimana $p$ = jarak antar pusat, $R$ = jari-jari besar, $r$ = jari-jari kecil.` },
];

const latihanDasarTka: LatihanSoal[] = [
  { no: 1, soal: "Perhatikan gambar!\nJika O adalah pusat lingkaran, jika r = 21 cm dan $\\pi = \\frac{22}{7}$, maka luas daerah yang diarsir adalah ...", options: ["A. 77 $cm^2$", "B. 154 $cm^2$", "C. 231 $cm^2$", "D. 308 $cm^2$"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1790922970/Gemini_Generated_Image_6d5hfl6d5hfl6d5h_zndphm.jpg", "Gambar untuk soal Lingkaran nomor 1") },
  { no: 3, soal: "Perhatikanlah gambar berikut.\nDiketahui O adalah titik pusat lingkaran. Jika panjang busur QR = 60 cm, panjang busur PQ adalah...", options: ["A. 40 cm", "B. 45 cm", "C. 50 cm", "D. 55 cm"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1790924260/no_3_w6voed.jpg", "Gambar untuk soal Lingkaran nomor 2") },
  { no: 4, soal: "Perhatikan gambar!\nJika luas juring ORS = 60 $cm^2$, luas juring OPQ adalah...", options: ["A. 40 $cm^2$", "B. 75 $cm^2$", "C. 90 $cm^2$", "D. 105 $cm^2$"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1790924845/Gemini_Generated_Image_ym1vvvym1vvvym1v_q9c6im.jpg", "Gambar untuk soal Lingkaran nomor 3") },
  {
    no: 5,
    type: "pgk",
    soal: "Pada lingkaran berpusat O, $\\angle AOB=35°$, $\\angle COD=140°$, dan panjang busur AB adalah 14 cm. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "$\\angle AOB=35°$.",
      "$\\angle COD=140°$.",
      "Perbandingan panjang busur AB dan CD adalah $1:4$.",
      "Panjang busur CD adalah 42 cm.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "(1) dan (2) sesuai data soal. (3) Pada lingkaran yang sama, perbandingan panjang busur sama dengan perbandingan sudut pusat: $35:140=1:4$. (4) Salah; panjang busur CD adalah $14\\times4=56$ cm.",
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117321/LINGKARAN_-_LATIHAN_DASAR_-_NO_5_lrmbny.png", "Gambar untuk soal Lingkaran nomor 4"),
  },
  {
    no: 6,
    type: "pgk",
    soal: "Gambar menunjukkan persegi sisi 21 cm dan setengah lingkaran berdiameter 21 cm. Gunakan $\\pi=\\frac{22}{7}$. Pilih semua pernyataan yang benar tentang luas daerah yang diarsir.",
    pernyataan: [
      "Luas persegi adalah 441 cm².",
      "Jari-jari setengah lingkaran adalah 10,5 cm.",
      "Luas setengah lingkaran adalah 173,25 cm².",
      "Luas seluruh daerah yang diarsir adalah 718,2 cm².",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "(1) $21\\times21=441$ cm². (2) Jari-jari adalah setengah diameter, yaitu $21\\div2=10{,}5$ cm. (3) Luas setengah lingkaran $=\\frac12\\times\\frac{22}{7}\\times10{,}5^2=173{,}25$ cm². (4) Salah; luas total $441+173{,}25=614{,}25$ cm².",
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1790933731/Gemini_Generated_Image_lz987dlz987dlz98_f6eocj.jpg", "Gambar untuk soal Lingkaran nomor 5"),
  },
  {
    no: 7,
    type: "pgk",
    soal: "Gambar menunjukkan persegi sisi 14 cm dengan dua seperempat lingkaran berjari-jari 7 cm tidak termasuk daerah arsir. Pilih semua pernyataan yang benar tentang luas daerah arsir.",
    pernyataan: [
      "Luas persegi adalah 196 cm².",
      "Dua seperempat lingkaran itu setara dengan setengah lingkaran berjari-jari 7 cm.",
      "Luas kedua bagian yang tidak diarsir adalah 77 cm², jika $\\pi=\\frac{22}{7}$.",
      "Luas daerah arsir adalah 112 cm².",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "(1) $14^2=196$ cm². (2) Dua seperempat lingkaran membentuk setengah lingkaran. (3) Luasnya $\\frac12\\times\\frac{22}{7}\\times7^2=77$ cm². (4) Salah; luas arsir $196-77=119$ cm².",
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117317/LINGKARAN_-_LATIHAN_DASAR_-_NO_7_vcwarn.png", "Gambar untuk soal Lingkaran nomor 6"),
  },
  {
    no: 8,
    type: "pgk",
    soal: "Perhatikan gambar keliling daerah arsir. Jari-jari setengah lingkaran kecil yang ditunjukkan adalah 10 cm. Gunakan $\\pi=3{,}14$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Panjang busur setengah lingkaran berjari-jari 10 cm adalah $10\\pi=31{,}4$ cm.",
      "Keliling lingkaran penuh berjari-jari 10 cm adalah $20\\pi=62{,}8$ cm.",
      "Angka 10 cm pada gambar menunjukkan diameter, sehingga jari-jarinya 5 cm.",
      "Ruas diameter yang berada di dalam gambar harus ditambahkan ke keliling daerah arsir.",
    ],
    jawabanPGK: [0, 1],
    pembahasan: "Panjang busur setengah lingkaran adalah $\\pi r$, sehingga untuk $r=10$ cm panjangnya $10\\pi=31{,}4$ cm. Keliling lingkaran penuh adalah $2\\pi r=20\\pi=62{,}8$ cm. Pada gambar, 10 cm adalah jari-jari (ditunjukkan sampai pusat), bukan diameter. Ruas diameter di bagian dalam bukan batas luar daerah arsir.",
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117317/LINGKARAN_-_LATIHAN_DASAR_-_NO_8_ajunfu.png", "Gambar untuk soal Lingkaran nomor 7"),
  },
  {
    no: 9,
    type: "pgk",
    soal: "Keliling daerah arsir pada gambar terdiri atas satu busur setengah lingkaran berdiameter 28 cm dan dua busur setengah lingkaran berdiameter 14 cm. Gunakan $\\pi=\\frac{22}{7}$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Panjang busur besar adalah $14\\pi=44$ cm.",
      "Panjang setiap busur kecil adalah $7\\pi=22$ cm.",
      "Jumlah panjang ketiga busur adalah $28\\pi=88$ cm.",
      "Kedua ruas diameter di dalam daerah arsir ikut dihitung sebagai bagian keliling.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Busur setengah lingkaran berdiameter 28 cm panjangnya $\\frac12\\pi(28)=14\\pi=44$ cm. Setiap busur berdiameter 14 cm panjangnya $7\\pi=22$ cm. Jumlahnya $44+22+22=88$ cm. Ruas diameter berada di dalam bangun, bukan pada batas daerah arsir.",
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117317/LINGKARAN_-_LATIHAN_DASAR_-_NO_9_r5kf7m.png", "Gambar untuk soal Lingkaran nomor 8"),
  },
  {
    no: 10,
    type: "pgkbs",
    soal: "Gambar menunjukkan tembereng dari juring 90° dengan jari-jari 10 cm. Gunakan $\\pi=3{,}14$. Tentukan Benar (B) atau Salah (S) untuk setiap pernyataan.",
    pernyataan: [
      "Luas juring 90° adalah 78,5 cm².",
      "Luas segitiga yang dibentuk oleh dua jari-jari adalah 50 cm².",
      "Luas tembereng yang diarsir adalah 50 cm².",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Luas juring $=\\frac{90}{360}\\times3{,}14\\times10^2=78{,}5$ cm². Luas segitiga siku-siku $=\\frac12\\times10\\times10=50$ cm². Luas tembereng adalah selisihnya, $78{,}5-50=28{,}5$ cm², sehingga pernyataan (3) salah.",
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117317/LINGKARAN_-_LATIHAN_DASAR_-_NO_10_rhascv.jpg", "Gambar untuk soal Lingkaran nomor 9"),
  },
  {
    no: 11,
    type: "pgkbs",
    soal: "Bangun pada gambar dibatasi dua busur setengah lingkaran berdiameter 26 cm dan 14 cm serta dua ruas garis lurus. Tentukan Benar (B) atau Salah (S) untuk setiap pernyataan.",
    pernyataan: [
      "Jumlah panjang kedua busur setengah lingkaran adalah $20\\pi$ cm.",
      "Jumlah panjang dua ruas garis lurus adalah selisih diameter, yaitu 12 cm.",
      "Dengan $\\pi=3{,}14$, keliling bangun adalah 80 cm.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Dua busur setengah lingkaran panjangnya $\\frac12\\pi(26)+\\frac12\\pi(14)=20\\pi=62{,}8$ cm. Jumlah ruas garis lurus adalah $26-14=12$ cm. Jadi kelilingnya $62{,}8+12=74{,}8$ cm, bukan 80 cm.",
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117317/LINGKARAN_-_LATIHAN_DASAR_-_NO_11_jsb1wy.png", "Gambar untuk soal Lingkaran nomor 10"),
  },
  { no: 12, soal: "Perhatikan gambar berikut\nJika total luas bangun di atas 480 $cm^2$, maka luas daerah persegi adalah ...", options: ["A. 24 $cm^2$", "B. 56 $cm^2$", "C. 72 $cm^2$", "D. 84 $cm^2$"] },
  { no: 13, soal: "Perhatikan gambar persegipanjang dan lingkaran berikut!\nDiketahui A dan B adalah pusat dua lingkaran yang kongruen dan saling bersinggungan luar. ABQP adalah persegi panjang. Luas daerah yang diarsir seluruhnya adalah 1.316 $cm^2$. Luas persegi panjang ABQP adalah....($\\pi = \\frac{22}{7}$)", options: ["A. 196 $cm^2$", "B. 392 $cm^2$", "C. 492 $cm^2$", "D. 512 $cm^2$"] },
  { no: 14, soal: "Perhatikan gambar di samping ini!\nDiketahui O adalah titik pusat lingkaran. Besar sudut AOB adalah ....", options: ["A. 15°", "B. 30°", "C. 45°", "D. 60°"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_14_j7zoga.png", "Gambar untuk soal Lingkaran nomor 11") },
  {
    no: 15,
    type: "pgkbs",
    soal: "Pada gambar, O adalah pusat lingkaran dan $\\angle ACE=30°$. Diketahui pula $\\angle ABE+\\angle ACE+\\angle ADE=96°$. Tentukan Benar (B) atau Salah (S) untuk setiap pernyataan.",
    pernyataan: [
      "$\\angle ACE=30°$.",
      "$\\angle AOE=60°$.",
      "$\\angle AOE=96°$.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Sudut $ACE=30°$ adalah sudut keliling yang menghadap busur AE. Sudut pusat yang menghadap busur yang sama dua kali sudut keliling, sehingga $\\angle AOE=2(30°)=60°$. Jadi pernyataan (1) dan (2) benar, sedangkan (3) salah.",
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_15_sh0acg.png", "Gambar untuk soal Lingkaran nomor 12"),
  },
  { no: 16, soal: "Perhatikan gambar di bawah ini!,\nBesar $\\angle OAD = 20^0$, besar $\\angle OBD = 30^0$, maka besar sudut BOC adalah ....", options: ["A. $50^0$", "B. $70^0$", "C. $80^0$", "D. $100^0$"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_16_lhj6d3.png", "Gambar untuk soal Lingkaran nomor 13") },
  { no: 17, soal: "Pada gambar di bawah ini diketahui besar $\\angle AOC = 82^0$.\nBesar sudut $\\angle BDC$ adalah ...", options: ["A. $41^0$", "B. $49^0$", "C. $82^0$", "D. $98^0$"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_17_m7qqc2.png", "Gambar untuk soal Lingkaran nomor 14") },
  { no: 18, soal: "Perhatikan gambar berikut!\nJika besar sudut AOC = $112^0$, maka besar sudut ABC adalah ....", options: ["A. $124^0$", "B. $114^0$", "C. $68^0$", "D. $56^0$"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_18_z7fcwd.png", "Gambar untuk soal Lingkaran nomor 15") },
  {
    no: 19,
    type: "pgkbs",
    soal: "Pada lingkaran pada gambar, AD adalah diameter, titik X adalah perpotongan AC dan BD, $\\angle ADB=28°$, dan $\\angle AXB=60°$. Tentukan Benar (B) atau Salah (S) untuk setiap pernyataan.",
    pernyataan: [
      "$\\angle BAC=30°$.",
      "$\\angle ADC=58°$.",
      "$\\angle DAC=58°$.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "$\\angle ADB=28°$ memberi busur AB sebesar $56°$. Karena $\\angle AXB=60°$, jumlah busur AB dan CD adalah $120°$, jadi busur CD $64°$. Pada setengah lingkaran AD, busur BC $=180°-56°-64°=60°$, sehingga $\\angle BAC=30°$. Selanjutnya $\\angle ADC=58°$ dan, karena AD diameter, $\\angle ACD=90°$ sehingga $\\angle DAC=32°$. Maka pernyataan (1) dan (2) benar, sedangkan (3) salah.",
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_19_tbdvkh.png", "Gambar untuk soal Lingkaran nomor 16"),
  },
  {
    no: 20,
    type: "pgkbs",
    soal: "Pada segiempat tali busur ABCD pada gambar, sudut luar di C adalah 100° dan $\\angle ABC=74°$. Tentukan Benar (B) atau Salah (S) untuk setiap pernyataan.",
    pernyataan: [
      "$\\angle DCB=80°$.",
      "$\\angle BAD=100°$.",
      "$\\angle ADC=74°$.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Sudut dalam $DCB$ berpelurus dengan sudut luar 100°, jadi $DCB=80°$. Sudut berhadapan pada segiempat tali busur berjumlah 180°, sehingga $BAD=180°-80°=100°$ dan $ADC=180°-74°=106°$. Jadi pernyataan (1) dan (2) benar, sedangkan (3) salah.",
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117315/LINGKARAN_-_LATIHAN_DASAR_-_NO_20_hgibte.png", "Gambar untuk soal Lingkaran nomor 17"),
  },
  { no: 21, soal: "Perhatikan gambar berikut!\nJika besar sudut COD = $48^0$, maka besar sudut ABC adalah ....", options: ["A. $132^0$", "B. $124^0$", "C. $122^0$", "D. $114^0$"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117315/LINGKARAN_-_LATIHAN_DASAR_-_NO_21_tixnhi.png", "Gambar untuk soal Lingkaran nomor 18") },
  { no: 22, soal: "Ayah akan membuat taman berbentuk lingkaran dengan jari-jari 35 m. Di sekeliling taman akan ditanami pohon cemara dengan jarak 1 m. Jika satu pohon memerlukan biaya Rp 25.000,00, seluruh biaya penanaman pohon cemara adalah....", options: ["A. Rp 5.900.000,00", "B. Rp 5.700.000,00", "C. Rp 5.500.000,00", "D. Rp 5.200.000,00"] },
  { no: 23, soal: "Sebuah roda yang berdiameter 50 cm berputar 60 kali. Jika $\\pi = 3,14$, maka jarak yang ditempuh adalah ....", options: ["A. 94,2 m", "B. 942 m", "C. 47,1 m", "D. 471 m"] },
  { no: 24, soal: "Sebuah roda berputar 40 kali menempuh jarak 52,8 m. Jika $\\pi = 22/7$, maka jari-jari roda tersebut adalah ....", options: ["A. 14 cm", "B. 21 cm", "C. 28 cm", "D. 42 cm"] },
  { no: 25, soal: "Seorang pengusaha akan membuat bianglala seperti yang ada di Dufan.\nJika tempat duduk pada bianglala sebanyak 44 buah dan masing-masing tempat duduk berjarak 3 m, berapakah panjang jari-jari bianglala?", options: ["A. 7 m", "B. 10,5 m", "C. 14 m", "D. 21 m"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_25_dpuwuu.png", "Gambar untuk soal Lingkaran nomor 22") },
  { no: 26, soal: "Perhatikan gambar berikut!\nKolam ikan Pak Arvin tampak seperti gambar di atas. Jika di sekeliling akan dipagari dengan kawat berduri dua kali putaran, maka dibutuhkan kawat berduri minimum sepanjang......", options: ["A. 72 m", "B. 86 m", "C. 144 m", "D. 172 m"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117315/LINGKARAN_-_LATIHAN_DASAR_-_NO_26_nicwq1.png", "Gambar untuk soal Lingkaran nomor 23") },
  { no: 27, soal: "Sebuah tonggak ditengah lapangan rumput berbentuk persegipanjang berukuran 15 m x 20 m. Seekor kambing diikat di tonggak dengan tali yang panjangnya 7 m. Berapa luas lapangan yang rumputnya tidak termakan kambing?", options: ["A. 100 $m^2$", "B. 146 $m^2$", "C. 154 $m^2$", "D. 300 $m^2$"] },
  { no: 28, soal: "Perhatikan gambar berikut!\nKolam pak Tedi bentuk dan ukuran Nampak seperti gambar.\nJika keliling kolam diberi pagar kawat dua kali putaran, maka dibutuhkan kawat minimum sepanjang ....", options: ["A. 66 m", "B. 88 m", "C. 132 m", "D. 180 m"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117315/LINGKARAN_-_LATIHAN_DASAR_-_NO_28_fko8kg.png", "Gambar untuk soal Lingkaran nomor 25") },
].filter((soal) => soal.no !== 12 && soal.no !== 13)
  .map((soal, index) => ({ ...soal, no: index + 1 }));

const LingkaranPage = () => (
  <TKAPemantapanLayout
    title="LINGKARAN"
    materiSections={materiSections}
    contohSoal={getTkaContohSoal("lingkaran")}
    latihanDasar={latihanDasarTka}
    imageScale="responsiveHalf"
    diagramBeforeStatements
  />
);

export default LingkaranPage;
