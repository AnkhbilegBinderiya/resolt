"use client"

import { React, useEffect, useState } from 'react'
import { NextUIProvider, DatePicker, Input, Select, SelectItem, Button, Avatar} from "@nextui-org/react";
import { PiGenderIntersexLight } from "react-icons/pi";
import { PiGenderFemale } from "react-icons/pi";
import { PiGenderMale } from "react-icons/pi";
import { CiBank } from "react-icons/ci";
import { CiMoneyCheck1 } from "react-icons/ci";
import { MdOutlineNumbers } from "react-icons/md";
import { CiMobile1 } from "react-icons/ci";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation'



const Edit = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [bank, setBank] = useState('');
    const [accountNum, setAccountNum] = useState('');
    const [app, setApp] = useState('');
    const [appNum, setAppNum] = useState('');
    const searchParams = useSearchParams();
    const name = searchParams.get('u');

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:6969/user/data/name/${name}`);
            if (!response.ok) {
             throw new Error(`No data found`);
            }
            const result = await response.json();
            setData(result);
            setProfile(result.profile);
        } catch (error) {
            setData([]);
            setError(error.message);
        }
        };
        fetchData();
    }, [name]);

    const handleBack = () => {
        window.location.href = `/user/${name}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(bank && !accountNum){
            toast.error("If you fill bank. You need to fill Your bank account number too.", {position: 'top-center'});
            return;
        }

        if(accountNum && !bank){
            toast.error("If you fill bank account number. You need to fill Your bank too.", {position: 'top-center'});
            return;
        }

        if(bank && accountNum){
            if (accountNum.length < 9 || accountNum.length > 13) {
                toast.error("Your accnout number is wrong", {position: 'top-center'});
                return;
              }
        }

        if(app && !appNum){
            toast.error("If you fill app. You need to fill Your application gamer ID.", {position: 'top-center'});
            return;
        }

        if(appNum && !app){
            toast.error("If you fill gamer ID. You need to fill your app too.", {position: 'top-center'});
            return;
        }

        if(appNum && app){
            if (accountNum.length < 7 || accountNum.length > 13) {
                toast.error("Your gamer ID is wrong", {position: 'top-center'});
                return;
              }
        }
        
        const payload = {
          gender,
          age,
          bank,
          accountNum,
          app,
          appNum,
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
                <p className='text-black dark:text-white font-semibold text-center'>{name} personal data</p>
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4 md:justify-center">
                    <Select
                        label="Your gender"
                        labelPlacement="outside"
                        placeholder="gender"
                        variant="bordered"
                        disabled
                        size="md"
                        startContent={<PiGenderIntersexLight className="pointer-events-none flex-shrink-0" />}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <SelectItem key="Man" startContent={<PiGenderMale className="text-blue-500 pointer-events-none flex-shrink-0" />}>
                            Male
                        </SelectItem>
                        <SelectItem key="Woman" startContent={<PiGenderFemale className="text-pink-500 pointer-events-none flex-shrink-0" />}>
                            Female
                        </SelectItem>
                    </Select>
                    <Input
                        label="Your age"
                        labelPlacement="outside"
                        placeholder="age"
                        variant="bordered"
                        size="md"
                        startContent={<MdOutlineNumbers className="text-default-400 pointer-events-none flex-shrink-0" />}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        type="number"
                    />
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-lg'>Payment Section</p>
                        <p className='text-sm'>Please only after the registration promo code <a href="" className='font-semibold'>ResoltX</a> and fill save this label. Then you get your cashback when you want anytime, anywhere. <a href="" className='text-primary underline-offset-2 underline'>What is cashback ?</a></p>
                    </div>
                    <Select
                        labelPlacement="outside"
                        label="Your Bank"
                        variant="bordered"
                        placeholder="Select your bank"
                        value={bank}
                        onChange={(e) => setBank(e.target.value)}
                        startContent={<CiBank className="text-default-400 pointer-events-none flex-shrink-0" />}
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
                        label="Your Bank Account Number"
                        labelPlacement="outside"
                        placeholder="Bank Account Number"
                        variant="bordered"
                        size="md"
                        startContent={<CiMoneyCheck1 className="text-default-400 pointer-events-none flex-shrink-0" />}
                        value={accountNum}
                        onChange={(e) => setAccountNum(e.target.value)}
                        type="number"
                    />
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold text-lg'>Partner Section</p>
                        <p className='text-sm'>Please only after the registration promo code <a href="" className='font-semibold'>ResoltX</a> and fill save this label. If you are not partner you can follow this link and know all iformation. <a href="" className='text-primary underline-offset-2 underline'>What is partner ?</a></p>
                    </div>
                    <Select
                        label="Your partner app"
                        labelPlacement="outside"
                        placeholder="Your app"
                        variant="bordered"
                        disabled
                        size="md"
                        startContent={<CiMobile1 className="text-default-400 pointer-events-none flex-shrink-0" />}
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
                        label="Your app account number"
                        labelPlacement="outside"
                        placeholder="Your app account number"
                        variant="bordered"
                        size="md"
                        startContent={<MdOutlineNumbers className="text-default-400 pointer-events-none flex-shrink-0" />}
                        value={appNum}
                        onChange={(e) => setAppNum(e.target.value)}
                        type="number"
                    />
                    <div className='flex md:flex-row flex-col gap-4'>
                        <Button onClick={handleBack} className='bg-widgetLight dark:bg-labelDark w-full'>
                            <p className='text-black dark:text-white font-semibold '>Go back</p>
                        </Button>
                        <Button color="primary" type="submit" className='w-full bg-primary'>
                            <p className='text-black font-semibold '>Save</p>
                        </Button>
                    </div>
                </form>
            </div>
          </div>
  
          <div className='hidden md:flex lg:w-1/4 mt-1'></div>
        </div>
      </NextUIProvider>
  )
}

export default Edit