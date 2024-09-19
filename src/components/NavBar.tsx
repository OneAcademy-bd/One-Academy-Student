import { useState } from "react";

import ThemeSwitcher from "./ThemeSwitcher";
import { cn } from "../utils";
import { Menu, MenuItem, HoveredLink } from "../aceternity-ui/NavbarMenu";

const nav_items = [
    "Academic",
    "Admission",
    "Menu",
]

export default function NavBar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null)

    return (
        <div className={cn("fixed top-0 inset-x-0 z-50", className)}>
            <Menu setActive={setActive}>
                <MenuItem item={nav_items[0]} active={active} setActive={setActive}>
                    <div className="menu-items">
                        <HoveredLink to="contents/class-9/">Class 9</HoveredLink>
                        <HoveredLink to="">Class 10</HoveredLink>
                        <HoveredLink to="">Class 11-12</HoveredLink>
                    </div>
                </MenuItem>
                
                <MenuItem item={nav_items[1]} active={active} setActive={setActive}>
                    <div className="menu-items">
                        <HoveredLink to="">Varsity</HoveredLink>
                        <HoveredLink to="">Medical</HoveredLink>
                        <HoveredLink to="">Engineering</HoveredLink>
                    </div>
                </MenuItem>

                <MenuItem item={nav_items[2]} active={active} setActive={setActive}>
                    <div className="menu-items">
                        <HoveredLink to="exams">Exam Center</HoveredLink>
                        <HoveredLink to="dashboard">Dashboard</HoveredLink>
                        <HoveredLink to="login">Login</HoveredLink>
                        <HoveredLink to="logout">Logout</HoveredLink>
                        <HoveredLink to="register">Register</HoveredLink>
                    </div>
                </MenuItem>

                <ThemeSwitcher />
            </Menu>
        </div>
    )
}