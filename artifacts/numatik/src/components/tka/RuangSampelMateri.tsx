import { type ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { BlockMath, InlineMath } from "react-katex";
import {
  BridgeDeckVisual,
  CoinAndDieTable,
  CoinSidesVisual,
  DieFaceVisual,
  ThreeCoinTreeVisual,
  TwoCoinTable,
  TwoDiceTable,
} from "./RuangSampelVisuals";

const Formula = ({ math }: { math: string }) => (
  <div className="my-3 max-w-full overflow-x-auto rounded-xl border border-cyan-400/20 bg-cyan-500/5 px-3 py-2 text-center">
    <BlockMath math={math} />
  </div>
);

const RuangSampelMateri = () => {
  const { theme } = useTheme();
  const isLight = theme !== "dark" && theme !== "ocean";
  const panel = isLight ? "border-slate-200 bg-white/90 shadow-sm" : "border-white/10 bg-slate-950/35";
  const mainText = isLight ? "text-slate-800" : "text-white/85";
  const mutedText = isLight ? "text-slate-600" : "text-white/65";
  const sectionTitle = isLight ? "text-indigo-700" : "text-cyan-200";
  const label = isLight ? "text-indigo-600" : "text-cyan-200";

  const Subsection = ({ title, children }: { title: string; children: ReactNode }) => (
    <section className={`rounded-2xl border p-4 sm:p-5 ${panel}`}>
      <h4 className={`mb-3 font-display text-base font-black sm:text-lg ${sectionTitle}`}>{title}</h4>
      <div className={`space-y-3 text-sm leading-relaxed ${mainText}`}>{children}</div>
    </section>
  );

  const ExampleCard = ({
    level,
    title,
    question,
    children,
  }: {
    level: "MUDAH" | "SEDANG" | "SULIT";
    title: string;
    question: ReactNode;
    children: ReactNode;
  }) => {
    const levelClass = level === "MUDAH"
      ? `bg-emerald-500/15 ${isLight ? "text-emerald-700" : "text-emerald-200"}`
      : level === "SEDANG"
        ? `bg-amber-500/15 ${isLight ? "text-amber-700" : "text-amber-200"}`
        : `bg-rose-500/15 ${isLight ? "text-rose-700" : "text-rose-200"}`;
    return (
      <article className={`rounded-2xl border p-4 sm:p-5 ${panel}`}>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-[10px] font-black tracking-widest ${levelClass}`}>{level}</span>
          <h5 className={`font-display text-sm font-bold ${mainText}`}>{title}</h5>
        </div>
        <div className={`mb-4 text-sm leading-relaxed ${mainText}`}>{question}</div>
        <div className={`rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-3 sm:p-4 ${mainText}`}>
          <p className={`mb-2 font-bold ${isLight ? "text-emerald-700" : "text-emerald-200"}`}>✅ Pembahasan</p>
          <div className="space-y-2 text-sm leading-relaxed">{children}</div>
        </div>
      </article>
    );
  };

  const SectionTitle = ({ number, title }: { number: string; title: string }) => (
    <div className="flex items-start gap-3">
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-sm font-black ${isLight ? "text-indigo-700" : "text-indigo-200"}`}>{number}</span>
      <div>
        <h3 className={`font-display text-lg font-black sm:text-xl ${sectionTitle}`}>{title}</h3>
      </div>
    </div>
  );

  return (
    <div className={`space-y-5 ${mainText}`}>
      <header className={`rounded-2xl border p-4 text-center sm:p-6 ${panel}`}>
        <p className={`text-lg font-black tracking-wide sm:text-2xl ${sectionTitle}`}>RUANG SAMPEL &amp; TITIK SAMPEL</p>
        <p className="mt-1 text-sm font-semibold">Kejadian Tunggal &amp; Kejadian Majemuk</p>
        <p className={`mt-1 text-xs ${mutedText}`}>Kelas 9 · Peluang · Materi Matematika</p>
      </header>

      <section className={`rounded-2xl border p-4 sm:p-5 ${panel}`}>
        <h3 className={`mb-3 font-display font-black ${sectionTitle}`}>🌟 Memahami Ruang Sampel</h3>
        <p className="mb-4 leading-relaxed">
          Bayangkan kamu sedang melempar sebuah koin ke udara. Koin itu bisa jatuh menunjukkan sisi <strong className={label}>Angka</strong> atau sisi <strong className={label}>Gambar</strong>. Nah, himpunan semua hasil yang <em>mungkin</em> terjadi itulah yang disebut <strong>Ruang Sampel</strong>!
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["🧪 Percobaan (Eksperimen)", "Kegiatan yang menghasilkan suatu hasil tertentu, misalnya melempar koin, melempar dadu, atau mengambil kartu."],
            ["🌐 Ruang Sampel (S)", "Himpunan semua hasil yang mungkin muncul dari suatu percobaan. Dilambangkan dengan huruf S."],
            ["📍 Titik Sampel", "Setiap anggota dari ruang sampel. Satu hasil tunggal dari percobaan disebut satu titik sampel."],
            ["🎯 Kejadian (K)", "Himpunan bagian dari ruang sampel yang memenuhi syarat tertentu. Contoh: muncul bilangan genap saat melempar dadu."],
          ].map(([title, description]) => (
            <div key={title} className={`rounded-xl border p-3 ${panel}`}>
              <p className={`mb-1 text-sm font-bold ${label}`}>{title}</p>
              <p className={`text-xs leading-relaxed ${mutedText}`}>{description}</p>
            </div>
          ))}
        </div>
        <div className={`mt-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3 text-sm ${mainText}`}>
          <p className={`mb-1 text-xs font-black uppercase tracking-wider ${label}`}>📌 Notasi Penting</p>
          <p><InlineMath math="S" /> = ruang sampel, <InlineMath math="n(S)" /> = banyaknya titik sampel</p>
          <p><InlineMath math="K" /> = kejadian tertentu, <InlineMath math="n(K)" /> = banyaknya anggota kejadian <InlineMath math="K" /></p>
        </div>
        <p className="mt-3 rounded-xl border border-amber-400/25 bg-amber-400/5 p-3 text-sm leading-relaxed">
          <strong className={isLight ? "text-amber-700" : "text-amber-200"}>Tips:</strong> Ruang sampel selalu ditulis dalam kurung kurawal {"{…}"}, sama seperti penulisan himpunan dalam matematika!
        </p>
      </section>

      <section className="space-y-4">
        <SectionTitle number="1" title="Sub-Bab 1: Ruang Sampel Kejadian Tunggal" />
        <Subsection title="🎯 Ringkasan Intisari">
          <p>
            Kejadian <strong>tunggal</strong> artinya kita hanya melakukan <em>satu jenis percobaan</em> dengan <em>satu alat</em>, misalnya melempar satu koin, melempar satu dadu, atau mengambil satu kartu. Cara paling mudah menentukan ruang sampelnya adalah dengan <strong>mendaftar semua kemungkinan</strong> satu per satu.
          </p>
        </Subsection>

        <Subsection title="🪙 a. Uang Koin">
          <CoinSidesVisual />
          <Formula math="S = \{A,\;G\},\quad n(S)=2" />
          <p><strong>A</strong> = Angka, <strong>G</strong> = Gambar.</p>
        </Subsection>

        <Subsection title="🎲 b. Dadu Bermuka Enam">
          <DieFaceVisual />
          <Formula math="S = \{1,\;2,\;3,\;4,\;5,\;6\},\quad n(S)=6" />
          <div className="overflow-x-auto rounded-xl border border-current/15" tabIndex={0}>
            <table className="w-full min-w-[420px] border-collapse text-center text-xs">
              <caption className="sr-only">Klasifikasi mata dadu sebagai bilangan genap, prima, dan ganjil</caption>
              <thead><tr>{["Mata Dadu", "Genap?", "Prima?", "Ganjil?"].map((x) => <th key={x} className="border border-slate-400/30 bg-cyan-500/15 px-3 py-2">{x}</th>)}</tr></thead>
              <tbody>
                {[
                  ["1", "—", "—", "✓"],
                  ["2", "✓", "✓", "—"],
                  ["3", "—", "✓", "✓"],
                  ["4", "✓", "—", "—"],
                  ["5", "—", "✓", "✓"],
                  ["6", "✓", "—", "—"],
                ].map((row) => <tr key={row[0]}>{row.map((value, index) => <td key={index} className="border border-slate-400/25 px-3 py-2">{value}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="🃏 c. Kartu Bridge">
          <BridgeDeckVisual />
          <p>Satu set kartu bridge terdiri dari <strong>52 kartu</strong> yang dibagi menjadi 4 jenis (suit), masing-masing berisi 13 kartu bernomor A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K.</p>
          <div className={`rounded-xl border p-3 ${panel}`}>
            <ul className="grid gap-1 text-sm sm:grid-cols-2">
              <li>♠ Sekop · 13 kartu · Hitam</li>
              <li>♥ Hati · 13 kartu · Merah</li>
              <li>♦ Wajik · 13 kartu · Merah</li>
              <li>♣ Keriting · 13 kartu · Hitam</li>
            </ul>
          </div>
          <Formula math="n(S)=52\text{ kartu}" />
          <ul className="grid gap-x-4 gap-y-1 text-sm sm:grid-cols-2">
            <li>• Kartu merah: 26 (♥ + ♦)</li>
            <li>• Kartu hitam: 26 (♠ + ♣)</li>
            <li>• Kartu As (A): 4 kartu</li>
            <li>• Kartu gambar (J/Q/K): 12 kartu</li>
            <li>• Kartu bernomor (2–10): 36 kartu</li>
            <li>• Kartu King: 4 kartu</li>
          </ul>
        </Subsection>

        <div>
          <h4 className={`mb-3 font-display text-base font-black ${sectionTitle}`}>📝 Contoh Soal Sub-Bab 1</h4>
          <div className="space-y-3">
            <ExampleCard level="MUDAH" title="Soal 1" question={<>Sebuah uang koin dilempar satu kali. Tentukan:<br />a. Ruang sampel <InlineMath math="S" /> dan <InlineMath math="n(S)" /><br />b. Kejadian <InlineMath math="K" /> = muncul sisi Angka, serta <InlineMath math="n(K)" /></>}>
              <p>Satu koin memiliki 2 sisi: Angka (A) dan Gambar (G).</p>
              <p>a. Daftar semua kemungkinan:</p>
              <Formula math="S=\{A,\;G\},\quad n(S)=2" />
              <p>b. Kejadian muncul Angka hanya ada 1 anggota:</p>
              <Formula math="K=\{A\},\quad n(K)=1" />
              <p>🔑 Dari 2 kemungkinan, hanya 1 yang memenuhi kejadian K.</p>
            </ExampleCard>

            <ExampleCard level="SEDANG" title="Soal 2" question={<>Sebuah dadu bermuka enam dilempar satu kali. Tentukan ruang sampel <InlineMath math="S" />, kemudian tentukan anggota dan nilai <InlineMath math="n(K)" /> untuk kejadian berikut:<br />a. <InlineMath math="K_1" /> = muncul bilangan prima<br />b. <InlineMath math="K_2" /> = muncul bilangan lebih dari 4</>}>
              <p>Ruang sampel dadu:</p>
              <Formula math="S=\{1,\;2,\;3,\;4,\;5,\;6\},\quad n(S)=6" />
              <p>a. Bilangan prima dari 1–6 adalah: 2, 3, 5.</p>
              <Formula math="K_1=\{2,\;3,\;5\},\quad n(K_1)=3" />
              <p>b. Bilangan lebih dari 4 dari 1–6 adalah: 5, 6.</p>
              <Formula math="K_2=\{5,\;6\},\quad n(K_2)=2" />
              <p>💡 Ingat: 1 bukan bilangan prima! Bilangan prima dimulai dari 2.</p>
            </ExampleCard>

            <ExampleCard level="SULIT" title="Soal 3" question={<>Dari satu set kartu bridge (52 kartu), diambil satu kartu secara acak. Tentukan <InlineMath math="n(S)" /> dan nilai <InlineMath math="n(K)" /> untuk kejadian berikut:<br />a. <InlineMath math="K_1" /> = terambil kartu merah bernomor ganjil<br />b. <InlineMath math="K_2" /> = terambil kartu hitam bukan kartu gambar (bukan J, Q, K)</>}>
              <Formula math="n(S)=52" />
              <p><strong>a. Kartu merah bernomor ganjil:</strong></p>
              <p>Kartu merah = ♥ dan ♦ (masing-masing 13 kartu). Nomor ganjil dari A, 2–10, J, Q, K: yaitu A, 3, 5, 7, 9 → <strong>5 nomor ganjil</strong>.</p>
              <Formula math="n(K_1)=2\text{ suit}\times5\text{ kartu}=10\text{ kartu}" />
              <p><strong>b. Kartu hitam bukan kartu gambar:</strong></p>
              <p>Kartu hitam = ♠ dan ♣ (masing-masing 13 kartu), jadi total 26 kartu hitam. Kartu gambar hitam = J♠, Q♠, K♠, J♣, Q♣, K♣ = 6 kartu.</p>
              <Formula math="n(K_2)=26-6=20\text{ kartu}" />
              <p>⚠️ Perhatikan As (A): dalam kartu bridge, As dihitung bernilai 1 dan termasuk bilangan ganjil!</p>
            </ExampleCard>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionTitle number="2" title="Sub-Bab 2: Ruang Sampel Kejadian Majemuk" />
        <Subsection title="🎯 Ringkasan Intisari">
          <p>
            Kejadian <strong>majemuk</strong> terjadi saat percobaan melibatkan <em>lebih dari satu alat</em> sekaligus, misalnya dua koin, tiga koin, dua dadu, atau koin dengan dadu. Ada rumus praktis untuk menghitung <InlineMath math="n(S)" />:
          </p>
          <Formula math="n(S_{\text{majemuk}})=n(S_1)\times n(S_2)\times\cdots\times n(S_k)" />
          <p>Kalikan banyaknya kemungkinan masing-masing alat!</p>
        </Subsection>

        <Subsection title="🪙🪙 a. Pengetosan Dua Koin">
          <p>Angka (A) atau Gambar (G), jadi <InlineMath math="n(S)=2\times2=4" />.</p>
          <TwoCoinTable />
          <Formula math="S=\{AA,\;AG,\;GA,\;GG\},\quad n(S)=4" />
        </Subsection>

        <Subsection title="🪙🪙🪙 b. Pengetosan Tiga Koin">
          <p><InlineMath math="n(S)=2\times2\times2=8" /> — gunakan diagram pohon untuk mendaftarnya:</p>
          <p className={`font-bold ${label}`}>🌳 Diagram Pohon</p>
          <ThreeCoinTreeVisual />
          <Formula math="S=\{AAA,\;AAG,\;AGA,\;AGG,\;GAA,\;GAG,\;GGA,\;GGG\}" />
          <Formula math="n(S)=8" />
        </Subsection>

        <Subsection title="🎲🎲 c. Pengetosan Dua Dadu">
          <p>Setiap dadu punya 6 sisi, jadi <InlineMath math="n(S)=6\times6=36" />.</p>
          <TwoDiceTable />
          <p>🟡 Sel berwarna kuning = pasangan dengan jumlah 7 (ada 6 pasangan).</p>
          <p><InlineMath math="n(S)=36" /> pasangan terurut. Ditulis sebagai pasangan terurut (dadu 1, dadu 2).</p>
        </Subsection>

        <Subsection title="🪙🎲 d. Pengetosan Koin dan Dadu">
          <p>Koin punya 2 kemungkinan, dadu punya 6, jadi <InlineMath math="n(S)=2\times6=12" />.</p>
          <CoinAndDieTable />
          <Formula math="S=\{(A,1),(A,2),(A,3),(A,4),(A,5),(A,6),(G,1),(G,2),(G,3),(G,4),(G,5),(G,6)\}" />
          <Formula math="n(S)=12" />
        </Subsection>

        <div>
          <h4 className={`mb-3 font-display text-base font-black ${sectionTitle}`}>📝 Contoh Soal Sub-Bab 2</h4>
          <div className="space-y-3">
            <ExampleCard level="MUDAH" title="Soal 1" question={<>Dua uang koin dilempar bersamaan satu kali. Tentukan:<br />a. <InlineMath math="n(S)" /><br />b. Kejadian <InlineMath math="K" /> = muncul tepat satu sisi Angka, serta <InlineMath math="n(K)" /></>}>
              <p>a. Ruang sampel dua koin:</p>
              <Formula math="S=\{AA,\;AG,\;GA,\;GG\},\quad n(S)=4" />
              <p>b. Tepat satu Angka artinya hanya satu koin menunjukkan A:</p>
              <Formula math="K=\{AG,\;GA\},\quad n(K)=2" />
              <p>🔑 AA bukan karena ada DUA Angka. GG bukan karena tidak ada Angka sama sekali.</p>
            </ExampleCard>

            <ExampleCard level="SEDANG" title="Soal 2" question={<>Dua buah dadu dilempar bersamaan. Tentukan <InlineMath math="n(S)" /> dan <InlineMath math="n(K)" /> untuk kejadian <InlineMath math="K" /> = jumlah kedua mata dadu sama dengan 8.</>}>
              <Formula math="n(S)=6\times6=36" />
              <p>Cari semua pasangan (d1, d2) yang jumlahnya = 8:</p>
              <ul className="list-inside list-disc">
                <li>(2, 6)</li><li>(3, 5)</li><li>(4, 4)</li><li>(5, 3)</li><li>(6, 2)</li>
              </ul>
              <Formula math="K=\{(2,6),(3,5),(4,4),(5,3),(6,2)\},\quad n(K)=5" />
              <p>💡 Ingat: (2,6) dan (6,2) adalah pasangan yang <em>berbeda</em> karena dadu pertama dan kedua dibedakan!</p>
            </ExampleCard>

            <ExampleCard level="SULIT" title="Soal 3" question={<>Sebuah koin dan sebuah dadu dilempar bersamaan. Tentukan <InlineMath math="n(S)" /> dan <InlineMath math="n(K)" /> untuk:<br />a. <InlineMath math="K_1" /> = muncul Angka dan bilangan genap<br />b. <InlineMath math="K_2" /> = muncul Gambar dan bilangan lebih dari 3<br />c. <InlineMath math="K_3" /> = muncul Gambar atau bilangan prima</>}>
              <Formula math="n(S)=2\times6=12" />
              <p>Ruang sampel: (A,1), (A,2), (A,3), (A,4), (A,5), (A,6), (G,1), (G,2), (G,3), (G,4), (G,5), (G,6).</p>
              <p><strong>a. Angka DAN genap</strong> (bilangan genap: 2, 4, 6):</p>
              <Formula math="K_1=\{(A,2),(A,4),(A,6)\},\quad n(K_1)=3" />
              <p><strong>b. Gambar DAN lebih dari 3</strong> (yaitu 4, 5, 6):</p>
              <Formula math="K_2=\{(G,4),(G,5),(G,6)\},\quad n(K_2)=3" />
              <p><strong>c. Gambar ATAU prima</strong> (prima: 2, 3, 5). Hitung dengan metode gabungan:</p>
              <p>Gambar: (G,1), (G,2), (G,3), (G,4), (G,5), (G,6) → 6 pasangan.</p>
              <p>Prima tapi BUKAN Gambar: (A,2), (A,3), (A,5) → 3 pasangan.</p>
              <Formula math="K_3=\{(G,1),(G,2),(G,3),(G,4),(G,5),(G,6),(A,2),(A,3),(A,5)\}" />
              <Formula math="n(K_3)=9" />
              <p>⚠️ Kata "ATAU" berarti salah satu atau keduanya terpenuhi. Hindari menghitung (G,2), (G,3), (G,5) dua kali!</p>
            </ExampleCard>
          </div>
        </div>
      </section>

      <section className={`rounded-2xl border p-4 sm:p-5 ${panel}`}>
        <h3 className={`mb-3 font-display text-lg font-black ${sectionTitle}`}>📋 Rangkuman &amp; Tabel Ruang Sampel</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-xs">
            <caption className="sr-only">Ringkasan jumlah anggota ruang sampel berbagai percobaan</caption>
            <thead><tr>{["Percobaan", "n(S)", "Cara Menghitung"].map((x) => <th key={x} className="border border-slate-400/30 bg-cyan-500/15 px-3 py-2">{x}</th>)}</tr></thead>
            <tbody>
              {[
                ["1 koin", "2", "Langsung daftar: {A, G}"],
                ["1 dadu", "6", "Langsung daftar: {1,2,3,4,5,6}"],
                ["1 kartu bridge", "52", "Langsung: 4 suit × 13 kartu"],
                ["2 koin", "4", "2 × 2 (tabel 2×2)"],
                ["3 koin", "8", "2 × 2 × 2 (diagram pohon)"],
                ["2 dadu", "36", "6 × 6 (tabel 6×6)"],
                ["1 koin + 1 dadu", "12", "2 × 6 (tabel 2×6)"],
              ].map((row) => <tr key={row[0]}>{row.map((x, index) => <td key={index} className="border border-slate-400/25 px-3 py-2">{x}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
      </section>

      <section className={`rounded-2xl border p-4 sm:p-5 ${panel}`}>
        <h3 className={`mb-2 font-display text-lg font-black ${sectionTitle}`}>🧠 Rumus Kunci</h3>
        <Formula math="n(S_{\text{majemuk}})=n(S_1)\times n(S_2)\times\cdots\times n(S_k)" />
        <p className={`text-sm ${mutedText}`}>Berlaku untuk kejadian majemuk yang saling bebas.</p>
      </section>

      <section className={`rounded-2xl border p-4 sm:p-5 ${panel}`}>
        <h3 className={`mb-3 font-display text-lg font-black ${sectionTitle}`}>✅ Checklist Mengerjakan Soal Ruang Sampel</h3>
        <ol className="space-y-2 text-sm leading-relaxed">
          <li>▸ Identifikasi alat/benda yang digunakan dalam percobaan.</li>
          <li>▸ Tentukan <InlineMath math="n(S)" /> masing-masing alat (koin = 2, dadu = 6, kartu = 52).</li>
          <li>▸ Untuk percobaan majemuk: kalikan <InlineMath math="n(S)" /> tiap alat.</li>
          <li>▸ Buat tabel atau diagram pohon untuk melihat semua kemungkinan.</li>
          <li>▸ Tentukan kejadian <InlineMath math="K" /> dan daftar anggotanya dari ruang sampel.</li>
          <li>▸ Hitung <InlineMath math="n(K)" /> = banyaknya anggota kejadian.</li>
        </ol>
      </section>

      <section className={`rounded-2xl border p-4 sm:p-5 ${panel}`}>
        <h3 className={`mb-1 font-display text-lg font-black ${sectionTitle}`}>🎲 Rangkuman — Ruang Sampel &amp; Kejadian</h3>
        <p className={`mb-4 text-sm ${mutedText}`}>Fondasi peluang — pahami dulu semua kemungkinan sebelum menghitung peluang!</p>
        <p className={`mb-3 inline-flex rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 text-xs font-bold ${isLight ? "text-amber-700" : "text-amber-200"}`}>📖 Buku Animasi Matematika</p>
        <h4 className={`mb-3 font-bold ${mainText}`}>🗝️ Konsep Utama yang Harus Dikuasai</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["🌐 Ruang Sampel (S)", "Himpunan semua kemungkinan hasil yang dapat terjadi dalam suatu percobaan. Ditulis dalam kurung kurawal {}. n(S) = banyaknya anggota ruang sampel."],
            ["📍 Titik Sampel", "Setiap anggota dari ruang sampel disebut titik sampel. Contoh: pada pelemparan dadu, setiap angka (1,2,3,4,5,6) adalah satu titik sampel."],
            ["🎯 Kejadian (K)", "Himpunan bagian dari ruang sampel yang memenuhi syarat tertentu. n(K) = banyak titik sampel yang memenuhi kejadian tersebut."],
            ["🗂️ Tabel & Diagram Pohon", "Untuk percobaan majemuk (dua atau lebih), gunakan tabel silang atau diagram pohon agar semua kemungkinan tercatat dengan sistematis dan tidak ada yang terlewat."],
          ].map(([title, description]) => (
            <div key={title} className={`rounded-xl border p-3 ${panel}`}>
              <p className={`mb-1 text-sm font-bold ${label}`}>{title}</p>
              <p className={`text-xs leading-relaxed ${mutedText}`}>{description}</p>
            </div>
          ))}
        </div>
        <h4 className={`mb-2 mt-5 font-bold ${mainText}`}>📐 Rumus-Rumus Kunci</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className={`rounded-xl border p-3 text-center ${panel}`}>
            <p className={`mb-2 text-xs font-bold ${label}`}>Ruang Sampel Pelemparan n Dadu</p>
            <div className="overflow-x-auto"><BlockMath math="n(S)=6^n" /></div>
          </div>
          <div className={`rounded-xl border p-3 text-center ${panel}`}>
            <p className={`mb-2 text-xs font-bold ${label}`}>Ruang Sampel Pelemparan n Koin</p>
            <div className="overflow-x-auto"><BlockMath math="n(S)=2^n" /></div>
          </div>
        </div>
        <h4 className={`mb-3 mt-5 font-bold ${mainText}`}>💡 Tips &amp; Trik Jitu</h4>
        <ul className="space-y-2 text-sm leading-relaxed">
          <li>💡 Ruang sampel selalu ditulis dalam kurung kurawal {}, sama seperti himpunan. Pastikan semua kemungkinan tercantum dan tidak ada yang berulang!</li>
          <li>🎯 Untuk dua percobaan sekaligus (misal 2 dadu), gunakan tabel silang — baris = dadu 1, kolom = dadu 2. Total kotak = <InlineMath math="n(S)" />.</li>
          <li>🌳 Diagram pohon sangat membantu untuk percobaan berantai (koin + dadu, ambil 2 bola, dll). Hitung semua cabang ujung untuk mendapat <InlineMath math="n(S)" />.</li>
          <li>🃏 Kartu bridge: <InlineMath math="n(S)=52" />. Terdiri dari 4 jenis (hati, wajik, keriting, sekop) masing-masing 13 kartu (As, 2–10, J, Q, K).</li>
        </ul>
        <div className="mt-5 rounded-xl border border-amber-400/25 bg-amber-400/5 p-4">
          <p className={`mb-1 font-bold ${isLight ? "text-amber-700" : "text-amber-200"}`}>🎯 Kesimpulan</p>
          <p className="text-sm leading-relaxed">
            Ruang sampel adalah peta lengkap semua kemungkinan — tanpa memahami ruang sampel, tidak mungkin menghitung peluang dengan benar. Pahami dulu seluruh kemungkinan, baru tentukan kejadian yang diinginkan. Inilah dasar logika peluang yang digunakan di kriptografi, AI, dan analisis risiko!
          </p>
        </div>
      </section>
    </div>
  );
};

export default RuangSampelMateri;
