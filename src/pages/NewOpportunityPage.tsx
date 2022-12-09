import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createOpportunityFn } from "../api/opportunityApi";
import OpportunityForm from "../components/OpportunityForm";

function NewOpportunityPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const params = useParams();

  const { mutate: createOpportunity } = useMutation(
    (opportunity: FormData) =>
      createOpportunityFn(params.customerId ?? "", opportunity),
    {
      onSuccess: (date) => {
        console.log("date.....", date);
        queryClient.invalidateQueries(["opportunities"]);
        toast.success("Opportunity created successfully");
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

  const onSubmitHandler = (values: any) => {
    var formData = new FormData();
    formData.set("name", values.name);
    formData.set("status", values.status);
    formData.set("customerId", params.customerId ?? "");
    createOpportunity(formData);
  };

  return (
    <div className="App">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <h1 className="text-3xl font-bold">Opportunity New</h1>
      <div>
        <OpportunityForm onSubmitHandler={onSubmitHandler} />
      </div>
    </div>
  );
}

export default NewOpportunityPage;
