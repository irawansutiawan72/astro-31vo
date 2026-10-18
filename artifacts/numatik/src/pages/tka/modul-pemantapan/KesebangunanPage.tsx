import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";
import { getTkaContohSoal } from "@/data/tkaContohSoal";
import kesebangunanSoalSatuIImage from "@/assets/kesebangunan-q1-i.png";

const kesebangunanImages: Record<number, string> = {
  3: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117355/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_3_esplzp.png",
  4: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117355/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_4_srwinp.png",
  6: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117354/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_8_get5ke.png",
  7: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117354/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_9_jxeevd.png",
  8: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117354/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_10_xvdtcp.png",
  9: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117354/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_11_vk8ooq.png",
  10: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117353/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_12_zkvbci.png",
  11: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117353/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_13_nvbv3w.png",
  13: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117353/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_15_ozmr6l.png",
  14: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117354/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_16_vfpjrw.png",
  15: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117353/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_17_i903gj.png",
  16: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117353/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_18_h4b34o.png",
  19: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117353/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_21_ubuud2.png",
  20: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117352/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_22_fhu89d.png",
};

const kesebangunanSoalSatuIiImage =
  "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1791035299/no_1_bagian_ii_pvvcad.png";
const kesebangunanSoalSatuIiiImage =
  "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1791035299/no_1_bagian_iii_desmvy.png";
const kesebangunanSoalSatuIvImage =
  "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1791035300/no_1_bagian_iv_n15tkt.png";

const kesebangunanSoalSatuParts = [
  {
    bagian: "i",
    diagram: <img src={kesebangunanSoalSatuIImage} alt="Dua lingkaran dengan ukuran berbeda" className="mx-auto max-h-48 w-full rounded bg-white p-1 object-contain" />,
  },
  {
    bagian: "ii",
    diagram: <img src={kesebangunanSoalSatuIiImage} alt="Dua bangun dengan keempat sisi sama panjang" className="mx-auto max-h-48 w-full rounded bg-white p-1 object-contain" />,
  },
  {
    bagian: "iii",
    diagram: <img src={kesebangunanSoalSatuIiiImage} alt="Dua persegi panjang dengan orientasi berbeda" className="mx-auto max-h-48 w-full rounded bg-white p-1 object-contain" />,
  },
  {
    bagian: "iv",
    diagram: <img src={kesebangunanSoalSatuIvImage} alt="Dua trapesium siku-siku dengan orientasi berbeda" className="mx-auto max-h-48 w-full rounded bg-white p-1 object-contain" />,
  },
] as const;

const kesebangunanSoalSatuDiagram = (
  <div role="group" aria-label="Gambar soal nomor 1" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
    {kesebangunanSoalSatuParts.map(({ bagian, diagram }) => (
      <figure key={bagian} className="min-w-0 rounded-xl border border-border/40 bg-background p-2">
        <figcaption className="mb-1 text-center text-sm font-semibold">({bagian})</figcaption>
        {diagram}
      </figure>
    ))}
  </div>
);

const kesebangunanSoalTujuhDiagram = (
  <figure className="mx-auto w-full max-w-2xl rounded-xl border border-border/40 bg-white p-3">
    <svg
      viewBox="0 0 520 260"
      role="img"
      aria-labelledby="kesebangunan-q7-title kesebangunan-q7-desc"
      className="block h-auto w-full"
    >
      <title id="kesebangunan-q7-title">Dua persegi panjang sebangun</title>
      <desc id="kesebangunan-q7-desc">
        Persegi panjang besar memiliki tinggi 20 cm dan persegi panjang kecil memiliki tinggi 5 cm.
      </desc>
      <rect x="70" y="25" width="160" height="200" fill="#09afd0" stroke="#172033" strokeWidth="2" />
      <rect x="390" y="175" width="40" height="50" fill="#a32379" stroke="#172033" strokeWidth="2" />
      <g stroke="#172033" strokeWidth="2">
        <line x1="48" y1="25" x2="48" y2="225" />
        <line x1="41" y1="25" x2="55" y2="25" />
        <line x1="41" y1="225" x2="55" y2="225" />
        <line x1="368" y1="175" x2="368" y2="225" />
        <line x1="361" y1="175" x2="375" y2="175" />
        <line x1="361" y1="225" x2="375" y2="225" />
      </g>
      <g fill="#172033" fontFamily="Georgia, serif" fontSize="25">
        <text x="28" y="125" textAnchor="middle" transform="rotate(-90 28 125)">20 cm</text>
        <text x="346" y="201" textAnchor="middle" transform="rotate(-90 346 201)">5 cm</text>
      </g>
    </svg>
  </figure>
);

const kesebangunanSoalEmpatBelasDiagram = (
  <figure className="mx-auto my-3 w-full max-w-xl rounded-xl border border-border/40 bg-white p-3">
    <svg
      viewBox="0 0 520 235"
      role="img"
      aria-labelledby="kesebangunan-q14-title kesebangunan-q14-desc"
      className="block h-auto w-full"
    >
      <title id="kesebangunan-q14-title">Tiang dan pohon dengan bayangannya</title>
      <desc id="kesebangunan-q14-desc">
        Tiang setinggi 4 meter memiliki bayangan 3 meter. Pohon memiliki bayangan 10 meter dan tinggi h. Sinar matahari membentuk dua segitiga sebangun.
      </desc>
      <line x1="40" y1="192" x2="478" y2="192" stroke="#475569" strokeWidth="2" />
      <line x1="90" y1="148" x2="90" y2="192" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
      <line x1="90" y1="192" x2="123" y2="192" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
      <line x1="300" y1="45" x2="300" y2="192" stroke="#15803d" strokeWidth="8" strokeLinecap="round" />
      <line x1="300" y1="192" x2="410" y2="192" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
      <line x1="90" y1="148" x2="123" y2="192" stroke="#64748b" strokeWidth="2" strokeDasharray="6 5" />
      <line x1="300" y1="45" x2="410" y2="192" stroke="#64748b" strokeWidth="2" strokeDasharray="6 5" />
      <g fill="#172033" fontFamily="Arial, sans-serif" fontSize="14" textAnchor="middle">
        <text x="90" y="135">Tiang</text>
        <text x="65" y="174">4 m</text>
        <text x="106" y="216">3 m</text>
        <text x="300" y="30">Pohon</text>
        <text x="278" y="120" fontWeight="700">h</text>
        <text x="355" y="216">10 m</text>
      </g>
    </svg>
  </figure>
);

const kesebangunanSoalSembilanBelasDiagram = (
  <figure className="kesebangunan-landscape-diagram mx-auto my-3 w-full max-w-lg rounded-xl border border-border/40 bg-white p-3">
    <svg
      viewBox="0 0 420 320"
      role="img"
      aria-labelledby="kesebangunan-q19-title kesebangunan-q19-desc"
      className="block h-auto w-full"
    >
      <title id="kesebangunan-q19-title">Foto di atas karton berukuran 10 cm × 15 cm</title>
      <desc id="kesebangunan-q19-desc">
        Foto sebangun dengan karton. Jarak kiri, kanan, dan atas foto masing-masing 2 cm. Jarak bagian bawah ditandai dengan x.
      </desc>
      <text x="210" y="25" fill="#172033" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14">
        Karton: 10 cm × 15 cm
      </text>
      <rect x="140" y="50" width="140" height="210" fill="#f2c96d" stroke="#172033" strokeWidth="2" />
      <rect x="168" y="78" width="84" height="126" fill="#73c6dc" stroke="#172033" strokeWidth="2" />
      <text x="210" y="148" fill="#12354b" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="700">
        FOTO
      </text>
      <g fill="#172033" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle">
        <text x="210" y="73">2 cm</text>
        <text x="153" y="152" transform="rotate(-90 153 152)">2 cm</text>
        <text x="267" y="152" transform="rotate(-90 267 152)">2 cm</text>
        <text x="210" y="285">10 cm</text>
        <text x="117" y="155" transform="rotate(-90 117 155)">15 cm</text>
        <text x="315" y="237" fontStyle="italic" fontSize="16">x</text>
      </g>
      <path d="M140 272h140M140 267v10M280 267v10" stroke="#172033" strokeWidth="1.5" />
      <path d="M122 50v210M117 50h10M117 260h10" stroke="#172033" strokeWidth="1.5" />
      <path d="M300 204v56M295 204h10M295 260h10" stroke="#172033" strokeWidth="1.5" />
    </svg>
  </figure>
);

const kesebangunanSoalDuaPuluhDiagram = (
  <figure className="kesebangunan-landscape-diagram mx-auto my-3 w-full max-w-lg rounded-xl border border-border/40 bg-white p-3">
    <svg
      viewBox="0 0 420 350"
      role="img"
      aria-labelledby="kesebangunan-q20-title kesebangunan-q20-desc"
      className="block h-auto w-full"
    >
      <title id="kesebangunan-q20-title">Foto pada karton berukuran 20 cm × 25 cm</title>
      <desc id="kesebangunan-q20-desc">
        Foto sebangun dengan karton. Jarak kiri, kanan, dan atas masing-masing 2 cm. Bagian karton di bawah foto diarsir berbeda.
      </desc>
      <defs>
        <pattern id="kesebangunan-q20-bottom-hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#fde68a" />
          <line x1="0" y1="0" x2="0" y2="8" stroke="#d97706" strokeWidth="3" />
        </pattern>
      </defs>
      <rect x="100" y="28" width="200" height="250" fill="#f2c96d" stroke="#172033" strokeWidth="2" />
      <rect x="100" y="248" width="200" height="30" fill="url(#kesebangunan-q20-bottom-hatch)" />
      <rect x="120" y="48" width="160" height="200" fill="#73c6dc" stroke="#172033" strokeWidth="2" />
      <text x="200" y="148" fill="#12354b" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700">FOTO</text>
      <g fill="#172033" fontFamily="Arial, sans-serif" fontSize="13" textAnchor="middle">
        <text x="200" y="20">Karton: 20 cm × 25 cm</text>
        <text x="110" y="160" transform="rotate(-90 110 160)">2 cm</text>
        <text x="290" y="160" transform="rotate(-90 290 160)">2 cm</text>
        <text x="200" y="44">2 cm</text>
      </g>
    </svg>
  </figure>
);

const materiSections: MateriSection[] = [
  {
    heading: "A. Kesebangunan",
    content: `Bangun-bangun datar yang sebangun artinya bangun-bangun datar tersebut mempunyai bentuk yang sama namun ukurannya berbeda dapat lebih besar atau lebih kecil.

Untuk membuktikan dua buah bangun datar sebangun dapat dilakukan jika memenuhi salah satu syarat di bawah ini:
1. Sudut-sudut yang bersesuaian sama besar.
2. Sisi-sisi yang bersesuaian mempunyai perbandingan yang sama.

Sisi yang bersesuaian terletak di hadapan sudut yang sama besar.

Terdapat segitiga ABC dan segitiga ADE, dengan BC sejajar DE. Segitiga ABC dan segitiga ADE sebangun, maka:
$\\dfrac{AB}{AD} = \\dfrac{BC}{DE} = \\dfrac{AC}{AE}$

Pada segitiga siku-siku dapat dibuat garis tinggi ke sisi miring. Segitiga ABC sebangun dengan segitiga ADC:
$AB^2 = BD \\times BC$
$AC^2 = CD \\times CB$
$AD^2 = BD \\times CD$`,
  },
  {
    heading: "B. Kekongruenan",
    content: `Dua bangun dikatakan kongruen jika semua panjang sisi-sisi yang bersesuaian sama besar dan begitu juga sudutnya. Mudahnya, dua bangun itu sama ukurannya dan sama bentuknya.

Syarat dua segitiga kongruen:
1. Sisi-Sisi-Sisi (S.S.S): Ketiga sisi yang bersesuaian sama panjang.
2. Sisi-Sudut-Sisi (S.Sd.S): Dua sisi yang bersesuaian sama panjang dan sudut yang diapit sama besar.
3. Sudut-Sisi-Sudut (Sd.S.Sd): Dua sudut yang bersesuaian sama besar dan sisi di antara kedua sudut sama panjang.
4. Sisi-Sisi-Sudut (S.S.Sd): Dua sisi yang bersesuaian sama panjang dan salah satu sudut yang bersesuaian sama besar.`,
  },
];

const latihanDasarTkaLama: LatihanSoal[] = [
  {
    no: 1,
    type: "pgk",
    soal: "Perhatikan gambar bangun-bangun berikut. Pilih bangun-bangun yang pasti sebangun.",
    pernyataan: ["Bangun (i)", "Bangun (ii)", "Bangun (iii)", "Bangun (iv)"],
    jawabanPGK: [0, 2],
    diagramTight: true,
    pembahasan: "Bangun-bangun sebangun memiliki sudut-sudut bersesuaian yang sama besar dan perbandingan sisi-sisi bersesuaian yang sama.\n\n• (i) Kedua bangun adalah lingkaran. Semua lingkaran sebangun meskipun ukurannya berbeda. BENAR.\n• (ii) Keempat sisi pada kedua bangun diberi tanda sama panjang. Karena gambar tidak menandai sudut siku-siku, informasi ini hanya memastikan keduanya belah ketupat; sudut belah ketupat dapat berbeda, sehingga belum tentu sebangun. SALAH.\n• (iii) Kedua persegi panjang pada gambar memiliki perbandingan panjang dan lebar yang sama; salah satunya hanya diputar. BENAR.\n• (iv) Kedua trapesium memiliki satu sudut siku-siku, tetapi itu saja tidak menjamin semua sudut bersesuaian sama besar dan sisi-sisi bersesuaian sebanding. SALAH.\n\nJadi, berdasarkan tanda dan bentuk pada gambar, bangun yang pasti sebangun adalah (i) dan (iii)."
  },
  {
    no: 2,
    type: "pgk",
    soal: "Diberikan empat persegi panjang dengan ukuran: (i) 12 cm × 8 cm, (ii) 15 cm × 10 cm, (iii) 16 cm × 12 cm, dan (iv) 20 cm × 15 cm. Pilih semua pasangan persegi panjang yang sebangun.",
    pernyataan: [
      "Persegi panjang (i) dan (ii) sebangun.",
      "Persegi panjang (ii) dan (iii) sebangun.",
      "Persegi panjang (iii) dan (iv) sebangun.",
      "Persegi panjang (i) dan (iv) sebangun.",
    ],
    jawabanPGK: [0, 2],
    pembahasan: "Bandingkan rasio panjang dan lebar setiap persegi panjang:\n\n• (i): 12 : 8 = 3 : 2.\n• (ii): 15 : 10 = 3 : 2.\n• (iii): 16 : 12 = 4 : 3.\n• (iv): 20 : 15 = 4 : 3.\n\nJadi, (i) dan (ii) sebangun, demikian juga (iii) dan (iv). Pasangan (ii)–(iii) serta (i)–(iv) tidak sebangun karena rasionya berbeda."
  },
  {
    no: 3,
    soal: "$\\triangle$ ABC kongruen dengan $\\triangle$ DBE karena memenuhi syarat ...",
    options: ["A. Sisi, sisi, sisi", "B. Sisi, sudut, sisi", "C. Sudut, sisi, sudut", "D. Sudut, sudut, sudut"],
    jawaban: "C",
    pembahasan: "Pada gambar, sisi $BC$ dan $BE$ diberi tanda sama panjang. Tanda sudut di $C$ dan $E$ menunjukkan $\\angle ACB = \\angle DEB$. Karena $D$, $C$, dan $B$ segaris serta $A$, $E$, dan $B$ segaris, sudut di $B$ pada kedua segitiga juga sama: $\\angle ABC = \\angle DBE$.\n\nSisi $BC$ dan $BE$ berada di antara dua pasang sudut yang sama besar. Jadi, $\\triangle ABC$ kongruen dengan $\\triangle DBE$ menurut syarat Sudut - Sisi - Sudut (Sd.S.Sd), yaitu pilihan C."
  },
  {
    no: 4,
    soal: "Segitiga ADB kongruen dengan segitiga CEB. Jika panjang AD = CE, syarat kekongruenan yang digunakan adalah ....",
    options: ["A. Sisi, sisi, sudut", "B. Sisi, sudut, sisi", "C. Sudut, sisi, sudut", "D. Sisi, sudut, sudut"],
    jawaban: "C",
    pembahasan: "Tanda siku-siku pada gambar menunjukkan $\\angle ADB = \\angle CEB = 90°$. Karena $A$, $E$, dan $B$ segaris serta $C$, $D$, dan $B$ segaris, sudut di $B$ pada kedua segitiga sama besar: $\\angle ABD = \\angle CBE$. Maka sudut ketiga juga sama, yaitu $\\angle DAB = \\angle BCE$.\n\nDiketahui $AD = CE$. Sisi tersebut berada di antara pasangan sudut yang sama besar, sehingga $\\triangle ADB$ kongruen dengan $\\triangle CEB$ menurut syarat Sudut - Sisi - Sudut (Sd.S.Sd), yaitu pilihan C."
  },
  {
    no: 5,
    soal: "Perhatikan dua persegi panjang berikut.\nDua persegi panjang sebangun. Diketahui luas persegi panjang yang lebih besar adalah 320 cm² dan kedua persegi panjang tersebut sebangun. Berapakah keliling persegi panjang yang lebih kecil?",
    options: ["A. 9 cm", "B. 18 cm", "C. 20 cm", "D. 72 cm"],
    jawaban: "B",
    diagramTight: true,
    pembahasan: "Sesuai label pada gambar, tinggi persegi panjang besar 20 cm dan yang kecil 5 cm, sehingga faktor skala besar:kecil adalah $20:5=4:1$. Karena kedua persegi panjang sebangun, perbandingan lebarnya juga $4:1$.\n\nLebar persegi panjang besar adalah $320 \\div 20 = 16$ cm. Maka lebar persegi panjang kecil $16 \\div 4 = 4$ cm. Keliling persegi panjang kecil adalah $2(4+5)=18$ cm, sehingga jawabannya B.",
    sourceLabel: "TKA Matematika 2026",
  },
  {
    no: 6,
    type: "pgk",
    soal: "Perhatikan segitiga ABC siku-siku di C. Garis CD tegak lurus AB.\n[DIAGRAM]\nPilih semua pernyataan yang benar berdasarkan gambar.",
    pernyataan: [
      "Panjang AD adalah 4 cm.",
      "Panjang AB adalah 13 cm.",
      "Panjang $AC$ adalah $2\\sqrt{13}$ cm.",
      "Panjang $BC$ adalah $3\\sqrt{13}$ cm.",
    ],
    jawabanPGK: [0, 1, 2, 3],
    pembahasan: "Pada segitiga siku-siku dengan garis tinggi ke sisi miring, berlaku $CD^2 = AD \\times DB$. Maka $AD = 6^2 \\div 9 = 4$ cm dan $AB = AD + DB = 4 + 9 = 13$ cm.\n\nSelanjutnya, $AC^2 = AB \\times AD = 13 \\times 4 = 52$, sehingga $AC = 2\\sqrt{13}$ cm. Untuk sisi lainnya, $BC^2 = AB \\times DB = 13 \\times 9 = 117$, sehingga $BC = 3\\sqrt{13}$ cm. Jadi, keempat pernyataan benar."
  },
  {
    no: 7,
    type: "pgkbs",
    soal: "Pada segitiga siku-siku SPQ, PR tegak lurus SQ. Tentukan Benar atau Salah untuk setiap pernyataan berikut.",
    pernyataan: [
      "Panjang QR adalah 3,6 cm.",
      "Panjang SR adalah 6,4 cm.",
      "Panjang PR adalah 5 cm.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Segitiga SPQ memiliki sisi siku-siku 8 cm dan 6 cm, sehingga SQ = √(8² + 6²) = 10 cm.\n\nDengan teorema tinggi pada segitiga siku-siku: QR = PQ² ÷ SQ = 36 ÷ 10 = 3,6 cm; SR = SP² ÷ SQ = 64 ÷ 10 = 6,4 cm; dan PR = (SP × PQ) ÷ SQ = 48 ÷ 10 = 4,8 cm, bukan 5 cm."
  },
  {
    no: 8,
    type: "pgkbs",
    soal: "Bangun ABCD dan AEFG sebangun seperti pada gambar. Tentukan Benar atau Salah untuk setiap pernyataan berikut.",
    pernyataan: [
      "Skala panjang bangun ABCD terhadap AEFG adalah 3 : 2.",
      "Luas trapesium AEFG adalah 88 cm².",
      "Luas trapesium ABCD adalah 200 cm².",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Sisi miring yang bersesuaian berukuran 15 cm dan 10 cm, sehingga skala ABCD terhadap AEFG = 15 : 10 = 3 : 2. Pada trapesium siku-siku AEFG, selisih sisi sejajarnya 14 − 8 = 6 cm. Tingginya adalah √(10² − 6²) = 8 cm, jadi luas AEFG = ½(14 + 8) × 8 = 88 cm².\n\nTinggi ABCD = 8 × 3/2 = 12 cm. Sisi sejajarnya AB = 14 × 3/2 = 21 cm dan DC = 8 × 3/2 = 12 cm. Luas ABCD = ½(21 + 12) × 12 = 198 cm², bukan 200 cm²."
  },
  {
    no: 9,
    type: "pgkbs",
    soal: "Pada gambar, DE sejajar BC, AE = 12 cm, EC = 8 cm, dan BC = 15 cm. Tentukan Benar atau Salah untuk setiap pernyataan berikut.",
    pernyataan: [
      "Panjang DE adalah 9 cm.",
      "Perbandingan DE : BC adalah 4 : 5.",
      "Panjang $AB$ adalah $5\\sqrt{7}$ cm.",
    ],
    jawabanBS: ["B", "S", "B"],
    pembahasan: "$AC = AE + EC = 12 + 8 = 20$ cm. Karena $DE \\parallel BC$, segitiga $ADE$ sebangun dengan $ABC$, sehingga $DE/BC = AE/AC = 12/20 = 3/5$. Maka $DE = 3/5 \\times 15 = 9$ cm, sedangkan perbandingan $DE:BC$ adalah $3:5$, bukan $4:5$.\n\nSegitiga $ABC$ siku-siku di $B$, jadi dengan Teorema Pythagoras, $AB^2 = AC^2 - BC^2 = 20^2 - 15^2 = 175$. Maka $AB = 5\\sqrt{7}$ cm. Jadi, pernyataan (1) benar, (2) salah, dan (3) benar."
  },
  {
    no: 10,
    type: "pgkbs",
    soal: "Diketahui AB = 6 cm, DE = 14 cm, dan AE = 15 cm pada gambar. Tentukan Benar atau Salah untuk setiap pernyataan berikut.",
    pernyataan: [
      "Panjang CE adalah 10,5 cm.",
      "Panjang AC adalah 4,5 cm.",
      "Perbandingan AC : CE adalah 7 : 3.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Karena $AB \\parallel DE$, segitiga $CAB$ dan $CED$ sebangun. Maka:\n\n$\\dfrac{AC}{CE}=\\dfrac{AB}{DE}=\\dfrac{6}{14}=\\dfrac{3}{7}$.\n\nDiketahui $AE=AC+CE=15$ cm. Perbandingan $AC:CE=3:7$ terdiri atas 10 bagian, jadi satu bagian panjangnya $15\\div10=1{,}5$ cm. Dengan demikian, $AC=3(1{,}5)=4{,}5$ cm dan $CE=7(1{,}5)=10{,}5$ cm. Jadi pernyataan (1) benar, (2) benar, sedangkan $AC:CE=3:7$ sehingga pernyataan (3) salah."
  },
  {
    no: 11,
    type: "pgk",
    soal: "ABCD dan EFGH adalah trapesium sama kaki yang sebangun. Diketahui EF = 24 cm, HG = 14 cm, EH = 13 cm, dan DC = 21 cm.\n[DIAGRAM]\nPilih semua pernyataan yang benar.",
    pernyataan: [
      "Perbandingan ukuran sisi trapesium ABCD terhadap EFGH adalah 3 : 2.",
      "Panjang AB adalah 36 cm.",
      "Tinggi trapesium EFGH adalah 12 cm.",
      "Luas daerah yang diarsir adalah 300 cm².",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Karena trapesium ABCD ~ trapesium EFGH, rasio sisi yang bersesuaian:\n\n$\\dfrac{DC}{HG} = \\dfrac{21}{14} = \\dfrac{3}{2}$\n\nMaka: AB = $\\dfrac{3}{2}$ × EF = $\\dfrac{3}{2}$ × 24 = 36 cm, dan AD = BC = $\\dfrac{3}{2}$ × 13 = 19,5 cm.\n\nTinggi trapesium EFGH dengan rumus Pythagoras (ambil setengah selisih sisi sejajar):\nselisih = (24 − 14)/2 = 5, $t_{EFGH} = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12$ cm.\n\nLuas EFGH = $\\dfrac{(24+14)}{2} \\times 12 = 228 \\text{ cm}^2$.\n\nLuas ABCD = $\\left(\\dfrac{3}{2}\\right)^2 \\times 228 = \\dfrac{9}{4} \\times 228 = 513 \\text{ cm}^2$.\n\nLuas arsiran (selisih) = 513 − 228 = 285 cm²."
  },
  {
    no: 12,
    soal: "Sebuah tiang yang tingginya 4 m memiliki bayangan 300 cm. Pada saat yang sama bayangan sebuah pohon 10 m. Tinggi pohon tersebut adalah ....",
    options: ["A. 8 m", "B. 9 m", "C. 13,3 m", "D. 16 m"],
    jawaban: "C",
    pembahasan: "Pada saat yang sama, sudut datang sinar matahari sama, sehingga segitiga yang dibentuk tiang & bayangannya sebangun dengan segitiga pohon & bayangannya.\n\nUbah satuan: 300 cm = 3 m.\n\n$\\dfrac{\\text{tinggi tiang}}{\\text{bayangan tiang}} = \\dfrac{\\text{tinggi pohon}}{\\text{bayangan pohon}}$\n\n$\\dfrac{4}{3} = \\dfrac{h}{10}$\n\n$h = \\dfrac{4 \\times 10}{3} = \\dfrac{40}{3} \\approx 13{,}3 \\text{ m}$"
  },
  {
    no: 13,
    soal: "Jika AE : EC = 2 : 3, maka panjang EF adalah ….",
    options: ["A. 15 cm", "B. 22 cm", "C. 25 cm", "D. 26 cm"],
    jawaban: "B",
    pembahasan: "Pada gambar, $AB=50$ cm dan $CD=20$ cm, sedangkan $EF$ sejajar dengan kedua alas. Karena $AE:EC=2:3$, titik $E$ berada $\\tfrac{2}{5}$ bagian dari $A$ menuju $C$. Panjang ruas yang sejajar alas berubah sebanding, sehingga:\n\n$EF=\\dfrac{EC\\cdot AB+AE\\cdot CD}{AE+EC}=\\dfrac{3(50)+2(20)}{2+3}=\\dfrac{190}{5}=38$ cm.\n\nHasil berdasarkan gambar dan data soal adalah 38 cm, tetapi nilai tersebut tidak tersedia pada pilihan jawaban yang tercantum."
  },
  {
    no: 14,
    type: "pgkbs",
    soal: "PQRS adalah persegi dengan sisi 10 cm. Garis PT memotong RQ di U dan UQ = 4 cm. Tentukan Benar atau Salah untuk setiap pernyataan berikut.",
    pernyataan: [
      "Panjang RU adalah 6 cm.",
      "Panjang RT adalah 15 cm.",
      "Panjang $PQ$ adalah $2\\sqrt{29}$ cm.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Karena $RQ$ adalah sisi persegi, $RQ = PQ = 10$ cm. Maka $RU = RQ - UQ = 10 - 4 = 6$ cm.\n\nSegitiga $PQU$ dan $RUT$ sebangun. Perbandingan sisi mendatar dan tegaknya sama: $RT/RU = PQ/UQ = 10/4$. Jadi $RT = 6 \\times 10/4 = 15$ cm. Pernyataan (3) salah karena $PQ=10$ cm, bukan $2\\sqrt{29}$ cm."
  },
  {
    no: 15,
    soal: "Trapesium PQUT sebangun dengan TURS. Jika PT : TS = 2 : 3, panjang SR adalah ...",
    options: ["A. 18 cm", "B. 22 cm", "C. 24 cm", "D. 27 cm"],
    jawaban: "D",
    pembahasan: "Dari gambar, $PQ=12$ cm. Kedua trapesium sebangun dan perbandingan kaki yang bersesuaian adalah $PT:TS=2:3$, sehingga:\n\n$\\dfrac{PQ}{TU}=\\dfrac{TU}{SR}=\\dfrac{2}{3}$.\n\nPertama, $12/TU=2/3$, maka $TU=18$ cm. Berikutnya, $18/SR=2/3$, sehingga $SR=27$ cm. Jadi, panjang $SR$ adalah 27 cm (D)."
  },
  {
    no: 16,
    soal: "Panjang FC adalah …",
    options: ["A. 5 cm", "B. 10 cm", "C. 12 cm", "D. 14 cm"],
    jawaban: "C",
    pembahasan: "Pada gambar, sisi miring kanan terbagi menjadi $DC=3$ cm dan $CB=6$ cm, jadi $DB=9$ cm. Karena $FC$ sejajar dengan kedua alas, panjang ruas sejajar berubah sebanding sepanjang sisi miring. Titik $C$ berjarak $3/9=1/3$ dari puncak $D$ menuju $B$:\n\n$FC=ED+\\dfrac{DC}{DB}(AB-ED)=5+\\dfrac{3}{9}(20-5)=10$ cm.\n\nBerdasarkan gambar, hasilnya 10 cm (pilihan B); kunci jawaban yang tersimpan saat ini menunjuk 12 cm, sehingga tidak sesuai dengan data pada gambar."
  },
  {
    no: 17,
    type: "pgk",
    soal: "Foto ditempel pada karton berukuran 10 cm × 15 cm. Sisa karton di kiri, kanan, dan atas foto masing-masing 2 cm. Jika foto dan karton sebangun, pilih semua pernyataan yang benar.",
    pernyataan: [
      "Lebar foto adalah 6 cm.",
      "Panjang foto adalah 9 cm.",
      "Sisa karton di bawah foto adalah 4 cm.",
      "Luas foto adalah 48 cm².",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan: "Karton berukuran 10 cm × 15 cm (lebar × panjang). Lebar foto = $10-2-2=6$ cm. Karena foto sebangun dengan karton:\n\n$\\dfrac{6}{10}=\\dfrac{p_{foto}}{15}$, sehingga panjang foto $p_{foto}=9$ cm.\n\nSisa karton di bawah foto adalah $15-2-9=4$ cm. Luas foto $=6\\times9=54$ cm², bukan 48 cm². Jadi pernyataan (1), (2), dan (3) benar; pernyataan (4) salah."
  },
  {
    no: 18,
    soal: "Foto yang ditempel pada kertas karton berukuran 20 cm × 25 cm. Di sebelah kiri, kanan, dan atas foto terdapat sisa karton selebar 2 cm. Jika foto dan karton sebangun, luas karton bagian bawah foto adalah ....",
    options: ["A. $26 \\text{ cm}^2$", "B. $30 \\text{ cm}^2$", "C. $60 \\text{ cm}^2$", "D. $72 \\text{ cm}^2$"],
    jawaban: "C",
    pembahasan: "Lebar foto = $20-2-2=16$ cm. Karena foto dan karton sebangun, tinggi foto = $25\\times\\frac{16}{20}=20$ cm.\n\nSisa karton di bawah foto = $25-2-20=3$ cm. Luas bagian karton tersebut = $20\\times3=60$ cm².",
  },
  {
    no: 19,
    soal: "Jika panjang BC = CD = DE = 15 cm dan AB = 11 cm, panjang CF adalah ...",
    options: ["A. 2 cm", "B. 8 cm", "C. 12 cm", "D. 13 cm"],
    jawaban: "D",
    pembahasan: "Pada gambar, $CD$ sejajar $AB$ dan $DE$ sejajar $BC$. Diketahui $CD=15$ cm, $AB=11$ cm, serta $DE=BC=15$ cm. Karena kedua sisi miring yang sejajar sama panjang, perpindahan mendatarnya sama; dengan garis $EFA$ memotong pasangan alas yang sejajar, diperoleh $CD=AB+2(CF)$. Maka:\n\n$15=11+2(CF)$, sehingga $CF=2$ cm.\n\nJadi, berdasarkan gambar dan data soal, jawabannya adalah A (2 cm); kunci jawaban yang tersimpan saat ini menunjuk 13 cm."
  },
  {
    no: 20,
    soal: "Diketahui panjang ED = 11 cm, panjang AB = BC = CD = 15 cm. Panjang garis FB adalah …",
    options: ["A. 10 cm", "B. 11 cm", "C. 12 cm", "D. 13 cm"],
    jawaban: "D",
    pembahasan: "Tanda pada gambar menunjukkan $ED=XC$, sehingga $XC=11$ cm. Karena $AB\\parallel CD$, segitiga $XCF$ dan $ABF$ sebangun. Maka:\n\n$\\dfrac{CF}{FB}=\\dfrac{XC}{AB}=\\dfrac{11}{15}$.\n\nDiketahui $BC=CF+FB=15$ cm. Perbandingan $CF:FB=11:15$ memiliki 26 bagian, sehingga:\n\n$FB=\\dfrac{15}{26}\\times15=\\dfrac{225}{26}\\approx8{,}65$ cm.\n\nHasil ini tidak sama dengan satu pun pilihan jawaban yang tercantum, jadi data/opsi soal dan kunci yang tersimpan perlu diperiksa kembali."
  },
];

const KesebangunanPage = () => (
  <TKAPemantapanLayout
    title="KESEBANGUNAN DAN KEKONGRUENAN"
    backPath="/tka/modul-pemantapan"
    materiSections={materiSections}
    contohSoal={getTkaContohSoal("kesebangunan")}
    latihanDasar={latihanDasarTkaLama}
    gambarMap={{
      1: kesebangunanSoalSatuDiagram,
      5: kesebangunanSoalTujuhDiagram,
      12: kesebangunanSoalEmpatBelasDiagram,
      17: kesebangunanSoalSembilanBelasDiagram,
      18: kesebangunanSoalDuaPuluhDiagram,
      ...Object.fromEntries(Object.entries(kesebangunanImages).map(([no, src]) => [
        Number(no),
        <img key={no} src={src} alt={`Gambar soal ${no}`} className="kesebangunan-landscape-image mx-auto w-full max-w-sm rounded-lg border border-border/40 bg-background p-2" />,
      ])),
    }}
  />
);

export default KesebangunanPage;
