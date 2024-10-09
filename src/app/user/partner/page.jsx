"use client"

import { React, useEffect, useState } from 'react'
import Image from 'next/image'
import { NextUIProvider, Select, SelectItem, Input, Button, Avatar } from "@nextui-org/react";
import {MdOutlineNumbers } from "react-icons/md";
import { BiSolidBank } from "react-icons/bi";
import { HiCreditCard } from "react-icons/hi2";
import { BsFillPhoneFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react';

const UserPartner = () => {
  const { token} = useAuth();
  const [id, setId] = useState("");
  const [app, setApp] = useState("MELBET");
  const [user, setUser] = useState(null);
  const [bank, setBank] = useState("")
  const [account, setAccount] = useState("")
  const [data, setData] = useState();
  const searchParams = useSearchParams()
  

    useEffect(() => {
      const fetchData = async () => {
        try {
            const name = searchParams.get('name')
            const response = await fetch(`http://localhost:6969/user/data/name/${name}`);
            if (!response.ok) {
              throw new Error(`No data found`);
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };
    fetchData();
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || !app || !account || !bank ) {
      toast.warning("Please fill the all fields", {position: 'top-center'});
      return;
    }

    if (id.length < 8 || account.length > 12) {
      toast.error("Wrong ID!", {position: 'top-center'});
      return;
    }

    if (account.length < 8 || account.length > 13) {
      toast.error("Wrong account number!", {position: 'top-center'});
      return;
    }
    
    const payload = {
      customer_id: data.id,
      partner_bank: bank,
      partner_number: account,
      partner_app: app,
      partner_id: id,
    };

    try {
      // Send the POST request
      const response = await fetch("http://localhost:6969/request/partner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

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

  return (
    <NextUIProvider>
      <div className='flex flex-row w-full z-30'>
        <div className='hidden md:flex lg:w-1/4 mt-1'></div>

        <div className="w-full lg:w-2/4 h-full mr-auto mt-1 mx-auto flex flex-col ">
          <div className='flex flex-col w-full mt-16 bg-white dark:bg-widgetDark rounded-xl gap-4 p-4'>
            {token ? (
              <>
                <p className='text-primary font-semibold'>Send Partner Request</p>
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4 md:justify-center">
                <Select
                    aria-label="resoltx"
                    label="Ашигладаг апп"
                    labelPlacement="outside"
                    placeholder="Your app"
                    variant="bordered"
                    disabled
                    size="md"
                    startContent={<BsFillPhoneFill className="text-default-400 pointer-events-none flex-shrink-0" />}
                    value={app}
                    onChange={(e) => setApp(e.target.value)}
                >
                    <SelectItem key="MELBET" startContent={<Avatar alt="KHAAN" className="w-6 h-6" src="https://static.uppromote.com/wp-content/uploads/2023/12/melbet-affiliate-program.jpg" />}>
                      Melbet
                    </SelectItem>
                    <SelectItem key="1XBET" startContent={<Avatar alt="TDB" className="w-6 h-6" src="https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/x7jmvvjocmcie6onmpjq" />}>
                      1xBet
                    </SelectItem>
                </Select>
                <Input
                    isRequired
                    label="Тоглогчийн ID"
                    labelPlacement="outside"
                    placeholder="Enter your ID"
                    variant="bordered"
                    size="md"
                    startContent={<MdOutlineNumbers className="text-default-400 pointer-events-none flex-shrink-0" />}
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    type="number"
                    aria-label="resoltx"
                />
                <Select
                  aria-label="resoltx"
                  isRequired
                  labelPlacement="outside"
                  label="Төлбөр хүлээн авах банк"
                  variant="bordered"
                  placeholder="Select your bank"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  startContent={<BiSolidBank className="text-default-400 pointer-events-none flex-shrink-0" />}
                >
                    <SelectItem key="KHAAN" startContent={<Avatar alt="KHAAN" className="w-6 h-6" src="https://play-lh.googleusercontent.com/Aw4bwCDJgAzu6AFAbbcfCFpheVMB6ZKiEM3JlrJ3cAM65fK-1QaTZZs_Vk4UFBzykQ" />}>
                      Хаан Банк
                    </SelectItem>
                    <SelectItem key="TDB" startContent={<Avatar alt="TDB" className="w-6 h-6" src="https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/a1/fc/1b/a1fc1bf6-afb4-eee4-62d3-d3c9e5fb1fc7/AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/256x256bb.jpg" />}>
                      Худалдаа Хөгжлийн Банк
                    </SelectItem>
                    <SelectItem key="GOLOMT" startContent={<Avatar alt="GOLOMT" className="w-6 h-6" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZER-Zjao959GJWAHJghS3MG8DPK4jjUCCzQ&s" />}>
                      Голомт Банк
                    </SelectItem>
                    <SelectItem key="KHAS BANK" startContent={<Avatar alt="KHAS BANK" className="w-6 h-6" src="https://cdn6.aptoide.com/imgs/0/6/d/06df97a06fbc7622a775a7c414b69e87_icon.png" />}>
                      Хас Банк
                    </SelectItem>
                    <SelectItem key="TURIIN BANK" startContent={<Avatar alt="TURIIN BANK" className="w-6 h-6" src="https://cdn6.aptoide.com/imgs/b/3/5/b35c0ce51add96501f12db3b127b1109_icon.png" />}>
                      Төрийн Банк
                    </SelectItem>
                    <SelectItem key="M BANK" startContent={<Avatar alt="M BANK" className="w-6 h-6" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9OWAoZ4ChNhfYTyI7Knf4kwOfRM3xI8EF6g&s" />}>
                      М БАНК
                    </SelectItem>
                </Select>
                <Input
                    label="Таны Банкны дансны дугаар"
                    isRequired
                    labelPlacement="outside"
                    placeholder="Enter your ID"
                    variant="bordered"
                    size="md"
                    startContent={<HiCreditCard className="text-default-400 pointer-events-none flex-shrink-0" />}
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    type="number"
                    aria-label="resoltx"
                />
                <p className='text-red-500'>Тоглогчийн ID зөвхөн <a href="https://refpakrtsb.top/L?tag=d_3330381m_45415c_&site=3330381&ad=45415" className='text-black font-semibold underline underline-offset-4 dark:text-white'>resoltx</a> промо кодыг ашиглан бүртгүүлсэн байх ёстой ба дансны дугаар болон банк аа сайн шалгаж илгээнэ үү. Хэрэв асуух зүйл гарвал <a href="https://t.me/Resoltx" className='underline underline-offset-4 text-black font-semibold dark:text-white'>бидэнд</a> мэдэгдэнэ үү</p>
                <Button color="primary" type="submit">
                  <p className='text-black font-semibold'>Send Request</p>
                </Button>
              </form>
            </>
            ) : (
              <>
                <div className='flex gap-1'>
                  <p>Sorry you need to</p>
                  <a href="/auth/login" className='text-primary underline'>Login</a>
                  <p>for send parnet request</p>
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

const UserPartnerPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
      <UserPartner />
  </Suspense>
);

export default UserPartnerPage;
