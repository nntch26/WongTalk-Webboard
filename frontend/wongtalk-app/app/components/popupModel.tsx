import React from "react";
import { logout } from "../api/authServices";
import { useRouter } from "next/navigation";

interface PopupType {
    isOpen: boolean;
    onClose: () => void;
}

export default function Popup({ isOpen, onClose }: PopupType) {
    const router = useRouter();

    if (!isOpen) return null;

    // จัดการตอน logout
    const handleLogout = async () => {
        const res = await logout();
        if (res.success) {
            localStorage.removeItem("userdata")
            router.push("/"); // กลับไป post หน้าแรก
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                    onClick={onClose}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-lg p-4 mx-auto bg-[#191C22] rounded-md shadow-lg">
                        <div className="justify-center">
                            <div className="mt-2 text-center sm:m-4 py-3">
                                <h4 className="text-lg font-medium text-[#E8E9EA]">
                                    Logout Account ?
                                </h4>
                                <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                                    Are you sure you want to logout
                                </p>
                                <div className="items-center gap-2 mt-3 flex flex-row">
                                    
                                    <button
                                        className="w-full mt-2 p-2.5 flex-1 text-[#E8E9EA] hover:bg-opacity-90 rounded-md outline-none border ring-offset-2 ring-[#374151]-600 focus:ring-2"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 hover:bg-opacity-90 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
}
