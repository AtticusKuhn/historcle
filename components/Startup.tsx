import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDay, setPerson, InitialState, setState } from "../redux";

const Startup: React.FC<{}> = ({ children }) => {
    const disp = useDispatch();
    useEffect(() => {

        const query = new URLSearchParams(window.location.search)
        const day = query.get("day")
        console.log("day", day)
        const person = query.get("person")
        if (day) {
            disp(setDay(Number(day)))
        }
        if (person && typeof person === "string") {
            console.log(`setting person`)
            disp(setPerson(atob(person)))
        }
        const storage: InitialState = JSON.parse(localStorage.getItem("reduxState"))

        if (storage) {
            storage.default = false;
            disp(setState(storage))
        } else {
            disp(setState(null))
        }

    }, [])
    return <>
        {children}
    </>
}
export default Startup