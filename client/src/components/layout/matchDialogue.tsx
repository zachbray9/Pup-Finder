import { useStore } from "@/stores/store";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Dog from "@/types/models/dog";
import { observer } from "mobx-react-lite";
import { LucidePawPrint } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface Props {
    likedDogs: Dog[]
}

export default observer(function MatchDialogue({ likedDogs }: Props) {
    const { matchStore } = useStore()
    const { match, isLoading } = matchStore
    const disabled = likedDogs.length === 0

    const handleGenerateMatch = () => {
        matchStore.generateMatch(likedDogs, true)
    }

    return (
        <Dialog onOpenChange={() => matchStore.clearMatch()}>
            <DialogTrigger asChild>
                <Button onClick={handleGenerateMatch} disabled={disabled}>Generate my match</Button>
            </DialogTrigger>

            <DialogContent className="max-w-md w-full">
                {isLoading ? (
                    <>
                        <VisuallyHidden>
                            <DialogTitle className="hidden"></DialogTitle>
                        </VisuallyHidden>
                        <div className="flex items-center justify-center py-10 gap-4">
                            <LucidePawPrint size={24} className="animate-pulse" />
                            <p className="text-muted-foreground">Finding your perfect match...</p>
                        </div>
                    </>
                ) : (
                    <>
                        <DialogHeader className="flex flex-col items-center">
                            <DialogTitle>It's a match!</DialogTitle>
                            <DialogDescription>Here's a dog we think you'll love.</DialogDescription>
                        </DialogHeader>

                        {
                            match && (
                                <div className="flex flex-col items-center gap-4">
                                    <img
                                        src={match.img}
                                        alt={match.name}
                                        className="w-48 h-48 object-cover rounded-md shadow"
                                    />

                                    <div className="text-center space-y-1">
                                        <h3 className="text-lg font-semibold">{match.name}</h3>
                                        <p className="text-muted-foreground">
                                            {match.age} years old · {match.breed}
                                        </p>
                                        <p className="text-sm text-gray-500">Zip Code: {match.zip_code}</p>
                                    </div>
                                </div>
                            )
                        }

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button onClick={() => matchStore.clearMatch()}>Keep Looking</Button>
                            </DialogClose>
                        </DialogFooter>
                    </>
                )}

            </DialogContent >
        </Dialog >
    )
})