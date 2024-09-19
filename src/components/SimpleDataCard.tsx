interface Props {
    title: string,
    data: string,
    color: string
}

export default function SimpleDataCard({ title, data, color }: Props) {
    return (
        <div className={`bg-${color} text-foreground-50 text-center rounded w-full h-[8.5rem] flex flex-col justify-between items-center px-1 py-2`}>
            <h2 className="text-xl md:text-3xl">{title}</h2>
            <p className="text-4xl md:text-6xl font-serif">{data}</p>
        </div>
    )
}
