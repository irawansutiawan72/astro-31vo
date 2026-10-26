import { useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { useTheme } from "@/contexts/ThemeContext";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

/* ── Reusable atoms ───────────────────────────────────── */
const SubLabel = ({ letter, color }: { letter: string; color: string }) => (
  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0 ${color}`}>
    {letter}
  </span>
);

const Tag = ({ label, color }: { label: string; color: string }) => (
  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border font-body uppercase tracking-wider ${color}`}>
    {label}
  </span>
);

const AlgExpr = ({ math }: { math: string }) => (
  <span className="inline-block"><InlineMath math={math} /></span>
);

/* ── Soal 1 ── Sederhanakan bentuk aljabar ───────────── */
const SoalSatu = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        {t('practice.aljabar.penjumlahanPengurangan.q1.instruction')}
      </p>
      <div className="space-y-2 pl-1">
        {[
          { l: "a", expr: "8a + 14b - 5a - 9b" },
          { l: "b", expr: "6p^2 - 8p + 11 - 3p^2 + 5p - 4" },
          { l: "c", expr: "3(2x - 4y) + 5(x + 3y)" },
          { l: "d", expr: "4(3m^2 - 2m + 1) - 2(m^2 + 5m - 3)" },
        ].map(({ l, expr }) => (
          <div key={l} className="flex items-center gap-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-lg px-3 py-2">
            <SubLabel letter={l} color="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30" />
            <AlgExpr math={expr} />
            <span className="ml-auto text-white/20 text-xs font-body shrink-0">= …</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Soal 2 ── Keliling bangun dari ekspresi aljabar ─── */
const SoalDua = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        {t('practice.aljabar.penjumlahanPengurangan.q2.instruction')}
      </p>
      <div className="flex flex-wrap gap-8 pl-1 items-end">
        {/* Segitiga sama kaki */}
        <div className="flex flex-col items-center gap-1.5">
          <SubLabel letter="a" color="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30" />
          <svg width="130" height="120" viewBox="0 0 130 120">
            <polygon points="65,15 18,90 112,90"
              fill="#818cf8" fillOpacity={0.08} stroke="#818cf8" strokeWidth={1.5} />
            <text x="32" y="46" textAnchor="middle" dominantBaseline="middle" fill={isDark ? "#c7d2fe" : "#4f46e5"} stroke={isDark ? "#111827" : "#fff"} strokeWidth={3} paintOrder="stroke" strokeLinejoin="round" fontSize={9} fontFamily="monospace" transform="rotate(-58 32 46)">(3x+2) cm</text>
            <text x="98" y="46" textAnchor="middle" dominantBaseline="middle" fill={isDark ? "#c7d2fe" : "#4f46e5"} stroke={isDark ? "#111827" : "#fff"} strokeWidth={3} paintOrder="stroke" strokeLinejoin="round" fontSize={9} fontFamily="monospace" transform="rotate(58 98 46)">(3x+2) cm</text>
            <text x="65" y="105" textAnchor="middle" fill={isDark ? "#c7d2fe" : "#4f46e5"} fontSize={9} fontFamily="monospace">(5x−1) cm</text>
          </svg>
          <p className="text-indigo-300/60 text-[10px] font-body">
            {t('practice.aljabar.penjumlahanPengurangan.q2.shapeA')}
          </p>
        </div>
        {/* Persegi panjang */}
        <div className="flex flex-col items-center gap-1.5">
          <SubLabel letter="b" color="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30" />
          <svg width="170" height="124" viewBox="0 0 170 124">
            <rect x={24} y={18} width={122} height={72} rx={5}
              fill="#818cf8" fillOpacity={0.08} stroke="#818cf8" strokeWidth={1.5} />
            <text x="85" y="11" textAnchor="middle" fill={isDark ? "#c7d2fe" : "#4f46e5"} fontSize={9} fontFamily="monospace">(4y+3) cm</text>
            <text x="85" y="108" textAnchor="middle" fill={isDark ? "#c7d2fe" : "#4f46e5"} fontSize={9} fontFamily="monospace">(4y+3) cm</text>
            <text x="12" y="54" textAnchor="middle" dominantBaseline="middle" fill={isDark ? "#c7d2fe" : "#4f46e5"} stroke={isDark ? "#111827" : "#fff"} strokeWidth={3} paintOrder="stroke" strokeLinejoin="round" fontSize={9}
              fontFamily="monospace" transform="rotate(-90 12 54)">(2y−1) cm</text>
            <text x="158" y="54" textAnchor="middle" dominantBaseline="middle" fill={isDark ? "#c7d2fe" : "#4f46e5"} stroke={isDark ? "#111827" : "#fff"} strokeWidth={3} paintOrder="stroke" strokeLinejoin="round" fontSize={9}
              fontFamily="monospace" transform="rotate(90 158 54)">(2y−1) cm</text>
          </svg>
          <p className="text-indigo-300/60 text-[10px] font-body">
            {t('practice.aljabar.penjumlahanPengurangan.q2.shapeB')}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ── Soal 3 ── Jumlah dua bentuk aljabar ─────────────── */
const SoalTiga = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        {t('practice.aljabar.penjumlahanPengurangan.q3.instruction')}
      </p>
      <div className="space-y-2 pl-1">
        {[
          { l: "a", a: "7x + 3", b: "5x - 8" },
          { l: "b", a: "3a - 4b + 2c", b: "-5a + 7b - c" },
          { l: "c", a: "4p^2 - 3p + 6", b: "2p^2 + 8p - 9" },
          { l: "d", a: "2x^2 - xy + 3y^2", b: "5xy - 4y^2 + x^2" },
        ].map(({ l, a, b }) => (
          <div key={l} className="flex items-center gap-2 bg-rose-500/5 border border-rose-500/10 rounded-lg px-3 py-2 flex-wrap">
            <SubLabel letter={l} color="bg-rose-500/20 text-rose-300 border border-rose-400/30" />
            <AlgExpr math={`(${a})`} />
            <span className="text-white/40 text-sm">
              {t('practice.aljabar.penjumlahanPengurangan.q3.and')}
            </span>
            <AlgExpr math={`(${b})`} />
            <span className="ml-auto text-white/20 text-xs font-body shrink-0">= …</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Soal 4 ── Operasi P dan Q ───────────────────────── */
const SoalEmpat = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        {t('practice.aljabar.penjumlahanPengurangan.q4.introPre')}
        <InlineMath math="P = 5x + 3y" />
        {t('practice.aljabar.penjumlahanPengurangan.q4.introBetween')}
        <InlineMath math="Q = 2x - 4y + 1" />
        {t('practice.aljabar.penjumlahanPengurangan.q4.introMid')}
        <InlineMath math="x" />
        {t('practice.aljabar.penjumlahanPengurangan.q4.introAnd')}
        <InlineMath math="y" />
        {t('practice.aljabar.penjumlahanPengurangan.q4.introEnd')}
      </p>
      <div className="grid grid-cols-2 gap-2 pl-1">
        {[
          { l: "a", expr: "P + Q" },
          { l: "b", expr: "P - Q" },
          { l: "c", expr: "2P + Q" },
          { l: "d", expr: "3P - 2Q" },
        ].map(({ l, expr }) => (
          <div key={l} className="flex items-center gap-2.5 bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2">
            <SubLabel letter={l} color="bg-amber-500/20 text-amber-300 border border-amber-400/30" />
            <AlgExpr math={expr} />
            <span className="ml-auto text-white/20 text-xs font-body">= …</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Soal 5 ── Soal cerita: angkutan kota ────────────── */
const SoalLima = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        <Trans
          i18nKey="practice.aljabar.penjumlahanPengurangan.q5.sentence1"
          components={{
            pass: <strong className="text-teal-300" />,
            weight: <strong className="text-teal-300" />,
          }}
        />
        {' '}
        {t('practice.aljabar.penjumlahanPengurangan.q5.sentence2Pre')}
        <InlineMath math="(3k - 8)" />
        {t('practice.aljabar.penjumlahanPengurangan.q5.sentence2Post')}
      </p>
      <div className="rounded-xl border border-teal-400/15 bg-slate-950/20 px-2 pt-3 pb-2">
        <svg
          viewBox="0 0 760 330"
          className="bus-animated-diagram mx-auto block w-full max-w-3xl"
          role="img"
          aria-label={t('practice.aljabar.penjumlahanPengurangan.q5.svgLabel')}
        >
          <title>{t('practice.aljabar.penjumlahanPengurangan.q5.svgLabel')}</title>
          <defs>
            <linearGradient id="bus-body-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0e7490" />
              <stop offset="55%" stopColor="#155e75" />
              <stop offset="100%" stopColor="#0f3548" />
            </linearGradient>
            <linearGradient id="bus-window-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.92" />
              <stop offset="45%" stopColor="#164e63" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>
            <linearGradient id="bus-bag-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <filter id="bus-shadow" x="-20%" y="-20%" width="140%" height="160%">
              <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#020617" floodOpacity="0.45" />
            </filter>
            <marker id="bus-bag-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
              <path d="M0 0 L7 3.5 L0 7 Z" fill="#fbbf24" />
            </marker>
          </defs>

          <ellipse cx="385" cy="278" rx="320" ry="15" fill="#020617" fillOpacity="0.38" />
          <path d="M20 290 H740" stroke="#64748b" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="14 12" />

          {/* Wheels sit behind the lower bus body. */}
          <g fill="#101820" stroke="#94a3b8" strokeWidth="2">
            <circle cx="174" cy="250" r="32" />
            <circle cx="655" cy="250" r="32" />
          </g>

          {/* A full minibus body with front cabin, bumpers, lights, and route sign. */}
          <path
            d="M70 94 Q70 69 96 69 H624 Q670 69 694 103 L730 184 Q739 203 739 226 V239 Q739 253 723 253 H78 Q63 253 63 238 V108 Q63 94 70 94 Z"
            fill="url(#bus-body-gradient)"
            stroke="#67e8f9"
            strokeOpacity="0.7"
            strokeWidth="2"
            filter="url(#bus-shadow)"
          />
          <path d="M78 178 H720" stroke="#fbbf24" strokeWidth="5" strokeOpacity="0.95" />
          <path d="M78 185 H720" stroke="#fef3c7" strokeWidth="1.5" strokeOpacity="0.65" />
          <path d="M94 74 H618" stroke="#cffafe" strokeOpacity="0.45" strokeWidth="2" />

          {/* Four windows, with three visible passengers in each: 12 total. */}
          {[0, 1, 2, 3].map((windowIndex) => {
            const windowX = 91 + windowIndex * 112;
            return (
              <g key={`passenger-window-${windowIndex}`}>
                <rect
                  x={windowX}
                  y={91}
                  width={104}
                  height={77}
                  rx={8}
                  fill="url(#bus-window-gradient)"
                  stroke="#bae6fd"
                  strokeOpacity="0.7"
                  strokeWidth="1.5"
                />
                <path
                  d={`M${windowX + 5} 98 H${windowX + 95}`}
                  stroke="#e0f2fe"
                  strokeOpacity="0.45"
                  strokeWidth="2"
                />
                {[0, 1, 2].map((seatIndex) => {
                  const personX = windowX + 18 + seatIndex * 32;
                  const shirtColors = ["#fb7185", "#fbbf24", "#a78bfa"];
                  return (
                    <g key={`passenger-${windowIndex}-${seatIndex}`}>
                      <path
                        d={`M${personX - 11} 158 V147 Q${personX - 11} 132 ${personX} 132 Q${personX + 11} 132 ${personX + 11} 147 V158 Z`}
                        fill={shirtColors[(windowIndex + seatIndex) % shirtColors.length]}
                        stroke="#0f172a"
                        strokeOpacity="0.35"
                        strokeWidth="1"
                      />
                      <circle cx={personX} cy={121} r={7} fill="#f2c6a0" stroke="#7c4a35" strokeWidth="1" />
                      <path
                        d={`M${personX - 7} 119 Q${personX - 5} 111 ${personX + 3} 114 Q${personX + 7} 116 ${personX + 7} 120`}
                        fill="#334155"
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Sliding passenger door, with the conductor standing inside. */}
          <rect x="541" y="91" width="57" height="132" rx="5" fill="#0c2636" stroke="#bae6fd" strokeOpacity="0.65" strokeWidth="2" />
          <rect x="547" y="97" width="45" height="58" rx="3" fill="url(#bus-window-gradient)" />
          <path d="M569.5 97 V155" stroke="#cffafe" strokeOpacity="0.65" strokeWidth="2" />
          <path d="M547 160 H592 V217 H547 Z" fill="#123e50" stroke="#67e8f9" strokeOpacity="0.45" />
          <circle cx="570" cy="119" r="7" fill="#f2c6a0" stroke="#7c4a35" strokeWidth="1" />
          <path d="M559 149 V137 Q559 127 570 127 Q581 127 581 137 V149 Z" fill="#34d399" stroke="#064e3b" strokeWidth="1" />
          <path d="M585 165 V184" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" />

          {/* Front windscreen and the single driver. */}
          <path d="M610 82 H624 Q663 82 685 111 L704 158 H610 Z" fill="url(#bus-window-gradient)" stroke="#bae6fd" strokeOpacity="0.75" strokeWidth="2" />
          <path d="M620 88 L620 153" stroke="#cffafe" strokeOpacity="0.3" strokeWidth="2" />
          <circle cx="660" cy="119" r="8" fill="#eabf9c" stroke="#7c4a35" strokeWidth="1" />
          <path d="M648 151 V139 Q648 127 660 127 Q672 127 672 139 V151 Z" fill="#f8fafc" stroke="#475569" strokeWidth="1" />
          <circle cx="674" cy="151" r="7" fill="none" stroke="#fbbf24" strokeWidth="2" />
          <path d="M660 151 L674 151" stroke="#fbbf24" strokeWidth="2" />

          {/* Rear/front details, side mirror, route sign, and wheel rims. */}
          <rect x="76" y="96" width="12" height="32" rx="3" fill="#fb7185" />
          <rect x="718" y="186" width="13" height="18" rx="4" fill="#fef08a" />
          <path d="M695 97 L711 88 L721 93" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
          <rect x="642" y="70" width="48" height="17" rx="4" fill="#082f49" stroke="#67e8f9" strokeOpacity="0.6" />
          <text x="666" y="82" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="700" fontFamily="sans-serif">BUS</text>
          {[174, 655].map((wheelX) => (
            <g key={`wheel-rim-${wheelX}`}>
              <circle cx={wheelX} cy="250" r="19" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
              <circle cx={wheelX} cy="250" r="7" fill="#0f172a" stroke="#e2e8f0" strokeWidth="2" />
              {[0, 1, 2, 3].map((lug) => {
                const angle = (lug * Math.PI) / 2;
                return <circle key={lug} cx={wheelX + Math.cos(angle) * 13} cy={250 + Math.sin(angle) * 13} r="2" fill="#e2e8f0" />;
              })}
            </g>
          ))}

          {/* Open luggage bay and a bag that boards, then disappears into the compartment. */}
          <rect x="238" y="195" width="151" height="43" rx="4" fill="#061a28" stroke="#67e8f9" strokeOpacity="0.75" strokeWidth="2" />
          <path d="M241 194 L258 179 H384 V194" fill="#164e63" stroke="#a5f3fc" strokeWidth="2" strokeLinejoin="round" />
          <path d="M199 225 H229" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#bus-bag-arrow)" />
          <g transform="translate(100 0)">
            <rect x="170" y="207" width="26" height="25" rx="4" fill="url(#bus-bag-gradient)" stroke="#7c2d12" strokeWidth="1.5" />
            <path d="M176 207 V203 Q176 197 183 197 Q190 197 190 203 V207" fill="none" stroke="#fed7aa" strokeWidth="3" />
            <path d="M176 215 H190 M176 223 H190" stroke="#7c2d12" strokeOpacity="0.55" strokeWidth="1.5" />
            <animateTransform
              attributeName="transform"
              type="translate"
              values="-100 0; -100 0; 0 0; 0 0"
              keyTimes="0; 0.16; 0.62; 1"
              dur="5s"
              repeatCount="indefinite"
              additive="sum"
            />
            <animate
              attributeName="opacity"
              values="1; 1; 1; 0; 0"
              keyTimes="0; 0.16; 0.62; 0.72; 1"
              dur="5s"
              repeatCount="indefinite"
            />
          </g>

          <rect x="201" y="263" width="368" height="27" rx="13.5" fill="#042f2e" stroke="#2dd4bf" strokeOpacity="0.4" />
          <text x="385" y="281" textAnchor="middle" fill="#99f6e4" fontSize="11" fontWeight="700" fontFamily="sans-serif">
            {t('practice.aljabar.penjumlahanPengurangan.q5.svgLabel')}
          </text>
        </svg>
        <p className="mt-1 text-center text-[11px] font-body font-semibold text-amber-200/90">
          {t('practice.aljabar.penjumlahanPengurangan.q5.svgBagLabel')}
        </p>
      </div>
      <div className="space-y-1.5 pl-1">
        {[
          { l: "a", key: "practice.aljabar.penjumlahanPengurangan.q5.itemA" },
          { l: "b", key: "practice.aljabar.penjumlahanPengurangan.q5.itemB" },
        ].map(({ l, key }) => (
          <div key={l} className="flex items-start gap-2.5">
            <SubLabel letter={l} color="bg-teal-500/20 text-teal-300 border border-teal-400/30" />
            <p className="font-body text-sm text-white/80 leading-relaxed pt-0.5">{t(key)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Page ─────────────────────────────────────────────── */
const PenjumlahanPenguranganAljabarPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const cards = [
    {
      num: 1, tag: t('practice.aljabar.penjumlahanPengurangan.q1.tag'),
      tagColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
      gradient: isDark ? "from-emerald-900/40 to-green-900/25" : "from-emerald-50/80 to-green-50/60", border: "border-emerald-500/25",
      bar: "from-emerald-400 to-green-500", numBg: "bg-emerald-500/30 text-emerald-200",
      custom: <SoalSatu />,
    },
    {
      num: 2, tag: t('practice.aljabar.penjumlahanPengurangan.q2.tag'),
      tagColor: "bg-indigo-500/20 text-indigo-300 border-indigo-400/40",
      gradient: isDark ? "from-indigo-900/40 to-violet-900/25" : "from-indigo-50/80 to-violet-50/60", border: "border-indigo-500/25",
      bar: "from-indigo-400 to-violet-500", numBg: "bg-indigo-500/30 text-indigo-200",
      custom: <SoalDua />,
    },
    {
      num: 3, tag: t('practice.aljabar.penjumlahanPengurangan.q3.tag'),
      tagColor: "bg-rose-500/20 text-rose-300 border-rose-400/40",
      gradient: isDark ? "from-rose-900/40 to-pink-900/25" : "from-rose-50/80 to-pink-50/60", border: "border-rose-500/25",
      bar: "from-rose-400 to-pink-500", numBg: "bg-rose-500/30 text-rose-200",
      custom: <SoalTiga />,
    },
    {
      num: 4, tag: t('practice.aljabar.penjumlahanPengurangan.q4.tag'),
      tagColor: "bg-amber-500/20 text-amber-300 border-amber-400/40",
      gradient: isDark ? "from-amber-900/35 to-yellow-900/20" : "from-amber-50/80 to-yellow-50/60", border: "border-amber-500/25",
      bar: "from-amber-400 to-yellow-500", numBg: "bg-amber-500/30 text-amber-200",
      custom: <SoalEmpat />,
    },
    {
      num: 5, tag: t('practice.aljabar.penjumlahanPengurangan.q5.tag'),
      tagColor: "bg-teal-500/20 text-teal-300 border-teal-400/40",
      gradient: isDark ? "from-teal-900/40 to-cyan-900/25" : "from-teal-50/80 to-cyan-50/60", border: "border-teal-500/25",
      bar: "from-teal-400 to-cyan-500", numBg: "bg-teal-500/30 text-teal-200",
      custom: <SoalLima />,
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />

      <div className="relative z-10 max-w-3xl w-full px-4 py-10">

        {/* ── Header ── */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/10 border border-purple-400/30 flex items-center justify-center mb-4 shadow-lg">
            <span className="text-2xl">➕</span>
          </div>
          <h1
            className="font-display text-xl md:text-2xl font-bold text-white text-center mb-1 leading-tight"
            style={{ textShadow: '0 0 32px rgba(192,132,252,0.5)' }}
          >
            {t('practice.aljabar.penjumlahanPengurangan.pageTitle1')}
            <br />
            <span className="text-purple-300">
              {t('practice.aljabar.penjumlahanPengurangan.pageTitle2')}
            </span>
          </h1>
          <p className="text-white/40 text-xs text-center font-body mt-2">Kelas 7 · Aljabar · {t('practice.breadcrumb')}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 font-body">5 Soal Essay</span>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-400 font-body">✦ Kelas 7</span>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="flex flex-col gap-4">
          {cards.map((c, i) => (
            <div
              key={c.num}
              className="relative rounded-2xl overflow-hidden animate-slide-up"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} backdrop-blur`} />
              <div className={`absolute inset-0 border ${c.border} rounded-2xl`} />
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${c.bar} rounded-l-2xl`} />

              <div className="relative px-5 py-4 pl-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold font-body shrink-0 ${c.numBg}`}>
                    {c.num}
                  </span>
                  <Tag label={c.tag} color={c.tagColor} />
                </div>
                <div className="pl-1">
                  {c.custom}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Back button ── */}
        <div className="mt-10 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/latihan-mandiri/kelas-7/aljabar"); }}
            className="text-sm text-white/30 hover:text-purple-400 transition-colors cursor-pointer font-body"
          >
            {t('practice.backTo')} Aljabar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PenjumlahanPenguranganAljabarPage;
