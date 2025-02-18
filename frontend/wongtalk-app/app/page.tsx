import Image from "next/image";
import styles from "./components/styles/Maincontent.module.css";

import Sidebar from "./components/Sidebar";
import TopicList from "./components/home/TopicList";

export default function Home() {
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
        <div className="max-w-6xl mx-auto px-4 mt-8">
          <TopicList />
        </div>

        {/* <!-- ส่วนโพสอื่นๆ --> */}
        <div className="max-w-7xl mx-auto p-4">
            <h3 className="text-2xl md:text-4xl font-bold mt-8">Explore Communities</h3>
            
        
        </div>





      </div>
      

      
    </>
  );
}
