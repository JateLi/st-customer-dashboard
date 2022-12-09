import React from "react";
import { OpportunityType } from "../api/types";
import OpportunityItem from "./OpportunityItem";

type Props = {
  opportunities: OpportunityType[];
};

function OpportunitiesList({ opportunities }: Props) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>id</td>
            <td>name</td>
            <td>status</td>
            <td>customerId</td>
            <th>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => {
                  console.log("Add new");
                }}
              >
                + Add
              </button>
            </th>
          </tr>

          {opportunities.map((item) => (
            <OpportunityItem
              key={item.id}
              id={item.id}
              name={item.name}
              status={item.status}
              customerId={item.customerId}
              onClickEdit={() => {
                console.log("edit");
              }}
              onClickDelete={() => {
                console.log("delelte api");
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OpportunitiesList;
