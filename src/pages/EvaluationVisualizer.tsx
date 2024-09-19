import { useRef } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/react";

import { ExamPaperEvaluationType } from "../types";
import MCQCorrections from "../components/EvaluationVisualizer/MCQCorrections";
import TFCorrections from "../components/EvaluationVisualizer/TFCorrections";
import PageHead from "../components/PageHead";
import SimpleDataCard from "../components/SimpleDataCard";
import { useFetchedProfile } from "../api/calls";
import Error from "../components/Error";


export default function EvaluationVisualizer() {
    const { examId } = useParams()
    const evaluation = useRef<ExamPaperEvaluationType>()
    const profile = useFetchedProfile()

    const retrievedItem = localStorage.getItem(`lastEvaluation-${examId}-${profile.data?.studentId}`)
    if (retrievedItem != null)
        evaluation.current = JSON.parse(retrievedItem)
    else
        return <Error content="No evaluation found for this exam in local storage!" />

    if (evaluation.current === undefined)
        return <Error content="No evaluation found for this exam!" />

    // calculating total corrects
    let totalAnswered = 0
    let totalCorrects = 0

    // formatted duration
    let duration = parseInt(evaluation.current.duration)
    let inHours = parseInt(`${duration / 3600}`)
    let inMinutes = parseInt(`${duration % 3600 / 60}`)
    let inSeconds = parseInt(`${duration % 3600 % 60}`)
    let formatted_duration = `${inHours < 10 ? '0' : ''}${inHours}:${inMinutes < 10 ? '0' : ''}${inMinutes}:${inSeconds < 10 ? '0' : ''}${inSeconds}`

    evaluation.current.mcq_corrections.map(item => {
        if (item.given_ans.trim() === item.correct_ans.trim())
            totalCorrects++
        totalAnswered++
    })
    evaluation.current.tf_corrections.map(item => {
        if (item.given_ans === item.correct_ans)
            totalCorrects++
        totalAnswered++
    })

    return (
        <section>
            <PageHead header="Evaluation" subheader={profile.data?.studentId || ""} />

            <div className="px-2 flex flex-col space-y-10 my-2">
                <div className="flex flex-col space-y-2">
                    <div className="flex space-x-2">
                        <SimpleDataCard title="Marks Obtained" data={`${evaluation.current.marks}`} color="secondary" />
                        <SimpleDataCard title="Duration" data={formatted_duration} color="warning" />
                    </div>

                    <Card radius="none">
                        <CardBody>
                            <div className="w-full flex justify-around items-center">
                                <div className="flex flex-col items-center text-primary">
                                    <span className="text-2xl font-mono">{totalAnswered}</span>
                                    <span>Answered</span>
                                </div>
                                <div className="flex flex-col items-center text-success">
                                    <span className="text-2xl font-mono">{totalCorrects}</span>
                                    <span>Corrects</span>
                                </div>
                                <div className="flex flex-col items-center text-wrong">
                                    <span className="text-2xl font-mono">{totalAnswered - totalCorrects}</span>
                                    <span>Wrong</span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {evaluation.current.mcq_corrections.length > 0 && <MCQCorrections mcq_corrections={evaluation.current.mcq_corrections} />}
                {evaluation.current.tf_corrections.length > 0 && <TFCorrections tf_corrections={evaluation.current.tf_corrections} />}

                <p className="text-xs text-warning-300">
                    * Viewing latest evaluation of this exam. <br />
                    * We do not store evaluations on our central database.
                    Instead of, we use clients browsers local storage to temporarily save them.
                    Once these data are deleted from your local machine, not possible to retrieve again.
                </p>
            </div>
        </section>
    )
}
