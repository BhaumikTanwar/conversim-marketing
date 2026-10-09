import { useId } from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  label?: string;
  className?: string;
  // Bare spinner, no wrapper/label — for inline use (e.g. a nav bar) instead of a full-block loading state.
  iconOnly?: boolean;
}

// Material-style "chasing arc": the svg spins (.animate-spin, CSS keyframe so it keeps turning on the
// compositor while a lazy route chunk blocks the main thread) while the stroke itself grows/shrinks
// (.loader-arc, index.css) — reads as alive rather than a static ring outline. useId keeps the gradient's
// id collision-free when several Loaders render at once (e.g. multiple busy buttons).
function GradientArc({ gradientId }: { gradientId: string }) {
  return (
    <svg viewBox="0 0 50 50" className="w-full h-full animate-spin">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
        strokeLinecap="round"
        className="loader-arc"
      />
    </svg>
  );
}

export default function Loader({ label = "Loading...", className = "", iconOnly = false }: LoaderProps) {
  const gradientId = `loader-gradient-${useId()}`;

  if (iconOnly) {
    return (
      <div className={`w-4 h-4 ${className}`}>
        <GradientArc gradientId={gradientId} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center py-20 gap-3 w-full h-full ${className}`}
    >
      <div className="w-9 h-9">
        <GradientArc gradientId={gradientId} />
      </div>
      <span className="text-xs font-medium text-aurora-text-3">{label}</span>
    </motion.div>
  );
}
