"use client";

import { Instagram, ShoppingBag } from "lucide-react";
import type { Result } from "../../types/home.type";
import { CopyButton } from "../ui/CopyButton";
import EcommerceResultCard from "./EcommerceResultCard";
import InstagramResultCard from "./InstagramResultCard";

type Props = {
  result: Result | null;
  onCopy: (text: string) => void;
};

export function ResultsPanel({ result, onCopy }: Props) {
  if (!result) return null;

  const res = result;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {res.ecommerce_title && res.ecommerce_description && (
        <EcommerceResultCard res={res} onCopy={onCopy} />
      )}

      {res.instagram_title && res.instagram_description && (
        <InstagramResultCard res={res} onCopy={onCopy} />
      )}
    </div>
  );
}
