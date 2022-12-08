import "../App.css";
import { useEffect, useState } from "react";
import apiClient from "../http-common";
import { useQuery } from "react-query";

type Props = {};
const GetCustomers = `/customers`;

function CustomerList({}: Props) {
  const [getResult, setGetResult] = useState("");

  const formatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };

  const { isLoading: isLoadingCustomers, refetch: getAllCustomers } = useQuery(
    "query-customers",
    async () => {
      return await apiClient.get(GetCustomers);
    },
    {
      enabled: false,
      onSuccess: (res) => {
        console.log("res ", res);
        //setGetResult(formatResponse(result));
      },
      onError: (err: any) => {
        setGetResult(formatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isLoadingCustomers) setGetResult("loading...");
    getAllCustomers();
  }, [getAllCustomers, isLoadingCustomers]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </header>
    </div>
  );
}

export default CustomerList;
