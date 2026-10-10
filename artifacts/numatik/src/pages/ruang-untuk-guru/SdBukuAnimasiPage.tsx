import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const BASE_PATH = "/ruang-untuk-guru/sd/buku-animasi";

const sdBookClasses = [
  {
    grade: 1,
    topics: [
      "Bilangan Sampai 10",
      "Penjumlahan dan Pengurangan (1)",
      "Mengenal Bentuk Bangun",
      "Bilangan Sampai 20",
      "Penjumlahan dan Pengurangan (2)",
      "Pengukuran dan Waktu",
    ],
  },
  {
    grade: 2,
    topics: [
      "Bilangan Sampai 1.000",
      "Penjumlahan dan Pengurangan",
      "Perkalian dan Pembagian",
      "Pecahan Sederhana",
      "Pengukuran",
      "Bangun Datar dan Bangun Ruang",
    ],
  },
  {
    grade: 3,
    topics: [
      "Bilangan Cacah Sampai 10.000",
      "Operasi Hitung Bilangan Cacah",
      "Pecahan",
      "Pengukuran (Panjang, Berat, dan Waktu)",
      "Keliling dan Luas Bangun Datar",
      "Analisis Data",
    ],
  },
  {
    grade: 4,
    topics: [
      "Bilangan Cacah Sampai 100.000",
      "KPK dan FPB",
      "Pecahan, Desimal, dan Persen",
      "Pola Gambar dan Pola Bilangan",
      "Pengukuran Luas dan Volume",
      "Bangun Datar",
    ],
  },
  {
    grade: 5,
    topics: [
      "Bilangan Cacah Sampai 1.000.000",
      "Pecahan Lanjutan",
      "Desimal dan Persen Lanjutan",
      "Perbandingan (Rasio)",
      "Pengukuran (Kecepatan dan Debit)",
      "Luas dan Volume",
    ],
  },
  {
    grade: 6,
    topics: [
      "Penyajian Data",
      "Bilangan Bulat Negatif",
      "Operasi Hitung Campuran",
      "Denah dan Skala",
      "Lingkaran",
      "Bangun Ruang Lanjutan",
      "Statistika",
      "Peluang",
    ],
  },
];

const topicSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const SdBukuAnimasiPage = () => {
  const navigate = useNavigate();

  const openTopic = (grade: number, title: string) => {
    playPopSound();
    navigate(`${BASE_PATH}/kelas-${grade}/${topicSlug(title)}`);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden gradient-space text-white">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru/sd" />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-20">
        <header className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-100">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            Ruang Untuk Guru · SD
          </div>
          <h1 className="font-display text-2xl font-bold leading-tight text-primary text-glow-cyan md:text-3xl">
            BUKU ANIMASI MATEMATIKA SD
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-white/70 md:text-base">
            Pilih kelas dan topik yang ingin dipelajari.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sdBookClasses.map(({ grade, topics }) => (
            <section
              key={grade}
              aria-labelledby={`sd-grade-${grade}`}
              className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur sm:p-5"
            >
              <h2
                id={`sd-grade-${grade}`}
                className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-cyan-200"
              >
                <BookOpen className="h-5 w-5" aria-hidden="true" />
                Kelas {grade}
              </h2>
              <ul className="space-y-2">
                {topics.map((topic, index) => (
                  <li key={topic}>
                    <button
                      type="button"
                      onClick={() => openTopic(grade, topic)}
                      className="group flex min-h-12 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[.03] px-3 py-2.5 text-left transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 font-mono text-xs text-cyan-200">
                        {index + 1}
                      </span>
                      <span className="flex-1 text-sm leading-snug text-white/85">
                        {topic}
                      </span>
                      <ChevronRight
                        className="h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-white/45">
          <Sparkles className="h-4 w-4 text-cyan-300/70" aria-hidden="true" />
          Materi animasi akan ditambahkan secara bertahap.
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => {
              playPopSound();
              navigate("/ruang-untuk-guru/sd");
            }}
            className="inline-flex items-center gap-2 font-body text-sm text-white/60 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Kembali ke Menu SD
          </button>
        </div>
      </main>
    </div>
  );
};

export const SdBukuAnimasiTopicPage = () => {
  const navigate = useNavigate();
  const { classSlug, topicSlug: selectedTopicSlug } = useParams<{
    classSlug: string;
    topicSlug: string;
  }>();

  const selectedClass = sdBookClasses.find(
    ({ grade }) => classSlug === `kelas-${grade}`,
  );
  const selectedTopic = selectedClass?.topics.find(
    (topic) => topicSlug(topic) === selectedTopicSlug,
  );
  const backPath = BASE_PATH;

  if (!selectedClass || !selectedTopic) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden gradient-space text-white">
        <Starfield />
        <PageNavigation prevPath={backPath} />
        <main className="relative z-10 px-6 text-center">
          <h1 className="font-display text-2xl font-bold text-primary">
            Topik tidak ditemukan
          </h1>
          <button
            type="button"
            onClick={() => {
              playPopSound();
              navigate(backPath);
            }}
            className="mt-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Kembali ke daftar topik
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden gradient-space">
      <Starfield />
      <PageNavigation prevPath={backPath} />
      <main className="relative z-10 w-full max-w-2xl px-6 py-16 text-center">
        <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-[2rem] border border-cyan-300/25 bg-card/70 shadow-[0_0_45px_rgba(34,211,238,0.14)] backdrop-blur-md">
          <div className="absolute inset-4 rounded-3xl bg-cyan-400/15 blur-2xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary">
            <BookOpen className="h-11 w-11" strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
          <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
          Buku Animasi · SD Kelas {selectedClass.grade}
        </div>
        <h1 className="font-display text-2xl font-black leading-tight text-foreground sm:text-4xl">
          {selectedTopic}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          Materi animasi untuk topik ini sedang disiapkan dan akan ditambahkan
          secara bertahap.
        </p>

        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-amber-400/20 bg-card/60 p-6 text-left shadow-[0_0_30px_rgba(234,179,8,0.08)] backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="font-body text-xs text-muted-foreground">
              Status pengembangan
            </span>
            <span className="font-mono text-xs text-amber-300">SEGERA HADIR</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-300" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            playPopSound();
            navigate(backPath);
          }}
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-500/15 px-6 py-3 font-display text-sm font-bold text-cyan-100 transition-all hover:border-cyan-200/60 hover:bg-cyan-400/25"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali ke Daftar Topik
        </button>
      </main>
    </div>
  );
};

export default SdBukuAnimasiPage;
