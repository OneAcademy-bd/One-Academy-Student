import CountUp from "react-countup"
import VisibilitySensor from "react-visibility-sensor"
import { Plus as PlusIcon } from "lucide-react"


function NewCountUp() {
    return (
        <div className="flex items-center">
            <CountUp end={10} delay={2} duration={2} useEasing={true} className="text-6xl font-mono" />
            <PlusIcon size={40} />
        </div>
    )
}


export default function TeachersCount() {
    return (
        <section className="h-[10rem] flex flex-col justify-center items-center">
            <VisibilitySensor>
                <NewCountUp />
            </VisibilitySensor>
            <h2>Teaching Professionals</h2>
        </section>
    )
}
