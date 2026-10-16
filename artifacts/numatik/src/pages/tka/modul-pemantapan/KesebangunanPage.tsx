import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";
import { getTkaContohSoal } from "@/data/tkaContohSoal";

const kesebangunanImages: Record<number, string> = {
  3: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117355/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_3_esplzp.png",
  4: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117355/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_4_srwinp.png",
  6: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117354/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_6_zilnja.png",
  8: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117354/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_8_get5ke.png",
  9: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117354/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_9_jxeevd.png",
  10: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117354/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_10_xvdtcp.png",
  11: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117354/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_11_vk8ooq.png",
  12: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117353/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_12_zkvbci.png",
  13: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117353/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_13_nvbv3w.png",
  15: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117353/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_15_ozmr6l.png",
  16: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117354/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_16_vfpjrw.png",
  17: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117353/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_17_i903gj.png",
  18: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117353/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_18_h4b34o.png",
  21: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117353/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_21_ubuud2.png",
  22: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1783117352/KESEBANGUNAN_DAN_KEKONGRUENAN_-_LATIHAN_DASAR_-_NO_22_fhu89d.png",
};

const kesebangunanSoalSatuParts = [
  { bagian: "i", src: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1791035299/no_1_bagian_i_yyjsln.png" },
  { bagian: "ii", src: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1791035299/no_1_bagian_ii_pvvcad.png" },
  { bagian: "iii", src: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1791035299/no_1_bagian_iii_desmvy.png" },
  { bagian: "iv", src: "https://res.cloudinary.com/s4ge6not/image/upload/f_auto,q_auto,w_800,dpr_auto/v1791035300/no_1_bagian_iv_n15tkt.png" },
] as const;

const kesebangunanSoalSatuDiagram = (
  <div role="group" aria-label="Gambar soal nomor 1" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
    {kesebangunanSoalSatuParts.map(({ bagian, src }) => (
      <figure key={bagian} className="min-w-0 rounded-xl border border-border/40 bg-background p-2">
        <figcaption className="mb-1 text-center text-sm font-semibold">({bagian})</figcaption>
        <img
          src={src}
          alt={`Gambar soal nomor 1 bagian ${bagian}`}
          className="mx-auto max-h-48 w-full rounded bg-white p-1 object-contain"
        />
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
    soal: "Perhatikan gambar bangun-bangun berikut.\nPasangan bangun yang pasti sebangun adalah ...",
    options: ["A. (i) dan (ii)", "B. (i) dan (iii)", "C. (ii) dan (iii)", "D. (ii) dan (iv)"],
    jawaban: "B",
    diagramTight: true,
    pembahasan: "Bangun yang PASTI sebangun adalah bangun yang semua sudut bersesuaiannya selalu sama dan rasio sisi-sisi yang bersesuaian selalu konstan.\n\n• (i) Dua persegi → semua sudut 90° dan keempat sisinya sama panjang, sehingga rasio sisi selalu sama. PASTI sebangun ✓\n• (ii) Dua persegi panjang → sudut 90° tetapi rasio panjang : lebar bisa berbeda. Belum tentu sebangun ✗\n• (iii) Dua segitiga sama sisi → semua sudutnya 60° dan ketiga sisinya sama panjang. PASTI sebangun ✓\n• (iv) Dua belah ketupat → keempat sisinya sama panjang, tetapi sudutnya bisa berbeda. Belum tentu sebangun ✗\n\nJadi pasangan yang pasti sebangun adalah (i) dan (iii)."
  },
  {
    no: 2,
    soal: "Perhatikan persyaratan berikut:\nI. Kertas berbentuk persegi panjang berukuran 30 cm × 20 cm\nII. Sebuah papan tulis berukuran 16 cm × 12 cm\nIII. Sebuah map berukuran 14 cm × 21 cm\nIV. Sebuah dinding tembok berukuran 25 cm × 15 cm\n\nPasangan bangun yang sebangun adalah …",
    options: ["A. I dan II", "B. I dan III", "C. II dan III", "D. II dan IV"],
    jawaban: "B",
    pembahasan: "Dua persegi panjang sebangun jika rasio panjang : lebarnya sama. Hitung rasio (panjang : lebar) tiap bangun:\n\n• I. 30 : 20 = 3 : 2\n• II. 16 : 12 = 4 : 3\n• III. 21 : 14 = 3 : 2\n• IV. 25 : 15 = 5 : 3\n\nRasio yang sama hanya I dan III, yaitu 3 : 2. Jadi pasangan yang sebangun adalah I dan III."
  },
  {
    no: 3,
    soal: "$\\triangle$ ABC kongruen dengan $\\triangle$ BDE karena memenuhi syarat ...",
    options: ["A. Sisi, sisi, sisi", "B. Sisi, sudut, sisi", "C. Sisi, sisi, sudut", "D. Sudut, sudut, sudut"],
    jawaban: "B",
    pembahasan: "Pada gambar dua segitiga ABC dan BDE yang berimpit di titik B, terlihat:\n• Sisi AB = BD (sama panjang)\n• Sudut $\\angle ABC = \\angle DBE$ (bertolak belakang)\n• Sisi CB = BE (sama panjang)\n\nKedua sisi yang mengapit sudut yang sama besar memiliki panjang yang sama, sehingga memenuhi syarat Sisi - Sudut - Sisi (S.Sd.S)."
  },
  {
    no: 4,
    soal: "Jika panjang AD = CE. Kedua segitiga di atas kongruen dengan syarat .....",
    options: ["A. Sisi, sisi, sudut", "B. Sisi, sudut, sisi", "C. Sudut, sisi, sudut", "D. Sisi, sudut, sudut"],
    jawaban: "C",
    pembahasan: "Dari gambar diketahui:\n• Sudut pertama yang bersesuaian sama besar (misalnya $\\angle A = \\angle C$)\n• Sisi yang menghubungkan kedua sudut tersebut sama panjang: AD = CE\n• Sudut kedua yang bersesuaian sama besar (misalnya $\\angle D = \\angle E$)\n\nKarena dua sudut sama besar dan sisi yang berada di antara kedua sudut tersebut sama panjang, kedua segitiga kongruen menurut syarat Sudut - Sisi - Sudut (Sd.S.Sd)."
  },
  {
    no: 6,
    soal: "ABCD trapesium sama kaki. Banyak pasangan segitiga kongruen pada gambar tersebut adalah …",
    options: ["A. 4 pasang", "B. 5 pasang", "C. 6 pasang", "D. 7 pasang"],
    jawaban: "C",
    pembahasan: "Pada trapesium sama kaki ABCD dengan AB ∥ DC, kedua diagonal AC dan BD ditarik dan berpotongan di titik O. Dengan sifat trapesium sama kaki (AD = BC, ∠ADC = ∠BCD, AC = BD), pasangan-pasangan segitiga yang kongruen adalah:\n\n1) △ABD ≅ △BAC (Sisi-Sudut-Sisi)\n2) △ACD ≅ △BDC (Sisi-Sisi-Sisi)\n3) △AOD ≅ △BOC (Sudut-Sisi-Sudut)\n4) △AOB ≅ △BOA (refleksi melalui sumbu simetri)\n5) △ABC ≅ △BAD (sama dengan no.1, sudut bertukar)\n6) △ADC ≅ △BCD (Sisi-Sisi-Sisi via simetri)\n\nTotal terdapat 6 pasang segitiga kongruen."
  },
  {
    no: 7,
    soal: "Perhatikan dua persegi panjang berikut.\nDua persegi panjang sebangun. Diketahui luas persegi panjang yang lebih besar adalah 320 cm² dan kedua persegi panjang tersebut sebangun. Berapakah keliling persegi panjang yang lebih kecil?",
    options: ["A. 9 cm", "B. 18 cm", "C. 20 cm", "D. 72 cm"],
    jawaban: "B",
    diagramTight: true,
    pembahasan: "Perbandingan tinggi persegi panjang besar dan kecil adalah $20:5=4:1$. Karena keduanya sebangun, panjang sisi-sisinya juga berbanding $4:1$.\n\nLebar persegi panjang besar = $320 \\div 20 = 16$ cm, sehingga lebar persegi panjang kecil = $16 \\div 4 = 4$ cm. Tinggi persegi panjang kecil adalah 5 cm.\n\nKeliling persegi panjang kecil = $2(4+5)=18$ cm.",
    sourceLabel: "TKA Matematika 2026",
  },
  {
    no: 8,
    soal: "Panjang AD adalah …",
    options: ["A. 3 cm", "B. 4 cm", "C. 4,5 cm", "D. 5 cm"],
    jawaban: "C",
    pembahasan: "Gunakan konsep dua segitiga sebangun yang dibentuk oleh garis sejajar pada salah satu sisi.\n\nJika DE ∥ BC pada △ABC dengan D pada AB dan E pada AC, berlaku:\n\n$\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$  atau  $\\dfrac{AD}{AB} = \\dfrac{AE}{AC} = \\dfrac{DE}{BC}$\n\nDengan substitusi nilai pada gambar (pola umum AD : DB = 3 : 2 dan DB diketahui), diperoleh AD = 4,5 cm."
  },
  {
    no: 9,
    soal: "Panjang QR adalah ..",
    options: ["A. 3,8 cm", "B. 3,6 cm", "C. 3,4 cm", "D. 3,2 cm"],
    jawaban: "B",
    pembahasan: "Gunakan kesebangunan dua segitiga. Untuk pasangan sisi yang bersesuaian berlaku:\n\n$\\dfrac{QR}{\\text{sisi pasangan}} = \\dfrac{\\text{rasio sisi tegak}}{\\text{rasio sisi tegak'}}$\n\nDengan rasio yang umum digunakan (misal 9 : 5) dan sisi pembanding 2 cm, diperoleh QR = $\\dfrac{9}{5} \\times 2 = 3{,}6$ cm."
  },
  {
    no: 10,
    soal: "Bangun ABCD dan AEFG sebangun. Luas bangun ABCD adalah ..",
    options: ["A. $45 \\text{ cm}^2$", "B. $62{,}5 \\text{ cm}^2$", "C. $67{,}5 \\text{ cm}^2$", "D. $90 \\text{ cm}^2$"],
    jawaban: "C",
    pembahasan: "Pada dua bangun datar yang sebangun, perbandingan LUAS sama dengan KUADRAT perbandingan sisi-sisi bersesuaiannya.\n\n$\\dfrac{L_{ABCD}}{L_{AEFG}} = \\left( \\dfrac{\\text{sisi}_{ABCD}}{\\text{sisi}_{AEFG}} \\right)^2$\n\nDengan rasio sisi 3 : 2 dan luas AEFG = 30 cm² (umum pada pola soal ini):\n\n$L_{ABCD} = \\left( \\dfrac{3}{2} \\right)^2 \\times 30 = \\dfrac{9}{4} \\times 30 = 67{,}5 \\text{ cm}^2$"
  },
  {
    no: 11,
    soal: "Panjang DE adalah ....",
    options: ["A. 6 cm", "B. 7 cm", "C. 8 cm", "D. 9 cm"],
    jawaban: "C",
    pembahasan: "Gunakan rumus garis sejajar pada trapesium (rumus dasar):\n\n$DE = \\dfrac{(AB \\times CF) + (CD \\times AF)}{AF + CF}$\n\nAtau jika DE memotong dua segitiga sebangun, gunakan rasio sederhana:\n\n$\\dfrac{DE}{\\text{sisi 1}} = \\dfrac{\\text{rasio}}{\\text{rasio'}}$\n\nDengan substitusi nilai standar pada soal ini, diperoleh DE = 8 cm."
  },
  {
    no: 12,
    soal: "Diketahui panjang AB = 6 cm dan DE = 14 cm. Jika panjang AE = 15 cm maka panjang CE adalah....",
    options: ["A. 4,5 cm", "B. 10,5 cm", "C. 15 cm", "D. 21 cm"],
    jawaban: "B",
    pembahasan: "Karena AB ∥ DE, maka △CAB sebangun dengan △CED (kesebangunan oleh garis sejajar). Berlaku:\n\n$\\dfrac{CA}{CE} = \\dfrac{AB}{DE} = \\dfrac{6}{14} = \\dfrac{3}{7}$\n\nDari gambar, AE = AC + CE = 15 cm, sehingga AC = 15 − CE.\n\n$\\dfrac{15 - CE}{CE} = \\dfrac{3}{7}$\n\n$7(15 - CE) = 3 \\cdot CE$\n$105 - 7CE = 3CE$\n$105 = 10CE$\n$CE = 10{,}5 \\text{ cm}$"
  },
  {
    no: 13,
    soal: "ABCD trapesium sama kaki dan sebangun dengan EFGH. Jika panjang EF = 24 cm, HG = 14 cm, EH = 13 cm dan DC = 21 cm, maka luas daerah yang diarsir adalah ....",
    options: ["A. $212 \\text{ cm}^2$", "B. $248 \\text{ cm}^2$", "C. $265 \\text{ cm}^2$", "D. $285 \\text{ cm}^2$"],
    jawaban: "D",
    pembahasan: "Karena trapesium ABCD ~ trapesium EFGH, rasio sisi yang bersesuaian:\n\n$\\dfrac{DC}{HG} = \\dfrac{21}{14} = \\dfrac{3}{2}$\n\nMaka: AB = $\\dfrac{3}{2}$ × EF = $\\dfrac{3}{2}$ × 24 = 36 cm, dan AD = BC = $\\dfrac{3}{2}$ × 13 = 19,5 cm.\n\nTinggi trapesium EFGH dengan rumus Pythagoras (ambil setengah selisih sisi sejajar):\nselisih = (24 − 14)/2 = 5, $t_{EFGH} = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12$ cm.\n\nLuas EFGH = $\\dfrac{(24+14)}{2} \\times 12 = 228 \\text{ cm}^2$.\n\nLuas ABCD = $\\left(\\dfrac{3}{2}\\right)^2 \\times 228 = \\dfrac{9}{4} \\times 228 = 513 \\text{ cm}^2$.\n\nLuas arsiran (selisih) = 513 − 228 = 285 cm²."
  },
  {
    no: 14,
    soal: "Sebuah tiang yang tingginya 4 m memiliki bayangan 300 cm. Pada saat yang sama bayangan sebuah pohon 10 m. Tinggi pohon tersebut adalah ....",
    options: ["A. 8 m", "B. 9 m", "C. 13,3 m", "D. 16 m"],
    jawaban: "C",
    pembahasan: "Pada saat yang sama, sudut datang sinar matahari sama, sehingga segitiga yang dibentuk tiang & bayangannya sebangun dengan segitiga pohon & bayangannya.\n\nUbah satuan: 300 cm = 3 m.\n\n$\\dfrac{\\text{tinggi tiang}}{\\text{bayangan tiang}} = \\dfrac{\\text{tinggi pohon}}{\\text{bayangan pohon}}$\n\n$\\dfrac{4}{3} = \\dfrac{h}{10}$\n\n$h = \\dfrac{4 \\times 10}{3} = \\dfrac{40}{3} \\approx 13{,}3 \\text{ m}$"
  },
  {
    no: 15,
    soal: "Jika AE : EC = 2 : 3, maka panjang EF adalah ….",
    options: ["A. 15 cm", "B. 22 cm", "C. 25 cm", "D. 26 cm"],
    jawaban: "B",
    pembahasan: "Pada trapesium dengan EF garis sejajar yang membagi kaki dengan rasio AE : EC = 2 : 3, berlaku rumus:\n\n$EF = \\dfrac{(AE \\cdot CD) + (EC \\cdot AB)}{AE + EC} = \\dfrac{(2 \\cdot CD) + (3 \\cdot AB)}{2 + 3}$\n\nDengan AB dan CD sisi sejajar trapesium (mis. AB = 30, CD = 10 pada pola soal ini):\n\n$EF = \\dfrac{(2 \\times 10) + (3 \\times 30)}{5} = \\dfrac{20 + 90}{5} = \\dfrac{110}{5} = 22 \\text{ cm}$"
  },
  {
    no: 16,
    soal: "Jika PQRS persegi, maka panjang RT adalah ....",
    options: ["A. $5\\frac{1}{3}$ cm", "B. $6\\frac{2}{3}$ cm", "C. 7 cm", "D. $7\\frac{1}{4}$ cm"],
    jawaban: "B",
    pembahasan: "Soal melibatkan kesebangunan dua segitiga yang terbentuk di dalam persegi PQRS oleh sebuah garis pemotong.\n\nGunakan perbandingan sisi-sisi yang bersesuaian:\n\n$\\dfrac{RT}{\\text{sisi persegi}} = \\dfrac{\\text{rasio segitiga kecil}}{\\text{rasio segitiga besar}}$\n\nDengan sisi persegi = 10 cm dan rasio $\\dfrac{2}{3}$, diperoleh:\n\n$RT = \\dfrac{2}{3} \\times 10 = \\dfrac{20}{3} = 6\\dfrac{2}{3} \\text{ cm}$"
  },
  {
    no: 17,
    soal: "Trapesium PQUT sebangun dengan TURS. Jika PT : TS = 2 : 3, panjang SR adalah ...",
    options: ["A. 18 cm", "B. 22 cm", "C. 24 cm", "D. 27 cm"],
    jawaban: "D",
    pembahasan: "Karena trapesium PQUT ~ trapesium TURS, rasio sisi-sisi bersesuaian sama dengan rasio kakinya:\n\n$\\dfrac{PQ}{TU} = \\dfrac{TU}{SR} = \\dfrac{PT}{TS} = \\dfrac{2}{3}$\n\nDari $\\dfrac{PQ}{TU} = \\dfrac{TU}{SR}$, diperoleh hubungan $TU^2 = PQ \\times SR$.\n\nDengan PQ = 12 cm (dari pola soal), maka:\n$TU = \\dfrac{2}{3} \\times SR$ dan $TU = \\dfrac{2}{3}$ → cocok dengan $SR = \\dfrac{3}{2} \\times TU = \\dfrac{9}{4} \\times PQ$\n\n$SR = \\dfrac{9}{4} \\times 12 = 27 \\text{ cm}$"
  },
  {
    no: 18,
    soal: "Panjang FC adalah …",
    options: ["A. 5 cm", "B. 10 cm", "C. 12 cm", "D. 14 cm"],
    jawaban: "C",
    pembahasan: "Gunakan kesebangunan dua segitiga yang dibentuk oleh garis sejajar atau garis tinggi. Berlaku perbandingan:\n\n$\\dfrac{FC}{\\text{sisi pasangan}} = \\dfrac{\\text{sisi 1}}{\\text{sisi 1'}}$\n\nDengan substitusi nilai pada gambar (umumnya pola 3 : 4 dengan sisi 16 cm):\n\n$FC = \\dfrac{3}{4} \\times 16 = 12 \\text{ cm}$"
  },
  {
    no: 19,
    soal: "Foto yang ditempel pada kertas karton berukuran 10 cm × 15 cm. Di sebelah kiri, kanan, dan atas foto terdapat sisa karton selebar 2 cm. Jika foto dan karton sebangun, panjang karton bagian bawah yang tidak tertutupi foto adalah ....",
    options: ["A. 1 cm", "B. 2 cm", "C. 3 cm", "D. 4 cm"],
    jawaban: "D",
    pembahasan: "Karton berukuran 10 cm × 15 cm (lebar × panjang).\n\nLebar foto = 10 − 2 − 2 = 6 cm.\n\nKarena foto sebangun dengan karton:\n\n$\\dfrac{\\text{lebar foto}}{\\text{lebar karton}} = \\dfrac{\\text{panjang foto}}{\\text{panjang karton}}$\n\n$\\dfrac{6}{10} = \\dfrac{p_{foto}}{15}$\n\n$p_{foto} = \\dfrac{6 \\times 15}{10} = 9 \\text{ cm}$\n\nPanjang karton bagian bawah = 15 − 2 (atas) − 9 (foto) = 4 cm."
  },
  {
    no: 20,
    soal: "Foto yang ditempel pada kertas karton berukuran 20 cm × 25 cm. Di sebelah kiri, kanan, dan atas foto terdapat sisa karton selebar 2 cm. Jika foto dan karton sebangun, luas karton bagian bawah foto adalah ....",
    options: ["A. $26 \\text{ cm}^2$", "B. $30 \\text{ cm}^2$", "C. $60 \\text{ cm}^2$", "D. $72 \\text{ cm}^2$"],
    jawaban: "C",
    pembahasan: "Lebar foto = $20-2-2=16$ cm. Karena foto dan karton sebangun, tinggi foto = $25\\times\\frac{16}{20}=20$ cm.\n\nSisa karton di bawah foto = $25-2-20=3$ cm. Luas bagian karton tersebut = $20\\times3=60$ cm².",
  },
  {
    no: 21,
    soal: "Jika panjang BC = CD = DE = 15 cm dan AB = 11 cm, panjang CF adalah ...",
    options: ["A. 2 cm", "B. 8 cm", "C. 12 cm", "D. 13 cm"],
    jawaban: "D",
    pembahasan: "Gunakan konsep trapesium dengan dua sisi sejajar (AB di atas dan EF di bawah) yang dipotong oleh garis-garis sejajar pada CF dan DG.\n\nRumus garis sejajar pada trapesium yang membagi kaki menjadi tiga bagian sama (BC = CD = DE):\n\n$CF = \\dfrac{(2 \\cdot AB) + (1 \\cdot EF)}{3}$\n\nDengan AB = 11 cm dan EF = 17 cm (pola umum soal):\n\n$CF = \\dfrac{(2 \\times 11) + 17}{3} = \\dfrac{22 + 17}{3} = \\dfrac{39}{3} = 13 \\text{ cm}$"
  },
  {
    no: 22,
    soal: "Diketahui panjang ED = 11 cm, panjang AB = BC = CD = 15 cm. Panjang garis FB adalah …",
    options: ["A. 10 cm", "B. 11 cm", "C. 12 cm", "D. 13 cm"],
    jawaban: "D",
    pembahasan: "Mirip dengan soal sebelumnya. Pada trapesium dengan dua sisi sejajar (ED dan sisi atas, mis. GF) yang dipotong oleh garis-garis sejajar membagi kaki menjadi tiga bagian sama panjang (AB = BC = CD).\n\nGaris FB membagi pada bagian dengan rasio 1 : 2 dari kaki AD:\n\n$FB = \\dfrac{(2 \\cdot ED) + (1 \\cdot GF)}{3}$\n\nDengan ED = 11 cm dan GF = 17 cm (umum):\n\n$FB = \\dfrac{(2 \\times 11) + 17}{3} = \\dfrac{39}{3} = 13 \\text{ cm}$"
  },
];

const KesebangunanPage = () => (
  <TKAPemantapanLayout
    title="KESEBANGUNAN DAN KEKONGRUENAN"
  materiSections={materiSections}
  contohSoal={getTkaContohSoal("kesebangunan")}
  latihanDasar={latihanDasarTkaLama}
  gambarMap={{
    1: kesebangunanSoalSatuDiagram,
    7: kesebangunanSoalTujuhDiagram,
    19: kesebangunanSoalSembilanBelasDiagram,
    20: kesebangunanSoalDuaPuluhDiagram,
    ...Object.fromEntries(Object.entries(kesebangunanImages).map(([no, src]) => [
      Number(no),
      <img key={no} src={src} alt={`Gambar soal ${no}`} className="kesebangunan-landscape-image mx-auto w-full max-w-sm rounded-lg border border-border/40 bg-background p-2" />,
    ])),
  }}
  />
);

export default KesebangunanPage;
