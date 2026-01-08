"use client";

import React from "react";
import { Upload, Link as LinkIcon } from "lucide-react";
import { cn } from "../../helpers/home.helpers";
import { ACTIONS } from "../../reducer";

type Props = {
  image: {
    urlField: string;
    dragActive: boolean;
  };
  dispatch: React.Dispatch<any>;
  onUseUrl: () => void;
  onPickFile: () => void;
  dragActive: boolean;
  dragHandlers: {
    onDrag: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
  };
};

export function ImagePicker({
  image,
  dispatch,
  onUseUrl,
  onPickFile,
  dragActive,
  dragHandlers,
}: Props) {
  return (
    <div className="space-y-4">
      {/* URL input */}
      <div className="p-5 rounded-2xl bg-white border-2 border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <LinkIcon className="w-5 h-5 text-gray-600" />
          <p className="font-semibold text-gray-800">Image URL</p>
        </div>

        <div className="flex gap-2">
          <input
            value={image.urlField}
            onChange={(e) =>
              dispatch({
                type: ACTIONS.SET_IMAGE_URL_FIELD,
                payload: e.target.value,
              })
            }
            placeholder="https://.../image.jpg"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
          />

          <button
            onClick={onUseUrl}
            className="px-4 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition cursor-pointer"
          >
            Use
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Tip: Using a URL keeps the payload small; we fetch the image and
          compress it to 1024px.
        </p>
      </div>

      {/* Upload */}
      <div
        onDragEnter={dragHandlers.onDrag}
        onDragLeave={dragHandlers.onDrag}
        onDragOver={dragHandlers.onDrag}
        onDrop={dragHandlers.onDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-12 text-center transition-all",
          dragActive
            ? "border-purple-500 bg-purple-50"
            : "border-gray-300 hover:border-purple-400"
        )}
      >
        <button
          type="button"
          onClick={onPickFile}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Upload"
        />
        <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold mb-2">Upload Image</h3>
        <p className="text-gray-500 mb-4">
          Drag & drop, or click to choose a file
        </p>
        <p className="text-sm text-gray-400">PNG, JPG, WEBP (max 10MB)</p>
      </div>
    </div>
  );
}
