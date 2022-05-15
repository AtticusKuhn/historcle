import Link from "next/link"
import React from "react"

const Footer: React.FC<{}> = () => {
    const base = process.env.NODE_ENV === "development" ? "/" : "/historcle/"
    return <div className="bg-primary-300 w-full p-lg flex place-content-around text-secondary rounded">
        <Link href={base}>
            <a>
                Play
            </a>
        </Link>
        <Link href={base + "explore"}>
            <a>
                Play  Previous
            </a>
        </Link>
        <Link href={base + "challenge"}>
            <a>
                Challenge Your Friends
            </a>
        </Link>
    </div>
}
export default Footer;