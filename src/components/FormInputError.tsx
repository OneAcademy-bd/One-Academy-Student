interface FormInputErrorProps {
    message: string
}

export default function FormInputError({ message }: FormInputErrorProps) {
    return (
        <p className="text-wrong text-small">
            {message}
        </p>
    )
}
