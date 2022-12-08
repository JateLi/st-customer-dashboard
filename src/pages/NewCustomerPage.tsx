import CustomerForm from "../components/CustomerForm";

function NewCustomerPage() {
  return (
    <div className="App">
      <div>
        <h1 className="text-3xl font-bold">Customer New</h1>
        <div>
          <CustomerForm />
        </div>
      </div>
    </div>
  );
}

export default NewCustomerPage;
