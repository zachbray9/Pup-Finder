import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import Option from "@/types/models/option"

interface Props {
    id?: string
    options: Option[]
    selectedValues?: string[]
    onChange: (values: string[]) => void
    placeholder?: string
}

export default function MultiSelectCombobox({ id, options, selectedValues = [], onChange, placeholder = "Select options...", }: Props) {
    const toggleValue = (value: string) => {
        if (selectedValues.includes(value)) {
            onChange(selectedValues.filter((v) => v !== value))
        } else {
            onChange([...selectedValues, value])
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild id={id}>
                <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                        "w-full justify-between",
                        selectedValues.length === 0 && "text-muted-foreground"
                    )}
                >
                    {selectedValues.length > 0
                        ? `${selectedValues[0]}...`
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    value={option.value}
                                    key={option.value}
                                    onSelect={() => {
                                        toggleValue(option.value)
                                    }}
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selectedValues.includes(option.value)
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