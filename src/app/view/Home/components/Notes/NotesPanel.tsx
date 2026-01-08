"use client";

import React from "react";
import { MessageSquare } from "lucide-react";

type Props = {
  notes: string;
  onChange: (v: string) => void;
  summary: string;
};

export function NotesPanel({ notes, onChange, summary }: Props) {
  return (
    <div className="p-5 rounded-2xl bg-white border-2 border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-5 h-5 text-gray-600" />
        <p className="font-semibold text-gray-800">Notes (Optional)</p>
      </div>

      <textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., brand name, target audience, CTA, price, etc."
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none resize-none"
        rows={3}
      />

      <div className="mt-3 bg-gray-50 rounded-xl border border-gray-200 p-3">
        <p className="text-xs font-semibold text-gray-600 mb-1">
          Request Summary
        </p>
        <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
          {summary}
        </pre>
      </div>
    </div>
  );
}
