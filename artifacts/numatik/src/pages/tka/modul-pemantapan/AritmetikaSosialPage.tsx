import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";

const materiSections: MateriSection[] = [
  { heading: "A. Harga Beli (Modal)", content: `Harga beli atau modal adalah harga barang saat dibeli dari produsen, distributor, atau toko lain.\n\nContoh: Seorang pedagang membeli 1 lusin buku dengan harga Rp50.000. Harga beli 1 lusin buku tersebut adalah Rp50.000.\n\n[FORMULABOX:Hubungan harga beli dan modal|$\\text{Harga Beli} = \\text{Modal}$]` },
  { heading: "B. Untung dan Rugi", content: `[FORMULABOX:Rumus Untung|$\\text{Untung} = \\text{Harga Jual} - \\text{Harga Beli}$]\n\n[FORMULABOX:Rumus Rugi|$\\text{Rugi} = \\text{Harga Beli} - \\text{Harga Jual}$]\n\n[FORMULABOX:Kondisi Impas|$\\text{Harga Jual} = \\text{Harga Beli}$]` },
  { heading: "C. Persentase Untung/Rugi", content: `[FORMULABOX:Persentase Untung|$\\%U = \\dfrac{\\text{Untung}}{\\text{Harga Beli}} \\times 100\\%$]\n\n[FORMULABOX:Persentase Rugi|$\\%R = \\dfrac{\\text{Rugi}}{\\text{Harga Beli}} \\times 100\\%$]` },
  { heading: "D. Mencari Harga Jual", content: `[FORMULABOX:Harga Jual saat Untung|$\\text{HJ} = \\dfrac{100 + \\%U}{100} \\times \\text{HB}$]\n\n[FORMULABOX:Harga Jual saat Rugi|$\\text{HJ} = \\dfrac{100 - \\%R}{100} \\times \\text{HB}$]\n\n[FORMULABOX:Mencari Harga Beli saat Untung|$\\text{HB} = \\dfrac{100}{100 + \\%U} \\times \\text{HJ}$]` },
  { heading: "E. Bunga Tunggal", content: `Keterangan: B = besar bunga, M = modal, W = waktu, dan P = suku bunga per periode.\n\n[FORMULABOX:Rumus Bunga Tunggal|$B = M \\times W \\times P$]\n\n[FORMULABOX:Modal Akhir|$M_1 = M(1 + WP)$]` },
  { heading: "F. Diskon (Potongan Harga)", content: `[FORMULABOX:Besar Potongan Harga|$\\text{Diskon} = \\text{Persentase Diskon} \\times \\text{Harga Awal}$]\n\n[FORMULABOX:Harga Setelah Diskon|$\\text{Harga Bayar} = \\text{Harga Awal} \\times (100\\% - \\text{Persentase Diskon})$]\n\n[SUBHEADING:Catatan]\nDiskon ganda 20% + 10% tidak sama dengan diskon 30%.` },
  { heading: "G. Bruto, Netto, Tara", content: `Bruto adalah berat kotor barang beserta kemasannya. Netto adalah berat bersih barang tanpa kemasan, sedangkan tara adalah berat kemasan.\n\n[FORMULABOX:Hubungan Bruto, Netto, dan Tara|$\\text{Bruto} = \\text{Netto} + \\text{Tara}$]` },
];

const contohSoal: LatihanSoal[] = [
  {
    no: 1,
    type: "pg",
    soal: "Seorang pedagang membeli sepeda bekas. Setelah diperbaiki dengan biaya Rp200.000,00, sepeda tersebut dijual dengan harga Rp1.040.000,00 sehingga mendapat untung 30%. Harga beli sepeda semula adalah ....",
    options: ["A. Rp500.000,00", "B. Rp600.000,00", "C. Rp700.000,00", "D. Rp800.000,00"],
    jawaban: "B",
    pembahasan: "Total modal sudah termasuk biaya perbaikan.\nTotal modal $=\\dfrac{100}{100+30}\\times1.040.000=Rp800.000,00$.\nHarga beli semula $=Rp800.000,00-Rp200.000,00=\\mathbf{Rp600.000,00}$.\nJadi, jawaban yang benar adalah B.",
  },
  {
    no: 2,
    type: "pgk",
    soal: "Bima menyimpan uang sebesar Rp1.200.000,00 di sebuah bank dengan suku bunga tunggal 15% setahun. Setelah beberapa bulan, ia mengambil seluruh tabungannya beserta bunganya sebesar Rp1.260.000,00.\n\nBerilah tanda centang pada semua pernyataan yang benar! Jawaban benar lebih dari satu.",
    pernyataan: [
      "Besar bunga yang diperoleh Bima selama menabung adalah Rp60.000,00.",
      "Bunga yang diperoleh Bima per bulan adalah Rp15.000,00.",
      "Lama Bima menabung di bank tersebut adalah 4 bulan.",
      "Persentase total bunga yang didapatkan terhadap tabungan awal adalah 5%.",
    ],
    options: ["A. (1) dan (2) saja", "B. (1), (2), dan (3) saja", "C. (2) dan (4) saja", "D. (1), (2), (3), dan (4)"],
    jawaban: "D",
    jawabanPGK: [0, 1, 2, 3],
    pembahasan: "Bunga total $=Rp1.260.000,00-Rp1.200.000,00=Rp60.000,00$.\nBunga selama satu tahun $=15\\%\\times Rp1.200.000,00=Rp180.000,00$, sehingga bunga per bulan $=Rp180.000,00\\div12=Rp15.000,00$.\nLama menabung $=Rp60.000,00\\div Rp15.000,00=4$ bulan.\nPersentase bunga $=\\dfrac{60.000}{1.200.000}\\times100\\%=5\\%$.\nJadi, semua pernyataan benar.",
  },
  {
    no: 3,
    type: "pgk",
    soal: "Pak Budi meminjam uang di koperasi sebesar Rp4.800.000,00. Ia dikenakan bunga tunggal 24% setahun dan berencana mengembalikan pinjaman tersebut dengan cara mengangsur selama 2 tahun (24 bulan).\n\nPilihlah semua pernyataan yang benar! Jawaban benar lebih dari satu.",
    pernyataan: [
      "Total bunga yang ditanggung Pak Budi selama 2 tahun adalah Rp2.304.000,00.",
      "Angsuran pokok pinjaman per bulan tanpa bunga adalah Rp200.000,00.",
      "Total uang pinjaman beserta bunga yang harus dikembalikan seluruhnya adalah Rp7.104.000,00.",
      "Besar cicilan total yang harus dibayar Pak Budi setiap bulannya adalah Rp296.000,00.",
    ],
    options: ["A. (1) dan (2) saja", "B. (1), (2), dan (3) saja", "C. (2) dan (4) saja", "D. (1), (2), (3), dan (4)"],
    jawaban: "D",
    jawabanPGK: [0, 1, 2, 3],
    pembahasan: "Total bunga $=24\\%\\times Rp4.800.000,00\\times2=Rp2.304.000,00$.\nAngsuran pokok per bulan $=Rp4.800.000,00\\div24=Rp200.000,00$.\nTotal pengembalian $=Rp4.800.000,00+Rp2.304.000,00=Rp7.104.000,00$.\nCicilan per bulan $=Rp7.104.000,00\\div24=\\mathbf{Rp296.000,00}$.\nJadi, semua pernyataan benar.",
  },
  {
    no: 4,
    type: "pgkbs",
    soal: "Cermati data berikut. Harga sepatu Rp140.000,00 dan harga kaos Rp100.000,00. Toko Damai memberi diskon sepatu 20% dan kaos 25%; Toko Sentosa memberi diskon sepatu 30% dan kaos 15%; Toko Rukun memberi diskon sepatu 15% dan kaos 30%; Toko Sejahtera memberi diskon sepatu 10% dan kaos 10%. Febian akan membeli 1 pasang sepatu dan 1 buah kaos. Tentukan apakah setiap pernyataan berikut BENAR atau SALAH!",
    pernyataan: [
      "Harga sepatu Rp140.000,00 dan harga kaos Rp100.000,00. Diskon Toko Damai berturut-turut 20% dan 25%. Total yang harus dibayar di Toko Damai adalah Rp187.000,00.",
      "Diskon Toko Sentosa untuk sepatu dan kaos berturut-turut 30% dan 15%. Total yang harus dibayar di Toko Sentosa adalah Rp183.000,00.",
      "Toko Rukun memberikan total harga bayar paling murah di antara keempat toko tersebut.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Toko Damai: $80\\%\\times Rp140.000,00+75\\%\\times Rp100.000,00=Rp187.000,00$ (BENAR).\nToko Sentosa: $70\\%\\times Rp140.000,00+85\\%\\times Rp100.000,00=Rp183.000,00$ (BENAR).\nToko Rukun: $85\\%\\times Rp140.000,00+70\\%\\times Rp100.000,00=Rp189.000,00$.\nToko Sejahtera: $90\\%\\times Rp140.000,00+90\\%\\times Rp100.000,00=Rp216.000,00$. Harga termurah adalah Toko Sentosa, bukan Toko Rukun (SALAH).",
  },
  {
    no: 5,
    type: "pgkbs",
    soal: "Perhatikan data berikut: harga satu tas Rp80.000,00 dengan diskon 15%, harga satu pasang sandal Rp50.000,00 dengan diskon 25%, dan harga satu pasang sepatu Rp120.000,00 dengan diskon 20%. Rani membeli 3 tas, 2 pasang sandal, dan 1 pasang sepatu. Tentukan apakah setiap pernyataan berikut BENAR atau SALAH!",
    pernyataan: [
      "Besar potongan harga total untuk 3 tas yang dibeli Rani adalah Rp36.000,00.",
      "Total harga belanjaan Rani sebelum mendapatkan diskon adalah Rp460.000,00.",
      "Total uang yang harus dibayarkan Rani setelah dipotong diskon adalah Rp375.000,00.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Diskon 3 tas $=15\\%\\times(3\\times Rp80.000,00)=Rp36.000,00$.\nHarga kotor $=(3\\times Rp80.000,00)+(2\\times Rp50.000,00)+Rp120.000,00=Rp460.000,00$.\nHarga setelah diskon $=(3\\times85\\%\\times Rp80.000,00)+(2\\times75\\%\\times Rp50.000,00)+(80\\%\\times Rp120.000,00)$\n$=Rp204.000,00+Rp75.000,00+Rp96.000,00=\\mathbf{Rp375.000,00}$.\nJadi, semua pernyataan benar.",
  },
  {
    no: 6,
    type: "pg",
    soal: "Seorang pedagang membeli satu karung beras dengan bruto 50 kg dan tara 2%. Beras tersebut kemudian dijual secara eceran dengan harga Rp12.000,00 per kg netto. Total pendapatan dari penjualan seluruh beras dalam karung tersebut adalah ....",
    options: ["A. Rp600.000,00", "B. Rp588.000,00", "C. Rp583.000,00", "D. Rp88.000,00"],
    jawaban: "B",
    pembahasan: "Tara $=2\\%\\times50\\text{ kg}=1\\text{ kg}$.\nNetto $=50\\text{ kg}-1\\text{ kg}=49\\text{ kg}$.\nTotal pendapatan $=49\\times Rp12.000,00=\\mathbf{Rp588.000,00}$.\nJadi, jawaban yang benar adalah B.",
  },
];

// Latihan terdiri dari 15 soal pilihan ganda, PG kompleks, dan PG benar-salah.
const latihanDasar: LatihanSoal[] = [
  {
    no: 1, type: "pg",
    soal: "Seorang pedagang membeli 60 kg mangga dengan harga total Rp600.000,00. Sebanyak 10 kg mangga busuk sehingga tidak dapat dijual. Jika pedagang ingin memperoleh untung 20% dari seluruh modal, berapa harga jual setiap kilogram mangga yang masih baik?",
    options: ["A. Rp12.000,00", "B. Rp13.200,00", "C. Rp14.400,00", "D. Rp15.000,00"], jawaban: "C",
    pembahasan: "Jumlah mangga yang dapat dijual $=60-10=50$ kg. Agar mendapat untung 20%, hasil penjualan harus $=120\\%\\times Rp600.000,00=Rp720.000,00$. Harga jual per kg $=Rp720.000,00\\div50=\\mathbf{Rp14.400,00}$. Jawaban C.",
  },
  {
    no: 2, type: "pg",
    soal: "Seorang pedagang membeli sepeda bekas seharga Rp800.000,00, lalu mengeluarkan biaya Rp200.000,00 untuk memperbaikinya. Jika ia ingin memperoleh untung 25% dari seluruh modal, berapa harga jual sepeda tersebut?",
    options: ["A. Rp1.000.000,00", "B. Rp1.200.000,00", "C. Rp1.250.000,00", "D. Rp1.300.000,00"], jawaban: "C",
    pembahasan: "Seluruh modal $=Rp800.000,00+Rp200.000,00=Rp1.000.000,00$. Untung $=25\\%\\times Rp1.000.000,00=Rp250.000,00$. Harga jual $=Rp1.000.000,00+Rp250.000,00=\\mathbf{Rp1.250.000,00}$. Jawaban C.",
  },
  {
    no: 3, type: "pgkbs",
    soal: "Sebanyak 50 kg beras dibeli dengan harga total Rp475.000,00. Seluruh beras itu dijual dengan keuntungan 20% dari harga beli. Tentukan apakah setiap pernyataan berikut benar atau salah!",
    pernyataan: ["Harga jual seluruh beras adalah Rp570.000,00.", "Harga jual beras per kg adalah Rp11.400,00.", "Harga beli beras per kg adalah Rp9.500,00."],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Harga jual total $=475.000\\times1,2=570.000$. Harga jual per kg $=570.000/50=11.400$ dan harga beli per kg $=475.000/50=9.500$.",
  },
  {
    no: 4, type: "pg",
    soal: "Zahira menabung Rp1.200.000,00 dengan bunga tunggal 15% setahun. Jumlah tabungannya menjadi Rp1.260.000,00. Berapa lama Zahira menabung?",
    options: ["A. 3 bulan", "B. 4 bulan", "C. 5 bulan", "D. 6 bulan"], jawaban: "B",
    pembahasan: "Bunga yang diperoleh Zahira $=Rp1.260.000,00-Rp1.200.000,00=Rp60.000,00$. Dari $60.000=1.200.000\\times W\\times0,15$, diperoleh $W=1/3$ tahun, yaitu 4 bulan. Jawaban B.",
  },
  {
    no: 5, type: "pgkbs",
    soal: "Ifa menabung Rp800.000,00 dengan bunga tunggal 12% per tahun. Setelah beberapa waktu, jumlah tabungannya menjadi Rp872.000,00. Tentukan apakah setiap pernyataan berikut benar atau salah!",
    pernyataan: ["Bunga yang diperoleh Ifa adalah Rp72.000,00.", "Ifa menabung selama 0,75 tahun.", "Lama menabung Ifa sama dengan 9 bulan."],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Bunga $=Rp872.000,00-Rp800.000,00=Rp72.000,00$. Dari $72.000=800.000\\times W\\times12\\%$, diperoleh $W=0,75$ tahun atau 9 bulan. Jadi ketiga pernyataan benar.",
  },
  {
    no: 6, type: "pgkbs",
    soal: "Nabila menabung sebesar Rp600.000,00. Setelah 10 bulan, jumlah tabungannya menjadi Rp640.000,00. Tentukan apakah setiap pernyataan berikut benar atau salah!",
    pernyataan: ["Bunga yang diperoleh Nabila adalah Rp40.000,00.", "Lama Nabila menabung adalah 10 bulan.", "Suku bunga tunggal yang diterapkan adalah 8% per tahun."],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Bunga $=40.000$. Dengan $40.000=600.000\\times\\frac{10}{12}\\times P$, diperoleh $P=8\\%$.",
  },
  {
    no: 7, type: "pg",
    soal: "Noval menabung dengan bunga tunggal 16% per tahun. Setelah 9 bulan, jumlah tabungannya menjadi Rp2.240.000,00. Berapa tabungan awal Noval?",
    options: ["A. Rp1.800.000,00", "B. Rp1.900.000,00", "C. Rp2.000.000,00", "D. Rp2.100.000,00"], jawaban: "C",
    pembahasan: "$M_1=M(1+\\frac{9}{12}\\times0,16)=1,12M=2.240.000$, sehingga $M=2.000.000$. Jawaban C.",
  },
  {
    no: 8, type: "pgk",
    soal: "Pak Budi meminjam Rp4.800.000,00 dengan bunga 24% per tahun selama 2 tahun. Pernyataan yang benar adalah ...",
    pernyataan: ["Total bunga adalah Rp2.304.000,00.", "Total pengembalian adalah Rp7.104.000,00.", "Cicilan setiap bulan adalah Rp296.000,00.", "Cicilan setiap bulan adalah Rp260.000,00."],
    options: ["A. (1) dan (2) saja", "B. (1), (2), dan (3)", "C. (2) dan (4) saja", "D. Semua benar"], jawaban: "B", jawabanPGK: [0, 1, 2],
    pembahasan: "Bunga $=4.800.000\\times24\\%\\times2=2.304.000$. Total $=7.104.000$ dan cicilan $=7.104.000/24=296.000$. Jadi (1), (2), dan (3) benar.",
  },
  {
    no: 9, type: "pgkbs",
    soal: "Harga sepatu dan kaos serta persentase potongan harga di setiap toko disajikan pada tabel berikut. Tentukan apakah setiap pernyataan berikut benar atau salah!",
    gambar: (
      <div className="overflow-x-auto rounded-lg border border-cyan-400/20">
        <table className="w-full min-w-[560px] border-collapse text-left text-xs">
          <thead className="bg-cyan-500/10 text-cyan-300">
            <tr>
              <th className="px-3 py-2">Barang</th>
              <th className="px-3 py-2">Harga</th>
              <th className="px-3 py-2">Toko Damai</th>
              <th className="px-3 py-2">Toko Tentram</th>
              <th className="px-3 py-2">Toko Rukun</th>
              <th className="px-3 py-2">Toko Sentosa</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-cyan-400/10">
              <td className="px-3 py-2">Sepatu</td>
              <td className="px-3 py-2">Rp140.000,00</td>
              <td className="px-3 py-2">20%</td>
              <td className="px-3 py-2">25%</td>
              <td className="px-3 py-2">15%</td>
              <td className="px-3 py-2">30%</td>
            </tr>
            <tr className="border-t border-cyan-400/10">
              <td className="px-3 py-2">Kaos</td>
              <td className="px-3 py-2">Rp100.000,00</td>
              <td className="px-3 py-2">25%</td>
              <td className="px-3 py-2">20%</td>
              <td className="px-3 py-2">30%</td>
              <td className="px-3 py-2">15%</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    pernyataan: ["Total pembayaran di Toko Damai Rp187.000,00.", "Total pembayaran di Toko Tentram Rp185.000,00.", "Toko Sentosa memberikan total termurah, yaitu Rp183.000,00."],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Damai $=112.000+75.000=187.000$, Tentram $=105.000+80.000=185.000$, dan Sentosa $=98.000+85.000=183.000$.",
  },
  {
    no: 10, type: "pg",
    soal: "Harga satuan, potongan harga, dan jumlah barang yang akan dibeli disajikan pada tabel berikut. Berapa total uang yang harus dibayarkan?",
    gambar: (
      <div className="overflow-x-auto rounded-lg border border-cyan-400/20">
        <table className="w-full min-w-[420px] border-collapse text-left text-xs">
          <thead className="bg-cyan-500/10 text-cyan-300">
            <tr>
              <th className="px-3 py-2">Barang</th>
              <th className="px-3 py-2">Harga satuan</th>
              <th className="px-3 py-2">Potongan harga</th>
              <th className="px-3 py-2">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-cyan-400/10">
              <td className="px-3 py-2">Tas</td>
              <td className="px-3 py-2">Rp80.000,00</td>
              <td className="px-3 py-2">15%</td>
              <td className="px-3 py-2">3 buah</td>
            </tr>
            <tr className="border-t border-cyan-400/10">
              <td className="px-3 py-2">Sandal</td>
              <td className="px-3 py-2">Rp50.000,00</td>
              <td className="px-3 py-2">25%</td>
              <td className="px-3 py-2">2 pasang</td>
            </tr>
            <tr className="border-t border-cyan-400/10">
              <td className="px-3 py-2">Sepatu</td>
              <td className="px-3 py-2">Rp120.000,00</td>
              <td className="px-3 py-2">20%</td>
              <td className="px-3 py-2">1 pasang</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    options: ["A. Rp360.000,00", "B. Rp365.000,00", "C. Rp370.000,00", "D. Rp375.000,00"], jawaban: "D",
    pembahasan: "Tas $=3(80.000\\times0,85)=204.000$, sandal $=2(50.000\\times0,75)=75.000$, sepatu $=96.000$. Total $=375.000$. Jawaban D.",
  },
  {
    no: 11, type: "pgk",
    soal: "Sebuah karung berisi beras memiliki berat bruto 50 kg. Berat kemasan (tara) adalah 2% dari berat bruto. Beras dijual seharga Rp12.000,00 untuk setiap kilogram netto. Pilih semua pernyataan yang benar!",
    pernyataan: ["Tara karung adalah 1 kg.", "Netto beras adalah 49 kg.", "Total uang hasil penjualan Rp588.000,00.", "Total uang hasil penjualan Rp600.000,00."],
    options: ["A. (1) dan (2) saja", "B. (1), (2), dan (3)", "C. (2) dan (4) saja", "D. Semua benar"], jawaban: "B", jawabanPGK: [0, 1, 2],
    pembahasan: "Tara $=2\\%\\times50=1$ kg, netto $=49$ kg, dan penjualan $=49\\times12.000=588.000$. Jadi (1), (2), dan (3) benar.",
  },
  {
    no: 12, type: "pgk",
    soal: "Toko A dan Toko B masing-masing menjual barang dengan berat bruto 100 kg. Toko A menetapkan tara 2% dan harga Rp1.000.000,00, sedangkan Toko B menetapkan tara 3% dan harga Rp990.000,00. Pilih semua pernyataan yang benar!",
    pernyataan: ["Netto barang di Toko A adalah 98 kg.", "Netto barang di Toko B adalah 97 kg.", "Harga per kg netto di Toko B sekitar Rp10.206,00.", "Harga per kg netto di Toko A lebih mahal daripada di Toko B."],
    options: ["A. (1) dan (2) saja", "B. (1), (2), dan (3)", "C. (2) dan (4) saja", "D. Semua benar"], jawaban: "B", jawabanPGK: [0, 1, 2],
    pembahasan: "Netto A $=100-2\\%\\times100=98$ kg dan netto B $=100-3\\%\\times100=97$ kg. Harga per kg netto A $=Rp1.000.000,00\\div98\\approx Rp10.204,08$, sedangkan B $=Rp990.000,00\\div97\\approx Rp10.206,19$. Jadi harga per kg netto Toko A lebih rendah. Pernyataan (1), (2), dan (3) benar.",
  },
  {
    no: 13, type: "pg",
    soal: "Seorang pedagang menjual seluruh buah dalam sebuah peti dengan harga Rp15.000,00 per kilogram netto. Berat bruto peti berisi buah adalah 60 kg dan berat tara peti kosong 2 kg. Jika pedagang memperoleh untung Rp100.000,00, berapa harga beli seluruh buah tersebut?",
    options: ["A. Rp900.000,00", "B. Rp870.000,00", "C. Rp800.000,00", "D. Rp770.000,00"], jawaban: "D",
    pembahasan: "Netto $=60-2=58$ kg. HJ $=58\\times15.000=870.000$. HB $=870.000-100.000=770.000$. Jawaban D.",
  },
  {
    no: 14, type: "pgk",
    soal: "Kargo berisi 20 kaleng memiliki bruto total 25 kg, tara kardus 1 kg, dan netto tiap kaleng 900 gram. Pernyataan yang benar adalah ...",
    pernyataan: ["Berat 20 kaleng tanpa kardus adalah 24 kg.", "Bruto satu kaleng adalah 1.200 gram.", "Tara satu kaleng adalah 300 gram.", "Netto satu kaleng adalah 1.200 gram."],
    options: ["A. (1) dan (2) saja", "B. (1), (2), dan (3)", "C. (2) dan (4) saja", "D. Semua benar"], jawaban: "B", jawabanPGK: [0, 1, 2],
    pembahasan: "Berat kaleng $=25-1=24$ kg. Per kaleng $=24.000/20=1.200$ gram. Tara $=1.200-900=300$ gram. Jadi (1), (2), dan (3) benar.",
  },
  {
    no: 15, type: "pgkbs",
    soal: "Sebuah drum memiliki netto 97 kg. Berat tara drum adalah 3% dari berat brutonya. Tentukan apakah setiap pernyataan berikut benar atau salah!",
    pernyataan: ["Netto merupakan 97% dari bruto.", "Bruto drum adalah 100 kg.", "Tara drum adalah 3 kg."],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Bruto $=97/0,97=100$ kg dan tara $=3\\%\\times100=3$ kg.",
  },
];

const AritmetikaSosialPage = () => (
  <TKAPemantapanLayout
    title="ARITMETIKA SOSIAL"
    backPath="/tka/modul-pemantapan"
    materiSections={materiSections}
    contohSoal={contohSoal}
    latihanDasar={latihanDasar}
  />
);

export default AritmetikaSosialPage;
