import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { dataUrlToBuffer, resizeImageBuffer } from "./imageConvert";
import { ContentTone, ContentType, GenerateBody } from "./types";
import { normalizeLimits } from "./normalizeLimits";
import { isDataUrl, isHttpUrl } from "@/helpers/isUrl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "gemini-2.5-flash";

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is missing`);
  return v;
}

async function fetchImageAsBuffer(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari",
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
  });

  if (!res.ok) {
    throw new Error(`Image fetch failed: ${res.status} ${res.statusText}`);
  }

  const mime = res.headers.get("content-type") || "image/jpeg";
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return { mime, buffer };
}

async function normalizeToBuffer(imageInput: string) {
  const v = imageInput.trim();

  if (isDataUrl(v)) {
    const { mime, buffer } = dataUrlToBuffer(v);
    return { mime, buffer };
  }

  if (isHttpUrl(v)) {
    return await fetchImageAsBuffer(v);
  }

  if (v.startsWith("blob:")) {
    throw new Error(
      "blob: URL received. Convert to dataURL on client and send base64 instead."
    );
  }

  throw new Error("imageInput must be a data URL or an http(s) URL");
}

function extractJsonObject(text: string) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = (fenced ? fenced[1] : text).trim();
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON object found in model output");
  }
  return candidate.slice(start, end + 1);
}

function toneGuideline(tone: ContentTone) {
  return tone === "sales"
    ? [
        "Goal: conversion & purchase intent",
        "Clear CTA",
        "Benefit-driven, persuasive",
        "Address pain points, provide solution",
      ].join("\n")
    : [
        "Goal: engagement & community",
        "Storytelling, relatable tone",
        "Inspire / educate / entertain",
      ].join("\n");
}

function buildSchema(
  contentTypes: ContentType[],
  limits: ReturnType<typeof normalizeLimits>
) {
  const fields: string[] = [];

  if (contentTypes.includes("ecommerce")) {
    fields.push(
      `  "ecommerce_title": "string (max ${limits.ecommerce_title_max} chars)"`
    );
    fields.push(
      `  "ecommerce_description": "string (max ${limits.ecommerce_description_max} chars, 1-2 short paragraphs)"`
    );
  }

  if (contentTypes.includes("instagram")) {
    fields.push(
      `  "instagram_title": "string (max ${limits.instagram_title_max} chars)"`
    );
    fields.push(
      `  "instagram_description": "string (max ${limits.instagram_description_max} chars, 1-2 short paragraphs)"`
    );
    fields.push(
      `  "hashtags": ["string", "..."] (${limits.hashtags_min}-${limits.hashtags_max} relevant hashtags, without # prefix)`
    );
  }

  return `{\n${fields.join(",\n")}\n}`;
}

function buildPrompt(params: {
  contentTypes: ContentType[];
  tone: ContentTone;
  userPrompt?: string;
  limits: ReturnType<typeof normalizeLimits>;
}) {
  const { contentTypes, tone, userPrompt, limits } = params;

  const limitRules: string[] = [];
  if (contentTypes.includes("ecommerce")) {
    limitRules.push(`ecommerce_title <= ${limits.ecommerce_title_max} chars`);
    limitRules.push(
      `ecommerce_description <= ${limits.ecommerce_description_max} chars`
    );
  }
  if (contentTypes.includes("instagram")) {
    limitRules.push(`instagram_title <= ${limits.instagram_title_max} chars`);
    limitRules.push(
      `instagram_description <= ${limits.instagram_description_max} chars`
    );
    limitRules.push(
      `hashtags count between ${limits.hashtags_min}-${limits.hashtags_max}`
    );
  }

  const baseRules = [
    "Return ONLY valid JSON. No markdown, no extra text.",
    "DEFAULT LANGUAGE: Turkish (unless user explicitly requests another language).",
    "No emojis in titles/descriptions.",
    "Be specific and clear.",
    `Use this tone for ALL fields:\n${toneGuideline(tone)}`,
    `HARD LIMITS (do NOT exceed):\n- ${limitRules.join("\n- ")}`,
    "Hashtags must be plain words (no #) and lowercased if possible.",
  ].join("\n\n");

  const userBlock = userPrompt
    ? `SPECIAL USER REQUEST:\n${userPrompt}\n\nIMPORTANT: If user specifies language, generate ALL fields only in that language.`
    : "";

  const schema = buildSchema(contentTypes, limits);

  return [
    "Analyze the product image and generate marketing content.",
    `REQUESTED CONTENT TYPES: ${contentTypes.join(", ")}`,
    userBlock,
    "JSON FORMAT (exact keys):",
    schema,
    "RULES:",
    baseRules,
  ]
    .filter(Boolean)
    .join("\n\n");
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as GenerateBody;

    if (!body.imageInput) return badRequest("imageInput is required");
    if (!body.contentTypes?.length)
      return badRequest("At least one content type must be selected");

    const tone: ContentTone = body.contentTone ?? "sales";
    const limits = normalizeLimits(body);

    const normalized = await normalizeToBuffer(body.imageInput);

    const resized = await resizeImageBuffer({
      input: normalized.buffer,
      maxWidth: 1024,
      maxHeight: 1024,
      format: "webp",
      quality: 82,
    });

    const b64 = resized.buffer.toString("base64");
    const mime = resized.mime;
    const ai = new GoogleGenAI({ apiKey: requireEnv("GEMINI_API_KEY") });

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [
        { inlineData: { mimeType: mime, data: b64 } },
        {
          text: buildPrompt({
            contentTypes: body.contentTypes,
            tone,
            userPrompt: body.userPrompt,
            limits,
          }),
        },
      ],
      config: { temperature: 0.7 },
    });

    const rawText = response.text ?? "";
    let data: unknown;

    try {
      data = JSON.parse(extractJsonObject(rawText));
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON returned", raw: rawText },
        { status: 422, headers: corsHeaders }
      );
    }

    return NextResponse.json({ ok: true, data }, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Gemini request failed",
        details: err?.message || "Unknown error",
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
