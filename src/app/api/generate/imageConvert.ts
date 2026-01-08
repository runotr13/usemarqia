import sharp from "sharp";

function dataUrlToBuffer(dataUrl: string) {
  const match = dataUrl.match(/^data:(.+);base64,(.*)$/);
  if (!match) throw new Error("Invalid data URL");
  const mime = match[1];
  const b64 = match[2];
  const buffer = Buffer.from(b64, "base64");
  return { mime, buffer };
}

function bufferToDataUrl(buffer: Buffer, mime: string) {
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

async function resizeImageBuffer(params: {
  input: Buffer;
  maxWidth?: number;
  maxHeight?: number;
  format?: "jpeg" | "webp";
  quality?: number; // 1-100
}) {
  const {
    input,
    maxWidth = 1024,
    maxHeight = 1024,
    format = "webp",
    quality = 82,
  } = params;

  const img = sharp(input, { failOnError: false });

  // contain değil: görsel bozulmasın diye inside (aspect ratio korur)
  const resized = img.resize({
    width: maxWidth,
    height: maxHeight,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (format === "jpeg") {
    return {
      mime: "image/jpeg",
      buffer: await resized.jpeg({ quality, mozjpeg: true }).toBuffer(),
    };
  }

  return {
    mime: "image/webp",
    buffer: await resized.webp({ quality }).toBuffer(),
  };
}

export { dataUrlToBuffer, bufferToDataUrl, resizeImageBuffer };
