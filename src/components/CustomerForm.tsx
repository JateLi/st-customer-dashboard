import React, { useCallback, useEffect, useState } from "react";
import TextInput from "./TextInput";
import { CustomerStatus, CustomerType } from "../api/types";
import DropDownSelector from "./DropDownSelector";
import { covertToDisplayDate } from "../utils/utils";

type FormProps = {
  customer?: Partial<CustomerType>;
  onSubmitHandler: (values: any) => void;
};

const emailValidate = (email: string) => {
  if (email === "") return "";
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
    return "Invalid email address";
  return "";
};

function CustomerForm({ customer, onSubmitHandler }: FormProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [status, setStatus] = useState<string>(CustomerStatus.nonActive);

  const handleOnSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      onSubmitHandler({ name, email, phoneNumber, status });
    },
    [email, name, onSubmitHandler, phoneNumber, status]
  );

  useEffect(() => {
    if (!customer) return;
    setName(customer?.name ?? "");
    setEmail(customer?.email ?? "");
    setPhoneNumber(customer?.phoneNumber ?? "");
    setStatus(customer.status ?? CustomerStatus.nonActive);
  }, [customer]);

  return (
    <div>
      <form className="w-full max-w-lg my-5" onSubmit={handleOnSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <TextInput label="name" value={name} setValue={setName} />
          <TextInput
            label="email"
            value={email}
            setValue={setEmail}
            validateMessage={emailValidate(email)}
          />
          <TextInput
            label="phone number"
            value={phoneNumber}
            setValue={setPhoneNumber}
          />
          {customer?.createdDate ? (
            <TextInput
              label="created date"
              value={covertToDisplayDate(customer?.createdDate ?? "")}
              disabled={true}
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
