import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomerStatus, SortedType } from "../api/types";
import DropDownSelector from "./DropDownSelector";

type Props = {
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  sortFilter: string;
  setSortFilter: React.Dispatch<React.SetStateAction<string>>;
};

function ListHeader({
  statusFilter,
  setStatusFilter,
  sortFilter,
  setSortFilter,
}: Props) {
  const navigate = useNavigate();
  return (
    <div
      className={
        "flex flex-row justify-evenly items-center py-5 border-b-2 border-black"
      }
    >
      <DropDownSelector
        type={"status"}
        optionsList={["all", ...Object.values(CustomerStatus)]}
        onChange={setStatusFilter}
        value={statusFilter}
      />
      <DropDownSelector
        type={"sort by"}
        optionsList={Object.values(SortedType)}
        onChange={setSortFilter}
        value={sortFilter}
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
        type="button"
        onClick={() => navigate("/customer/new")}
      >
        + Add
      </button>
    </div>
  );
}

export default ListHeader;
