import Link from "next/link";
import React, { useState, useRef } from "react";
import ShowError from "../components/Error";
import { asyncSearch, asyncSuggestions, setCurrentGuess, useDisp, useSel } from "../redux";

const Challenge: React.FC<{}> = () => {
    const base = process.env.NODE_ENV === "development" ? "/" : "/historcle/"

    const searches = useSel(x => x.searches)
    const [url, setUrl] = useState<string | null>(null)
    const [previousTime, setPreviousTime] = useState<number>(new Date().getTime())
    const timeRef = useRef(previousTime);
    timeRef.current = previousTime;
    const threshold = 3e3
    const canReq = (): boolean => new Date().getTime() - timeRef.current > threshold
    const dispatch = useDisp()
    const oninput = async (key: React.KeyboardEvent<HTMLInputElement>) => {
        const t = (key.target as HTMLInputElement);

        dispatch(setCurrentGuess(t.value))
        if (t.value !== "" && (canReq())) {
            setPreviousTime(new Date().getTime())
            dispatch(asyncSearch(t.value))
        } else {
            setTimeout(() => {
                if (t.value !== "" && (canReq())) {
                    setPreviousTime(new Date().getTime())
                    dispatch(asyncSearch(t.value))
                }
            }, threshold)
        }
    }
    return <div className="bg-primary-100 w-full h-full min-h-screen">
        <div className="sm:w-7/12 w-10/12 mx-auto">
            <div className="bg-primary-100 w-full h-full mx-auto content-center 	">
                <h1 className="text-center text-3xl">Challenge Your Friends</h1>
                <div className="w-full mx-auto mt-3xl justify-center place-items-center ">
                    <div className="mx-auto flex justify-center items-center">Type the name of a person, and you can challenge your friends to a custom game of Historcle.</div>
                    <input
                        onKeyUp={oninput}

                        placeholder="e.g. Walter Raleigh"
                        className="content-center rounded-lg w-7/12 h-7/12 border-primary-300 bg-primary-200 p-sm m-3xl flex justify-center items-center mx-auto"
                    />
                </div>
            </div>
            {url && <div>
                <div>Send your friends this url!</div>
                <Link href={base + `?person=${btoa(url)}`} target="_blank">
                    <a target="_blank">
                        {base + `?person=${btoa(url)}`}
                    </a>
                </Link>
            </div>}
            <ShowError />
            {searches.map((s, i) => <div key={i} className="bg-primary-200 flex flex-row rounded cursor-pointer hover:bg-primary-300 my-sm" onClick={() => setUrl(s.person)}>
                <div className="w-5xl h-full">
                    {s.image && <img height="100" width="100" src={s.image} />}
                </div>
                <div className="flex flex-col px-lg">
                    <h1 className="text-lg font-bold">{s.name}</h1>
                </div>
            </div>)}
            {searches.length === 0 && <div>No results</div>}
        </div>
    </div>
}
export default Challenge;