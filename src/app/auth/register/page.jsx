"use client";

import React, { useState } from "react";
import {NextUIProvider, Input, Checkbox,Button} from "@nextui-org/react";
import { IoMail, IoPerson, IoKey, IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from 'react-toastify';
import LoadingSpinner from "@/components/Loading/loading";
import authRegister from "@/utils/authRegister";
import emailSend from "@/utils/emailSend";
import emailVerify from "@/utils/emailVerify";

const RegisterPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [verifyScreen, setVerifyScreen] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [loading, setLoading] = useState(true);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const verifyCodeFromUser = async (e) => {
    e.preventDefault();

    if(!verifyCode){
      toast.warning("Please fill code label", {position: 'top-center'});
      return;
    }

    const response = await emailVerify(email, verifyCode);

    try {
      const data = await response.json();

      if (!response.ok) {
        toast.warning(data.message || 'An error occurred', { position: 'top-center' });
      } else {
        handleSubmit(e);
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      toast.error('Failed to process the response.', { position: 'top-center' });
    }
  }

  const verifySubmit = async (e) => {
    e.preventDefault();

    if (!isCheckboxChecked) {
      toast.warning("Please confirm Terms and Conditions.", {position: 'top-center'});
      return;
    }
    if (!email || !username || !password || !confirmPassword) {
      toast.warning("Please fill out all fields.", {position: 'top-center'});
      return;
    }
    if (password !== confirmPassword) {
      toast.warning("Passwords do not match.", {position: 'top-center'});
      return;
    }

    const response = await emailSend(email, username);

    try {
      const data = await response.json();
    
      if (!response.ok) {
        toast.warning(data.message || 'An error occurred', { position: 'top-center' });
      } else {
        setVerifyScreen(true);
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      toast.error('Failed to process the response.', { position: 'top-center' });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isCheckboxChecked) {
      toast.warning("Please confirm Terms and Conditions.", {position: 'top-center'});
      return;
    }
    if (!email || !username || !password || !confirmPassword) {
      toast.warning("Please fill out all fields.", {position: 'top-center'});
      return;
    }
    if (password !== confirmPassword) {
      toast.warning("Passwords do not match.", {position: 'top-center'});
      return;
    }

    const response = await authRegister(email, password, username)

    if(!response){
      toast.error(response.message, {position: 'top-center'})
    }else{
      window.location.href = "/auth/login"; 
    }
  };

  const handleLogout = () => {
      window.location.href = `/auth/login`; 
  };

  if (!verifyScreen) {
    return (
    <NextUIProvider>
      <div className='flex flex-col md:flex-row w-full z-30 md:gap-4 pt-16 h-screen justify-start md:justify-center md:items-center items-start'>
        <div className="w-full md:w-1/2">
          <form onSubmit={verifySubmit} className="flex flex-row w-full gap-4 md:justify-center">
            <div className="flex flex-col w-full min-w-[16rem] md:min-w-[32rem] xl:w-2/4 bg-white dark:bg-widgetDark rounded-xl p-12 justify-center gap-4 shadow-lg shadow-black/20">
                <Input
                  type="email"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Enter your Email"
                  variant="bordered"
                  size="md"
                  aria-label="resoltx"
                  startContent={<IoMail className="text-black dark:text-white pointer-events-none flex-shrink-0" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Username"
                  labelPlacement="outside"
                  placeholder="Enter your Username"
                  variant="bordered"
                  size="md"
                  aria-label="resoltx"
                  startContent={<IoPerson className="text-black dark:text-white pointer-events-none flex-shrink-0" />}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  label="Create new password"
                  labelPlacement="outside"
                  placeholder="Your password"
                  variant="bordered"
                  size="md"
                  aria-label="resoltx"
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
                <Input
                  label="Repeat password"
                  labelPlacement="outside"
                  placeholder="Your password"
                  variant="bordered"
                  aria-label="resoltx"
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Checkbox
                  defaultSelected={isCheckboxChecked}
                  size="md"
                  className="text-xs"
                  onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                >
                  <p className="text-xs">
                    I confirm that I am over 18 years old and agree to the{" "}
                    <a href="" className="text-xs underline underline-offset-4">
                      Terms and Conditions
                    </a>
                  </p>
                </Checkbox>
                <Button color="primary" type="submit">
                  Register
                </Button>
                <Button variant="bordered" onClick={handleLogout}>
                  Login
                </Button>
            </div>
          </form>
        </div>
        {/* <div className="w-full hidden md:flex md:flex-col md:w-1/2 h-screen bg-black justify-center text-left pl-12">
            <p className="text-9xl text-primary font-bold text-left">ResoltX</p>
            <p className="text-5xl text-primary font-medium text-left">Welcome to the Future of Sports</p>
        </div> */}
      </div>
    </NextUIProvider>
  );
  }else{
    return(
      <NextUIProvider>
      <div className='flex flex-col md:flex-row w-full z-30 md:gap-4 pt-16 h-screen justify-start md:justify-center md:items-center items-start'>
        <div className="w-full md:w-1/2">
      <form onSubmit={verifyCodeFromUser} className="flex flex-row w-full gap-4 md:justify-center">
            <div className="flex flex-col w-full min-w-[16rem] md:min-w-[32rem] xl:w-2/4 bg-white dark:bg-widgetDark rounded-xl p-12 justify-center gap-4 shadow-lg shadow-black/20">
                <p>We send your {email} mail to verify code please check and verify your email address</p>
                 <Input
                  label="Verify Code"
                  labelPlacement="outside"
                  placeholder="Email verify code"
                  variant="bordered"
                  size="md"
                  startContent={<IoMail className="text-black dark:text-white pointer-events-none flex-shrink-0" />}
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  aria-label="resoltx"
                />
                <Button color="primary" type="submit">
                  Verify
                </Button>
            </div>
          </form>
          </div>
      </div>
    </NextUIProvider>
    )
  }
};

export default RegisterPage;