import { Instagram, ShoppingBag } from "lucide-react";
import type { Platform } from "../types/home.type";

export const PLATFORM_CONFIG: Record<
  Platform,
  {
    label: string;
    Icon: any;
    accent: {
      selected: string;
      unselected: string;
      icon: string;
      dot: string;
    };
    help: string;
  }
> = {
  ecommerce: {
    label: "E-commerce",
    Icon: ShoppingBag,
    accent: {
      selected: "bg-green-50 border-green-500",
      unselected: "bg-gray-50 border-gray-300 hover:border-green-300",
      icon: "text-green-600",
      dot: "bg-green-500",
    },
    help: "Title + description",
  },
  instagram: {
    label: "Instagram",
    Icon: Instagram,
    accent: {
      selected: "bg-pink-50 border-pink-500",
      unselected: "bg-gray-50 border-gray-300 hover:border-pink-300",
      icon: "text-pink-600",
      dot: "bg-pink-500",
    },
    help: "Title + caption + hashtags",
  },
};
