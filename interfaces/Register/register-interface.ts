
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
  value: string;
};