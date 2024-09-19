import { Card, CardBody } from "@nextui-org/react"

interface SubTimerProps {
    text: string,
    content: string
}

function SubTimer({ text, content }: SubTimerProps) {
    return (
        <div className="flex flex-col justify-center items-center">
            <span>{content}</span>
            <span className="text-xs">{text}</span>
        </div>
    )
}

interface Props {
    hours: string,
    minutes: string,
    seconds: string
}

export default function Timer({ hours, minutes, seconds }: Props) {
    return (
        <Card radius="none" className="z-[90] fixed bottom-3 right-3 rounded-sm">
            <CardBody className="px-1.5 py-0.5">
                <div className="flex justify-center items-center space-x-1.5 text-lg text-zinc-700 dark:text-zinc-300">
                    <SubTimer text="hours" content={hours} />

                    <span className="font-bold">:</span>

                    <SubTimer text="minutes" content={minutes} />

                    <span className="font-bold">:</span>

                    <SubTimer text="seconds" content={seconds} />
                </div>
            </CardBody>
        </Card>
    )
}
