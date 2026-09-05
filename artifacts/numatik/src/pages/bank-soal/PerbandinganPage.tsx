import PracticeCollectionBankPage from "@/components/bank-soal/PracticeCollectionBankPage";
import PerbandinganUmumPage from "@/pages/latihan-mandiri/kelas7/perbandingan/PerbandinganUmumPage";
import PerbandinganBertingkatPage from "@/pages/latihan-mandiri/kelas7/perbandingan/PerbandinganBertingkatPage";
import PerbandinganSenilaiPage from "@/pages/latihan-mandiri/kelas7/perbandingan/PerbandinganSenilaiPage";
import PerbandinganSkalaPage from "@/pages/latihan-mandiri/kelas7/perbandingan/PerbandinganSkalaPage";
import PerbandinganCampuranPage from "@/pages/latihan-mandiri/kelas7/perbandingan/PerbandinganCampuranPage";

const sections = [
  ["PERBANDINGAN UMUM", PerbandinganUmumPage],
  ["PERBANDINGAN BERTINGKAT", PerbandinganBertingkatPage],
  ["PERBANDINGAN SENILAI", PerbandinganSenilaiPage],
  ["SKALA", PerbandinganSkalaPage],
  ["PERBANDINGAN CAMPURAN", PerbandinganCampuranPage],
] as const;

export default function PerbandinganPage() {
  return (
    <PracticeCollectionBankPage
      title="BANK SOAL – PERBANDINGAN"
      subtitle="Soal dari seluruh subtopik Tugas-Latihan Mandiri Perbandingan"
      sections={sections.map(([label, Page]) => ({ label, Page }))}
    />
  );
}