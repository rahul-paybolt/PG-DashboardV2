"use client";
import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import { useRouter } from "next/navigation";

import { tabsProps } from "@/lib/constants/TransactionTabs/TransactionsTabs";
interface TabsComponentProps {
  tabsData: tabsProps[];
}

export default function TabsComponent({ tabsData }: TabsComponentProps) {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("/transactions");

  useEffect(() => {
    router.push(selectedTab);
  }, [selectedTab]);

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Dynamic tabs"
        classNames={{
          base: "px-4",
          tabContent:
            "group-data-[selected=true]:text-secondary dark:group-data-[selected=true]:text-primary",
        }}
        fullWidth={true}
        items={tabsData}
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key as string)}
      >
        {(item) => (
          <Tab key={item.id} className="py-6" title={item.label}></Tab>
        )}
      </Tabs>
    </div>
  );
}
