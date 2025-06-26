import { asyncGuess, suggestion, useDisp, useSel } from "../redux"

const Suggestion: React.FC<{ suggestion: suggestion, index: number }> = ({ suggestion, index }) => {
    const disp = useDisp()
    const waiting = useSel(x => x.waiting);
    const won = useSel(x => x.won);
    const sel = useSel(x => x.selectedSearch);

    const disabled = !(waiting || won)
    return <div className={`${index === sel ? "bg-primary-300" : "bg-primary-200"} flex flex-row rounded ${disabled && "cursor-pointer hover:bg-primary-300"}`} onClick={() => disabled && disp(asyncGuess(suggestion.pageid))}>
        <div className="w-5xl h-full">
            {suggestion.image && <img height="100" width="100" src={suggestion.image} />}
        </div>
        <div className="flex flex-col px-lg">
            <h1 className="text-lg font-bold">{suggestion.name}</h1>
            <div className="text-sm">{suggestion.description}</div>
        </div>
    </div>
}

const Suggestions: React.FC<{}> = () => {
    const suggestions = useSel(x => x.suggestions)
    return <div className="flex flex-col">
        {suggestions.map((s, i) => <Suggestion index={i} key={s.name} suggestion={s} />)}
    </div>
}
export default Suggestions
