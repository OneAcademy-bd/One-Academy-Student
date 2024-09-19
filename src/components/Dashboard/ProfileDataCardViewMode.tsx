import { Card, CardBody } from "@nextui-org/react"
import clsx from "clsx"


interface Props {
    title: string,
    data: string | undefined,
    icon?: any | undefined
    capitalize?: boolean
}

export default function ProfileDataCardViewMode({ title, data, icon, capitalize = false }: Props) {
    return (
        <Card radius="sm">
            <CardBody className="flex flex-row justify-between items-center text-lg sm:text-xl">
                <span className="flex items-center space-x-2">
                    {icon && <span>{icon}</span>}
                    <span>{title}</span>
                </span>
                {data && <span className={clsx("ps-4 text-right", capitalize && "capitalize")}>{data}</span> || <span className="italic text-warning-400">Not Set</span>}
            </CardBody>
        </Card>
    )
}
