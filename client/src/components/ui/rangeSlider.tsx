// import { Slider } from "@radix-ui/react-slider"

import { Slider } from "./slider"

interface Props {
    id?: string
    min?: number
    max?: number
    lowerValue?: number
    upperValue?: number
    onChange: (range: [number, number]) => void
}

export default function RangeSlider({ id, min = 0, max = 100, lowerValue, upperValue, onChange }: Props) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <Slider
                id={id}
                step={1}
                min={min}
                max={max}
                defaultValue={[lowerValue ? lowerValue : min, upperValue ? upperValue : max]}
                onValueChange={onChange}
                className="border-2 rounded-full"
            />

            <div className="flex justify-between items-center w-full">
                <p className="text-sm text-gray-500">{lowerValue}</p>
                <p className="text-sm text-gray-500">{upperValue}</p>
            </div>

        </div>
    )
}