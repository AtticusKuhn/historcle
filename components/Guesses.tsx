import React from "react"
import { useSel } from "../redux"
import { fmt } from "../utils"
import Guess from "./Guess"

const Guesses: React.FC<{}> = () => {
    const guesses = useSel((state) => state.guesses)
    return <table className="w-full mx-auto text-sm text-left text-primary-500 dark:text-primary-400" id="table">
        <thead className="w-full text-sm text-left text-primary-500 dark:text-primary-400">
            <tr>
                <th>Guess Number</th>
                <th>Guess Image</th>
                <th>Distance (km)</th>
                <th>Time (years)</th>
                <th>Hint</th>
            </tr>
        </thead>
        <tbody>
            {guesses.map((guess, index) => <Guess key={index} guess={guess} index={index} />)}
        </tbody>
    </table>
}
export default Guesses