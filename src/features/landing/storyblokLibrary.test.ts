import { describe, expect, it } from "vitest";
import { normalizeStoryblokPage } from "./storyblokLibrary";

const ids = (body: object[]) => normalizeStoryblokPage({ body }).sections.map((s: { section_id: string }) => s.section_id);

describe("normalizeStoryblokPage", () => {
  it("returns no sections for an empty or missing page", () => {
    expect(normalizeStoryblokPage(undefined).sections).toEqual([]);
    expect(normalizeStoryblokPage({ body: [] }).sections).toEqual([]);
  });

  it("drops hidden and unknown blocks", () => {
    const body = [
      { _uid: "a", component: "hero", visible: false },
      { _uid: "b", component: "not_a_block" },
      { _uid: "c", component: "faq" },
    ];
    expect(ids(body)).toEqual(["faq"]);
  });

  it("gives repeated blocks and repeated custom ids unique ids", () => {
    expect(ids([{ component: "hero" }, { component: "hero" }])).toEqual(["hero", "hero-2"]);
    expect(ids([{ component: "faq", section_id: "x" }, { component: "grid", section_id: "x" }])).toEqual(["x", "x-2"]);
  });

  it("reads legacy field names", () => {
    const [section] = normalizeStoryblokPage({ body: [{ component: "use_cases", layout: "wide" }] }).sections;
    expect(section.layout_variant).toBe("wide");
  });

  it("points repeated header anchors at each matching section in order", () => {
    const header = { component: "header", navigation_items: [{ label: "A", target_anchor: "#hero" }, { label: "B", target_anchor: "#hero" }] };
    const page = normalizeStoryblokPage({ header: [header], body: [{ component: "hero" }, { component: "hero" }] });
    expect(page.header?.navigation_items.map((i: { target_anchor: string }) => i.target_anchor)).toEqual(["#hero", "#hero-2"]);
  });
});
