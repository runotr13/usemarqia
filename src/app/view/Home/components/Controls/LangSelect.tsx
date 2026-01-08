import { Lang } from "../../types/home.type";

type Props = {
  value: Lang;
  onChange: (v: Lang) => void;
};

const LangSelect = ({ value, onChange }: Props) => {
  return (
    <div className="p-5 rounded-2xl bg-white border-2 border-gray-200">
      <p className="font-semibold text-gray-800 mb-3">Language</p>

      <select
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value as Lang)}
      >
        <option value="en">🇬🇧 English</option>
        <option value="tr">🇹🇷 Turkish</option>
      </select>
    </div>
  );
};

export default LangSelect;
