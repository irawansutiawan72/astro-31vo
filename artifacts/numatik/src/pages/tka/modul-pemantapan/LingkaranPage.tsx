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
  { no: 5, soal: "Pada suatu lingkaran dengan pusat O diketahui titik A, B, C, dan D pada keliling lingkaran, sehingga $\\angle AOB = 35°$ dan $\\angle COD = 140°$. Jika panjang busur AB = 14 cm, hitunglah panjang busur CD.", options: ["A. 28 cm", "B. 42 cm", "C. 56 cm", "D. 70 cm"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117321/LINGKARAN_-_LATIHAN_DASAR_-_NO_5_lrmbny.png", "Gambar untuk soal Lingkaran nomor 4") },
  { no: 6, soal: "Luas daerah yang diarsir pada gambar berikut adalah ...", options: ["A. 496,44 $cm^2$", "B. 718,2 $cm^2$", "C. 992,88 $cm^2$", "D. 1827 $cm^2$"] },
  { no: 7, soal: "Luas daerah yang diarsir pada gambar berikut adalah ...", options: ["A. 59,5 $cm^2$", "B. 112 $cm^2$", "C. 119 $cm^2$", "D. 224 $cm^2$"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117317/LINGKARAN_-_LATIHAN_DASAR_-_NO_7_vcwarn.png", "Gambar untuk soal Lingkaran nomor 6") },
  { no: 8, soal: "Keliling daerah yang diarsir pada gambar berikut adalah ...", options: ["A. 47,1 cm", "B. 62,8 cm", "C. 78,5 cm", "D. 94,2 cm"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117317/LINGKARAN_-_LATIHAN_DASAR_-_NO_8_ajunfu.png", "Gambar untuk soal Lingkaran nomor 7") },
  { no: 9, soal: "Keliling daerah yang diarsir pada gambar berikut adalah ...", options: [], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117317/LINGKARAN_-_LATIHAN_DASAR_-_NO_9_r5kf7m.png", "Gambar untuk soal Lingkaran nomor 8") },
  { no: 10, soal: "Luas daerah yang diarsir pada gambar berikut adalah ...", options: [], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117317/LINGKARAN_-_LATIHAN_DASAR_-_NO_10_rhascv.jpg", "Gambar untuk soal Lingkaran nomor 9") },
  { no: 11, soal: "Perhatikan gambar berikut!\nKeliling bangun tersebut adalah ...", options: ["A. 213,6 cm", "B. 221,2 cm", "C. 253,6 cm.", "D. 267,6 cm"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117317/LINGKARAN_-_LATIHAN_DASAR_-_NO_11_jsb1wy.png", "Gambar untuk soal Lingkaran nomor 10") },
  { no: 12, soal: "Perhatikan gambar berikut\nJika total luas bangun di atas 480 $cm^2$, maka luas daerah persegi adalah ...", options: ["A. 24 $cm^2$", "B. 56 $cm^2$", "C. 72 $cm^2$", "D. 84 $cm^2$"] },
  { no: 13, soal: "Perhatikan gambar persegipanjang dan lingkaran berikut!\nDiketahui A dan B adalah pusat dua lingkaran yang kongruen dan saling bersinggungan luar. ABQP adalah persegi panjang. Luas daerah yang diarsir seluruhnya adalah 1.316 $cm^2$. Luas persegi panjang ABQP adalah....($\\pi = \\frac{22}{7}$)", options: ["A. 196 $cm^2$", "B. 392 $cm^2$", "C. 492 $cm^2$", "D. 512 $cm^2$"] },
  { no: 14, soal: "Perhatikan gambar di samping ini!\nDiketahui O adalah titik pusat lingkaran. Besar sudut AOB adalah ....", options: ["A. 15°", "B. 30°", "C. 45°", "D. 60°"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_14_j7zoga.png", "Gambar untuk soal Lingkaran nomor 11") },
  { no: 15, soal: "Perhatikan gambar!\nTitik O adalah pusat lingkaran. Diketahui $\\angle ABE + \\angle ACE + \\angle ADE = 96°$ Besar $\\angle AOE$ adalah....", options: ["A. 32°", "B. 48°", "C. 64°", "D. 84°"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_15_sh0acg.png", "Gambar untuk soal Lingkaran nomor 12") },
  { no: 16, soal: "Perhatikan gambar di bawah ini!,\nBesar $\\angle OAD = 20^0$, besar $\\angle OBD = 30^0$, maka besar sudut BOC adalah ....", options: ["A. $50^0$", "B. $70^0$", "C. $80^0$", "D. $100^0$"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_16_lhj6d3.png", "Gambar untuk soal Lingkaran nomor 13") },
  { no: 17, soal: "Pada gambar di bawah ini diketahui besar $\\angle AOC = 82^0$.\nBesar sudut $\\angle BDC$ adalah ...", options: ["A. $41^0$", "B. $49^0$", "C. $82^0$", "D. $98^0$"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_17_m7qqc2.png", "Gambar untuk soal Lingkaran nomor 14") },
  { no: 18, soal: "Perhatikan gambar berikut!\nJika besar sudut AOC = $112^0$, maka besar sudut ABC adalah ....", options: ["A. $124^0$", "B. $114^0$", "C. $68^0$", "D. $56^0$"], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_18_z7fcwd.png", "Gambar untuk soal Lingkaran nomor 15") },
  { no: 19, soal: "Perhatikanlah gambar di bawah.\nHitunglah besar sudut $\\angle BAC$, $\\angle ADC$, $\\angle DAC$.", options: [], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_19_tbdvkh.png", "Gambar untuk soal Lingkaran nomor 16") },
  { no: 20, soal: "Perhatikanlah gambar di bawah,\nHitunglah besar $\\angle DCB$, $\\angle BAD$, $\\angle ADC$", options: [], gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117315/LINGKARAN_-_LATIHAN_DASAR_-_NO_20_hgibte.png", "Gambar untuk soal Lingkaran nomor 17") },
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
  />
);

export default LingkaranPage;
