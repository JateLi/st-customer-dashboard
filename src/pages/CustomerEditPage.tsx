import "../App.css";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCustomerFn, updateCustomerFn } from "../api/customerApi";
import { CustomerType, OpportunityType } from "../api/types";
import CustomerForm from "../components/CustomerForm";
import Loader from "../components/Loader/Loader";
import {
  deleteOpportunityFn,
  getAllOpportunitiesFn,
} from "../api/opportunityApi";
import OpportunitiesList from "../components/OpportunitiesList";

function CustomerEditPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
      onError: (error: any) => {
        if (Array.isArray(error.response.data.error)) {
          error.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: "top-right",
            })
          );
        } else {
          toast.error(error.response.data.message, {
            position: "top-right",
          });
        }
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

  const { mutate: updateCustomer } = useMutation(
    ({ id, formData }: { id: string; formData: FormData }) =>
      updateCustomerFn({ id, formData }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customers"]);
        toast.success("Customer updated successfully");
        navigate(-1);
      },
      onError: (error: any) => {
        if (Array.isArray(error.response.data.error)) {
          error.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: "top-right",
            })
          );
        } else {
          toast.error(error.response.data.message, {
            position: "top-right",
          });
        }
      },
    }
  );

  const { mutate: deleteOpportunity } = useMutation(
    ({ id, opId }: { id: string; opId: string }) =>
      deleteOpportunityFn(id, opId),
    {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries("opportunities");
        toast.success("Opportunity deleted successfully");
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

  useEffect(() => {
    getCustomerById();
    getOpportunitiesById();
  }, [getCustomerById, getOpportunitiesById]);

  const onDeleteHandler = (id: string, opId: string) => {
    if (window.confirm("Are you sure")) {
      deleteOpportunity({ id, opId });
    }
  };

  const onSubmitHandler = (values: any) => {
    const formData = new FormData();
    if (!customer) return;
    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("phoneNumber", values.phoneNumber);
    formData.set("createdDate", customer.createdDate);
    formData.set("status", values.status);
    updateCustomer({ id: String(customer?.id!), formData });
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
      <OpportunitiesList
        opportunities={opportunities}
        customerId={params.customerId ?? ""}
        onClickDelete={onDeleteHandler}
      />
    </div>
  );
}

export default CustomerEditPage;
