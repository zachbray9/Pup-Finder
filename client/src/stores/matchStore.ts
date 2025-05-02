import { agent } from "@/axios/fetchAgent";
import Dog from "@/types/models/dog";
import { makeAutoObservable } from "mobx";

export default class MatchStore {
    match: Dog | undefined = undefined
    isLoading: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    generateMatch = async(likedDogs: Dog[], delay?: boolean) => {
        this.setIsLoading(true)

        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        if(delay) await sleep(2000)

        const likedDogIds = likedDogs.map(dog => dog.id)

        const res = await agent.dogs.getMatch(likedDogIds)
        this.match = likedDogs.find(dog => dog.id === res.match)

        this.setIsLoading(false)
    }

    clearMatch = () => {
        this.match = undefined
    }

    setIsLoading = (value: boolean) => {
        this.isLoading = value
    }
}