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
import OpportunitiesList from "../components/OpportunitiesList";

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
        onSuccess: (data: OpportunityType[]) => {
          console.log("opportunities ", data);
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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <h1 className="text-3xl font-bold">{`Customer ${
        params.customerId ?? ""
      } Edit`}</h1>
      <div>
        <CustomerForm customer={customer} onSubmitHandler={onSubmitHandler} />
      </div>
      <OpportunitiesList opportunities={opportunities} />
    </div>
  );
}

export default CustomerEditPage;
