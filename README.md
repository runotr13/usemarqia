# Usemarqia https://usemarqia.vercel.app/

Usemarqia is an open-source **AI marketing content generator** built with **Next.js App Router**.  
Upload a product image (or paste an image URL) and generate:

- **E-commerce** title + description
- **Instagram** title + caption + hashtags
- Optional **limits** (character & hashtag constraints)

Powered by **Google Gemini** via `@google/genai`.

---

## Features

- ✅ Image upload (data URL) or remote image URL (http/https)
- ✅ Auto image normalization (resize & compress to ~1024px WebP on backend)
- ✅ Content types: `ecommerce`, `instagram`
- ✅ Tone/goal: `sales` or `post`
- ✅ Language selection: `tr` or `en`
- ✅ Optional limits (title/description length, hashtag count)
- ✅ UI toast notifications using **Sonner**
- ✅ API route: `POST /api/generate`
- ✅ CORS enabled for API (adjustable)

---

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Sonner** (toasts)
- **Google Gemini** via `@google/genai`
- Image processing utilities (see `imageConvert.ts`)

---

## Requirements

- Node.js **18+** (recommended 20+)
- **pnpm** (recommended package manager)
- A **Gemini API key**

---

## Getting Started

### 1) Install dependencies

This project uses **pnpm** as the primary package manager.

```bash
pnpm install
```

```bash
pnpm dev
```
