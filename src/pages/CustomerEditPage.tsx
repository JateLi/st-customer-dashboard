import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocalStorageState } from "ahooks";
import { getCustomer, updateCustomer } from "../api/customerApi";
import { CustomerType, OpportunityType, PostCustomerType } from "../api/types";
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
  const [customer, setCustomer] = useLocalStorageState<
    CustomerType | undefined
  >("local-storage-customer");

  const [opportunities, setOpportunities] = useLocalStorageState<
    OpportunityType[]
  >("local-storage-opportunity-list", {
    defaultValue: [],
  });

  const { isLoading: isLoadingCustomer, refetch: getCustomerById } = useQuery(
    ["customer"],
    () => getCustomer(params.customerId ?? ""),
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
        onError: () => {
          toast.error("Got an error to load opportunities list");
        },
      }
    );

  const { mutate: updateCustomerById } = useMutation(
    ({ id, formData }: { id: string; formData: PostCustomerType }) =>
      updateCustomer({ id, formData }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customers"]);
        toast.success("Customer updated successfully");
        setCustomer(undefined);
        navigate(-1);
      },
      onError: (error) => {
        toast.error((error as any).response.data.message, {
          position: "top-right",
        });
      },
    }
  );

  const { mutate: deleteOpportunity } = useMutation(
    ({ id, opId }: { id: string; opId: string }) =>
      deleteOpportunityFn(id, opId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("opportunities");
        toast.success("Opportunity deleted successfully");
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

  useEffect(() => {
    if (!!customer) return;
    getCustomerById();
    getOpportunitiesById();
  }, [customer, getCustomerById, getOpportunitiesById]);

  const onDeleteHandler = (id: string, opId: string) => {
    if (window.confirm("Are you sure")) {
      deleteOpportunity({ id, opId });
    }
  };

  const onSubmitHandler = (values: PostCustomerType) => {
    const formData: PostCustomerType = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      createdDate: values.createdDate,
      status: values.status,
    };
    updateCustomerById({ id: String(customer?.id!), formData });
  };

  const navBack = () => {
    setCustomer(undefined);
    navigate(-1);
  };

  if (isLoadingCustomer || isLoadingOpportunities) return <Loader />;
  return (
    <div className="App">
      <div className="absolute h-20 w-20 left-5 top-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={navBack}
        >
          Back
        </button>
      </div>

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
