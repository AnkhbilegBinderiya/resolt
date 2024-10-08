import React from 'react';
import { FaSquarespace } from "react-icons/fa6";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen animate-pulse gap-4">
        <FaSquarespace className="text-3xl text-primary"/>
        <p>loading</p>
    </div>
  );
};

export default LoadingSpinner;