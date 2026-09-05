import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";

type Question = {
  number: number;
  prompt: ReactNode;
  options: string[];
  correct: number;
};

type ContextBlock = {
  title: string;
  range: string;
  body: ReactNode;
};

const CONTEXTS: ContextBlock[] = [
  {
    title: "Data Aktivitas Gunung Api di Indonesia",
    range: "1–3",
    body: "Perhatikan data berikut. Jumlah erupsi yang tercatat sepanjang 2024 adalah: Semeru 28.640 kali, Ibu 20.850 kali, Ili Lewotolok 12.400 kali, Dukono 3.450 kali, Anak Krakatau 720 kali, Marapi 510 kali, Dempo 6 kali, dan Lewotobi Laki-Laki 6 kali.",
  },
  {
    title: "Program Pengelolaan Sampah Plastik",
    range: "4–6",
    body: "Produksi sampah plastik suatu daerah mencapai 72 juta ton per tahun. Sebanyak 18% sudah didaur ulang dan pemerintah menargetkan pengurangan 28%. Komposisinya: kantong plastik 32%, botol minuman 24%, kemasan makanan 22%, dan jenis lainnya 22%.",
  },
  {
    title: "Program Bantuan Sosial",
    range: "7–9",
    body: "Pemerintah menyiapkan dana Rp1,44 triliun untuk 6.000 kepala keluarga selama 8 bulan. Penerima di Kecamatan A, B, C, D, dan E berturut-turut berjumlah 720, 840, 540, 960, dan 780 KK.",
  },
  {
    title: "Produksi Keripik Singkong UMKM",
    range: "10–12",
    body: "Biaya produksi per hari dirumuskan B(x) = 2.800x + 42.000, dengan x banyak bungkus. Setiap bungkus dijual Rp6.500 dan target keuntungan harian sekurang-kurangnya Rp68.000.",
  },
  {
    title: "Memilih Paket Internet dan Telepon",
    range: "13–15",
    body: "TelkomIndo Keluarga berharga Rp135.000 dengan 24 GB dan 120 menit. IndosatOreo Keluarga berharga Rp110.000 dengan 18 GB dan 80 menit. Paket personal masing-masing berharga Rp85.000 untuk 11 GB + 60 menit dan Rp65.000 untuk 9 GB + 40 menit. Add-on 4 GB berharga Rp22.000 dari TelkomIndo dan Rp18.000 dari IndosatOreo.",
  },
  {
    title: "Lomba Memindahkan Air",
    range: "16–18",
    body: "Ember kecil Regu Merah berbentuk tabung dengan diameter 28 cm dan tinggi 36 cm. Ember Regu Putih berdiameter 28 cm dan tinggi 50 cm. Gelas ukur yang tersedia berisi 150 ml. Gunakan π = 22/7 dan 1.000 cm³ = 1.000 ml.",
  },
  {
    title: "Persiapan Festival Budaya Sekolah",
    range: "19–21",
    body: "Sebuah tangga dekorasi panjangnya 15 m disandarkan pada dinding. Jarak kaki tangga ke dinding 9 m. Ornamen segitiga memiliki titik R(6, 2) dan dicerminkan terhadap sumbu-y. Hiasan juring memiliki jari-jari 14 cm dan sudut pusat 90°.",
  },
  {
    title: "Harga Barang Pokok",
    range: "22–24",
    body: "Harga beras Rp15.000/kg, gula pasir Rp17.000/kg, minyak goreng Rp19.000/liter, dan telur Rp25.000/kg. Belanja di atas Rp100.000 dan terdiri atas minimal 3 jenis barang mendapat diskon 15%.",
  },
  {
    title: "Perjalanan Timnas Indonesia di Piala AFF",
    range: "25–30",
    body: "Dalam 14 edisi sebelumnya, Timnas Indonesia belum pernah juara dan 5 kali menjadi runner-up. Pada tiga laga awal edisi berikutnya, Indonesia menang 4–0, menang 2–1, lalu kalah 0–2.",
  },
];

const QUESTIONS: Question[] = [
  {
    number: 1,
    prompt: "Berapakah jumlah seluruh erupsi berdasarkan data tersebut?",
    options: ["A. 65.582 kali", "B. 66.082 kali", "C. 66.582 kali", "D. 67.582 kali"],
    correct: 2,
  },
  {
    number: 2,
    prompt: "Pernyataan yang tepat berdasarkan data aktivitas gunung api adalah ....",
    options: [
      "A. Erupsi Ibu lebih dari 21.000 kali.",
      "B. Erupsi Ili Lewotolok dan Dukono berjumlah 15.850 kali.",
      "C. Erupsi Anak Krakatau kurang dari 700 kali.",
      "D. Erupsi Dempo dua kali erupsi Lewotobi.",
    ],
    correct: 1,
  },
  {
    number: 3,
    prompt: "Selisih jumlah erupsi Semeru dan Ibu adalah ....",
    options: ["A. 6.790 kali", "B. 7.790 kali", "C. 8.790 kali", "D. 9.790 kali"],
    correct: 0,
  },
  {
    number: 4,
    prompt: "Berapa banyak sampah plastik yang sudah berhasil didaur ulang?",
    options: ["A. 10,96 juta ton", "B. 12,96 juta ton", "C. 14,40 juta ton", "D. 18,00 juta ton"],
    correct: 1,
  },
  {
    number: 5,
    prompt: "Jumlah sampah plastik yang belum didaur ulang adalah ....",
    options: ["A. 52,04 juta ton", "B. 57,60 juta ton", "C. 59,04 juta ton", "D. 61,04 juta ton"],
    correct: 2,
  },
  {
    number: 6,
    prompt: "Jika tingkat daur ulang meningkat menjadi 35%, jumlah sampah yang didaur ulang menjadi ....",
    options: ["A. 21,60 juta ton", "B. 23,40 juta ton", "C. 25,20 juta ton", "D. 28,80 juta ton"],
    correct: 2,
  },
  {
    number: 7,
    prompt: "Besar bantuan yang diterima setiap KK setiap bulan adalah ....",
    options: ["A. Rp25.000", "B. Rp30.000", "C. Rp35.000", "D. Rp40.000"],
    correct: 1,
  },
  {
    number: 8,
    prompt: "Kecamatan yang menerima bantuan untuk jumlah KK paling banyak adalah ....",
    options: ["A. Kecamatan A", "B. Kecamatan B", "C. Kecamatan C", "D. Kecamatan D"],
    correct: 3,
  },
  {
    number: 9,
    prompt: "Jumlah penerima bantuan di Kecamatan A sampai E seluruhnya adalah ....",
    options: ["A. 3.640 KK", "B. 3.740 KK", "C. 3.840 KK", "D. 3.940 KK"],
    correct: 2,
  },
  {
    number: 10,
    prompt: "Banyak bungkus minimal yang harus dijual agar target keuntungan tercapai adalah ....",
    options: ["A. 28 bungkus", "B. 29 bungkus", "C. 30 bungkus", "D. 31 bungkus"],
    correct: 2,
  },
  {
    number: 11,
    prompt: "Berapakah biaya produksi untuk 35 bungkus keripik?",
    options: ["A. Rp130.000", "B. Rp140.000", "C. Rp145.000", "D. Rp150.000"],
    correct: 1,
  },
  {
    number: 12,
    prompt: "Keuntungan yang diperoleh jika terjual 60 bungkus adalah ....",
    options: ["A. Rp158.000", "B. Rp168.000", "C. Rp180.000", "D. Rp192.000"],
    correct: 2,
  },
  {
    number: 13,
    prompt: "Rani membutuhkan 16 GB internet dan 70 menit telepon. Pilihan paling hemat adalah ....",
    options: [
      "A. TelkomIndo Keluarga, Rp135.000",
      "B. IndosatOreo Keluarga, Rp110.000",
      "C. IndosatOreo Keluarga + add-on, Rp128.000",
      "D. TelkomIndo Personal + add-on, Rp107.000",
    ],
    correct: 2,
  },
  {
    number: 14,
    prompt: "Budi membutuhkan 21 GB internet dan 100 menit telepon. Paket yang paling tepat tanpa menggabungkan add-on telepon adalah ....",
    options: [
      "A. TelkomIndo Keluarga",
      "B. IndosatOreo Keluarga",
      "C. TelkomIndo Personal",
      "D. IndosatOreo Personal",
    ],
    correct: 0,
  },
  {
    number: 15,
    prompt: "Untuk kebutuhan 12 GB dan 40 menit telepon, selisih biaya pilihan termurah dari kedua provider adalah ....",
    options: ["A. Rp18.000", "B. Rp20.000", "C. Rp24.000", "D. Rp28.000"],
    correct: 2,
  },
  {
    number: 16,
    prompt: "Volume ember Regu Merah adalah ....",
    options: ["A. 20.176 cm³", "B. 21.176 cm³", "C. 22.176 cm³", "D. 23.176 cm³"],
    correct: 2,
  },
  {
    number: 17,
    prompt: "Minimal berapa kali gelas ukur 150 ml harus dipindahkan agar ember Merah terisi penuh?",
    options: ["A. 146 kali", "B. 147 kali", "C. 148 kali", "D. 149 kali"],
    correct: 2,
  },
  {
    number: 18,
    prompt: "Selisih volume ember Putih dan ember Merah adalah ....",
    options: ["A. 7.624 cm³", "B. 8.624 cm³", "C. 9.624 cm³", "D. 10.624 cm³"],
    correct: 1,
  },
  {
    number: 19,
    prompt: "Tinggi dinding yang dapat dijangkau oleh tangga dekorasi adalah ....",
    options: ["A. 10 m", "B. 11 m", "C. 12 m", "D. 13 m"],
    correct: 2,
  },
  {
    number: 20,
    prompt: "Bayangan titik R(6, 2) terhadap sumbu-y adalah ....",
    options: ["A. (−6, 2)", "B. (6, −2)", "C. (−2, 6)", "D. (2, −6)"],
    correct: 0,
  },
  {
    number: 21,
    prompt: "Luas hiasan juring dengan data tersebut adalah ....",
    options: ["A. 144 cm²", "B. 150 cm²", "C. 154 cm²", "D. 168 cm²"],
    correct: 2,
  },
  {
    number: 22,
    prompt: "Bentuk aljabar untuk total harga x kg beras, y kg gula, z liter minyak, dan w kg telur adalah ....",
    options: [
      "A. 15.000x + 17.000y + 19.000z + 25.000w",
      "B. 15.000x + 17.000y + 19.000z",
      "C. 15.000x + 19.000z + 25.000w",
      "D. 17.000y + 19.000z + 25.000w",
    ],
    correct: 0,
  },
  {
    number: 23,
    prompt: "Seseorang membeli 2 kg beras, 3 kg gula, 1 liter minyak, dan 2 kg telur. Total belanja setelah diskon adalah ....",
    options: ["A. Rp120.000", "B. Rp127.500", "C. Rp130.000", "D. Rp135.000"],
    correct: 1,
  },
  {
    number: 24,
    prompt: "Jika total belanja sebelum diskon Rp150.000 dan pembeli mengambil 4 jenis barang, besar potongan harganya adalah ....",
    options: ["A. Rp15.000", "B. Rp20.000", "C. Rp22.500", "D. Rp25.000"],
    correct: 2,
  },
  {
    number: 25,
    prompt: "Peluang 85% untuk menjuarai turnamen dapat ditafsirkan sebagai ....",
    options: [
      "A. Diperkirakan juara 15 kali dari 100 kesempatan.",
      "B. Diperkirakan juara 50 kali dari 100 kesempatan.",
      "C. Diperkirakan juara 85 kali dari 100 kesempatan.",
      "D. Pasti juara pada setiap kesempatan.",
    ],
    correct: 2,
  },
  {
    number: 26,
    prompt: "Frekuensi relatif Indonesia menjadi runner-up berdasarkan 14 edisi sebelumnya adalah ....",
    options: ["A. 25%", "B. Sekitar 30,7%", "C. Sekitar 35,7%", "D. 40%"],
    correct: 2,
  },
  {
    number: 27,
    prompt: "Rata-rata selisih gol Indonesia dalam tiga laga awal adalah ....",
    options: ["A. +0,50 gol/laga", "B. +0,75 gol/laga", "C. +1,00 gol/laga", "D. +1,50 gol/laga"],
    correct: 2,
  },
  {
    number: 28,
    prompt: "Persentase kemenangan Indonesia dalam tiga laga tersebut adalah ....",
    options: ["A. 33,3%", "B. 50%", "C. 66,7%", "D. 75%"],
    correct: 2,
  },
  {
    number: 29,
    prompt: "Jumlah gol yang dicetak Indonesia dan jumlah gol yang kemasukan dalam tiga laga itu berturut-turut adalah ....",
    options: ["A. 5 dan 2", "B. 6 dan 3", "C. 7 dan 4", "D. 8 dan 5"],
    correct: 1,
  },
  {
    number: 30,
    prompt: "Peluang komplemen dari peluang 85% Indonesia menjadi juara adalah ....",
    options: ["A. 5%", "B. 10%", "C. 15%", "D. 20%"],
    correct: 2,
  },
];

const TKATryOut2Page = () => {
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const selectAnswer = (questionNumber: number, optionIndex: number) => {
    if (selectedAnswers[questionNumber] !== undefined) return;
    playPopSound();
    setSelectedAnswers((previous) => ({ ...previous, [questionNumber]: optionIndex }));
  };

  const getContextForQuestion = (number: number) =>
    CONTEXTS.find((context) => {
      const [start, end] = context.range.split("–").map(Number);
      return number >= start && number <= end;
    });

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = QUESTIONS.filter((question) => selectedAnswers[question.number] === question.correct).length;

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-x-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <div className="bg-card/80 backdrop-blur border border-accent/30 rounded-2xl p-5 mb-6">
          <div className="text-center">
            <img
              src="/logo-numatik.png"
              alt="NUMATIK"
              className="mx-auto mb-2 w-12 h-12 object-contain drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]"
            />
            <p className="font-body text-white/60 text-xs mb-1">PEMANTAPAN DAN PERSIAPAN</p>
            <h1 className="font-display text-lg font-bold text-primary text-glow-cyan mb-1">
              TRY OUT TKA MATEMATIKA
            </h1>
            <p className="font-body text-white/60 text-xs mb-3">TAHUN PELAJARAN 2026/2027</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-left text-xs font-body">
            <div className="bg-white/5 rounded-lg p-2">
              <span className="text-white/40">Mata Pelajaran:</span>
              <span className="text-white ml-1">Matematika</span>
            </div>
            <div className="bg-white/5 rounded-lg p-2">
              <span className="text-white/40">Kelas:</span>
              <span className="text-white ml-1">IX (Sembilan)</span>
            </div>
            <div className="bg-white/5 rounded-lg p-2">
              <span className="text-white/40">Paket:</span>
              <span className="text-accent ml-1 font-bold">TRY OUT PAKET 2</span>
            </div>
            <div className="bg-white/5 rounded-lg p-2">
              <span className="text-white/40">Waktu:</span>
              <span className="text-white ml-1">60 Menit</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 mb-6">
          <p className="font-body text-blue-300 text-xs font-bold mb-2">PETUNJUK UMUM</p>
          <ol className="list-decimal list-inside space-y-1 text-white/70 text-xs font-body">
            <li>Berdoalah sebelum dan sesudah mengerjakan try out.</li>
            <li>Jumlah soal sebanyak 30 butir soal.</li>
            <li>Bacalah setiap konteks dan soal dengan cermat.</li>
            <li>Pilih satu jawaban yang paling tepat pada setiap soal.</li>
            <li>Jawaban akan langsung menunjukkan hasil benar atau salah.</li>
          </ol>
        </div>

        <div className="flex flex-col gap-5">
          {QUESTIONS.map((question, index) => {
            const context = getContextForQuestion(question.number);
            const previousContext = index > 0 ? getContextForQuestion(QUESTIONS[index - 1].number) : undefined;
            const selected = selectedAnswers[question.number];
            const answered = selected !== undefined;

            return (
              <div key={question.number}>
                {context && context !== previousContext && (
                  <div className="bg-blue-950/40 border border-blue-500/30 rounded-xl p-4 mb-3">
                    <p className="font-body text-blue-300 text-xs font-bold mb-2 uppercase tracking-wide">
                      Perhatikan informasi berikut untuk menjawab nomor {context.range}!
                    </p>
                    <p className="font-body text-white/90 text-xs font-bold mb-2">{context.title}</p>
                    <p className="font-body text-white/70 text-xs leading-relaxed">{context.body}</p>
                  </div>
                )}
                <div className="bg-card/70 backdrop-blur border border-border rounded-xl p-5">
                  <div className="flex gap-3">
                    <span className="bg-accent/20 text-accent font-display font-bold text-sm w-7 h-7 rounded-lg flex items-center justify-center shrink-0">
                      {question.number}
                    </span>
                    <div className="flex-1">
                      <p className="font-body text-white/90 text-sm leading-relaxed mb-3">{question.prompt}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = selected === optionIndex;
                          const isCorrect = optionIndex === question.correct;
                          let optionClass =
                            "border rounded-lg px-3 py-2 text-xs font-body transition-all flex items-center justify-between text-left ";

                          if (!answered) {
                            optionClass +=
                              "bg-white/5 border-white/10 text-white/80 cursor-pointer hover:bg-white/10 hover:border-cyan-500/40 active:scale-95";
                          } else if (isCorrect) {
                            optionClass += "bg-green-900/30 border-green-500/50 text-green-300 font-bold";
                          } else if (isSelected) {
                            optionClass += "bg-red-900/30 border-red-500/50 text-red-300";
                          } else {
                            optionClass += "bg-white/5 border-white/10 text-white/30";
                          }

                          return (
                            <button
                              type="button"
                              key={option}
                              className={optionClass}
                              onClick={() => selectAnswer(question.number, optionIndex)}
                              disabled={answered}
                            >
                              <span>{option}</span>
                              {answered && isCorrect && <span className="ml-2 text-green-400 font-bold shrink-0">✓ Benar!</span>}
                              {answered && isSelected && !isCorrect && <span className="ml-2 text-red-400 font-bold shrink-0">✗ Salah</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-xl border border-cyan-500/25 bg-cyan-950/20 px-4 py-3 text-center font-body text-xs text-cyan-100/75">
          Terjawab {answeredCount} dari {QUESTIONS.length} soal
          {answeredCount > 0 && <span className="ml-2 font-bold text-cyan-300">· Skor sementara {correctCount}/{QUESTIONS.length}</span>}
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => { playPopSound(); navigate("/tka"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            ← Kembali ke TKA
          </button>
        </div>
      </div>
    </div>
  );
};

export default TKATryOut2Page;