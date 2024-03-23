"use client";

import axios from "axios";
import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";

const PlayerInputForm = () => {
    const [playerName, setPlayerName] = useState<string>("");
    const [prediction, setPrediction] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                process.env.NEXT_PUBLIC_RENDER_URL + "/api/predict",
                {
                    features: playerName,
                }
            );
            if (response.data.ppgprediction == -1) {
                toast.error("Incorrent Player Name Try Again!", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            } else {
                toast.success("PPG Predicted 🏀⛹️‍♂️", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }

            console.log(response.data);
            setPrediction(Math.round(response.data.ppgprediction));
        } catch (error) {
            console.log("Error fetching prediction:", error);
            toast.error(
                "Error fetching prediction wait for API to connect (2min-5mins Max)",
                {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                }
            );
        }
    };
    return (
        <div className='flex flex-col max-w-[18rem] items-center justify-center p-5 gap-4 bg-orange-400 rounded-md shadow-lg'>
            <h1>NBA 2025 Player Points Per Game (PPG) Predictor 🏀</h1>
            <p>
                In this form type up your NBA player of choice who has played in
                the past three seasons (2022-2022, 2022-2023, 2023-2024). Make
                sure capitals are correct for the player name (Ex. LeBron James
                and LaMelo Ball)
            </p>

            <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                <h1>Type in your player:</h1>
                <input
                    className='border border-solid border-black rounded-sm'
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    type='text'
                />
                <button
                    className='border border-solid border-black p-[5px] bg-black text-white rounded-sm hover:rounded-lg hover:bg-orange-400 hover:text-black transition-all duration-500 focus:text-gray-500 hover:scale-105'
                    type='submit'>
                    Get Predicted PPG
                </button>
            </form>
            <div className='flex justify-center'>
                <h1 className='mt-5'>
                    {prediction && prediction != -1 && (
                        <span>{`${playerName}'s predicted points per game for the 2024-2025 season is ${prediction} points per game.`}</span>
                    )}
                    {prediction == -1 && (
                        <span>
                            {`The player ${playerName} is not present in
                                all seasons or does not exist.`}
                        </span>
                    )}
                </h1>
            </div>
        </div>
    );
};

export default PlayerInputForm;
