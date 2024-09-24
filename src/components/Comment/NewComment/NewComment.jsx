"use client"

import { React, useEffect, useState } from 'react'
import {Textarea} from "@nextui-org/react";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { fetchUserId } from '../../../utils/fetchUserId'
import { useAuth } from '../../../context/AuthContext';

const NewComment = ({id, userId, onNewComment}) => {
    const [customerId, setCustomerId] = useState(userId);
    const [eventId] = useState(id);
    const [comment, setComment] = useState();
    const { username } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get("token");
            const fetchedId = await fetchUserId(token);
            setCustomerId(fetchedId)
        };
        fetchData();
    }, [id, userId]);

    const Save = async () => {

        const payload = {eventId: eventId, customerId : customerId, comment};
        try {
            const response = await fetch("http://localhost:6969/comment/save", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });
    
            if (response.ok) {
                const newComment = await response.json();
                setComment("");
                
                onNewComment(newComment.user);
            } else {
              const errorData = await response.json();
              toast.error(`${errorData.message}`, {position: 'top-center'});
            }
          } catch (error) {
            toast.error(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-col w-full rounded-lg px-2 gap-4">
                <Textarea
                    label={`${username} what's on Your Mind?`}
                    labelPlacement="outside"
                    placeholder="Your comment"
                    variant={`bordered`}
                    size="md"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={Save} className=" text-black text-xs rounded-lg py-2 w-36 ml-auto font-semibold bg-primary">
                    Comment
                </button>
        </div>
  )
}

export default NewComment