import { ArrowDown01, ArrowDown10, ArrowDownAZ, ArrowDownZA } from "lucide-react";

interface Props {
    id?: string
    type: "letters" | "numbers"
    value: string
    onToggle: (value: "asc" | "desc") => void
    size?: number
}

export default function SortByToggle({ id, type = "letters", value, onToggle, size = 16 }: Props) {
    const handleToggle = () => {
        onToggle(value === "asc" ? "desc" : "asc")
    }

    return (
        <button id={id} onClick={handleToggle} className="w-fit aspect-square p-1 border rounded-sm">
            {value === "asc" ?
                type === "letters" ? (<ArrowDownAZ size={size}/>) : (<ArrowDown01 size={size}/>)
                :
                type === "letters" ? (<ArrowDownZA size={size}/>) : (<ArrowDown10 size={size}/>)
            }
        </button>
    )
}