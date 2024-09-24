"use client"

import { React, useEffect, useState } from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
// import Image from 'next/image'
import { Image } from "@nextui-org/react";
import CommentCard from '../CommentCard/CommentCard';

const CustomerComments = ({id, comments}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(comments || []);  // Ensure `comments` is an array
    }, [id, comments]);

    return (
        <div className="flex flex-col w-full rounded-lg">
            <ul>
                  {data.length > 0 ? (
                    data.map((item) => (
                      <div className='flex flex-col w-full' key={item.id}>
                        <div className="w-full px-2">
                          <CommentCard comments={item} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">No comments yet.</div>
                  )}
            </ul>
        </div>
  )
}

export default CustomerComments