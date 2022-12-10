import CustomerForm from "../components/CustomerForm";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { createCustomer } from "../api/customerApi";
import { PostCustomerType } from "../api/types";
import { useNavigate } from "react-router-dom";
import { covertToPostDate } from "../utils/utils";

function NewCustomerPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createNewCustomer } = useMutation(
    (customer: PostCustomerType) => createCustomer(customer),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customers"]);
        toast.success("Customer created successfully");
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

  const onSubmitHandler = (values: PostCustomerType) => {
    const formData: PostCustomerType = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      createdDate: covertToPostDate(new Date()),
      status: values.status,
    };
    createNewCustomer(formData);
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
      <h1 className="text-3xl font-bold">Customer New</h1>
      <div>
        <CustomerForm onSubmitHandler={onSubmitHandler} />
      </div>
    </div>
  );
}

export default NewCustomerPage;
