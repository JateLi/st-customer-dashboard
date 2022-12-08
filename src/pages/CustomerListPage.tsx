import "../App.css";
import { useEffect, useState } from "react";
import apiClient from "../http-common";
import { useQuery } from "react-query";
import { CustomerType } from "../Type";
import Loader from "../components/Loader/Loader";
import CustomerItem from "../components/CustomerItem";

const GetCustomersApi = `/customers`;

function CustomerList() {
  const [customersData, setCustomersData] = useState<CustomerType[]>([]);

  const { isLoading: isLoadingCustomers, refetch: getAllCustomers } = useQuery(
    "query-customers",
    async () => {
      return await apiClient.get(GetCustomersApi);
    },
    {
      enabled: false,
      onSuccess: (res) => {
        console.log("res ", res.data);
        setCustomersData(res.data);
      },
      onError: (err: any) => {
        console.log(err.response);
      },
    }
  );

  useEffect(() => {
    getAllCustomers();
  }, [getAllCustomers]);

  console.log(customersData);

  if (isLoadingCustomers) return <Loader />;
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>

      </header> */}

      <table>
        <tbody>
          <tr>
            <td>id</td>
            <td>name</td>
            <td>createdDate</td>
            <td>email</td>
            <td>phoneNumber</td>
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
              onClickEdit={() => {
                //TODO nav to edit page
              }}
              onClickDelete={() => {
                //TODO call delete api and re-render list.
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
