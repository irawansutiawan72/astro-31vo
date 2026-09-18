import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Brain,
  BookOpen,
  ClipboardList,
  Medal,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

type SmaFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  glow: string;
};

const FEATURES: Record<string, SmaFeature> = {
  "buku-animasi": {
    title: "BUKU ANIMASI SMA",
    description: "Materi matematika SMA yang visual, interaktif, dan mudah dipahami sedang disiapkan.",
    icon: BookOpen,
    accent: "text-cyan-300",
    glow: "bg-cyan-400/15",
  },
  "tugas-latihan-mandiri": {
    title: "TUGAS-LATIHAN MANDIRI SMA",
    description: "Kumpulan latihan bertahap untuk membantu kamu belajar mandiri sedang diracik.",
    icon: ClipboardList,
    accent: "text-violet-300",
    glow: "bg-violet-400/15",
  },
  olimpiade: {
    title: "OLIMPIADE MATEMATIKA SMA",
    description: "Tantangan olimpiade dan pembahasan untuk mengasah penalaran tingkat lanjut sedang disiapkan.",
    icon: Medal,
    accent: "text-amber-300",
    glow: "bg-amber-400/15",
  },
  "tes-kemampuan-akademik": {
    title: "TES KEMAMPUAN AKADEMIK SMA",
    description: "Paket tes kemampuan akademik khusus SMA sedang disusun untukmu.",
    icon: Brain,
    accent: "text-emerald-300",
    glow: "bg-emerald-400/15",
  },
};

const SmaComingSoonPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const slug = pathname.split("/").pop() ?? "";
  const feature = FEATURES[slug] ?? FEATURES["buku-animasi"];
  const Icon = feature.icon;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden gradient-space">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru/sma" />

      <div className="relative z-10 w-full max-w-2xl px-6 py-16 text-center">
        <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-[2rem] border border-cyan-300/25 bg-card/70 shadow-[0_0_45px_rgba(34,211,238,0.14)] backdrop-blur-md">
          <div className={`absolute inset-4 rounded-3xl blur-2xl ${feature.glow}`} />
          <div className={`relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 ${feature.accent}`}>
            <Icon className="h-11 w-11" strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Ruang Untuk Guru · SMA
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
          {feature.title}
        </p>
        <h1 className="font-display text-3xl font-black leading-tight text-foreground sm:text-5xl">
          Sesuatu yang hebat sedang diracik!
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          {feature.description} Tunggu kehadirannya di Numatik.
        </p>

        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-yellow-500/20 bg-card/60 p-6 text-left shadow-[0_0_30px_rgba(234,179,8,0.08)] backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-body text-xs text-muted-foreground">Status Pengembangan</span>
            <span className="font-mono text-xs text-yellow-400">SEGERA HADIR</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-300 shadow-[0_0_12px_rgba(234,179,8,0.6)]" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            playPopSound();
            navigate("/ruang-untuk-guru/sma");
          }}
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-500/15 px-6 py-3 font-display text-sm font-bold text-cyan-100 transition-all hover:border-cyan-200/60 hover:bg-cyan-400/25"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke SMA
        </button>
      </div>
    </div>
  );
};

export default SmaComingSoonPage;