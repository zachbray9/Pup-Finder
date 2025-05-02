import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import MultiSelectCombobox from "@/components/ui/multiSelectComboBox";
import RangeSlider from "@/components/ui/rangeSlider";
import { breeds } from "@/constants/breeds";
import { useStore } from "@/stores/store";
import { observer } from "mobx-react-lite";
import Option from "@/types/models/option"
import SortByToggle from "@/components/ui/sortByToggle";

export default observer(function FilterSidebar() {
    const { dogStore } = useStore()
    const { breedFilters, minAgeFilter, maxAgeFilter, sortByFilter } = dogStore

    return (
        <div className="flex flex-col gap-8 w-full sm:w-64">
            <h3 className="text-lg font-semibold">Filters</h3>

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <Label htmlFor="breed-combo-box">Breed</Label>
                    <SortByToggle id="breed-order-toggle" type="letters" value={sortByFilter} onToggle={dogStore.setSortByFilter} size={16} />
                </div>
                <MultiSelectCombobox
                    id="breed-combo-box"
                    options={breeds.map<Option>(breed => ({ label: breed, value: breed }))}
                    selectedValues={breedFilters}
                    onChange={dogStore.setBreedFilters}
                    placeholder="Select breeds..."
                />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="age-range-slider">Age Range</Label>
                <RangeSlider id="age-range-slider" min={0} max={30} lowerValue={minAgeFilter} upperValue={maxAgeFilter} onChange={dogStore.setAgeFilters} />
            </div>

            <Button onClick={() => dogStore.getDogs(true)}>Apply filters</Button>
        </div>
    )
})