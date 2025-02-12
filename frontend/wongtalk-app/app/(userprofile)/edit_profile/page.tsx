import React from "react";
import Link from "next/link";

export default function EditProfile() {
    return (
        <div className="w-full min-h-screen bg-[#080E13] text-[#E8E9EA]">

            {/* Main Container */}
            <div className="w-full sm:max-w-6xl sm:mx-auto">
                {/* Banner Image */}
                <div className="h-32 sm:h-48 bg-[#191C24] relative">
                    <img
                        src="https://i.pinimg.com/originals/53/44/9f/53449fa87702af80374c45b87080c639.jpg"
                        alt="banner image"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Profile Section */}
                <div className="px-4 sm:px-6 relative">
                    <div className="relative flex flex-col items-center">
                        {/* Profile Picture */}
                        <div className="absolute -top-14 sm:-top-16 flex flex-col items-center">
                            <img
                                src="https://th.bing.com/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                                alt="Profile picture"
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#080E13]"
                            />
                            <div className="mt-6 text-center">
                                <h1 className="text-lg sm:text-xl font-bold">Benjamin Hoppe</h1>
                                <p className="text-[#30E48E] text-sm sm:text-base">@Username_Benjamin</p>
                            </div>
                        </div>
                    </div>

                    {/* Edit Form */}
                    <div className="flex justify-center items-center pt-20 sm:pt-24">
                        <div className="mt-10 w-full max-w-3xl">
                            <h2 className="text-xl sm:text-2xl font-bold mb-3 mt-8">Edit Profile</h2>
                            <hr className="border-t-2 border-[rgba(255,255,255,0.1)] mb-8" />

                            <form className="space-y-4">
                                {/* Name Fields */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* First Name */}
                                    <div>
                                        <label className="block text-sm text-[#E8E9EA]/60 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            defaultValue="Benjamin"
                                            className="w-full px-4 py-2 rounded-lg bg-[#191C24] border border-[rgba(255,255,255,0.1)] text-[#E8E9EA] focus:outline-none focus:border-[#30E48E]"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="block text-sm text-[#E8E9EA]/60 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            defaultValue="Hoppe"
                                            className="w-full px-4 py-2 rounded-lg bg-[#191C24] border border-[rgba(255,255,255,0.1)] text-[#E8E9EA] focus:outline-none focus:border-[#30E48E]"
                                        />
                                    </div>
                                </div>

                                {/* Username */}
                                <div>
                                    <label className="block text-sm text-[#E8E9EA]/60 mb-2">Username</label>
                                    <input
                                        type="text"
                                        defaultValue="Username_Benjamin"
                                        className="w-full px-4 py-2 rounded-lg bg-[#191C24] border border-[rgba(255,255,255,0.1)] text-[#E8E9EA] focus:outline-none focus:border-[#30E48E]"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm text-[#E8E9EA]/60 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-2 rounded-lg bg-[#191C24] border border-[rgba(255,255,255,0.1)] text-[#E8E9EA] focus:outline-none focus:border-[#30E48E]"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-row justify-between gap-6 py-6">
                                    <Link href={"/profile"}>
                                        <button className="w-full sm:w-auto px-6 py-2 bg-[#4B5563] text-[#E8E9EA] rounded-full font-bold text-sm sm:text-base hover:bg-opacity-90 transition-colors">
                                            Cancel
                                        </button>
                                    </Link>
                                    <button className="w-full sm:w-auto px-6 py-2 bg-[#30E48E] text-[#080E13] rounded-full font-bold text-sm sm:text-base hover:bg-opacity-90 transition-colors">
                                        Save changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
