"use client";

import React from "react";

type InstagramLimitsValue = {
  titleMax: string;
  descMax: string;
  hashtagsMin: string;
  hashtagsMax: string;
};
type Props = {
  value: InstagramLimitsValue;
  onChange: (patch: Partial<InstagramLimitsValue>) => void;
};

const InstagramLimits = ({ value, onChange }: Props) => {
  return (
    <>
      <div>
        <label className="text-xs font-medium text-gray-700 block mb-1">
          Instagram Title Max (10-150)
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
          Instagram Description Max (50-4000)
        </label>
        <input
          type="number"
          min={50}
          max={4000}
          value={value.descMax}
          onChange={(e) => onChange({ descMax: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-700 block mb-1">
          Hashtags Min (1-10)
        </label>
        <input
          type="number"
          min={1}
          max={10}
          value={value.hashtagsMin}
          onChange={(e) => onChange({ hashtagsMin: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-700 block mb-1">
          Hashtags Max (1-30)
        </label>
        <input
          type="number"
          min={1}
          max={30}
          value={value.hashtagsMax}
          onChange={(e) => onChange({ hashtagsMax: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
        />
      </div>

      <p className="md:col-span-2 text-xs text-gray-500">
        Note: If Min &gt; Max, will auto-correct.
      </p>
    </>
  );
};

export default InstagramLimits;
