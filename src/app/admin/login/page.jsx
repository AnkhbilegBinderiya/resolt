"use client";

import React, { useState } from "react";
import { NextUIProvider, Input, Button } from "@nextui-org/react";
import { IoMail, IoPerson, IoKey, IoEye, IoEyeOff } from "react-icons/io5";
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import { fetchUserRole } from '../../../utils/fetchUserRole'
import { BsHandThumbsDownFill } from "react-icons/bs";
import authLogin from "@/utils/authLogin";

const LoginPage = () => {
  const { contextToken } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!email || !password ) {
        return;
      }

      const response = await authLogin(email, password)
      if (!response) {
        toast.error(`Sorry failed`, {position: 'top-center', autoClose: 1000  });
      }else{
        if(response.active == 1 && response.role > 8000){
          contextToken(response.token);
          window.location.href = `/admin/panel`;
        }else{
          toast.error(`Sorry failed`, {position: 'top-center', autoClose: 1000  });
        }
      }
    };

  return (
    <NextUIProvider>  
      <div className='flex flex-col md:flex-row w-full z-30 md:gap-4 pt-16 h-screen bg-white dark:bg-dark justify-start md:justify-center md:items-center items-start'>
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="flex flex-row w-full gap-4 md:justify-center">
              <div className="flex flex-col w-full min-w-96 md:w-1/2 bg-white dark:bg-widgetDark rounded-lg p-12 justify-center gap-4">
                <Input
                  label="Your ID"
                  labelPlacement="outside"
                  placeholder="Enter your ADMIN id"
                  variant="bordered"
                  size="md"
                  startContent={<IoMail className="text-default-400 pointer-events-none flex-shrink-0" />}
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
                        <IoEyeOff className="text-default-400 pointer-events-none" />
                      ) : (
                        <IoEye className="text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  startContent={<IoKey className="text-default-400 pointer-events-none flex-shrink-0" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button color="primary" type="submit">
                  Login
                </Button>
              </div>
          </form>
        </div>
      </div>
    </NextUIProvider>
  );
};

export default LoginPage;