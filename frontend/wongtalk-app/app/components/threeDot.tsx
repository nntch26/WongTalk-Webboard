"use client"

import React, { useState, useRef, useEffect } from "react";

export const ThreeDot: React.FC<{
    postId: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;

}> = ({ postId, onEdit, onDelete }) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleEdit = () => {
        onEdit(postId); // set id เพื่อเอาไปใช้ต่อ จะได้รู้ว่ากดมาจาก postid อะไร
        setIsOpen(false); // ถ้าเลือกแล้วจะปิด
    };

    const handleDelete = async () => {
        onDelete(postId); // set id เพื่อเอาไปใช้ต่อ จะได้รู้ว่ากดมาจาก postid อะไร
        setIsOpen(false); // ถ้าเลือกแล้วจะปิด
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false); // ปิด dropdown ถ้ากดข้างนอก
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <i
                className="fa-solid fa-ellipsis-vertical cursor-pointer text-gray-500 text-xl hover:text-[#E8E9EA] transition"
                onClick={toggleMenu}
            />
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute bg-[#1E293B] border border-[#374151] rounded-md shadow-md mt-1 right-5"
                >
                    <button
                        onClick={handleEdit}
                        className="text-green-500 text-sm block px-4 py-1 hover:font-bold rounded-md transition"
                    >
                        Edit
                    </button>
                    <a
                        href="/profile"
                        onClick={handleDelete}
                        className="text-red-500 text-sm block px-4 py-1 hover:font-bold rounded-md transition"
                    >
                        Delete
                    </a>
                </div>
            )}
        </div>
    );
};
