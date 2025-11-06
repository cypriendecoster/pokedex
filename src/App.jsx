import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Pokedex from "./pages/Pokedex.jsx";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}