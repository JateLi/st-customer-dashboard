import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocalStorageState } from "ahooks";

import { SortedType } from "../api/types";
import Loader from "../components/Loader/Loader";
import CustomerItem from "../components/CustomerItem";
import { deleteCustomer, getAllCustomers } from "../api/customerApi";
import { sortListByType, covertToDisplayDate } from "../utils/utils";
import ListHeader from "../components/ListHeader";

function CustomerList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useLocalStorageState<string>(
    "local-status-filter",
    {
      defaultValue: "all",
    }
  );
  const [sortFilter, setSortFilter] = useLocalStorageState<string>(
    "local-sort-filter",
    {
      defaultValue: SortedType.none,
    }
  );

  const { isLoading: isLoadingCustomers, data: customersData } = useQuery(
    ["customers"],
    () => getAllCustomers(),
    {
      onError: (error) => {
        toast.error((error as any).data.message, {
          position: "top-right",
        });
      },
    }
  );

  const { mutate: deleteCustomerById } = useMutation(
    (id: string) => deleteCustomer(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("customers");
        toast.success("Customer deleted successfully");
      },
      onError(error) {
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
      deleteCustomerById(id);
    }
  };

  const filteredList = useMemo(() => {
    if (!customersData) return [];

    return sortListByType(customersData, sortFilter).filter(({ status }) => {
      return status === statusFilter || statusFilter === "all";
    });
  }, [customersData, sortFilter, statusFilter]);

  if (isLoadingCustomers) return <Loader />;
  return (
    <div className="App">
      <div>
        <h1 className="text-3xl font-bold">Customer List</h1>
        <ListHeader
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortFilter={sortFilter}
          setSortFilter={setSortFilter}
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
