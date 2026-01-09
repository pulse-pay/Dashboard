const Navbar = ({ setIsgetStarted }) => {
    return (
        <nav className="w-full bg-white/10 rounded-full backdrop-blur-xl border-b border-white/20 px-6 py-4 flex items-center justify-between shadow-2xl">
            <div className="flex items-center">
                <h1 className="text-white font-bold text-3xl sm:text-4xl mb-0 tracking-tight">
                    PulsePay.Store
                </h1>
            </div>
            <div>
                <button
                    onClick={() => {
                        return setIsgetStarted(prev => !prev);
                    }} className="group relative overflow-hidden bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow transition-all duration-500 ease-in-out hover:text-white"
                >
                    <span className="absolute inset-0 w-full h-full bg-blue-600 transition-transform duration-500 ease-initial transform -translate-x-full group-hover:translate-x-0"></span>
                    <span className="relative z-10">Get Started</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
