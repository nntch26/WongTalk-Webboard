"use client";
import Image from "next/image";
import styles from "./components/styles/Maincontent.module.css";
import { useState, useEffect } from "react";

import { fetchPost } from "@/app/(home)/api/postServices";
import { Post } from "@/types/types";

import Sidebar from "./components/Sidebar";
import TopicList from "./components/home/TopicList";
import PostCard from "./components/home/PostCard";
import PostNew from "./components/home/PostNew";


export default function Home() {

  const [posts,setPosts] = useState<Post[]>([])
  
  useEffect (() => {
      const getposts = async() =>{
          try{
              const getdata = await fetchPost()
              console.log("data ",getdata)
              setPosts(getdata)


          }catch (error){
              console.log('Error fetching ',error)
          }
      }
      getposts()
  }, []);

  console.log("--->",posts)

  return (
    <>  
      <Sidebar/>

      {/* <!-- Main Content --> */}
      <div id="main-content" className="pt-16 ml-0 md:ml-64 transition-margin duration-300 ease-in-out">

        {/* <!-- Banner --> */}
        <div className="max-w-7xl mx-auto p-4 mt-8">
            <div className={`${styles.bannercus} rounded-xl p-6  max-w-7xl mx-auto`}>
                <h2 className="text-2xl md:text-4xl font-bold mb-2">Ask more, Discover more.</h2>
                <p className="text-sm md:text-base">"By asking questions, we not only seek answers for ourselves but also inspire others to share their insights, leading to new discoveries."</p>
            </div>
        </div>

        {/* <!-- ส่วน topic  --> */}
        <div className="max-w-6xl mx-auto px-4 mt-8 mb-4">
          <TopicList />
        </div>

        {/* <!-- ส่วนโพสอื่นๆ --> */}
        <div className="max-w-7xl mx-auto p-4">
            <h3 className="text-2xl md:text-4xl font-bold mb-8">Explore Communities</h3>
            
            <div className="flex flex-col lg:flex-row gap-6">
                
                {/* ฝั่งซ้าย โพส */}
                <div className="flex-1">
                  {/* <!-- Post  --> */}
                  {posts && posts.length > 0 ? (
                        posts.map((post) => {
                            console.log("Post Data:", post);  
                            return <PostCard key={post._id} post={post} />;
                        })
                    ) : (
                        <div>Loading...</div>
                    )}

                    
                    {/* <!-- ปุ่มดูเพิ่มเติม --> */}
                    <div className="text-center mt-6">
                        <button className="px-6 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700">
                            more
                            <i className="fas fa-chevron-down ml-2"></i>
                        </button>
                    </div>

                </div>


                {/* ฝั่งขวา sidenav  */}
                <div className="lg:w-80 space-y-4 hidden lg:block">
                {/* <!-- โพสใหม่ๆๆ -->    */}
                    <div className="max-w-md mx-auto mb-6">
                        <div className="flex space-x-4 mb-4">
                            <h6 className="text-green-400 border-b-2 border-green-400 pb-2">New Posts</h6>
                        </div>

                        {/* <!-- Posts list --> */}
                        <div className="space-y-4">
                            <PostNew/>

                        </div>

                        <hr className="border-0 h-px bg-gray-800 rounded-xl my-5 w-full mx-auto" />

                        {/* <!-- เกี่ยวกับ --> */}
                        <div className="bg-[--second-DarkMidnight] rounded-lg p-4">
                            <h3 className="text-lg font-bold mb-4">About community</h3>
                            <p className="text-sm text-slate-300">A platform for asking questions and sharing knowledge. The more you ask, the more you discover! </p>
                        </div>
                    </div>

                </div>
            </div>

            
        
        </div>





      </div>
      

      
    </>
  );
}
