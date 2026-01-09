import { useEffect, useState } from "react";
import { ArrowRight, ChevronRight, Play } from "lucide-react";
import Button from "../components/common/Button";

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
        }, 50);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4">
            <div className="max-w-5xl text-center space-y-10 flex flex-col items-center">
                
                {/* Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-600 text-sm font-medium animate-fade-in-down">
                    <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                    New: Usage-based billing dashboard
                </div>

                <div className="w-full mx-auto space-y-6">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight min-h-[1.2em]">
                        {displayedText}
                        <span className="animate-blink text-blue-600">|</span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
                        Reach users who don&apos;t want subscriptions and charge them fairly through real-time, usage-based payments.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up">
                     <Button 
                        onClick={() => setIsgetStarted(prev => !prev)}
                        variant="primary"
                        size="lg"
                        className="rounded-full px-8 py-4 text-lg shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30"
                        rightIcon={<ArrowRight className="w-5 h-5" />}
                     >
                        Get Started
                     </Button>
                     
                     <Button 
                        variant="outline"
                        size="lg"
                        className="rounded-full px-8 py-4 text-lg border-gray-200 hover:bg-white hover:border-gray-300"
                        leftIcon={<Play className="w-5 h-5 fill-current" />}
                     >
                        Watch Demo
                     </Button>
                </div>

                {/* Social Proof / Trust */}
                <div className="pt-12 border-t border-gray-100 w-full max-w-2xl">
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Trusted by modern teams</p>
                    <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholders for logos */}
                        <div className="h-8 w-24 bg-gray-300/50 rounded animate-pulse"></div>
                        <div className="h-8 w-24 bg-gray-300/50 rounded animate-pulse delay-75"></div>
                        <div className="h-8 w-24 bg-gray-300/50 rounded animate-pulse delay-150"></div>
                        <div className="h-8 w-24 bg-gray-300/50 rounded animate-pulse delay-200"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;