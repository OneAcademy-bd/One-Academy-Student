import { useEffect } from "react";
import Cookies from 'js-cookie'
import Error from "../components/Error";

export default function Logout() {
    useEffect(() => {
        Cookies.remove('oasat')
    }, [])

    return (
        <Error content="Logged Out" />
    )
}
