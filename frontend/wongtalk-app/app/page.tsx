"use client";
// import Image from "next/image";
import styles from "./components/styles/Maincontent.module.css";
import { useState, useEffect, Suspense } from "react"
import Link from "next/link";

import { fetchTopics } from "@/app/api/topicServices";
import { fetchPost, fetchPostNew } from "@/app/api/postServices";
import { Post, Topic } from "@/types/types";

import Sidebar from "./components/Sidebar";
import TopicList from "./components/home/TopicList";
import PostCard from "./components/home/PostCard";
import PostNew from "./components/home/PostNew";
import Navbar from "./components/Navbar";
import ButtonViewMore from "./components/home/ButtonViewMore";

// Skeleton loading
import { SkeletonPostsLoading,  SkeletonNewPost } from "./components/ui/Skeletons";
    

export default function Home() {
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [morePosts, setMorePosts] = useState<Post[]>([]);
    const [postsnew, setPostsnew] = useState<Post[]>([]);

    const [topicList, setTopicList] = useState<Topic[]>([]) 
    const [num, setNum] = useState<number>(5)

    const getposts = async () => {
        try {
            const getdata = await fetchPost();
            // console.log("data ", getdata);
            setTimeout(() => {
                setAllPosts(getdata); // เก็บโพสต์ทั้งหมด
                setMorePosts(getdata.slice(0, num)); // แสดงเฉพาะ 2 โพสแรก

            }, 1000); // ดีเลย์ 1 วินาที

        } catch (error) {
            console.log("Error fetching ", error);
        }
    };

    // ดึง topic list ทั้งหมด
    const getTopics = async() =>{
        try{
            const cachedTopics = localStorage.getItem("topics"); // ดึงข้อมูลจาก localStorage

            if (cachedTopics) {
                setTopicList(JSON.parse(cachedTopics));  // ถ้ามีข้อมูลใน localStorage แล้ว ก้ใช้ข้อมูลนั้น

            } else {
                // ถ้ายังไม่มี ก้ดึง api มาใหม่
                const getdata = await fetchTopics();
                setTopicList(getdata);
                localStorage.setItem("topics", JSON.stringify(getdata)); // เก็บเข้า localStorage
                console.log('Fetched topics:', getdata);
            }
        }catch(error){
            console.error('Error fetching topics', error)
        }
    }

    // ดึงโพสใหม่ล่าสุด
    const getNewposts = async () => {
        try {
            const getdata = await fetchPostNew();
            console.log("data ", getdata);

            setTimeout(() => {
                setPostsnew(getdata); 
            }, 1000); // ดีเลย์ 1 วินาที
            
        } catch (error) {
            console.log("Error fetching ", error);
        }
    };

    //show more โชว์โพสอื่นๆ เพิ่ม
    const handleShowMorePost = () => {
        console.log(num)
        setNum(prevNum => {
            const newNum = prevNum + 5;// เพิ่มค่า num 
            setMorePosts(allPosts.slice(0, newNum)); // ใช้ค่าที่อัปเดตแล้ว ถ้ากดครั้งแรกไปแล้ว ให้โชว์เพิ่มอีก 
            return newNum;
        })
        
    }

   

    // โหลด ครั้งเดียว
    useEffect(() => {
        getTopics();
        getposts();
        getNewposts();
    }, []);


    console.log("Post home page :", morePosts)

    return (
        <>
            <Navbar />
            <Sidebar onClickOpen={false}/>
            {/* <!-- Main Content --> */}
            <div id="main-content" className="pt-16 ml-0 md:ml-64 transition-margin duration-300 ease-in-out">
                {/* <!-- Banner --> */}
                <div className="max-w-7xl mx-auto p-4 mt-8">
                    <div className={`${styles.bannercus} rounded-xl p-6  max-w-7xl mx-auto`}>
                        <h2 className="text-2xl md:text-4xl font-bold mb-2">
                            Ask more, Discover more.
                        </h2>
                        <p className="text-sm md:text-base">
                            "By asking questions, we not only seek answers for
                            ourselves but also inspire others to share their
                            insights, leading to new discoveries."
                        </p>
                    </div>
                </div>

                {/* <!-- ส่วน topic  --> */}
                <div className="max-w-6xl mx-auto px-4 mt-8 mb-4">
                    <div className="flex gap-3 p-3 overflow-x-auto whitespace-nowrap">
                            <Link href={'/'} className="px-3 py-2 bg-gray-800 text-white rounded-lg  text-sm">All</Link>

                            {topicList.map((topic) => (
                                <TopicList key={topic._id} topic={topic} />
                            ))}
                    </div>
                </div>

                {/* <!-- ส่วนโพสอื่นๆ --> */}
                <div className="max-w-7xl mx-auto p-4">
                    <h3 className="text-2xl md:text-4xl font-bold mb-8">
                        Explore Communities
                    </h3>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* ฝั่งซ้าย โพส */}
                        <div className="flex-1 ">
                            <Suspense fallback={<SkeletonPostsLoading />}>
                                {morePosts && morePosts.length > 0? (
                                    morePosts.map((post) => (
                                        <PostCard key={post._id} post={post} />))
                                ) : (
                                    <SkeletonPostsLoading />
                                )}
                            </Suspense>

                            {/* <!-- ปุ่มดูเพิ่มเติม --> */}
                            {morePosts.length < allPosts.length &&(
                                <div className="text-center mt-6">
                                {/* <!-- กดปุ่ม แล้วเปลี่ยนค่า t f ให้แสดงโพสเพิ่ม --> */}
                                <ButtonViewMore onClick={handleShowMorePost} />
                               
                            </div>
                            )}
                            
                        </div>

                        {/* ฝั่งขวา sidenav  */}
                        <div className="lg:w-80 space-y-4 hidden lg:block">
                            {/* <!-- โพสใหม่ๆๆ -->    */}
                            <div className="max-w-md mx-auto mb-6">
                                {/* โพสใหม่ */}
                                <Suspense fallback={<SkeletonNewPost/>}>
                                    {postsnew&& postsnew.length > 0 ?(
                                        <PostNew newpost={postsnew} />
                                    ):(
                                        <SkeletonNewPost/>
                                    )}
                                </Suspense>

                                <hr className="border-0 h-px bg-gray-800 rounded-xl my-5 w-full mx-auto" />

                                {/* <!-- เกี่ยวกับ --> */}
                                <div className="bg-[--second-DarkMidnight] rounded-lg p-4">
                                    <h3 className="text-lg font-bold mb-4">
                                        About community
                                    </h3>
                                    <p className="text-sm text-slate-300">
                                        A platform for asking questions and
                                        sharing knowledge. The more you ask, the
                                        more you discover!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
