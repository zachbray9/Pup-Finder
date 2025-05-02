import { agent } from "@/axios/fetchAgent"
import LoginRequest from "@/types/requests/loginRequest"
import { makeAutoObservable, runInAction } from "mobx"

export default class UserStore {
    user: LoginRequest | null = null

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user
    } 

    login = async (request: LoginRequest) => {
        await agent.auth.login(request)
        runInAction(() => this.user = request)
    }

    logout = async () => {
        await agent.auth.logout()
        this.clearUser()
    }

    clearUser = () => {
        this.user = null
    }

}