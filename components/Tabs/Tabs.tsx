"use client";
import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import { tabsProps } from "@/constants/TransactionTabs/TransactionsTabs";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface TabsComponentProps {
  tabsData: tabsProps[];
}

export default function TabsComponent({ tabsData }: TabsComponentProps) {
  const router = useRouter();
  const currentPathName = usePathname();
  const [selectedTab, setSelectedTab] = useState(currentPathName);

  useEffect(() => {
    setSelectedTab(currentPathName);
  }, [currentPathName]);

  const handleTabChange = (key: string) => {
    setSelectedTab(key);
    router.push(key);
  };

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Dynamic tabs"
        fullWidth
        selectedKey={selectedTab}
        onSelectionChange={handleTabChange}
        classNames={{
          tabList: "py-2",
        }}
      >
        {tabsData.map((item) => (
          <Tab key={item.id} title={item.label} className="py-6">
            <Link href={item.id}>
              <Card>
                <CardBody>
                  <p>{item.label}</p>
                </CardBody>
              </Card>
            </Link>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
