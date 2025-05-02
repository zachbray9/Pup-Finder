import Dog from "@/types/models/dog";
import { makeAutoObservable } from "mobx";

export default class LikedDogStore{
    likedDogs: Dog[] = []

    constructor() {
        makeAutoObservable(this)
    }

    toggleLikedDog = (likedDog: Dog) => {
        if(this.likedDogs.map(dog => dog.id).includes(likedDog.id)){
            this.likedDogs = this.likedDogs.filter(dog => dog.id !== likedDog.id)
        } else {
            this.likedDogs.push(likedDog)
        }
    }
}