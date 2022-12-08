import "../App.css";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerFn } from "../api/customerApi";
import { CustomerType } from "../api/types";
import CustomerForm from "../components/CustomerForm";
import Loader from "../components/Loader/Loader";

function CustomerEditPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [customer, setCustomer] = useState<CustomerType>();

  const { isLoading: isLoadingCustomer, refetch: getCustomerById } = useQuery(
    ["customer"],
    () => getCustomerFn(params.customerId ?? ""),
    {
      enabled: false,
      onSuccess: (data: CustomerType) => {
        console.log("res ", data);
        setCustomer(data);
      },
      onError: (err: any) => {
        console.log(err.response);
      },
    }
  );
  useEffect(() => {
    getCustomerById();
  }, [getCustomerById]);

  if (isLoadingCustomer) return <Loader />;
  return (
    <div className="App">
      <div>
        <h1 className="text-3xl font-bold">Customer Edit</h1>
        <div>
          <CustomerForm customer={customer} />
        </div>
      </div>
    </div>
  );
}

export default CustomerEditPage;
