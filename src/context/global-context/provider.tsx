'use client';
import React from 'react';
import GlobalContext from './context';
import { GlobalContextProviderProps, GlobalContextState } from './types';
import { rootReducer } from './reducers';
import { defaultState } from './reducers/constants';

const GlobalContextProvider = ({
  children,
  initialValue = defaultState
}: GlobalContextProviderProps) => {
  const [state, dispatch] = React.useReducer(rootReducer, initialValue);

  const contextValue: GlobalContextState = {
    state,
    dispatch
  };
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
