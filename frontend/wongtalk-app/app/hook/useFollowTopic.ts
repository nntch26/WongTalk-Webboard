import { useEffect, useState } from "react";
import { getFollowTopic } from "../api/userServices";
import { getProfile } from "../api/profileServices";
import { User, Topic } from "@/types/types";
import { getToken } from "../api/profileServices";

export const userFollowTopic = () => {
    const [profile, setProfile] = useState<User | null>(null);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            if (!token) {
                setLoading(false);
                return;
            }

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

    // ทำเพื่อให้เปลี่ยน refetch เมื่อลบ unfollow
    const refetch = () => setReload((prev) => !prev);

    return { profile, topics, loading, error, fetchData };
};

