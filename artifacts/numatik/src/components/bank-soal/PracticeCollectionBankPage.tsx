import type { ComponentType } from "react";
import PageNavigation, { PageNavigationVisibilityContext } from "@/components/PageNavigation";
import { StarfieldVisibilityContext } from "@/components/Starfield";

export interface PracticeCollectionSection {
  label: string;
  Page: ComponentType;
}

interface PracticeCollectionBankPageProps {
  title: string;
  subtitle: string;
  sections: PracticeCollectionSection[];
}

export default function PracticeCollectionBankPage({
  title,
  subtitle,
  sections,
}: PracticeCollectionBankPageProps) {
  return (
    <main className="practice-collection relative min-h-screen bg-background px-4 py-10 text-foreground">
      <style>{`
        .practice-collection {
          counter-reset: practice-question;
        }
        .practice-collection .gradient-space {
          min-height: 0 !important;
          overflow: visible !important;
          background: transparent !important;
        }
        .practice-collection .gradient-space > .relative.z-10 {
          width: 100% !important;
          max-width: none !important;
          padding: 1.25rem !important;
        }
        .practice-collection .gradient-space > .relative.z-10 > div:first-child {
          display: none !important;
        }
        .practice-collection .gradient-space > .relative.z-10 > div.mt-10.text-center {
          display: none !important;
        }
        .practice-collection span.w-6.h-6.rounded-full.flex.items-center {
          counter-increment: practice-question;
          font-size: 0 !important;
        }
        .practice-collection span.w-6.h-6.rounded-full.flex.items-center::after {
          content: counter(practice-question);
          font-size: 11px;
        }
      `}</style>
      <PageNavigation prevPath="/bank-soal" />
      <section className="relative z-10 mx-auto max-w-5xl">
        <header className="mb-8 overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-[0_8px_30px_rgba(8,145,178,0.12)]">
          <div className="h-1.5 bg-primary" />
          <div className="px-5 py-7 text-center md:px-8">
            <div className="mx-auto mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-primary/50" />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">Numatik</span>
              <span className="h-px w-12 bg-primary/50" />
            </div>
            <h1 className="text-balance text-2xl font-bold text-primary md:text-3xl">{title}</h1>
            <p className="mt-2 text-sm font-medium text-muted-foreground">{subtitle}</p>
            <p className="mt-4 text-xs text-muted-foreground/80">
              Seluruh soal diambil langsung dari Tugas-Latihan Mandiri.
            </p>
          </div>
        </header>

        <div>
          {sections.map(({ Page }, index) => (
            <div key={index}>
              <StarfieldVisibilityContext.Provider value={false}>
              <PageNavigationVisibilityContext.Provider value={false}>
                <Page />
              </PageNavigationVisibilityContext.Provider>
              </StarfieldVisibilityContext.Provider>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}