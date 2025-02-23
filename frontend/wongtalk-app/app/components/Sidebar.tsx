import Link from "next/link";
import styles from "./styles/Sidebar.module.css";

import { userFollowTopic } from "../hook/useFollowTopic";
import { useState, useEffect } from "react";
import { getToken } from "../api/profileServices";

import TopicList from "./home/TopicList";

export default function Sidebar() {
    const { profile, topics, loading, error } = userFollowTopic();
    const [token, setToken] = useState<string | null>(null);

    const fetchProfile = async () => {
            try {
                const token = await getToken(); // ดึง token
                if (token) {
                    setToken(token);
                    return;
                }
            } catch (error) {
                console.error("Failed to fetch Token:", error);
            }
        };
    
        // ดึง user
        useEffect(() => {
            fetchProfile();
        }, []);


    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <>
            {/* <!-- Sidenav --> */}
            <div id="sidenav"className={`${styles.sidebarcus} sidebar-cus fixed top-16 left-0 h-full w-64  z-40 transform md:translate-x-0 -translate-x-full transition-transform duration-300 ease-in-out`}>
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
                        {token ? (
                            topics.length > 0 ? (
                                topics.map((topic) => (
                                    <div className="space-y-2 mt-4" key={topic._id}>
                                        <TopicList key={topic._id} topic={topic} />
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
