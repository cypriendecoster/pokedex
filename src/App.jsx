import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Pokedex from "./pages/Pokedex.jsx";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PokemonDetails from "./pages/PokemonDetails.jsx";
import Favorites from "./pages/Favorites.jsx";


export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="page-fade">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/pokemon/:name" element={<PokemonDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  )
}