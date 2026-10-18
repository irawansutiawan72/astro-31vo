import type { ReactNode } from "react";
import { ArrowDown, BookOpen, Check, Compass, Lightbulb, Sparkles } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const sections = [
  ["A", "Faktorial: fondasi menghitung", "faktorial"],
  ["B", "Semua unsur disusun", "semua-unsur"],
  ["C", "Sebagian unsur disusun", "sebagian-unsur"],
  ["D", "Ada unsur yang sama", "unsur-sama"],
  ["E", "Susunan melingkar", "melingkar"],
] as const;

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

function Answer({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-emerald-200/15 bg-emerald-200/[.045] p-3 text-sm leading-relaxed text-emerald-50"><Check className="mr-2 inline h-4 w-4 text-emerald-200" aria-hidden="true" />{children}</p>;
}

function Formula({ children, label }: { children: ReactNode; label?: string }) {
  return <div data-testid={label ? `formula-${label}` : undefined} className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/80 px-4 py-3 text-center font-mono text-sm leading-7 text-cyan-100 sm:text-base">{children}</div>;
}

function SlotDiagram() {
  const slots = ["n", "n − 1", "n − 2", "…", "n − r + 1"];
  return (
    <div className="rounded-2xl border border-white/10 bg-[#091426] p-4" data-testid="diagram-permutation-slots">
      <p className="mb-3 text-center font-display text-sm font-bold text-cyan-100">Isi posisi satu demi satu: pilihan makin berkurang</p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {slots.map((slot, index) => <span key={`${slot}-${index}`} className="flex items-center gap-2">
          <span className="grid min-h-12 min-w-14 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] px-3 font-mono font-bold text-white" aria-label={`posisi ${index + 1}: ${slot} pilihan`}>{slot}</span>
          {index < slots.length - 1 && <span className="font-mono text-orange-200" aria-hidden="true">×</span>}
        </span>)}
      </div>
      <p className="mt-3 text-center text-xs leading-relaxed text-slate-300">Ada <span className="font-mono text-cyan-100">r</span> posisi, sehingga banyak susunan adalah hasil kali <span className="font-mono text-cyan-100">r</span> faktor pertama yang menurun dari <span className="font-mono text-cyan-100">n</span>.</p>
    </div>
  );
}

function TwoFromThreeTree() {
  return (
    <svg viewBox="0 0 660 250" role="img" aria-label="Diagram pohon enam susunan dua huruf berbeda dari A, B, dan C: AB, AC, BA, BC, CA, dan CB" className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-2" data-testid="diagram-two-from-three">
      <g stroke="#66d9e8" strokeWidth="2">
        <path d="M65 125H150M150 45L365 51M150 45L365 81M150 125L365 131M150 125L365 161M150 205L365 211M150 205L365 241" />
      </g>
      <g fill="#13243a" stroke="#f6bd60" strokeWidth="2">
        <circle cx="65" cy="125" r="26" />
        <circle cx="150" cy="45" r="21" /><circle cx="150" cy="125" r="21" /><circle cx="150" cy="205" r="21" />
      </g>
      <g fill="#fff4db" fontSize="15" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">
        <text x="65" y="130">Mulai</text>
        <text x="150" y="50">A</text><text x="150" y="130">B</text><text x="150" y="210">C</text>
        <text x="405" y="51">AB</text><text x="405" y="81">AC</text><text x="405" y="131">BA</text><text x="405" y="161">BC</text><text x="405" y="211">CA</text><text x="405" y="241">CB</text>
      </g>
      <g fill="#a8b8cf" fontSize="12" fontFamily="sans-serif">
        <text x="92" y="28">pilih huruf pertama</text><text x="273" y="25">pilih huruf kedua yang tersisa</text>
      </g>
      <g fill="#8ce2b8" fontSize="13" fontWeight="700" fontFamily="sans-serif">
        <text x="500" y="105">3 × 2</text><text x="500" y="130">= 6 susunan</text>
      </g>
    </svg>
  );
}

function CircularDiagram() {
  return (
    <svg viewBox="0 0 420 300" role="img" aria-label="Lima kursi mengelilingi meja bundar. Satu orang dijadikan patokan agar putaran yang sama tidak dihitung berkali-kali." className="mx-auto h-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#091426] p-3" data-testid="diagram-circular-permutation">
      <circle cx="210" cy="146" r="84" fill="#13243a" stroke="#66d9e8" strokeWidth="2" />
      <path d="M210 38A108 108 0 0 1 317 139" fill="none" stroke="#f6bd60" strokeWidth="3" strokeLinecap="round" />
      <path d="m309 128 9 12 4-15" fill="#f6bd60" />
      <g fill="#0b1729" stroke="#f6bd60" strokeWidth="2">
        <circle cx="210" cy="53" r="24" /><circle cx="299" cy="118" r="24" /><circle cx="265" cy="222" r="24" /><circle cx="155" cy="222" r="24" /><circle cx="121" cy="118" r="24" />
      </g>
      <g fill="#fff4db" fontSize="16" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">
        <text x="210" y="59">A</text><text x="299" y="124">B</text><text x="265" y="228">C</text><text x="155" y="228">D</text><text x="121" y="124">E</text>
      </g>
      <text x="210" y="151" fill="#a8b8cf" fontSize="13" fontFamily="sans-serif" textAnchor="middle">meja bundar</text>
      <text x="210" y="284" fill="#8ce2b8" fontSize="13" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">ABCDE dan BCDEA adalah putaran yang sama</text>
    </svg>
  );
}

const allFourPermutations = [
  ["W", "WXYZ · WXZY · WYXZ · WYZX · WZXY · WZYX"],
  ["X", "XWYZ · XWZY · XYWZ · XYZW · XZWY · XZYW"],
  ["Y", "YWXZ · YWZX · YXWZ · YXZW · YZWX · YZXW"],
  ["Z", "ZWXY · ZWYX · ZXWY · ZXYW · ZYWX · ZYXW"],
];

function Deepening({ title, question, calculation, answer }: { title: string; question: string; calculation: string; answer: string }) {
  return (
    <aside className="rounded-3xl border border-violet-200/20 bg-[linear-gradient(145deg,rgba(76,56,120,.18),rgba(12,21,37,.9))] p-5" data-testid={`challenge-${title.toLowerCase().replaceAll(" ", "-")}`}>
      <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-200/10 text-violet-100"><Lightbulb className="h-4 w-4" aria-hidden="true" /></span><h3 className="font-display font-bold text-violet-100">{title}</h3></div>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{question}</p>
      <p className="mt-3 overflow-x-auto rounded-xl bg-[#071326]/75 p-3 font-mono text-sm leading-6 text-cyan-100">{calculation}</p>
      <p className="mt-3 text-sm leading-relaxed text-emerald-100"><Check className="mr-2 inline h-4 w-4" aria-hidden="true" />{answer}</p>
    </aside>
  );
}

const SmaPeluangPermutasiPage = () => {
  const jumpTo = (id: string) => {
    playPopSound();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden gradient-space">
      <PageNavigation
        prevPath="/ruang-untuk-guru/sma/buku-animasi/peluang"
        nextPath="/ruang-untuk-guru/sma/buku-animasi/peluang/kombinasi"
      />
      <Starfield />
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <header className="mx-auto mb-9 max-w-4xl text-center" data-testid="lesson-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/[.06] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" />Peluang · Susun dengan cermat</div>
          <h1 className="mt-2 font-display text-3xl font-black leading-tight tracking-tight text-primary text-glow-cyan sm:text-5xl">Permutasi</h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-slate-300 sm:text-base">Siap menyusun banyak kemungkinan? Permutasi membantu kita menghitung susunan ketika posisi itu penting—mulai dari kode, susunan pengurus, sampai tempat duduk melingkar. Yuk, kita urai satu langkah demi satu langkah!</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {sections.map(([number, label, id]) => <button key={id} type="button" onClick={() => jumpTo(id)} data-testid={`jump-${id}`} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 font-body text-xs text-slate-200 transition-colors hover:border-cyan-200/40 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200/60">{number} · {label}</button>)}
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0 space-y-10">
            <section id="faktorial" data-testid="section-factorial" className="scroll-mt-6">
              <SectionHeading number="A" title="Faktorial: fondasi menghitung" intro="Bayangkan ada beberapa kartu berbeda dan kita ingin menatanya berjajar. Posisi pertama punya banyak pilihan, posisi berikutnya satu pilihan lebih sedikit, dan begitu seterusnya. Perkalian menurun inilah yang diringkas dengan tanda faktorial (!)." />
              <div className="grid gap-4 md:grid-cols-[1.05fr_.95fr]">
                <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[.05] p-5">
                  <h3 className="font-display font-bold text-cyan-100">Apa arti tanda seru setelah bilangan?</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">Untuk bilangan bulat positif <span className="font-mono text-cyan-100">n</span>, faktorial <span className="font-mono text-cyan-100">n!</span> adalah hasil kali semua bilangan bulat positif dari <span className="font-mono text-cyan-100">n</span> turun hingga 1.</p>
                  <Formula label="factorial-definition">n! = n × (n − 1) × (n − 2) × ··· × 3 × 2 × 1</Formula>
                  <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-[#071326]/70 p-4 text-sm leading-6 text-slate-300">
                    <p><span className="font-mono text-orange-100">4! = 4 × 3 × 2 × 1 = 24</span></p>
                    <p><span className="font-mono text-orange-100">6! = 6 × 5 × 4 × 3 × 2 × 1 = 720</span></p>
                    <p><span className="font-mono text-orange-100">9! = 362.880</span> — kita boleh menuliskan hasil kali saja bila angka lengkapnya tidak dibutuhkan.</p>
                  </div>
                </div>
                <div className="rounded-3xl border border-orange-200/15 bg-orange-200/[.045] p-5">
                  <h3 className="font-display font-bold text-orange-100">Dua nilai istimewa yang wajib diingat</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">Faktorial 1 adalah 1. Agar pola penyederhanaan rumus faktorial tetap berjalan rapi, faktorial nol juga didefinisikan sama dengan 1.</p>
                  <Formula label="factorial-special-values">1! = 1　dan　0! = 1</Formula>
                  <div className="mt-4 rounded-2xl border border-cyan-200/10 bg-[#071326]/65 p-4">
                    <p className="font-display text-sm font-bold text-cyan-100">Trik membatalkan faktor yang sama</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300"><span className="font-mono text-cyan-100">9! = 9 × 8 × 7!</span>. Jadi, saat <span className="font-mono text-cyan-100">9!</span> dibagi <span className="font-mono text-cyan-100">7!</span>, bagian <span className="font-mono text-cyan-100">7!</span> langsung habis. Praktis sekali!</p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <Example number={6} title="Menyederhanakan faktorial">
                  <p className="text-sm leading-relaxed text-slate-300">Hitung dua bentuk berikut tanpa mengalikan semua angka besar terlebih dahulu.</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl bg-[#071326]/70 p-4"><p className="mb-2 font-bold text-orange-100">a. Perbandingan faktorial</p><Formula>9! / 7! = (9 × 8 × 7!) / 7! = 9 × 8 = 72</Formula></div>
                    <div className="rounded-2xl bg-[#071326]/70 p-4"><p className="mb-2 font-bold text-orange-100">b. Faktorial dalam penyebut</p><Formula>9! / (6! × 3!) = (9 × 8 × 7) / (3 × 2 × 1) = 84</Formula></div>
                  </div>
                  <Answer>Asyik, hasilnya berturut-turut 72 dan 84. Kuncinya: kembangkan faktorial hanya sejauh yang dibutuhkan, lalu sederhanakan faktor yang sama.</Answer>
                </Example>
              </div>
            </section>

            <section id="semua-unsur" data-testid="section-all-elements" className="scroll-mt-6">
              <SectionHeading number="B" title="Permutasi dengan semua unsur berbeda" intro="Permutasi adalah susunan berurutan yang dibentuk dari beberapa unsur berbeda. Karena tiap posisi punya peran, membalik urutannya biasanya menghasilkan susunan baru: AB berbeda dari BA." />
              <div className="rounded-3xl border border-orange-200/15 bg-orange-200/[.045] p-5">
                <h3 className="font-display font-bold text-orange-100">Teorema: semua n unsur dipakai</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">Jika <span className="font-mono text-orange-100">n</span> unsur yang berbeda disusun sekaligus, banyak susunannya adalah permutasi <span className="font-mono text-orange-100">n</span> unsur.</p>
                <Formula label="permutation-all">P(n,n) = n!</Formula>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-[#071326]/70 p-4">
                    <h4 className="font-display font-bold text-cyan-100">Mengapa hasilnya n!?</h4>
                    <ol className="mt-2 list-inside list-decimal space-y-2 text-sm leading-relaxed text-slate-300">
                      <li>Posisi pertama dapat diisi dengan salah satu dari <span className="font-mono text-cyan-100">n</span> unsur.</li>
                      <li>Sesudah satu unsur terpakai, posisi kedua punya <span className="font-mono text-cyan-100">n − 1</span> pilihan.</li>
                      <li>Pilihan untuk posisi berikutnya terus berkurang sampai tersisa satu pilihan.</li>
                    </ol>
                    <Formula>n × (n − 1) × ··· × 2 × 1 = n!</Formula>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#071326]/70 p-4">
                    <h4 className="font-display font-bold text-cyan-100">Contoh kecil: A, B, dan C</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">Ketiga huruf itu dapat diatur dalam <span className="font-mono text-cyan-100">3! = 3 × 2 × 1 = 6</span> susunan:</p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"].map((order) => <span key={order} className="rounded-xl border border-orange-100/10 bg-white/[.035] p-2 text-center font-mono font-bold text-orange-100" data-testid={`order-${order.toLowerCase()}`}>{order}</span>)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-5">
                <Example number={7} title="Menukar posisi dua lencana">
                  <p className="text-sm leading-relaxed text-slate-300">Dua lencana berlainan, berbentuk bintang (A) dan bulan (B), dipasang berurutan pada dua tempat. Berapa susunan yang bisa dibuat?</p>
                  <Formula>P(2,2) = 2! = 2 × 1 = 2</Formula>
                  <div className="grid gap-2 sm:grid-cols-2"><p className="rounded-xl bg-[#071326]/70 p-3 text-center font-mono text-cyan-100">A lalu B → AB</p><p className="rounded-xl bg-[#071326]/70 p-3 text-center font-mono text-cyan-100">B lalu A → BA</p></div>
                  <Answer>Ada 2 susunan. Urutan pemasangan membedakan hasilnya, jadi AB dan BA tidak digabung.</Answer>
                </Example>
                <Example number={8} title="Menyusun tiga kartu huruf">
                  <p className="text-sm leading-relaxed text-slate-300">Tiga kartu bertuliskan J, K, dan L disusun berjajar. Berapa urutan yang mungkin?</p>
                  <Formula>P(3,3) = 3! = 3 × 2 × 1 = 6</Formula>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{["JKL", "JLK", "KJL", "KLJ", "LJK", "LKJ"].map((order) => <span key={order} className="rounded-xl bg-[#071326]/70 p-2 text-center font-mono text-cyan-100">{order}</span>)}</div>
                  <Answer>Tepat 6 urutan. Setiap kartu muncul satu kali pada setiap susunan, dan membalik posisi mengubah urutannya.</Answer>
                </Example>
                <Example number={9} title="Mengatur kendaraan di area pameran">
                  <p className="text-sm leading-relaxed text-slate-300">Lima kendaraan berbeda akan dipajang berjejer pada lima petak yang tersedia. Berapa susunan pajangan yang mungkin?</p>
                  <Formula>P(5,5) = 5! = 5 × 4 × 3 × 2 × 1 = 120</Formula>
                  <Answer>Panitia dapat membuat 120 susunan pajangan. Kalau satu kendaraan bertukar petak dengan kendaraan lain, susunannya sudah berbeda.</Answer>
                </Example>
              </div>
            </section>

            <section id="sebagian-unsur" data-testid="section-partial-permutations" className="scroll-mt-6">
              <SectionHeading number="C" title="Permutasi dari sebagian unsur berbeda" intro="Tak selalu semua unsur harus dipakai. Kalau kita mengambil dan mengurutkan r unsur dari n unsur berbeda, gunakan permutasi P(n,r). Ingat: urutan tetap diperhitungkan." />
              <div className="space-y-5">
                <div className="rounded-3xl border border-cyan-200/15 bg-white/[.035] p-5">
                  <h3 className="font-display font-bold text-cyan-100">Menurunkan rumus dengan dua cara</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Kita hendak mengisi <span className="font-mono text-cyan-100">r</span> posisi dari <span className="font-mono text-cyan-100">n</span> unsur yang semuanya berbeda. Setiap kali satu unsur dipakai, unsur itu tidak boleh dipakai lagi.</p>
                  <SlotDiagram />
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-[#071326]/70 p-4">
                      <h4 className="font-display font-bold text-orange-100">Bukti 1 · aturan perkalian</h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">Posisi pertama punya <span className="font-mono text-cyan-100">n</span> pilihan, posisi kedua <span className="font-mono text-cyan-100">n−1</span>, dan posisi ke-r memiliki <span className="font-mono text-cyan-100">n−r+1</span> pilihan. Kalikan semuanya:</p>
                      <Formula>P(n,r) = n(n−1)(n−2)···(n−r+1)</Formula>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">Jika kita mengalikan lagi faktor yang tersisa sampai <span className="font-mono text-cyan-100">1</span>, hasilnya menjadi <span className="font-mono text-cyan-100">n!</span>. Maka hasil perkalian tadi sama dengan <span className="font-mono text-cyan-100">n!/(n−r)!</span>.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#071326]/70 p-4">
                      <h4 className="font-display font-bold text-orange-100">Bukti 2 · isi posisi satu-satu</h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">Untuk menempatkan r unsur dalam r tempat, hitung pilihan tiap tempat. Tempat pertama memiliki n cara; tempat kedua n−1; tempat ketiga n−2. Pola ini diteruskan sampai tempat ke-r.</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">Tabel pilihan tempatnya adalah <span className="font-mono text-cyan-100">n, n−1, n−2, …, n−r+1</span>. Dengan aturan perkalian, banyak susunannya adalah hasil kali semua isi tabel.</p>
                      <Formula>P(n,r) = n! / (n−r)!,　0 ≤ r ≤ n</Formula>
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl border border-violet-200/15 bg-violet-200/[.045] p-4">
                    <p className="font-display font-bold text-violet-100">Hubungan dengan permutasi semua unsur</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">Jika <span className="font-mono text-violet-100">r=n</span>, maka <span className="font-mono text-violet-100">P(n,n)=n!/(n−n)!=n!/0!=n!</span>. Jadi, rumus umum ini juga mencakup keadaan saat semua unsur disusun.</p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[.035] p-4 sm:p-5">
                  <h3 className="mb-3 font-display font-bold text-white">Daftar lengkap susunan tiga dari empat tanda</h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-300">Dari W, X, Y, Z, kita dapat menyusun tiga tanda tanpa pengulangan sebanyak <span className="font-mono text-cyan-100">4 × 3 × 2 = 24</span> cara. Berikut semua susunannya, dikelompokkan menurut tanda pertama.</p>
                  <div className="grid gap-2 sm:grid-cols-2">{allFourPermutations.map(([first, orders]) => <p key={first} className="rounded-xl bg-[#071326]/75 p-3 text-xs leading-relaxed text-slate-300" data-testid={`three-of-four-${first.toLowerCase()}`}><strong className="mr-2 font-mono text-orange-100">{first}–</strong>{orders}</p>)}</div>
                </div>

                <Example number={10} title="Empat posisi dari tujuh pilihan">
                  <p className="text-sm leading-relaxed text-slate-300">Tujuh karya berbeda akan menempati empat tempat pajang yang berurutan. Berapa susunan yang mungkin jika satu karya hanya boleh dipajang sekali?</p>
                  <Formula>P(7,4) = 7! / (7−4)! = 7! / 3! = 7 × 6 × 5 × 4 = 840</Formula>
                  <Answer>Wah, ada 840 susunan pajangan! Empat karya yang sama bisa menghasilkan urutan berbeda saat posisi mereka ditukar.</Answer>
                </Example>
                <Example number={11} title="Membuat kode empat karakter">
                  <p className="text-sm leading-relaxed text-slate-300">Sebuah permainan membuat kode empat karakter dari sembilan simbol berbeda. Simbol tidak boleh digunakan dua kali. Berapa kode yang bisa disusun?</p>
                  <p className="text-sm leading-relaxed text-slate-300">Posisi pertama punya 9 pilihan, berikutnya 8, lalu 7, dan posisi terakhir 6. Karena kode yang urutannya berbeda dianggap berbeda, kita pakai permutasi:</p>
                  <Formula>P(9,4) = 9! / 5! = 9 × 8 × 7 × 6 = 3.024</Formula>
                  <Answer>Ada 3.024 kode yang dapat dibuat. Misalnya, kode 1234 berbeda dari 4321.</Answer>
                </Example>
                <Example number={12} title="Memilih dua huruf lalu mengurutkannya">
                  <p className="text-sm leading-relaxed text-slate-300">Dari tiga huruf P, Q, dan R, buat susunan dua huruf tanpa pengulangan. Ada berapa hasil?</p>
                  <TwoFromThreeTree />
                  <Formula>P(3,2) = 3! / (3−2)! = 3 × 2 = 6</Formula>
                  <Answer>Enam susunannya ialah PQ, PR, QP, QR, RP, dan RQ. Diagram pohon membantu kita melihat bahwa setiap pilihan huruf pertama hanya diteruskan oleh dua huruf yang belum dipakai.</Answer>
                </Example>
                <Example number={13} title="Memilih pengurus dengan jabatan berbeda">
                  <p className="text-sm leading-relaxed text-slate-300">Dari 12 calon, akan dipilih seorang ketua, seorang sekretaris, dan seorang bendahara. Satu orang hanya boleh memegang satu jabatan. Berapa susunan pengurus yang mungkin?</p>
                  <p className="text-sm leading-relaxed text-slate-300">Ketua dapat dipilih dengan 12 cara. Setelah itu, sekretaris memiliki 11 pilihan; bendahara menyusul dengan 10 pilihan.</p>
                  <Formula>P(12,3) = 12 × 11 × 10 = 1.320</Formula>
                  <Answer>Jadi, ada 1.320 susunan pengurus. Jabatan yang berbeda berarti urutan pemilihan menghasilkan susunan yang berbeda.</Answer>
                </Example>
                <Example number={14} title="Membentuk bilangan empat angka di atas 5.000">
                  <p className="text-sm leading-relaxed text-slate-300">Berapa banyak bilangan empat angka lebih dari 5.000 yang dapat dibentuk dari angka 1, 4, 5, 6, 7, dan 9 tanpa pengulangan?</p>
                  <p className="text-sm leading-relaxed text-slate-300">Angka ribuan harus 5, 6, 7, atau 9, jadi ada 4 pilihan. Setelah angka pertama dipilih, tiga posisi yang tersisa diisi dengan permutasi tiga dari lima angka yang belum dipakai.</p>
                  <Formula>4 × P(5,3) = 4 × (5 × 4 × 3) = 4 × 60 = 240</Formula>
                  <Answer>Ada 240 bilangan yang memenuhi syarat. Kita memisahkan pilihan angka ribuan terlebih dahulu, lalu mengatur tiga angka berikutnya.</Answer>
                </Example>
                <Deepening title="Soal pendalaman · posisi podium" question="Delapan pelari mengikuti final. Berapa susunan juara pertama, kedua, dan ketiga yang mungkin, jika tidak ada hasil seri?" calculation="P(8,3) = 8 × 7 × 6 = 336" answer="Ada 336 susunan podium. Posisi juara berbeda, jadi pemenang yang sama dengan urutan berbeda dihitung sebagai hasil lain." />
              </div>
            </section>

            <section id="unsur-sama" data-testid="section-repeated-elements" className="scroll-mt-6">
              <SectionHeading number="D" title="Permutasi dengan beberapa unsur yang sama" intro="Sekarang giliran benda-benda yang tampak sama. Menukar dua benda identik tidak menciptakan susunan baru, jadi cara menghitungnya perlu dikoreksi agar tidak ada hitungan berulang." />
              <div className="rounded-3xl border border-orange-200/15 bg-orange-200/[.045] p-5">
                <h3 className="font-display font-bold text-orange-100">Teorema: ada kelompok unsur identik</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">Misalkan ada <span className="font-mono text-orange-100">n</span> benda, dengan <span className="font-mono text-orange-100">n₁</span> benda jenis pertama yang sama, <span className="font-mono text-orange-100">n₂</span> jenis kedua yang sama, dan seterusnya sampai <span className="font-mono text-orange-100">nₖ</span>. Banyak susunan berbeda adalah:</p>
                <Formula label="repeated-elements">n! / (n₁! × n₂! × ··· × nₖ!),　dengan n₁ + n₂ + ··· + nₖ = n</Formula>
                <div className="mt-4 rounded-2xl border border-white/10 bg-[#071326]/70 p-4">
                  <h4 className="font-display font-bold text-cyan-100">Mengapa harus dibagi?</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Anggap dulu semua benda diberi nomor kecil agar berbeda; jumlah susunannya <span className="font-mono text-cyan-100">n!</span>. Namun, menukar sesama benda jenis pertama tidak mengubah tampilan, dan pertukaran itu dapat terjadi dalam <span className="font-mono text-cyan-100">n₁!</span> cara. Hal serupa terjadi untuk tiap jenis. Karena itu, kita membagi <span className="font-mono text-cyan-100">n!</span> dengan hasil kali semua pengulangan tersebut.</p>
                </div>
              </div>
              <div className="mt-5 space-y-5">
                <Example number={15} title="Menyusun keping huruf yang berulang">
                  <p className="text-sm leading-relaxed text-slate-300">a. Ada 8 keping huruf: tiga A, dua B, dua C, dan satu D. Berapa susunan berbeda yang tampak?</p>
                  <Formula>8! / (3! × 2! × 2! × 1!) = 40.320 / 24 = 1.680</Formula>
                  <p className="text-sm leading-relaxed text-slate-300">b. Berapa susunan berbeda dari huruf-huruf pada kata <span className="font-mono text-cyan-100">KOMUNIKASI</span>? Huruf K muncul dua kali, huruf I dua kali, sedangkan huruf lainnya masing-masing satu kali.</p>
                  <Formula>10! / (2! × 2!) = 3.628.800 / 4 = 907.200</Formula>
                  <Answer>Jadi, ada 1.680 susunan keping pada bagian a dan 907.200 susunan huruf pada bagian b. Kita membagi dengan faktorial setiap huruf yang berulang.</Answer>
                </Example>
                <Example number={16} title="Membagi benda menjadi kelompok sejenis">
                  <p className="text-sm leading-relaxed text-slate-300">1. Sembilan relawan dibagi ke tiga tim dengan ukuran 5, 3, dan 1 orang. Berapa pembagian berbeda jika ukuran yang berlainan menjadi penanda tiap tim?</p>
                  <Formula>9! / (5! × 3! × 1!) = 362.880 / 720 = 504</Formula>
                  <p className="text-sm leading-relaxed text-slate-300">2. Sembilan manik-manik terdiri atas 4 biru, 3 merah, dan 2 kuning. Berapa urutan warna berbeda jika manik-manik disusun dalam satu baris?</p>
                  <Formula>9! / (4! × 3! × 2!) = 362.880 / 288 = 1.260</Formula>
                  <Answer>Ada 504 pembagian relawan dan 1.260 urutan manik-manik. Ukuran tim pada bagian pertama semuanya berlainan sehingga langsung menandai tiap tim. Pada manik-manik, kita membagi dengan faktorial banyak manik-manik untuk setiap warna yang sama.</Answer>
                </Example>
                <Deepening title="Soal pendalaman · pilih pengurus" question="Ada 9 calon pengurus. Dari mereka akan dipilih ketua, wakil, sekretaris, dan bendahara. Berapa susunan pengurus yang mungkin jika semua jabatan dipegang orang berbeda?" calculation="P(9,4) = 9 × 8 × 7 × 6 = 3.024" answer="Ada 3.024 susunan. Jangan membagi dengan faktorial karena setiap jabatan punya nama dan tanggung jawab berbeda." />
              </div>
            </section>

            <section id="melingkar" data-testid="section-circular-permutations" className="scroll-mt-6">
              <SectionHeading number="E" title="Permutasi siklis: menyusun sambil melingkar" intro="Pada meja bundar, susunan A–B–C–D–E dan B–C–D–E–A sebenarnya hanya berbeda karena mejanya diputar. Kita tidak ingin menghitung tampilan yang sama berulang-ulang, kan?" />
              <div className="grid gap-4 md:grid-cols-[.95fr_1.05fr]">
                <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[.05] p-5">
                  <h3 className="font-display font-bold text-cyan-100">Kunci: tetapkan satu orang sebagai patokan</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">Tetapkan A pada satu tempat. Setelah itu, tinggal atur <span className="font-mono text-cyan-100">n−1</span> orang lainnya mengelilingi meja. Dengan mengunci satu posisi, setiap susunan yang hanya merupakan hasil rotasi akan terhitung tepat satu kali.</p>
                  <Formula label="circular-formula">P siklis untuk n unsur = (n − 1)!</Formula>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">Contoh lima orang: tetapkan A, kemudian atur B, C, D, dan E. Hasilnya <span className="font-mono text-cyan-100">4! = 24</span> susunan melingkar.</p>
                </div>
                <CircularDiagram />
              </div>
              <div className="mt-5 space-y-5">
                <Example number={17} title="Duduk mengitari meja bundar">
                  <p className="text-sm leading-relaxed text-slate-300">Delapan anggota klub akan duduk mengelilingi satu meja bundar. Berapa susunan tempat duduk yang berbeda?</p>
                  <Formula>(8 − 1)! = 7! = 5.040</Formula>
                  <p className="text-sm leading-relaxed text-slate-300">Bagaimana jika dua anggota tertentu harus duduk berdampingan? Anggap keduanya sebagai satu blok. Sekarang ada satu blok dan enam anggota lain, jadi terdapat 7 objek yang disusun melingkar. Di dalam blok, dua orang itu bisa bertukar tempat.</p>
                  <Formula>(7 − 1)! × 2! = 6! × 2 = 720 × 2 = 1.440</Formula>
                  <Answer>Tanpa syarat ada 5.040 susunan. Jika dua anggota harus berdampingan, ada 1.440 susunan: enam objek diatur melingkar, lalu pasangan di dalam blok ditukar dengan 2 cara.</Answer>
                </Example>
                <Deepening title="Soal pendalaman · tidak berdampingan" question="Delapan teman duduk di meja bundar. Dua teman, Rani dan Sita, tidak ingin duduk berdampingan. Berapa susunan yang memenuhi keinginan mereka?" calculation="Semua susunan: 7! = 5.040. Berdampingan: 2 × 6! = 1.440. Tidak berdampingan: 5.040 − 1.440 = 3.600." answer="Ada 3.600 susunan. Hitung semua kemungkinan, kurangi susunan saat Rani dan Sita berdampingan." />
              </div>
            </section>

            <section data-testid="section-permutation-checklist" className="rounded-3xl border border-cyan-200/15 bg-[linear-gradient(145deg,rgba(25,75,95,.24),rgba(12,21,37,.88))] p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-200/10 text-cyan-100"><Lightbulb className="h-5 w-5" aria-hidden="true" /></span><div><p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Cek sebelum selesai</p><h2 className="font-display text-xl font-extrabold text-white">Sudah tepat memakai permutasi?</h2></div></div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.04] p-4"><p className="font-display font-bold text-cyan-100">Apakah posisi penting?</p><p className="mt-2 text-sm leading-relaxed text-slate-300">Jika menukar unsur menghasilkan susunan baru—seperti kode, urutan kursi, atau jabatan berbeda—permutasi cocok digunakan.</p></div>
                <div className="rounded-2xl border border-orange-200/15 bg-orange-200/[.04] p-4"><p className="font-display font-bold text-orange-100">Apakah ada unsur identik atau bentuk melingkar?</p><p className="mt-2 text-sm leading-relaxed text-slate-300">Untuk unsur sama, bagi dengan faktorial banyak pengulangannya. Untuk susunan melingkar, tetapkan satu unsur agar rotasi yang sama tidak dihitung ulang.</p></div>
              </div>
              <div className="mt-4 grid gap-2 rounded-2xl border border-white/10 bg-[#071326]/70 p-4 font-mono text-sm text-slate-200 sm:grid-cols-2">
                <p>Semua unsur berbeda: <span className="text-cyan-100">n!</span></p><p>Sebagian unsur berbeda: <span className="text-cyan-100">n!/(n−r)!</span></p>
                <p>Beberapa unsur sama: <span className="text-cyan-100">n!/(n₁!n₂!···)</span></p><p>Susunan melingkar: <span className="text-cyan-100">(n−1)!</span></p>
              </div>
              <p className="mt-4 rounded-xl bg-[#071326]/70 p-3 text-sm leading-relaxed text-slate-300"><strong className="text-white">Semangat, Numatik Friend!</strong> Sebelum menghitung, tandai dulu posisi yang harus diisi, cek apakah ada unsur yang tak boleh berulang, lalu tanyakan apakah hasil yang diputar atau ditukar dianggap baru. Setelah itu, pilih rumus yang tepat dan hitung dengan tenang.</p>
            </section>
          </div>

          <aside className="hidden lg:block" aria-label="Daftar bagian materi">
            <div className="sticky top-6 rounded-2xl border border-white/10 bg-[#0d1728]/90 p-4 backdrop-blur" data-testid="lesson-outline">
              <p className="mb-4 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-400">Peta materi</p>
              <ol className="space-y-3 font-body text-xs text-slate-300">
                {sections.map(([number, label, id]) => <li key={id}><button type="button" onClick={() => jumpTo(id)} className="flex w-full items-start gap-2 text-left transition-colors hover:text-cyan-100" data-testid={`outline-${id}`}><span className="font-mono text-cyan-200">{number}</span><span>{label}</span></button></li>)}
              </ol>
              <div className="mt-5 rounded-xl border border-violet-200/10 bg-violet-200/[.04] p-3">
                <Compass className="mb-2 h-4 w-4 text-violet-200" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-slate-300">Setiap contoh punya angka dan cerita sendiri. Kerjakan dulu dengan aturan pilihan, lalu cocokkan dengan rumusnya!</p>
              </div>
              <button type="button" onClick={() => jumpTo("faktorial")} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-200/15 bg-cyan-200/[.06] px-3 py-2 text-xs font-bold text-cyan-100 hover:bg-cyan-200/[.1]" data-testid="back-to-top"><ArrowDown className="h-3.5 w-3.5 rotate-180" aria-hidden="true" />Kembali ke awal</button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SmaPeluangPermutasiPage;
