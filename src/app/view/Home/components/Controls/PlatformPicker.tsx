import { cn } from "../../helpers/home.helpers";
import { Check, Instagram, ShoppingBag } from "lucide-react";
import { Platform } from "../../types/home.type";

type Props = {
  value: Platform;
  onChange: (v: Platform) => void;
};

const PlatformPicker = ({ value, onChange }: Props) => {
  return (
    <div className="p-5 rounded-2xl bg-white border-2 border-gray-200">
      <p className="font-semibold text-gray-800 mb-3">Platform</p>

      <div className="grid md:grid-cols-2 gap-3">
        <button
          onClick={() => onChange("ecommerce")}
          title="E-commerce"
          className={cn(
            "p-4 rounded-xl border-2 text-left transition cursor-pointer",
            value === "ecommerce"
              ? "bg-green-50 border-green-500"
              : "bg-gray-50 border-gray-300 hover:border-green-300"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            {value === "ecommerce" && (
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
            <ShoppingBag className="w-5 h-5 text-green-600" />
            <p className="font-semibold">E-commerce</p>
          </div>
          <p className="text-xs text-gray-600">Title + description</p>
        </button>

        <button
          onClick={() => onChange("instagram")}
          title="Instagram"
          className={cn(
            "p-4 rounded-xl border-2 text-left transition cursor-pointer",
            value === "instagram"
              ? "bg-pink-50 border-pink-500"
              : "bg-gray-50 border-gray-300 hover:border-pink-300"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            {value === "instagram" && (
              <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
            <Instagram className="w-5 h-5 text-pink-600" />
            <p className="font-semibold">Instagram</p>
          </div>
          <p className="text-xs text-gray-600">Title + caption + hashtags</p>
        </button>
      </div>
    </div>
  );
};

export default PlatformPicker;
