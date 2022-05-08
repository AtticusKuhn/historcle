import { useSel } from "../redux"
import { fmt } from "../utils"

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
            {guesses.map((guess, index) => <tr key={index} className="even:bg-primary-100 odd:bg-primary-200">
                <td>{index + 1}</td>
                <td><img width="100" height="100" src={guess.image} /></td>
                <td>{guess.dist === null ? "[a bug occured]" : guess.dist}</td>
                <td>{guess.time}</td>
                <td>{guess.hints.length > 0 ? [...new Set(guess.hints.map(fmt))].join("\n") : "[no hints]"}</td>
            </tr>)}
        </tbody>
    </table>
}
export default Guesses