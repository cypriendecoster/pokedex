export default function PokeLoader() {
    return (
        <div className="flex flex-col items-center justify-center py-10">
            <div className="pokeball animate-spin-slow"></div>
            <p className="mt-3 text-red-600 font-semibold tracking-wide">
                Chargement...
            </p>
        </div>
    );
}