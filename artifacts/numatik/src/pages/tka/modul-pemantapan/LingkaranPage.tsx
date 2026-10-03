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

const explain = (konsepTrik: string, steps: string, tips: string) =>
  `Konsep & Trik: ${konsepTrik}\n\nStep-by-Step Penyelesaian:\n${steps}\n\nTips: ${tips}`;

const materiSections: MateriSection[] = [
  { heading: "A. Unsur-unsur Lingkaran", content: `- Pusat (O): titik yang berjarak sama dari semua titik pada lingkaran\n- Jari-jari (r): jarak dari pusat ke tepi lingkaran\n- Diameter (d): dua kali jari-jari, $d = 2r$\n- Busur: bagian keliling lingkaran\n- Tali busur: garis lurus menghubungkan dua titik pada lingkaran\n- Apotema: jarak terpendek dari pusat ke tali busur\n- Juring (sektor): daerah antara dua jari-jari dan busur\n- Tembereng: daerah antara tali busur dan busur` },
  { heading: "B. Keliling dan Luas Lingkaran", content: `Keliling (K): $K = 2\\pi r = \\pi d$\n\nLuas (L): $L = \\pi r^2$\n\nDengan $\\pi \\approx \\frac{22}{7}$ atau $\\pi \\approx 3,14$` },
  { heading: "C. Panjang Busur dan Luas Juring", content: `Panjang busur (PB) dengan sudut pusat α:\n$PB = \\dfrac{\\alpha}{360°} \\times 2\\pi r$\n\nLuas juring (LJ):\n$LJ = \\dfrac{\\alpha}{360°} \\times \\pi r^2$\n\nLuas tembereng:\n$L_{tembereng} = L_{juring} - L_{segitiga}$` },
  { heading: "D. Hubungan Sudut Pusat dan Sudut Keliling", content: `Sudut keliling yang menghadap busur yang sama:\n$\\angle keliling = \\dfrac{1}{2} \\angle pusat$\n\nSemua sudut keliling yang menghadap busur yang sama adalah sama besar.\n\nSudut keliling yang menghadap diameter = 90°` },
  { heading: "E. Garis Singgung Lingkaran", content: `Garis singgung lingkaran adalah garis yang hanya menyentuh lingkaran di satu titik (titik singgung).\n\nSifat: Garis singgung tegak lurus jari-jari di titik singgung.\n\nDua garis singgung dari titik luar:\n$PT^2 = PO^2 - r^2$\n\nGaris singgung persekutuan luar dua lingkaran:\n$d^2 = p^2 - (R-r)^2$\n\nGaris singgung persekutuan dalam:\n$d^2 = p^2 - (R+r)^2$\n\nDimana $p$ = jarak antar pusat, $R$ = jari-jari besar, $r$ = jari-jari kecil.` },
];

const latihanDasarTka: LatihanSoal[] = [
  {
    no: 1,
    soal: "Perhatikan gambar!\nJika O adalah pusat lingkaran, jika r = 21 cm dan $\\pi = \\frac{22}{7}$, maka luas daerah yang diarsir adalah ...",
    options: ["A. 77 $cm^2$", "B. 154 $cm^2$", "C. 231 $cm^2$", "D. 308 $cm^2$"],
    jawaban: "B",
    pembahasan: explain(
      "Luas juring merupakan bagian dari luas lingkaran sesuai perbandingan sudut pusatnya terhadap 360°.",
      "1. Sudut juring pada gambar adalah 40° dan jari-jari 21 cm.\n2. Luas lingkaran penuh $=\\frac{22}{7}\\times21^2=1.386$ cm².\n3. Luas juring $=\\frac{40}{360}\\times1.386=154$ cm².",
      "Sederhanakan pecahan sudut $40/360$ menjadi $1/9$ sebelum mengalikan luas lingkaran."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1790922970/Gemini_Generated_Image_6d5hfl6d5hfl6d5h_zndphm.jpg", "Gambar untuk soal Lingkaran nomor 1"),
  },
  {
    no: 3,
    soal: "Perhatikanlah gambar berikut.\nDiketahui O adalah titik pusat lingkaran. Jika panjang busur QR = 60 cm, panjang busur PQ adalah...",
    options: ["A. 40 cm", "B. 45 cm", "C. 50 cm", "D. 55 cm"],
    jawaban: "A",
    pembahasan: explain(
      "Pada lingkaran yang sama, panjang busur berbanding lurus dengan sudut pusat yang menghadapinya.",
      "1. Sudut pusat QR = 75° dan sudut pusat PQ = 50°.\n2. Perbandingan busur PQ terhadap QR adalah $50:75=2:3$.\n3. Panjang busur PQ $=\\frac{50}{75}\\times60=40$ cm.",
      "Bandingkan sudut pusatnya; jari-jari tidak perlu dihitung karena kedua busur berada pada lingkaran yang sama."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1790924260/no_3_w6voed.jpg", "Gambar untuk soal Lingkaran nomor 2"),
  },
  {
    no: 4,
    soal: "Perhatikan gambar!\nJika luas juring ORS = 60 $cm^2$, luas juring OPQ adalah...",
    options: ["A. 40 $cm^2$", "B. 75 $cm^2$", "C. 90 $cm^2$", "D. 105 $cm^2$"],
    jawaban: "C",
    pembahasan: explain(
      "Dalam lingkaran yang sama, luas juring berbanding lurus dengan besar sudut pusatnya.",
      "1. Sudut juring ORS adalah 90° (tanda siku-siku), sedangkan sudut OPQ adalah 135°.\n2. Perbandingan luasnya $135/90=3/2$.\n3. Luas juring OPQ $=60\\times\\frac{3}{2}=90$ cm².",
      "Untuk dua juring dengan jari-jari sama, gunakan perbandingan sudut pusat dan luas secara langsung."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1790924845/Gemini_Generated_Image_ym1vvvym1vvvym1v_q9c6im.jpg", "Gambar untuk soal Lingkaran nomor 3"),
  },
  {
    no: 5,
    type: "pgk" as const,
    soal: "Pada lingkaran berpusat O, $\\angle AOB=35°$, $\\angle COD=140°$, dan panjang busur AB adalah 14 cm. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "$\\angle AOB=35°$.",
      "$\\angle COD=140°$.",
      "Perbandingan panjang busur AB dan CD adalah $1:4$.",
      "Panjang busur CD adalah 42 cm.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: explain(
      "Panjang busur pada satu lingkaran sebanding dengan sudut pusatnya.",
      "1. Pernyataan (1) dan (2) mengulang informasi yang diberikan, jadi keduanya benar.\n2. Rasio sudut pusat $35:140=1:4$, sehingga rasio busur AB:CD juga $1:4$.\n3. Jika busur AB = 14 cm, busur CD $=14\\times4=56$ cm; jadi pernyataan (4) yang menyebut 42 cm salah.",
      "Gunakan urutan rasio yang sama: sudut AB : sudut CD sama dengan panjang busur AB : panjang busur CD."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117321/LINGKARAN_-_LATIHAN_DASAR_-_NO_5_lrmbny.png", "Gambar untuk soal Lingkaran nomor 4"),
  },
  {
    no: 6,
    type: "pgk" as const,
    soal: "Gambar menunjukkan persegi sisi 21 cm dan setengah lingkaran berdiameter 21 cm. Gunakan $\\pi=\\frac{22}{7}$. Pilih semua pernyataan yang benar tentang luas daerah yang diarsir.",
    pernyataan: [
      "Luas persegi adalah 441 cm².",
      "Jari-jari setengah lingkaran adalah 10,5 cm.",
      "Luas setengah lingkaran adalah 173,25 cm².",
      "Luas seluruh daerah yang diarsir adalah 718,2 cm².",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: explain(
      "Pisahkan bangun gabungan menjadi persegi dan setengah lingkaran, lalu jumlahkan luas bagian yang diarsir.",
      "1. Luas persegi $=21\\times21=441$ cm².\n2. Jari-jari setengah lingkaran $=21\\div2=10{,}5$ cm.\n3. Luas setengah lingkaran $=\\frac12\\times\\frac{22}{7}\\times10{,}5^2=173{,}25$ cm².\n4. Total luas $=441+173{,}25=614{,}25$ cm². Jadi pernyataan (1), (2), dan (3) benar; (4) salah.",
      "Pastikan panjang 21 cm pada gambar adalah diameter setengah lingkaran sebelum mencari jari-jari."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1790933731/Gemini_Generated_Image_lz987dlz987dlz98_f6eocj.jpg", "Gambar untuk soal Lingkaran nomor 5"),
  },
  {
    no: 7,
    type: "pgk" as const,
    soal: "Gambar menunjukkan persegi sisi 14 cm dengan dua seperempat lingkaran berjari-jari 7 cm tidak termasuk daerah arsir. Pilih semua pernyataan yang benar tentang luas daerah arsir.",
    pernyataan: [
      "Luas persegi adalah 196 cm².",
      "Dua seperempat lingkaran itu setara dengan setengah lingkaran berjari-jari 7 cm.",
      "Luas kedua bagian yang tidak diarsir adalah 77 cm², jika $\\pi=\\frac{22}{7}$.",
      "Luas daerah arsir adalah 112 cm².",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: explain(
      "Luas arsir diperoleh dengan mengurangkan luas bagian lingkaran yang tidak diarsir dari luas persegi.",
      "1. Luas persegi $=14^2=196$ cm².\n2. Dua seperempat lingkaran sama dengan setengah lingkaran berjari-jari 7 cm.\n3. Luas setengah lingkaran $=\\frac12\\times\\frac{22}{7}\\times7^2=77$ cm².\n4. Luas arsir $=196-77=119$ cm². Jadi pernyataan (1), (2), dan (3) benar; (4) salah.",
      "Gabungkan pecahan lingkaran terlebih dahulu agar perhitungan luas lebih singkat."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117317/LINGKARAN_-_LATIHAN_DASAR_-_NO_7_vcwarn.png", "Gambar untuk soal Lingkaran nomor 6"),
  },
  {
    no: 8,
    type: "pgk" as const,
    soal: "Perhatikan gambar keliling daerah arsir. Jari-jari setengah lingkaran kecil yang ditunjukkan adalah 10 cm. Gunakan $\\pi=3{,}14$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Panjang busur setengah lingkaran berjari-jari 10 cm adalah $10\\pi=31{,}4$ cm.",
      "Keliling lingkaran penuh berjari-jari 10 cm adalah $20\\pi=62{,}8$ cm.",
      "Angka 10 cm pada gambar menunjukkan diameter, sehingga jari-jarinya 5 cm.",
      "Ruas diameter yang berada di dalam gambar harus ditambahkan ke keliling daerah arsir.",
    ],
    jawabanPGK: [0, 1],
    pembahasan: explain(
      "Busur setengah lingkaran panjangnya setengah keliling; ruas garis di dalam bangun bukan bagian keliling luarnya.",
      "1. Untuk $r=10$ cm, busur setengah lingkaran $=\\pi r=10\\pi=31{,}4$ cm.\n2. Keliling lingkaran penuh $=2\\pi r=20\\pi=62{,}8$ cm.\n3. Tanda 10 cm pada gambar menunjukkan jari-jari, bukan diameter.\n4. Ruas diameter di bagian dalam tidak dihitung sebagai batas luar. Maka pernyataan (1) dan (2) benar.",
      "Telusuri hanya garis batas terluar daerah arsir saat menghitung keliling."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117317/LINGKARAN_-_LATIHAN_DASAR_-_NO_8_ajunfu.png", "Gambar untuk soal Lingkaran nomor 7"),
  },
  {
    no: 9,
    type: "pgk" as const,
    soal: "Keliling daerah arsir pada gambar terdiri atas satu busur setengah lingkaran berdiameter 28 cm dan dua busur setengah lingkaran berdiameter 14 cm. Gunakan $\\pi=\\frac{22}{7}$. Pilih semua pernyataan yang benar.",
    pernyataan: [
      "Panjang busur besar adalah $14\\pi=44$ cm.",
      "Panjang setiap busur kecil adalah $7\\pi=22$ cm.",
      "Jumlah panjang ketiga busur adalah $28\\pi=88$ cm.",
      "Kedua ruas diameter di dalam daerah arsir ikut dihitung sebagai bagian keliling.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: explain(
      "Panjang busur setengah lingkaran adalah setengah keliling lingkaran; hanya busur-busur pada tepi arsir yang dihitung.",
      "1. Busur besar, diameter 28 cm: $\\frac12\\pi(28)=14\\pi=44$ cm.\n2. Tiap busur kecil, diameter 14 cm: $\\frac12\\pi(14)=7\\pi=22$ cm.\n3. Jumlah tiga busur $=44+22+22=88$ cm.\n4. Ruas diameter berada di bagian dalam. Jadi pernyataan (1), (2), dan (3) benar.",
      "Karena semua busur adalah setengah lingkaran, hitung setengah keliling dari setiap diameternya."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117317/LINGKARAN_-_LATIHAN_DASAR_-_NO_9_r5kf7m.png", "Gambar untuk soal Lingkaran nomor 8"),
  },
  {
    no: 10,
    type: "pgkbs" as const,
    soal: "Gambar menunjukkan tembereng dari juring 90° dengan jari-jari 10 cm. Gunakan $\\pi=3{,}14$. Tentukan Benar (B) atau Salah (S) untuk setiap pernyataan.",
    pernyataan: [
      "Luas juring 90° adalah 78,5 cm².",
      "Luas segitiga yang dibentuk oleh dua jari-jari adalah 50 cm².",
      "Luas tembereng yang diarsir adalah 50 cm².",
    ],
    jawabanBS: ["B", "B", "S"] as ("B" | "S")[],
    pembahasan: explain(
      "Luas tembereng adalah luas juring dikurangi luas segitiga di dalam juring.",
      "1. Luas juring $=\\frac{90}{360}\\times3{,}14\\times10^2=78{,}5$ cm².\n2. Kedua jari-jari membentuk segitiga siku-siku: luasnya $=\\frac12\\times10\\times10=50$ cm².\n3. Luas tembereng $=78{,}5-50=28{,}5$ cm².\n4. Jadi pernyataan (1) dan (2) benar, sedangkan (3) salah.",
      "Untuk tembereng, jangan berhenti pada luas juring: selalu kurangi luas segitiga."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117317/LINGKARAN_-_LATIHAN_DASAR_-_NO_10_rhascv.jpg", "Gambar untuk soal Lingkaran nomor 9"),
  },
  {
    no: 11,
    type: "pgkbs" as const,
    soal: "Bangun pada gambar dibatasi dua busur setengah lingkaran berdiameter 26 cm dan 14 cm serta dua ruas garis lurus. Tentukan Benar (B) atau Salah (S) untuk setiap pernyataan.",
    pernyataan: [
      "Jumlah panjang kedua busur setengah lingkaran adalah $20\\pi$ cm.",
      "Jumlah panjang dua ruas garis lurus adalah selisih diameter, yaitu 12 cm.",
      "Dengan $\\pi=3{,}14$, keliling bangun adalah 80 cm.",
    ],
    jawabanBS: ["B", "B", "S"] as ("B" | "S")[],
    pembahasan: explain(
      "Keliling bangun terdiri dari dua busur setengah lingkaran dan dua ruas garis lurus.",
      "1. Jumlah busur $=\\frac12\\pi(26)+\\frac12\\pi(14)=20\\pi=62{,}8$ cm.\n2. Jumlah dua ruas lurus $=26-14=12$ cm.\n3. Keliling $=62{,}8+12=74{,}8$ cm, bukan 80 cm.\n4. Maka pernyataan (1) dan (2) benar, sedangkan (3) salah.",
      "Kelompokkan dulu semua bagian lengkung dan bagian lurus supaya tidak ada sisi yang terlewat."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117317/LINGKARAN_-_LATIHAN_DASAR_-_NO_11_jsb1wy.png", "Gambar untuk soal Lingkaran nomor 10"),
  },
  { no: 12, soal: "Perhatikan gambar berikut\nJika total luas bangun di atas 480 $cm^2$, maka luas daerah persegi adalah ...", options: ["A. 24 $cm^2$", "B. 56 $cm^2$", "C. 72 $cm^2$", "D. 84 $cm^2$"] },
  { no: 13, soal: "Perhatikan gambar persegipanjang dan lingkaran berikut!\nDiketahui A dan B adalah pusat dua lingkaran yang kongruen dan saling bersinggungan luar. ABQP adalah persegi panjang. Luas daerah yang diarsir seluruhnya adalah 1.316 $cm^2$. Luas persegi panjang ABQP adalah....($\\pi = \\frac{22}{7}$)", options: ["A. 196 $cm^2$", "B. 392 $cm^2$", "C. 492 $cm^2$", "D. 512 $cm^2$"] },
  {
    no: 14,
    soal: "Perhatikan gambar di samping ini!\nDiketahui O adalah titik pusat lingkaran. Besar sudut AOB adalah ....",
    options: ["A. 15°", "B. 30°", "C. 45°", "D. 60°"],
    jawaban: "D",
    pembahasan: explain(
      "Sudut pusat yang menghadap busur yang sama besarnya dua kali sudut keliling.",
      "1. Sudut keliling ACB pada gambar adalah 30°.\n2. Sudut pusat AOB menghadap busur AB yang sama.\n3. Maka $\\angle AOB=2\\times30°=60°$.",
      "Cari sudut keliling yang menghadap busur yang sama dengan sudut pusat yang ditanyakan."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_14_j7zoga.png", "Gambar untuk soal Lingkaran nomor 11"),
  },
  {
    no: 15,
    type: "pgkbs" as const,
    soal: "Pada gambar, O adalah pusat lingkaran dan $\\angle ACE=30°$. Diketahui pula $\\angle ABE+\\angle ACE+\\angle ADE=96°$. Tentukan Benar (B) atau Salah (S) untuk setiap pernyataan.",
    pernyataan: [
      "$\\angle ACE=30°$.",
      "$\\angle AOE=60°$.",
      "$\\angle AOE=96°$.",
    ],
    jawabanBS: ["B", "B", "S"] as ("B" | "S")[],
    pembahasan: explain(
      "Sudut pusat besarnya dua kali sudut keliling yang menghadap busur yang sama.",
      "1. Pernyataan (1) sama dengan informasi soal, jadi benar.\n2. $\\angle ACE=30°$ menghadap busur AE.\n3. Sudut pusat $\\angle AOE=2\\times30°=60°$.\n4. Jadi pernyataan (2) benar dan pernyataan (3) salah.",
      "Pasangkan sudut keliling dan sudut pusat berdasarkan busur yang dihadapinya, bukan hanya berdasarkan letak titik."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_15_sh0acg.png", "Gambar untuk soal Lingkaran nomor 12"),
  },
  {
    no: 16,
    soal: "Perhatikan gambar di bawah ini!,\nBesar $\\angle OAD = 20^0$, besar $\\angle OBD = 30^0$, maka besar sudut BOC adalah ....",
    options: ["A. $50^0$", "B. $70^0$", "C. $80^0$", "D. $100^0$"],
    jawaban: "C",
    pembahasan: explain(
      "Jari-jari yang membentuk segitiga sama kaki memberi sudut alas sama besar; diameter membentuk sudut lurus 180°.",
      "1. Pada segitiga AOD, OA=OD. Jadi $\\angle ODA=20°$ dan $\\angle AOD=180°-20°-20°=140°$.\n2. AC adalah diameter, sehingga $\\angle AOC=180°$ dan $\\angle COD=180°-140°=40°$.\n3. Pada segitiga OBD, OB=OD. Maka $\\angle ODB=30°$ dan $\\angle BOD=120°$.\n4. Karena $\\angle BOD=\\angle BOC+\\angle COD$, diperoleh $\\angle BOC=120°-40°=80°$.",
      "Tandai dahulu garis yang melalui pusat sebagai diameter, lalu pecah sudut besar menjadi sudut-sudut kecil."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_16_lhj6d3.png", "Gambar untuk soal Lingkaran nomor 13"),
  },
  {
    no: 17,
    soal: "Pada gambar di bawah ini diketahui besar $\\angle AOC = 82^0$.\nBesar sudut $\\angle BDC$ adalah ...",
    options: ["A. $41^0$", "B. $49^0$", "C. $82^0$", "D. $98^0$"],
    jawaban: "B",
    pembahasan: explain(
      "Sudut pusat AOB adalah 180° karena AB merupakan diameter. Sudut keliling yang menghadap busur BC sama dengan setengah sudut pusat BOC.",
      "1. $\\angle AOB=180°$.\n2. $\\angle BOC=180°-\\angle AOC=180°-82°=98°$.\n3. $\\angle BDC$ menghadap busur BC, sehingga $\\angle BDC=\\frac12\\times98°=49°$.",
      "Pastikan sudut keliling dan sudut pusat menghadap busur yang sama sebelum menggunakan faktor setengah."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_17_m7qqc2.png", "Gambar untuk soal Lingkaran nomor 14"),
  },
  {
    no: 18,
    soal: "Perhatikan gambar berikut!\nJika besar sudut AOC = $112^0$, maka besar sudut ABC adalah ....",
    options: ["A. $124^0$", "B. $114^0$", "C. $68^0$", "D. $56^0$"],
    jawaban: "A",
    pembahasan: explain(
      "Sudut keliling besarnya setengah busur yang dihadapinya. Karena B terletak pada busur kecil AC, sudut ABC menghadap busur besar AC.",
      "1. Besar busur kecil AC sama dengan sudut pusat AOC, yaitu 112°.\n2. Busur besar AC $=360°-112°=248°$.\n3. Maka $\\angle ABC=\\frac12\\times248°=124°$.",
      "Periksa letak titik sudut keliling: busur yang dipakai adalah busur AC yang tidak memuat titik B."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_18_z7fcwd.png", "Gambar untuk soal Lingkaran nomor 15"),
  },
  {
    no: 19,
    type: "pgkbs" as const,
    soal: "Pada lingkaran pada gambar, AD adalah diameter, titik X adalah perpotongan AC dan BD, $\\angle ADB=28°$, dan $\\angle AXB=60°$. Tentukan Benar (B) atau Salah (S) untuk setiap pernyataan.",
    pernyataan: [
      "$\\angle BAC=30°$.",
      "$\\angle ADC=58°$.",
      "$\\angle DAC=58°$.",
    ],
    jawabanBS: ["B", "B", "S"] as ("B" | "S")[],
    pembahasan: explain(
      "Gunakan teorema sudut keliling, sudut dari dua tali busur yang berpotongan di dalam lingkaran, dan sudut keliling yang menghadap diameter.",
      "1. $\\angle ADB=28°$ menghadap busur AB, jadi busur AB $=56°$.\n2. Untuk tali busur yang berpotongan di X, $\\angle AXB=\\frac12$(busur AB + busur CD). Maka busur CD $=120°-56°=64°$.\n3. Karena AD diameter, busur ABCD pada setengah lingkaran bawah bernilai 180°. Jadi busur BC $=180°-56°-64°=60°$, sehingga $\\angle BAC=30°$.\n4. $\\angle ADC$ menghadap busur ABC, jadi $\\angle ADC=\\frac12(56°+60°)=58°$.\n5. Segitiga ACD siku-siku di C; maka $\\angle DAC=180°-90°-58°=32°$. Pernyataan (1) dan (2) benar, (3) salah.",
      "Untuk sudut dua tali busur yang berpotongan di dalam lingkaran, jumlahkan ukuran dua busur yang berhadapan lalu bagi dua."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_19_tbdvkh.png", "Gambar untuk soal Lingkaran nomor 16"),
  },
  {
    no: 20,
    type: "pgkbs" as const,
    soal: "Pada segiempat tali busur ABCD pada gambar, sudut luar di C adalah 100° dan $\\angle ABC=74°$. Tentukan Benar (B) atau Salah (S) untuk setiap pernyataan.",
    pernyataan: [
      "$\\angle DCB=80°$.",
      "$\\angle BAD=100°$.",
      "$\\angle ADC=74°$.",
    ],
    jawabanBS: ["B", "B", "S"] as ("B" | "S")[],
    pembahasan: explain(
      "Pada segiempat tali busur, sudut luar sama dengan sudut dalam yang berhadapan; sudut-sudut berhadapan jumlahnya 180°.",
      "1. Sudut dalam DCB berpelurus dengan sudut luar 100°, sehingga $\\angle DCB=80°$.\n2. $\\angle BAD=180°-\\angle DCB=100°$.\n3. $\\angle ADC=180°-\\angle ABC=180°-74°=106°$.\n4. Jadi pernyataan (1) dan (2) benar, sedangkan (3) salah.",
      "Bedakan sudut luar dan sudut dalam di titik yang sama: keduanya berjumlah 180°."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117315/LINGKARAN_-_LATIHAN_DASAR_-_NO_20_hgibte.png", "Gambar untuk soal Lingkaran nomor 17"),
  },
  {
    no: 21,
    soal: "Perhatikan gambar berikut!\nJika besar sudut COD = $48^0$, maka besar sudut ABC adalah ....",
    options: ["A. $66^0$", "B. $124^0$", "C. $122^0$", "D. $114^0$"],
    jawaban: "A",
    pembahasan: explain(
      "AD adalah diameter, sehingga sudut pusat AOD = 180°. Sudut keliling ABC menghadap busur AC.",
      "1. $\\angle AOD=180°$ dan $\\angle COD=48°$.\n2. Maka $\\angle AOC=180°-48°=132°$.\n3. Sudut keliling ABC menghadap busur AC yang sama, jadi $\\angle ABC=\\frac12\\times132°=66°$.",
      "Jika pusat dan titik-titik berada pada satu setengah lingkaran, gunakan jumlah sudut pusat 180° untuk mencari sudut yang belum diketahui."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117315/LINGKARAN_-_LATIHAN_DASAR_-_NO_21_tixnhi.png", "Gambar untuk soal Lingkaran nomor 18"),
  },
  {
    no: 22,
    soal: "Ayah akan membuat taman berbentuk lingkaran dengan jari-jari 35 m. Di sekeliling taman akan ditanami pohon cemara dengan jarak 1 m. Jika satu pohon memerlukan biaya Rp 25.000,00, seluruh biaya penanaman pohon cemara adalah....",
    options: ["A. Rp 5.900.000,00", "B. Rp 5.700.000,00", "C. Rp 5.500.000,00", "D. Rp 5.200.000,00"],
    jawaban: "C",
    pembahasan: explain(
      "Jumlah pohon sama dengan keliling taman dibagi jarak antarpohon; biaya total adalah jumlah pohon dikali biaya per pohon.",
      "1. Keliling taman $=2\\times\\frac{22}{7}\\times35=220$ m.\n2. Jarak antarpohon 1 m, jadi diperlukan 220 pohon.\n3. Biaya $=220\\times Rp\\,25.000=Rp\\,5.500.000$.",
      "Untuk penanaman melingkar tertutup, jumlah interval sama dengan jumlah pohon ketika jarak setiap pohon seragam."
    ),
  },
  {
    no: 23,
    soal: "Sebuah roda yang berdiameter 50 cm berputar 60 kali. Jika $\\pi = 3,14$, maka jarak yang ditempuh adalah ....",
    options: ["A. 94,2 m", "B. 942 m", "C. 47,1 m", "D. 471 m"],
    jawaban: "A",
    pembahasan: explain(
      "Satu putaran roda menempuh satu keliling roda; jarak total adalah keliling dikali banyak putaran.",
      "1. Keliling roda $=\\pi d=3{,}14\\times50=157$ cm.\n2. Dalam 60 putaran, jarak $=157\\times60=9.420$ cm.\n3. Ubah ke meter: $9.420\\div100=94{,}2$ m.",
      "Samakan satuan sebelum memilih jawaban; 9.420 cm bukan 9.420 m."
    ),
  },
  {
    no: 24,
    soal: "Sebuah roda berputar 40 kali menempuh jarak 52,8 m. Jika $\\pi = 22/7$, maka jari-jari roda tersebut adalah ....",
    options: ["A. 14 cm", "B. 21 cm", "C. 28 cm", "D. 42 cm"],
    jawaban: "B",
    pembahasan: explain(
      "Jarak satu putaran adalah keliling roda. Dari keliling, jari-jari dapat dicari dengan rumus $K=2\\pi r$.",
      "1. Jarak per putaran $=52{,}8\\div40=1{,}32$ m $=132$ cm.\n2. $132=2\\times\\frac{22}{7}\\times r$.\n3. $r=132\\div(44/7)=21$ cm.",
      "Ubah semua ukuran ke satuan yang sama sebelum menghitung jari-jari."
    ),
  },
  {
    no: 25,
    soal: "Seorang pengusaha akan membuat bianglala seperti yang ada di Dufan.\nJika tempat duduk pada bianglala sebanyak 44 buah dan masing-masing tempat duduk berjarak 3 m, berapakah panjang jari-jari bianglala?",
    options: ["A. 7 m", "B. 10,5 m", "C. 14 m", "D. 21 m"],
    jawaban: "D",
    pembahasan: explain(
      "Jarak antarkursi mengelilingi bianglala membentuk keliling lingkaran.",
      "1. Keliling bianglala $=44\\times3=132$ m.\n2. Gunakan $K=2\\pi r$ dengan $\\pi=22/7$.\n3. $r=132\\div(2\\times22/7)=21$ m.",
      "Jika jumlah kursi merata, hitung dahulu total jarak antarsemua kursi untuk memperoleh keliling."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117316/LINGKARAN_-_LATIHAN_DASAR_-_NO_25_dpuwuu.png", "Gambar untuk soal Lingkaran nomor 22"),
  },
  {
    no: 26,
    soal: "Perhatikan gambar berikut!\nKolam ikan Pak Arvin tampak seperti gambar di atas. Jika di sekeliling akan dipagari dengan kawat berduri dua kali putaran, maka dibutuhkan kawat berduri minimum sepanjang......",
    options: ["A. 72 m", "B. 86 m", "C. 144 m", "D. 116 m"],
    jawaban: "D",
    pembahasan: explain(
      "Keliling bentuk gabungan terdiri dari dua busur setengah lingkaran dan dua sisi lurus; karena pagar dipasang dua putaran, hasil keliling dikalikan dua.",
      "1. Panjang total bangun 21 m dan tinggi/diameter lengkung 14 m, sehingga tiap sisi lurus $=21-14=7$ m.\n2. Dua busur setengah lingkaran berdiameter 14 m sama dengan satu keliling lingkaran: $\\pi d=22/7\\times14=44$ m.\n3. Keliling satu putaran $=44+7+7=58$ m.\n4. Dua putaran $=2\\times58=116$ m.",
      "Jangan menghitung garis diameter yang hanya berada di dalam bangun; hitung hanya batas luar kolam."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117315/LINGKARAN_-_LATIHAN_DASAR_-_NO_26_nicwq1.png", "Gambar untuk soal Lingkaran nomor 23"),
  },
  {
    no: 27,
    soal: "Sebuah tonggak ditengah lapangan rumput berbentuk persegipanjang berukuran 15 m x 20 m. Seekor kambing diikat di tonggak dengan tali yang panjangnya 7 m. Berapa luas lapangan yang rumputnya tidak termakan kambing?",
    options: ["A. 100 $m^2$", "B. 146 $m^2$", "C. 154 $m^2$", "D. 300 $m^2$"],
    jawaban: "B",
    pembahasan: explain(
      "Luas rumput tersisa adalah luas lapangan dikurangi luas daerah lingkaran yang dapat dijangkau kambing.",
      "1. Luas lapangan $=15\\times20=300$ m².\n2. Jari-jari daerah jangkauan kambing 7 m, jadi luasnya $=\\frac{22}{7}\\times7^2=154$ m².\n3. Luas yang tidak termakan $=300-154=146$ m².",
      "Pastikan tali 7 m tidak terhalang tepi lapangan; di sini kambing berada di tengah dan jangkauannya masih muat."
    ),
  },
  {
    no: 28,
    soal: "Perhatikan gambar berikut!\nKolam pak Tedi bentuk dan ukuran Nampak seperti gambar.\nJika keliling kolam diberi pagar kawat dua kali putaran, maka dibutuhkan kawat minimum sepanjang ....",
    options: ["A. 66 m", "B. 88 m", "C. 132 m", "D. 160 m"],
    jawaban: "D",
    pembahasan: explain(
      "Batas kolam terdiri dari busur setengah lingkaran luar, busur setengah lingkaran dalam, dan dua sisi lurus radial.",
      "1. Jari-jari luar $=28\\div2=14$ m. Lebar cincin 7 m, jadi jari-jari dalam $=14-7=7$ m.\n2. Busur luar $=\\pi\\times14=44$ m dan busur dalam $=\\pi\\times7=22$ m.\n3. Dua sisi lurus masing-masing 7 m, sehingga keliling satu putaran $=44+22+7+7=80$ m.\n4. Dua putaran memerlukan $2\\times80=160$ m kawat.",
      "Keliling bentuk setengah cincin tetap memiliki dua sisi lurus yang menghubungkan busur dalam dan luar."
    ),
    gambar: questionImage("https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117315/LINGKARAN_-_LATIHAN_DASAR_-_NO_28_fko8kg.png", "Gambar untuk soal Lingkaran nomor 25"),
  },
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
    showImmediateAnswerFeedback
    showPembahasanTips
  />
);

export default LingkaranPage;
