'use client';
import { createContext } from 'react';
import { GlobalContextState } from './types';
import { defaultState } from './reducers/constants';

const GlobalContext = createContext<GlobalContextState>({
  state: defaultState,
  dispatch: () => {}
});

export default GlobalContext;
