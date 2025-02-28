import Link from 'next/link';
import React from 'react'


export default function PopupModalLogin({ onClose }: {onClose: () => void;}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="relative bg-[--hover-DarkCharcoal] p-6 rounded-md shadow-lg w-96 text-center">

                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>

                <div className="flex justify-center">
                    <img src="/logo2.png" alt="Logo" className="w-12 h-12" />
                </div>

                <h2 className="font-bold text-2xl">Wong<span className="text-[--primary-color]">Talk .</span></h2>
                <h2 className="text-xl font-bold mt-2">Log in to continue</h2>
                <p className="text-gray-400 mt-2">
                    The more you ask, the more you discover!
                </p>

                {/* ปุ่ม Log in กับ Create Account */}
                <div className="mt-4 flex flex-col space-y-2">
                    <Link href={"/login"} className="w-full px-4 py-2 bg-[--primary-color] text-[--second-DarkMidnight] rounded-md hover:bg-green-400">
                        Log in
                    </Link>
                    <Link href={"/register"} className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-800">
                        Create account
                    </Link>
                </div>
            </div>
        </div>

    );
}
