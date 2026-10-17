const frameClass =
  "mx-auto my-3 w-full max-w-sm rounded-lg border border-border/40 bg-[#fffaf0] p-2";
const stroke = "#81502e";
const fill = "#fff1d1";
const accent = "#a76537";
const label = "#56351f";

export const BolaTigaPerempatDiagram = () => (
  <svg viewBox="0 0 340 250" className={frameClass} role="img" aria-label="Ilustrasi bola padat dengan seperempat bagian dipotong, menyisakan tiga perempat bola berjari-jari 7 cm">
    <title>Bangun tiga perempat bola, jari-jari 7 cm</title>
    <defs>
      <radialGradient id="brslSphereGradient" cx="31%" cy="24%" r="76%">
        <stop offset="0%" stopColor="#fff4d0" />
        <stop offset="28%" stopColor="#f6d28b" />
        <stop offset="68%" stopColor="#db9148" />
        <stop offset="100%" stopColor="#81431f" />
      </radialGradient>
      <linearGradient id="brslSphereCutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff8e7" />
        <stop offset="58%" stopColor="#f0d8ae" />
        <stop offset="100%" stopColor="#c58e55" />
      </linearGradient>
    </defs>
    <ellipse cx="160" cy="203" rx="66" ry="11" fill="#56351f" opacity="0.16" />
    <circle cx="155" cy="112" r="78" fill="url(#brslSphereGradient)" stroke="#75401f" strokeWidth="2.5" />
    <path d="M101 61 C112 48 133 40 151 40" fill="none" stroke="#fff8e2" strokeWidth="5" strokeLinecap="round" opacity="0.62" />
    <path d="M77 112 C105 89 205 89 233 112" fill="none" stroke="#fff0c7" strokeWidth="1.8" strokeDasharray="5 5" opacity="0.72" />
    <path d="M77 112 C105 137 205 137 233 112" fill="none" stroke="#80451f" strokeWidth="2" opacity="0.7" />
    <path d="M155 112 L155 34 A78 78 0 0 1 233 112 Z" fill="url(#brslSphereCutGradient)" stroke="#75401f" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M155 112 L155 34" stroke="#fffaf0" strokeWidth="2.2" />
    <path d="M155 112 L233 112" stroke="#9b6436" strokeWidth="2.2" />
    <path d="M155 112 L210 167" stroke="#a76537" strokeWidth="2.5" />
    <circle cx="155" cy="112" r="4" fill="#75401f" stroke="#fff1d1" strokeWidth="1.5" />
    <text x="174" y="82" fill={label} fontSize="15" fontWeight="700">r = 7 cm</text>
    <text x="155" y="235" fill={label} fontSize="14" fontWeight="700" textAnchor="middle">Bola padat ¾ bagian</text>
  </svg>
);

export const TopiKerucutDiagram = () => (
  <svg viewBox="0 0 340 220" className={frameClass} role="img" aria-label="Dua topi berbentuk kerucut, diameter alas 21 cm dan garis pelukis 20 cm">
    <title>Dua topi kerucut tanpa alas</title>
    {[90, 245].map((cx) => (
      <g key={cx}>
        <path d={`M${cx - 47} 160 L${cx} 45 L${cx + 47} 160`} fill={fill} stroke={stroke} strokeWidth="3" />
        <path d={`M${cx - 47} 160 C${cx - 25} 178 ${cx + 25} 178 ${cx + 47} 160`} fill="none" stroke={stroke} strokeWidth="3" />
        <path d={`M${cx - 47} 160 C${cx - 25} 142 ${cx + 25} 142 ${cx + 47} 160`} fill="none" stroke={accent} strokeWidth="2" strokeDasharray="5 4" />
        <line x1={cx - 47} y1="192" x2={cx + 47} y2="192" stroke={accent} strokeWidth="1.8" />
        <line x1={cx - 47} y1="186" x2={cx - 47} y2="198" stroke={accent} strokeWidth="1.8" />
        <line x1={cx + 47} y1="186" x2={cx + 47} y2="198" stroke={accent} strokeWidth="1.8" />
        <text x={cx} y="211" fill={label} fontSize="12" fontWeight="700" textAnchor="middle">d = 21 cm</text>
        <text x={cx + 28} y="99" fill={label} fontSize="12" fontWeight="700">s = 20 cm</text>
      </g>
    ))}
  </svg>
);

export const TumpengKerucutDiagram = () => (
  <svg viewBox="0 0 320 230" className={frameClass} role="img" aria-label="Tumpeng berbentuk kerucut dengan diameter 28 cm dan tinggi 48 cm">
    <title>Tumpeng berbentuk kerucut</title>
    <path d="M160 28 L74 166 Q160 194 246 166 Z" fill={fill} stroke={stroke} strokeWidth="3" />
    <path d="M74 166 C104 145 216 145 246 166" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="6 5" />
    <path d="M74 166 C104 190 216 190 246 166" fill="none" stroke={stroke} strokeWidth="3" />
    <line x1="160" y1="28" x2="160" y2="166" stroke={accent} strokeWidth="2" strokeDasharray="6 5" />
    <line x1="160" y1="166" x2="74" y2="166" stroke={stroke} strokeWidth="2" />
    <text x="168" y="104" fill={label} fontSize="14" fontWeight="700">t = 48 cm</text>
    <text x="160" y="218" fill={label} fontSize="14" fontWeight="700" textAnchor="middle">d = 28 cm</text>
  </svg>
);

export const AtapSetengahBolaDiagram = () => (
  <svg viewBox="0 0 320 220" className={frameClass} role="img" aria-label="Atap berbentuk setengah bola dengan diameter 14 meter">
    <title>Atap setengah bola</title>
    <path d="M65 148 A95 95 0 0 1 255 148 Z" fill={fill} stroke={stroke} strokeWidth="3" />
    <path d="M65 148 C102 168 218 168 255 148" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="6 5" />
    <path d="M65 148 C102 128 218 128 255 148" fill="none" stroke={stroke} strokeWidth="3" />
    <line x1="65" y1="186" x2="255" y2="186" stroke={accent} strokeWidth="2" />
    <line x1="65" y1="178" x2="65" y2="194" stroke={accent} strokeWidth="2" />
    <line x1="255" y1="178" x2="255" y2="194" stroke={accent} strokeWidth="2" />
    <text x="160" y="211" fill={label} fontSize="14" fontWeight="700" textAnchor="middle">diameter = 14 m</text>
  </svg>
);

export const PerbandinganDrumTabungDiagram = () => (
  <svg viewBox="0 0 360 230" className={frameClass} role="img" aria-label="Perbandingan drum besar dan tabung kecil">
    <title>Drum besar dan tabung kecil</title>
    <g>
      <path d="M38 65 C38 48 102 48 102 65 L102 177 C102 195 38 195 38 177 Z" fill={fill} stroke={stroke} strokeWidth="3" />
      <ellipse cx="70" cy="65" rx="32" ry="10" fill={fill} stroke={stroke} strokeWidth="3" />
      <path d="M38 177 C38 161 102 161 102 177" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="5 4" />
      <text x="70" y="35" fill={label} fontSize="13" fontWeight="700" textAnchor="middle">Drum besar</text>
      <text x="70" y="216" fill={label} fontSize="11" textAnchor="middle">r = 70 cm, t = 100 cm</text>
    </g>
    <g>
      <path d="M211 107 C211 91 263 91 263 107 L263 177 C263 193 211 193 211 177 Z" fill={fill} stroke={stroke} strokeWidth="3" />
      <ellipse cx="237" cy="107" rx="26" ry="8" fill={fill} stroke={stroke} strokeWidth="3" />
      <path d="M211 177 C211 163 263 163 263 177" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="5 4" />
      <text x="237" y="78" fill={label} fontSize="13" fontWeight="700" textAnchor="middle">Tabung kecil</text>
      <text x="237" y="216" fill={label} fontSize="11" textAnchor="middle">r = 35 cm, t = 50 cm</text>
    </g>
    <path d="M130 118 H177" stroke={accent} strokeWidth="2.5" />
    <path d="M170 111 L178 118 L170 125" fill="none" stroke={accent} strokeWidth="2.5" />
  </svg>
);

export const JuringKerucutDiagram = () => (
  <svg viewBox="0 0 320 235" className={frameClass} role="img" aria-label="Juring lingkaran 216 derajat berjari-jari 15 cm untuk membentuk kerucut">
    <title>Juring lingkaran untuk membuat kerucut</title>
    <path d="M158 119 L158 28 A91 91 0 1 1 72 180 Z" fill={fill} stroke={stroke} strokeWidth="3" />
    <path d="M158 119 L158 28" stroke={accent} strokeWidth="2" />
    <path d="M158 119 L72 180" stroke={accent} strokeWidth="2" />
    <path d="M158 56 A63 63 0 1 1 98 160" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="6 5" />
    <circle cx="158" cy="119" r="4" fill={accent} />
    <text x="172" y="67" fill={label} fontSize="14" fontWeight="700">R = 15 cm</text>
    <text x="105" y="131" fill={label} fontSize="14" fontWeight="700">216°</text>
    <text x="160" y="219" fill={label} fontSize="13" fontWeight="700" textAnchor="middle">Juring karton pembentuk kerucut</text>
  </svg>
);
