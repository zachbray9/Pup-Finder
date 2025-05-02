import { LucideCheck, LucideHeart, LucideMapPin } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/store";
import Dog from "@/types/models/dog";

interface Props {
    dog: Dog
}

export default observer(function DogCard({ dog }: Props) {
    const { likedDogStore } = useStore()
    const { likedDogs, toggleLikedDog } = likedDogStore
    const { id, name, img, age, breed, zip_code } = dog
    const liked = likedDogs.map(dog => dog.id).includes(id)

    return (
        <Card key={id} className="max-w-xs w-full pt-0 overflow-hidden">
            <div className="relative w-full h-40">
                <div id="overlay" className="absolute top-3/6 bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent" />
                <img src={img} alt={name} className="w-full h-full object-cover" />

                <div className="absolute bottom-2 left-2 flex items-start gap-1 text-white/80 text-sm">
                    <LucideMapPin size={16} />
                    <p>{zip_code}</p>
                </div>

                <Button
                    size="icon"
                    className="absolute top-2 right-2 bg-white hover:bg-gray-300 text-black rounded-full hover:cursor-pointer"
                    onClick={() => toggleLikedDog(dog)}
                >
                    {!liked ? (
                        <LucideHeart />
                    ) : (
                        <LucideCheck />
                    )}
                </Button>
            </div>

            <CardContent>
                <h5 className="text-lg font-semibold">{name}</h5>
                <p className="text-sm text-gray-500">{`${breed} • ${age} years old`}</p>
            </CardContent>
        </Card>
    )
})