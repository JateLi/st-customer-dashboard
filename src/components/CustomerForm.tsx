import React, { useCallback, useState } from "react";
import TextInput from "./TextInput";
import { CustomerType } from "../api/types";

type FormProps = Partial<CustomerType>;

function CustomerForm({
  createdDate = "",
  email = "",
  name = "",
  phoneNumber = "",
  status = "Non-Active",
}: FormProps) {
  const [editName, setEditName] = useState<string>("");

  const handleOnSubmit = useCallback((e: any) => {
    e.preventDefault();
  }, []);

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
          <TextInput label="name" value={name} />
          <TextInput label="email" value={email} />
          <TextInput label="phone number" value={phoneNumber} />
          <TextInput label="created date" value={createdDate} />
          <TextInput label="status" value={status} />
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
