import { useState } from "react"
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Chip, Input, Tab, Tabs } from "@nextui-org/react"
import { Link as RouterLink } from "react-router-dom"
import { Search as SearchIcon, ArrowUp as NewestFirstIcon, ArrowDown as OldestFirstIcon } from "lucide-react"

import { useFetchedExams } from "../api/calls"
import { ExamType } from "../types"
import BlurPageLoadingIndicator from "../components/BlurPageLoadingIndicator"
import PageHead from "../components/PageHead"
import Error from "../components/Error"


function ExamCard(exam: ExamType) {
  return (
    <Card radius="sm" className="w-full">
      <CardHeader className="flex space-x-1 justify-between items-start">
        <h4 className="text-left">{exam.title}</h4>
        {exam.already_taken && <Chip size="sm" radius="lg" color="success" variant="dot">participated</Chip>}
      </CardHeader>
      <CardBody className="flex flex-row flex-wrap justify-start items-center gap-1">
        {exam.subjects.length < 1 && <Chip size="sm" radius="sm" variant="flat">subjects not specified</Chip>}
        {exam.subjects.map((subject, idx) => <Chip key={idx} size="sm" radius="sm" variant="flat" >{subject.subject}</Chip>)}
      </CardBody>
      <CardFooter>
        <RouterLink to={`./${exam.id}`}>
          <Button size="sm" radius="sm" color="primary" disableAnimation>
            Take Exam
          </Button>
        </RouterLink>
      </CardFooter>
    </Card>
  )
}

export default function ExamsList() {
  const [currentTab, setCurrentTab] = useState<"all" | "participated" | "not-participated">("all")
  const [title, setTitle] = useState<string>("")
  const [newestFirst, setNewestFirst] = useState<boolean | undefined>(undefined)

  const { isLoading, isSuccess, data, isError } = useFetchedExams()
  let exams: Array<ExamType> = []

  if (isLoading) return <BlurPageLoadingIndicator />
  if (isError) return <Error content="Error, try login or refresh." />

  if (isSuccess) {
    // filter by already_taken flag, participated or not, tab filter
    switch (currentTab) {
      case "participated":
        exams = data.filter(item => item.already_taken)
        break
      case "not-participated":
        exams = data.filter(item => !item.already_taken)
        break
      default:
        exams = data
        break
    }

    // filter to match search by title
    exams = exams.filter(item => item.title.toLocaleLowerCase().includes(title.toLowerCase()))

    // sort: newestFirst or not
    switch (newestFirst) {
      case true:
        exams.sort((a, b) => b.id - a.id)
        break
      case false:
        exams.sort((a, b) => a.id - b.id)
        break
      default:
        break
    }
  }

  const handleNewestFirst = (value: boolean) => setNewestFirst(newestFirst === value ? undefined : value)

  return (
    <section className="pb-4">
      <PageHead header="Exam Center" subheader="One Academy" />

      {/* actions */}
      <div className="px-2 flex flex-col space-y-2 mt-1 mb-8">
        {/* filter by participated */}
        <Tabs aria-label="Exam-Listing-Options" placement="top" radius="sm" color="primary" fullWidth={true} onSelectionChange={key => setCurrentTab(key.toString() === "participated" ? "participated" : key.toString() === "not-participated" ? "not-participated" : "all")}>
          <Tab key="all" title="All"></Tab>
          <Tab key="participated" title="Participated"></Tab>
          <Tab key="not-participated" title="Not Participated"></Tab>
        </Tabs>

        {/* sort by newest first or not, switch or toggle-button or awesome switch */}
        <ButtonGroup radius="sm" size="md" disableAnimation className="w-full">
          <Button onClick={() => handleNewestFirst(true)} color={newestFirst === true ? 'primary' : 'default'} endContent={<NewestFirstIcon size={25} />} className="w-full">
            Newest First
          </Button>
          <Button onClick={() => handleNewestFirst(false)} color={newestFirst === false ? 'primary' : 'default'} endContent={<OldestFirstIcon size={25} />} className="w-full">
            Oldest First
          </Button>
        </ButtonGroup>

        {/* search by title */}
        <Input type="text" radius="sm" placeholder="exam title" isClearable onChange={e => setTitle(e.target.value.trim())} onClear={() => setTitle("")} startContent={<SearchIcon />} />
      </div>

      {/* exams */}
      <div className="px-2 flex flex-col space-y-2.5">
        {exams.map((item, idx) => <ExamCard key={idx} {...item} />)}
      </div>
    </section>
  )
}
