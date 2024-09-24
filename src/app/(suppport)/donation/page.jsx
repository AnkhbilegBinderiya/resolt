"use client"

import React from "react";
import { NextUIProvider } from '@nextui-org/react';
import { Input , Button, Link, Textarea, ButtonGroup} from "@nextui-org/react";
import Image from "next/image";
import { FaFacebookSquare, FaInstagramSquare, FaTelegram } from "react-icons/fa";

const Contact = () => {

  const [userBank, setUserBank] = React.useState('Худалдаа хөгжлийн банк');
  const [userAcc, setUserAcc] = React.useState('499 287 077');
  const [userName, setUserName] = React.useState('Б.Анхбилэг');

  const Tdb = async () =>{
    setUserBank("Худалдаа хөгжлийн банк")
    setUserAcc("499 287 077")
    setUserName("Б.Анхбилэг")
  }

  const Golomt = async () =>{
    setUserBank("Голомт Банк")
    setUserAcc("305 513 4722")
    setUserName("Б.Анхбилэг")
  }

  const Mbank = async () =>{
    setUserBank("М Банк")
    setUserAcc("8000 559699")
    setUserName("Б.Анхбилэг")
  }

  return (
    <NextUIProvider className="justify-center h-lvh flex px-12 bg-widget">
      <div className="w-full flex pt-16 mx-auto dark">
        <div className="w-full  rounded-3xl flex flex-col py-8">
          <div className="w-[80%] mx-auto flex flex-col gap-4">
            <div className="mb-8">
              <p className="text-center font-semibold text-2xl md:text-5xl text-white drop-shadow-lg shadow-primary">Donation</p>
            </div>
            <div className="flex flex-col md:flex-row w-full items-center">
              <div className="flex flex-col gap-4 w-full items-center">
                  <Image width={500} height={500} src='/assets/image/contact.png' alt="contact us"/>
              </div>
              <div className="flex flex-col gap-4 w-full">
              <ButtonGroup>
                <Button onClick={Tdb} >TDB</Button>
                <Button onClick={Golomt} >Golomt</Button>
                <Button onClick={Mbank} >M Bank</Button>
              </ButtonGroup>
                <div className="flex flex-col md:flex-row gap-4 text-xs">
                  <Input isReadOnly value={userBank} size="sm" variant="bordered" label="Bank" labelPlacement="outside"/>
                  <Input  isReadOnly value={userAcc} size="sm" variant="bordered" label="Account Number" labelPlacement="outside"/>
                  <Input  isReadOnly value={userName} size="sm" variant="bordered" label="Name" labelPlacement="outside"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NextUIProvider>
  )
  }
  
  export default Contact