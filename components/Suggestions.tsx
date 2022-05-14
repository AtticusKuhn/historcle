import { asyncGuess, suggestion, useDisp, useSel } from "../redux"

const Suggestion: React.FC<{ suggestion: suggestion }> = ({ suggestion }) => {
    const disp = useDisp()
    return <div className="bg-primary-200 flex flex-row rounded cursor-pointer hover:bg-primary-300" onClick={() => disp(asyncGuess(suggestion.name))}>
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
        {suggestions.map((s, i) => <Suggestion key={i} suggestion={s} />)}
    </div>
}
export default Suggestions