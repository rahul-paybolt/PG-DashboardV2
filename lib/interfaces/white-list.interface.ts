export interface WhitelistIpsRequest {
    ipAddress: string;
}


export interface GetWhitelistIpsResponse {
    data: WhitelistIpsResponse[];
    message: string;
}

export interface WhitelistIpsResponse {
    id: string;
    createdAt: string;
    ipAddress: string;
    updatedAt: string;
}