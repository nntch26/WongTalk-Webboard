import React from "react";
import { followTopic } from "../api/followServices";
import styles from "@/app/components/styles/Maincontent.module.css";
import { FollowButtonProps } from "@/types/types";


const FollowButton: React.FC<FollowButtonProps> = ({
    topicId,
    isFollowing,
    onFollowChange,
    className = "",
}) => {
    const handleFollowClick = async (e: React.MouseEvent) => {
        e.preventDefault();

        const userId = sessionStorage.getItem("userId");
        if (userId) {
            try {
                await followTopic(userId, topicId);
            } catch (error) {
                console.error("Failed to follow topic:", error);
                return;
            }
        }

        onFollowChange(topicId);
    };

    return (
        <button
            className={`${styles.btncusfol} ${
                isFollowing
                    ? "bg-[#374151] text-[#E8E9EA]"
                    : "bg-[#30E48E] text-[#080E13]"
            } text-sm md:text-base font-semibold text-center flex px-3 py-2 rounded-lg items-center ${className}`}
            onClick={handleFollowClick}
        >
            <i className="fa-solid fa-bell mr-2"></i>
            <span>{isFollowing ? "Following" : "Follow"}</span>
        </button>
    );
};

export default FollowButton;
