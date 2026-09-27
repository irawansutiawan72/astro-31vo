import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { getSmaTopic, SMA_TOPICS } from "@/data/smaTopics";

const BASE_PATH = "/math-game-arena";

const MathGameArenaSmaMenuPage = () => {
  const navigate = useNavigate();
  const { topicSlug } = useParams<{ topicSlug?: string }>();
  const selectedTopic = getSmaTopic(topicSlug);
  const items = selectedTopic?.subtopics ?? SMA_TOPICS;
  const heading = selectedTopic?.title ?? "MATH GAME ARENA SMA";
  const subtitle = selectedTopic
    ? `Pilih subtopik game ${selectedTopic.title} yang ingin dibuka.`
    : "Pilih topik untuk melihat subtopik game matematika SMA.";

  const handleClick = (path: string) => {
    playPopSound();
    navigate(path);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden gradient-space">
      <Starfield />
      <PageNavigation prevPath={selectedTopic ? BASE_PATH : "/ruang-untuk-guru/sma"} />
      <main className="relative z-10 max-w-3xl w-full px-4 py-10">
        <Gamepad2 className="w-12 h-12 text-accent mx-auto mb-4" />
        <h1 className="font-display text-2xl md:text-3xl font-bold text-primary text-glow-cyan mb-2 text-center">
          {heading}
        </h1>
        <p className="text-white/60 text-sm text-center mb-8 font-body">{subtitle}</p>

        <div className="flex flex-col gap-3 animate-slide-up">
          {items.map((item, i) => {
            const path = selectedTopic
              ? `${BASE_PATH}/sma/${selectedTopic.slug}/${item.slug}`
              : `${BASE_PATH}/sma/${item.slug}`;

            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => handleClick(path)}
                className="group flex items-center gap-4 bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4
                  hover:border-accent/60 transition-all duration-300 cursor-pointer text-left animate-slide-up"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <Gamepad2 className="w-5 h-5 shrink-0 text-accent group-hover:scale-110 transition-transform" />
                <span className="font-body text-sm text-white">{item.title}</span>
                <span className="ml-auto text-xs text-accent font-display">
                  {selectedTopic ? "SEGERA HADIR" : "PILIH TOPIK"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => handleClick(selectedTopic ? BASE_PATH : "/ruang-untuk-guru/sma")}
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

export default MathGameArenaSmaMenuPage;