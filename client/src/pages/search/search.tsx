import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { observer } from "mobx-react-lite"
import AllDogsGrid from "./allDogsGrid"
import LikedDogsGrid from "./likedDogsGrid"
import FilterSidebar from "./filterSidebar"

export default observer(function Search() {
    return (
        <>
            <div className="flex flex-col sm:flex-row justify-center gap-8 max-w-7xl w-full px-4">
                <aside >
                    <FilterSidebar />
                </aside>

                <main className="flex flex-col gap-4 mb-4 w-full">
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="border bg-gray-200">
                            <TabsTrigger value="all">All dogs</TabsTrigger>
                            <TabsTrigger value="liked">Liked dogs</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all">
                            <AllDogsGrid />
                        </TabsContent>

                        <TabsContent value="liked" className="flex flex-col gap-4">
                            <LikedDogsGrid />
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </>
    )
})