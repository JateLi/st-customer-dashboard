export interface CustomerType {
  createdDate: string;
  email: string;
  id: number;
  name: string;
  phoneNumber: string;
  status: "active" | "Non-Active" | "Lead";
}

export interface OpportunityType {
  id: number;
  name: string;
  customerId: number;
  status: "New" | "Closed Won" | "Closed Lost";
}
