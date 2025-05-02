import { useField, useFormikContext } from "formik";
import { Input } from "./input";
import { ChangeEvent, useState } from "react";
import { Label } from "./label";
import { Button } from "./button";
import { twMerge } from "tailwind-merge";

interface Props extends React.ComponentProps<typeof Input> {
    name: string
    label?: string
    hideable?: boolean
}

export default function FormInput({ name, label, hideable, ...props }: Props) {
    const [field, meta] = useField(name)
    const { setFieldValue } = useFormikContext()
    const [show, setShow] = useState(false)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        setFieldValue(name, input)
    }

    const toggleVisibility = () => {
        setShow(!show)
    }

    return (
        <div className="flex flex-col gap-2">
            {label && <Label htmlFor={name}>{label}</Label>}

            <div className="flex items-center relative">
                <Input
                    {...props}
                    id={name}
                    value={field.value}
                    onChange={handleInputChange}
                    type={hideable ? (show ? 'text' : 'password') : 'text'}
                    className={twMerge('pr-20', props.className)}
                />

                {hideable &&
                    <Button onClick={toggleVisibility} type="button" size='sm' variant='secondary' className="absolute right-2">{show ? 'hide' : 'show'}</Button>
                }
            </div>


            {meta.touched && meta.error && (
                <p className="text-sm text-red-500">{meta.error}</p>
            )}
        </div>
    )
}