import { useEffect, useState } from "react";

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
                    className="h-3 rounded-full bg-[var(--poke-blue)] transition-all duration-700"
                    style={{ width: `${width / 2}%` }}
                ></div>
            </div>
            <span className="text-xs font-semibold">{value}</span>
        </div>
    );
}