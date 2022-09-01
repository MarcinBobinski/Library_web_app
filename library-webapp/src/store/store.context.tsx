import {AuthStore} from "./AuthStore";
import React from "react";
import {BookStore} from "./BookStore";
import {useLocalObservable} from "mobx-react";
import {ImageStore} from "./ImageStore";
import {RentStore} from "./RentStore";

interface IStoreContext {
  authStore: AuthStore;
  bookStore: BookStore;
  imageStore: ImageStore;
  rentStore: RentStore;
}

const authStore = new AuthStore();
const bookStore = new BookStore(authStore);
const imageStore = new ImageStore(authStore)
const rentStore = new RentStore(authStore)

const rootStore: IStoreContext = {
  authStore,
  bookStore,
  imageStore,
  rentStore
}

export const StoreContext = React.createContext<IStoreContext | null>(null);

export const StoreProvider = ({children}: {children: React.ReactNode}) => {
  const store = useLocalObservable(() => rootStore)
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const store = React.useContext(StoreContext)
  if(!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
}