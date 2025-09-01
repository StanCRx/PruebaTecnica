import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
export const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
