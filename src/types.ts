export type LoginCredentials = {
    username: string,
    password: string
}

export type UserCreateInfo = {
    username: string,
    password: string,
    password_confirmation: string,
    email: string,
    first_name: string,
    last_name: string
}

export type StudentRegistrationInfo = {
    user: UserCreateInfo,
    phone: string,
    gender: string,
    academy: string
}

export type TokenPairType = {
    access: string,
    refresh: string
}

export interface UserType {
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    date_joined: string
}

export interface StudentProfileType {
    user: UserType,
    studentId: string,
    phone: string,
    gender: 'male' | 'female' | 'others',
    academy: string
}

export interface StudentProfileUpdateType {
    user: {
        username: string,
        email: string,
        first_name: string,
        last_name: string,
    },
    phone: string,
    gender: 'male' | 'female' | 'others',
    academy: string
}

export interface SubjectType {
    subject: string,
    code: string,
    group: string,
}

export interface TagType {
    tag: string,
}

export interface OptionType {
    option: string,
}

export interface CreativeQuestionType {
    id: number,
    question: string,
    tags: Array<string>
}

export interface MultipleChoiceQuestionType {
    id: number,
    question: string,
    tags: Array<string>,
    options: Array<string>
}

export interface TrueFalseQuestionType {
    id: number,
    question: string,
    tags: Array<string>,
}

export interface ExamType {
    id: number,
    title: string,
    subjects: Array<SubjectType>,
    least_answer: number,
    duration: string,
    pass_marks: number,
    already_taken: boolean,
    creative_questions: Array<CreativeQuestionType>,
    multiple_choice_questions: Array<MultipleChoiceQuestionType>,
    true_false_questions: Array<TrueFalseQuestionType>,
}

export interface MCQGivenAnswerType {
    mcq_id: number,
    mcq_ans: string,
}

export interface TFGivenAnswerType {
    tf_id: number,
    tf_ans: boolean,
}

export interface ExamPaperPostType {
    exam_id: number,
    duration: string, // must be of python duration type, in seconds or "hh:mm:ss" formatted string
    mcq_answers: Array<MCQGivenAnswerType>,
    tf_answers: Array<TFGivenAnswerType>,
}

export interface MCQCorrection {
    mcq_question: string,
    correct_ans: string,
    given_ans: string
}

export interface TFCorrection {
    tf_question: string,
    correct_ans: boolean,
    given_ans: boolean
}

export interface ExamPaperEvaluationType {
    marks: number,
    duration: string, // duration in seconds or "hh:mm:ss" formatted string
    mcq_corrections: Array<MCQCorrection>,
    tf_corrections: Array<TFCorrection>
}

export interface TakenExamType {
    exam: string,
    duration: string,
    marks: number,
    attempts: number,
    last_attempted_at: string,
    status: string
}