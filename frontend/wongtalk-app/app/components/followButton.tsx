import React, { useEffect, useState } from "react";
import { followTopic } from "../api/followServices";
import styles from "@/app/components/styles/Maincontent.module.css";
import { FollowButtonProps } from "@/types/types";
import { getFollowTopic } from "../api/userServices";
import { Topic } from "@/types/types";
import PopupModalLogin from "./popup/PopupModalLogin";
import { useAuth } from "../hook/useAuth";

const FollowButton: React.FC<FollowButtonProps> = ({
    topicId,
    onFollowChange,
}) => {

    // const userId =  getUserData ? JSON.parse(getUserData)._id : sessionStorage.getItem("userId");
    const [followTopics, setFollowTopics] = useState<Topic[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);

    // hook เช็คว่า user login ยัง
    const {currentUser, islogin} = useAuth()
    console.log("Current User:", currentUser);
    const userId =  currentUser?._id


    const fetchFollowTopic = async () => {
        try {
            if (islogin) {
                if (userId) {
                    const dataTopic = await getFollowTopic(userId);
                    setFollowTopics(dataTopic.topics);
                }
            }
        } catch (error) {
            console.error("Failed to fetch followed topics:", error);
        }
    };

    useEffect(() => {
        fetchFollowTopic();
    }, [userId]);

    const handleFollowClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (userId) {
            try {
                console.log("followed topics")
                await followTopic(userId, topicId); // อัปเดต followTopic
                setFollowTopics((prev) =>
                    prev.some((topic) => topic._id === topicId) // ถ้า id ตรงกันแสดงว่า ติดตามแล้ว
                        ? prev.filter((topic) => topic._id !== topicId) // ลบหัวข้อที่ติดตาม
                        : [
                                ...prev,
                                {
                                    _id: topicId,
                                    name: "",
                                    description: "",
                                    icon: "",
                                } as Topic,
                            ]
                );
            } catch (error) {
                console.error("Failed to follow topic:", error);
                return;
            }
        }
        // ยังไม่ได้ login
        if (!userId) {
            setShowModal(true); 
            console.log("ยังไม่ได้ login", userId)
        }

        onFollowChange(topicId);
    };

    // ใช้ some เพื่อหาว่ามีอย่างน้อย 1 หรือไม่ ที่ 
    const isFollowing = followTopics.some((topic) => topic._id === topicId); // เช็คว่า topic ที่กด อยู่ใน followTopics หรือไม่ ถ้าอยู่แสดงว่า following แล้ว

    return (
        <>
        
        <button
            className={`${styles.btncusfol} ${
                isFollowing
                ? "bg-[#374151] text-[#E8E9EA]"
                : "bg-[#30E48E] text-[#080E13]"
            } text-sm md:text-base font-semibold text-center flex px-3 py-2 rounded-lg items-center`}
            onClick={handleFollowClick}
            >
            <i className="fa-solid fa-bell mr-2"></i>
            <span>{isFollowing ? "Following" : "Follow"}</span>
        </button>
            
            {showModal && <PopupModalLogin onClose={() => setShowModal(false)} />}
            </>
    );
};

export default FollowButton;
