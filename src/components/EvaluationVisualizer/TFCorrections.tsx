import { X as WrongIcon, Check as RightIcon } from "lucide-react"
import clsx from "clsx"

import { TFCorrection } from "../../types"


interface Props {
    tf_corrections: Array<TFCorrection>
}

export default function TFCorrections({ tf_corrections }: Props) {
    const rows = tf_corrections.map((item, idx) => {
        const isCorrectAns = item.given_ans === item.correct_ans

        return (
            <tr key={`tf-correction-tr-${idx}`}>
                <td className="ps-1">{isCorrectAns ? <RightIcon color="green" /> : <WrongIcon color="red" />}</td>
                <td className="ps-1.5">{item.tf_question}</td>
                <td className="capitalize ps-1 text-success">{item.correct_ans && "True" || "False"}</td>
                <td className={clsx("capitalize", isCorrectAns && "text-success" || "text-wrong")}>{item.given_ans && "True" || "False"}</td>
            </tr>
        )
    })

    return (
        <div className="correction-subsection">
            <h3>True False Corrections</h3>

            <div className="correction-visualizer-table-wrapper">
                <table>
                    <thead>
                        <th className="w-[14%] ps-1">Status</th>
                        <th className="ps-1.5">Question</th>
                        <th>Correct Ans</th>
                        <th>Given Ans</th>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
