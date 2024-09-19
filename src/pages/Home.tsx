import NavBar from "../components/NavBar"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
import TeachersCount from "../components/Home/TeachersCount"
// import TeachersPanel from "../components/Home/TeachersPanel"
// import Banner from "../components/Home/Banner"


export default function Home() {
    return (
        <section className="flex flex-col w-full">
            <NavBar />
            <Hero />
            <TeachersCount />
            {/* <Banner /> */}
            {/* <TeachersPanel /> */}
            <Footer />
        </section>
    )
}
