import "../App.css";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { CustomerType } from "../api/types";
import Loader from "../components/Loader/Loader";
import CustomerItem from "../components/CustomerItem";
import { deleteCustomerFn, getAllCustomersFn } from "../api/customerApi";

function CustomerList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [customersData, setCustomersData] = useState<CustomerType[]>([]);

  const { isLoading: isLoadingCustomers, refetch: getAllCustomers } = useQuery(
    ["customers"],
    () => getAllCustomersFn(),
    {
      enabled: false,
      onSuccess: (data: CustomerType[]) => {
        setCustomersData(data);
      },
      onError: (error: any) => {
        toast.error((error as any).data.message, {
          position: "top-right",
        });
      },
    }
  );

  const { mutate: deleteCustomer } = useMutation(
    (id: string) => deleteCustomerFn(id),
    {
      onSuccess(data) {
        queryClient.invalidateQueries("customers");
        toast.success("Customer deleted successfully");
      },
      onError(error: any) {
        if (Array.isArray((error as any).data.error)) {
          (error as any).data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: "top-right",
            })
          );
        } else {
          toast.error((error as any).data.message, {
            position: "top-right",
          });
        }
      },
    }
  );

  const onDeleteHandler = (id: string) => {
    if (window.confirm("Are you sure")) {
      deleteCustomer(id);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, [getAllCustomers]);

  if (isLoadingCustomers) return <Loader />;
  return (
    <>
      <h1 className="text-3xl font-bold">Customer List</h1>
      <div className="App">
        <table>
          <tbody>
            <tr>
              <td>id</td>
              <td>name</td>
              <td>createdDate</td>
              <td>email</td>
              <td>phone number</td>
              <td>status</td>
              <th></th>
            </tr>

            {customersData.map((item) => (
              <CustomerItem
                key={item.id}
                id={item.id}
                name={item.name}
                createdDate={item.createdDate}
                email={item.email}
                phoneNumber={item.phoneNumber}
                status={item.status}
                onClickEdit={() => navigate(`/edit/${item.id}`)}
                onClickDelete={() => onDeleteHandler(String(item.id))}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CustomerList;
