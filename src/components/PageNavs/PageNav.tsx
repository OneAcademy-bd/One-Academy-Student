import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import ThemeSwitcher from "../ThemeSwitcher"

type NavItem = {
    content: string,
    nav: string,
}

interface Props {
    NavItems: Array<NavItem>
}

export default function PageNav({ NavItems }: Props) {
    return (
        <>
            <input type="checkbox" id="menu-toggle" className="hidden" />
            <label htmlFor="menu-toggle" className="cursor-pointer">
                <Menu size={35} />
            </label>
            <label htmlFor="menu-toggle" id="menu-toggle-overlay"></label>

            <ul id="page-nav-content-wrapper">
                <li>
                    <label htmlFor="menu-toggle" className="cursor-pointer">
                        <X size={35} />
                    </label>
                </li>
                <li>
                    <ThemeSwitcher />
                </li>
                {NavItems.map((item, idx) =>
                    <li key={`page-nav-item-${idx}`} className="hover:text-success-800 hover:dark:text-warning-500 hover:tracking-widest transition-all duration-150 py-1">
                        <Link to={item.nav}>
                            {item.content}
                        </Link>
                    </li>
                )}
            </ul>
        </>
    )
}
