
  
  import { resolvePBApi } from "@/lib/utils/common-utils";
  import {
      PBBaseResponse,
    safeAny,
  } from "@/lib/interfaces/global.interface";
  import axios from "@/app/api/axios";
  
import { GET_STATS_ADMIN, GET_STATS_MERCHANT } from "@/lib/constants/apiConstants/apiConstants";
import { DashboardApiResponse } from "../interfaces/dashboard.interface";
  
  const baseUrl = process.env.NEXT_PUBLIC_DEV_PB_BASE_URL;




  export const callMerchantDashboardData = async (): Promise<[DashboardApiResponse[]| null, safeAny]> => {
    const [response, error] = await resolvePBApi<DashboardApiResponse[]>(
        () => axios.get<DashboardApiResponse[]>(`${baseUrl}/${GET_STATS_MERCHANT}`),
        false,
        true,
        false
  );
    return [response, error];
};


export const callAdminDashboardData = async (): Promise<[DashboardApiResponse[]| null, safeAny]> => {
    const [response, error] = await resolvePBApi<DashboardApiResponse[]>(
        () => axios.get<DashboardApiResponse[]>(`${baseUrl}/${GET_STATS_ADMIN}`),
        false,
        true,
        false
  );
  return [response, error];
};






