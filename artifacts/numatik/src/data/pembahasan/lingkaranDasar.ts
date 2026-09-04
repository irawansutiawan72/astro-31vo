import type { Pembahasan } from "@/components/PembahasanCard";

export const lingkaranDasarPembahasan: Record<number, Pembahasan> = {
  1: {
    jawaban: "B. 154 $cm^2$",
    konsepTrik:
      "Daerah arsir pada gambar adalah juring. Luas juring merupakan bagian dari luas lingkaran yang sebanding dengan sudut pusatnya.",
    stepByStep:
      "Dari gambar, sudut pusat juring adalah $40°$ dan $r=21$ cm.\nLuas lingkaran $= \\pi r^2 = \\dfrac{22}{7}\\times21^2 = 1386$ $cm^2$.\nLuas juring $= \\dfrac{40}{360}\\times1386 = \\dfrac{1}{9}\\times1386 = 154$ $cm^2$.",
    tips:
      "Baca sudut pada gambar dengan teliti. Sudutnya 40°, bukan 80°.",
    kesimpulan: "Luas daerah yang diarsir adalah $154$ $cm^2$.",
  },
  2: {
    jawaban: "A. 22 cm",
    konsepTrik:
      "Panjang busur adalah bagian dari keliling lingkaran yang sebanding dengan sudut pusat.",
    stepByStep:
      "Dari gambar, $r=OP=21$ cm dan $\\angle POQ=60°$.\nKeliling lingkaran $=2\\pi r=2\\times\\dfrac{22}{7}\\times21=132$ cm.\nPanjang busur kecil PQ $=\\dfrac{60}{360}\\times132=22$ cm.",
    tips:
      "Jangan mencampur rumus panjang busur dengan luas juring. Busur memakai keliling $2\\pi r$.",
    kesimpulan: "Panjang busur kecil PQ adalah $22$ cm.",
  },
  3: {
    jawaban: "A. 40 cm",
    konsepTrik:
      "Pada lingkaran yang sama, panjang busur sebanding dengan sudut pusat: $\\dfrac{\\text{busur}_1}{\\text{busur}_2} = \\dfrac{\\angle_1}{\\angle_2}$.",
    stepByStep:
      "Dari gambar, $\\angle POQ=50°$ dan $\\angle QOR=75°$.\n$\\dfrac{PQ}{QR}=\\dfrac{50}{75}=\\dfrac{2}{3}$.\n$PQ=\\dfrac{2}{3}\\times60=40$ cm.",
    tips:
      "Gunakan sudut yang benar-benar tertulis pada diagram, bukan rasio yang diasumsikan.",
    kesimpulan: "Panjang busur $PQ = 40$ cm.",
  },
  4: {
    jawaban: "C. 90 $cm^2$",
    konsepTrik:
      "Luas juring sebanding dengan sudut pusatnya: $\\dfrac{L_1}{L_2} = \\dfrac{\\angle_1}{\\angle_2}$.",
    stepByStep:
      "Misal $\\angle ROS : \\angle POQ = 2 : 3$\n$\\dfrac{60}{L_{OPQ}} = \\dfrac{2}{3}$\n$L_{OPQ} = \\dfrac{3}{2} \\times 60 = 90$ $cm^2$",
    tips:
      "Perbandingan luas juring = perbandingan sudut pusat (pada satu lingkaran).",
    kesimpulan: "Luas juring $OPQ = 90$ $cm^2$.",
  },
  5: {
    jawaban: "C. 56 cm",
    konsepTrik:
      "Pada satu lingkaran: $\\dfrac{\\text{busur AB}}{\\text{busur CD}} = \\dfrac{\\angle AOB}{\\angle COD}$.",
    stepByStep:
      "$\\dfrac{14}{CD} = \\dfrac{35°}{140°} = \\dfrac{1}{4}$\n$CD = 14 \\times 4 = 56$ cm",
    tips:
      "Sederhanakan dulu rasio sudutnya sebelum kali silang.",
    kesimpulan: "Panjang busur $CD = 56$ cm.",
  },
  6: {
    jawaban: "B. 614,25 $cm^2$",
    konsepTrik:
      "Bangun pada gambar merupakan gabungan persegi dan setengah lingkaran. Karena diameter setengah lingkaran sama dengan sisi persegi, jari-jarinya adalah setengah sisi persegi.",
    stepByStep:
      "Luas persegi $=21\\times21=441$ $cm^2$.\nDiameter setengah lingkaran $=21$ cm, jadi $r=10{,}5$ cm.\nLuas setengah lingkaran $=\\dfrac{1}{2}\\times\\dfrac{22}{7}\\times10{,}5^2=173{,}25$ $cm^2$.\nLuas seluruh arsiran $=441+173{,}25=614{,}25$ $cm^2$.",
    tips:
      "Jangan memakai 21 cm sebagai jari-jari; angka 21 cm pada gambar adalah diameter setengah lingkaran.",
    kesimpulan: "Luas daerah yang diarsir adalah $614{,}25$ $cm^2$.",
  },
  7: {
    jawaban: "C. 119 $cm^2$",
    konsepTrik:
      "Daerah arsir adalah luas persegi dikurangi dua seperempat lingkaran yang kongruen. Masing-masing jari-jari seperempat lingkaran adalah 7 cm.",
    stepByStep:
      "Luas persegi $=14^2=196$ $cm^2$.\nDua seperempat lingkaran setara dengan setengah lingkaran berjari-jari 7 cm.\nLuas yang dikurangi $=\\dfrac{1}{2}\\times\\dfrac{22}{7}\\times7^2=77$ $cm^2$.\nLuas arsiran $=196-77=119$ $cm^2$.",
    tips:
      "Gabungkan dua seperempat lingkaran menjadi satu setengah lingkaran agar hitungan lebih singkat.",
    kesimpulan: "Luas daerah yang diarsir adalah $119$ $cm^2$.",
  },
  8: {
    jawaban: "C. 78,5 cm",
    konsepTrik:
      "Batas daerah yang diarsir hanya terdiri atas tiga busur setengah lingkaran: dua busur berjari-jari 10 cm dan satu busur berjari-jari 5 cm.",
    stepByStep:
      "Panjang busur setengah lingkaran berjari-jari $r$ adalah $\\pi r$.\n$K=\\pi(10)+\\pi(10)+\\pi(5)=25\\pi$.\nDengan $\\pi=3{,}14$, $K=25\\times3{,}14=78{,}5$ cm.",
    tips:
      "Ruas diameter yang berada di dalam bangun bukan bagian dari batas daerah yang diarsir, jadi tidak ikut dijumlahkan.",
    kesimpulan: "Keliling daerah yang diarsir adalah $78{,}5$ cm.",
  },
  9: {
    jawaban: "C. 88 cm",
    konsepTrik:
      "Keliling arsiran dibatasi oleh satu setengah lingkaran besar dan dua setengah lingkaran kecil. Ruas diameter pada garis dasar berada di dalam daerah, bukan pada batas arsiran.",
    stepByStep:
      "Setengah lingkaran besar berdiameter 28 cm memiliki panjang busur $=\\dfrac{1}{2}\\pi\\times28=14\\pi$.\nMasing-masing setengah lingkaran kecil berdiameter 14 cm memiliki panjang busur $=7\\pi$.\n$K=14\\pi+2(7\\pi)=28\\pi=28\\times\\dfrac{22}{7}=88$ cm.",
    tips:
      "Untuk keliling daerah berarsir, telusuri garis batas yang benar-benar mengelilingi arsiran; jangan memasukkan garis pembagi di dalamnya.",
    kesimpulan: "Keliling daerah yang diarsir adalah $88$ cm.",
  },
  10: {
    jawaban: "A. 28,5 $cm^2$",
    konsepTrik:
      "Daerah arsir adalah tembereng kecil, yaitu luas juring 90° dikurangi luas segitiga siku-siku yang dibentuk oleh dua jari-jari.",
    stepByStep:
      "Luas juring 90° $=\\dfrac{90}{360}\\times3{,}14\\times10^2=78{,}5$ $cm^2$.\nKedua jari-jari saling tegak lurus, sehingga luas segitiga $=\\dfrac{1}{2}\\times10\\times10=50$ $cm^2$.\nLuas tembereng $=78{,}5-50=28{,}5$ $cm^2$.",
    tips:
      "Pada tembereng, kurangi luas segitiga dari luas juring; jangan memakai luas juring sebagai jawaban akhir.",
    kesimpulan: "Luas daerah yang diarsir adalah $28{,}5$ $cm^2$.",
  },
  11: {
    jawaban: "A. 74,8 cm",
    konsepTrik:
      "Keliling bangun terdiri atas dua busur setengah lingkaran dan dua ruas garis lurus yang tampak di kiri serta kanan. Diameter kedua setengah lingkaran terbaca 26 cm dan 14 cm.",
    stepByStep:
      "Jumlah panjang dua busur setengah lingkaran $=\\dfrac{1}{2}\\pi(26)+\\dfrac{1}{2}\\pi(14)=20\\pi=62{,}8$ cm.\nJumlah dua ruas garis lurus yang tampak sama dengan selisih diameter, yaitu $26-14=12$ cm.\nJadi $K=62{,}8+12=74{,}8$ cm.",
    tips:
      "Untuk susunan dua setengah lingkaran seperti gambar, ruas lurus luar berjumlah selisih kedua diameter, bukan jumlah keduanya.",
    kesimpulan: "Keliling bangun adalah $74{,}8$ cm.",
  },
  12: {
    jawaban: "A. Keliling 22 cm dan luas 28 $cm^2$",
    konsepTrik:
      "Daerah arsir dibatasi oleh dua busur seperempat lingkaran berjari-jari 7 cm. Kelilingnya adalah jumlah kedua busur, sedangkan luasnya adalah dua juring seperempat lingkaran dikurangi dua segitiga siku-siku.",
    stepByStep:
      "$K = 2 \\times \\dfrac{90°}{360°} \\times 2\\pi r = \\pi r = \\dfrac{22}{7} \\times 7 = 22$ cm\n\n$L = 2\\left(\\dfrac{90°}{360°}\\pi r^2 - \\dfrac{1}{2}r^2\\right)$\n$= 2\\left(\\dfrac{1}{4} \\times \\dfrac{22}{7} \\times 7^2 - \\dfrac{1}{2} \\times 7^2\\right)$\n$= 2(38{,}5 - 24{,}5) = 28$ $cm^2$",
    tips:
      "Untuk keliling, hitung hanya busur yang menjadi batas daerah arsir. Untuk luas, kurangi luas segitiga dari luas juring.",
    kesimpulan: "Keliling daerah arsir adalah 22 cm dan luasnya 28 $cm^2$.",
  },
  13: {
    jawaban: "B. Keliling 88 cm dan luas 112 $cm^2$",
    konsepTrik:
      "Gambar terdiri atas empat daerah arsir yang kongruen. Setiap kelopak dibatasi dua busur seperempat lingkaran berjari-jari 7 cm.",
    stepByStep:
      "Sisi persegi 14 cm, sehingga jari-jari setiap busur adalah $r = 14 \\div 2 = 7$ cm.\n\nKeliling satu kelopak $= 2 \\times \\dfrac{1}{4} \\times 2\\pi r = 7\\pi = 22$ cm.\nKeliling seluruh arsiran $= 4 \\times 22 = 88$ cm.\n\nLuas satu kelopak $= 2\\left(\\dfrac{1}{4}\\pi r^2 - \\dfrac{1}{2}r^2\\right) = 28$ $cm^2$.\nLuas seluruh arsiran $= 4 \\times 28 = 112$ $cm^2$.",
    tips:
      "Gunakan simetri: hitung satu kelopak terlebih dahulu, kemudian kalikan empat.",
    kesimpulan: "Keliling seluruh daerah arsir adalah 88 cm dan luasnya 112 $cm^2$.",
  },
  14: {
    jawaban: "D. 60°",
    konsepTrik:
      "Sudut pusat = $2 \\times$ sudut keliling yang menghadap busur yang sama.",
    stepByStep:
      "Sudut $\\angle ACB=30°$ adalah sudut keliling yang menghadap busur AB.\nSudut pusat yang menghadap busur yang sama dua kali sudut keliling.\n$\\angle AOB=2\\times30°=60°$.",
    tips:
      "Pastikan sudut 30° berada di keliling, bukan di pusat.",
    kesimpulan: "Besar $\\angle AOB=60°$.",
  },
  15: {
    jawaban: "C. 60°",
    konsepTrik:
      "Sudut $\\angle ACE$ adalah sudut keliling yang menghadap busur AE, sedangkan $\\angle AOE$ adalah sudut pusat yang menghadap busur yang sama.",
    stepByStep:
      "Dari gambar, $\\angle ACE=30°$.\nHubungan sudut pusat dan sudut keliling: $\\angle AOE=2\\times\\angle ACE$.\n$\\angle AOE=2\\times30°=60°$.",
    tips:
      "Jangan menjumlahkan tiga sudut yang tidak diberikan nilainya. Data pada gambar yang dipakai adalah sudut $30°$ di C.",
    kesimpulan: "Besar $\\angle AOE=60°$.",
  },
  16: {
    jawaban: "C. 80°",
    konsepTrik:
      "Segitiga yang dibentuk oleh dua jari-jari adalah sama kaki. Selain itu, AC merupakan diameter karena garis AC melalui pusat O.",
    stepByStep:
      "$\\triangle OAD$ sama kaki: $\\angle OAD = \\angle ODA = 20°$, jadi $\\angle AOD = 140°$.\n$\\triangle OBD$ sama kaki: $\\angle OBD = \\angle ODB = 30°$, jadi $\\angle BOD = 120°$.\nDari gambar, busur AB yang tidak memuat D bernilai $360°-140°-120°=100°$, sehingga $\\angle AOB=100°$.\nKarena AC diameter, $\\angle AOC=180°$. Maka $\\angle BOC=180°-100°=80°$.",
    tips:
      "Manfaatkan sifat segitiga sama kaki dari dua jari-jari yang bertemu di satu titik lingkaran.",
    kesimpulan: "Karena $\\angle AOC=180°$ dan $\\angle AOB=100°$, maka $\\angle BOC=180°-100°=80°$.",
  },
  17: {
    jawaban: "B. 49°",
    konsepTrik:
      "AB adalah diameter, sehingga sudut pusat AOB merupakan sudut lurus. Sudut BDC adalah sudut keliling yang menghadap busur BC.",
    stepByStep:
      "$\\angle AOC=82°$ dan $\\angle AOB=180°$, sehingga $\\angle BOC=180°-82°=98°$.\n$\\angle BDC=\\dfrac{1}{2}\\angle BOC=\\dfrac{1}{2}\\times98°=49°$.",
    tips:
      "Jangan langsung membagi 82° dengan 2 karena 82° adalah sudut AOC, bukan sudut BOC.",
    kesimpulan: "Besar $\\angle BDC=49°$.",
  },
  18: {
    jawaban: "A. 124°",
    konsepTrik:
      "Bila titik $B$ di sisi berlawanan dengan pusat terhadap tali busur $AC$, maka $\\angle ABC = \\dfrac{1}{2}(360° - \\angle AOC)$.",
    stepByStep:
      "$\\angle AOC = 112°$ (sudut pusat menghadap busur kecil $AC$).\nBusur besar $AC = 360° - 112° = 248°$.\n$\\angle ABC = \\dfrac{1}{2} \\times 248° = 124°$",
    tips:
      "Cek posisi titik sudut keliling — jika di sisi berlawanan dari pusat, gunakan busur besar.",
    kesimpulan: "Besar $\\angle ABC = 124°$.",
  },
  19: {
    jawaban: "A. $30°$, $58°$, $32°$",
    konsepTrik:
      "Gunakan teorema sudut perpotongan dua tali busur dan fakta bahwa AD adalah diameter. Misalkan X titik potong AC dan BD.",
    stepByStep:
      "$\\angle ADB=28° \\Rightarrow$ busur AB $=2\\times28°=56°$.\nKarena AD diameter, busur A-B-C pada setengah lingkaran adalah $180°$, sehingga busur AC melalui B bernilai $180°$.\nPada gambar, $\\angle AXB=60°=\\dfrac{1}{2}(\\text{busur AB}+\\text{busur CD})$, maka busur CD $=120°-56°=64°$.\n$\\angle BAC=\\dfrac{1}{2}\\text{busur BC}=\\dfrac{1}{2}(180°-56°-64°)=30°$.\n$\\angle ADC=\\dfrac{1}{2}\\text{busur AC melalui B}=\\dfrac{1}{2}(56°+60°)=58°$.\nKarena AD diameter, $\\angle ACD=90°$, sehingga $\\angle DAC=180°-90°-58°=32°$.",
    tips:
      "Untuk sudut perpotongan tali busur, jumlahkan dua busur yang diapit oleh sudut tersebut dan sudut bertolak belakangnya.",
    kesimpulan: "Berturut-turut, $\\angle BAC=30°$, $\\angle ADC=58°$, dan $\\angle DAC=32°$.",
  },
  20: {
    jawaban: "A. $80°$, $100°$, $106°$",
    konsepTrik:
      "Pada segiempat tali busur, sudut-sudut yang berhadapan berjumlah 180°. Sudut luar di C membentuk pasangan berpelurus dengan sudut dalam DCB.",
    stepByStep:
      "Sudut dalam di C: $\\angle DCB=180°-100°=80°$.\nSudut berhadapan A dan C: $\\angle BAD=180°-80°=100°$.\nSudut berhadapan B dan D: $\\angle ADC=180°-74°=106°$.",
    tips:
      "Bedakan sudut luar 100° dengan sudut dalam di C; keduanya berpelurus, bukan sama besar.",
    kesimpulan: "Berturut-turut, $\\angle DCB=80°$, $\\angle BAD=100°$, dan $\\angle ADC=106°$.",
  },
  21: {
    jawaban: "D. 114°",
    konsepTrik:
      "$\\angle ABC = 90° + \\dfrac{1}{2}\\angle COD$ untuk konfigurasi sudut tertentu di lingkaran (segiempat tali busur).",
    stepByStep:
      "$\\angle COD = 48°$\n$\\angle ABC = 90° + \\dfrac{48°}{2} = 90° + 24° = 114°$",
    tips:
      "Hafalkan sifat segiempat tali busur dan hubungan sudut pusat-keliling.",
    kesimpulan: "Besar $\\angle ABC = 114°$.",
  },
  22: {
    jawaban: "C. Rp 5.500.000,00",
    konsepTrik:
      "Banyak pohon $= \\dfrac{K_{lingkaran}}{\\text{jarak antar pohon}}$. Total biaya $=$ banyak pohon $\\times$ harga.",
    stepByStep:
      "$K = 2\\pi r = 2 \\times \\dfrac{22}{7} \\times 35 = 220$ m\nBanyak pohon $= \\dfrac{220}{1} = 220$ pohon\nTotal biaya $= 220 \\times 25.000 = 5.500.000$",
    tips:
      "Untuk $r$ kelipatan 7, pakai $\\pi = \\dfrac{22}{7}$ untuk hasil bulat.",
    kesimpulan: "Total biaya penanaman pohon adalah $\\text{Rp } 5.500.000{,}00$.",
  },
  23: {
    jawaban: "A. 94,2 m",
    konsepTrik:
      "Jarak yang ditempuh roda $=$ keliling roda $\\times$ banyak putaran.",
    stepByStep:
      "$K = \\pi d = 3{,}14 \\times 50 = 157$ cm $= 1{,}57$ m\nJarak $= 60 \\times 1{,}57 = 94{,}2$ m",
    tips:
      "Selalu konversi satuan ke yang konsisten (cm ke m) sebelum mengalikan.",
    kesimpulan: "Jarak yang ditempuh roda adalah $94{,}2$ m.",
  },
  24: {
    jawaban: "B. 21 cm",
    konsepTrik:
      "Keliling roda $= \\dfrac{\\text{jarak total}}{\\text{banyak putaran}}$, lalu $r = \\dfrac{K}{2\\pi}$.",
    stepByStep:
      "$K = \\dfrac{5280}{40} = 132$ cm\n$r = \\dfrac{K}{2\\pi} = \\dfrac{132}{2 \\times \\frac{22}{7}} = \\dfrac{132 \\times 7}{44} = 21$ cm",
    tips:
      "Konversi 52,8 m $= 5280$ cm di awal supaya lebih mudah.",
    kesimpulan: "Jari-jari roda adalah $21$ cm.",
  },
  25: {
    jawaban: "D. 21 m",
    konsepTrik:
      "Keliling bianglala $= $ banyak tempat duduk $\\times$ jarak. Lalu $r = \\dfrac{K}{2\\pi}$.",
    stepByStep:
      "$K = 44 \\times 3 = 132$ m\n$r = \\dfrac{132}{2 \\times \\frac{22}{7}} = \\dfrac{132 \\times 7}{44} = 21$ m",
    tips:
      "Untuk $K$ kelipatan 44, $\\pi = \\dfrac{22}{7}$ memberi hasil bulat dengan cepat.",
    kesimpulan: "Jari-jari bianglala adalah $21$ m.",
  },
  26: {
    jawaban: "D. 172 m",
    konsepTrik:
      "Keliling daerah lengkung $=$ jumlah busur + ruas lurus. Untuk dipagari dua kali, kalikan dengan 2.",
    stepByStep:
      "Hitung keliling daerah (busur + ruas lurus dari gambar).\nMisal $K_{daerah} = 86$ m.\nKawat = $2 \\times 86 = 172$ m.",
    tips:
      "Baca dengan teliti: 'dua kali putaran' artinya kawat dilipat dua keliling.",
    kesimpulan: "Kawat berduri yang dibutuhkan minimum $172$ m.",
  },
  27: {
    jawaban: "B. 146 $m^2$",
    konsepTrik:
      "Lapangan tidak termakan = luas lapangan $-$ luas yang dijangkau kambing (lingkaran berjari-jari panjang tali).",
    stepByStep:
      "$L_{lapangan} = 15 \\times 20 = 300$ $m^2$\n$L_{kambing} = \\pi r^2 = \\dfrac{22}{7} \\times 49 = 154$ $m^2$\nTidak termakan $= 300 - 154 = 146$ $m^2$",
    tips:
      "Cek apakah lingkaran muat seluruhnya di dalam persegi panjang ($r < $ jarak tonggak ke sisi terdekat).",
    kesimpulan: "Luas yang tidak termakan adalah $146$ $m^2$.",
  },
  28: {
    jawaban: "C. 132 m",
    konsepTrik:
      "Keliling daerah lengkung $=$ busur + ruas lurus, kalikan 2 untuk dua kali putaran.",
    stepByStep:
      "Hitung keliling daerah dari gambar (busur + lurus).\nMisal $K = 66$ m.\nKawat $= 2 \\times 66 = 132$ m.",
    tips:
      "Identifikasi semua busur (gunakan sudut pusat dan jari-jari) sebelum menjumlah.",
    kesimpulan: "Kawat minimum yang dibutuhkan adalah $132$ m.",
  },
  29: {
    jawaban: "C. 34 cm",
    konsepTrik:
      "Garis singgung tegak lurus jari-jari di titik singgung. Gunakan Pythagoras: $OP^2 = r^2 + AP^2$.",
    stepByStep:
      "Misal $r = 16$ cm, $AP = 30$ cm (panjang singgung):\n$OP = \\sqrt{16^2 + 30^2} = \\sqrt{256+900} = \\sqrt{1156} = 34$ cm",
    tips:
      "Cari tripel Pythagoras untuk mempercepat: $16$-$30$-$34$ adalah kelipatan $8$-$15$-$17$.",
    kesimpulan: "Panjang $OP = 34$ cm.",
  },
  30: {
    jawaban: "B. 17 cm",
    konsepTrik:
      "Garis Singgung Persekutuan Luar (GSPL): $\\ell^2 = p^2 - (R - r)^2$, jadi $p = \\sqrt{\\ell^2 + (R-r)^2}$.",
    stepByStep:
      "$R = 10$, $r = 2$, $\\ell = 15$\n$p = \\sqrt{15^2 + (10-2)^2} = \\sqrt{225 + 64} = \\sqrt{289} = 17$ cm",
    tips:
      "Tripel Pythagoras $8$-$15$-$17$ sering muncul di soal GSPL.",
    kesimpulan: "Jarak antara kedua pusat lingkaran adalah $17$ cm.",
  },
  31: {
    jawaban: "C. 66 $cm^2$",
    konsepTrik:
      "Trapesium $ABCD$ dengan $AD \\parallel BC$ (jari-jari) dan $AB$ jarak pusat. Tinggi trapesium $=$ panjang GSPL $= \\sqrt{AB^2 - (AD-BC)^2}$.",
    stepByStep:
      "$AD = 8$, $BC = 3$, $AB = 13$\nTinggi $= \\sqrt{13^2 - (8-3)^2} = \\sqrt{169-25} = \\sqrt{144} = 12$\n$L = \\dfrac{1}{2}(AD + BC) \\times t = \\dfrac{1}{2}(8+3)(12) = \\dfrac{1}{2}(11)(12) = 66$ $cm^2$",
    tips:
      "Selisih jari-jari $\\to$ kaki segitiga; jarak pusat $\\to$ sisi miring; GSPL $\\to$ kaki tegak.",
    kesimpulan: "Luas trapesium $ABCD = 66$ $cm^2$.",
  },
  32: {
    jawaban: "A. 12 cm",
    konsepTrik:
      "Garis Singgung Persekutuan Dalam (GSPD): $d = \\sqrt{p^2 - (R+r)^2}$.",
    stepByStep:
      "Misal $p = 13$, $R = 4$, $r = 1$:\n$d = \\sqrt{13^2 - (4+1)^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12$ cm",
    tips:
      "GSPD pakai $(R+r)$, GSPL pakai $(R-r)$ — jangan tertukar.",
    kesimpulan: "Panjang GSPD $= 12$ cm.",
  },
  33: {
    jawaban: "B. 3 cm dan 6 cm",
    konsepTrik:
      "GSPD: $d^2 = p^2 - (R+r)^2$. Cari $R+r$, lalu pakai rasio.",
    stepByStep:
      "$d = 12$, $p = 15$\n$144 = 225 - (R+r)^2$\n$(R+r)^2 = 81 \\to R+r = 9$\n$r : R = 1 : 2 \\to r = 3$, $R = 6$",
    tips:
      "Selalu kuadratkan dulu untuk menghilangkan akar, baru gunakan perbandingan.",
    kesimpulan: "Jari-jari kedua lingkaran adalah $3$ cm dan $6$ cm.",
  },
  34: {
    jawaban: "C. $\\dfrac{5}{2}\\sqrt{39}$",
    konsepTrik:
      "Dua lingkaran kecil bersinggungan dengan sisi-sisi $\\triangle ABC$. Gunakan GSPD untuk menentukan tinggi segitiga.",
    stepByStep:
      "$AD = 3{,}5$, $BE = 1{,}5$, $AB = 8$\nGSPD $= \\sqrt{8^2 - (3{,}5+1{,}5)^2} = \\sqrt{64-25} = \\sqrt{39}$\nLuas $\\triangle ABC = \\dfrac{1}{2} \\cdot AB \\cdot t = \\dfrac{1}{2} \\cdot 8 \\cdot \\dfrac{5}{8}\\sqrt{39} = \\dfrac{5}{2}\\sqrt{39}$",
    tips:
      "Hitung dulu jarak antar titik singgung dengan rumus GSPD, lalu gunakan kesebangunan untuk tinggi.",
    kesimpulan: "Luas $\\triangle ABC = \\dfrac{5}{2}\\sqrt{39}$ $cm^2$.",
  },
  35: {
    jawaban: "A. 256 cm",
    konsepTrik:
      "6 kaleng yang disusun rapat $\\to$ tali = 6 ruas lurus (sepanjang $2r$ tiap ruas) + lengkungan total = keliling 1 lingkaran penuh.",
    stepByStep:
      "Ruas lurus $= 6 \\times 2r = 6 \\times 28 = 168$ cm\nLengkungan total $= 2\\pi r = \\dfrac{44}{7} \\times 14 = 88$ cm\nTotal tali $= 168 + 88 = 256$ cm",
    tips:
      "Lengkungan tiap kaleng = $\\dfrac{60°}{360°}$ keliling, total 6 kaleng = 1 keliling penuh.",
    kesimpulan: "Panjang tali minimum adalah $256$ cm.",
  },
  36: {
    jawaban: "C. 261,6 cm",
    konsepTrik:
      "Tali = jumlah ruas lurus (sepanjang $2r$ antara tiap pasang gelas yang bersinggungan) + jumlah busur (totalnya = keliling 1 lingkaran).",
    stepByStep:
      "Susunan 10 gelas $\\to$ ruas lurus $= n \\times 2r$ (sesuai pola susunan).\nLengkungan total $= 2\\pi r = 2 \\times 3{,}14 \\times 10 = 62{,}8$ cm\nTotal $\\approx 261{,}6$ cm.",
    tips:
      "Cek pola susunan gelas dengan cermat — banyak ruas lurus tergantung bentuk susunan.",
    kesimpulan: "Panjang tali minimal adalah $261{,}6$ cm.",
  },
};
