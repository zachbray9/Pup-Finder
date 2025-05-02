import { AxiosResponse } from "axios";
import { fetchAgent } from "./axios";
import LoginRequest from "@/types/requests/loginRequest";
import Dog from "@/types/models/dog";
import GetDogIdsResponse from "@/types/responses/getDogIdsResponse";
import GetMatchResponse from "@/types/responses/getMatchResponse";

const ResponseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => fetchAgent.get<T>(url).then(ResponseBody),
    post: <T>(url: string, body: object) => fetchAgent.post<T>(url, body).then(ResponseBody),
    put: <T>(url: string, body: object) => fetchAgent.put<T>(url, body).then(ResponseBody),
    patch: <T>(url: string, body: object) => fetchAgent.patch<T>(url, body).then(ResponseBody),
    delete: <T>(url: string) => fetchAgent.delete<T>(url).then(ResponseBody)
}

const auth = {
    login: (request: LoginRequest) => requests.post("/auth/login", request),
    logout: () => requests.post("/auth/logout", {})
}

const dogs = {
    getDogIds: (url?: string, params?: string) => requests.get<GetDogIdsResponse>(url || `/dogs/search?${params}`),
    getDogObjects: (request: string[]) => requests.post<Dog[]>("/dogs", request),
    getMatch: (ids: string[]) => requests.post<GetMatchResponse>("/dogs/match", ids)
}

export const agent = {
    auth,
    dogs
}