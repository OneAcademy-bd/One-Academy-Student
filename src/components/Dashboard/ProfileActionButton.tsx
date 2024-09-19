import { Button } from "@nextui-org/react"


interface Props {
    type: "button" | "submit" | "reset" | undefined,
    content: string,
    icon?: any,
    action?: any
}

export default function ProfileActionButton({ type, content, icon, action }: Props) {
    return (
        <>
            <div className="h-5"></div>
            <Button type={type} size="sm" radius="none" color="primary" variant="ghost" onClick={action} endContent={icon} className="text-lg py-5">
                {content}
            </Button>
        </>
    )
}
