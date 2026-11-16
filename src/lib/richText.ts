/** Walk a Storyblok rich-text node tree and return one plain-text string per paragraph/list item. */
export function richTextToLines(value: unknown): string[] {
  if (!value) return [];
  if (typeof value === "string") return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (Array.isArray(value)) return value.flatMap(richTextToLines);
  if (typeof value !== "object") return [];

  const node = value as { type?: string; text?: unknown; content?: unknown[] };
  const collectText = (part: unknown): string => {
    if (typeof part === "string") return part;
    if (Array.isArray(part)) return part.map(collectText).join("");
    if (!part || typeof part !== "object") return "";
    const child = part as { text?: unknown; content?: unknown[] };
    return (typeof child.text === "string" ? child.text : "") + (child.content ?? []).map(collectText).join("");
  };

  if (node.type === "paragraph" || node.type === "list_item") {
    const line = collectText(node.content).trim();
    return line ? [line] : [];
  }
  return (node.content ?? []).flatMap(richTextToLines);
}
