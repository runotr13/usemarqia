import { Tone } from "../../types/home.type";

type Props = {
  value: Tone;
  onChange: (v: Tone) => void;
};

const ToneSelect = ({ value, onChange }: Props) => {
  return (
    <div className="p-5 rounded-2xl bg-white border-2 border-gray-200">
      <p className="font-semibold text-gray-800 mb-3">Tone</p>

      <select
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value as Tone)}
      >
        <option value="friendly">😊 Friendly</option>
        <option value="professional">💼 Professional</option>
        <option value="fun">🎉 Fun</option>
      </select>
    </div>
  );
};

export default ToneSelect;
