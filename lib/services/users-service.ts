
  
  import { resolvePBApi } from "@/lib/utils/common-utils";
  import {
    safeAny,
  } from "@/lib/interfaces/global.interface";
  import axios from "@/app/api/axios";
  
  import { USERS_PROFILE } from "@/lib/constants/apiConstants/apiConstants";
import { UsersApiResponse } from "../interfaces/users.interface";
  
  const baseUrl = process.env.NEXT_PUBLIC_DEV_PB_BASE_URL;




  export const callUsersProfileApi = async (): Promise<[UsersApiResponse| null, safeAny]> => {
    const [response, error] = await resolvePBApi<UsersApiResponse>(
        () => axios.get<UsersApiResponse>(`${baseUrl}/${USERS_PROFILE}`),
        false,
        true,
        false
  );
    return [response, error];
};






