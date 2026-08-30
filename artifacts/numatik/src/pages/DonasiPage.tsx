import { useTranslation } from "react-i18next";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Heart, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { playPopSound } from "@/hooks/useAudio";

const DonasiPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-2xl w-full px-4 text-center">
        <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="font-display text-2xl md:text-3xl font-bold text-primary text-glow-cyan mb-4">
          {t("donasi.pageTitle")}
        </h1>
        <p className="text-white/70 text-sm font-body mb-8">
          {t("donasi.subtitle")}
        </p>

        <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-8 space-y-6">
          <p className="text-white font-body text-sm">
            {t("donasi.desc")}
          </p>

          {/* Indonesia notice */}
          <div className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-400/30 rounded-lg px-4 py-2">
            <span className="text-lg">🇮🇩</span>
            <p className="text-red-300 font-display text-xs font-bold tracking-wide">
              {t("donasi.bankNotice")}
            </p>
          </div>

          {/* QRIS donation barcode */}
          <div className="bg-white/95 border border-primary/30 rounded-xl p-4 sm:p-6 box-glow-cyan">
            <p className="text-slate-800 font-display text-sm font-bold tracking-wide mb-3">
              {t("donasi.qrisLabel")}
            </p>
            <a
              href="/assets/qris-donasi.jpeg"
              target="_blank"
              rel="noreferrer"
              className="block mx-auto w-full max-w-[420px] rounded-lg overflow-hidden transition-transform hover:scale-[1.01]"
              title={t("donasi.qrisOpen")}
            >
              <img
                src="/assets/qris-donasi.jpeg"
                alt={t("donasi.qrisAlt")}
                className="block w-full h-auto object-contain"
              />
            </a>
            <p className="text-slate-600 font-body text-xs mt-3">
              {t("donasi.qrisHint")}
            </p>
          </div>

          {/* Bank Account Info */}
          <div className="bg-muted/50 border border-primary/30 rounded-xl p-6 box-glow-cyan">
            <CreditCard className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-primary font-display text-xs mb-2">{t("donasi.rekeningLabel")}</p>
            <p className="text-white font-display text-lg font-bold tracking-wider mb-1">BCA</p>
            <p className="text-accent font-display text-2xl font-black tracking-widest mb-2">2332637666</p>
            <p className="text-white/80 font-body text-sm">a.n. Irawan Sutiawan</p>
          </div>

          <p className="text-white/60 font-body text-xs">
            {t("donasi.thankyou")}
          </p>
        </div>

        <button
          onClick={() => { playPopSound(); navigate("/menu"); }}
          className="mt-8 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
        >
          {t("donasi.kembali")}
        </button>
      </div>
    </div>
  );
};

export default DonasiPage;
