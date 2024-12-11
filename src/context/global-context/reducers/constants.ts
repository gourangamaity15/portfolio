import { localeInitial } from './locale';
import { screenInitial } from './screen';
import { GlobalContextReducerState } from './types';

export const defaultState: GlobalContextReducerState = {
  screen: screenInitial,
  locale: localeInitial
};
