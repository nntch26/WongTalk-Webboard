
// เช็คว่า  login ยัง

import { useState, useEffect } from "react"
import { User } from "@/types/types"

export const useAuth = ()=>{

    const [currentUser, setcurrentUser] = useState<User |null>(null)
    const [islogin, setIslogin] = useState<boolean>(false) // ตัวเช็คว่า login ยัง


    useEffect(()=>{

        const userdata = localStorage.getItem('userdata')
        if(userdata){
            const getuser = JSON.parse(userdata) //แปลง json
            setcurrentUser(getuser)
            setIslogin(true)

        }
    }, [])

    return {currentUser, islogin}

}