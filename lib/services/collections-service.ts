
import { resolvePBApi } from "@/lib/utils/common-utils";
import {
  safeAny,
} from "@/lib/interfaces/global.interface";
import axios from "@/app/api/axios";
import { CollectionDetailsTransRes, CollectionsApiResponse, MerchantDetailsRes } from "../interfaces/transactions.interface";
import { GET_ALL_MERCHANT_DETAILS, GET_ALL_MERCHNAT_COLLECTIONS_STATS, GET_MERCHANT_COLLECTIONS_BY_ID, GET_MERCHANT_DETAILS_BY_ID, GET_MERCHANT_TRANSACTIONS_BY_ID } from "../constants/apiConstants/apiConstants";


const baseUrl = process.env.NEXT_PUBLIC_DEV_PB_BASE_URL;




// Admin collections Api's

export const callAdminCollectionsStats = async (page:number,limit:number): Promise<[CollectionsApiResponse | null, safeAny]> => {
  const [response, error] = await resolvePBApi<CollectionsApiResponse>(
    () => axios.get<CollectionsApiResponse>(`${baseUrl}/${GET_ALL_MERCHNAT_COLLECTIONS_STATS}?page=${page}&limit=${limit}`),
    false,
    true,
    false
  );
  return [response, error];
};


export const callMerchantCollectionsById = async (userId:string|null, page:number,limit:number): Promise<[CollectionDetailsTransRes | null, safeAny]> => {
  const [response, error] = await resolvePBApi<CollectionDetailsTransRes>(
    () => axios.get<CollectionDetailsTransRes>(`${baseUrl}/${GET_MERCHANT_COLLECTIONS_BY_ID}/${userId}?page=${page}&limit=${limit}`),
    false,
    true,       
    false   
  );
  return [response, error];
};


export const callMerchantCollectionsDetailsById = async (payInId:string): Promise<[MerchantDetailsRes   | null, safeAny]> => {
  const [response, error] = await resolvePBApi<MerchantDetailsRes>(
    () => axios.get<MerchantDetailsRes>(`${baseUrl}/${GET_MERCHANT_DETAILS_BY_ID}/${payInId}`),
    false,
    true,       
    false
  );
  return [response, error];
};


// Merchant collections Api's   

export const callAllMerchantCollections = async (page:number,limit:number): Promise<[CollectionsApiResponse | null, safeAny]> => {
  const [response, error] = await resolvePBApi<CollectionsApiResponse>(
    () => axios.get<CollectionsApiResponse>(`${baseUrl}/${GET_ALL_MERCHANT_DETAILS}?page=${page}&limit=${limit}`),
    false,
    true,       
    false
  );
  return [response, error];
};

export const callMerchantTransactionsById = async (userId:string): Promise<[CollectionsApiResponse | null, safeAny]> => {
  const [response, error] = await resolvePBApi<CollectionsApiResponse>(
    () => axios.get<CollectionsApiResponse>(`${baseUrl}/${GET_MERCHANT_TRANSACTIONS_BY_ID}/${userId}`),
    false,
    true,       
    false
  );
  return [response, error];
};



