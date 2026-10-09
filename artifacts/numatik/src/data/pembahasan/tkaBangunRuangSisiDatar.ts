import type { Pembahasan } from "@/components/PembahasanCard";

export const tkaBangunRuangSisiDatarPembahasan: Record<number, Pembahasan> = {
  1: {
    jawaban: "A. Gambar A",
    konsepTrik:
      "Jaring-jaring kubus harus terdiri dari tepat 6 persegi yang menempati keenam sisi kubus tanpa bertumpuk.",
    stepByStep:
      "A. Terdiri dari 6 persegi dan saat dilipat menempati keenam sisi kubus satu kali.\n" +
      "B. Dua persegi akan menempati sisi kubus yang sama saat dilipat.\n" +
      "C. Terdiri dari 6 persegi, tetapi saat dilipat ada dua persegi yang menempati sisi kubus yang sama.\n" +
      "D. Dua persegi akan menempati sisi kubus yang sama saat dilipat.\n" +
      "Jadi, jaring-jaring yang valid adalah gambar A.",
    tips:
      "Hitung dahulu jumlah perseginya, lalu ikuti arah lipatan. Jaring-jaring valid harus menghasilkan 6 sisi yang berbeda tanpa tumpang tindih.",
    kesimpulan:
      "Pilihan A adalah satu-satunya rangkaian yang dapat dilipat menjadi kubus tanpa ada sisi yang bertumpuk.",
  },
  15: {
    jawaban: "A. 50 cm",
    konsepTrik:
      "Hitung panjang rusuk kedua kerangka, jumlahkan, lalu kurangi dari persediaan kawat. Rusuk tegak limas persegi panjang diperoleh dengan Teorema Pythagoras.",
    stepByStep:
      "Panjang kawat untuk limas:\n" +
      "Keliling alas = $2(8+6)=28$ cm.\n" +
      "Jarak pusat alas ke sudut = $\\frac{\\sqrt{8^2+6^2}}{2}=5$ cm.\n" +
      "Setiap rusuk tegak = $\\sqrt{12^2+5^2}=13$ cm, sehingga total rusuk tegak = $4(13)=52$ cm.\n" +
      "Total kawat limas = $28+52=80$ cm.\n" +
      "Panjang kawat untuk prisma segi enam:\n" +
      "$2(6\\times12)+6\\times21=144+126=270$ cm.\n" +
      "Total kawat terpakai = $80+270=350$ cm.\n" +
      "Persediaan kawat $4$ m = $400$ cm, sehingga sisanya $400-350=50$ cm.",
    tips:
      "Kerangka prisma memakai dua keliling alas dan semua rusuk tegak. Ubah meter ke sentimeter sebelum menghitung sisa.",
    kesimpulan:
      "Sisa kawat Rosa adalah $400-350=50$ cm, yaitu pilihan A.",
  },
  22: {
    jawaban: "D. 1.020 cm²",
    konsepTrik:
      "Luas permukaan prisma adalah $LP=2L_{alas}+K_{alas}\\times t$. Untuk belah ketupat, sisi dihitung dari setengah kedua diagonalnya.",
    stepByStep:
      "Diagonal alas 10 cm dan 24 cm, tinggi prisma 15 cm.\n" +
      "Sisi belah ketupat: $s=\\sqrt{(10/2)^2+(24/2)^2}=\\sqrt{5^2+12^2}=13$ cm.\n" +
      "Luas alas: $L_{alas}=\\frac{1}{2}\\times10\\times24=120$ cm².\n" +
      "Keliling alas: $K_{alas}=4\\times13=52$ cm.\n" +
      "Gunakan rumus $LP=2L_{alas}+K_{alas}\\times t$.\n" +
      "$LP=2(120)+52(15)=240+780=1.020$ cm².",
    tips:
      "Jangan memakai luas alas sebagai keliling. Hitung luas alas dan keliling alas secara terpisah sebelum memasukkannya ke rumus luas permukaan prisma.",
    kesimpulan:
      "Luas permukaan prisma belah ketupat tersebut adalah $1.020$ cm², pilihan D.",
  },
  33: {
    jawaban: "D. 192 cm³",
    konsepTrik:
      "Misalkan rusuk balok berturut-turut $2a$, $3a$, dan $4a$. Gunakan luas permukaan untuk mencari $a$, lalu hitung volumenya.",
    stepByStep:
      "Misalkan $p=2a$, $l=3a$, dan $t=4a$.\n" +
      "Luas permukaan: $2(pl+pt+lt)=2(6a^2+8a^2+12a^2)=52a^2$.\n" +
      "$52a^2=208$, sehingga $a^2=4$ dan $a=2$ (panjang bernilai positif).\n" +
      "Dimensi balok: $p=4$ cm, $l=6$ cm, dan $t=8$ cm.\n" +
      "Volume: $V=4\\times6\\times8=192$ cm³.",
    tips:
      "Periksa kembali nilai skala dari luas permukaan. Untuk rasio $2:3:4$, luas permukaan harus berbentuk $52a^2$.",
    kesimpulan:
      "Volume balok adalah $192$ cm³, yaitu pilihan D.",
  },
  39: {
    jawaban: "A. 20 cm",
    konsepTrik:
      "E adalah pusat alas persegi, sehingga TE tegak lurus bidang alas dan merupakan tinggi limas yang digunakan dalam rumus volume.",
    stepByStep:
      "Luas alas persegi ABCD: $30\\times30=900$ cm².\n" +
      "Rumus volume limas: $V=\\frac{1}{3}L_{alas}\\times TE$.\n" +
      "$6000=\\frac{1}{3}\\times900\\times TE=300\\times TE$.\n" +
      "$TE=6000\\div300=20$ cm.",
    tips:
      "Pastikan TE adalah tinggi tegak lurus ke pusat alas, bukan rusuk tegak atau tinggi sisi segitiga.",
    kesimpulan:
      "Panjang TE adalah $20$ cm, yaitu pilihan A.",
  },
};