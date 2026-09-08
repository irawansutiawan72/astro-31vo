import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { ChevronRight, BarChart2, PieChart, Target, BoxSelect, TrendingDown, BookOpen } from "lucide-react";

const subtopics = [
  {
    label: "PENGANTAR STATISTIKA, PENGUMPULAN DATA DAN PENYAJIAN DATA",
    path: "/latihan-mandiri/kelas-9/statistika/pengantar",
    soal: 10,
    icon: BookOpen,
    desc: "Populasi, sampel, jenis data, teknik pengumpulan, tabel distribusi, diagram batang, garis, lingkaran",
    gradient: "from-cyan-900/40 to-teal-900/30",
    border: "border-cyan-500/30",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
    leftBar: "from-cyan-400 to-teal-500",
  },
  {
    label: "UKURAN PEMUSATAN DATA (RATA-RATA DAN RATA-RATA GABUNGAN)",
    path: "/latihan-mandiri/kelas-9/statistika/rata-rata",
    soal: 18,
    icon: PieChart,
    desc: "Mean tunggal, berbobot, berkelompok, rata-rata gabungan",
    gradient: "from-blue-900/40 to-indigo-900/30",
    border: "border-blue-500/30",
    badge: "bg-blue-500/20 text-blue-300 border-blue-400/40",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    leftBar: "from-blue-400 to-indigo-500",
  },
  {
    label: "UKURAN PEMUSATAN DATA (MEDIAN DAN MODUS)",
    path: "/latihan-mandiri/kelas-9/statistika/median-modus",
    soal: 10,
    icon: Target,
    desc: "Median dan modus data tunggal dan berkelompok, interpretasi",
    gradient: "from-violet-900/40 to-purple-900/30",
    border: "border-violet-500/30",
    badge: "bg-violet-500/20 text-violet-300 border-violet-400/40",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
    leftBar: "from-violet-400 to-purple-500",
  },
  {
    label: "UKURAN LETAK DATA (KUARTIL)",
    path: "/latihan-mandiri/kelas-9/statistika/kuartil",
    soal: 12,
    icon: BoxSelect,
    desc: "Q₁, Q₂, Q₃, IQR, box plot, persentil, desil, deteksi pencilan",
    gradient: "from-emerald-900/40 to-green-900/30",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    leftBar: "from-emerald-400 to-green-500",
  },
  {
    label: "UKURAN PENYEBARAN DATA (JANGKAUAN, JANGKAUAN INTERKUARTIL, SIMPANGAN KUARTIL)",
    path: "/latihan-mandiri/kelas-9/statistika/penyebaran-data",
    soal: 22,
    icon: TrendingDown,
    desc: "Jangkauan, IQR, SQ, simpangan rata-rata, varians, simpangan baku",
    gradient: "from-orange-900/40 to-red-900/30",
    border: "border-orange-500/30",
    badge: "bg-orange-500/20 text-orange-300 border-orange-400/40",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
    leftBar: "from-orange-400 to-red-500",
  },
];

const StatistikaPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-cyan-500/15 border-2 border-cyan-400/50 flex items-center justify-center mb-4">
            <BarChart2 className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-cyan-300 text-center mb-2"
            style={{ textShadow: '0 0 24px rgba(34,211,238,0.6)' }}>
            STATISTIKA
          </h1>
          <p className="text-white/50 text-xs text-center font-body mb-3">Kelas 9 — Latihan Mandiri</p>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-2">
            <span className="text-white/70 text-xs font-body">5 {t('practice.suffixSubTopik')}</span>
            <span className="text-white/20">·</span>
            <span className="text-cyan-400 text-xs font-bold">79 {t('practice.suffixSoalTotal')}</span>
            <span className="text-white/20">·</span>
            <span className="text-white/50 text-xs">UN / ANBK / TKA</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 animate-slide-up">
          {subtopics.map((s, i) => {
            const Icon = s.icon;
            return (
              <button
                key={s.label}
                onClick={() => { playPopSound(); navigate(s.path); }}
                className="group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.01] animate-slide-up"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} backdrop-blur`} />
                <div className={`absolute inset-0 border ${s.border} rounded-2xl group-hover:border-opacity-60 transition-colors`} />
                <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${s.leftBar} rounded-l-2xl`} />
                <div className="relative px-5 py-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${s.iconBg} border ${s.border} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-6 h-6 ${s.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-display text-sm font-bold text-white">{s.label}</span>
                    </div>
                    <p className="text-white/40 text-xs font-body">{s.desc}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${s.badge}`}>
                      {s.soal} {t('practice.suffixSoal')}
                    </span>
                    <ChevronRight className={`w-4 h-4 ${s.iconColor} group-hover:translate-x-1 transition-transform`} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-white/3 border border-white/8 rounded-xl">
          <p className="text-white/40 text-[10px] text-center font-body leading-relaxed">
            Semua soal dirancang sesuai kisi-kisi <span className="text-cyan-400/80">UN</span> · <span className="text-teal-400/80">ANBK</span> · <span className="text-blue-400/80">TKA</span> dan sering keluar dalam ujian resmi SMP.
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/latihan-mandiri/kelas-9"); }}
            className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors cursor-pointer font-body"
          >
            {t('practice.backToGrade9')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatistikaPage;
