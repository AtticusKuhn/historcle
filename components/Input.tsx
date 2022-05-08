import { asyncGuess, dismissError, useDisp, useSel } from "../redux"

const Input: React.FC<{}> = () => {
    const waiting = useSel(x => x.waiting)
    const won = useSel(x => x.won)
    const person = useSel(x => x.secretPerson)
    const error = useSel(x => x.error)

    const dispatch = useDisp()
    const oninput = (key: React.KeyboardEvent<HTMLInputElement>) => {
        if (key.key === "Enter") {
            const a = dispatch(asyncGuess({
                guess: (key.target as HTMLInputElement).value,
                secretPerson: person
            }))
        }
    }
    return <>
        <div>Put your guess here: {waiting ? "waiting..." : ""}</div>
        <input
            disabled={waiting || won}
            onKeyUp={oninput}
            placeholder="e.g. Isaac Newton"
            className="rounded-lg w-full h-7/12 border-primary-300 bg-primary-200 p-sm m-base mx-auto"
        />
        <div className={`${!error && "hidden"} rounded font-bold bg-accent p-lg`}>
            {error ? error : ""}
            <button onClick={() => dispatch(dismissError())} className="text-primary-400 bg-transparent hover:bg-parimary-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto" data-modal-toggle="defaultModal">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd">
                    </path>
                </svg>
            </button>
        </div>
    </>

}
export default Input