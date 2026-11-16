import { describe, expect, it } from "vitest";
import { APP_ROUTES, marketingHref, toAppUrl } from "./env";

describe("marketingHref", () => {
  it("sends every app route, and its sub-paths, to the app", () => {
    for (const route of APP_ROUTES) {
      expect(marketingHref(`/${route}`)).toBe(toAppUrl(`/${route}`));
      expect(marketingHref(`/${route}/x`)).toBe(toAppUrl(`/${route}/x`));
    }
  });

  it("leaves marketing paths alone", () => {
    expect(marketingHref("/team-coaching")).toBe("/team-coaching");
    expect(marketingHref("/profiles")).toBe("/profiles");
  });
});
