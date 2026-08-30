import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronDown, ChevronUp, Lightbulb, Calculator, Target } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import SimilarityAnimation from "@/components/SimilarityAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

/* ── DIAGRAMS ── */

const DiagramSebangun = () => (
  <svg viewBox="0 0 340 160" className="w-full max-w-sm mx-auto">
    {/* Rectangle 1 */}
    <rect x="20" y="40" width="80" height="50" fill="#3b82f6" fillOpacity="0.25" stroke="#60a5fa" strokeWidth="2" rx="2" />
    <text x="60" y="72" textAnchor="middle" fontSize="9" fill="#93c5fd">ABCD</text>
    <text x="60" y="105" textAnchor="middle" fontSize="8" fill="#64748b">4 cm × 2,5 cm</text>
    {/* Arrow */}
    <text x="120" y="70" fontSize="18" fill="#facc15">~</text>
    {/* Rectangle 2 */}
    <rect x="150" y="25" width="120" height="75" fill="#22c55e" fillOpacity="0.25" stroke="#4ade80" strokeWidth="2" rx="2" />
    <text x="210" y="65" textAnchor="middle" fontSize="9" fill="#86efac">EFGH</text>
    <text x="210" y="115" textAnchor="middle" fontSize="8" fill="#64748b">6 cm × 3,75 cm</text>
    {/* Ratio labels */}
    <text x="170" y="15" fontSize="8" fill="#fde68a">AB/EF = BC/FG = 2/3</text>
    {/* Angle indicators */}
    <path d="M20,40 Q30,40 30,50" fill="none" stroke="#f97316" strokeWidth="1.5" />
    <path d="M150,25 Q162,25 162,37" fill="none" stroke="#f97316" strokeWidth="1.5" />
    <text x="22" y="58" fontSize="7" fill="#f97316">90°</text>
    <text x="152" y="43" fontSize="7" fill="#f97316">90°</text>
    <text x="60" y="20" textAnchor="middle" fontSize="9" fill="#facc15" fontWeight="bold">SEBANGUN (∼)</text>
    <text x="230" y="20" textAnchor="middle" fontSize="9" fill="#facc15" fontWeight="bold">sudut sama, rusuk sebanding</text>
  </svg>
);

const DiagramKongruen = () => (
  <svg viewBox="0 0 420 300" className="w-full max-w-lg mx-auto" role="img" aria-label="Contoh segitiga dan segiempat kongruen">
    <defs>
      <pattern id="kongruen-hatch-purple" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
        <rect width="10" height="10" fill="#7c3aed" fillOpacity="0.18" />
        <path d="M0 0V10" stroke="#c4b5fd" strokeWidth="2" strokeOpacity="0.7" />
      </pattern>
      <pattern id="kongruen-hatch-teal" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
        <rect width="10" height="10" fill="#0f766e" fillOpacity="0.2" />
        <path d="M0 0V10" stroke="#5eead4" strokeWidth="2" strokeOpacity="0.7" />
      </pattern>
    </defs>

    <text x="210" y="16" textAnchor="middle" fontSize="10" fill="#facc15" fontWeight="bold">CONTOH SEGITIGA KONGRUEN</text>
    {/* Segitiga kedua diputar 180° agar tidak tampil sebagai salinan berdampingan. */}
    <polygon points="34,110 112,110 76,38" fill="url(#kongruen-hatch-purple)" stroke="#c084fc" strokeWidth="2" strokeLinejoin="round" />
    <g transform="translate(205 0) rotate(180 76 74)">
      <polygon points="34,110 112,110 76,38" fill="url(#kongruen-hatch-purple)" stroke="#c084fc" strokeWidth="2" strokeLinejoin="round" />
    </g>
    <text x="76" y="128" textAnchor="middle" fontSize="9" fill="#e9d5ff">△ABC</text>
    <text x="281" y="128" textAnchor="middle" fontSize="9" fill="#e9d5ff">△PQR</text>
    <text x="190" y="82" textAnchor="middle" fontSize="20" fill="#facc15">≅</text>
    <text x="210" y="145" textAnchor="middle" fontSize="8" fill="#fde68a">bentuk dan ukuran sama</text>

    <text x="210" y="169" textAnchor="middle" fontSize="10" fill="#2dd4bf" fontWeight="bold">CONTOH TAMBAHAN: SEGIEMPAT KONGRUEN</text>
    {/* Sepasang segiempat orisinal; bangun kanan adalah cerminan horizontal bangun kiri. */}
    <polygon points="28,252 28,194 86,158 144,252" fill="url(#kongruen-hatch-teal)" stroke="#2dd4bf" strokeWidth="2" strokeLinejoin="round" />
    <g transform="translate(392 0) scale(-1 1)">
      <polygon points="28,252 28,194 86,158 144,252" fill="url(#kongruen-hatch-teal)" stroke="#5eead4" strokeWidth="2" strokeLinejoin="round" />
    </g>
    <text x="86" y="270" textAnchor="middle" fontSize="9" fill="#99f6e4">ABCD</text>
    <text x="306" y="270" textAnchor="middle" fontSize="9" fill="#99f6e4">EFGH</text>
    <text x="196" y="220" textAnchor="middle" fontSize="20" fill="#facc15">≅</text>
    <text x="210" y="288" textAnchor="middle" fontSize="8" fill="#94a3b8">sisi-sisi dan sudut-sudut bersesuaian sama</text>
  </svg>
);

const KongruenPentagonDiagram = () => (
  <svg viewBox="0 0 420 150" className="w-full max-w-lg mx-auto" role="img" aria-label="Dua pentagon kongruen, salah satunya diputar">
    <polygon points="30,118 42,55 86,28 132,50 116,116" fill="rgba(250,204,21,0.16)" stroke="#facc15" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="30" cy="118" r="2.5" fill="#facc15" />
    <circle cx="42" cy="55" r="2.5" fill="#facc15" />
    <circle cx="86" cy="28" r="2.5" fill="#facc15" />
    <circle cx="132" cy="50" r="2.5" fill="#facc15" />
    <circle cx="116" cy="116" r="2.5" fill="#facc15" />
    <text x="20" y="126" fontSize="8" fill="#fef3c7" fontWeight="bold">A</text>
    <text x="34" y="52" fontSize="8" fill="#fef3c7" fontWeight="bold">B</text>
    <text x="84" y="20" fontSize="8" fill="#fef3c7" fontWeight="bold">C</text>
    <text x="135" y="48" fontSize="8" fill="#fef3c7" fontWeight="bold">D</text>
    <text x="118" y="126" fontSize="8" fill="#fef3c7" fontWeight="bold">E</text>
    <text x="31" y="92" fontSize="7" fill="#fde68a">AB = 4 cm</text>
    <text x="57" y="39" fontSize="7" fill="#fde68a">BC = 3 cm</text>
    <text x="108" y="35" fontSize="7" fill="#fde68a">CD = 3 cm</text>
    <text x="126" y="87" fontSize="7" fill="#fde68a">DE = 4 cm</text>
    <text x="70" y="119" fontSize="7" fill="#fde68a">EA = 5 cm</text>
    <text x="74" y="140" textAnchor="middle" fontSize="9" fill="#fde68a">ABCDE</text>

    <text x="208" y="79" textAnchor="middle" fontSize="20" fill="#facc15">≅</text>
    <text x="208" y="97" textAnchor="middle" fontSize="8" fill="#fde68a">rotasi 180°</text>

    <g transform="translate(255 0) rotate(180 81 72)">
      <polygon points="30,118 42,55 86,28 132,50 116,116" fill="rgba(167,139,250,0.16)" stroke="#a78bfa" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="30" cy="118" r="2.5" fill="#a78bfa" />
      <circle cx="42" cy="55" r="2.5" fill="#a78bfa" />
      <circle cx="86" cy="28" r="2.5" fill="#a78bfa" />
      <circle cx="132" cy="50" r="2.5" fill="#a78bfa" />
      <circle cx="116" cy="116" r="2.5" fill="#a78bfa" />
    </g>
    <text x="390" y="22" fontSize="8" fill="#ddd6fe" fontWeight="bold">P</text>
    <text x="377" y="102" fontSize="8" fill="#ddd6fe" fontWeight="bold">Q</text>
    <text x="327" y="128" fontSize="8" fill="#ddd6fe" fontWeight="bold">R</text>
    <text x="274" y="102" fontSize="8" fill="#ddd6fe" fontWeight="bold">S</text>
    <text x="296" y="22" fontSize="8" fill="#ddd6fe" fontWeight="bold">T</text>
    <text x="365" y="50" fontSize="7" fill="#c4b5fd">PQ = 4 cm</text>
    <text x="345" y="105" fontSize="7" fill="#c4b5fd">QR = 3 cm</text>
    <text x="298" y="105" fontSize="7" fill="#c4b5fd">RS = 3 cm</text>
    <text x="278" y="57" fontSize="7" fill="#c4b5fd">ST = 4 cm</text>
    <text x="325" y="25" fontSize="7" fill="#c4b5fd">TP = 5 cm</text>
    <text x="336" y="140" textAnchor="middle" fontSize="9" fill="#c4b5fd">PQRST</text>
    <text x="210" y="15" textAnchor="middle" fontSize="9" fill="#facc15" fontWeight="bold">Pentagon tak beraturan — ukuran sama, arah berbeda</text>
  </svg>
);

const KongruenOctagonDiagram = () => (
  <svg viewBox="0 0 460 180" className="w-full max-w-lg mx-auto" role="img" aria-label="Dua segi delapan cekung kongruen, salah satunya dicerminkan">
    <polygon points="32,148 26,94 64,66 47,30 103,48 142,29 174,91 145,148" fill="rgba(34,211,238,0.15)" stroke="#22d3ee" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="32" cy="148" r="2.5" fill="#22d3ee" />
    <circle cx="26" cy="94" r="2.5" fill="#22d3ee" />
    <circle cx="64" cy="66" r="2.5" fill="#22d3ee" />
    <circle cx="47" cy="30" r="2.5" fill="#22d3ee" />
    <circle cx="103" cy="48" r="2.5" fill="#22d3ee" />
    <circle cx="142" cy="29" r="2.5" fill="#22d3ee" />
    <circle cx="174" cy="91" r="2.5" fill="#22d3ee" />
    <circle cx="145" cy="148" r="2.5" fill="#22d3ee" />
    <text x="19" y="159" fontSize="8" fill="#cffafe" fontWeight="bold">A</text>
    <text x="12" y="93" fontSize="8" fill="#cffafe" fontWeight="bold">B</text>
    <text x="61" y="63" fontSize="8" fill="#cffafe" fontWeight="bold">C</text>
    <text x="38" y="24" fontSize="8" fill="#cffafe" fontWeight="bold">D</text>
    <text x="104" y="45" fontSize="8" fill="#cffafe" fontWeight="bold">E</text>
    <text x="145" y="22" fontSize="8" fill="#cffafe" fontWeight="bold">F</text>
    <text x="177" y="93" fontSize="8" fill="#cffafe" fontWeight="bold">G</text>
    <text x="148" y="159" fontSize="8" fill="#cffafe" fontWeight="bold">H</text>
    <text x="4" y="124" fontSize="7" fill="#a5f3fc">AB = 4 cm</text>
    <text x="28" y="82" fontSize="7" fill="#a5f3fc">BC = 3,5</text>
    <text x="34" y="49" fontSize="7" fill="#a5f3fc">CD = 3</text>
    <text x="74" y="40" fontSize="7" fill="#a5f3fc">DE = 4</text>
    <text x="111" y="36" fontSize="7" fill="#a5f3fc">EF = 3</text>
    <text x="151" y="58" fontSize="7" fill="#a5f3fc">FG = 5</text>
    <text x="155" y="125" fontSize="7" fill="#a5f3fc">GH = 2</text>
    <text x="84" y="158" fontSize="7" fill="#a5f3fc">HA = 7</text>
    <text x="100" y="168" textAnchor="middle" fontSize="9" fill="#a5f3fc">ABCDEFGH · segi-8 cekung</text>

    <text x="228" y="91" textAnchor="middle" fontSize="20" fill="#facc15">≅</text>
    <text x="228" y="110" textAnchor="middle" fontSize="8" fill="#fde68a">cermin horizontal</text>

    <g transform="translate(432 0) scale(-1 1)">
      <polygon points="32,148 26,94 64,66 47,30 103,48 142,29 174,91 145,148" fill="rgba(244,114,182,0.15)" stroke="#f472b6" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="148" r="2.5" fill="#f472b6" />
      <circle cx="26" cy="94" r="2.5" fill="#f472b6" />
      <circle cx="64" cy="66" r="2.5" fill="#f472b6" />
      <circle cx="47" cy="30" r="2.5" fill="#f472b6" />
      <circle cx="103" cy="48" r="2.5" fill="#f472b6" />
      <circle cx="142" cy="29" r="2.5" fill="#f472b6" />
      <circle cx="174" cy="91" r="2.5" fill="#f472b6" />
      <circle cx="145" cy="148" r="2.5" fill="#f472b6" />
    </g>
    <text x="402" y="159" fontSize="8" fill="#fbcfe8" fontWeight="bold">P</text>
    <text x="408" y="93" fontSize="8" fill="#fbcfe8" fontWeight="bold">Q</text>
    <text x="370" y="63" fontSize="8" fill="#fbcfe8" fontWeight="bold">R</text>
    <text x="388" y="24" fontSize="8" fill="#fbcfe8" fontWeight="bold">S</text>
    <text x="327" y="45" fontSize="8" fill="#fbcfe8" fontWeight="bold">T</text>
    <text x="287" y="22" fontSize="8" fill="#fbcfe8" fontWeight="bold">U</text>
    <text x="252" y="93" fontSize="8" fill="#fbcfe8" fontWeight="bold">V</text>
    <text x="279" y="159" fontSize="8" fill="#fbcfe8" fontWeight="bold">W</text>
    <text x="395" y="124" fontSize="7" fill="#f9a8d4">PQ = 4 cm</text>
    <text x="369" y="82" fontSize="7" fill="#f9a8d4">QR = 3,5</text>
    <text x="353" y="49" fontSize="7" fill="#f9a8d4">RS = 3</text>
    <text x="317" y="40" fontSize="7" fill="#f9a8d4">ST = 4</text>
    <text x="279" y="36" fontSize="7" fill="#f9a8d4">TU = 3</text>
    <text x="256" y="58" fontSize="7" fill="#f9a8d4">UV = 5</text>
    <text x="252" y="125" fontSize="7" fill="#f9a8d4">VW = 2</text>
    <text x="326" y="158" fontSize="7" fill="#f9a8d4">WP = 7</text>
    <text x="360" y="168" textAnchor="middle" fontSize="9" fill="#f9a8d4">PQRSTUVW · segi-8 cekung</text>
    <text x="230" y="15" textAnchor="middle" fontSize="9" fill="#22d3ee" fontWeight="bold">Segi-8 cekung — cermin mengubah arah, bukan ukuran</text>
  </svg>
);

const DiagramHubungan = () => (
  <svg viewBox="0 0 320 130" className="w-full max-w-sm mx-auto">
    <ellipse cx="160" cy="65" rx="150" ry="55" fill="#3b82f6" fillOpacity="0.1" stroke="#60a5fa" strokeWidth="1.5" />
    <text x="160" y="18" textAnchor="middle" fontSize="10" fill="#93c5fd" fontWeight="bold">SEBANGUN (∼)</text>
    <text x="160" y="32" textAnchor="middle" fontSize="8" fill="#64748b">sudut bersesuaian sama besar</text>
    <text x="160" y="44" textAnchor="middle" fontSize="8" fill="#64748b">rusuk bersesuaian sebanding</text>
    <ellipse cx="160" cy="85" rx="90" ry="33" fill="#22c55e" fillOpacity="0.15" stroke="#4ade80" strokeWidth="1.5" />
    <text x="160" y="80" textAnchor="middle" fontSize="10" fill="#86efac" fontWeight="bold">KONGRUEN (≅)</text>
    <text x="160" y="93" textAnchor="middle" fontSize="8" fill="#64748b">seperti sebangun, PLUS</text>
    <text x="160" y="105" textAnchor="middle" fontSize="8" fill="#64748b">ukuran (rusuk) juga SAMA</text>
    <text x="12" y="65" fontSize="8" fill="#fde68a">Kongruen ⊂ Sebangun</text>
  </svg>
);

const GridBangunBerundak = () => (
  <svg viewBox="0 0 560 198" className="w-full max-w-2xl mx-auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dua bangun berundak sebangun pada grid">
    <defs>
      <pattern id="contoh4-grid" x="20" y="8" width="22" height="22" patternUnits="userSpaceOnUse">
        <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#475569" strokeWidth="0.8" />
      </pattern>
      <pattern id="contoh4-hatch-cyan" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="#0891b2" fillOpacity="0.2" />
        <path d="M-3,3 L3,-3 M0,12 L12,0 M9,15 L15,9" stroke="#67e8f9" strokeWidth="1.2" strokeOpacity="0.7" />
      </pattern>
      <pattern id="contoh4-hatch-violet" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="#7c3aed" fillOpacity="0.18" />
        <path d="M-3,3 L3,-3 M0,12 L12,0 M9,15 L15,9" stroke="#c4b5fd" strokeWidth="1.2" strokeOpacity="0.7" />
      </pattern>
    </defs>
    <rect width="560" height="198" rx="10" fill="#0f172a" />
    <rect x="8" y="8" width="544" height="182" rx="7" fill="url(#contoh4-grid)" opacity="0.9" />

    {/* Bangun kecil: A(2,2), B(5,2), C(5,4), D(4,4), E(4,5), F(2,5) */}
    <polygon points="64,52 130,52 130,96 108,96 108,118 64,118" fill="url(#contoh4-hatch-cyan)" stroke="#22d3ee" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="64" cy="52" r="3" fill="#22d3ee" />
    <circle cx="130" cy="52" r="3" fill="#22d3ee" />
    <circle cx="130" cy="96" r="3" fill="#22d3ee" />
    <circle cx="108" cy="96" r="3" fill="#22d3ee" />
    <circle cx="108" cy="118" r="3" fill="#22d3ee" />
    <circle cx="64" cy="118" r="3" fill="#22d3ee" />
    {/* Bangun besar: P(13,1), Q(19,1), R(19,5), S(17,5), T(17,7), U(13,7) */}
    <polygon points="286,30 418,30 418,118 374,118 374,162 286,162" fill="url(#contoh4-hatch-violet)" stroke="#a78bfa" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="286" cy="30" r="3" fill="#a78bfa" />
    <circle cx="418" cy="30" r="3" fill="#a78bfa" />
    <circle cx="418" cy="118" r="3" fill="#a78bfa" />
    <circle cx="374" cy="118" r="3" fill="#a78bfa" />
    <circle cx="374" cy="162" r="3" fill="#a78bfa" />
    <circle cx="286" cy="162" r="3" fill="#a78bfa" />
  </svg>
);

const GridBangunMiring = () => (
  <svg viewBox="0 0 560 225" className="w-full max-w-2xl mx-auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dua bangun bersisi miring sebangun pada grid">
    <defs>
      <pattern id="contoh5-grid" x="18" y="10" width="18" height="18" patternUnits="userSpaceOnUse">
        <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#475569" strokeWidth="0.8" />
      </pattern>
      <pattern id="contoh5-hatch-amber" width="13" height="13" patternUnits="userSpaceOnUse">
        <rect width="13" height="13" fill="#b45309" fillOpacity="0.2" />
        <path d="M-3,3 L3,-3 M0,13 L13,0 M10,16 L16,10" stroke="#fcd34d" strokeWidth="1.2" strokeOpacity="0.75" />
      </pattern>
      <pattern id="contoh5-hatch-rose" width="13" height="13" patternUnits="userSpaceOnUse">
        <rect width="13" height="13" fill="#be123c" fillOpacity="0.18" />
        <path d="M-3,3 L3,-3 M0,13 L13,0 M10,16 L16,10" stroke="#fda4af" strokeWidth="1.2" strokeOpacity="0.75" />
      </pattern>
    </defs>
    <rect width="560" height="225" rx="10" fill="#0f172a" />
    <rect x="8" y="8" width="544" height="209" rx="7" fill="url(#contoh5-grid)" opacity="0.9" />
    {/* Bangun besar: variasi pentagon dengan satu sisi miring */}
    <polygon points="54,190 54,118 90,46 162,46 162,190" fill="url(#contoh5-hatch-amber)" stroke="#fbbf24" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="54" cy="190" r="3" fill="#fbbf24" />
    <circle cx="54" cy="118" r="3" fill="#fbbf24" />
    <circle cx="90" cy="46" r="3" fill="#fbbf24" />
    <circle cx="162" cy="46" r="3" fill="#fbbf24" />
    <circle cx="162" cy="190" r="3" fill="#fbbf24" />
    {/* Bangun kecil: bentuk sama dengan susunan dan proporsi yang divariasikan */}
    <polygon points="342,172 342,136 360,100 396,100 396,172" fill="url(#contoh5-hatch-rose)" stroke="#fb7185" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="342" cy="172" r="3" fill="#fb7185" />
    <circle cx="342" cy="136" r="3" fill="#fb7185" />
    <circle cx="360" cy="100" r="3" fill="#fb7185" />
    <circle cx="396" cy="100" r="3" fill="#fb7185" />
    <circle cx="396" cy="172" r="3" fill="#fb7185" />
  </svg>
);

const DefinisiPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "intro", "konsep1", "contoh1", "konsep2", "contoh2", "konsep3",
  ]);
  const toggleSection = (s: string) => {
    playPopSound();
    setExpandedSections(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };
  const Header = ({ id, icon, color, label }: { id: string; icon: React.ReactNode; color: string; label: string }) => (
    <button onClick={() => toggleSection(id)} className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer">
      <div className="flex items-center gap-3"><span style={{ color }}>{icon}</span><span className="font-body font-semibold text-white">{label}</span></div>
      <ChevronUp className="w-5 h-5 text-primary" />
    </button>
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <BookOpen className="w-10 h-10 text-primary mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">DEFINISI KESEBANGUNAN DAN KEKONGRUENAN</h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">Kelas 9 · Kesebangunan dan Kekongruenan · Materi Matematika</p>

        <div className="flex flex-col gap-4 animate-slide-up">

          {/* INTRO */}
          <div id="contoh-grid" className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="intro" icon={<Lightbulb className="w-5 h-5" />} color="#facc15" label="🏙️ Dari Maket Gedung sampai Ubin Lantai" />
            {true && (
              <div className="px-5 pb-5 space-y-4">
                <p className="font-body text-sm text-white/80 leading-relaxed">
                  Pernah lihat maket gedung atau miniatur rumah di kantor arsitek? Miniatur itu punya bentuk persis sama dengan bangunan aslinya, hanya skalanya lebih kecil — itulah <strong className="text-cyan-300">kesebangunan</strong> dalam kehidupan nyata!
                </p>
                <div className="rounded-xl overflow-hidden border border-cyan-500/20 shadow-lg shadow-cyan-900/20">
                  <img
                    src="/arsitektur-maket.png"
                    alt="Maket gedung di meja arsitek dengan bangunan asli terlihat di latar belakang"
                    className="w-full object-cover max-h-64"
                  />
                  <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 text-xs">📐</span>
                      <p className="font-body text-xs text-white/50 italic">Maket gedung (depan) dan bangunan aslinya (belakang) — bentuk sama, ukuran berbeda. Inilah kesebangunan!</p>
                    </div>
                    <p className="font-body text-xs text-white/30 shrink-0">bing.com/images/create</p>
                  </div>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-cyan-200 leading-relaxed">
                    Sebaliknya, coba perhatikan ubin-ubin di lantai ruang kelasmu. Semua ubin punya bentuk <em>dan</em> ukuran yang persis sama, bukan hanya mirip bentuknya saja. Nah, itu namanya <strong>kekongruenan</strong>! 🧱
                  </p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-yellow-200">
                    <strong>Perbedaan Kunci:</strong> Dua bangun <strong className="text-yellow-300">sebangun</strong> jika bentuknya sama (ukuran boleh beda). Dua bangun <strong className="text-green-300">kongruen</strong> jika bentuk DAN ukurannya sama persis.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* SUB-BAB 1: KESEBANGUNAN */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="konsep1" icon={<Target className="w-5 h-5" />} color="#4ade80" label="📘 Sub-Bab 1: Definisi Kesebangunan" />
            {true && (
              <div className="px-5 pb-5 space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-3">
                  <p className="font-body text-sm font-semibold text-green-300">🎯 Ringkasan Intisari</p>
                  <p className="font-body text-sm text-white/80 leading-relaxed">
                    Dua bangun datar disebut <strong className="text-green-300">sebangun</strong> jika keduanya memenuhi dua syarat secara bersamaan:
                  </p>

                  {/* Visual SVG representasi rumus */}
                  <div className="bg-slate-900/70 rounded-lg p-3">
                    <p className="font-body text-xs text-slate-400 text-center mb-2">📊 Representasi Visual — warna sama = sisi bersesuaian</p>
                    <svg viewBox="0 0 340 148" className="w-full" xmlns="http://www.w3.org/2000/svg">
                      {/* ── Large rect ABCD ── */}
                      <rect x="16" y="25" width="148" height="88" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" rx="2"/>
                      {/* AB – amber */}
                      <line x1="16" y1="25" x2="164" y2="25" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
                      {/* BC – rose */}
                      <line x1="164" y1="25" x2="164" y2="113" stroke="#fb7185" strokeWidth="3" strokeLinecap="round"/>
                      {/* CD – emerald */}
                      <line x1="164" y1="113" x2="16" y2="113" stroke="#34d399" strokeWidth="3" strokeLinecap="round"/>
                      {/* DA – violet */}
                      <line x1="16" y1="113" x2="16" y2="25" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round"/>
                      {/* Vertex labels – ABCD */}
                      <text x="10"  y="22" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold">A</text>
                      <text x="166" y="22" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold">B</text>
                      <text x="166" y="124" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold">C</text>
                      <text x="10"  y="124" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold">D</text>
                      {/* ── Dashed connecting lines B→E and C→H ── */}
                      <line x1="164" y1="25" x2="196" y2="39" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3"/>
                      <line x1="164" y1="113" x2="196" y2="101" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3"/>
                      {/* k label between rects */}
                      <text x="180" y="71" fill="rgba(255,255,255,0.35)" fontSize="11" textAnchor="middle" fontFamily="sans-serif" fontStyle="italic">k</text>
                      {/* ── Small rect EFGH ── */}
                      <rect x="196" y="39" width="99" height="59" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" rx="2"/>
                      {/* EF – amber */}
                      <line x1="196" y1="39" x2="295" y2="39" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
                      {/* FG – rose */}
                      <line x1="295" y1="39" x2="295" y2="98" stroke="#fb7185" strokeWidth="3" strokeLinecap="round"/>
                      {/* GH – emerald */}
                      <line x1="295" y1="98" x2="196" y2="98" stroke="#34d399" strokeWidth="3" strokeLinecap="round"/>
                      {/* HE – violet */}
                      <line x1="196" y1="98" x2="196" y2="39" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round"/>
                      {/* Vertex labels – EFGH */}
                      <text x="188" y="37" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold">E</text>
                      <text x="297" y="37" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold">F</text>
                      <text x="297" y="110" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold">G</text>
                      <text x="188" y="110" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold">H</text>
                      {/* Similarity symbol */}
                      <text x="170" y="140" fill="rgba(255,255,255,0.3)" fontSize="9" textAnchor="middle" fontFamily="sans-serif">ABCD  ~  EFGH</text>
                    </svg>
                  </div>

                  <div className="bg-slate-900/60 rounded-lg p-4 space-y-2 font-body text-sm text-white/80">
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 font-bold shrink-0">①</span>
                      <p><strong className="text-green-300">Sudut-sudut yang bersesuaian sama besar</strong> — setiap sudut di bangun pertama punya pasangan sudut yang sama besar di bangun kedua.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 font-bold shrink-0">②</span>
                      <p><strong className="text-green-300">Rusuk-rusuk yang bersesuaian sebanding</strong> — panjang sisi-sisinya membentuk perbandingan yang sama.</p>
                    </div>
                  </div>
                  <div className="bg-slate-900/60 rounded-lg p-3 text-center">
                    <BlockMath math="\frac{AB}{EF} = \frac{BC}{FG} = \frac{CD}{GH} = \frac{DA}{HE} = k" />
                    <p className="font-body text-xs text-white/50 mt-1">k = faktor skala (rasio kesebangunan)</p>
                  </div>

                </div>
                {/* Interactive Similarity Animation */}
                <SimilarityAnimation lang={language} />

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-yellow-200">
                    <strong>Tips:</strong> Penulisan dua bangun sebangun menggunakan simbol "<InlineMath math="\sim" />". Contoh: ABCD <InlineMath math="\sim" /> EFGH. Urutan huruf menunjukkan titik-titik yang saling bersesuaian, jadi jangan sampai keliru urutannya!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* CONTOH SOAL 1 */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="contoh1" icon={<Calculator className="w-5 h-5" />} color="#60a5fa" label="📝 Contoh Soal — Kesebangunan Bangun Datar" />
            {true && (
              <div className="px-5 pb-5 space-y-6">
                {/* MUDAH */}
                <div className="border-l-4 border-green-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">MUDAH</span>
                    <span className="font-body font-semibold text-white">Contoh 1</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">Persegi panjang ABCD dengan panjang <InlineMath math="AB = 10" /> cm dan lebar <InlineMath math="BC = 6" /> cm sebangun dengan persegi panjang PQRS. Jika <InlineMath math="PQ = 15" /> cm, tentukan panjang <InlineMath math="QR" />!</p>
                    {/* Diagram dua persegi panjang sebangun */}
                    <div className="flex justify-center">
                      <svg viewBox="0 0 380 130" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
                        {/* Persegi panjang ABCD (10×6) — skala: ×8 = 80×48 */}
                        <rect x="20" y="35" width="80" height="48" fill="rgba(96,165,250,0.15)" stroke="#60a5fa" strokeWidth="1.5" rx="1"/>
                        {/* Titik sudut ABCD */}
                        <circle cx="20" cy="35" r="2.5" fill="#60a5fa"/>
                        <circle cx="100" cy="35" r="2.5" fill="#60a5fa"/>
                        <circle cx="100" cy="83" r="2.5" fill="#60a5fa"/>
                        <circle cx="20" cy="83" r="2.5" fill="#60a5fa"/>
                        {/* Label sudut */}
                        <text x="11" y="32" fill="#93c5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">A</text>
                        <text x="102" y="32" fill="#93c5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">B</text>
                        <text x="102" y="92" fill="#93c5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">C</text>
                        <text x="11" y="92" fill="#93c5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">D</text>
                        {/* Label sisi */}
                        <text x="55" y="29" fill="#bfdbfe" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">10 cm</text>
                        <text x="108" y="61" fill="#bfdbfe" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">6 cm</text>
                        {/* Nama */}
                        <text x="60" y="68" fill="rgba(255,255,255,0.5)" fontSize="8" textAnchor="middle" fontFamily="sans-serif">ABCD</text>

                        {/* Simbol ~ */}
                        <text x="158" y="64" fill="#facc15" fontSize="20" textAnchor="middle" fontFamily="sans-serif">~</text>

                        {/* Persegi panjang PQRS (15×9) — skala: ×8 = 120×72 */}
                        <rect x="190" y="23" width="120" height="72" fill="rgba(52,211,153,0.15)" stroke="#34d399" strokeWidth="1.5" rx="1"/>
                        {/* Titik sudut PQRS */}
                        <circle cx="190" cy="23" r="2.5" fill="#34d399"/>
                        <circle cx="310" cy="23" r="2.5" fill="#34d399"/>
                        <circle cx="310" cy="95" r="2.5" fill="#34d399"/>
                        <circle cx="190" cy="95" r="2.5" fill="#34d399"/>
                        {/* Label sudut */}
                        <text x="180" y="21" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">P</text>
                        <text x="313" y="21" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">Q</text>
                        <text x="313" y="104" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">R</text>
                        <text x="180" y="104" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">S</text>
                        {/* Label sisi */}
                        <text x="250" y="17" fill="#a7f3d0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">15 cm</text>
                        <text x="322" y="61" fill="#a7f3d0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">? cm</text>
                        {/* Nama */}
                        <text x="250" y="63" fill="rgba(255,255,255,0.5)" fontSize="8" textAnchor="middle" fontFamily="sans-serif">PQRS</text>

                        {/* Keterangan faktor skala */}
                        <text x="190" y="118" fill="rgba(250,204,21,0.7)" fontSize="7.5" fontFamily="sans-serif">Faktor skala: 15/10 = 1,5×</text>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-green-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Karena sebangun, rusuk-rusuk yang bersesuaian sebanding:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="\frac{AB}{PQ} = \frac{BC}{QR}" />
                        <BlockMath math="\frac{10}{15} = \frac{6}{QR}" />
                      </div>
                      <p><strong>Langkah 2:</strong> Selesaikan dengan perkalian silang:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="10 \times QR = 15 \times 6 = 90" />
                        <BlockMath math="QR = \frac{90}{10} = 9 \text{ cm}" />
                      </div>
                      <p><strong className="text-green-300">Panjang QR = 9 cm.</strong></p>
                    </div>
                  </div>
                </div>
                {/* SEDANG */}
                <div className="border-l-4 border-yellow-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">SEDANG</span>
                    <span className="font-body font-semibold text-white">Contoh 2</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">Segiempat ABCD <InlineMath math="\sim" /> EFGH. Diketahui <InlineMath math="\angle A = 80°" />, <InlineMath math="\angle B = 95°" />, <InlineMath math="\angle C = 100°" />. Tentukan besar <InlineMath math="\angle E" />, <InlineMath math="\angle F" />, <InlineMath math="\angle G" />, dan <InlineMath math="\angle H" />!</p>
                    {/* Diagram dua segiempat sebangun dengan label sudut */}
                    <div className="flex justify-center">
                      <svg viewBox="0 0 380 120" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
                        {/* Segiempat ABCD */}
                        <polygon points="22,18 102,12 108,78 18,84" fill="rgba(250,204,21,0.1)" stroke="#facc15" strokeWidth="1.5"/>
                        <circle cx="22" cy="18" r="2.5" fill="#facc15"/>
                        <circle cx="102" cy="12" r="2.5" fill="#facc15"/>
                        <circle cx="108" cy="78" r="2.5" fill="#facc15"/>
                        <circle cx="18" cy="84" r="2.5" fill="#facc15"/>
                        {/* Label titik */}
                        <text x="9" y="16" fill="#fde68a" fontSize="9" fontFamily="sans-serif" fontWeight="bold">A</text>
                        <text x="105" y="11" fill="#fde68a" fontSize="9" fontFamily="sans-serif" fontWeight="bold">B</text>
                        <text x="111" y="86" fill="#fde68a" fontSize="9" fontFamily="sans-serif" fontWeight="bold">C</text>
                        <text x="6" y="93" fill="#fde68a" fontSize="9" fontFamily="sans-serif" fontWeight="bold">D</text>
                        {/* Label sudut */}
                        <text x="26" y="32" fill="#fbbf24" fontSize="7.5" fontFamily="sans-serif">80°</text>
                        <text x="88" y="28" fill="#fbbf24" fontSize="7.5" fontFamily="sans-serif">95°</text>
                        <text x="88" y="72" fill="#fbbf24" fontSize="7.5" fontFamily="sans-serif">100°</text>
                        <text x="24" y="74" fill="#fbbf24" fontSize="7.5" fontFamily="sans-serif">85°</text>
                        <text x="60" y="52" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle" fontFamily="sans-serif">ABCD</text>

                        {/* Simbol ~ */}
                        <text x="155" y="52" fill="#facc15" fontSize="20" textAnchor="middle" fontFamily="sans-serif">~</text>

                        {/* Segiempat EFGH (sedikit lebih besar, bentuk serupa) */}
                        <polygon points="178,15 272,8 280,82 174,90" fill="rgba(167,139,250,0.1)" stroke="#a78bfa" strokeWidth="1.5"/>
                        <circle cx="178" cy="15" r="2.5" fill="#a78bfa"/>
                        <circle cx="272" cy="8" r="2.5" fill="#a78bfa"/>
                        <circle cx="280" cy="82" r="2.5" fill="#a78bfa"/>
                        <circle cx="174" cy="90" r="2.5" fill="#a78bfa"/>
                        {/* Label titik */}
                        <text x="164" y="13" fill="#c4b5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">E</text>
                        <text x="274" y="8" fill="#c4b5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">F</text>
                        <text x="283" y="91" fill="#c4b5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">G</text>
                        <text x="161" y="99" fill="#c4b5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">H</text>
                        {/* Label sudut */}
                        <text x="182" y="30" fill="#a78bfa" fontSize="7.5" fontFamily="sans-serif">80°</text>
                        <text x="254" y="25" fill="#a78bfa" fontSize="7.5" fontFamily="sans-serif">95°</text>
                        <text x="254" y="76" fill="#a78bfa" fontSize="7.5" fontFamily="sans-serif">100°</text>
                        <text x="178" y="78" fill="#a78bfa" fontSize="7.5" fontFamily="sans-serif">85°</text>
                        <text x="228" y="52" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle" fontFamily="sans-serif">EFGH</text>

                        {/* Keterangan */}
                        <text x="178" y="108" fill="rgba(250,204,21,0.7)" fontSize="7.5" fontFamily="sans-serif">Sudut bersesuaian sama besar: ∠E=∠A, ∠F=∠B, ∠G=∠C, ∠H=∠D</text>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-yellow-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Cari <InlineMath math="\angle D" /> dari jumlah sudut segiempat = 360°:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="\angle D = 360° - 80° - 95° - 100° = 85°" />
                      </div>
                      <p><strong>Langkah 2:</strong> Karena sebangun, sudut yang bersesuaian sama besar:</p>
                      <div className="bg-slate-900/50 rounded p-3 space-y-1 text-sm">
                        <p><InlineMath math="\angle E = \angle A = 80°" /></p>
                        <p><InlineMath math="\angle F = \angle B = 95°" /></p>
                        <p><InlineMath math="\angle G = \angle C = 100°" /></p>
                        <p><InlineMath math="\angle H = \angle D = 85°" /></p>
                      </div>
                      <p><strong className="text-yellow-300">∠E = 80°, ∠F = 95°, ∠G = 100°, ∠H = 85°.</strong></p>
                    </div>
                  </div>
                </div>
                {/* SULIT */}
                <div className="border-l-4 border-red-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded">SULIT</span>
                    <span className="font-body font-semibold text-white">Contoh 3</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">Segitiga ABC <InlineMath math="\sim" /> segitiga PQR dengan <InlineMath math="AB = 8" /> cm, <InlineMath math="BC = 12" /> cm, <InlineMath math="AC = 10" /> cm. Jika keliling segitiga PQR = 45 cm, tentukan panjang PQ, QR, dan PR!</p>
                    {/* Diagram dua segitiga sebangun */}
                    <div className="flex justify-center">
                      <svg viewBox="0 0 380 125" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
                        {/* Segitiga ABC: A(atas), B(kiri-bawah), C(kanan-bawah) */}
                        {/* AB=8, BC=12, AC=10 → skala 5px/cm */}
                        {/* B=(15,88), C=(75,88), A=(30,28) */}
                        <polygon points="30,20 15,88 87,88" fill="rgba(248,113,113,0.12)" stroke="#f87171" strokeWidth="1.5"/>
                        <circle cx="30" cy="20" r="2.5" fill="#f87171"/>
                        <circle cx="15" cy="88" r="2.5" fill="#f87171"/>
                        <circle cx="87" cy="88" r="2.5" fill="#f87171"/>
                        {/* Label titik */}
                        <text x="25" y="13" fill="#fca5a5" fontSize="9" fontFamily="sans-serif" fontWeight="bold">A</text>
                        <text x="4" y="96" fill="#fca5a5" fontSize="9" fontFamily="sans-serif" fontWeight="bold">B</text>
                        <text x="90" y="96" fill="#fca5a5" fontSize="9" fontFamily="sans-serif" fontWeight="bold">C</text>
                        {/* Label sisi */}
                        {/* AB = 8 cm (sisi kiri miring) */}
                        <text x="14" y="50" fill="#fca5a5" fontSize="8" fontFamily="sans-serif">8 cm</text>
                        {/* BC = 12 cm (alas) */}
                        <text x="45" y="100" fill="#fca5a5" fontSize="8" textAnchor="middle" fontFamily="sans-serif">12 cm</text>
                        {/* AC = 10 cm (sisi kanan miring) */}
                        <text x="66" y="50" fill="#fca5a5" fontSize="8" fontFamily="sans-serif">10 cm</text>
                        <text x="51" y="60" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle" fontFamily="sans-serif">△ABC</text>

                        {/* Simbol ~ */}
                        <text x="145" y="58" fill="#facc15" fontSize="20" textAnchor="middle" fontFamily="sans-serif">~</text>

                        {/* Segitiga PQR: lebih besar (k=1.5) */}
                        {/* PQ=12, QR=18, PR=15 → skala 5px/cm */}
                        {/* Q=(175,88), R=(265,88), P=(197,18) */}
                        <polygon points="200,12 175,100 283,100" fill="rgba(52,211,153,0.12)" stroke="#34d399" strokeWidth="1.5"/>
                        <circle cx="200" cy="12" r="2.5" fill="#34d399"/>
                        <circle cx="175" cy="100" r="2.5" fill="#34d399"/>
                        <circle cx="283" cy="100" r="2.5" fill="#34d399"/>
                        {/* Label titik */}
                        <text x="195" y="8" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">P</text>
                        <text x="163" y="110" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">Q</text>
                        <text x="286" y="110" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">R</text>
                        {/* Label sisi */}
                        {/* PQ = 12 cm */}
                        <text x="175" y="52" fill="#6ee7b7" fontSize="8" fontFamily="sans-serif">12 cm</text>
                        {/* QR = 18 cm */}
                        <text x="224" y="114" fill="#6ee7b7" fontSize="8" textAnchor="middle" fontFamily="sans-serif">18 cm</text>
                        {/* PR = 15 cm */}
                        <text x="251" y="52" fill="#6ee7b7" fontSize="8" fontFamily="sans-serif">15 cm</text>
                        <text x="229" y="68" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle" fontFamily="sans-serif">△PQR</text>

                        {/* Keterangan faktor skala */}
                        <text x="175" y="122" fill="rgba(250,204,21,0.7)" fontSize="7.5" fontFamily="sans-serif">Faktor skala k = 45/30 = 1,5× (setiap sisi PQR = 1,5 × sisi ABC)</text>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-red-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-3 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Hitung keliling △ABC:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="K_{ABC} = 8 + 12 + 10 = 30 \text{ cm}" />
                      </div>
                      <p><strong>Langkah 2:</strong> Faktor skala dari ABC ke PQR:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="k = \frac{K_{PQR}}{K_{ABC}} = \frac{45}{30} = \frac{3}{2}" />
                      </div>
                      <p><strong>Langkah 3:</strong> Hitung setiap sisi △PQR:</p>
                      <div className="bg-slate-900/50 rounded p-3 space-y-1">
                        <BlockMath math="PQ = \frac{3}{2} \times 8 = 12 \text{ cm}" />
                        <BlockMath math="QR = \frac{3}{2} \times 12 = 18 \text{ cm}" />
                        <BlockMath math="PR = \frac{3}{2} \times 10 = 15 \text{ cm}" />
                      </div>
                      <p><strong className="text-primary">PQ = 12 cm, QR = 18 cm, PR = 15 cm.</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CONTOH 4 & 5 — GRID BANGUN DATAR */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="contoh-grid" icon={<Calculator className="w-5 h-5" />} color="#22d3ee" label="📝 Contoh Soal — Kesebangunan pada Grid" />
            {true && (
              <div className="px-5 pb-5 space-y-6">
                {/* SEDANG — CONTOH 4 */}
                <div className="border-l-4 border-cyan-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-2 py-1 rounded">SEDANG</span>
                    <span className="font-body font-semibold text-white">Contoh 4</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">
                      Perhatikan dua bangun berundak pada grid berikut. Bangun ABCDEF dan PQRSTU sebangun.
                      Jika <InlineMath math="AB = 3" /> kotak dan <InlineMath math="PQ = 6" /> kotak,
                      tentukan panjang <InlineMath math="DE" /> dan <InlineMath math="ST" /> dalam satuan kotak!
                    </p>
                    <div className="flex justify-center rounded-lg overflow-hidden">
                      <GridBangunBerundak />
                    </div>
                  </div>
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-cyan-300 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Tentukan faktor skala dari bangun kecil ke bangun besar.</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="k = \frac{PQ}{AB} = \frac{6}{3} = 2" />
                      </div>
                      <p><strong>Langkah 2:</strong> Pada grid, panjang DE adalah 1 kotak. Sisi DE bersesuaian dengan ST.</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="ST = k \times DE = 2 \times 1 = 2 \text{ kotak}" />
                      </div>
                      <p><strong className="text-cyan-300">DE = 1 kotak dan ST = 2 kotak.</strong> Semua sisi yang bersesuaian memiliki perbandingan 1 : 2.</p>
                    </div>
                  </div>
                </div>
                {/* SULIT — CONTOH 5 */}
                <div className="border-l-4 border-rose-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-rose-500/20 text-rose-300 text-xs font-bold px-2 py-1 rounded">SULIT</span>
                    <span className="font-body font-semibold text-white">Contoh 5</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">
                      Bangun ABCDE dan PQRST memiliki bentuk yang sama seperti pada grid.
                      Diketahui <InlineMath math="DE = 8" /> kotak dan <InlineMath math="ST = 4" /> kotak.
                      Jika <InlineMath math="PQ = RS = 2" /> kotak, tentukan faktor skala dari PQRST ke ABCDE,
                      serta panjang <InlineMath math="AB" /> dan <InlineMath math="CD" /> dalam satuan kotak!
                    </p>
                    <div className="flex justify-center rounded-lg overflow-hidden">
                      <GridBangunMiring />
                    </div>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-rose-300 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Gunakan pasangan sisi tegak DE dan ST untuk mencari faktor skala.</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="k = \frac{DE}{ST} = \frac{8}{4} = 2" />
                      </div>
                      <p><strong>Langkah 2:</strong> Kalikan sisi-sisi bangun kecil dengan <InlineMath math="k = 2" />.</p>
                      <div className="bg-slate-900/50 rounded p-3 space-y-1">
                        <p><InlineMath math="AB = k \times PQ = 2 \times 2 = 4 \text{ kotak}" /></p>
                        <p><InlineMath math="CD = k \times RS = 2 \times 2 = 4 \text{ kotak}" /></p>
                      </div>
                      <p><strong className="text-rose-300">k = 2, AB = 4 kotak, dan CD = 4 kotak.</strong> Sisi miring juga ikut dikalikan 2, sehingga bentuk tetap sebangun.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SUB-BAB 2: KEKONGRUENAN */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="konsep2" icon={<Target className="w-5 h-5" />} color="#c084fc" label="📘 Sub-Bab 2: Definisi Kekongruenan" />
            {true && (
              <div className="px-5 pb-5 space-y-4">
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 space-y-3">
                  <p className="font-body text-sm font-semibold text-purple-300">🎯 Ringkasan Intisari</p>
                  <p className="font-body text-sm text-white/80 leading-relaxed">
                    <strong className="text-purple-300">Kekongruenan</strong> adalah "kesebangunan spesial" — dua bangun datar disebut <strong>kongruen</strong> jika memenuhi:
                  </p>
                  <div className="bg-slate-900/60 rounded-lg p-4 space-y-2 font-body text-sm text-white/80">
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold shrink-0">①</span>
                      <p><strong className="text-purple-300">Sudut-sudut yang bersesuaian sama besar</strong></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold shrink-0">②</span>
                      <p><strong className="text-purple-300">Rusuk-rusuk yang bersesuaian sama panjang</strong> (bukan hanya sebanding, tapi SAMA!)</p>
                    </div>
                  </div>
                  <div className="bg-slate-900/60 rounded-lg p-3 text-center">
                    <BlockMath math="AB = PQ,\; BC = QR,\; AC = PR" />
                    <p className="font-body text-xs text-white/50 mt-1">Simbol kongruen: ≅ (sama dan sebangun)</p>
                  </div>
                </div>
                <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-4">
                  <p className="font-body text-xs font-semibold text-slate-300 mb-3">🔍 ILUSTRASI DUA SEGITIGA KONGRUEN:</p>
                  <DiagramKongruen />
                </div>
                <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-4">
                  <p className="font-body text-xs font-semibold text-slate-300 mb-3">🔍 HUBUNGAN SEBANGUN DAN KONGRUEN:</p>
                  <DiagramHubungan />
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-yellow-200">
                    <strong>Kunci Hubungan:</strong> Bangun yang <strong className="text-purple-300">kongruen</strong> sudah pasti <strong className="text-green-300">sebangun</strong>, tapi bangun yang sebangun belum tentu kongruen (kecuali faktor skalanya <InlineMath math="k = 1" />).
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* CONTOH SOAL 2 */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="contoh2" icon={<Calculator className="w-5 h-5" />} color="#c084fc" label="📝 Contoh Soal — Kekongruenan Bangun Datar" />
            {true && (
              <div className="px-5 pb-5 space-y-6">
                {/* MUDAH */}
                <div className="border-l-4 border-green-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">MUDAH</span>
                    <span className="font-body font-semibold text-white">Contoh 1</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">Diketahui △ABC ≅ △PQR dengan <InlineMath math="AB = 12" /> cm, <InlineMath math="AC = 5" /> cm, dan <InlineMath math="\angle A = 90°" />. Tentukan panjang PQ, PR, dan QR!</p>
                    {/* Diagram dua segitiga siku-siku kongruen */}
                    <div className="flex justify-center">
                      <svg viewBox="0 0 340 110" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
                        {/* Segitiga ABC: sudut siku-siku di A */}
                        {/* A=(20,85), B=(20,25) AB=12→60px, C=(45,85) AC=5→25px */}
                        <polygon points="20,85 20,25 45,85" fill="rgba(52,211,153,0.12)" stroke="#34d399" strokeWidth="1.5"/>
                        {/* Tanda siku-siku di A */}
                        <polyline points="20,78 27,78 27,85" fill="none" stroke="#34d399" strokeWidth="1"/>
                        <circle cx="20" cy="85" r="2.5" fill="#34d399"/>
                        <circle cx="20" cy="25" r="2.5" fill="#34d399"/>
                        <circle cx="45" cy="85" r="2.5" fill="#34d399"/>
                        <text x="7"  y="89" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">A</text>
                        <text x="7"  y="23" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">B</text>
                        <text x="47" y="89" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">C</text>
                        {/* Label sisi */}
                        <text x="4"  y="58" fill="#a7f3d0" fontSize="8" fontFamily="sans-serif">12</text>
                        <text x="27" y="93" fill="#a7f3d0" fontSize="8" fontFamily="sans-serif">5</text>
                        <text x="38" y="52" fill="#a7f3d0" fontSize="8" fontFamily="sans-serif">13</text>
                        <text x="25" y="65" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="sans-serif">△ABC</text>

                        {/* Simbol ≅ */}
                        <text x="118" y="62" fill="#facc15" fontSize="16" textAnchor="middle" fontFamily="sans-serif">≅</text>

                        {/* Segitiga PQR: kongruen dengan ABC */}
                        <polygon points="175,85 175,25 200,85" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" strokeWidth="1.5"/>
                        {/* Tanda siku-siku di P */}
                        <polyline points="175,78 182,78 182,85" fill="none" stroke="#60a5fa" strokeWidth="1"/>
                        <circle cx="175" cy="85" r="2.5" fill="#60a5fa"/>
                        <circle cx="175" cy="25" r="2.5" fill="#60a5fa"/>
                        <circle cx="200" cy="85" r="2.5" fill="#60a5fa"/>
                        <text x="162" y="89" fill="#93c5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">P</text>
                        <text x="162" y="23" fill="#93c5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">Q</text>
                        <text x="202" y="89" fill="#93c5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">R</text>
                        <text x="158" y="58" fill="#bfdbfe" fontSize="8" fontFamily="sans-serif">12</text>
                        <text x="182" y="93" fill="#bfdbfe" fontSize="8" fontFamily="sans-serif">5</text>
                        <text x="193" y="52" fill="#bfdbfe" fontSize="8" fontFamily="sans-serif">13</text>
                        <text x="180" y="65" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="sans-serif">△PQR</text>

                        {/* Keterangan */}
                        <text x="20" y="105" fill="rgba(250,204,21,0.7)" fontSize="7.5" fontFamily="sans-serif">Kongruen → semua sisi & sudut bersesuaian SAMA. QR = √(12²+5²) = 13 cm</text>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-green-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p>Karena kongruen, sisi yang bersesuaian SAMA PANJANG:</p>
                      <div className="bg-slate-900/50 rounded p-3 space-y-1">
                        <p><InlineMath math="PQ = AB = 12 \text{ cm}" /></p>
                        <p><InlineMath math="PR = AC = 5 \text{ cm}" /></p>
                        <p><InlineMath math="\angle P = \angle A = 90°" /></p>
                      </div>
                      <p>Cari QR dengan Teorema Pythagoras:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="QR = \sqrt{PQ^2 + PR^2} = \sqrt{144 + 25} = \sqrt{169} = 13 \text{ cm}" />
                      </div>
                      <p><strong className="text-green-300">PQ = 12 cm, PR = 5 cm, QR = 13 cm.</strong></p>
                    </div>
                  </div>
                </div>
                {/* SEDANG */}
                <div className="border-l-4 border-yellow-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">SEDANG</span>
                    <span className="font-body font-semibold text-white">Contoh 2</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">Apakah pasangan berikut kongruen? Pentagon tak beraturan ABCDE dan PQRST memiliki ukuran sisi serta sudut bersesuaian yang sama. Bangun PQRST diputar 180° dari ABCDE. Jelaskan apakah perbedaan arah membuat keduanya tidak kongruen!</p>
                    <div className="flex justify-center">
                      <KongruenPentagonDiagram />
                    </div>
                  </div>
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-yellow-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Cek ukuran dan bentuk:</strong> Kedua pentagon memiliki sisi serta sudut bersesuaian yang sama.</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="k = \frac{\text{sisi PQRST}}{\text{sisi ABCDE}} = 1" />
                      </div>
                      <p><strong>Cek posisi:</strong> Rotasi 180° hanya mengubah arah dan posisi, tidak mengubah panjang sisi maupun besar sudut.</p>
                      <p><strong className="text-yellow-300">Kesimpulan: Kedua pentagon KONGRUEN ✓</strong> meskipun salah satunya tidak searah.</p>
                    </div>
                  </div>
                </div>
                {/* SULIT */}
                <div className="border-l-4 border-red-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded">SULIT</span>
                    <span className="font-body font-semibold text-white">Contoh 3</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">Dua bangun cekung segi-8 ABCDEFGH dan PQRSTUVW memiliki bentuk serta ukuran yang sama. Bangun PQRSTUVW merupakan cerminan horizontal dari ABCDEFGH. Apakah kedua bangun tersebut kongruen? Jelaskan mengapa posisi terbalik tidak mengubah jawabannya!</p>
                    <div className="flex justify-center">
                      <KongruenOctagonDiagram />
                    </div>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-red-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Cek jumlah sisi:</strong> Kedua bangun sama-sama merupakan segi-8 cekung, sehingga setiap titik dan sisi memiliki pasangan yang bersesuaian.</p>
                      <p><strong>Cek posisi:</strong> Pencerminan hanya membalik arah bangun; panjang sisi dan besar sudut tetap sama.</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <p className="text-sm text-white/80">Faktor skala tidak berubah:</p>
                        <BlockMath math="k = 1 \Rightarrow \text{sisi dan sudut bersesuaian tetap sama}" />
                      </div>
                      <p><strong className="text-primary">Kedua segi-8 cekung tersebut SEBANGUN dan KONGRUEN.</strong> Cermin tidak mengubah ukuran bangun.</p>
                      <p className="text-xs text-white/60">Catatan: Rotasi dan pencerminan adalah transformasi yang mempertahankan jarak dan sudut.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── RANGKUMAN, TIPS & TRIK, KESIMPULAN ── */}
          <div className="space-y-4">

            {/* Rangkuman */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-xl p-5 space-y-4">
              <p className="font-body text-base font-bold text-cyan-300">📋 Rangkuman — Definisi Kesebangunan &amp; Kekongruenan</p>
              <div className="overflow-x-auto">
                <table className="w-full font-body text-xs text-white/80">
                  <thead><tr className="border-b border-cyan-500/30">
                    <th className="text-left py-2 pr-3 text-cyan-300">Konsep</th>
                    <th className="text-left py-2 pr-3 text-cyan-300">Sudut</th>
                    <th className="text-left py-2 pr-3 text-cyan-300">Rusuk</th>
                    <th className="text-left py-2 pr-3 text-cyan-300">Faktor Skala</th>
                    <th className="text-left py-2 text-cyan-300">Simbol</th>
                  </tr></thead>
                  <tbody className="divide-y divide-slate-700">
                    <tr>
                      <td className="py-2 pr-3 text-green-300 font-semibold">Sebangun</td>
                      <td className="py-2 pr-3">Sama besar</td>
                      <td className="py-2 pr-3">Sebanding</td>
                      <td className="py-2 pr-3"><InlineMath math="k \neq 0" /> (bebas)</td>
                      <td className="py-2"><InlineMath math="\sim" /></td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 text-purple-300 font-semibold">Kongruen</td>
                      <td className="py-2 pr-3">Sama besar</td>
                      <td className="py-2 pr-3">Sama panjang</td>
                      <td className="py-2 pr-3"><InlineMath math="k = 1" /></td>
                      <td className="py-2"><InlineMath math="\cong" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-3 space-y-1 font-body text-xs text-white/75">
                <p>📌 <strong className="text-cyan-300">Hubungan penting:</strong> Kongruen ⊂ Sebangun (setiap bangun yang kongruen pasti sebangun, tetapi tidak sebaliknya)</p>
                <p>📌 Sebangun = "bentuk sama, ukuran bisa berbeda" &nbsp;|&nbsp; Kongruen = "bentuk sama, ukuran tepat sama"</p>
                <p>📌 Dua bangun sebangun jika: (1) semua sudut bersesuaian sama besar, DAN (2) semua rusuk bersesuaian sebanding dengan rasio <InlineMath math="k" /> yang konstan</p>
              </div>
            </div>

            {/* Tips & Trik */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 space-y-3">
              <p className="font-body text-base font-bold text-amber-300">💡 Tips &amp; Trik</p>
              <div className="space-y-3 font-body text-sm text-white/80">
                <div className="flex gap-3">
                  <span className="text-amber-400 font-bold shrink-0">①</span>
                  <p><strong className="text-amber-300">Cara cepat bedakan Sebangun vs Kongruen:</strong> Tanyakan "apakah ukurannya persis sama?" — jika YA → kongruen; jika TIDAK tapi bentuknya sama → sebangun.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-amber-400 font-bold shrink-0">②</span>
                  <p><strong className="text-amber-300">Hitung faktor skala k:</strong> Pilih sembarang pasang rusuk yang bersesuaian, lalu bagi: <InlineMath math="k = \frac{\text{rusuk besar}}{\text{rusuk kecil}}" />. Cek dengan pasangan lain — jika sama, berarti sebangun ✓</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-amber-400 font-bold shrink-0">③</span>
                  <p><strong className="text-amber-300">Perhatikan urutan penulisan:</strong> <InlineMath math="ABCD \sim PQRS" /> artinya A↔P, B↔Q, C↔R, D↔S. Urutan huruf menentukan pasangan sisi dan sudut!</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-amber-400 font-bold shrink-0">④</span>
                  <p><strong className="text-amber-300">Bangun beraturan sejenis selalu sebangun:</strong> Semua lingkaran sebangun, semua persegi sebangun, semua segitiga sama sisi sebangun — karena sudutnya selalu sama!</p>
                </div>
              </div>
            </div>

            {/* Kesimpulan */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 space-y-3">
              <p className="font-body text-base font-bold text-green-300">✅ Kesimpulan</p>
              <div className="space-y-2 font-body text-sm text-white/80">
                <p>Kesebangunan dan kekongruenan adalah dua konsep dasar dalam geometri yang mendeskripsikan <strong className="text-yellow-300">hubungan antara dua bangun datar</strong>.</p>
                <div className="bg-slate-900/60 rounded-lg p-3 space-y-1">
                  <p>🔹 <strong className="text-green-300">Sebangun (<InlineMath math="\sim" />)</strong> — "saudara kembar berbeda ukuran": bentuk sama, sudut sama, sisi sebanding</p>
                  <p>🔹 <strong className="text-purple-300">Kongruen (<InlineMath math="\cong" />)</strong> — "kembar identik": bentuk sama, sudut sama, sisi sama persis</p>
                  <p>🔹 Kongruen adalah kasus khusus sebangun dengan faktor skala <InlineMath math="k = 1" /></p>
                </div>
                <p className="text-xs text-white/55 italic">Konsep ini menjadi dasar untuk mempelajari segitiga sebangun, menghitung panjang rusuk, dan membuktikan sifat-sifat geometri lanjutan.</p>
              </div>
            </div>

          </div>

        </div>
        <div className="mt-8 text-center">
          <button onClick={() => { playPopSound(); navigate("/materi-matematika/kelas-9/kesebangunan-kekongruenan"); }} className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body">
            ← Kembali ke Kesebangunan dan Kekongruenan
          </button>
        </div>
      </div>
    </div>
  );
};
export default DefinisiPage;
