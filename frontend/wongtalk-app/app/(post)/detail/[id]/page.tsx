"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams, useRouter  } from 'next/navigation'

import { PostDetail, Topic, CommentData } from '@/types/types'

import { fetchPostDetail } from '@/app/api/postServices'
import { fetchTopic } from '@/app/api/topicServices'
import { AddComment } from '@/app/api/commentServices'
import { getToken } from '@/app/api/profileServices'

import TopicTag from '@/app/components/topic/TopicTag'
import TopicSidebar from '@/app/components/topic/TopicSidebar '
import PopupModalComment from '@/app/components/popup/PopupModalComment'

import styles from '@/app/components/styles/Maincontent.module.css'




export default function page() {
    const [post, setPost] = useState<PostDetail | null>(null)
    const [topic, setTopic] = useState<Topic| null>(null)
    const [topicList, setTopicList] = useState<Topic[]>([]);
    const [topicId, setTopicId] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const [error, setError] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // จำลองสถานะล็อกอิน
    const [showModal, setShowModal] = useState(false);
    const router = useRouter()


    // แกะ id จาก url params ที่ส่งมา {id: '67b9e00b487e6cfbd13c01b1'}
    const { id } = useParams() as {id:string}; // ID เปน string
    console.log("page param:",id)

    // ดึง post detail
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

    // สร้างคอมเม้น
    const addComment = async()=>{
        try {
            const commentData:CommentData = {
                postId: post?.Post[0]._id || "",
                content: content,
            };

            console.log("commentData -> ",commentData)
            const savedata  = await AddComment(commentData)

            // ถ้าสร้างคอมมเม้นได้
            if(savedata){
                console.log('Comment successfully created:');
                setContent("");
            }
        } catch (error) {
            console.error('Error creating Comment:', error);
        }

    }

     // กดเลือก topic ในหน้านี้
    const handleClickTopic = (e:React.MouseEvent, id:string) =>{
        e.preventDefault(); // ทำให้ไม่รีเฟรชหน้า
        
        sessionStorage.setItem("itopic_id", id)
        router.push('/topic/')
    }

    // กดคอมเม้นโพส
    const handleSubmitComment = (e: React.FormEvent) =>{
        e.preventDefault(); // ทำให้ไม่รีเฟรชหน้า
        if (!content) {
            setError("Please fill in all fields.");
            return;
        } 
        
        addComment() // โยนไปฟฟังก์ชัน เพิ่มคอมเม้น

    }

    // เช็คว่า user login หรือไม่
    const checkUserLogged = async () => {
        const loggedIn = await getToken(); 
        
        if (!loggedIn) {
            // ไม่สามารถgเม้นได้ถ้า user ยังไม่ login
            console.log("User is not logged in.");
            return; 
        }else{
            console.log("User is logged in.");
            setIsLoggedIn(true)
            return; 
        }

    }

    // เช็คว่า loggin ยัง
    const handleFocus = () => {
        if (!isLoggedIn) {
            setShowModal(true); // ตั้งให้โชว์ popup
        }else{
            // ถ้าล็อคอิน ก้เม้นได้ ให้โชว์ปุ่ม
            setIsFocused(true)
        }
        
    };

    useEffect(() => {
      getPostDetail(id)
      getTopicList()
      checkUserLogged() // เช้คก่อนว่า login ยัง
      

    }, [post]); // ถ้าโพส หรือ คอมเม้นเปลี่ยนแปลง ให้รันใหม่
  
    useEffect(() => {
      console.log("topicid:", topicId)

      if (topicId) { // เช็ค topicId มีค่ายัง แล้วค่อยเรียก
          getTopicOne(topicId);
      }
      
    }, [topicId]);  // เรียกตอน setTopicId ใน getPostDetail แล้ว
  
  console.log("topic->>:", topic)
  console.log("allcommment ->>:", post?.allComments)

  return (

    <>
    {/* <!-- ส่วน  conetnt --> */}
  
  <div className="container mx-auto mt-28">
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
              <div className="bg-[--hover-DarkCharcoal] rounded-xl p-4 lg:p-8 mb-4">
                  {/* <!-- profile --> */}
                    <div className="flex items-start mb-6">
                        <div className="w-full">
                            <div className="flex items-center gap-3">
                                <img src={`/uploads/${post.Post[0].userId.image}`} alt="Avatar" className="w-10 h-10 rounded-full" />
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

                  <hr className="border-0 h-px bg-gray-800 rounded-xl my-2 w-full mx-auto" />

              </div>
            
            
              {/* <!-- ส่วน Comment --> */}
              <div id='allcomment' className="flex-1 mt-8">

                  {/* <!-- All Comments --> */}
                  <div className="p-4 lg:p-8 mb-4 bg-[--hover-DarkCharcoal] rounded-xl">
                      <div className="flex items-center mb-6 ml-4">
                          <i className="fa-regular fa-comment-dots text-lg md:text-3xl"></i>
                          <span>
                              <h3 className="text-lg md:text-3xl font-semibold text-gray-200 ml-2">All Comments</h3>
                          </span>
                      </div>

                      {error && (<div className="error text-red-500">{error}</div>) }

                      {/* <!-- Comment input --> */}
                      <form onSubmit={handleSubmitComment}>

                            <div className='flex  gap-4 mb-4'>
                                <img src="#" alt="Avatar" className="w-10 h-10 rounded-full bg-slate-500" />
                                <textarea className={`${styles.comment} w-full p-4 mb-2`} 
                                    name="text" rows={3} 
                                    placeholder="Type comment here... "
                                    value={content || ''}
                                    onChange={(e) => setContent(e.target.value)}
                                    onFocus={handleFocus} // ถ้าคลิกให้โชว์ปุ่ม
                                    onBlur={(e) => !e.target.value && setIsFocused(false)} // ซ่อนปุ่มถ้าไม่มีข้อความไร
                                    readOnly={!isLoggedIn} // พิมไม่ได้ ถ้ายังไม่ล็อคอิน
                                ></textarea>
                            </div>

                            {isFocused &&(
                                <div className="text-right">
                                    <button type='submit' className="px-4 py-2 bg-green-400 text-gray-900 font-semibold rounded-lg hover:bg-green-600">Post</button>
                                </div>
                            )}
                      </form>

                    {/* โชว์ตอน user จะคอมเม้น แต่ยังไม่ login */}
                      {showModal && <PopupModalComment onClose={() => setShowModal(false)} />}

                      <hr className="border-0 h-px bg-gray-800 rounded-xl my-5 w-full mx-auto" />

                      {/* <!-- all comment --> */}
                        {/* card คอมเม้นคนอื่น */}
                    {post.allComments.length > 0 ? (
                        post.allComments.map((commentother) => (
                            <div className="p-4 mb-6 border border-solid rounded-lg border-gray-500"
                                >
                                <div className="flex items-start">
                                    <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                        <img
                                            src={`/uploads/${commentother.userId.image}`}
                                            alt="Avatar"
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <div className="text-sm md:text-base text-[--primary-color]">
                                            {commentother.userId.fullname}</div>
                                            <div className="text-gray-500 text-sm md:text-md">
                                            {commentother.createdAt}
                                            </div>
                                        </div>
                                        </div>

                                        {/* แก้ไขและลบคอมเมนต์ */}
                                        <div>
                                            <button className="text-blue-600 font-semibold hover:underline">
                                            Edit
                                        </button>
                                        <button className="text-red-600 font-semibold hover:underline">
                                            Delete
                                        </button>
                                        </div>
                                    </div>

                                    <p className="mt-2 text-white break-words text-sm md:text-md">{commentother.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                        ) : (
                        <p>No comments available</p>
                        )}
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
