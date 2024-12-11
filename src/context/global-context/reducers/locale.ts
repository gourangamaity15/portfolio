import { AVAILABLE_LANGUAGES } from "src/locale/constants";
import { ContextAction } from "../types";
import { LocaleAction, LocaleState } from "./types";

export const localeInitial = { lang: AVAILABLE_LANGUAGES.en };

export const localeReducer = (
  state: LocaleState,
  action: LocaleAction
): LocaleState => {
  switch (action.type) {
    case ContextAction.setLang:
      return { ...state, lang: action.payload };
    default:
      return state;
  }
};
