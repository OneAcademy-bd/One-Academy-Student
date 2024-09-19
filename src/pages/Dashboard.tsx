import { useState } from "react"
import { Tabs, Tab } from "@nextui-org/react"

import { useFetchedProfile } from "../api/calls"
import Profile from "../components/Dashboard/Profile"
import TakenExams from "../components/Dashboard/TakenExams"
import BlurPageLoadingIndicator from "../components/BlurPageLoadingIndicator"
import PageHead from "../components/PageHead"
import Error from "../components/Error"


export default function Dashboard() {
  const [currentTab, setCurrentTab] = useState<string>("profile")

  const { isLoading, data, isError } = useFetchedProfile()

  const fullName = (data?.user.first_name + ' ' + data?.user.last_name).trim()

  if (isLoading) return <BlurPageLoadingIndicator />
  if (isError) return <Error content="Try refresh the page or Login." />

  return (
    <div className="flex flex-col space-y-2 pb-4">
      <PageHead header="Student Dashboard" subheader={fullName || "name not set"} />

      {/* navigation tabs */}
      <div className="flex flex-row justify-center w-full">
        <Tabs aria-label="Options" placement="top" radius="sm" color="primary" fullWidth={true} onSelectionChange={key => setCurrentTab(key.toString())}>
          <Tab key='profile' title="Profile">
          </Tab>
          <Tab key='taken-exams' title="Taken Exams">
          </Tab>
        </Tabs>
      </div>

      <div className="w-full flex justify-center">
        {currentTab === "profile" && <Profile />}
        {currentTab === "taken-exams" && <TakenExams />}
      </div>
    </div>
  )
}
