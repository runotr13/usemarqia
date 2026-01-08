import { cn } from "../../helpers/home.helpers";
import { Goal } from "../../types/home.type";

type Props = {
  value: Goal;
  onChange: (v: Goal) => void;
};

const GoalPicker = ({ value, onChange }: Props) => {
  return (
    <div className="p-5 rounded-2xl bg-white border-2 border-gray-200">
      <p className="font-semibold text-gray-800 mb-3">Goal</p>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onChange("sales")}
          title="Sales"
          className={cn(
            "p-4 rounded-xl border-2 text-left transition cursor-pointer",
            value === "sales"
              ? "bg-purple-50 border-purple-500"
              : "bg-gray-50 border-gray-300 hover:border-purple-300"
          )}
        >
          <p className="font-semibold">🎯 Sales</p>
          <p className="text-xs text-gray-600">CTA & conversion</p>
        </button>

        <button
          onClick={() => onChange("post")}
          title="Post"
          className={cn(
            "p-4 rounded-xl border-2 text-left transition cursor-pointer",
            value === "post"
              ? "bg-blue-50 border-blue-500"
              : "bg-gray-50 border-gray-300 hover:border-blue-300"
          )}
        >
          <p className="font-semibold">📱 Post</p>
          <p className="text-xs text-gray-600">Engagement</p>
        </button>
      </div>
    </div>
  );
};

export default GoalPicker;
