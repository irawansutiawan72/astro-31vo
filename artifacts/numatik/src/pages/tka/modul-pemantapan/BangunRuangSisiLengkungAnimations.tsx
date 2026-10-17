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

export const BolaPasTabungAnimation = () => (
  <figure className={figureClassName}>
    <figcaption className="mb-2 text-center text-sm font-semibold text-slate-700">
      Bola tepat pas di dalam tabung
    </figcaption>
    <svg
      viewBox="0 0 480 310"
      role="img"
      aria-labelledby="brsl-q23-title brsl-q23-description"
      className="brsl-animated-diagram mx-auto block h-auto w-full"
    >
      <title id="brsl-q23-title">Bola tepat pas di dalam tabung</title>
      <desc id="brsl-q23-description">
        Bola berada pas di dalam tabung. Luas permukaan bola 616 sentimeter persegi dan pi sama dengan 22 per 7.
      </desc>
      <style>{`
        @keyframes brsl-q23-spin {
          to { transform: rotate(360deg); }
        }
        .brsl-q23-globe-lines {
          transform-box: fill-box;
          transform-origin: center;
          animation: brsl-q23-spin 10s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .brsl-q23-globe-lines { animation: none; }
        }
      `}</style>

      <text x="240" y="34" textAnchor="middle" fill="#334155" fontFamily="Arial, sans-serif" fontSize="15">
        Luas permukaan bola = 616 cm²
      </text>

      <circle cx="240" cy="150" r="70" fill="#fde68a" stroke="#92400e" strokeWidth="2.5" />
      <g className="brsl-q23-globe-lines" fill="none" stroke="#d97706" strokeWidth="2.5" opacity="0.85">
        <ellipse cx="240" cy="150" rx="70" ry="23" />
        <ellipse cx="240" cy="150" rx="28" ry="70" />
        <path d="M173 150c18-15 116-15 134 0M173 150c18 15 116 15 134 0" />
      </g>

      <g fill="none" stroke="#334155" strokeWidth="3">
        <ellipse cx="240" cy="80" rx="70" ry="17" fill="#ffffff" fillOpacity="0.28" />
        <path d="M170 80v140M310 80v140" />
        <path d="M170 220a70 17 0 0 0 140 0" />
        <path d="M170 220a70 17 0 0 1 140 0" strokeDasharray="5 5" opacity="0.5" />
        <path d="M355 80v140M349 80h12M349 220h12" strokeWidth="2" />
      </g>
      <g fill="#334155" fontFamily="Arial, sans-serif" fontSize="14">
        <text x="365" y="146" transform="rotate(-90 365 146)" textAnchor="middle">tinggi tabung</text>
        <text x="240" y="265" textAnchor="middle">Bola pas memenuhi diameter tabung</text>
        <text x="240" y="288" textAnchor="middle">π = 22/7</text>
      </g>
    </svg>
  </figure>
);

export const BakAirDikurasAnimation = () => (
  <figure className={figureClassName}>
    <figcaption className="mb-2 text-center text-sm font-semibold text-slate-700">
      Air di dalam bak tabung dialirkan melalui kran
    </figcaption>
    <svg
      viewBox="0 0 520 320"
      role="img"
      aria-labelledby="brsl-q24-title brsl-q24-description"
      className="brsl-animated-diagram mx-auto block h-auto w-full"
    >
      <title id="brsl-q24-title">Animasi bak air berbentuk tabung yang dikuras</title>
      <desc id="brsl-q24-description">
        Bak berdiameter 140 sentimeter dan tinggi 1 meter mula-mula penuh. Air keluar melalui kran dengan debit 20 liter per menit selama 60 menit.
      </desc>
      <defs>
        <clipPath id="brsl-q24-tank-clip">
          <path d="M145 80a105 20 0 0 1 210 0v164a105 20 0 0 1-210 0z" />
        </clipPath>
      </defs>
      <style>{`
        @keyframes brsl-q24-drain {
          0%, 12% { transform: scaleY(1); }
          76%, 88% { transform: scaleY(.22); }
          100% { transform: scaleY(1); }
        }
        @keyframes brsl-q24-drop {
          0%, 10% { transform: translateY(0); opacity: 0; }
          30% { opacity: 1; }
          90%, 100% { transform: translateY(26px); opacity: 0; }
        }
        .brsl-q24-water {
          transform-box: fill-box;
          transform-origin: center bottom;
          animation: brsl-q24-drain 8s ease-in-out infinite;
        }
        .brsl-q24-drop {
          animation: brsl-q24-drop 1.2s ease-in infinite;
        }
        .brsl-q24-drop-two { animation-delay: .4s; }
        .brsl-q24-drop-three { animation-delay: .8s; }
        @media (prefers-reduced-motion: reduce) {
          .brsl-q24-water, .brsl-q24-drop { animation: none; }
        }
      `}</style>

      <g clipPath="url(#brsl-q24-tank-clip)">
        <g className="brsl-q24-water">
          <rect x="145" y="80" width="210" height="164" fill="#38bdf8" opacity="0.84" />
          <ellipse cx="250" cy="80" rx="103" ry="18" fill="#7dd3fc" />
        </g>
      </g>

      <g fill="none" stroke="#334155" strokeWidth="3">
        <ellipse cx="250" cy="80" rx="105" ry="20" />
        <path d="M145 80v164M355 80v164" />
        <path d="M145 244a105 20 0 0 0 210 0" />
        <path d="M145 244a105 20 0 0 1 210 0" strokeDasharray="5 5" opacity="0.45" />
        <path d="M382 80v164M376 80h12M376 244h12" strokeWidth="2" />
        <path d="M355 116h34v10h-19v18h-10" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g fill="#334155" fontFamily="Arial, sans-serif" fontSize="14">
        <text x="250" y="35" textAnchor="middle">Debit 20 liter/menit · dialirkan 60 menit</text>
        <text x="404" y="168" transform="rotate(-90 404 168)" textAnchor="middle">tinggi 1 m</text>
        <text x="250" y="292" textAnchor="middle">diameter 140 cm</text>
        <text x="392" y="105" fontSize="12">kran</text>
      </g>
      <g fill="#0ea5e9">
        <circle className="brsl-q24-drop" cx="390" cy="143" r="4" />
        <circle className="brsl-q24-drop brsl-q24-drop-two" cx="390" cy="143" r="3.5" />
        <circle className="brsl-q24-drop brsl-q24-drop-three" cx="390" cy="143" r="3" />
      </g>
    </svg>
  </figure>
);

export const TigaBolaKeTabungAnimation = () => (
  <figure className={figureClassName}>
    <figcaption className="mb-2 text-center text-sm font-semibold text-slate-700">
      Tiga bola besi dimasukkan ke dalam tabung berisi air
    </figcaption>
    <svg
      viewBox="0 0 520 320"
      role="img"
      aria-labelledby="brsl-q24-balls-title brsl-q24-balls-description"
      className="brsl-animated-diagram mx-auto block h-auto w-full"
    >
      <title id="brsl-q24-balls-title">Air naik saat tiga bola besi masuk ke tabung</title>
      <desc id="brsl-q24-balls-description">
        Tabung berjari-jari 10 sentimeter dan tinggi 50 sentimeter berisi air setinggi tiga per lima tabung. Tiga bola besi berjari-jari 5 sentimeter dijatuhkan ke dalamnya.
      </desc>
      <defs>
        <clipPath id="brsl-q24-balls-tube-clip">
          <path d="M165 75a85 17 0 0 1 170 0v170a85 17 0 0 1-170 0z" />
        </clipPath>
        <marker id="brsl-q24-balls-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0L8 4L0 8Z" fill="#0284c7" />
        </marker>
      </defs>
      <style>{`
        @keyframes brsl-q24-balls-rise {
          0%, 12% { transform: scaleY(1); }
          56%, 84% { transform: scaleY(1.17); }
          100% { transform: scaleY(1); }
        }
        @keyframes brsl-q24-balls-fall {
          0%, 12% { transform: translateY(0); }
          52%, 84% { transform: translateY(168px); }
          100% { transform: translateY(0); }
        }
        .brsl-q24-balls-water {
          transform-box: fill-box;
          transform-origin: center bottom;
          animation: brsl-q24-balls-rise 7s ease-in-out infinite;
        }
        .brsl-q24-falling-ball {
          animation: brsl-q24-balls-fall 7s ease-in-out infinite;
        }
        .brsl-q24-falling-ball-two { animation-delay: .35s; }
        .brsl-q24-falling-ball-three { animation-delay: .7s; }
        @media (prefers-reduced-motion: reduce) {
          .brsl-q24-balls-water, .brsl-q24-falling-ball { animation: none; }
        }
      `}</style>

      <text x="250" y="35" textAnchor="middle" fill="#334155" fontFamily="Arial, sans-serif" fontSize="14">
        3 bola besi · masing-masing berjari-jari 5 cm
      </text>

      <g clipPath="url(#brsl-q24-balls-tube-clip)">
        <g className="brsl-q24-balls-water">
          <rect x="165" y="139" width="170" height="106" fill="#38bdf8" opacity="0.84" />
          <ellipse cx="250" cy="139" rx="83" ry="15" fill="#7dd3fc" />
        </g>
      </g>

      <g fill="#94a3b8" stroke="#334155" strokeWidth="2.5">
        <g className="brsl-q24-falling-ball">
          <circle cx="205" cy="50" r="19" />
          <ellipse cx="199" cy="44" rx="5" ry="8" fill="#e2e8f0" stroke="none" />
        </g>
        <g className="brsl-q24-falling-ball brsl-q24-falling-ball-two">
          <circle cx="250" cy="50" r="19" />
          <ellipse cx="244" cy="44" rx="5" ry="8" fill="#e2e8f0" stroke="none" />
        </g>
        <g className="brsl-q24-falling-ball brsl-q24-falling-ball-three">
          <circle cx="295" cy="50" r="19" />
          <ellipse cx="289" cy="44" rx="5" ry="8" fill="#e2e8f0" stroke="none" />
        </g>
      </g>

      <g fill="none" stroke="#334155" strokeWidth="3">
        <ellipse cx="250" cy="75" rx="85" ry="17" />
        <path d="M165 75v170M335 75v170" />
        <path d="M165 245a85 17 0 0 0 170 0" />
        <path d="M165 245a85 17 0 0 1 170 0" strokeDasharray="5 5" opacity="0.45" />
        <path d="M369 75v170M363 75h12M363 245h12" strokeWidth="2" />
        <path d="M391 189v-44" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#brsl-q24-balls-arrow)" />
      </g>
      <g fill="#334155" fontFamily="Arial, sans-serif" fontSize="13">
        <text x="393" y="172" transform="rotate(-90 393 172)" textAnchor="middle">tinggi 50 cm</text>
        <text x="250" y="286" textAnchor="middle">jari-jari tabung = 10 cm</text>
        <text x="406" y="131" fill="#0369a1">air naik</text>
        <text x="250" y="125" textAnchor="middle" fill="#075985">air awal = ⅗ tinggi tabung</text>
      </g>
    </svg>
  </figure>
);

export const WadahEsKrimKeCorongAnimation = () => (
  <figure className={figureClassName}>
    <figcaption className="mb-2 text-center text-sm font-semibold text-slate-700">
      Es krim dipindahkan dari wadah ke corong
    </figcaption>
    <svg
      viewBox="0 0 620 320"
      role="img"
      aria-labelledby="brsl-q28-title brsl-q28-description"
      className="brsl-animated-diagram mx-auto block h-auto w-full"
    >
      <title id="brsl-q28-title">Animasi wadah es krim dan corong kerucut</title>
      <desc id="brsl-q28-description">
        Wadah tabung berdiameter 0,2 meter dan tinggi 0,75 meter dituangkan ke corong kerucut berjari-jari 2,5 sentimeter dan tinggi 10 sentimeter.
      </desc>
      <defs>
        <clipPath id="brsl-q28-tub-clip">
          <path d="M70 74a52 15 0 0 1 104 0v158a52 15 0 0 1-104 0z" />
        </clipPath>
        <marker id="brsl-q28-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0L8 4L0 8Z" fill="#b45309" />
        </marker>
      </defs>
      <style>{`
        @keyframes brsl-q28-empty-tub {
          0%, 10% { transform: scaleY(1); }
          70%, 88% { transform: scaleY(.25); }
          100% { transform: scaleY(1); }
        }
        @keyframes brsl-q28-fill-cone {
          0%, 12% { transform: scaleY(.12); opacity: .55; }
          60%, 82% { transform: scaleY(.95); opacity: 1; }
          100% { transform: scaleY(.12); opacity: .55; }
        }
        .brsl-q28-tub-fill {
          transform-box: fill-box;
          transform-origin: center bottom;
          animation: brsl-q28-empty-tub 7s ease-in-out infinite;
        }
        .brsl-q28-cone-fill {
          transform-box: fill-box;
          transform-origin: center bottom;
          animation: brsl-q28-fill-cone 3.2s ease-in-out infinite;
        }
        .brsl-q28-cone-fill-two { animation-delay: .7s; }
        .brsl-q28-cone-fill-three { animation-delay: 1.4s; }
        @media (prefers-reduced-motion: reduce) {
          .brsl-q28-tub-fill, .brsl-q28-cone-fill { animation: none; }
        }
      `}</style>

      <g clipPath="url(#brsl-q28-tub-clip)">
        <g className="brsl-q28-tub-fill">
          <rect x="70" y="74" width="104" height="158" fill="#fde68a" opacity="0.92" />
          <ellipse cx="122" cy="74" rx="50" ry="13" fill="#fef3c7" />
        </g>
      </g>
      <g fill="none" stroke="#334155" strokeWidth="3">
        <ellipse cx="122" cy="74" rx="52" ry="15" />
        <path d="M70 74v158M174 74v158" />
        <path d="M70 232a52 15 0 0 0 104 0" />
      </g>
      <g fill="#334155" fontFamily="Arial, sans-serif" fontSize="13">
        <text x="122" y="49" textAnchor="middle">wadah tabung</text>
        <text x="122" y="272" textAnchor="middle">diameter 0,2 m</text>
        <text x="48" y="158" transform="rotate(-90 48 158)" textAnchor="middle">tinggi 0,75 m</text>
      </g>

      <path d="M191 122C220 95 240 95 269 122" fill="none" stroke="#b45309" strokeWidth="3" markerEnd="url(#brsl-q28-arrow)" />
      <text x="230" y="89" textAnchor="middle" fill="#334155" fontFamily="Arial, sans-serif" fontSize="12">es krim</text>

      {[320, 420, 520].map((cx, index) => {
        const fillClass = [
          "brsl-q28-cone-fill",
          "brsl-q28-cone-fill brsl-q28-cone-fill-two",
          "brsl-q28-cone-fill brsl-q28-cone-fill-three",
        ][index];
        return (
          <g key={cx}>
            <path className={fillClass} d={`M${cx - 25} 224L${cx} 142L${cx + 25} 224Z`} fill="#fde68a" />
            <path d={`M${cx - 25} 224L${cx} 142L${cx + 25} 224Z`} fill="none" stroke="#92400e" strokeWidth="2.5" />
            <ellipse cx={cx} cy="142" rx="25" ry="7" fill="#fff7ed" stroke="#92400e" strokeWidth="2" />
          </g>
        );
      })}
      <g fill="#334155" fontFamily="Arial, sans-serif" fontSize="13">
        <text x="420" y="267" textAnchor="middle">setiap corong: r = 2,5 cm · tinggi = 10 cm</text>
        <text x="420" y="290" textAnchor="middle">corong es krim berbentuk kerucut</text>
      </g>
    </svg>
  </figure>
);
