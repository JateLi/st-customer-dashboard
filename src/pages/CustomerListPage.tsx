import "../App.css";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { CustomerType } from "../api/types";
import Loader from "../components/Loader/Loader";
import CustomerItem from "../components/CustomerItem";
import { deleteCustomerFn, getAllCustomersFn } from "../api/customerApi";
import { sortListByType, covertToDisplayDate } from "../utils/utils";
import ListHeader from "../components/ListHeader";

function CustomerList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [customersData, setCustomersData] = useState<CustomerType[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortFilter, setSortFilter] = useState<string>("none");
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);

  const { isLoading: isLoadingCustomers, refetch: getAllCustomers } = useQuery(
    ["customers"],
    () => getAllCustomersFn(),
    {
      onSuccess: (data: CustomerType[]) => {
        setCustomersData(data);
        setIsLoadingList(false);
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
      onSuccess: (data: any) => {
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

  const filteredList = useMemo(() => {
    if (!customersData) return [];

    return sortListByType(customersData, sortFilter).filter(({ status }) => {
      return status === statusFilter || statusFilter === "all";
    });
  }, [customersData, sortFilter, statusFilter]);

  const navToRouter = (router: string) => {
    navigate(router);
  };

  if (isLoadingList || isLoadingCustomers) return <Loader />;
  return (
    <div className="App">
      <div>
        <h1 className="text-3xl font-bold">Customer List</h1>
        <ListHeader
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortFilter={sortFilter}
          setSortFilter={setSortFilter}
          navTo={navToRouter}
        />
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

            {filteredList.map((item) => (
              <CustomerItem
                key={item.id}
                id={item.id}
                name={item.name}
                createdDate={covertToDisplayDate(item.createdDate)}
                email={item.email}
                phoneNumber={item.phoneNumber}
                status={item.status}
                onClickEdit={() => navigate(`/customer/${item.id}`)}
                onClickDelete={() => onDeleteHandler(String(item.id))}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerList;
