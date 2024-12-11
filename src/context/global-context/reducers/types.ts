import { ContextAction } from '../types';

export type ScreenState = {
  isMobile: boolean;
};

export type LocaleState = {
  lang: string;
};

export type ScreenAction = {
  type: ContextAction.setLayout;
  payload: ScreenState;
};

export type LocaleAction = { type: ContextAction.setLang; payload: string };

export type GlobalContextAction =
  | ScreenAction
  | LocaleAction

export interface GlobalContextReducerState {
  screen: ScreenState;
  locale: LocaleState;
}
