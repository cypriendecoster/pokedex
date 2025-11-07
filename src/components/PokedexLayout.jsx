const handleButtonSound = () => {
    const audio = new Audio("/sounds/click.mp3")
    audio.volume = 0.35;
    audio.play();
}

export default function PokedexLayout({ children }) {
    return (
        <div className="min-h-screen bg-red-600 flex justify-center items-center p-4">
            <div className="bg-red-700 border-4 border-red-900 rounded-2x1 w-full max-w-4x1 p-4 shadow-2x1 pokedex-body">
                <div className="flex gap-2 mb-4">
                    <div className="w-10 h-10 bg-blue-300 border-4 border-blue-500 rounded-full shadow-inner"></div>
                    <div className="w-6 h-6 bg-yellow-300 border-2 border-yellow-500 rounded-full"></div>
                    <div className="w-6 h-6 bg-green-300 border-2 border-green-500 rounded-full"></div>
                </div>

                <div className="bg-gray-900 border-4 border-gray-700 rounded-x1 p-4 min-h-[500px]">
                    <div className="bg-gray-100 rounded-lg p-4 text-black min-h-[450px] overflow-auto">
                        {children}
                    </div>
                </div>

                <div className="mt-4 flex justify-center gap-3">
                    <button onClick={handleButtonSound} className="
                    relative w-14 h-14
                    rounded-full
                    bg-blue-500/70 backdrop-blur-md
                    border-4 border-blue-300/70
                    shadow-[0_0_10px_rgba(0,150,225,0.6)]
                    active: scale-90
                    transition-all duration-300
                    hover:shadow-[0_0_20px_rgba(0,180,255,0.9)]
                    ">
                        <span className="absolute inset-0 rounded-full bg-white/20 blur-[6px] opacity-30"></span>
                    </button>
                    <div className="flex flex-col gap-2">
                        {/* Red */}
                        <button className="
                        relative w-6 h-6 rounded-full 
                        bg-red-500/70 backdrop-blur 
                        border-2 border-red-300/70 
                        shadow-[0_0_6px_rgba(255,80,80,0.6)] 
                        hover:shadow-[0_0_10px_rgba(255,120,120,1)]
                        active:scale-90 transition-all
                        ">
                            <span className="absolute inset-0 rounded-full bg-white/40 blur-[4px] opacity-40"></span>
                        </button>

                        {/* Green */}
                        <button className="
                         relative w-6 h-6 rounded-full 
                         bg-green-500/70 backdrop-blur 
                        border-2 border-green-300/70 
                        shadow-[0_0_6px_rgba(80,255,80,0.6)]
                        hover:shadow-[0_0_10px_rgba(120,255,120,1)]
                        active:scale-90 transition-all
                        ">
                            <span className="absolute inset-0 rounded-full bg-white/40 blur-[4px] opacity-40"></span>
                        </button>

                        {/* Yellow */}
                        <button className="
                        relative w-6 h-6 rounded-full 
                     bg-yellow-400/70 backdrop-blur 
                        border-2 border-yellow-200/70 
                        shadow-[0_0_6px_rgba(255,255,100,0.6)]
                        hover:shadow-[0_0_10px_rgba(255,255,140,1)]
                        active:scale-90 transition-all
                        ">
                            <span className="absolute inset-0 rounded-full bg-white/40 blur-[4px] opacity-40"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}