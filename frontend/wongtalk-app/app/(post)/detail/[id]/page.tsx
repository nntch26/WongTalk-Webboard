"use client"
import Link from 'next/link'
import { fetchPostDetail } from '@/app/api/postServices'
import { useState, useEffect } from 'react'
import { PostDetail, Topic } from '@/types/types'
import { useParams } from 'next/navigation'
import { fetchPostTopic, fetchPostTopicTop, fetchTopic } from '@/app/api/topicServices'

import TopicTag from '@/app/components/topic/TopicTag'
import TopicSidebar from '@/app/components/topic/TopicSidebar '
import styles from '@/app/components/styles/Maincontent.module.css'
import { useRouter } from "next/navigation";


export default function page() {
    const [post, setPost] = useState<PostDetail | null>(null)
    const [topic, setTopic] = useState<Topic| null>(null)
    const [topicList, setTopicList] = useState<Topic[]>([]);
    const [topicId, setTopicId] = useState<string>("");
    const router = useRouter()


    // แกะ id จาก url params ที่ส่งมา {id: '67b9e00b487e6cfbd13c01b1'}
    const { id } = useParams() as {id:string}; // ID เปน string
    console.log("page param:",id)


    const getPostDetail = async (postid:string) => {
        try{
            const getpost = await fetchPostDetail(postid)
            console.log("get post detail All: ", getpost)
            console.log("get post detail: ", getpost.Post[0])
            console.log("get id topic : ", getpost.Post[0].topicId._id)

            setPost(getpost)
            setTopicId(getpost.Post[0].topicId._id)
            
        }catch(error){
        console.log(error)
        }
    }

    // ดึงข้อมูล topic หลายๆอัน
    const getTopicList = async() =>{
        try{
            const getdata = localStorage.getItem("topics"); // ดึงข้อมูลจาก localStorage

            if (getdata) {
                setTopicList(JSON.parse(getdata));  // ถ้ามีข้อมูลใน localStorage แล้ว ก้ใช้ข้อมูลนั้น
                console.log('Fetched topics:', getdata);
            }

        }catch(error){
            console.error('Error fetching topics', error)
        }
    }

    // ดึง topic อันเดียว
    const getTopicOne = async(id:string) =>{

        try{
            const response = await fetchTopic(id)
            console.log("Topic One:", response.data[0]);
            setTopic(response.data[0]) // ดึงส่วน data 

        }catch(error){
            console.log(error)
        }
    }

     // กดเลือก topic ในหน้านี้
    const handleClickTopic = (e:React.MouseEvent, id:string) =>{
        e.preventDefault(); // ทำให้ไม่รีเฟรชหน้า
        
        sessionStorage.setItem("itopic_id", id)
        router.push('/topic/')
    }


    useEffect(() => {
      getPostDetail(id)
      getTopicList()
    }, [id]); // เรียกเมื่อ id เปลี่ยนแปลง
  
  

    useEffect(() => {
      console.log("topicid:", topicId)

      if (topicId) { // เช็ค topicId มีค่ายัง แล้วค่อยเรียก
          getTopicOne(topicId);
      }
      
    }, [topicId]);  // เรียกตอน setTopicId ใน getPostDetail แล้ว
  
  console.log("topic->>:", topic)


  return (

    <>
    {/* <!-- ส่วน  conetnt --> */}
  
  <div className="container mx-auto mt-32">
      {/* <!-- ปุ่มย้อนกลับ --> */}
      <div className="flex items-center mb-4 mt-8 ml-4">
        <Link href={'/'} className="flex items-center text-l md:text-xl text-while hover:text-green-400">
          <i className="fas fa-chevron-left"></i>
          <span className="ml-2">Back</span>
        </Link>
      </div>
    
      {/* <!-- Main post --> */}

      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-6">
          
          {/* <!-- Left Post --> */}
          {post &&(
            <div className="flex-1">
              {/* Post Detail */}
              <div className="bg-[--second-DarkMidnight] rounded-xl p-4 lg:p-8 mb-4">
                  {/* <!-- profile --> */}
                  <div className="flex items-start mb-3">
                    <div className="w-full">
                        <div className="flex items-center gap-3">
                            <img src="#" alt="Avatar" className="w-10 h-10 rounded-full" />
                            <div>
                                <div className="text-sm md:text-base text-[--primary-color]">{post.Post[0].userId.fullname}</div>
                                <div className="text-gray-500 text-sm md:text-md">{post.Post[0].time}</div>
                            </div>
                        </div>
                    </div>
                  </div>

                  {/* <!-- content post --> */}
                  <div className="mb-3 text-while">
                      <h1 className="text-xl md:text-4xl font-bold mb-3">{post.Post[0].title}</h1>

                     {/* <!-- Topic tag--> */}
                      <TopicTag key={post.Post[0].topicId._id} post={post.Post[0]} />


                      <p className="text-xs md:text-base">{post.Post[0].content} </p>
                  
                  </div>

                  {/* <!-- Post Actions --> */}

                  <div className="flex items-center gap-4 text-gray-400 mt-10">
                      <button className="flex items-center gap-2 hover:text-green-400 px-2 py-1 rounded">
                          <i className="fa-solid fa-hands-clapping"></i>
                          <span>{post.Post[0].likes}  Likes</span>
                      </button>
                      <a href='#allcomment' className="flex items-center gap-2 hover:text-green-400 px-2 py-1 rounded">
                          <i className="fa-regular fa-comment-dots"></i>
                          <span>{post.Post[0].commentCount}   Comments</span>
                      </a>
                  </div>

                  <hr className="border-0 h-px bg-gray-800 rounded-xl my-5 w-full mx-auto" />

              </div>
            
            
              {/* <!-- ส่วน Comment --> */}
              <div id='allcomment' className="flex-1 mt-8">

                  {/* <!-- Comment input --> */}
                  <div className="p-4 lg:p-8 mb-4 bg-[--second-DarkMidnight] rounded-xl">
                      <div className="flex items-center mb-6 ml-4">
                          <i className="fa-regular fa-comment-dots text-lg md:text-3xl"></i>
                          <span>
                              <h3 className="text-lg md:text-3xl font-semibold text-gray-200 ml-2">All Comments</h3>
                          </span>
                      </div>
                      <form action="#" method="POST">
                          <div className='flex  gap-4 mb-4'>
                            <img src="#" alt="Avatar" className="w-10 h-10 rounded-full bg-slate-500" />
                            <textarea className={`${styles.comment} w-full p-4 mb-2`} name="text" rows={3} placeholder="Type comment here... " ></textarea>
                          </div>
                          <div className="text-right">
                            <button type='submit' className="px-4 py-2 bg-green-400 text-gray-900 font-semibold rounded-lg hover:bg-green-600">Post</button>
                          </div>
                      </form>

                      <hr className="border-0 h-px bg-gray-800 rounded-xl my-5 w-full mx-auto" />

                      {/* <!-- all comment --> */}
                      <div className="mt-10 p-4 lg:p-8 mb-6 border border-solid rounded-lg border-gray-500">
                          <div className="flex items-start">
                              
                              <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                      <div className="post-header flex items-center">
                                          <img src="user.png" alt="Avatar" className="avatar p-1 w-10 rounded-full"/>
                                          <div className="post-meta ml-3">
                                              <div className="author-name text-sm md:text-base">Jess Lee for The DEV Team</div>
                                              <div className="post-date text-sm md:text-base">Jan 1</div>
                                          </div>
                                      </div>
                                      <form action="#" method="POST" className="inline">
                                        <input type="hidden" name="delete" value="{{i.id}}"/>
                                        <button type="submit" className="text-blue-600 font-semibold hover:underline">edit</button>
                                        <button type="submit" className="text-red-600 font-semibold hover:underline">Delete</button>
                                      </form>
                                  </div>
                                  <p className="mt-2 text-while break-words">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus quaerat doloribus repudiandae, minima cum hic, perferendis unde tempora quasi deserunt enim expedita.</p>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>

          </div>
          )}

          {/* <!-- Right Sidebar --> */}
          {topic &&(
            <TopicSidebar 
            topic={topic} 
            topiclist={topicList} 
            onClickTopic={handleClickTopic} 
            />
          )}

      </div> 
  </div>

    </>
  )
}
