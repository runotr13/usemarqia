"use client";

type EcommerceLimitsValue = {
  titleMax: string;
  descMax: string;
};

type Props = {
  value: EcommerceLimitsValue;
  onChange: (patch: Partial<EcommerceLimitsValue>) => void;
};

const EcommerceLimits = ({ value, onChange }: Props) => {
  return (
    <>
      <div>
        <label className="text-xs font-medium text-gray-700 block mb-1">
          E-commerce Title Max (10-150)
        </label>
        <input
          type="number"
          min={10}
          max={150}
          value={value.titleMax}
          onChange={(e) => onChange({ titleMax: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-700 block mb-1">
          E-commerce Description Max (50-5000)
        </label>
        <input
          type="number"
          min={50}
          max={5000}
          value={value.descMax}
          onChange={(e) => onChange({ descMax: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
        />
      </div>
    </>
  );
};

export default EcommerceLimits;
