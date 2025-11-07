import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EvolutionCard({ name, imageUrl }) {
    const navigate = useNavigate();
    const [animating, setAnimating] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        if (animating) return;
        setAnimating(true);
        setTimeout(() => navigate(`/pokemon/${name}`), 420);
    };

    const location = useLocation();

    useEffect(() => {
        setAnimating(false);
    }, [location.pathname]);

    return (
        <button
            onClick={handleClick}
            className="relative block text-center group focus:outline-none"
            aria-label={`Voir ${name}`}
        >
            <img
                src={imageUrl}
                alt={name}
                className={`w-20 h-20 mx-auto transition-transform duration-400 ease-out 
        ${animating ? "evo-morph" : "group-hover:scale-110"}`}
            />

            <p className="capitalize text-sm mt-1">{name}</p>

            <div className={`sparkle-wrap pointer-events-none ${animating ? "spark-on" : ""}`}>
                <span className="sparkle sp1"></span>
                <span className="sparkle sp2"></span>
                <span className="sparkle sp3"></span>
                <span className="sparkle sp4"></span>
                <span className="sparkle sp5"></span>
                <span className="sparkle sp6"></span>
            </div>

            <span className="shine-sweep" />
        </button>
    );
}
