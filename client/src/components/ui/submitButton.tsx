import { Loader2 } from "lucide-react";
import { Button } from "./button";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    isSubmitting?: boolean
    regText?: string
    loadingText?: string
    classList?: string
}

export default function SubmitButton({ isSubmitting = false, regText = "Submit", loadingText= "Loading", ...props }: Props) {
    return (
        <Button {...props} disabled={isSubmitting}>
            { isSubmitting ? (
                <>
                    <Loader2 className="animate-spin"/>
                    {loadingText}
                </>
            ) : (
                <>{regText}</>
            )}
        </Button>
    )
}