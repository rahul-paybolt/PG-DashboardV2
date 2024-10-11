export const restrictedAPIs = [
    "api/v1/auth/admin/register",
    "api/v1/users/admin/secret",
    "api/v1/users/secret",
    "api/v1/transactions/admin",
    "api/v1/transactions/stats/admin",
    "api/v1/users/merchant/status",
    "api/v1/transactions/admin/merchant",
    "api/v1/transactions/admin"
];



// Authentication
export const REGISTER_USER = "api/v1/auth/admin/register";
export const LOGIN_USER = "api/v1/auth/login";
export const CHANGE_PASSWORD = "api/v1/users/change-password";
export const LOGOUT_USER = "api/v1/auth/logout";


// Users
export const USERS_PROFILE = "api/v1/users/profile";
export const DELETE_USER = "api/v1/users/secret";
export const VIEW_PROFILE= "api/v1/users"


// Client id & client secret
export const ADMIN_GENERATE_SECRET_KEY = "api/v1/users/admin/secret";
export const MERCHANT_GENERATE_SECRET_KEY = "api/v1/users/secret";
export const DELETE_SECRET_KEY = "api/v1/users/secret";



// Whitelist-api's

export const WHITELIST_API = "/api/v1/users/whitelist-ips";
export const GET_WHITELIST_IPS = "/api/v1/users/whitelist-ips";
export const DELETE_WHITELIST_IPS = "/api/v1/users/whitelist-ips/";






// Genrate webhopok urls
export const GENERATE_WEBHOOK_URL = "api/v1/users/webhook-url";
export const GET_WEBHOOK_URL = "api/v1/users/webhook-url";


//  Payment API'S

export const INITIATE_PAYIN_PAYMENT = "api/v1/payments/payin/create";
export const INITIATE_PAYOUT_PAYMENT = "api/v1/payments/payout/create";
export const GET_PAYIN_PAYMENT_STATUS = "api/v1/payments/payin/status";



// Transactions API'S

export const VIEW_TRANSACTIONS_ADMIN = "api/v1/transactions/admin";
export const VIEW_TRANSACTIONS_MERCHANT = "api/v1/transactions/merchant";
export const DOWNLOAD_MERCHANT_TRANSACTION_CSV = "api/v1/transactions/download-csv/merchant";
export const DOWNLOAD_ADMIN_TRANSACTION_CSV = "api/v1/transactions/download-csv/admin";



// STATS API'S

export const GET_STATS_ADMIN = "api/v1/transactions/stats/admin";
export const GET_STATS_MERCHANT = "api/v1/transactions/stats";

// Transaction's api for merchant

export const VALIDATE_API_KEY= 'api/v1/users/api-key';
export const VIEW_SPECIFIC_TRANSACTIONS_MERCHANT = "api/v1/transactions/admin/merchant";
export const ADMIN_TRANSACTION_DETAILS = "api/v1/transactions/admin";
export const MERCHANT_TRANSACTION_DETAILS = "api/v1/transactions/merchant";









// Collections API's

export const ROLES = {
    ADMIN: 'admin',
    MERCHANT: 'merchant',
};

export const PERMISSIONS = {
    [ROLES.ADMIN]: ['*'], // Admin can access all APIs
    [ROLES.MERCHANT]: ['/merchant/*'], // Merchant can access only merchant APIs
};

// Collection Api's

export const GET_ALL_MERCHNAT_COLLECTIONS_STATS = "api/v1/collections/admin";
export const GET_MERCHANT_COLLECTIONS_BY_ID = "api/v1/collections/admin";  //userId
export const GET_MERCHANT_DETAILS_BY_ID = "api/v1/collections/admin/payin";  //payInId
export const GET_ALL_MERCHANT_DETAILS = "api/v1/collections"; 
export const GET_MERCHANT_TRANSACTIONS_BY_ID = "api/v1/collections";  //userId













export const CURL_COMMANDS = {
  INITIATE_PAYIN_PAYMENT: `curl --location 'https://api.bulkpe.in/client/initiatepayout' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer <token>' \\
--data '{"amount":0,"account_number":"","payment_mode":"","reference_id":"","transcation_note":"","beneficiaryName":"","ifsc":"","upi":""}'`,

  INITIATE_PAYOUT_PAYMENT: `curl --location 'https://api.bulkpe.in/client/initiatepayout' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer <token>' \\
--data '{"amount":0,"account_number":"","payment_mode":"","reference_id":"","transcation_note":"","beneficiaryName":"","ifsc":"","upi":""}'`,

  // Add more cURL commands for other APIs
};




















