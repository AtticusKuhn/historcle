import Link from "next/link"
import React from "react"
import { reset, useDisp } from "../redux"
const base = process.env.NODE_ENV === "development" ? "/" : "/historcle/"

const FooterLink: React.FC<{ link: string }> = ({ children, link }) => <Link href={base + link}>
    <a className="my-auto text-secondary text-secondary" >
        {children}
    </a>
</Link>
const Footer: React.FC<{}> = () => {
    const disp = useDisp()
    return <div className="bg-primary-300 w-full p-sm flex place-content-around  rounded">
        <button
            className="bg-accent p-sm rounded"
            onClick={() => disp(reset())}
        >
            Reset game
        </button>
        <FooterLink link="">Play</FooterLink>
        <FooterLink link="explore">Play Previous</FooterLink>
        <FooterLink link="challenge">Challenge Your Friends</FooterLink>
    </div>
}
export default Footer;