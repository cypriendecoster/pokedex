import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
            <nav className="container mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo / Titre */}
                <Link to={"/"} className="text-2xl font-black tracking-tight" style={{ color: "var(--poke-red)" }}>
                    Pokédex
                </Link>

                {/*Menu */}
                <div className="flex gap-6 font-medium">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-[var(--poke-red)]"
                                : "text-gray-700 hover:text-black"
                        }
                    >
                        Accueil
                    </NavLink>

                    <NavLink
                        to="/pokedex"
                        className={({ isActive }) =>
                            isActive
                                ? "text-[var(--poke-blue)]"
                                : "text-gray-700 hover:text-black"
                        }
                    >
                        Pokédex
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}