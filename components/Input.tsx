import React, { useRef, useState } from "react"
import { asyncGuess, asyncSuggestions, dismissError, downSelect, enterGuess, setCurrentGuess, upSelect, useDisp, useSel } from "../redux"
import ShowError from "./Error"

const Input: React.FC<{}> = () => {
    const waiting = useSel(x => x.waiting)
    const won = useSel(x => x.won)
    const currentGuess = useSel(x => x.currentGuess)

    const [previousTime, setPreviousTime] = useState<number>(new Date().getTime())
    const timeRef = useRef(previousTime);
    timeRef.current = previousTime;
    const threshold = 500
    const canReq = (): boolean => new Date().getTime() - timeRef.current > threshold
    const dispatch = useDisp()
    const oninput = async (key: React.KeyboardEvent<HTMLInputElement>) => {
        const t = (key.target as HTMLInputElement);
        dispatch(setCurrentGuess(t.value))
        console.log(key.key, "key.key")
        if (key.key === "Enter") {
            console.log("enter")
            dispatch(enterGuess())
        } else if (key.key === "ArrowUp") {
            dispatch(upSelect())
        } else if (key.key === "ArrowDown") {
            dispatch(downSelect())
        } else if (key.key === "Escape") {
            key.preventDefault()
            dispatch(dismissError())
        } else if ((canReq())) {
            setPreviousTime(new Date().getTime())
            dispatch(asyncSuggestions())
        } else {
            setTimeout(() => {
                if ((canReq())) {
                    setPreviousTime(new Date().getTime())
                    dispatch(asyncSuggestions())
                }
            }, threshold)
        }
    }
    return <>
        <div>Put your guess here: {waiting ? "waiting..." : ""}</div>
        <input
            readOnly={waiting || won}
            onKeyUp={oninput}
            defaultValue={currentGuess}
            placeholder="e.g. Isaac Newton"
            className="rounded-lg w-full h-7/12 border-primary-300 focus:border-primary-400 bg-primary-200 p-sm m-base mx-auto"
        />
        <ShowError />
    </>

}
export default Input