import React from "react";
import { logout } from "../(auth)/api/authServices";
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
                router.push("/login"); // กลับไปหน้า login
            }
        };

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={onClose}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-[#191C22] rounded-md shadow-lg">
                    <div className="justify-center">
                        {/* <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-red-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div> */}
                        <div className="mt-2 text-center sm:m-4 py-3">
                            <h4 className="text-lg font-medium text-[#E8E9EA]">
                                Logout Account ?
                            </h4>
                            <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                                Are you sure you want to logout
                            </p>
                            <div className="items-center gap-2 mt-3 flex flex-row">
                                <button
                                    className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                                <button
                                    className="w-full mt-2 p-2.5 flex-1 text-[#E8E9EA] rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

