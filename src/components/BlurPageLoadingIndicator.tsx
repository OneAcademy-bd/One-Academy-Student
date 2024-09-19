import { LineWave } from "react-loader-spinner"

export default function BlurPageLoadingIndicator() {
    return (
        <section className="fixed inset-0 flex flex-col justify-center items-center z-10 backdrop-blur-sm cursor-not-allowed touch-none">
            <LineWave />
        </section>
    )
}
