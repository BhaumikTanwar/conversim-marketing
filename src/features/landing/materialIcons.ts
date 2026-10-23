const supportedMaterialIcons = new Set([
  "analytics",
  "arrow_forward",
  "east",
  "north_east",
  "open_in_new",
  "check_circle",
  "forum",
  "handshake",
  "lightbulb",
  "mic",
  "rocket_launch",
  "settings_accessibility",
  "support_agent",
  "trending_up",
  "upload_file",
  "warning",
]);

/** Avoid rendering an unknown icon identifier as visible ligature text. */
export function resolveMaterialIcon(value?: string, fallback = "lightbulb") {
  const icon = value?.trim();
  return icon && supportedMaterialIcons.has(icon) ? icon : fallback;
}
