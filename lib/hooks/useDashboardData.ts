import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DashboardApiResponse } from "../interfaces/dashboard.interface";
import { safeAny } from "../interfaces/global.interface";
import { callAdminDashboardData, callMerchantDashboardData } from "../services/dashboard-service";

export const getMerchantDashboardData = (): UseQueryResult<[DashboardApiResponse[] | null, safeAny], Error> => {
    return useQuery({
      queryKey: ["merchant-dashboard-data"],
      queryFn: () => callMerchantDashboardData(),
      refetchOnWindowFocus: true, // Refetch when the window is focused
      // staleTime: 1000 * 60 * 5,
    });
}
  
export const getAdminDashboardData = (): UseQueryResult<[DashboardApiResponse[] | null, safeAny], Error> => {
    return useQuery({
      queryKey: ["admin-dashboard-data"],
      queryFn: () => callAdminDashboardData(),
      refetchOnWindowFocus: true, // Refetch when the window is focused
      // staleTime: 1000 * 60 * 5,
    });
}