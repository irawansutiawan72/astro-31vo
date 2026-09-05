import OlympiadBankPage from "@/components/bank-soal/OlympiadBankPage";
import type { OlympiadQuestion } from "@/components/bank-soal/OlympiadBankPage";
import { QUESTIONS_BY_LANG as penjumlahanQuestions } from "@/pages/latihan-mandiri/kelas7/bilangan-bulat/PenjumlahanPage";
import { QUESTIONS_BY_LANG as penguranganQuestions } from "@/pages/latihan-mandiri/kelas7/bilangan-bulat/PenguranganPage";
import { QUESTIONS_BY_LANG as perkalianQuestions } from "@/pages/latihan-mandiri/kelas7/bilangan-bulat/PerkalianPage";
import {
  MATH_QUESTIONS as operasiMathQuestions,
  ESSAY_QUESTIONS_BY_LANG as operasiEssayQuestions,
} from "@/pages/latihan-mandiri/kelas7/bilangan-bulat/OperasiCampuranPage";
import { QUESTIONS_BY_LANG as kpkFpbQuestions } from "@/pages/latihan-mandiri/kelas7/bilangan-bulat/KPKFPBPage";

const toReadableMath = (math: string) =>
  math
    .replace(/\\times/g, "×")
    .replace(/\\div/g, "÷")
    .replace(/\\cdot/g, "·")
    .replace(/\\left|\\right/g, "");

const bankQuestions: OlympiadQuestion[] = [
  ...penjumlahanQuestions.id.map((question) => ({
    no: question.number,
    category: "Penjumlahan Bilangan Bulat",
    soal: [question.title, question.content].filter(Boolean).join("\n"),
  })),
  ...penguranganQuestions.id.map((question) => ({
    no: question.number + 8,
    category: "Pengurangan Bilangan Bulat",
    soal: question.content,
    ...(question.image ? { image: question.image } : {}),
  })),
  ...perkalianQuestions.id.map((question) => ({
    no: question.number + 13,
    category: "Perkalian Bilangan Bulat",
    soal: [
      question.content,
      ...(question.subItems || []).map((item) => `${item.label} ${toReadableMath(item.math)}`),
    ].join("\n"),
  })),
  ...operasiMathQuestions.map((question) => ({
    no: question.number + 18,
    category: "Operasi Campuran Bilangan Bulat",
    soal: toReadableMath(question.math || ""),
  })),
  ...operasiEssayQuestions.id.map((question) => ({
    no: question.number + 18,
    category: "Operasi Campuran Bilangan Bulat",
    soal: question.content || "",
  })),
  ...kpkFpbQuestions.id.map((question) => ({
    no: question.number + 33,
    category: "KPK dan FPB",
    soal: question.content,
  })),
];

export default function BilanganBulatPage() {
  return (
    <OlympiadBankPage
      title="Bilangan Bulat"
      questions={bankQuestions}
      heading="BANK SOAL – BILANGAN BULAT"
      topicLabel="Soal dari seluruh subtopik Tugas-Latihan Mandiri"
      backPath="/bank-soal"
      questionLabel="Tugas-Latihan Mandiri"
      showDiscussion={false}
    />
  );
}
