import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { React, useEffect, useState } from 'react'
import { NextUIProvider, Input, Button } from "@nextui-org/react";
import { toast } from 'react-toastify';
import Image from 'next/image'
import Link from "next/link";

const CustomerDataTable = () => {
    const [data, setData] = useState([]);
    const [editor, setEditor] = useState(false);
    const [dtl, setDtl] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [profile, setProfile] = useState(null);
    const [planId, setPlanId] = useState(null);
    const [planStart, setPlanStart] = useState(null);
    const [planEnd, setPlanEnd] = useState(null);
    const [partnerId, setPartnerId] = useState(null);
    const [partnerPoint, setPartnerPoint] = useState(null);
    const [appName, setAppName] = useState(null);
    const [appId, setAppId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

        try {
            const response = await fetch(`http://localhost:6969/admin/crm/customer/data`);
            if (!response.ok) {
            throw new Error(`No data found`);
            }
            const result = await response.json();
            setData(result)
        } catch (error) {
            console.log(error);;
        }

        };
        fetchData();
    }, []);

    const extractDate = (isoDateString) => {
        return isoDateString.split('T')[0];
    }

    const valueSetter = (dtl, customer, profile, planId, planStart, planEnd, partnerId, partnerPoint, appName, appId) =>{
      setDtl(dtl);
      setCustomer(customer);
      setProfile(profile);
      setPlanId(planId);
      setPlanStart(planStart);
      setPlanEnd(planEnd);
      setPartnerId(partnerId);
      setPartnerPoint(partnerPoint);
      setAppName(appName);
      setAppId(appId);
      setEditor(true);
    }

    const saveCustomerData = async () => {
      const payload = {
        dtl : dtl,
        customer : customer,
        profile : profile,
        planId : planId,
        planStart : planStart,
        planEnd : planEnd,
        partnerId : partnerId,
        partnerPoint : partnerPoint,
        appName : appName,
        appId : appId,
      };

      try {
        // Send the POST request
        const response = await fetch("http://localhost:6969/admin/crm/customer/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          // Handle successful response
          const data = await response.json();

          const { message } = data;
          toast.success(`Success`, {position: 'top-center'});
        } else {
          // Handle error response
          const errorData = await response.json();
          toast.error(`${errorData.message}`, {position: 'top-center'});
        }
      } catch (error) {
        alert(`An error occurred: ${error.message}`);
      }
    }

    if(editor){
      return (
        <NextUIProvider>
          <div className="w-full flex flex-col gap-4 mt-12">
            <Input
                  label="#"
                  labelPlacement="outside"
                  placeholder="--------"
                  disabled
                  variant="flat"
                  size="md"
                  value={dtl}
                  onChange={(e) => setDtl(e.target.value)}
            />
            <Input
                  label="customer_id"
                  labelPlacement="outside"
                  placeholder="--------"
                  disabled
                  variant="flat"
                  size="md"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
            />
            <Input
                  label="profile"
                  labelPlacement="outside"
                  placeholder="--------"
                  disabled
                  variant="flat"
                  size="md"
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
            />
            <Input
                  label="plan_id"
                  labelPlacement="outside"
                  placeholder="--------"
                  variant="bordered"
                  size="md"
                  value={planId}
                  onChange={(e) => setPlanId(e.target.value)}
            />
            <Input
                  label="plan_start"
                  labelPlacement="outside"
                  placeholder="--------"
                  variant="bordered"
                  size="md"
                  value={planStart}
                  onChange={(e) => setPlanStart(e.target.value)}
            />
            <Input
                  label="plan_end"
                  labelPlacement="outside"
                  placeholder="--------"
                  variant="bordered"
                  size="md"
                  value={planEnd}
                  onChange={(e) => setPlanEnd(e.target.value)}
            />
            <Input
                  label="partner_id"
                  labelPlacement="outside"
                  placeholder="--------"
                  variant="flat"
                  disabled
                  size="md"
                  value={partnerId}
                  onChange={(e) => setPartnerId(e.target.value)}
            />
            <Input
                  label="partner_point"
                  labelPlacement="outside"
                  placeholder="--------"
                  variant="flat"
                  disabled
                  size="md"
                  value={partnerPoint}
                  onChange={(e) => setPartnerPoint(e.target.value)}
            />
            <Input
                  label="app_name"
                  labelPlacement="outside"
                  placeholder="--------"
                  variant="bordered"
                  size="md"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
            />
            <Input
                  label="app_id"
                  labelPlacement="outside"
                  placeholder="--------"
                  variant="bordered"
                  size="md"
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
            />
            <button onClick={() => saveCustomerData()} className="bg-blue-700 text-white py-2 px-4 rounded-lg">
              Save
            </button>
          </div>
        </NextUIProvider>
      )
    }else{
    return (
        <div className="w-full">
          <Table 
            color={"default"}
            removeWrapper={false}
            isHeaderSticky={true}
            selectionMode="single"
            aria-label="Example static collection table"
            shadow="none"
          >
          <TableHeader className="bg-primary">
            <TableColumn className="bg-black text-white text-center">#</TableColumn>
            <TableColumn className="bg-black text-white">customer</TableColumn>
            <TableColumn className="bg-black text-white">profile</TableColumn>
            <TableColumn className="bg-black text-white">plan_id</TableColumn>
            <TableColumn className="bg-black text-white">plan_start</TableColumn>
            <TableColumn className="bg-black text-white">plan_end</TableColumn>
            <TableColumn className="bg-black text-white">partner_id</TableColumn>
            <TableColumn className="bg-black text-white">partner_point</TableColumn>
            <TableColumn className="bg-black text-white">app_name</TableColumn>
            <TableColumn className="bg-black text-white">app_id</TableColumn>
            <TableColumn className="bg-black text-white">Action</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map((row) =>
              <TableRow key={row.team_id}>
                <TableCell className="text-xs text-center md:text-sm">{row.dtl_id}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.customer_id} - {row.username}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.profile}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.plan_id ? row.plan_id : '-'}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.plan_start ? extractDate(row.plan_start) : '-'}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.plan_end ? extractDate(row.plan_end) : '-'}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.partner_id ? row.partner_id : '-'}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.partner_point ? row.partner_point : '-'}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.app_name ? row.app_name : '-'}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.app_id ? row.app_id : '-'}</TableCell>
                <TableCell className="text-xs md:text-sm"><button onClick={() => valueSetter(row.dtl_id, row.customer_id, row.profile, row.plan_id, row.plan_start, row.plan_end, row.partner_id, row.partner_point, row.app_name, row.app_id)} className="bg-primary px-3 py-1 rounded-md">Edit</button></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      );
    }
}

export default CustomerDataTable