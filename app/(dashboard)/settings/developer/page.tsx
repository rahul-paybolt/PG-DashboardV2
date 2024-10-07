"use client"
import { Card, CardBody } from "@nextui-org/card";

import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Snippet } from "@nextui-org/snippet";
import { FaCopy } from "react-icons/fa";
import CustomInput from "@/lib/components/InputContainer/Input";
import { useAdminGenerateSecretKey, useMerchantGenerateSecretKey, useUpdateWebhookUrl } from "@/lib/hooks/generate-secretKey";
import { getFromLocalStorage } from "@/lib/utils/localStorage-utils";
import { LocalStorageKeys, safeAny } from "@/lib/interfaces/global.interface";
import { useToast } from "@/lib/components/Toast/ToastContext";
import { isAdmin } from "@/lib/utils/utils";
import { queryClient } from "@/app/api/query-client";
import { SecretApiRequest } from "@/lib/interfaces/secret.interface";
import { callgetWebhookUrl, callValidateApiKey } from "@/lib/services/transaction-service";
import { unstable_noStore } from "next/cache";

import { Spinner } from "@nextui-org/react";
const DeveloperSection = () => {
  unstable_noStore();

  const [clientId, setClientId] = useState("your_actual_client_id");
  const [clientSecret, setClientSecret] = useState("your_actual_client_secret");
  const [mobile, setMobile] = useState("");
  const [updatePayoutWebhookUrl, setUpdatePayoutWebhookUrl] = useState("");
  const [updatePayInWebhookUrl, setUpdatePayInWebhookUrl] = useState("");
  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const { showToast } = useToast();
  const role = getFromLocalStorage(LocalStorageKeys.ROLE) as string;

  useEffect(() => {
    getValidateApiKey();
    getWebhookUrl();
  }, []);

  const { mutate: mutateMerchant } = useMerchantGenerateSecretKey();
  const { mutate: mutateAdmin } = useAdminGenerateSecretKey();
  const { mutate: mutateUpdateWebhookUrl } = useUpdateWebhookUrl();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsSecretVisible(true);
    showToast(`${text} copied to clipboard`, "success");
  };

  const handleGenerateSecretKey = () => {
    const mutation = isAdmin(role) ? mutateAdmin : mutateMerchant;
    const payload = { mobile };

    mutation(payload, {
      onSuccess: (data: [any, any]) => {
        queryClient.invalidateQueries({ queryKey: ["secretKey"] });

        const [response, error] = data;
        if (error) {
          showToast(error?.message, "error");
          return;
        }
        if (response) {
          setClientId(response.data.clientId);
          setClientSecret(response.data.clientSecret);
        }
      },
      onError: (error: any) => {
        showToast(error?.message || "An error occurred", "error");
      },
    });
  };

  const handleUpdateWebhookUrl = () => {
    mutateUpdateWebhookUrl({ webhookUrl: { payInWebhookUrl: updatePayInWebhookUrl, payOutWebhookUrl: updatePayoutWebhookUrl } }, {
      onSuccess: (data: any) => {
        const [response, error] = data;
        if (error) {
          showToast(error?.message, "error");
          return;
        }
        if (response) {
          showToast(response?.message, "success");
        }
      },
      onError: (error: safeAny) => {
        showToast(error?.message || "An error occurred", "error");
      },
    });
  };

  const getValidateApiKey = async () => {
    const [response, error] = await callValidateApiKey();
    if (error) {
      showToast(error?.message, "error");
    }
    if (response) {
      const { clientId, clientSecret } = response?.data;
      setClientId(clientId);
      setClientSecret(clientSecret);
    }
    setIsLoading(false); // Stop loading after the data is fetched
  };

  const getWebhookUrl = async () => {
    const [response, error] = await callgetWebhookUrl();
    if (error) {
      showToast(error?.message, "error");
    }
    if (response) {
      const { payInWebhookUrl, payOutWebhookUrl } = response?.data;
      setUpdatePayInWebhookUrl(payInWebhookUrl);
      setUpdatePayoutWebhookUrl(payOutWebhookUrl);
    }
    setIsLoading(false); // Stop loading after the data is fetched
  };

  if (isLoading) {
    return <Spinner />; // Render a loader while data is being fetched
  }

  return (
    <>
      <Card className="flex items-center justify-center bg-purple-50 dark:bg-default-100 rounded-lg w-[70%] mb-8">
        <CardBody>
          <div className="flex items-center justify-between mb-6 px-8 py-8">
            <div className="w-2/3">
              <h2 className="text-lg font-semibold">API Credentials</h2>
              <p className="text-sm text-gray-500">
                Below are your API credentials. You can generate new credentials anytime.
              </p>
              <div className="mt-6 space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Client ID</label>
                  <Snippet
                    className="w-full"
                    onCopy={() => handleCopy(clientId)}
                    copyIcon={<FaCopy />}
                    children={isSecretVisible ? clientId : "***************"}
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Client Secret</label>
                  <Snippet
                    className="w-full"
                    onCopy={() => handleCopy(clientSecret)}
                    copyIcon={<FaCopy />}
                    children={isSecretVisible ? clientSecret : "***************"}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center w-1/3 ml-4">
              <Button className="bg-purple-400 text-white w-full" onPress={handleGenerateSecretKey}>
                Generate
              </Button>
            </div>
          </div>
          {/* Horizontal Line */}
          <hr className="border-t-2 border-purple-400 mt-4" />
        </CardBody>
      </Card>
      <Card className="flex items-center justify-center bg-purple-50 dark:bg-default-100 rounded-lg w-[70%]">
        <CardBody>
          <div className="flex items-center justify-between mb-6 px-8 py-8">
            <div className="w-full">
              <h2 className="text-lg font-semibold">Webhook URL</h2>
              <p className="text-sm text-gray-500">Update your webhook URL.</p>
              <div className="flex items-center justify-center mt-6 space-x-4">
                <div className="w-[70%]">
                  <CustomInput
                    value={updatePayInWebhookUrl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdatePayInWebhookUrl(e.target.value)}
                    placeholder="Enter your webhook URL"
                    label="PayInWebhook URL"
                  />
                </div>
                <div className="w-[70%]">
                  <CustomInput
                    value={updatePayoutWebhookUrl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdatePayoutWebhookUrl(e.target.value)}
                    placeholder="Enter your webhook URL"
                    label="PayOut Webhook URL"
                  />
                </div>
                <div className="w-[30%]">
                  <Button className="bg-purple-400 text-white w-full h-10" onPress={handleUpdateWebhookUrl}>
                    Update
                  </Button>
                </div>
              </div>
              {/* Horizontal Line */}
              <hr className="border-t-2 border-purple-400 mt-4" />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default function AccountPage() {
  return (
    <div className="flex justify-center p-5">
      <section className="flex flex-col items-center w-full">
        <DeveloperSection />
      </section>
    </div>
  );
}
