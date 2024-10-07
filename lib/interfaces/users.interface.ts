export interface UsersApiResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data: UserData;
}

interface UserData {
    id: string;
    fullName: string;
    email: string;
    mobile: string;
    accountStatus: number;
    role: number;
    onboardingStatus: number;
    image: string | null;
    payInWebhookUrl: string | null;
    payOutWebhookUrl: string | null;
    createdAt: string; // Consider using Date if you plan to manipulate this as a date
    updatedAt: string; // Consider using Date if you plan to manipulate this as a date
    businessDetails: BusinessDetails;
    kyc: any; // Define a more specific type if KYC structure is known
}

interface BusinessDetails {
    id: string;
    businessEntityType: number;
    businessName: string;
    designation: string;
    turnover: number;
    industry: number;
    createdAt: string; // Consider using Date if you plan to manipulate this as a date
    updatedAt: string; // Consider using Date if you plan to manipulate this as a date
}

