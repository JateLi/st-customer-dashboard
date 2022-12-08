import React, { useCallback, useEffect, useState } from "react";
import TextInput from "./TextInput";
import { CustomerStatus, CustomerType } from "../api/types";
import DropDownSelector from "./DropDownSelector";

type FormProps = {
  customer?: Partial<CustomerType>;
};

function CustomerForm({ customer }: FormProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [status, setStatus] = useState<string>(CustomerStatus.nonActive);

  const handleOnSubmit = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (!customer) return;
    setName(customer?.name ?? "");
    setEmail(customer?.email ?? "");
    setPhoneNumber(customer?.phoneNumber ?? "");
    setStatus(customer.status ?? CustomerStatus.nonActive);
  }, [customer]);

  //   const handleOnChange = useCallback(
  //     (event: React.ChangeEvent<HTMLInputElement>) => {
  //     //   const value = event.target.value;
  //     },
  //     []
  //   );

  return (
    <div>
      <form className="w-full max-w-lg" onSubmit={handleOnSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <TextInput label="name" value={name} setValue={setName} />
          <TextInput label="email" value={email} setValue={setEmail} />
          <TextInput
            label="phone number"
            value={phoneNumber}
            setValue={setPhoneNumber}
          />
          {customer?.createdDate ? (
            <TextInput
              label="created date"
              value={customer?.createdDate ?? ""}
            />
          ) : null}
          <DropDownSelector
            type={"status"}
            optionsList={Object.values(CustomerStatus)}
            onChange={setStatus}
            value={status}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CustomerForm;
