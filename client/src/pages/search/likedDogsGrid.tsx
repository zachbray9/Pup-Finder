import DogCard from "@/components/layout/dogCard"
import MatchDialogue from "@/components/layout/matchDialogue"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useStore } from "@/stores/store"
import { observer } from "mobx-react-lite"

export default observer(function LikedDogsGrid() {
    const {likedDogStore} = useStore()
    const {likedDogs} = likedDogStore

    return (
        <div className="flex flex-col gap-4">
            <div className="flex w-full justify-end">
                <MatchDialogue likedDogs={likedDogs} />
            </div>
            <ScrollArea className="h-[calc(100dvh-240px)]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {likedDogs.map(dog => (
                        <DogCard
                            key={dog.id}
                            dog={dog}
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
})