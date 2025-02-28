import React from 'react'

interface PopupType {
    onClose: () => void;
    onClick:()=> void;
    titletext:string
    subtext:string
    textbutton:string

}

export default function PopupModelSuccess({ onClose,onClick, titletext, subtext, textbutton }: PopupType) {
  return (
    <>
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="relative bg-[--hover-DarkCharcoal] p-6 rounded-md shadow-lg  text-center">

                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>

                <div className="mt-2 text-center sm:m-4 py-3">
                        
                        <div className="bg-gradient-to-r from-[#00FF7C] to-[#FCD34D] text-transparent bg-clip-text p-4">
                            <i className="fa-solid fa-circle-check text-xl md:text-6xl"></i>
                        </div>

                        <h4 className="text-lg font-medium text-[#E8E9EA]">
                            {titletext} 
                        </h4>
                        <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                            {subtext}
                        </p>
                        <div className="items-center gap-2 mt-3 flex flex-row">
                            
                            <button
                                className="w-full mt-2 p-2.5 flex-1 text-[--second-DarkMidnight] bg-[--primary-color] hover:bg-opacity-90 rounded-md outline-none ring-offset-2 ring-green-400 focus:ring-2"
                                onClick={onClick}>
                                {textbutton}
                            </button>
                        </div>
                    </div>
            </div>
        </div>

    </>
  )
}
