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
            </div>
        </div>
    );
}