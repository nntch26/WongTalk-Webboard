"use client";

import React, { useEffect, useState } from "react";
import { fetchTopics } from "../api/topicServices";
import { followTopic } from "../api/followServices";
import { Topic } from "@/types/types";
import { useRouter } from "next/navigation";
import styles from "@/app/components/styles/Maincontent.module.css";
import FollowButton from "../components/followButton";
import Link from "next/link";

export default function Recommend() {
    const [dataTopic, setdataTopic] = useState<Topic[]>([]);
    const [selected, setSelected] = useState<{ [key: string]: boolean }>({});
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const getTopics = async () => {
        try {
            const data = await fetchTopics();
            setdataTopic(data);

            const selectStart = data.reduce((acc, topic) => {
                // สร้าง obj เพื่อเก็บ state ของแต่ละตัว
                acc[topic._id] = false; // ตั้งค่าปุ่ม Follow เริ่มต้นให้เป็น false
                return acc;
            }, {} as { [key: string]: boolean });
            setSelected(selectStart);
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        }
    };

    const handleFollowChange = (topicId: string) => {
        setSelected((prev) => ({
            ...prev,
            [topicId]: !prev[topicId],
        }));
        if (error) setError(null);
    };

    // const handleDone = async () => {
    //     const hasFollowedTopics = Object.values(selected).some(
    //         (value) => value
    //     );

    //     if (!hasFollowedTopics) {
    //         setError("Please follow at least one topic.");
    //         return;
    //     }

    //     sessionStorage.removeItem("userId");
    //     router.push("/");
    // };

    useEffect(() => {
        getTopics();
    }, []);

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl text-[#E8E9EA] font-bold mb-6 mt-10">
                    Track the topics you are interested in.
                </h2>
                {error && (
                    <div className="w-15 mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 text-red-500 rounded-lg text-sm w-full md:w-1/2 lg:w-1/3">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dataTopic.map((topic) => (
                        // card
                        <div
                            className="rounded-lg p-4 border border-[#374151]"
                            key={topic._id}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <i
                                            className={`${topic.icon} text-base md:text-l`}
                                        ></i>
                                    </div>
                                    <div>
                                        <h3 className="text-[#E8E9EA] font-medium">
                                            {topic.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* button Follow */}
                                <FollowButton
                                    topicId={topic._id}
                                    isFollowing={selected[topic._id]}
                                    onFollowChange={handleFollowChange}
                                />
                            </div>
                            <p className="text-gray-400 text-sm mt-2">
                                {topic.description}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-3">
                    <Link href="/">
                        <button
                            className="bg-[#30E48E] text-[#080E13] px-5 py-2 rounded-lg hover:bg-opacity-90 transition"
                            onClick={() => {
                                sessionStorage.removeItem("userId");
                            }}
                        >
                            Done
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
