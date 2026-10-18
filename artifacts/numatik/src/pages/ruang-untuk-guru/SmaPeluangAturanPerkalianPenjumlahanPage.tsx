import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, BookOpen, Check, Compass, Lightbulb, Sparkles } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const sections = [
  ["3.1.1", "Hasil, ruang sampel, dan titik contoh", "hasil-percobaan"],
  ["3.1.2", "Aturan perkalian", "aturan-perkalian"],
  ["3.1.3", "Aturan penjumlahan", "aturan-penjumlahan"],
];

function SectionHeading({ number, title, intro }: { number: string; title: string; intro: string }) {
  return (
    <div className="mb-5 flex gap-4" data-testid={`heading-${number}`}>
      <span className="grid h-10 w-12 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-display text-xs font-black text-cyan-100">{number}</span>
      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-slate-300">{intro}</p>
      </div>
    </div>
  );
}

function Example({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-orange-200/20 bg-[linear-gradient(140deg,rgba(106,45,35,.16),rgba(14,25,42,.92)_48%)]" data-testid={`example-${number}`}>
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-300/15 text-orange-200"><BookOpen className="h-4 w-4" aria-hidden="true" /></span>
        <div><p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">Contoh {number}</p><h3 className="font-display text-base font-bold text-white sm:text-lg">{title}</h3></div>
      </div>
      <div className="space-y-4 p-4 sm:p-5">{children}</div>
    </article>
  );
}

function DataTable({ caption, headers, rows }: { caption?: string; headers: ReactNode[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10" data-testid={caption ? `table-${caption.toLowerCase().replaceAll(" ", "-")}` : undefined}>
      <table className="w-full min-w-max border-collapse text-left text-xs sm:text-sm">
        {caption && <caption className="px-3 py-2 text-left font-bold text-cyan-100">{caption}</caption>}
        <thead><tr className="bg-cyan-300/[.1] text-cyan-50">{headers.map((header, index) => <th key={index} scope="col" className="border-b border-white/10 px-3 py-2 font-bold">{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, ri) => <tr key={ri} className={ri % 2 === 0 ? "bg-white/[.035]" : "bg-white/[.015]"}>{row.map((cell, ci) => <td key={ci} className="border-b border-white/[.06] px-3 py-2 text-slate-200">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Answer({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-emerald-200/15 bg-emerald-200/[.045] p-3 text-sm leading-relaxed text-emerald-50"><Check className="mr-2 inline h-4 w-4 text-emerald-200" aria-hidden="true" />{children}</p>;
}

function RouteSketch() {
  return (
    <svg viewBox="0 0 600 190" role="img" aria-label="Skema jalur eksplorasi: tiga jalur menuju Pos Sains, lalu dua jalur menuju garis finis" className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-2" data-testid="diagram-route-options">
      <defs><marker id="route-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="#66d9e8" /></marker></defs>
      <g fill="none" stroke="#66d9e8" strokeWidth="2.5" markerEnd="url(#route-arrow)">
        <path d="M105 95 Q200 25 300 74" /><path d="M105 95 L300 95" /><path d="M105 95 Q200 165 300 116" />
        <path d="M325 78 Q420 35 495 80" /><path d="M325 112 Q420 155 495 110" />
      </g>
      <g fill="#13243a" stroke="#f6bd60" strokeWidth="2"><circle cx="85" cy="95" r="27" /><circle cx="315" cy="95" r="27" /><circle cx="515" cy="95" r="27" /></g>
      <g fill="#fff4db" fontSize="13" fontFamily="sans-serif" textAnchor="middle"><text x="85" y="99">Mulai</text><text x="315" y="99">Pos Sains</text><text x="515" y="99">Finis</text></g>
      <g fill="#a8b8cf" fontSize="11" fontFamily="sans-serif"><text x="187" y="35">rute 1</text><text x="190" y="88">rute 2</text><text x="187" y="159">rute 3</text><text x="408" y="47">rute A</text><text x="408" y="148">rute B</text></g>
    </svg>
  );
}

function CoinIllustration() {
  return (
    <svg
      viewBox="0 0 132 106"
      role="img"
      aria-label="Ilustrasi koin dengan dua sisi, Gambar dan Angka"
      className="mx-auto h-24 w-32"
      data-testid="diagram-coin"
    >
      <ellipse cx="67" cy="88" rx="43" ry="8" fill="#020617" fillOpacity=".45" />
      <circle cx="66" cy="50" r="39" fill="#d99b36" stroke="#ffe3a3" strokeWidth="3" />
      <circle cx="66" cy="50" r="31" fill="#f4c66e" stroke="#a86720" strokeWidth="2" />
      <circle cx="66" cy="50" r="24" fill="none" stroke="#fff0c7" strokeOpacity=".7" strokeWidth="1.5" />
      <text x="66" y="47" textAnchor="middle" fill="#6d4218" fontSize="18" fontWeight="800" fontFamily="sans-serif">G / A</text>
      <text x="66" y="63" textAnchor="middle" fill="#6d4218" fontSize="9" fontWeight="700" fontFamily="sans-serif">DUA SISI</text>
    </svg>
  );
}

function CoinTossTree() {
  return (
    <svg
      viewBox="0 0 680 230"
      role="img"
      aria-label="Diagram pohon dua putaran spinner: hasil Biru atau Oranye pada putaran pertama bercabang lagi menjadi empat pasangan hasil"
      className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-2"
      data-testid="diagram-two-coin-tosses"
    >
      <g fill="none" stroke="#66d9e8" strokeWidth="2">
        <path d="M92 115L225 62" />
        <path d="M92 115L225 168" />
        <path d="M260 62L430 35" />
        <path d="M260 62L430 88" />
        <path d="M260 168L430 142" />
        <path d="M260 168L430 195" />
      </g>
      <g fill="#13243a" stroke="#f6bd60" strokeWidth="2">
        <circle cx="72" cy="115" r="22" />
        <circle cx="242" cy="62" r="20" />
        <circle cx="242" cy="168" r="20" />
      </g>
      <g fill="#fff4db" fontSize="13" fontFamily="sans-serif" textAnchor="middle">
        <text x="72" y="120">Mulai</text>
        <text x="242" y="67">B</text>
        <text x="242" y="173">O</text>
      </g>
      <g fill="#a8b8cf" fontSize="11" fontFamily="sans-serif" textAnchor="middle">
        <text x="153" y="76">putaran 1</text>
        <text x="153" y="160">putaran 1</text>
        <text x="345" y="41">B</text>
        <text x="345" y="86">O</text>
        <text x="345" y="149">B</text>
        <text x="345" y="192">O</text>
      </g>
      <g fill="#13243a" stroke="#8ce2b8" strokeWidth="2">
        <rect x="455" y="20" width="126" height="30" rx="12" />
        <rect x="455" y="73" width="126" height="30" rx="12" />
        <rect x="455" y="127" width="126" height="30" rx="12" />
        <rect x="455" y="180" width="126" height="30" rx="12" />
      </g>
      <g fill="#d8ffea" fontSize="12" fontFamily="sans-serif" fontWeight="700" textAnchor="middle">
        <text x="518" y="40">(B, B)</text>
        <text x="518" y="93">(B, O)</text>
        <text x="518" y="147">(O, B)</text>
        <text x="518" y="200">(O, O)</text>
      </g>
      <text x="625" y="117" fill="#a8b8cf" fontSize="10" fontFamily="sans-serif" textAnchor="middle">hasil</text>
    </svg>
  );
}

const SmaPeluangAturanPerkalianPenjumlahanPage = () => {
  const jumpTo = (id: string) => {
    playPopSound();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden gradient-space">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/peluang" />
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <header className="mx-auto mb-9 max-w-4xl text-center" data-testid="lesson-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/[.06] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100"><Sparkles className="h-3.5 w-3.5" />Peluang · Yuk berhitung!</div>
          <p className="font-display text-xs font-bold uppercase tracking-[.24em] text-orange-200">Bab 3.1</p>
          <h1 className="mt-2 font-display text-3xl font-black leading-tight tracking-tight text-primary text-glow-cyan sm:text-5xl">Aturan Perkalian dan Penjumlahan</h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-slate-300 sm:text-base">Siap menghitung banyak kemungkinan dengan cara yang lebih teratur? Yuk, kenali kapan pilihan membentuk rangkaian dan kapan kita sedang memilih satu alternatif—lalu temukan jawabannya tanpa mendaftar semuanya satu per satu.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {sections.map(([number, label, id]) => <button key={id} type="button" onClick={() => jumpTo(id)} data-testid={`jump-${id}`} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 font-body text-xs text-slate-200 transition-colors hover:border-cyan-200/40 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200/60">{number} · {label}</button>)}
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0 space-y-10">
            <section id="hasil-percobaan" data-testid="section-outcomes" className="scroll-mt-6">
              <SectionHeading number="3.1.1" title="Hasil percobaan, ruang sampel, dan titik contoh" intro="Yuk, mulai dari dasar! Setiap percobaan menghasilkan satu keluaran yang mungkin. Kumpulan semua keluaran yang mungkin disebut ruang sampel, sedangkan satu keluaran tertentu disebut titik contoh." />
              <div className="mb-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4"><p className="font-display text-sm font-bold text-cyan-100">Hasil percobaan</p><p className="mt-2 text-xs leading-relaxed text-slate-300">Keluaran yang benar-benar terjadi setelah suatu percobaan dilakukan.</p></div>
                <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4"><p className="font-display text-sm font-bold text-violet-100">Ruang sampel, S</p><p className="mt-2 text-xs leading-relaxed text-slate-300">Himpunan yang memuat seluruh hasil yang mungkin, ditulis dengan kurung kurawal.</p></div>
                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.05] p-4"><p className="font-display text-sm font-bold text-amber-100">Titik contoh</p><p className="mt-2 text-xs leading-relaxed text-slate-300">Satu anggota atau elemen di dalam ruang sampel.</p></div>
              </div>
              <Example number={1} title="Memasangkan nomor spinner dengan pin warna">
                <p className="text-sm leading-relaxed text-slate-300">Sebuah spinner memiliki empat sektor bernomor <span className="font-mono text-cyan-100">P = {"{1, 2, 3, 4}"}</span>. Setelah memutarnya, kita mengambil satu pin dari kotak yang berisi empat warna <span className="font-mono text-cyan-100">Q = {"{merah, hijau, biru, ungu}"}</span>. Hasil spinner tidak memengaruhi warna pin yang terambil, jadi setiap nomor bisa dipasangkan dengan warna apa pun. Kita mencatat hasilnya sebagai pasangan berurutan (nomor sektor, warna pin).</p>
                <DataTable caption="Semua pasangan hasil yang mungkin" headers={["Nomor sektor", "Pasangan hasil yang mungkin"]} rows={[
                  [1, "(1, merah), (1, hijau), (1, biru), (1, ungu)"],
                  [2, "(2, merah), (2, hijau), (2, biru), (2, ungu)"],
                  [3, "(3, merah), (3, hijau), (3, biru), (3, ungu)"],
                  [4, "(4, merah), (4, hijau), (4, biru), (4, ungu)"],
                ]} />
                <p className="text-sm leading-relaxed text-slate-300">Contohnya, <span className="font-mono text-cyan-100">(3, biru)</span> adalah satu titik contoh. Seluruh pasangan pada tabel membentuk ruang sampel <span className="font-mono text-cyan-100">S = P × Q</span>, sehingga <span className="font-mono text-cyan-100">n(S) = 4 × 4 = 16</span>. Notasi <span className="font-mono text-cyan-100">n(S)</span> menyatakan banyak anggota ruang sampel. Seru, ya—kita bisa menghitung semuanya dengan pasti tanpa menebak atau melewatkan pasangan!</p>
              </Example>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <CoinIllustration />
                  <h3 className="font-display font-bold text-white">Koin tunggal</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Kemungkinan hasilnya Gambar atau Angka. Jadi <span className="font-mono text-cyan-100">S = {"{G, A}"}</span>, titik contohnya G dan A, dan <span className="font-mono text-cyan-100">n(S) = 2</span>.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <h3 className="font-display font-bold text-white">Dadu bersisi enam</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300"><span className="font-mono text-cyan-100">S = {"{1, 2, 3, 4, 5, 6}"}</span>. Setiap angka merupakan titik contoh, sehingga <span className="font-mono text-cyan-100">n(S) = 6</span>.</p>
                </div>
              </div>
            </section>

            <section id="aturan-perkalian" data-testid="section-multiplication-rule" className="scroll-mt-6">
              <SectionHeading number="3.1.2" title="Aturan perkalian: satu pilihan, lalu pilihan berikutnya" intro="Asyik, sekarang kita susun pilihan bertahap! Jika setiap hasil tahap pertama dapat dipasangkan dengan setiap hasil tahap berikutnya, jumlah seluruh pasangan dihitung dengan perkalian." />
              <div className="mb-5 rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4">
                <p className="font-display font-bold text-cyan-100">Pasangan berurutan dan hasil kali Kartesius</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">Untuk himpunan <span className="font-mono text-cyan-100">P</span> dan <span className="font-mono text-cyan-100">Q</span>, hasil kali Kartesiusnya adalah <span className="font-mono text-cyan-100">P × Q = {"{(p,q) | p ∈ P dan q ∈ Q}"}</span>. Urutan penting: (p,q) berbeda dari (q,p) jika perannya berbeda.</p>
              </div>
              <Example number={2} title="Tabel pasangan dari dua pilihan">
                <p className="text-sm leading-relaxed text-slate-300">Misalkan tahap pertama memilih salah satu pola <span className="font-mono text-cyan-100">P = {"{B, L, S}"}</span> (bulat, garis, silang), lalu tahap kedua memilih warna <span className="font-mono text-cyan-100">Q = {"{J, K}"}</span> (jingga, krem). Setiap pola bisa dipasangkan dengan dua warna.</p>
                <DataTable caption="Tabel P × Q" headers={["Pola \\ Warna", "J (jingga)", "K (krem)"]} rows={[
                  ["B (bulat)", "(B,J)", "(B,K)"],
                  ["L (garis)", "(L,J)", "(L,K)"],
                  ["S (silang)", "(S,J)", "(S,K)"],
                ]} />
                <p className="text-sm leading-relaxed text-slate-300"><span className="font-mono text-cyan-100">P × Q = {"{(B,J), (B,K), (L,J), (L,K), (S,J), (S,K)}"}</span>. Jadi <span className="font-mono text-cyan-100">n(P × Q) = n(P) × n(Q) = 3 × 2 = 6</span>.</p>
              </Example>
              <div className="my-5 rounded-2xl border border-violet-200/15 bg-violet-200/[.045] p-4">
                <h3 className="font-display font-bold text-violet-100">Generalisasi untuk pilihan berurutan</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">Jika tahap 1 punya <span className="font-mono text-violet-100">r₁</span> cara, tahap 2 punya <span className="font-mono text-violet-100">r₂</span> cara untuk setiap hasil sebelumnya, dan seterusnya sampai tahap ke-k, banyak rangkaian adalah <span className="mt-2 block rounded-xl bg-[#071326]/80 p-3 text-center font-mono text-violet-100">r₁ × r₂ × r₃ × ⋯ × rₖ</span> Ini aturan perkalian. Pastikan jumlah pilihan pada setiap tahap sudah memperhitungkan batasan sebelumnya.</p>
              </div>
              <div className="space-y-5">
                <Example number={3} title="Menjelajahi jalur taman edukasi">
                  <p className="text-sm leading-relaxed text-slate-300">Dalam permainan jelajah taman, tersedia 3 jalur dari gerbang mulai menuju Pos Sains. Dari Pos Sains, ada 2 jalur untuk mencapai garis finis. Jika peserta wajib melewati Pos Sains, berapa rangkaian jalur berbeda yang bisa dipilih?</p>
                  <RouteSketch />
                  <p className="text-sm leading-relaxed text-slate-300">Untuk setiap satu dari 3 jalur menuju pos, ada 2 pilihan jalur lanjutan. Kita memilih satu ruas pada setiap tahap, jadi jumlah rangkaian jalur lengkap adalah <span className="font-mono text-cyan-100">3 × 2 = 6</span>.</p>
                  <Answer>Ada 6 rangkaian jalur berbeda. Tahapnya tersambung, maka kita mengalikan, bukan menjumlahkan. Mantap!</Answer>
                </Example>
                <Example number={4} title="Memilih favorit dan cadangan untuk pameran">
                  <p className="text-sm leading-relaxed text-slate-300">Panitia memiliki 8 rancangan poster berbeda. Mereka akan memilih satu rancangan sebagai favorit dan satu lagi sebagai cadangan. Rancangan yang sama tidak boleh dipilih dua kali. Berapa susunan pilihan favorit-cadangan yang mungkin?</p>
                  <p className="text-sm leading-relaxed text-slate-300">Pilihan favorit dapat dibuat dengan 8 cara. Setelah itu tersisa 7 rancangan untuk pilihan cadangan. Karena posisi favorit dan cadangan berbeda serta rancangan tidak boleh berulang: <span className="font-mono text-cyan-100">8 × 7 = 56</span>.</p>
                  <Answer>Ada 56 susunan. Rancangan Rani sebagai favorit dan Dito sebagai cadangan berbeda dari susunan sebaliknya. Urutannya penting!</Answer>
                </Example>
                <Example number={5} title="Memilih camilan dan minuman di bazar">
                  <p className="text-sm leading-relaxed text-slate-300">Di bazar kelas, Dira dapat memilih satu dari 5 jenis camilan dan satu dari 3 jenis minuman. Semua camilan bisa dipadukan dengan semua minuman. Ada berapa pasangan camilan-minuman?</p>
                  <DataTable headers={["Tahap", "Banyak pilihan"]} rows={[["Camilan", 5], ["Minuman untuk tiap camilan", 3], ["Pasangan lengkap", "5 × 3 = 15"]]} />
                  <Answer>Ada 15 pasangan camilan-minuman. Kita melengkapi dua tahap pilihan, jadi kalikan banyak pilihan pada setiap tahap. Asyik, kombinasi favoritmu bisa beragam!</Answer>
                </Example>
                <Example number={6} title="Menyusun urutan tiga aktivitas tanpa pengulangan">
                  <p className="text-sm leading-relaxed text-slate-300">Panitia hari olahraga menyiapkan 6 aktivitas berbeda. Mereka menyusun jadwal berisi 3 aktivitas yang berbeda: slot pembuka, slot tengah, dan slot penutup. Aktivitas yang sama tidak boleh diulang. Berapa urutan jadwal yang mungkin?</p>
                  <div className="grid grid-cols-3 gap-2 sm:max-w-md">
                    {["Pembuka: 6", "Tengah: 5", "Penutup: 4"].map((label) => <div key={label} className="rounded-xl border border-cyan-200/15 bg-cyan-200/[.05] p-3 text-center"><span className="block font-mono text-xs text-slate-400">{label.split(":")[0]}</span><strong className="font-display text-2xl text-cyan-100">{label.split(": ")[1]}</strong></div>)}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">Slot pembuka dapat diisi dengan 6 cara. Setelah satu aktivitas dipakai, tersisa 5 untuk slot tengah, lalu 4 untuk slot penutup. Maka <span className="font-mono text-cyan-100">6 × 5 × 4 = 120</span>.</p>
                  <Answer>Ada 120 susunan jadwal. Jika aktivitas boleh berulang, hitungannya akan berbeda, tetapi di sini setiap aktivitas hanya boleh muncul sekali. Cermat membaca syarat itu penting!</Answer>
                </Example>
              </div>
            </section>

            <section id="aturan-penjumlahan" data-testid="section-addition-rule" className="scroll-mt-6">
              <SectionHeading number="3.1.3" title="Aturan penjumlahan: memilih salah satu alternatif" intro="Sekarang giliran aturan penjumlahan! Jika kita memilih tepat satu dari beberapa jalur yang saling lepas (mutually exclusive)—tak ada hasil yang terhitung di dua jalur sekaligus—jumlah kemungkinan diperoleh dengan penjumlahan." />
              <div className="mb-5 grid gap-4 md:grid-cols-[1.15fr_.85fr]">
                <div className="rounded-2xl border border-orange-200/15 bg-orange-200/[.05] p-4">
                  <h3 className="font-display font-bold text-orange-100">Saling lepas, lalu tambahkan</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Jika bisa memilih opsi A <em>atau</em> opsi B, dan keduanya tidak mungkin terjadi bersamaan, banyak cara seluruhnya <span className="font-mono text-orange-100">m + n</span>. Dalam notasi himpunan, bila <span className="font-mono text-orange-100">A ∩ B = ∅</span>, maka <span className="font-mono text-orange-100">n(A ∪ B) = n(A) + n(B)</span>.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <h3 className="font-display font-bold text-white">Petunjuk singkat</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300"><strong className="text-orange-100">ATAU</strong> yang saling eksklusif → tambah. <strong className="text-cyan-100">DAN / lalu</strong> untuk menyelesaikan semua tahap → kali.</p>
                </div>
              </div>
              <div className="space-y-5">
                <Example number={7} title="Memilih satu tayangan untuk malam film">
                  <p className="text-sm leading-relaxed text-slate-300">Panitia malam film menyediakan 6 film dokumenter pendek dan 4 film animasi yang berbeda. Penonton hanya memilih satu film untuk ditonton, dan tak ada film yang tercatat dalam kedua kelompok. Berapa pilihan film yang tersedia?</p>
                  <p className="text-sm leading-relaxed text-slate-300">Penonton memilih satu film dokumenter <em>atau</em> satu film animasi. Karena kelompok filmnya terpisah dan hanya satu tayangan dipilih, dua alternatif ini saling lepas. Jadi <span className="font-mono text-orange-100">6 + 4 = 10</span>.</p>
                  <Answer>Ada 10 pilihan film. Kita menambahkan banyak cara dari dua alternatif yang tidak tumpang tindih. Beres!</Answer>
                </Example>
                <Example number={8} title="Mencatat hasil dua putaran spinner">
                  <p className="text-sm leading-relaxed text-slate-300">Spinner dua warna, biru (B) dan oranye (O), diputar dua kali. Untuk menulis hasil, urutan putaran pertama dan kedua diperhatikan. Yuk telusuri setiap cabangnya agar tidak ada kemungkinan yang tertinggal!</p>
                  <DataTable caption="Daftar lengkap ruang sampel" headers={["Putaran pertama", "Putaran kedua", "Hasil berurutan"]} rows={[
                    ["B", "B", "(B,B)"], ["B", "O", "(B,O)"], ["O", "B", "(O,B)"], ["O", "O", "(O,O)"],
                  ]} />
                  <CoinTossTree />
                  <p className="text-sm leading-relaxed text-slate-300"><span className="font-mono text-cyan-100">S = {"{(B,B), (B,O), (O,B), (O,O)}"}</span>. Jadi ada <span className="font-mono text-cyan-100">n(S) = 4</span> titik contoh. Dua hasil campuran, (B,O) dan (O,B), berbeda karena urutan putarannya berbeda. Tiap putaran memberi dua pilihan: <span className="font-mono text-cyan-100">2 × 2 = 4</span>.</p>
                  <Answer>Ruang sampelnya memiliki 4 hasil. Cara mendaftar atau memakai perkalian dua tahap menghasilkan hitungan yang sama. Semua cabang sudah terhitung—bagus!</Answer>
                </Example>
              </div>
            </section>

            <section data-testid="section-decision-guide" className="rounded-3xl border border-cyan-200/15 bg-[linear-gradient(145deg,rgba(25,75,95,.24),rgba(12,21,37,.88))] p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-200/10 text-cyan-100"><Lightbulb className="h-5 w-5" /></span><div><p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Ringkas, lalu teliti</p><h2 className="font-display text-xl font-extrabold text-white">Tambah atau kali?</h2></div></div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-orange-200/15 bg-orange-200/[.04] p-4"><p className="font-display font-bold text-orange-100">Tambah (+)</p><p className="mt-2 text-sm leading-relaxed text-slate-300">Pilih satu dari beberapa jalur yang saling lepas. Contoh: memilih satu film dokumenter atau film animasi.</p></div>
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.04] p-4"><p className="font-display font-bold text-cyan-100">Kali (×)</p><p className="mt-2 text-sm leading-relaxed text-slate-300">Lengkapi beberapa tahap, lalu gabungkan satu pilihan dari tiap tahap. Contoh: memilih camilan dan minuman.</p></div>
              </div>
              <p className="mt-4 rounded-xl bg-[#071326]/70 p-3 text-sm leading-relaxed text-slate-300">Sebelum menghitung, tanyakan: <strong className="text-white">“Apakah saya memilih satu alternatif, atau harus menuntaskan beberapa tahap?”</strong> Setelah itu cek apakah ada hasil yang berulang, dilarang, atau terhitung ganda.</p>
            </section>
          </div>

          <aside className="hidden lg:block" aria-label="Daftar bagian materi">
            <div className="sticky top-6 rounded-2xl border border-white/10 bg-[#0d1728]/90 p-4 backdrop-blur" data-testid="lesson-outline">
              <p className="mb-4 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-400">Peta materi</p>
              <ol className="space-y-3 font-body text-xs text-slate-300">
                {sections.map(([number, label, id]) => <li key={id}><button type="button" onClick={() => jumpTo(id)} data-testid={`outline-${id}`} className="flex w-full items-center gap-2 rounded-md text-left transition-colors hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"><span className="grid h-6 w-11 place-items-center rounded-md bg-white/[.06] text-[9px] font-bold text-cyan-100/80">{number}</span>{label}</button></li>)}
              </ol>
              <div className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-400"><span className="mb-2 flex items-center gap-2 font-bold text-amber-100"><Compass className="h-3.5 w-3.5" />Cek arah hitung</span>Satu dari beberapa jalur? Tambahkan jika saling lepas. Menjalani beberapa tahap? Kalikan banyak cara per tahap.<ArrowDown className="mt-3 h-4 w-4 text-cyan-200" /></div>
            </div>
          </aside>
        </div>
        <div className="mt-9 text-center text-xs text-slate-400">Nah, sekarang kamu siap memilih aturan yang tepat. Semangat terus mengeksplorasi peluang!</div>
      </main>
    </div>
  );
};

export default SmaPeluangAturanPerkalianPenjumlahanPage;
