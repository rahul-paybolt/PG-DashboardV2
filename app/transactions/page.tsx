"use client"
import React, { useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import TransactionsTabs from "@/constants/TransactionTabs/TransactionsTabs";
import TabsComponent from "@/components/Tabs/Tabs";
export default function Transactions() {

  return (
    <div className="flex w-full flex-col px-4 py-4">
       <TabsComponent tabsData={TransactionsTabs}/>
    </div>  
  );
}
