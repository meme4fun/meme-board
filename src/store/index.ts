import React from 'react';
import RootStore from './root';

import { enableStaticRendering } from 'mobx-react-lite';
// there is no window object on the server
enableStaticRendering(typeof window === 'undefined');

export const rootStore = new RootStore();

const getRootStore: () => RootStore = () => {
  return rootStore;
};

export const useStore = () => rootStore;

export const getStore = () => rootStore;

globalThis.getStore = () => getRootStore();
