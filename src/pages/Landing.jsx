import { useEffect, useState } from "react";
import { preconnect } from "react-dom";

const Landing = ({ setIsgetStarted }) => {
    const fullText = "Turn occasional users into paying customers";
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            if (index < fullText.length) {
                setDisplayedText(fullText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(intervalId);
            }
        }, 70); // Adjust typing speed here (ms)

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
                <div className="max-w-4xl text-center space-y-8 flex flex-col items-center">
                    <div className="w-full mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white min-h-[1.5em]">
                            {displayedText}
                            <span className="animate-pulse">|</span>
                        </h1>
                    </div>
                    
                    <p className="text-xl md:text-2xl text-gray-800 max-w-2xl mx-auto leading-relaxed font-light">
                        Reach users who don&apos;t want subscriptions and charge them fairly through real-time, usage-based payments.
                    </p>

                    <div className="pt-8">
                        <button 
                            onClick={() => {
                                return setIsgetStarted(prev => !prev);
                            }}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                        >
                            Get Started
                        </button>
                        <button className="ml-4 px-8 py-3 bg-transparent border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white rounded-full font-semibold transition-all">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;