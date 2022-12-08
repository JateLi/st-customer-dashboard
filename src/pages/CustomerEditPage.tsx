import "../App.css";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerFn } from "../api/customerApi";
import { CustomerType } from "../api/types";
import CustomerForm from "../components/CustomerForm";

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
  return (
    <div className="App">
      <h1 className="text-3xl font-bold">Customer Edit</h1>

      <div>
        <CustomerForm
          createdDate={customer?.createdDate}
          email={customer?.email}
          name={customer?.name}
          phoneNumber={customer?.phoneNumber}
          status={customer?.status}
        />
      </div>
    </div>
  );
}

export default CustomerEditPage;
