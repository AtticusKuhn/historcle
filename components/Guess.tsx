import { guess } from "../redux"
import { fmt } from "../utils"

const Guess: React.FC<{ index: number, guess: guess }> = ({ index, guess }) => (<>
    <tr key={index} className="even:bg-primary-100 odd:bg-primary-200 rounded">
        <td className="text-lg font-bold"><div className="text-center">{index + 1}</div></td>
        <td><img width="100" height="100" src={guess.image} /></td>
        <td>{guess.dist === null ? "[a bug occured]" : guess.dist}</td>
        <td>{guess.time === undefined ? "(unknown)" : guess.time}</td>
    <td>{(guess?.hints && guess.hints.length > 0) ? guess.hints.map(g => <a key = {g} href={g}>{fmt(g)} </a>, ) : "[no hints]"}</td>
    </tr>
</>)

export default Guess
