import { useId } from "react"
import { ExamPaperPostType, TrueFalseQuestionType } from "../../types"

import { UseFormReturn } from "react-hook-form"

interface TrueFalseOptionProps {
    form: UseFormReturn<ExamPaperPostType, any, undefined>,
    index_in_form: number,
    value: 'true' | 'false',
    text: 'True' | 'False'
}

function TrueFalseOption({ form, index_in_form, value, text }: TrueFalseOptionProps) {
    const id = useId()
    const register = form.register

    return (
        <li className="option">
            <input type="radio" id={id} value={value} {...register(`tf_answers.${index_in_form}.tf_ans`)} />
            <label htmlFor={id}>{text}</label>
        </li >
    )
}

interface TFQProps {
    serial: number,
    form: UseFormReturn<ExamPaperPostType, any, undefined>,
    tfq: TrueFalseQuestionType
}

function TFQ({ serial, form, tfq }: TFQProps) {
    const register = form.register

    return (
        <div className="a-question">
            <div className="flex flex-row space-x-2">
                <span>{serial}.</span>
                <span>{tfq.question}</span>
            </div>
            <ul className="flex flex-col">
                <input type="hidden" value={tfq.id} {...register(`tf_answers.${serial - 1}.tf_id`, { valueAsNumber: true })} />
                <TrueFalseOption form={form} index_in_form={serial - 1} value="true" text="True" />
                <TrueFalseOption form={form} index_in_form={serial - 1} value="false" text="False" />
            </ul>
        </div>
    )
}

interface MainProps {
    form: UseFormReturn<ExamPaperPostType, any, undefined>,
    tfqs: Array<TrueFalseQuestionType>
}

export default function TrueFalseQuestions({ form, tfqs }: MainProps) {
    return (
        <div className="question-subsection">
            <h3>True False Questions</h3>
            <div className="questions-wrapper">
                {tfqs.map((item, idx) => <TFQ key={idx} serial={idx + 1} form={form} tfq={item} />)}
            </div>
        </div>
    )
}
