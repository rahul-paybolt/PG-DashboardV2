'use client'
import React, { useState } from 'react';
import { Card, Button, Input, Select, SelectItem, CardBody, Snippet } from "@nextui-org/react";
import { CustomButton } from '@/lib/components/ButtonComponent/CustomButton';
import { apisReferences, curlReferences } from '@/lib/constants/api-references/api-references.constant';
import CustomInput from '@/lib/components/InputContainer/Input';
import { Spinner } from '@nextui-org/spinner';
import { unstable_noStore } from 'next/cache';

const ApiMethod = ({ method }: { method: string }) => (
  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
    method === 'POST' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'
  }`}>
    {method}
  </span>
);

const ApiCard = ({ api, isSelected, onClick }: { api: { name: string; method: string; backgroundColor: string; fields: any[] }; isSelected: boolean; onClick: (api: { name: string; method: string; backgroundColor: string; fields: any[] }) => void }) => (
  <Card 
    isPressable 
    onPress={() => onClick(api)}
    className={`mb-2 ${isSelected ? 'border-purple-500 border-2' : ''}`}
  >
    <CardBody className="flex flex-row justify-between items-center p-3 space-x-8">
      <span>{api.name}</span>
      <ApiMethod method={api.method} />
    </CardBody>
  </Card>
);

const ApiList = ({ apis, selectedApi, onApiClick }: { apis: { name: string; method: string; backgroundColor: string; fields: any[] }[]; selectedApi: { name: string; method: string; backgroundColor: string; fields: any[] }; onApiClick: (api: { name: string; method: string; backgroundColor: string; fields: any[] }) => void }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Payment APIs</h2>
    {apis.map((api, index) => (
      <ApiCard
        key={index}
        api={api}
        isSelected={selectedApi?.name === api.name}
        onClick={onApiClick}
      />
    ))}
  </div>
);

const ApiForm = ({ api, onFormChange }: { api: { name: string; method: string; backgroundColor: string; fields: any[] }, onFormChange: (formValues: any) => void }) => {
  const [formValues, setFormValues] = useState<any>({});

  const handleInputChange = (name: string, value: any) => {

    if(name === "amount"){
      value = Number(value)
    }
    const updatedValues = { ...formValues, [name]: value };
    console.log("updatedValues", updatedValues)
    setFormValues(updatedValues);
    onFormChange(updatedValues);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{api.name}</h2>
      <Card>
        <CardBody>
          {api.fields.map((field) => (
            field.type === 'select' ? (
              <Select 
                key={field.name}
                label={field.label}
                placeholder={`Select ${field.label}`}
                className="mb-4"
                onChange={(value) => handleInputChange(field.name, value)}
              >
                {field.options.map((option:string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </Select>
            ) : (
              <Input
                key={field.name}
                label={field.label}
                placeholder={field.label}
                isRequired={field.required}
                className="mb-4"
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
            )
          ))}
        </CardBody>
      </Card>
    </div>
  );
};

const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  // showToast(`${text} copied to clipboard`, "success");
};

const ApiPlayground = ({ api, formValues }: { api: { name: string; method: string; backgroundColor: string; fields: any[] }, formValues: any }) => {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const curlCommand = curlReferences.find(curlRef => curlRef.name === api.name)?.curl || 'No cURL command available';
  // console.log('Curl Command:', curlCommand);

  const handleTryIt = async () => {
    setIsLoading(true);
    console.log("formValues", formValues);

    try {
      const response = await fetch('/api/v1/payin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`, // Replace with your actual clientId and clientSecret
        },
        body: JSON.stringify({ clientId, clientSecret, ...formValues }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText);
        console.log('Error:', errorText);
        throw new Error(errorText);
      }

      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">API Playground</h2>
      <Card className='bg-white dark:bg-black'>
        <CardBody>
          <h3 className="text-lg font-semibold mb-2">Languages</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {['C# - HttpClient', 'C# - RestSharp', 'cURL', 'Dart - dio', 'Dart - http', 'Go - Native'].map((lang) => (
              <Button 
                key={lang} 
                size="sm" 
                variant="flat" 
                className={`bg-purple-500 text-white ${lang !== 'cURL' ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={lang !== 'cURL'}
              >
                {lang}
              </Button>
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-2">Authorization</h3>
          <CustomInput 
            label="username"
            placeholder='client-id'
            className="mb-4"
            value={clientId}
            onValueChange={setClientId}
          />
          <CustomInput 
            label="password"
            placeholder='client-secret'
            className="mb-4"
            value={clientSecret}
            onValueChange={setClientSecret}
          />
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto dark:text-black">
            {curlCommand}
          </pre>
          <div className="flex justify-end mt-4 space-x-4 mr-4">
            <CustomButton className="bg-purple-500 text-white" variant="flat" onClick={handleTryIt}>
              {isLoading ? <Spinner/> : 'Try it!'}
            </CustomButton>
            <Snippet 
                onCopy={() => handleCopy(curlCommand)} 
                children=""
                className=" bg-purple-500 text-white"
            />
          </div>
          {response && (
            <Card className="mt-4">
              <CardBody className='dark:text-black'>
                <h3 className="text-lg font-semibold mb-2">Response</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  {response}
                </pre>
              </CardBody>
            </Card>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

const ApiReferences = () => {
  unstable_noStore();

  const [selectedApi, setSelectedApi] = useState<{ name: string; method: string; backgroundColor: string; fields: any[] }>(apisReferences[0]);
  const [formValues, setFormValues] = useState<any>({});

  const handleApiClick = (api: { name: string; method: string; backgroundColor: string; fields: any[] }) => {
    setSelectedApi(api);
    setFormValues({});
  };

  const handleFormChange = (values: any) => {
    setFormValues(values);
  };

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      <ApiList apis={apisReferences} selectedApi={selectedApi} onApiClick={handleApiClick} />
      {selectedApi && <ApiForm api={selectedApi as { name: string; method: string; backgroundColor: string; fields: any[] }} onFormChange={handleFormChange} />} 
      {selectedApi && <ApiPlayground api={selectedApi as { name: string; method: string; backgroundColor: string; fields: any[] }} formValues={formValues} />}
    </div>
  );
};

export default ApiReferences;