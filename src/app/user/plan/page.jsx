"use client"

import { React, useEffect, useState } from 'react'
import { NextUIProvider, Select, SelectItem, Input, Button, ButtonGroup, Tooltip, Slider } from "@nextui-org/react";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
import { useSearchParams } from 'next/navigation'
import {Image} from "@nextui-org/image";
import { Suspense } from 'react';
import LoadingSpinner from '@/components/Loading/loading';
import fetchUserData from '@/utils/userData';

const months = [
  {key: "1", label: "1 Months"},
  {key: "2", label: "2 Months"},
  {key: "3", label: "3 Months"},
  {key: "4", label: "4 Months"},
  {key: "5", label: "5 Months"},
  {key: "6", label: "6 Months"},
  {key: "7", label: "7 Months"},
  {key: "8", label: "8 Months"},
  {key: "9", label: "9 Months"},
  {key: "10", label: "10 Months"},
  {key: "11", label: "11 Months"},
  {key: "12", label: "12 Months"},
];

const plans = [
  {key: "2", name: "Free Plan", label: "Ideal for beginners. Includes main prediction for every game, comment future, and weekly special prediction.", price: 0},
  {key: "3", name: "Pro Plan", label: "Most popular choice. Offers static and main predictions, providing detailed insights for better decision-making.", price: 10},
  {key: "4", name: "Premium Plan", label: "Perfect for experts and tipsters. Includes all Pro Plan features plus advanced analysis and priority support.",price: 30},
];

const UserPlan = () => {
  const { token } = useAuth();
  const [plan, setPlan] = useState("1");
  const [mon, setMon] = useState("");
  const [price, setPrice] = useState("");
  const [tugrug, setTugrug] = useState("");
  const [bank, setBank] = useState("1");
  const [data, setData] = useState("null");
  const [loading, setLoading] = useState(true);
  const [userBank, setUserBank] = useState('Худалдаа хөгжлийн банк');
  const [userAcc, setUserAcc] = useState('499287077');
  const [userName, setUserName] = useState('Б. Анхбилэг');
  const searchParams = useSearchParams()

    const Tdb = async () =>{
      setUserBank("Худалдаа хөгжлийн банк")
      setUserAcc("499287077")
      setUserName("Б.Анхбилэг")
      setBank(1)
    }

    const Golomt = async () =>{
      setUserBank("Голомт Банк")
      setUserAcc("3055134722")
      setUserName("Б.Анхбилэг")
      setBank(2)
    }

    const Mbank = async () =>{
      setUserBank("М Банк")
      setUserAcc("8000559699")
      setUserName("Б.Анхбилэг")
      setBank(3)
    }

    const KhanBank = async () =>{
      setUserBank("Хаан Банк")
      setUserAcc("50*******")
      setUserName("Б.Анхбилэг")
      setBank(4)
    }

    useEffect(() => {
      const fetchData = async () => {
            const name = searchParams.get('name')
            const response = await fetchUserData(name);
            if (!response) {
              window.location.href="/auth/login"
            }else{
              setData(response);
              setLoading(false);
            }
      };
      fetchData();
    }, []);

    useEffect(() => {
      if(!mon || !plan){
        return
      }else{
        console.log(plan);
        setPrice(mon*plan);
        setTugrug(mon*plan*3370)
      }
    }, [ mon, plan]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!mon) {
        toast.warning("Please choose your months", {position: 'top-center'});
        return;
      }
      if (!plan) {
        toast.warning("Please choose your plan", {position: 'top-center'});
        return;
      }
      
      const payload = {
        customer_id: data.id,
        bank_id: bank,
        plan_id: plan,
        months: mon,
        usd: price,
        mnt: tugrug,
      };

      try {
        // Send the POST request
        const response = await fetch("http://localhost:6969/request/plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        setLoad(true)
        if (response.ok) {
          toast.success("Request successfully sent", {position: 'top-center'});
        return;
        } else {
          // Handle error response
          const errorData = await response.json();
          toast.error(`${errorData.message}`, {position: 'top-center'});
        }
      } catch (error) {
        alert(`An error occurred: ${error.message}`);
      }
    };

    const changePlan = (planKey) => {setPlan(planKey)}

    const copyAccount = () => {
      try {
        navigator.clipboard.writeText(userAcc);
        toast.success('Successfully copied account',{position: 'top-center', autoClose: 1000,});
      } catch (err) {
        toast.warning('Failed ', {position: 'top-center'});
      }
    }

    const copyUsd = () => {
      try {
        navigator.clipboard.writeText(price);
        toast.success('Successfully copied USD amount',{position: 'top-center', autoClose: 1000,});
      } catch (err) {
        toast.warning('Failed ', {position: 'top-center'});
      }
    }

    const copyMnt = () => {
      try {
        navigator.clipboard.writeText(tugrug);
        toast.success('Successfully copied MNT amount',{position: 'top-center', autoClose: 1000,});
      } catch (err) {
        toast.warning('Failed ', {position: 'top-center'});
      }
    }

    const copyDesc = () => {
      try {
        navigator.clipboard.writeText(data.username);
        toast.success('Successfully copied username',{position: 'top-center', autoClose: 1000,});
      } catch (err) {
        toast.warning('Failed ', {position: 'top-center'});
      }
    }

  if(loading){
    return (
      <LoadingSpinner />
    )
  }

  return (
    <NextUIProvider>
      <div className='flex flex-row w-full z-30'>
        <div className='hidden md:flex lg:w-1/4 mt-1'></div>

        <div className="w-full lg:w-2/4 h-full mr-auto mt-1 mx-auto flex flex-col ">
          <div className='flex flex-col w-full mt-16 bg-white dark:bg-widgetDark rounded-xl gap-4 p-4'>
            {token ? (
              <>
                <p className='text-primary font-semibold'>Send Plan Request</p>
                <p className='text-red-500 text-sm'>Мөнгө шилжүүлсний дараа өөрийн хүсэлтээ илгээнэ үү. Хэрэв өөр холбоотой асуудал гарвал <a href="https://t.me/Resoltx" className='underline underline-offset-4 text-black dark:text-white font-semibold'>бидэнд</a> мэдэгдэнэ үү.</p>
                  
                <div className='flex md:flex-row flex-col w-full gap-4'>
                  {plans.map(({ key, name, price, label }) => (
                    <button
                      key={key}
                      className={`flex flex-col p-4 w-full rounded-lg border-1 gap-2 duration-200 ${
                        plan === price ? 'bg-black text-white dark:bg-white dark:text-black scale-105' : 'border-black/50 dark:border-white/10'
                      }`}
                      onClick={() => changePlan(price)}
                      aria-pressed={plan === key}
                    >
                      <div className="flex w-full justify-between">
                        <p className="font-semibold">{name}</p>
                        <p>{price}$</p>
                      </div>
                      <div className='w-full'>
                        <p className="text-xs text-start">{label}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4 md:justify-center">
                  <Select
                    labelPlacement="outside"
                    label="Хугацаа"
                    placeholder="Select your Plan date"
                    value={mon}
                    onChange={(e) => setMon(e.target.value)}
                  >
                    {months.map((month) => (
                      <SelectItem key={month.key}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </Select>

                  {/* <ButtonGroup color="primary" className='mt-4'>
                    <Button onClick={KhanBank} >Khaan</Button>
                    <Button onClick={Tdb} >TDB</Button>
                    <Button onClick={Golomt} >Golomt</Button>
                    <Button onClick={Mbank} >M Bank</Button>
                  </ButtonGroup> */}
                  <Image
                    width={300}
                    height={300}
                    alt="NextUI hero Image"
                    src="https://www.greenclimate.fund/sites/default/files/organisation/logo-tdbm.png"
                    radius="none"
                  />
                  
                  <div className="flex flex-col md:flex-row gap-4 text-xs">
                    <Input isReadOnly value={userBank} size="sm" variant="bordered" label="Банк" labelPlacement="outside"/>
                    <Input  
                      isReadOnly 
                      value={userAcc} 
                      size="sm" 
                      variant="bordered" 
                      label="Дансны дугаар" 
                      labelPlacement="outside" 
                      endContent={
                        <Tooltip content="copy">
                          <button className="focus:outline-none" type="button" onClick={copyAccount}>
                            <IoCopyOutline  className='text-black dark:text-white'/>
                          </button>
                        </Tooltip>
                    }/>
                    <Input  isReadOnly value={userName} size="sm" variant="bordered" label="Эзэмшигчийн нэр" labelPlacement="outside"/>
                  </div>
                  <Input
                      isReadOnly
                      label={`Төлөх төлбөр ( ${price} $ )`}
                      labelPlacement="outside"
                      placeholder="Your price"
                      variant="bordered"
                      size="md"
                      value={tugrug}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-black font-semibold dark:text-white">₮</span>
                        </div>
                      }
                      endContent={
                        <Tooltip content="copy">
                          <button className="focus:outline-none" type="button" onClick={copyMnt}>
                            <IoCopyOutline  className='text-black dark:text-white'/>
                          </button>
                        </Tooltip>
                      }
                      type="number"
                  />
                  <Input
                      isReadOnly
                      label="Гүйлгээний утга ( хэрэглэгчийн нэр )"
                      labelPlacement="outside"
                      placeholder="Your username"
                      variant="bordered"
                      size="md"
                      value={data.username}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-black font-semibold dark:text-white">@</span>
                        </div>
                      }
                      endContent={
                        <Tooltip content="copy">
                          <button className="focus:outline-none" type="button" onClick={copyDesc}>
                            <IoCopyOutline  className='text-black dark:text-white'/>
                          </button>
                        </Tooltip>
                      }
                  />
                  <Button color="primary" type="submit">
                      <p className='text-black font-semibold '>Send Request</p>
                  </Button>
              </form>
             </>
            ) : (
              <>
                <div className='w-full flex flex-col gap-1 justify-center'>
                  <div className='flex gap-1'>
                    <p>Sorry you need to</p>
                    <a href="/auth/login" className='text-primary underline'>Login</a>
                    <p>for send parnet request</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className='hidden md:flex lg:w-1/4 mt-1'></div>
      </div>
    </NextUIProvider>
  );
};

const UserPlanPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
      <UserPlan />
  </Suspense>
);

export default UserPlanPage;
