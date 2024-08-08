
export interface MerchantFormProps{
    step: number;
    nextStep:()=> void;
    prevStep:()=> void;
}

export interface BusinessTypesProps{
  value: number;
  name: string;
}

export interface BasicMerChantsInfoProps{
  business_name: string;
  mob_business_types_id:number | null;
}

export interface BusinessDetailProps{
  is_gst_registered: boolean;
  industry_type: string;
  designation: string;
  annual_turnOver: string;
}

export interface productSelectionProps{
  payout: string;
  upi_id: string;
  payment_links: string;
  explore: string;
}


export interface MerchantBaseProps{
  merchant_basic_info: BasicMerChantsInfoProps;
  merchant_details: BusinessDetailProps;
  product_selections: productSelectionProps
};


export interface DesignationOptionsProps{
  label: string;
  key: string;
};

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
export interface Entityprops{
  key: BUSINESS_TYPES;
  label: string;
}

export interface IndustryType {
  key: string;
  label: string;
}

export interface TurnoverType {
  key: string;
  label: string;
}

