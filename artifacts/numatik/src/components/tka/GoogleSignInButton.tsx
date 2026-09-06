import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { Language } from "@/contexts/LanguageContext";

const GOOGLE_CLIENT_ID =
  "671247982933-b08s3havshvpnf1mhs1dm5iimm6s341l.apps.googleusercontent.com";
const GOOGLE_SCRIPT_URL = "https://accounts.google.com/gsi/client";

type GoogleCredentialResponse = {
  credential: string;
};

type GoogleAccountsId = {
  initialize: (config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
  }) => void;
  renderButton: (
    element: HTMLElement,
    options: {
      type: "standard";
      theme: "outline" | "filled_blue" | "filled_black";
      size: "large" | "medium" | "small";
      text: "signin_with" | "signup_with" | "continue_with" | "signup_with";
      shape: "rectangular" | "pill" | "circle" | "square";
      width?: number;
      logo_alignment?: "left" | "center";
      locale?: string;
    },
  ) => void;
  prompt: (listener?: (notification: GooglePromptNotification) => void) => void;
  cancel: () => void;
};

type GooglePromptNotification = {
  isNotDisplayed: () => boolean;
  isSkippedMoment: () => boolean;
  isDismissedMoment: () => boolean;
};

type GoogleNamespace = {
  accounts: {
    id: GoogleAccountsId;
  };
};

declare global {
  interface Window {
    google?: GoogleNamespace;
    __numatikGoogleScriptPromise?: Promise<void>;
  }
}

const languageLocale: Record<Language, string> = {
  id: "id",
  en: "en",
  ja: "ja",
};

const loadGoogleScript = () => {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (window.__numatikGoogleScriptPromise) return window.__numatikGoogleScriptPromise;

  window.__numatikGoogleScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${GOOGLE_SCRIPT_URL}"]`,
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("google-script")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = GOOGLE_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("google-script"));
    document.head.appendChild(script);
  });

  return window.__numatikGoogleScriptPromise;
};

export type GoogleSignInButtonHandle = {
  requestFreshCredential: () => Promise<string>;
};

type GoogleSignInButtonProps = {
  language: Language;
  signedIn: boolean;
  onCredential: (credential: string) => void;
  onError: (errorCode: "google-script" | "google-init") => void;
};

export const GoogleSignInButton = forwardRef<GoogleSignInButtonHandle, GoogleSignInButtonProps>(
  ({ language, signedIn, onCredential, onError }, ref) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const credentialHandlerRef = useRef(onCredential);
  const errorHandlerRef = useRef(onError);
  const pendingCredentialRef = useRef<{
    resolve: (credential: string) => void;
    reject: (error: Error) => void;
    timeoutId: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    credentialHandlerRef.current = onCredential;
    errorHandlerRef.current = onError;
  }, [onCredential, onError]);

  const handleCredential = (credential: string) => {
    const pendingCredential = pendingCredentialRef.current;
    if (pendingCredential) {
      window.clearTimeout(pendingCredential.timeoutId);
      pendingCredentialRef.current = null;
      pendingCredential.resolve(credential);
    }
    credentialHandlerRef.current(credential);
  };

  useImperativeHandle(ref, () => ({
    requestFreshCredential: async () => {
      await loadGoogleScript();
      if (!window.google?.accounts?.id) {
        throw new Error("google-init");
      }

      return new Promise<string>((resolve, reject) => {
        if (pendingCredentialRef.current) {
          window.clearTimeout(pendingCredentialRef.current.timeoutId);
          pendingCredentialRef.current.reject(new Error("google-refresh-replaced"));
        }

        const timeoutId = window.setTimeout(() => {
          pendingCredentialRef.current = null;
          reject(new Error("google-refresh-timeout"));
        }, 8000);
        pendingCredentialRef.current = { resolve, reject, timeoutId };

        window.google?.accounts.id.prompt((notification) => {
          if (
            notification.isNotDisplayed() ||
            notification.isSkippedMoment() ||
            notification.isDismissedMoment()
          ) {
            const pending = pendingCredentialRef.current;
            if (!pending) return;
            window.clearTimeout(pending.timeoutId);
            pendingCredentialRef.current = null;
            reject(new Error("google-refresh-unavailable"));
          }
        });
      });
    },
  }), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    void loadGoogleScript()
      .then(() => {
        if (cancelled || !buttonRef.current || !window.google?.accounts?.id) return;

        buttonRef.current.replaceChildren();
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: ({ credential }) => {
             if (credential) handleCredential(credential);
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        window.google.accounts.id.renderButton(buttonRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "signin_with",
          shape: "rectangular",
          width: Math.min(360, Math.max(260, buttonRef.current.clientWidth || 360)),
          logo_alignment: "left",
          locale: languageLocale[language],
        });
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setLoading(false);
          errorHandlerRef.current("google-script");
        }
      });

    return () => {
      cancelled = true;
      const pendingCredential = pendingCredentialRef.current;
      if (pendingCredential) {
        window.clearTimeout(pendingCredential.timeoutId);
        pendingCredentialRef.current = null;
        pendingCredential.reject(new Error("google-button-unmounted"));
      }
      window.google?.accounts?.id.cancel();
    };
  }, [language]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-cyan-100/85">
            {language === "en"
              ? "Google account verification"
              : language === "ja"
                ? "Googleアカウント認証"
                : "Verifikasi akun Google"}
          </p>
          <p className="mt-1 text-[11px] leading-5 text-white/45">
            {signedIn
              ? language === "en"
                ? "Your verified Google account is ready."
                : language === "ja"
                  ? "認証済みのGoogleアカウントを使用できます。"
                  : "Akun Google terverifikasi siap digunakan."
              : language === "en"
                ? "Sign in before starting the try out."
                : language === "ja"
                  ? "試験を始める前にログインしてください。"
                  : "Masuk sebelum memulai try out."}
          </p>
        </div>
        {signedIn && <span className="text-lg text-emerald-300">✓</span>}
      </div>
      <div
        ref={buttonRef}
        aria-label={
          language === "en"
            ? "Sign in with Google"
            : language === "ja"
              ? "Googleでログイン"
              : "Masuk dengan Google"
        }
        className={signedIn ? "pointer-events-none opacity-60" : "min-h-10"}
      />
      {loading && !signedIn && (
        <p className="mt-2 text-[11px] text-white/40">
          {language === "en"
            ? "Loading Google sign-in…"
            : language === "ja"
              ? "Googleログインを読み込んでいます…"
              : "Memuat tombol login Google…"}
        </p>
      )}
    </div>
  );
  },
);

GoogleSignInButton.displayName = "GoogleSignInButton";