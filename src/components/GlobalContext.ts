import React, { useContext } from 'react';

const GlobalContext = React.createContext<{
  globalConfig?: Window['globalConfig'];
}>({});

export default GlobalContext;

export function useFEOAGlobalConfig() {
  return useContext(GlobalContext).globalConfig;
}
