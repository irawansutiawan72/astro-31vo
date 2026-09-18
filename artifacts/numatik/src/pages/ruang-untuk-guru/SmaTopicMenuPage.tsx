import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, ClipboardList, GraduationCap } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { getSmaTopic, SMA_TOPICS, type SmaLearningMode } from "@/data/smaTopics";

const BASE_PATH = "/ruang-untuk-guru/sma";

const modeConfig: Record<SmaLearningMode, {
  title: string;
  subtitle: string;
  actionLabel: string;
  accentClass: string;
  icon: typeof BookOpen;
}> = {
  "buku-animasi": {
    title: "BUKU ANIMASI MATEMATIKA SMA",
    subtitle: "Pilih topik untuk melihat subtopik materi matematika SMA.",
    actionLabel: "PILIH TOPIK",
    accentClass: "text-primary",
    icon: BookOpen,
  },
  "tugas-latihan-mandiri": {
    title: "TUGAS-LATIHAN MANDIRI SMA",
    subtitle: "Pilih topik untuk melihat subtopik latihan matematika SMA.",
    actionLabel: "PILIH TOPIK",
    accentClass: "text-accent",
    icon: ClipboardList,
  },
};

const SmaTopicMenuPage = () => {
  const navigate = useNavigate();
  const { mode: modeParam, topicSlug } = useParams<{ mode: string; topicSlug?: string }>();
  const mode = modeParam === "tugas-latihan-mandiri" ? modeParam : "buku-animasi";
  const config = modeConfig[mode];
  const Icon = config.icon;
  const selectedTopic = getSmaTopic(topicSlug);
  const items = selectedTopic?.subtopics ?? SMA_TOPICS;
  const heading = selectedTopic ? selectedTopic.title : config.title;
  const subtitle = selectedTopic
    ? `Pilih subtopik ${mode === "buku-animasi" ? "materi" : "latihan"} yang ingin dibuka.`
    : config.subtitle;

  const handleClick = (path: string) => {
    playPopSound();
    navigate(path);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden gradient-space">
      <Starfield />
      <PageNavigation prevPath={selectedTopic ? `${BASE_PATH}/${mode}` : BASE_PATH} />
      <main className="relative z-10 max-w-3xl w-full px-4 py-10">
        <Icon className={`w-12 h-12 mx-auto mb-4 ${config.accentClass}`} />
        <h1 className="font-display text-2xl md:text-3xl font-bold text-primary text-glow-cyan mb-2 text-center">
          {heading}
        </h1>
        <p className="text-white/60 text-sm text-center mb-8 font-body">{subtitle}</p>

        <div className="flex flex-col gap-3 animate-slide-up">
          {items.map((item, i) => {
            const path = selectedTopic
              ? `${BASE_PATH}/${mode}/${selectedTopic.slug}/${item.slug}`
              : `${BASE_PATH}/${mode}/${item.slug}`;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => handleClick(path)}
                className="group flex items-center gap-4 bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4
                  hover:border-primary/60 transition-all duration-300 cursor-pointer text-left animate-slide-up"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <Icon className={`w-5 h-5 shrink-0 ${config.accentClass} group-hover:scale-110 transition-transform`} />
                <span className="font-body text-sm text-white">{item.title}</span>
                <span className={`ml-auto text-xs font-display ${config.accentClass}`}>{selectedTopic ? "BUKA" : config.actionLabel}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => handleClick(selectedTopic ? `${BASE_PATH}/${mode}` : BASE_PATH)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            {selectedTopic ? "Kembali ke Daftar Topik" : "Kembali ke Menu SMA"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default SmaTopicMenuPage;