"use client";
import React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/app/components/Navbar";
import { followTopic } from "@/app/api/followServices";
import { User, Topic } from "@/types/types";
import { getProfile } from "@/app/api/profileServices";
import { getFollowTopic } from "@/app/api/userServices";

// component
import { ProfileBanner } from "@/app/components/profile/profileBanner";
import { ProfileHeader } from "@/app/components/profile/profileHeader";
import { ActionButtons } from "@/app/components/profile/button";
import { ProfileTabs } from "@/app/components/profile/profileTab";
import { PostList } from "@/app/components/profile/postList";
import FollowTopicList from "@/app/components/profile/topicList";

export default function Profile() {
    const [profile, setProfile] = useState<User | null>(null);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isShow, setIsShow] = useState<boolean>(false);
    const [mypost, setMyPost] = useState<boolean>(true);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // ดึงข้อมูล Topic
    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getProfile();
            setProfile(data);
            if (data && data._id) {
                const topicData = await getFollowTopic(data._id);
                setTopics(topicData.topics);
            }
        } catch (err) {
            setError("Failed to fetch topics");
            console.error("Error fetching topics:", err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);



    const handleSelect = (e: React.MouseEvent, topicId: string) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedTopic((prevId) => (prevId === topicId ? null : topicId)); // ถ้ากดหัวข้อเดิมให้เป็น null เพื่อปิด dropdown แต่ถ้ากดอันอื่นให้เป็น id ของอันนั้น
    };

    // คลิกข้างนอกให้ปิด dropdown
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setSelectedTopic(null);
        }
    }, []);

    // กด follow unfollow
    const handleUnfollow = async (topicId: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const userId = profile?._id;
        if (!userId) return;

        try {
            await followTopic(userId, topicId);
            setSelectedTopic(null);

            // รีหน้า หลังจากที่ลบ unfollow
            await fetchData();
        } catch (error) {
            console.error("Error unfollowing topic:", error);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Navbar />

            <div className="w-full min-h-screen bg-[#080E13] text-[#E8E9EA]">
                <div className="max-w-6xl mx-auto">
                    <ProfileBanner bannerUrl="https://i.pinimg.com/originals/53/44/9f/53449fa87702af80374c45b87080c639.jpg" />
                    <ProfileHeader
                        profile={profile}
                        onLogout={() => {}}
                        isShow={isShow}
                        setIsShow={setIsShow}
                    />
                    <ActionButtons />
                    <ProfileTabs mypost={mypost} setMyPost={setMyPost} />
                    {mypost ? (
                        <PostList
                            profile={profile}
                        />
                    ) : (
                        <FollowTopicList
                            topics={topics}
                            selectedTopic={selectedTopic}
                            handleSelect={handleSelect}
                            handleUnfollow={handleUnfollow}
                            dropdownRef={dropdownRef}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
