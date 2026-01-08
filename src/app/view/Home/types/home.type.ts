export type Platform = "ecommerce" | "instagram";
export type Goal = "sales" | "post";
export type Tone = "friendly" | "professional" | "fun";
export type Lang = "tr" | "en";

export type Result = {
  ecommerce_title?: string;
  ecommerce_description?: string;
  instagram_title?: string;
  instagram_description?: string;
  hashtags?: string[];
};
