"use client";

import React, { useState,useEffect } from "react";
import { NextUIProvider, Input, Button } from "@nextui-org/react";
import Cookies from 'js-cookie';
import { FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoChatbox } from "react-icons/io5";
import { FaDatabase } from "react-icons/fa6";
import { IoIosBasketball } from "react-icons/io";

import RequestHeader from "@/components/Admin/Request/RequestHeader/RequestHeader";
import DatabaseHeader from "@/components/Admin/Database/DatabaseHeader/DatabaseHeader";
import PredictionHeader from "@/components/Admin/Prediction/PredictionHeader/PredictionHeader";
import LoadingSpinner from "@/components/Loading/loading";
import NotFoundScreen from "@/components/NotFound/notFound";


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

async function checkAdmin() {
  const response = await fetch('/api/auth/check', { 
    method: 'POST', 
    cache: 'no-store'
  });

  if (response.ok) {
    const data = await response.json();
    if (data && data.role && data.role > 8000) {
      return data;
    }
  }
  return undefined;
}

const PanelPage = () => {
    const [selectedMenu, setSelectedMenu] = useState("Home");
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(true);

    useEffect(() => {
      const fetchUser = async () => {
        const user = await checkAdmin();
        if (!user) {
          setLoading(false);
          setNotFound(true);
        } else {
          setRole(user.role);
          setLoading(false); 
        }
      };
  
      fetchUser();
    }, []);

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
      return (
        <LoadingSpinner/>
      )
    }

    if (notFound) {
      return (
        <NotFoundScreen/>
      )
    }

    return (
        <NextUIProvider>  
            <div className='flex flex-row w-full z-30 gap-2 mt-16 '>
                <div className="bg-white dark:bg-widgetDark rounded-r-xl w-32 h-screen mx-auto pt-6">
                  {role === 8002 ? (
                    menus.map((menu) => (
                        <button
                          key={menu.name}
                          onClick={() => pickMenu(menu.name)}
                          className={`flex flex-col gap-1 py-4 items-center justify-center w-full font-semibold text-[10px] duration-200 ${selectedMenu === menu.name ? 'text-black dark:text-white' : 'text-gray-500 dark:text-white/30'}`}
                        >
                          {menu.icon}
                          {menu.name}
                        </button>
                      ))
                    ) : (
                      <button
                        key="Prediction"
                        onClick={() => pickMenu("Prediction")}
                        className={`flex flex-col gap-1 py-4 items-center justify-center w-full font-semibold text-[10px] duration-200 ${selectedMenu === "Prediction" ? 'text-black dark:text-white' : 'text-gray-500 dark:text-white/30'}`}
                      >
                        <IoIosBasketball size={24}/>
                        Prediction
                      </button>
                    )}
                </div>
                <div className="bg-white dark:bg-widgetDark rounded-xl w-full h-screen pt-8 px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <p className="text-black dark:text-white font-semibold text-xl">ADMIN PANEL</p>
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