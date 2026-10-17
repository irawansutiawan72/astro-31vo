const frameClass =
  "mx-auto my-3 w-full max-w-sm rounded-lg border border-border/40 bg-[#fffaf0] p-2";
const stroke = "#81502e";
const fill = "#fff1d1";
const accent = "#a76537";
const label = "#56351f";

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
      <path d="M211 107 L211 177 C211 193 263 193 263 177 L263 107 Z" fill={fill} stroke={stroke} strokeWidth="3" />
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
    <path d="M160 112 L184 38 A78 78 0 1 0 184 186 Z" fill={fill} stroke={stroke} strokeWidth="3" />
    <path d="M160 112 L184 38" stroke={accent} strokeWidth="2" />
    <path d="M160 112 L184 186" stroke={accent} strokeWidth="2" />
    <circle cx="160" cy="112" r="4" fill={accent} />
    <text x="108" y="78" fill={label} fontSize="14" fontWeight="700" textAnchor="middle">R = 15 cm</text>
    <text x="103" y="118" fill={label} fontSize="14" fontWeight="700" textAnchor="middle">216°</text>
    <text x="160" y="219" fill={label} fontSize="13" fontWeight="700" textAnchor="middle">Juring karton pembentuk kerucut</text>
  </svg>
);
