"use client";

import React from "react";
import { cn } from "../../helpers/home.helpers";
import { ACTIONS } from "../../reducer";
import EcommerceLimits from "./EcommerceLimits";
import InstagramLimits from "./InstagramLimits";

type Props = {
  state: any;
  dispatch: React.Dispatch<any>;
};

export function LimitsPanel({ state, dispatch }: Props) {
  const { limits, controls } = state;

  const setLimitsInput = (
    kind: "ecommerce" | "instagram",
    patch: Record<string, any>
  ) => {
    console.log(patch);
    dispatch({
      type: ACTIONS.SET_LIMITS,
      payload: { kind, patch },
    });
  };

  return (
    <div className="p-5 rounded-2xl bg-white border-2 border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <p className="font-semibold text-gray-800">Limits (Optional)</p>

        <button
          type="button"
          onClick={() =>
            dispatch({
              type: ACTIONS.SET_LIMITS_ENABLED,
              payload: !limits.enabled,
            })
          }
          className={cn(
            "text-xs font-semibold px-3 py-1.5 rounded-full border transition cursor-pointer",
            limits.enabled
              ? "bg-green-50 border-green-300 text-green-700"
              : "bg-gray-50 border-gray-200 text-gray-600"
          )}
        >
          {limits.enabled ? "On" : "Off"}
        </button>
      </div>

      {limits.enabled ? (
        <div className="grid md:grid-cols-2 gap-4">
          {controls.platform === "ecommerce" ? (
            <EcommerceLimits
              value={{
                titleMax: limits.ecommerce.titleMax,
                descMax: limits.ecommerce.descMax,
              }}
              onChange={(patch) => setLimitsInput("ecommerce", patch)}
            />
          ) : (
            <InstagramLimits
              value={{
                titleMax: limits.instagram.titleMax,
                descMax: limits.instagram.descMax,
                hashtagsMin: limits.instagram.hashtagsMin,
                hashtagsMax: limits.instagram.hashtagsMax,
              }}
              onChange={(patch) => setLimitsInput("instagram", patch)}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}
