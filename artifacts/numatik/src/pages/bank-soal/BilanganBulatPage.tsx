import OlympiadBankPage from "@/components/bank-soal/OlympiadBankPage";
import { latihanOlimpiade } from "@/pages/OlimpiadeBilanganBulatPage";

export default function BilanganBulatPage() {
  return (
    <OlympiadBankPage
      title="Bilangan Bulat"
      questions={latihanOlimpiade}
      headline="Taklukkan Dunia Positif & Negatif!"
      headlineDescription="Asah logikamu, kuasai garis bilangan, dan pecahkan tantangan bilangan bulat dari dasar hingga level olimpiade."
    />
  );
}
