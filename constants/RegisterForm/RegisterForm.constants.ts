import { DesignationOptionsProps, Entityprops, IndustryType, TurnoverType } from "@/interfaces/Register/register-interface";

export enum BUSINESS_TYPES {
  INDIVIDUAL = 1,
  SOLE_PROPRIETORSHIP = 2,
  PARTNERSHIP = 3,
  PUBLIC_PRIVATE_LTD = 4,
  TRUST_NGO_SOCIETIES = 5,
  LLP = 6,
  OTHERS = 7,
  UNREGISTERED = 8,
  FREELANCE = 9,
};

export const businessTypes:Entityprops[] = [
  { key: BUSINESS_TYPES.INDIVIDUAL, label: 'Individual / Freelancer' },
  { key: BUSINESS_TYPES.SOLE_PROPRIETORSHIP, label: 'Sole Proprietorship' },
  { key: BUSINESS_TYPES.PARTNERSHIP, label: 'Partnership' },
  { key: BUSINESS_TYPES.PUBLIC_PRIVATE_LTD, label: 'Public / Private Limited Company' },
  { key: BUSINESS_TYPES.TRUST_NGO_SOCIETIES, label: 'Trust / NGO / Societies' },
  { key: BUSINESS_TYPES.LLP, label: 'LLP' },
  { key: BUSINESS_TYPES.UNREGISTERED, label: 'Company yet to register' },
];


export const DesignationOptions: DesignationOptionsProps[] = [
  {
    label:"CXO",
    key:"cxo"
  },
  {
    label:"SVP/EVP/VP",
    key:"SVP/EVP/VP"
  },
  {
    label:"Director",
    key:"director"
  },
  {
    label:"Manager",
    key:"manager"
  },
  {
    label:"Accountant",
    key:"accountant"
  },
  {
    label:"Chartered Accountant",
    key:"ca"
  },
  {
    label:"Other",
    key:"other"
  }

]


export const IndustryTypes: IndustryType[] = [
  { key: 'AGRICULTURE', label: 'Agriculture' },
  { key: 'ARCHITECT_INTERIORS', label: 'Architect/Interiors' },
  { key: 'AUTOMOBILE_REPAIRS', label: 'Automobile/Repairs' },
  { key: 'CONSTRUCTION_BUILDERS', label: 'Construction/Builders' },
  { key: 'CONSULTANCY', label: 'Consultancy' },
  { key: 'CREATIVE_ART', label: 'Creative/Art' },
  { key: 'DEALER', label: 'Dealer' },
  { key: 'E_COMMERCE', label: 'E-Commerce' },
  { key: 'EDUCATIONAL_INSTITUTION', label: 'Educational Institution' },
  { key: 'ELECTRONICS_HARDWARE', label: 'Electronics/Hardware' },
  { key: 'ENTERTAINMENT', label: 'Entertainment' },
  { key: 'EVENT_MANAGEMENT', label: 'Event Management' },
  { key: 'FINANCIAL_SERVICES', label: 'Financial Services' },
  { key: 'FOOD_BEVERAGES', label: 'Food and Beverages' },
  { key: 'FREELANCER', label: 'Freelancer' },
  { key: 'HEALTH', label: 'Health' },
  { key: 'HOSPITALITY', label: 'Hospitality' },
  { key: 'IMPORT_EXPORT', label: 'Import/Export' },
  { key: 'INSURANCE', label: 'Insurance' },
  { key: 'IT_SOFTWARE', label: 'IT/Software' },
  { key: 'JEWELLERY', label: 'Jewellery' },
  { key: 'MANPOWER_HR', label: 'Manpower/HR' },
  { key: 'MANUFACTURER', label: 'Manufacturer' },
  { key: 'MARKETING_AGENCY', label: 'Marketing Agency' },
  { key: 'MISCELLANEOUS', label: 'Miscellaneous' },
  { key: 'NGO', label: 'NGO' },
  { key: 'ONLINE_SERVICES', label: 'Online Services' },
  { key: 'PHOTOGRAPHY_STUDIO', label: 'Photography/Studio' },
  { key: 'PRINTING', label: 'Printing' },
  { key: 'ENGINEERING_SERVICES', label: 'Engineering Services' },
  { key: 'REAL_ESTATE', label: 'Real Estate' },
  { key: 'RETAILER_SUPPLIER', label: 'Retailer/Supplier' },
  { key: 'LIFESTYLE', label: 'Lifestyle' },
  { key: 'MEDIA_ADVT', label: 'Media/Advt' },
  { key: 'TOURS_TRAVELS', label: 'Tours And Travels' },
  { key: 'TRADING', label: 'Trading' },
  { key: 'TRANSPORTATION_LOGISTICS', label: 'Transportation/Logistics' },
  { key: 'WHOLESALER', label: 'Wholesaler' },
  { key: 'DISTRIBUTORS', label: 'Distributors' },
  { key: 'GAMBLING_CASINO', label: 'Gambling/Casino' },
  { key: 'CROWD_FUNDING', label: 'Crowd Funding' },
  { key: 'TOBACCO_WINE_SHOP', label: 'Tobacco/ Wine Shop' },
  { key: 'UNLICENSED_FINANCE_SERVICES', label: 'Unlicensed Finance Services' },
  { key: 'OTHER', label: 'Other' },
];

export const Turnover_list: TurnoverType[] = [
  { key: 'RANGE_0_25L', label: '0 - 25L' },
  { key: 'RANGE_25L_50L', label: '25L - 50L' },
  { key: 'RANGE_50L_2CR', label: '50L - 2CR' },
  { key: 'RANGE_2CR_10CR', label: '2CR - 10CR' },
  { key: 'RANGE_10CR_PLUS', label: '10CR +' },
];



