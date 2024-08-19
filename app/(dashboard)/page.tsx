"use client";

import { BalanceOverViewData } from "@/lib/constants/balance-overview.constants";
import { BalanceOverviewProps as BalanceOverviewProps } from "@/lib/interfaces/balance-overview";
import { Card, CardBody } from "@nextui-org/card";
import { TbDots } from "react-icons/tb";
import AnnualChart from "@/lib/components/charts/AnnualChart";
import ShowShortMessage from "@/lib/components/PopOver/PopOver";
import { useState } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { formatAmount } from "@/lib/utils/utils";

const Simmer = () => {
  return (
    <Card className="min-w-[280px] w-full px-4 py-2 bg-zinc-50 dark:bg-default-100 rounded-md">
      <CardBody>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="w-24 h-6 rounded-md dark:bg-default-200" />
          <Skeleton className="w-5 h-6 rounded-md dark:bg-default-200" />
        </div>
        <div className="flex flex-col items-start gap-2">
          <Skeleton className="w-24 h-6 rounded-md dark:bg-default-200" />
          <Skeleton className="w-40 h-6 rounded-md dark:bg-default-200" />
        </div>
      </CardBody>
    </Card>
  );
};

const SummaryCard = (balData: BalanceOverviewProps) => {
  return (
    <Card className="min-w-[280px] w-full px-4 py-2 bg-background dark:bg-default-100 rounded-md">
      <CardBody>
        <div className="flex items-center justify-between mb-4">
          <p className="font-normal text-secondary dark:text-primary">
            {balData.heading}
          </p>
          <ShowShortMessage
            Icon={TbDots}
            header={balData.heading}
            content={formatAmount(balData.amount)}
          />
        </div>
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-x-1 text-secondary dark:text-primary">
            <p className="text-[24px] font-semibold">
              {formatAmount(balData.amount)}
            </p>
          </div>
          <div className="flex gap-x-4 items-center">
            <span className="text-secondary-300 dark:text-primary-300 font-sans text-sm">
              {balData.updated}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <section className="flex flex-wrap items-start justify-start gap-5 px-5">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {isLoading ? (
            <>
              <Simmer />
              <Simmer />
              <Simmer />
              <Simmer />
            </>
          ) : (
            BalanceOverViewData.map((balData: BalanceOverviewProps, idx) => (
              <SummaryCard key={idx} {...balData} />
            ))
          )}
        </div>
        <div className="flex flex-wrap items-center gap-5 pb-5 w-full min-h-[300px]">
          <div className="flex-1 text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium transition-transform-background motion-reduce:transition-none min-w-[280px] w-full px-4 py-8 bg-background dark:bg-default-100 rounded-md">
            {isLoading ? (
              <div className="w-full h-[300px]">
                <Skeleton className="w-full h-full dark:bg-default-200 rounded-md" />
              </div>
            ) : (
              <AnnualChart />
            )}
          </div>
          <div className="flex-1 text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium transition-transform-background motion-reduce:transition-none min-w-[280px] w-full px-4 py-8 bg-background dark:bg-default-100 rounded-md">
            {isLoading ? (
              <div className="w-full h-[300px]">
                <Skeleton className="w-full h-full dark:bg-default-200 rounded-md" />
              </div>
            ) : (
              <AnnualChart />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
