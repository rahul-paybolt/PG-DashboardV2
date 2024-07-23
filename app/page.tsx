import { BalanceOverViewData } from "@/constants/balance-overview.constants";
import { BalanaceOverviewProps } from "@/interfaces/balance-overview";
import { Card, CardBody } from "@nextui-org/card";
import { TbDots } from "react-icons/tb";
import AnnualChart from "@/components/charts/AnnualChart";
import ShowShortMessage from "@/components/PopOver/PopOver";

export default function Home() {
  const expenesData = () => {
    return (
      <div className="flex items-center justify-between flex-wrap ">
        <div className="flex flex-col mb-4">
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-500">Income</span>
            <span className="w-[12px] h-[4px] bg-yellow-500 rounded-md px-2"></span>
          </div>
          <div className="flex items-center gap-x-2 mb-4">
            <span className="text-sm text-gray-400">&#x20b9; </span>
            <p className="text-sm">12,304</p>
          </div>
          <div className="flex bg-yellow-500 border min-h-[40px] min-w-[50px] rounded-md"></div>
        </div>
        <div className="flex flex-col mb-4 px-2">
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-300">Expenses</span>
            <span className="w-[12px] h-[4px] bg-green-500 rounded-md px-2"></span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-sm text-gray-400">&#x20b9; </span>
            <p className="text-sm">12,304</p>
          </div>
          <div className="flex bg-green-500 border min-h-[40px] min-w-[50px] rounded-md"></div>
        </div>
        <div className="flex flex-col mb-4">
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-300">Credit</span>
            <span className="w-[12px] h-[4px] bg-green-200 rounded-md px-2"></span>
          </div>
          <div className="flex items-center gap-x-2 mb-4">
            <span className="text-sm text-gray-400">&#x20b9; </span>
            <p className="text-sm">12,304</p>
          </div>
          <div className="flex bg-green-200 border min-h-[40px] min-w-[50px] rounded-md"></div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="flex flex-wrap items-start justify-start gap-5 px-5">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {BalanceOverViewData.map((balData: BalanaceOverviewProps, idx) => (
            <Card
              className="min-w-[280px] w-full px-4 py-2 dark:bg-default-100 rounded-md shadow-medium"
              key={idx}
            >
              <CardBody>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-normal text-black dark:text-white">
                    {balData.heading}
                  </p>
                  <ShowShortMessage
                    Icon={TbDots}
                    header={balData.heading}
                    content={balData.amount}
                  />
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-x-2">
                    <span className="text-sm text-gray-400">&#x20b9; </span>
                    <p className="text-[24px]">{balData.amount}</p>
                  </div>
                  <div className="flex gap-x-4 items-center">
                    <span className="text-gray-400 font-sans text-sm">
                      {balData.updated}
                    </span>
                    {/* <LuRefreshCw /> */}
                  </div>
                </div>
                {/* {expenesData()} */}
                {/* <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-400">Description</div>
                  <div className="text-sm text-gray-400 text-center">Value</div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">
                    Average annual profit
                  </div>
                  <div className="flex items-center gap-x-2">
                    <div className="text-sm">6.7%</div>
                    <IoIosArrowRoundUp />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">
                    Average annual return
                  </div>
                  <div className="flex items-center gap-x-2">
                    <div className="text-sm">3.2%</div>
                    <IoIosArrowRoundDown color="red" />
                  </div>
                </div> */}
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-5 pb-5 w-full min-h-[300px]">
          <div className="flex-1 shadow-medium  px-2 py-4 dark:bg-default-50 rounded-md">
            <AnnualChart />
          </div>
          <div className="flex-1 shadow-medium  px-2 py-4 dark:bg-default-50 rounded-md">
            <AnnualChart />
          </div>
        </div>
      </section>
    </>
  );
}
