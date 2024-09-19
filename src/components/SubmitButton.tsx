import { Button } from "@nextui-org/react"


interface SubmitButtonProps {
    label: string,
    id?: string
}

export default function SubmitButton({ label, id = '' }: SubmitButtonProps) {
    return (
        <Button id={id} type="submit" radius="none" color="primary" className="w-full text-lg font-semibold">
            {label}
        </Button>
    )
}
