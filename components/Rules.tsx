import { useState, useEffect } from "react";
import { useSel } from "../redux";

const Rules: React.FC<{}> = () => {
    const day = useSel(x => x.day)
    const [time, setTime] = useState("")
    useEffect(() => {
        const i = setInterval(() => {
            const now = new Date();
            const midnight = new Date();
            midnight.setHours(24);
            midnight.setMinutes(0);
            midnight.setSeconds(0);
            const date = new Date(0);
            date.setSeconds((midnight.getTime() - now.getTime()) / 1000);
            const timeString = date.toISOString().substr(11, 8);
            setTime(timeString);
        }, 1e3);
        return () => clearInterval(i)
    }, [])

    return <div className="text-center  pb-3xl">
        <p>
            I have thought of a secret historical figure. Can you guess him? For each guess I will tell you
            how many years apart the two figures were born, and how far away they were born.
        </p>
        <p>
            I know the birth dates and birth places of most people, but for people whose birth date
            or place is unknown, you cannot guess them (think like Charlemange).
        </p>
        <div> Today is day {day}. Next day begins in {time} </div>
    </div>
}
export default Rules