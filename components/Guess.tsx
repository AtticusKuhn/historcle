import { guess } from "../redux"
import { fmt } from "../utils"

const Guess: React.FC<{ index: number, guess: guess }> = ({ index, guess }) => (<>
    <tr key={index} className="even:bg-primary-100 odd:bg-primary-200 rounded">
        <td>{index + 1}</td>
        <td><img width="100" height="100" src={guess.image} /></td>
        <td>{guess.dist === null ? "[a bug occured]" : guess.dist}</td>
        <td>{Math.abs(guess.time)}</td>
        <td>{guess.hints.length > 0 ? [...new Set(guess.hints.map(fmt))].join(", ") : "[no hints]"}</td>
    </tr>
</>)

export default Guess