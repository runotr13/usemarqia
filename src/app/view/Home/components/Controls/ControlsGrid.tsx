"use client";

import React from "react";
import LangSelect from "./LangSelect";
import ToneSelect from "./ToneSelect";
import GoalPicker from "./GoalPicker";
import PlatformPicker from "./PlatformPicker";
import { ACTIONS } from "../../reducer";

type Props = {
  state: any;
  dispatch: React.Dispatch<any>;
};

export function ControlsGrid({ state, dispatch }: Props) {
  const { controls } = state;

  const setControl = (patch: Partial<typeof controls>) => {
    dispatch({
      type: ACTIONS.SET_CONTROL,
      payload: patch,
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <PlatformPicker
        value={controls.platform}
        onChange={(platform) => setControl({ platform })}
      />

      <GoalPicker
        value={controls.goal}
        onChange={(goal) => setControl({ goal })}
      />

      <ToneSelect
        value={controls.tone}
        onChange={(tone) => setControl({ tone })}
      />

      <LangSelect
        value={controls.lang}
        onChange={(lang) => setControl({ lang })}
      />
    </div>
  );
}
