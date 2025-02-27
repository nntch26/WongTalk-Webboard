
// เช็คว่า  login ยัง

import { useState, useEffect } from "react"
import { User } from "@/types/types"
import { getToken } from "../api/profileServices"

export const useAuth = ()=>{

    const [currentUser, setcurrentUser] = useState<User |null>(null)
    const [islogin, setIslogin] = useState<boolean>(false) // ตัวเช็คว่า login ยัง


    useEffect(() => {
        const fetchDataUser = async () => {
        // const userdata = localStorage.getItem('userdata')
        const userdata = await getToken() // เช็คว่ามี token มั้ย
        if(userdata){
            const userdatalocal = localStorage.getItem('userdata') // ดึงข้อมูล user จาก local

            if (userdatalocal) {
                const getuser = JSON.parse(userdatalocal) //แปลง json
                setcurrentUser(getuser)
                setIslogin(true)
            }
        }
    }
    fetchDataUser()
    }, [])

    return {currentUser, islogin}

}