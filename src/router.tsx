import { createBrowserRouter } from "react-router-dom";
import CustomerList from "./pages/CustomerListPage";
import CustomerEditPage from "./pages/CustomerEditPage";
import NewCustomerPage from "./pages/NewCustomerPage";
import NewOpportunityPage from "./pages/NewOpportunityPage";
import OpportunityEditPage from "./pages/OpportunityEditPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerList />,
  },
  {
    path: "/customer/:customerId",
    element: <CustomerEditPage />,
  },
  {
    path: "/customer/new",
    element: <NewCustomerPage />,
  },
  {
    path: "/customer/:customerId/opportunities/:opId",
    element: <OpportunityEditPage />,
  },
  {
    path: "/customer/:customerId/opportunities/new",
    element: <NewOpportunityPage />,
  },
]);
