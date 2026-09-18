import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, ClipboardList, GraduationCap, Sparkles } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { getSmaTopic } from "@/data/smaTopics";

const BASE_PATH = "/ruang-untuk-guru/sma";

const SmaSubtopicComingSoonPage = () => {
  const navigate = useNavigate();
  const { mode, topicSlug, subtopicSlug } = useParams<{ mode: string; topicSlug: string; subtopicSlug: string }>();
  const topic = getSmaTopic(topicSlug);
  const subtopic = topic?.subtopics.find((item) => item.slug === subtopicSlug);
  const isPractice = mode === "tugas-latihan-mandiri";
  const Icon = isPractice ? ClipboardList : BookOpen;

  if (!topic || !subtopic) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-space text-white">
        <Starfield />
        <div className="relative z-10 px-6 text-center">
          <h1 className="font-display text-2xl font-bold text-primary">Subtopik tidak ditemukan</h1>
          <button
            type="button"
            onClick={() => { playPopSound(); navigate(`${BASE_PATH}/${isPractice ? "tugas-latihan-mandiri" : "buku-animasi"}`); }}
            className="mt-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke daftar topik
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden gradient-space">
      <Starfield />
      <PageNavigation prevPath={`${BASE_PATH}/${mode}/${topic.slug}`} />
      <main className="relative z-10 w-full max-w-2xl px-6 py-16 text-center">
        <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-[2rem] border border-cyan-300/25 bg-card/70 shadow-[0_0_45px_rgba(34,211,238,0.14)] backdrop-blur-md">
          <div className="absolute inset-4 rounded-3xl bg-cyan-400/15 blur-2xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary">
            <Icon className="h-11 w-11" strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
          <GraduationCap className="h-3.5 w-3.5" />
          SMA · {isPractice ? "Tugas-Latihan Mandiri" : "Buku Animasi"}
        </div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">{topic.title}</p>
        <h1 className="font-display text-2xl font-black leading-tight text-foreground sm:text-4xl">{subtopic.title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          {isPractice ? "Latihan untuk subtopik ini" : "Materi animasi untuk subtopik ini"} sedang disiapkan.
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
          onClick={() => { playPopSound(); navigate(`${BASE_PATH}/${mode}/${topic.slug}`); }}
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-500/15 px-6 py-3 font-display text-sm font-bold text-cyan-100 transition-all hover:border-cyan-200/60 hover:bg-cyan-400/25"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Subtopik
        </button>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40">
          <Sparkles className="h-3.5 w-3.5" />
          Konten SMA akan ditambahkan bertahap.
        </div>
      </main>
    </div>
  );
};

export default SmaSubtopicComingSoonPage;