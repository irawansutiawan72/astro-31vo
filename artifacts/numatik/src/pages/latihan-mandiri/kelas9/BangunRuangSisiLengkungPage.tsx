import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { Layers, Triangle, Circle, TrendingUp, Package, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const subtopics = [
  {
    label: "TABUNG",
    path: "/latihan-mandiri/kelas-9/bangun-ruang-sisi-lengkung/tabung",
    soal: 15,
    icon: Layers,
    emoji: "🧴",
    gradient: "from-cyan-900/40 to-sky-900/30",
    lightGradient: "from-cyan-50 via-white to-sky-50",
    border: "border-cyan-500/30",
    lightBorder: "border-cyan-300",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40",
    lightBadge: "bg-cyan-100 text-cyan-700 border-cyan-300",
    iconBg: "bg-cyan-500/20",
    lightIconBg: "bg-cyan-100",
    iconColor: "text-cyan-400",
    lightIconColor: "text-cyan-600",
    leftBar: "from-cyan-400 to-sky-500",
    desc: "Luas selimut, luas permukaan total, volume tabung, soal cerita",
  },
  {
    label: "KERUCUT",
    path: "/latihan-mandiri/kelas-9/bangun-ruang-sisi-lengkung/kerucut",
    soal: 15,
    icon: Triangle,
    emoji: "🔺",
    gradient: "from-orange-900/40 to-amber-900/30",
    lightGradient: "from-orange-50 via-white to-amber-50",
    border: "border-orange-500/30",
    lightBorder: "border-orange-300",
    badge: "bg-orange-500/20 text-orange-300 border-orange-400/40",
    lightBadge: "bg-orange-100 text-orange-700 border-orange-300",
    iconBg: "bg-orange-500/20",
    lightIconBg: "bg-orange-100",
    iconColor: "text-orange-400",
    lightIconColor: "text-orange-600",
    leftBar: "from-orange-400 to-amber-500",
    desc: "Garis pelukis, luas selimut, luas permukaan, volume kerucut",
  },
  {
    label: "BOLA",
    path: "/latihan-mandiri/kelas-9/bangun-ruang-sisi-lengkung/bola",
    soal: 15,
    icon: Circle,
    emoji: "🔮",
    gradient: "from-indigo-900/40 to-violet-900/30",
    lightGradient: "from-indigo-50 via-white to-violet-50",
    border: "border-indigo-500/30",
    lightBorder: "border-indigo-300",
    badge: "bg-indigo-500/20 text-indigo-300 border-indigo-400/40",
    lightBadge: "bg-indigo-100 text-indigo-700 border-indigo-300",
    iconBg: "bg-indigo-500/20",
    lightIconBg: "bg-indigo-100",
    iconColor: "text-indigo-400",
    lightIconColor: "text-indigo-600",
    leftBar: "from-indigo-400 to-violet-500",
    desc: "Luas permukaan dan volume bola, setengah bola, soal terapan",
  },
  {
    label: "PERUBAHAN LUAS PERMUKAAN DAN VOLUME BANGUN RUANG SISI LENGKUNG",
    path: "/latihan-mandiri/kelas-9/bangun-ruang-sisi-lengkung/perubahan-volume",
    soal: 15,
    icon: TrendingUp,
    emoji: "🔄",
    gradient: "from-purple-900/40 to-fuchsia-900/30",
    lightGradient: "from-purple-50 via-white to-fuchsia-50",
    border: "border-purple-500/30",
    lightBorder: "border-purple-300",
    badge: "bg-purple-500/20 text-purple-300 border-purple-400/40",
    lightBadge: "bg-purple-100 text-purple-700 border-purple-300",
    iconBg: "bg-purple-500/20",
    lightIconBg: "bg-purple-100",
    iconColor: "text-purple-400",
    lightIconColor: "text-purple-600",
    leftBar: "from-purple-400 to-fuchsia-500",
    desc: "Perubahan luas & volume akibat perubahan jari-jari dan tinggi",
  },
  {
    label: "BANGUN RUANG SISI LENGKUNG GABUNGAN",
    path: "/latihan-mandiri/kelas-9/bangun-ruang-sisi-lengkung/gabungan",
    soal: 15,
    icon: Package,
    emoji: "🧩",
    gradient: "from-emerald-900/40 to-teal-900/30",
    lightGradient: "from-emerald-50 via-white to-teal-50",
    border: "border-emerald-500/30",
    lightBorder: "border-emerald-300",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
    lightBadge: "bg-emerald-100 text-emerald-700 border-emerald-300",
    iconBg: "bg-emerald-500/20",
    lightIconBg: "bg-emerald-100",
    iconColor: "text-emerald-400",
    lightIconColor: "text-emerald-600",
    leftBar: "from-emerald-400 to-teal-500",
    desc: "Volume & luas permukaan gabungan tabung, kerucut, dan bola",
  },
];

const BangunRuangSisiLengkungPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDark } = useTheme();

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center mb-4">
            <span className="text-3xl">🌀</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-primary text-glow-cyan mb-1 text-center">
            BANGUN RUANG SISI LENGKUNG
          </h1>
          <p className={`${isDark ? "text-white/50" : "text-slate-600"} text-xs text-center font-body mb-3`}>Kelas 9 · {t('practice.breadcrumb')}</p>
          <div className={`flex items-center gap-3 rounded-xl px-5 py-2 ${isDark ? "bg-white/5 border border-white/10" : "bg-white/80 border border-slate-200 shadow-sm"}`}>
            <span className="text-yellow-400 text-sm">⭐</span>
            <span className={`${isDark ? "text-white/70" : "text-slate-700"} text-xs font-body`}>75 {t('practice.suffixSoalTotal')} · Diagram Visual & Soal Terapan</span>
            <span className="text-yellow-400 text-sm">⭐</span>
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
                <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? s.gradient : s.lightGradient} backdrop-blur`} />
                <div className={`absolute inset-0 border ${isDark ? s.border : s.lightBorder} rounded-2xl group-hover:border-opacity-60 transition-colors`} />
                <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${s.leftBar} rounded-l-2xl`} />
                <div className="relative px-5 py-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${isDark ? s.iconBg : s.lightIconBg} border ${isDark ? s.border : s.lightBorder} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-6 h-6 ${isDark ? s.iconColor : s.lightIconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`font-display text-sm font-bold ${isDark ? "text-white" : "text-slate-800"}`}>{s.label}</span>
                    </div>
                    <p className={`${isDark ? "text-white/40" : "text-slate-600"} text-xs font-body`}>{s.desc}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${isDark ? s.badge : s.lightBadge}`}>
                      {s.soal} {t('practice.suffixSoal')}
                    </span>
                    <ChevronRight className={`w-4 h-4 ${isDark ? s.iconColor : s.lightIconColor} group-hover:translate-x-1 transition-transform`} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className={`mt-6 rounded-xl p-4 ${isDark ? "bg-white/5 border border-white/10" : "bg-white/70 border border-slate-200 shadow-sm"}`}>
          <p className={`${isDark ? "text-white/40" : "text-slate-600"} text-[10px] font-bold uppercase tracking-wider mb-2`}>📐 Fitur Visual</p>
          <p className={`${isDark ? "text-white/60" : "text-slate-600"} text-xs font-body leading-relaxed`}>
            Setiap sub-topik dilengkapi dengan diagram SVG ilustratif yang menampilkan bangun secara visual. Soal-soal dipilih dari kisi-kisi UN, ANBK, dan TKA untuk mempersiapkan siswa menghadapi ujian resmi.
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/latihan-mandiri/kelas-9"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            {t('practice.backToGrade9')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BangunRuangSisiLengkungPage;
