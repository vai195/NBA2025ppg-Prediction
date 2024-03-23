import Link from "next/link";
import PlayerInputForm from "./components/player-input";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
    return (
        <main className='flex flex-col justify-center items-center m-auto gap-5'>
            <Link
                className='bg-orange-400 rounded p-2 mt-10 flex items-center gap-2 text-xl'
                href='https://github.com/vai195/NBA2025ppg-Prediction'>
                <FaGithub />
                Source Code
            </Link>
            <PlayerInputForm />
            <ToastContainer />
        </main>
    );
}
