import CustomerForm from "../components/CustomerForm";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { createCustomerFn } from "../api/customerApi";
import { CustomerStatus } from "../api/types";
import { useNavigate } from "react-router-dom";

function NewCustomerPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createCustomer } = useMutation(
    (customer: FormData) => createCustomerFn(customer),
    {
      onSuccess: (date) => {
        console.log(date);
        queryClient.invalidateQueries(["customers"]);
        toast.success("Customer created successfully");
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
    formData.set("email", values.email);
    formData.set("phoneNumber", values.phoneNumber);
    formData.set("createdDate", values.phoneNumber);
    formData.set("status", CustomerStatus.nonActive);
    createCustomer(formData);
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
      <h1 className="text-3xl font-bold">Customer New</h1>
      <div>
        <CustomerForm onSubmitHandler={onSubmitHandler} />
      </div>
    </div>
  );
}

export default NewCustomerPage;
