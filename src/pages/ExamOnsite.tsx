// react
import { useEffect, useRef, useState } from "react"

// react hook form
import { useForm, SubmitHandler } from "react-hook-form"

// react router dom
import { useNavigate, useParams } from "react-router-dom"

// tanstack query
import { useMutation } from "@tanstack/react-query"

// nextui
import { Button, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"

import { postPaperToVerifyExam, useAFetchedExam, useFetchedProfile } from "../api/calls"
import { ExamPaperPostType, ExamType } from "../types"
import MultipleChoiceQuestions from "../components/ExamOnsite/MultipleChoiceQuestions"
import TrueFalseQuestions from "../components/ExamOnsite/TrueFalseQuestions"
import BlurPageLoadingIndicator from "../components/BlurPageLoadingIndicator"
import PageHead from "../components/PageHead"
import SubmitButton from "../components/SubmitButton"
import Timer from "../components/ExamOnsite/Timer"


function ExamRendered(exam: ExamType) {
  const navigate = useNavigate()
  const profile = useFetchedProfile()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [timeEnds, setTimeEnds] = useState<boolean>(false)

  // exam duration down counter
  const duration = useRef<number>(parseInt(exam.duration.split(":")[0]) * 3600 + parseInt(exam.duration.split(":")[1]) * 60 + parseInt(exam.duration.split(":")[2])).current
  const intervalId = useRef<any>()
  const [timeRemaining, setTimeRemaining] = useState<number>(duration)
  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTimeRemaining(timeRemaining => timeRemaining - 1);
    }, 1000)

    return () => clearInterval(intervalId.current)
  }, [])
  const inHours = parseInt(`${timeRemaining / 3600}`)
  const inMinutes = parseInt(`${timeRemaining % 3600 / 60}`)
  const inSeconds = parseInt(`${timeRemaining % 3600 % 60}`)
  const timerHours = `${inHours < 10 ? '0' : ''}${inHours}`
  const timerMinutes = `${inMinutes < 10 ? '0' : ''}${inMinutes}`
  const timerSeconds = `${inSeconds < 10 ? '0' : ''}${inSeconds}`

  if (!timeEnds && timeRemaining < 1) {
    setTimeEnds(true)
    setIsOpen(true)
    clearInterval(intervalId.current)
  }

  // paper evaluation mutation
  const examPaperMutation = useMutation({
    mutationFn: (answerSheet: ExamPaperPostType) => postPaperToVerifyExam(answerSheet).then(res => res.data),

    onSuccess: (data) => {
      localStorage.setItem(`lastEvaluation-${exam.id}-${profile.data?.studentId}`, JSON.stringify(data))
      navigate('evaluation')
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const form = useForm<ExamPaperPostType>({
    defaultValues: {
      exam_id: exam.id,
      duration: "0",
      mcq_answers: [], // in-case, if there is no mcq questions
      tf_answers: [] // in-case, if there is no true-false questions
    }
  })

  const onSubmit: SubmitHandler<ExamPaperPostType> = (data) => {
    // take only not-null mcq_answers
    const mcq_answers = new Array()
    data.mcq_answers.forEach(item => {
      if (item.mcq_ans != null)
        mcq_answers.push(item)
    })

    // take only not-null tf_answers
    const tf_answers = new Array()
    data.tf_answers.forEach(item => {
      if (item.tf_ans != null)
        tf_answers.push(item)
    })

    // update in main data
    data.mcq_answers = mcq_answers
    data.tf_answers = tf_answers
    data.duration = `${duration - timeRemaining}`

    // post for evaluation
    examPaperMutation.mutate(data)
  }

  if (examPaperMutation.isPending) return <BlurPageLoadingIndicator />
  else if (examPaperMutation.isError) return <span>Can't evaluate now, may be server Issue. Try Later.</span>

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <PageHead header={exam.title} subheader={timerHours + ':' + timerMinutes + ':' + timerSeconds} />

      <div className="px-2 flex flex-col space-y-8 mt-1">
        {exam.multiple_choice_questions.length > 0 && <MultipleChoiceQuestions form={form} MCQs={exam.multiple_choice_questions} />}

        {exam.true_false_questions.length > 0 && <TrueFalseQuestions form={form} tfqs={exam.true_false_questions} />}

        <Timer hours={timerHours} minutes={timerMinutes} seconds={timerSeconds} />

        <Modal isOpen={isOpen} onOpenChange={() => { }} placement="center" radius="sm" backdrop="blur" hideCloseButton disableAnimation>
          <ModalContent>
            {_ => (
              <>
                <ModalHeader>
                  <span className="w-full text-2xl text-center text-danger">Exam Time Ends</span>
                </ModalHeader>
                <ModalBody>
                  <Button type="button" radius="sm" color="warning" onClick={e => { e.preventDefault(); document.getElementById('evaluate')?.click(); }}>Close</Button>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>

        <SubmitButton id="evaluate" label="Evaluate" />

        <div className="h-11"></div>
      </div>
    </form>
  )
}

export default function ExamOnsite() {
  const { examId } = useParams()

  if (examId === undefined) return <span>Undefined exam id in parameter!</span>
  const examIdNumber = parseInt(examId)

  // let currentExam = useFetchedExams().data?.find(item => item.id === examIdNumber)

  // if currentExam founds as undefined then refetch
  // if (currentExam === undefined) {
  //   const { data, isSuccess } = useAFetchedExam(examIdNumber)
  //   currentExam = data

  //   if (isSuccess) {
  //     return (
  //       <section>
  //         <ExamRendered {...data} />
  //       </section>
  //     )
  //   }
  // }

  const { data, isLoading, isSuccess, isError } = useAFetchedExam(examIdNumber)

  if (isLoading) return <BlurPageLoadingIndicator />
  if (isError) return <span>Error Fetching, Server Issue!</span>

  return (
    <section>
      {isSuccess && <ExamRendered {...data} />}
    </section>
  )
}
