export default interface GetDogIdsResponse {
    prev?: string
    next?: string
    resultIds: string[]
    total: number
}