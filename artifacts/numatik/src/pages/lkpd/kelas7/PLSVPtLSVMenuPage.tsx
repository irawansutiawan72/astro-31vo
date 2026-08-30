import MateriTopicPage from "@/components/MateriTopicPage";

const subtopics = [
  { label: "KALIMAT TERBUKA & TERTUTUP", path: "/lkpd/kelas-7/plsv-ptlsv/kalimat-terbuka-tertutup", icon: "💬" },
  { label: "PENGERTIAN PERSAMAAN LINEAR SATU VARIABEL", path: "/lkpd/kelas-7/plsv-ptlsv/pengertian-plsv", icon: "🎯" },
  { label: "PENYELESAIAN PERSAMAAN LINEAR SATU VARIABEL", path: "/lkpd/kelas-7/plsv-ptlsv/penyelesaian-plsv", icon: "⚖️" },
  { label: "MODEL MATEMATIKA PERSAMAAN LINEAR SATU VARIABEL", path: "/lkpd/kelas-7/plsv-ptlsv/model-matematika-plsv", icon: "🧠" },
  { label: "PENGERTIAN PERTIDAKSAMAAN LINEAR SATU VARIABEL", path: "/lkpd/kelas-7/plsv-ptlsv/pengertian-ptlsv", icon: "🚦" },
  { label: "PENYELESAIAN PERTIDAKSAMAAN LINEAR SATU VARIABEL", path: "/lkpd/kelas-7/plsv-ptlsv/penyelesaian-ptlsv", icon: "🪜" },
  { label: "MODEL MATEMATIKA PERTIDAKSAMAAN LINEAR SATU VARIABEL", path: "/lkpd/kelas-7/plsv-ptlsv/model-matematika-ptlsv", icon: "🛒" },
];

const PLSVPtLSVMenuPage = () => (
  <MateriTopicPage
    title="LKPD PERSAMAAN DAN PERTIDAKSAMAAN LINEAR SATU VARIABEL"
    emoji="⚖️"
    kelas="Kelas 7"
    subtopics={subtopics}
    backPath="/lkpd/kelas-7"
    backLabel="Kembali ke LKPD Kelas 7"
    contextLabel="LKPD"
  />
);

export default PLSVPtLSVMenuPage;
