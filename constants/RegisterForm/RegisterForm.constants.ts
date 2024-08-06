import { DesignationOptionsProps } from "@/interfaces/Register/register-interface";

export const INDUSTRY_TYPES = [
  'Agriculture',
  'Architect/Interiors',
  'Automobile/Repairs',
  'Construction/Builders',
  'Consultancy',
  'Creative/Art',
  'Dealer',
  'E-Commerce',
  'Educational Institution',
  'Electronics/Hardware',
  'Entertainment',
  'Event Management',
  'Financial Services',
  'Food and Beverages',
  'Freelancer',
  'Health',
  'Hospitality',
  'Import/Export',
  'Insurance',
  'IT/Software',
  'Jewellery',
  'Manpower/HR',
  'Manufacturer',
  'Marketing Agency',
  'Miscellaneous',
  'NGO',
  'Online Services',
  'Photography/Studio',
  'Printing',
  'Engineering Services',
  'Real Estate',
  'Retailer/Supplier',
  'Lifestyle',
  'Media/Advt',
  'Tours And Travels',
  'Trading',
  'Transportation/Logistics',
  'Wholesaler',
  'Distributors',
  'Gambling/Casino',
  'Crowd Funding',
  'Tobacco/ Wine Shop',
  'Unlicensed Finance Services',
  'Other',
];

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

export const businessTypes = [
  { value: BUSINESS_TYPES.INDIVIDUAL, name: 'Individual / Freelancer' },
  { value: BUSINESS_TYPES.SOLE_PROPRIETORSHIP, name: 'Sole Proprietorship' },
  { value: BUSINESS_TYPES.PARTNERSHIP, name: 'Partnership' },
  { value: BUSINESS_TYPES.PUBLIC_PRIVATE_LTD, name: 'Public / Private Limited Company' },
  { value: BUSINESS_TYPES.TRUST_NGO_SOCIETIES, name: 'Trust / NGO / Societies' },
  { value: BUSINESS_TYPES.LLP, name: 'LLP' },
  // { value: BUSINESS_TYPES.OTHERS, name: 'Others' },
  { value: BUSINESS_TYPES.UNREGISTERED, name: 'Company yet to register' },
  // { value: BUSINESS_TYPES.FREELANCE, name: 'Freelance' },
];

export const TURNOVER_LIST = ['0 - 25L', '25L - 50L', '50L - 2CR', '2CR - 10CR', '10CR +'];

export const DesignationOptions: DesignationOptionsProps[] = [
  {
    label:"CXO",
    value:"cxo"
  },
  {
    label:"SVP/EVP/VP",
    value:"SVP/EVP/VP"
  },
  {
    label:"Director",
    value:"director"
  },
  {
    label:"Manager",
    value:"manager"
  },
  {
    label:"Accountant",
    value:"accountant"
  },
  {
    label:"Chartered Accountant",
    value:"ca"
  },
  {
    label:"Other",
    value:"other"
  }

]

