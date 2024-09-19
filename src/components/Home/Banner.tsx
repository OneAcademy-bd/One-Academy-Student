import banner from "../../assets/banner.png"


export default function Banner() {
    return (
        <section className="px-1 py-4">
            <img src={banner} alt="One Academy Banner" className="rounded-sm" />
        </section>
    )
}
