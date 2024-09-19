import PageNav from "./PageNav"

export default function OneStepBackPageNav() {
    const NavItems = [
        { content: "Home", nav: "../" },
        { content: "Exam Center", nav: "../exams" },
        { content: "Dashboard", nav: "../dashboard" },
        { content: "Login", nav: "../login" },
        { content: "Logout", nav: "../logout" },
        { content: "Register", nav: "../register" }
    ]

    return <PageNav NavItems={NavItems} />
}
