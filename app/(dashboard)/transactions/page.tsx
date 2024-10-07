"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";

import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/pagination";
import { getFromLocalStorage } from "@/lib/utils/localStorage-utils";
import { LocalStorageKeys, safeAny } from "@/lib/interfaces/global.interface";
import { UseQueryResult } from "@tanstack/react-query";
import {
  CollectionsApiResponse,
  CollectionsTransactionsData,
  MerchantCollectionsData,
  Transaction,
} from "@/lib/interfaces/transactions.interface";
import TransactionDetails from "@/lib/components/transactionDetails/page";
import {
  formatAmount,
  formatNumber,
  isAdmin,
  isMerchant,
} from "@/lib/utils/utils";
import { DateRangePicker } from "@nextui-org/date-picker";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import {
  Card,
  CardBody,
  DateValue,
  RangeValue,
  Spinner,
} from "@nextui-org/react";
import {
  CalendarDate,
  CalendarDateTime,
  ZonedDateTime,
} from "@internationalized/date";
import {
  downloadTransactionAdminAttachment,
  downloadTransactionMerchantAttachment,
} from "@/lib/services/transaction-service";
import { DownloadTransactionAttachmentRequest } from "@/lib/interfaces/download.interface";
import { useToast } from "@/lib/components/Toast/ToastContext";
import { unstable_noStore } from "next/cache";
import {
  getAdminCollectionData,
  getMerchantCollectionData,
} from "@/lib/hooks/use-collections";
import {
  AdminCollectionsColumns,
  CollectionsMerchantColumns,
} from "@/lib/constants/collections/collections.constants";
import { CustomButton } from "@/lib/components/ButtonComponent/CustomButton";
import "../../../global.scss";
import MerchantDetails from "@/lib/components/MerchantDetails/MerchantDetails";
import MerchantTransactionDetails from "@/lib/components/transactionDetails/page";

const RecentTransactions = () => {
  unstable_noStore();

  const { showToast } = useToast();
  const router = useRouter();
  type T = string | CalendarDate | CalendarDateTime | ZonedDateTime;
  const role = getFromLocalStorage(LocalStorageKeys.ROLE) as string;

  const [adminCollectionsData, setAdminCollectionsData] = useState<safeAny[]>(
    []
  );
  const [merchantCollectionsData, setMerchantCollectionsData] = useState<
    safeAny[]
  >([]);
  const [dateRange, setDateRange] = useState<RangeValue<DateValue>>({
    start: parseDate(new Date().toISOString().split("T")[0]),
    end: parseDate(new Date().toISOString().split("T")[0]),
  } as safeAny);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

  const rowsPerPage = 50;

  const [openTrnDetails, setOpenTrnDetails] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [loadingDownload, setLoadingDownload] = useState(false);

  const query = isAdmin(role)
    ? getAdminCollectionData(page, rowsPerPage)
    : getMerchantCollectionData(page, rowsPerPage);

  const { data, isLoading, refetch } = query;

  useEffect(() => {
    if (data && data[0]) {
      if (isAdmin(role)) {
        const collectionsData = Array.isArray(data) ? data[0] : data;

        const dataArray = (collectionsData as any).data?.data || [];

        setAdminCollectionsData(Array.isArray(dataArray) ? dataArray : []);

        const totalItems = (collectionsData as any).data?.pagination
          ?.totalItems;
        setTotalRecords(typeof totalItems === "number" ? totalItems : 0);
      } else if (isMerchant(role)) {
        const responseData = Array.isArray(data) ? data : [data];

        if (responseData?.[0]) {
          const totalItems = (responseData[0] as safeAny)?.data?.pagination
            ?.totalItems;
          if (totalItems !== undefined) {
            setTotalRecords(totalItems);
          }
        }

        const validCollections = data
          .filter((item): item is NonNullable<typeof item> => item !== null)
          .flatMap(item => item.data?.data || [])
          .filter(
            (collection): collection is CollectionsApiResponse =>
              collection !== null &&
              typeof collection === "object" &&
              "id" in collection
          );
        setMerchantCollectionsData(validCollections);
      }
      setLoading(false);
    }
  }, [data]);

  const handleAdminViewDetails = (userId: string) => {
    router.push(`/transactions/${userId}`);
  };

  const handleMerchantViewDetails = (userId: string) => {
    setOpenTrnDetails(true);
    setSelectedUserId(userId);
  };

  const renderCell = React.useCallback(
    (
      item: CollectionsTransactionsData | MerchantCollectionsData,
      columnKey: React.Key
    ) => {
      if (isAdmin(role)) {
        const adminItem = item as CollectionsTransactionsData;
        switch (columnKey) {
          case "fullName":
            return adminItem.fullName || "-";
          case "initiatedTotalAmount":
            return formatAmount(adminItem.initiatedTotalAmount) || "-";
          case "successTotalAmount":
            return formatAmount(adminItem.successTotalAmount) || "-";
          case "failedTotalAmount":
            return formatAmount(adminItem.failedTotalAmount) || "-";
          case "pendingTotalAmount":
            return formatAmount(adminItem.pendingTotalAmount) || "-";
          case "initiatedCommissionAmount":
            return formatAmount(adminItem.initiatedCommissionAmount) || "-";
          case "successCommissionAmount":
            return formatAmount(adminItem.successCommissionAmount) || "-";
          case "failedCommissionAmount":
            return formatAmount(adminItem.failedCommissionAmount) || "-";
          case "pendingCommissionAmount":
            return formatAmount(adminItem.pendingCommissionAmount) || "-";
          case "initiatedGstAmount":
            return formatAmount(adminItem.initiatedGstAmount) || "-";
          case "successGstAmount":
            return formatAmount(adminItem.successGstAmount) || "-";
          case "failedGstAmount":
            return formatAmount(adminItem.failedGstAmount) || "-";
          case "pendingGstAmount":
            return formatAmount(adminItem.pendingGstAmount) || "-";
          case "initiatedNetPayableAmount":
            return formatAmount(adminItem.initiatedNetPayableAmount) || "-";
          case "successNetPayableAmount":
            return formatAmount(adminItem.successNetPayableAmount) || "-";
          case "failedNetPayableAmount":
            return formatAmount(adminItem.failedNetPayableAmount) || "-";
          case "pendingNetPayableAmount":
            return formatAmount(adminItem.pendingNetPayableAmount) || "-";
          case "initiatedTotalCount":
            return formatNumber(adminItem.initiatedTotalCount) || "-";
          case "successCount":
            return formatNumber(adminItem.successCount) || "-";
          case "failedCount":
            return formatNumber(adminItem.failedCount) || "-";
          case "pendingCount":
            return formatNumber(adminItem.pendingCount) || "-";
          case "view-details":
            return (
              <Button
                size="md"
                className="bg-purple-600 text-white"
                onPress={() => handleAdminViewDetails(adminItem.id)}>
                View Details
              </Button>
            );
        }
      } else if (isMerchant(role)) {
        const merchantItem = item as MerchantCollectionsData;
        switch (columnKey) {
          case "createdAt":
            return merchantItem.createdAt
              ? new Date(merchantItem.createdAt)
                  .toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })
                  .replace(",", "")
              : "-";
          case "orderId":
            return merchantItem.orderId || "-";
          case "amount":
            return merchantItem.amount || "-";

          case "netPayableAmount":
            return merchantItem.netPayableAmount || "-";
          case "settlementStatus":
            return merchantItem.settlementStatus || "-";
          case "createdAt":
            return merchantItem.createdAt
              ? new Date(merchantItem.createdAt)
                  .toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })
                  .replace(",", "")
              : "-";
          case "status":
            return merchantItem.status || "-";
          case "txnRefId":
            return merchantItem.txnRefId || "-";
          case "view-details":
            return (
              <Button
                size="md"
                className="bg-purple-600 text-white"
                onPress={() => handleMerchantViewDetails(merchantItem.id)}>
                View Details
              </Button>
            );
        }
      }
    },
    [adminCollectionsData, merchantCollectionsData]
  );

  const downloadFile = (
    res: safeAny,
    defaultFileName: string = "transactions-report"
  ) => {
    const url = URL.createObjectURL(res);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", defaultFileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const onDownload = async () => {
    const transactionsRequest: DownloadTransactionAttachmentRequest = {
      startDate: dateRange.start
        ? dateRange.start.toDate(getLocalTimeZone()).toISOString()
        : "",
      endDate: dateRange.end
        ? dateRange.end.toDate(getLocalTimeZone()).toISOString()
        : "",
      transactionType: "payin",
    };
    setLoadingDownload(true);

    let response, error;
    if (isMerchant(role)) {
      [response, error] = await downloadTransactionMerchantAttachment(
        transactionsRequest
      );
    } else if (isAdmin(role)) {
      [response, error] = await downloadTransactionAdminAttachment(
        transactionsRequest
      );
    }

    setLoadingDownload(false);

    if (error) {
      showToast("Error downloading the file:", error);
      return;
    }

    if (response) {
      downloadFile(response, "transactions-report.csv");
      showToast("File downloaded successfully", "success");
    }
  };

  useEffect(() => {
    setLoading(true);
    query.refetch().finally(() => {
      setLoading(false);
    });
  }, [page]);
  const pages = useMemo(() => {
    return Math.ceil(totalRecords / rowsPerPage);
  }, [totalRecords, rowsPerPage]);

  useEffect(() => {
    setLoading(true);
    query.refetch().finally(() => {
      setLoading(false);
    });
  }, [page]);

  return (
    <>
      {loading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-8 mx-4 my-4">
          <Spinner
            label="Loading"
            color="secondary"
            size="lg"
            labelColor="secondary"
            classNames={{ circle1: "bg-white-600 text-purple-800" }}
          />
        </div>
      ) : (
        <>
          <Card className="mx-4 my-4 mb-8 px-6 py-6">
            <CardBody>
              <div className="flex items-center justify-between">
                <DateRangePicker
                  classNames={{
                    label: "text-purple-600 ",
                    base: "bg-white dark:bg-default-200/60 rounded-xl !w-[400px] !h-[40px] !items-start ",
                    inputWrapper: [
                      "bg-white",
                      "dark:bg-default/60",
                      "shadow-md",
                      "hover:bg-white",
                      "dark:hover:bg-default/70",
                      "focus-within:!bg-white/50",
                      "dark:focus-within:!bg-default/60",
                      "border-none",
                      "!cursor-text",
                      "!px-4 !py-2",
                    ],
                  }}
                  aria-label="Date Range Picker"
                  variant="bordered"
                  value={dateRange}
                  onChange={(range: RangeValue<DateValue>) => {
                    setDateRange(range);
                  }}
                />
                <CustomButton
                  type="button"
                  className="bg-purple-600 text-white w-fit ml-auto mr-5"
                  onClick={onDownload}
                  disabled={loadingDownload}>
                  {loadingDownload ? "Downloading..." : "Download Payin Report"}
                </CustomButton>
              </div>
            </CardBody>
          </Card>
          <div className="overflow-x-auto">
            <Table
              aria-label="Collections-Table"
              classNames={{
                wrapper: "!h-[calc(100vh-180px)] !overflow-y-auto !relative",
              }}
              isHeaderSticky
              className="!mx-4 !my-4 !mb-8 transactions-table-first-column transactions-table-last-column">
              <TableHeader
                columns={
                  isAdmin(role)
                    ? AdminCollectionsColumns
                    : CollectionsMerchantColumns
                }>
                {column => (
                  <TableColumn
                    key={column.key}
                    align={column.key === "actions" ? "center" : "start"}>
                    {column.label}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody
                items={
                  isAdmin(role)
                    ? (adminCollectionsData as CollectionsTransactionsData[])
                    : (merchantCollectionsData as safeAny[])
                }
                loadingContent={<Spinner />}
                className="transactions-table">
                {item => (
                  <TableRow key={item.id}>
                    {columnKey => (
                      <TableCell className="whitespace-nowrap transactions-table">
                        {renderCell(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <Card className="flex items-center justify-center mx-4 my-4 mb-4 px-6 py-6">
            <Pagination
              isCompact
              showControls
              showShadow
              page={page}
              initialPage={1}
              total={pages}
              onChange={page => setPage(page)}
              className=" data-[hover]:text-purple-600 data-[focus]:text-purple-600"
              classNames={{
                wrapper:
                  "bg-white dark:bg-default-200/60 rounded-xl !w-[400px] !h-[40px]",
              }}
              color="warning"
            />
          </Card>
          {openTrnDetails && selectedUserId && isMerchant(role) && (
            <MerchantTransactionDetails
              userId={selectedUserId}
              onClose={() => setOpenTrnDetails(false)}
            />
          )}
        </>
      )}
    </>
  );
};

export default RecentTransactions;
