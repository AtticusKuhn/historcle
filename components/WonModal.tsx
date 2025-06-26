import { useDisp, useSel, closeModal } from "../redux";
import { fmt } from "../utils"
const WonModal: React.FC<{}> = () => {
    const dispatch = useDisp()
    const open = useSel(x => x.modalOpen);
    const person = useSel(x => x.secretPerson);
    const guesses = useSel(x => x.guesses);
    const day = useSel(x => x.day);
    if(!open)
        return <></>

    return <div id="defaultModal" aria-hidden="true" className={`${!open && "hidden"} bg-primary-100 translate-x-1/4 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}>
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative bg-primary-100 rounded-lg shadow ">
                <div className="flex justify-between items-start p-4 rounded-t border-b">
                    <h3 className="text-xl font-semibold text-gray-900 ">
                        You Won!
                    </h3>
                    <button onClick={() => dispatch(closeModal())} className="text-primary-400 bg-transparent hover:bg-parimary-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd">
                            </path>
                        </svg>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Congradulations! You beat the Historcle. That's an impressive achievement considering I purposefully designed this game to be very hard.
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        The person was <a className="text-secondary p-tiny rounded" href={person}>{fmt(person).replace(/_/g, " ")}</a>
                    </p>
                    <div className="font-bold">your results:</div>
                    <div>Historcle day {day}. Beat in {guesses.length + 1} guesses</div>
                    <table>
                        <thead >
                            <tr>
                                <th>g</th>
                                <th>bd</th>
                                <th>bp</th>
                                <th>h</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guesses.map((guess, index) => <tr key={index} >
                                <td>{index + 1}</td>
                                <td>{guess.dist > 1000 ? "🟥" : guess.dist > 500 ? "🟨" : "🟩"}</td>
                                <td>{guess.time > 300 ? "🟥" : guess.time > 100 ? "🟨" : "🟩"}</td>
                                <td>{guess.hints.length < 3 ? "🟥" : guess.hints.length < 5 ? "🟨" : "🟩"}</td>

                            </tr>)}
                            <tr>
                                <td>{guesses.length + 1}</td>
                                <td>🟦</td>
                                <td>🟦</td>
                                <td>🟦</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <button onClick={() => {
                        navigator.clipboard.writeText(`Historcle day ${day}. Beat in ${guesses.length + 1} guesses\n`
                            + guesses.map((guess, index) => `${index + 1}  ${guess.dist > 1000 ? "🟥" : guess.dist > 500 ? "🟨" : "🟩"}  ${guess.time > 300 ? "🟥" : guess.time > 100 ? "🟨" : "🟩"} ${guess.hints.length < 3 ? "🟥" : guess.hints.length < 5 ? "🟨" : "🟩"}`)
                                .join("\n")
                            + `\n${guesses.length + 1} 🟦 🟦 🟦`
                            + "\n play it at: https://atticuskuhn.github.io/historcle/");
                    }} className="text-white bg-accent hover:bg-accent-hover rounded p-sm">
                        Copy results
                    </button>
                    <button onClick={() => dispatch(closeModal())} className="text-white bg-secondary rounded p-sm">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div >;
};
export default WonModal