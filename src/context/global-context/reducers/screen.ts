import { ContextAction } from '../types';
import { ScreenAction, ScreenState } from './types';

export const screenInitial = { isMobile: false };

export const screenReducer = (
  state: ScreenState,
  action: ScreenAction
): ScreenState => {
  switch (action.type) {
    case ContextAction.setLayout:
      return { ...state, isMobile: action.payload.isMobile };
    default:
      return state;
  }
};
