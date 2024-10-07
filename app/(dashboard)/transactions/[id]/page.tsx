"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Pagination, Spinner } from "@nextui-org/react";
import { getAdmincollectionByUserId } from "@/lib/hooks/use-collections";
import { CustomButton } from "@/lib/components/ButtonComponent/CustomButton";
import {
  CollectionsMerchantColumns,
  CollectionTransactionColumns,
} from "@/lib/constants/collections/collections.constants";
import {
  CollectionDetailsTransData,
  CollectionDetailsTransRes,
  MerchantDetailsData,
} from "@/lib/interfaces/transactions.interface";
import { UseQueryResult } from "@tanstack/react-query";
import TransactionDetails from "@/lib/components/transactionDetails/page";
import MerchantDetails from "@/lib/components/MerchantDetails/MerchantDetails";
import {
  formatAmount,
  formatStatus,
  getFormattedTime,
} from "@/lib/utils/utils";

const TransactionDetailsPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [merchantTransList, setMerchantTransList] = useState<
    CollectionDetailsTransData[]
  >([]);
  const [openMerchantDetails, setOpenMerchantDetails] =
    useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);
  const limit = 50;

  const { id: userId } = useParams<{ id: string }>() || { id: null };

  const merchantData = getAdmincollectionByUserId(
    userId,
    page,
    limit
  ) as UseQueryResult<CollectionDetailsTransRes | null, Error>;

  useEffect(() => {
    setLoading(true);
    if (Array.isArray(merchantData?.data) && merchantData?.data.length > 0) {
      setMerchantTransList(merchantData?.data[0]?.data?.data || []);
      setTotalItems(merchantData?.data[0]?.data?.pagination?.totalItems || 0);
    } else {
      setMerchantTransList([]);
    }
    setLoading(false);
  }, [merchantData.data]);

  const handleViewDetails = (userId: string) => {
    setSelectedUserId(userId);
    setOpenMerchantDetails(prev => !prev);
  };

  const renderCell = React.useCallback(
    (item: CollectionDetailsTransData, columnKey: React.Key) => {
      switch (columnKey) {
        case "fullName":
          return item.user.fullName || "-";
        case "createdAt":
          return item.createdAt
            ? getFormattedTime(new Date(item.createdAt))
            : "-";
        case "orderId":
          return item.orderId || "-";
        case "amount":
          return formatAmount(item.amount) || "-";
        case "netPayableAmount":
          return formatAmount(item.netPayableAmount) || "-";
        case "status":
          return formatStatus(item.status) || "-";
        case "settlementStatus":
          return formatStatus(item.settlementStatus) || "-";
        case "txnRefId":
          return item.txnRefId || "-";
        case "view-details":
          return (
            <CustomButton
              size="md"
              className="bg-purple-600 text-white"
              onClick={() => handleViewDetails(item.id)}>
              View Details
            </CustomButton>
          );
        default:
          return null;
      }
    },
    []
  );

  const pages = useMemo(() => {
    return Math.ceil(totalItems / limit);
  }, [totalItems, limit]);

  useEffect(() => {
    setLoading(true);
    merchantData.refetch().finally(() => {
      setLoading(false);
    });
  }, [page]);

  return (
    <>
      {loading ? (
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
          bottomContent={
            <div className="flex justify-center fixed bottom-[16px] left-1/2 -translate-x-1/2">
              <Pagination
                isCompact
                showControls
                showShadow
                page={page}
                initialPage={1}
                total={pages}
                onChange={currPage => setPage(currPage)}
                classNames={{
                  wrapper:
                    "bg-white dark:bg-default-200/60 rounded-xl !w-[400px] !h-[40px]",
                }}
                color="warning"
              />
            </div>
          }
          className="mx-4 my-4">
          <TableHeader columns={CollectionTransactionColumns}>
            {column => (
              <TableColumn
                key={column.key}
                align={column.key === "actions" ? "center" : "start"}>
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={merchantTransList} loadingContent={<Spinner />}>
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
      {openMerchantDetails && selectedUserId && (
        <MerchantDetails
          userId={selectedUserId}
          onClose={() => setOpenMerchantDetails(false)}
        />
      )}
    </>
  );
};

export default TransactionDetailsPage;
