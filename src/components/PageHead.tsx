import OneStepBackPageNav from "./PageNavs/OneStepBackPageNav"
// import logo from "../assets/white-logo2.png"
// import { Link } from "react-router-dom"


interface Props {
    header: string,
    subheader: string
}

export default function PageHead({ header, subheader }: Props) {
    return (
        <section className="px-3 py-4 bg-primary-300 border-b-2 border-secondary-200 flex flex-row justify-between items-center space-x-1">
            {/* <Link to="/">
                <img src={logo} height={70} width={70} alt="One Academy Logo" loading="lazy" />
            </Link> */}

            {/* <div></div> */}

            <div>
                <h1 className="text-left">{header}</h1>
                <h3 className="text-left">{subheader}</h3>
            </div>

            <OneStepBackPageNav />
        </section>
    )
}
