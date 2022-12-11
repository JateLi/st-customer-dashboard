import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getOpportunityFn, updateOpportunityFn } from "../api/opportunityApi";
import { OpportunityType, PostOpportunityType } from "../api/types";
import Loader from "../components/Loader/Loader";
import OpportunityForm from "../components/OpportunityForm";

function OpportunityEditPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const params = useParams();
  const [opportunity, setOpportunity] = useState<OpportunityType>();

  const { isLoading, refetch: getOpportunityById } = useQuery(
    ["opportunity"],
    () => getOpportunityFn(params.customerId ?? "", params.opId ?? ""),
    {
      enabled: false,
      onSuccess: (data: OpportunityType) => {
        setOpportunity(data);
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

  const { mutate: updateOpportunity } = useMutation(
    ({
      id,
      formData,
      opId,
    }: {
      id: string;
      formData: PostOpportunityType;
      opId: string;
    }) => updateOpportunityFn({ id, formData, opId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["opportunities"]);
        queryClient.refetchQueries(["opportunities"]);
        toast.success("Opportunity updated successfully");
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

  useEffect(() => {
    getOpportunityById();
  }, [getOpportunityById]);

  const onSubmitHandler = (values: PostOpportunityType) => {
    const formData: PostOpportunityType = {
      name: values.name,
      status: values.status,
      customerId: params.customerId ?? "",
    };

    updateOpportunity({
      id: params.customerId ?? "",
      formData,
      opId: params.opId ?? "",
    });
  };

  if (isLoading) return <Loader />;
  return (
    <div className="App">
      <div className="absolute h-20 w-20 left-5 top-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <h1 className="text-3xl font-bold">Opportunity Edit</h1>
      <div>
        <OpportunityForm
          onSubmitHandler={onSubmitHandler}
          opportunity={opportunity}
        />
      </div>
    </div>
  );
}

export default OpportunityEditPage;
