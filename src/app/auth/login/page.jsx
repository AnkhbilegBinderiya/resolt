"use client";

import React, { useState } from "react";
import { NextUIProvider, Input, Button } from "@nextui-org/react";
import { IoMail, IoPerson, IoKey, IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from 'react-toastify';
import Image from 'next/image'
import { FaSadCry } from "react-icons/fa";
import { BsEmojiFrownFill } from "react-icons/bs";
import Cookies from "js-cookie";
import { useAuth } from '@/context/AuthContext'
import authLogin from "@/utils/authLogin";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { contextToken } = useAuth();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!email || !password ) {
        toast.warning("Sorry fill all", {position: 'top-left', icon: <BsEmojiFrownFill className='text-primary'/> });
        return;
      }

      const response = await authLogin(email, password)

      if (!response) {
        toast.error(`Email or Password is wrong`, {position: 'top-center', icon: <FaSadCry className='text-red-600'/>, autoClose: 1000  });
      }else{
        if(response.active == 1){
          contextToken(response.token);
          window.location.href = `/user/${response.user}`;
        }else{
          toast.error(`Email or Password is wrong`, {position: 'top-center', icon: <FaSadCry className='text-red-600'/>, autoClose: 1000  });
        }
      }
    };

  const handleLogout = () => {
      window.location.href = `/auth/register`; 
  };

  return (
    <NextUIProvider>  
      <div className="flex flex-col md:flex-row w-full z-30 md:gap-4 pt-16 h-screen justify-start md:justify-center md:items-center items-start">
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="flex flex-row w-full gap-4 md:justify-center">
            <div className="flex flex-col w-full min-w-[16rem] md:min-w-[32rem] xl:w-2/4 border dark:border-white/20 bg-white dark:bg-widgetDark text-black dark:text-white p-12 justify-center gap-4 rounded-xl shadow-lg shadow-black/20">
                <Input
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Enter your email"
                  variant="bordered"
                  size="md"
                  startContent={<IoMail className="text-black dark:text-white pointer-events-none flex-shrink-0" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Password"
                  labelPlacement="outside"
                  placeholder="Enter your password"
                  variant="bordered"
                  size="md"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <IoEyeOff className="text-black dark:text-white pointer-events-none" />
                      ) : (
                        <IoEye className="text-black dark:text-white pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  startContent={<IoKey className="text-black dark:text-white pointer-events-none flex-shrink-0" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button color="primary" type="submit">
                  Login
                </Button>
                <Button variant="bordered" onClick={handleLogout}>
                  Register
                </Button>
              </div>
          </form>
        </div>
        {/* <div className="w-full hidden md:flex md:flex-col md:w-1/2 h-screen bg-gradient-to-r from-black to-gray-950 justify-center text-left pl-12 bg-repeat">
            <p className="text-9xl text-primary font-extrabold text-left">ResoltX</p>
            <p className="text-5xl text-primary font-extralight text-left">Welcome to the Future of Sports</p>
        </div> */}
      </div>
    </NextUIProvider>
  );
};

export default LoginPage;