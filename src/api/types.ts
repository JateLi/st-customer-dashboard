export interface CustomerType {
  createdDate: string;
  email: string;
  id: number;
  name: string;
  phoneNumber: string;
  status: CustomerStatus;
}

export interface OpportunityType {
  id: number;
  name: string;
  customerId: number;
  status: OpportunityStatus;
}

export enum CustomerStatus {
  active = "active",
  nonActive = "Non-Active",
  lead = "Lead",
}

export enum OpportunityStatus {
  new = "New",
  closedWon = "Closed Won",
  closedLost = "Closed Lost",
}
