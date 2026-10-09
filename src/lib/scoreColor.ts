import { AMBER } from "./chartTheme";
// Single source of truth for the score → color mapping used across every
// attempt-report chart (gauge, criteria bars, comparison view).
export function scoreColor(score: number): string {
  return score >= 70 ? "#10b981" : score >= 50 ? AMBER : "#d64545";
}

// Tailwind classes for a pill/badge that reflects score quality.
export function scoreBadgeClass(score: number): string {
  if (score >= 70) return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (score >= 50) return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-rose-700 bg-rose-50 border-rose-200";
}

export interface ScoreGradient {
  from: string;
  to: string;
  glow: string;
}

export function scoreGradient(score: number): ScoreGradient {
  if (score >= 70) return { from: "#34d399", to: "#059669", glow: "rgba(16,185,129,0.45)" };
  if (score >= 50) return { from: "#fbbf24", to: "#d97706", glow: "rgba(245,158,11,0.45)" };
  return { from: "#fb7185", to: "#e11d48", glow: "rgba(239,68,68,0.45)" };
}
