import { Card, CardBody, Progress } from "@nextui-org/react"
import { CalendarFold, Edit3, User, Mail, Phone, University, Signature as ID, Percent } from "lucide-react"
import { IoMale as MaleIcon, IoFemale as FemaleIcon, IoMaleFemale as OthersIcon } from "react-icons/io5"
import ProfileDataCardViewMode from "./ProfileDataCardViewMode"
import { useFetchedProfile } from "../../api/calls"
import ProfileActionButton from "./ProfileActionButton"


interface Props {
    setIsEditMode: any
}

export default function ProfileViewMode({ setIsEditMode }: Props) {
    const { isSuccess, data, isError } = useFetchedProfile()

    const dataList = ['first_name', 'last_name', 'username', 'email', 'phone', 'gender', 'academy']
    let dataFilledCount = 0
    if (isSuccess) {
        data.user.first_name && dataFilledCount++
        data.user.last_name && dataFilledCount++
        data.user.username && dataFilledCount++
        data.user.email && dataFilledCount++
        data.phone && dataFilledCount++
        data.gender && dataFilledCount++
        data.academy && dataFilledCount++
    }
    const profileCompleteness = parseInt(`${dataFilledCount * 100 / dataList.length}`)

    if (isError) return <p>Profile Data Fetching Problem!</p>

    return (
        <div className="dashboard-tab">
            <ProfileDataCardViewMode title="Student ID" data={data?.studentId} icon={<ID size={20} />} />
            <ProfileDataCardViewMode title="Username" data={data?.user.username} icon={<User size={20} />} />
            <ProfileDataCardViewMode title="Email" data={data?.user.email} icon={<Mail size={20} />} />
            <ProfileDataCardViewMode title="Joined" data={data?.user.date_joined} icon={<CalendarFold size={20} />} />
            <ProfileDataCardViewMode title="Phone" data={data?.phone} icon={<Phone size={20} />} />
            <ProfileDataCardViewMode title="Gender" data={data?.gender} icon={data?.gender === 'male' ? <MaleIcon size={20} /> : data?.gender === 'female' ? <FemaleIcon size={20} /> : <OthersIcon size={20} />} capitalize={true} />
            <ProfileDataCardViewMode title="Academy" data={data?.academy} icon={<University size={20} />} capitalize={true} /> {/*what if academy name is so long*/}

            <Card radius="none">
                <CardBody className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                        <span>Profile Completeness</span>
                        <div className="flex items-center space-x-0.5">
                            <span>{profileCompleteness}</span>
                            <Percent size={15} />
                        </div>
                    </div>
                    <Progress radius="none" color={profileCompleteness > 79 ? 'success' : profileCompleteness > 59 ? 'warning' : 'danger'} aria-label="profile-completeness" value={profileCompleteness} />
                </CardBody>
            </Card>

            <ProfileActionButton type="button" content="Update Profile" icon={<Edit3 size={20} />} action={() => setIsEditMode(true)} />
        </div>
    )
}
