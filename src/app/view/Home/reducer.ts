import type {
  Goal,
  Lang,
  Platform,
  Result,
  Tone,
} from "@/app/view/Home/types/home.type";
import { clampInt } from "./helpers/home.helpers";

export type ImageMode = "upload" | "url";

/**
 * Use `as const` so action values become string literals.
 * Then `ActionType = typeof ACTIONS[keyof typeof ACTIONS]`
 * gives a perfect union of all action strings.
 */
export const ACTIONS = {
  RESET_ALL: "RESET_ALL",
  SET_IMAGE_INPUT: "SET_IMAGE_INPUT",
  SET_IMAGE_URL_FIELD: "SET_IMAGE_URL_FIELD",
  SET_DRAG_ACTIVE: "SET_DRAG_ACTIVE",
  CLEAR_IMAGE: "CLEAR_IMAGE",
  SET_CONTROL: "SET_CONTROL",
  SET_LIMITS_ENABLED: "SET_LIMITS_ENABLED",
  SET_LIMITS: "SET_LIMITS",
  REQUEST_START: "REQUEST_START",
  REQUEST_SUCCESS: "REQUEST_SUCCESS",
  REQUEST_ERROR: "REQUEST_ERROR",
  CLEAR_FEEDBACK: "CLEAR_FEEDBACK",
} as const;

export type ActionType = (typeof ACTIONS)[keyof typeof ACTIONS];

export type LimitsState = {
  enabled: boolean;

  ecommerce: {
    titleMax: string;
    descMax: string;
  };

  instagram: {
    titleMax: string;
    descMax: string;
    hashtagsMin: string;
    hashtagsMax: string;
  };
};

export type FormState = {
  image: {
    input: string;
    mode: ImageMode;
    urlField: string;
    dragActive: boolean;
  };

  controls: {
    platform: Platform;
    goal: Goal;
    tone: Tone;
    lang: Lang;
    notes: string;
  };

  limits: LimitsState;

  ui: {
    loading: boolean;
    error: string;
    result: Result | null;
  };
};

export type Action =
  | { type: typeof ACTIONS.RESET_ALL }
  | {
      type: typeof ACTIONS.SET_IMAGE_INPUT;
      payload: { input: string; mode: ImageMode };
    }
  | { type: typeof ACTIONS.SET_IMAGE_URL_FIELD; payload: string }
  | { type: typeof ACTIONS.SET_DRAG_ACTIVE; payload: boolean }
  | { type: typeof ACTIONS.CLEAR_IMAGE }
  | {
      type: typeof ACTIONS.SET_CONTROL;
      payload: Partial<FormState["controls"]>;
    }
  | { type: typeof ACTIONS.SET_LIMITS_ENABLED; payload: boolean }
  | {
      type: typeof ACTIONS.SET_LIMITS;
      payload:
        | { kind: "ecommerce"; patch: Partial<LimitsState["ecommerce"]> }
        | { kind: "instagram"; patch: Partial<LimitsState["instagram"]> };
    }
  | { type: typeof ACTIONS.REQUEST_START }
  | { type: typeof ACTIONS.REQUEST_SUCCESS; payload: Result }
  | { type: typeof ACTIONS.REQUEST_ERROR; payload: string }
  | { type: typeof ACTIONS.CLEAR_FEEDBACK };

export const initialState: FormState = {
  image: {
    input: "",
    mode: "upload",
    urlField: "",
    dragActive: false,
  },

  controls: {
    platform: "ecommerce",
    goal: "sales",
    tone: "friendly",
    lang: "en",
    notes: "",
  },

  limits: {
    enabled: true,
    ecommerce: {
      titleMax: "70",
      descMax: "200",
    },
    instagram: {
      titleMax: "60",
      descMax: "100",
      hashtagsMin: "5",
      hashtagsMax: "10",
    },
  },

  ui: {
    loading: false,
    error: "",
    result: null,
  },
};

export function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case ACTIONS.RESET_ALL:
      return initialState;

    case ACTIONS.SET_IMAGE_URL_FIELD:
      return {
        ...state,
        image: { ...state.image, urlField: action.payload },
      };

    case ACTIONS.SET_DRAG_ACTIVE:
      return {
        ...state,
        image: { ...state.image, dragActive: action.payload },
      };

    case ACTIONS.SET_IMAGE_INPUT:
      return {
        ...state,
        image: {
          ...state.image,
          input: action.payload.input,
          mode: action.payload.mode,
          urlField:
            action.payload.mode === "upload" ? "" : state.image.urlField,
          dragActive: false,
        },
        ui: { ...state.ui, error: "", result: null },
      };

    case ACTIONS.CLEAR_IMAGE:
      return {
        ...state,
        image: { ...state.image, input: "", mode: "upload", urlField: "" },
        ui: { ...state.ui, error: "", result: null },
      };

    case ACTIONS.SET_CONTROL:
      return {
        ...state,
        controls: { ...state.controls, ...action.payload },
        ui: { ...state.ui, error: "", result: null },
      };

    case ACTIONS.SET_LIMITS_ENABLED:
      return {
        ...state,
        limits: { ...state.limits, enabled: action.payload },
      };

    case ACTIONS.SET_LIMITS:
      if (action.payload.kind === "ecommerce") {
        return {
          ...state,
          limits: {
            ...state.limits,
            ecommerce: { ...state.limits.ecommerce, ...action.payload.patch },
          },
        };
      }
      return {
        ...state,
        limits: {
          ...state.limits,
          instagram: { ...state.limits.instagram, ...action.payload.patch },
        },
      };

    case ACTIONS.REQUEST_START:
      return {
        ...state,
        ui: { ...state.ui, loading: true, error: "", result: null },
      };

    case ACTIONS.REQUEST_SUCCESS:
      return {
        ...state,
        ui: {
          ...state.ui,
          loading: false,
          error: "",
          result: action.payload,
        },
      };

    case ACTIONS.REQUEST_ERROR:
      return {
        ...state,
        ui: {
          ...state.ui,
          loading: false,
          error: action.payload,
          result: null,
        },
      };

    case ACTIONS.CLEAR_FEEDBACK:
      return {
        ...state,
        ui: { ...state.ui, error: "", result: null },
      };

    default:
      return state;
  }
}
