import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DashboardApiResponse } from "../interfaces/dashboard.interface";
import { safeAny } from "../interfaces/global.interface";
import { callAdminCollectionsStats, callAllMerchantCollections, callMerchantCollectionsById, callMerchantCollectionsDetailsById, callMerchantTransactionsById } from "../services/collections-service";
import { CollectionDetailsTransRes, CollectionsApiResponse, MerchantDetailsRes } from "../interfaces/transactions.interface";


//  collections Api's hooks for admin

export const getAdminCollectionData = (page:number,limit:number): UseQueryResult<[CollectionsApiResponse[] | null, safeAny], Error> => {
    return useQuery({
      queryKey: ["admin-collection-data"],
      queryFn: () => callAdminCollectionsStats(page,limit),
      refetchOnWindowFocus: true, // Refetch when the window is focused
    });
}   


export const getAdmincollectionByUserId = (userId:string| null, page:number,limit:number): UseQueryResult<[CollectionDetailsTransRes | null, safeAny], Error> => {
    return useQuery({
      queryKey: ["admin-collection-by-user-id"],
      queryFn: () => callMerchantCollectionsById(userId,page,limit),
      refetchOnWindowFocus: true, // Refetch when the window is focused
    });
}


export const getAdminCollectionDetailsByPayInId = (payInId:string): UseQueryResult<[MerchantDetailsRes | null, safeAny], Error> => {
    return useQuery({
      queryKey: ["admin-collection-details-by-pay-in-id"],
      queryFn: () => callMerchantCollectionsDetailsById(payInId),
      refetchOnWindowFocus: true, // Refetch when the window is focused
    });
}


// collections Api's hooks for merchant



export const getMerchantCollectionData = (page:number,limit:number): UseQueryResult<[CollectionsApiResponse | null, safeAny], Error> => {
    return useQuery({
      queryKey: ["merchant-collection-data"],
      queryFn: () => callAllMerchantCollections(page,limit),
      refetchOnWindowFocus: true, // Refetch when the window is focused
    });
}


export const getMerchantCollectionByUserId = (userId:string): UseQueryResult<[CollectionsApiResponse | null, safeAny], Error> => {
    return useQuery({
      queryKey: ["merchant-collection-by-user-id"],
      queryFn: () => callMerchantTransactionsById(userId),
      refetchOnWindowFocus: true, // Refetch when the window is focused
    });
}