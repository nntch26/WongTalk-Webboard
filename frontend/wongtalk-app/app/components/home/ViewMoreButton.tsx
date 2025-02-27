
import React from 'react'

export default function ViewMoreButton({onClick} : {onClick: () => void} ) {
  return (
    <>
    {/* <!-- กดปุ่ม แล้วเปลี่ยนค่า t f ให้แสดงโพสเพิ่ม --> */}
    <button className="px-6 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700"
            onClick={onClick}> 
              View More
            <i className="fas fa-chevron-down ml-2"></i>
    </button>
        

    </>
  )
}
