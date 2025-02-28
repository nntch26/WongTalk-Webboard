
import React from 'react'

export default function ErrorText({error} : {error:string}) {
  return (
    <>
    <div className="error text-red-500 mb-2">
        <i className="fa-solid fa-circle-exclamation mr-2"></i>
        {error}
    
    </div>
    </>
  )
}
