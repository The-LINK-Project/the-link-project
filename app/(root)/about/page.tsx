import React from "react";
import { aboutUsInformation } from "@/constants";

export default function AboutPage() {
    return (
        <div
            className="min-h-screen py-16 px-4"
            style={{
                background: "linear-gradient(to bottom, white, #49BED4)",
            }}
        >
            <div className="max-w-7xl mx-auto text-center">
                <h1
                    className="text-5xl font-extrabold mb-4"
                    style={{ color: "#49BED4" }}
                >
                    About Us
                </h1>
                <p className="max-w-2xl mx-auto text-lg" style={{ color: "#49BED4" }}>
                    Meet our amazing team dedicated to delivering excellence.
                </p>
            </div>

            <div className="mt-16 max-w-7xl mx-auto grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4">
                {aboutUsInformation.map((person, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col items-center text-center p-6"
                        style={{
                            borderTop: "8px solid #49BED4",
                        }}
                    >
                        <img
                            src={person.image}
                            alt={person.name}
                            className="w-40 h-40 object-cover rounded-full mb-6"
                            style={{
                                border: "4px solid #49BED4",
                            }}
                        />
                        <h2 className="text-2xl font-bold" style={{ color: "#49BED4" }}>
                            {person.name}
                        </h2>
                        <p className="font-medium mb-4" style={{ color: "#49BED4" }}>
                            {person.role}
                        </p>
                        <p className="text-gray-600">{person.bio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
