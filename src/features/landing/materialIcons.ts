const supportedMaterialIcons = new Set([
  "analytics",
  "arrow_forward",
  "bar_chart",
  "check",
  "check_circle",
  "east",
  "fact_check",
  "forum",
  "gpp_maybe",
  "handshake",
  "insights",
  "lightbulb",
  "mic",
  "mic_off",
  "north_east",
  "open_in_new",
  "person_add",
  "play_circle",
  "record_voice_over",
  "refresh",
  "rocket_launch",
  "school",
  "settings_accessibility",
  "stethoscope",
  "support_agent",
  "tips_and_updates",
  "trending_up",
  "upload_file",
  "verified_user",
  "warning",
]);

/** Avoid rendering an unknown icon identifier as visible ligature text. */
export function resolveMaterialIcon(value?: string, fallback = "lightbulb") {
  const icon = value?.trim();
  return icon && supportedMaterialIcons.has(icon) ? icon : fallback;
}
