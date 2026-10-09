import { EASE } from "../../../lib/animations";
import { motion } from "framer-motion";
import LazyVideo from "../../../shared/components/LazyVideo";

interface SectorDemoCardProps {
  simLabel?: string;
  avatarEmoji?: string;
  videoSrc?: string;
  personaName: string;
  personaRole: string;
  badgeLabel: string;
}

export default function SectorDemoCard({
  simLabel = "SIM.01",
  videoSrc,
  personaName,
  personaRole,
  badgeLabel,
}: SectorDemoCardProps) {
  return (
    <div className="relative w-full max-w-[500px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
        whileHover={{ y: -4, boxShadow: "0 20px 50px rgba(29,28,24,0.1)" }}
        className="relative w-full bg-aurora-surface border border-aurora-border rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
      >
        <div className="flex h-12 items-center justify-between border-b border-aurora-border px-5 bg-aurora-surface-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-brand" />
          </div>
          <span className="font-mono text-[11px] text-aurora-text-3">{simLabel}</span>
        </div>

        {videoSrc ? (
          <div className="relative aspect-[6/5] overflow-hidden bg-slate-900">
            <LazyVideo className="w-full h-full object-cover" src={videoSrc} />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="h-8 bg-brand/10" />
            <div className="relative flex h-[260px] items-center justify-center overflow-hidden bg-slate-100">
              <div className="absolute inset-0 bg-brand/5" />
              <div className="relative flex h-40 w-40 items-center justify-center rounded-2xl bg-aurora-surface border border-aurora-border text-6xl font-semibold text-brand shadow-md">
                {personaName.charAt(0)}
              </div>
            </div>
            <div className="h-6 bg-gradient-to-r from-aurora-surface-2 via-aurora-surface-3 to-aurora-surface" />
          </div>
        )}

        <div className="relative min-h-[140px] px-6 py-5 bg-aurora-surface border-t border-aurora-border">
          <h2 className="text-lg font-semibold text-aurora-text">{personaName}</h2>
          <p className="mt-1 text-xs text-aurora-text-2">{personaRole}</p>
          <div className="mt-4 inline-flex items-center gap-1.5 bg-accent-50 border border-accent-200 rounded-md px-3 py-1 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-[11px] font-semibold text-accent-700">{badgeLabel}</span>
          </div>

          <button
            type="button"
            aria-label="Mute simulation"
            className="absolute bottom-5 right-6 w-10 h-10 rounded-xl bg-aurora-surface-2 border border-aurora-border text-aurora-text-2 hover:text-aurora-text flex items-center justify-center transition-all hover:bg-aurora-surface-3 shadow-2xs active:scale-90"
          >
            <span className="material-symbols-outlined text-lg">mic_off</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
