"use client";

import { useCallback, useMemo, useRef } from "react";
import { ACTIONS } from "../reducer";
import type { Result } from "../types/home.type";
import { isImageFile, safeCopy } from "../helpers/home.helpers";
import { isDataUrl, isHttpUrl } from "@/helpers/isUrl";
import { buildLimitsPayload } from "../config/limits.strategy";
import { buildRequestSummary } from "../config/summary.builder";

export function useHomeController(state: any, dispatch: any) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const { image, controls, limits, ui } = state;

  const canGenerate = useMemo(
    () => Boolean(image.input) && !ui.loading,
    [image.input, ui.loading]
  );

  const limitsPayload = useMemo(
    () => buildLimitsPayload(limits.enabled, controls.platform, limits),
    [limits.enabled, controls.platform, limits]
  );

  const requestSummary = useMemo(
    () =>
      buildRequestSummary({
        platform: controls.platform,
        goal: controls.goal,
        tone: controls.tone,
        lang: controls.lang,
        notes: controls.notes,
        limits,
      }),
    [controls, limits]
  );

  const pickFile = useCallback(() => fileRef.current?.click(), []);

  const onFile = useCallback(
    async (file?: File | null) => {
      dispatch({ type: ACTIONS.CLEAR_FEEDBACK });
      if (!file) return;

      if (!isImageFile(file)) {
        dispatch({
          type: ACTIONS.REQUEST_ERROR,
          payload: "Please upload a valid image file.",
        });
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        dispatch({
          type: ACTIONS.REQUEST_ERROR,
          payload: "Maximum file size is 10MB.",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        dispatch({
          type: ACTIONS.SET_IMAGE_INPUT,
          payload: { input: String(reader.result), mode: "upload" },
        });
      };
      reader.onerror = () => {
        dispatch({
          type: ACTIONS.REQUEST_ERROR,
          payload: "Could not read the file.",
        });
      };
      reader.readAsDataURL(file);
    },
    [dispatch]
  );

  const dragHandlers = {
    onDrag: (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover")
        dispatch({ type: ACTIONS.SET_DRAG_ACTIVE, payload: true });
      if (e.type === "dragleave")
        dispatch({ type: ACTIONS.SET_DRAG_ACTIVE, payload: false });
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch({ type: ACTIONS.SET_DRAG_ACTIVE, payload: false });
      const f = e.dataTransfer.files?.[0];
      if (f) onFile(f);
    },
  };

  const useUrl = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_FEEDBACK });
    const v = image.urlField.trim();

    if (!isHttpUrl(v) && !isDataUrl(v)) {
      dispatch({
        type: ACTIONS.REQUEST_ERROR,
        payload: "Please enter a valid https image URL (or a data URL).",
      });
      return;
    }

    dispatch({
      type: ACTIONS.SET_IMAGE_INPUT,
      payload: { input: v, mode: "url" },
    });
  }, [dispatch, image.urlField]);

  const removeImage = useCallback(
    () => dispatch({ type: ACTIONS.CLEAR_IMAGE }),
    [dispatch]
  );

  const generate = useCallback(async () => {
    dispatch({ type: ACTIONS.REQUEST_START });
    try {
      const r = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageInput: image.input,
          contentTypes: [controls.platform],
          contentTone: controls.goal,
          userPrompt: [
            `Tone: ${controls.tone}`,
            `Language: ${controls.lang}`,
            controls.notes?.trim() ? `Notes: ${controls.notes.trim()}` : null,
          ]
            .filter(Boolean)
            .join("\n"),
          limits: limitsPayload,
        }),
      });

      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Request failed.");

      dispatch({ type: ACTIONS.REQUEST_SUCCESS, payload: j.data as Result });
    } catch (e: any) {
      dispatch({
        type: ACTIONS.REQUEST_ERROR,
        payload:
          "AI service is busy right now. Please try again in a few seconds.",
      });
    }
  }, [dispatch, image.input, controls, limitsPayload]);

  return {
    fileRef,
    canGenerate,
    limitsPayload, // gerekirse debug
    requestSummary,
    pickFile,
    onFile,
    dragHandlers,
    useUrl,
    removeImage,
    generate,
    copy: safeCopy,
  };
}
