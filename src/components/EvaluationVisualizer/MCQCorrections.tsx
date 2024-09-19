import { X as WrongIcon, Check as RightIcon } from "lucide-react"
import clsx from "clsx"

import { MCQCorrection } from "../../types"


interface MCQCorrectionsProps {
    mcq_corrections: Array<MCQCorrection>,
}

export default function MCQCorrections({ mcq_corrections }: MCQCorrectionsProps) {
    const rows = mcq_corrections.map((item, idx) => {
        const isCorrectAns = item.given_ans.trim() === item.correct_ans.trim()

        return (
            <tr key={`mcq-correction-tr-${idx}`}>
                <td className="ps-1">{isCorrectAns ? <RightIcon color="green" /> : <WrongIcon color="red" />}</td>
                <td className="ps-1.5">{item.mcq_question}</td>
                <td className="capitalize ps-1 text-success">{item.correct_ans}</td>
                <td className={clsx("capitalize px-1", isCorrectAns && "text-success" || "text-wrong")}>{item.given_ans}</td>
            </tr>
        )
    })

    return (
        <div className="correction-subsection">
            <h3>MCQ Corrections</h3>

            <div className="correction-visualizer-table-wrapper">
                <table>
                    <thead>
                        <th className="w-[14%] ps-1">Status</th>
                        <th className="ps-1.5">Question</th>
                        <th className="ps-1">Correct Ans</th>
                        <th className="px-1">Given Ans</th>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
