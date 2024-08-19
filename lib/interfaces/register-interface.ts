export interface BusinessTypesProps {
  value: number;
  name: string;
}

export interface DesignationOptionsProps {
  label: string;
  key: string;
}

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
}
export interface Entityprops {
  key: BUSINESS_TYPES;
  label: string;
}

export interface IndustryType {
  key: number;
  label: string;
}

export interface TurnoverType {
  key: number;
  label: string;
}

export interface MerchantDetailsProps {
  email: string | null;
  businessEntityType: number;
  industry: number;
  turnover: number;
}
