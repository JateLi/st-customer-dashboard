import React from "react";
import { useNavigate } from "react-router-dom";
import { OpportunityType } from "../api/types";
import OpportunityItem from "./OpportunityItem";

type Props = {
  opportunities: OpportunityType[];
  customerId: string;
  onClickDelete: (id: string, opId: string) => void;
};

function OpportunitiesList({
  opportunities,
  customerId,
  onClickDelete,
}: Props) {
  const navigate = useNavigate();
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
                onClick={() =>
                  navigate(`/customer/${customerId}/opportunities/new`)
                }
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
              onClickEdit={() =>
                navigate(`/customer/${customerId}/opportunities/${item.id}`)
              }
              onClickDelete={() => onClickDelete(customerId, String(item.id))}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OpportunitiesList;
