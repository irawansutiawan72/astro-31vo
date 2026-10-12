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
      <section className={`rounded-2xl border p-4 sm:p-5 ${panel}`}>
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
      </section>

      <section className="space-y-4">
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

    </div>
  );
};

export default RuangSampelMateri;
