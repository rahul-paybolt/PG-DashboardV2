import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DashboardApiResponse } from "../interfaces/dashboard.interface";
import { safeAny } from "../interfaces/global.interface";
import { callAdminDashboardData, callMerchantDashboardData } from "../services/dashboard-service";
import { callAdminTransactionApi, callMerchantTransactionApi, callTransactionAdminDetailsApi, callTransactionMerchantDetailsApi } from "../services/transaction-service";
import {TransactionDetailsApiResponse} from "../interfaces/transaction-details.interface";

export const getMerchantTransactionsData = (): UseQueryResult<[DashboardApiResponse[] | null, safeAny], Error> => {
    return useQuery({
      queryKey: ["merchant-transactions-data"],
      queryFn: () => callMerchantTransactionApi(),
      refetchOnWindowFocus: true, // Refetch when the window is focused
      staleTime: 1000 * 60 * 5,
    });
}
  
export const getAdminTransactionsData = (): UseQueryResult<[DashboardApiResponse[] | null, safeAny], Error> => {
    return useQuery({
      queryKey: ["admin-transactions-data"],
      queryFn: () => callAdminTransactionApi(),
      refetchOnWindowFocus: true, // Refetch when the window is focused
      staleTime: 1000 * 60 * 5,
    });
}

export const getMerchantTransactionDetails = (id: string): UseQueryResult<[TransactionDetailsApiResponse[] | null, safeAny], Error> => {
    return useQuery({
      queryKey: ["transaction-details", id],
      queryFn: () => callTransactionMerchantDetailsApi(id),
      refetchOnWindowFocus: true, // Refetch when the window is focused
      staleTime: 1000 * 60 * 5,
    });
}

export const getAdminTransactionDetails = (id: string): UseQueryResult<[TransactionDetailsApiResponse[] | null, safeAny], Error> => {
    return useQuery({
      queryKey: ["transaction-details", id],
      queryFn: () => callTransactionAdminDetailsApi(id),
      refetchOnWindowFocus: true, // Refetch when the window is focused
      staleTime: 1000 * 60 * 5,
    });
}