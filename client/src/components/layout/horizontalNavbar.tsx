import { useStore } from "@/stores/store"
import { observer } from "mobx-react-lite"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { LucidePawPrint } from "lucide-react"

export default observer(function HorizontalNavbar() {
    const { userStore } = useStore()
    const { user } = userStore

    return (
        <nav className="flex justify-center py-4 w-full border-b shadow mb-12 px-4">
            <div className="flex justify-between items-center max-w-7xl w-full">
                <div className="flex gap-2">
                    <LucidePawPrint />
                    <p className="font-bold text-lg">Pup Finder</p>
                </div>

                {user &&
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarFallback className="bg-black text-white">
                                    {user?.name
                                        ? user.name
                                            .split(" ")
                                            .map(n => n[0])
                                            .join("")
                                            .toUpperCase()
                                        : "?"}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>My account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer" onClick={userStore.logout}>
                                Log out
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>
        </nav>
    )
})