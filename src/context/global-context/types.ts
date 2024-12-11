import {
  GlobalContextAction,
  GlobalContextReducerState
} from './reducers/types';

export interface GlobalContextProviderProps {
  children: React.ReactNode;
  initialValue?: GlobalContextReducerState;
}

export enum ContextAction {
  setLayout = 'SET_LAYOUT',
  setLang = 'SET_LANG',
}

export interface GlobalContextState {
  state: GlobalContextReducerState;
  dispatch: React.Dispatch<GlobalContextAction>;
}
