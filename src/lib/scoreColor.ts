export function scoreColor(score: number): string {
  return score >= 70 ? "#10b981" : score >= 50 ? "#f59e0b" : "#d64545";
}
