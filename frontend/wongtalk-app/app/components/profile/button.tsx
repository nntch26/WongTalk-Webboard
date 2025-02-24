import Link from "next/link";


export const ActionButtons = () => (
    <div className="flex gap-2 mt-4 px-4">
        <Link href="createpost" className="flex-1">
            <button className="w-full py-2 sm:py-3 bg-gradient-to-r from-[rgba(0,255,124,1)] to-[#FCD34D] text-[#080E13] rounded-full text-sm sm:text-base font-bold hover:opacity-90 transition-opacity">
                Create Post
            </button>
        </Link>
        <Link href="edit_profile" className="flex-1">
            <button className="w-full py-2 sm:py-3 border border-[rgba(255,255,255,0.1)] rounded-full text-sm sm:text-base font-bold hover:bg-[#0F151A] transition-colors">
                Edit Profile
            </button>
        </Link>
    </div>
);
