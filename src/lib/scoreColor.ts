import { AMBER } from "./chartTheme";

// Score → color mapping for the hero score card.
export function scoreColor(score: number): string {
  return score >= 70 ? "#10b981" : score >= 50 ? AMBER : "#d64545";
}
