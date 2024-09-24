import { React, useEffect, useState } from 'react';
import { useAuth } from '../../../src/context/AuthContext';
import CustomerComments from './CustomerComments/CustomerComments';
import NewComment from './NewComment/NewComment';
import { fetchUserId } from '../../utils/fetchUserId'

const Comment = ({ id }) => {
    const [comments, setComments] = useState([]);
    const { token } = useAuth();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
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
            const fetchedId = await fetchUserId(token);
            setUserId(fetchedId)
        };
    fetchData();
    }, [id, token]);

    const handleNewComment = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    if(token){
        return (
            <div className="w-full flex flex-col p-4">
                <CustomerComments id={id} comments={comments}/>
                <NewComment id={id} userId={userId} onNewComment={handleNewComment}/>
            </div>
        );
    }else{
        return(
            <div className="w-full flex flex-col p-4">
                <CustomerComments id={id}/>
                <div className='flex gap-1 mx-auto'>
                    <p>You need to</p> 
                    <p className='text-primary font-semibold'>Login</p>
                </div>
            </div>
        );
    }
  

};

export default Comment;