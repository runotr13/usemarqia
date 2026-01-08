import { toast } from "sonner";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

function safeCopy(text: string) {
  try {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  } catch {
    toast.error("Failed to copy to clipboard");
  }
}

function clampInt(v: number, min: number, max: number) {
  if (!Number.isFinite(v)) return min;
  return Math.max(min, Math.min(max, Math.floor(v)));
}
export { cn, isImageFile, safeCopy, clampInt };
