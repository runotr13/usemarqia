export type ContentType = "ecommerce" | "instagram";
export type ContentTone = "sales" | "post";

export type GenerateBody = {
  imageInput?: string;
  userPrompt?: string;
  contentTypes?: ContentType[];
  contentTone?: ContentTone;

  // ✅ NEW
  limits?: {
    ecommerce_title_max?: number;
    ecommerce_description_max?: number;
    instagram_title_max?: number;
    instagram_description_max?: number;
    hashtags_max?: number; // opsiyonel
    hashtags_min?: number; // opsiyonel
  };
};
export type ClampOptions = {
  min?: number;
  max?: number;
  fallback: number;
};
