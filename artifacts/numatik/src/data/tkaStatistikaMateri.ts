import type { MateriSection } from "@/components/tka/TKAPemantapanLayout";

export const tkaStatistikaMateri: MateriSection[] = [
  {
    heading: "A. Pengertian Data dan Statistika",
    content: `Data adalah kumpulan informasi atau fakta dalam bentuk angka atau kategori. Data kualitatif berupa kategori, sedangkan data kuantitatif berupa angka yang dapat diukur atau dihitung.

Statistika adalah ilmu yang berkaitan dengan pengumpulan, pengolahan, penyajian, analisis, dan penarikan kesimpulan dari data.`,
  },
  {
    heading: "B. Populasi dan Sampel",
    content: `Populasi adalah keseluruhan objek atau individu yang menjadi perhatian dalam penelitian. Sampel adalah sebagian dari populasi yang dipilih untuk diteliti.

Sampel harus representatif atau mewakili populasi agar kesimpulan yang dihasilkan dapat dipercaya.`,
  },
  {
    heading: "C. Cara Mengumpulkan Data",
    content: `Data dapat dikumpulkan melalui:

1. Wawancara, yaitu bertanya langsung kepada sumber data.
2. Kuesioner atau angket, yaitu daftar pertanyaan tertulis untuk responden.
3. Observasi, yaitu mengamati objek atau peristiwa secara langsung.
4. Dokumentasi atau studi literatur, yaitu menggunakan dokumen dan sumber yang sudah tersedia.`,
  },
  {
    heading: "D. Penyajian Data",
    content: `Data dapat disajikan dalam tabel distribusi frekuensi, diagram batang, diagram garis, atau diagram lingkaran.

Pilih tabel untuk membaca nilai dan frekuensi secara rinci. Gunakan diagram batang untuk membandingkan kategori, diagram garis untuk melihat perubahan berurutan, dan diagram lingkaran untuk melihat proporsi bagian terhadap keseluruhan.`,
  },
  {
    heading: "E. Ukuran Pemusatan Data",
    content: `Rata-rata (mean) adalah jumlah seluruh data dibagi banyak data:

$$\\bar{x} = \\dfrac{\\text{jumlah seluruh data}}{\\text{banyak data}}$$

Median adalah nilai tengah setelah data diurutkan. Modus adalah nilai yang paling sering muncul.`,
  },
  {
    heading: "F. Ukuran Penyebaran Data",
    content: `Jangkauan adalah selisih data terbesar dan data terkecil:

$$R = X_{maks} - X_{min}$$

Kuartil membagi data yang telah diurutkan menjadi empat bagian. $Q_2$ sama dengan median, sedangkan jangkauan interkuartil adalah $Q_3 - Q_1$.`,
  },
  {
    heading: "G. Membaca dan Menganalisis Data",
    content: `Untuk menyelesaikan soal statistika, baca judul dan satuan pada tabel atau diagram terlebih dahulu. Catat data yang diketahui, tentukan ukuran yang ditanyakan, lalu gunakan rumus yang sesuai.

Periksa kembali jumlah frekuensi, satuan, dan posisi data sebelum memilih jawaban.`,
  },
];