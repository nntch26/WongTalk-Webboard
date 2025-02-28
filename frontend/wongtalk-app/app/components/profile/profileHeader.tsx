import { useState } from "react";
import PopupModel from "../popup/PopupModel";
import { logout } from "@/app/api/authServices";
import { useRouter } from "next/navigation";

import { User } from "@/types/types";

export const ProfileHeader = ({
    profile,
}: {profile?: User | null}) => {
    const [showModalLogout, setShowModalLogout] = useState<boolean>(false);
    const router = useRouter();

    // logout
    const handleLogout = async () => {
        setShowModalLogout(false);
        const res = await logout();
        if (res.success) {
            localStorage.removeItem("userdata");
            router.push("/"); // กลับไป post หน้าแรก
        }
    };

    if (!profile) return null;

    return (
        <div className="px-4">
            <div className="relative">
                <div className="absolute -top-16">
                    <img
                        src={`/uploads/${profile.image}`}
                        alt="Profile picture"
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#080E13]"
                    />
                </div>
                <div className="flex justify-end py-3">
                    <button>
                        <i
                            className="fa-solid fa-arrow-right-from-bracket fa-xl sm:mt-5 text-[#E8E9EA]/60"
                            onClick={() => setShowModalLogout(true)}
                        ></i>
                    </button>
                    {showModalLogout && (
                        <PopupModel
                            onClick={() => handleLogout()}
                            onClose={() => setShowModalLogout(false)}
                            titletext="Logout Account ?"
                            textbutton="Logout"
                            subtext="Are you sure you want to logout"
                        />
                    )}
                </div>
            </div>
            <div className="mt-8">
                <div className="space-y-1">
                    <h1 className="text-xl font-bold">{profile.fullname}</h1>
                    <p className="text-[#30E48E] text-sm sm:text-base">
                        {profile.username}
                    </p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-[#E8E9EA]/60 text-sm sm:text-base">
                    <div className="flex items-center gap-1">
                        <span>Joined: {profile.createdAt}</span>
                    </div>
                </div>
                <div className="mt-3">
                    <span className="text-[#E8E9EA]/60 text-sm sm:text-base">
                        <span className="font-bold text-[#E8E9EA]">
                            # {profile.posts?.length}
                        </span>{" "}
                        Posts
                    </span>
                </div>
            </div>
        </div>
    );
};
