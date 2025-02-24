import { TopicListProps } from "@/types/types";

const FollowTopicList: React.FC<TopicListProps> = ({
    topics,
    selectedTopic,
    handleSelect,
    handleUnfollow,
    dropdownRef,
}) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8">
            {topics.length > 0 ? (
                topics.map((topic) => (
                    <div
                        key={topic._id}
                        className="relative rounded-lg p-4 border border-[#374151] transition duration-200 hover:bg-[#0F151A] hover:border-[#4B5563]"
                    >
                        <i
                            className="fa-solid fa-ellipsis-vertical absolute top-3 right-3 cursor-pointer text-gray-500 text-xl hover:text-[#E8E9EA] transition"
                            onClick={(e) => handleSelect(e, topic._id)}
                        />

                        {selectedTopic === topic._id && (
                            <div
                                ref={dropdownRef}
                                className="absolute top-8 right-5 bg-[#1E293B] border border-[#374151] rounded-md shadow-lg p-1 z-10"
                            >
                                <button
                                    className="text-red-500 text-sm px-2 py-1 hover:font-bold rounded-md transition"
                                    onClick={(e) =>
                                        handleUnfollow(topic._id, e)
                                    }
                                >
                                    Unfollow
                                </button>
                            </div>
                        )}

                        <i className={`${topic.icon} text-base md:text-l`} />
                        <h1>{topic.name}</h1>
                    </div>
                ))
            ) : (
                <h2 className="text-gray-400 text-lg text-center">
                    You are not following any topics.
                </h2>
            )}
        </div>
    );
};

export default FollowTopicList;
