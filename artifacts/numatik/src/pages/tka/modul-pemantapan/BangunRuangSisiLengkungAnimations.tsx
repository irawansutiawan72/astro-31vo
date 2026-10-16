const figureClassName =
  "mx-auto my-3 w-full max-w-xl rounded-xl border border-slate-200 bg-white p-3";

export const TornAirAnimation = () => (
  <figure className={figureClassName}>
    <figcaption className="mb-2 text-center text-sm font-semibold text-slate-700">
      Pengisian torn berbentuk tabung
    </figcaption>
    <svg
      viewBox="0 0 480 330"
      role="img"
      aria-labelledby="brsl-q42-title brsl-q42-description"
      className="brsl-animated-diagram mx-auto block h-auto w-full"
    >
      <title id="brsl-q42-title">Animasi pengisian torn air</title>
      <desc id="brsl-q42-description">
        Air mengalir ke torn berbentuk tabung. Diameter torn 2 meter, tinggi 10 meter, dan debit air 200 liter per menit.
      </desc>
      <defs>
        <clipPath id="brsl-q42-tank-clip">
          <path d="M132 72 A98 18 0 0 1 328 72 V238 A98 18 0 0 1 132 238 Z" />
        </clipPath>
      </defs>

      <text x="28" y="63" fill="#334155" fontFamily="Arial, sans-serif" fontSize="14">
        Debit 200 L/menit
      </text>
      <path d="M230 20v36" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
      <circle cx="230" cy="44" r="4" fill="#38bdf8">
        <animate attributeName="cy" values="38;58;38" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="218" cy="48" r="3" fill="#38bdf8">
        <animate attributeName="cy" values="42;60;42" dur="1.4s" begin="0.35s" repeatCount="indefinite" />
      </circle>
      <circle cx="242" cy="47" r="3" fill="#38bdf8">
        <animate attributeName="cy" values="41;59;41" dur="1.3s" begin="0.7s" repeatCount="indefinite" />
      </circle>

      <g clipPath="url(#brsl-q42-tank-clip)">
        <rect x="132" y="90" width="196" height="166" fill="#38bdf8" opacity="0.82">
          <animate
            attributeName="y"
            values="232;232;90;90;232"
            keyTimes="0;0.1;0.72;0.9;1"
            dur="8s"
            repeatCount="indefinite"
          />
        </rect>
        <ellipse cx="230" cy="90" rx="96" ry="13" fill="#7dd3fc" opacity="0.95">
          <animate
            attributeName="cy"
            values="232;232;90;90;232"
            keyTimes="0;0.1;0.72;0.9;1"
            dur="8s"
            repeatCount="indefinite"
          />
        </ellipse>
      </g>

      <g fill="none" stroke="#334155" strokeWidth="3">
        <ellipse cx="230" cy="72" rx="100" ry="18" />
        <path d="M130 72v166M330 72v166" />
        <path d="M130 238a100 18 0 0 0 200 0" />
        <path d="M378 72v166M372 72h12M372 238h12" strokeWidth="2" />
        <path d="M130 278h200M130 272v12M330 272v12" strokeWidth="2" />
      </g>
      <g fill="#334155" fontFamily="Arial, sans-serif" fontSize="14" textAnchor="middle">
        <text x="398" y="158" transform="rotate(-90 398 158)">tinggi 10 m</text>
        <text x="230" y="302">diameter 2 m</text>
      </g>
    </svg>
  </figure>
);

export const BolaDalamTabungAnimation = () => (
  <figure className={figureClassName}>
    <figcaption className="mb-2 text-center text-sm font-semibold text-slate-700">
      Bola logam menaikkan permukaan air di dalam tabung
    </figcaption>
    <svg
      viewBox="0 0 480 320"
      role="img"
      aria-labelledby="brsl-q43-title brsl-q43-description"
      className="brsl-animated-diagram mx-auto block h-auto w-full"
    >
      <title id="brsl-q43-title">Bola logam dimasukkan ke dalam tabung berisi air</title>
      <desc id="brsl-q43-description">
        Bola berdiameter 3 cm jatuh ke dalam tabung berdiameter 5 cm dan mendorong permukaan air naik.
      </desc>
      <defs>
        <clipPath id="brsl-q43-tube-clip">
          <path d="M172 62a48 12 0 0 1 96 0v171a48 12 0 0 1-96 0z" />
        </clipPath>
      </defs>

      <text x="32" y="83" fill="#334155" fontFamily="Arial, sans-serif" fontSize="14">
        Bola logam
      </text>
      <text x="32" y="104" fill="#334155" fontFamily="Arial, sans-serif" fontSize="14">
        diameter 3 cm
      </text>

      <g clipPath="url(#brsl-q43-tube-clip)">
        <rect x="172" y="155.6" width="96" height="77.4" fill="#38bdf8" opacity="0.82">
          <animate
            attributeName="y"
            values="170;170;155.6;155.6;170"
            keyTimes="0;0.15;0.55;0.8;1"
            dur="7s"
            repeatCount="indefinite"
          />
        </rect>
        <ellipse cx="220" cy="155.6" rx="47" ry="10" fill="#7dd3fc">
          <animate
            attributeName="cy"
            values="170;170;155.6;155.6;170"
            keyTimes="0;0.15;0.55;0.8;1"
            dur="7s"
            repeatCount="indefinite"
          />
        </ellipse>
      </g>

      <line x1="174" y1="170" x2="266" y2="170" stroke="#e0f2fe" strokeWidth="2" strokeDasharray="5 5" />
      <circle cx="220" cy="203" r="30" fill="#94a3b8" stroke="#334155" strokeWidth="2">
        <animate
          attributeName="cy"
          values="20;20;203;203;20"
          keyTimes="0;0.12;0.55;0.8;1"
          dur="7s"
          repeatCount="indefinite"
        />
      </circle>
      <ellipse cx="211" cy="194" rx="7" ry="13" fill="#e2e8f0" opacity="0.8">
        <animate
          attributeName="cy"
          values="-9; -9;174;174;-9"
          keyTimes="0;0.12;0.55;0.8;1"
          dur="7s"
          repeatCount="indefinite"
        />
      </ellipse>

      <g fill="none" stroke="#334155" strokeWidth="3">
        <ellipse cx="220" cy="62" rx="50" ry="13" />
        <path d="M170 62v171M270 62v171" />
        <path d="M170 233a50 12 0 0 0 100 0" />
        <path d="M170 270h100M170 264v12M270 264v12" strokeWidth="2" />
        <path d="M290 155.6v14.4M285 155.6h10M285 170h10" strokeWidth="2" />
      </g>
      <g fill="#334155" fontFamily="Arial, sans-serif" fontSize="13">
        <text x="302" y="166">air naik</text>
        <text x="220" y="292" textAnchor="middle">diameter tabung 5 cm</text>
      </g>
    </svg>
  </figure>
);

export const LilinTerbakarAnimation = () => (
  <figure className={figureClassName}>
    <figcaption className="mb-2 text-center text-sm font-semibold text-slate-700">
      Lilin berkurang saat terbakar
    </figcaption>
    <svg
      viewBox="0 0 480 310"
      role="img"
      aria-labelledby="brsl-q44-title brsl-q44-description"
      className="brsl-animated-diagram mx-auto block h-auto w-full"
    >
      <title id="brsl-q44-title">Animasi lilin tabung yang terbakar</title>
      <desc id="brsl-q44-description">
        Lilin berbentuk tabung dengan diameter 2,8 cm dan tinggi 15 cm terbakar dengan laju 1,68 sentimeter kubik per menit.
      </desc>

      <rect x="180" y="76" width="30" height="160" rx="2" fill="#f5d28a" stroke="#92400e" strokeWidth="2">
        <animate
          attributeName="y"
          values="76;76;236;236;76"
          keyTimes="0;0.12;0.86;0.94;1"
          dur="8s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          values="160;160;0;0;160"
          keyTimes="0;0.12;0.86;0.94;1"
          dur="8s"
          repeatCount="indefinite"
        />
      </rect>
      <ellipse cx="195" cy="76" rx="15" ry="5" fill="#fde68a" stroke="#92400e" strokeWidth="2">
        <animate
          attributeName="cy"
          values="76;76;236;236;76"
          keyTimes="0;0.12;0.86;0.94;1"
          dur="8s"
          repeatCount="indefinite"
        />
      </ellipse>
      <ellipse cx="195" cy="236" rx="15" ry="5" fill="#f5d28a" stroke="#92400e" strokeWidth="2" />

      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0;0 0;0 160;0 160;0 0"
          keyTimes="0;0.12;0.86;0.94;1"
          dur="8s"
          repeatCount="indefinite"
        />
        <path d="M195 36c-16 18-12 31 0 34 12-3 16-16 0-34z" fill="#f97316">
          <animate attributeName="opacity" values="0.8;1;0.75;1;0.8" dur="0.8s" repeatCount="indefinite" />
        </path>
        <path d="M195 48c-7 9-5 15 0 17 5-2 7-8 0-17z" fill="#fde047" />
      </g>

      <g fill="none" stroke="#334155" strokeWidth="2">
        <path d="M150 76v160M145 76h10M145 236h10" />
        <path d="M180 270h30M180 265v10M210 265v10" />
      </g>
      <g fill="#334155" fontFamily="Arial, sans-serif" fontSize="13">
        <text x="137" y="162" textAnchor="middle" transform="rotate(-90 137 162)">tinggi 15 cm</text>
        <text x="195" y="291" textAnchor="middle">diameter 2,8 cm</text>
        <text x="260" y="115">Terbakar 1,68 cm³/menit</text>
        <text x="260" y="140">Lilin tabung menyusut dari atas</text>
      </g>
    </svg>
  </figure>
);
