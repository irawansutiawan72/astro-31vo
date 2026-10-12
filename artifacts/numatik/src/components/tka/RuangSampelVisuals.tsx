const DiceValues = [1, 2, 3, 4, 5, 6];

export const CoinSidesVisual = () => (
  <div className="grid grid-cols-2 gap-3">
    {[
      { label: "A", name: "Angka", shade: "#fbbf24" },
      { label: "G", name: "Gambar", shade: "#38bdf8" },
    ].map((side) => (
      <div key={side.label} className="rounded-xl border border-current/10 bg-slate-500/10 p-3 text-center">
        <svg viewBox="0 0 100 100" role="img" aria-label={`Sisi ${side.name} pada uang koin`} className="mx-auto h-20 w-20">
          <circle cx="50" cy="50" r="43" fill={side.shade} opacity=".22" />
          <circle cx="50" cy="50" r="37" fill="none" stroke={side.shade} strokeWidth="5" />
          <circle cx="50" cy="50" r="29" fill="none" stroke={side.shade} strokeWidth="1.5" opacity=".75" />
          <text x="50" y="59" fill={side.shade} fontSize="30" fontWeight="800" textAnchor="middle">{side.label}</text>
        </svg>
        <p className="mt-1 text-sm font-bold">{side.label} · {side.name}</p>
      </div>
    ))}
  </div>
);

export const DieFaceVisual = () => (
  <div className="flex flex-wrap items-center justify-center gap-4">
    <svg viewBox="0 0 120 120" role="img" aria-label="Ilustrasi dadu dengan enam sisi titik" className="h-24 w-24 shrink-0">
      <rect x="8" y="8" width="104" height="104" rx="20" fill="#f8fafc" stroke="#22d3ee" strokeWidth="5" />
      {[ [34,34], [86,34], [34,60], [86,60], [34,86], [86,86] ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill="#0f172a" />
      ))}
    </svg>
    <div className="flex max-w-[210px] flex-wrap justify-center gap-2" aria-label="Enam kemungkinan mata dadu">
      {DiceValues.map((value) => (
        <span key={value} className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-400/10 text-sm font-bold">{value}</span>
      ))}
    </div>
  </div>
);

export const BridgeDeckVisual = () => (
  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
    {[
      { suit: "♠", name: "Sekop", color: "text-slate-500" },
      { suit: "♥", name: "Hati", color: "text-rose-500" },
      { suit: "♦", name: "Wajik", color: "text-rose-500" },
      { suit: "♣", name: "Keriting", color: "text-slate-500" },
    ].map(({ suit, name, color }) => (
      <div key={name} className="rounded-xl border border-current/15 bg-slate-500/10 p-3 text-center">
        <span className={`block text-3xl font-black ${color}`} aria-hidden="true">{suit}</span>
        <span className="mt-1 block text-xs font-bold">{name}</span>
        <span className="text-[11px] opacity-75">13 kartu</span>
      </div>
    ))}
  </div>
);

type TreeEdge = { x1: number; y1: number; x2: number; y2: number; label: string };

const createCoinTree = () => {
  const leaves = Array.from({ length: 8 }, (_, index) => 22 + index * 31);
  const edges: TreeEdge[] = [];
  const outcomes: { y: number; value: string }[] = [];
  const xAtDepth = [24, 99, 174, 249];

  const middleY = (start: number, end: number) => (leaves[start] + leaves[end - 1]) / 2;
  const visit = (prefix: string, start: number, end: number, parentY: number) => {
    if (prefix.length === 3) {
      outcomes.push({ y: parentY, value: prefix });
      return;
    }
    const middle = start + (end - start) / 2;
    for (const [label, childStart, childEnd] of [["A", start, middle], ["G", middle, end]] as const) {
      const childY = middleY(childStart, childEnd);
      const childX = xAtDepth[prefix.length + 1];
      edges.push({ x1: xAtDepth[prefix.length], y1: parentY, x2: childX, y2: childY, label });
      visit(prefix + label, childStart, childEnd, childY);
    }
  };

  visit("", 0, 8, middleY(0, 8));
  return { edges, outcomes };
};

export const ThreeCoinTreeVisual = () => {
  const { edges, outcomes } = createCoinTree();
  return (
    <div className="overflow-x-auto rounded-xl border border-current/15 bg-slate-500/5 p-2" tabIndex={0} aria-label="Diagram pohon hasil pengetosan tiga koin">
      <svg viewBox="0 0 350 280" role="img" aria-label="Diagram pohon tiga koin dengan hasil AAA, AAG, AGA, AGG, GAA, GAG, GGA, dan GGG" className="h-auto min-w-[340px] w-full">
        {edges.map((edge, index) => (
          <g key={index}>
            <line x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2} stroke="#64748b" strokeWidth="1.4" />
            <text x={(edge.x1 + edge.x2) / 2} y={(edge.y1 + edge.y2) / 2 - 4} fill={edge.label === "A" ? "#fbbf24" : "#38bdf8"} fontSize="9" fontWeight="700" textAnchor="middle">{edge.label}</text>
          </g>
        ))}
        <circle cx="24" cy="130.5" r="4" fill="#a78bfa" />
        {outcomes.map((outcome) => (
          <g key={outcome.value}>
            <circle cx="249" cy={outcome.y} r="3" fill="#34d399" />
            <text x="260" y={outcome.y + 4} fill="currentColor" fontSize="10" fontWeight="700">{outcome.value}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const tableClass = "w-full border-collapse text-center text-xs";
const headCellClass = "border border-slate-400/30 bg-cyan-500/15 px-2 py-2 font-bold";
const cellClass = "border border-slate-400/25 px-2 py-2";

export const TwoCoinTable = () => (
  <div className="overflow-x-auto rounded-xl border border-current/15" tabIndex={0} aria-label="Tabel hasil pengetosan dua koin">
    <table className={`${tableClass} min-w-[300px]`}>
      <caption className="sr-only">Tabel ruang sampel dua koin</caption>
      <thead><tr><th className={headCellClass}>Koin 1 \ Koin 2</th><th className={headCellClass}>A</th><th className={headCellClass}>G</th></tr></thead>
      <tbody>
        <tr><th scope="row" className={headCellClass}>A</th><td className={cellClass}>AA</td><td className={cellClass}>AG</td></tr>
        <tr><th scope="row" className={headCellClass}>G</th><td className={cellClass}>GA</td><td className={cellClass}>GG</td></tr>
      </tbody>
    </table>
  </div>
);

export const TwoDiceTable = () => (
  <div className="overflow-x-auto rounded-xl border border-current/15" tabIndex={0} aria-label="Tabel semua 36 pasangan hasil dua dadu; pasangan berjumlah 7 disorot">
    <table className={`${tableClass} min-w-[520px]`}>
      <caption className="sr-only">Ruang sampel pelemparan dua dadu; sel kuning berjumlah tujuh</caption>
      <thead>
        <tr><th className={headCellClass}>D1 \ D2</th>{DiceValues.map((value) => <th key={value} className={headCellClass}>{value}</th>)}</tr>
      </thead>
      <tbody>
        {DiceValues.map((d1) => (
          <tr key={d1}>
            <th scope="row" className={headCellClass}>{d1}</th>
            {DiceValues.map((d2) => {
              const isSeven = d1 + d2 === 7;
              return <td key={d2} className={`${cellClass} ${isSeven ? "bg-amber-300/30 font-black" : ""}`}>({d1},{d2})</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const CoinAndDieTable = () => (
  <div className="overflow-x-auto rounded-xl border border-current/15" tabIndex={0} aria-label="Tabel ruang sampel gabungan satu koin dan satu dadu">
    <table className={`${tableClass} min-w-[520px]`}>
      <caption className="sr-only">Dua kemungkinan sisi koin dikombinasikan dengan enam mata dadu</caption>
      <thead><tr><th className={headCellClass}>Koin \ Dadu</th>{DiceValues.map((value) => <th key={value} className={headCellClass}>{value}</th>)}</tr></thead>
      <tbody>
        {(["A", "G"] as const).map((coin) => (
          <tr key={coin}><th scope="row" className={headCellClass}>{coin}</th>{DiceValues.map((die) => <td key={die} className={cellClass}>({coin},{die})</td>)}</tr>
        ))}
      </tbody>
    </table>
  </div>
);
