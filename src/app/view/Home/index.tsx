"use client";

import { useReducer } from "react";
import { reducer, initialState, ACTIONS } from "./reducer";
import { useHomeController } from "./hooks/useHomeController";

import { Header } from "./components/Header";
import { ImagePicker } from "./components/ImageInput/ImagePicker";
import { ControlsGrid } from "./components/Controls/ControlsGrid";
import { LimitsPanel } from "./components/Limits/LimitsPanel";
import { NotesPanel } from "./components/Notes/NotesPanel";
import { ResultsPanel } from "./components/Results/ResultsPanel";

export default function HomeComp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const ctrl = useHomeController(state, dispatch);

  const { image, controls, ui } = state;

  return (
    <main className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <Header />

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8">
          <input
            ref={ctrl.fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => ctrl.onFile(e.target.files?.[0])}
            className="hidden"
          />

          {!image.input ? (
            <ImagePicker
              image={image}
              dispatch={dispatch}
              onUseUrl={ctrl.useUrl}
              onPickFile={ctrl.pickFile}
              dragActive={image.dragActive}
              dragHandlers={ctrl.dragHandlers}
            />
          ) : (
            <div className="space-y-6">
              {/* Preview */}
              {/* bunu ayrı component yap */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200">
                <img
                  src={image.input}
                  alt="Selected image"
                  className="w-full max-h-96 object-contain bg-gray-50"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={ctrl.pickFile}
                    className="px-3 py-2 rounded-xl bg-white/90 border text-sm font-semibold cursor-pointer hover:bg-black/10"
                  >
                    Replace
                  </button>
                  <button
                    onClick={ctrl.removeImage}
                    className="px-3 py-2 rounded-xl bg-white/90 border text-sm font-semibold cursor-pointer hover:bg-black/10"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <ControlsGrid state={state} dispatch={dispatch} />
              <LimitsPanel state={state} dispatch={dispatch} />
              <NotesPanel
                notes={controls.notes}
                onChange={(v) =>
                  dispatch({ type: ACTIONS.SET_CONTROL, payload: { notes: v } })
                }
                summary={ctrl.requestSummary}
              />

              <div className="flex gap-3 md:flex-row flex-col-reverse">
                <button
                  onClick={() => dispatch({ type: ACTIONS.RESET_ALL })}
                  disabled={!ctrl.canGenerate}
                  className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400 font-medium cursor-pointer"
                >
                  Reset
                </button>

                <button
                  onClick={ctrl.generate}
                  title="Generate Content"
                  disabled={!ctrl.canGenerate}
                  className="flex-1 px-6 py-3 cursor-pointer rounded-xl bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold disabled:opacity-50"
                >
                  {ui.loading ? "Generating..." : "Generate Content"}
                </button>
              </div>

              {ui.error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                  <p className="text-red-600 text-sm font-medium">{ui.error}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <ResultsPanel result={ui.result} onCopy={ctrl.copy} />
      </div>
    </main>
  );
}
