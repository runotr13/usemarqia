import type { Lang, Tone } from "../types/home.type";
import type { Platform, Goal } from "../types/home.type";
import type { LimitsState } from "./limits.strategy";

export function buildRequestSummary(args: {
  platform: Platform;
  goal: Goal;
  tone: Tone;
  lang: Lang;
  notes?: string;
  limits: LimitsState;
}) {
  const { platform, goal, tone, lang, notes, limits } = args;

  const map = {
    platform: platform === "instagram" ? "Instagram" : "E-commerce",
    goal: goal === "sales" ? "Sales" : "Post",
    tone:
      tone === "friendly"
        ? "Friendly"
        : tone === "professional"
        ? "Professional"
        : "Fun",
    lang: lang === "tr" ? "Turkish" : "English",
  };

  const limitsLine =
    limits.enabled && platform === "ecommerce"
      ? `Limits: Title ${limits.ecommerce.titleMax}, Description ${limits.ecommerce.descMax}`
      : limits.enabled && platform === "instagram"
      ? `Limits: Title ${limits.instagram.titleMax}, Description ${limits.instagram.descMax}, Hashtags ${limits.instagram.hashtagsMin}-${limits.instagram.hashtagsMax}`
      : null;

  return [
    `Platform: ${map.platform}`,
    `Goal: ${map.goal}`,
    `Tone: ${map.tone}`,
    `Language: ${map.lang}`,
    limitsLine,
    notes?.trim() ? `Notes: ${notes.trim()}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
