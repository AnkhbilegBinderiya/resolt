import { React, useEffect, useState } from 'react';
import CustomerComments from './CustomerComments/CustomerComments';
import NewComment from './NewComment/NewComment';
import authCheck from '@/utils/authCheck';

const Comment = ({ id }) => {
    const [comments, setComments] = useState([]);
    const [auth, setAuth] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await authCheck();
            if(!data){
                setAuth(false);
            }else{
                setAuth(true);
                setUserId(data.id);
            }
            try {
                const response = await fetch(`http://localhost:6969/comment/get/${id}`);
                if (!response.ok) {
                    console.error('not found');
                }
                const result = await response.json();
                setComments(result);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
    fetchData();
    }, [id]);

    const handleNewComment = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    if(auth){
        return (
            <div className="w-full flex flex-col p-4">
                <CustomerComments id={id} comments={comments}/>
                <NewComment id={id} userId={userId} onNewComment={handleNewComment}/>
            </div>
        );
    }else{
        return(
            <div className="w-full flex flex-col p-4">
                <CustomerComments id={id} comments={comments}/>
                <div className='flex gap-1 mx-auto'>
                    <p>You need to</p> 
                    <p className='text-primary font-semibold'>Login</p>
                </div>
            </div>
        );
    }
  

};

export default Comment;