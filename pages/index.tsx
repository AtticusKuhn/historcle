import React, { useEffect } from "react";
import Rules from "../components/Rules"
import WonModal from "../components/WonModal"
import Guesses from "../components/Guesses"
import Input from "../components/Input"
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setDay, setPerson } from "../redux";
import Head from "next/head";



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
    }, [])
    return <>

        <div className="bg-primary-100 w-full h-full min-h-screen">
            <div className="sm:w-7/12 w-10/12 mx-auto">
                <h1 className="font-bold text-4xl mx-auto p-lg text-center">Historcle</h1>
                <Rules />
                <Guesses />
                <div className="w-full mx-auto mt-3xl">
                    <Input />
                </div>
                <WonModal />
            </div>
        </div>
    </>
};
export default IndexPage;