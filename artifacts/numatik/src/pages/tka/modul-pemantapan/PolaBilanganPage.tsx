import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { LatihanSoal, MateriSection } from "@/components/tka/TKAPemantapanLayout";
import { getTkaContohSoal } from "@/data/tkaContohSoal";
import { polaBilanganDasarPembahasan } from "@/data/pembahasan/polaBilanganDasar";
import {
  latihanDasarPolaBilanganTka,
  polaBilanganMateriSections,
  polaBilanganSoalSvgMap,
} from "@/data/tka/polaBilanganLatihan";

const kunciJawaban = [
  "C", "C", "A", "D", "C", "B", "B", "A", "D", "C", "C", "D", "D", "A",
  "C", "D", "B", "C", "A", "A", "D", "C", "B", "C", "C", "C", "C", "B",
  "D", "D", "D", "B", "C", "D", "A", "B", "B", "A", "B", "A", "A", "A",
] as const;

const toPembahasanText = (soalNo: number) => {
  const pembahasan = polaBilanganDasarPembahasan[soalNo];
  if (!pembahasan) return undefined;
  return [
    `Konsep & Trik: ${pembahasan.konsepTrik}`,
    `Langkah Penyelesaian:\n${pembahasan.stepByStep}`,
    `Tips: ${pembahasan.tips}`,
    `Kesimpulan: ${pembahasan.kesimpulan}`,
  ].join("\n\n");
};

const materiSections: MateriSection[] = polaBilanganMateriSections;

const latihanDasar: LatihanSoal[] = latihanDasarPolaBilanganTka
  .map((soal) => ({
  ...soal,
  type: "pg",
  jawaban: kunciJawaban[soal.no - 1],
  pembahasan: toPembahasanText(soal.no),
  soalSvg: polaBilanganSoalSvgMap[String(soal.no)] ? String(soal.no) : undefined,
}));

const PolaBilanganPage = () => (
  <TKAPemantapanLayout
    title="POLA BILANGAN"
    materiSections={materiSections}
    contohSoal={getTkaContohSoal("pola-bilangan")}
    latihanDasar={latihanDasar}
    soalSvgMap={polaBilanganSoalSvgMap}
  />
);

export default PolaBilanganPage;