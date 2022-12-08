import React from "react";
import { OpportunityType } from "../api/types";

type OpportunityItemProps = OpportunityType & {
  onClickEdit: () => void;
  onClickDelete: () => void;
};

function OpportunityItem({
  id,
  name,
  status,
  customerId,
  onClickEdit,
  onClickDelete,
}: OpportunityItemProps) {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{status}</td>
      <td>{customerId}</td>
      <td>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={onClickEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
          type="button"
          onClick={onClickDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default OpportunityItem;
