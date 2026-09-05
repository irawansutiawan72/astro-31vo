import PracticeCollectionBankPage from "@/components/bank-soal/PracticeCollectionBankPage";
import PengertianUnsurAljabarPage from "@/pages/latihan-mandiri/kelas7/aljabar/PengertianUnsurAljabarPage";
import PenjumlahanPenguranganAljabarPage from "@/pages/latihan-mandiri/kelas7/aljabar/PenjumlahanPenguranganAljabarPage";
import PerkalianAljabarPage from "@/pages/latihan-mandiri/kelas7/aljabar/PerkalianAljabarPage";
import PembagianAljabarPage from "@/pages/latihan-mandiri/kelas7/aljabar/PembagianAljabarPage";
import PemangkatanAljabarPage from "@/pages/latihan-mandiri/kelas7/aljabar/PemangkatanAljabarPage";
import SubstitusiBilanganAljabarPage from "@/pages/latihan-mandiri/kelas7/aljabar/SubstitusiBilanganAljabarPage";
import FaktorisasiAljabarPage from "@/pages/latihan-mandiri/kelas7/aljabar/FaktorisasiAljabarPage";
import MenyederhanakanPecahanAljabarPage from "@/pages/latihan-mandiri/kelas7/aljabar/MenyederhanakanPecahanAljabarPage";

const sections = [
  ["PENGERTIAN DAN UNSUR-UNSUR ALJABAR", PengertianUnsurAljabarPage],
  ["PENJUMLAHAN DAN PENGURANGAN ALJABAR", PenjumlahanPenguranganAljabarPage],
  ["PERKALIAN ALJABAR", PerkalianAljabarPage],
  ["PEMBAGIAN ALJABAR", PembagianAljabarPage],
  ["PEMANGKATAN ALJABAR", PemangkatanAljabarPage],
  ["SUBSTITUSI BILANGAN PADA BENTUK ALJABAR", SubstitusiBilanganAljabarPage],
  ["FAKTORISASI ALJABAR", FaktorisasiAljabarPage],
  ["MENYEDERHANAKAN PECAHAN ALJABAR", MenyederhanakanPecahanAljabarPage],
] as const;

export default function AljabarPage() {
  return (
    <PracticeCollectionBankPage
      title="BANK SOAL – ALJABAR"
      subtitle="Soal dari seluruh subtopik Tugas-Latihan Mandiri Aljabar"
      sections={sections.map(([label, Page]) => ({ label, Page }))}
    />
  );
}