import { agent } from "@/axios/fetchAgent";
import Dog from "@/types/models/dog";
import { makeAutoObservable, runInAction } from "mobx";

export default class DogStore {
    dogs: Dog[] = []

    breedFilters: string[] = []
    minAgeFilter: number | undefined = 0
    maxAgeFilter: number | undefined = 30
    sortByFilter: string = "asc"

    nextPage: string | undefined = undefined
    isLoading: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    getDogs = async(newSearch?: boolean) => {
        this.setIsLoading(true)

        if(newSearch){
            this.clearNextPage()
            this.dogs = []
        }

        //build dog search params
        const params = new URLSearchParams()
        if(this.breedFilters && this.breedFilters.length > 0){
            for(const breed of this.breedFilters){
                params.append("breeds", breed)
            }
        }
        if(this.minAgeFilter) params.append("ageMin", this.minAgeFilter.toString())
        if(this.maxAgeFilter) params.append("ageMax", this.maxAgeFilter.toString())
        if(this.sortByFilter) params.append("sort", `breed:${this.sortByFilter}`)
        //

        const res = await agent.dogs.getDogIds(this.nextPage, params.toString())
        console.log(res)
        const dogIds = res.resultIds

        if(res.next){
            this.nextPage = res.next
        } else {
            this.nextPage = undefined
        } 

        const dogs = await agent.dogs.getDogObjects(dogIds)
        this.concatenateDogs(dogs)

        this.setIsLoading(false)
    }

    concatenateDogs = (newDogs: Dog[]) => {
        runInAction(() => this.dogs.push(...newDogs))
    }

    setBreedFilters = (breeds: string[]) => {
        this.breedFilters = breeds
    }

    setAgeFilters = (range: [number, number]) => {
        this.minAgeFilter = range[0]
        this.maxAgeFilter = range[1]
    }

    setSortByFilter = (value: "asc" | "desc") => {
        this.sortByFilter = value
    }

    clearNextPage = () => {
        this.nextPage = undefined
    }

    setIsLoading = (value: boolean) => {
        this.isLoading = value
    }
    
}