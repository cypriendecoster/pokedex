import { useEffect, useState } from "react";

const statColors = {
    hp: "bg-red-500",
    attack: "bg-orange-500",
    defense: "bg-yellow-500",
    "special attack":"bg-blue-500",
    "special-defense": "bg-green-500",
    speed: "bg-pink-500"
};

export default function StatBar({ label, value }) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setWidth(value), 100);
        return () => clearTimeout(timer);
    }, [value]);

    return (
        <div className="mb-2">
            <span className="capitalize font-medium">{label}</span>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
                <div
                    className={`h-3 rounded-full transition-all duration-700 ${statColors[label] || "bg-gray-400"}`}
                    style={{ width: `${width / 1.5}%` }}
                ></div>
            </div>
            <span className="text-xs font-semibold">{value}</span>
        </div>
    );
}