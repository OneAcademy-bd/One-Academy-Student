import { Divider } from "@nextui-org/react"
import PageHead from "./PageHead"

interface Props {
    content: string,
    subcontent?: string
}

export default function Error({ content }: Props) {
    return (
        <section className="h-screen">
            <div className="max-h-[8%]">
                <PageHead header="One Academy" subheader="" />
            </div>
            <div className="h-[92%] px-1 flex justify-center items-center text-center text-foreground-600">
                <span className="hidden sm:block">Ups!</span>
                <Divider orientation="vertical" className="h-8 mx-2 hidden sm:block" />
                <span>{content}</span>
            </div>
        </section>
    )
}
