import { useId } from "react"
import { UseFormReturn } from "react-hook-form"

import { ExamPaperPostType, MultipleChoiceQuestionType } from "../../types"


interface OptionProps {
    form: UseFormReturn<ExamPaperPostType, any, undefined>,
    index_in_form: number,
    option: string
}

function Option({ form, index_in_form, option }: OptionProps) {
    const id = useId()
    const register = form.register

    return (
        <li className="option">
            <input type="radio" id={id} value={option} {...register(`mcq_answers.${index_in_form}.mcq_ans`)} />
            <label htmlFor={id}>{option}</label>
        </li>
    )
}

interface MCQProps {
    serial: number,
    form: UseFormReturn<ExamPaperPostType, any, undefined>,
    mcq: MultipleChoiceQuestionType
}

function MCQ({ serial, form, mcq }: MCQProps) {
    const register = form.register

    return (
        <div className="a-question">
            <div className="actual-question">
                <span>{serial}.</span>
                <span>{mcq.question}</span>
            </div>

            <ul className="options-wrapper">
                <input type="hidden" value={mcq.id} {...register(`mcq_answers.${serial - 1}.mcq_id`, { valueAsNumber: true })} />
                {mcq.options.map((option, idx) => <Option key={`mcq-option-${idx}`} index_in_form={serial - 1} form={form} option={option} />)}
            </ul>
        </div>
    )
}

interface MainProps {
    form: UseFormReturn<ExamPaperPostType, any, undefined>,
    MCQs: Array<MultipleChoiceQuestionType>
}

export default function MultipleChoiceQuestions({ form, MCQs }: MainProps) {
    return (
        <div className="question-subsection">
            <h3>Multiple Choice Questions</h3>
            <div className="questions-wrapper">
                {MCQs.map((mcq, idx) => <MCQ key={`mcq-${mcq.id}-${idx}`} serial={idx + 1} form={form} mcq={mcq} />)}
            </div>
        </div>
    )
}
