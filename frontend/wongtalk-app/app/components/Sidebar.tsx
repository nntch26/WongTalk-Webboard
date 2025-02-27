import Link from "next/link";
import styles from "./styles/Sidebar.module.css";

import { useState, useEffect } from "react";

import TopicList from "./home/TopicList";
import { Topic } from "@/types/types";
import { getFollowTopic } from "../api/userServices";

export default function Sidebar() {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem("userdata");
        if (userData) {
            const user_id = JSON.parse(userData)._id
            setUserId(user_id);
        }
    }, []);

    
    useEffect(() => {
        const fetchTopic = async () => {
            if (userId) {
                try {
                    const topicData = await getFollowTopic(userId);
                    setTopics(topicData.topics);
                } catch (error) {
                    console.error("Failed to fetch Topics:", error);
                }
            }
        };

        fetchTopic();
    }, [userId]);


    return (
        <>
            {/* <!-- Sidenav --> */}
            <div
                id="sidenav"
                className={`${styles.sidebarcus} sidebar-cus fixed top-16 left-0 h-full w-64  z-40 transform md:translate-x-0 -translate-x-full transition-transform duration-300 ease-in-out`}
            >
                <div className="overflow-y-auto h-full">
                    {/* <!-- หน้าแรก --> */}
                    <div className="px-3 py-4">
                        <div className="space-y-2 mt-4 mb-4">
                            <Link href="/" className={styles.sidenavitem}>
                                <i className="fa-regular fa-comment-dots mr-3"></i>
                                <span>My Feed</span>
                            </Link>
                            <Link
                                href={"/latest"}
                                className={styles.sidenavitem}
                            >
                                <i className="fa-solid fa-fire mr-3"></i>
                                <span>New Posts</span>
                            </Link>
                            <Link href={"/top"} className={styles.sidenavitem}>
                                <i className="fa-solid fa-arrow-up-right-dots mr-3"></i>
                                <span>Top Posts</span>
                            </Link>
                            <Link href="#" className={styles.sidenavitem}>
                                <i className="fas fa-star mr-3"></i>
                                <span>Following</span>
                            </Link>
                        </div>
                    </div>

                    <hr className="border-gray-700" />

                    {/* <!-- อันที่ติดตามไว้ --> */}
                    <div className="px-3 py-4">
                        <h3 className="px-3 text-sm font-medium text-gray-400">
                            Following
                        </h3>
                        {userId ? (
                            topics.length > 0 ? (
                                topics.map((topic) => (
                                    <div
                                        className="space-y-2 mt-2"
                                        key={topic._id}
                                    >
                                        <TopicList
                                            key={topic._id}
                                            topic={topic}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">
                                    You are not following any topics.
                                </p>
                            )
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
