import { createContext, useContext } from "react";
import UserStore from "./userStore";
import DogStore from "./dogStore";
import LikedDogStore from "./likedDogStore";
import MatchStore from "./matchStore";

interface Store {
    userStore: UserStore
    dogStore: DogStore
    likedDogStore: LikedDogStore
    matchStore: MatchStore
}

export const store: Store = {
    userStore: new UserStore(),
    dogStore: new DogStore(),
    likedDogStore: new LikedDogStore(),
    matchStore: new MatchStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}