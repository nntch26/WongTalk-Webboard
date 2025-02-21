"use client";

import React from "react";
// import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProfile, editProfile } from "../../api/profileServices";
import Navbar from "@/app/components/Navbar";

// type
import { User } from "@/types/types";

export default function EditProfile() {
    const [user, setUser] = useState<User>({
        fullname: "",
        username: "",
        email: "",
        image: "",
        posts: [],
        createdAt: "",
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const [fileOld, setfileOld] = useState();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile(); // ดึงข้อมูลจาก API
                setUser(data);
                setfileOld(data.image);
            } catch (error) {
                setError("Failed to fetch profile.");
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        if (files && files[0]) {
            const file = files[0];
            setUser((prev) => ({
                ...prev,
                [name]: file, // เก็บไฟล์ใน state
            }));
        } else {
            setUser((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        // เคลียร์ error ถ้ามีค่า error อยู่
        if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        console.log(user);
        console.log(fileOld);

        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", user.fullname);
        formData.append("username", user.username);
        formData.append("email", user.email);

        if (fileOld) {
            formData.append("fileOld", fileOld);
        }

        if (user.image) {
            formData.append("image", user.image);
        }

        try {
            const updatedUser = await editProfile(formData); // ส่งข้อมูลที่แก้ไขไปที่ API
            router.push("/profile"); // แก้ไขสำเร็จให้ไปที่หน้าโปรไฟล์
        } catch (err: any) {
            setError(err.message || "Profile update failed.");
        }
    };

    return (
        <>
            <Navbar />
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
                                    src={`/uploads/${fileOld || user.image}`}
                                    alt="Profile Image"
                                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#080E13]"
                                />

                                {/*  */}
                                {/* <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <span className="text-white text-sm">
                                    Change Photo
                                </span>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label> */}
                                {/*  */}

                                <div className="mt-6 text-center">
                                    <h1 className="text-lg sm:text-xl font-bold">
                                        {user.fullname}
                                    </h1>
                                    <p className="text-[#30E48E] text-sm sm:text-base">
                                        {user.username}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Edit Form */}
                        <div className="flex justify-center items-center pt-20 sm:pt-24">
                            <div className="mt-10 w-full max-w-3xl">
                                <h2 className="text-xl sm:text-2xl font-bold mb-3 mt-8">
                                    Edit Profile
                                </h2>
                                <hr className="border-t-2 border-[rgba(255,255,255,0.1)] mb-8" />

                                <form
                                    className="space-y-4"
                                    onSubmit={handleSubmit}
                                    encType="multipart/form-data"
                                >
                                    {/* Name Fields */}
                                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-[#E8E9EA]/60 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Benjamin"
                                            className="w-full px-4 py-2 rounded-lg bg-[#191C24] border border-[rgba(255,255,255,0.1)] text-[#E8E9EA] focus:outline-none focus:border-[#30E48E]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-[#E8E9EA]/60 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Hoppe"
                                            className="w-full px-4 py-2 rounded-lg bg-[#191C24] border border-[rgba(255,255,255,0.1)] text-[#E8E9EA] focus:outline-none focus:border-[#30E48E]"
                                        />
                                    </div>
                                </div> */}

                                    {/* Fullname */}
                                    <div>
                                        <label className="block text-sm text-[#E8E9EA]/60 mb-2">
                                            Fullname
                                        </label>
                                        <input
                                            type="text"
                                            name="fullname"
                                            value={user.fullname}
                                            className="w-full px-4 py-2 rounded-lg bg-[#191C24] border border-[rgba(255,255,255,0.1)] text-[#E8E9EA] focus:outline-none focus:border-[#30E48E]"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* Username */}
                                    <div>
                                        <label className="block text-sm text-[#E8E9EA]/60 mb-2">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={user.username}
                                            className="w-full px-4 py-2 rounded-lg bg-[#191C24] border border-[rgba(255,255,255,0.1)] text-[#E8E9EA] focus:outline-none focus:border-[#30E48E]"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm text-[#E8E9EA]/60 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            className="w-full px-4 py-2 rounded-lg bg-[#191C24] border border-[rgba(255,255,255,0.1)] text-[#E8E9EA] focus:outline-none focus:border-[#30E48E]"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* ProfileImage */}
                                    <div>
                                        <label className="block text-sm text-[#E8E9EA]/60 mb-2">
                                            Profile Picture
                                        </label>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex flex-row justify-between gap-6 py-6">
                                        {/* <Link href={"/profile"}>
                                        <button className="w-full sm:w-auto px-6 py-2 bg-[#4B5563] text-[#E8E9EA] rounded-full font-bold text-sm sm:text-base hover:bg-opacity-90 transition-colors">
                                            Cancel
                                        </button>
                                    </Link> */}
                                        <button
                                            type="submit"
                                            className="sm:w-auto px-6 py-2 bg-[#30E48E] text-[#080E13] rounded-full font-bold text-sm sm:text-base hover:bg-opacity-90 transition-colors"
                                        >
                                            Save changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
