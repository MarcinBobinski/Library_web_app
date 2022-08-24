import {AuthStore} from "../store/AuthStore";
import React from "react";

interface IStoreContext {
  authStore: AuthStore;
}

const authStore = new AuthStore();

export const StoreContext = React.createContext<IStoreContext>({
  authStore,
});

export const useStore = () => React.useContext(StoreContext)