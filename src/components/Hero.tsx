// framer-motion
import { motion } from "framer-motion";

// aceternity
import { Sparkles } from "../aceternity-ui/Sparkles";
import { TypewriterEffectSmooth } from "../aceternity-ui/TypewriterEffect";

// local
import Section from "./Section";

const second_heading_words = [
    { text: 'Taking' },
    { text: 'your' },
    { text: 'academic' },
    { text: 'plans' },
    { text: 'to' },
    { text: 'the' },
    { text: 'next' },
    { text: 'level.', className: 'text-blue-500 dark:text-sky-500 font-bold' },
]

export default function Hero() {
    return (
        <Section>
            <div className="absolute inset-0">
                <Sparkles
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#87CEEB"
                />
            </div>
            <div className="flex flex-col space-y-3 md:space-y-7 bg-neutral-500/0 backdrop-blur-sm px-5 py-6 rounded">
                <motion.h1 initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, duration: 0.3 }} className="text-wrap text-green-700 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                    One Academy
                </motion.h1>
                {/* <h1 className="text-wrap text-green-700 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                    One Academy
                </h1> */}
                {/* <h3 className="text-sm">Taking your academic plans to the next level.</h3> */}
                <TypewriterEffectSmooth words={second_heading_words} />
            </div>
        </Section>
    )
}
