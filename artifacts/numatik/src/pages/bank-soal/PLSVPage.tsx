import PracticeCollectionBankPage from "@/components/bank-soal/PracticeCollectionBankPage";
import KalimatTerbukaTertutupPage from "@/pages/latihan-mandiri/kelas7/plsv-ptlsv/KalimatTerbukaTertutupPage";
import PengertianPLSVPage from "@/pages/latihan-mandiri/kelas7/plsv-ptlsv/PengertianPLSVPage";
import PenyelesaianPLSVPage from "@/pages/latihan-mandiri/kelas7/plsv-ptlsv/PenyelesaianPLSVPage";
import ModelMatematikaPLSVPage from "@/pages/latihan-mandiri/kelas7/plsv-ptlsv/ModelMatematikaPLSVPage";
import PengertianPtLSVPage from "@/pages/latihan-mandiri/kelas7/plsv-ptlsv/PengertianPtLSVPage";
import PenyelesaianPtLSVPage from "@/pages/latihan-mandiri/kelas7/plsv-ptlsv/PenyelesaianPtLSVPage";
import ModelMatematikaPtLSVPage from "@/pages/latihan-mandiri/kelas7/plsv-ptlsv/ModelMatematikaPtLSVPage";

const sections = [
  ["KALIMAT TERBUKA DAN TERTUTUP", KalimatTerbukaTertutupPage],
  ["PENGERTIAN PERSAMAAN LINEAR SATU VARIABEL", PengertianPLSVPage],
  ["PENYELESAIAN PERSAMAAN LINEAR SATU VARIABEL", PenyelesaianPLSVPage],
  ["MODEL MATEMATIKA DAN PENERAPAN PERSAMAAN", ModelMatematikaPLSVPage],
  ["PENGERTIAN PERTIDAKSAMAAN LINEAR SATU VARIABEL", PengertianPtLSVPage],
  ["PENYELESAIAN PERTIDAKSAMAAN LINEAR SATU VARIABEL", PenyelesaianPtLSVPage],
  ["MODEL MATEMATIKA DAN PENERAPAN PERTIDAKSAMAAN", ModelMatematikaPtLSVPage],
] as const;

export default function PLSVPage() {
  return (
    <PracticeCollectionBankPage
      title="BANK SOAL – PERSAMAAN DAN PERTIDAKSAMAAN LINEAR SATU VARIABEL"
      subtitle="Soal dari seluruh subtopik Tugas-Latihan Mandiri PLSV dan PtLSV"
      sections={sections.map(([label, Page]) => ({ label, Page }))}
    />
  );
}