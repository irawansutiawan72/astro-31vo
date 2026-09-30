import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";
import { getTkaContohSoal } from "@/data/tkaContohSoal";

const circleStroke = "var(--icon-stroke)";
const circleText = "var(--icon-color)";
const cyan = "#38bdf8";
const yellow = "#facc15";
const pink = "#fb7185";

const DiagramShell = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <svg
    viewBox="0 0 420 240"
    role="img"
    aria-label={title}
    className="mx-auto w-full max-w-lg"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    {children}
  </svg>
);

const Soal1SVG = () => (
  <DiagramShell title="Lingkaran berjari-jari 21 cm dengan satu juring diarsir">
    <circle cx="210" cy="120" r="84" fill="none" stroke={circleStroke} strokeWidth="2.5" />
    <path d="M210 120 L210 36 A84 84 0 0 1 282.75 78 Z" fill="#facc15" fillOpacity="0.35" stroke={yellow} strokeWidth="2" />
    <line x1="210" y1="120" x2="210" y2="36" stroke={yellow} strokeWidth="2" />
    <line x1="210" y1="120" x2="282.75" y2="78" stroke={yellow} strokeWidth="2" />
    <circle cx="210" cy="120" r="4" fill={pink} />
    <text x="197" y="139" fill={cyan} fontSize="16" fontFamily="serif" fontStyle="italic" fontWeight="bold">O</text>
    <text x="216" y="73" fill={yellow} fontSize="14" fontFamily="serif">r = 21 cm</text>
    <text x="273" y="62" fill={cyan} fontSize="15" fontFamily="serif" fontStyle="italic" fontWeight="bold">A</text>
    <text x="291" y="84" fill={cyan} fontSize="15" fontFamily="serif" fontStyle="italic" fontWeight="bold">B</text>
    <text x="317" y="207" fill={yellow} fontSize="13" fontFamily="sans-serif">daerah diarsir</text>
    <line x1="294" y1="190" x2="260" y2="112" stroke={yellow} strokeWidth="1.4" strokeDasharray="4 4" />
  </DiagramShell>
);

const Soal2SVG = () => (
  <DiagramShell title="Diagram busur kecil PQ dan juring dengan sudut pusat 120 derajat">
    <line x1="210" y1="18" x2="210" y2="222" stroke={circleStroke} strokeOpacity="0.2" strokeDasharray="4 5" />
    <line x1="18" y1="120" x2="402" y2="120" stroke={circleStroke} strokeOpacity="0.2" strokeDasharray="4 5" />
    <circle cx="108" cy="120" r="70" fill="none" stroke={circleStroke} strokeWidth="2.2" />
    <path d="M168.62 85 A70 70 0 0 1 168.62 155" fill="none" stroke={cyan} strokeWidth="6" strokeLinecap="round" />
    <line x1="108" y1="120" x2="168.62" y2="85" stroke={cyan} strokeWidth="2" />
    <line x1="108" y1="120" x2="168.62" y2="155" stroke={cyan} strokeWidth="2" />
    <circle cx="108" cy="120" r="3.5" fill={pink} />
    <text x="98" y="139" fill={cyan} fontSize="15" fontFamily="serif" fontStyle="italic" fontWeight="bold">O</text>
    <text x="171" y="82" fill={cyan} fontSize="15" fontFamily="serif" fontStyle="italic" fontWeight="bold">P</text>
    <text x="171" y="164" fill={cyan} fontSize="15" fontFamily="serif" fontStyle="italic" fontWeight="bold">Q</text>
    <text x="32" y="34" fill={circleText} fontSize="13" fontFamily="sans-serif" fontWeight="bold">Busur kecil PQ</text>
    <text x="56" y="207" fill={yellow} fontSize="13" fontFamily="serif">OP = 21 cm</text>
    <line x1="280" y1="120" x2="280" y2="52" stroke={circleStroke} strokeWidth="2.2" />
    <line x1="280" y1="120" x2="338.89" y2="154" stroke={circleStroke} strokeWidth="2.2" />
    <path d="M280 120 L280 52 A68 68 0 0 1 338.89 154 Z" fill="#facc15" fillOpacity="0.3" stroke={yellow} strokeWidth="2" />
    <circle cx="280" cy="120" r="3.5" fill={pink} />
    <text x="270" y="139" fill={cyan} fontSize="15" fontFamily="serif" fontStyle="italic" fontWeight="bold">O</text>
    <text x="273" y="44" fill={cyan} fontSize="15" fontFamily="serif" fontStyle="italic" fontWeight="bold">P</text>
    <text x="342" y="161" fill={cyan} fontSize="15" fontFamily="serif" fontStyle="italic" fontWeight="bold">Q</text>
    <text x="288" y="91" fill={yellow} fontSize="13" fontFamily="serif">120°</text>
    <text x="300" y="199" fill={yellow} fontSize="13" fontFamily="serif">r = 7 cm</text>
    <text x="259" y="22" fill={circleText} fontSize="13" fontFamily="sans-serif" fontWeight="bold">Juring</text>
  </DiagramShell>
);

const Soal3SVG = () => (
  <DiagramShell title="Lingkaran dengan busur QR sepanjang 60 cm dan busur PQ yang dicari">
    <circle cx="210" cy="120" r="82" fill="none" stroke={circleStroke} strokeWidth="2.5" />
    <path d="M151.98 61.98 A82 82 0 0 1 268.02 61.98" fill="none" stroke={cyan} strokeWidth="6" strokeLinecap="round" />
    <path d="M268.02 61.98 A82 82 0 0 1 268.02 178.02" fill="none" stroke={yellow} strokeWidth="6" strokeLinecap="round" />
    <line x1="210" y1="120" x2="151.98" y2="61.98" stroke={circleStroke} strokeWidth="1.5" strokeDasharray="4 4" />
    <line x1="210" y1="120" x2="268.02" y2="61.98" stroke={circleStroke} strokeWidth="1.5" strokeDasharray="4 4" />
    <line x1="210" y1="120" x2="268.02" y2="178.02" stroke={circleStroke} strokeWidth="1.5" strokeDasharray="4 4" />
    <circle cx="210" cy="120" r="4" fill={pink} />
    <text x="198" y="140" fill={cyan} fontSize="16" fontFamily="serif" fontStyle="italic" fontWeight="bold">O</text>
    <text x="137" y="58" fill={cyan} fontSize="16" fontFamily="serif" fontStyle="italic" fontWeight="bold">P</text>
    <text x="271" y="58" fill={cyan} fontSize="16" fontFamily="serif" fontStyle="italic" fontWeight="bold">Q</text>
    <text x="272" y="190" fill={cyan} fontSize="16" fontFamily="serif" fontStyle="italic" fontWeight="bold">R</text>
    <text x="210" y="48" textAnchor="middle" fill={cyan} fontSize="14" fontFamily="serif">busur PQ = x cm</text>
    <text x="319" y="124" fill={yellow} fontSize="14" fontFamily="serif">QR = 60 cm</text>
  </DiagramShell>
);

const Soal4SVG = () => (
  <DiagramShell title="Dua juring pada satu lingkaran: ORS diketahui 60 cm persegi dan OPQ dicari">
    <circle cx="210" cy="120" r="84" fill="none" stroke={circleStroke} strokeWidth="2.5" />
    <path d="M210 120 L210 36 A84 84 0 0 1 282.75 78 Z" fill="#38bdf8" fillOpacity="0.28" stroke={cyan} strokeWidth="2" />
    <path d="M210 120 L282.75 78 A84 84 0 0 1 126.99 144.36 Z" fill="#facc15" fillOpacity="0.28" stroke={yellow} strokeWidth="2" />
    <line x1="210" y1="120" x2="210" y2="36" stroke={cyan} strokeWidth="2" />
    <line x1="210" y1="120" x2="282.75" y2="78" stroke={circleStroke} strokeWidth="2" />
    <line x1="210" y1="120" x2="126.99" y2="144.36" stroke={yellow} strokeWidth="2" />
    <circle cx="210" cy="120" r="4" fill={pink} />
    <text x="198" y="140" fill={cyan} fontSize="16" fontFamily="serif" fontStyle="italic" fontWeight="bold">O</text>
    <text x="205" y="31" fill={cyan} fontSize="15" fontFamily="serif" fontStyle="italic" fontWeight="bold">R</text>
    <text x="289" y="75" fill={cyan} fontSize="15" fontFamily="serif" fontStyle="italic" fontWeight="bold">S</text>
    <text x="117" y="158" fill={cyan} fontSize="15" fontFamily="serif" fontStyle="italic" fontWeight="bold">P</text>
    <text x="96" y="141" fill={cyan} fontSize="15" fontFamily="serif" fontStyle="italic" fontWeight="bold">Q</text>
    <text x="235" y="74" fill={cyan} fontSize="13" fontFamily="serif">Luas ORS = 60 cm²</text>
    <text x="162" y="181" fill={yellow} fontSize="14" fontFamily="serif">Luas OPQ = x cm²</text>
  </DiagramShell>
);

const Soal5SVG = () => (
  <DiagramShell title="Lingkaran pusat O dengan sudut AOB 35 derajat, sudut COD 140 derajat, dan busur AB 14 cm">
    <circle cx="210" cy="120" r="86" fill="none" stroke={circleStroke} strokeWidth="2.5" />
    <path d="M139.5 174.9 A86 86 0 0 1 155.2 42.2" fill="none" stroke={pink} strokeWidth="7" strokeLinecap="round" />
    <path d="M290.8 90.6 A86 86 0 0 1 129.2 90.6" fill="none" stroke={yellow} strokeWidth="7" strokeLinecap="round" />
    <line x1="210" y1="120" x2="139.5" y2="174.9" stroke={pink} strokeWidth="2" />
    <line x1="210" y1="120" x2="155.2" y2="42.2" stroke={pink} strokeWidth="2" />
    <line x1="210" y1="120" x2="290.8" y2="90.6" stroke={yellow} strokeWidth="2" />
    <line x1="210" y1="120" x2="129.2" y2="90.6" stroke={yellow} strokeWidth="2" />
    <circle cx="210" cy="120" r="4" fill={cyan} />
    <text x="198" y="141" fill={cyan} fontSize="16" fontFamily="serif" fontStyle="italic" fontWeight="bold">O</text>
    <text x="126" y="190" fill={cyan} fontSize="15" fontFamily="serif" fontStyle="italic" fontWeight="bold">A</text>
    <text x="146" y="34" fill={cyan} fontSize="15" fontFamily="serif" fontStyle="italic" fontWeight="bold">B</text>
    <text x="295" y="95" fill={cyan} fontSize="15" fontFamily="serif" fontStyle="italic" fontWeight="bold">C</text>
    <text x="118" y="88" fill={cyan} fontSize="15" fontFamily="serif" fontStyle="italic" fontWeight="bold">D</text>
    <text x="163" y="131" fill={pink} fontSize="13" fontFamily="serif">35°</text>
    <text x="205" y="74" fill={yellow} fontSize="13" fontFamily="serif">140°</text>
    <text x="105" y="218" fill={pink} fontSize="13" fontFamily="serif">busur AB = 14 cm</text>
    <text x="292" y="52" fill={yellow} fontSize="13" fontFamily="serif">busur CD = x cm</text>
  </DiagramShell>
);

const materiSections: MateriSection[] = [
  { heading: "A. Unsur-unsur Lingkaran", content: `- Pusat (O): titik yang berjarak sama dari semua titik pada lingkaran\n- Jari-jari (r): jarak dari pusat ke tepi lingkaran\n- Diameter (d): dua kali jari-jari, $d = 2r$\n- Busur: bagian keliling lingkaran\n- Tali busur: garis lurus menghubungkan dua titik pada lingkaran\n- Apotema: jarak terpendek dari pusat ke tali busur\n- Juring (sektor): daerah antara dua jari-jari dan busur\n- Tembereng: daerah antara tali busur dan busur` },
  { heading: "B. Keliling dan Luas Lingkaran", content: `Keliling (K): $K = 2\\pi r = \\pi d$\n\nLuas (L): $L = \\pi r^2$\n\nDengan $\\pi \\approx \\frac{22}{7}$ atau $\\pi \\approx 3,14$` },
  { heading: "C. Panjang Busur dan Luas Juring", content: `Panjang busur (PB) dengan sudut pusat α:\n$PB = \\dfrac{\\alpha}{360°} \\times 2\\pi r$\n\nLuas juring (LJ):\n$LJ = \\dfrac{\\alpha}{360°} \\times \\pi r^2$\n\nLuas tembereng:\n$L_{tembereng} = L_{juring} - L_{segitiga}$` },
  { heading: "D. Hubungan Sudut Pusat dan Sudut Keliling", content: `Sudut keliling yang menghadap busur yang sama:\n$\\angle keliling = \\dfrac{1}{2} \\angle pusat$\n\nSemua sudut keliling yang menghadap busur yang sama adalah sama besar.\n\nSudut keliling yang menghadap diameter = 90°` },
  { heading: "E. Garis Singgung Lingkaran", content: `Garis singgung lingkaran adalah garis yang hanya menyentuh lingkaran di satu titik (titik singgung).\n\nSifat: Garis singgung tegak lurus jari-jari di titik singgung.\n\nDua garis singgung dari titik luar:\n$PT^2 = PO^2 - r^2$\n\nGaris singgung persekutuan luar dua lingkaran:\n$d^2 = p^2 - (R-r)^2$\n\nGaris singgung persekutuan dalam:\n$d^2 = p^2 - (R+r)^2$\n\nDimana $p$ = jarak antar pusat, $R$ = jari-jari besar, $r$ = jari-jari kecil.` },
];

const latihanDasarTka: LatihanSoal[] = [
  { no: 1, soal: "Perhatikan gambar!\nJika O adalah pusat lingkaran, jika r = 21 cm dan $\\pi = \\frac{22}{7}$, maka luas daerah yang diarsir adalah ...", options: ["A. 77 $cm^2$", "B. 154 $cm^2$", "C. 231 $cm^2$", "D. 308 $cm^2$"], gambar: <Soal1SVG /> },
  { no: 2, soal: "Perhatikan gambar lingkaran di samping! Jika O pusat lingkaran, dan panjang OP = 21 cm, maka panjang busur kecil PQ adalah.... ($\\pi = \\frac{22}{7}$)\nLuas juring dengan sudut pusat $120^0$ dan panjang jari-jari 7 cm adalah ... ($\\pi = \\frac{22}{7}$)", options: ["A. 77 $cm^2$", "B. 51,33 $cm^2$", "C. 38,50 $cm^2$", "D. 14,67 $cm^2$"], gambar: <Soal2SVG /> },
  { no: 3, soal: "Perhatikanlah gambar berikut.\nDiketahui O adalah titik pusat lingkaran. Jika panjang busur QR = 60 cm, panjang busur PQ adalah...", options: ["A. 40 cm", "B. 45 cm", "C. 50 cm", "D. 55 cm"], gambar: <Soal3SVG /> },
  { no: 4, soal: "Perhatikan gambar!\nJika luas juring ORS = 60 $cm^2$, luas juring OPQ adalah...", options: ["A. 40 $cm^2$", "B. 75 $cm^2$", "C. 90 $cm^2$", "D. 105 $cm^2$"], gambar: <Soal4SVG /> },
  { no: 5, soal: "Pada suatu lingkaran dengan pusat O diketahui titik A, B, C, dan D pada keliling lingkaran, sehingga $\\angle AOB = 35°$ dan $\\angle COD = 140°$. Jika panjang busur AB = 14 cm, hitunglah panjang busur CD.", options: ["A. 28 cm", "B. 42 cm", "C. 56 cm", "D. 70 cm"], gambar: <Soal5SVG /> },
  { no: 6, soal: "Luas daerah yang diarsir pada gambar berikut adalah ...", options: ["A. 496,44 $cm^2$", "B. 718,2 $cm^2$", "C. 992,88 $cm^2$", "D. 1827 $cm^2$"] },
  { no: 7, soal: "Luas daerah yang diarsir pada gambar berikut adalah ...", options: ["A. 59,5 $cm^2$", "B. 112 $cm^2$", "C. 119 $cm^2$", "D. 224 $cm^2$"] },
  { no: 8, soal: "Keliling daerah yang diarsir pada gambar berikut adalah ...", options: ["A. 47,1 cm", "B. 62,8 cm", "C. 78,5 cm", "D. 94,2 cm"] },
  { no: 9, soal: "Keliling daerah yang diarsir pada gambar berikut adalah ...", options: [] },
  { no: 10, soal: "Luas daerah yang diarsir pada gambar berikut adalah ...", options: [] },
  { no: 11, soal: "Perhatikan gambar berikut!\nKeliling bangun tersebut adalah ...", options: ["A. 213,6 cm", "B. 221,2 cm", "C. 253,6 cm.", "D. 267,6 cm"] },
  { no: 12, soal: "Perhatikan gambar berikut\nJika total luas bangun di atas 480 $cm^2$, maka luas daerah persegi adalah ...", options: ["A. 24 $cm^2$", "B. 56 $cm^2$", "C. 72 $cm^2$", "D. 84 $cm^2$"] },
  { no: 13, soal: "Perhatikan gambar persegipanjang dan lingkaran berikut!\nDiketahui A dan B adalah pusat dua lingkaran yang kongruen dan saling bersinggungan luar. ABQP adalah persegi panjang. Luas daerah yang diarsir seluruhnya adalah 1.316 $cm^2$. Luas persegi panjang ABQP adalah....($\\pi = \\frac{22}{7}$)", options: ["A. 196 $cm^2$", "B. 392 $cm^2$", "C. 492 $cm^2$", "D. 512 $cm^2$"] },
  { no: 14, soal: "Perhatikan gambar di samping ini!\nDiketahui O adalah titik pusat lingkaran. Besar sudut AOB adalah ....", options: ["A. 15°", "B. 30°", "C. 45°", "D. 60°"] },
  { no: 15, soal: "Perhatikan gambar!\nTitik O adalah pusat lingkaran. Diketahui $\\angle ABE + \\angle ACE + \\angle ADE = 96°$ Besar $\\angle AOE$ adalah....", options: ["A. 32°", "B. 48°", "C. 64°", "D. 84°"] },
  { no: 16, soal: "Perhatikan gambar di bawah ini!,\nBesar $\\angle OAD = 20^0$, besar $\\angle OBD = 30^0$, maka besar sudut BOC adalah ....", options: ["A. $50^0$", "B. $70^0$", "C. $80^0$", "D. $100^0$"] },
  { no: 17, soal: "Pada gambar di bawah ini diketahui besar $\\angle AOC = 82^0$.\nBesar sudut $\\angle BDC$ adalah ...", options: ["A. $41^0$", "B. $49^0$", "C. $82^0$", "D. $98^0$"] },
  { no: 18, soal: "Perhatikan gambar berikut!\nJika besar sudut AOC = $112^0$, maka besar sudut ABC adalah ....", options: ["A. $124^0$", "B. $114^0$", "C. $68^0$", "D. $56^0$"] },
  { no: 19, soal: "Perhatikanlah gambar di bawah.\nHitunglah besar sudut $\\angle BAC$, $\\angle ADC$, $\\angle DAC$.", options: [] },
  { no: 20, soal: "Perhatikanlah gambar di bawah,\nHitunglah besar $\\angle DCB$, $\\angle BAD$, $\\angle ADC$", options: [] },
  { no: 21, soal: "Perhatikan gambar berikut!\nJika besar sudut COD = $48^0$, maka besar sudut ABC adalah ....", options: ["A. $132^0$", "B. $124^0$", "C. $122^0$", "D. $114^0$"] },
  { no: 22, soal: "Ayah akan membuat taman berbentuk lingkaran dengan jari-jari 35 m. Di sekeliling taman akan ditanami pohon cemara dengan jarak 1 m. Jika satu pohon memerlukan biaya Rp 25.000,00, seluruh biaya penanaman pohon cemara adalah....", options: ["A. Rp 5.900.000,00", "B. Rp 5.700.000,00", "C. Rp 5.500.000,00", "D. Rp 5.200.000,00"] },
  { no: 23, soal: "Sebuah roda yang berdiameter 50 cm berputar 60 kali. Jika $\\pi = 3,14$, maka jarak yang ditempuh adalah ....", options: ["A. 94,2 m", "B. 942 m", "C. 47,1 m", "D. 471 m"] },
  { no: 24, soal: "Sebuah roda berputar 40 kali menempuh jarak 52,8 m. Jika $\\pi = 22/7$, maka jari-jari roda tersebut adalah ....", options: ["A. 14 cm", "B. 21 cm", "C. 28 cm", "D. 42 cm"] },
  { no: 25, soal: "Seorang pengusaha akan membuat bianglala seperti yang ada di Dufan.\nJika tempat duduk pada bianglala sebanyak 44 buah dan masing-masing tempat duduk berjarak 3 m, berapakah panjang jari-jari bianglala?", options: ["A. 7 m", "B. 10,5 m", "C. 14 m", "D. 21 m"] },
  { no: 26, soal: "Perhatikan gambar berikut!\nKolam ikan Pak Arvin tampak seperti gambar di atas. Jika di sekeliling akan dipagari dengan kawat berduri dua kali putaran, maka dibutuhkan kawat berduri minimum sepanjang......", options: ["A. 72 m", "B. 86 m", "C. 144 m", "D. 172 m"] },
  { no: 27, soal: "Sebuah tonggak ditengah lapangan rumput berbentuk persegipanjang berukuran 15 m x 20 m. Seekor kambing diikat di tonggak dengan tali yang panjangnya 7 m. Berapa luas lapangan yang rumputnya tidak termakan kambing?", options: ["A. 100 $m^2$", "B. 146 $m^2$", "C. 154 $m^2$", "D. 300 $m^2$"] },
  { no: 28, soal: "Perhatikan gambar berikut!\nKolam pak Tedi bentuk dan ukuran Nampak seperti gambar.\nJika keliling kolam diberi pagar kawat dua kali putaran, maka dibutuhkan kawat minimum sepanjang ....", options: ["A. 66 m", "B. 88 m", "C. 132 m", "D. 180 m"] },
  { no: 29, soal: "Perhatikan gambar berikut.\nPanjang OP adalah ....", options: ["A. 16 cm", "B. 26 cm", "C. 34 cm", "D. 36 cm"] },
  { no: 30, soal: "Panjang jari-jari dua lingkaran masing-masing adalah 2 cm dan 10 cm. Panjang garis singgung persekutuan luarnya adalah 15 cm. Jarak kedua titik pusat lingkaran adalah ....", options: ["A. 13 cm", "B. 17 cm", "C. 23 cm", "D. 17 cm"] },
  { no: 31, soal: "Perhatikan gambar berikut.\nPada gambar tersebut, panjang jari-jari AD = 8 cm, panjang jari-jari BC = 3 cm, dan jarak AB = 13 cm. Luas trapesium ABCD adalah ....", options: ["A. 46 $cm^2$", "B. 56 $cm^2$", "C. 66 $cm^2$", "D. 76 $cm^2$"] },
  { no: 32, soal: "Perhatikan gambar berikut.\nPanjang garis singgung persekutuan dalam adalah ...", options: ["A. 12 cm", "B. 14 cm", "C. 16 cm", "D. 18 cm"] },
  { no: 33, soal: "Perbandingan jari-jari dua lingkaran adalah 1 : 2. Panjang garis singgung persekutuan dalam kedua lingkaran tersebut adalah 12 cm dan jarak antara kedua pusatnya 15 cm. Panjang jari-jari masing masing lingkaran adalah ....", options: ["A. 2 cm dan 4 cm", "B. 3 cm dan 6 cm", "C. 4 cm dan 8 cm", "D. 5 cm dan 10 cm"] },
  { no: 34, soal: "Perhatikan gambar di bawah ini.\nPanjang AD = 3,5 cm, panjang BE = 1,5 cm, dan jarak AB = 8 cm. Luas $\\triangle ABC$ adalah ....", options: ["A. $5\\sqrt{39}$", "B. $\\frac{1}{2}\\sqrt{39}$", "C. $\\frac{5}{2}\\sqrt{39}$", "D. $\\frac{3}{2}\\sqrt{39}$"] },
  { no: 35, soal: "Gambar berikut ini adalah penampang 6 buah kaleng cat yang berbentuk tabung dan berjari-jari 14 cm. Panjang tali terpendek yang dibutuhkan untuk mengikat keenam kaleng cat tersebut adalah ....", options: ["A. 256 cm", "B. 258 cm", "C. 260 cm", "D. 262 cm"] },
  { no: 36, soal: "Gambar di bawah ini adalah penampang 10 buah gelas berbentuk tabung dengan jari-jari 10 cm. Panjang tali minimal yang diperlukan untuk mengikat gelas-gelas tersebut dengan susunan seperti dalam gambar adalah ....", options: ["A. 261,8 cm", "B. 262,8 cm", "C. 261,6 cm", "D. 262,6 cm"] },
];

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
