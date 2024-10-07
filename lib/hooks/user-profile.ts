import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DashboardApiResponse } from "../interfaces/dashboard.interface";
import { safeAny } from "../interfaces/global.interface";
import { callAdminDashboardData, callMerchantDashboardData } from "../services/dashboard-service";
import { UsersApiResponse } from "../interfaces/users.interface";
import { callUsersProfileApi } from "../services/users-service";

export const getUserProfiles = (): UseQueryResult<[UsersApiResponse | null, safeAny], Error> => {
    return useQuery({
      queryKey: ["user-profiles"],
      queryFn: () => callUsersProfileApi(),
      refetchOnWindowFocus: true, // Refetch when the window is focused
      // staleTime: 1000 * 60 * 5,
    });
  }