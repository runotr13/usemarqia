import { ShoppingBag } from "lucide-react";
import React from "react";
import { CopyButton } from "../ui/CopyButton";

type Props = {
  res: {
    ecommerce_title?: string;
    ecommerce_description?: string;
  };
  onCopy: (text: string) => void;
};

const EcommerceResultCard = ({ res, onCopy }: Props) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
          <ShoppingBag className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">E-commerce</h2>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase">
              Title
            </p>
            <CopyButton onCopy={() => onCopy(res.ecommerce_title!)} />
          </div>
          <p className="text-sm font-medium text-gray-800">
            {res.ecommerce_title}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase">
              Description
            </p>
            <CopyButton onCopy={() => onCopy(res.ecommerce_description!)} />
          </div>
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {res.ecommerce_description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EcommerceResultCard;
