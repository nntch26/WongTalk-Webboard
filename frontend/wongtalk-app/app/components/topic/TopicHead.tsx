"use client";

import React, { useState } from "react";
import { Topic } from "@/types/types";
import styles from "@/app/components/styles/Maincontent.module.css";
import FollowButton from "../followButton";

export default function TopicHead({ topic }: { topic: Topic }) {
    const [selected, setSelected] = useState<{[key: string] : boolean}>({})
    const [error, setError] = useState<string | null>(null)

    const handleFollowChange = (topicId: string) => {
        setSelected((prev) => ({
            ...prev,
            [topicId]: !prev[topicId],
        }));
        if (error) setError(null)
    };


    return (
        <>
            {error && (
                <div className="w-15 mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 text-red-500 rounded-lg text-sm w-full md:w-1/2 lg:w-1/3">
                    {error}
                </div>
            )}

            
            <header className="container max-w-8xl mx-auto mt-32 bg-[--second-DarkMidnight] shadow-md rounded-lg mb-6 p-4">
                <div className="flex flex-col md:flex-row items-center justify-between py-4 px-8">
                    <div className="flex items-center space-x-6 hover:scale-110 transition-all duration-500 ease-in-out">
                        <i
                            className={`${topic.icon} text-5xl rounded-full text-gray-200`}
                        />
                        <div className="flex flex-col">
                            <h2 className="text-white text-xl font-semibold">
                                {topic.name}
                            </h2>
                            <code className="text-gray-400 text-md mb-2">
                                {topic.description}
                            </code>
                        </div>
                    </div>
                    <FollowButton
                        topicId={topic._id}
                        onFollowChange={handleFollowChange}
                    />
                </div>
                <div className="border-t border-gray-600 flex space-x-4 p-3 text-sm"></div>
            </header>
        </>
    );
}
