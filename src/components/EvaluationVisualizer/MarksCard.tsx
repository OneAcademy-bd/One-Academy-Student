interface MarksCardProps {
    marks: number
}

export default function MarksCard({ marks }: MarksCardProps) {
    return (
        <div className="bg-success-300 m-auto mt-1 rounded px-6 py-4">
            <h2>Marks Obtained</h2>
            <h3 className="text-7xl font-mono">{marks}</h3>
        </div>
    )
}
