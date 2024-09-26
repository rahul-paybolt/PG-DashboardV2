"use client";

import { title } from "@/lib/components/primitives";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { Snippet } from "@nextui-org/snippet";
import { FaCopy } from "react-icons/fa";


const AccountCard = () => {
  const [clientId, setClientId] = useState("your_actual_client_id");
  const [clientSecret, setClientSecret] = useState("your_actual_client_secret");

  const handleGenerate = () => {
    console.log("Generate Token Clicked");
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log(`${text} copied to clipboard`);
  };

  return (
    <Card className="w-full bg-purple-50 dark:bg-default-100 rounded-lg">
      <CardBody>
        <div className="flex items-center justify-between mb-6">
          <div className="w-2/3">
            <h2 className="text-lg font-semibold">API Credentials</h2>
            <p className="text-sm text-gray-500">
              Below are your API credentials. You can generate a new credentials anytime.
            </p>
            <div className="mt-6 space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Client ID</label>
                <Snippet 
                  className="w-full" 
                  onCopy={() => handleCopy(clientId)} 
                  copyIcon={<FaCopy />}
                  children = {"**********"}
                  symbol = ""
                />
                  
                
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Client Secret</label>
                <Snippet 
                  className="w-full" 
                  onCopy={() => handleCopy(clientSecret)} 
                  copyIcon={<FaCopy />}
                  symbol = ""
                  children = {"**********"}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Button className="bg-purple-400 text-white" onPress={handleGenerate}>
              Generate
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
};


export default function AccountPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    // <div>
    //   <h1 className={title()}>Account</h1>
    // </div>
    <div className="flex justify-center p-5">
      <section className="flex flex-col items-center w-full">
        {isLoading ? (
          <AccountCard />
        ) : (
          <AccountCard />
        )}
      </section>
    </div>
  );
}
