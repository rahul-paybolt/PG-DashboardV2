"use client"
import { Card, CardBody } from "@nextui-org/card";
import { Button, Pagination, Table, TableColumn, TableCell, TableHeader, TableRow, TableBody } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { Snippet } from "@nextui-org/snippet";
import { FaCopy } from "react-icons/fa";
import CustomInput from "@/lib/components/InputContainer/Input";
import { useAdminGenerateSecretKey, useMerchantGenerateSecretKey, useUpdateWebhookUrl } from "@/lib/hooks/generate-secretKey";
import { getFromLocalStorage } from "@/lib/utils/localStorage-utils";
import { LocalStorageKeys, safeAny } from "@/lib/interfaces/global.interface";
import { useToast } from "@/lib/components/Toast/ToastContext";
import { getFormattedTime, isAdmin } from "@/lib/utils/utils";
import { queryClient } from "@/app/api/query-client";
import { callgetWebhookUrl, callValidateApiKey } from "@/lib/services/transaction-service";
import { getListOfWhitelistIps, useAddWhitelistIps, useDeleteWhitelistIps } from "@/lib/hooks/use-whitelistIps";
import { unstable_noStore } from "next/cache";
import { Spinner } from "@nextui-org/react";
import { GetWhitelistIpsResponse, WhitelistIpsResponse } from "@/lib/interfaces/white-list.interface";
import { CustomButton } from "@/lib/components/ButtonComponent/CustomButton";
import { IpListColumns } from "@/lib/constants/ipListColumns/ipListColumns";
import { UseQueryResult } from "@tanstack/react-query";

const DeveloperSection = () => {
  unstable_noStore();

  const [whitelistIps, setWhitelistIps] = useState<WhitelistIpsResponse[]>([]);
  const [addWhitelistIp, setAddWhitelistIp] = useState("");
  const [whitelistLoading, setWhitelistLoading] = useState(true);
  const [clientId, setClientId] = useState("your_actual_client_id");
  const [clientSecret, setClientSecret] = useState("your_actual_client_secret");
  const [mobile, setMobile] = useState("");
  const [updatePayoutWebhookUrl, setUpdatePayoutWebhookUrl] = useState("");
  const [updatePayInWebhookUrl, setUpdatePayInWebhookUrl] = useState("");
  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { showToast } = useToast();
  const role = getFromLocalStorage(LocalStorageKeys.ROLE) as string;

  const { mutate: mutateMerchant } = useMerchantGenerateSecretKey();
  const { mutate: mutateAdmin } = useAdminGenerateSecretKey();
  const { mutate: mutateUpdateWebhookUrl } = useUpdateWebhookUrl();

  const { mutate: mutateAddWhitelistIps } = useAddWhitelistIps();
  const { mutate: mutateDeleteWhitelistIps } = useDeleteWhitelistIps();
  const listOfWhitelistIps = getListOfWhitelistIps() as UseQueryResult<GetWhitelistIpsResponse | null, Error>;

  useEffect(() => {
    setWhitelistLoading(true);
    if (Array.isArray(listOfWhitelistIps?.data) && listOfWhitelistIps?.data.length > 0) {
      setWhitelistIps(listOfWhitelistIps?.data[0]?.data || []);
    }
    setWhitelistLoading(false);
    getValidateApiKey();
    getWebhookUrl();
  }, [listOfWhitelistIps.data]);

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

  const handleAddWhitelistIps = () => {
    mutateAddWhitelistIps({ ipAddress: addWhitelistIp }, {
      onSuccess: (data: any) => {
        const [response, error] = data;
        if (error) {
          showToast(error?.message, "error");
          return;
        }
        if (response) {
          showToast(response?.message, "success");
          listOfWhitelistIps?.refetch();
        }
      },
      onError: (error: safeAny) => {
        showToast(error?.message || "An error occurred", "error");
      },
    });
  };

  const handleDeleteWhitelistIps = (ipAddress: string) => {
    mutateDeleteWhitelistIps({ ipAddress }, {
      onSuccess: (data: any) => {
        const [response, error] = data;
        if (error) {
          showToast(error?.message, "error");
          return;
        }
        if (response) {
          showToast(response?.message, "success");
          listOfWhitelistIps?.refetch();
        }
      }
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
    setIsLoading(false);
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
    setIsLoading(false);
  };

  const renderCell = useCallback(
    (item: WhitelistIpsResponse, columnKey: React.Key) => {
      switch (columnKey) {
        case "ipAddress":
          return <span>{item.ipAddress || "-"}</span>;
        case "createdAt":
          return <span>{item.createdAt ? getFormattedTime(new Date(item.createdAt)) : "-"}</span>;
        case "updatedAt":
          return <span>{item.updatedAt ? getFormattedTime(new Date(item.updatedAt)) : "-"}</span>;
        case "view-details":
          return (
            <div className="flex items-center gap-x-8 justify-center">
              <CustomButton
                size="md"
                className="bg-purple-600 text-white"
                onClick={() => item && handleDeleteWhitelistIps(item.ipAddress)}
              >
                Delete
              </CustomButton>
            </div>
          );
        default:
          return null;
      }
    },
    []
  );

  if (isLoading) {
    return <Spinner />;
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
          <hr className="border-t-2 border-purple-400 mt-4" />
        </CardBody>
      </Card>
      <Card className="flex items-center justify-center bg-purple-50 dark:bg-default-100 rounded-lg w-[70%] mb-8">
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
              <hr className="border-t-2 border-purple-400 mt-4" />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="flex items-center justify-center bg-purple-50 dark:bg-default-100 rounded-lg w-[70%]">
        <CardBody>
          <div className="flex flex-col items-center justify-between mb-6 px-8 py-8">
            <div className="w-full">
              <h2 className="text-lg font-semibold">WhiteList Ip's</h2>
              <p className="text-sm text-gray-500">Add or remove IP's from the whitelist.</p>
              <hr className="border-t-2 border-purple-400 mt-4" />

              <div className="flex items-center justify-center mt-6 space-x-4">
                <div className="w-[70%]">
                  <CustomInput
                    value={addWhitelistIp}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddWhitelistIp(e.target.value)}
                    placeholder="Enter your IP Address"
                    label="IP Address"
                  />
                </div>
                <div className="w-[30%]">
                  <Button className="bg-purple-400 text-white w-full h-10" onPress={handleAddWhitelistIps}>
                    Add
                  </Button>
                </div>
              </div>
            </div>

            {whitelistLoading ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spinner
                  label="Loading"
                  color="secondary"
                  size="lg"
                  labelColor="secondary"
                  classNames={{ circle1: "bg-white-600 text-purple-800" }}
                />
              </div>
            ) : (
              <Table
                classNames={{
                  wrapper: "h-[calc(100vh-180px)] overflow-y-auto relative",
                }}
                isHeaderSticky
                aria-label="Collections-Table"
                className="mx-4 my-4"
                // bottomContent={
                //   <div className="flex justify-center fixed bottom-[16px] left-1/2 -translate-x-1/2">
                //     <Pagination
                //       isCompact
                //       showControls
                //       showShadow
                //       page={page}
                //       initialPage={1}
                //       total={10}
                //       onChange={currPage => setPage(currPage)}
                //       classNames={{
                //         wrapper:
                //           "bg-white dark:bg-default-200/60 rounded-xl !w-[400px] !h-[40px]",
                //       }}
                //       color="warning"
                //     />
                //   </div>
                // }
              >
                <TableHeader columns={IpListColumns}>
                  {column => (
                    <TableColumn
                      key={column.key}
                      align={column.key === "view-details" ? "center" : "start"}>
                      {column.label}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody items={whitelistIps || []} loadingContent={<Spinner />}>
                  {item => (
                    <TableRow key={item.id}>
                      {columnKey => (
                        <TableCell className="whitespace-nowrap">
                          {renderCell(item, columnKey)}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
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