import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, BookOpen, Gamepad2, GraduationCap, Sparkles } from "lucide-react";
import Starfield from "@/components/Starfield";
import Snowfall from "@/components/Snowfall";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { useTheme } from "@/contexts/ThemeContext";

const classes = [
  {
    labelKey: "gameArena.kelas7Label",
    descriptionKey: "gameArena.kelas7Desc",
    path: "/math-game-arena/kelas-7",
    accent: "text-sky-400",
  },
  {
    labelKey: "gameArena.kelas8Label",
    descriptionKey: "gameArena.kelas8Desc",
    path: "/math-game-arena/kelas-8",
    accent: "text-cyan-400",
  },
  {
    labelKey: "gameArena.kelas9Label",
    descriptionKey: "gameArena.kelas9Desc",
    path: "/math-game-arena/kelas-9",
    accent: "text-violet-400",
  },
];

const MathGameArenaPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const open = (path: string) => {
    playPopSound();
    navigate(path);
  };

  return (
    <div className={`relative min-h-screen overflow-hidden ${isLight ? "gradient-snow" : "gradient-space"}`}>
      {isLight ? <Snowfall /> : <Starfield />}
      <PageNavigation prevPath="/menu" />

      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 py-12 pb-24">
        <header className="mb-10 text-center">
          <Gamepad2 className="mx-auto mb-4 h-12 w-12 text-accent" />
          <p className="mb-2 font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
            SMP
          </p>
          <h1 className="mb-3 font-display text-2xl font-bold text-primary text-glow-cyan md:text-4xl">
            {t("gameArena.smpTitle")}
          </h1>
          <p className="mx-auto max-w-xl font-body text-sm text-white/60">
            {t("gameArena.subtitle")}
          </p>
        </header>

        <section aria-label={t("gameArena.subtitle")} className="grid gap-4 md:grid-cols-3">
          {classes.map((grade, index) => (
            <button
              key={grade.path}
              type="button"
              onClick={() => open(grade.path)}
              className="group rounded-2xl border border-border bg-card/80 p-6 text-left shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-cyan-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent animate-slide-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="mb-6 flex items-start justify-between">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ${grade.accent}`}>
                  <BookOpen className="h-6 w-6" />
                </span>
                <ArrowRight className="h-5 w-5 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </div>
              <h2 className="mb-2 font-display text-lg font-bold text-white">
                {t(grade.labelKey)}
              </h2>
              <p className="mb-5 min-h-10 font-body text-sm text-white/55">
                {t(grade.descriptionKey)}
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                {t("gameArena.playBtn")}
                <span aria-hidden="true">→</span>
              </span>
            </button>
          ))}
        </section>

        <button
          type="button"
          onClick={() => open("/math-game-arena/umum")}
          className="mt-5 flex w-full items-center gap-4 rounded-2xl border border-border bg-card/60 px-5 py-4 text-left backdrop-blur transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="flex-1">
            <span className="block font-display font-bold text-white">{t("gameArena.umumTitle")}</span>
            <span className="mt-1 block font-body text-xs text-white/55">{t("gameArena.umumSubtitle")}</span>
          </span>
          <ArrowRight className="h-5 w-5 text-white/40" />
        </button>

        <section className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 px-5 py-5 md:flex md:items-center md:justify-between md:gap-6">
          <div className="flex items-start gap-3">
            <GraduationCap className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
            <div>
              <h2 className="font-display font-bold text-white">{t("gameArena.smaPortalTitle")}</h2>
              <p className="mt-1 font-body text-sm text-white/55">{t("gameArena.smaPortalDesc")}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => open("/math-game-arena/sma")}
            className="ml-9 mt-4 inline-flex items-center gap-2 rounded-lg border border-accent/40 px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:ml-0 md:mt-0"
          >
            {t("gameArena.smaPortalTitle")}
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>
      </main>
    </div>
  );
};

export default MathGameArenaPage;
