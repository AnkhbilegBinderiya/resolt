"use client";

import { React, useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import { WiStars } from "react-icons/wi";
import { GoCheck } from "react-icons/go";
import { GoX } from "react-icons/go";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { CiDollar } from "react-icons/ci";
import { IoAnalytics } from "react-icons/io5";
import { LuHeartHandshake } from "react-icons/lu";
import { BsDatabase } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { TbCircleLetterXFilled } from "react-icons/tb";
import { NextUIProvider } from "@nextui-org/system";
import { Switch } from "@nextui-org/react";
import { RiCustomerServiceLine } from "react-icons/ri";
import { FaBrain } from "react-icons/fa";
import ProductComponent from '@/components/productComponent/productComponent';
import authCheck from '@/utils/authCheck';

export default function Home() {
  const [isSelected, setIsSelected] = useState(false);
  const [href, setHref] = useState("/auth/login");

  useEffect(() => {
    const fetchData = async () => {
        const data = await authCheck();
        if(!data){
          setHref(`/auth/login`);
        }else{
          setHref(`/user/plan?name=${data.username}`);
        }
    };
    fetchData();
  });

  return (
    <NextUIProvider>
      <main className="bg-white dark:bg-dark focus:scroll-auto">
        <header id="showcase" className="grid grid-cols sm:grid-cols-2 text-black h-screen w-full">
          <div className="order-last sm:order-first flex flex-col p-5 sm:p-0 sm:justify-center sm:items-center">
            <div>
              <div className="font-semibold text-base animate-bounce mt-3 flex">
                <WiStars className="inline text-yellow-400 text-2xl mr-2" />
                <p className='text-black dark:text-white'>Ai prediction for everyone.</p>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold my-5 text-black dark:text-white">
                Welcome to <br />
                the Future of <br />
                Sports
              </h2>
              <div className="flex text-xs 2xl:text-base gap-2">
                <a href="/auth/register" className="flex w-36 bg-black dark:bg-white text-white dark:text-black rounded-md justify-center hover:font-semibold duration-300 py-2">
                  Get Started
                </a>
                <a href="#" className="border-1 border-white text-black dark:text-white w-36 py-2 text-center rounded-md hover:border-black duration-300">
                  Our Feature
                </a>
              </div>
            </div>
          </div>
          <div className="relative h-[30rem] sm:h-full w-full">
            <Image
              src="/assets/image/main/rec05.jpeg"
              fill
              style={{ objectFit: "cover", borderRadius: '0px 0px 0px 16px',}}
              alt="something"
            />
          </div>
        </header>

        {/* Powered by AI section */}
        <section className="bg-dark m-3 rounded-xl text-white text-xs pt-20">
          <div className="md:w-3/4 w-full px-4 md:px-0 flex flex-col items-center mx-auto gap-8">
            <h1 className="text-2xl font-semibold">Powered by AI</h1>
            <div className="flex justify-center items-center h-40 w-40 md:h-80 md:w-80  rounded-3xl animate-pulse">
              <div className="flex justify-center items-center h-20 w-20 md:h-40 md:w-40 bg-black rounded-xl border-1 border-white/20 shadow-xl shadow-primary">
                {/* <h1 className="text-primary text-3xl md:text-8xl font-semibold ">AI</h1> */}
                <FaBrain className="text-primary text-3xl md:text-8xl font-semibold "/>
              </div>
            </div>
            <p className="text-center text-sm">
              Welcome to ResoltX, your ultimate destination for AI-powered sports predictions. Our platform leverages advanced artificial intelligence to provide you with accurate and reliable predictions for various sports events. Whether you&apos;re a casual fan or a serious bettor, ResoltX offers insights and forecasts that help you stay ahead of the game.
            </p>
          </div>
          <div className="w-3/4 flex flex-col items-center mx-auto mt-40 gap-14">
            <h1 className="text-2xl font-semibold">Our Features</h1>
            <p className="text-center text-sm mb-24">
            At ResoltX, we pride ourselves on providing a feature-rich platform designed to meet all your sports prediction needs. Our key features include
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 w-3/4 gap-x-8 gap-y-8 items-center mx-auto justify-around pb-10 mt-10">
              <div className="border border-white/15 text-white bg-black/80 rounded-xl backdrop-blur-xl  backdrop-brightness-50 py-6 px-4 hover:bg-white hover:scale-105 hover:text-black duration-300">
                <h3 className="text-base mb-2 font-semibold animate-none">Detailed Statistical Predictions</h3>
                <p>
                For each game, ResoltX provides an extensive range of statistical predictions. Whether it’s an NBA game or a soccer match, we forecast key statistics like rebounds, assists, goals, and more. Our comprehensive data ensures you get a complete picture of what to expect.
                </p>
              </div>
              <div className=" text-white bg-black/80  border border-white/15 shadow-xl rounded-xl bg-opacity-10 backdrop-blur-lg py-6 px-4 hover:bg-white hover:scale-105 hover:text-black duration-300">
                <h3 className="text-base mb-2 font-semibold animate-none">Full Customer Service</h3>
                <p>
                ResoltX prides itself on exceptional customer service. Our platform is service-based, meaning we prioritize your experience and satisfaction. Our friendly and dedicated support team is always ready to assist you with any queries or issues you may have.
                </p>
              </div>
              <div className=" text-white bg-black/80 border border-white/15 shadow-xl rounded-xl bg-opacity-10 backdrop-blur-lg py-6 px-4 hover:bg-white hover:scale-105 hover:text-black duration-300">
                <h3 className="text-base mb-2 font-semibold animate-none">Advanced AI Technology</h3>
                <p>
                At the core of ResoltX is our state-of-the-art AI technology. Our advanced algorithms and machine learning models continuously improve to provide the most accurate sports predictions available. We harness the power of AI to give you insights that are both reliable and cutting-edge.
                </p>
              </div>
          </div>
        </section>

        {/* Choose your plan section */}
        <section className="text-black dark:text-white flex flex-col items-center w-full text-xs font-medium py-32 snap-always mt-6">
          <h1 className="text-2xl font-semibold mb-12">Choose your plan</h1>
          <p className="w-[70%] text-center mb-12">
            At ResoltX, we offer a variety of subscription plans designed to suit your needs and preferences. Whether you&apos;re just starting out or looking for comprehensive insights, we have a plan that&apos;s right for you. Select the plan that best fits your requirements and start benefiting from our AI-powered sports predictions today.
          </p>

          <div className="flex w-4/5 md:w-1/5 justify-between items-center my-7">
            <h4 className={`text-base font-semibold ${isSelected ? 'text-black/40 dark:text-white/30' : 'text-black dark:text-white'}`}>Monthly</h4>
            <Switch defaultSelected size="md" className="text-primary" isSelected={isSelected} onValueChange={setIsSelected}></Switch>
            <h4 className={`text-base font-semibold ${isSelected ? 'text-black dark:text-white' : 'text-black/40 dark:text-white/30'}`}>Yearly</h4>
            <p className={`border border-yellow-500 rounded-lg px-3 py-1.5 text-yellow-500 duration-300 ${isSelected ? 'scale-110' : 'scale-100'}`}>
              20% off
            </p>
          </div>
          <div className="lg:w-3/4 flex flex-col md:flex-row w-full mx-auto">
            {/* FREE $10 */}
            <div className="flex flex-col justify-evenly  lg:w-[30%] w-11/12 mx-auto border  border-black/20 dark:border-white/20 rounded-2xl shadow-md py-8 duration-400">
              <div className="font-semibold text-center mb-2">
                <h3 className="text-xl font-bold text-black bg-clip-text w-32 mx-auto">Free</h3>
                <h4 className="text-6xl my-3">{isSelected ? '$0' : '$0'}</h4>
                <p className={` text-sm ${isSelected ? 'text-primary font-semibold' : 'text-black/80 dark:text-white/50 font-normal'}`}>{isSelected ? 'year' : '/mo'}</p>
              </div>
              <div className="flex flex-col gap-3 ml-5 text-sm font-medium mt-6">
                <div className="flex gap-5 items-center">
                  <GoCheck className="text-lg text-primary" />
                  <p>Main predictions</p>
                </div>
                <div className="flex gap-5 items-center">
                  <GoCheck className="text-lg text-primary" />
                  <p>Customer Support</p>
                </div>
                <div className="flex gap-5 items-center">
                  <GoCheck className="text-lg text-primary" />
                  <p>Telegram notfication</p>
                </div>
                <div className="flex gap-5 items-center">
                  <GoCheck className="text-lg text-primary" />
                  <p>Comment Features</p>
                </div>
                <div className="flex gap-5 items-center">
                  <GoX className="text-lg text-black" />
                  <p className="line-through">Ad-Free Browsing</p>
                </div>
                <div className="flex gap-5 items-center">
                  <GoX className="text-lg text-black" />
                  <p className="line-through">Static Predictions</p>
                </div>
                <div className="flex gap-5 items-center">
                  <GoX className="text-lg text-black" />
                  <p className="line-through">Weekly Special Predictions</p>
                </div>
                <div className="flex gap-5 items-center">
                  <GoX className="text-lg text-black" />
                  <p className="line-through">VIP Response and Suppor</p>
                </div>
                <div className="flex gap-5 items-center">
                  <GoX className="text-lg text-black" />
                  <p className="line-through">Balance management</p>
                </div>
              </div>
              <Link href="" className="text-white bg-black border border-black/10 dark:border-white/10 px-6 py-2 rounded-lg mx-auto mt-12 hover:scale-110 duration-300">
                Choose
              </Link>
            </div>
            {/* Most popular $20 pro */}
            <div className="flex flex-col justify-between lg:w-[30%] w-11/12 mx-auto border dark:border-white/20 rounded-2xl shadow-md text-white bg-black pb-5 duration-400">
              <div className="text-center bg-yellow-500 py-3 rounded-t-xl text-black dark:text-white">
                <p className="">most popular</p>
              </div>
              <div className="font-semibold text-center pt-5 mb-2">
                <h3 className="text-xl text-primary">Standard</h3>
                <h4 className="text-6xl my-3">{isSelected ? '$96' : '$10'}</h4>
                <p className={` text-sm ${isSelected ? 'text-primary font-semibold' : 'text-white/50 font-normal'}`}>{isSelected ? 'save $24 a year' : '/mo'}</p>
              </div>
              <div className="flex flex-col text-sm gap-3 ml-5 font-medium mt-6">
                <div className="flex gap-5">
                  <GoCheck className="text-lg text-yellow-500" />
                  <p>Main predictions</p>
                </div>
                <div className="flex gap-5">
                  <GoCheck className="text-lg text-yellow-500" />
                  <p>Customer Support</p>
                </div>
                <div className="flex gap-5">
                  <GoCheck className="text-lg text-yellow-500" />
                  <p>Telegram notfication</p>
                </div>
                <div className="flex gap-5">
                  <GoCheck className="text-lg text-yellow-500" />
                  <p>Comment Features</p>
                </div>
                <div className="flex gap-5">
                  <GoCheck className="text-lg text-yellow-500" />
                  <p>Ad-Free Browsing</p>
                </div>
                <div className="flex gap-5">
                  <GoCheck className="text-lg text-yellow-500" />
                  <p>Static Predictions</p>
                </div>
                <div className="flex gap-5">
                  <GoCheck className="text-lg text-yellow-500" />
                  <p>Weekly Special Predictions</p>
                </div>
                <div className="flex gap-5">
                  <GoX className="text-lg" />
                  <p className="line-through">VIP Response and Suppor</p>
                </div>
                <div className="flex gap-5">
                  <GoX className="text-lg" />
                  <p className="line-through">Balance management</p>
                </div>
              </div>
              <Link
                href={`${href}`}
                className="text-black bg-yellow-500 px-6 py-2 rounded-lg mx-auto mt-12 mb-3 hover:bg-white duration-300"
              >
                Choose
              </Link>
            </div>
            {/* Premium $30 */}
            <div className="flex flex-col justify-evenly  lg:w-[30%] w-11/12 mx-auto border  border-black/20 dark:border-white/20 rounded-2xl shadow-md py-8 duration-400">
              <div className="font-semibold text-center mb-2">
                <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text w-32 mx-auto">Pro</h3>
                <h4 className="text-6xl my-3">{isSelected ? '$288' : '$30'}</h4>
                <p className={` text-sm ${isSelected ? 'text-primary font-semibold' : 'text-black/80 dark:text-white/50 font-normal'}`}>{isSelected ? 'save $72 a year' : '/mo'}</p>
              </div>
              <div className="flex flex-col gap-3 ml-5 text-sm font-medium mt-6">
                <div className="flex gap-5 items-center">
                  <GoCheck className="text-lg text-primary" />
                  <p>Main predictions</p>
                </div>
                <div className="flex gap-5 items-center">
                  <GoCheck className="text-lg text-primary" />
                  <p>Customer Support</p>
                </div>
                <div className="flex gap-5 items-center">
                  <GoCheck className="text-lg text-primary" />
                  <p>Telegram notfication</p>
                </div>
                <div className="flex gap-5 items-center">
                  <GoCheck className="text-lg text-primary" />
                  <p>Comment Features</p>
                </div>
                <div className="flex gap-5 items-center">
                  <GoCheck className="text-lg text-primary" />
                  <p>Ad-Free Browsing</p>
                </div>
                <div className="flex gap-5 items-center">
                  <GoCheck className="text-lg text-primary" />
                  <p>Static Predictions</p>
                </div>
                <div className="flex gap-5 items-center">
                  <GoCheck className="text-lg text-primary" />
                  <p>Weekly Special Predictions</p>
                </div>
                <div className="flex gap-5 items-center">
                  <GoCheck className="text-lg text-primary" />
                  <p>VIP Response and Suppor</p>
                </div>
                <div className="flex gap-5 items-center">
                  <GoCheck className="text-lg text-primary" />
                  <p>Balance management</p>
                </div>
              </div>
              <Link href={`${href}`} className="text-white bg-black border border-black/10 dark:border-white/10 px-6 py-2 rounded-lg mx-auto mt-12 hover:scale-110 duration-300">
                Choose
              </Link>
            </div>
          </div>
        </section>

        {/* Service Section */}
        <section className="bg-dark  m-3 rounded-xl text-white text-xs py-20 snap-always ">
          <div className="flex flex-col w-full items-center">
            <h2 className="text-2xl font-semibold">Service</h2>
            <p className="w-3/4 text-center my-8">
              At ResoltX, we are committed to providing a comprehensive range of services to enhance your sports prediction experience. Our offerings are designed to give you the tools and support you need to make informed decisions and enjoy a seamless experience.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 w-3/4 gap-x-8 gap-y-8 mt-12">
              <div className="flex flex-col justify-between border border-white/20 rounded-xl p-4 hover:scale-105 hover:border-primary hover:shadow-md hover:shadow-primary duration-200">
                <div>
                  <IoAnalytics className="text-3xl text-yellow-500" />
                    <h4 className="font-semibold my-2">Analytics</h4>
                    <p className="mb-2 leading-relaxed">
                      Get detailed game prediction analytics to help you understand and predict the outcomes of various sports events. Our in-depth analysis covers every aspect of the game, providing you with the insights you need to stay ahead.
                    </p>
                </div>
                <Link href="" className="inline-block border rounded-lg py-2 w-28 text-center my-1 hover:border-primary hover:text-primary">
                  Learn more
                </Link>
              </div>
              <div className="flex flex-col justify-between border border-white/20 rounded-xl p-4 hover:scale-105 hover:border-primary hover:shadow-md hover:shadow-primary duration-200">
                <div className="w-full">
                  <MdOutlineNotificationsActive className="text-3xl text-yellow-500" />
                  <h4 className="font-semibold my-2">Notfication</h4>
                  <p className="mb-2 leading-relaxed">
                    Receive timely alerts for live games and pre-match predictions. Stay updated with real-time notifications, ensuring you never miss an important update or prediction for your favorite sports events.
                  </p>
                </div>
                <Link href="" className="inline-block border rounded-lg py-2 w-28 text-center my-1 hover:border-primary hover:text-primary">
                  Learn more
                </Link>
              </div>
              <div className="flex flex-col justify-between border border-white/20 rounded-xl p-4 hover:scale-105 hover:border-primary hover:shadow-md hover:shadow-primary duration-200">
                <div className="w-full">
                  <CiDollar className="text-3xl text-yellow-500" />
                  <h4 className="font-semibold my-2">Cashback</h4>
                  <p className="mb-2 leading-relaxed">
                    Enjoy peace of mind with our cashback guarantee. If you lose money based on our predictions, we&apos;ll pay you back, ensuring you have a risk-free experience with ResoltX.
                  </p>
                </div>
                <Link href="" className="inline-block border rounded-lg py-2 w-28 text-center my-1 hover:border-primary hover:text-primary">
                  Learn more
                </Link>
              </div>
              <div className="flex flex-col justify-between border border-white/20 rounded-xl p-4 hover:scale-105 hover:border-primary hover:shadow-md hover:shadow-primary duration-200">
                <div>
                  <LuHeartHandshake className="text-3xl text-yellow-500" />
                  <h4 className="font-semibold my-2">Partner</h4>
                  <p className="mb-2 leading-relaxed">
                    Become a partner and enjoy free access to our services and features. Our partners receive exclusive benefits and insights, enhancing their experience with ResoltX.
                  </p>
                </div>
                <Link href="" className="inline-block border rounded-lg py-2 w-28 text-center my-1 hover:border-primary hover:text-primary">
                  Learn more
                </Link>
              </div>
              <div className="flex flex-col justify-between border border-white/20 rounded-xl p-4 hover:scale-105 hover:border-primary hover:shadow-md hover:shadow-primary duration-200">
                <div>
                  <BsDatabase className="text-3xl text-yellow-500" />
                  <h4 className="font-semibold my-2">Balace Manage</h4>
                  <p className="mb-2 leading-relaxed">
                  Let us help you manage your money balance effectively. Our balance management service ensures you have a clear and organized view of your finances, making it easier to keep track of your bets and winnings.
                  </p>
                </div>
                <Link href="" className="inline-block border rounded-lg py-2 w-28 text-center my-1 hover:border-primary hover:text-primary">
                  Learn more
                </Link>
              </div>
              <div className="flex flex-col justify-between border border-white/20 rounded-xl p-4 hover:scale-105 hover:border-primary hover:shadow-md hover:shadow-primary duration-200">
                <div>
                  <RiCustomerServiceLine className="text-3xl text-yellow-500" />
                  <h4 className="font-semibold my-2">Support</h4>
                  <p className="mb-2 leading-relaxed">
                  Benefit from our 24/7 support, available anytime and anywhere. Our dedicated support team is always ready to assist you with any questions or issues, ensuring you have a smooth and enjoyable experience with ResoltX.
                  </p>
                </div>
                <Link href="" className="inline-block border rounded-lg w-28 text-center py-2 my-1  hover:border-primary hover:text-primary">
                  Learn more
                </Link>
              </div>
            </div>
            {/* <h2 className="text-2xl font-semibold my-20">World Top Leagues</h2>
              <ProductComponent /> */}
          </div>
        </section>

        {/*  Experience Our Service and AI section */}
        <section className="text-black dark:text-white w-full my-12">
          <div className="w-3/4 mx-auto text-center pt-16">
            <h1 className="text-4xl font-semibold">
              Experience Our Service and AI
            </h1>
            <div className="text-sm mt-16">
              At ResoltX, we take pride in the success we’ve achieved since our inception last year. Our platform has quickly become a trusted source for sports predictions, thanks to our advanced AI technology and commitment to accuracy. 
              <p className='text-primary font-semibold'>Over the past year, we&apos;ve provided over 16,000 predictions with an impressive win rate of more than 87%.</p>
              Our AI algorithms are designed to analyze a vast array of data, ensuring that our predictions are both precise and reliable. Whether you&apos;re a sports enthusiast or a serious bettor, our services are tailored to provide you with valuable insights that can enhance your decision-making.
              Experience the power of our AI-driven predictions and see for yourself why ResoltX is a leader in the field of sports analytics. Join us today and take advantage of our proven track record to stay ahead in the game.
            </div>
          </div>
          {/* <div className="hidden lg:block lg:bg-[url('/assets/image/main/wavybg.png')] lg:bg-cover lg:bg-center h-[30rem] mt-14"></div> */}
        </section>

        {/* Footer section */}
        <section className="w-full bg-black dark:bg-widgetDark text-white text-xs pb-8">
          <div className="flex md:flex-row flex-col gap-16 md:py-6 mx-auto">
            <div className="group w-full md:w-1/2 flex flex-col items-center mt-5">
              <div className="w-64 md:w-80 h-28 rounded-lg bg-white/20 z-10 group-hover:translate-y-8 group-hover:bg-black duration-500"></div>
              <div className="w-80 md:w-96 h-36 rounded-lg bg-white/20 backdrop-blur-md -my-24 z-20 group-hover:translate-y-4 group-hover:bg-black delay-200 duration-500"></div>
              <div className="bg-white text-black w-11/12 md:w-[32rem] rounded-lg px-6 py-4 -mt-8 z-30 group-hover:text-white group-hover:border group-hover:border-white/10 group-hover:bg-white/10 group-hover:backdrop-blur-md group-hover:scale-110 delay-700 duration-500">
                <div className="flex w-full">
                  <div className="flex gap-3 items-center justify-start">
                    <Image
                      src="/assets/image/main/ankhbileg.jpg"
                      alt="Ankhbileg"
                      height={36}
                      width={36}
                      className="rounded-xl"
                    />
                    <div>
                      <p className="font-bold text-sm">Ankhbileg Binderiya</p>
                      <p className="italic font-medium">@ankhbileg</p>
                    </div>
                  </div>
                </div>
                <p className="pt-3 font-normal text-xs">
                  Hey there! I&apos;m AK, the developer and founder of ResoltX.
                  Currently, I&apos;m working at Artlab, a company specializing in
                  developing cloud ERP systems. Alongside my professional work,
                  I have a passion for creating UI/UX designs and other visual
                  elements. My goal is to deliver accurate, user-friendly insights to sports enthusiasts like you. 
                  Thank you for choosing ResoltX . Welcome to the Future of Sports!
                </p>
                <div></div>
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-14 pt-5 md:px-0 px-4">
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold mb-2">Platform</h3>
                  <Link href="#" className="hover:underline hover:underline-offset-4">Our Features</Link>
                  <Link href="#" className="hover:underline hover:underline-offset-4">Plans & Price</Link>
                  <Link href="#" className="hover:underline hover:underline-offset-4">AI bet assistance</Link>
                  <Link href="#" className="hover:underline hover:underline-offset-4">AI data processing</Link>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold mb-2">Service</h3>
                <Link href="#" className="hover:underline hover:underline-offset-4">Analytics</Link>
                <Link href="#" className="hover:underline hover:underline-offset-4">Notfication</Link>
                <Link href="#" className="hover:underline hover:underline-offset-4">Cashback</Link>
                <Link href="#" className="hover:underline hover:underline-offset-4">Partner</Link>
                <Link href="#" className="hover:underline hover:underline-offset-4">Balace Manage</Link>
                <Link href="#" className="hover:underline hover:underline-offset-4">Support</Link>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold mb-2">Join us</h3>
                <Link href="#" className="hover:underline hover:underline-offset-4">Facebook</Link>
                <Link href="#" className="hover:underline hover:underline-offset-4">Instagram</Link>
                <Link href="#" className="hover:underline hover:underline-offset-4">Telegram</Link>
              </div>
            </div>
          </div>
          <div className="w-10/12 mx-auto md:mt-0 mt-12">
            <ul className="flex gap-4 justify-center md:justify-normal text-2xl">
              <li>
                <a
                  target="_blank"
                  href="https://www.facebook.com/Resoltx/?locale=sl_SI"
                >
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.instagram.com/resoltx/">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a target="_blank" href="http://www.resoltx.com/">
                  <TbCircleLetterXFilled />
                </a>
              </li>
              <li>
                <a target="_blank" href="">
                  <FaEnvelope />
                </a>
              </li>
            </ul>
          </div>
          <div className="h-px w-10/12 bg-white mx-auto my-8"></div>
          <div className="w-10/12 flex md:flex-row flex-col gap-2 justify-between mx-auto px-2">
            <p>&#169;2024 ResoltX. All rights reserved</p>
            <div className="flex gap-5">
              <Link href="/terms-of-use" className="hover:underline hover:underline-offset-4">Terms of Service</Link>
              <Link href="/Vacancies" className="hover:underline hover:underline-offset-4">Vacancies</Link>
            </div>
          </div>
        </section>
      </main>
    </NextUIProvider>
  );
}
