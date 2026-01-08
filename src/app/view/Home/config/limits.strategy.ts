import type { Platform } from "../types/home.type";

export type LimitsState = {
  enabled: boolean;
  ecommerce: { titleMax: number; descMax: number };
  instagram: {
    titleMax: number;
    descMax: number;
    hashtagsMin: number;
    hashtagsMax: number;
  };
};

type LimitsPayload =
  | {
      ecommerce_title_max: number;
      ecommerce_description_max: number;
    }
  | {
      instagram_title_max: number;
      instagram_description_max: number;
      hashtags_min: number;
      hashtags_max: number;
    };

export function buildLimitsPayload(
  enabled: boolean,
  platform: Platform,
  limits: LimitsState
): LimitsPayload | undefined {
  if (!enabled) return undefined;

  if (platform === "ecommerce") {
    return {
      ecommerce_title_max: Number(limits.ecommerce.titleMax),
      ecommerce_description_max: Number(limits.ecommerce.descMax),
    };
  }

  const min = limits.instagram.hashtagsMin;
  const max = limits.instagram.hashtagsMax;

  return {
    instagram_title_max: Number(limits.instagram.titleMax),
    instagram_description_max: Number(limits.instagram.descMax),
    hashtags_min: Math.min(min, max),
    hashtags_max: Math.max(min, max),
  };
}
