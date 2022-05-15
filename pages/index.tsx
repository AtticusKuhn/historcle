import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer";
import Guesses from "../components/Guesses";
import Input from "../components/Input";
import Rules from "../components/Rules";
import Suggestions from "../components/Suggestions";
import WonModal from "../components/WonModal";
import { InitialState, setDay, setPerson, setState } from "../redux";



const IndexPage = () => {

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
                <Footer />
            </div>
        </div>
    </>
};
export default IndexPage;