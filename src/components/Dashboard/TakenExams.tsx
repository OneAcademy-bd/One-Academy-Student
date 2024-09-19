import { useState } from "react"
import clsx from "clsx"
import { Card, CardBody, CardHeader, Chip, Select, SelectItem, Input, Button } from "@nextui-org/react"

import { useFetchedTakenExams } from "../../api/calls"
import BlurPageLoadingIndicator from "../BlurPageLoadingIndicator"
import { TakenExamType } from "../../types"
import SimpleDataCard from "../SimpleDataCard"

function TakenExamCard(exam: TakenExamType) {
  return (
    <Card radius="sm">
      <CardHeader><h3>{exam.exam}</h3></CardHeader>
      <CardBody className="flex flex-row flex-wrap gap-2">
        <Chip radius="sm">Duration: {exam.duration}</Chip>
        <Chip radius="sm">Marks: {exam.marks}</Chip>
        <Chip radius="sm" className={clsx(exam.status === "fail" && "text-wrong" || "text-green-400", "capitalize")}>Status: {exam.status}</Chip>
        <Chip radius="sm">Total attempts: {exam.attempts}</Chip>
        <Chip radius="sm">Last attempt at: {exam.last_attempted_at}</Chip>
      </CardBody>
    </Card >
  )
}

export default function TakenExams() {
  const [status, setStatus] = useState<string>('all')
  const [marks, setMarks] = useState<string>("0")
  const [greaterThan, setGreaterThan] = useState<boolean>(true)

  const { isLoading, isSuccess, data, isError } = useFetchedTakenExams()

  let passCount: any = 0
  let failCount: any = 0
  let takenExams: Array<TakenExamType> = []

  if (isError) {
    passCount = "Can't Count."
    failCount = "Can't Count."
  }

  if (isSuccess) {
    data.forEach(item => {
      if (item.status === "pass") passCount++
      else if (item.status === "fail") failCount++
    })

    // filter by status
    switch (status) {
      case 'pass':
        takenExams = data.filter(item => item.status === 'pass')
        break
      case 'fail':
        takenExams = data.filter(item => item.status === 'fail')
        break
      default:
        takenExams = data
        break
    }

    // filter by marks
    takenExams = greaterThan ? takenExams.filter(item => item.marks >= parseFloat(marks)) : takenExams.filter(item => item.marks <= parseFloat(marks))

    if (marks === "") setMarks("0")
  }

  if (isLoading) return <BlurPageLoadingIndicator />

  return (
    <div className="dashboard-tab space-y-8">

      <div>
        <h3 className="mb-1.5">Overview</h3>
        <div className="flex flex-row space-x-1.5">
          <SimpleDataCard title="Total Participation" data={`${data?.length}`} color="primary" />
          <SimpleDataCard title="Passed In" data={`${passCount}`} color="success" />
          <SimpleDataCard title="Failed In" data={`${failCount}`} color="danger" />
        </div>
      </div>

      <div>
        <h3 className="mb-1.5">In Details</h3>
        <div className="w-full flex flex-col space-y-2.5">
          {/* filter by status */}
          <Select label="Status" selectedKeys={[status]} onChange={e => setStatus(e.target.value)} radius="sm" size="sm" color={status === 'pass' ? 'success' : status === 'fail' ? 'danger' : 'default'}>
            <SelectItem key="all">All</SelectItem>
            <SelectItem key="pass" className="text-success">Pass</SelectItem>
            <SelectItem key="fail" className="text-danger">Fail</SelectItem>
          </Select>
          {/* filter by marks */}
          <div className="flex flex-row items-center space-x-1">
            <Button size="lg" radius="sm" onClick={() => setGreaterThan(!greaterThan)} className="text-wrap">
              {greaterThan && "Greater Than" || "Less Than"} or Equal
            </Button>
            <Input type="number" label="Marks" value={marks} onValueChange={setMarks} radius="sm" size="sm" />
          </div>

          {takenExams.map((item, idx) => <TakenExamCard key={idx} {...item} />)}
        </div>
      </div>
    </div>
  )
}
