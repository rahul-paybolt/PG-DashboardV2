import React from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import { tabsProps } from "@/constants/TransactionTabs/TransactionsTabs";

interface TabsComponentProps {
  tabsData: tabsProps[];
}

export default function TabsComponent({ tabsData }: TabsComponentProps) {
  console.log("data", typeof tabsData);
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs">
        {tabsData.map((item) => (
          <Tab key={item.id} title={item.label}>
            <Card>
              <CardBody>
                <p>{item.label}</p>
              </CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
