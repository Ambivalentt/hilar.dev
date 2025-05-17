import heroMain from '../assets/heroMain.svg'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const JoinSection = () => {
    const [displayedText, setDisplayedText] = useState("");
    const text = `Bee part of a growing platform where teams manage their work smarter, not harder. Collaborate, plan, and track your progress like never before`

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(index));
            index++;
            if (index === text.length) clearInterval(interval);
        }, 20);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <section className=" mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
                <h2 className="text-4xl font-bold mb-4 leading-tight">
                    Join us to build the next generation of project management
                </h2>
                <p className="whitespace-pre-wrap text-lg h-22 text-gray-300 mb-6 typewriter ">
                    {displayedText}
                </p>
                <Link to={"/register"}>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition">
                        Join us now
                    </button>
                </Link>
            </div>

            {/* Imagen grande */}
            <div className="flex justify-center">
                <img
                    src={heroMain} // Usa tu imagen grande aquí o reemplázala con otra
                    alt="Teamwork Illustration"
                    className="w-full max-w-md md:max-w-lg rounded-xl shadow-lg"
                />
            </div>
        </section>
    )
}

export default JoinSection