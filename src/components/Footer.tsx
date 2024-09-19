// @ts-nocheck

import { Link as RouterLink } from "react-router-dom"
import { Divider, Link as NextUILink, Tooltip } from "@nextui-org/react"
import { Copyright, ExternalLinkIcon as LinkIcon } from "lucide-react"

import facebook_icon from "../assets/facebook-icon.svg"
import youtube_icon from "../assets/youtube-icon.svg"
import linkedin_icon from "../assets/linkedin-icon.svg"
import telegram_icon from "../assets/telegram-icon.svg"

type SocialAccountType = {
    image: any,
    alt: string,
    size: number,
    link?: string,
    tooltip: string,
    placement?: string
}

const SocialAccounts: Array<SocialAccountType> = [
    {
        image: facebook_icon,
        alt: 'facebook-icon',
        size: 30,
        tooltip: 'Facebook',
        placement: 'left'
    },
    {
        image: youtube_icon,
        alt: 'youtube-icon',
        size: 37,
        tooltip: 'Youtube'
    },
    {
        image: linkedin_icon,
        alt: 'linkedin-icon',
        size: 30,
        tooltip: 'LinkedIn'
    },
    {
        image: telegram_icon,
        alt: 'telegram-icon',
        size: 30,
        tooltip: 'Telegram',
        placement: 'right'
    },
]

const useful_links = [
    { text: 'Login', link: 'login' },
    { text: 'Dashboard', link: 'dashboard' },
    { text: 'Exam Center', link: 'exams' },
]

export default function Footer() {
    return (
        <section className="px-5 py-10 text-gray-300 bg-gray-950">
            <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:justify-around">
                <div className="footer-subsection">
                    <h3>One Academy</h3>
                    <ul className="flex flex-col items-center">
                        {useful_links.map((item, idx) => <li key={idx} className="hover:text-sky-500 transition-colors duration-75"><NextUILink><RouterLink to={item.link}>{item.text}</RouterLink></NextUILink></li>)}
                    </ul>
                </div>

                <div className="footer-subsection">
                    <h3>Get Us On</h3>
                    <ul className="flex flex-row space-x-5 justify-center items-center">
                        {SocialAccounts.map((item, idx) =>
                            <li key={idx}>
                                <Tooltip content={item.tooltip} radius="sm" color="success" showArrow placement={item.placement || 'top'}>
                                    <img src={item.image} alt={item.alt} height={item.size} width={item.size} />
                                </Tooltip>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <p className="flex justify-center items-center space-x-1 text-sm text-center font-mono py-3">
                <Copyright size={20} />
                <span>One Academy 2024, all rights reserved.</span>
            </p>

            <Divider className="my-4" />

            <h6 className="flex justify-center items-center space-x-1 text-xs text-center">
                <span>developed & maintained by <NextUILink href="https://www.linkedin.com/in/sofiullah-iqbal-kiron-968a841b9/">Sofiullah Iqbal Kiron</NextUILink></span>
                <LinkIcon size={17} />
            </h6>
        </section>
    )
}
