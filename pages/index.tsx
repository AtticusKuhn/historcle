import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Guesses from "../components/Guesses";
import Input from "../components/Input";
import Rules from "../components/Rules";
import Suggestions from "../components/Suggestions";
import WonModal from "../components/WonModal";
import { InitialState, setDay, setPerson, setState } from "../redux";



const IndexPage = () => {
    const disp = useDispatch();
    // const router = useRouter()
    useEffect(() => {

        const query = new URLSearchParams(window.location.search)
        const day = query.get("day")
        console.log("day", day)
        const person = query.get("person")
        if (day) {
            disp(setDay(Number(day)))
        }
        if (person && typeof person === "string") {
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

        <div className="bg-primary-100 w-full h-full min-h-screen">
            <div className="sm:w-7/12 w-10/12 mx-auto">
                <h1 className="font-bold text-4xl mx-auto p-lg text-center">Historcle</h1>
                <Rules />
                <Guesses />
                <div className="w-full mx-auto mt-3xl">
                    <Input />
                    <Suggestions />
                </div>
                <WonModal />
            </div>
        </div>
    </>
};
export default IndexPage;