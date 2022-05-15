import { useRouter } from "next/router"
import { people } from "../people"
import { setDay, useDisp } from "../redux"



const Explore: React.FC<{}> = () => {
    const disp = useDisp()
    const router = useRouter()
    const base = process.env.NODE_ENV === "development" ? "/" : "/historcle/"

    return <div className="bg-primary-100">
        <div>
            Play previous games of the Historcle
        </div>
        <div className="m-3xl inline-grid md:grid-cols-10  sm:grid-cols-6 grid-cols-4 gap-5 justify-between justify-around cursor-pointer	">
            {people.map((p, i) => <div onClick={() => {
                disp(setDay(i));
                router.push(`${base}?day=${i}`)
            }} className="rounded bg-primary-200  text-center rounded py-sm px-lg" key={i}>
                <div className="text-center">Play Day {i}</div>
            </div>)}
        </div>
    </div>
}
export default Explore