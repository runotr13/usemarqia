import { GenerateBody } from "./types";

function normalizeLimits(body: GenerateBody) {
  const l = body.limits ?? {};

  return {
    //  E-commerce
    ecommerce_title_max: l.ecommerce_title_max,

    ecommerce_description_max: l.ecommerce_description_max,

    //  Instagram
    instagram_title_max: l.instagram_title_max,

    instagram_description_max: l.instagram_description_max,

    //  Hashtags
    hashtags_min: l.hashtags_min,

    hashtags_max: l.hashtags_max,
  };
}

export { normalizeLimits };
