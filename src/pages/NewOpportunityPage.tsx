import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createOpportunityFn } from "../api/opportunityApi";
import { PostOpportunityType } from "../api/types";
import OpportunityForm from "../components/OpportunityForm";

function NewOpportunityPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const params = useParams();

  const { mutate: createOpportunity } = useMutation(
    (opportunity: PostOpportunityType) =>
      createOpportunityFn(params.customerId ?? "", opportunity),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["opportunities"]);
        toast.success("Opportunity created successfully");
        navigate(-1);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message, {
          position: "top-right",
        });
      },
    }
  );

  const onSubmitHandler = (values: PostOpportunityType) => {
    const formData: PostOpportunityType = {
      name: values.name,
      status: values.status,
      customerId: params.customerId ?? "",
    };

    createOpportunity(formData);
  };

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
      <h1 className="text-3xl font-bold">Opportunity New</h1>
      <div>
        <OpportunityForm onSubmitHandler={onSubmitHandler} />
      </div>
    </div>
  );
}

export default NewOpportunityPage;
