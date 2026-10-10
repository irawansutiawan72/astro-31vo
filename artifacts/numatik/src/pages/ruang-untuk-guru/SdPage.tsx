import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Bot,
  Calculator,
  ClipboardList,
  Gamepad2,
  GraduationCap,
  Heart,
  Info,
  Medal,
  School,
  Settings,
  User,
} from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const sdMenuItems = [
  {
    label: "PETUNJUK PENGGUNAAN",
    icon: Info,
    path: "/petunjuk",
    desc: "Panduan singkat menggunakan Numatik",
  },
  {
    label: "BUKU ANIMASI MATEMATIKA SD",
    icon: BookOpen,
    path: "/ruang-untuk-guru/sd/buku-animasi",
    desc: "Belajar konsep matematika SD melalui visual yang menyenangkan",
  },
  {
    label: "TUGAS-LATIHAN MANDIRI",
    icon: ClipboardList,
    path: "/ruang-untuk-guru/sd/tugas-latihan-mandiri",
    desc: "Latihan bertahap untuk menguatkan pemahaman",
  },
  {
    label: "MATH GAME ARENA SD",
    icon: Gamepad2,
    path: "/ruang-untuk-guru/sd/math-game-arena",
    desc: "Asah kemampuan berhitung lewat permainan matematika",
  },
  {
    label: "TES KEMAMPUAN AKADEMIK SD",
    icon: Brain,
    path: "/ruang-untuk-guru/sd/tes-kemampuan-akademik",
    desc: "Berlatih menghadapi soal kemampuan akademik SD",
  },
  {
    label: "OLIMPIADE MATEMATIKA SD",
    icon: Medal,
    path: "/ruang-untuk-guru/sd/olimpiade",
    desc: "Tantangan untuk melatih nalar dan strategi matematika",
  },
  {
    label: "NUMATIK ARTIFICIAL INTELLIGENCE",
    icon: Bot,
    path: "/chat-ai",
    desc: "Bertanya dan belajar bersama AI matematika",
  },
  {
    label: "KALKULATOR SCIENTIFIC",
    icon: Calculator,
    path: "/kalkulator-scientific",
    desc: "Gunakan kalkulator scientific Numatik",
  },
  {
    label: "PENGATURAN",
    icon: Settings,
    path: "/pengaturan",
    desc: "Sesuaikan tampilan dan preferensi aplikasi",
  },
  {
    label: "DONASI",
    icon: Heart,
    path: "/donasi",
    desc: "Dukung pengembangan Numatik",
  },
  {
    label: "BIOGRAFI",
    icon: User,
    path: "/biografi",
    desc: "Kenali pembuat aplikasi Numatik",
  },
  {
    label: "TENTANG APLIKASI",
    icon: Info,
    path: "/tentang-aplikasi",
    desc: "Informasi tentang aplikasi Numatik",
  },
];

const sdUpcomingFeatures: Record<string, { title: string; description: string }> = {
  "buku-animasi": {
    title: "BUKU ANIMASI MATEMATIKA SD",
    description: "Buku animasi matematika untuk jenjang SD sedang disiapkan.",
  },
  "tugas-latihan-mandiri": {
    title: "TUGAS-LATIHAN MANDIRI SD",
    description: "Kumpulan latihan mandiri yang sesuai dengan materi SD sedang disiapkan.",
  },
  "math-game-arena": {
    title: "MATH GAME ARENA SD",
    description: "Permainan matematika yang dirancang untuk siswa SD sedang disiapkan.",
  },
  "tes-kemampuan-akademik": {
    title: "TES KEMAMPUAN AKADEMIK SD",
    description: "Paket latihan kemampuan akademik untuk siswa SD sedang disusun.",
  },
  olimpiade: {
    title: "OLIMPIADE MATEMATIKA SD",
    description: "Tantangan dan latihan olimpiade matematika SD sedang disiapkan.",
  },
};

const SdPage = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    playPopSound();
    navigate(path);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden gradient-space text-white">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru" />

      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-14 pt-20">
        <div className="mb-10 text-center animate-slide-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-100">
            <GraduationCap className="h-4 w-4" />
            Ruang Untuk Guru
          </div>
          <h1 className="font-display text-2xl font-bold leading-tight text-primary text-glow-cyan md:text-3xl">
            SD
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-white/70 md:text-base">
            Pilih layanan belajar dan persiapan matematika untuk jenjang Sekolah Dasar.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
          {sdMenuItems.map((item, index) => (
            <button
              key={item.path}
              type="button"
              onClick={() => handleClick(item.path)}
              className="group relative min-h-36 cursor-pointer rounded-xl border border-border bg-card/80 p-4 text-left backdrop-blur transition-all duration-300 hover:border-primary/60 hover:box-glow-cyan sm:p-5"
              style={{ animationDelay: `${index * 0.04}s` }}
            >
              <item.icon className="mb-3 h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <h2 className="mb-1 font-display text-[11px] font-bold leading-snug text-foreground sm:text-sm">
                {item.label}
              </h2>
              <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
              {sdUpcomingFeatures[item.path.split("/").pop() ?? ""] && (
                <span className="mt-3 inline-flex rounded-full border border-amber-300/25 bg-amber-400/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-amber-200">
                  SEGERA HADIR
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => handleClick("/ruang-untuk-guru")}
            className="inline-flex items-center gap-2 font-body text-sm text-white/60 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Ruang Untuk Guru
          </button>
        </div>
      </main>
    </div>
  );
};

export const SdComingSoonPage = () => {
  const navigate = useNavigate();
  const { sectionSlug } = useParams<{ sectionSlug: string }>();
  const feature = sectionSlug ? sdUpcomingFeatures[sectionSlug] : undefined;
  const title = feature?.title ?? "MENU SD TIDAK DITEMUKAN";
  const description = feature?.description ?? "Menu yang dibuka belum tersedia.";

  const goToSdMenu = () => {
    playPopSound();
    navigate("/ruang-untuk-guru/sd");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden gradient-space">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru/sd" />

      <main className="relative z-10 w-full max-w-2xl px-6 py-16 text-center">
        <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-[2rem] border border-cyan-300/25 bg-card/70 shadow-[0_0_45px_rgba(34,211,238,0.14)] backdrop-blur-md">
          <div className="absolute inset-4 rounded-3xl bg-cyan-400/15 blur-2xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-300">
            <School className="h-11 w-11" strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
          <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
          Ruang Untuk Guru · SD
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
          {title}
        </p>
        <h1 className="font-display text-3xl font-black leading-tight text-foreground sm:text-5xl">
          Sedang kami siapkan!
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          {description} Kami ingin menyajikannya dengan cara yang seru dan mudah dipahami.
        </p>

        {feature && (
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-amber-400/20 bg-card/60 p-6 text-left shadow-[0_0_30px_rgba(234,179,8,0.08)] backdrop-blur-md">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="font-body text-xs text-muted-foreground">Status pengembangan</span>
              <span className="font-mono text-xs text-amber-300">SEGERA HADIR</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-300" />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={goToSdMenu}
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-500/15 px-6 py-3 font-display text-sm font-bold text-cyan-100 transition-all hover:border-cyan-200/60 hover:bg-cyan-400/25"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Menu SD
        </button>
      </main>
    </div>
  );
};

export default SdPage;
