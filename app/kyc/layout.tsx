import { ReactNode } from "react";

const KYCLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col text-zinc-600 lg:w-1/2 dark:bg-default-100 dark:text-white ">
        <div className="max-w-lg w-full sm:max-w-3xl m-auto px-4 py-4 sm:shadow-md sm:rounded-3xl sm:rounded-b-none dark sm:mb-0  sm:flex-auto z-10 dark:sm-background">
            <header className="text-left mb-16 flex flex-col">
                <div className="flex items-center gap-x-4 mb-4  my-4 px-4 py-4">
                    <img src="/icon.png" alt="Organization Logo" className="w-28 h-32 rounded-full mr-4" />
                    <h1 className="text-2xl text-center font-bold">PayBolt</h1>
                </div>
                <div className="text-2xl text-white px-4 ">Complete KYC in just a few steps</div>
            </header>
          {children}
        </div>
      </div>
    </div>
  );
};

export default KYCLayout;