import { useCallback, useEffect, useState } from "react";
import { OpportunityStatus, OpportunityType } from "../api/types";
import DropDownSelector from "./DropDownSelector";
import TextInput from "./TextInput";

type Props = {
  opportunity?: Partial<OpportunityType>;
  onSubmitHandler: (values: any) => void;
};

function OpportunityForm({ opportunity, onSubmitHandler }: Props) {
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>(OpportunityStatus.new);

  const handleOnSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      onSubmitHandler({ name, status });
    },
    [name, onSubmitHandler, status]
  );

  useEffect(() => {
    if (!opportunity) return;
    setName(opportunity?.name ?? "");
    setStatus(opportunity.status ?? OpportunityStatus.new);
  }, [opportunity]);

  return (
    <div>
      <form className="w-full max-w-lg" onSubmit={handleOnSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <TextInput label="name" value={name} setValue={setName} />
          <DropDownSelector
            type={"status"}
            optionsList={Object.values(OpportunityStatus)}
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

export default OpportunityForm;
