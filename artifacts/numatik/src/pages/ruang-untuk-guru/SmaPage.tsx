import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  ClipboardList,
  GraduationCap,
  Medal,
  Rocket,
} from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const smaMenuItems = [
  {
    label: "BUKU ANIMASI",
    icon: BookOpen,
    path: "/buku-animasi-matematika",
    desc: "Pelajari konsep matematika secara visual dan interaktif",
  },
  {
    label: "TUGAS-LATIHAN MANDIRI",
    icon: ClipboardList,
    path: "/latihan-mandiri",
    desc: "Latihan soal untuk memperkuat pemahaman materi",
  },
  {
    label: "INTENSIF UTBK",
    icon: Rocket,
    path: "/intensif-utbk",
    desc: "Persiapan intensif menghadapi UTBK",
  },
  {
    label: "OLIMPIADE MATEMATIKA SMA",
    icon: Medal,
    path: "/olimpiade",
    desc: "Tantangan matematika untuk mengasah penalaran",
  },
  {
    label: "TES KEMAMPUAN AKADEMIK SMA",
    icon: Brain,
    path: "/tka",
    desc: "Uji kemampuan akademik matematika",
  },
];

const SmaPage = () => {
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
            SMA
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-white/70 md:text-base">
            Pilih layanan pembelajaran dan persiapan matematika untuk jenjang SMA.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
          {smaMenuItems.map((item, index) => (
            <button
              key={item.path}
              type="button"
              onClick={() => handleClick(item.path)}
              className="group relative cursor-pointer rounded-xl border border-border bg-card/80 p-5 text-left backdrop-blur transition-all duration-300 hover:border-primary/60 hover:box-glow-cyan animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <item.icon className="mb-3 h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <h2 className="mb-1 font-display text-[11px] font-bold leading-tight text-foreground sm:text-sm">
                {item.label}
              </h2>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </button>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => {
              playPopSound();
              navigate("/ruang-untuk-guru");
            }}
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

export default SmaPage;