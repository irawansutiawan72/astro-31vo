import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Brain, Calculator, ChevronRight, Rocket } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const BASE_PATH = "/intensif-utbk";

const topics = [
  {
    title: "Penalaran Umum",
    slug: "penalaran-umum",
    description: "Memahami informasi, menganalisis argumen, dan menarik kesimpulan.",
    icon: Brain,
  },
  {
    title: "Pengetahuan Kuantitatif",
    slug: "pengetahuan-kuantitatif",
    description: "Mengolah konsep bilangan, aljabar, geometri, dan data.",
    icon: Calculator,
  },
  {
    title: "Penalaran Matematika",
    slug: "penalaran-matematika",
    description: "Menyelesaikan masalah matematika secara runtut dan logis.",
    icon: BookOpen,
  },
];

const IntensifUtbkPage = () => {
  const navigate = useNavigate();
  const { topicSlug } = useParams<{ topicSlug?: string }>();
  const selectedTopic = topics.find((topic) => topic.slug === topicSlug);

  const handleNavigate = (path: string) => {
    playPopSound();
    navigate(path);
  };

  return (
    <div className="relative min-h-screen overflow-hidden gradient-space text-white">
      <Starfield />
      <PageNavigation prevPath={selectedTopic ? BASE_PATH : "/ruang-untuk-guru/sma"} />

      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-14 pt-20">
        <header className="mb-10 text-center animate-slide-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-100">
            <Rocket className="h-4 w-4" aria-hidden="true" />
            Persiapan Ujian
          </div>
          <h1 className="font-display text-2xl font-bold leading-tight text-primary text-glow-cyan md:text-3xl">
            {selectedTopic ? selectedTopic.title : "Intensif UTBK"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-white/70 md:text-base">
            {selectedTopic
              ? `Materi ${selectedTopic.title} sedang disiapkan.`
              : "Pilih bidang yang ingin kamu pelajari."}
          </p>
        </header>

        {selectedTopic ? (
          <section className="mx-auto max-w-xl rounded-2xl border border-cyan-200/20 bg-card/80 p-6 text-center backdrop-blur sm:p-8" data-testid="utbk-topic-placeholder">
            <selectedTopic.icon className="mx-auto mb-4 h-12 w-12 text-primary" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold text-foreground">{selectedTopic.title}</h2>
            <p className="mt-2 font-body text-sm text-muted-foreground">Materi dan latihan untuk topik ini akan ditambahkan.</p>
            <button
              type="button"
              onClick={() => handleNavigate(BASE_PATH)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 font-body text-sm text-primary transition-colors hover:bg-primary/20"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Kembali ke menu Intensif UTBK
            </button>
          </section>
        ) : topicSlug ? (
          <section className="mx-auto max-w-xl rounded-2xl border border-amber-200/20 bg-card/80 p-6 text-center backdrop-blur sm:p-8" data-testid="utbk-topic-not-found">
            <h2 className="font-display text-lg font-bold text-foreground">Topik tidak ditemukan</h2>
            <button
              type="button"
              onClick={() => handleNavigate(BASE_PATH)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 font-body text-sm text-primary transition-colors hover:bg-primary/20"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Kembali ke menu Intensif UTBK
            </button>
          </section>
        ) : (
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="intensif-utbk-topics">
            {topics.map((topic, index) => (
              <button
                key={topic.slug}
                type="button"
                onClick={() => handleNavigate(`${BASE_PATH}/${topic.slug}`)}
                className="group flex min-h-48 flex-col rounded-2xl border border-border bg-card/80 p-5 text-left backdrop-blur transition-all duration-300 hover:border-primary/60 hover:box-glow-cyan animate-slide-up"
                style={{ animationDelay: `${index * 0.08}s` }}
                data-testid={`utbk-topic-${topic.slug}`}
              >
                <topic.icon className="mb-4 h-9 w-9 text-primary transition-transform group-hover:scale-110" aria-hidden="true" />
                <h2 className="font-display text-base font-bold text-foreground">{topic.title}</h2>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-muted-foreground">{topic.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-body text-xs font-semibold text-primary">
                  BUKA <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        )}

        {!selectedTopic && !topicSlug && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => handleNavigate("/ruang-untuk-guru/sma")}
              className="inline-flex items-center gap-2 font-body text-sm text-white/60 transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Kembali ke Menu SMA
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default IntensifUtbkPage;