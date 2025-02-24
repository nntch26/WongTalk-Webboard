import { ProfileTabsProps } from "@/types/types";

export const ProfileTabs = ({ mypost, setMyPost }: ProfileTabsProps) => (
    <div className="flex mt-4 border-b border-[rgba(255,255,255,0.1)] overflow-x-auto scrollbar-hide px-4">
        <button
            className={`${
                mypost
                    ? "text-[#30E48E] border-b-2 border-[#30E48E] font-bold"
                    : "text-[#E8E9EA]/60 hover:text-[#30E48E]"
            } px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base`}
            onClick={() => setMyPost(true)}
        >
            My Posts
        </button>
        <button
            className={`${
                !mypost
                    ? "text-[#30E48E] border-b-2 border-[#30E48E] font-bold"
                    : "text-[#E8E9EA]/60 hover:text-[#30E48E]"
            } px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base transition-colors`}
            onClick={() => setMyPost(false)}
        >
            Follow
        </button>
    </div>
);
