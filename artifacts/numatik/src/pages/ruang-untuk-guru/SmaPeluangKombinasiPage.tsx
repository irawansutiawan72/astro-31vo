import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, BookOpen, Check, Compass, Lightbulb, Sparkles } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

const sections = [
  ["3.3.1", "Memilih tanpa mengurutkan", "makna-kombinasi"],
  ["3.3.2", "Dari permutasi ke kombinasi", "rumus-kombinasi"],
  ["3.3.3", "Contoh pilihan dan kelompok", "contoh-pilihan"],
  ["3.3.4", "Kasus bertahap dan pendalaman", "kasus-khusus"],
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

function Answer({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-emerald-200/15 bg-emerald-200/[.045] p-3 text-sm leading-relaxed text-emerald-50"><Check className="mr-2 inline h-4 w-4 text-emerald-200" aria-hidden="true" />{children}</p>;
}

function Formula({ children, label }: { children: ReactNode; label?: string }) {
  return <div data-testid={label ? `formula-${label}` : undefined} className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/80 px-4 py-3 text-center font-mono text-sm text-cyan-100 sm:text-base">{children}</div>;
}

function ChoiceDiagram() {
  return (
    <svg viewBox="0 0 760 250" role="img" aria-label="Empat kelompok kombinasi tiga huruf; setiap kelompok mempunyai enam urutan permutasi" className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-2" data-testid="diagram-combination-permutation">
      <g fill="#13243a" stroke="#f6bd60" strokeWidth="2">
        <rect x="18" y="13" width="124" height="48" rx="14" /><rect x="18" y="72" width="124" height="48" rx="14" />
        <rect x="18" y="131" width="124" height="48" rx="14" /><rect x="18" y="190" width="124" height="48" rx="14" />
      </g>
      <g fill="#fff4db" fontSize="16" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">
        <text x="80" y="43">ABC</text><text x="80" y="102">ABD</text><text x="80" y="161">ACD</text><text x="80" y="220">BCD</text>
      </g>
      <g stroke="#66d9e8" strokeWidth="2">
        <path d="M146 37H194M146 96H194M146 155H194M146 214H194" />
      </g>
      <g fill="#a8b8cf" fontSize="12" fontFamily="sans-serif" textAnchor="middle">
        <text x="382" y="11">6 urutan pada tiap kelompok</text>
        <text x="382" y="34">ABC · ACB · BAC · BCA · CAB · CBA</text>
        <text x="382" y="93">ABD · ADB · BAD · BDA · DAB · DBA</text>
        <text x="382" y="152">ACD · ADC · CAD · CDA · DAC · DCA</text>
        <text x="382" y="211">BCD · BDC · CBD · CDB · DBC · DCB</text>
      </g>
      <g fill="#8ce2b8" fontSize="13" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">
        <text x="650" y="85">4 kelompok</text><text x="650" y="110">× 6 urutan</text><text x="650" y="135">= 24 susunan</text>
      </g>
    </svg>
  );
}

const SmaPeluangKombinasiPage = () => {
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/[.06] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" />Peluang · Pilih dengan cermat</div>
          <p className="font-display text-xs font-bold uppercase tracking-[.24em] text-orange-200">Bab 3.3</p>
          <h1 className="mt-2 font-display text-3xl font-black leading-tight tracking-tight text-primary text-glow-cyan sm:text-5xl">Kombinasi</h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-slate-300 sm:text-base">Saat memilih anggota tim, buku, atau soal, urutan biasanya tidak mengubah siapa yang terpilih. Kita akan belajar menghitung pilihan seperti itu dengan rapi—dan membedakannya dari susunan yang urutannya penting.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {sections.map(([number, label, id]) => <button key={id} type="button" onClick={() => jumpTo(id)} data-testid={`jump-${id}`} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 font-body text-xs text-slate-200 transition-colors hover:border-cyan-200/40 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200/60">{number} · {label}</button>)}
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0 space-y-10">
            <section id="makna-kombinasi" data-testid="section-combination-meaning" className="scroll-mt-6">
              <SectionHeading number="3.3.1" title="Memilih tanpa mengurutkan" intro="Kombinasi adalah cara memilih beberapa unsur ketika posisi atau urutan unsur terpilih tidak dibedakan. Mulailah dengan pertanyaan sederhana: apakah menukar dua nama menghasilkan pilihan yang baru?" />
              <div className="grid gap-4 md:grid-cols-[1.1fr_.9fr]">
                <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[.05] p-5">
                  <h3 className="font-display font-bold text-cyan-100">Pasangan yang sama, bukan pilihan baru</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">Dari empat peserta berinisial A, B, C, dan D, kita memilih dua orang untuk menjadi satu pasangan. Pasangan <span className="font-mono text-cyan-100">{"{A, B}"}</span> sama dengan <span className="font-mono text-cyan-100">{"{B, A}"}</span>: anggotanya persis sama. Jadi setiap pasangan cukup dicatat satu kali.</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">Kalau kita sedang menentukan juara pertama dan kedua, barulah AB berbeda dari BA. Itu permutasi, karena posisi pertama dan kedua punya peran berbeda.</p>
                </div>
                <div className="rounded-3xl border border-orange-200/15 bg-orange-200/[.045] p-5" data-testid="list-two-from-four">
                  <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">2 pilihan dari {"{A, B, C, D}"}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {["AB", "AC", "AD", "BC", "BD", "CD"].map((pair) => <span key={pair} className="rounded-xl border border-orange-100/10 bg-[#091426]/75 px-3 py-3 text-center font-mono text-base font-bold text-orange-100" data-testid={`pair-${pair.toLowerCase()}`}>{pair}</span>)}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300">Ada enam pasangan. Tidak ada BA, CA, atau susunan balik lainnya, sebab semuanya akan menghitung pasangan yang sama untuk kedua kali.</p>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border border-violet-200/15 bg-violet-200/[.045] p-4">
                <p className="font-display font-bold text-violet-100">Cek cepat: urutan penting atau tidak?</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-[#071326]/70 p-3"><p className="font-mono text-cyan-100">Tim A–B = tim B–A</p><p className="mt-1 text-xs text-slate-300">Anggota tim sama → kombinasi.</p></div>
                  <div className="rounded-xl bg-[#071326]/70 p-3"><p className="font-mono text-orange-100">Juara 1 A, juara 2 B ≠ sebaliknya</p><p className="mt-1 text-xs text-slate-300">Jabatan/posisi berbeda → permutasi.</p></div>
                </div>
              </div>
            </section>

            <section id="rumus-kombinasi" data-testid="section-combination-formula" className="scroll-mt-6">
              <SectionHeading number="3.3.2" title="Dari permutasi ke kombinasi" intro="Kita dapat mengubah susunan berurutan menjadi kelompok tak berurutan dengan membagi banyak permutasi oleh banyak urutan yang mungkin di dalam setiap kelompok." />
              <div className="space-y-5">
                <div className="rounded-3xl border border-white/10 bg-white/[.035] p-4 sm:p-5">
                  <h3 className="mb-3 font-display font-bold text-white">Empat kelompok berisi tiga unsur</h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-300">Dari A, B, C, D, kelompok beranggotakan tiga orang adalah ABC, ABD, ACD, dan BCD. Setiap kelompok bisa diurutkan dalam <span className="font-mono text-cyan-100">3! = 6</span> cara. Diagram ini memperlihatkan kelompok dan susunan-susunannya.</p>
                  <ChoiceDiagram />
                  <div className="mt-4 rounded-2xl border border-cyan-200/10 bg-[#071326]/70 p-4">
                    <p className="font-display text-sm font-bold text-cyan-100">Seluruh 24 susunan permutasi P(4,3)</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {[
                        ["ABC", "ABC, ACB, BAC, BCA, CAB, CBA"],
                        ["ABD", "ABD, ADB, BAD, BDA, DAB, DBA"],
                        ["ACD", "ACD, ADC, CAD, CDA, DAC, DCA"],
                        ["BCD", "BCD, BDC, CBD, CDB, DBC, DCB"],
                      ].map(([group, arrangements]) => <p key={group} className="rounded-xl bg-white/[.035] p-3 text-xs leading-relaxed text-slate-300" data-testid={`permutations-${group.toLowerCase()}`}><strong className="mr-2 font-mono text-orange-100">{group}</strong>{arrangements}</p>)}
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-orange-200/15 bg-orange-200/[.045] p-5">
                  <p className="font-display font-bold text-orange-100">Hilangkan penghitungan berulang</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Permutasi 3 unsur dari 4 unsur berjumlah 24. Karena tiap kelompok yang sama muncul dalam 3! = 6 urutan, kita bagi 24 dengan 6 untuk mendapatkan kelompok unik.</p>
                  <Formula label="p43-to-c43">P(4,3) = 24 = 3! × C(4,3)　⇒　C(4,3) = 24 ÷ 6 = 4</Formula>
                </div>
                <div className="rounded-3xl border border-violet-200/15 bg-[linear-gradient(145deg,rgba(76,56,120,.2),rgba(12,21,37,.88))] p-5">
                  <h3 className="font-display font-bold text-violet-100">Rumus umum kombinasi</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Untuk memilih <span className="font-mono text-violet-100">r</span> unsur dari <span className="font-mono text-violet-100">n</span> unsur berbeda, dengan <span className="font-mono text-violet-100">0 ≤ r ≤ n</span>, setiap kelompok memiliki <span className="font-mono text-violet-100">r!</span> susunan. Kombinasi juga disebut koefisien binomial, dibaca “n pilih r”.</p>
                  <Formula label="general-combination">C(n,r) = P(n,r) / r! = n! / [r!(n − r)!] = (n choose r)</Formula>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-[#071326]/65 p-4">
                    <p className="font-display text-sm font-bold text-cyan-100">Apa arti tanda faktorial?</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">Faktorial adalah hasil kali bilangan bulat positif dari angka itu turun sampai 1. Contoh: <span className="font-mono text-cyan-100">5! = 5 × 4 × 3 × 2 × 1 = 120</span>. Secara khusus, <span className="font-mono text-cyan-100">0! = 1</span>. Dalam rumus kombinasi, <span className="font-mono text-cyan-100">n!</span> dapat disederhanakan dengan <span className="font-mono text-cyan-100">(n−r)!</span>, sehingga tersisa <span className="font-mono text-cyan-100">n(n−1)…(n−r+1)</span> cara berurutan sebelum dibagi <span className="font-mono text-cyan-100">r!</span>.</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="contoh-pilihan" data-testid="section-selection-examples" className="scroll-mt-6">
              <SectionHeading number="3.3.3" title="Contoh: hitung pilihan yang nyata" intro="Kita gunakan rumus pada situasi yang beragam. Dalam setiap soal, benda atau orang yang dipilih hanya membentuk kelompok, bukan urutan." />
              <div className="space-y-5">
                <Example number={1} title="Memilih soal kuis">
                  <p className="text-sm leading-relaxed text-slate-300">Kuis menyediakan 10 soal dan peserta diminta mengerjakan 6 soal. Berapa pilihan kumpulan soal yang dapat dikerjakan?</p>
                  <p className="text-sm leading-relaxed text-slate-300">Urutan mengerjakan soal tidak menciptakan kumpulan soal baru. Pilih 6 dari 10:</p>
                  <Formula>C(10,6) = 10! / [6!4!] = 10 × 9 × 8 × 7 / (4 × 3 × 2 × 1) = 210</Formula>
                  <Answer>Ada 210 pilihan kumpulan soal. Misalnya memilih soal 1, 2, 3, 4, 5, 6 sama saja walau ditulis dengan urutan lain.</Answer>
                </Example>
                <Example number={2} title="Memilih buku bacaan">
                  <p className="text-sm leading-relaxed text-slate-300">Rak klub literasi memuat 18 judul berbeda. Jika seorang anggota membawa pulang 5 judul, ada berapa pilihan set buku?</p>
                  <p className="text-sm leading-relaxed text-slate-300">Kelima buku membentuk satu set; posisi buku pertama atau terakhir tidak dibedakan. Maka:</p>
                  <Formula>C(18,5) = 18! / [5!13!] = (18 × 17 × 16 × 15 × 14) / 120 = 8.568</Formula>
                  <Answer>Tersedia 8.568 set berisi lima judul berbeda.</Answer>
                </Example>
                <Example number={3} title="Memilih relawan kegiatan">
                  <p className="text-sm leading-relaxed text-slate-300">Dari 10 siswa yang bersedia, panitia memilih 4 relawan. Setiap relawan memiliki kedudukan yang sama. Berapa tim relawan yang bisa terbentuk?</p>
                  <Formula>C(10,4) = 10! / [4!6!] = (10 × 9 × 8 × 7) / (4 × 3 × 2 × 1) = 210</Formula>
                  <Answer>Ada 210 tim yang mungkin. Menukar urutan nama di daftar relawan tidak mengubah anggotanya.</Answer>
                </Example>
                <Example number={4} title="Membentuk segitiga dari titik sudut">
                  <p className="text-sm leading-relaxed text-slate-300">Pada sebuah poligon cembung terdapat 7 titik sudut. Berapa segitiga berbeda yang dapat dibuat dengan menghubungkan tiga titik sudut?</p>
                  <p className="text-sm leading-relaxed text-slate-300">Segitiga ditentukan oleh tiga titik yang dipilih. Ketiga titik dapat ditulis dalam urutan mana pun tanpa mengubah segitiganya:</p>
                  <Formula>C(7,3) = 7! / [3!4!] = (7 × 6 × 5) / (3 × 2 × 1) = 35</Formula>
                  <Answer>Dapat dibuat 35 segitiga berbeda.</Answer>
                </Example>
                <Example number={5} title="Jabat tangan antar peserta">
                  <p className="text-sm leading-relaxed text-slate-300">Di pertemuan klub ada 15 peserta. Setiap pasangan berjabat tangan tepat satu kali. Berapa jabat tangan terjadi seluruhnya?</p>
                  <p className="text-sm leading-relaxed text-slate-300">Satu jabat tangan ditentukan oleh dua orang. Jabat tangan A dengan B sama dengan B dengan A, jadi pasangan dihitung sebagai kombinasi:</p>
                  <Formula>C(15,2) = 15! / [2!13!] = (15 × 14) / 2 = 105</Formula>
                  <Answer>Ada 105 jabat tangan, satu untuk setiap pasangan peserta.</Answer>
                </Example>
              </div>
            </section>

            <section id="kasus-khusus" data-testid="section-structured-cases" className="scroll-mt-6">
              <SectionHeading number="3.3.4" title="Menggabungkan pilihan dan membagi kelompok" intro="Beberapa soal memerlukan lebih dari satu keputusan. Untuk kelompok-kelompok yang harus sama-sama dibentuk, kalikan banyak cara tiap tahap; untuk syarat “sedikitnya”, uraikan menjadi kasus yang saling terpisah lalu jumlahkan." />
              <div className="space-y-5">
                <Example number={6} title="Panitia gabungan dua klub">
                  <p className="text-sm leading-relaxed text-slate-300">Panitia beranggotakan 5 orang harus memuat tepat 3 anggota klub robotik dari 8 orang dan tepat 2 anggota klub sains dari 6 orang. Berapa panitia yang mungkin?</p>
                  <p className="text-sm leading-relaxed text-slate-300">Pertama pilih 3 dari klub robotik. Untuk setiap pilihan itu, pilih 2 dari klub sains. Kedua pilihan harus terpenuhi, jadi banyak caranya dikalikan:</p>
                  <Formula>C(8,3) × C(6,2) = 56 × 15 = 840</Formula>
                  <Answer>Ada 840 panitia. Pilihan dari dua klub menentukan bagian yang berbeda dari tim, dan semua pasangan pilihan itu bisa digabungkan.</Answer>
                </Example>
                <Example number={7} title="Membagi peserta menjadi tiga kelompok">
                  <p className="text-sm leading-relaxed text-slate-300">Sepuluh peserta dibagi menjadi kelompok berukuran 5, 3, dan 2. Berapa pembagian kelompok yang mungkin?</p>
                  <p className="text-sm leading-relaxed text-slate-300">Pilih 5 peserta untuk kelompok pertama dari 10. Dari 5 yang tersisa, pilih 3 untuk kelompok kedua. Dua peserta terakhir otomatis menjadi kelompok ketiga:</p>
                  <Formula>C(10,5) × C(5,3) × C(2,2) = 252 × 10 × 1 = 2.520</Formula>
                  <p className="text-sm leading-relaxed text-slate-300">Bentuk faktorialnya setara. Sederhanakan hasil perkalian bertahap:</p>
                  <Formula>10! / (5!3!2!) = 3.628.800 / (120 × 6 × 2) = 2.520</Formula>
                  <Answer>Jadi ada 2.520 pembagian. Kelompok berukuran 5, 3, dan 2 memiliki ukuran berbeda, sehingga label ukuran mengidentifikasi masing-masing kelompok—menukar nama kelompok tidak membuat pembagian baru.</Answer>
                </Example>
                <Example number={8} title="Membagi peserta ke kelompok berukuran 8 dan 4">
                  <p className="text-sm leading-relaxed text-slate-300">Dua belas peserta dibagi menjadi satu kelompok berisi 8 orang dan satu kelompok berisi 4 orang. Berapa pembagian yang berbeda?</p>
                  <p className="text-sm leading-relaxed text-slate-300">Pilih anggota kelompok kecil yang berisi 4 orang. Semua peserta yang belum terpilih otomatis mengisi kelompok 8:</p>
                  <Formula>C(12,4) = 12! / [4!8!] = (12 × 11 × 10 × 9) / (4 × 3 × 2 × 1) = 495</Formula>
                  <p className="text-sm leading-relaxed text-slate-300">Jika memilih kelompok berisi 8 lebih dulu, hitungannya sama:</p>
                  <Formula>C(12,8) = C(12,4) = 495</Formula>
                  <Answer>Ada 495 pembagian. Setelah satu kelompok ditetapkan, kelompok lainnya sudah ditentukan oleh peserta yang tersisa.</Answer>
                </Example>
                <Example number={9} title="Sedikitnya tiga putri dalam kelompok">
                  <p className="text-sm leading-relaxed text-slate-300">Dari 7 siswa putra dan 6 siswa putri, akan dipilih kelompok berisi 5 orang. Berapa kelompok yang memiliki sedikitnya 3 putri?</p>
                  <p className="text-sm leading-relaxed text-slate-300">“Sedikitnya 3 putri” berarti 3, 4, atau 5 putri. Hitung kasus-kasus yang tidak tumpang tindih secara terpisah:</p>
                  <div className="overflow-x-auto rounded-2xl border border-white/10" data-testid="table-at-least-three-girls">
                    <table className="w-full min-w-[540px] border-collapse text-left text-xs sm:text-sm">
                      <caption className="px-3 py-2 text-left font-bold text-cyan-100">Kasus jumlah putri dalam kelompok</caption>
                      <thead><tr className="bg-cyan-300/[.1] text-cyan-50"><th scope="col" className="border-b border-white/10 px-3 py-2">Putri</th><th scope="col" className="border-b border-white/10 px-3 py-2">Putra</th><th scope="col" className="border-b border-white/10 px-3 py-2">Banyak cara</th></tr></thead>
                      <tbody>
                        <tr className="bg-white/[.035]"><td className="border-b border-white/[.06] px-3 py-2 text-slate-200">3</td><td className="border-b border-white/[.06] px-3 py-2 text-slate-200">2</td><td className="border-b border-white/[.06] px-3 py-2 font-mono text-slate-200">C(6,3)C(7,2) = 20 × 21 = 420</td></tr>
                        <tr className="bg-white/[.015]"><td className="border-b border-white/[.06] px-3 py-2 text-slate-200">4</td><td className="border-b border-white/[.06] px-3 py-2 text-slate-200">1</td><td className="border-b border-white/[.06] px-3 py-2 font-mono text-slate-200">C(6,4)C(7,1) = 15 × 7 = 105</td></tr>
                        <tr className="bg-white/[.035]"><td className="border-b border-white/[.06] px-3 py-2 text-slate-200">5</td><td className="border-b border-white/[.06] px-3 py-2 text-slate-200">0</td><td className="border-b border-white/[.06] px-3 py-2 font-mono text-slate-200">C(6,5) = 6</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <Formula>C(6,3)C(7,2) + C(6,4)C(7,1) + C(6,5) = 420 + 105 + 6 = 531</Formula>
                  <Answer>Ada 531 kelompok yang memenuhi syarat. Kita mengalikan pilihan putri dan putra dalam satu kasus, lalu menjumlahkan kasus 3, 4, dan 5 putri karena tiap kelompok hanya masuk ke satu kasus.</Answer>
                </Example>
              </div>
            </section>

            <section data-testid="section-combination-checklist" className="rounded-3xl border border-cyan-200/15 bg-[linear-gradient(145deg,rgba(25,75,95,.24),rgba(12,21,37,.88))] p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-200/10 text-cyan-100"><Lightbulb className="h-5 w-5" aria-hidden="true" /></span><div><p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Cek sebelum selesai</p><h2 className="font-display text-xl font-extrabold text-white">Sudah tepat memakai kombinasi?</h2></div></div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.04] p-4"><p className="font-display font-bold text-cyan-100">Urutan tidak berpengaruh?</p><p className="mt-2 text-sm leading-relaxed text-slate-300">Jika menukar unsur terpilih tidak mengubah hasil, gunakan kombinasi. Contoh: memilih anggota tim atau satu set buku.</p></div>
                <div className="rounded-2xl border border-orange-200/15 bg-orange-200/[.04] p-4"><p className="font-display font-bold text-orange-100">Ada beberapa tahap?</p><p className="mt-2 text-sm leading-relaxed text-slate-300">Kalikan banyak cara untuk pilihan yang harus terjadi bersama. Jika syarat membentuk kasus terpisah seperti 3, 4, atau 5 putri, jumlahkan hasil tiap kasus.</p></div>
              </div>
              <p className="mt-4 rounded-xl bg-[#071326]/70 p-3 text-sm leading-relaxed text-slate-300"><strong className="text-white">Trik teliti:</strong> pastikan tak ada pilihan yang dihitung dua kali. Untuk kelompok dengan ukuran berbeda, ukuran kelompok membantu membedakan bagiannya. Untuk dua kelompok sama besar yang tidak berlabel, biasanya perlu memperhitungkan pertukaran kelompok.</p>
            </section>
          </div>

          <aside className="hidden lg:block" aria-label="Daftar bagian materi">
            <div className="sticky top-6 rounded-2xl border border-white/10 bg-[#0d1728]/90 p-4 backdrop-blur" data-testid="lesson-outline">
              <p className="mb-4 font-body text-[10px] font-black uppercase tracking-[.2em] text-slate-400">Peta materi</p>
              <ol className="space-y-3 font-body text-xs text-slate-300">
                {sections.map(([number, label, id]) => <li key={id}><button type="button" onClick={() => jumpTo(id)} data-testid={`outline-${id}`} className="flex w-full items-center gap-2 rounded-md text-left transition-colors hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"><span className="grid h-6 w-11 place-items-center rounded-md bg-white/[.06] text-[9px] font-bold text-cyan-100/80">{number}</span>{label}</button></li>)}
              </ol>
              <div className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-400"><span className="mb-2 flex items-center gap-2 font-bold text-amber-100"><Compass className="h-3.5 w-3.5" aria-hidden="true" />Arah hitung</span>Urutan tak penting → pilih kombinasi. Gabungkan tahap dengan kali; gabungkan kasus terpisah dengan tambah.<ArrowDown className="mt-3 h-4 w-4 text-cyan-200" aria-hidden="true" /></div>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-cyan-200/[.05] p-3 text-xs leading-relaxed text-cyan-50"><ArrowRight className="h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />Rumusnya bekerja karena setiap kelompok muncul dalam r! susunan.</div>
            </div>
          </aside>
        </div>
        <div className="mt-9 text-center text-xs text-slate-400">Kombinasi membantu kita menghitung pilihan dengan teratur—sekarang giliranmu mencoba mengenali pilihan tanpa urutan!</div>
      </main>
    </div>
  );
};

export default SmaPeluangKombinasiPage;
