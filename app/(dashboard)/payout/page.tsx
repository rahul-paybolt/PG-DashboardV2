"use client";

import React, { useEffect, useState } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";

import { Button } from "@nextui-org/button";
import {
  users,
} from "@/lib/constants/recentTable/RecentTableData";
import {
  Pagination,
} from "@nextui-org/pagination";
import { getFromLocalStorage } from "@/lib/utils/localStorage-utils";
import { LocalStorageKeys, safeAny } from "@/lib/interfaces/global.interface";
import { getAdminTransactionsData, getMerchantTransactionsData } from "@/lib/hooks/use-transactions";
import { UseQueryResult } from "@tanstack/react-query";
import {
  Transaction,
  TransactionApiResponse,
} from "@/lib/interfaces/transactions.interface";
import TransactionDetails from "@/lib/components/transactionDetails/page";
import { isAdmin, isMerchant } from "@/lib/utils/utils";
import { DateRangePicker } from "@nextui-org/date-picker";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import { DateValue, RangeValue } from "@nextui-org/react";
import { CalendarDate, CalendarDateTime, ZonedDateTime } from "@internationalized/date";
import { downloadTransactionAdminAttachment, downloadTransactionMerchantAttachment } from "@/lib/services/transaction-service";
import { DownloadTransactionAttachmentRequest } from "@/lib/interfaces/download.interface";
import { useToast } from "@/lib/components/Toast/ToastContext";
import { CustomButton } from "@/lib/components/ButtonComponent/CustomButton";
import Transfermode from "@/lib/components/TransferMode/Transfermode";

const PayoutTransactions = () => {

  type User = (typeof users)[0];

  const { showToast } = useToast();
  type T = string | CalendarDate | CalendarDateTime | ZonedDateTime;
  const [payInData, setPayInData] = React.useState<Transaction[]>([]);
  const [dateRange, setDateRange] = useState<RangeValue<DateValue>>({
    start: parseDate("2024-04-01"),
    end: parseDate("2024-04-08"),
  } as safeAny);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const role = getFromLocalStorage(LocalStorageKeys.ROLE) as string;

  const adminTransactions = isAdmin(role)
    ? (getAdminTransactionsData() as UseQueryResult<
        TransactionApiResponse[] | null,
        Error
      >)
    : null;
  const merchantTransactions = isMerchant(role)
    ? (getMerchantTransactionsData() as UseQueryResult<
        TransactionApiResponse[] | null,
        Error
      >)
    : null;
  const [openTrnDetails, setOpenTrnDetails] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [openBeneModal, setBeneModal] = useState(false);

  useEffect(() => {
    if (isAdmin(role) && adminTransactions?.data) {
      if (
        Array.isArray(adminTransactions.data) &&
        adminTransactions.data.length > 0
      ) {
        setPayInData(adminTransactions.data[0]?.data || []);
      } else {
        setPayInData([]);
      }
    } else if (isMerchant(role) && merchantTransactions?.data) {
      if (
        Array.isArray(merchantTransactions.data) &&
        merchantTransactions.data.length > 0
      ) {
        setPayInData(merchantTransactions.data[0]?.data || []);
      } else {
        setPayInData([]);
      }
    } else {
      setPayInData([]);
    }
  }, [role, adminTransactions?.data, merchantTransactions?.data]);

  const pages = Math.ceil(payInData.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return payInData.slice(start, end);
  }, [page, payInData]);

  const handleViewDetails = (userId: string) => {
    setSelectedUserId(userId);
    setOpenTrnDetails(true);
  };

  const renderCell = (item: Transaction, columnKey: React.Key) => {
    switch (columnKey) {
      case "createdAt":
        return item.payInOrder?.createdAt
          ? new Date(item.payInOrder.createdAt).toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }).replace(",", "")
          : "-";
      case "txnType":
        return item.transactionType || "-";
      case "txnId":
        return item.id || "-";
      case "orderId":
        return item.payInOrder?.orderId || "-";
      case "status":
        return item.payInOrder?.status || "-";
      case "amount":
        return item.payInOrder?.amount || "-";
      case "commission":
        return item.payInOrder?.commissionAmount || "-";
      case "gst":
        return item.payInOrder?.gstAmount || "-";
      case "netAmount":
        return item.payInOrder?.netPayableAmount || "-";
      case "view-details":
        return (
          <Button
            size="md"
            className="bg-purple-600 text-white"
            onPress={() => handleViewDetails(item.id)}>
            View Details
          </Button>
        );
      default:
        return "N/A";
    }
  };

  const downloadFile = (res: safeAny, defaultFileName: string = 'transactions-report') => {

    const url = URL.createObjectURL(res);
  
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', defaultFileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  const formatDate = (date: Date) => {
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).replace(",", "");
  };

  const onDownload = async () => {
    const transactionsRequest: DownloadTransactionAttachmentRequest = {
      startDate: dateRange.start ? dateRange.start.toDate(getLocalTimeZone()).toISOString() : "",
      endDate: dateRange.end ? dateRange.end.toDate(getLocalTimeZone()).toISOString() : "",
      transactionType: "payin",
    };
    setLoadingDownload(true);

    let response, error;
    if (isMerchant(role)) {
      [response, error] = await downloadTransactionMerchantAttachment(transactionsRequest);
    } else if (isAdmin(role)) {
      [response, error] = await downloadTransactionAdminAttachment(transactionsRequest);
    }

    setLoadingDownload(false);

    if (error) {
      showToast("Error downloading the file:", error);
      return;
    }

    if (response) {
      downloadFile(response, 'transactions-report.csv');
      showToast("File downloaded successfully", "success");
    }
  }



  const openBeneficiaryModal = () => {
    setBeneModal((prev) => !prev);
  }


  if(openBeneModal) {
    return <Transfermode isOpen={openBeneModal} onClose={() => setBeneModal(false)} />
  }



  const renderTopContent = () => {
    return (
      <div className="flex items-center justify-between px-4 py-4 gap-4">
      <DateRangePicker
        classNames={{
          label: "text-purple-600 ",
          base: "bg-white dark:bg-default-200/60 rounded-xl !w-[400px] !h-[40px]",
          inputWrapper: [
            "bg-white",
            "dark:bg-default/60",
            "shadow-large",
            "hover:bg-white",
            "dark:hover:bg-default/70",
            "focus-within:!bg-white/50",
            "dark:focus-within:!bg-default/60",
            "border-none",
            "!cursor-text",
            // "!w-[400px]"
          ],
        }}
        aria-label="Date Range Picker"
        variant="bordered"
        value={dateRange}
        onChange={(range: RangeValue<DateValue>) => {
          setDateRange(range);
        }}
      />

      <div className="flex items-center gap-4">

        <CustomButton
          disabled={loadingDownload}
          isLoading={loadingDownload}
          className="bg-purple-600 text-white  ml-start mr-5"
          onClick={() => openBeneficiaryModal()}
        >
              Add Beneficiary
        </CustomButton>

        <CustomButton
          onClick={onDownload}
          disabled={loadingDownload}
          isLoading={loadingDownload}
          className="bg-purple-600 text-white w-fit ml-auto mr-5"
        >
          {loadingDownload ? "Downloading..." : "Download Payin Report"}
        </CustomButton>
        </div>
      </div>
    );
  }


  return (
    <>
      {/* <Table
        aria-label="Transactions-Table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={page => setPage(page)}
            />
          </div>
        }
        topContent={renderTopContent()}
        classNames={{
          wrapper: "min-h-[222px]",
          base: "min-h-[222px] mx-4 w-full",
        }}>
        <TableHeader>
          <TableColumn key="createdAt">Created At</TableColumn>
          <TableColumn key="txnType">TxnType</TableColumn>
          <TableColumn key="txnId">TxnId</TableColumn>
          <TableColumn key="orderId">OrderId</TableColumn>
          <TableColumn key="status">Status</TableColumn>
          <TableColumn key="amount">Amount</TableColumn>
          <TableColumn key="commission">Commission</TableColumn>
          <TableColumn key="gst">GST</TableColumn>
          <TableColumn key="netAmount">Net Amount</TableColumn>
          <TableColumn key="view-details">View Details</TableColumn>
        </TableHeader>
        <TableBody items={[]}>
          {items.length === 0 ? (
            <TableRow key="coming-soon">
              <TableCell colSpan={10} className="text-center text-gray-500">
                Coming Soon
              </TableCell>
            </TableRow>
          ) : (
            items.map(item => (
              <TableRow key={item.id} className="text-sm">
                {columnKey => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
       
      </Table> */}

      <div className="flex items-center justify-center text-purple-600 text-center mx-auto mt-10">
        Coming Soon
      </div>

      {openTrnDetails && selectedUserId && (
        <TransactionDetails
          userId={selectedUserId}
          onClose={() => setOpenTrnDetails(false)}
        />
      )}
    </>
  );
};

export default PayoutTransactions;