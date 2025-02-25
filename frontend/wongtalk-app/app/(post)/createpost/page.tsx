"use client";

import React from "react";
import styles from "@/app/components/styles/Navbar.module.css";
import stylesp from "@/app/components/styles/Maincontent.module.css";
import { useState, useEffect } from "react";
import { AddPost, UpdatePost } from "@/app/api/postServices";
import { useRouter } from "next/navigation";

import { Topic } from "@/types/types";
import { PostData } from "@/types/types";
import { fetchTopics } from "@/app/api/topicServices";

export default function page() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [topic, setTopic] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [postId, setPostId] = useState<string>("");

    const [topicList, setTopicList] = useState<Topic[]>([]);
    const router = useRouter();

    // สร้างโพส
    const createPost = async () => {
        try {
            const postData: PostData = {
                title: title,
                content: content,
                topicId: topic,
            };

            console.log("postData -> ", postData);

            const savedata = await AddPost(postData);
            // ถ้าสร้างโพสได้
            if (savedata) {
                console.log("Post successfully created:");
                setTitle("");
                setContent("");
                setTopic("");
                router.push("/"); // เด้งไปหน้าแรก
            }
        } catch (error) {
            console.error("Error creating post:", error);
            router.push("/login"); // เด้งไปหน้า login'
        }
    };

    // แก้ไข post
    const editPost = async () => {
        try {
            const postData: PostData = {
                title: title,
                content: content,
                topicId: topic,
            };

            // update ข้อมูล post
            const savedataedit = await UpdatePost(postId, postData);

            if (savedataedit) {
                console.log("Post Edit successfully:");
                setTitle("");
                setContent("");
                setTopic("");
                setIsEditing(false);
                setPostId("");

                localStorage.removeItem("editPostData");
                router.push("/profile"); // เด้งไปหน้า profile
            }
        } catch (error) {
            console.error("Error edit post:", error);
            router.push("/login"); // เด้งไปหน้า login'
        }
    };

    // ดึงข้อมูล topic หลายๆอัน
    const getTopicList = async () => {
        try {
            const cachedTopics = localStorage.getItem("topics"); // ดึงข้อมูลจาก localStorage

            if (cachedTopics) {
                setTopicList(JSON.parse(cachedTopics)); // ถ้ามีข้อมูลใน localStorage แล้ว ก้ใช้ข้อมูลนั้น
            } else {
                // ถ้ายังไม่มี ก้ดึง api มาใหม่
                const getdata = await fetchTopics();
                setTopicList(getdata);
                localStorage.setItem("topics", JSON.stringify(getdata)); // เก็บเข้า localStorage
                console.log("Fetched topics:", getdata);
            }
        } catch (error) {
            console.error("Error fetching topics", error);
        }
    };

    // กดโพส
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // เช็คก่อนว่า มีค่าป่าว
        if (title && content && topic) {
            // เช็คว่าเป็น edit post หรือป่าว
            if (isEditing) {
                await editPost();
            } else {
                await createPost();
                localStorage.removeItem("savedata");
            }
        } else {
            setError("Please fill in all fields.");
            return;
        }
    };

    // กด Save Draft
    const handleSave = async (e: React.MouseEvent) => {
        e.preventDefault();

        const savedata: PostData = {
            title: title,
            content: content,
            topicId: topic,
        };

        // save ลง localstorage แปลงเปน json ก่อนด้วย
        localStorage.setItem("savedata", JSON.stringify(savedata));
    };

    // ดึงข้อมูลจาก localStorage
    const getSaveData = async () => {
        // เช็คว่า save ไว้หรือป่าว อันนี้ตอน สร้าง post
        const getDatalocal = localStorage.getItem("savedata");

        if (getDatalocal) {
            const getData = JSON.parse(getDatalocal);
            setTitle(getData.title || "");
            setContent(getData.content || "");
            setTopic(getData.topicId || "");
        }

        // เช็คว่ามี editPostData หรือป่าว ถ้ามีแสดงว่าเป็นการ edit post ไม่ใช้สร้าง
        const editPostDataString = localStorage.getItem("editPostData");

        if (editPostDataString) {
            const editPostData = JSON.parse(editPostDataString);
            const { postId_edit, title_edit, content_edit, topicId_edit } =
                editPostData;

            setTitle(title_edit || "");
            setContent(content_edit || "");
            setTopic(topicId_edit || "");
            setPostId(postId_edit || "");
            setIsEditing(true);
        }
    };

    useEffect(() => {
        getSaveData();
        getTopicList();
    }, []);

    return (
        <>
            <div className="max-w-5xl mx-auto p-4 mt-24">
                {/* <!-- Header Section --> */}
                <header className="flex items-center justify-between mb-2">
                    <h1 className="text-xl md:text-4xl font-bold">
                        {isEditing ? "Edit Post" : "Create Post"}
                    </h1>

                    <div className="flex flex-row-reverse md:hidden">
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 rounded-lg bg-[#01F681] text-[#080E13] font-medium hover:opacity-90 transition-opacity"
                        >
                            {isEditing ? "Update" : "Post"}
                        </button>
                    </div>
                </header>

                {error && <div className="error text-red-500">{error}</div>}

                <div className="lg:grid-cols-3 gap-6 mb-5 p-4">
                    {/* <!-- ส่วนเขียนโพส --> */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-[--second-DarkMidnight] rounded-lg p-4">
                                {/* <!-- Title Input --> */}
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Post title"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        } // เก็บค่าจาก input value ของ title
                                        className={`${stylesp.placeholder} ${stylesp.inputfocus} 
                                        w-full px-4 py-6 bg-[--second-DarkMidnight] border-b-2 border-[rgba(255,255,255,0.1)] rounded-lg text-lg`}
                                        maxLength={300}
                                    />

                                    <textarea
                                        placeholder="Write your post content here..."
                                        value={content}
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                        className={`${stylesp.inputfocustext} w-full px-4 py-3 bg-[--second-DarkMidnight] border border-[rgba(255,255,255,0.1)] rounded-lg min-h-[300px]`}
                                    ></textarea>
                                </div>
                            </div>

                            {/* <!-- Topics Input --> */}
                            <div className="space-y-2 p-4 bg-[#0F151A] rounded-lg border border-[rgba(255,255,255,0.1)]">
                                <h3 className="text-l md:text-xl font-bold text-[#E8E9EA] mb-3">
                                    Choose Topic
                                </h3>
                                <select
                                    className={`${stylesp.inputfocustopic} w-full px-4 py-3 bg-[#191C24] border border-[rgba(255,255,255,0.1)] rounded-lg `}
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                >
                                    <option
                                        value=""
                                        disabled
                                        className="text-[#888]"
                                    >
                                        Select a community
                                    </option>
                                    {/* ดึง topic */}
                                    {topicList.map((topics) => (
                                        <option
                                            key={topics._id}
                                            value={topics._id}
                                            className="bg-[--hover-DarkCharcoal] p-2"
                                        >
                                            {topics.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-row-reverse hidden md:flex">
                                <button
                                    type="submit"
                                    className={`${styles.btncus} text-center md:flex px-4 py-2 rounded-lg items-center font-semibold`}
                                >
                                    {isEditing ? "Update" : "Post"}
                                </button>

                                {/* ถ้าไม่ใช้ edit ก็คือเป็นการสร้าง post ให้มีปุ่ม save draft ด้วย */}
                                {!isEditing && (
                                    <button
                                        onClick={handleSave}
                                        className="mr-3 px-4 py-2 font-semibold rounded-lg border border-[rgba(255,255,255,0.1)] hover:border-[#515869]"
                                    >
                                        Save Draft
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
