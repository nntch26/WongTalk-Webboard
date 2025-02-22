import { useEffect, useState } from "react";
import { getFollowTopic } from "../api/userServices";
import { getProfile } from "../api/profileServices";
import { User, Topic } from "@/types/types";

export const userFollowTopic = () => {
    const [profile, setProfile] = useState<User | null>(null);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getProfile();
                if (isMounted) setProfile(data);

                if (data && data._id) {
                    const topicData = await getFollowTopic(data._id);
                    if (isMounted) setTopics(topicData.topics);
                }
            } catch (err) {
                if (isMounted) setError("Failed to fetch topics");
                console.error("Error fetching topics:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false; // Cleanup function เพื่อป้องกัน memory leak
        };
    }, []);

    return { profile, topics, loading, error };
};
