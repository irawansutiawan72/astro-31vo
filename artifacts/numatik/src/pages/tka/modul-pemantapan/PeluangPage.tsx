import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";
import diagramKelereng from "@assets/image_1787583206453.png";
import papanSpinner from "@assets/image_1787585871802.png";

const materiSections: MateriSection[] = [
  { heading: "A. Ruang Sampel", content: `Ruang sampel (S) = himpunan semua kemungkinan hasil percobaan.\n\nKejadian (A) = bagian dari ruang sampel.\n\nContoh:\n- Melempar dadu: S = {1, 2, 3, 4, 5, 6}, n(S) = 6\n- Melempar koin: S = {A (angka), G (gambar)}, n(S) = 2\n- Melempar 2 koin: S = {AA, AG, GA, GG}, n(S) = 4` },
  { heading: "B. Frekuensi Relatif (Peluang Empirik)", content: `Frekuensi relatif menunjukkan perbandingan banyaknya suatu kejadian dengan banyak seluruh percobaan. Nilainya dapat digunakan sebagai peluang empirik.\n\n[SUBHEADING:Rumus frekuensi relatif (peluang empirik)]\n[BLOCKMATH:P(A) = \\dfrac{\\text{frekuensi kejadian } A}{\\text{banyak seluruh percobaan}}]\n\nSemakin banyak percobaan dilakukan, peluang empirik biasanya semakin mendekati peluang teoretik.` },
  { heading: "C. Peluang", content: `Peluang teoretik suatu kejadian adalah perbandingan banyak hasil yang mendukung kejadian dengan banyak seluruh hasil yang mungkin, apabila setiap hasil memiliki kesempatan yang sama.\n\n[SUBHEADING:Rumus peluang teoretik]\n[BLOCKMATH:P(A) = \\dfrac{n(A)}{n(S)}]\n\n- $n(A)$ = banyak kejadian yang diharapkan\n- $n(S)$ = banyak semua kemungkinan (ruang sampel)\n- $0 \\leq P(A) \\leq 1$\n- $P(\\text{pasti terjadi}) = 1$\n- $P(\\text{mustahil}) = 0$` },
  { heading: "D. Frekuensi Harapan", content: `Frekuensi harapan adalah banyak kemunculan suatu kejadian yang diperkirakan terjadi dalam sejumlah percobaan.\n\n[SUBHEADING:Rumus frekuensi harapan]\n[BLOCKMATH:F_h = P(A) \\times n]\n\n- $F_h$ = frekuensi harapan\n- $P(A)$ = peluang kejadian $A$\n- $n$ = banyak percobaan` },
  { heading: "E. Peluang Komplemen", content: `Peluang komplemen suatu kejadian adalah peluang kejadian tersebut tidak terjadi.\n\n[SUBHEADING:Rumus peluang komplemen]\n[BLOCKMATH:P(A^c) = 1 - P(A)]\n\nDimana $A^c$ = kejadian bukan A.` },
  { heading: "F. Peluang Kejadian Majemuk", content: `1. Kejadian saling lepas (mutually exclusive):\n[SUBHEADING:Rumus peluang gabungan kejadian saling lepas]\n[BLOCKMATH:P(A \\cup B) = P(A) + P(B)]\n\n2. Kejadian tidak saling lepas:\n[SUBHEADING:Rumus peluang gabungan kejadian tidak saling lepas]\n[BLOCKMATH:P(A \\cup B) = P(A) + P(B) - P(A \\cap B)]\n\n3. Kejadian bebas (independent):\n[SUBHEADING:Rumus peluang irisan kejadian bebas]\n[BLOCKMATH:P(A \\cap B) = P(A) \\times P(B)]\n\n4. Kejadian bersyarat:\n[SUBHEADING:Rumus peluang bersyarat]\n[BLOCKMATH:P(A|B) = \\dfrac{P(A \\cap B)}{P(B)}]` },
];

const latihanDasar: LatihanSoal[] = [
  {
    no: 1,
    type: "pgkbs",
    soal: "Seorang siswa melakukan lemparan dadu bermata enam sebanyak $50$ kali. Hasil pengamatan dicatat dalam tabel berikut.\n\nTentukan nilai Benar atau Salah untuk setiap pernyataan berikut!",
    gambar: (
      <div className="my-2 overflow-x-auto">
        <table className="mx-auto min-w-[360px] border-collapse overflow-hidden rounded-lg text-center text-xs">
          <thead>
            <tr className="bg-cyan-500/20 text-cyan-100">
              <th className="border border-cyan-400/30 px-4 py-2">Mata dadu</th>
              {[1, 2, 3, 4, 5, 6].map((mata) => (
                <th key={mata} className="border border-cyan-400/30 px-3 py-2">{mata}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white/5 text-white/85">
              <th className="border border-cyan-400/30 px-4 py-2 text-cyan-100">Frekuensi</th>
              {[12, 8, 10, 5, 11, 4].map((frekuensi, index) => (
                <td key={index} className="border border-cyan-400/30 px-3 py-2">{frekuensi}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    ),
    pernyataan: [
      "Frekuensi relatif munculnya mata dadu 2 adalah $0,16$.",
      "Frekuensi relatif munculnya mata dadu 5 adalah $0,22$.",
      "Frekuensi relatif munculnya setiap mata dadu bernilai sama.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Jawaban: (1) BENAR, (2) BENAR, (3) SALAH\n\nKonsep & Trik:\nFrekuensi relatif $F_r = \\frac{f_i}{N}$, dengan $f_i$ frekuensi kejadian dan $N$ banyak seluruh percobaan. Karena $N=50$, frekuensi dapat dikalikan 2 untuk memperoleh persentase.\n\nStep-by-Step Penyelesaian:\nPernyataan 1: $F_r=\\frac{8}{50}=\\frac{16}{100}=0,16$, jadi BENAR.\n\nPernyataan 2: $F_r=\\frac{11}{50}=\\frac{22}{100}=0,22$, jadi BENAR.\n\nPernyataan 3: Frekuensi tiap mata dadu adalah $12, 8, 10, 5, 11, 4$, sehingga frekuensi relatifnya tidak sama. Jadi SALAH.",
  },
  {
    no: 2,
    type: "pg",
    soal: "Sebuah koin seimbang dilempar sebanyak $80$ kali. Jika sisi Gambar ($G$) muncul sebanyak $32$ kali, berapakah frekuensi relatif munculnya sisi Angka ($A$)?",
    options: ["A. $0,400$", "B. $0,500$", "C. $0,600$", "D. $0,750$"],
    jawaban: "C",
    pembahasan: "Jawaban: C\n\nKonsep & Trik:\nFrekuensi sisi Angka adalah sisa dari seluruh lemparan setelah kemunculan Gambar.\n\nStep-by-Step Penyelesaian:\n$f_A=80-32=48$.\n\n$F_r(A)=\\frac{48}{80}=\\frac{6}{10}=0,600$.",
  },
  {
    no: 3,
    type: "pg",
    soal: "Sebuah dadu standar bermata $6$ dilambungkan satu kali. Peluang munculnya mata dadu bernilai lebih dari $6$ adalah ....",
    options: ["A. $0$", "B. $\\frac{1}{6}$", "C. $\\frac{1}{2}$", "D. $1$"],
    jawaban: "A",
    pembahasan: "Jawaban: A\n\nKonsep & Trik:\nDadu standar hanya memiliki mata $1,2,3,4,5,6$. Kejadian muncul mata dadu lebih dari 6 adalah kejadian mustahil.\n\n$P(A)=\\frac{n(A)}{n(S)}=\\frac{0}{6}=0$.",
  },
  {
    no: 4,
    type: "pg",
    soal: "Tiga buah koin uang logam dilempar bersamaan satu kali. Peluang munculnya tepat $2$ Gambar dan $1$ Angka adalah ....",
    options: ["A. $\\frac{1}{8}$", "B. $\\frac{3}{8}$", "C. $\\frac{1}{2}$", "D. $\\frac{5}{8}$"],
    jawaban: "B",
    pembahasan: "Jawaban: B\n\nKonsep & Trik:\nTiga koin memiliki $2^3=8$ kemungkinan hasil. Hasil dengan tepat 2 Gambar adalah $AGG$, $GAG$, dan $GGA$, sebanyak 3 hasil.\n\n$P(A)=\\frac{3}{8}$.",
  },
  {
    no: 5,
    type: "pg",
    soal: "Dalam sebuah kotak terdapat $10$ bola merah, $15$ bola kuning, dan $25$ bola hijau. Jika diambil satu bola secara acak, peluang terambilnya bola kuning adalah ....",
    options: ["A. $\\frac{1}{5}$", "B. $\\frac{3}{10}$", "C. $\\frac{1}{2}$", "D. $\\frac{3}{5}$"],
    jawaban: "B",
    pembahasan: "Jawaban: B\n\nTotal bola $=10+15+25=50$. Banyak bola kuning adalah 15, sehingga\n$P(K)=\\frac{15}{50}=\\frac{3}{10}$.",
  },
  {
    no: 6,
    type: "pgk",
    soal: "Dalam rangka Peringatan Hari Guru, sekolah membagikan kupon undian bernomor $001$ sampai $200$ kepada $200$ siswa. Panitia menyediakan $5$ unit laptop, $15$ unit sepeda, dan $30$ unit buku tulis.\n\nPilihlah semua pernyataan yang Benar!",
    pernyataan: [
      "Peluang setiap siswa memperoleh hadiah adalah $\\frac{1}{4}$.",
      "Peluang siswa mendapat laptop pada undian pertama adalah $2,5\\%$.",
      "Jika undian pertama telah mendapatkan laptop, peluang undian kedua mendapatkan sepeda adalah $\\frac{15}{199}$.",
      "Peluang siswa mendapat buku tulis pada undian pertama adalah $15\\%$.",
    ],
    jawabanPGK: [0, 1, 2, 3],
    jawaban: "Pernyataan (1), (2), (3), dan (4) BENAR",
    pembahasan: "Jawaban: Pernyataan 1, 2, 3, dan 4 BENAR\n\nTotal hadiah $=5+15+30=50$.\n\nPernyataan 1: $P(\\text{hadiah})=\\frac{50}{200}=\\frac{1}{4}$, BENAR.\n\nPernyataan 2: $P(\\text{laptop})=\\frac{5}{200}=0,025=2,5\\%$, BENAR.\n\nPernyataan 3: Setelah satu kupon terambil, tersisa 199 kupon dan 15 sepeda. Jadi $P(\\text{sepeda})=\\frac{15}{199}$, BENAR.\n\nPernyataan 4: $P(\\text{buku tulis})=\\frac{30}{200}=0,15=15\\%$, BENAR.",
  },
  {
    no: 7,
    type: "pgkbs",
    soal: "Dalam sebuah kantong terdapat $8$ kartu bernomor $1,2,3,4,5,6,7,8$. Diambil dua kartu sekaligus secara acak. Tentukan nilai Benar atau Salah!",
    pernyataan: [
      "Peluang terambil pasangan kartu bernomor berurutan adalah $\\frac{1}{4}$.",
      "Peluang terambil pasangan kartu dengan jumlah genap adalah $\\frac{3}{7}$.",
      "Peluang terambil kedua kartu bernomor prima adalah $\\frac{3}{14}$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Jawaban: (1) BENAR, (2) BENAR, (3) BENAR\n\nRuang sampel pengambilan dua kartu adalah $C(8,2)=28$.\n\nPasangan berurutan ada 7, sehingga peluangnya $\\frac{7}{28}=\\frac{1}{4}$.\n\nJumlah genap terjadi pada pasangan ganjil-ganjil atau genap-genap: $C(4,2)+C(4,2)=12$, sehingga peluangnya $\\frac{12}{28}=\\frac{3}{7}$.\n\nBilangan prima adalah $2,3,5,7$. Banyak pasangan prima $C(4,2)=6$, sehingga peluangnya $\\frac{6}{28}=\\frac{3}{14}$.",
  },
  {
    no: 8,
    type: "pg",
    soal: "Berdasarkan data meteorologi, peluang hari berawan di Kota Bandung selama bulan Agustus ($31$ hari) adalah $\\frac{2}{5}$. Berapakah harapan banyaknya hari tidak berawan di bulan tersebut?",
    options: ["A. $12,4$ hari", "B. $18,6$ hari", "C. $20,0$ hari", "D. $24,8$ hari"],
    jawaban: "B",
    pembahasan: "Jawaban: B\n\nPeluang tidak berawan adalah $1-\\frac{2}{5}=\\frac{3}{5}$.\n\nFrekuensi harapan $=\\frac{3}{5}\\times31=\\frac{93}{5}=18,6$ hari.",
  },
  {
    no: 9,
    type: "pg",
    soal: "Di dalam sebuah kotak terdapat $12$ bola bernomor $1$ sampai $12$. Diambil satu bola secara acak dan terambil bola bernomor $3$ (tidak dikembalikan). Peluang terambil bola bernomor kelipatan $3$ pada pengambilan kedua adalah ....",
    options: ["A. $\\frac{1}{4}$", "B. $\\frac{3}{11}$", "C. $\\frac{4}{11}$", "D. $\\frac{1}{3}$"],
    jawaban: "B",
    pembahasan: "Jawaban: B\n\nKelipatan 3 dari 1 sampai 12 adalah $3,6,9,12$. Setelah bola 3 diambil, tersisa 3 bola kelipatan 3 dan 11 bola seluruhnya.\n\n$P=\\frac{3}{11}$.",
  },
  {
    no: 10,
    type: "pg",
    soal: "Banyak anggota ruang sampel dari pelemparan tiga koin uang logam dan satu dadu bermata 6 secara bersamaan adalah ....",
    options: ["A. $18$", "B. $24$", "C. $48$", "D. $72$"],
    jawaban: "C",
    pembahasan: "Jawaban: C\n\nTiga koin menghasilkan $2^3=8$ kemungkinan dan satu dadu menghasilkan 6 kemungkinan. Dengan aturan perkalian, $n(S)=8\\times6=48$.",
  },
  {
    no: 11,
    type: "pg",
    soal: "Lima orang nasabah: Andi, Budi, Citra, Deni, dan Eka sedang mengantre di depan teller bank yang menyediakan $5$ kursi berdampingan secara sejajar. Banyak cara kelima nasabah tersebut mengatur posisi duduk mereka adalah ....",
    options: ["A. $20$ cara", "B. $60$ cara", "C. $120$ cara", "D. $720$ cara"],
    jawaban: "C",
    pembahasan: "Jawaban: C\n\nLima orang berbeda dapat disusun berjajar dengan $5!$ cara.\n\n$5!=5\\times4\\times3\\times2\\times1=120$ cara.",
  },
  {
    no: 12,
    type: "pgk",
    soal: "Lima orang nasabah: Andi, Budi, Citra, Deni, dan Eka sedang duduk acak pada $5$ kursi berjajar. Pilihlah semua pernyataan yang Benar!",
    pernyataan: [
      "Peluang Andi duduk di posisi paling ujung (kiri atau kanan) adalah $\\frac{2}{5}$.",
      "Peluang Budi dan Citra selalu duduk berdampingan adalah $40\\%$.",
      "Peluang Deni dan Eka terpisah (tidak berdampingan) adalah $60\\%$.",
      "Peluang Andi duduk di salah satu dari tiga posisi tengah adalah $\\frac{3}{5}$.",
    ],
    jawabanPGK: [0, 1, 2, 3],
    jawaban: "Pernyataan (1), (2), (3), dan (4) BENAR",
    pembahasan: "Jawaban: Pernyataan 1, 2, 3, dan 4 BENAR\n\nPernyataan 1: Ada 2 posisi ujung dari 5 posisi, jadi peluangnya $\\frac{2}{5}$.\n\nPernyataan 2: Anggap Budi dan Citra sebagai satu blok. Banyak susunan $4!\\times2!=48$, sehingga peluangnya $\\frac{48}{120}=\\frac{2}{5}=40\\%$.\n\nPernyataan 3: Peluang terpisah adalah komplemen peluang berdampingan, yaitu $1-40\\%=60\\%$.\n\nPernyataan 4: Tiga dari lima posisi merupakan posisi tengah, jadi peluang Andi duduk di salah satunya adalah $\\frac{3}{5}$.",
  },
  {
    no: 13,
    type: "pgkbs",
    soal: "Reno dan Siska memiliki jadwal les musik pada hari kerja (Senin sampai Jumat). Masing-masing memilih satu hari secara acak dalam seminggu. Tentukan Benar atau Salah!",
    pernyataan: [
      "Peluang mereka memilih hari les yang sama adalah $0,20$.",
      "Peluang mereka memilih hari les yang berurutan (misal: Senin-Selasa) adalah $\\frac{8}{25}$.",
      "Peluang Reno les di hari Jumat dan Siska tidak les di hari Jumat adalah $16\\%$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Jawaban: (1) BENAR, (2) BENAR, (3) BENAR\n\nAda $5\\times5=25$ pasangan pilihan hari.\n\nHari sama memiliki 5 pasangan, jadi peluangnya $\\frac{5}{25}=0,20$.\n\nHari berurutan memiliki $4\\times2=8$ pasangan, jadi peluangnya $\\frac{8}{25}$.\n\nPeluang Reno Jumat dan Siska bukan Jumat adalah $\\frac{1}{5}\\times\\frac{4}{5}=\\frac{4}{25}=16\\%$.",
  },
  {
    no: 14,
    type: "pg",
    soal: "Sebuah kantong berisi $30$ kelereng yang terdiri dari $12$ warna merah, $8$ warna biru, dan $10$ warna hijau. Jika diambil satu kelereng secara acak, peluang terambil kelereng bukan warna biru adalah ....",
    options: ["A. $\\frac{4}{15}$", "B. $\\frac{2}{3}$", "C. $\\frac{11}{15}$", "D. $\\frac{4}{5}$"],
    jawaban: "C",
    pembahasan: "Jawaban: C\n\nKelereng bukan biru berjumlah $12+10=22$. Maka\n$P(B^c)=\\frac{22}{30}=\\frac{11}{15}$.",
  },
  {
    no: 15,
    type: "pgkbs",
    soal: "Sebuah papan undian berbentuk lingkaran dibagi menjadi 10 sektor sama besar yang diberi nomor $1$ sampai $10$. Papan diputar satu kali. Tentukan nilai Benar atau Salah!",
    gambar: (
      <div className="my-2 flex justify-center">
        <img src={papanSpinner} alt="Papan undian putar bernomor 1 sampai 10" className="max-h-64 w-auto rounded-xl border border-white/15 bg-white p-2 object-contain" />
      </div>
    ),
    pernyataan: [
      "Peluang jarum menunjukkan angka ganjil adalah $50\\%$.",
      "Frekuensi harapan jarum menunjuk angka kelipatan 5 jika diputar $50$ kali adalah $10$ kali.",
      "Frekuensi relatif terpilihnya angka prima jika dilakukan $8$ kali putaran adalah selalu $\\frac{2}{5}$.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Jawaban: (1) BENAR, (2) BENAR, (3) SALAH\n\nAngka ganjil ada 5 dari 10 sektor, sehingga peluangnya $\\frac{5}{10}=50\\%$.\n\nKelipatan 5 adalah 5 dan 10, sehingga $P=\\frac{2}{10}=\\frac{1}{5}$ dan frekuensi harapannya $\\frac{1}{5}\\times50=10$ kali.\n\nFrekuensi relatif ditentukan oleh hasil percobaan nyata, sehingga tidak selalu sama dengan peluang teoretik $\\frac{4}{10}=\\frac{2}{5}$.",
  },
];

const ruangSampelDuaDadu = (
  <div className="space-y-4 min-w-[600px]">
    <div>
      <p className="mb-2 text-xs font-bold text-cyan-200">Tabel Ruang Sampel Pelemparan 2 Dadu</p>
      <table className="w-full border-collapse text-center text-[11px] text-cyan-50">
        <thead>
          <tr>
            <th className="border border-cyan-400/30 bg-cyan-400/10 p-2">Dadu 1 \\ Dadu 2</th>
            {[1, 2, 3, 4, 5, 6].map((value) => <th key={value} className="border border-cyan-400/30 bg-cyan-400/10 p-2">{value}</th>)}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6].map((dadu1) => (
            <tr key={dadu1}>
              <th className="border border-cyan-400/30 bg-cyan-400/10 p-2">{dadu1}</th>
              {[1, 2, 3, 4, 5, 6].map((dadu2) => {
                const sum = dadu1 + dadu2;
                const isMultiple = sum % 4 === 0;
                return (
                  <td key={dadu2} className={`border border-cyan-400/20 p-2 ${isMultiple ? "bg-emerald-400/25 font-bold text-emerald-200" : "bg-white/5"}`}>
                    ({dadu1}, {dadu2})
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>
      <p className="mb-2 text-xs font-bold text-cyan-200">Rincian Pembagian Pasangan Kelipatan 4</p>
      <table className="w-full border-collapse text-left text-[11px] text-cyan-50">
        <thead>
          <tr>
            <th className="border border-cyan-400/30 bg-cyan-400/10 p-2">Nilai Kelipatan 4</th>
            <th className="border border-cyan-400/30 bg-cyan-400/10 p-2">Pasangan Mata Dadu (D1, D2)</th>
            <th className="border border-cyan-400/30 bg-cyan-400/10 p-2">Jumlah Kemungkinan</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-cyan-400/20 p-2">Jumlah = 4</td><td className="border border-cyan-400/20 p-2">(1, 3), (2, 2), (3, 1)</td><td className="border border-cyan-400/20 p-2">3 cara</td></tr>
          <tr><td className="border border-cyan-400/20 p-2">Jumlah = 8</td><td className="border border-cyan-400/20 p-2">(2, 6), (3, 5), (4, 4), (5, 3), (6, 2)</td><td className="border border-cyan-400/20 p-2">5 cara</td></tr>
          <tr><td className="border border-cyan-400/20 p-2">Jumlah = 12</td><td className="border border-cyan-400/20 p-2">(6, 6)</td><td className="border border-cyan-400/20 p-2">1 cara</td></tr>
          <tr className="font-bold text-emerald-200"><td className="border border-cyan-400/20 p-2" colSpan={2}>TOTAL n(A)</td><td className="border border-cyan-400/20 p-2">9 cara</td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

const contohSoal: LatihanSoal[] = [
  {
    no: 1,
    type: "pg",
    soal: "Pada percobaan melempar satu buah dadu bermata 6 sebanyak satu kali, tentukan peluang munculnya mata dadu yang merupakan bilangan prima!",
    options: ["A. $\\frac{1}{6}$", "B. $\\frac{1}{3}$", "C. $\\frac{1}{2}$", "D. $\\frac{2}{3}$"],
    jawaban: "C",
    pembahasan:
      "Jawaban: C\n\n" +
      "Konsep & Trik:\n" +
      "Konsep dasar: Peluang $P(A) = \\frac{n(A)}{n(S)}$, di mana $n(A)$ adalah jumlah anggota kejadian yang diinginkan dan $n(S)$ adalah total seluruh ruang sampel.\n\n" +
      "Trik Cepat: Untuk 1 dadu (6 sisi), tepat 3 sisinya adalah prima $(2,3,5)$. Jadi peluang muncul bilangan prima adalah $\\frac{1}{2}$.\n\n" +
      "Step-by-Step Penyelesaian:\n" +
      "Menentukan Ruang Sampel $S$:\n" +
      "Dadu memiliki 6 sisi, maka $S = \\{1, 2, 3, 4, 5, 6\\}$ sehingga $n(S) = 6$.\n\n" +
      "Menentukan Kejadian $A$:\n" +
      "Bilangan prima pada dadu adalah $A = \\{2, 3, 5\\}$ sehingga $n(A) = 3$.\n\n" +
      "Menghitung Peluang $P(A)$:\n" +
      "$$P(A) = \\frac{n(A)}{n(S)} = \\frac{3}{6} = \\frac{1}{2}$$",
  },
  {
    no: 2,
    type: "pg",
    soal: "Dimas melakukan eksperimen pengundian koin bernomor/bergambar sebanyak $120$ kali. Dari eksperimen tersebut, sisi angka muncul sebanyak $45$ kali, sedangkan sisanya yang muncul adalah sisi gambar. Berapakah frekuensi relatif munculnya sisi gambar?",
    options: ["A. $\\frac{3}{8}$", "B. $\\frac{5}{8}$", "C. $\\frac{1}{2}$", "D. $\\frac{3}{5}$"],
    jawaban: "B",
    pembahasan:
      "Jawaban: B\n\n" +
      "Konsep & Trik:\n" +
      "Frekuensi relatif $F_r(A) = \\frac{\\text{banyak kejadian } A}{\\text{banyak percobaan } (N)}$.\n\n" +
      "Step-by-Step Penyelesaian:\n" +
      "Total percobaan $(N) = 120$ dan kejadian muncul angka = $45$.\n\n" +
      "Banyak kejadian muncul gambar:\n" +
      "$$120 - 45 = 75$$\n\n" +
      "Frekuensi relatif gambar:\n" +
      "$$F_r = \\frac{75}{120} = \\frac{75 \\div 15}{120 \\div 15} = \\frac{5}{8}$$",
  },
  {
    no: 3,
    type: "pgk",
    soal: "Sebuah wadah berisi sekantong kelereng dengan berbagai warna. Andika mencatat jumlah kelereng berdasarkan warnanya seperti diagram batang di bawah ini. Jika satu kelereng diambil secara acak dari wadah tersebut, tentukan kebenaran dari pernyataan-pernyataan berikut!",
    pernyataan: [
      "Peluang terambil kelereng berwarna Kuning adalah $32\\%$.",
      "Peluang terambil kelereng berwarna Biru adalah $0,16$.",
      "Peluang terambil kelereng berwarna Hijau atau Ungu adalah $\\frac{1}{3}$.",
      "Peluang terambil kelereng selain warna Merah adalah $\\frac{4}{5}$.",
    ],
    jawabanPGK: [0, 1, 3],
    jawaban: "Pernyataan (1), (2), dan (4) BENAR",
    gambar: <img src={diagramKelereng} alt="Diagram batang jumlah kelereng berdasarkan warna" className="mx-auto w-full max-w-xl rounded-xl border border-white/10 bg-white p-2" />,
    pembahasan:
      "Jawaban: Pernyataan 1 (Benar), Pernyataan 2 (Benar), Pernyataan 3 (Salah), Pernyataan 4 (Benar)\n\n" +
      "Konsep & Trik:\n" +
      "Total ruang sampel $n(S) = \\sum$ banyak kelereng. Peluang komplemen $P(A^c) = 1 - P(A)$.\n\n" +
      "Step-by-Step Penyelesaian:\n" +
      "Hitung ruang sampel total:\n" +
      "$$n(S) = 8 + 6 + 4 + 5 + 2 = 25$$\n\n" +
      "Pernyataan 1: $P(K) = \\frac{8}{25} = \\frac{32}{100} = 32\\%$, jadi BENAR.\n\n" +
      "Pernyataan 2: $P(B) = \\frac{4}{25} = 0,16$, jadi BENAR.\n\n" +
      "Pernyataan 3: $P(H \\cup U) = \\frac{6+2}{25} = \\frac{8}{25} \\neq \\frac{1}{3}$, jadi SALAH.\n\n" +
      "Pernyataan 4: Kelereng selain Merah berjumlah $25-5=20$.\n" +
      "$$P(M^c) = \\frac{20}{25} = \\frac{4}{5}$$\n" +
      "Jadi pernyataan 4 BENAR.",
  },
  {
    no: 4,
    type: "pgkbs",
    soal: "Perhatikan teks berikut untuk menjawab soal nomor 4 dan 5!\n\nTeks Stimulus: Permainan Monopoli Sederhana\nFajar dan Doni sedang bermain board game dengan melempar dua buah dadu berenam sisi secara bersamaan. Seseorang dapat melangkah sesuai jumlah mata dadu yang muncul. Jika pemain mendapatkan pasangan dadu kembar (dobel), ia mendapat kesempatan melempar sekali lagi. Jika jumlah kedua mata dadu kurang dari 5, pemain masuk ke kotak \"Bonus\". Jika jumlah kedua mata dadu lebih dari 9, pemain masuk ke kotak \"Tantangan\".\n\nBerdasarkan teks di atas, tentukan Benar atau Salah untuk setiap pernyataan berikut!",
    pernyataan: [
      "Peluang Fajar masuk ke kotak \"Bonus\" (jumlah $< 5$) adalah $\\frac{1}{6}$.",
      "Peluang Doni masuk ke kotak \"Tantangan\" (jumlah $> 9$) adalah $\\frac{1}{12}$.",
      "Peluang seorang pemain mendapat lemparan tambahan (dadu kembar) adalah $\\frac{1}{6}$.",
    ],
    jawabanBS: ["B", "S", "B"],
    pembahasan:
      "Jawaban:\nPernyataan 1: BENAR\nPernyataan 2: SALAH\nPernyataan 3: BENAR\n\n" +
      "Konsep & Trik:\n" +
      "Ruang sampel dua dadu adalah $n(S) = 6 \\times 6 = 36$. Banyak pasangan untuk jumlah 2, 3, 4 berturut-turut adalah 1, 2, 3.\n\n" +
      "Step-by-Step Penyelesaian:\n" +
      "Pernyataan 1 (jumlah $<5$): $1+2+3=6$ pasangan, sehingga $P(\\text{Bonus})=\\frac{6}{36}=\\frac{1}{6}$ — BENAR.\n\n" +
      "Pernyataan 2 (jumlah $>9$): jumlah 10, 11, dan 12 memiliki $3+2+1=6$ pasangan, sehingga $P(\\text{Tantangan})=\\frac{6}{36}=\\frac{1}{6}$, bukan $\\frac{1}{12}$ — SALAH.\n\n" +
      "Pernyataan 3 (dadu kembar): pasangan kembar $(1,1)$ sampai $(6,6)$ berjumlah 6, sehingga $P(\\text{kembar})=\\frac{6}{36}=\\frac{1}{6}$ — BENAR.",
  },
  {
    no: 5,
    type: "pg",
    soal: "Pada giliran berikutnya, peluang Doni untuk melempar dua dadu dengan jumlah mata dadu merupakan bilangan kelipatan 4 adalah ....",
    options: ["A. $\\frac{1}{4}$", "B. $\\frac{1}{3}$", "C. $\\frac{5}{12}$", "D. $\\frac{1}{2}$"],
    jawaban: "A",
    pembahasanDiagram: ruangSampelDuaDadu,
    pembahasan:
      "Jawaban: A\n\n" +
      "Konsep & Trik:\n" +
      "Kelipatan 4 pada penjumlahan dua dadu (jangkauan hasil 2 sampai 12) adalah 4, 8, dan 12. Banyak pasangan untuk jumlah tersebut adalah 3, 5, dan 1, sehingga totalnya 9 pasangan.\n\n" +
      "Step-by-Step Penyelesaian:\n" +
      "Identifikasi kelipatan 4 yang mungkin pada dua dadu:\n" +
      "$\\{4, 8, 12\\}$.\n\n" +
      "Mendaftar pasangan mata dadu:\n" +
      "Jumlah 4: $(1,3), (2,2), (3,1) \\rightarrow 3$ cara.\n" +
      "Jumlah 8: $(2,6), (3,5), (4,4), (5,3), (6,2) \\rightarrow 5$ cara.\n" +
      "Jumlah 12: $(6,6) \\rightarrow 1$ cara.\n\n" +
      "Hitung total kejadian:\n" +
      "$$n(A) = 3 + 5 + 1 = 9$$\n\n" +
      "Ruang sampel dua dadu:\n" +
      "$$n(S) = 6 \\times 6 = 36$$\n\n" +
      "Hitung peluang:\n" +
      "$$P(A) = \\frac{n(A)}{n(S)} = \\frac{9}{36} = \\frac{1}{4}$$",
  },
];

const contohSoalTerurut = [
  contohSoal[0],
  contohSoal[1],
  contohSoal[4],
  contohSoal[2],
  contohSoal[3],
];

const PeluangPage = () => (
  <TKAPemantapanLayout
    title="PELUANG"
    materiSections={materiSections}
    contohSoal={contohSoalTerurut}
    latihanDasar={latihanDasar}
  />
);

export default PeluangPage;
