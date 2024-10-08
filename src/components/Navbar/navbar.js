"use client"

import Link from "next/link";
import Image from 'next/image'
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaBarsStaggered, FaX  } from "react-icons/fa6";
import { useAuth } from '../../context/AuthContext';
import DarkModeToggle from '../../components/DarkModeToggle';
import Cookies from 'js-cookie';
import {authCheck} from '@/utils/authCheck'

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState(false);
  const [username, setUserName] = useState("Profile");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        try {
          const data = await authCheck();
          if(data){
            setUserName(data.username);
            setUser(true);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setUser(false);
        }
      } catch (error) {
          console.log(error)
      }
    };
    fetchData();
  }, []);

  const links = [
    {
      id: 1,
      link: "Special",
      href: "/special",
    },
    {
      id: 2,
      link: "Sportbook",
      href: "/sportbook",
    },
    {
      id: 3,
      link: "AI support",
      href: "/prediction",
    },
  ];

  return (
    <div className="bg-white dark:bg-widgetDark flex justify-between items-center w-full h-12 md:px-24 px-4 text-black backdrop-blur-md fixed nav z-10">
      <div className="mix-blend-difference">
        <a href="/" ><Image
                src='/assets/image/Logo-white.png'
                alt="ResoltX Logo"
                width={120} 
                height={50}
                priority={true}
                automatically="true" provided="true"
                style={{ width: '100%', height: 'auto'}}
        /></a>
      </div>

      <ul className="hidden lg:flex">
        {links.map(({ id, link, href }) => (
          <li
            key={id}
            className="nav-links px-12 cursor-pointer capitalize font-semibold text-black dark:text-white hover:font-medium hover:text-primary duration-200 link-underline text-xs"
          >
            <a href={href}>{link}</a>
          </li>
        ))}
        
      </ul>


      <div className="flex gap-8">
        <DarkModeToggle />
        {user ? (
            <a className="hidden lg:block text-black bg-primary hover:scale-105 duration-200 font-semibold py-2 px-6 rounded-md text-xs" href={`/user/${username}`}>
              {username}
            </a>
        ) : (
            <a className="hidden lg:block border-1 text-white bg-[#11181C] dark:bg-widgetDark font-semibold py-2 px-6 rounded-md text-xs" href="/auth/login">
              Login
            </a>
        )}
      </div>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-secondary lg:hidden"
      >
        {nav ? <FaX size={16} className="text-black dark:text-white" /> : <FaBarsStaggered size={16} className="text-black dark:text-white" />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-white backdrop-blur-2xl text-black dark:text-white dark:bg-black">
          {links.map(({ id, link, href }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-4 text-sm font-medium"
            >
              <Link onClick={() => setNav(!nav)} href={href}>
                {link}
              </Link>
            </li>
          ))}
          <li className="px-4 py-4 text-sm font-medium">
            {user ? (
                <a className=" text-black bg-primary hover:scale-105 duration-200 font-semibold py-2 px-6 rounded-md text-xs" href="/user/14">
                  {username}
                </a>
            ) : (
                <a className=" text-white bg-[#11181C] hover:scale-105 duration-200 font-semibold py-2 px-6 rounded-md text-xs" href="/auth/login">
                  Login
                </a>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;