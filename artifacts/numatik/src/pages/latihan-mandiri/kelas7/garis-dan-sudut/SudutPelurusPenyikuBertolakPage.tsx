import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronLeft } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import { useTheme } from "@/contexts/ThemeContext";
import { RedrawnAngleDiagram } from "./AngleRedrawSVGs";

function SudutPelurusDiagram({ isDark }: { isDark: boolean }) {
  const colors = isDark
    ? {
        background: "rgba(15, 23, 42, 0.92)",
        border: "rgba(250, 204, 21, 0.38)",
        line: "#fde047",
        accent: "#22d3ee",
        label: "#fef08a",
        arc: "#fb7185",
      }
    : {
        background: "rgba(248, 250, 252, 0.96)",
        border: "rgba(30, 64, 175, 0.28)",
        line: "#1e3a8a",
        accent: "#0e7490",
        label: "#172554",
        arc: "#be123c",
      };

  return (
    <svg
      viewBox="0 0 400 230"
      className="mt-3 w-full max-w-xs block rounded-xl border"
      style={{ background: colors.background, borderColor: colors.border }}
      role="img"
      aria-label="Diagram sudut x dan sudut 37 derajat"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Diagram sudut x dan sudut 37°</title>

      <line
        x1="64"
        y1="185"
        x2="64"
        y2="24"
        stroke={colors.line}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="64"
        y1="185"
        x2="366"
        y2="185"
        stroke={colors.line}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="64"
        y1="185"
        x2="244"
        y2="49"
        stroke={colors.line}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M64 165 H84 V185"
        fill="none"
        stroke={colors.accent}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="64" cy="185" r="5" fill={colors.accent} />

      <path
        d="M119 185 A55 55 0 0 0 108 152"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M108 152 A55 55 0 0 0 64 130"
        fill="none"
        stroke={colors.arc}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="5 4"
      />

      <text
        x="142"
        y="174"
        fill={colors.label}
        fontSize="20"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
      >
        37°
      </text>
      <text
        x="88"
        y="112"
        fill={colors.label}
        fontSize="24"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontWeight="800"
      >
        x
      </text>
    </svg>
  );
}

const SudutPelurusPenyikuBertolakPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDark } = useTheme();

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <BookOpen className="w-10 h-10 text-accent mx-auto mb-3" />
        <h1 className="font-display text-lg md:text-xl font-bold text-primary text-glow-cyan mb-2 text-center">
          {t('practice.garisDanSudut.sudutPelurus.title')}
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">
          {t('practice.garisDanSudut.sudutPelurus.pageSubtitle')}
        </p>

        {/* Bagian I */}
        <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-6 mb-6 animate-slide-up">
          <p className="text-accent text-sm font-bold mb-2 font-display">
            {t('practice.garisDanSudut.sudutPelurus.sectionI')}
          </p>
          <p className="text-yellow-400 text-sm mb-6 font-body">
            {t('practice.garisDanSudut.sudutPelurus.instructionI')}
          </p>

          <div className="space-y-6 text-white/90 font-body text-sm leading-relaxed">
            {/* Soal a */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">a)</span>
              <div>
                <p>{t('practice.garisDanSudut.sudutPelurus.qa.text')}</p>
                <img src={"/images/a_1774838179561.png"} alt="Soal a" className="mt-3 w-full max-w-xs block" />
                <SudutPelurusDiagram isDark={isDark} />
              </div>
            </div>

            {/* Soal b */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">b)</span>
              <div>
                <p>{t('practice.garisDanSudut.sudutPelurus.qb.text')}</p>
                <img src={"/images/b_1774838179562.png"} alt="Soal b" className="mt-3 w-full max-w-xs block" />
                <RedrawnAngleDiagram kind="q1b" isDark={isDark} />
              </div>
            </div>

            {/* Soal c */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">c)</span>
              <div>
                <p>{t('practice.garisDanSudut.sudutPelurus.qc.text')}</p>
                <img src={"/images/c_1774838179562.png"} alt="Soal c" className="mt-3 w-full max-w-xs block" />
                <RedrawnAngleDiagram kind="q1c" isDark={isDark} />
              </div>
            </div>

            {/* Soal d */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">d)</span>
              <div>
                <p>{t('practice.garisDanSudut.sudutPelurus.qd.text')}</p>
                <img src={"/images/d_1774838179563.png"} alt="Soal d" className="mt-3 w-full max-w-xs block" />
                <RedrawnAngleDiagram kind="q1d" isDark={isDark} />
              </div>
            </div>

            {/* Soal e */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">e)</span>
              <div>
                <p>{t('practice.garisDanSudut.sudutPelurus.qe.text')}</p>
                <img src={"/images/e_1774838179563.png"} alt="Soal e" className="mt-3 w-full max-w-xs block" />
                <RedrawnAngleDiagram kind="q1e" isDark={isDark} />
              </div>
            </div>

            {/* Soal f */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">f)</span>
              <div>
                <p>{t('practice.garisDanSudut.sudutPelurus.qf.text')}</p>
                <img src={"/images/f_1774838179564.png"} alt="Soal f" className="mt-3 w-full max-w-xs block" />
                <RedrawnAngleDiagram kind="q1f" isDark={isDark} />
              </div>
            </div>
          </div>
        </div>

        {/* Bagian II */}
        <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-6 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-accent text-sm font-bold mb-2 font-display">Bagian II — {t('practice.multipleChoice')}</p>
          <p className="text-yellow-400 text-sm mb-6 font-body">
            {t('practice.garisDanSudut.sudutPelurus.instructionII')}
          </p>

          <div className="space-y-6 text-white/90 font-body text-sm leading-relaxed">
            {/* Soal 1 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">1.</span>
              <div>
                <p className="mb-2">{t('practice.garisDanSudut.sudutPelurus.q1.stem')}</p>
                <div className="ml-4 space-y-1">
                  <p>{t('practice.garisDanSudut.sudutPelurus.q1.optA')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q1.optB')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q1.optC')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q1.optD')}</p>
                </div>
              </div>
            </div>

            {/* Soal 2 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">2.</span>
              <div>
                <p className="mb-2">{t('practice.garisDanSudut.sudutPelurus.q2.stem')}</p>
                <img src={"/images/no_2_1774838544613.png"} alt="Soal 2" className="my-3 w-full max-w-xs block" />
                <RedrawnAngleDiagram kind="q2" isDark={isDark} />
                <div className="ml-4 space-y-1">
                  <p>{t('practice.garisDanSudut.sudutPelurus.q2.optA')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q2.optB')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q2.optC')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q2.optD')}</p>
                </div>
              </div>
            </div>

            {/* Soal 3 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">3.</span>
              <div>
                <p className="mb-2">{t('practice.garisDanSudut.sudutPelurus.q3.stem')}</p>
                <img src={"/images/no_3_1774838544614.png"} alt="Soal 3" className="my-3 w-full max-w-xs block" />
                <RedrawnAngleDiagram kind="q3" isDark={isDark} />
                <div className="ml-4 space-y-1">
                  <p>{t('practice.garisDanSudut.sudutPelurus.q3.optA')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q3.optB')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q3.optC')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q3.optD')}</p>
                </div>
              </div>
            </div>

            {/* Soal 4 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">4.</span>
              <div>
                <p className="mb-2">{t('practice.garisDanSudut.sudutPelurus.q4.stem')}</p>
                <img src={"/images/no_4_1774838544614.png"} alt="Soal 4" className="my-3 w-full max-w-xs block" />
                <RedrawnAngleDiagram kind="q4" isDark={isDark} />
                <div className="ml-4 space-y-1">
                  <p>{t('practice.garisDanSudut.sudutPelurus.q4.optA')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q4.optB')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q4.optC')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q4.optD')}</p>
                </div>
              </div>
            </div>

            {/* Soal 5 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">5.</span>
              <div>
                <p className="mb-2">{t('practice.garisDanSudut.sudutPelurus.q5.stem')}</p>
                <img src={"/images/no_5_1774838544615.png"} alt="Soal 5" className="my-3 w-full max-w-xs block" />
                <RedrawnAngleDiagram kind="q5" isDark={isDark} />
                <div className="ml-4 space-y-1">
                  <p>{t('practice.garisDanSudut.sudutPelurus.q5.optA')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q5.optB')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q5.optC')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q5.optD')}</p>
                </div>
              </div>
            </div>

            {/* Soal 6 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">6.</span>
              <div>
                <p className="mb-2">{t('practice.garisDanSudut.sudutPelurus.q6.stem')}</p>
                <img src={"/images/no_6_1774838544615.png"} alt="Soal 6" className="my-3 w-full max-w-xs block" />
                <RedrawnAngleDiagram kind="q6" isDark={isDark} />
                <div className="ml-4 space-y-1">
                  <p>{t('practice.garisDanSudut.sudutPelurus.q6.optA')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q6.optB')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q6.optC')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q6.optD')}</p>
                </div>
              </div>
            </div>

            {/* Soal 7 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">7.</span>
              <div>
                <p className="mb-2">{t('practice.garisDanSudut.sudutPelurus.q7.stem')}</p>
                <div className="ml-4 space-y-1">
                  <p>{t('practice.garisDanSudut.sudutPelurus.q7.optA')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q7.optB')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q7.optC')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q7.optD')}</p>
                </div>
              </div>
            </div>

            {/* Soal 8 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">8.</span>
              <div>
                <p className="mb-2">{t('practice.garisDanSudut.sudutPelurus.q8.stem')}</p>
                <img src={"/images/no_8_1774838544616.png"} alt="Soal 8" className="my-3 w-full max-w-xs block" />
                <RedrawnAngleDiagram kind="q8" isDark={isDark} />
                <div className="ml-4 space-y-1">
                  <p>{t('practice.garisDanSudut.sudutPelurus.q8.optA')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q8.optB')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q8.optC')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q8.optD')}</p>
                </div>
              </div>
            </div>

            {/* Soal 9 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">9.</span>
              <div>
                <p className="mb-2">{t('practice.garisDanSudut.sudutPelurus.q9.stem')}</p>
                <div className="ml-4 space-y-1">
                  <p>{t('practice.garisDanSudut.sudutPelurus.q9.optA')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q9.optB')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q9.optC')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q9.optD')}</p>
                </div>
              </div>
            </div>

            {/* Soal 10 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">10.</span>
              <div>
                <p className="mb-2">{t('practice.garisDanSudut.sudutPelurus.q10.stem')}</p>
                <img src={"/images/no_10_1774838544616.png"} alt="Soal 10" className="my-3 w-full max-w-xs block" />
                <RedrawnAngleDiagram kind="q10" isDark={isDark} />
                <div className="ml-4 space-y-1">
                  <p>{t('practice.garisDanSudut.sudutPelurus.q10.optA')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q10.optB')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q10.optC')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q10.optD')}</p>
                </div>
              </div>
            </div>

            {/* Soal 11 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">11.</span>
              <div>
                <p className="mb-2">{t('practice.garisDanSudut.sudutPelurus.q11.stem')}</p>
                <img src={"/images/no_11_1774838544616.png"} alt="Soal 11" className="my-3 w-full max-w-xs block" />
                <RedrawnAngleDiagram kind="q11" isDark={isDark} />
                <div className="ml-4 space-y-1">
                  <p>{t('practice.garisDanSudut.sudutPelurus.q11.optA')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q11.optB')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q11.optC')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q11.optD')}</p>
                </div>
              </div>
            </div>

            {/* Soal 12 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">12.</span>
              <div>
                <p className="mb-2">{t('practice.garisDanSudut.sudutPelurus.q12.stem')}</p>
                <img src={"/images/no_12_1774838544617.png"} alt="Soal 12" className="my-3 w-full max-w-xs block" />
                <RedrawnAngleDiagram kind="q12" isDark={isDark} />
                <div className="ml-4 space-y-1">
                  <p>{t('practice.garisDanSudut.sudutPelurus.q12.optA')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q12.optB')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q12.optC')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q12.optD')}</p>
                </div>
              </div>
            </div>

            {/* Soal 13 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">13.</span>
              <div>
                <p className="mb-2">{t('practice.garisDanSudut.sudutPelurus.q13.stem')}</p>
                <img src={"/images/no_13_1774838544618.png"} alt="Soal 13" className="my-3 w-full max-w-xs block" />
                <RedrawnAngleDiagram kind="q13" isDark={isDark} />
                <div className="ml-4 space-y-1">
                  <p>{t('practice.garisDanSudut.sudutPelurus.q13.optA')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q13.optB')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q13.optC')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q13.optD')}</p>
                </div>
              </div>
            </div>

            {/* Soal 14 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">14.</span>
              <div>
                <p className="mb-2">{t('practice.garisDanSudut.sudutPelurus.q14.stem')}</p>
                <div className="ml-4 space-y-1">
                  <p>{t('practice.garisDanSudut.sudutPelurus.q14.optA')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q14.optB')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q14.optC')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q14.optD')}</p>
                </div>
              </div>
            </div>

            {/* Soal 15 */}
            <div className="border-l-2 border-accent/50 pl-4 flex gap-3">
              <span className="font-semibold text-accent shrink-0">15.</span>
              <div>
                <p className="mb-2">{t('practice.garisDanSudut.sudutPelurus.q15.stem')}</p>
                <div className="ml-4 space-y-1">
                  <p>{t('practice.garisDanSudut.sudutPelurus.q15.optA')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q15.optB')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q15.optC')}</p>
                  <p>{t('practice.garisDanSudut.sudutPelurus.q15.optD')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/latihan-mandiri/kelas-7/garis-dan-sudut"); }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            <ChevronLeft className="w-4 h-4" />
            {t('practice.garisDanSudut.sudutPelurus.backTo')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SudutPelurusPenyikuBertolakPage;
