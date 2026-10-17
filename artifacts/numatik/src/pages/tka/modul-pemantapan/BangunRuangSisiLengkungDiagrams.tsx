const frameClass =
  "mx-auto my-3 w-full max-w-sm rounded-lg border border-border/40 bg-[#fffaf0] p-2";
const stroke = "#81502e";
const fill = "#fff1d1";
const accent = "#a76537";
const label = "#56351f";

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
