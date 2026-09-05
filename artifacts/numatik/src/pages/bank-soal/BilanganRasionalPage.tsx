import PracticeCollectionBankPage from "@/components/bank-soal/PracticeCollectionBankPage";
import ArtiPecahanSenilaiMembandingkanPage from "@/pages/latihan-mandiri/kelas7/pecahan/ArtiPecahanSenilaiMembandingkanPage";
import PecahanCampuranPersenPage from "@/pages/latihan-mandiri/kelas7/pecahan/PecahanCampuranPersenPage";
import PenjumlahanPecahanPage from "@/pages/latihan-mandiri/kelas7/pecahan/PenjumlahanPecahanPage";
import PerkalianPecahanPage from "@/pages/latihan-mandiri/kelas7/pecahan/PerkalianPecahanPage";
import PembagianPecahanPage from "@/pages/latihan-mandiri/kelas7/pecahan/PembagianPecahanPage";
import BentukDesimalPage from "@/pages/latihan-mandiri/kelas7/pecahan/BentukDesimalPage";
import PenjumlahanPenguranganDesimalPage from "@/pages/latihan-mandiri/kelas7/pecahan/PenjumlahanPenguranganDesimalPage";
import PerkalianDesimalPage from "@/pages/latihan-mandiri/kelas7/pecahan/PerkalianDesimalPage";
import PembagianDesimalPage from "@/pages/latihan-mandiri/kelas7/pecahan/PembagianDesimalPage";
import PembulatanDesimalPage from "@/pages/latihan-mandiri/kelas7/pecahan/PembulatanDesimalPage";

const sections = [
  ["ARTI PECAHAN, PECAHAN SENILAI, DAN MEMBANDINGKAN PECAHAN", ArtiPecahanSenilaiMembandingkanPage],
  ["PECAHAN CAMPURAN DAN PERSEN", PecahanCampuranPersenPage],
  ["PENJUMLAHAN DAN PENGURANGAN PECAHAN", PenjumlahanPecahanPage],
  ["PERKALIAN PECAHAN", PerkalianPecahanPage],
  ["PEMBAGIAN PECAHAN", PembagianPecahanPage],
  ["BENTUK DESIMAL", BentukDesimalPage],
  ["PENJUMLAHAN DAN PENGURANGAN DESIMAL", PenjumlahanPenguranganDesimalPage],
  ["PERKALIAN DESIMAL", PerkalianDesimalPage],
  ["PEMBAGIAN DESIMAL", PembagianDesimalPage],
  ["PEMBULATAN DESIMAL", PembulatanDesimalPage],
] as const;

export default function BilanganRasionalPage() {
  return (
    <PracticeCollectionBankPage
      title="BANK SOAL – BILANGAN RASIONAL"
      subtitle="Soal dari seluruh subtopik Tugas-Latihan Mandiri Bilangan Rasional"
      sections={sections.map(([label, Page]) => ({ label, Page }))}
    />
  );
}