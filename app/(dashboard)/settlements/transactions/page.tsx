"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Tab, Tabs } from "@nextui-org/tabs";

import {
  chargeColumns,
  chargeRows,
  refundColumns,
  refundRows,
  transactionsTabs,
} from "@/utils/settlement.constant";
import { TableComponent } from "@/components/Table";

const ChargePage = () => {
  const pathName = usePathname();

  const [selectedTab, setSelectedTab] = useState(pathName);

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="tabs"
        items={transactionsTabs}
        fullWidth={true}
        classNames={{
          base: "px-5 w-fit",
          tabContent:
            "group-data-[selected=true]:text-secondary dark:group-data-[selected=true]:text-primary",
        }}
        selectedKey={selectedTab}
        onSelectionChange={key => setSelectedTab(key as string)}>
        {item => (
          <Tab key={item.id} title={item.label} className="py-5">
            <TableComponent
              columns={
                item.id === "/settlements/charges"
                  ? chargeColumns
                  : refundColumns
              }
              rows={
                item.id === "/settlements/charges" ? chargeRows : refundRows
              }
              className="px-5"
            />
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default ChargePage;
