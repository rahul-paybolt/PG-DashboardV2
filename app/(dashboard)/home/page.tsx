"use client";
import { Card, CardBody } from "@nextui-org/card";
import { TbDots } from "react-icons/tb";
import AnnualChart from "@/lib/components/charts/AnnualChart";
import ShowShortMessage from "@/lib/components/PopOver/PopOver";
import { useState } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import {
  formatAmount,
  formatNumber,
  isAdmin,
  isMerchant,
} from "@/lib/utils/utils";
import {
  getAdminDashboardData,
  getMerchantDashboardData,
} from "@/lib/hooks/useDashboardData";
import { getFromLocalStorage } from "@/lib/utils/localStorage-utils";
import { LocalStorageKeys, safeAny } from "@/lib/interfaces/global.interface";
import {
  DashboardApiResponse,
  Data,
  payin,
} from "@/lib/interfaces/dashboard.interface";
import { UseQueryResult } from "@tanstack/react-query";
import { unstable_noStore } from "next/cache";

const Simmer = () => {
  return (
    <Card className="min-w-[280px] w-full px-4 py-2 bg-zinc-50 dark:bg-default-100 rounded-md">
      <CardBody>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="w-24 h-6 rounded-md dark:bg-default-200" />
          <Skeleton className="w-5 h-6 rounded-md dark:bg-default-200" />
        </div>
      </CardBody>
    </Card>
  );
};

const SummaryCard = ({
  title,
  amount,
}: {
  title: string;
  amount: number | null;
}) => {
  unstable_noStore();
  return (
    <Card className="min-w-[280px] w-full px-4 py-2 bg-background dark:bg-default-100 rounded-md">
      <CardBody>
        <div className="flex items-center justify-between mb-4">
          <p className="font-normal text-secondary dark:text-primary">
            {title}
          </p>
          <ShowShortMessage
            Icon={TbDots}
            header={title}
            content={formatAmount(amount ?? 0)}
          />
        </div>
        <p className="text-xl font-semibold">{formatAmount(amount ?? 0)}</p>
      </CardBody>
    </Card>
  );
};

const SummaryCountCard = ({
  title,
  count,
}: {
  title: string;
  count: number | null;
}) => {
  unstable_noStore();
  return (
    <Card className="min-w-[280px] w-full px-4 py-2 bg-background dark:bg-default-100 rounded-md">
      <CardBody>
        <div className="flex items-center justify-between mb-4">
          <p className="font-normal text-secondary dark:text-primary">
            {title}
          </p>
          <ShowShortMessage
            Icon={TbDots}
            header={title}
            content={formatNumber(count ?? 0)}
          />
        </div>
        <p className="text-xl font-semibold">{formatNumber(count ?? 0)}</p>
      </CardBody>
    </Card>
  );
};

export default function Home() {
  unstable_noStore();

  const [isLoading, setIsLoading] = useState(false);

  let renderMerchantData: Data = {
    payin: {
      totalAmount: 0,
      totalCount: 0,
      successAmount: null,
      successCount: 0,
      failedAmount: null,
      failedCount: 0,
    },
    payout: {
      totalAmount: 0,
      totalCount: 0,
      successAmount: null,
      successCount: 0,
      failedAmount: null,
      failedCount: 0,
    },
  };
  const role = getFromLocalStorage(LocalStorageKeys.ROLE) as string;

  if (isMerchant(role)) {
    const { data, isLoading: isLoading } =
      getMerchantDashboardData() as UseQueryResult<
        DashboardApiResponse[] | null,
        Error
      >; // Adjusted type assertion
    renderMerchantData = data && (data?.[0]?.data as safeAny); // Optional chaining to handle undefined
  } else if (isAdmin(role)) {
    const { data } = getAdminDashboardData() as UseQueryResult<
      DashboardApiResponse[] | null,
      Error
    >; // Adjusted type assertion
    renderMerchantData = data && (data?.[0]?.data as safeAny);
  }

  return (
    <>
      <section className="flex flex-wrap items-start justify-between gap-5 px-5">
        <Card className="w-full px-8 py-8 mb-8">
          <h1 className="text-2xl font-bold mb-2 text-purple-600">
            Total Collections(PayIn)
          </h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {isLoading ? (
              <>
                <Simmer />
                <Simmer />
                <Simmer />
                <Simmer />
              </>
            ) : (
              <>
                <SummaryCard
                  title="Total initiated volume"
                  amount={
                    isAdmin(role)
                      ? renderMerchantData?.payin?.totalAmount ?? 0
                      : renderMerchantData?.payin?.totalAmount ?? 0
                  }
                />
                <SummaryCard
                  title="Total success Volume"
                  amount={
                    isAdmin(role)
                      ? renderMerchantData?.payin?.successAmount ?? 0
                      : renderMerchantData?.payin?.successAmount ?? 0
                  }
                />
                <SummaryCard
                  title="Total failed Volume"
                  amount={
                    isAdmin(role)
                      ? renderMerchantData?.payin?.failedAmount ?? 0
                      : renderMerchantData?.payin?.failedAmount ?? 0
                  }
                />
                <SummaryCountCard
                  title="Total Initiated count"
                  count={
                    isAdmin(role)
                      ? renderMerchantData?.payin?.totalCount ?? 0
                      : renderMerchantData?.payin?.totalCount ?? 0
                  }
                />
                <SummaryCountCard
                  title="Total success count"
                  count={
                    isAdmin(role)
                      ? renderMerchantData?.payin?.successCount ?? 0
                      : renderMerchantData?.payin?.successCount ?? 0
                  }
                />
                <SummaryCountCard
                  title="Total failed count"
                  count={
                    isAdmin(role)
                      ? renderMerchantData?.payin?.failedCount ?? 0
                      : renderMerchantData?.payin?.failedCount ?? 0
                  }
                />
              </>
            )}
          </div>
          {/* <div className="mt-5  py-4">
            <Card  className="flex items-center justify-between space-x-4">
              <CardBody className="flex items-center  space-x-4 ">  
                <AnnualChart data={renderMerchantData} name="PayIn" />
              </CardBody>
            </Card>
          </div> */}
        </Card>
        <Card className="w-full px-8 py-8">
          <h1 className="text-2xl font-bold mb-2 text-purple-600">
            Total Payouts(PayOut)
          </h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {isLoading ? (
              <>
                <Simmer />
                <Simmer />
                <Simmer />
                <Simmer />
              </>
            ) : (
              <>
                <SummaryCard
                  title="Total initiated volume"
                  amount={
                    isAdmin(role)
                      ? renderMerchantData?.payout?.totalAmount ?? 0
                      : renderMerchantData?.payout?.totalAmount ?? 0
                  }
                />
                <SummaryCard
                  title="Total success Volume"
                  amount={
                    isAdmin(role)
                      ? renderMerchantData?.payout?.successAmount ?? 0
                      : renderMerchantData?.payout?.successAmount ?? 0
                  }
                />
                <SummaryCard
                  title="Total failed Volume"
                  amount={
                    isAdmin(role)
                      ? renderMerchantData?.payout?.failedAmount ?? 0
                      : renderMerchantData?.payout?.failedAmount ?? 0
                  }
                />
                <SummaryCountCard
                  title="Total Initiated count"
                  count={
                    isAdmin(role)
                      ? renderMerchantData?.payout?.totalCount ?? 0
                      : renderMerchantData?.payout?.totalCount ?? 0
                  }
                />
                <SummaryCountCard
                  title="Total success count"
                  count={
                    isAdmin(role)
                      ? renderMerchantData?.payout?.successCount ?? 0
                      : renderMerchantData?.payout?.successCount ?? 0
                  }
                />
                <SummaryCountCard
                  title="Total failed count"
                  count={
                    isAdmin(role)
                      ? renderMerchantData?.payout?.failedCount ?? 0
                      : renderMerchantData?.payout?.failedCount ?? 0
                  }
                />
              </>
            )}
          </div>
          {/* <div className="mt-5  py-4">
            <Card  className="flex items-center justify-between space-x-4">
              <CardBody className="flex items-center justify-between space-x-4">  
                <AnnualChart data={renderMerchantData} name="PayOut" />
              </CardBody>
            </Card>
          </div> */}
        </Card>
      </section>
    </>
  );
}
