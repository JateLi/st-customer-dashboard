import "../App.css";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerFn } from "../api/customerApi";
import { CustomerType, OpportunityType } from "../api/types";
import CustomerForm from "../components/CustomerForm";
import Loader from "../components/Loader/Loader";
import { getAllOpportunitiesFn } from "../api/opportunityApi";
import OpportunityItem from "../components/OpportunityItem";

function CustomerEditPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [customer, setCustomer] = useState<CustomerType>();
  const [opportunities, setOpportunities] = useState<OpportunityType[]>([]);

  const { isLoading: isLoadingCustomer, refetch: getCustomerById } = useQuery(
    ["customer"],
    () => getCustomerFn(params.customerId ?? ""),
    {
      enabled: false,
      onSuccess: (data: CustomerType) => {
        setCustomer(data);
      },
      onError: (err: any) => {
        console.log(err.response);
      },
    }
  );

  const { isLoading: isLoadingOpportunities, refetch: getOpportunitiesById } =
    useQuery(
      ["opportunities"],
      () => getAllOpportunitiesFn(params.customerId ?? ""),
      {
        enabled: false,
        onSuccess: (data: OpportunityType[]) => {
          console.log("res ", data);
          setOpportunities(data);
        },
        onError: (err: any) => {
          console.log(err.response);
        },
      }
    );

  useEffect(() => {
    getCustomerById();
    getOpportunitiesById();
  }, [getCustomerById, getOpportunitiesById]);

  const onSubmitHandler = (values: any) => {
    const formData = new FormData();
  };

  if (isLoadingCustomer || isLoadingOpportunities) return <Loader />;
  return (
    <div className="App">
      <div>
        <h1 className="text-3xl font-bold">Customer Edit</h1>

        <CustomerForm customer={customer} onSubmitHandler={onSubmitHandler} />
        <table>
          <tbody>
            <tr>
              <td>id</td>
              <td>name</td>
              <td>status</td>
              <td>customerId</td>
              <th></th>
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
    </div>
  );
}

export default CustomerEditPage;
