import Link from "next/link";
import { React, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const CommentCard = ({comments}) => {
    const [block, setBlock] = useState(null);
    const [rate, setRate] = useState(null);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        return `${year}.${month}.${day} ${hours}:${minutes}`;
    }

    const href =  `/user/${comments.username}`;

    const commentId = comments.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedPick = Cookies.get(commentId);
                setBlock(storedPick);
                setRate(comments.rate)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [commentId, comments.rate]);

    const SaveRate = async () => {
        try {
            const response = await fetch(`http://localhost:6969/comment/rate/${commentId}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              }
            });
            setBlock(commentId);
            Cookies.set(commentId, comments.event_id);
            setRate(comments.rate + 1);
          } catch (error) {
            toast.error(`An error occurred: ${error.message}`);
        }
    };

    const Empty = () => {};

    return (
        <div className={`flex flex-col w-full py-4 px-8 text-xs my-2 rounded-lg gap-4 border-1 dark:border-white/10`}>
            <div className="w-full flex justify-between text-sm">
                <Link className=" font-bold underline underline-offset-4" href={href} >@{comments.username}</Link>
                <p className={`font-semibold ${comments.role == null ? ' text-black dark:text-white font-light' : comments.role == 1 ? ' text-black dark:text-white font-light' : comments.role == 2 ?  ' text-primary' : comments.role == 3 ?  'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text' : ' text-black dark:text-white font-light'}`}>{comments.role == null ? 'Uploading...' : comments.role == 1 ? '-' : comments.role == 2 ?  'Pro' : comments.role == 3 ?  'Premium' : '-'}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="text-xs dark:text-white/70">{comments.comment}</p>
            </div>
            <div className="w-full flex justify-between">
                <p>{formatDate(comments.createdAt)}</p>
                <button onClick={block != null ? Empty : SaveRate} className="py-2 px-4 border-1 dark:bg-labelDark rounded-md flex gap-2 items-center">
                    {block != null ?
                            <FaHeart className="text-red-600 text-md"/>
                            :
                            <FaRegHeart className="text-black dark:text-white"/>
                    } 
                    <p className="text-md">{rate}</p>
                </button>
            </div>
        </div>
  )
}

export default CommentCard