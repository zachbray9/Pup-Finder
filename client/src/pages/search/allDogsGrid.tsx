import DogCard from "@/components/layout/dogCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore } from "@/stores/store";
import { LucideLoader2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";

export default observer(function AllDogsGrid() {
    const { dogStore } = useStore()
    const { dogs, isLoading, nextPage } = dogStore
    const loadMoreRef = useRef<HTMLDivElement>(null)
    const hasFetchedRef = useRef(false)

    //fetch dogs upon initial mount
    useEffect(() => {
        if (!hasFetchedRef.current) {
            hasFetchedRef.current = true
        }

        dogStore.getDogs(true)
    }, [dogStore])

    //detect when loadMoreDiv becomes visible on the page and load more dogs
    useEffect(() => {
        const loadMoreElement = loadMoreRef.current

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !isLoading && nextPage) {
                dogStore.getDogs()
            }
        }, { root: null, threshold: 0 });

        if (loadMoreElement) observer.observe(loadMoreElement)

        return () => {
            if (loadMoreElement) {
                observer.unobserve(loadMoreElement)
            }
        }
    }, [isLoading, nextPage, dogStore])

    return (
        <ScrollArea className="h-[calc(100dvh-180px)]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {dogs.map(dog => (
                    <DogCard
                        key={dog.id}
                        dog={dog}
                    />
                ))}
            </div>

            <div ref={loadMoreRef} id="loadMoreDiv" className="flex justify-center items-center w-full min-h-9 py-4">
                {isLoading &&
                    <div className="flex gap-1 items-center">
                        <LucideLoader2 className="animate-spin" />
                        <p>Loading dogs...</p>
                    </div>
                }
            </div>
        </ScrollArea>
    )
})