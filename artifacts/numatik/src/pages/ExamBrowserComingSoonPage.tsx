import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  CloudLightning,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  TimerReset,
} from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { useTheme } from "@/contexts/ThemeContext";

const protections = [
  {
    icon: ShieldCheck,
    title: "Fortress Anti-Cheat System",
    description:
      "Menutup rapat celah aplikasi pihak ketiga, layar ganda, dan pintasan rahasia.",
    accent: "cyan",
  },
  {
    icon: CloudLightning,
    title: "Zero-Lag Stability",
    description:
      "Koneksi dan pengerjaan tetap responsif bahkan di tengah lalu lintas ujian yang padat.",
    accent: "violet",
  },
  {
    icon: TimerReset,
    title: "Smart Auto-Save Guard",
    description:
      "Jawaban Anda terkunci aman secara real-time setiap milidetik.",
    accent: "amber",
  },
];

const ExamBrowserComingSoonPage = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <div className="relative min-h-screen overflow-x-hidden gradient-space">
      <Starfield />
      <PageNavigation prevPath="/menu" />

      <main className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-28 pt-24 sm:px-8 sm:pt-28">
        <section className="relative overflow-hidden rounded-[2rem] border border-cyan-400/25 bg-card/75 p-6 shadow-[0_0_60px_rgba(34,211,238,0.12)] backdrop-blur-xl sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-36 -left-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200">
                <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
                High-Security Mode
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                EXAMBROWSER NUMATIK
              </p>
              <h1 className="max-w-xl font-display text-3xl font-black leading-tight text-foreground sm:text-5xl">
                Sesuatu yang besar sedang disiapkan!
                <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
                  Ruang ujian tanpa celah.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                Mode ujian terproteksi penuh dan anti-kecurangan untuk
                stabilitas maksimal. Kami sedang meracik standar baru
                pengalaman pengerjaan soal Numatik.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-bold text-amber-200">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Segera Hadir
                </span>
                <span className="text-xs text-muted-foreground">
                  Fitur rahasia dalam racikan
                </span>
              </div>
            </div>

            <div className="relative mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center sm:max-w-[330px]">
              <div className="absolute inset-0 rounded-full border border-cyan-300/15" />
              <div className="absolute inset-8 rounded-full border border-dashed border-violet-300/20 motion-safe:animate-[spin_18s_linear_infinite]" />
              <div className="absolute inset-16 rounded-full bg-cyan-400/10 blur-2xl" />
              <div className="relative flex h-36 w-36 items-center justify-center rounded-[2rem] border border-cyan-200/40 bg-slate-950/70 shadow-[0_0_45px_rgba(34,211,238,0.25)] sm:h-44 sm:w-44">
                <LockKeyhole className="h-16 w-16 text-cyan-200 sm:h-20 sm:w-20" strokeWidth={1.4} aria-hidden="true" />
                <span className="absolute -bottom-3 rounded-full border border-cyan-200/25 bg-slate-950 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Secure by design
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                Mengapa layak ditunggu?
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
                Benteng digital untuk ujian yang jujur
              </h2>
            </div>
            <ShieldCheck className="hidden h-9 w-9 text-cyan-300/70 sm:block" aria-hidden="true" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {protections.map(({ icon: Icon, title, description, accent }) => (
              <article
                key={title}
                className={`group rounded-2xl border p-5 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 ${
                  accent === "cyan"
                    ? "border-cyan-300/20 bg-cyan-300/[0.06]"
                    : accent === "violet"
                      ? "border-violet-300/20 bg-violet-300/[0.06]"
                      : "border-amber-300/20 bg-amber-300/[0.06]"
                }`}
              >
                <Icon
                  className={`mb-4 h-7 w-7 ${
                    accent === "cyan"
                      ? "text-cyan-300"
                      : accent === "violet"
                        ? "text-violet-300"
                        : "text-amber-300"
                  } transition-transform duration-300 group-hover:scale-110`}
                  aria-hidden="true"
                />
                <h3 className="font-display text-sm font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-card/60 p-6 text-center backdrop-blur-md sm:p-8">
          <EyeOff className="mx-auto mb-4 h-7 w-7 text-cyan-300" aria-hidden="true" />
          <p className="mx-auto max-w-2xl text-base font-semibold leading-7 text-foreground sm:text-lg">
            “Ujian jujur, hasil jujur, masa depan cerah.”
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Tim insinyur kami sedang melakukan sentuhan akhir. Bersiaplah
            merasakan standar baru ujian digital!
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                playPopSound();
                navigate("/menu");
              }}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 text-sm font-bold text-white shadow-[0_0_22px_rgba(34,211,238,0.24)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Kembali ke Menu
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-5 py-3 text-xs font-semibold ${
              isDark ? "border-white/10 bg-white/5 text-white/60" : "border-border bg-background/40 text-muted-foreground"
            }`}>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              Sedang dalam tahap pengembangan
            </span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ExamBrowserComingSoonPage;