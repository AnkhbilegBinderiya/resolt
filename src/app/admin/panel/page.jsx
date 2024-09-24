"use client";

import React, { useState,useEffect } from "react";
import { NextUIProvider, Input, Button } from "@nextui-org/react";
import Cookies from 'js-cookie';
import { FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoChatbox } from "react-icons/io5";
import { FaDatabase } from "react-icons/fa6";
import { IoIosBasketball } from "react-icons/io";

import { useAuth } from '../../../context/AuthContext';
import { fetchUserRole } from '../../../utils/fetchUserRole'
import { toast } from 'react-toastify';
import RequestHeader from "@/components/Admin/Request/RequestHeader/RequestHeader";
import DatabaseHeader from "@/components/Admin/Database/DatabaseHeader/DatabaseHeader";
import { useRouter } from 'next/navigation'
import PredictionHeader from "@/components/Admin/Prediction/PredictionHeader/PredictionHeader";
import { BsHandThumbsDownFill } from "react-icons/bs";
import { FaHand } from "react-icons/fa6";

const menus = [
    {
      name: "Home",
      logo: "/assets/logo/flags/spain.png",
      icon: <GoHomeFill size={24}/>
    },
    {
      name: "Request",
      logo: "/assets/logo/flags/usa.png",
      icon: <IoChatbox size={24}/>
    },
    {
      name: "Database",
      logo: "/assets/logo/flags/usa.png",
      icon: <FaDatabase size={24}/>
    },
    {
      name: "User",
      logo: "/assets/logo/flags/usa.png",
      icon: <FaUser size={24}/>
    },
    {
      name: "Prediction",
      logo: "/assets/logo/flags/usa.png",
      icon: <IoIosBasketball size={24}/>
    }
  ];

const PanelPage = () => {
    const [selectedMenu, setSelectedMenu] = useState("Home");
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { username } = useAuth();

    useEffect(() => {
      const checkUserRole = async () => {
        const token = Cookies.get('token');
        if (token) {
          const fetchedRole = await fetchUserRole(token);
          if (fetchedRole > 8000) {
            setRole(fetchedRole);
            toast.success(`Welcome`, { position: 'top-center', icon: <FaHand className='text-green-600'/>, autoClose: 1000 });
            setLoading(false)
          } else {
            toast.error('STOP THAT SHIT!', { position: 'top-center', icon: <BsHandThumbsDownFill className='text-red-600'/>, autoClose: 1000  });
            router.push('/');
          }
        } else {
          toast.error('STOP THAT SHIT!', { position: 'top-center', icon: <BsHandThumbsDownFill className='text-red-600'/>, autoClose: 1000  });
          router.push('/');
        }
      };

      checkUserRole();
    }, [router]);


    const pickMenu = (menu) => {
        setSelectedMenu(menu);
    };

    const renderContent = () => {
        switch (selectedMenu) {
          case 'Home':
            return <div>Condition standing</div>;
          case 'Request':
            return <RequestHeader/>;
          case 'Database':
            return  <DatabaseHeader/>;
          case 'User':
            return <div>Condition standing</div>;
        case 'Prediction':
            return <PredictionHeader/>;
          default:
            return <div className="text-red-500 text-center py-4">{error}</div>;
        }
      };

      if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while checking the role
      }

    return (
        <NextUIProvider>  
            <div className='flex flex-row w-full z-30 gap-2 mt-16 '>
                <div className="bg-white rounded-r-xl w-32 h-screen mx-auto pt-6">
                  {role === 8002 ? (
                    menus.map((menu) => (
                        <button
                          key={menu.name}
                          onClick={() => pickMenu(menu.name)}
                          className={`flex flex-col gap-1 py-4 items-center justify-center w-full font-semibold text-[10px] duration-200 ${selectedMenu === menu.name ? 'text-black' : 'text-gray-500'}`}
                        >
                          {menu.icon}
                          {menu.name}
                        </button>
                      ))
                    ) : (
                      <button
                        key="Prediction"
                        onClick={() => pickMenu("Prediction")}
                        className={`flex flex-col gap-1 py-4 items-center justify-center w-full font-semibold text-[10px] duration-200 ${selectedMenu === "Prediction" ? 'text-black' : 'text-gray-500'}`}
                      >
                        <IoIosBasketball size={24}/>
                        Prediction
                      </button>
                    )}
                </div>
                <div className="bg-white rounded-xl w-full h-screen pt-8 px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <p className="text-black font-semibold text-xl">ADMIN PANEL</p>
                        </div>
                    </div>
                    <div className="w-full h-screen">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </NextUIProvider>
    );
};

export default PanelPage;