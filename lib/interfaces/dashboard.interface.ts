export interface DashboardApiResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data: Data;
}

export interface Data {
    payin: payin;
    payout: payout;
}

export interface payin {
    totalAmount: number;
    totalCount: number;
    successAmount: number | null;
    successCount: number;
    failedAmount: number | null;
    failedCount: number;
}

export interface payout {
    totalAmount: number;
    totalCount: number;
    successAmount: number | null;
    successCount: number;
    failedAmount: number | null;
    failedCount: number;
}

