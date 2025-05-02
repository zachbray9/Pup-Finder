import Option from "@/types/models/option"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command"
import { cn } from "@/lib/utils"

interface Props {
    options: Option[]
    selectedValue?: string
    placeholder?: string
    onChange: (value: string) => void
}

export default function ComboBox({options, selectedValue, placeholder = "Choose an option", onChange} : Props) {

    const handleSelect = (value: string) => {
        onChange(value)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                        "w-[200px] justify-between",
                        !selectedValue && "text-muted-foreground"
                    )}
                >
                    {selectedValue || placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    value={option.value}
                                    key={option.value}
                                    onSelect={() => handleSelect(option.value)}
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            (selectedValue === option.value)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}