import { Instagram, ShoppingBag } from "lucide-react";
import { CopyButton } from "../ui/CopyButton";
type Props = {
  res: {
    instagram_title?: string;
    instagram_description?: string;
    hashtags?: string[];
  };
  onCopy: (text: string) => void;
};

const InstagramResultCard = ({ res, onCopy }: Props) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
          <Instagram className="w-6 h-6 text-pink-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Instagram</h2>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase">
              Title
            </p>
            <CopyButton onCopy={() => onCopy(res.instagram_title!)} />
          </div>
          <p className="text-sm font-medium text-gray-800">
            {res.instagram_title}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase">
              Caption
            </p>
            <CopyButton onCopy={() => onCopy(res.instagram_description!)} />
          </div>
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {res.instagram_description}
          </p>
        </div>

        {res.hashtags?.length ? (
          <div className="p-4 rounded-xl bg-linear-to-br from-purple-50 to-pink-50">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
                Hashtags
              </p>
              <CopyButton
                onCopy={() =>
                  onCopy(res.hashtags ? res?.hashtags.join(" ") : "")
                }
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {res.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white text-purple-600 text-xs font-medium shadow-sm border border-purple-100"
                >
                  #{tag.replace(/^#/, "")}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InstagramResultCard;
