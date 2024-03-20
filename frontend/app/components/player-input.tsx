"use client";

import axios from "axios";
import React, { useState } from "react";

const PlayerInputForm = () => {
    const [playerName, setPlayerName] = useState<string>("");
    const [prediction, setPrediction] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/api/predict",
                {
                    features: playerName,
                }
            );

            console.log(response.data);
            setPrediction(response.data.ppgprediction);
        } catch (error) {
            console.log("Error fetching prediction:", error);
        }
    };
    return (
        <>
            <div className='flex'>
                <form onSubmit={handleSubmit}>
                    <h1>Player Input Form</h1>
                    <input
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        type='text'
                    />
                    <button
                        className='border border-solid border-black p-2'
                        type='submit'>
                        Get Predicted PPG
                    </button>
                </form>
                <div>
                    <h1>{prediction}</h1>
                </div>
            </div>
        </>
    );
};

export default PlayerInputForm;
