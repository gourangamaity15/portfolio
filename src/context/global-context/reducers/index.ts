import { localeReducer } from './locale';
import { screenReducer } from './screen';
import {
  GlobalContextAction,
  GlobalContextReducerState,
  LocaleAction,
  ScreenAction

} from './types';

export const rootReducer = (
  {
    screen,
    locale
  }: GlobalContextReducerState,
  action: GlobalContextAction
): GlobalContextReducerState => ({
  screen: screenReducer(screen, action as ScreenAction),
  locale: localeReducer(locale, action as LocaleAction)
});
