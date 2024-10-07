import React, { useState } from 'react'
import ModalContainer from '../ModalContainer/Modal'
import CustomSelect from '../SelectOptions/SelectOptions'
import { TRANSFER_MODE } from '@/lib/constants/TransferMode/TransferMode.constant'
import { businessTypes } from '@/lib/constants/RegisterForm/RegisterForm.constants'
import CustomInput from '../InputContainer/Input'
import { CustomButton } from '../ButtonComponent/CustomButton'
import { Key } from 'react-stately'
import { ACCOUNT_NUMBER_REGEX, EMAIL_REGEX, IFSC_REGEX, NAME_REGEX, PHONE_REGEX } from '@/shared/regular-expressions'

const Transfermode = ({ isOpen, onClose }: { isOpen: boolean,    onClose: () => void }) => {

    const [bankName, setBankName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [ifscCode, setIfscCode] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [transferMode, setTransferMode] = useState<Key | null>(null)
    const [businessType, setBusinessType] = useState<Key | null>(null)
    const [bankNameValidation, setBankNameValidation] = useState<string | undefined>(undefined);
    const [accountNumberValidation, setAccountNumberValidation] = useState<string | undefined>(undefined);
    const [ifscCodeValidation, setIfscCodeValidation] = useState<string | undefined>(undefined);
    const [emailValidation, setEmailValidation] = useState<string | undefined>(undefined);
    const [mobileValidation, setMobileValidation] = useState<string | undefined>(undefined);


    const validateField = (value: string, regex: RegExp): string | undefined => {
        return regex.test(value) ? "valid" : "invalid";
    };

    const handleBankNameChange = (value: string) => {
        setBankName(value);
        setBankNameValidation(validateField(value, NAME_REGEX));
    };

    const handleAccountNumberChange = (value: string) => {
        setAccountNumber(value);
        setAccountNumberValidation(validateField(value, ACCOUNT_NUMBER_REGEX));
    };

    const handleIfscCodeChange = (value: string) => {
        setIfscCode(value);
        setIfscCodeValidation(validateField(value, IFSC_REGEX));
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        setEmailValidation(validateField(value, EMAIL_REGEX));
    };

    const handleMobileChange = (value: string) => {
        setMobile(value);
        setMobileValidation(validateField(value, PHONE_REGEX));
    };

    const handleTransferMode = (value: Key) => {
        setTransferMode(value);
    };

    const handleBusinessType = (value: Key) => {
        setBusinessType(value);
    };




    const BeneficiaryDetails = () => {
        return (
    <div className="bg-white p-6 ">      
            <div className="space-y-4">
                <CustomSelect
                    label="Transfer Mode"
                    value={transferMode}
                    onChange={(value: Key) => handleTransferMode(value)}
                    selectionData={TRANSFER_MODE}
                    classNames={{
                        base: "!bg-white !hover:bg-white ",
                        mainWrapper: "bg-white",
                    }}
                />
                <CustomSelect
                    label="Business Types"
                    value={businessType}
                    onChange={(value: Key) => handleBusinessType(value)}
                    selectionData={businessTypes}
                />
            <div className='space-y-4'>
        <h2 className="text-2xl text-primary-600 font-bold mb-4">Beneficiary Details</h2>
        <CustomInput
                label="Bank Name"
                value={bankName}
                onValueChange={handleBankNameChange}
                isRequired={true}
                errorMessage={
                    bankNameValidation === "invalid" && "Please enter a valid Bank Name"
                }
                validationState={bankNameValidation}
                onClear={() => console.log("input cleared")}
                isInvalid={bankNameValidation === "invalid"}
            />
            <CustomInput
                label="Account Number"
                value={accountNumber}
                onValueChange={handleAccountNumberChange}
                isRequired={true}
                errorMessage={
                    accountNumberValidation === "invalid" && "Please enter a valid Account Number"
                }
                validationState={accountNumberValidation}
                onClear={() => console.log("input cleared")}
                isInvalid={accountNumberValidation === "invalid"}
            />
            <CustomInput
                label="IFSC Code"
                value={ifscCode}
                onValueChange={handleIfscCodeChange}
                isRequired={true}
                errorMessage={
                    ifscCodeValidation === "invalid" && "Please enter a valid IFSC Code"
                }
                validationState={ifscCodeValidation}
                onClear={() => console.log("input cleared")}
                isInvalid={ifscCodeValidation === "invalid"}
            />
            <CustomInput
                label="Email"
                value={email}
                onValueChange={handleEmailChange}
                isRequired={true}
                errorMessage={
                    emailValidation === "invalid" && "Please enter a valid Email"
                }
                validationState={emailValidation}
                onClear={() => console.log("input cleared")}
                isInvalid={emailValidation === "invalid"}
            />
            <CustomInput
                label="Mobile"
                value={mobile}
                onValueChange={handleMobileChange}
                isRequired={true}
                errorMessage={
                    mobileValidation === "invalid" && "Please enter a valid Mobile Number"
                }
                validationState={mobileValidation}
                onClear={() => console.log("input cleared")}
                isInvalid={mobileValidation === "invalid"}
            />
                </div>
            </div>
            <CustomButton
                title="Add Beneficiary"
                onClick={() => {}}
                className="mt-6 w-full bg-purple-600 text-white hover:bg-purple-700"
            >Add Beneficiary</CustomButton>
        </div>
        )
    }
  return (
    <>
        <ModalContainer
            size="xl"
            isOpen={isOpen}
            handleModal={onClose}
            title="New Contact"
            content={BeneficiaryDetails()}
            className="max-h-[100vh] flex flex-col overflow-y-auto" // Use flex column layout
            />
    
    </>
  )
}

export default Transfermode