export default function Footer() {
    return (
        <footer className="border-t mt-10 bg-white/80 backdrop-blur">
            <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">

                <p className="font-medium">
                    © {new Date().getFullYear()} Pokédex - Projet React
                </p>

                <p className="mt-2 sm:mt-0">
                    Propulsé avec ❤️ par React & PokéAPI
                </p>

            </div>
        </footer>
    );
}